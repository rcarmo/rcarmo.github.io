// ── Terrain: spine, heightmap, mesh, mountains, rocks ───────────────────────
import { hash2, lerp, smoothstep, clamp, valueNoise, fbm } from './utils.js';

// Shared mutable — world.js pushes routes into this after building footpaths
export const footPathRoutes = [];

export function nearestFootpathDist(x,z){
  let best = Infinity;
  for(const route of footPathRoutes) best = Math.min(best, _nearestPolylineDist(x,z,route));
  return best;
}
function _nearestPolylineDist(x,z,poly){
  let best = Infinity;
  for(let i=0;i<poly.length-1;i++){
    const a=poly[i], b=poly[i+1];
    const abx=b.x-a.x, abz=b.z-a.z;
    const apx=x-a.x, apz=z-a.z;
    const t=clamp((apx*abx+apz*abz)/(abx*abx+abz*abz||1), 0,1);
    const dx=a.x+abx*t-x, dz=a.z+abz*t-z;
    best=Math.min(best, dx*dx+dz*dz);
  }
  return Math.sqrt(best);
}

// ── Spine path ───────────────────────────────────────────────────────────────
export const spinePath = [];
const SPINE_LEN = 780, SPINE_STEP = 6;
for(let i=0;i<=SPINE_LEN;i+=SPINE_STEP){
  const x=i-SPINE_LEN*0.5;
  const z=Math.sin(i*0.013)*28 + Math.sin(i*0.041)*8 + Math.cos(i*0.009)*12;
  spinePath.push(new BABYLON.Vector3(x,0,z));
}

export function nearestSpineDist(x,z){
  let best=Infinity;
  for(const p of spinePath){ const dx=x-p.x, dz=z-p.z; best=Math.min(best,dx*dx+dz*dz); }
  return Math.sqrt(best);
}

// ── Height & slope ───────────────────────────────────────────────────────────
export function terrainHeight(x,z){
  const macro=(fbm(x*0.008,z*0.008)-0.5)*26;
  const micro=(fbm(x*0.028+12,z*0.028-7)-0.5)*7;
  const ridge=Math.sin(x*0.012)*2.8 + Math.cos(z*0.014)*2.2;
  const d=nearestSpineDist(x,z);
  const flat=Math.exp(-(d*d)/(22*22));
  return (macro+micro+ridge)*(1-flat*0.72)+0.15;
}
export function sampleSlope(x,z){
  const hL=terrainHeight(x-1.2,z), hR=terrainHeight(x+1.2,z);
  const hD=terrainHeight(x,z-1.2), hU=terrainHeight(x,z+1.2);
  const nx=hL-hR, nz=hD-hU;
  return clamp(Math.sqrt(nx*nx+nz*nz)/3.2, 0,1);
}

// ── Terrain mesh + mountains + rocks ────────────────────────────────────────
export let terrain;

export async function initTerrain(scene, shadowGen) {
  terrain = BABYLON.MeshBuilder.CreateGround('terrain',
    { width:980, height:360, subdivisions:220 }, scene);
  const pos = terrain.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  for(let i=0;i<pos.length;i+=3){ pos[i+1]=terrainHeight(pos[i],pos[i+2]); }
  terrain.setVerticesData(BABYLON.VertexBuffer.PositionKind, pos, true);
  const idx = terrain.getIndices();
  const nrm = [];
  BABYLON.VertexData.ComputeNormals(pos, idx, nrm);
  terrain.setVerticesData(BABYLON.VertexBuffer.NormalKind, nrm, true);

  // Simple material — replaced later by createTerrainLook()
  const mat = new BABYLON.StandardMaterial('terrainMat', scene);
  mat.diffuseColor = new BABYLON.Color3(0.58, 0.68, 0.46);
  mat.specularColor = new BABYLON.Color3(0.04, 0.04, 0.04);
  mat.ambientColor  = new BABYLON.Color3(0.82, 0.86, 0.8);
  terrain.material = mat;
  terrain.receiveShadows = true;

  _buildMountains(scene);
  _buildRocks(scene, shadowGen);
}

function _buildMountains(scene){
  const bands = [
    [-220, 42, new BABYLON.Color3(0.52,0.63,0.74), new BABYLON.Color3(0.8,0.86,0.92), 18],
    [-280, 30, new BABYLON.Color3(0.58,0.68,0.80), new BABYLON.Color3(0.85,0.90,0.96), 28],
    [ 210, 34, new BABYLON.Color3(0.60,0.69,0.78), new BABYLON.Color3(0.82,0.88,0.94), 14],
    [ 270, 26, new BABYLON.Color3(0.65,0.73,0.82), new BABYLON.Color3(0.88,0.92,0.97), 22],
  ];
  for(const [zBase, amp, depthColor, peakColor, yOffset] of bands){
    const front=[], back=[];
    for(let x=-620;x<=620;x+=18){
      const n=fbm((x+300)*0.006,(zBase+400)*0.01);
      const n2=fbm((x-120)*0.014,(zBase-90)*0.008);
      const y=yOffset+n*amp+n2*(amp*0.45);
      front.push(new BABYLON.Vector3(x,y,zBase));
      back.push(new BABYLON.Vector3(x,-20, zBase>0?zBase+60:zBase-60));
    }
    const band = BABYLON.MeshBuilder.CreateRibbon('mountain',
      { pathArray:[front,back], sideOrientation:BABYLON.Mesh.DOUBLESIDE }, scene);
    const mat = new BABYLON.StandardMaterial('mountainMat', scene);
    mat.diffuseColor = depthColor;
    mat.emissiveColor = peakColor.scale(0.08);
    mat.specularColor = BABYLON.Color3.Black();
    band.material = mat;
  }
}

function _buildRocks(scene, shadowGen){
  const rockMat = new BABYLON.StandardMaterial('rockMat', scene);
  rockMat.diffuseColor = new BABYLON.Color3(0.52,0.50,0.46);
  rockMat.specularColor = new BABYLON.Color3(0.08,0.08,0.08);
  const rockBase = BABYLON.MeshBuilder.CreateBox('rockBase',
    { width:1.4, height:0.7, depth:1.1 }, scene);
  rockBase.material = rockMat;
  rockBase.isVisible = false;
  for(let x=-460;x<=460;x+=12){
    for(let z=-160;z<=160;z+=12){
      const slope=sampleSlope(x,z);
      if(slope < 0.32) continue;
      const rnd=hash2(x*0.13+7, z*0.13-3);
      if(rnd < 0.55) continue;
      const y=terrainHeight(x,z), scale=0.5+slope*1.8+rnd*0.6;
      const rock=rockBase.createInstance('rock');
      rock.position.set(x, y+scale*0.2, z);
      rock.scaling.set(scale, scale, scale);
      rock.rotation.y = rnd*Math.PI*2;
      rock.rotation.x = (hash2(x*0.09,z*0.09)-0.5)*0.3;
      rock.receiveShadows = true;
    }
  }
}
