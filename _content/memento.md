---
id: memento
repo: rcarmo/memento
section: agents
status: active
created: 2026-07-17
logo: assets/logos-opt/memento.png
tagline: Shared, durable memory for multiple AI agents, with MCP access, reviewed Git writes and rebuildable search.
---

## About
`memento` stores knowledge that should outlive a conversation and remain available to several agents: people, projects, machines, services, decisions and their relationships. Chats, reminders, credentials and machine-specific state stay with the agent that owns them.

It was built for several [`piclaw`](piclaw) instances, but any authenticated MCP client can search, read and propose changes. Curators review writes before they reach the shared repository.

## How it works
Concepts are Markdown files with stable IDs, metadata and links. Git owns those files and their history; `control.sqlite` owns proposals, idempotency records, write journals, leases and scheduler state. A separate FTS5, graph and optional vector index is derived from Markdown and can be rebuilt.

A fine-tuned local Needle model removes ambiguity by classifying natural-language requests into a small set of read operations. Deterministic code derives search text, IDs, paths and bounded plans, then applies schema validation and normal authorisation. The model cannot author mutations.

Writes follow `search -> read -> propose -> review -> apply`. Accepted changes are assembled in temporary worktrees and committed only if the expected repository revision still matches. The readable checkout and indexes advance before success is returned.

## Gallery
- [Memory graph overview](assets/screenshots/memento/visual-debugger-overview.png) — Visual debugger showing concepts, services, links, clusters and diagnostics
- [Memory inspector](assets/screenshots/memento/visual-debugger-inspector.png) — Selected concept metadata, links, assets, proposals and embedding state
- [Large graph stress view](assets/screenshots/memento/visual-debugger-large-graph.png) — 2,000-node graph with level-of-detail rendering and runtime diagnostics

## Features
### Authenticated MCP access
[`umcp`](umcp) supplies Streamable HTTP transport, request context and authentication. Clients receive tools, not filesystem or Git access.

### Fine-tuned request routing
A local Needle model classifies natural-language requests into bounded read operations. Strict schemas and deterministic expansion validate each result before execution.

### Search without mandatory models
Lexical and graph search work locally. GTE-small can add semantic ranking; queries fall back to lexical search if it is unavailable.

### Proposal-first writes
Agents draft changes and inspect diffs. Curators approve, reject or request changes; model-authored proposals cannot approve themselves.

### Revision-safe Git history
Stable concept IDs survive renames, inbound links update in the same transaction and stale writes conflict instead of replacing newer knowledge.

### Recallable asset packs
Versioned Git LFS ZIPs can attach diagrams, templates, datasets or complete skills to a concept, with manifests and path checks on recall.

### Optional model assistance
Separate local models can produce cited answers, draft proposals and suggest Dream maintenance work. They remain advisory and cannot publish.

### Recovery and backups
A single-writer lease, operation journal and startup reconciliation cover interrupted mutations. Backups contain the bare repository and a checksummed SQLite copy.

### Explicit boundaries
No chat transcripts, reminders, credentials, hard delete, arbitrary shell execution or direct model writes.

## Posts
- [Building Piclaw on Top of an Opinionated Coding Agent](https://taoofmac.com/space/blog/2026/08/21/2218) — 2026-08-21
- [Marked Down](https://taoofmac.com/space/blog/2026/07/21/1840) — 2026-07-21
- [Notes for July 13-19](https://taoofmac.com/space/notes/2026/07/19/1500) — 2026-07-19

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
  <text x="600" y="56" text-anchor="middle" class="label">Reviewed writes</text>
  <text x="600" y="74" text-anchor="middle" class="sub">proposal · journal · lease</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="144" text-anchor="middle" class="label">Fine-tuned router</text>
  <text x="600" y="162" text-anchor="middle" class="sub">bounded read operations</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Git knowledge</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Markdown · history · LFS</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="144" text-anchor="middle" class="label">Derived indexes</text>
  <text x="840" y="162" text-anchor="middle" class="sub">FTS5 · graph · vectors</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="852" y="108" class="sub">rebuild</text>

  <text x="480" y="198" text-anchor="middle" class="sub">Canonical Git knowledge, rebuildable search and reviewed writes</text>
</svg>
