---
section: retro-embedded
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 114">
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
  <rect width="720" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="120" y="56" text-anchor="middle" class="label">68K / PPC</text>
  <text x="120" y="74" text-anchor="middle" class="sub">guest Mac code</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">ARM64 JITs</text>
  <text x="360" y="74" text-anchor="middle" class="sub">BasiliskII + SheepShaver</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="600" y="56" text-anchor="middle" class="label">ARM64 host</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Apple Silicon / Raspberry Pi</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="360" y="110" text-anchor="middle" class="sub">68K via BasiliskII JIT · PPC via SheepShaver JIT on ARM64</text>
</svg>
