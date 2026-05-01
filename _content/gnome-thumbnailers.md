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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 188">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="720" height="188" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="120" y="56" text-anchor="middle" class="label">GNOME Files</text>
  <text x="120" y="74" text-anchor="middle" class="sub">thumbnailer call</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">RAW/HEIC</text>
  <text x="360" y="74" text-anchor="middle" class="sub">dcraw · libheif</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box-warm"/>
  <text x="360" y="144" text-anchor="middle" class="label">3D (STL/OBJ)</text>
  <text x="360" y="162" text-anchor="middle" class="sub">blender headless</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="56" text-anchor="middle" class="label">PNG thumb</text>
  <text x="600" y="74" text-anchor="middle" class="sub">~256px cache</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,134 Q240,148 254,148 L270,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L466,148 Q480,148 480,134 L480,74 Q480,60 494,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
