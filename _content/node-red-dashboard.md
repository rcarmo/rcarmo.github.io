---
section: networking
status: maintained
created: 2025-12-21
tagline: Custom dashboard UI for Node-RED — tailored widgets and layout for homelab sensor data and automation flows.
---

## About
A fork of the Node-RED Dashboard with custom widgets, layout adjustments, and additional display nodes tuned for homelab use. Shows sensor readings, device states, and automation flow status on a single page — designed to run on a Raspberry Pi alongside Node-RED and display on a wall-mounted screen or e-ink panel.

## How it works
Extends the standard Node-RED Dashboard module with additional node types for compact data display. Widgets communicate with Node-RED's runtime over its existing WebSocket channel, so no additional backend is needed. The layout system uses a CSS grid with configurable tile sizes to pack more information on smaller screens.

## Features
### 📊 Sensor display widgets
Compact numeric, gauge, and sparkline tiles optimised for environmental sensor data — temperature, humidity, power draw.

### 🏠 Device state tiles
On/off tiles for smart home devices with colour-coded status and last-seen timestamps.

### 🖥️ E-ink friendly layout
High-contrast, minimal-animation layout mode suitable for e-ink displays and low-refresh-rate panels.

### 🔌 Drop-in Node-RED module
Installed and updated via npm alongside Node-RED — no separate server process or configuration file.

### ⚡ Raspberry Pi optimised
Low CPU and memory footprint — serves the dashboard from the same Pi that runs Node-RED.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 202">
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
  <rect width="720" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">IoT devices</text>
  <text x="120" y="74" text-anchor="middle" class="sub">MQTT · HTTP · serial</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">Node-RED</text>
  <text x="360" y="74" text-anchor="middle" class="sub">flow engine in Docker</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="56" text-anchor="middle" class="label">Dashboard UI</text>
  <text x="600" y="74" text-anchor="middle" class="sub">gauges · charts · switches</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="600" y="144" text-anchor="middle" class="label">Actions</text>
  <text x="600" y="162" text-anchor="middle" class="sub">relays · alerts · API</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="360" y="198" text-anchor="middle" class="sub">Node-RED home automation dashboard in Docker</text>
</svg>
