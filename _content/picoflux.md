---
id: picoflux
repo: rcarmo/picoflux
section: networking
status: active
created: 2026-06-24
logo: assets/logos-opt/picoflux.png
tagline: Miniflux fork using embedded pure-Go SQLite, WAL and FTS5 instead of PostgreSQL.
---

## About
`picoflux` is an unofficial [Miniflux](https://github.com/miniflux/v2) fork that replaces PostgreSQL with an embedded pure-Go SQLite database. The result is one static binary and one database file, without CGo or a separate database service.

The feed reader, web interface and compatible APIs remain recognisably Miniflux. The fork-specific work is the storage, search, migration and release model.

## How it works
Feed refresh and article extraction feed the normal Miniflux application services. Entries, users and configuration live in one SQLite database opened with WAL, a busy timeout and foreign-key enforcement.

Triggers maintain an FTS5 index. Search uses weighted BM25 ranking with a recency contribution, while `PRAGMA user_version` tracks the consolidated SQLite schema.

## Features
### Embedded database
Uses `modernc.org/sqlite`; no PostgreSQL server, `libpq` or CGo is required.

### Full-text search
FTS5 triggers keep search data current, with title-weighted BM25 ranking and a recency boost.

### Static deployment
Pure-Go builds support straightforward cross-compilation, static release binaries and multi-architecture containers.

### Consolidated schema
Replaces the long PostgreSQL migration history with a single SQLite baseline and explicit schema version.

### Miniflux compatibility
Retains the web interface, REST API, Fever API, Google Reader API and normal feed-processing behaviour.

### Fresh import boundary
There is no automatic PostgreSQL migration. Existing installations export OPML and import it into a new Picoflux database.

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
  <text x="120" y="56" text-anchor="middle" class="label">RSS / Atom feeds</text>
  <text x="120" y="74" text-anchor="middle" class="sub">scheduled refresh</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Miniflux services</text>
  <text x="360" y="74" text-anchor="middle" class="sub">fetch · parse · scrape</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="56" text-anchor="middle" class="label">SQLite database</text>
  <text x="600" y="74" text-anchor="middle" class="sub">WAL · foreign keys</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="144" text-anchor="middle" class="label">FTS5 search</text>
  <text x="600" y="162" text-anchor="middle" class="sub">triggers · BM25 · recency</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="840" y="56" text-anchor="middle" class="label">Picoflux server</text>
  <text x="840" y="74" text-anchor="middle" class="sub">web · REST · Fever · GReader</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Readers</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">browser · mobile clients</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M600,90 L600,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Miniflux feed processing with embedded SQLite storage</text>
</svg>
