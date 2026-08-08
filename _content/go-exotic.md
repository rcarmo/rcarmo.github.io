---
id: go-exotic
repo: rcarmo/go-exotic
section: ai-ml
status: experimental
created: 2026-05-28
logo: assets/logos-opt/go-exotic.png
tagline: Go experiment for deterministic model sharding, route planning and local layer-range execution.
---

## About
`go-exotic` explores distributed inference planning in Go, inspired by [`exo`](https://github.com/exo-explore/exo). It uses [`go-pherence`](go-pherence) as the local runtime and separates deterministic placement from actual shard execution.

The current project is an orchestration and validation experiment, not a networked distributed-inference service.

## How it works
The CLI and local web server expose peer capabilities, memory-weighted layer placement and route previews. An in-process simulator checks orchestration before any execution path is enabled.

The shard endpoint is disabled by default. Supplying a local model installs a `go-pherence` layer executor for bounded local development; it does not enable peer discovery or LAN generation.

## Features
### Deterministic placement
Assigns model layers to advertised peer memory with stable, inspectable plans.

### Route previews
Shows the proposed layer and peer path without executing shards or modifying local models.

### Local runtime adapter
Uses `go-pherence` for model metadata, tokenisation, smoke generation and layer-range execution.

### In-process simulation
Exercises orchestration and failure paths without requiring several machines.

### Gated execution
`POST /shards/execute` returns `503 shard execution disabled` until a local executor is explicitly configured.

### Dashboard and API
A Bun-built Preact/D3 dashboard presents status, capabilities, placement, routes and bounded local model inventory.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 202">
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
  <rect width="1200" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">CLI / dashboard</text>
  <text x="120" y="74" text-anchor="middle" class="sub">plan · peers · routes · run</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Go service</text>
  <text x="360" y="74" text-anchor="middle" class="sub">local HTTP API</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Placement planner</text>
  <text x="600" y="74" text-anchor="middle" class="sub">memory-weighted layers</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="840" y="56" text-anchor="middle" class="label">Simulator</text>
  <text x="840" y="74" text-anchor="middle" class="sub">routes · orchestration checks</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="144" text-anchor="middle" class="label">Local executor</text>
  <text x="840" y="162" text-anchor="middle" class="sub">go-pherence · opt-in</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Preview / result</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">JSON · D3 dashboard</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,60 L706,60 Q720,60 720,74 L720,134 Q720,148 734,148 L750,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M930,148 L946,148 Q960,148 960,134 L960,74 Q960,60 974,60 L990,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Deterministic shard planning with gated local execution</text>
</svg>
