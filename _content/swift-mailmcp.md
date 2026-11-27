---
id: swift-mailmcp
repo: rcarmo/swift-mailmcp
section: apple
status: experimental
created: 2026-11-21
logo: assets/logos-opt/swift-mailmcp.png
tagline: Swift MCP server that lets agents search and file Apple Mail messages, without sending mail.
---

## About
MailMCP gives AI agents a deliberately narrow interface to Apple Mail. They can list folders, read message metadata, search and file messages into other mailboxes; sending mail and reaching account credentials are outside its tools. The aim is to automate Mail in the least disastrous way possible.

A signed macOS app drives Mail through Apple Events in the logged-in session and serves MCP on loopback, so sandboxed agents can reach it with a bearer token. It is a source preview that targets macOS 13 or later, and live Mail automation has so far been tested on Apple silicon.

## How it works
Tools discover accounts and nested folders, page through message metadata and search senders, subjects, recipients or plain-text bodies. A similarity tool finds copies and related mail by Message-ID, normalised subject and sender. Mail reads run within time budgets; identical requests share a result, and after a timeout the scheduler backs off and probes Mail before sending more work.

Moves are written to a SQLite journal before an operation ID is returned. A worker then sends a targeted Apple Event for each message and checks the destination where it can. Status separates queued, accepted, verified and unknown outcomes: an unknown move may still have happened, so it must be rechecked before filing again. Journal details are purged after 90 days, but expired operation IDs stay reserved.

## Features
### Organising only
Search, list and file messages. There are no sending tools and no access to account credentials.

### Mailbox discovery
Account IDs, full nested paths and mailbox IDs, including On My Mac folders and same-name folders at different paths.

### Search and similarity
Sender and subject matching, exact To/Cc filters, optional body search and related-message lookup, with paged results.

### Journalled moves
Single moves or batches of up to 50, across accounts. Caller-supplied operation IDs let a lost acknowledgement be retried without queuing a second move.

### Move verification
Background destination checks, on-demand reconciliation and optional arrival baselines for destinations with fewer than 500 messages.

### Diagnostics
Trace IDs in responses, macOS Unified Logging and explicit time budgets for reads and moves.

### Desktop app
The Dock icon or menu bar envelope opens a status window with the endpoint and masked token. Copy or replace the token there; closing the window leaves the server running.

### Local setup
Streamable HTTP on loopback with a bearer token. Builds need a persistent signing identity; `make authorize` requests Mail Automation permission, and `make start` and `make status` launch and check the app.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">MCP client</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Bearer token · loopback</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">MailMCP app</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Search · list · file</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Mail scheduler</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Budgets · move journal</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Apple Mail</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Apple Events</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Loopback MCP server filing Apple Mail through Apple Events</text>
</svg>
