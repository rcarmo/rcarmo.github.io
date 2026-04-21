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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 220">
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
  <rect width="620" height="220" class="bg" rx="8"/>

  <rect x="20" y="78" width="140" height="68" rx="8" class="box-accent"/>
  <text x="90" y="106" text-anchor="middle" class="label">Browser UI</text>
  <text x="90" y="123" text-anchor="middle" class="sub">dashboard + keybar</text>

  <rect x="230" y="78" width="150" height="68" rx="8" class="box-green"/>
  <text x="305" y="106" text-anchor="middle" class="label">Go server</text>
  <text x="305" y="123" text-anchor="middle" class="sub">PTY + go-te state</text>

  <rect x="450" y="28" width="130" height="56" rx="8" class="box"/>
  <text x="515" y="52" text-anchor="middle" class="label">PTY session</text>
  <text x="515" y="69" text-anchor="middle" class="sub">shell process</text>

  <rect x="450" y="122" width="130" height="56" rx="8" class="box-warm"/>
  <text x="515" y="146" text-anchor="middle" class="label">WASM renderer</text>
  <text x="515" y="163" text-anchor="middle" class="sub">VT100 / xterm parser</text>

  <line x1="160" y1="112" x2="226" y2="112" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <text x="193" y="100" text-anchor="middle" class="sub">WebSocket</text>
  <line x1="380" y1="112" x2="446" y2="56" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="380" y1="112" x2="446" y2="150" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="310" y="206" text-anchor="middle" class="sub">Multi-session dashboard: tile N terminals side-by-side</text>
</svg>
