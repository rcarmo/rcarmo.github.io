// ── World: biomes, signs, clusters, paths, ecology, terrain shader ───────────
import { hash2, lerp, smoothstep, clamp, valueNoise, fbm, mixColor, hexColor } from './utils.js';
import { terrain, spinePath, terrainHeight, sampleSlope,
         nearestSpineDist, footPathRoutes, nearestFootpathDist } from './terrain.js';
import { makeTree, makeShrub, makeGrassClump } from './foliage.js';

// ── Palettes ──────────────────────────────────────────────────────────────────
export const clusterPalette = {
  'ai-agents':      { color:'#2d6dff', tint:'#dce8ff', terrain:'#6b8ec9', foliage:'grove'     },
  'ai-ml':          { color:'#7a4cff', tint:'#ece3ff', terrain:'#7f86b8', foliage:'orchard'   },
  'cloud':          { color:'#1ba1e3', tint:'#dff5ff', terrain:'#6ea6bf', foliage:'windbreak' },
  'hardware':       { color:'#d97706', tint:'#fff0d7', terrain:'#b8966f', foliage:'scrub'     },
  'infrastructure': { color:'#0f9f7a', tint:'#ddfff6', terrain:'#75a18f', foliage:'hedge'     },
  'libraries':      { color:'#a16207', tint:'#fff1d8', terrain:'#a79069', foliage:'avenue'    },
  'macos':          { color:'#db2777', tint:'#ffe1f0', terrain:'#b38496', foliage:'garden'    },
  'terminal':       { color:'#1f7a50', tint:'#e0ffef', terrain:'#78a784', foliage:'pine'      },
  'featured':       { color:'#2563eb', tint:'#dce8ff', terrain:'#6b8ec9', foliage:'grove'     },
};

export const biomeProfiles = {
  grove:    { ground:'#789a5f', meadow:'#88ad67', dirt:'#8c7c58', rock:'#77736b', grassDensity:0.72, shrubDensity:0.18 },
  orchard:  { ground:'#8aa46c', meadow:'#93b26f', dirt:'#8d7b5a', rock:'#7b766f', grassDensity:0.66, shrubDensity:0.12 },
  windbreak:{ ground:'#75967b', meadow:'#83a98b', dirt:'#7a725d', rock:'#6e7474', grassDensity:0.58, shrubDensity:0.16 },
  scrub:    { ground:'#9f9668', meadow:'#aa9f70', dirt:'#9b805f', rock:'#81776c', grassDensity:0.42, shrubDensity:0.20 },
  hedge:    { ground:'#6f9a73', meadow:'#84ab7f', dirt:'#87765e', rock:'#76766d', grassDensity:0.64, shrubDensity:0.22 },
  avenue:   { ground:'#8a9b6b', meadow:'#95ad72', dirt:'#8b7b5d', rock:'#7a746c', grassDensity:0.55, shrubDensity:0.10 },
  garden:   { ground:'#83a173', meadow:'#92b080', dirt:'#917761', rock:'#7f7774', grassDensity:0.70, shrubDensity:0.26 },
  pine:     { ground:'#6b8759', meadow:'#7e9763', dirt:'#716853', rock:'#6b6b68', grassDensity:0.46, shrubDensity:0.12 },
};

export const clusterAnchors = [];
export const signMeshes = [];
const signMaterials = [];

// ── Biome field ───────────────────────────────────────────────────────────────
export function sampleBiomeField(x,z){
  let total=0;
  const weighted = clusterAnchors.map(cluster=>{
    const dx=x-cluster.anchor.x, dz=z-cluster.anchor.z;
    const w=1/Math.pow(Math.max(18,Math.sqrt(dx*dx+dz*dz)),1.35);
    total+=w;
    return { cluster, w };
  });
  weighted.sort((a,b)=>b.w-a.w);
  const top = weighted[0]?.cluster || clusterAnchors[0];
  return {
    dominant: top,
    influence: weighted.slice(0,3).map(e=>({ cluster:e.cluster, weight:total?e.w/total:0 })),
  };
}

// ── Signs ─────────────────────────────────────────────────────────────────────
function _makeSignTexture(scene, title, subtitle, color, tint){
  const dt = new BABYLON.DynamicTexture('dt_'+title, { width:1024, height:512 }, scene, false);
  const ctx = dt.getContext();
  ctx.fillStyle=tint; ctx.fillRect(0,0,1024,512);
  ctx.fillStyle='rgba(255,255,255,.96)'; ctx.fillRect(18,18,988,476);
  ctx.fillStyle=color; ctx.fillRect(18,18,988,90);
  ctx.fillStyle='#ffffff'; ctx.font='700 48px Inter,sans-serif'; ctx.fillText(title,44,76);
  ctx.fillStyle='#23384e'; ctx.font='700 38px Inter,sans-serif';
  const lines=subtitle.match(/.{1,42}(\s|$)/g)||[subtitle];
  lines.slice(0,3).forEach((l,i)=>ctx.fillText(l.trim(),44,176+i*60));
  dt.update(true);
  return dt;
}

function _addProjectSign(scene, shadowGen, project, pos, color, tint, faceDir){
  const post = BABYLON.MeshBuilder.CreateBox('post',{width:.18,height:2.7,depth:.18},scene);
  post.position = pos.add(new BABYLON.Vector3(0,1.35,0));
  const postMat = new BABYLON.StandardMaterial('postMat',scene);
  postMat.diffuseColor = new BABYLON.Color3(0.47,0.39,0.28);
  post.material = postMat;

  const board = BABYLON.MeshBuilder.CreatePlane('board',
    { width:4.4, height:2.2, sideOrientation:BABYLON.Mesh.DOUBLESIDE }, scene);
  board.position = pos.add(new BABYLON.Vector3(0,3.1,0));
  if(faceDir) board.rotation.y = Math.atan2(faceDir.x,faceDir.z)+Math.PI;
  const dt = _makeSignTexture(scene, project.name, project.desc, color, tint);
  const mat = new BABYLON.StandardMaterial('boardMat',scene);
  mat.diffuseTexture=dt; mat.emissiveColor=new BABYLON.Color3(0.12,0.12,0.12); mat.specularColor=BABYLON.Color3.Black();
  board.material=mat;
  signMaterials.push(mat);
  shadowGen.addShadowCaster(post); shadowGen.addShadowCaster(board);
  board.metadata=project;
  signMeshes.push(board);
  return board;
}

// ── Cluster placement ─────────────────────────────────────────────────────────
export function initWorld(scene, shadowGen, sections, navEl){
  sections.forEach((section, si) => {
    const palette = clusterPalette[section.id] || { color:'#2563eb', tint:'#dce8ff' };
    const spineIdx = Math.floor((si+1)*(spinePath.length-20)/(sections.length+1));
    const center   = spinePath[spineIdx];
    const prev     = spinePath[Math.max(0,spineIdx-1)];
    const next     = spinePath[Math.min(spinePath.length-1,spineIdx+1)];
    const tangent  = next.subtract(prev).normalize();
    const normal   = new BABYLON.Vector3(-tangent.z,0,tangent.x);
    const side     = si%2===0?1:-1;
    const ax=center.x+normal.x*18*side, az=center.z+normal.z*18*side;
    const anchor   = new BABYLON.Vector3(ax, terrainHeight(ax,az), az);
    const faceDir  = center.subtract(anchor).normalize();
    clusterAnchors.push({ id:section.id, label:section.label, center, anchor,
      color:palette.color, projects:section.projects, faceDir, tangent, normal, side });

    const title = _addProjectSign(scene, shadowGen,
      { name:section.label, desc:`${section.projects.length} projects in this area`,
        url:section.projects[0]?.url||'/', logo:section.projects[0]?.logo||'' },
      anchor.clone(), palette.color, palette.tint, faceDir);
    title.scaling.scaleInPlace(1.14);
    title.metadata={ clusterId:section.id, clusterOnly:true, label:section.label };

    section.projects.slice(0,6).forEach((project,i)=>{
      const row=Math.floor(i/3), col=i%3;
      const dx=(col-1)*6.2+(row%2)*1.6, dz=7.5+row*6.5;
      const px=anchor.x+normal.x*dx+tangent.x*dz*side;
      const pz=anchor.z+normal.z*dx+tangent.z*dz*side;
      _addProjectSign(scene, shadowGen, project,
        new BABYLON.Vector3(px,terrainHeight(px,pz),pz), palette.color, palette.tint, faceDir);
    });

    const btn=document.createElement('button');
    btn.className='nav-btn'+(si===0?' active':'');
    btn.textContent=section.label; btn.dataset.cluster=section.id;
    navEl.appendChild(btn);
  });
}

// ── Cluster foliage ───────────────────────────────────────────────────────────
export function scatterClusterFoliage(anchor, tangent, normal, palette){
  const variant=(palette.foliage||'grove');
  function place(dx,dz,kind,scale){
    const px=anchor.x+normal.x*dx+tangent.x*dz;
    const pz=anchor.z+normal.z*dx+tangent.z*dz;
    if(footPathRoutes.length && nearestFootpathDist(px,pz)<4) return;
    if(nearestSpineDist(px,pz)<6) return;
    if(kind==='shrub') makeShrub(px,pz,scale); else makeTree(px,pz,scale,kind);
  }
  if(variant==='pine'){
    for(let i=0;i<14;i++) place(-10+(i%4)*6, 5+Math.floor(i/4)*5, 'pine', 0.9+(i%3)*.12);
    for(let i=0;i<4;i++)  place(-8+i*5, 18, 'birch', 0.8+(i%2)*.1);
    for(let i=0;i<8;i++)  place(-12+i*3.4, -4-(i%3)*2.2, 'shrub', 0.55+(i%2)*.08);
  } else if(variant==='scrub'){
    for(let i=0;i<12;i++) place(-12+(i%6)*4.4, -2+Math.floor(i/6)*4.6, i%4===0?'round':'shrub', 0.45+(i%5)*.08);
    for(let i=0;i<6;i++)  place(-10+i*4, 12, 'shrub', 0.4+(i%3)*.06);
  } else if(variant==='garden'){
    for(let i=0;i<8;i++)  place(-10+(i%4)*5.5, 3+Math.floor(i/4)*6, i%3===0?'birch':'round', 0.7+(i%3)*.08);
    for(let i=0;i<14;i++) place(-11+(i%7)*3.2, -3+Math.floor(i/7)*3.8, 'shrub', 0.42+(i%4)*.05);
  } else if(variant==='hedge'){
    for(let i=0;i<18;i++) place(-14+i*1.6, 7, 'shrub', 0.45+(i%3)*.03);
    for(let i=0;i<18;i++) place(-14+i*1.6,-3, 'shrub', 0.45+(i%3)*.03);
    for(let i=0;i<6;i++)  place(-10+i*4.2,11, i%2===0?'round':'birch', 0.72+(i%2)*.1);
  } else if(variant==='avenue'){
    for(let i=0;i<10;i++) { place(-12+i*2.8,8,i%3===0?'birch':'round',0.78); place(-12+i*2.8,-5,'round',0.78); }
  } else if(variant==='windbreak'){
    for(let i=0;i<14;i++) place(-12+i*2.0,10,i%2?'pine':'round',0.88+(i%3)*.08);
    for(let i=0;i<10;i++) place(-10+i*2.5,-5,'shrub',0.52+(i%2)*.06);
  } else if(variant==='orchard'){
    for(let r=0;r<3;r++) for(let c=0;c<5;c++) place(-10+c*4.8,r*5,'round',0.7+((r+c)%2)*.08);
    for(let i=0;i<10;i++) place(-10+(i%5)*4,-4.5+Math.floor(i/5)*17,'shrub',0.46+(i%3)*.04);
  } else { // grove default
    for(let i=0;i<14;i++) place(-11+(i%4)*5.5,3+Math.floor(i/4)*5.2,['pine','round','birch'][i%3],0.8+(i%4)*.08);
    for(let i=0;i<12;i++) place(-12+(i%6)*4,-4+Math.floor(i/6)*4.2,'shrub',0.48+(i%4)*.05);
  }
}

// ── Footpaths ─────────────────────────────────────────────────────────────────
export function createFootpaths(scene){
  const pathMat = new BABYLON.StandardMaterial('footPathMat',scene);
  pathMat.diffuseColor=new BABYLON.Color3(0.42,0.34,0.24);
  pathMat.specularColor=BABYLON.Color3.Black(); pathMat.zOffset=-2;

  for(let i=0;i<clusterAnchors.length-1;i++){
    const a=clusterAnchors[i], b=clusterAnchors[i+1];
    const start=a.anchor.clone(), end=b.anchor.clone();
    const dir=end.subtract(start);
    const len=Math.sqrt(dir.x*dir.x+dir.z*dir.z)||1;
    const side=new BABYLON.Vector3(-dir.z/len,0,dir.x/len);
    const m1=BABYLON.Vector3.Lerp(start,end,0.28).add(side.scale((fbm(start.x*.01,end.z*.01)-.5)*18));
    const m2=BABYLON.Vector3.Lerp(start,end,0.72).add(side.scale((fbm(end.x*.01,start.z*.01)-.5)*-18));
    [m1,m2].forEach(p=>p.y=terrainHeight(p.x,p.z)+0.08);
    const pts=BABYLON.Curve3.CreateCatmullRomSpline([start,m1,m2,end],40).getPoints()
      .map(p=>new BABYLON.Vector3(p.x, terrainHeight(p.x,p.z)+0.08, p.z));
    footPathRoutes.push(pts);
    _buildRibbon(scene, pts, 1.4, pathMat);
    for(let j=4;j<pts.length-4;j+=9){
      const p=pts[j];
      const pbl=BABYLON.MeshBuilder.CreateSphere('pbl',{diameter:.14+(j%3)*.05,segments:4},scene);
      pbl.position.set(p.x+Math.sin(j)*.9, terrainHeight(p.x,p.z)+.03, p.z+Math.cos(j*1.7)*.9);
      const pm=new BABYLON.StandardMaterial('pblMat',scene);
      pm.diffuseColor=new BABYLON.Color3(0.58,0.55,0.50); pm.specularColor=BABYLON.Color3.Black();
      pbl.material=pm;
    }
  }
}
function _buildRibbon(scene, points, width, material){
  if(points.length<3) return;
  const left=[], right=[];
  for(let i=0;i<points.length;i++){
    const prev=points[Math.max(0,i-1)], next=points[Math.min(points.length-1,i+1)];
    const tg=next.subtract(prev).normalize();
    const nm=new BABYLON.Vector3(-tg.z,0,tg.x);
    const w=width*Math.min(i/3,(points.length-1-i)/3,1.0);
    left .push(new BABYLON.Vector3(points[i].x+nm.x*w, points[i].y, points[i].z+nm.z*w));
    right.push(new BABYLON.Vector3(points[i].x-nm.x*w, points[i].y, points[i].z-nm.z*w));
  }
  const r=BABYLON.MeshBuilder.CreateRibbon('ribbon',
    { pathArray:[left,right], sideOrientation:BABYLON.Mesh.DOUBLESIDE }, scene);
  r.material=material; r.receiveShadows=true;
}

// ── Ecology scatter ───────────────────────────────────────────────────────────
export function scatterEcology(){
  for(let x=-480;x<=480;x+=5.0){
    for(let z=-170;z<=170;z+=5.0){
      const jx=(hash2(x*.21,z*.21)-.5)*2.8, jz=(hash2(z*.17,x*.17)-.5)*2.8;
      const px=x+jx, pz=z+jz;
      const pathD=footPathRoutes.length?nearestFootpathDist(px,pz):999;
      const spineD=nearestSpineDist(px,pz);
      if(pathD<1.6||spineD<3.8) continue;
      const slope=sampleSlope(px,pz);
      if(slope>0.52) continue;
      const biome=sampleBiomeField(px,pz);
      const profile=biomeProfiles[(clusterPalette[biome.dominant?.id]||{}).foliage||'grove']||biomeProfiles.grove;
      const density=profile.grassDensity*clamp(1-slope*1.35,0,1)*clamp(pathD/7,.15,1)*clamp(spineD/12,.3,1);
      const rnd=hash2(px*.19+9,pz*.19-4);
      if(rnd<density*.38) makeGrassClump(px,pz,.45+hash2(px*.31,pz*.31)*.65);
      if(rnd>.86&&profile.shrubDensity>.12&&pathD>3.0) makeShrub(px,pz,.42+hash2(px*.41,pz*.41)*.34);
      const foliageKind=(clusterPalette[biome.dominant?.id]||{}).foliage||'grove';
      if(rnd>.94&&foliageKind!=='scrub'&&foliageKind!=='garden'&&pathD>4.5&&spineD>6){
        const kinds=foliageKind==='pine'?['pine','pine','birch']:['round','round','birch','pine'];
        makeTree(px,pz,.65+hash2(px*.37,pz*.37)*.5, kinds[Math.floor(hash2(px*.29,pz*.29)*kinds.length)]);
      }
      if(rnd>.95&&hash2(px*.07,pz*.07)>.65&&pathD>2.8) makeGrassClump(px,pz,.35+hash2(px*.24,pz*.24)*.35);
    }
  }
}

// ── Terrain shader (applied after paths + clusters are known) ─────────────────
export function createTerrainLook(scene, camera, sun){
  const W=512, H=256;
  const surface = new BABYLON.DynamicTexture('terrainSurface',{width:W,height:H},scene,false);
  const mask    = new BABYLON.DynamicTexture('terrainMask',   {width:W,height:H},scene,false);
  const detail  = new BABYLON.DynamicTexture('terrainDetail', {width:256,height:256},scene,false);
  const sctx=surface.getContext(), mctx=mask.getContext(), dctx=detail.getContext();
  const img=sctx.createImageData(W,H), mimg=mctx.createImageData(W,H);

  for(let py=0;py<H;py++){
    for(let px=0;px<W;px++){
      const wx=(px/(W-1))*980-490, wz=(py/(H-1))*360-180;
      const h=terrainHeight(wx,wz), slope=sampleSlope(wx,wz);
      const pathD=footPathRoutes.length?nearestFootpathDist(wx,wz):999;
      const spineD=nearestSpineDist(wx,wz);
      const biome=sampleBiomeField(wx,wz);
      let base=new BABYLON.Color3(0.62,0.71,0.49);
      let meadowBoost=0, shrubBoost=0;
      biome.influence.forEach(({cluster,weight})=>{
        const prof=biomeProfiles[(clusterPalette[cluster.id]||{}).foliage||'grove']||biomeProfiles.grove;
        base=mixColor(base,hexColor(prof.ground),weight*1.15);
        meadowBoost+=prof.grassDensity*weight; shrubBoost+=prof.shrubDensity*weight;
      });
      const dry=valueNoise(wx*.022+31,wz*.022-17);
      const lush=clamp((1-slope)*1.15,0,1)*clamp(1-Math.max(0,h-8)/20,.4,1);
      const rock=clamp((slope-.22)/.48,0,1)*(0.65+clamp((h-4)/18,0,1)*.5);
      const pathMask=clamp(1-pathD/3.8,0,1);
      const spineMask=clamp(1-spineD/8.0,0,1)*.35;
      const dirtMask=clamp(pathMask+spineMask+clamp((dry-.78)/.22,0,1)*.3,0,1);
      let col=mixColor(base,hexColor('#8dae69'),lush*.28+meadowBoost*.08);
      col=mixColor(col,hexColor('#7d735c'),rock);
      col=mixColor(col,hexColor('#8d7659'),dirtMask*.85);
      col=mixColor(col,hexColor('#b3aa79'),clamp((dry-.62)/.38,0,1)*.35);
      const idx=(py*W+px)*4;
      img.data[idx]=Math.round(clamp(col.r,0,1)*255); img.data[idx+1]=Math.round(clamp(col.g,0,1)*255);
      img.data[idx+2]=Math.round(clamp(col.b,0,1)*255); img.data[idx+3]=255;
      mimg.data[idx]=Math.round(pathMask*255); mimg.data[idx+1]=Math.round(rock*255);
      mimg.data[idx+2]=Math.round(clamp(lush*.75+meadowBoost*.25-dirtMask*.3,0,1)*255); mimg.data[idx+3]=255;
    }
  }
  sctx.putImageData(img,0,0); mctx.putImageData(mimg,0,0);
  for(let y=0;y<256;y++) for(let x=0;x<256;x++){
    const n1=valueNoise(x*.045,y*.045), n2=fbm(x*.012,y*.012);
    const g=Math.floor((0.36+n1*.34+n2*.22)*255);
    dctx.fillStyle=`rgb(${g},${g-8},${g-12})`; dctx.fillRect(x,y,1,1);
  }
  surface.update(false); mask.update(false); detail.update(false);
  surface.wrapU=surface.wrapV=BABYLON.Texture.CLAMP_ADDRESSMODE;
  mask   .wrapU=mask   .wrapV=BABYLON.Texture.CLAMP_ADDRESSMODE;
  detail .wrapU=detail .wrapV=BABYLON.Texture.WRAP_ADDRESSMODE;

  BABYLON.Effect.ShadersStore.terrainVertexShader=`
    precision highp float;
    attribute vec3 position,normal; attribute vec2 uv;
    uniform mat4 worldViewProjection,world;
    varying vec3 vPos,vNormal; varying vec2 vUV;
    void main(void){
      vec4 wp=world*vec4(position,1.0); vPos=wp.xyz;
      vNormal=normalize((world*vec4(normal,0.0)).xyz); vUV=uv;
      gl_Position=worldViewProjection*vec4(position,1.0);
    }`;
  BABYLON.Effect.ShadersStore.terrainFragmentShader=`
    precision highp float;
    varying vec3 vPos,vNormal; varying vec2 vUV;
    uniform sampler2D surfaceMap,maskMap,detailMap,grassTileMap;
    uniform vec3 sunDir,fogColor,cameraPosition;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
      float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
      return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
    float fbmS(vec2 p){float v=0.,a=.5; for(int i=0;i<4;i++){v+=a*noise(p);p*=2.01;a*=.5;} return v;}
    void main(void){
      vec3 base=texture2D(surfaceMap,vUV).rgb;
      vec3 masks=texture2D(maskMap,vUV).rgb;
      vec3 det=texture2D(detailMap,vUV*vec2(9.,3.5)).rgb*2.-1.;
      float gt=fbmS(vPos.xz*.22)*.5+.5;
      vec4 gs=texture2D(grassTileMap,vPos.xz*.14);
      float gb=masks.b*(1.-masks.g)*(1.-masks.r)*.72;
      base=mix(base,gs.rgb*(.72+gt*.28),gb);
      float rn=fbmS(vPos.xz*.35)*.12;
      base=mix(base,base+vec3(rn*.8,rn*.75,rn*.7)-.06,masks.g);
      float dn=noise(vPos.xz*.8)*.06;
      base+=vec3(dn,dn*.8,dn*.5)*masks.r;
      vec3 n=normalize(vNormal+vec3(det.r*.22*(1.-masks.g),.12*(masks.b-masks.r),det.g*.22*(1.-masks.g)));
      vec3 L=normalize(-sunDir),V=normalize(cameraPosition-vPos),H=normalize(L+V);
      float sun=max(dot(n,L),0.),hm=.42+.58*clamp(n.y*.5+.5,0.,1.);
      float rim=pow(1.-max(dot(n,V),0.),3.),spec=pow(max(dot(n,H),0.),32.)*.15*(1.-masks.g);
      float ao=clamp(.7+vPos.y*.025,.5,1.);
      vec3 color=base*(.18+sun*1.+hm*.55)*ao+vec3(.95,.92,.85)*spec+vec3(.04,.06,.08)*rim*.22;
      color+=vec3(.15,.22,.05)*max(dot(-V,L),0.)*masks.b*.08;
      float fog=1.-exp(-distance(cameraPosition,vPos)*.002);
      gl_FragColor=vec4(mix(color,fogColor,clamp(fog,0.,.9)),1.);
    }`;

  const shader = new BABYLON.ShaderMaterial('terrainShader',scene,
    { vertex:'terrain', fragment:'terrain' },
    { attributes:['position','normal','uv'],
      uniforms:['worldViewProjection','world','sunDir','fogColor','cameraPosition'],
      samplers:['surfaceMap','maskMap','detailMap','grassTileMap'] });
  shader.setTexture('surfaceMap',surface); shader.setTexture('maskMap',mask); shader.setTexture('detailMap',detail);
  const grassTile=new BABYLON.Texture('/assets/sprites/grass.png',scene,false,true,BABYLON.Texture.BILINEAR_SAMPLINGMODE);
  grassTile.wrapU=grassTile.wrapV=BABYLON.Texture.WRAP_ADDRESSMODE;
  shader.setTexture('grassTileMap',grassTile);
  shader.setVector3('sunDir',sun.direction);
  shader.setColor3('fogColor',scene.fogColor);
  shader.setVector3('cameraPosition',camera.position);
  terrain.material=shader;
}
