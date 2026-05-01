---
section: retro-embedded
status: stable
created: 2025-11-08
logo: assets/logos-opt/zmk-config-totem.png
tagline: ZMK keymap for the Totem — home row mods, combos, ZMK Studio.
---

## About
Production-ready ZMK config for the 34-key Totem split keyboard with ZMK Studio support for GUI keymap editing without reflashing. Home row mods tuned over months of daily use. 7:2 forks-to-stars — used as a template.

## How it works
ZMK Studio enables GUI keymap editing over USB without a firmware rebuild. Home row mod timing was tuned over months: long enough to avoid false triggers, short enough to avoid latency. Combo timing works reliably on the Totem's aggressive column stagger.

## Features
### 🖥 ZMK Studio
GUI keymap editing without reflashing.

### ✋ Tuned home row mods
Per-key timing from months of use.

### ⌨ 34-key layout
Combos for all punctuation.

### 🍴 Template-ready
7:2 forks-to-stars tells the story.

## Gallery
- [Base layer](assets/screenshots/zmk-config-totem/layer-base.png) — QWERTY, home row mods, thumb cluster
- [Sym layer](assets/screenshots/zmk-config-totem/layer-sym.png) — Symbols, brackets, sticky mods
- [Nav layer](assets/screenshots/zmk-config-totem/layer-nav.png) — Arrows, mouse, numbers
- [Adjust layer](assets/screenshots/zmk-config-totem/layer-adjust.png) — Bluetooth, media, function keys

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 120">
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
  <rect width="780" height="120" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">keymap.c</text>
  <text x="120" y="74" text-anchor="middle" class="sub">ZMK config</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="380" y="56" text-anchor="middle" class="label">GitHub CI</text>
  <text x="380" y="74" text-anchor="middle" class="sub">ZMK build action</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="640" y="56" text-anchor="middle" class="label">.uf2 firmware</text>
  <text x="640" y="74" text-anchor="middle" class="sub">Totem keyboard</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
