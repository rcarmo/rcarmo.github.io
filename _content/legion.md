---
section: cloud-infra
status: experimental
created: 2026-08-30
logo: assets/logos-opt/legion.png
tagline: Self-hosted durable agents and WASM/Bun functions across a self-forming Raft cluster.
---

## About

I started Legion because I wanted Piclaw's backend to survive process and node failures without adopting a cloud control plane. It is a Rust platform for event-sourced AI agent turns and content-addressed WASM or Bun functions, spread across a LAN-first cluster that discovers and reconnects to peers automatically.

The same durable state sits behind a 9P namespace, so functions, sessions and cluster resources are available as paths rather than through a collection of unrelated APIs. The project is deliberately experimental despite having working implementations for its initial milestones; storage and networking dependencies are still settling.

## How it works

Clients use a 9P namespace over authenticated iroh QUIC to reach functions, sessions and cluster state. Agent turns record intent before execution, append model and tool events as they happen, and can resume from the committed event log on another node. WASM modules and Bun bundles are stored by content hash and registered separately, which makes deployment immutable and keeps architecture-specific code out of WASM workloads.

Raft-replicated SQLite holds strongly consistent metadata, fjall stores the Raft log, and iroh-blobs carries larger content-addressed payloads. Nodes find each other through mDNS on a LAN, use public-key identities instead of fixed IP addresses, and exchange membership and health information through iroh-gossip.

## Features

### Durable agent turns

Event-sourced turns record model output, tool calls, budgets and completion state so another node can resume interrupted work.

### Self-forming cluster

mDNS bootstraps local peers; iroh QUIC, gossip and Raft maintain identity, membership and replicated state as addresses change.

### Content-addressed functions

WASM modules and Bun bundles are uploaded as immutable blobs, registered by CID and promoted through weighted routing.

### 🗂️ 9P namespace

Functions, sessions, peers and cluster state appear under a single filesystem-like namespace for clients, scripts and agents.

### WASM and Bun runtimes

Wasmtime and Extism execute portable WASM components, while supervised Bun subprocesses handle JavaScript and TypeScript workloads.

### Operations

OpenTelemetry metrics, restore-tested restic backups, health reporting and load gates cover the first production-hardening milestone.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 202">
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
  <rect width="968" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Clients</text>
  <text x="120" y="74" text-anchor="middle" class="sub">CLI · REST · Bun workers</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="360" y="56" text-anchor="middle" class="label">9P namespace</text>
  <text x="360" y="74" text-anchor="middle" class="sub">functions · sessions · cluster</text>

  <rect x="502" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="514" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="604" y="56" text-anchor="middle" class="label">Durable execution</text>
  <text x="604" y="74" text-anchor="middle" class="sub">event-sourced workloads</text>
  <rect x="518" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="559" y="119" text-anchor="middle" class="label" style="font-size:11px">Agent loop</text>
  <text x="559" y="133" text-anchor="middle" class="sub" style="font-size:9px">resume turns</text>
  <rect x="608" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="649" y="119" text-anchor="middle" class="label" style="font-size:11px">Functions</text>
  <text x="649" y="133" text-anchor="middle" class="sub" style="font-size:9px">WASM · Bun</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="848" y="56" text-anchor="middle" class="label">Event store</text>
  <text x="848" y="74" text-anchor="middle" class="sub">SQLite · fjall · blob CAS</text>

  <rect x="758" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="848" y="144" text-anchor="middle" class="label">Legion cluster</text>
  <text x="848" y="162" text-anchor="middle" class="sub">Raft · iroh QUIC · mDNS</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L514,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M694,60 L758,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M848,90 L848,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="484" y="198" text-anchor="middle" class="sub">Durable agents and functions on a self-forming Raft cluster</text>
</svg>
