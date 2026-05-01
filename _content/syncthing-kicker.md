---
section: networking
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Filesystem events</text>
  <text x="120" y="74" text-anchor="middle" class="sub">inotify / fswatch</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Kicker</text>
  <text x="360" y="74" text-anchor="middle" class="sub">debounce + filter</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Syncthing API</text>
  <text x="600" y="74" text-anchor="middle" class="sub">POST /rest/db/scan</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Sync</text>
  <text x="840" y="74" text-anchor="middle" class="sub">immediate propagation</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Trigger Syncthing rescan on file changes — inotify / fswatch</text>
</svg>
