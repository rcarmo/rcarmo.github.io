---
section: macos
status: stable
tagline: Plan 9 drawterm — HiDPI scaling, Metal rendering, Connect dialog, clipboard bridge.
logo: assets/logos-opt/drawterm.png
---

## About
This fork patches the macOS Cocoa backend for HiDPI-aware scaling, adds Metal-accelerated incremental redraws, a Preferences panel, a Connect dialog that persists credentials, and a macOS pasteboard bridge. Command maps to mod4 for rio bindings.

## How it works
Standard drawterm renders at 1:1 pixels on Retina screens — unreadable on modern Macs. This fork reads the display backing scale factor and scales the framebuffer accordingly. The Metal rendering path only invalidates the dirty region on each update instead of the full surface. The Connect dialog saves CPU/auth host and credentials to user defaults.

## Features
### 🔍 HiDPI scaling
Reads display scale. Legible on 5K displays.

### ⚡ Metal redraws
Dirty-region updates only. No full-screen flicker.

### ⌨ macOS keyboard + clipboard
Command → mod4, pasteboard bridge.

### 💾 Connect dialog
Host, user, password persist between launches.

## Posts
- [Notes, 2025-12-24](https://taoofmac.com/space/notes/2025/12/24/1400) — 2025-12-24
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
