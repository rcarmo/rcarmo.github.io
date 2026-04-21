---
section: terminal
status: active
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

  <rect x="20" y="76" width="120" height="68" rx="8" class="box-accent"/>
  <text x="80" y="104" text-anchor="middle" class="label">busybox</text>
  <text x="80" y="121" text-anchor="middle" class="sub">multi-call binary</text>

  <rect x="210" y="24" width="140" height="48" rx="8" class="box"/>
  <text x="280" y="44" text-anchor="middle" class="label">ls · cat · grep</text>
  <text x="280" y="59" text-anchor="middle" class="sub">native applets</text>

  <rect x="210" y="86" width="140" height="48" rx="8" class="box"/>
  <text x="280" y="106" text-anchor="middle" class="label">find · sed · awk</text>
  <text x="280" y="121" text-anchor="middle" class="sub">native applets</text>

  <rect x="210" y="148" width="140" height="48" rx="8" class="box"/>
  <text x="280" y="168" text-anchor="middle" class="label">ps · kill · xargs</text>
  <text x="280" y="183" text-anchor="middle" class="sub">native applets</text>

  <rect x="420" y="56" width="160" height="72" rx="8" class="box-green"/>
  <text x="500" y="84" text-anchor="middle" class="label">busybox.wasm</text>
  <text x="500" y="101" text-anchor="middle" class="sub">TinyGo · ~2 MB</text>

  <rect x="420" y="138" width="160" height="56" rx="8" class="box-warm"/>
  <text x="500" y="162" text-anchor="middle" class="label">WASM sandbox</text>
  <text x="500" y="179" text-anchor="middle" class="sub">stubbed OS features</text>

  <line x1="140" y1="110" x2="206" y2="48" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="140" y1="110" x2="206" y2="110" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="140" y1="110" x2="206" y2="172" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="350" y1="110" x2="416" y2="92" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="500" y1="128" x2="500" y2="134" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="310" y="212" text-anchor="middle" class="sub">Compiles to a native multi-call binary or a sandboxable WASM module</text>
</svg>
