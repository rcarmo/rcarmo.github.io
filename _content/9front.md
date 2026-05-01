---
section: retro-embedded
status: experimental
created: 2025-01-01
tagline: Porting 9front to ARM64 — Orange Pi 4 Pro (Allwinner A733)
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 240">
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

  <!-- Host -->
  <rect x="20" y="60" width="140" height="120" rx="8" class="box"/>
  <text x="90" y="85" text-anchor="middle" class="label">Host</text>
  <text x="90" y="103" text-anchor="middle" class="sub">port/a733/</text>
  <text x="90" y="119" text-anchor="middle" class="sub">make portdisk</text>
  <text x="90" y="135" text-anchor="middle" class="sub">make kernel</text>
  <text x="90" y="151" text-anchor="middle" class="sub">make sdcard</text>

  <!-- QEMU 9front -->
  <rect x="220" y="60" width="150" height="120" rx="8" class="box-accent"/>
  <text x="295" y="85" text-anchor="middle" class="label">QEMU 9front</text>
  <text x="295" y="103" text-anchor="middle" class="sub">aarch64 VM</text>
  <text x="295" y="119" text-anchor="middle" class="sub">FAT portdisk</text>
  <text x="295" y="135" text-anchor="middle" class="sub">dircp + mk</text>
  <text x="295" y="151" text-anchor="middle" class="sub">→ 9a733.u</text>

  <!-- SD Image -->
  <rect x="440" y="60" width="150" height="120" rx="8" class="box-warm"/>
  <text x="515" y="85" text-anchor="middle" class="label">SD Card Image</text>
  <text x="515" y="103" text-anchor="middle" class="sub">SPL @ 8 KiB</text>
  <text x="515" y="119" text-anchor="middle" class="sub">U-Boot @ 16.8 MiB</text>
  <text x="515" y="135" text-anchor="middle" class="sub">FAT32: kernel</text>
  <text x="515" y="151" text-anchor="middle" class="sub">+ boot.scr</text>

  <!-- Hardware -->
  <rect x="660" y="74" width="100" height="92" rx="8" class="box-green"/>
  <text x="710" y="102" text-anchor="middle" class="label">Orange Pi</text>
  <text x="710" y="118" text-anchor="middle" class="label">4 Pro</text>
  <text x="710" y="138" text-anchor="middle" class="sub">A733 ARM64</text>
  <text x="710" y="154" text-anchor="middle" class="sub">9front kernel</text>

  <!-- Arrows -->
  <path d="M160,100 Q190,100 216,100" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <text x="188" y="95" text-anchor="middle" class="sub">FAT img</text>
  <path d="M370,120 Q405,120 436,120" fill="none" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <text x="403" y="115" text-anchor="middle" class="sub">extract</text>
  <path d="M590,120 Q625,120 656,120" fill="none" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="623" y="115" text-anchor="middle" class="sub">dd →</text>
</svg>
