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

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 662 240">
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

  <!-- col1: x=16..186, col2: x=246..416, col3: x=476..646 -->
  <!-- row1: y=20..110, row2: y=140..200 -->

  <rect x="16" y="20" width="170" height="90" rx="8" class="box-accent"/>
  <text x="101" y="52" text-anchor="middle" class="label">Strudel editor</text>
  <text x="101" y="69" text-anchor="middle" class="sub">multi-tab · undo/redo</text>
  <text x="101" y="84" text-anchor="middle" class="sub">AI chat panel</text>

  <rect x="246" y="20" width="170" height="90" rx="8" class="box-green"/>
  <text x="331" y="52" text-anchor="middle" class="label">Bun server</text>
  <text x="331" y="69" text-anchor="middle" class="sub">static files · WebSocket</text>
  <text x="331" y="84" text-anchor="middle" class="sub">session persistence</text>

  <rect x="476" y="20" width="170" height="90" rx="8" class="box-purple"/>
  <text x="561" y="52" text-anchor="middle" class="label">LLM</text>
  <text x="561" y="69" text-anchor="middle" class="sub">OpenAI · Azure</text>
  <text x="561" y="84" text-anchor="middle" class="sub">LM Studio</text>

  <rect x="16" y="140" width="170" height="60" rx="8" class="box-warm"/>
  <text x="101" y="166" text-anchor="middle" class="label">Web Audio</text>
  <text x="101" y="183" text-anchor="middle" class="sub">synths · samples · MIDI</text>

  <rect x="476" y="140" width="170" height="60" rx="8" class="box"/>
  <text x="561" y="166" text-anchor="middle" class="label">Code suggestions</text>
  <text x="561" y="183" text-anchor="middle" class="sub">one-click apply</text>

  <!-- Row 1: editor -> server -> LLM (60px gaps, arrows span gap) -->
  <line x1="190" y1="65" x2="242" y2="65" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="420" y1="65" x2="472" y2="65" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>

  <!-- Down: editor -> web audio, LLM -> suggestions (30px gaps) -->
  <line x1="101" y1="114" x2="101" y2="136" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="561" y1="114" x2="561" y2="136" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Return: suggestions right edge -> below -> web audio right edge -->
  <line x1="476" y1="170" x2="188" y2="170" stroke="#5070a0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ah)"/>

  <text x="331" y="232" text-anchor="middle" class="sub">audio stays client-side · agent communicates over WebSocket</text>
</svg>
