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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220">
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

  <!-- Browser: Strudel editor + chat -->
  <rect x="16" y="30" width="140" height="80" rx="8" class="box-accent"/>
  <text x="86" y="60" text-anchor="middle" class="label">Strudel editor</text>
  <text x="86" y="77" text-anchor="middle" class="sub">multi-tab · undo/redo</text>
  <text x="86" y="92" text-anchor="middle" class="sub">AI chat panel</text>

  <!-- Web Audio (browser-local) -->
  <rect x="16" y="130" width="140" height="55" rx="8" class="box-warm"/>
  <text x="86" y="155" text-anchor="middle" class="label">Web Audio</text>
  <text x="86" y="172" text-anchor="middle" class="sub">synths · samples · MIDI</text>

  <!-- Bun server -->
  <rect x="210" y="50" width="150" height="80" rx="8" class="box-green"/>
  <text x="285" y="80" text-anchor="middle" class="label">Bun server</text>
  <text x="285" y="97" text-anchor="middle" class="sub">static files · WebSocket</text>
  <text x="285" y="112" text-anchor="middle" class="sub">session persistence</text>

  <!-- LLM backend -->
  <rect x="420" y="30" width="140" height="60" rx="8" class="box-purple"/>
  <text x="490" y="57" text-anchor="middle" class="label">LLM</text>
  <text x="490" y="74" text-anchor="middle" class="sub">OpenAI · Azure · LM Studio</text>

  <!-- Code diffs -->
  <rect x="420" y="110" width="140" height="55" rx="8" class="box"/>
  <text x="490" y="135" text-anchor="middle" class="label">Code suggestions</text>
  <text x="490" y="152" text-anchor="middle" class="sub">one-click apply to editor</text>

  <!-- Arrows -->
  <!-- Editor → Web Audio (local) -->
  <line x1="86" y1="110" x2="86" y2="128" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- Editor → Bun server -->
  <line x1="156" y1="70" x2="208" y2="78" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <!-- Bun server → LLM -->
  <line x1="360" y1="75" x2="418" y2="62" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <!-- LLM → code suggestions -->
  <line x1="490" y1="90" x2="490" y2="108" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- Code suggestions → back to editor -->
  <line x1="420" y1="145" x2="156" y2="85" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="350" y="200" text-anchor="middle" class="sub">browser · audio stays client-side · agent communicates over WebSocket</text>
</svg>
