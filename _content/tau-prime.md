---
id: tau-prime
repo: rcarmo/tau-prime
section: agents
status: active
created: 2026-07-04
logo: assets/logos-opt/tau-prime.png
tagline: Tau coding agent fork for a-Shell on iOS, with Copilot, LM Studio and native macOS sandboxing.
---

## About
`tau-prime` is a derivative of [Tau](https://github.com/alejandro-ao/tau) for running a terminal coding agent inside a-Shell on iPhone and iPad. It retains Tau's Python agent architecture and `tau` command, but changes the terminal, shell tools, providers and packaging where the upstream assumptions do not fit a constrained mobile shell.

It also runs on ordinary Python 3.13 installations. On macOS, agent processes and their children are confined by `sandbox-exec` unless the user explicitly passes `--no-sandbox`.

## How it works
The `tau_ai` package provides provider clients and common events. `tau_agent` contains messages, tools, the reusable `AgentHarness` loop and session primitives. `tau_coding` joins those pieces into coding tools, JSONL persistence, provider configuration, the CLI and the Textual interface.

On a-Shell, command execution uses its constrained `sh`; the familiar `bash` tool names remain as compatibility aliases. The interface starts with its sidebar hidden, follows transcript output and polls terminal dimensions when iOS fails to deliver resize events.

## Gallery
- [a demo of piclaw, created by piclaw itself](assets/screenshots/tau-prime/piclaw-demo.mp4)

## Features
### iOS terminal behaviour
Mobile defaults, reliable transcript following, sidebar toggle and resize polling for a-Shell.

### GitHub Copilot
Device login, token refresh, live model discovery and the appropriate Copilot endpoints for hosted OpenAI, Claude and Gemini models.

### LM Studio
Credential-free local provider with persistent LAN URL configuration, loaded-model discovery and `/reload` support.

### Provider choice
Also supports OpenAI, Codex subscription login, Anthropic, OpenRouter, Hugging Face, DeepSeek, Nebius and custom OpenAI-compatible endpoints.

### Durable sessions
Append-only JSONL sessions under `~/.tau/sessions/`, with history, branching, compaction and export commands.

### macOS sandbox
Restricts writes to the working directory, Tau Prime state, `$TMPDIR` and required terminal devices. It stops if the sandbox cannot be applied.

### Repeatable packaging
The Makefile runs tests, builds the source distribution and smoke-tests it through an isolated `uvx` installation.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">tau_coding</text>
  <text x="120" y="74" text-anchor="middle" class="sub">CLI · Textual TUI · sessions</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">tau_agent</text>
  <text x="360" y="74" text-anchor="middle" class="sub">AgentHarness · tools · messages</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="144" text-anchor="middle" class="label">Execution boundary</text>
  <text x="360" y="162" text-anchor="middle" class="sub">a-Shell sh · macOS sandbox</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">tau_ai</text>
  <text x="600" y="74" text-anchor="middle" class="sub">providers · common events</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="600" y="144" text-anchor="middle" class="label">Project workspace</text>
  <text x="600" y="162" text-anchor="middle" class="sub">files · commands · tests</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="840" y="56" text-anchor="middle" class="label">Model providers</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Copilot · LM Studio · APIs</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M360,90 L360,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L510,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Tau Prime package and execution boundaries</text>
</svg>
