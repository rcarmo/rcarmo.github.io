---
section: infrastructure
status: active
created: 2026-02-02
tagline: mDNS bridge — relay Bonjour/Avahi service announcements across network segments.
logo: assets/logos-opt/mdnsbridge.png
---

## About
mdnsbridge listens for mDNS/Bonjour service announcements on one network interface and re-announces them on another, making services visible across VLANs, containers, and VM networks without a full multicast router. A single static binary, no daemon configuration.

## How it works
Uses Go's raw multicast socket support to join the mDNS group (224.0.0.251:5353) on each configured interface. Incoming DNS-SD packets are parsed, filtered by service type if desired, and re-emitted on the target interface with TTL adjusted to prevent loops. Runs as a lightweight systemd service or inside a container with host networking.

## Features
### 🌐 Cross-VLAN discovery
Bridge mDNS between a home VLAN and a server VLAN so printers, AirPlay speakers, and Chromecast devices stay discoverable.

### 🐳 Container-aware
Works with Docker bridge networks and macvlan setups where mDNS doesn't cross the virtual interface boundary.

### 🔍 Service type filtering
Optionally relay only specific service types (e.g. `_airplay._tcp`, `_http._tcp`) to reduce noise on the target segment.

### ⚡ Single static binary
Compiled Go — no runtime, no dependencies, drops into any Linux system or minimal container image.

### 🔄 Loop prevention
Tracks recently forwarded records and suppresses re-forwarding to avoid amplification loops in meshed networks.

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

  <rect x="20" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="50" text-anchor="middle" class="label">Tailscale</text>
  <text x="100" y="68" text-anchor="middle" class="sub">DNS query source</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="42" text-anchor="middle" class="label">mdnsbridge</text>
  <text x="330" y="59" text-anchor="middle" class="sub">exit node</text>
  <text x="330" y="74" text-anchor="middle" class="sub">DNS ↔ mDNS relay</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="42" text-anchor="middle" class="label">LAN device</text>
  <text x="560" y="59" text-anchor="middle" class="sub">printer / NAS</text>
  <text x="560" y="74" text-anchor="middle" class="sub">answers via mDNS</text>


  <text x="330" y="168" text-anchor="middle" class="sub">192.168.1.50</text>
</svg>
