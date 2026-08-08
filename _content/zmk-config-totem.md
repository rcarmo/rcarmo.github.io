---
section: retro-embedded
status: stable
created: 2025-11-08
logo: assets/logos-opt/zmk-config-totem.png
tagline: ZMK configuration for the GEIST Totem split keyboard, with four layers, pointer controls and Studio editing.
---

## About
This repository builds custom ZMK firmware for the [GEIST Totem](https://github.com/GEIGEIGEIST/TOTEM) split keyboard with Seeeduino XIAO BLE controllers. The active user layout is `config/totem.keymap`; the larger keymap under `boards/shields/totem/` is the shield default.

The configuration provides four layers, mouse controls, sticky modifiers, Caps Word, NKRO, Bluetooth profile management and ZMK Studio support.

## How it works
`config/totem.keymap` defines Base, Symbol, Navigation and Adjust layers. Pressing the Symbol and Navigation layer keys together activates Adjust through a conditional layer.

GitHub Actions builds left, right and settings-reset UF2 images from `build.yaml`. Studio RPC is enabled on the left half, allowing live keymap changes over USB; the configuration keeps Studio locking enabled.

## Features
### Four-layer layout
Base uses QWERTY. Symbol contains brackets and operators, Navigation combines arrows, numbers and mouse controls, and Adjust contains media, Bluetooth and function keys.

### Mouse controls
Navigation provides pointer movement, buttons and scrolling through ZMK's pointing support.

### Sticky modifiers and Caps Word
One-shot modifiers use quick release and a one-second timeout. Caps Word continues through underscore, minus and backspace.

### ZMK Studio
The left-half build includes Studio RPC over USB UART. Studio locking remains enabled in `config/totem.conf`.

### NKRO and Bluetooth
NKRO is enabled, with commands for Bluetooth profile selection, clearing pairings and switching output between USB and Bluetooth.

### Reproducible firmware
The build matrix produces separate left/right UF2 files plus settings-reset firmware for recovery.

## Gallery
- [Base layer](assets/screenshots/zmk-config-totem/layer-base.png) — QWERTY, modifiers and thumb keys
- [Symbol layer](assets/screenshots/zmk-config-totem/layer-sym.png) — Brackets, operators and punctuation
- [Navigation layer](assets/screenshots/zmk-config-totem/layer-nav.png) — Arrows, numbers, pointer and scrolling controls
- [Adjust layer](assets/screenshots/zmk-config-totem/layer-adjust.png) — Bluetooth, media, output and function keys

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">User keymap</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Base · Sym · Nav · Adjust</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Build matrix</text>
  <text x="360" y="74" text-anchor="middle" class="sub">left · right · settings reset</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">GitHub Actions</text>
  <text x="600" y="74" text-anchor="middle" class="sub">ZMK firmware build</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="144" text-anchor="middle" class="label">ZMK Studio</text>
  <text x="600" y="162" text-anchor="middle" class="sub">USB RPC · locked</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">UF2 firmware</text>
  <text x="840" y="74" text-anchor="middle" class="sub">XIAO BLE halves</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="840" y="144" text-anchor="middle" class="label">Live keymap</text>
  <text x="840" y="162" text-anchor="middle" class="sub">layer edits without reflashing</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Totem keymap build and live Studio editing</text>
</svg>
