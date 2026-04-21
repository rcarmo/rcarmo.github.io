---
section: ai-agents
status: active
created: 2026-01-30
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
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
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="91" text-anchor="middle" class="label">Browser</text>
  <text x="100" y="109" text-anchor="middle" class="sub">mobile UI</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="91" text-anchor="middle" class="label">vibes server</text>
  <text x="330" y="109" text-anchor="middle" class="sub">Python/aiohttp</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="50" text-anchor="middle" class="label">ACP agent</text>
  <text x="560" y="68" text-anchor="middle" class="sub">copilot / codex</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="132" text-anchor="middle" class="label">Pi agent</text>
  <text x="560" y="150" text-anchor="middle" class="sub">RPC / pi-mono</text>

  <text x="330" y="218" text-anchor="middle" class="sub">Single Python file — zero build step</text>

  <polyline points="180,95 250,95" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,95 445,95 445,54 480,54" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,95 445,95 445,136 480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
