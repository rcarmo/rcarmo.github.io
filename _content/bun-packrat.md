---
section: networking
status: active
created: 2026-08-12
tagline: Self-hosted web archive that stores Chromium MHTML in SQLite and derives safe offline reading and export views.
---

## About

`bun-packrat` is a self-hosted archive for rendered web pages, designed as a compact successor to a large ArchiveBox deployment. Each fresh capture stores canonical Chromium MHTML in SQLite alongside its metadata, tags, job history and FTS5 search index.

Full-page HTML, simplified articles, Markdown, EPUB and PDF are derived from the stored snapshot when requested instead of being retained as duplicate files. The service runs on Bun with no external queue, database or search daemon.

## Gallery

- [Archive index](assets/screenshots/bun-packrat/archive-index.png) — Searchable capture history with filtering, pagination and direct reading and export actions

## How it works

Capture requests arrive through the server-rendered web interface, HTTP API, bookmarklet or Bun CLI. The server normalises each URL, applies SSRF checks and records a job in SQLite. An in-process worker opens an isolated Chromium context through Playwright, applies a bounded readiness wait, materialises lazy content and stores the resulting MHTML, SHA-256 hash and derived Readability metadata in one transaction.

Reader routes decode the canonical snapshot into sanitised standalone HTML with captured resources embedded locally. Full-page and Article views use a restrictive Content Security Policy and make no external requests. FTS5 supplies search and filtering, while the same stored capture can produce Markdown ZIP, EPUB 3 and PDF exports on demand.

## Features

### 🗄️ Single-database archive

Captures, canonical MHTML, metadata, tags, queue state and search indexes live in one SQLite database that supports consistent online backup and integrity verification.

### 🌐 Browser-based capture

Playwright drives Chromium to render pages, dismiss known overlays, reveal lazy content and serialise the final DOM and loaded resources as MHTML.

### 🔎 Search and history

The server-rendered interface and HTTP API provide FTS5 search, filters, deterministic sorting, capture history and paginated results that work on desktop and mobile browsers.

### 📖 Offline reading modes

Safe full-page HTML preserves captured styling and media, while a separate Article view uses Readability to produce a responsive, simplified document with embedded images.

### 📦 Derived exports

Each successful capture can be downloaded as standalone HTML, offline Markdown ZIP, EPUB 3 or an on-demand PDF without maintaining a permanent export cache.

### 🔧 API, CLI and operations

Authenticated HTTP routes and a Bun CLI cover capture, search, export, deletion, status, backup and content-hash verification. Basic authentication is enabled by default.

## Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Capture clients</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Web UI · API · CLI</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">Packrat service</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Bun HTTP server</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Capture worker</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Playwright · Chromium</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="144" text-anchor="middle" class="label">SQLite + FTS5</text>
  <text x="600" y="162" text-anchor="middle" class="sub">Canonical MHTML</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="840" y="56" text-anchor="middle" class="label">Public web page</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Rendered source</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="144" text-anchor="middle" class="label">Derived views</text>
  <text x="840" y="162" text-anchor="middle" class="sub">HTML · Article · exports</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M600,90 L600,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Capture once; derive safe views and exports from canonical MHTML</text>
</svg>

