---
section: ai
status: experimental
created: 2026-04-22
tagline: Go coding agent harness with Piclaw-compatible web UI, append-only turn engine, and go-ai inference.
logo: assets/logos-opt/gi.png
---

## About
Gi is a coding agent built on `go-ai`, shaped by lessons learned from Pi, Piclaw, and Vibes. It combines a Go turn engine, SQLite-backed state, a Piclaw-compatible web UI, and provider-backed inference into a single workspace-centric agent harness. Extensibility comes from two embedded scripting engines: [go-joker](go-joker) for Clojure and [goja](https://github.com/dop251/goja) for JavaScript, allowing tools and workflows to be written in either language without recompiling.

## How it works
The core is an append-only turn engine backed by SQLite: turns, messages, and events are stored in a local database, then streamed to the frontend over SSE. Inference goes through `go-ai`, with auth loaded from Pi-compatible config and prompts sourced from `AGENTS.md`. The web UI reuses Piclaw's TypeScript source verbatim, with Gi-specific `api.ts` and `app.ts` adapters wiring the existing component tree into Gi's REST and SSE endpoints. Scripting extensions are loaded at startup from the workspace — Clojure scripts run through an embedded [go-joker](go-joker) interpreter (with full interop to Go host functions), while JavaScript scripts run through goja.

## Features
### 🧠 go-ai inference
Unified provider layer with streaming and GitHub Copilot enterprise token exchange.

### 🗃 SQLite-backed turn engine
Append-only turns, messages, and events with queueing, cancelation, and replayable state.

### 🖥 Piclaw-compatible web UI
Piclaw TypeScript source reused verbatim with Gi-specific API/entry adapters.

### 🧪 Clojure scripting via go-joker
Embed Clojure scripts as tools and workflows — [go-joker](go-joker)'s IR bytecode interpreter runs 527× faster than tree-walking, with full interop to Go host functions.

### 📜 JavaScript scripting via goja
ES5.1+ scripting engine for lightweight tool extensions without a Node dependency.

### 📁 Workspace-centric
Reads `AGENTS.md`, operates against a workspace root, and exposes workspace file APIs.

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 380">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; stroke-width: 1.5; }
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
      .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
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
  <rect width="900" height="380" class="bg" rx="8"/>

  <!-- Left: Piclaw web UI -->
  <rect x="20" y="112" width="180" height="72" rx="8" class="box-accent"/>
  <text x="110" y="140" text-anchor="middle" class="label">Piclaw web UI</text>
  <text x="110" y="158" text-anchor="middle" class="sub">verbatim TS source</text>

  <!-- Centre top: Gi web/API layer -->
  <rect x="270" y="40" width="200" height="72" rx="8" class="box-green"/>
  <text x="370" y="68" text-anchor="middle" class="label">Gi web/API layer</text>
  <text x="370" y="86" text-anchor="middle" class="sub">REST + SSE + workspace APIs</text>

  <!-- Centre middle: Turn engine -->
  <rect x="270" y="144" width="200" height="72" rx="8" class="box-purple"/>
  <text x="370" y="172" text-anchor="middle" class="label">Turn engine</text>
  <text x="370" y="190" text-anchor="middle" class="sub">append-only queue / cancel / stream</text>

  <!-- Centre bottom: Scripting engines (under turn engine) -->
  <rect x="230" y="252" width="160" height="56" rx="8" class="box-teal"/>
  <text x="310" y="276" text-anchor="middle" class="label">go-joker (Clojure)</text>
  <text x="310" y="292" text-anchor="middle" class="sub">IR bytecode · Go interop</text>

  <rect x="410" y="252" width="140" height="56" rx="8" class="box-teal"/>
  <text x="480" y="276" text-anchor="middle" class="label">goja (JavaScript)</text>
  <text x="480" y="292" text-anchor="middle" class="sub">ES5.1+ scripting</text>

  <!-- Right column -->
  <rect x="600" y="20" width="170" height="56" rx="8" class="box-warm"/>
  <text x="685" y="44" text-anchor="middle" class="label">go-ai inference</text>
  <text x="685" y="60" text-anchor="middle" class="sub">provider auth + streaming</text>

  <rect x="600" y="92" width="170" height="56" rx="8" class="box"/>
  <text x="685" y="116" text-anchor="middle" class="label">SQLite store</text>
  <text x="685" y="132" text-anchor="middle" class="sub">sessions · messages · events</text>

  <rect x="600" y="164" width="170" height="56" rx="8" class="box-warm"/>
  <text x="685" y="188" text-anchor="middle" class="label">Pi-compatible config</text>
  <text x="685" y="204" text-anchor="middle" class="sub">auth.json · AGENTS.md</text>

  <!-- Far right: Models -->
  <rect x="810" y="60" width="70" height="56" rx="8" class="box-green"/>
  <text x="845" y="84" text-anchor="middle" class="label">Models</text>
  <text x="845" y="100" text-anchor="middle" class="sub">Copilot</text>

  <!-- Arrows: all orthogonal with rounded corners (r=8) -->

  <!-- Piclaw UI → Gi API -->
  <path d="M200,148 L248,148 Q256,148 256,112 L256,76 Q256,68 264,68 L270,68"
        fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="228" y="100" text-anchor="middle" class="sub">REST+SSE</text>

  <!-- Gi API → Turn engine -->
  <path d="M370,112 L370,144"
        fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <!-- Turn engine → go-ai (right, up) -->
  <path d="M470,165 L560,165 Q568,165 568,56 L568,48 Q568,40 576,40 L600,40"
        fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <!-- Turn engine → SQLite (right, straight) -->
  <path d="M470,180 L560,180 Q568,180 568,120 Q568,112 576,112 L600,112"
        fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <!-- Turn engine → config (right, down) -->
  <path d="M470,195 L560,195 Q568,195 568,192 Q568,192 576,192 L600,192"
        fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <!-- Turn engine → scripting (down) -->
  <path d="M370,216 L370,244 Q370,252 378,252 L390,252"
        fill="none" stroke="#0d9488" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <!-- go-ai → Models -->
  <path d="M770,48 L790,48 Q798,48 798,68 L798,80 Q798,88 806,88 L810,88"
        fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="450" y="366" text-anchor="middle" class="sub">Go turn engine + Piclaw UI + go-ai inference + Clojure/JS scripting</text>
</svg>
