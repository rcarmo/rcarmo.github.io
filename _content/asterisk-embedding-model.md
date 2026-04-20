---
section: ai-ml
status: active
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
