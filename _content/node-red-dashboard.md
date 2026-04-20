---
section: infrastructure
status: maintained
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
