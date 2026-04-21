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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5070a0"/></marker>
  </defs>
  <rect x="20" y="50" width="110" height="80" rx="8" class="box-warm"/>
  <text x="75" y="88" text-anchor="middle" class="label">Go server</text>
  <text x="75" y="103" text-anchor="middle" class="sub">playlist + ffmpeg</text>
  <rect x="190" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="255" y="88" text-anchor="middle" class="label">UDP multicast</text>
  <text x="255" y="103" text-anchor="middle" class="sub">224.0.0.251</text>
  <rect x="390" y="20" width="110" height="60" rx="8" class="box-b"/>
  <text x="445" y="53" text-anchor="middle" class="label">Screen 1</text>
  <text x="445" y="68" text-anchor="middle" class="sub">VLC/ffplay</text>
  <rect x="390" y="100" width="110" height="60" rx="8" class="box"/>
  <text x="445" y="133" text-anchor="middle" class="label">Screen N</text>
  <text x="445" y="148" text-anchor="middle" class="sub">any receiver</text>
  <line x1="130" y1="90" x2="190" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="80" x2="390" y2="50" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="100" x2="390" y2="130" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="255" y="145" text-anchor="middle" class="sub">HTTP control API</text>
</svg>
