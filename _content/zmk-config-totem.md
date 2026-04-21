---
section: hardware
status: stable
created: 2025-11-08
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

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180">
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
  <rect x="20" y="50" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="88" text-anchor="middle" class="label">keymap.c</text>
  <text x="80" y="103" text-anchor="middle" class="sub">ZMK config</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="265" y="88" text-anchor="middle" class="label">GitHub CI</text>
  <text x="265" y="103" text-anchor="middle" class="sub">ZMK build action</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-green"/>
  <text x="450" y="88" text-anchor="middle" class="label">.uf2 firmware</text>
  <text x="450" y="103" text-anchor="middle" class="sub">Totem keyboard</text>
  <line x1="140" y1="90" x2="200" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <line x1="330" y1="90" x2="390" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
</svg>
