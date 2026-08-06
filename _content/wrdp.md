---
id: wrdp
repo: rcarmo/wrdp
section: remote-access
status: experimental
created: 2026-07-05
logo: assets/logos-opt/default.png
tagline: Single-port, multi-user RDP server for isolated headless Wayland sessions on Linux.
---

## About
`wrdp` accepts RDP connections on one listener and gives each authenticated local user an isolated, managed Wayland desktop. It owns those sessions; it does not expose an existing GNOME or KDE login.

IronRDP handles the wire protocol, capability negotiation and dynamic channels. WRDP connects it to authentication, per-user session lifecycle, the managed compositor, capture, encoding, input, audio and clipboard services.

## How it works
The server negotiates TLS and RDP, validates credentials through PAM or configured Argon2id password hashes, then binds the user and negotiated desktop size to a new or healthy existing session. Authentication does not start a compositor; session binding happens only after it succeeds.

A session-manager library inside `wrdp` starts one modified labwc compositor per user and persists process state for reconnects. The compositor exposes a headless Wayland output, which is resized before capture. Frames use DMA-BUF when possible and SHM otherwise; PipeWire supplies audio.

## Features
### One listener, several users
A single TCP endpoint serves independent per-user desktops. Session reuse preserves process identity and reapplies the connecting client's geometry.

### Managed Wayland desktops
Each user receives a headless compositor with a small terminal and optional Waybar. Sessions run separately from host graphical logins and never fall back to another user's desktop.

### Negotiated graphics paths
Prefers EGFX AVC420 or AVC444, with optional VA-API, software H.264 fallback and bitmap updates when EGFX is unavailable.

### Input, resize and clipboard
Wayland or EIS injects keyboard and pointer input; Advanced Input owns mouse delivery while active to prevent duplicate clicks. Output management and data-control protocols handle resize and clipboard operations.

### Audio capture
PipeWire redirects the managed session's audio through RDPSND and remains available to portal-backed capture paths.

### Operational tools
`wrdp` runs the server, `wrdp-sesman` exposes session management for supervision and manual operations, and `wrdpctl` inspects or controls persisted session state.

### TLS and local authentication
Production connections always use TLS. PAM is the normal authentication mode; static-password deployments require Argon2id hashes. NLA/CredSSP and domain authentication are not included in this release.

### Source release
The first public release is installed from source and targets dedicated systemd Linux hosts. Distribution packages are not yet published.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 202">
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
    .sub { fill: #5070a0; }
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
  <rect width="1200" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">RDP client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">TLS · capabilities · channels</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">wrdp</text>
  <text x="360" y="74" text-anchor="middle" class="sub">IronRDP · auth · binding</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Session manager</text>
  <text x="600" y="74" text-anchor="middle" class="sub">start · reuse · supervise</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">User compositor</text>
  <text x="840" y="74" text-anchor="middle" class="sub">headless Wayland output</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="840" y="144" text-anchor="middle" class="label">Desktop channels</text>
  <text x="840" y="162" text-anchor="middle" class="sub">input · clipboard · audio</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Display path</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">DMA-BUF/SHM · H.264/bitmap</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Authenticated RDP connection to an isolated Wayland desktop</text>
</svg>
