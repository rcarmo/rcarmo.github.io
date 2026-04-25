// ── Foliage: Slow Roads-style atlas sprites + wind ───────────────────────────
import { hash2 } from './utils.js';
import { terrainHeight } from './terrain.js';

// Vertex shader: atlas UV selection + wind animation
const FOL_VS = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 worldViewProjection;
  uniform float uTime;
  uniform vec2  uAtlasOff;
  uniform float uH;
  varying vec2  vUV;
  varying float vAO;
  void main() {
    // Select atlas cell: base UVs [0..0.5], shift to correct quadrant
    vUV = uv + uAtlasOff;
    // Wind: top of sprite sways, base anchored
    float t    = clamp(position.y / max(uH, 0.01), 0.0, 1.0);
    float wind = t * t * 0.42;
    vec3 pos   = position;
    pos.x += sin(uTime*1.8 + uAtlasOff.x*9.7  + position.z*0.12) * wind;
    pos.z += cos(uTime*1.4 + uAtlasOff.y*7.3  + position.x*0.09) * wind * 0.55;
    // Fake AO: darken base, brighten top
    vAO = 0.60 + t * 0.40;
    gl_Position = worldViewProjection * vec4(pos, 1.0);
  }
`;

// Fragment shader: alpha-test + tint
const FOL_FS = `
  precision highp float;
  varying vec2  vUV;
  varying float vAO;
  uniform sampler2D texSampler;
  uniform vec3      uTint;
  void main() {
    vec4 col = texture2D(texSampler, vUV);
    if (col.a < 0.12) discard;
    col.rgb *= vAO;
    col.rgb += uTint;
    gl_FragColor = col;
  }
`;

// All foliage materials — uTime updated each frame in nav.js render loop
export const foliageMats = [];

// Base meshes (hidden) — instances are created per placement
const treeMeshes  = [];
const bushMeshes  = [];
const grassMeshes = [];

function _loadTex(scene, url) {
  const tex = new BABYLON.Texture(url, scene, false, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
  tex.hasAlpha = true;
  return tex;
}

// Cross-plane geometry: two quads at 90°, atlas UVs [0..0.5], all-up normals
function _crossGeom(w, h) {
  const hw = w / 2;
  return {
    positions: [
      -hw, 0, 0,   hw, 0, 0,   hw, h, 0,   -hw, h, 0,   // plane 1 (XY)
       0, 0,-hw,    0, 0, hw,   0, h, hw,    0, h,-hw,   // plane 2 (ZY)
    ],
    normals: [
      0,1,0, 0,1,0, 0,1,0, 0,1,0,
      0,1,0, 0,1,0, 0,1,0, 0,1,0,
    ],
    uvs: [
      0,0, 0.5,0, 0.5,0.5, 0,0.5,
      0,0, 0.5,0, 0.5,0.5, 0,0.5,
    ],
    indices: [0,1,2, 0,2,3, 2,1,0, 3,2,0, 4,5,6, 4,6,7, 6,5,4, 7,6,4],
  };
}

function _makeMat(scene, name, tex, col, row, h) {
  const mat = new BABYLON.ShaderMaterial(name, scene,
    { vertexSource:FOL_VS, fragmentSource:FOL_FS },
    { attributes:['position','uv'],
      uniforms:['worldViewProjection','uTime','uAtlasOff','uH','uTint'],
      samplers:['texSampler'] }
  );
  mat.setTexture('texSampler', tex);
  mat.setVector2('uAtlasOff', new BABYLON.Vector2(col*0.5, row*0.5));
  mat.setFloat('uH', h);
  mat.setVector3('uTint', new BABYLON.Vector3(0,0,0));
  mat.setFloat('uTime', 0);
  mat.backFaceCulling = false;
  mat.needAlphaBlending = () => false;
  mat.needAlphaTesting  = () => true;
  foliageMats.push(mat);
  return mat;
}

function _makeMesh(scene, name, mat, w, h) {
  const g = _crossGeom(w, h);
  const vd = new BABYLON.VertexData();
  Object.assign(vd, g);
  const mesh = new BABYLON.Mesh(name, scene);
  vd.applyToMesh(mesh);
  mesh.material = mat;
  mesh.isVisible = false;
  return mesh;
}

// ── Public init ───────────────────────────────────────────────────────────────
export function initFoliage(scene) {
  const treeTex  = _loadTex(scene, '/assets/sprites/trees-near.png');
  const bushTex  = _loadTex(scene, '/assets/sprites/bush.png');
  const grassTex = _loadTex(scene, '/assets/sprites/grass.png');

  for(let v=0; v<4; v++){
    const col=v%2, row=Math.floor(v/2);
    treeMeshes .push(_makeMesh(scene, 'tree'+v,  _makeMat(scene,'tMat'+v, treeTex,  col,row,8.5), 7.0, 8.5));
    bushMeshes .push(_makeMesh(scene, 'bush'+v,  _makeMat(scene,'bMat'+v, bushTex,  col,row,2.4), 3.2, 2.4));
    grassMeshes.push(_makeMesh(scene, 'grass'+v, _makeMat(scene,'gMat'+v, grassTex, col,row,2.8), 2.2, 2.8));
  }
}

// ── Placement helpers ─────────────────────────────────────────────────────────
export function makeTree(x,z,scale=1,kind='round'){
  const y=terrainHeight(x,z), pick=hash2(x*0.17,z*0.13);
  const v=Math.floor(pick*4)%4, s=scale*(0.9+pick*0.45);
  const inst=treeMeshes[v].createInstance('t');
  inst.position.set(x, y-0.8*s, z);
  inst.scaling.set(s, s*(0.88+hash2(x*0.29,z*0.23)*0.28), s);
  inst.rotation.y=pick*Math.PI*2;
}
export function makeShrub(x,z,scale=1){
  const y=terrainHeight(x,z), pick=hash2(x*0.23,z*0.19);
  const v=Math.floor(pick*4)%4, s=scale*(0.8+pick*0.45);
  const inst=bushMeshes[v].createInstance('b');
  inst.position.set(x, y-0.2*s, z);
  inst.scaling.set(s, s*(0.82+hash2(x*0.31,z*0.27)*0.36), s);
  inst.rotation.y=pick*Math.PI*2;
}
export function makeGrassClump(x,z,scale=1){
  const y=terrainHeight(x,z), pick=hash2(x*0.19,z*0.17);
  const v=Math.floor(pick*4)%4, s=scale*(0.7+pick*0.6);
  const inst=grassMeshes[v].createInstance('g');
  inst.position.set(x, y-0.05, z);
  inst.scaling.set(s, s*(0.85+hash2(x*0.27,z*0.27)*0.35), s);
  inst.rotation.y=pick*Math.PI*2;
}
