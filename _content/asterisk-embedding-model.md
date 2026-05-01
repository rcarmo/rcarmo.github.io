---
section: ai
status: experimental
created: 2026-01-03
tagline: A small text embedding model trained for low-resource hardware — fast semantic search on a Raspberry Pi.
logo: assets/logos-opt/asterisk-embedding-model.png
---

## About
Asterisk is a compact sentence embedding model designed to run inference on low-resource hardware — Raspberry Pi, older x86 machines, or anything without a GPU. Trained on a curated corpus with efficiency as the primary constraint, it produces dense vector representations suitable for semantic search, clustering, and RAG retrieval pipelines at a fraction of the cost of larger models.

## How it works
The model architecture is a distilled transformer encoder, trained with a contrastive objective on sentence pairs. Weights are exported to ONNX for portable, runtime-agnostic inference. The repository includes training scripts, evaluation harnesses against standard STS benchmarks, and example inference code in Python and via the ONNX Runtime.

## Features
### 🥧 Raspberry Pi capable
Designed to run at useful speed on a 4-core ARM CPU — under 200 ms per sentence on a Pi 4 with the ONNX runtime.

### 📐 Compact embeddings
Produces 256-dimensional vectors — small enough to store millions of embeddings in RAM on modest hardware.

### 🎯 Contrastive training
Trained with a symmetric cross-entropy contrastive loss on sentence pairs — strong performance on semantic similarity despite the small size.

### 📦 ONNX export
Weights ship as an ONNX model — drop into any language with an ONNX Runtime binding: Go, Rust, C, Python, JavaScript.

### 🔬 Benchmark included
Evaluated against STS-B and SICK-R; results and training curves included in the repo for reproducibility.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Text input</text>
  <text x="120" y="74" text-anchor="middle" class="sub">sentence / query</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Tokenizer</text>
  <text x="360" y="74" text-anchor="middle" class="sub">WordPiece</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Distilled transformer</text>
  <text x="600" y="74" text-anchor="middle" class="sub">contrastive encoder</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">256-dim</text>
  <text x="840" y="74" text-anchor="middle" class="sub">vector</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="240" y="54" text-anchor="middle" class="sub">tokens</text>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="720" y="54" text-anchor="middle" class="sub">embed</text>

  <text x="480" y="110" text-anchor="middle" class="sub">small-footprint embeddings for semantic search, clustering, and RAG</text>
</svg>
