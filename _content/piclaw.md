---
section: ai
featured: true
status: active
created: 2026-02-17
tagline: A self-hosted AI agent workspace — mobile-first streaming UI, [infinite tools](https://github.com/rcarmo/piclaw-addons)
logo: assets/logos-opt/piclaw.png
---

## About
PiClaw packages the [Pi Coding Agent](https://pi.dev) runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, `draw.io`, kanban boards, VNC client, and MCP access. Its tool surface is effectively infinite thanks to a growing catalog of [community extensions and add-ons](https://github.com/rcarmo/piclaw-addons) covering Proxmox, Portainer, SSH, and more. One `docker run` command, one live workspace.

## Motivation
After creating [Vibes](vibes), using GitHub Copilot and Codex through the ACP protocol felt limiting, so when I stumbled upon [Pi](https://pi.dev) and its amazing extensibility, I knew I had found a great way to explore how to build an agent-based IDE that I could run from my iPad.

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
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400) — 2026-04-21
- [OpenClaw Ecosystem](https://taoofmac.com/space/ai/agentic/openclaw) — 2026-04-18
- [So You Want To Do Agentic Development](https://taoofmac.com/space/blog/2026/03/08/2130) — 2026-03-08
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 296">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="1040" height="296" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">User</text>
  <text x="120" y="74" text-anchor="middle" class="sub">web · mobile</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="380" y="56" text-anchor="middle" class="label">Streaming UI</text>
  <text x="380" y="74" text-anchor="middle" class="sub">attachments · timeline</text>

  <rect x="290" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="380" y="144" text-anchor="middle" class="label">Agent runtime</text>
  <text x="380" y="162" text-anchor="middle" class="sub">compaction · prompts</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="640" y="56" text-anchor="middle" class="label">Extensions</text>
  <text x="640" y="74" text-anchor="middle" class="sub">custom tools · UI hooks</text>

  <rect x="550" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="640" y="144" text-anchor="middle" class="label">Skills</text>
  <text x="640" y="162" text-anchor="middle" class="sub">on-demand workflows</text>

  <rect x="550" y="206" width="180" height="60" rx="8" class="box"/>
  <text x="640" y="232" text-anchor="middle" class="label">Workspace</text>
  <text x="640" y="250" text-anchor="middle" class="sub">SQLite · keychain</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="900" y="56" text-anchor="middle" class="label">Tools</text>
  <text x="900" y="74" text-anchor="middle" class="sub">images · office · schedule</text>

  <rect x="810" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="900" y="144" text-anchor="middle" class="label">External</text>
  <text x="900" y="162" text-anchor="middle" class="sub">GitHub · MCP · browser</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,134 Q250,148 264,148 L290,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M380,90 L380,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L496,148 Q510,148 510,134 L510,74 Q510,60 524,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L550,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L496,148 Q510,148 510,162 L510,222 Q510,236 524,236 L550,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,148 L756,148 Q770,148 770,134 L770,74 Q770,60 784,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,236 L756,236 Q770,236 770,222 L770,162 Q770,148 784,148 L810,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M900,90 L900,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
