---
section: ai
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 202">
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
  <rect width="728" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Input video</text>
  <text x="120" y="74" text-anchor="middle" class="sub">low-res frames</text>

  <rect x="30" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="144" text-anchor="middle" class="label">Pretrained weights</text>
  <text x="120" y="162" text-anchor="middle" class="sub">Apple checkpoints</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">SHARP pipeline</text>
  <text x="364" y="74" text-anchor="middle" class="sub">PyTorch + MPS</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Anchor net</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">frame align</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Fusion net</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">temporal merge</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="608" y="56" text-anchor="middle" class="label">Output video</text>
  <text x="608" y="74" text-anchor="middle" class="sub">4× super-resolved</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M210,148 L228,148 Q242,148 242,134 L242,74 Q242,60 256,60 L274,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="364" y="198" text-anchor="middle" class="sub">Apple SHARP — video super-resolution with MPS acceleration</text>
</svg>
