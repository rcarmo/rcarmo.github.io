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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
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
      .bg { fill: transparent; }
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
  <text x="75" y="88" text-anchor="middle" class="label">Cron / event</text>
  <text x="75" y="103" text-anchor="middle" class="sub">trigger</text>
  <rect x="190" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="255" y="88" text-anchor="middle" class="label">kicker</text>
  <text x="255" y="103" text-anchor="middle" class="sub">Go daemon</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-b"/>
  <text x="450" y="88" text-anchor="middle" class="label">Syncthing</text>
  <text x="450" y="103" text-anchor="middle" class="sub">REST API rescan</text>
  <line x1="130" y1="90" x2="190" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="90" x2="390" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
