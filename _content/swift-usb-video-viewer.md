---
section: macos
status: stable
created: 2026-04-26
logo: assets/logos-opt/swift-usb-video-viewer.png
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 130">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box  { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .hi   { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .label{ fill: #d0daf0; } .sub{ fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box  { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .hi   { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .label{ fill: #1a2a40; } .sub{ fill: #5070a0; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- HDMI source -->
  <rect x="8" y="30" width="110" height="70" rx="8" class="box"/>
  <text x="63" y="56" text-anchor="middle" class="label">HDMI Source</text>
  <text x="63" y="73" text-anchor="middle" class="sub">SBC / camera</text>
  <text x="63" y="88" text-anchor="middle" class="sub">/ console</text>

  <!-- Arrow -->
  <line x1="118" y1="65" x2="154" y2="65" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- USB dongle -->
  <rect x="156" y="30" width="110" height="70" rx="8" class="box"/>
  <text x="211" y="56" text-anchor="middle" class="label">USB Dongle</text>
  <text x="211" y="73" text-anchor="middle" class="sub">HDMI → UVC</text>
  <text x="211" y="88" text-anchor="middle" class="sub">$10 capture card</text>

  <!-- Arrow -->
  <line x1="266" y1="65" x2="302" y2="65" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- AVFoundation -->
  <rect x="304" y="30" width="130" height="70" rx="8" class="hi"/>
  <text x="369" y="56" text-anchor="middle" class="label">AVFoundation</text>
  <text x="369" y="73" text-anchor="middle" class="sub">auto source detect</text>
  <text x="369" y="88" text-anchor="middle" class="sub">+ live capture</text>

  <!-- Arrow -->
  <line x1="434" y1="65" x2="470" y2="65" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Floating window -->
  <rect x="472" y="30" width="160" height="70" rx="8" class="hi"/>
  <text x="552" y="56" text-anchor="middle" class="label">Floating Window</text>
  <text x="552" y="73" text-anchor="middle" class="sub">Daisy chrome · hover UI</text>
  <text x="552" y="88" text-anchor="middle" class="sub">all-spaces · resizable</text>
</svg>
