---
section: infrastructure
status: active
tagline: QEMU microvm for Proxmox VE — KVM isolation, under 200 ms boot.
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
