---
section: hardware
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #21262d; stroke: #30363d; }
      .box-accent { fill: #0d2340; stroke: #2b6cb0; }
      .box-green { fill: #0d2a1f; stroke: #2a7a3a; }
      .box-warm { fill: #2a1e18; stroke: #c87020; }
      .label { fill: #e8e8e8; font-size: 13px; font-weight: 600; }
      .sub { fill: #8b949e; font-size: 11px; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #d0d7de; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-green { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .label { fill: #1a2a40; font-size: 13px; font-weight: 600; }
      .sub { fill: #6b7280; font-size: 11px; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5070a0"/></marker>
  </defs>
  <rect x="20" y="30" width="100" height="50" rx="8" class="box-accent"/>
  <text x="70" y="52" text-anchor="middle" class="label">U-Boot</text>
  <text x="70" y="68" text-anchor="middle" class="sub">bootloader</text>
  <rect x="20" y="100" width="100" height="50" rx="8" class="box-accent"/>
  <text x="70" y="122" text-anchor="middle" class="label">Kernel + DT</text>
  <text x="70" y="138" text-anchor="middle" class="sub">Cix P1 patches</text>
  <rect x="180" y="60" width="130" height="60" rx="8" class="box-green"/>
  <text x="245" y="87" text-anchor="middle" class="label">orangepi-build</text>
  <text x="245" y="103" text-anchor="middle" class="sub">cross-compile</text>
  <rect x="370" y="60" width="120" height="60" rx="8" class="box-warm"/>
  <text x="430" y="87" text-anchor="middle" class="label">Debian image</text>
  <text x="430" y="103" text-anchor="middle" class="sub">SD / eMMC</text>
  <line x1="120" y1="55" x2="180" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="120" y1="125" x2="180" y2="100" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="310" y1="90" x2="370" y2="90" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="260" y="165" text-anchor="middle" class="sub">Ubuntu 22.04 host — produces flashable ARM images</text>
</svg>
