---
section: ai-ml
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">
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
  <rect x="20" y="60" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="98" text-anchor="middle" class="label">Text input</text>
  <text x="80" y="113" text-anchor="middle" class="sub">sentence</text>
  <rect x="200" y="20" width="140" height="60" rx="8" class="box-purple"/>
  <text x="270" y="53" text-anchor="middle" class="label">Tokenizer</text>
  <text x="270" y="68" text-anchor="middle" class="sub">WordPiece</text>
  <rect x="200" y="110" width="140" height="60" rx="8" class="box-accent"/>
  <text x="270" y="143" text-anchor="middle" class="label">Transformer</text>
  <text x="270" y="158" text-anchor="middle" class="sub">distilled encoder</text>
  <rect x="420" y="60" width="130" height="80" rx="8" class="box-green"/>
  <text x="485" y="98" text-anchor="middle" class="label">256-dim</text>
  <text x="485" y="113" text-anchor="middle" class="sub">embedding</text>
  <linex1="140" y1="100" x2="200" y2="80" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="200" y1="140" x2="200" y2="50" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="340" y1="140" x2="420" y2="110" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
  <linex1="340" y1="50" x2="420" y2="80" stroke-width="1.5" marker-end="url(#ah)"/ stroke="#5070a0"/>
  <text x="270" y="96" text-anchor="middle" class="sub">ONNX Runtime</text>
</svg>
