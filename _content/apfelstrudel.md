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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 240">
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

  <!-- Row 1 -->
  <rect x="16" y="20" width="170" height="80" rx="8" class="box-accent"/>
  <text x="101" y="48" text-anchor="middle" class="label">Strudel editor</text>
  <text x="101" y="65" text-anchor="middle" class="sub">multi-tab · undo/redo</text>
  <text x="101" y="80" text-anchor="middle" class="sub">AI chat panel</text>

  <rect x="216" y="20" width="170" height="80" rx="8" class="box-green"/>
  <text x="301" y="48" text-anchor="middle" class="label">Bun server</text>
  <text x="301" y="65" text-anchor="middle" class="sub">static files · WebSocket</text>
  <text x="301" y="80" text-anchor="middle" class="sub">session persistence</text>

  <rect x="416" y="20" width="170" height="80" rx="8" class="box-purple"/>
  <text x="501" y="48" text-anchor="middle" class="label">LLM</text>
  <text x="501" y="65" text-anchor="middle" class="sub">OpenAI · Azure</text>
  <text x="501" y="80" text-anchor="middle" class="sub">LM Studio</text>

  <!-- Row 2 -->
  <rect x="16" y="130" width="170" height="55" rx="8" class="box-warm"/>
  <text x="101" y="154" text-anchor="middle" class="label">Web Audio</text>
  <text x="101" y="171" text-anchor="middle" class="sub">synths · samples · MIDI</text>

  <rect x="416" y="130" width="170" height="55" rx="8" class="box"/>
  <text x="501" y="154" text-anchor="middle" class="label">Code suggestions</text>
  <text x="501" y="171" text-anchor="middle" class="sub">one-click apply</text>

  <!-- Row 1 horizontal arrows -->
  <line x1="186" y1="60" x2="214" y2="60" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="386" y1="60" x2="414" y2="60" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>

  <!-- Down arrows -->
  <line x1="101" y1="100" x2="101" y2="128" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="501" y1="100" x2="501" y2="128" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Return: code suggestions → right edge of Web Audio, routed below -->
  <polyline points="416,170 301,170 301,212 186,212 186,157" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ah)"/>

  <text x="330" y="228" text-anchor="middle" class="sub">audio stays client-side · agent communicates over WebSocket</text>
</svg>
