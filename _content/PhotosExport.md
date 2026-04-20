---
section: macos
status: stable
created: 2025-12-27
tagline: Export your complete Apple Photos library — originals, edits, Live Photos, metadata.
logo: assets/logos-opt/missing-1.png
---

## About
PhotosExport uses PhotoKit to export every PHAssetResource: originals, edited renders, Live Photo video pairs, burst frames, adjustment data. Deterministic YYYY/MM folder hierarchy, collision-safe naming, full JSON album manifest.

## How it works
PhotoKit sees everything Photos.app stores — not just what the export UI exposes. For each asset, it fetches all resource types: original file, edited full-size render, Live Photo video component, burst frames, and raw adjustment data. Files get deterministic timestamp names stable across re-runs. The JSON manifest records full album and folder membership.

## Features
### 📸 Every resource
Originals, edits, Live Photo videos, burst frames, adjustment data.

### 📂 Deterministic names
YYYYMMDDHHMMSSx.ext — stable, collision-safe.

### 🗂 Album manifest
JSON sidecar preserving album, smart album, and folder structure.

### 📋 Visible errors
Nothing fails silently — export_errors.log for every failure.

## Posts
- [We Can't Remember It For You Wholesale](https://taoofmac.com/space/blog/2016/09/25/1050) — 2016-09-25
- [Renaming and Filing Photos and Videos in the HEIC/HEIF era](https://taoofmac.com/space/blog/2023/01/14/1745) — 2023-01-14

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 160" width="480" height="160">
  <style>
    .bg{ fill: transparent; }
    .box{ fill: #161b22; stroke: #30363d; stroke-width:1.5; }
    .box-accent{ fill: #0d2040; stroke: #2b6cb0; stroke-width:1.5; }
    .box-green{ fill: #0a2218; stroke: #2a7a3a; stroke-width:1.5; }
    .box-warm{ fill: #221810; stroke: #c87020; stroke-width:1.5; }
    text{ font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; fill: #c9d1d9; }
    .label{ font-size: 12px; font-weight: 600; }
    .sub{ font-size: 10px; fill: #8b949e; }
    line{ stroke-width:1.5; }
    .arr{ stroke: #58a6ff; marker-end: url(#a); }
    .arrd{ stroke: #8b949e; marker-end: url(#ad); stroke-dasharray:4,3; }
  </style>
  <defs>
    <marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#58a6ff"/>
    </marker>
    <marker id="ad" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#8b949e"/>
    </marker>
  </defs>
  <rect width="480" height="160" class="bg" rx="8"/>
  
  <rect x="20" y="50" width="90" height="60" rx="5" class="box-accent"/><text x="65" y="77" text-anchor="middle" class="label">Photos.app</text><text x="65" y="91" text-anchor="middle" class="sub">library</text>
  <line x1="110" y1="80" x2="150" y2="80" class="arr"/>
  <text x="130" y="70" class="sub">PhotoKit</text>
  <rect x="150" y="50" width="110" height="60" rx="5" class="box-green"/><text x="205" y="77" text-anchor="middle" class="label">PhotosExport</text><text x="205" y="91" text-anchor="middle" class="sub">Swift CLI</text>
  <line x1="260" y1="65" x2="300" y2="55" class="arr"/>
  <line x1="260" y1="80" x2="300" y2="80" class="arr"/>
  <line x1="260" y1="95" x2="300" y2="105" class="arr"/>
  <rect x="300" y="42" width="140" height="30" rx="5" class="box"/><text x="370" y="62" text-anchor="middle" class="label">originals + edits</text>
  <rect x="300" y="76" width="140" height="30" rx="5" class="box"/><text x="370" y="96" text-anchor="middle" class="label">EXIF / XMP intact</text>
  <rect x="300" y="110" width="140" height="30" rx="5" class="box"/><text x="370" y="130" text-anchor="middle" class="label">YYYY/MM hierarchy + JSON</text>
  <text x="240" y="150" text-anchor="middle" class="sub">macOS PhotoKit framework — no private APIs</text>

</svg>
