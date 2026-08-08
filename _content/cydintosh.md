---
id: cydintosh
repo: rcarmo/cydintosh
section: retro-embedded
status: experimental
created: 2026-04-15
logo: assets/logos-opt/cydintosh.png
tagline: Macintosh Plus emulator firmware for ESP32 display boards, with reproducible builds and browser flashing.
---

## About
`cydintosh` runs a Macintosh Plus emulator on small ESP32 display boards. This fork concentrates on repeatable board profiles, browser-flashable artefacts and reliable bring-up for CYD2USB and the Sunton ESP32-8048S043C.

The emulator combines `umac` with the Musashi 68000 core. Users supply a Mac Plus ROM v3 and a bootable HFS disk image.

## How it works
A board profile selects display, touch, memory and storage settings. The ESP32-S3 profile loads a patched Mac ROM from flash and mounts the guest disk from LittleFS before starting the 68000 runtime.

The emulated 480×800 Macintosh framebuffer is rotated onto the 800×480 RGB panel. GT911 touch input enters through the board profile; ROM, firmware and filesystem images are packaged for serial or browser flashing.

## Gallery
- [Weather application](assets/screenshots/cydintosh/weather.jpg) — Macintosh software running on the ESP32-S3 display board
- [Wi-Fi application](assets/screenshots/cydintosh/wifi.jpg) — Network configuration inside the emulated desktop
- [Cydintosh control panel](assets/screenshots/cydintosh/control-panel.jpg) — Board and emulator controls

## Features
### Macintosh Plus runtime
Uses `umac` and Musashi with board-specific ROM patching and emulated RAM configuration.

### Validated ESP32-S3 profile
The ESP32-8048S043C profile detects 8MB octal PSRAM and GT911 touch, and boots System 6 with After Dark 2 from a 1.44MB HFS image.

### CYD build profiles
Retains a legacy ESP32-2432S028/CYD2USB build and an experimental rotated 512×384 profile.

### Browser flasher
Builds bootloader, partition, firmware, LittleFS and complete flash images for Web Serial deployment.

### Board-specific storage
The validated ESP32-S3 profile mounts its guest disk read-only because the current Sony write path is not reliable enough for desktop metadata writes.

### Optional networking
Wi-Fi setup is skipped when credentials are absent; emulator boot does not depend on network access.

## Posts
- [Emulation](https://taoofmac.com/space/emulation) — 2026-07-31
- [The M5Stack Tab5](https://taoofmac.com/space/reviews/2026/07/18/1920) — 2026-07-20

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 202">
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
      .sub { fill: #90a8c0; }
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
  <rect width="1200" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Flash image</text>
  <text x="120" y="74" text-anchor="middle" class="sub">bootloader · app · partitions</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Board profile</text>
  <text x="360" y="74" text-anchor="middle" class="sub">LCD · touch · memory · storage</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="56" text-anchor="middle" class="label">Patched Mac ROM</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Mac Plus v3</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="144" text-anchor="middle" class="label">LittleFS disk</text>
  <text x="600" y="162" text-anchor="middle" class="sub">HFS disk.img · read-only</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">umac + Musashi</text>
  <text x="840" y="74" text-anchor="middle" class="sub">68000 · 1MB Mac RAM</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">RGB panel</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">rotated framebuffer · GT911</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Macintosh Plus emulation on the ESP32-S3 display board</text>
</svg>
