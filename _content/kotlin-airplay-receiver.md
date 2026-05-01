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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 160">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .hi2 { fill:#0d2220; stroke:#207060; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
      .hi2 { fill:#d1fae5; stroke:#059669; stroke-width:1.5; }
      .label{ fill:#1a2a40; } .sub{ fill:#5070a0; }
    }
    text { font-family:-apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- Apple device -->
  <rect x="8"   y="35" width="110" height="90" rx="8" class="box"/>
  <text x="63"  y="68" text-anchor="middle" class="label">Apple Device</text>
  <text x="63"  y="85" text-anchor="middle" class="sub">iPhone / iPad</text>
  <text x="63"  y="101" text-anchor="middle" class="sub">Mac / AirPlay</text>

  <line x1="118" y1="80" x2="154" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Native stack -->
  <rect x="156" y="15" width="160" height="130" rx="8" class="hi2"/>
  <text x="236" y="44" text-anchor="middle" class="label">Native C/C++ Stack</text>
  <text x="236" y="62" text-anchor="middle" class="sub">RAOP / AirPlay</text>
  <text x="236" y="78" text-anchor="middle" class="sub">H.264 decrypt + demux</text>
  <text x="236" y="94" text-anchor="middle" class="sub">AAC decode → PCM</text>
  <text x="236" y="110" text-anchor="middle" class="sub">Bonjour / DNS-SD</text>
  <text x="236" y="126" text-anchor="middle" class="sub">JNI bridge</text>

  <line x1="316" y1="80" x2="352" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Kotlin app -->
  <rect x="354" y="15" width="150" height="130" rx="8" class="hi"/>
  <text x="429" y="44" text-anchor="middle" class="label">Kotlin App</text>
  <text x="429" y="62" text-anchor="middle" class="sub">SurfaceView (H.264)</text>
  <text x="429" y="78" text-anchor="middle" class="sub">AudioTrack (PCM)</text>
  <text x="429" y="94" text-anchor="middle" class="sub">Lifecycle management</text>
  <text x="429" y="110" text-anchor="middle" class="sub">Android 8.1 / API 27</text>
  <text x="429" y="126" text-anchor="middle" class="sub">No UI — full-screen only</text>

  <line x1="504" y1="80" x2="540" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Device -->
  <rect x="542" y="35" width="110" height="90" rx="8" class="box"/>
  <text x="597" y="68" text-anchor="middle" class="label">ThinkSmart</text>
  <text x="597" y="85" text-anchor="middle" class="sub">View 8"</text>
  <text x="597" y="101" text-anchor="middle" class="sub">1280×800 display</text>
</svg>
