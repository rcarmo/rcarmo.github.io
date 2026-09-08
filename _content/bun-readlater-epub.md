---
id: bun-readlater-epub
repo: rcarmo/bun-readlater-epub
section: networking
status: active
created: 2026-04-07
tagline: Self-hosted read-later service that turns saved article URLs into EPUBs in a Calibre library for OPDS readers.
---

## About
`bun-readlater-epub` takes a URL from a Safari bookmarklet, extracts the article and writes a self-contained EPUB in a dedicated Calibre library. OPDS clients such as KOReader handle delivery and reading, which keeps the service focused on capture and conversion.

It is designed for one user on a trusted network. Authentication is a shared token and the queue is intentionally serial.

## How it works
The Bun HTTP service records each submission in SQLite and passes it to a serial queue. The fetch stage normalises and deduplicates URLs, applies timeout and size limits, extracts readable HTML and can fall back to an archived copy.

Images are fetched, resized, converted to greyscale e-ink modes and embedded locally. The EPUB packager and Calibre `metadata.db` writer use Bun and standard-library primitives rather than external EPUB or Calibre management libraries. The result appears in a dedicated library for downstream OPDS clients.

## Features
### Safari capture
A Safari bookmarklet uses a plain form submit for compatibility and returns a small acknowledgement page after saving.

### Defensive fetching
Browser-like requests, timeouts, retries, content-type checks, size limits, canonical URL deduplication and tracking-parameter removal.

### Offline EPUBs
Readable article HTML and locally embedded images are packaged directly into self-contained EPUB files.

### E-ink image modes
Adaptive greyscale processing includes `gray8` and `gray4-dither` output modes.

### Calibre library writer
Creates the Calibre-compatible library hierarchy and updates `metadata.db` without invoking Calibre.

### Queue visibility
The web UI shows queue status, item detail, attempt history, and retry or refetch controls.

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
  <rect width="1200" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Safari bookmarklet</text>
  <text x="120" y="74" text-anchor="middle" class="sub">URL + shared token</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Bun service</text>
  <text x="360" y="74" text-anchor="middle" class="sub">HTTP + SQLite queue</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Fetch + extract</text>
  <text x="600" y="74" text-anchor="middle" class="sub">clean HTML · local images</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">EPUB packager</text>
  <text x="840" y="74" text-anchor="middle" class="sub">self-contained article</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Calibre library</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">files + metadata.db</text>

  <rect x="990" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="144" text-anchor="middle" class="label">OPDS / KOReader</text>
  <text x="1080" y="162" text-anchor="middle" class="sub">delivery + offline reading</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M1080,90 L1080,118" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Saved article URL to offline EPUB</text>
</svg>
