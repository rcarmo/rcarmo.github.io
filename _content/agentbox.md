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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 260" width="540" height="260">
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
  <rect width="540" height="260" class="bg" rx="8"/>
  
  <rect x="20" y="20" width="180" height="220" rx="6" class="box-accent" stroke-width="1.5"/>
    <text x="110" y="135" text-anchor="middle" class="label">Container (agentbox)</text>
    
  <rect x="35" y="45" width="150" height="38" rx="6" class="box-green" stroke-width="1.5"/>
    <text x="110" y="60" text-anchor="middle" class="label">Agent CLI</text>
    <text x="110" y="73" text-anchor="middle" class="sublabel">copilot / codex / pi</text>
  <rect x="35" y="95" width="150" height="38" rx="6" class="box" stroke-width="1.5"/>
    <text x="110" y="110" text-anchor="middle" class="label">Dev tools</text>
    <text x="110" y="123" text-anchor="middle" class="sublabel">git / gh / bun / uv</text>
  <rect x="35" y="145" width="150" height="38" rx="6" class="box" stroke-width="1.5"/>
    <text x="110" y="160" text-anchor="middle" class="label">Optional services</text>
    <text x="110" y="173" text-anchor="middle" class="sublabel">Docker / SSH / RDP</text>
  <rect x="35" y="195" width="150" height="30" rx="6" class="box-warm" stroke-width="1.5"/>
    <text x="110" y="215" text-anchor="middle" class="label">agent user + sudo</text>
    
  <line x1="200" y1="100" x2="250" y2="80" class="arrow"/>
  <line x1="200" y1="165" x2="250" y2="165" class="arrow"/>
  <rect x="250" y="60" width="150" height="40" rx="6" class="box" stroke-width="1.5"/>
    <text x="325" y="76" text-anchor="middle" class="label">webterm</text>
    <text x="325" y="89" text-anchor="middle" class="sublabel">dashboard mode</text>
  <rect x="250" y="145" width="150" height="40" rx="6" class="box" stroke-width="1.5"/>
    <text x="325" y="161" text-anchor="middle" class="label">RDP / SSH</text>
    <text x="325" y="174" text-anchor="middle" class="sublabel">remote access</text>
  <rect x="250" y="200" width="150" height="40" rx="6" class="box-warm" stroke-width="1.5"/>
    <text x="325" y="216" text-anchor="middle" class="label">/workspace</text>
    <text x="325" y="229" text-anchor="middle" class="sublabel">bind mount</text>
  <line x1="200" y1="210" x2="250" y2="210" class="line"/>
  <text x="270" y="248" text-anchor="middle" class="sublabel">host filesystem isolation boundary</text>
  <line x1="20" y1="240" x2="540" y2="240" class="line" style="stroke-dasharray:4,4"/>

</svg>
