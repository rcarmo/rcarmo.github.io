---
section: infrastructure
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 180">
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
  <rect width="660" height="180" class="bg" rx="8"/>

  <rect x="20" y="24" width="160" height="60" rx="8" class="box-warm"/>
  <text x="100" y="50" text-anchor="middle" class="label">Node-RED</text>
  <text x="100" y="68" text-anchor="middle" class="sub">flow runtime</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">Dashboard</text>
  <text x="330" y="68" text-anchor="middle" class="sub">custom widgets</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="50" text-anchor="middle" class="label">Browser UI</text>
  <text x="560" y="68" text-anchor="middle" class="sub">sensor data</text>

</svg>
