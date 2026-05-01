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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 200">
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

  <!-- make deps / clone -->
  <rect x="16" y="60" width="110" height="80" rx="8" class="box-warm"/>
  <text x="71" y="90" text-anchor="middle" class="label">Makefile</text>
  <text x="71" y="107" text-anchor="middle" class="sub">deps · clone</text>
  <text x="71" y="122" text-anchor="middle" class="sub">toolchain · image</text>

  <!-- Cross-compiler -->
  <rect x="170" y="25" width="130" height="60" rx="8" class="box-accent"/>
  <text x="235" y="50" text-anchor="middle" class="label">GCC 13 cross</text>
  <text x="235" y="67" text-anchor="middle" class="sub">ARM64 → Haiku ABI</text>

  <!-- Haiku Jam build -->
  <rect x="170" y="110" width="130" height="60" rx="8" class="box"/>
  <text x="235" y="137" text-anchor="middle" class="label">Haiku + Jam</text>
  <text x="235" y="153" text-anchor="middle" class="sub">kernel · servers · BFS</text>

  <!-- MMC image -->
  <rect x="350" y="60" width="130" height="80" rx="8" class="box-green"/>
  <text x="415" y="90" text-anchor="middle" class="label">MMC image</text>
  <text x="415" y="107" text-anchor="middle" class="sub">EFI + Haiku ARM64</text>
  <text x="415" y="122" text-anchor="middle" class="sub">haiku-mmc.image</text>

  <!-- QEMU test -->
  <rect x="530" y="60" width="130" height="80" rx="8" class="box-purple"/>
  <text x="595" y="90" text-anchor="middle" class="label">QEMU virt</text>
  <text x="595" y="107" text-anchor="middle" class="sub">virtio-scsi-pci</text>
  <text x="595" y="122" text-anchor="middle" class="sub">make test</text>

  <!-- Arrows -->
  <line x1="126" y1="85" x2="168" y2="60" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="126" y1="115" x2="168" y2="135" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="300" y1="55" x2="348" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="300" y1="140" x2="348" y2="115" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="480" y1="100" x2="528" y2="100" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="350" y="185" text-anchor="middle" class="sub">Orange Pi 6 Plus (CIX P1) · Debian Trixie · native ARM64 build</text>
</svg>
