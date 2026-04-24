---
section: ai-ml
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 280">
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

  <!-- Input -->
  <rect x="20" y="100" width="120" height="64" rx="8" class="box"/>
  <text x="80" y="126" text-anchor="middle" class="label">Go string</text>
  <text x="80" y="142" text-anchor="middle" class="sub">text input</text>

  <!-- Tokenizer -->
  <rect x="190" y="100" width="130" height="64" rx="8" class="box-accent"/>
  <text x="255" y="126" text-anchor="middle" class="label">WordPiece</text>
  <text x="255" y="142" text-anchor="middle" class="sub">tokenizer in Go</text>

  <!-- SIMD Kernels -->
  <rect x="370" y="80" width="160" height="104" rx="8" class="box-purple"/>
  <text x="450" y="108" text-anchor="middle" class="label">SIMD Kernels</text>
  <text x="450" y="126" text-anchor="middle" class="sub">AVX2+FMA / NEON</text>
  <text x="450" y="144" text-anchor="middle" class="sub">NT matmul, dot, pack</text>
  <text x="450" y="162" text-anchor="middle" class="sub">1 alloc, 0 goroutines</text>

  <!-- Output -->
  <rect x="580" y="100" width="100" height="64" rx="8" class="box-green"/>
  <text x="630" y="126" text-anchor="middle" class="label">[]float32</text>
  <text x="630" y="142" text-anchor="middle" class="sub">384-dim L2-norm</text>

  <!-- Model file -->
  <rect x="390" y="20" width="120" height="36" rx="8" class="box-warm"/>
  <text x="450" y="43" text-anchor="middle" class="sub">.gtemodel weights</text>

  <!-- Perf box -->
  <rect x="370" y="210" width="160" height="48" rx="8" class="box"/>
  <text x="450" y="232" text-anchor="middle" class="sub">~10ms/embed amd64</text>
  <text x="450" y="248" text-anchor="middle" class="sub">~700 B/s GC pressure</text>

  <!-- Arrows -->
  <line x1="140" y1="132" x2="186" y2="132" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="320" y1="132" x2="366" y2="132" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="530" y1="132" x2="576" y2="132" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="450" y1="56" x2="450" y2="76" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="450" y1="184" x2="450" y2="206" stroke="#5070a0" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#ah)"/>

  <text x="390" y="270" text-anchor="middle" class="sub">pure Go + SIMD assembly — no CGo, no gonum, no goroutine churn</text>
</svg>

## Posts
- [GTE-Small in Go](https://taoofmac.com/space/blog/2025/03/22/1900) — 2025-03-22
