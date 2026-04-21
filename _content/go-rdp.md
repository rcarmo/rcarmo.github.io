---
section: terminal
status: active
created: 2026-01-24
tagline: Browser-based RDP client — full MS-RDPBCGR spec, Go backend, WASM frontend.
logo: assets/logos-opt/go-rdp.png
---

## About
go-rdp connects to Windows VMs via RDP from any browser without a native client. Go backend implementing the full MS-RDPBCGR specification as a reference implementation; WASM frontend for rendering.

## How it works
The Go backend handles RDP security negotiation, capability exchange, and display updates, streaming JPEG-encoded frames to the browser over WebSocket. Keyboard and mouse events are forwarded as RDP input PDUs. TinyGo compiles the frontend renderer to WASM.

## Features
### 🌐 No native client
RDP in a browser canvas via WebAssembly.

### 📋 Full spec
MS-RDPBCGR reference implementation.

### ⚙ Go + WASM
Docker image for one-command deployment.

## Posts
- [Notes for January 19-25](https://taoofmac.com/space/notes/2026/01/25/2030) — 2026-01-25
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Notes for February 8-15](https://taoofmac.com/space/notes/2026/02/15/1530) — 2026-02-15

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
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
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">Browser</text>
  <text x="100" y="109" text-anchor="middle" class="sub">xterm.js · WebSocket</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">Go proxy</text>
  <text x="330" y="68" text-anchor="middle" class="sub">WebSocket→RDP</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">WASM client</text>
  <text x="330" y="150" text-anchor="middle" class="sub">bitmap decode</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">Windows</text>
  <text x="560" y="109" text-anchor="middle" class="sub">MS-RDPBCGR</text>

</svg>
