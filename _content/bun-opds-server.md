---
section: infrastructure
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="640" height="220">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="100" rx="8" class="box-warm"/>
  <text x="80" y="100" text-anchor="middle" class="label">Calibre</text>
  <text x="80" y="118" text-anchor="middle" class="label">library</text>
  <text x="80" y="133" text-anchor="middle" class="sub">metadata.db</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">OPDS server</text>
  <text x="265" y="68" text-anchor="middle" class="sub">Atom/XML feeds</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box"/>
  <text x="265" y="143" text-anchor="middle" class="label">kosync</text>
  <text x="265" y="158" text-anchor="middle" class="sub">progress sync</text>
  <rect x="410" y="20" width="130" height="60" rx="8" class="box-b"/>
  <text x="475" y="53" text-anchor="middle" class="label">e-reader</text>
  <text x="475" y="68" text-anchor="middle" class="sub">XteInk · CrossPoint</text>
  <rect x="410" y="110" width="130" height="60" rx="8" class="box"/>
  <text x="475" y="143" text-anchor="middle" class="label">KOReader</text>
  <text x="475" y="158" text-anchor="middle" class="sub">reading position</text>
  <line x1="140" y1="110" x2="200" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="130" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="50" x2="410" y2="50" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="140" x2="410" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
