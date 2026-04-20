---
section: infrastructure
status: active
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
  <text x="80" y="88" text-anchor="middle" class="label">LAN vlan-A</text>
  <text x="80" y="103" text-anchor="middle" class="sub">services announce</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="265" y="88" text-anchor="middle" class="label">mdnsbridge</text>
  <text x="265" y="103" text-anchor="middle" class="sub">Go · multicast</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-b"/>
  <text x="450" y="88" text-anchor="middle" class="label">LAN vlan-B</text>
  <text x="450" y="103" text-anchor="middle" class="sub">discovers service</text>
  <line x1="140" y1="90" x2="200" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="90" x2="390" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="265" y="143" text-anchor="middle" class="sub">224.0.0.251:5353 relay · TTL-adjusted</text>
</svg>
