---
section: macos
status: maintained
tagline: Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb.
---

## About
Fork targeting Raspberry Pi with SDL2 framebuffer/KMS — no X11, no desktop required. Pre-built arm64 .deb packages in releases. Basilisk II runs System 6–8; SheepShaver runs Mac OS 8.6–9.0.4.

## How it works
SDL2 is compiled without OpenGL, Wayland, and X11 to reduce dependencies and startup time. The framebuffer/KMS backend writes directly to the display without a compositor. Pre-built .deb packages install with dpkg -i. Used as the emulation layer in the Maclock project.

## Features
### 🥧 Raspberry Pi optimised
SDL2 framebuffer/KMS, no X11. Pi Zero through Pi 5.

### 📦 Pre-built packages
arm64 .deb in GitHub Releases. dpkg -i and run.

### 💻 68k and PowerPC
Basilisk II for System 6–8. SheepShaver for Mac OS 8.6–9.0.4.

### 🖥 Direct framebuffer
Lower latency than X11.

## Posts
- [Notes for July 2024](https://taoofmac.com/space/notes/2024/07/21/1800) — 2024-07-21
- [Notes, 2025-12-31](https://taoofmac.com/space/notes/2025/12/31/1830) — 2025-12-31
- [Notes for March 23-29](https://taoofmac.com/space/notes/2026/03/29/1300) — 2026-03-29
- [Notes for March 30 – April 5](https://taoofmac.com/space/notes/2026/04/05/1700) — 2026-04-05

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
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
  <rect x="20" y="50" width="130" height="80" rx="8" class="box-warm"/>
  <text x="85" y="88" text-anchor="middle" class="label">68k / PPC</text>
  <text x="85" y="103" text-anchor="middle" class="sub">guest code</text>
  <rect x="210" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="275" y="88" text-anchor="middle" class="label">ARM64 JIT</text>
  <text x="275" y="103" text-anchor="middle" class="sub">code translator</text>
  <rect x="400" y="50" width="130" height="80" rx="8" class="box-b"/>
  <text x="465" y="88" text-anchor="middle" class="label">Apple Silicon</text>
  <text x="465" y="103" text-anchor="middle" class="sub">native execution</text>
  <line x1="150" y1="90" x2="210" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="340" y1="90" x2="400" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="275" y="143" text-anchor="middle" class="sub">Basilisk II · SheepShaver</text>
</svg>
