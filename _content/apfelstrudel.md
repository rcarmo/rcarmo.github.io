---
section: agents
status: experimental
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 202">
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
  <rect width="728" height="202" class="bg" rx="8"/>

  <rect x="22" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="34" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="124" y="64" text-anchor="middle" class="label">Browser</text>
  <rect x="38" y="98" width="82" height="48" rx="6" class="box-accent"/>
  <text x="79" y="119" text-anchor="middle" class="label" style="font-size:11px">Strudel editor</text>
  <text x="79" y="133" text-anchor="middle" class="sub" style="font-size:9px">CodeMirror</text>
  <rect x="128" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="169" y="119" text-anchor="middle" class="label" style="font-size:11px">Chat sidebar</text>
  <text x="169" y="133" text-anchor="middle" class="sub" style="font-size:9px">AI messages</text>

  <rect x="278" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="368" y="56" text-anchor="middle" class="label">Bun server</text>
  <text x="368" y="74" text-anchor="middle" class="sub">HTTP + WebSocket</text>

  <rect x="278" y="118" width="180" height="60" rx="8" class="box-teal"/>
  <text x="368" y="144" text-anchor="middle" class="label">MCP tools</text>
  <text x="368" y="162" text-anchor="middle" class="sub">evaluate · set_tempo · get</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="608" y="56" text-anchor="middle" class="label">LLM provider</text>
  <text x="608" y="74" text-anchor="middle" class="sub">OpenAI / Anthropic / local</text>

  <rect x="518" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="608" y="144" text-anchor="middle" class="label">Web Audio</text>
  <text x="608" y="162" text-anchor="middle" class="sub">SuperDough synthesis</text>

  <path d="M214,60 L278,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="246" y="54" text-anchor="middle" class="sub">WebSocket</text>
  <path d="M458,60 L518,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M368,90 L368,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M458,148 L518,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="364" y="198" text-anchor="middle" class="sub">AI-assisted live coding with Strudel.cc + MCP tools</text>
</svg>
