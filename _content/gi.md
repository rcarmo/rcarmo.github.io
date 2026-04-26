---
section: ai-agents
status: active
created: 2026-04-22
tagline: Go coding agent harness with Piclaw-compatible web UI, append-only turn engine, and go-ai inference.
logo: assets/logos-opt/gi.png
---

## About
Gi is a coding agent built on `go-ai`, shaped by lessons learned from Pi, Piclaw, and Vibes. It combines a Go turn engine, SQLite-backed state, a Piclaw-compatible web UI, and provider-backed inference into a single workspace-centric agent harness.

## How it works
The core is an append-only turn engine backed by SQLite: turns, messages, and events are stored in a local database, then streamed to the frontend over SSE. Inference goes through `go-ai`, with auth loaded from Pi-compatible config and prompts sourced from `AGENTS.md`. The web UI reuses Piclaw's TypeScript source verbatim, with Gi-specific `api.ts` and `app.ts` adapters wiring the existing component tree into Gi's REST and SSE endpoints.

## Features
### 🧠 go-ai inference
Unified provider layer with streaming and GitHub Copilot enterprise token exchange.

### 🗃 SQLite-backed turn engine
Append-only turns, messages, and events with queueing, cancelation, and replayable state.

### 🖥 Piclaw-compatible web UI
Piclaw TypeScript source reused verbatim with Gi-specific API/entry adapters.

### 📡 SSE live updates
Realtime status, draft deltas, thought deltas, and responses streamed to the browser.

### 📁 Workspace-centric
Reads `AGENTS.md`, operates against a workspace root, and exposes workspace file APIs.

### 🧪 Playwright-tested
End-to-end UX tests cover the running web interface against isolated test instances.

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">
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
  <rect width="900" height="300" class="bg" rx="8"/>

  <rect x="20" y="92" width="180" height="72" rx="8" class="box-accent"/>
  <text x="110" y="120" text-anchor="middle" class="label">Piclaw web UI</text>
  <text x="110" y="138" text-anchor="middle" class="sub">verbatim TS source</text>

  <rect x="270" y="40" width="200" height="72" rx="8" class="box-green"/>
  <text x="370" y="68" text-anchor="middle" class="label">Gi web/API layer</text>
  <text x="370" y="86" text-anchor="middle" class="sub">REST + SSE + workspace APIs</text>

  <rect x="270" y="144" width="200" height="72" rx="8" class="box-purple"/>
  <text x="370" y="172" text-anchor="middle" class="label">Turn engine</text>
  <text x="370" y="190" text-anchor="middle" class="sub">append-only queue / cancel / stream</text>

  <rect x="540" y="30" width="170" height="60" rx="8" class="box-warm"/>
  <text x="625" y="56" text-anchor="middle" class="label">go-ai inference</text>
  <text x="625" y="74" text-anchor="middle" class="sub">provider auth + streaming</text>

  <rect x="540" y="110" width="170" height="60" rx="8" class="box"/>
  <text x="625" y="136" text-anchor="middle" class="label">SQLite store</text>
  <text x="625" y="154" text-anchor="middle" class="sub">sessions · messages · events</text>

  <rect x="540" y="190" width="170" height="60" rx="8" class="box-warm"/>
  <text x="625" y="216" text-anchor="middle" class="label">Pi-compatible config</text>
  <text x="625" y="234" text-anchor="middle" class="sub">auth.json · AGENTS.md</text>

  <rect x="780" y="92" width="100" height="72" rx="8" class="box-green"/>
  <text x="830" y="120" text-anchor="middle" class="label">Models</text>
  <text x="830" y="138" text-anchor="middle" class="sub">Copilot / others</text>

  <path d="M200,128 L270,128" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <text x="235" y="116" text-anchor="middle" class="sub">REST + SSE</text>
  <path d="M370,112 L370,144" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M470,180 L505,180 Q515,180 515,150 L515,140 Q515,140 525,140 L540,140" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M470,180 L505,180 Q515,180 515,70 L515,60 Q515,60 525,60 L540,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M470,180 L505,180 Q515,180 515,220 L515,220 Q515,220 525,220 L540,220" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M710,60 L745,60 Q755,60 755,88 L755,118 Q755,128 765,128 L780,128" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>

  <text x="450" y="286" text-anchor="middle" class="sub">Go turn engine + Piclaw UI reuse + go-ai inference</text>
</svg>
