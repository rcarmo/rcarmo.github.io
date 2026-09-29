// ── Babylon.js scene bootstrap ───────────────────────────────────────────────
export let canvas, engine, scene, camera, sun, hemi, shadowGen;
export const EYE_HEIGHT = 2.2;

export function initScene() {
  canvas = document.getElementById('cv');
  engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer:false, stencil:false, antialias:true });
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.84, 0.92, 1.0, 1);
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.0019;
  scene.fogColor = new BABYLON.Color3(0.83, 0.92, 1.0);
  scene.useOrderIndependentTransparency = true;

  camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0,4,0), scene);
  camera.attachControl(canvas, true);
  camera.speed = 1.2;
  camera.inertia = 0.82;
  camera.angularSensibility = 3200;
  camera.minZ = 0.5;
  camera.keysUp=[87]; camera.keysDown=[83]; camera.keysLeft=[65]; camera.keysRight=[68];
  camera.ellipsoid = new BABYLON.Vector3(0.5, 0.9, 0.5);
  camera.checkCollisions = false;

  sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-0.28,-1,-0.15), scene);
  sun.position = new BABYLON.Vector3(80,140,20);
  sun.intensity = 1.9;
  hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0,1,0), scene);
  hemi.intensity = 0.72;
  hemi.groundColor = new BABYLON.Color3(0.38, 0.44, 0.36);

  shadowGen = new BABYLON.ShadowGenerator(2048, sun);
  shadowGen.usePercentageCloserFiltering = true;
  shadowGen.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;

  _buildSky();
}

function _buildSky() {
  const sky = BABYLON.MeshBuilder.CreateSphere('sky', { diameter:1200, sideOrientation:BABYLON.Mesh.BACKSIDE }, scene);
  const skyMat = new BABYLON.StandardMaterial('skyMat', scene);
  skyMat.disableLighting = true;
  const skyTex = new BABYLON.DynamicTexture('skyTex', { width:2048, height:1024 }, scene, false);
  const ctx = skyTex.getContext();
  const grad = ctx.createLinearGradient(0,0,0,1024);
  grad.addColorStop(0,   '#7ec8ff');
  grad.addColorStop(0.45,'#cfe9ff');
  grad.addColorStop(0.75,'#eef7ff');
  grad.addColorStop(1,   '#f7eddc');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,2048,1024);
  for(let i=0;i<22;i++){
    const x=((i*173)%1800)+80, y=120+((i*59)%260), w=140+(i%5)*48, h=32+(i%4)*10;
    ctx.fillStyle = `rgba(255,255,255,${0.06+(i%3)*0.03})`;
    ctx.beginPath(); ctx.ellipse(x,y,w,h,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+w*.3,y+6,w*.8,h*.9,0,0,Math.PI*2); ctx.fill();
  }
  skyTex.update(false);
  skyMat.emissiveTexture = skyTex;
  skyMat.emissiveColor = BABYLON.Color3.White();
  sky.material = skyMat;
}
