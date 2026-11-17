---
id: minicore
repo: rcarmo/minicore
section: networking
status: experimental
created: 2026-09-25
tagline: A small FRRouting network lab with a 3D workbench, MCP diagnostics and reversible faults.
---

## About
Minicore simulates a small IP network using six FRRouting routers and two packet endpoints. A 3D browser workbench shows the topology alongside live routing diagnostics, while MCP tools let agents inspect the same network.

Humans and agents can also cause faults -- the fun bit -- then restore the lab and check that routing has recovered. Inspection and fault controls have separate permissions.

## How it works
Docker runs the routers and endpoints on isolated data links, with OSPF, a provider iBGP mesh and access eBGP sessions. A Python/uMCP service supplies the HTTP and MCP interfaces; Preact and Three.js render the workbench.

Read-only Operator tools expose inventory, neighbours, routes and bounded probes. Separately authenticated God tools apply fixed faults such as link loss, delay or a prefix blackhole. Whole-node faults can use an optional inventory-bound host service; the management application has no Docker socket or Linux capabilities.

## Features
### Live routing
Inspect interfaces, BGP/OSPF neighbours and exact-prefix comparisons between BGP, RIB and FIB.

### Interactive workbench
Select routers and links, move inspectors and follow live logs. An accessible fallback complements the 3D view.

### MCP diagnostics
Operator tools provide bounded observations and shared evidence without arbitrary shell access.

### Reversible faults
Apply predefined node/link faults and restore the baseline, including after an interrupted fault.

### Explicit access profiles
The default private profile permits anonymous Operator access on loopback. God tools always need credentials; remote access requires authentication, TLS and source filtering.

### Lab requirements
Targets Linux amd64 with Docker and user-systemd. This is a fixed troubleshooting lab; provisioning requires host permissions.

## Gallery
- [Minicore workbench](assets/screenshots/minicore/workbench.png) -- Live topology with BGP and interface inspectors

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #243b53; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser / MCP</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Workbench + tools</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Python / uMCP</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Operator / God access</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Restricted control</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Diagnostics + fixed faults</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">FRRouting lab</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Routers + endpoints</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Routing diagnostics and separately authorised lab faults</text>
</svg>