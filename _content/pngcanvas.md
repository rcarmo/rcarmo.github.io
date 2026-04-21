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
  <text x="100" y="91" text-anchor="middle" class="label">Python script</text>
  <text x="100" y="109" text-anchor="middle" class="sub">your code</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">Canvas API</text>
  <text x="330" y="68" text-anchor="middle" class="sub">draw · fill · text</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">PNG encoder</text>
  <text x="330" y="150" text-anchor="middle" class="sub">zlib · struct</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">.png file</text>
  <text x="560" y="109" text-anchor="middle" class="sub">any fileobj</text>


  <polyline points="180,95 215,95 215,54 250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <polyline points="180,95 215,95 215,136 250,136" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <polyline points="410,54 445,54 445,95 480,95" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <polyline points="410,136 445,136 445,95 480,95" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
</svg>
