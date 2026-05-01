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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 120">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="780" height="120" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser</text>
  <text x="120" y="74" text-anchor="middle" class="sub">xterm.js</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-teal"/>
  <text x="380" y="56" text-anchor="middle" class="label">TypeScript</text>
  <text x="380" y="74" text-anchor="middle" class="sub">WS bridge</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="640" y="56" text-anchor="middle" class="label">Ghostty PTY</text>
  <text x="640" y="74" text-anchor="middle" class="sub">native process</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
