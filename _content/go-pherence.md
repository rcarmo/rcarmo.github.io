---
id: go-pherence
repo: rcarmo/go-pherence
section: ai-ml
status: active
created: 2026-05-01
tagline: Local inference in Go -- LLMs, embeddings, speech and experimental vision models on CPU and GPU.
logo: assets/logos-opt/go-pherence.png
---

## About
`go-pherence` runs language, embedding and speech models on local hardware, with experimental support for vision and image generation. It provides Go libraries, command-line tools and an OpenAI-compatible server, including LLaMA, Qwen and Gemma decoders, BERT/GTE embeddings, Whisper transcription and MOSS transcription with speaker labels.

CPU execution uses Go and hand-written assembly. NVIDIA support loads PTX through the installed driver without cgo or a CUDA toolkit. Vulkan and embedded accelerator support are opt-in and model-dependent.

## How it works
Loaders read model configuration, tokenisers and weights from safetensors, selected GGUF layouts and associated files. Model packages implement attention, generation loops, speech processing and image schedulers, sharing kernels and memory management rather than forcing every model through one graph engine.

CPU kernels use AVX2, NEON or RISC-V vector instructions where supported, with scalar Go fallbacks. NVIDIA execution keeps weights and intermediate state on the GPU where the model implementation allows it. Quantised weights retain their packed layout where supported, reducing memory traffic without first expanding the whole checkpoint.

The speech tools can produce transcripts and subtitles with timestamps and speaker labels. Their normal media input uses FFmpeg; library callers can instead select a pure-Go [go-264](go-264) adapter for PCM WAV and a limited AAC-LC MP4/M4A subset.

## Features

### 🦙 Local LLMs
Dense and mixture-of-experts LLaMA, Qwen and Gemma-family models, with command-line generation, interactive chat and an OpenAI-compatible server.

### 📦 Checkpoint formats
MLX and GPTQ 4-bit weights, BF16/F16/F32 safetensors and selected GGUF layouts. Supported formats depend on the model architecture.

### ⚡ CPU and NVIDIA execution
AVX2, NEON and RVV kernels with scalar fallbacks; runtime-loaded PTX for supported NVIDIA operations. No Python inference runtime required.

### 🧠 Embeddings and extraction
BERT/GTE embeddings, including the GTE-small model used by [go-gte](go-gte), and GLiNER 2.5 entity, classification, relation and record extraction.

### 🎙 Speech and speaker labels
Whisper transcription or translation to WebVTT, with optional diarisation. MOSS provides native transcription with timestamps and speaker labels local to each recording.

### 🎨 Experimental generation
Ideogram 4 has a native CPU/SIMD image-generation implementation. DiffusionGemma has a partial native text-generation implementation; neither offers complete upstream model coverage.

### 🔧 Library use
Model loaders, tensor operations and execution backends can be used from Go applications. Jevlike adds choice scoring, training and reusable visual adapters.

### 🧪 Model-specific limits
Some families, including Qwen3-TTS and MiniCPM-V/O, have inspection or preprocessing support without full inference. The [supported-model guide](https://github.com/rcarmo/go-pherence/blob/main/docs/models/supported-models.md) lists the runnable models and their limits.

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
    .sub { fill: #243b53; }
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
  <rect width="984" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Model weights</text>
  <text x="120" y="74" text-anchor="middle" class="sub">safetensors / GGUF</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">Model execution</text>
  <text x="364" y="74" text-anchor="middle" class="sub">model-specific graphs</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Model code</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">layers / loops</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Shared state</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">tensor / KV</text>

  <rect x="510" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="522" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="612" y="64" text-anchor="middle" class="label">Compute backends</text>
  <rect x="526" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="567" y="119" text-anchor="middle" class="label" style="font-size:11px">CPU kernels</text>
  <text x="567" y="133" text-anchor="middle" class="sub" style="font-size:9px">Go + assembly</text>
  <rect x="616" y="98" width="82" height="48" rx="6" class="box-slate"/>
  <text x="657" y="119" text-anchor="middle" class="label" style="font-size:11px">NVIDIA</text>
  <text x="657" y="133" text-anchor="middle" class="sub" style="font-size:9px">driver / PTX</text>

  <rect x="758" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="770" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="860" y="64" text-anchor="middle" class="label">Inference tools</text>
  <rect x="774" y="98" width="82" height="48" rx="6" class="box-orange"/>
  <text x="815" y="119" text-anchor="middle" class="label" style="font-size:11px">Text</text>
  <text x="815" y="133" text-anchor="middle" class="sub" style="font-size:9px">LLMs / vectors</text>
  <rect x="864" y="98" width="82" height="48" rx="6" class="box-orange"/>
  <text x="905" y="119" text-anchor="middle" class="label" style="font-size:11px">Speech</text>
  <text x="905" y="133" text-anchor="middle" class="sub" style="font-size:9px">text / speakers</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L522,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M702,60 L770,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="492" y="174" text-anchor="middle" class="sub">Shared loaders and kernels for local model inference</text>
</svg>

## Posts
- [Notes for May 3-10](https://taoofmac.com/space/notes/2026/05/10/1433) — 2026-05-11
- [The Local AI Moat](https://taoofmac.com/space/blog/2026/05/09/2130) — 2026-05-09
- [Notes for April 27 – May 3](https://taoofmac.com/space/notes/2026/05/03/2200) — 2026-05-03
