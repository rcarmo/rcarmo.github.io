---
section: terminal
status: active
tagline: Go web terminal with multi-session dashboard mode — built for AI agent workflows.
---

## About
webterm serves PTY sessions over HTTP/WebSocket with a dashboard that tiles multiple active terminals in a single browser tab — built for monitoring several AI coding agents in parallel. WASM renderer, correct xterm handling, sticky mobile keybar.

## How it works
A Go HTTP server accepts WebSocket connections and spawns a PTY for each session. go-te maintains the server-side VT100/xterm screen state for live tile previews in dashboard mode. The frontend renders via WebAssembly for correct escape handling without a JS library. A mobile sticky keybar (Esc, Ctrl, Shift, arrows) makes it usable from a phone.

## Features
### 🖥 Multi-session dashboard
Tile N agent terminals side-by-side. Watch them run in parallel.

### ⚡ WASM renderer
Correct xterm/VT100 handling via WebAssembly.

### 📱 Mobile keybar
Sticky Esc/Ctrl/Shift/Tab/arrows with sticky combos.

### 🔌 Library-first
Powers the terminal in agentbox, piclaw, and ghostty-web.
