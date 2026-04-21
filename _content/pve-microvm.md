---
section: infrastructure
status: active
created: 2026-04-18
tagline: Firecracker-like microVMs for Proxmox VE — KVM isolation, under 200 ms boot.
logo: assets/logos-opt/pve-microvm.png
---

## About
Debian package that adds QEMU `microvm` machine type to the Proxmox UI. microvm VMs boot in under 200 ms, use only `virtio-mmio`, and give full KVM isolation. Uninstall restores original files.

## How it works
Patches two `qemu-server` files to add `microvm` as a selectable machine type. A standard Proxmox VM emulates a full x86 PC with PCI bus and BIOS, but a microvm skips all that — direct kernel load, virtio-mmio only, much smaller attack surface. The result is KVM-grade isolation at LXC-comparable boot times. Currently the only Proxmox integration for QEMU microvm.

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
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400#proxmox-microvms) — 2026-04-19

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 180">
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
  <rect width="480" height="180" class="bg" rx="8"/>
  
  <rect x="20" y="65" width="90" height="50" rx="5" class="box-accent"/><text x="65" y="87" text-anchor="middle" class="label">OCI registry</text><text x="65" y="101" text-anchor="middle" class="sub">Docker Hub / ghcr</text>
  <line x1="110" y1="90" x2="150" y2="90" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="130" y="80" class="sub">pull</text>
  <rect x="150" y="65" width="90" height="50" rx="5" class="box-green"/><text x="195" y="87" text-anchor="middle" class="label">extract rootfs</text><text x="195" y="101" text-anchor="middle" class="sub">pve-microvm</text>
  <line x1="240" y1="90" x2="280" y2="90" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <rect x="280" y="45" width="120" height="40" rx="5" class="box-green"/><text x="340" y="62" text-anchor="middle" class="label">libkrun VMM</text><text x="340" y="76" text-anchor="middle" class="sub">sub-second start</text>
  <rect x="280" y="95" width="120" height="40" rx="5" class="box"/><text x="340" y="112" text-anchor="middle" class="label">vsock / virtio</text><text x="340" y="126" text-anchor="middle" class="sub">agent comms</text>
  <text x="340" y="155" text-anchor="middle" class="sub">hardware isolation — no shared kernel</text>
  <text x="170" y="155" text-anchor="middle" class="sub">any OCI image → microVM</text>

</svg>
