---
section: ai-agents
status: active
created: 2026-02-07
tagline: Live coding music environment with AI agent chat — compose and perform with Strudel, talk to an agent mid-set.
logo: assets/logos-opt/apfelstrudel.png
---

## About
Apfelstrudel wraps the [`strudel`](https://strudel.cc) live-coding music environment with an embedded AI agent chat panel. You write and perform generative music patterns in Strudel's mini-language while an agent watches your code and answers questions, suggests variations, or helps you understand what a pattern does — all in real time without breaking your flow.

## How it works
A Bun-based server hosts the Strudel editor and exposes a WebSocket channel to the AI backend. The agent receives the current code buffer as context on each message so it can reason about what's running. Changes the agent suggests can be applied directly to the editor with a single click. Audio runs entirely in the browser via the Web Audio API.

## Features
### 🎵 Strudel live coding
Full Strudel pattern language in the browser — cycles, mininotation, sample triggering, and MIDI output.

### 🤖 Agent-assisted composition
Chat with an AI agent that sees your current pattern and can suggest rhythms, harmonies, or explain what each function does.

### ⚡ One-click apply
Agent code suggestions appear as clickable diffs — apply them to the editor without copy-pasting.

### 🔊 Web Audio output
All synthesis runs in the browser with zero latency configuration — connect to MIDI or use the built-in synths.

### 🧩 Extensible backends
Swap out the AI backend by pointing the WebSocket URL at any OpenAI-compatible endpoint.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5070a0"/></marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box-accent"/>
  <text x="80" y="98" text-anchor="middle" class="label">Strudel</text>
  <text x="80" y="113" text-anchor="middle" class="sub">live coding UI</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box"/>
  <text x="265" y="53" text-anchor="middle" class="label">Web Audio</text>
  <text x="265" y="68" text-anchor="middle" class="sub">synthesis · MIDI</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="143" text-anchor="middle" class="label">WebSocket</text>
  <text x="265" y="158" text-anchor="middle" class="sub">agent channel</text>
  <rect x="410" y="60" width="120" height="80" rx="8" class="box-b"/>
  <text x="470" y="98" text-anchor="middle" class="label">AI agent</text>
  <text x="470" y="113" text-anchor="middle" class="sub">LLM backend</text>
  <line x1="140" y1="90" x2="200" y2="60" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="120" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="140" x2="410" y2="100" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="410" y1="110" x2="330" y2="140" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
