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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 220">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill: #161b26; stroke: #364155; }
      .box-accent { fill: #0f213e; stroke: #3b82f6; }
      .box-b { fill: #10231f; stroke: #10b981; }
      .label { fill: #d8e1f0; }
      .sub { fill: #93a4c0; }
      .arrow-dns { stroke: #60a5fa; }
      .arrow-mdns { stroke: #34d399; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #2563eb; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .label { fill: #1a2a40; }
      .sub { fill: #5b6b86; }
      .arrow-dns { stroke: #2563eb; }
      .arrow-mdns { stroke: #059669; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 15px; font-weight: 700; }
    .sub { font-size: 12px; }
    .arrow-dns, .arrow-mdns { fill: none; stroke-width: 2; }
  </style>
  <defs>
    <marker id="dns-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="mdns-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>

  <rect x="20" y="55" width="180" height="110" rx="10" class="box"/>
  <text x="110" y="94" text-anchor="middle" class="label">Tailscale</text>
  <text x="110" y="114" text-anchor="middle" class="label">client</text>
  <text x="110" y="138" text-anchor="middle" class="sub">DNS query source</text>

  <rect x="290" y="45" width="180" height="130" rx="10" class="box-accent"/>
  <text x="380" y="89" text-anchor="middle" class="label">mdnsbridge</text>
  <text x="380" y="109" text-anchor="middle" class="sub">exit node</text>
  <text x="380" y="133" text-anchor="middle" class="sub">DNS ↔ mDNS relay</text>

  <rect x="560" y="55" width="180" height="110" rx="10" class="box-b"/>
  <text x="650" y="94" text-anchor="middle" class="label">LAN device</text>
  <text x="650" y="114" text-anchor="middle" class="sub">printer / NAS</text>
  <text x="650" y="138" text-anchor="middle" class="sub">answers via mDNS</text>

  <line x1="200" y1="85" x2="290" y2="85" class="arrow-dns" marker-end="url(#dns-arr)"/>
  <text x="245" y="72" text-anchor="middle" class="sub">DNS query</text>
  <text x="245" y="104" text-anchor="middle" class="sub">printer.local</text>

  <line x1="290" y1="135" x2="200" y2="135" class="arrow-dns" marker-end="url(#dns-arr)"/>
  <text x="245" y="159" text-anchor="middle" class="sub">192.168.1.50</text>

  <line x1="470" y1="85" x2="560" y2="85" class="arrow-mdns" marker-end="url(#mdns-arr)"/>
  <text x="515" y="72" text-anchor="middle" class="sub">mDNS query</text>
  <text x="515" y="104" text-anchor="middle" class="sub">printer.local</text>

  <line x1="560" y1="135" x2="470" y2="135" class="arrow-mdns" marker-end="url(#mdns-arr)"/>
  <text x="515" y="159" text-anchor="middle" class="sub">192.168.1.50</text>
</svg>
