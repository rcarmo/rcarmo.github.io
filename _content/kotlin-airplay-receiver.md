---
section: apple
status: active
created: 2026-04-28
logo: assets/logos-opt/kotlin-airplay-receiver.png
repo: rcarmo/kotlin-airplay-receiver
tagline: AirPlay receiver for the Lenovo ThinkSmart View — Kotlin + native RAOP, no UI, full-screen mirroring.
---

## About
A minimal Android AirPlay receiver built for the Lenovo ThinkSmart View (Android 8.1, 8-inch 1280×800 screen). Advertises itself as an AirPlay/RAOP target over Bonjour, receives H.264 screen mirroring and AAC audio from any Apple device, and renders full-screen with no in-app controls — the device just becomes a dedicated wireless display.

## How it works
The Kotlin application layer handles lifecycle, surface management, and audio output via `AudioTrack`. The native C/C++ stack underneath handles RAOP/AirPlay signalling, H.264 decryption and demux, AAC decoding, and JNI bridging to the Kotlin surface. DNS-SD registration uses vendored Java Bonjour bindings. The mirrored stream is held at 1280×720 and scaled to fill the screen by Android's surface compositor.

## Features
### 📡 AirPlay / RAOP receiver
Advertises under the device name — any Apple device sees it as a standard AirPlay target.

### 🎬 H.264 screen mirroring
Native decode pipeline; full-screen `SurfaceView` with no distortion on 1280×800.

### 🔊 AAC audio
RAOP audio stack decodes AAC and plays PCM through `AudioTrack`.

### 🖥 ThinkSmart View tuned
Designed for the Lenovo ThinkSmart View's 8.1 Android runtime and display constraints.

### 📦 CI-built APKs
GitHub Actions produces `Receiver-release.apk` on every push — no local Android toolchain needed.

### 🔒 GPLv3
Native Playfair component retains GPLv3; all vendored code documented in `docs/vendor-audit.md`.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150">
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
  <rect width="520" height="150" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">Apple Device</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Mac / AirPlay</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="380" y="56" text-anchor="middle" class="label">ThinkSmart</text>
  <text x="380" y="74" text-anchor="middle" class="sub">1280×800 display</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="260" y="142" text-anchor="middle" class="sub">No UI — full-screen only</text>
</svg>
