---
repo: usetrmnl/byos_fastapi
section: hardware
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
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
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="98" text-anchor="middle" class="label">TRMNL</text>
  <text x="80" y="113" text-anchor="middle" class="sub">e-ink device</text>
  <rect x="200" y="20" width="140" height="60" rx="8" class="box-accent"/>
  <text x="270" y="53" text-anchor="middle" class="label">FastAPI server</text>
  <text x="270" y="68" text-anchor="middle" class="sub">polling endpoint</text>
  <rect x="200" y="110" width="140" height="60" rx="8" class="box-warm"/>
  <text x="270" y="143" text-anchor="middle" class="label">Plugin system</text>
  <text x="270" y="158" text-anchor="middle" class="sub">image generators</text>
  <rect x="420" y="60" width="130" height="80" rx="8" class="box-b"/>
  <text x="485" y="98" text-anchor="middle" class="label">1-bit image</text>
  <text x="485" y="113" text-anchor="middle" class="sub">800×480 BMP</text>
  <line x1="140" y1="100" x2="200" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="340" y1="80" x2="420" y2="90" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="270" y1="80" x2="270" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="270" y1="110" x2="420" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
