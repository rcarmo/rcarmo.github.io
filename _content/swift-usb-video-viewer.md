---
section: macos
status: stable
created: 2026-04-26
tagline: Native macOS floating window for USB video capture dongles — no HDMI switcher needed.
---

## About
A small native macOS utility that previews live video from a USB capture device in a lightweight floating window. Built for the all-too-common workflow of poking at single-board computers with a $10 USB dongle instead of fighting with monitor inputs.

## How it works
Uses AVFoundation to enumerate and capture from the first video device whose name contains `USB Video`. Renders the stream directly in a floating utility window with [Daisy](https://github.com/rcarmo/daisy)-style chrome: transparent titlebar, all-spaces behaviour, shadow, and movable window background. Window controls appear only on hover.

## Features
### 📺 Floating utility window
Transparent titlebar, all-spaces, always-on-top — stays out of the way until you need it.

### 🎛 Auto-source detection
Defaults to the first `USB Video` device; right-click to restart or switch sources.

### 🃏 Test card fallback
Shows a test card when no capture device is available.

### 🛠 Reproducible build
Single `make` command builds the app bundle at `.build/USBVideoViewer.app`; icon generated from source.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .label { fill: #d0daf0; } .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .label { fill: #1a2a40; } .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub   { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>
  <!-- USB dongle -->
  <rect x="10" y="35" width="110" height="50" rx="8" class="box"/>
  <text x="65" y="57" text-anchor="middle" class="label">USB Dongle</text>
  <text x="65" y="74" text-anchor="middle" class="sub">HDMI → USB</text>
  <!-- Arrow -->
  <line x1="120" y1="60" x2="160" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- AVFoundation -->
  <rect x="162" y="35" width="120" height="50" rx="8" class="box-accent"/>
  <text x="222" y="57" text-anchor="middle" class="label">AVFoundation</text>
  <text x="222" y="74" text-anchor="middle" class="sub">source detect + capture</text>
  <!-- Arrow -->
  <line x1="282" y1="60" x2="322" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- Floating window -->
  <rect x="324" y="35" width="120" height="50" rx="8" class="box-accent"/>
  <text x="384" y="57" text-anchor="middle" class="label">Floating Window</text>
  <text x="384" y="74" text-anchor="middle" class="sub">Daisy chrome + hover controls</text>
  <!-- Arrow -->
  <line x1="444" y1="60" x2="484" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- Screen -->
  <rect x="486" y="35" width="24" height="50" rx="4" class="box"/>
  <text x="498" y="65" text-anchor="middle" class="sub" transform="rotate(-90,498,65)">🖥</text>
</svg>
