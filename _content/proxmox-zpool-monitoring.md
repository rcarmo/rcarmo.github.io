---
section: infrastructure
status: stable
created: 2025-04-24
tagline: ZFS pool metrics for Proxmox — exported to Graphite, cron only.
---

## About
Forked from [overcuriousity/proxmox-zpool-monitoring](https://github.com/overcuriousity/proxmox-zpool-monitoring). Adds Graphite push support and multi-pool parsing improvements.

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

## Posts
- [Proxmox on the FriendlyELEC CM3588 NAS Kit](https://taoofmac.com/space/notes/2024/11/09/1940) — 2024-11-09

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
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
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">Proxmox VE</text>
  <text x="100" y="109" text-anchor="middle" class="sub">cron job</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="91" text-anchor="middle" class="label">zpool status</text>
  <text x="330" y="109" text-anchor="middle" class="sub">parse output</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-warm"/>
  <text x="560" y="50" text-anchor="middle" class="label">Graphite</text>
  <text x="560" y="68" text-anchor="middle" class="sub">metrics push</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="132" text-anchor="middle" class="label">Grafana</text>
  <text x="560" y="150" text-anchor="middle" class="sub">dashboard</text>

  <line x1="560" y1="84" x2="560" y2="106" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
</svg>
