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
