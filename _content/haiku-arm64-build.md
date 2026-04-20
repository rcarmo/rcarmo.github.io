---
section: hardware
status: active
tagline: Build environment and automation for compiling Haiku OS on ARM64.
---

## About
A Makefile-driven build system for cross-compiling and natively building Haiku OS on ARM64 hardware. Aimed at running Haiku on single-board computers and Apple Silicon via QEMU, with reproducible builds and minimal host dependencies.

## How it works
The top-level Makefile orchestrates the full Haiku build toolchain — fetching sources, configuring the cross-compiler, and invoking Haiku's own Jam-based build system. A set of shell scripts handles environment setup, dependency checks, and image creation so the process works unattended on a fresh ARM64 host or inside a container.

## Features
### 🔧 Cross-compile toolchain
Sets up the full GCC cross-compiler for ARM64 from scratch, targeting the Haiku ABI.

### 📦 Reproducible builds
Pinned source revisions and a locked toolchain mean the same commit always produces the same image.

### 🖥️ QEMU integration
Includes launch scripts for testing the resulting ARM64 image under QEMU with virtio block and network devices.

### 🐳 Container-ready
Build steps run cleanly inside a Docker container — no host pollution, easy CI integration.

### ⚙️ Makefile-driven
Single `make` entry point covers fetch, configure, build, and image creation with sensible defaults.
