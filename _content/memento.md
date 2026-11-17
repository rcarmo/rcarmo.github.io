---
id: memento
repo: rcarmo/memento
section: agents
status: active
created: 2026-07-17
logo: assets/logos-opt/memento.png
tagline: Shared, durable memory for multiple AI agents, with authenticated MCP access, Git history and rebuildable search.
---

## About
`memento` stores knowledge that should outlive a conversation and be useful to several agents: people, projects, machines, services and the decisions connecting them. Chats, reminders, provider credentials and machine-specific notes stay with their owners.

Built for several [Piclaw](piclaw) instances, it provides authenticated MCP access to Markdown concepts in Git. Agents can search, follow links and propose changes; authorised curators can review proposals or edit concepts directly. The service and local model workers run in Go.

## How it works
Concepts have stable IDs, metadata and ordinary Markdown links. Git holds their content and history. `control.sqlite` records operations, proposals, principals and access activity; `derived.sqlite` holds rebuildable search, graph and embedding data. Routine updates reuse existing embeddings where content is unchanged.

Writes check namespace permissions, the expected revision and idempotency keys before committing and updating indexes. Curators with write access to every affected path may review their own proposals; the audit trail records both author and reviewer. Trash can be restored. Explicitly confirmed purges remove current content and assets while retaining Git history.

FTS5 and graph search work without a model. Optional GTE embeddings add semantic ranking, and a local Needle model can propose a read operation that deterministic code validates. Short-lived workers release model memory after use. Optional generated answers draw only on concepts the caller may read.

## Gallery
- [Live memory graph](assets/screenshots/memento/live-graph.png) -- Memento 0.5.4 showing the current knowledge graph
- [Memory graph overview](assets/screenshots/memento/visual-debugger-overview.png) -- Visual debugger showing concepts, services, links, clusters and diagnostics
- [Memory inspector](assets/screenshots/memento/visual-debugger-inspector.png) -- Selected concept metadata, links, assets, proposals and embedding state
- [Large graph stress view](assets/screenshots/memento/visual-debugger-large-graph.png) -- 2,000-node graph with level-of-detail rendering and runtime diagnostics

## Features
### Authenticated MCP access
A standalone Go implementation of [uMCP](umcp)'s protocol provides Streamable HTTP. Compact discovery exposes the common operations before less-used schemas.

### Search and inventory
Lexical search, backlinks, graph neighbourhoods and bounded metadata inventory, with optional semantic ranking.

### Reviewed and direct writes
Agents propose changes; curators can approve, reject or request revisions, and use direct create, patch or rename tools when exposed. Namespace permissions apply to both routes.

### Trash and recovery
Restore trashed concepts or purge current content with explicit confirmation. Git history, operation journals and backups support recovery.

### Access management
Administrators manage principals and scoped credentials through the admin UI or role-filtered MCP tools. New credentials are shown once; only verifiers are retained.

### Recallable asset packs
Versioned ZIP packs attach diagrams, datasets or complete skills to concepts. Manifests, digests and path checks protect recall; Memento does not execute recalled skills.

### Optional model assistance
Local routing, semantic ranking, cited answers and proposal drafting are optional. Code validates model output and enforces authorisation.

### Visual debugger
An optional graph view shows links, provenance and proposals. It is disabled by default and unauthenticated when enabled, so keep it on a trusted development network.

## Posts
- [Notes for September 13-20](https://taoofmac.com/space/notes/2026/09/20/1800) — 2026-09-20
- [Building Piclaw on Top of an Opinionated Coding Agent](https://taoofmac.com/space/blog/2026/08/21/2218) — 2026-08-21
- [Marked Down](https://taoofmac.com/space/blog/2026/07/21/1840) — 2026-07-21
- [Notes for July 13–19](https://taoofmac.com/space/notes/2026/07/19/1500) — 2026-07-19

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
  <text x="120" y="56" text-anchor="middle" class="label">MCP clients</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Piclaw · other agents</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">Memento MCP</text>
  <text x="360" y="74" text-anchor="middle" class="sub">auth · roles · tools</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Curator writes</text>
  <text x="600" y="74" text-anchor="middle" class="sub">review / direct · journal</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="144" text-anchor="middle" class="label">Search / router</text>
  <text x="600" y="162" text-anchor="middle" class="sub">bounded read operations</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Git knowledge</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Markdown · history · ZIP</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="144" text-anchor="middle" class="label">Derived indexes</text>
  <text x="840" y="162" text-anchor="middle" class="sub">search · graph · embeddings</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="852" y="108" class="sub">rebuild</text>

  <text x="480" y="198" text-anchor="middle" class="sub">Canonical Git knowledge, rebuildable search and authorised writes</text>
</svg>
