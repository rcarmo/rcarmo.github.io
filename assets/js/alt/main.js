// ── Main: orchestration, data load, progress ─────────────────────────────────
import { initScene, engine, scene, camera, sun, shadowGen, canvas } from './scene.js';
import { initTerrain, terrain, spinePath, nearestSpineDist }        from './terrain.js';
import { initFoliage, makeTree, makeShrub }                         from './foliage.js';
import { clusterPalette, clusterAnchors, initWorld,
         scatterClusterFoliage, createFootpaths,
         createTerrainLook, scatterEcology }                         from './world.js';
import { initNav }                                                   from './nav.js';

(async function () {
  const loading   = document.getElementById('loading');
  const loadLabel = document.getElementById('loading-label');
  const loadBar   = document.getElementById('loading-bar-fill');
  function progress(pct, label) {
    loadBar.style.width = pct + '%';
    if(label) loadLabel.textContent = label;
    return new Promise(r => setTimeout(r, 0));
  }

  // ── Load project data from index.html ───────────────────────────────────────
  async function loadProjects() {
    const html = await (await fetch('/index.html', { cache:'no-cache' })).text();
    const doc  = new DOMParser().parseFromString(html, 'text/html');
    return [...doc.querySelectorAll('.idx-section')].map((sec, idx) => {
      const id = sec.id ? sec.id.replace(/^section-/,'') : (idx===0?'featured':`section-${idx}`);
      return {
        id,
        label:    sec.querySelector('.idx-section-title')?.textContent?.trim()||'Projects',
        projects: [...sec.querySelectorAll('.card')].map(c=>({
          name:  c.querySelector('.card-name')    ?.textContent?.trim()||'project',
          desc:  c.querySelector('.card-tagline') ?.textContent?.trim()||'',
          url:   c.getAttribute('href')||'#',
          logo:  c.querySelector('img')?.getAttribute('src')||'',
          repo:  c.getAttribute('data-repo')||'',
        })),
      };
    }).filter(s => s.projects.length);
  }

  // ── Boot ────────────────────────────────────────────────────────────────────
  const sections = await loadProjects();
  await progress(5, 'Setting up scene…');

  initScene();
  await progress(10, 'Generating terrain…');

  await initTerrain(scene, shadowGen);
  await progress(20, 'Building terrain…');

  initFoliage(scene);
  await progress(30, 'Preparing foliage…');

  // Spine foliage bands (before clusters so path-avoidance works)
  for(let i=0;i<220;i++){
    const x=-470+i*4.4;
    const zA=Math.sin(i*.28)*30+42+(i%7)*2.5;
    const zB=Math.cos(i*.19)*24-42-(i%5)*2.2;
    const kinds=['round','pine','birch'];
    if(nearestSpineDist(x,zA)>14) makeTree(x,zA,.8+(i%4)*.14,kinds[i%3]);
    if(nearestSpineDist(x,zB)>14) makeTree(x,zB,.75+(i%3)*.2,kinds[(i+1)%3]);
    if(i%2===0&&nearestSpineDist(x,zA-8)>10) makeShrub(x+1.4,zA-8,.55+(i%5)*.06);
    if(i%3===0&&nearestSpineDist(x,zB+7)>10) makeShrub(x-1.2,zB+7,.48+(i%4)*.07);
  }
  await progress(40, 'Planting trees…');

  const navEl = document.getElementById('cluster-nav');
  initWorld(scene, shadowGen, sections, navEl);
  await progress(50, 'Building clusters…');

  // Per-cluster foliage
  clusterAnchors.forEach((ca, idx) => {
    const palette = clusterPalette[ca.id] || { foliage:'grove' };
    const spineIdx = Math.floor((idx+1)*(spinePath.length-20)/(clusterAnchors.length+1));
    const center = spinePath[spineIdx];
    const prev   = spinePath[Math.max(0,spineIdx-1)];
    const next   = spinePath[Math.min(spinePath.length-1,spineIdx+1)];
    const tangent= next.subtract(prev).normalize();
    const normal = new BABYLON.Vector3(-tangent.z,0,tangent.x);
    const side   = idx%2===0?1:-1;
    scatterClusterFoliage(ca.anchor, tangent.scale(side), normal.scale(side), palette);
  });

  createFootpaths(scene);
  await progress(65, 'Connecting paths…');

  createTerrainLook(scene, camera, sun);
  await progress(82, 'Painting terrain…');

  scatterEcology();
  await progress(97, 'Almost there…');

  initNav({ scene, camera, canvas, engine, sun, terrain });

  await progress(100, 'Ready!');
  loading.classList.add('hidden');
})();
