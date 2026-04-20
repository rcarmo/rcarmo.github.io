---
section: ai-agents
status: active
tagline: Go inference for the GTE Small text embedding model — local semantic search with no Python required.
---

## About
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
