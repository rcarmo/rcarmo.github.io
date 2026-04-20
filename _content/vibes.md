---
section: ai-agents
status: active
tagline: Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step.
logo: assets/logos-opt/vibes.png
---

## About
Vibes is a lightweight Python web app for talking to AI coding agents from a phone. Supports ACP (GitHub Copilot CLI, OpenAI Codex) and Pi agents via RPC. Single Python file server, single HTML UI, no build step.

## How it works
The server uses aiohttp with server-sent events for streaming. When a message arrives from the browser, it forwards to the configured agent backend and streams tokens back via SSE. The UI is a single HTML file — no bundler, no npm. Fork it and make it yours in an afternoon. PiClaw and Vibes share the same web UI codebase.

## Features
### 📱 Phone-first
Designed and tested on iOS/Android before desktop.

### ⚡ ACP + Pi RPC
copilot --acp, OpenAI Codex, Pi agents. Protocol adapters are pluggable.

### 🚿 SSE streaming
Live token streaming. No polling, no spinners.

### 🔩 Zero build step
One Python file. One HTML file. Clone and run.

## Posts
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01
- [Notes for February 2-7](https://taoofmac.com/space/notes/2026/02/07/2000) — 2026-02-07

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" width="480" height="180">
  <style>
    .bg{ fill: transparent; }
    .box{ fill: #161b22; stroke: #30363d; stroke-width:1.5; }
    .box-accent{ fill: #0d2040; stroke: #2b6cb0; stroke-width:1.5; }
    .box-green{ fill: #0a2218; stroke: #2a7a3a; stroke-width:1.5; }
    .box-warm{ fill: #221810; stroke: #c87020; stroke-width:1.5; }
    text{ font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; fill: #c9d1d9; }
    .label{ font-size: 12px; font-weight: 600; }
    .sub{ font-size: 10px; fill: #8b949e; }
    line{ stroke-width:1.5; }
    .arr{ stroke: #58a6ff; marker-end: url(#a); }
    .arrd{ stroke: #8b949e; marker-end: url(#ad); stroke-dasharray:4,3; }
  </style>
  <defs>
    <marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#58a6ff"/>
    </marker>
    <marker id="ad" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#8b949e"/>
    </marker>
  </defs>
  <rect width="480" height="180" class="bg" rx="8"/>
  
  <rect x="20" y="60" width="90" height="55" rx="5" class="box-accent"/><text x="65" y="84" text-anchor="middle" class="label">Browser</text><text x="65" y="98" text-anchor="middle" class="sub">mobile UI</text>
  <line x1="110" y1="87" x2="150" y2="87" class="arr"/>
  <text x="130" y="78" text-anchor="middle" class="sub">HTTP</text>
  <rect x="150" y="60" width="90" height="55" rx="5" class="box-green"/><text x="195" y="84" text-anchor="middle" class="label">vibes server</text><text x="195" y="98" text-anchor="middle" class="sub">Python/aiohttp</text>
  <line x1="240" y1="87" x2="280" y2="70" class="arr"/>
  <line x1="240" y1="87" x2="280" y2="110" class="arr"/>
  <rect x="280" y="50" width="110" height="40" rx="5" class="box"/><text x="335" y="67" text-anchor="middle" class="label">ACP agent</text><text x="335" y="81" text-anchor="middle" class="sub">copilot / codex</text>
  <rect x="280" y="100" width="110" height="40" rx="5" class="box"/><text x="335" y="117" text-anchor="middle" class="label">Pi agent</text><text x="335" y="131" text-anchor="middle" class="sub">RPC / pi-mono</text>
  <text x="240" y="165" text-anchor="middle" class="sub">Single Python file — zero build step</text>

</svg>
