---
section: ai-agents
featured: true
status: active
created: 2026-02-17
tagline: A self-hosted AI agent workspace — streaming UI, persistent state, no CDN.
logo: assets/logos-opt/missing-0.png
---

## About
PiClaw packages the Pi Coding Agent runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, draw.io, kanban boards, VNC client, and MCP access. One docker run command, no CDN, no setup wizard.

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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 280" width="640" height="280">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #1a1e24; }
      .box { fill: #21262d; stroke: #30363d; }
      .box-accent { fill: #0d2340; stroke: #2b6cb0; }
      .box-green { fill: #0d2a1f; stroke: #2a7a3a; }
      .box-warm { fill: #2a1e18; stroke: #c87020; }
      .label { fill: #e8d8d0; }
      .sublabel { fill: #705848; }
      .arrow { stroke: #705848; }
      .arrow-accent { stroke: #2b6cb0; }
      .line { stroke: #30363d; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #d0d7de; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-green { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .label { fill: #1a2a40; }
      .sublabel { fill: #4a6480; }
      .arrow { stroke: #90a8c0; }
      .arrow-accent { stroke: #3b82f6; }
      .line { stroke: #d0d7de; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sublabel { font-size: 11px; }
    .arrow { stroke-width: 1.5; fill: none; marker-end: url(#arr); }
    .arrow-accent { stroke-width: 1.5; fill: none; marker-end: url(#arr-accent); }
    .line { stroke-width: 1; fill: none; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
    <marker id="arr-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow-accent" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect width="640" height="280" class="bg" rx="8"/>
  
  <rect x="20" y="20" width="140" height="240" rx="6" class="box-accent" stroke-width="1.5"/>
    <text x="90" y="145" text-anchor="middle" class="label">Docker container</text>
    
  <rect x="35" y="45" width="110" height="40" rx="6" class="box-green" stroke-width="1.5"/>
    <text x="90" y="61" text-anchor="middle" class="label">Bun agent</text>
    <text x="90" y="74" text-anchor="middle" class="sublabel">Pi runtime</text>
  <rect x="35" y="100" width="110" height="40" rx="6" class="box" stroke-width="1.5"/>
    <text x="90" y="116" text-anchor="middle" class="label">Web UI</text>
    <text x="90" y="129" text-anchor="middle" class="sublabel">SSE + WS</text>
  <rect x="35" y="155" width="110" height="40" rx="6" class="box" stroke-width="1.5"/>
    <text x="90" y="171" text-anchor="middle" class="label">Terminal</text>
    <text x="90" y="184" text-anchor="middle" class="sublabel">Ghostty PTY</text>
  <rect x="35" y="210" width="110" height="40" rx="6" class="box" stroke-width="1.5"/>
    <text x="90" y="226" text-anchor="middle" class="label">Supervisor</text>
    <text x="90" y="239" text-anchor="middle" class="sublabel">PID 1</text>
  <line x1="200" y1="100" x2="240" y2="100" class="arrow"/>
  <rect x="240" y="60" width="150" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="315" y="78" text-anchor="middle" class="label">Browser</text>
    <text x="315" y="91" text-anchor="middle" class="sublabel">Web + editor + VNC</text>
  <line x1="200" y1="175" x2="240" y2="175" class="arrow"/>
  <rect x="240" y="155" width="150" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="315" y="173" text-anchor="middle" class="label">Shell / PTY</text>
    <text x="315" y="186" text-anchor="middle" class="sublabel">Ghostty web</text>
  <line x1="200" y1="65" x2="240" y2="65" class="arrow"/>
  <rect x="240" y="240" width="150" height="30" rx="6" class="box-warm" stroke-width="1.5"/>
    <text x="315" y="260" text-anchor="middle" class="label">Volume: /workspace</text>
    
  <line x1="35" y1="260" x2="240" y2="255" class="line"/>
  <rect x="420" y="60" width="190" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="515" y="78" text-anchor="middle" class="label">LLM providers</text>
    <text x="515" y="91" text-anchor="middle" class="sublabel">Anthropic / OpenAI / Ollama…</text>
  <rect x="420" y="120" width="190" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="515" y="138" text-anchor="middle" class="label">Tools</text>
    <text x="515" y="151" text-anchor="middle" class="sublabel">SSH / Proxmox / Portainer</text>
  <rect x="420" y="180" width="190" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="515" y="198" text-anchor="middle" class="label">Skills</text>
    <text x="515" y="211" text-anchor="middle" class="sublabel">TypeScript modules</text>
  <rect x="420" y="240" width="190" height="30" rx="6" class="box-warm" stroke-width="1.5"/>
    <text x="515" y="260" text-anchor="middle" class="label">Keychain + SQLite state</text>
    
  <line x1="390" y1="82" x2="420" y2="82" class="arrow-accent"/>
  <line x1="390" y1="142" x2="420" y2="142" class="arrow-accent"/>
  <line x1="390" y1="197" x2="420" y2="197" class="arrow-accent"/>

</svg>
