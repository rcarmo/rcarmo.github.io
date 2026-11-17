---
section: agents
featured: true
status: stable
created: 2026-02-17
tagline: The Pi coding agent in a technicolor web trenchcoat -- [infinite tools](https://rcarmo.github.io/piclaw-addons)
logo: assets/logos-opt/piclaw.png
---

## About
PiClaw gives the [Pi Coding Agent](https://pi.dev) a technicolor web trenchcoat: streaming chat, a file editor, an `xterm.js` terminal and viewers for inspecting the agent's work in the same browser window. It runs in Docker or from portable Linux and Apple Silicon macOS releases; Windows support is experimental.

It is a single-user workspace with persistent conversations, files and scheduled tasks. [Add-ons](https://rcarmo.github.io/piclaw-addons) supply Draw.io, Office tools and rendering, kanban boards, infrastructure integrations and the optional [Ghostty terminal](ghostty-web).

## Motivation
After creating [`webterm`](webterm) and [`vibes`](vibes), using GitHub Copilot and Codex through ACP felt limiting. But when I stumbled upon [Pi](https://pi.dev) and its extensibility, I knew I had found a great way to explore how to build an extensible web-based IDE that I could access from my iPhone and iPad.

## How it works
A Bun process hosts Pi and manages conversations, tools and workspace state. SQLite stores searchable history and task data. The browser receives streaming updates, while nightly Dream consolidation writes file-based notes for later conversations.

The default terminal uses `xterm.js`. A small tool set is active initially; `list_tools` and `activate_tools` expose more as needed, and bounded output limits context use. Skills, MCP connections and optional add-ons extend the workspace.

The agent runs with its process user's permissions. A fresh instance has no browser login gate, so keep it on localhost until authentication is configured. Remote use needs HTTPS and browser sign-in, separately from model-provider login. Containers limit access to their mounts and configured network; a native install uses the host account's access.

## Features
### 💬 Streaming chat
Markdown, maths, attachments, model selection, live steering, queued follow-ups and /btw side conversations.

### 🗂 Workspace tools
File tree, CodeMirror editor, xterm.js terminal, PDF/image/video/table viewers and VNC panes.

### 🔌 Model providers
Configured cloud providers and local OpenAI-compatible servers. Self-hosting the workspace does not keep requests to external models on-device.

### 🧠 Persistent state
Searchable history, scheduled tasks and file-based Dream memory. Keep the data directories when upgrading.

### 🧩 Add-ons
Install Office tools, Draw.io, kanban, Ghostty, infrastructure management and paired-instance messaging from the [catalogue](https://rcarmo.github.io/piclaw-addons/).

### 📦 Deployment choices
Docker is recommended; portable releases bundle Bun and dependencies for supported native hosts. Pin a release for repeatable deployment.

### 🔐 Browser access
TOTP and passkeys protect remote browser access once configured.

### 🌍 Desktop and mobile UI
English, Simplified Chinese and Japanese interfaces, with layouts for desktop browsers, phones and tablets.

## Gallery
- [a demo of piclaw, created by piclaw itself](assets/screenshots/piclaw/piclaw-demo.mp4)
- [iPad PWA with star trends](assets/screenshots/piclaw/00002piclaw.jpeg) — Clean mobile-first chat with GitHub digest
- [Agent implementing a feature](assets/screenshots/piclaw/00003piclaw.jpeg) — Issue resolution with validation and CI
- [Workspace tree + disk usage](assets/screenshots/piclaw/00004piclaw.jpeg) — File browser with storage sunburst
- [Gruvbox terminal + git log](assets/screenshots/piclaw/00005piclaw.jpeg) — Ghostty terminal with workspace tree
- [Agent session picker](assets/screenshots/piclaw/00010piclaw.jpeg) — Multiple named agent sessions
- [Theme picker](assets/screenshots/piclaw/00020piclaw.jpeg) — 16 built-in themes with live preview
- [Add-on catalog](assets/screenshots/piclaw/00025piclaw.jpeg) — In-app add-on browser and installer
- [Portainer settings](assets/screenshots/piclaw/00030piclaw.jpeg) — Add-on configuration with keychain integration

## Posts
- [We Need To Start Seeing Other Agents](https://taoofmac.com/space/blog/2026/10/10/1200) — 2026-10-10
- [Notes for September 13-20](https://taoofmac.com/space/notes/2026/09/20/1800) — 2026-09-20
- [Notes for August 17–23](https://taoofmac.com/space/notes/2026/08/23/1519) — 2026-08-23
- [Building Piclaw on Top of an Opinionated Coding Agent](https://taoofmac.com/space/blog/2026/08/21/2218) — 2026-08-21
- [The Chuwi MiniBook X N150, One Year Later](https://taoofmac.com/space/reviews/2026/07/25/1700) — 2026-07-25

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 276">
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
    .sub { fill: #243b53; }
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
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="276" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">User</text>
  <text x="120" y="74" text-anchor="middle" class="sub">web · mobile</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Streaming UI</text>
  <text x="360" y="74" text-anchor="middle" class="sub">attachments · timeline</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="144" text-anchor="middle" class="label">Agent runtime</text>
  <text x="360" y="162" text-anchor="middle" class="sub">compaction · prompts</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="56" text-anchor="middle" class="label">Extensions</text>
  <text x="600" y="74" text-anchor="middle" class="sub">custom tools · UI hooks</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="144" text-anchor="middle" class="label">Skills</text>
  <text x="600" y="162" text-anchor="middle" class="sub">on-demand workflows</text>

  <rect x="510" y="206" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="232" text-anchor="middle" class="label">Workspace</text>
  <text x="600" y="250" text-anchor="middle" class="sub">SQLite · keychain</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Tools</text>
  <text x="840" y="74" text-anchor="middle" class="sub">built-in + add-on tools</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="840" y="144" text-anchor="middle" class="label">External</text>
  <text x="840" y="162" text-anchor="middle" class="sub">GitHub · MCP · browser</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,134 Q240,148 254,148 L270,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M360,90 L360,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L466,148 Q480,148 480,134 L480,74 Q480,60 494,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L466,148 Q480,148 480,162 L480,222 Q480,236 494,236 L510,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M360,178 L360,254 Q360,272 378,272 L708,272 Q732,272 732,248 L732,108 Q732,96 744,96 L818,96 Q824,96 824,90" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
