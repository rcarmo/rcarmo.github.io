---
id: go-system-one
repo: rcarmo/go-system-one
section: ai-ml
status: experimental
created: 2026-09-22
logo: assets/logos-opt/go-system-one.svg
tagline: Local finite-choice decisions with Gemma -- yes/no probabilities, named choices and ordered scores in Go.
---

## About
Go System One uses Gemma 4 12B to answer questions with a fixed set of allowed outcomes. Give it a support ticket and it can estimate whether it is urgent, choose a team and score its severity, returning probabilities rather than a free-form explanation.

It implements a Jev-like decision interface using a Gemma checkpoint, not Jev weights. A native Go runtime handles inference, with CPU/SIMD execution and NVIDIA PTX loaded through the driver API. The NVIDIA runtime needs neither cgo nor a CUDA toolkit; model files are downloaded separately under the Gemma licence.

## How it works
The caller supplies context, instructions and the allowed answers. The server validates the request and compiles those answers into a tree of token sequences. Gemma scores the permitted paths, reusing shared prefixes rather than generating arbitrary text and trying to parse it afterwards.

The API normalises scores over the supplied candidates. A choice returns the winning label and its distribution; an ordered score returns the expected level, which can be fractional. A `noul` question returns the probability of yes. These probabilities describe the model's preference among the allowed answers, not calibrated estimates of correctness.

## Features
### Typed questions
`POST /v1/systemone` accepts one state and `noul`, `choice` or `score` questions, including structured descriptions of the choices.

### Batch decisions
`POST /v1/decision` evaluates independent contexts against boolean and enum fields, with automatic or explicit tree scoring.

### Native Go inference
CPU/SIMD and NVIDIA execution for the pinned Gemma checkpoint. The runtime does not depend on llama.cpp.

### Shared-prefix scoring
Reuses prompt state and shared candidate prefixes while scoring the allowed answer sequences.

### Browser playground
An embedded web UI for both APIs, showing answers, candidate distributions and request timings in light or dark mode.

### Explicit limits
Confidence uses local approximations and is not verified against TypeSafe's formulas. Matching its question types does not reproduce Jev's training or calibration; decisions still need evaluation against the intended task.

## Gallery
- [Decision playground](assets/screenshots/go-system-one/playground.png) -- Noul, Choice and Score results with candidate probabilities

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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">HTTP request</text>
  <text x="120" y="74" text-anchor="middle" class="sub">State + allowed answers</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Candidate tree</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Validate + tokenise</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Gemma scoring</text>
  <text x="600" y="74" text-anchor="middle" class="sub">CPU/SIMD or NVIDIA PTX</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Typed answers</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Choice, score or P(yes)</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Constrained candidate scoring with Gemma</text>
</svg>