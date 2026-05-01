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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1058 266">
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
  <rect width="1058" height="266" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">Piclaw web UI</text>
  <text x="120" y="74" text-anchor="middle" class="sub">verbatim TS source</text>

  <rect x="30" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="144" text-anchor="middle" class="label">Pi-compatible config</text>
  <text x="120" y="162" text-anchor="middle" class="sub">auth.json · AGENTS.md</text>

  <rect x="319" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="409" y="56" text-anchor="middle" class="label">Gi API layer</text>
  <text x="409" y="74" text-anchor="middle" class="sub">REST + SSE + files</text>

  <rect x="262" y="110" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="319" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="409" y="144" text-anchor="middle" class="label">Turn engine</text>
  <text x="409" y="162" text-anchor="middle" class="sub">append-only · cancel · replay</text>
  <rect x="278" y="186" width="82" height="48" rx="6" class="box-teal"/>
  <text x="319" y="207" text-anchor="middle" class="label" style="font-size:11px">go-joker</text>
  <text x="319" y="221" text-anchor="middle" class="sub" style="font-size:9px">Clojure</text>
  <rect x="368" y="186" width="82" height="48" rx="6" class="box-teal"/>
  <text x="409" y="207" text-anchor="middle" class="label" style="font-size:11px">goja</text>
  <text x="409" y="221" text-anchor="middle" class="sub" style="font-size:9px">JavaScript</text>
  <rect x="458" y="186" width="82" height="48" rx="6" class="box"/>
  <text x="499" y="207" text-anchor="middle" class="label" style="font-size:11px">SQLite</text>
  <text x="499" y="221" text-anchor="middle" class="sub" style="font-size:9px">state store</text>

  <rect x="608" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="698" y="56" text-anchor="middle" class="label">go-ai</text>
  <text x="698" y="74" text-anchor="middle" class="sub">multi-provider inference</text>

  <rect x="848" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="938" y="56" text-anchor="middle" class="label">Models</text>
  <text x="938" y="74" text-anchor="middle" class="sub">Copilot · OpenAI · Anthropic</text>

  <path d="M210,60 L319,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="265" y="54" text-anchor="middle" class="sub">SSE</text>
  <path d="M210,148 L319,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M409,90 L409,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M499,148 L540,148 Q554,148 554,134 L554,74 Q554,60 568,60 L608,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M788,60 L848,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="529" y="262" text-anchor="middle" class="sub">Go coding agent — Piclaw UI + go-ai inference + Clojure/JS scripting</text>
</svg>
