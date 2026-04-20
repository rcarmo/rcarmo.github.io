---
section: terminal
status: active
tagline: Ghostty terminal sessions in a browser — xterm.js compatibility.
logo: assets/logos-opt/ghostty-web.png
---

## About
ghostty-web runs Ghostty in server mode, proxies sessions to a browser via WebSocket, and implements an xterm.js-compatible API. Shares go-te with webterm and go-rdp.

## How it works
Ghostty runs server-mode connected to a Unix socket. The Go server proxies to WebSocket and translates protocols. The TypeScript frontend implements the xterm.js ITerminalAddon interface so existing extensions work unchanged. go-te maintains server-side terminal state for tile previews and copy-on-select.

## Features
### ⚡ Ghostty in browser
Server-side Ghostty. Browser gets output over WebSocket.

### 🔌 xterm.js compat
Existing xterm.js tooling works unchanged.

### 🔗 Shared engine
go-te used by webterm, go-rdp, and ghostty-web.
