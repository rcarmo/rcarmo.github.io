---
section: networking
status: active
created: 2026-04-03
tagline: Read-only multi-library OPDS server for Calibre — built for the XteInk X4 and CrossPoint Reader.
---

## About
A lightweight OPDS catalogue server that fronts one or more Calibre libraries and serves books to any OPDS-compatible e-reader. Built with Bun for low memory use and fast cold-start — runs comfortably on a Raspberry Pi or NAS alongside Calibre. Includes KOReader progress sync via a kosync-compatible endpoint.

## How it works
At startup it scans the configured Calibre `metadata.db` files and builds an in-memory catalogue. Incoming OPDS requests are answered with Atom XML feeds; book files are streamed directly from the Calibre library folder. A separate `/kosync` route implements the KOReader book-progress sync protocol, storing positions in a small SQLite database at the top of the library tree.

## Features
### 📚 Multi-library support
Serve multiple Calibre libraries from a single process — each appears as a separate OPDS root catalogue.

### 📖 KOReader progress sync
Compatible with the KOReader kosync plugin — devices sync reading positions automatically over Wi-Fi.

### 🔍 Search & browse
Full OPDS search endpoint plus browse-by-author, browse-by-series, and browse-by-tag catalogue feeds.

### 📄 Format negotiation
Serves EPUB, PDF, CBZ, CBR, and other formats stored in the Calibre library; content-type headers are correct for each format.

### ⚡ Bun-native
Zero npm bloat — uses Bun's built-in HTTP server, SQLite driver, and file streaming for minimal overhead.

### 🐳 Docker-ready
Published as a multi-arch container image; mounts the Calibre library folder as a read-only volume.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 188">
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
  <rect width="720" height="188" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">Calibre</text>
  <text x="120" y="74" text-anchor="middle" class="sub">metadata.db</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">OPDS server</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Atom/XML feeds</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="144" text-anchor="middle" class="label">kosync</text>
  <text x="360" y="162" text-anchor="middle" class="sub">progress sync</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">e-reader</text>
  <text x="600" y="74" text-anchor="middle" class="sub">XteInk · CrossPoint</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="144" text-anchor="middle" class="label">KOReader</text>
  <text x="600" y="162" text-anchor="middle" class="sub">reading position</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,134 Q240,148 254,148 L270,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
