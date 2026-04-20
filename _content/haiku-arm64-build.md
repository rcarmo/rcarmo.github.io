---
section: hardware
status: active
tagline: Build environment and automation for compiling Haiku OS on ARM64.
logo: assets/logos-opt/haiku-arm64-build.png
---

## About
A Makefile-driven build system for cross-compiling and natively building Haiku OS on ARM64 hardware. Aimed at running Haiku on single-board computers and Apple Silicon via QEMU, with reproducible builds and minimal host dependencies.

## How it works
The top-level Makefile orchestrates the full Haiku build toolchain — fetching sources, configuring the cross-compiler, and invoking Haiku's own Jam-based build system. A set of shell scripts handles environment setup, dependency checks, and image creation so the process works unattended on a fresh ARM64 host or inside a container.

## Features
### 🔧 Cross-compile toolchain
Sets up the full GCC cross-compiler for ARM64 from scratch, targeting the Haiku ABI.

### 📦 Reproducible builds
Pinned source revisions and a locked toolchain mean the same commit always produces the same image.

### 🖥️ QEMU integration
Includes launch scripts for testing the resulting ARM64 image under QEMU with virtio block and network devices.

### 🐳 Container-ready
Build steps run cleanly inside a Docker container — no host pollution, easy CI integration.

### ⚙️ Makefile-driven
Single `make` entry point covers fetch, configure, build, and image creation with sensible defaults.

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
  <rect x="20" y="60" width="110" height="80" rx="8" class="box-warm"/>
  <text x="75" y="98" text-anchor="middle" class="label">Makefile</text>
  <text x="75" y="113" text-anchor="middle" class="sub">single entry</text>
  <rect x="190" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="255" y="53" text-anchor="middle" class="label">GCC cross</text>
  <text x="255" y="68" text-anchor="middle" class="sub">ARM64 toolchain</text>
  <rect x="190" y="110" width="130" height="60" rx="8" class="box"/>
  <text x="255" y="143" text-anchor="middle" class="label">Haiku Jam</text>
  <text x="255" y="158" text-anchor="middle" class="sub">build system</text>
  <rect x="400" y="20" width="120" height="60" rx="8" class="box-b"/>
  <text x="460" y="53" text-anchor="middle" class="label">Haiku image</text>
  <text x="460" y="68" text-anchor="middle" class="sub">arm64 .iso</text>
  <rect x="400" y="110" width="120" height="60" rx="8" class="box"/>
  <text x="460" y="143" text-anchor="middle" class="label">QEMU</text>
  <text x="460" y="158" text-anchor="middle" class="sub">test & verify</text>
  <line x1="130" y1="100" x2="190" y2="70" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="130" y1="115" x2="190" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="70" x2="400" y2="50" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="400" y1="80" x2="400" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
