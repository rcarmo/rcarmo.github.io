---
section: agents
status: active
created: 2025-05-30
tagline: Micro MCP server — zero deps, stdio / SSE / TCP, sync and async, naming convention over decoration.
---

## About
A zero-dependency Python micro-framework for the [Model Context Protocol](https://modelcontextprotocol.io). Two files (`umcp.py` and `aioumcp.py`), no third-party packages, three transports (stdio, SSE, TCP), and a naming convention — functions starting with `tool_` or `prompt_` are discovered and exposed automatically. Type hints become JSON Schema; docstrings become descriptions. Adding MCP to an existing script takes minutes.

## How it works
The protocol layer reads JSON-RPC 2.0 from stdin (stdio mode) or over HTTP/SSE (`--port N`) or raw TCP (`--tcp`). It discovers `tool_*` and `prompt_*` methods on your subclass via introspection, generates `inputSchema` from type hints (including `Literal`, `Union`, `Optional`, `TypedDict`), and infers MCP annotations (`readOnlyHint`, `destructiveHint`) from naming conventions. Return a value and it serialises automatically. Pick `MCPServer` for local-disk and compute work; pick `AsyncMCPServer` when tools are network-bound.

## Features
### 🪶 Zero dependencies
Pure Python 3.10+ stdlib. Copy one file, run anywhere.

### 📡 Three transports
stdio (default), SSE (`--port N`), and raw TCP (`--tcp`). Same server class, different launch flag.

### 🔍 Convention over decoration
Name a method `tool_<name>` or `prompt_<name>` — discovery, schema generation, and MCP wiring happen automatically.

### ⚡ Sync + async
`MCPServer` for compute / disk-bound tools; `AsyncMCPServer` for network-bound tools. Same API surface.

### 📐 Full schema inference
`Literal`, `Union`, `Optional`, `TypedDict` → JSON Schema. Strict argument validation, type coercion for stringy clients.

### 📝 Prompt templates
`prompt_*` methods exposed via `prompts/list` and `prompts/get`. Reusable structured interactions for AI assistants.

## Posts
- [Lessons on Building MCP Servers](https://taoofmac.com/space/blog/2026/04/29/2341) — 2026-04-30
- [Creating Per-Project MCP Servers](https://taoofmac.com/space/blog/2025/10/04/1111) — 2025-10-04
- [Notes on SKILL.md vs MCP](https://taoofmac.com/space/notes/2026/01/14/0830) — 2026-01-14

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
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
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Your Python code</text>
  <text x="120" y="74" text-anchor="middle" class="sub">tool_* / prompt_* methods</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="364" y="56" text-anchor="middle" class="label">MCPServer</text>
  <text x="364" y="74" text-anchor="middle" class="sub">introspect + JSON Schema</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Discovery</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">auto naming</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Schema gen</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">type hints</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="608" y="56" text-anchor="middle" class="label">Transport</text>
  <text x="608" y="74" text-anchor="middle" class="sub">stdio · SSE · TCP</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="848" y="56" text-anchor="middle" class="label">MCP client</text>
  <text x="848" y="74" text-anchor="middle" class="sub">Claude · Copilot · Pi</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <text x="486" y="54" text-anchor="middle" class="sub">JSON-RPC</text>
  <path d="M698,60 L758,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="484" y="174" text-anchor="middle" class="sub">Zero-dependency Python MCP framework — convention over decoration</text>
</svg>
