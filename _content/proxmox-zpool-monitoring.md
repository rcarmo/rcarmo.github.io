---
section: infrastructure
status: stable
tagline: ZFS pool metrics for Proxmox — exported to Graphite, cron only.
---

## About
Python cron script exporting ZFS pool health, I/O, and capacity from Proxmox VE to Graphite. No daemon, no agent. Just a script and a metrics endpoint.

## How it works
Runs zpool status, zpool iostat, and zfs list, formats output as Graphite plaintext (metric.path value timestamp), and sends over TCP. Metric hierarchy is zfs.hostname.pool.metric so multiple nodes share one Graphite instance. Run every 5 minutes from crontab.

## Features
### 📊 Pool health and I/O
Health status, errors, capacity, IOPS, bandwidth.

### ⏰ Cron-only
One script, one endpoint. No daemon.

### 🔌 Graphite plaintext
Compatible with Carbon, InfluxDB, and others.
