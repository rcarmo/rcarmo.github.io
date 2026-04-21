---
section: terminal
status: active
created: 2026-01-18
tagline: Go web terminal with multi-session dashboard mode — built for AI agent workflows.
logo: assets/logos-opt/webterm.png
---

## About
webterm serves PTY sessions over HTTP/WebSocket with a dashboard that tiles multiple active terminals in a single browser tab — built for monitoring several AI coding agents in parallel. WASM renderer, correct xterm handling, sticky mobile keybar.

## How it works
A Go HTTP server accepts WebSocket connections and spawns a PTY for each session. go-te maintains the server-side VT100/xterm screen state for live tile previews in dashboard mode. The frontend renders via WebAssembly for correct escape handling without a JS library. A mobile sticky keybar (Esc, Ctrl, Shift, arrows) makes it usable from a phone.

## Features
### 🖥 Multi-session dashboard
Tile N agent terminals side-by-side. Watch them run in parallel.

### ⚡ WASM renderer
Correct xterm/VT100 handling via WebAssembly.

### 📱 Mobile keybar
Sticky Esc/Ctrl/Shift/Tab/arrows with sticky combos.

### 🔌 Library-first
Powers the terminal in agentbox, piclaw, and ghostty-web.

## Posts
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Notes for February 8-15](https://taoofmac.com/space/notes/2026/02/15/1530) — 2026-02-15

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240">
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
  <rect width="760" height="240" class="bg" rx="8"/>

  <rect x="20" y="50" width="180" height="68" rx="8" class="box-accent"/>
  <text x="110" y="77" text-anchor="middle" class="label">Browser UI</text>
  <text x="110" y="95" text-anchor="middle" class="sub">dashboard + keybar</text>

  <rect x="20" y="136" width="180" height="68" rx="8" class="box-warm"/>
  <text x="110" y="163" text-anchor="middle" class="label">WASM renderer</text>
  <text x="110" y="181" text-anchor="middle" class="sub">VT100 / xterm parser</text>

  <rect x="290" y="50" width="180" height="68" rx="8" class="box-green"/>
  <text x="380" y="77" text-anchor="middle" class="label">Go server</text>
  <text x="380" y="95" text-anchor="middle" class="sub">HTTP + WebSocket</text>

  <rect x="290" y="136" width="180" height="68" rx="8" class="box-purple"/>
  <text x="380" y="163" text-anchor="middle" class="label">go-te state</text>
  <text x="380" y="181" text-anchor="middle" class="sub">tile previews / screen model</text>

  <rect x="560" y="92" width="180" height="68" rx="8" class="box"/>
  <text x="650" y="119" text-anchor="middle" class="label">PTY session</text>
  <text x="650" y="137" text-anchor="middle" class="sub">shell process</text>

  <path d="M200,84 L245,84 Q255,84 255,84 L290,84" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <text x="245" y="72" text-anchor="middle" class="sub">WebSocket</text>

  <path d="M110,118 L110,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M380,118 L380,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M470,84 L515,84 Q525,84 525,94 L525,116 Q525,126 535,126 L560,126" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>

  <text x="380" y="230" text-anchor="middle" class="sub">Multi-session dashboard: tile N agent terminals side-by-side</text>
</svg>
