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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 208">
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
  <rect width="780" height="208" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">Calibre</text>
  <text x="120" y="74" text-anchor="middle" class="sub">metadata.db</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="380" y="56" text-anchor="middle" class="label">OPDS server</text>
  <text x="380" y="74" text-anchor="middle" class="sub">Atom/XML feeds</text>

  <rect x="290" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="380" y="144" text-anchor="middle" class="label">kosync</text>
  <text x="380" y="162" text-anchor="middle" class="sub">progress sync</text>

  <rect x="550" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="640" y="56" text-anchor="middle" class="label">e-reader</text>
  <text x="640" y="74" text-anchor="middle" class="sub">XteInk · CrossPoint</text>

  <rect x="550" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="640" y="144" text-anchor="middle" class="label">KOReader</text>
  <text x="640" y="162" text-anchor="middle" class="sub">reading position</text>

  <path d="M210,60 L290,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M210,60 L236,60 Q250,60 250,74 L250,134 Q250,148 264,148 L290,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M470,148 L550,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
