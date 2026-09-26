// ── Navigation, camera state machine, render loop ────────────────────────────
import { terrainHeight, spinePath, footPathRoutes } from './terrain.js';
import { clusterAnchors }                           from './world.js';
import { foliageMats }                              from './foliage.js';

export const EYE_HEIGHT = 2.2;

let scene, camera, canvas, engine, sun, terrain, panel;
let walkPath=null, walkIndex=0, walkSpeed=18, isWalking=false;
let autoWalk=true, autoT=0.0, userControl=false;
let activeCluster=null;

// ── DOM refs ──────────────────────────────────────────────────────────────────
let navEl, focusName, focusMeta, focusDesc, focusLink, focusJump, focusLogo, focusClose;

export function initNav(opts) {
  ({scene, camera, canvas, engine, sun, terrain} = opts);
  navEl      = document.getElementById('cluster-nav');
  panel      = document.getElementById('focus-panel');
  focusLogo  = document.getElementById('focus-logo');
  focusName  = document.getElementById('focus-name');
  focusMeta  = document.getElementById('focus-meta');
  focusDesc  = document.getElementById('focus-desc');
  focusLink  = document.getElementById('focus-link');
  focusJump  = document.getElementById('focus-jump');
  focusClose = document.getElementById('focus-close');

  focusClose.addEventListener('click', _closeFocus);

  // Cluster nav clicks (delegated)
  navEl.addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn');
    if(btn) focusCluster(btn.dataset.cluster);
  });

  // Sign / billboard pick
  scene.onPointerObservable.add(info => {
    if(info.type !== BABYLON.PointerEventTypes.POINTERPICK) return;
    const pick=info.pickInfo;
    if(!pick?.hit || !pick.pickedMesh) return;
    const meta=pick.pickedMesh.metadata;
    if(!meta) return;
    if(meta.clusterOnly){ walkToCluster(meta.clusterId); return; }
    activeCluster=(clusterAnchors.find(c=>c.projects.some(p=>p.url===meta.url))||{}).id||activeCluster;
    _setActiveNav(activeCluster);
    _openFocus(meta);
  });

  scene.onPointerDown = () => { if(!isWalking){ autoWalk=false; userControl=true; } };

  // Set start position
  const startPos=_posOnSpine(autoT), startDir=_dirOnSpine(autoT);
  camera.position=startPos.clone();
  camera.setTarget(startPos.add(startDir));

  if(clusterAnchors[0]) _setActiveNav(clusterAnchors[0].id);

  // Render loop
  scene.registerBeforeRender(_onBeforeRender);
  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());
}

// ── Walk to cluster ───────────────────────────────────────────────────────────
export function walkToCluster(id){
  const cluster=clusterAnchors.find(c=>c.id===id);
  if(!cluster) return;
  activeCluster=id; _setActiveNav(id);
  const target=cluster.anchor;
  const start=_nearestPathPoint(camera.position);
  const end  =_nearestPathPoint(target);
  if(!start||!end) return;
  const pts=[];
  if(start.route===end.route){
    const lo=Math.min(start.i,end.i), hi=Math.max(start.i,end.i);
    for(let i=lo;i<=hi;i++) pts.push(start.route[i]);
    if(start.i>end.i) pts.reverse();
  } else {
    for(let i=start.i;i<start.route.length;i++) pts.push(start.route[i]);
    const ss=_nearestPathPoint(pts[pts.length-1]||camera.position);
    const se=_nearestPathPoint(target);
    if(ss&&se&&ss.route===spinePath&&se.route===spinePath){
      const lo=Math.min(ss.i,se.i), hi=Math.max(ss.i,se.i);
      const seg=[]; for(let i=lo;i<=hi;i++) seg.push(spinePath[i]);
      if(ss.i>se.i) seg.reverse();
      pts.push(...seg);
    }
    for(let i=0;i<=end.i&&i<end.route.length;i++) pts.push(end.route[i]);
  }
  if(pts.length>1){
    walkPath=pts.map(p=>new BABYLON.Vector3(p.x,terrainHeight(p.x,p.z)+EYE_HEIGHT,p.z));
    walkIndex=0; isWalking=true; autoWalk=false; userControl=false;
  }
  _openFocus({ name:cluster.label,
    desc:`${cluster.projects.length} project${cluster.projects.length!==1?'s':''} nearby`,
    url:cluster.projects[0]?.url||'/', logo:cluster.projects[0]?.logo||'',
    repo:cluster.id, clusterOnly:true, clusterId:cluster.id });
}
export function focusCluster(id){ walkToCluster(id); }

// ── Internals ─────────────────────────────────────────────────────────────────
function _setActiveNav(id){
  [...navEl.querySelectorAll('.nav-btn')].forEach(b=>b.classList.toggle('active',b.dataset.cluster===id));
}
function _openFocus(meta){
  panel.classList.add('open');
  focusName.textContent=meta.name||meta.label||'Project';
  focusMeta.textContent=meta.repo||meta.label||'';
  focusDesc.textContent=meta.desc||'';
  focusLink.href=meta.url||'/';
  focusJump.textContent=meta.clusterOnly?'Walk here':'Walk to cluster';
  focusJump.onclick=()=>walkToCluster(meta.clusterId||activeCluster||clusterAnchors[0]?.id);
  if(meta.logo){ focusLogo.src=meta.logo; focusLogo.style.display='block'; }
  else { focusLogo.style.display='none'; }
}
function _closeFocus(){ panel.classList.remove('open'); }

function _nearestPathPoint(pos){
  let best=null, bestD=Infinity;
  for(const route of footPathRoutes){
    for(let i=0;i<route.length;i++){
      const dx=pos.x-route[i].x, dz=pos.z-route[i].z, d=dx*dx+dz*dz;
      if(d<bestD){ bestD=d; best={route,i}; }
    }
  }
  for(let i=0;i<spinePath.length;i++){
    const dx=pos.x-spinePath[i].x, dz=pos.z-spinePath[i].z, d=dx*dx+dz*dz;
    if(d<bestD){ bestD=d; best={route:spinePath,i}; }
  }
  return best;
}
function _posOnSpine(t){
  const idx=Math.floor(t*(spinePath.length-1));
  const p=spinePath[Math.min(idx,spinePath.length-1)];
  return new BABYLON.Vector3(p.x, terrainHeight(p.x,p.z)+EYE_HEIGHT, p.z);
}
function _dirOnSpine(t){
  const idx=Math.floor(t*(spinePath.length-1));
  const p=spinePath[Math.min(idx,spinePath.length-1)];
  const next=spinePath[Math.min(idx+3,spinePath.length-1)];
  return new BABYLON.Vector3(next.x-p.x,0,next.z-p.z).normalize();
}

function _onBeforeRender(){
  const dt=engine.getDeltaTime()/1000;
  // Wind animation
  const t=performance.now()*.001;
  for(const m of foliageMats) m.setFloat('uTime',t);

  if(isWalking && walkPath){
    camera.detachControl();
    const tgt=walkPath[walkIndex];
    const dir=tgt.subtract(camera.position); dir.y=0;
    const dist=dir.length();
    if(dist<0.8){
      walkIndex++;
      if(walkIndex>=walkPath.length){
        isWalking=false; walkPath=null; autoWalk=false; userControl=true;
        camera.attachControl(canvas,true);
      }
    } else {
      const speed=Math.min(walkSpeed*dt,dist);
      const step=dir.normalize().scale(speed);
      camera.position.x+=step.x; camera.position.z+=step.z;
      const look=camera.position.add(dir.normalize().scale(10)); look.y=camera.position.y;
      const cur=camera.getTarget();
      camera.setTarget(new BABYLON.Vector3(
        cur.x+(look.x-cur.x)*.06, camera.position.y, cur.z+(look.z-cur.z)*.06));
    }
  } else if(autoWalk && !userControl && !panel.classList.contains('open')){
    camera.detachControl();
    autoT+=dt*.006;
    if(autoT>0.96) autoT=0.02;
    const p=_posOnSpine(autoT);
    camera.position.x=p.x; camera.position.z=p.z;
    const ahead=_posOnSpine(Math.min(autoT+.03,.96));
    camera.setTarget(new BABYLON.Vector3(ahead.x,camera.position.y,ahead.z));
  } else {
    camera.attachControl(canvas,true);
  }

  camera.position.y=terrainHeight(camera.position.x,camera.position.z)+EYE_HEIGHT;

  // Track nearest cluster for nav highlight
  const nearest=clusterAnchors.reduce((best,c)=>{
    const d=BABYLON.Vector3.DistanceSquared(
      new BABYLON.Vector3(c.anchor.x,0,c.anchor.z),
      new BABYLON.Vector3(camera.position.x,0,camera.position.z));
    return(!best||d<best.d)?{id:c.id,d}:best;
  }, null);
  if(nearest&&nearest.id!==activeCluster){ activeCluster=nearest.id; _setActiveNav(activeCluster); }

  // Update terrain shader uniforms
  if(terrain.material?.setVector3){
    terrain.material.setVector3('cameraPosition',camera.position);
    terrain.material.setVector3('sunDir',sun.direction);
  }
}
