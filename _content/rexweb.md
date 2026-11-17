---
id: rexweb
repo: rcarmo/rexweb
section: remote-access
status: experimental
created: 2026-11-11
tagline: Shared browser and Rex terminal sessions from one Linux binary.
---

## About
`rexweb` runs shell sessions that can be used from a browser or a Rex-compatible native client. Sessions have tabs and tiled panes, with the same server-side terminal state available to both interfaces. It builds on [webterm](webterm) components and a pinned Ghostty WebAssembly renderer.

Browser disconnects leave shells running. Restarting the service ends them and discards the in-memory layout and output; workspace files stay on disk.

## How it works
A Go service owns the PTYs and terminal state. An embedded web client connects over HTTP and WebSocket, while a private Unix socket and optional TCP listener expose the supported Rex protocol. One live viewer per pane is supported.

The runtime needs Linux, a shell and unprivileged user namespaces. Bun is used to build the browser assets, but is not needed on the target machine. Rex itself is installed separately.

## Features
### Shared sessions
Browser, local Rex and remote Rex clients work with the same sessions, tabs and panes.

### Search and export
Search retained terminal content and export the focused pane as text, HTML or VT. Retention and export sizes are bounded.

### Mobile input
A shared on-screen keyboard follows the active pane's cursor, with selection, native copy and bracketed paste.

### Optional uploads
Authenticated, same-origin uploads place files in the workspace and insert their quoted paths without executing commands.

### Private access
SSH forwarding is recommended. Remote web access needs authentication and TLS; the native Rex endpoint has no password login and must not be exposed publicly.

### Compatibility limits
Supports a subset of Rex protocol revision 12. Multi-user login, native resume, floating panes and Lua are unsupported.

## Gallery
- [Rexweb workspace](assets/screenshots/rexweb/screenshot.jpg) -- Browser sessions with tiled terminal panes

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #243b53; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser / Rex</text>
  <text x="120" y="74" text-anchor="middle" class="sub">One viewer per pane</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Go service</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Sessions + VT state</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">PTYs and shells</text>
  <text x="600" y="74" text-anchor="middle" class="sub">One service account</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Workspace files</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Persist on disk</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Shared shell sessions for browser and Rex clients</text>
</svg>

## Posts
- [Notes for November 9–13](https://taoofmac.com/space/notes/2026/11/13/2034) — 2026-11-13
