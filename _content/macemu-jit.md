---
section: macos
status: maintained
tagline: Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb.
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
