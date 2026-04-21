---
section: ai-agents
status: active
created: 2025-05-30
tagline: Micro MCP server — zero deps, decorator-based, stdio only.
---

## About
Forked from [muthuishere/mcp-server-bash-sdk](https://github.com/muthuishere/mcp-server-bash-sdk). Rewritten as a zero-dependency Python micro-framework with async support and type-based schema generation.

Single-file MCP server: decorate Python functions with @server.tool(), the server handles JSON-RPC 2.0 over stdio, you write plain functions. Zero external dependencies. Async and sync variants.

## How it works
The protocol layer reads JSON-RPC 2.0 from stdin and dispatches to registered handlers. Decorate a function with @server.tool() — its name becomes the tool name, its docstring the description, its type annotations the JSON Schema. Return a value and it serialises automatically. Adding MCP to an existing Python script takes three lines.

## Features
### 🪶 Zero dependencies
Pure Python 3 stdlib. Copy one file.

### ⚡ Async + sync
@server.tool on async def and plain def.

### 🎯 Decorator registration
Docstring → description. Annotations → JSON Schema.

## Posts
- [Creating Per-Project MCP Servers](https://taoofmac.com/space/blog/2025/10/04/1111) — 2025-10-04
- [Notes on SKILL.md vs MCP](https://taoofmac.com/space/notes/2026/01/14/0830) — 2026-01-14

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="660" height="230" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box-accent"/>
  <text x="100" y="91" text-anchor="middle" class="label">MCP client</text>
  <text x="100" y="109" text-anchor="middle" class="sub">Claude / Cursor</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="91" text-anchor="middle" class="label">umcp server</text>
  <text x="330" y="109" text-anchor="middle" class="sub">zero deps</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="50" text-anchor="middle" class="label">@server.tool</text>
  <text x="560" y="68" text-anchor="middle" class="sub">async handler</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="132" text-anchor="middle" class="label">@server.tool</text>
  <text x="560" y="150" text-anchor="middle" class="sub">sync handler</text>

  <text x="330" y="218" text-anchor="middle" class="sub">plain Python functions</text>

  <polyline points="180,95 250,95" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <polyline points="410,95 445,95 445,136 480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
