---
section: terminal
status: active
created: 2026-01-28
tagline: Ghostty terminal sessions in a browser — xterm.js compatibility.
---

## About
Forked from [coder/ghostty-web](https://github.com/coder/ghostty-web). Adapted for integration with webterm and go-te for AI agent terminal workflows.

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

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="660" height="180" class="bg" rx="8"/>

  <rect x="20" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="50" text-anchor="middle" class="label">Browser</text>
  <text x="100" y="68" text-anchor="middle" class="sub">xterm.js</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">TypeScript</text>
  <text x="330" y="68" text-anchor="middle" class="sub">WS bridge</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="50" text-anchor="middle" class="label">Ghostty PTY</text>
  <text x="560" y="68" text-anchor="middle" class="sub">native process</text>


  <polyline points="180,54 250,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <polyline points="410,54 480,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
</svg>
