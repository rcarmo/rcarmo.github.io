---
section: ai-agents
featured: true
status: active
created: 2026-02-17
tagline: A self-hosted AI agent workspace — mobile-first streaming UI, infinite tools
logo: assets/logos-opt/piclaw.png
---

## About
PiClaw packages the [Pi Coding Agent](https://pi.dev) runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, `draw.io`, kanban boards, VNC client, and MCP access. One `docker run` command, one live workspace.

## How it works
Supervisor runs as PID 1 inside the container, managing the Bun-based Pi agent runtime, an optional Ghostty-backed web terminal, and an optional VNC display. All persistent state lives on a bind-mounted /workspace volume — the container is stateless and replaceable.

The web UI communicates with the agent over SSE for streaming and WebSocket for real-time indicators. The tool surface is layered: a small always-active baseline, with additional tools activated on demand via list_tools and activate_tools — keeping token usage low while hundreds of capabilities remain available. Skills are TypeScript modules discovered at runtime from SKILL.md files.

Sessions branch as git-like conversation trees in SQLite. The keychain stores secrets encrypted with AES-GCM. Dream memory consolidation runs nightly to synthesise notes from all sessions and keep long-running workflows coherent.

## Features
### 💬 Streaming chat
Markdown, KaTeX, Mermaid, Adaptive Cards. Branch with /btw, queue follow-ups.

### 🗂 Workspace tooling
File browser, CodeMirror 6, Office/PDF viewers, draw.io, kanban, VNC — no separate apps.

### 🔌 Any LLM
Anthropic, OpenAI, Azure, Gemini, Ollama, or any OpenAI-compatible endpoint.

### 🧠 Persistent state
SQLite-backed history, media, tasks, encrypted keychain. Dream nightly consolidation.

### 🛠 Infrastructure tools
SSH, Proxmox, Portainer profiles. CDP browser automation. Sharp image processing. MCP.

### 📦 Single container
docker run -p 8080:8080 -v ./workspace:/workspace ghcr.io/rcarmo/piclaw:latest

## Posts
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Thoughts on AI-Assisted Software Development in 2026](https://taoofmac.com/space/notes/2026/02/01/2130) — 2026-02-01
- [So You Want To Do Agentic Development](https://taoofmac.com/space/blog/2026/03/08/2130) — 2026-03-08

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 340" width="760" height="340">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0f141b; }
      .panel { fill: #171d26; stroke: #2a3443; }
      .panel2 { fill: #121923; stroke: #364255; }
      .accent { fill: #0f2542; stroke: #3b82f6; }
      .green { fill: #10261c; stroke: #2f855a; }
      .warm { fill: #2a1d14; stroke: #dd8b3d; }
      .purple { fill: #21162f; stroke: #8b5cf6; }
      .label { fill: #e6edf6; }
      .sub { fill: #9fb0c8; }
      .muted { fill: #7f90aa; }
      .arrow { stroke: #6b7f9a; fill: none; }
      .arrow-strong { stroke: #7fb0ff; fill: none; }
      .line-soft { stroke: #465569; fill: none; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f7fafc; }
      .panel { fill: #ffffff; stroke: #c8d3e1; }
      .panel2 { fill: #f8fbff; stroke: #cfd8e5; }
      .accent { fill: #e8f1ff; stroke: #3b82f6; }
      .green { fill: #e9f8ef; stroke: #2f855a; }
      .warm { fill: #fff2e6; stroke: #dd8b3d; }
      .purple { fill: #f3ecff; stroke: #8b5cf6; }
      .label { fill: #142033; }
      .sub { fill: #52647e; }
      .muted { fill: #6b7280; }
      .arrow { stroke: #8191a7; fill: none; }
      .arrow-strong { stroke: #2563eb; fill: none; }
      .line-soft { stroke: #b8c4d3; fill: none; }
    }
    text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif; }
    .label { font-size: 15px; font-weight: 700; }
    .sub { font-size: 11.5px; }
    .tiny { font-size: 10.5px; }
  </style>

  <defs>
    <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
    </marker>
  </defs>

  <rect x="0" y="0" width="760" height="340" class="bg"/>

  <rect x="28" y="125" width="118" height="86" rx="12" class="panel"/>
  <text x="87" y="157" text-anchor="middle" class="label">User</text>
  <text x="87" y="176" text-anchor="middle" class="sub">web</text>
  <text x="87" y="192" text-anchor="middle" class="sub">mobile</text>

  <rect x="182" y="56" width="166" height="94" rx="12" class="accent"/>
  <text x="265" y="88" text-anchor="middle" class="label">Streaming UI</text>
  <text x="265" y="107" text-anchor="middle" class="sub">chat timeline</text>
  <text x="265" y="123" text-anchor="middle" class="sub">cards · widgets · attachments</text>

  <rect x="182" y="188" width="166" height="86" rx="12" class="panel2"/>
  <text x="265" y="220" text-anchor="middle" class="label">Agent runtime</text>
  <text x="265" y="239" text-anchor="middle" class="sub">messages · tool calls · results</text>
  <text x="265" y="255" text-anchor="middle" class="sub">session + compaction + prompts</text>

  <rect x="390" y="28" width="152" height="68" rx="12" class="purple"/>
  <text x="466" y="56" text-anchor="middle" class="label">Extensions</text>
  <text x="466" y="74" text-anchor="middle" class="sub">custom tools</text>
  <text x="466" y="88" text-anchor="middle" class="sub">commands · UI hooks</text>

  <rect x="390" y="108" width="152" height="68" rx="12" class="purple"/>
  <text x="466" y="136" text-anchor="middle" class="label">Skills</text>
  <text x="466" y="154" text-anchor="middle" class="sub">on-demand workflows</text>
  <text x="466" y="168" text-anchor="middle" class="sub">README-driven capability packs</text>

  <rect x="390" y="188" width="152" height="86" rx="12" class="panel"/>
  <text x="466" y="219" text-anchor="middle" class="label">Workspace state</text>
  <text x="466" y="238" text-anchor="middle" class="sub">files · notes · daily memory</text>
  <text x="466" y="254" text-anchor="middle" class="sub">sessions · SQLite messages</text>

  <rect x="390" y="286" width="152" height="38" rx="12" class="panel2"/>
  <text x="466" y="309" text-anchor="middle" class="sub">prompt templates · themes</text>

  <rect x="582" y="72" width="150" height="94" rx="12" class="green"/>
  <text x="657" y="104" text-anchor="middle" class="label">Tools</text>
  <text x="657" y="123" text-anchor="middle" class="sub">read · edit · bash · search</text>
  <text x="657" y="139" text-anchor="middle" class="sub">attachments · scheduling</text>
  <text x="657" y="155" text-anchor="middle" class="sub">images · office · more</text>

  <rect x="582" y="206" width="150" height="94" rx="12" class="warm"/>
  <text x="657" y="238" text-anchor="middle" class="label">External systems</text>
  <text x="657" y="257" text-anchor="middle" class="sub">GitHub · APIs · MCP-like</text>
  <text x="657" y="273" text-anchor="middle" class="sub">services · browsers · hosts</text>

  <path d="M146 168 H174" class="arrow-strong" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>
  <path d="M265 150 V180" class="arrow" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>

  <path d="M348 88 H382" class="arrow" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>
  <path d="M348 117 H374 Q382 117 382 125" class="line-soft" stroke-width="2"/>
  <path d="M348 230 H382" class="arrow-strong" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>

  <path d="M542 62 H566 Q582 62 582 88" class="line-soft" stroke-width="2"/>
  <path d="M542 142 H566 Q582 142 582 119" class="line-soft" stroke-width="2"/>
  <path d="M542 231 H574" class="arrow" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>

  <path d="M542 219 H566 Q582 219 582 166" class="line-soft" stroke-width="2"/>
  <path d="M657 166 V198" class="arrow" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>

  <path d="M657 206 V174" class="arrow" stroke-width="2.5" marker-end="url(#arr)" style="color:inherit"/>

  <text x="355" y="214" class="tiny muted">reads / writes</text>
  <text x="550" y="214" class="tiny muted">invokes</text>
  <text x="604" y="188" class="tiny muted">network / subprocess / APIs</text>
</svg>
