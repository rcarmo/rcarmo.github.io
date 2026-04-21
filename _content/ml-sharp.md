---
section: ai-ml
status: active
created: 2025-12-16
tagline: Sharp monocular view synthesis for Apple Silicon — depth-aware novel view generation on-device via MPS.
logo: assets/logos-opt/ml-sharp.gif
---

## About
Forked from [apple/ml-sharp](https://github.com/apple/ml-sharp). Adds Apple Silicon MPS support and Gradio demo to Apple's official Sharp depth model.

ml-sharp runs the Sharp monocular depth estimation and novel view synthesis pipeline natively on Apple Silicon using PyTorch MPS acceleration. Feed it a single image and it produces depth maps and synthesised views from alternative camera angles — no NVIDIA GPU, no cloud API, just the M-series Neural Engine and GPU doing the work locally.

## How it works
The Sharp model architecture uses a transformer encoder to estimate per-pixel depth from a single RGB image, then applies a point-cloud warp to synthesise views from nearby camera positions. Running on MPS gives 5–10× speedup over CPU on M1/M2/M3 chips. The pipeline includes preprocessing scripts, a Gradio demo interface, and export utilities for depth maps as EXR or PNG.

## Features
### 🍎 Apple Silicon native
Uses PyTorch MPS backend — runs on M1 through M4 chips with full GPU acceleration, no CUDA required.

### 🔭 Novel view synthesis
Generate plausible views from camera positions never seen during capture — useful for parallax effects and 3D previews.

### 🗺️ Depth map export
Export dense per-pixel depth maps as 16-bit EXR or normalised PNG — feed into compositing tools or 3D pipelines.

### 🖥️ Gradio demo
Interactive web UI for uploading an image and previewing depth and synthesised views in the browser.

### 📦 pip-installable
Standard Python package with pinned dependencies — `pip install -r requirements.txt` and it runs.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220">
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
  <rect x="20" y="70" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="108" text-anchor="middle" class="label">Single RGB</text>
  <text x="80" y="123" text-anchor="middle" class="sub">image input</text>
  <rect x="200" y="20" width="140" height="60" rx="8" class="box-purple"/>
  <text x="270" y="53" text-anchor="middle" class="label">Transformer</text>
  <text x="270" y="68" text-anchor="middle" class="sub">encoder (Sharp)</text>
  <rect x="200" y="110" width="140" height="60" rx="8" class="box-accent"/>
  <text x="270" y="143" text-anchor="middle" class="label">Depth head</text>
  <text x="270" y="158" text-anchor="middle" class="sub">per-pixel depth</text>
  <rect x="420" y="20" width="130" height="60" rx="8" class="box-green"/>
  <text x="485" y="53" text-anchor="middle" class="label">Depth map</text>
  <text x="485" y="68" text-anchor="middle" class="sub">16-bit EXR/PNG</text>
  <rect x="420" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="485" y="143" text-anchor="middle" class="label">Novel views</text>
  <text x="485" y="158" text-anchor="middle" class="sub">point-cloud warp</text>
  <linex1="140" y1="110" x2="200" y2="80" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="340" y1="50" x2="420" y2="50" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="270" y1="80" x2="270" y2="110" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
  <linex1="340" y1="140" x2="420" y2="140" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
  <text x="305" y="96" text-anchor="middle" class="sub">MPS/GPU</text>
</svg>
