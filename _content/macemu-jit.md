---
section: macos
status: maintained
tagline: Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb.
logo: assets/logos-opt/macemu-jit.png
---

## About
Fork targeting Raspberry Pi with SDL2 framebuffer/KMS — no X11, no desktop required. Pre-built arm64 .deb packages in releases. Basilisk II runs System 6–8; SheepShaver runs Mac OS 8.6–9.0.4.

## How it works
SDL2 is compiled without OpenGL, Wayland, and X11 to reduce dependencies and startup time. The framebuffer/KMS backend writes directly to the display without a compositor. Pre-built .deb packages install with dpkg -i. Used as the emulation layer in the Maclock project.

## Features
### 🥧 Raspberry Pi optimised
SDL2 framebuffer/KMS, no X11. Pi Zero through Pi 5.

### 📦 Pre-built packages
arm64 .deb in GitHub Releases. dpkg -i and run.

### 💻 68k and PowerPC
Basilisk II for System 6–8. SheepShaver for Mac OS 8.6–9.0.4.

### 🖥 Direct framebuffer
Lower latency than X11.

## Posts
- [Notes for July 2024](https://taoofmac.com/space/notes/2024/07/21/1800) — 2024-07-21
- [Notes, 2025-12-31](https://taoofmac.com/space/notes/2025/12/31/1830) — 2025-12-31
- [Notes for March 23-29](https://taoofmac.com/space/notes/2026/03/29/1300) — 2026-03-29
- [Notes for March 30 – April 5](https://taoofmac.com/space/notes/2026/04/05/1700) — 2026-04-05
