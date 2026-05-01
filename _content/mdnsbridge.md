---
section: networking
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

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
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
  <text x="120" y="56" text-anchor="middle" class="label">DNS client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Tailscale / resolver</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">mdnsbridge</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Go DNS server</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="600" y="56" text-anchor="middle" class="label">avahi-resolve</text>
  <text x="600" y="74" text-anchor="middle" class="sub">mDNS / Bonjour</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">.local host</text>
  <text x="840" y="74" text-anchor="middle" class="sub">resolved address</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="240" y="54" text-anchor="middle" class="sub">DNS</text>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="480" y="54" text-anchor="middle" class="sub">mDNS</text>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">DNS → mDNS bridge for .local hostnames over Tailscale</text>
</svg>
