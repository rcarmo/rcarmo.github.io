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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
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
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="50" text-anchor="middle" class="label">U-Boot</text>
  <text x="100" y="68" text-anchor="middle" class="sub">bootloader</text>

  <rect x="20" y="106" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="132" text-anchor="middle" class="label">Kernel + DT</text>
  <text x="100" y="150" text-anchor="middle" class="sub">Cix P1 patches</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="91" text-anchor="middle" class="label">orangepi-build</text>
  <text x="330" y="109" text-anchor="middle" class="sub">cross-compile</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-warm"/>
  <text x="560" y="91" text-anchor="middle" class="label">Debian image</text>
  <text x="560" y="109" text-anchor="middle" class="sub">SD / eMMC</text>


  <text x="330" y="218" text-anchor="middle" class="sub">Ubuntu 22.04 host — produces flashable ARM images</text>
</svg>
