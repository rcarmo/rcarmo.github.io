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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 202">
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
  <rect width="1040" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Go applets</text>
  <text x="120" y="74" text-anchor="middle" class="sub">cat · grep · wc · ...</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="380" y="56" text-anchor="middle" class="label">TinyGo compiler</text>
  <text x="380" y="74" text-anchor="middle" class="sub">multicall binary</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="640" y="56" text-anchor="middle" class="label">Native binary</text>
  <text x="640" y="74" text-anchor="middle" class="sub">linux/darwin/windows</text>

  <rect x="550" y="118" width="180" height="60" rx="8" class="box-warm"/>
  <text x="640" y="144" text-anchor="middle" class="label">WASM binary</text>
  <text x="640" y="162" text-anchor="middle" class="sub">4.7 MB sandboxed</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="900" y="56" text-anchor="middle" class="label">AI agent</text>
  <text x="900" y="74" text-anchor="middle" class="sub">wazero runtime</text>

  <path d="M210,60 L290,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,60 L496,60 Q510,60 510,74 L510,134 Q510,148 524,148 L550,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,148 L756,148 Q770,148 770,134 L770,74 Q770,60 784,60 L810,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="770" y="54" text-anchor="middle" class="sub">sandbox</text>

  <text x="520" y="198" text-anchor="middle" class="sub">Busybox utilities in Go, compilable to WASM for sandboxed agent execution</text>
</svg>
