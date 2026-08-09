---
id: python-umcp-calibre
repo: rcarmo/python-umcp-calibre
section: agents
status: active
created: 2026-08-04
logo: assets/logos-opt/default.png
tagline: Calibre plugin that exposes live libraries to MCP clients without a second process touching metadata.db.
---

## About
`python-umcp-calibre` runs an MCP server inside the Calibre GUI process. Agents can search libraries, inspect books and, when explicitly enabled, perform mutations through Calibre's own APIs and job system.

The process boundary matters because Calibre keeps database, cache and filesystem state in memory. The plugin never opens `metadata.db` independently and does not switch the visible library as a side effect of a read.

## How it works
The released plugin serves Streamable HTTP at `POST /mcp`. Read-only tools expose library aliases, searches, metadata, formats, bounded EPUB inspection, quality assessment, duplicate discovery and bridge job state. Inactive libraries use Calibre secondary handles.

Mutations stay hidden unless Calibre is exactly version 9.12.0, the plugin UI contains a saved bearer token, mutation discovery is enabled and any environment-token override matches. Short operations run on the GUI thread; conversion, import and other long tasks use Calibre's native job machinery.

## Features
### Live Calibre state
Reads and writes execute inside the GUI process, preserving Calibre's in-memory database and cache invariants.

### Bounded discovery
Clients begin with a compact capability surface and can request one tool schema at a time. Results use stable ordering, opaque cursors and truncation metadata.

### EPUB inspection
Checks container structure, metadata, cover, table of contents and content signals under explicit file, archive, expansion, scan and time limits. Book text and absolute paths are not returned.

### Quality and duplicate tools
Scores EPUB quality with reason codes, compares candidates and finds duplicates within or across configured libraries without changing the active GUI library.

### Gated mutations
Supports metadata, formats, covers, import, trash, duplicate merge, conversion, library copy or move, disk export, configured e-mail recipients, job cancellation and guarded library switching.

### Policy boundaries
Import and export roots, destination libraries and recipients are configured in the UI. Non-loopback MCP access requires a bearer token; an environment token alone cannot unlock writes.

### Honest job state
Long operations appear in Calibre's Jobs UI and in the bridge ledger. Cancellation and cross-library moves report partial work instead of promising atomic behaviour.

### Compatibility paths
The repository retains an older read-only stdio/HTTP server and JSON-RPC helper, but neither is the released mutation surface.

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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">MCP client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Streamable HTTP</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Calibre µMCP plugin</text>
  <text x="360" y="74" text-anchor="middle" class="sub">auth · policy · dispatch</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Read tools</text>
  <text x="600" y="74" text-anchor="middle" class="sub">search · inspect · compare</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="144" text-anchor="middle" class="label">Mutation gate</text>
  <text x="600" y="162" text-anchor="middle" class="sub">version · token · UI opt-in</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Calibre read APIs</text>
  <text x="840" y="74" text-anchor="middle" class="sub">active · secondary handles</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="840" y="144" text-anchor="middle" class="label">Calibre write APIs</text>
  <text x="840" y="162" text-anchor="middle" class="sub">GUI thread · native jobs</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">MCP access inside the Calibre GUI process</text>
</svg>
