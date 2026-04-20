---
section: ai-agents
status: active
tagline: Micro MCP server — zero deps, decorator-based, stdio only.
logo: assets/logos-opt/umcp.png
---

## About
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
