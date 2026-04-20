---
section: infrastructure
status: maintained
tagline: Force Syncthing to rescan folders on demand — cron-triggered or event-driven rescans via the REST API.
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
