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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200">
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
  <rect width="520" height="200" class="bg" rx="8"/>
  
  <rect x="20" y="60" width="110" height="80" rx="6" class="box-accent" stroke-width="1.5"/>
    <text x="75" y="96" text-anchor="middle" class="label">Browser</text>
    <text x="75" y="109" text-anchor="middle" class="sublabel">xterm canvas</text>
  <line x1="130" y1="100" x2="170" y2="100" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <text x="150" y="90" text-anchor="middle" class="sublabel">WebSocket</text>
  <rect x="170" y="60" width="110" height="80" rx="6" class="box-green" stroke-width="1.5"/>
    <text x="225" y="96" text-anchor="middle" class="label">Go server</text>
    <text x="225" y="109" text-anchor="middle" class="sublabel">go-te state</text>
  <line x1="280" y1="80" x2="320" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="280" y1="120" x2="320" y2="120" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <rect x="320" y="60" width="110" height="38" rx="6" class="box" stroke-width="1.5"/>
    <text x="375" y="75" text-anchor="middle" class="label">PTY</text>
    <text x="375" y="88" text-anchor="middle" class="sublabel">shell process</text>
  <rect x="320" y="102" width="110" height="38" rx="6" class="box" stroke-width="1.5"/>
    <text x="375" y="117" text-anchor="middle" class="label">WASM renderer</text>
    <text x="375" y="130" text-anchor="middle" class="sublabel">vt100 parser</text>
  <text x="260" y="185" text-anchor="middle" class="sublabel">Multi-session dashboard: tile N terminals side-by-side</text>

</svg>
