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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320">
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

  <!-- User -->
  <rect x="16" y="110" width="100" height="70" rx="10" class="box"/>
  <text x="66" y="140" text-anchor="middle" class="label">User</text>
  <text x="66" y="157" text-anchor="middle" class="sub">web · mobile</text>

  <!-- Streaming UI -->
  <rect x="156" y="40" width="150" height="80" rx="10" class="box-accent"/>
  <text x="231" y="70" text-anchor="middle" class="label">Streaming UI</text>
  <text x="231" y="87" text-anchor="middle" class="sub">chat · cards · widgets</text>
  <text x="231" y="102" text-anchor="middle" class="sub">attachments · timeline</text>

  <!-- Agent runtime -->
  <rect x="156" y="160" width="150" height="80" rx="10" class="box"/>
  <text x="231" y="190" text-anchor="middle" class="label">Agent runtime</text>
  <text x="231" y="207" text-anchor="middle" class="sub">tool calls · sessions</text>
  <text x="231" y="222" text-anchor="middle" class="sub">compaction · prompts</text>

  <!-- Extensions -->
  <rect x="346" y="20" width="140" height="55" rx="10" class="box-purple"/>
  <text x="416" y="44" text-anchor="middle" class="label">Extensions</text>
  <text x="416" y="61" text-anchor="middle" class="sub">custom tools · UI hooks</text>

  <!-- Skills -->
  <rect x="346" y="90" width="140" height="55" rx="10" class="box-purple"/>
  <text x="416" y="114" text-anchor="middle" class="label">Skills</text>
  <text x="416" y="131" text-anchor="middle" class="sub">on-demand workflows</text>

  <!-- Workspace state -->
  <rect x="346" y="160" width="140" height="80" rx="10" class="box"/>
  <text x="416" y="190" text-anchor="middle" class="label">Workspace</text>
  <text x="416" y="207" text-anchor="middle" class="sub">files · notes · memory</text>
  <text x="416" y="222" text-anchor="middle" class="sub">SQLite · keychain</text>

  <!-- Tools -->
  <rect x="530" y="50" width="150" height="80" rx="10" class="box-green"/>
  <text x="605" y="80" text-anchor="middle" class="label">Tools</text>
  <text x="605" y="97" text-anchor="middle" class="sub">read · edit · bash · search</text>
  <text x="605" y="112" text-anchor="middle" class="sub">images · office · schedule</text>

  <!-- External -->
  <rect x="530" y="170" width="150" height="80" rx="10" class="box-warm"/>
  <text x="605" y="200" text-anchor="middle" class="label">External</text>
  <text x="605" y="217" text-anchor="middle" class="sub">Proxmox · Portainer · SSH</text>
  <text x="605" y="232" text-anchor="middle" class="sub">GitHub · MCP · browser</text>

  <!-- Arrows: User → UI -->
  <line x1="116" y1="135" x2="154" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <!-- User → Agent -->
  <line x1="116" y1="155" x2="154" y2="185" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- UI ↔ Agent -->
  <line x1="231" y1="120" x2="231" y2="158" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <!-- Agent → Extensions -->
  <line x1="306" y1="175" x2="344" y2="60" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- Agent → Skills -->
  <line x1="306" y1="190" x2="344" y2="115" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- Agent → Workspace -->
  <line x1="306" y1="200" x2="344" y2="200" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <!-- Extensions → Tools -->
  <line x1="486" y1="47" x2="528" y2="75" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- Skills → Tools -->
  <line x1="486" y1="117" x2="528" y2="100" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- Workspace → External -->
  <line x1="486" y1="210" x2="528" y2="210" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <!-- Tools → External -->
  <line x1="605" y1="130" x2="605" y2="168" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>

  <!-- Labels -->
  <text x="330" y="265" text-anchor="middle" class="tiny sub">reads / writes</text>
  <text x="510" y="265" text-anchor="middle" class="tiny sub">invokes</text>
  <text x="630" y="155" text-anchor="middle" class="tiny sub">network</text>
  <text x="360" y="300" text-anchor="middle" class="tiny sub">single container · Supervisor · Bun runtime · /workspace volume</text>
</svg>
