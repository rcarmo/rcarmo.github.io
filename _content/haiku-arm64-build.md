---
section: retro-embedded
status: active
created: 2026-04-18
tagline: Build environment and automation for compiling Haiku OS on ARM64.
logo: assets/logos-opt/haiku-arm64-build.png
---

## Gallery
- [Haiku desktop in QEMU](assets/screenshots/haiku-arm64-build/desktop-qemu.png) — Full desktop session from the ARM64 QEMU image.
- [Tracker running in QEMU](assets/screenshots/haiku-arm64-build/tracker-qemu.png) — File manager and desktop shell running on the generated image.

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
  <text x="120" y="56" text-anchor="middle" class="label">Haiku source</text>
  <text x="120" y="74" text-anchor="middle" class="sub">hrev + patches</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="380" y="56" text-anchor="middle" class="label">Cross-compiler</text>
  <text x="380" y="74" text-anchor="middle" class="sub">aarch64 GCC toolchain</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="640" y="56" text-anchor="middle" class="label">Disk image</text>
  <text x="640" y="74" text-anchor="middle" class="sub">anyboot ARM64</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="900" y="56" text-anchor="middle" class="label">QEMU</text>
  <text x="900" y="74" text-anchor="middle" class="sub">virt machine test</text>

  <rect x="810" y="118" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="900" y="144" text-anchor="middle" class="label">Real hardware</text>
  <text x="900" y="162" text-anchor="middle" class="sub">RPi4 / Orange Pi</text>

  <path d="M210,60 L290,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M730,60 L756,60 Q770,60 770,74 L770,134 Q770,148 784,148 L810,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="520" y="198" text-anchor="middle" class="sub">Cross-compiling Haiku OS for ARM64 with QEMU validation</text>
</svg>
