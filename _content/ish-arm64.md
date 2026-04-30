---
id: ish-arm64
repo: rcarmo/ish-arm64
section: hardware
tagline: ARM64 bring-up fork of iSH — Linux shell for iOS with AArch64 emulation
---

## About

Personal fork of [iSH](https://ish.app/) focused on making an ARM64 Linux guest practical enough to run modern language runtimes and build tools on iOS ARM64 hosts. Brings up AArch64 CPU emulation, signal handling, and enough syscall coverage to bootstrap Alpine Linux packages natively.

## Features

- AArch64 CPU emulation on iOS (JIT-capable where allowed)
- Signal handling and threading for ARM64 guests
- Syscall coverage for Alpine Linux package bootstrap
- Modern language runtime support (Python, Node, etc.)
