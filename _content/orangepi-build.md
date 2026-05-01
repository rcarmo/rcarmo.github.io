---
section: retro-embedded
status: active
created: 2026-03-01
tagline: Debian image builder for Orange Pi 6 Plus — Cix P1 SoC patches on top of the official build system.
logo: assets/logos-opt/orangepi-build.png
---

## About
Forked from [orangepi-xunlong/orangepi-build](https://github.com/orangepi-xunlong/orangepi-build). Carries patches for the Orange Pi 6 Plus (Cix P1 SoC) Debian image build, on top of the official Orange Pi build system that covers Allwinner, Rockchip, Starfive, and Cix boards.

## How it works
The build system runs on Ubuntu 22.04 and cross-compiles a full Debian image for the target board. It handles U-Boot, kernel, device tree, rootfs assembly, and image packaging. The fork adds board-specific patches and configuration for the Orange Pi 6 Plus and its Cix P1 SoC — a newer addition to the Orange Pi lineup that isn't fully upstream yet.

## Features
### 🍊 Orange Pi 6 Plus
Board-specific patches for the Cix P1 SoC — a powerful ARM SoC for SBC workloads.

### 📦 Full Debian images
Produces ready-to-flash SD card or eMMC images with a working Debian userland.

### 🔧 Official build system
Based on the well-maintained orangepi-build toolchain — same workflow as all other Orange Pi boards.

### 🖥 Multi-board support
The upstream build system covers 20+ boards across Allwinner H6/H616/T527, Rockchip RK3399/RK3566/RK3588, Starfive JH7110, and Cix P1.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
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
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Kernel patches</text>
  <text x="120" y="74" text-anchor="middle" class="sub">DTS · drivers · defconfig</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">Build system</text>
  <text x="364" y="74" text-anchor="middle" class="sub">cross-compile toolchain</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-warm"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Kernel</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">6.x aarch64</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-warm"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">U-Boot</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">bootloader</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="608" y="56" text-anchor="middle" class="label">SD card image</text>
  <text x="608" y="74" text-anchor="middle" class="sub">bootable Armbian</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="848" y="56" text-anchor="middle" class="label">Orange Pi 6 Plus</text>
  <text x="848" y="74" text-anchor="middle" class="sub">RK3588 · 16 GB</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M698,60 L758,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="728" y="54" text-anchor="middle" class="sub">flash</text>

  <text x="484" y="174" text-anchor="middle" class="sub">Orange Pi 6 Plus kernel and U-Boot patches</text>
</svg>
