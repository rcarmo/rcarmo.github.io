---
section: macos
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
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
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">Plan 9</text>
  <text x="100" y="109" text-anchor="middle" class="sub">cpu server</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="91" text-anchor="middle" class="label">drawterm</text>
  <text x="330" y="109" text-anchor="middle" class="sub">macOS arm64</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-warm"/>
  <text x="560" y="50" text-anchor="middle" class="label">Metal GPU</text>
  <text x="560" y="68" text-anchor="middle" class="sub">HiDPI render</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="132" text-anchor="middle" class="label">Cocoa UI</text>
  <text x="560" y="150" text-anchor="middle" class="sub">keyboard/mouse</text>


  <path d="M180,95 L250,95" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M410,95 L435,95 Q445,95 445,85 L445,64 Q445,54 455,54 L480,54" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M410,95 L435,95 Q445,95 445,105 L445,126 Q445,136 455,136 L480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
