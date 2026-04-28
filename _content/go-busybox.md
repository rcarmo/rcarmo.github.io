---
section: terminal
status: experimental
created: 2026-02-07
tagline: 57 BusyBox utilities in Go — 2 MB WASM binary, 387/387 tests passing.
logo: assets/logos-opt/go-busybox.png
---

## About
go-busybox implements 57 BusyBox-compatible utilities in Go. Compiles to a static native binary or a 2 MB WebAssembly module via TinyGo. All 387 BusyBox reference test cases pass.

## How it works
A multi-call binary: invoke as busybox ls or symlink a name to the binary. Each applet is a Go package under cmd/. The WASM target uses TinyGo for a 2 MB binary. OS-dependent operations return stubs under WASM so applets degrade gracefully without panicking.

## Features
### 📦 57 applets, 100% tests
ash, awk, grep, find, sed, ls, ps, tar, wget, and more.

### 🌐 2 MB WASM
TinyGo target. Run under wasmtime with no host access.

### 📦 Static binary
No shared libraries, no runtime deps, any GOARCH.

### 🛡 Sandbox-safe
OS-dependent applets stub under WASM.

## Posts
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01
- [Notes for February 2-7](https://taoofmac.com/space/notes/2026/02/07/2000) — 2026-02-07
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

  <rect x="20" y="86" width="150" height="68" rx="8" class="box-accent"/>
  <text x="95" y="113" text-anchor="middle" class="label">busybox</text>
  <text x="95" y="131" text-anchor="middle" class="sub">multi-call entrypoint</text>

  <rect x="250" y="26" width="180" height="56" rx="8" class="box"/>
  <text x="340" y="50" text-anchor="middle" class="label">ls · cat · grep</text>
  <text x="340" y="67" text-anchor="middle" class="sub">cmd/* applets</text>

  <rect x="250" y="92" width="180" height="56" rx="8" class="box"/>
  <text x="340" y="116" text-anchor="middle" class="label">find · sed · awk</text>
  <text x="340" y="133" text-anchor="middle" class="sub">cmd/* applets</text>

  <rect x="250" y="158" width="180" height="56" rx="8" class="box"/>
  <text x="340" y="182" text-anchor="middle" class="label">ps · tar · wget</text>
  <text x="340" y="199" text-anchor="middle" class="sub">57 utilities total</text>

  <rect x="510" y="40" width="190" height="64" rx="8" class="box-green"/>
  <text x="605" y="66" text-anchor="middle" class="label">Static native binary</text>
  <text x="605" y="84" text-anchor="middle" class="sub">single executable</text>

  <rect x="510" y="126" width="190" height="64" rx="8" class="box-warm"/>
  <text x="605" y="152" text-anchor="middle" class="label">busybox.wasm</text>
  <text x="605" y="170" text-anchor="middle" class="sub">TinyGo · ~2 MB · stubs</text>

  <path d="M170,120 L210,120 Q220,120 220,110 L220,64 Q220,54 230,54 L250,54" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M170,120 L250,120" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M170,120 L210,120 Q220,120 220,130 L220,186 Q220,186 230,186 L250,186" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>

  <path d="M430,54 L470,54 Q480,54 480,60 L480,72 Q480,72 490,72 L510,72" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M430,120 L470,120 Q480,120 480,136 L480,158 Q480,158 490,158 L510,158" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M430,186 L470,186 Q480,186 480,172 L480,158 Q480,158 490,158 L510,158" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>

  <text x="380" y="230" text-anchor="middle" class="sub">Compiles to a native multi-call binary or a sandboxable WASM module</text>
</svg>
