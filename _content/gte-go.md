---
section: ai-ml
status: active
created: 2026-01-15
tagline: Go inference for the GTE Small text embedding model — local semantic search with no Python required.
---

## About
Forked from [antirez/gte-pure-C](https://github.com/antirez/gte-pure-C). Complete rewrite in Go with ONNX Runtime backend for embeddable library use.

gte-go runs the GTE Small sentence embedding model entirely in Go using ONNX Runtime. Feed it a string, get back a 384-dimensional float32 vector — ready for cosine similarity, nearest-neighbour search, or any other semantic retrieval task. No Python, no PyTorch, no GPU required; compiles to a single binary that works on any platform ONNX Runtime supports.

## How it works
Loads the GTE Small ONNX model at startup, tokenises input text with a bundled WordPiece tokeniser, runs a forward pass through the transformer, and returns the mean-pooled embedding as a Go slice. The heavy lifting is delegated to the ONNX Runtime C library via cgo bindings, keeping the Go code minimal and the inference path fast.

## Features
### 🔢 384-dim embeddings
Returns normalised 384-dimensional vectors compatible with GTE Small's training distribution — plug directly into cosine similarity or FAISS.

### ⚡ Pure Go API
Single function call: `Embed(text string) ([]float32, error)` — no Python subprocess, no HTTP round-trip, no GPU.

### 🧩 ONNX Runtime backend
Uses the ONNX Runtime C API via cgo for optimised CPU inference — takes advantage of AVX/NEON when available.

### 📦 Embeddable library
Import as a Go module into any service that needs local semantic search — agents, code search tools, document retrievers.

### 🔒 Fully offline
Model weights are bundled or loaded from disk at startup — no network calls, no external API keys.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 220">
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

  <rect x="20" y="74" width="140" height="72" rx="8" class="box"/>
  <text x="90" y="102" text-anchor="middle" class="label">Go string</text>
  <text x="90" y="119" text-anchor="middle" class="sub">text input</text>

  <rect x="220" y="74" width="150" height="72" rx="8" class="box-accent"/>
  <text x="295" y="102" text-anchor="middle" class="label">Tokenizer</text>
  <text x="295" y="119" text-anchor="middle" class="sub">WordPiece in Go</text>

  <rect x="430" y="74" width="150" height="72" rx="8" class="box-purple"/>
  <text x="505" y="102" text-anchor="middle" class="label">GTE Small ONNX</text>
  <text x="505" y="119" text-anchor="middle" class="sub">inference via cgo</text>

  <rect x="640" y="74" width="100" height="72" rx="8" class="box-green"/>
  <text x="690" y="102" text-anchor="middle" class="label">[]float32</text>
  <text x="690" y="119" text-anchor="middle" class="sub">384-dim</text>

  <rect x="450" y="24" width="110" height="28" rx="8" class="box"/>
  <text x="505" y="42" text-anchor="middle" class="sub">ONNX Runtime</text>

  <line x1="160" y1="110" x2="216" y2="110" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="370" y1="110" x2="426" y2="110" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="580" y1="110" x2="636" y2="110" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="188" text-anchor="middle" class="sub">fully offline semantic embeddings in a single Go binary</text>
</svg>
