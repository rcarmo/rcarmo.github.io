---
section: cloud-infra
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
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400) — 2026-04-21
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400#proxmox-microvms) — 2026-04-19

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 202">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="968" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="120" y="56" text-anchor="middle" class="label">Debian package</text>
  <text x="120" y="74" text-anchor="middle" class="sub">pve-microvm .deb</text>

  <rect x="30" y="118" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="144" text-anchor="middle" class="label">OCI import</text>
  <text x="120" y="162" text-anchor="middle" class="sub">container → VM</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="364" y="56" text-anchor="middle" class="label">Proxmox VE</text>
  <text x="364" y="74" text-anchor="middle" class="sub">qemu-server patched</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Perl patches</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">machine type</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-warm"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Kernel overlay</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">virtio-only</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="608" y="56" text-anchor="middle" class="label">microvm</text>
  <text x="608" y="74" text-anchor="middle" class="sub">QEMU machine type</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="56" text-anchor="middle" class="label">Guest VM</text>
  <text x="848" y="74" text-anchor="middle" class="sub">&lt; 200 ms boot</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M210,148 L228,148 Q242,148 242,134 L242,74 Q242,60 256,60 L274,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M698,60 L758,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="484" y="198" text-anchor="middle" class="sub">Firecracker-like microVMs for Proxmox VE — KVM isolation, &lt;200 ms boot</text>
</svg>
