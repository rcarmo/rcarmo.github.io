---
section: infrastructure
status: maintained
created: 2026-01-06
tagline: Force Syncthing to rescan folders on demand — cron-triggered or event-driven rescans via the REST API.
logo: assets/logos-opt/syncthing-kicker.png
---

## About
syncthing-kicker is a small Go daemon that calls the Syncthing REST API to trigger folder rescans on a schedule or in response to external events. Useful when Syncthing's filesystem watcher isn't available (e.g. on network shares, NFS mounts, or inside containers) and you need reliable sync without waiting for the slow periodic full scan.

## How it works
Connects to the local Syncthing REST API using the configured API key, then either fires rescan requests on a cron schedule or watches a trigger file/socket for external signals. Runs as a sidecar container alongside Syncthing or as a systemd service on the same host.

## Features
### ⏰ Cron-scheduled rescans
Define per-folder rescan schedules in standard cron syntax — different folders can sync at different intervals.

### 🔔 Event-driven triggers
Watch a named pipe or Unix socket for trigger signals — external scripts can kick a rescan without polling.

### 🐳 Docker sidecar
Ships as a minimal container image; mounts the Syncthing config dir to read the API key automatically.

### 🔑 Auto API key discovery
Reads the Syncthing config XML to find the API key — no manual configuration needed beyond the config path.

### 📋 Per-folder targeting
Trigger rescans on specific folder IDs rather than all folders — useful for large libraries where full rescans are expensive.

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
  <text x="100" y="50" text-anchor="middle" class="label">Cron / event</text>
  <text x="100" y="68" text-anchor="middle" class="sub">trigger</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">kicker</text>
  <text x="330" y="68" text-anchor="middle" class="sub">Go daemon</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="50" text-anchor="middle" class="label">Syncthing</text>
  <text x="560" y="68" text-anchor="middle" class="sub">REST API rescan</text>

</svg>
