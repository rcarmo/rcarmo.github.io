---
id: go-pherence
repo: rcarmo/go-pherence
section: ai-ml
tagline: Minimal tensor framework in pure Go — SIMD assembly, GPU compute, runs LLMs
---

## About
A minimal tensor computation framework in pure Go with SIMD assembly and GPU compute, inspired by tinygrad. Lazy tensor DAG with elementwise fusion, pattern-matching graph rewrite, and enough infrastructure to run LLaMA and BERT models from safetensors weights — no Python, no cgo, no ONNX.

## How it works
The core is a lazy tensor DAG: operations build a computation graph that is fused and optimized before execution. A tinygrad-style pattern matcher applies 16 rewrite rules for kernel fusion. SIMD GEMM kernels (AVX2 on x86, NEON on ARM) handle matrix math, with GPU DevBuf providing device-agnostic buffers that lazy-transfer between CPU and GPU. LLaMA decoding uses RoPE, GQA, KV cache, and SiLU MLP; BERT encoding matches [go-gte](go-gte) parity at 10.8ms per embed with zero allocations.

## Features

### 🧮 Lazy tensor DAG
Elementwise fusion gives 2× throughput for chained ops. Pattern matcher + graph rewrite with 16 rules.

### ⚡ SIMD GEMM kernels
AVX2 VGATHERDPS on x86, NEON GEBP on ARM — ported from [go-gte](go-gte).

### 🦙 LLaMA decoder
RoPE, grouped-query attention, KV cache, SiLU MLP, RMS norm — loads safetensors/GPTQ INT4.

### 🧠 BERT encoder
GTE-small at go-gte parity — 10.8ms, 0 allocs per embed.

### 🖥 GPU compute
Device-agnostic DevBuf with lazy CPU↔GPU transfer. 8 PTX kernels compiled at runtime.

### 📦 Zero dependencies
Pure Go + assembly. No Python, no cgo, no ONNX runtime.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 984 178">
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
  <rect width="984" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Model weights</text>
  <text x="120" y="74" text-anchor="middle" class="sub">safetensors / GPTQ INT4</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">Lazy tensor DAG</text>
  <text x="364" y="74" text-anchor="middle" class="sub">fusion + graph rewrite</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Pattern match</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">16 rewrite rules</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Op fusion</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">elementwise 2×</text>

  <rect x="510" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="522" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="612" y="64" text-anchor="middle" class="label">Compute backends</text>
  <rect x="526" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="567" y="119" text-anchor="middle" class="label" style="font-size:11px">SIMD GEMM</text>
  <text x="567" y="133" text-anchor="middle" class="sub" style="font-size:9px">AVX2 / NEON</text>
  <rect x="616" y="98" width="82" height="48" rx="6" class="box-slate"/>
  <text x="657" y="119" text-anchor="middle" class="label" style="font-size:11px">GPU DevBuf</text>
  <text x="657" y="133" text-anchor="middle" class="sub" style="font-size:9px">PTX kernels</text>

  <rect x="758" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="770" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="860" y="64" text-anchor="middle" class="label">Model inference</text>
  <rect x="774" y="98" width="82" height="48" rx="6" class="box-orange"/>
  <text x="815" y="119" text-anchor="middle" class="label" style="font-size:11px">LLaMA</text>
  <text x="815" y="133" text-anchor="middle" class="sub" style="font-size:9px">decoder</text>
  <rect x="864" y="98" width="82" height="48" rx="6" class="box-orange"/>
  <text x="905" y="119" text-anchor="middle" class="label" style="font-size:11px">BERT</text>
  <text x="905" y="133" text-anchor="middle" class="sub" style="font-size:9px">encoder</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L522,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M702,60 L770,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="492" y="174" text-anchor="middle" class="sub">Pure Go tensor framework — lazy DAG, SIMD + GPU kernels, LLM inference</text>
</svg>
