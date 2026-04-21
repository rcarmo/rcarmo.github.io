---
section: ai-agents
status: active
created: 2026-01-11
tagline: Docker sandbox for coding agents — preinstalled runtimes, opt-in services, DinD.
logo: assets/logos-opt/agentbox.png
---

## About
Agentbox is a Debian Trixie container with Copilot CLI, Claude, Codex, and Pi preinstalled alongside `git`, `gh`, `bun`, `uv`, and `brew`. 

It provides Docker, `ssh`, and a GUI image with RDP (disabled by default, enabled via env vars) and an XFCE desktop environment, as well as a workspace skeleton with `SKILL.md` templates to help coding harnesses feel at home.

## How it works
The entrypoint checks `ENABLE_DOCKER`, `ENABLE_SSH`, and `ENABLE_RDP` and starts only what you asked for — all three default to off. The agent user gets passwordless sudo, and the workspace skeleton at `/home/agent/workspace-skel` copies into `/workspace` on first use without overwriting files.

## Features
### 🤖 Agents preinstalled
Copilot CLI, Claude, Codex, Pi baked in. Toad, OpenCode and Gemini via `make` targets.

### 🔒 Opt-in services
Docker, SSH, RDP all off by default. Enable explicitly.

### 🖥 CLI and GUI images
`:latest` is headless. `:gui` adds XFCE, XRDP, VS Code.

### 📘 Workspace skeleton
`SKILL.md` templates without overwriting existing files.

### 🐳 Docker-in-Docker
Run privileged and agents get their own Docker daemon.

## Posts
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Thoughts on AI-Assisted Software Development in 2026](https://taoofmac.com/space/notes/2026/02/01/2130) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 230">
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

  <!-- Row 1: Agent runtimes -->
  <rect x="16" y="20" width="130" height="70" rx="8" class="box-green"/>
  <text x="81" y="48" text-anchor="middle" class="label">Agent CLIs</text>
  <text x="81" y="65" text-anchor="middle" class="sub">copilot · codex · pi</text>
  <text x="81" y="79" text-anchor="middle" class="sub">claude · toad</text>

  <rect x="170" y="20" width="130" height="70" rx="8" class="box"/>
  <text x="235" y="48" text-anchor="middle" class="label">Dev tools</text>
  <text x="235" y="65" text-anchor="middle" class="sub">git · gh · bun · uv</text>
  <text x="235" y="79" text-anchor="middle" class="sub">brew · make</text>

  <rect x="324" y="20" width="140" height="70" rx="8" class="box-purple"/>
  <text x="394" y="48" text-anchor="middle" class="label">Opt-in services</text>
  <text x="394" y="65" text-anchor="middle" class="sub">Docker-in-Docker</text>
  <text x="394" y="79" text-anchor="middle" class="sub">SSH · RDP + XFCE</text>

  <!-- Row 2: Runtime base -->
  <rect x="16" y="110" width="230" height="55" rx="8" class="box-accent"/>
  <text x="131" y="135" text-anchor="middle" class="label">Debian Trixie container</text>
  <text x="131" y="151" text-anchor="middle" class="sub">agent user · passwordless sudo</text>

  <rect x="270" y="110" width="194" height="55" rx="8" class="box-warm"/>
  <text x="367" y="135" text-anchor="middle" class="label">/workspace</text>
  <text x="367" y="151" text-anchor="middle" class="sub">bind mount · SKILL.md skeleton</text>

  <!-- Arrows: row 1 → row 2 -->
  <line x1="81" y1="90" x2="81" y2="108" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="235" y1="90" x2="235" y2="108" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="394" y1="90" x2="394" y2="108" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Dashed isolation boundary -->
  <line x1="16" y1="185" x2="464" y2="185" stroke="#5070a0" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="240" y="200" text-anchor="middle" class="sub">container isolation boundary · host mounts /workspace only</text>
</svg>
