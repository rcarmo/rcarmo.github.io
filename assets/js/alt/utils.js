// ── Pure math utilities ──────────────────────────────────────────────────────
export function fract(x)       { return x - Math.floor(x); }
export function hash2(x,z)     { return fract(Math.sin(x*127.1 + z*311.7) * 43758.5453123); }
export function lerp(a,b,t)    { return a + (b-a)*t; }
export function smoothstep(t)  { return t*t*(3-2*t); }
export function clamp(v,lo,hi) { return Math.max(lo, Math.min(hi, v)); }
export function mixColor(a,b,t){
  return new BABYLON.Color3(lerp(a.r,b.r,t), lerp(a.g,b.g,t), lerp(a.b,b.b,t));
}
export function valueNoise(x,z){
  const xi=Math.floor(x), zi=Math.floor(z);
  const xf=x-xi, zf=z-zi;
  const h00=hash2(xi,zi), h10=hash2(xi+1,zi), h01=hash2(xi,zi+1), h11=hash2(xi+1,zi+1);
  const u=smoothstep(xf), v=smoothstep(zf);
  return lerp(lerp(h00,h10,u), lerp(h01,h11,u), v);
}
export function fbm(x,z){
  let t=0, a=1, f=1, sum=0;
  for(let i=0;i<5;i++){ t += valueNoise(x*f, z*f)*a; sum+=a; a*=0.5; f*=2; }
  return t/sum;
}
export function escHtml(s){
  return String(s||'').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}
export function hexColor(hex){ return BABYLON.Color3.FromHexString(hex); }
