---
section: libraries
status: archived
created: 2013-12-27
tagline: Pure-Python PNG rendering with zero dependencies — draw lines, rectangles, and text directly to PNG files.
---

## About
pngcanvas is a minimalist Python library for generating PNG images from scratch without Pillow, ImageMagick, or any other dependency. Draw lines, filled rectangles, text, and basic shapes using a simple canvas API, then write the result to a PNG file. Originally built for constrained environments — embedded systems, serverless functions, CGI scripts — where pulling in a full imaging library is impractical. ★44 with 9 forks, still referenced regularly.

## How it works
The library implements the PNG format spec directly: an IHDR chunk, IDAT chunk (with raw pixel data compressed via the Python standard library's zlib), and IEND chunk. Drawing operations modify an in-memory RGBA pixel array. Text rendering uses a bundled bitmap font. The resulting PNG is written to any file-like object — no temp files, no external processes.

## Features
### 🐍 Zero dependencies
Uses only the Python standard library — `zlib` for compression, `struct` for binary packing. Works on any Python 2.7+ or 3.x.

### 🎨 Drawing primitives
Lines, filled and outlined rectangles, circles, and arbitrary polygon fills via scanline rasterisation.

### 🔤 Bitmap text
Bundled bitmap font for rendering ASCII labels directly onto the canvas — useful for charts and diagrams.

### 💾 Any file target
`canvas.dump(fileobj)` writes to any file-like object — disk file, BytesIO buffer, HTTP response body.

### 📦 Single-file library
The entire library is one Python file — copy it into your project and import it with no installation.

## Posts
- [Python](https://taoofmac.com/space/dev/python) — 2026-04-25

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 208">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="780" height="208" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-teal"/>
  <text x="120" y="56" text-anchor="middle" class="label">Python script</text>
  <text x="120" y="74" text-anchor="middle" class="sub">your code</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="380" y="56" text-anchor="middle" class="label">Canvas API</text>
  <text x="380" y="74" text-anchor="middle" class="sub">draw · fill · text</text>

  <rect x="290" y="118" width="180" height="60" rx="8" class="box-warm"/>
  <text x="380" y="144" text-anchor="middle" class="label">PNG encoder</text>
  <text x="380" y="162" text-anchor="middle" class="sub">zlib · struct</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="640" y="56" text-anchor="middle" class="label">.png file</text>
  <text x="640" y="74" text-anchor="middle" class="sub">any fileobj</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,134 Q250,148 264,148 L290,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L496,148 Q510,148 510,134 L510,74 Q510,60 524,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
