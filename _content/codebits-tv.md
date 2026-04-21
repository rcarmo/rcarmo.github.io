---
section: infrastructure
status: maintained
created: 2026-01-06
tagline: Digital signage for hackathons and events — multicast video streaming to any screen on the LAN, the ghetto way.
logo: assets/logos-opt/codebits-tv.png
---

## About
codebits-tv is a minimal Go server that streams video content to screens around a venue using IP multicast. Point it at a playlist of video files, plug screens into the LAN, and every display shows the same stream in sync — no HDMI matrix, no managed switches, no budget. Built for the Codebits hackathon and reused for similar events.

## How it works
The server reads a playlist, transcodes or repackages video via ffmpeg, and blasts the resulting UDP stream to a multicast group. Each display runs a lightweight receiver (VLC, ffplay, or a custom client) that joins the multicast group and renders the stream. A simple HTTP endpoint lets organisers update the playlist or switch content without touching the screens.

## Features
### 📺 IP multicast delivery
One sender, unlimited receivers — add screens without increasing server load or network traffic.

### 🎬 Playlist-driven
Define a playlist of video files or URLs; the server loops them and announces transitions over HTTP so clients can display titles.

### 🔧 ffmpeg pipeline
Video is fed through ffmpeg for format normalisation and timestamp injection — handles mixed source formats transparently.

### 🌐 HTTP control API
Simple REST endpoints to query status, update the playlist, and skip to the next item — controllable from any phone on the LAN.

### ⚡ Single binary
Compiled Go — deploy on any Linux box with ffmpeg installed; no other dependencies.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
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
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box-warm"/>
  <text x="100" y="91" text-anchor="middle" class="label">Go server</text>
  <text x="100" y="109" text-anchor="middle" class="sub">playlist + ffmpeg</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="91" text-anchor="middle" class="label">UDP multicast</text>
  <text x="330" y="109" text-anchor="middle" class="sub">224.0.0.251</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="50" text-anchor="middle" class="label">Screen 1</text>
  <text x="560" y="68" text-anchor="middle" class="sub">VLC/ffplay</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="132" text-anchor="middle" class="label">Screen N</text>
  <text x="560" y="150" text-anchor="middle" class="sub">any receiver</text>


  <text x="330" y="218" text-anchor="middle" class="sub">HTTP control API</text>

  <polyline points="180,95 250,95" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <polyline points="410,95 445,95 445,54 480,54" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,95 445,95 445,136 480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
