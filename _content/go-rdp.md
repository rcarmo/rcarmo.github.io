---
section: terminal
status: active
tagline: Browser-based RDP client — full MS-RDPBCGR spec, Go backend, WASM frontend.
logo: assets/logos-opt/go-rdp.png
---

## About
go-rdp connects to Windows VMs via RDP from any browser without a native client. Go backend implementing the full MS-RDPBCGR specification as a reference implementation; WASM frontend for rendering.

## How it works
The Go backend handles RDP security negotiation, capability exchange, and display updates, streaming JPEG-encoded frames to the browser over WebSocket. Keyboard and mouse events are forwarded as RDP input PDUs. TinyGo compiles the frontend renderer to WASM.

## Features
### 🌐 No native client
RDP in a browser canvas via WebAssembly.

### 📋 Full spec
MS-RDPBCGR reference implementation.

### ⚙ Go + WASM
Docker image for one-command deployment.

## Posts
- [Notes for January 19-25](https://taoofmac.com/space/notes/2026/01/25/2030) — 2026-01-25
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Notes for February 8-15](https://taoofmac.com/space/notes/2026/02/15/1530) — 2026-02-15
