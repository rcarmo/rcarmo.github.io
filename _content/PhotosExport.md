---
section: apple
status: stable
created: 2025-12-27
tagline: Export your complete Apple Photos library — originals, edits, Live Photos, metadata.
logo: assets/logos-opt/PhotosExport.png
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 312">
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
  <rect width="660" height="312" class="bg" rx="8"/>

  <rect x="20" y="106" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="132" text-anchor="middle" class="label">Photos.app</text>
  <text x="100" y="150" text-anchor="middle" class="sub">library</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="132" text-anchor="middle" class="label">PhotosExport</text>
  <text x="330" y="150" text-anchor="middle" class="sub">Swift CLI</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="58" text-anchor="middle" class="label">originals + edits</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="140" text-anchor="middle" class="label">EXIF / XMP intact</text>

  <rect x="480" y="188" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="214" text-anchor="middle" class="label">YYYY/MM hierarchy</text>
  <text x="560" y="232" text-anchor="middle" class="sub">+ JSON</text>

  <text x="330" y="300" text-anchor="middle" class="sub">macOS PhotoKit framework — no private APIs</text>

  <path d="M180,136 L250,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M410,136 L435,136 Q445,136 445,126 L445,64 Q445,54 455,54 L480,54" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M410,136 L480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
