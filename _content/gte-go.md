---
section: ai
status: active
created: 2026-01-15
tagline: Pure Go GTE-Small text embeddings — hand-written SIMD, 1 allocation per embed, predictable flat latency.
---

## About
Forked from [antirez/gte-pure-C](https://github.com/antirez/gte-pure-C). A pure Go implementation of the [GTE-Small](https://huggingface.co/thenlper/gte-small) text embedding model. Produces 384-dimensional, L2-normalized embeddings suitable for similarity search and clustering.

Single static binary. 1 allocation per embed. Predictable flat latency. All matrix operations use hand-written SIMD assembly (AVX2+FMA on amd64, NEON on arm64) — no gonum, no goroutine churn, no CGo in the default build.

## How it works
Loads a converted GTE-Small model at startup, tokenises input with a bundled WordPiece tokeniser, runs matrix multiplications through hand-tuned SIMD kernels, and returns mean-pooled L2-normalized embeddings as a Go slice. The hot path has zero goroutine overhead and generates ~700 bytes/s of GC pressure at 100 qps — 10,000× less than a gonum BLAS equivalent.

## Features
### 🔢 384-dim embeddings
Returns L2-normalized 384-dimensional vectors compatible with GTE-Small's training distribution — plug directly into cosine similarity, FAISS, or any vector store.

### ⚡ Hand-written SIMD
AVX2+FMA on amd64, NEON on arm64 — non-temporal matmul, fused dot products, and packed transpose kernels written in Go assembly. No CGo required.

### 🧊 1 allocation per embed
The entire inference path allocates once (uppercase→lowercase token lowering). For all-lowercase input: **0 allocations**. GC pressure is ~700 B/s vs 13 MB/s with gonum BLAS.

### 📉 Flat latency
No goroutine churn means predictable p50/p99. Batching reduces jitter 3–5× further. Remaining spikes are Go runtime background work, not inference code.

### 📦 Static binary
Default `make` produces a fully self-contained static binary with no C dependencies — portable to any amd64 or arm64 target.

## Gallery
- [Optimization results](assets/screenshots/gte-go/optimization-results.svg) — 4-phase optimization from baseline to SIMD
- [Jitter plot](assets/screenshots/gte-go/jitter-plot.svg) — 5000-embed jitter across discrete and batched modes
- [Batch latency](assets/screenshots/gte-go/batch-latency.svg) — batch size vs latency scaling
- [GOGC comparison](assets/screenshots/gte-go/gogc-comparison.svg) — GC pressure under different GOGC settings

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 818 202">
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
  <rect width="818" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Input text</text>
  <text x="120" y="74" text-anchor="middle" class="sub">query or document</text>

  <rect x="30" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="144" text-anchor="middle" class="label">GGUF weights</text>
  <text x="120" y="162" text-anchor="middle" class="sub">23 MB model file</text>

  <rect x="262" y="22" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="319" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="409" y="56" text-anchor="middle" class="label">Embed pipeline</text>
  <text x="409" y="74" text-anchor="middle" class="sub">single static binary</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Tokenizer</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">WordPiece</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">6L Attention</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">BERT encoder</text>
  <rect x="458" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="499" y="119" text-anchor="middle" class="label" style="font-size:11px">Mean pool</text>
  <text x="499" y="133" text-anchor="middle" class="sub" style="font-size:9px">L2 normalize</text>

  <rect x="608" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="698" y="56" text-anchor="middle" class="label">384-dim vector</text>
  <text x="698" y="74" text-anchor="middle" class="sub">similarity · clustering</text>

  <path d="M210,60 L319,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M210,148 L251,148 Q265,148 265,134 L265,74 Q265,60 279,60 L319,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M499,60 L608,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="409" y="198" text-anchor="middle" class="sub">Pure Go GTE-small — single binary, 1 alloc per embed, flat latency</text>
</svg>

## Posts
- [GTE-Small in Go](https://taoofmac.com/space/blog/2025/03/22/1900) — 2025-03-22
