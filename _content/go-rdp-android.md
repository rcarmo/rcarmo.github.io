---
id: go-rdp-android
repo: rcarmo/go-rdp-android
section: remote-access
tagline: Native Android RDP server — screen sharing without ADB, built on go-rdp
logo: assets/logos-opt/go-rdp-android.png
---

## About
An Android RDP server experiment that explores how far a normal installed app can go toward exposing the Android screen over RDP without relying on ADB as the runtime architecture. Built in Kotlin with a Go core via gomobile, reusing the [go-rdp](go-rdp) protocol stack for the RDP wire format. Screen capture uses MediaProjection; input injection uses the Accessibility Service API.

## How it works
The Kotlin app hosts a foreground service that acquires a MediaProjection virtual display for screen capture. Frames are handed to the Go RDP encoder (linked via gomobile) which handles the RDP protocol, bitmap compression, and client sessions. Input events from RDP clients are translated into Android accessibility actions — taps, swipes, and key presses — through a bound AccessibilityService. No root, no ADB tunnel required.

## Features

### 📱 No ADB required
Runs as a normal installed Android app — no root, no developer mode, no USB tunnel.

### 🔗 go-rdp core
Reuses [go-rdp](go-rdp)'s protocol stack via gomobile — RDP encoding, session management, bitmap compression.

### 🖥 MediaProjection capture
System-level screen capture through Android's MediaProjection API.

### 👆 Accessibility input injection
RDP mouse/keyboard events translated to Android taps, swipes, and keys via AccessibilityService.

### 🧪 Desktop mock server
Includes a standalone Go mock for testing RDP clients without an Android device.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
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
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">RDP client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">any standard client</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="364" y="56" text-anchor="middle" class="label">Android app</text>
  <text x="364" y="74" text-anchor="middle" class="sub">Kotlin foreground service</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">MediaProjection</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">screen capture</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Accessibility</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">input injection</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="608" y="56" text-anchor="middle" class="label">go-rdp core</text>
  <text x="608" y="74" text-anchor="middle" class="sub">gomobile · RDP encoder</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="56" text-anchor="middle" class="label">Android screen</text>
  <text x="848" y="74" text-anchor="middle" class="sub">display + touch events</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="242" y="54" text-anchor="middle" class="sub">RDP</text>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M698,60 L758,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="484" y="174" text-anchor="middle" class="sub">Native Android RDP server — Kotlin + Go via gomobile</text>
</svg>
