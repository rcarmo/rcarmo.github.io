---
id: llama-cpp
repo: rcarmo/llama-cpp
section: ai-ml
status: active
created: 2026-06-09
logo: assets/logos-opt/llama-cpp.png
tagline: Measured llama.cpp fork for long-context local inference on Intel and SpaceMIT K3 hardware.
---

## About
This [`llama.cpp`](https://github.com/ggml-org/llama.cpp) fork is a measured inference stack for two constrained machines: a LattePanda Sigma with an Intel Core i5-1340P, and SpaceMIT K3 boards with RVV and IME acceleration.

Optimisations are promoted only when complete model and service workloads improve. The repository records rejected kernels, offload paths and cache designs alongside the selected profiles.

## How it works
On the Sigma, a native Clang CPU build runs mmap-backed target and assistant GGUFs on eight pinned P-core threads. The deployed Gemma service exposes an OpenAI-compatible loopback endpoint to Pi, with two independent KV streams, prompt reuse and bounded checkpoint storage.

The K3 backend adds RVV kernels, IME1/IME2 dispatch, TCM staging, AI-core affinity and load-time weight repacking. Platform-specific paths remain gated by output checks, complete-model throughput and service behaviour.

## Features
### Intel local provider
Gemma 4 E4B is the primary local model, with Qwen retained for repository-grounded work and Maple for fast prompt ingestion.

### Long-context validation
Gemma and Ornith completed near-capacity 128K requests. The Qwen rollback profile accepted an uninterrupted 99,104-token input.

### Expert I/O
Router-aware prefetching maps selected GGUF expert ranges, checks page residency and advises only nonresident data under bounded policy.

### Speculative decoding
Target and assistant models use deterministic checkpoint restoration, model-shaped fixtures, semantic replay and per-phase telemetry.

### SpaceMIT backend
Adds RVV, IME and TCM paths, quantised-weight repacking, routed-MoE handling and optional compact-IQ tile caching.

### Measured rejection
Iris Xe Vulkan and SYCL remain validation targets; their local kernel wins did not survive end-to-end promotion gates.

## Posts
- [My AI Model Tier List for mid-2026](https://taoofmac.com/space/blog/2026/07/11/1500) — 2026-07-17

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 202">
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
  <rect width="1200" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Pi client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">OpenAI-compatible API</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Local provider</text>
  <text x="360" y="74" text-anchor="middle" class="sub">systemd · 2 KV slots</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="56" text-anchor="middle" class="label">GGUF models</text>
  <text x="600" y="74" text-anchor="middle" class="sub">target · assistant · mmap</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="840" y="56" text-anchor="middle" class="label">Intel CPU path</text>
  <text x="840" y="74" text-anchor="middle" class="sub">8 pinned threads · AVX-VNNI</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="840" y="144" text-anchor="middle" class="label">SpaceMIT path</text>
  <text x="840" y="162" text-anchor="middle" class="sub">RVV · IME · TCM</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Measured response</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">telemetry · promotion gates</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,60 L706,60 Q720,60 720,74 L720,134 Q720,148 734,148 L750,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M930,148 L946,148 Q960,148 960,134 L960,74 Q960,60 974,60 L990,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Measured local inference profiles on constrained hardware</text>
</svg>
