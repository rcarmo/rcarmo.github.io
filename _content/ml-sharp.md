---
section: ai-ml
status: active
tagline: Sharp monocular view synthesis for Apple Silicon — depth-aware novel view generation on-device via MPS.
logo: assets/logos-opt/ml-sharp.png
---

## About
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
