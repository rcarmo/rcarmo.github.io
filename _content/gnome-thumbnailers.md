---
section: libraries
status: maintained
created: 2022-12-13
tagline: File thumbnails for RAW, HEIC, and 3D models in GNOME Files.
logo: assets/logos-opt/gnome-thumbnailers.png
---

## About
Python thumbnailer scripts adding GNOME Files thumbnail support for RAW photos (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF, and FBX/OBJ/STL 3D models. Register with make install — no restart required.

## How it works
Each script takes a source path and target PNG path. GNOME's thumbnailer infrastructure calls these in a bwrap sandbox when it encounters a registered MIME type. Scripts exit cleanly if a required library is missing — GNOME silently skips that file type without crashing anything.

## Features
### 📷 RAW formats
CR2, NEF, ARW, ORF, RW2 via rawpy.

### 🍎 HEIC/HEIF
Via Pillow's HEIF plugin.

### 🧊 3D files
FBX, OBJ, STL thumbnail renders.

### 🔧 Drop-in
make install, thumbnails appear immediately.

## Posts
- [You Can Leave Your Hat On](https://taoofmac.com/space/blog/2022/04/02/2130) — 2022-04-02
- [Homelab Update](https://taoofmac.com/space/blog/2022/10/28/1900) — 2022-10-28

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="50" width="110" height="80" rx="8" class="box"/>
  <text x="75" y="88" text-anchor="middle" class="label">GNOME Files</text>
  <text x="75" y="103" text-anchor="middle" class="sub">thumbnailer call</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">RAW/HEIC</text>
  <text x="265" y="68" text-anchor="middle" class="sub">dcraw · libheif</text>
  <rect x="200" y="100" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="133" text-anchor="middle" class="label">3D (STL/OBJ)</text>
  <text x="265" y="148" text-anchor="middle" class="sub">blender headless</text>
  <rect x="400" y="50" width="120" height="80" rx="8" class="box-b"/>
  <text x="460" y="88" text-anchor="middle" class="label">PNG thumb</text>
  <text x="460" y="103" text-anchor="middle" class="sub">~256px cache</text>
  <line x1="130" y1="90" x2="200" y2="70" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="130" y1="105" x2="200" y2="130" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="70" x2="400" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="130" x2="400" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
