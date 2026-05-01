---
repo: usetrmnl/byos_fastapi
section: retro-embedded
status: active
created: 2025-12-13
tagline: TRMNL BYOS — self-hosted FastAPI server for the TRMNL e-ink display, replacing the cloud backend.
logo: assets/logos-opt/byos_fastapi.png
---

## About
byos_fastapi is a self-hosted Python FastAPI backend for the TRMNL e-ink display device. TRMNL normally phones home to usetrmnl.com to fetch screen content; this server replaces that cloud dependency entirely, letting you run your own content pipeline on a Raspberry Pi or home server and push custom images to the device over your local network.

## How it works
The server implements the TRMNL firmware's HTTP polling protocol — the device wakes on its schedule, calls the configured server endpoint, and receives a pre-rendered 1-bit image to display. byos_fastapi handles device registration, image serving, and refresh scheduling. Plugins generate the images: weather, calendar, dashboards, or arbitrary HTML-to-bitmap renders via a headless browser.

## Features
### 🖥️ Replaces TRMNL cloud
Full drop-in replacement for usetrmnl.com — configure the device's server URL once and it works entirely offline.

### 🔌 Plugin system
Write plugins as Python functions that return a PIL image — add any data source: RSS, Home Assistant, Grafana, custom APIs.

### 📅 Refresh scheduling
Per-device refresh intervals with cron-like scheduling — different screens can update at different rates.

### 🌐 Local-only operation
No internet connection required after initial setup — works on an air-gapped home network.

### 🧩 FastAPI foundation
Clean async REST API with automatic OpenAPI docs — easy to extend, inspect, and integrate with other services.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 220">
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

  <rect x="20" y="76" width="140" height="68" rx="8" class="box"/>
  <text x="90" y="104" text-anchor="middle" class="label">TRMNL device</text>
  <text x="90" y="121" text-anchor="middle" class="sub">scheduled HTTP poll</text>

  <rect x="230" y="76" width="170" height="68" rx="8" class="box-accent"/>
  <text x="315" y="104" text-anchor="middle" class="label">FastAPI backend</text>
  <text x="315" y="121" text-anchor="middle" class="sub">device API + refresh logic</text>

  <rect x="470" y="24" width="170" height="60" rx="8" class="box-warm"/>
  <text x="555" y="50" text-anchor="middle" class="label">Plugins</text>
  <text x="555" y="67" text-anchor="middle" class="sub">weather · calendar · dashboards</text>

  <rect x="470" y="136" width="170" height="60" rx="8" class="box-green"/>
  <text x="555" y="162" text-anchor="middle" class="label">Rendered image</text>
  <text x="555" y="179" text-anchor="middle" class="sub">1-bit screen payload</text>

  <line x1="160" y1="110" x2="226" y2="110" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="400" y1="110" x2="466" y2="54" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="400" y1="110" x2="466" y2="166" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>

  <text x="360" y="214" text-anchor="middle" class="sub">self-hosted replacement for the TRMNL cloud service, serving local plugin-generated e-ink screens</text>
</svg>
