---
section: libraries
status: archived
tagline: Pure-Python PNG rendering with zero dependencies — draw lines, rectangles, and text directly to PNG files.
logo: assets/logos-opt/pngcanvas.png
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
