---
section: terminal
status: active
created: 2026-01-24
tagline: Browser-based RDP client — full MS-RDPBCGR spec, Go backend, WASM frontend.
logo: assets/logos-opt/missing-0.png
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="98" text-anchor="middle" class="label">Browser</text>
  <text x="80" y="113" text-anchor="middle" class="sub">xterm.js · WebSocket</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">Go proxy</text>
  <text x="265" y="68" text-anchor="middle" class="sub">WebSocket→RDP</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="143" text-anchor="middle" class="label">WASM client</text>
  <text x="265" y="158" text-anchor="middle" class="sub">bitmap decode</text>
  <rect x="410" y="60" width="130" height="80" rx="8" class="box-b"/>
  <text x="475" y="98" text-anchor="middle" class="label">Windows</text>
  <text x="475" y="113" text-anchor="middle" class="sub">MS-RDPBCGR</text>
  <line x1="140" y1="100" x2="200" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="120" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="410" y2="90" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="140" x2="410" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
