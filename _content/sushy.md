---
id: sushy
repo: rcarmo/sushy
section: cloud-infra
status: maintenance
created: 2014-09-23
tagline: Filesystem-backed wiki and blog engine with SQLite indexing and multiple markup formats.
---

## About
`sushy` is the filesystem-backed wiki and blog engine that formerly powered taoofmac.com. Each page is a directory, content remains editable with ordinary tools, and a disposable SQLite index provides search and link metadata without becoming the source of truth.

The codebase is written largely in Hy and is being brought up to date for current Hy releases. It is a cleaned-up legacy system, not a new publishing platform.

## How it works
A content tree holds pages and their assets. RFC2822-style front matter carries metadata, while the file extension or an explicit content type selects the renderer for Markdown, Textile, HTML, plain text and legacy ReStructuredText support.

An indexer updates SQLite full-text data from the content tree. The HTTP layer renders pages on demand through the selected theme and supports ETag, Last-Modified and HEAD handling to avoid unnecessary work. Atom feeds, sitemap and OpenSearch output are generated from the same content and index where those legacy features remain enabled.

## Features
### Filesystem source of truth
Pages, metadata and attachments remain ordinary files arranged as one directory per page.

### Multiple renderers
Markdown, Textile, HTML and plain text are supported, with legacy ReStructuredText support and only preliminary notebook handling.

### Full-text indexing
SQLite provides disposable search and internal metadata while remaining safe to rebuild from content.

### HTTP caching
ETag, Last-Modified and HEAD responses make on-demand rendering practical behind a normal web server.

### Publishing surfaces
Includes Atom feeds, sitemap, OpenSearch and blog navigation alongside wiki pages.

### Deliberate omissions
No web editor, revision history or comments; site thumbnailing was moved into a separate application.

## Posts
- [Python](https://taoofmac.com/space/dev/python) — 2026-07-29

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
  <text x="120" y="56" text-anchor="middle" class="label">Content tree</text>
  <text x="120" y="74" text-anchor="middle" class="sub">pages · front matter · assets</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">Renderer</text>
  <text x="360" y="74" text-anchor="middle" class="sub">front matter · markup · theme</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="144" text-anchor="middle" class="label">Indexer</text>
  <text x="360" y="162" text-anchor="middle" class="sub">content indexing</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="144" text-anchor="middle" class="label">SQLite FTS</text>
  <text x="600" y="162" text-anchor="middle" class="sub">search · aliases · links</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="840" y="56" text-anchor="middle" class="label">HTTP server</text>
  <text x="840" y="74" text-anchor="middle" class="sub">pages · feeds · sitemap</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Browser / reader</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">HTML · Atom · OpenSearch</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M210,60 L226,60 Q240,60 240,74 L240,134 Q240,148 254,148 L270,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="600" y="198" text-anchor="middle" class="sub">Filesystem content with rebuildable SQLite search state</text>
</svg>
