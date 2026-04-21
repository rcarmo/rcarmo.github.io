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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">GNOME Files</text>
  <text x="100" y="109" text-anchor="middle" class="sub">thumbnailer call</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">RAW/HEIC</text>
  <text x="330" y="68" text-anchor="middle" class="sub">dcraw · libheif</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">3D (STL/OBJ)</text>
  <text x="330" y="150" text-anchor="middle" class="sub">blender headless</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">PNG thumb</text>
  <text x="560" y="109" text-anchor="middle" class="sub">~256px cache</text>


  <polyline points="180,95 215,95 215,54 250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <polyline points="180,95 215,95 215,136 250,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,54 445,54 445,95 480,95" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,136 445,136 445,95 480,95" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
