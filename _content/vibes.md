---
section: ai
status: active
created: 2026-01-30
tagline: Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step.
logo: assets/logos-opt/vibes.png
---

## About
Vibes is a lightweight Python web app for talking to AI coding agents from a phone. Supports ACP (GitHub Copilot CLI, OpenAI Codex) and Pi agents via RPC. Single Python file server, single HTML UI, no build step.

## Motivation
I wanted something I could use on my iPhone and iPad, but I found the idea of using OpenClaw and 
After creating [Vibes](vibes), using GitHub Copilot and Codex through the ACP protocol felt limiting, so when I stumbled upon [Pi](https://pi.dev) and its amazing extensibility, I knew I had found a great way to explore how to build an agent-based IDE that I could run from my iPad. I am now converting it to Go, original Python code in the `python` branch.


## How it works
The server uses aiohttp with server-sent events for streaming. When a message arrives from the browser, it forwards to the configured agent backend and streams tokens back via SSE. The UI is a single HTML file — no bundler, no npm. Fork it and make it yours in an afternoon. PiClaw and Vibes share the same web UI codebase.

## Features
### 📱 Phone-first
Designed and tested on iOS/Android before desktop.

### ⚡ ACP + Pi RPC
copilot --acp, OpenAI Codex, Pi agents. Protocol adapters are pluggable.

### 🚿 SSE streaming
Live token streaming. No polling, no spinners.

## Posts
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400) — 2026-04-21
- [Notes for February 2-7](https://taoofmac.com/space/notes/2026/02/07/2000) — 2026-02-07
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1058 178">
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
  <rect width="1058" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">User</text>
  <text x="120" y="74" text-anchor="middle" class="sub">pick agent at runtime</text>

  <rect x="262" y="22" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="319" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="409" y="56" text-anchor="middle" class="label">Vibes runtime</text>
  <text x="409" y="74" text-anchor="middle" class="sub">ACP protocol layer</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Copilot</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">GitHub</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Codex</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">OpenAI</text>
  <rect x="458" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="499" y="119" text-anchor="middle" class="label" style="font-size:11px">Claude</text>
  <text x="499" y="133" text-anchor="middle" class="sub" style="font-size:9px">Anthropic</text>

  <rect x="608" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="698" y="56" text-anchor="middle" class="label">Docker sandbox</text>
  <text x="698" y="74" text-anchor="middle" class="sub">isolated execution</text>

  <rect x="848" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="938" y="56" text-anchor="middle" class="label">Workspace</text>
  <text x="938" y="74" text-anchor="middle" class="sub">code + AGENTS.md</text>

  <path d="M210,60 L319,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M499,60 L608,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M788,60 L848,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="529" y="174" text-anchor="middle" class="sub">Multi-agent coding sandbox — Copilot, Codex, Claude, Pi over ACP</text>
</svg>
