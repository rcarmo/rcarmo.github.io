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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 114">
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
  <rect width="1040" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser</text>
  <text x="120" y="74" text-anchor="middle" class="sub">xterm.js + canvas</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="380" y="56" text-anchor="middle" class="label">Go proxy</text>
  <text x="380" y="74" text-anchor="middle" class="sub">WebSocket gateway</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="640" y="56" text-anchor="middle" class="label">RDP protocol</text>
  <text x="640" y="74" text-anchor="middle" class="sub">WASM decoder</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="900" y="56" text-anchor="middle" class="label">Windows host</text>
  <text x="900" y="74" text-anchor="middle" class="sub">RDP 3389</text>

  <path d="M210,60 L290,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="250" y="54" text-anchor="middle" class="sub">WS</text>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="770" y="54" text-anchor="middle" class="sub">RDP</text>

  <text x="520" y="110" text-anchor="middle" class="sub">Browser-based Remote Desktop client via Go + WASM</text>
</svg>
