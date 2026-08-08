---
id: dotnet-jellyfin-livetube
repo: rcarmo/dotnet-jellyfin-livetube
section: networking
status: active
created: 2026-08-06
logo: assets/logos-opt/dotnet-jellyfin-livetube.png
tagline: Jellyfin plugin for virtual live-TV channels and Android-compatible catch-up from libraries and Invidious.
---

## About
LiveTube is a maintained fork of `JPKribs/jellyfin-plugin-livechannels` for Jellyfin 10.11.x. It builds looping live-TV channels from local libraries or authenticated Invidious subscriptions and exposes recent programmes as ordinary catch-up items.

The fork adds compound content filters, dynamic sources, Invidious ingestion, Android TV catch-up and controlled transcoding without requiring an external tuner service or modified client.

## How it works
Library queries and four-hour Invidious feed refreshes populate channel schedules and guide data. Live playback uses Jellyfin's Live TV service and a rolling MPEG-TS window.

Catch-up uses Jellyfin's channel catalogue. Local items point to library files; Invidious items use a short-lived rewritten MPD and a range proxy, so remote media is not stored permanently.

## Features
### Compound channels
Combines genre, tag, rating, year, studio, person, language and content-type filters, with include/exclude and any/all matching.

### Invidious sources
Reads authenticated subscription feeds and retains bounded metadata for 72 hours.

### Android catch-up
Presents recent scheduled items as finite VOD entries that work with the stock Android TV client.

### Controlled playback
Uses Jellyfin's configured encoder for fixed-format output, HDR tone mapping and subtitle burn-in when required.

### Local artwork cache
Caches programme and guide images without retaining the remote video itself.

### Explicit limits
Targets Jellyfin 10.11.x. Live streams are forward-only; local catch-up covers 24 hours, proxy tokens are memory-only and control MPDs expire.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Jellyfin library</text>
  <text x="120" y="74" text-anchor="middle" class="sub">media · metadata · filters</text>

  <rect x="30" y="118" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="120" y="144" text-anchor="middle" class="label">Invidious feed</text>
  <text x="120" y="162" text-anchor="middle" class="sub">authenticated subscriptions</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">LiveTube schedule</text>
  <text x="360" y="74" text-anchor="middle" class="sub">channels · guide · artwork</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Live TV</text>
  <text x="600" y="74" text-anchor="middle" class="sub">rolling MPEG-TS window</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="144" text-anchor="middle" class="label">Catch-up catalogue</text>
  <text x="600" y="162" text-anchor="middle" class="sub">local files · rewritten MPD</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Jellyfin client</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Android TV · browser</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M210,148 L226,148 Q240,148 240,134 L240,74 Q240,60 254,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Library and Invidious sources to live and catch-up playback</text>
</svg>
