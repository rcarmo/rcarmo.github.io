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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240">
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

  <rect x="20" y="78" width="150" height="72" rx="8" class="box"/>
  <text x="95" y="106" text-anchor="middle" class="label">Single RGB image</text>
  <text x="95" y="123" text-anchor="middle" class="sub">input frame</text>

  <rect x="230" y="32" width="190" height="72" rx="8" class="box-purple"/>
  <text x="325" y="60" text-anchor="middle" class="label">Sharp transformer</text>
  <text x="325" y="77" text-anchor="middle" class="sub">monocular depth encoder</text>

  <rect x="230" y="138" width="190" height="72" rx="8" class="box-accent"/>
  <text x="325" y="166" text-anchor="middle" class="label">Depth head</text>
  <text x="325" y="183" text-anchor="middle" class="sub">dense per-pixel depth</text>

  <rect x="460" y="32" width="130" height="72" rx="8" class="box-green"/>
  <text x="525" y="60" text-anchor="middle" class="label">Depth map</text>
  <text x="525" y="77" text-anchor="middle" class="sub">EXR / PNG export</text>

  <rect x="610" y="138" width="130" height="72" rx="8" class="box-warm"/>
  <text x="675" y="166" text-anchor="middle" class="label">Novel views</text>
  <text x="675" y="183" text-anchor="middle" class="sub">point-cloud warp</text>

  <rect x="460" y="138" width="130" height="30" rx="8" class="box"/>
  <text x="525" y="157" text-anchor="middle" class="sub">PyTorch MPS / Apple GPU</text>

  <line x1="170" y1="114" x2="226" y2="68" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="325" y1="106" x2="325" y2="134" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="420" y1="68" x2="456" y2="68" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="420" y1="174" x2="606" y2="174" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="228" text-anchor="middle" class="sub">on-device depth estimation and view synthesis on Apple Silicon</text>
</svg>
