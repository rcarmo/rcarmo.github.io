---
id: go-ds4
repo: rcarmo/go-ds4
section: ai-ml
status: active
created: 2026-05-08
logo: assets/logos-opt/go-ds4.png
tagline: Pure Go inference engine for DeepSeek V4 Flash — AVX2 + CUDA PTX, single static binary
---

## About
A pure Go inference engine for [DeepSeek V4 Flash](https://huggingface.co/deepseek-ai/DeepSeek-V3), ported from antirez's single-file C implementation. Single static binary, hand-written AVX2 + NEON SIMD kernels, Vulkan SPIR-V and CUDA PTX GPU compute, OpenAI-compatible API server. Runs the full 128 GB Q2-quantized model via mmap — 1.27 tok/s on CPU, 5.5× faster on GPU.

## How it works
The model has 43 layers with 256 routed MoE experts (IQ2_XXS/Q2_K) plus 1 shared expert (Q8_0) per layer. Multi-head Latent Attention with LoRA Q/O projections and compressed KV cache. Hyper-connections provide 4 parallel residual streams with Sinkhorn-normalized mixing. Safetensors weights are mmap'd directly — no conversion step. The inference pipeline: Token → F16 Embed → 43 layers × (HC-pre → Attn → HC-post → MoE → HC-post) → RMSNorm → Logits.

## Features
### ⚡ AVX2 + NEON SIMD
Hand-written assembly GEMM kernels from [go-pherence](go-pherence) — no cgo.

### 🖥 CUDA PTX + Vulkan SPIR-V
GPU compute kernels compiled at runtime. 5.5× CPU throughput on CUDA.

### 🦙 Full DeepSeek V4 Flash
43 layers, 256 MoE experts, MLA attention, hyper-connections, compressed KV cache.

### 🌐 OpenAI-compatible API
Drop-in `/v1/chat/completions` server with streaming.

### 📦 Single static binary
No Python, no cgo, no ONNX — `go build` and run.

### 🗺 mmap model loading
128 GB Q2 model served directly from disk — no loading step.

## Posts
- [My AI Model Tier List for mid-2026](https://taoofmac.com/space/blog/2026/07/11/1500) — 2026-07-17
- [Notes for May 3-10](https://taoofmac.com/space/notes/2026/05/10/1433) — 2026-05-11
- [The Local AI Moat](https://taoofmac.com/space/blog/2026/05/09/2130) — 2026-05-09


## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1066 178">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #90a8c0; }
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
  <rect width="1066" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Safetensors weights</text>
  <text x="120" y="74" text-anchor="middle" class="sub">128 GB Q2 via mmap</text>

  <rect x="262" y="22" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="319" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="409" y="56" text-anchor="middle" class="label">Inference engine</text>
  <text x="409" y="74" text-anchor="middle" class="sub">43-layer pipeline</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">MLA Attention</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">LoRA + KV cache</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">MoE FFN</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">256 experts top-6</text>
  <rect x="458" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="499" y="119" text-anchor="middle" class="label" style="font-size:11px">Hyper-conn</text>
  <text x="499" y="133" text-anchor="middle" class="sub" style="font-size:9px">4-stream mixing</text>

  <rect x="600" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="612" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="702" y="64" text-anchor="middle" class="label">Compute backends</text>
  <rect x="616" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="657" y="119" text-anchor="middle" class="label" style="font-size:11px">AVX2/NEON</text>
  <text x="657" y="133" text-anchor="middle" class="sub" style="font-size:9px">SIMD GEMM</text>
  <rect x="706" y="98" width="82" height="48" rx="6" class="box-slate"/>
  <text x="747" y="119" text-anchor="middle" class="label" style="font-size:11px">CUDA PTX</text>
  <text x="747" y="133" text-anchor="middle" class="sub" style="font-size:9px">GPU kernels</text>

  <rect x="856" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="946" y="56" text-anchor="middle" class="label">OpenAI API</text>
  <text x="946" y="74" text-anchor="middle" class="sub">/v1/chat/completions</text>

  <path d="M210,60 L319,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="265" y="54" text-anchor="middle" class="sub">mmap</text>
  <path d="M499,60 L612,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M792,60 L856,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="533" y="174" text-anchor="middle" class="sub">DeepSeek V4 Flash inference — pure Go, AVX2 + CUDA PTX</text>
</svg>
