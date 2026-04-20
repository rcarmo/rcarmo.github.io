---
section: infrastructure
status: active
created: 2026-04-18
tagline: QEMU microvm for Proxmox VE — KVM isolation, under 200 ms boot.
logo: assets/logos-opt/pve-microvm.png
---

## About
Debian package patching qemu-server to add QEMU microvm machine type to the Proxmox UI. microvm VMs boot in under 200 ms, use only virtio-mmio, and give full KVM isolation. Uninstall restores original files.

## How it works
Patches two qemu-server files to add microvm as a selectable machine type. A standard Proxmox VM emulates a full x86 PC with PCI bus and BIOS. A microvm skips all that — direct kernel load, virtio-mmio only, much smaller attack surface. The result is KVM-grade isolation at LXC-comparable boot times. Currently the only Proxmox integration for QEMU microvm.

## Features
### ⚡ Under 200 ms boot
No emulated PCI, no BIOS. Direct kernel load.

### 🛡 Full KVM isolation
Own kernel per VM. No shared kernel.

### 🔌 Proxmox UI
Appears as a machine type option. Managed like any VM.

### ↩ Fully reversible
dpkg -r restores original qemu-server files.

## Posts
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180" width="480" height="180">
  <style>
    .bg{ fill: transparent; }
    .box{ fill: #161b22; stroke: #30363d; stroke-width:1.5; }
    .box-accent{ fill: #0d2040; stroke: #2b6cb0; stroke-width:1.5; }
    .box-green{ fill: #0a2218; stroke: #2a7a3a; stroke-width:1.5; }
    .box-warm{ fill: #221810; stroke: #c87020; stroke-width:1.5; }
    text{ font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; fill: #c9d1d9; }
    .label{ font-size: 12px; font-weight: 600; }
    .sub{ font-size: 10px; fill: #8b949e; }
    line{ stroke-width:1.5; }
    .arr{ stroke: #58a6ff; marker-end: url(#a); }
    .arrd{ stroke: #8b949e; marker-end: url(#ad); stroke-dasharray:4,3; }
  </style>
  <defs>
    <marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#58a6ff"/>
    </marker>
    <marker id="ad" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3z" fill="#8b949e"/>
    </marker>
  </defs>
  <rect width="480" height="180" class="bg" rx="8"/>
  
  <rect x="20" y="65" width="90" height="50" rx="5" class="box-accent"/><text x="65" y="87" text-anchor="middle" class="label">OCI registry</text><text x="65" y="101" text-anchor="middle" class="sub">Docker Hub / ghcr</text>
  <line x1="110" y1="90" x2="150" y2="90" class="arr"/>
  <text x="130" y="80" class="sub">pull</text>
  <rect x="150" y="65" width="90" height="50" rx="5" class="box-green"/><text x="195" y="87" text-anchor="middle" class="label">extract rootfs</text><text x="195" y="101" text-anchor="middle" class="sub">pve-microvm</text>
  <line x1="240" y1="90" x2="280" y2="90" class="arr"/>
  <rect x="280" y="45" width="120" height="40" rx="5" class="box-green"/><text x="340" y="62" text-anchor="middle" class="label">libkrun VMM</text><text x="340" y="76" text-anchor="middle" class="sub">sub-second start</text>
  <rect x="280" y="95" width="120" height="40" rx="5" class="box"/><text x="340" y="112" text-anchor="middle" class="label">vsock / virtio</text><text x="340" y="126" text-anchor="middle" class="sub">agent comms</text>
  <text x="340" y="155" text-anchor="middle" class="sub">hardware isolation — no shared kernel</text>
  <text x="170" y="155" text-anchor="middle" class="sub">any OCI image → microVM</text>

</svg>
