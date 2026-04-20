---
section: infrastructure
status: stable
created: 2025-04-24
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

## Posts
- [Proxmox VE on the FriendlyELEC CM3588 NAS](https://taoofmac.com/space/notes/2024/11/09/1940) — 2024-11-09

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
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
      .bg { fill: #f0f4fa; }
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
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="50" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="88" text-anchor="middle" class="label">Proxmox VE</text>
  <text x="80" y="103" text-anchor="middle" class="sub">cron job</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="265" y="88" text-anchor="middle" class="label">zpool status</text>
  <text x="265" y="103" text-anchor="middle" class="sub">parse output</text>
  <rect x="400" y="20" width="120" height="60" rx="8" class="box-warm"/>
  <text x="460" y="53" text-anchor="middle" class="label">Graphite</text>
  <text x="460" y="68" text-anchor="middle" class="sub">metrics push</text>
  <rect x="400" y="100" width="120" height="60" rx="8" class="box-b"/>
  <text x="460" y="133" text-anchor="middle" class="label">Grafana</text>
  <text x="460" y="148" text-anchor="middle" class="sub">dashboard</text>
  <line x1="140" y1="90" x2="200" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="70" x2="400" y2="50" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="110" x2="400" y2="130" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="460" y1="80" x2="460" y2="100" class="arrow" stroke-width="1.5"/>
</svg>
