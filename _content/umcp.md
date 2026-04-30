---
section: ai-agents
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 200">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#0d2220; stroke:#207060; stroke-width:1.5; }
      .hi2 { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .hi3 { fill:#221a10; stroke:#a06020; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#d1fae5; stroke:#059669; stroke-width:1.5; }
      .hi2 { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
      .hi3 { fill:#fef3c7; stroke:#d97706; stroke-width:1.5; }
      .label{ fill:#1a2a40; } .sub{ fill:#5070a0; }
    }
    text { font-family:-apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- MCP Host -->
  <rect x="8" y="55" width="110" height="90" rx="8" class="hi2"/>
  <text x="63" y="88" text-anchor="middle" class="label">MCP Host</text>
  <text x="63" y="105" text-anchor="middle" class="sub">Claude · Cursor</text>
  <text x="63" y="121" text-anchor="middle" class="sub">Copilot · gi</text>

  <!-- Transport labels -->
  <text x="163" y="42" text-anchor="middle" class="sub" font-weight="600">stdio</text>
  <text x="163" y="100" text-anchor="middle" class="sub" font-weight="600">SSE</text>
  <text x="163" y="158" text-anchor="middle" class="sub" font-weight="600">TCP</text>

  <line x1="118" y1="80" x2="200" y2="55" stroke="#5070a0" stroke-width="1.2" stroke-dasharray="4,2" marker-end="url(#ah)"/>
  <line x1="118" y1="100" x2="200" y2="100" stroke="#5070a0" stroke-width="1.2" stroke-dasharray="4,2" marker-end="url(#ah)"/>
  <line x1="118" y1="120" x2="200" y2="145" stroke="#5070a0" stroke-width="1.2" stroke-dasharray="4,2" marker-end="url(#ah)"/>

  <!-- umcp core -->
  <rect x="202" y="20" width="160" height="160" rx="8" class="hi"/>
  <text x="282" y="52" text-anchor="middle" class="label">umcp / aioumcp</text>
  <text x="282" y="70" text-anchor="middle" class="sub">JSON-RPC 2.0 dispatch</text>
  <text x="282" y="86" text-anchor="middle" class="sub">tool_* discovery</text>
  <text x="282" y="102" text-anchor="middle" class="sub">prompt_* discovery</text>
  <text x="282" y="118" text-anchor="middle" class="sub">type hint → JSON Schema</text>
  <text x="282" y="134" text-anchor="middle" class="sub">annotation inference</text>
  <text x="282" y="150" text-anchor="middle" class="sub">strict arg validation</text>
  <text x="282" y="166" text-anchor="middle" class="sub">sync + async</text>

  <line x1="362" y1="80" x2="398" y2="60" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="362" y1="120" x2="398" y2="140" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Tools -->
  <rect x="400" y="20" width="160" height="70" rx="8" class="box"/>
  <text x="480" y="50" text-anchor="middle" class="label">tool_* methods</text>
  <text x="480" y="67" text-anchor="middle" class="sub">compute · disk · network</text>
  <text x="480" y="83" text-anchor="middle" class="sub">docstring → description</text>

  <!-- Prompts -->
  <rect x="400" y="110" width="160" height="70" rx="8" class="hi3"/>
  <text x="480" y="140" text-anchor="middle" class="label">prompt_* methods</text>
  <text x="480" y="157" text-anchor="middle" class="sub">structured templates</text>
  <text x="480" y="173" text-anchor="middle" class="sub">category annotations</text>

  <line x1="560" y1="55" x2="596" y2="55" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="560" y1="145" x2="596" y2="145" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <rect x="598" y="20" width="134" height="160" rx="8" class="box"/>
  <text x="665" y="55" text-anchor="middle" class="label">External</text>
  <text x="665" y="72" text-anchor="middle" class="sub">APIs · DBs</text>
  <text x="665" y="88" text-anchor="middle" class="sub">files · services</text>
  <text x="665" y="130" text-anchor="middle" class="label">AI Context</text>
  <text x="665" y="147" text-anchor="middle" class="sub">reusable</text>
  <text x="665" y="163" text-anchor="middle" class="sub">prompt packs</text>
</svg>
