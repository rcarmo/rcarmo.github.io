---
section: hardware
status: active
tagline: TRMNL BYOS — self-hosted FastAPI server for the TRMNL e-ink display, replacing the cloud backend.
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
