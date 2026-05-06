---
section: retro-embedded
status: experimental
created: 2025-01-01
tagline: Personal Plan 9/9front ports to oddball ARM SBCs
logo: assets/logos-opt/9front.png
---

## About
A port of [9front](http://9front.org) — the community fork of Plan 9 from Bell Labs — to the [Orange Pi 4 Pro](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-4-Pro.html) (Allwinner A733, 8-core ARM64). Provides a QEMU-based development workflow and SD card image builder for bringing up 9front on new hardware.

## Motivation
I needed a refresher on `uboot` as a stepping stone to get [Haiku](haiku-arm64-build) running that board, and Plan9/9front is a kernel simple enough to wrap my head around while doing hardware bringup. And being who I am, I decided to be systematic about it.

## How it works
A cross-compilation harness builds the kernel inside a running 9front QEMU instance via automated `expect` scripts. Port files in `port/a733/` are packed into a FAT image, mounted inside the VM, compiled against the 9front kernel tree, and the resulting kernel is extracted and placed into a bootable SD card image with Allwinner SPL and U-Boot.

## Features
### 🔧 QEMU-first development
Port files are edited on the host and injected into a live 9front QEMU session via a FAT portdisk image. `make kernel` automates the full compile-extract cycle.

### 🗂️ Arm64 code reuse
Reuses the 9front `sys/src/9/arm64/` shared kernel code — GICv3, ARM timer, MMU, trap, FPU — and adds only A733-specific drivers.

### 📟 UART driver
Custom `uartaw.c` — Allwinner UART (8250-compatible MMIO) at `0x02500000` for early console output.

### 📦 SD card image builder
Produces a 64 MB bootable image with Allwinner SPL at 8 KiB, U-Boot at 16.8 MiB, and a FAT32 partition containing the kernel and boot script.

### 🧩 Pinned bootstrap blobs
Board bootstrap binaries (SPL, U-Boot, DTB) are checked in under `bootstrap/orangepi4pro/` so the build is fully reproducible without a BSP toolchain.

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

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
    .sub { fill: #5070a0; }
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="120" y="56" text-anchor="middle" class="label">Host</text>
  <text x="120" y="74" text-anchor="middle" class="sub">make sdcard</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">QEMU 9front</text>
  <text x="360" y="74" text-anchor="middle" class="sub">→ 9a733.u</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="600" y="56" text-anchor="middle" class="label">SD Card Image</text>
  <text x="600" y="74" text-anchor="middle" class="sub">+ boot.scr</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">4 Pro</text>
  <text x="840" y="74" text-anchor="middle" class="sub">9front kernel</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="240" y="54" text-anchor="middle" class="sub">QEMU</text>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="720" y="54" text-anchor="middle" class="sub">flash</text>

  <text x="480" y="110" text-anchor="middle" class="sub">dd →</text>
</svg>
