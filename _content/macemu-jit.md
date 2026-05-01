---
section: apple
status: maintained
created: 2025-12-30
logo: assets/logos-opt/macemu-jit.png
tagline: Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb.
---

## About
Fork targeting Raspberry Pi with SDL2 framebuffer/KMS — no X11, no desktop required. It includes ARM64 JIT implementations for both emulators: Basilisk II for 68K Macs and SheepShaver for PowerPC Macs. Pre-built arm64 .deb packages are available in releases.

## How it works
SDL2 is compiled without OpenGL, Wayland, and X11 to reduce dependencies and startup time. The framebuffer/KMS backend writes directly to the display without a compositor. The key addition is ARM64 JIT support in both emulator cores, translating 68K code in Basilisk II and PowerPC code in SheepShaver to native ARM64 at runtime. Pre-built .deb packages install with dpkg -i. Used as the emulation layer in the Maclock project.

## Features
### 🥧 Raspberry Pi optimised
SDL2 framebuffer/KMS, no X11. Pi Zero through Pi 5.

### 📦 Pre-built packages
arm64 .deb in GitHub Releases. dpkg -i and run.

### ⚡ Basilisk II ARM64 JIT
Native ARM64 JIT backend for emulating 68K Macs.

### ⚡ SheepShaver ARM64 JIT
Native ARM64 JIT backend for emulating PowerPC Macs.

### 🖥 Direct framebuffer
Lower latency than X11.

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26
- [Notes for March 30 – April 5](https://taoofmac.com/space/notes/2026/04/05/1700) — 2026-04-05
- [Notes for March 23-29](https://taoofmac.com/space/notes/2026/03/29/1300) — 2026-03-29
- [Notes for December 25-31](https://taoofmac.com/space/notes/2025/12/31/1830) — 2025-12-31
- [Notes for July 15-21](https://taoofmac.com/space/notes/2024/07/21/1800) — 2024-07-21

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 180">
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
  <rect width="660" height="180" class="bg" rx="8"/>

  <rect x="20" y="24" width="160" height="60" rx="8" class="box-warm"/>
  <text x="100" y="50" text-anchor="middle" class="label">68K / PPC</text>
  <text x="100" y="68" text-anchor="middle" class="sub">guest Mac code</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">ARM64 JITs</text>
  <text x="330" y="68" text-anchor="middle" class="sub">BasiliskII + SheepShaver</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="50" text-anchor="middle" class="label">ARM64 host</text>
  <text x="560" y="68" text-anchor="middle" class="sub">Apple Silicon / Raspberry Pi</text>


  <text x="330" y="168" text-anchor="middle" class="sub">68K via BasiliskII JIT · PPC via SheepShaver JIT on ARM64</text>

  <path d="M180,54 L250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M410,54 L480,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
</svg>
