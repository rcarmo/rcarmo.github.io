---
section: retro-embedded
status: stable
created: 2025-12-18
tagline: Plan 9 drawterm — HiDPI scaling, Metal rendering, Connect dialog, clipboard bridge.
logo: assets/logos-opt/drawterm.png
---

## About
This fork patches the macOS Cocoa backend for HiDPI-aware scaling, adds Metal-accelerated incremental redraws, a Preferences panel, a Connect dialog that persists credentials, and a macOS pasteboard bridge. Command maps to mod4 for rio bindings.

## How it works
Standard drawterm renders at 1:1 pixels on Retina screens — unreadable on modern Macs. This fork reads the display backing scale factor and scales the framebuffer accordingly. The Metal rendering path only invalidates the dirty region on each update instead of the full surface. The Connect dialog saves CPU/auth host and credentials to user defaults.

## Features
### 🔍 HiDPI scaling
Reads display scale. Legible on 5K displays.

### ⚡ Metal redraws
Dirty-region updates only. No full-screen flicker.

### ⌨ macOS keyboard + clipboard
Command → mod4, pasteboard bridge.

### 💾 Connect dialog
Host, user, password persist between launches.

## Posts
- [Notes for December 9-24](https://taoofmac.com/space/notes/2025/12/24/1400) — 2025-12-24
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 188">
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
  <rect width="720" height="188" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="120" y="56" text-anchor="middle" class="label">Plan 9</text>
  <text x="120" y="74" text-anchor="middle" class="sub">cpu server</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="360" y="56" text-anchor="middle" class="label">drawterm</text>
  <text x="360" y="74" text-anchor="middle" class="sub">macOS arm64</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="600" y="56" text-anchor="middle" class="label">Metal GPU</text>
  <text x="600" y="74" text-anchor="middle" class="sub">HiDPI render</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="144" text-anchor="middle" class="label">Cocoa UI</text>
  <text x="600" y="162" text-anchor="middle" class="sub">keyboard/mouse</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
