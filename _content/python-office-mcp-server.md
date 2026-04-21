---
section: ai-agents
status: active
created: 2026-03-12
tagline: MCP server for Microsoft Office automation — read, write, and manipulate Word, Excel, and PowerPoint files.
---

## About
A Model Context Protocol server that gives AI agents direct access to Microsoft Office documents. Agents can read, write, and manipulate Word, Excel, and PowerPoint files without any Office installation — pure Python, no COM automation.

## How it works
Exposes the MCP tool protocol over stdio, so any MCP-compatible agent can call it as a subprocess. Uses python-docx, openpyxl, and python-pptx under the hood. Each tool maps directly to a document operation — read a sheet range, insert a paragraph, append slides — keeping context usage low by returning only the relevant fragment.

## Features
### 📄 Word document tools
Read paragraphs, tables, and headers; insert or replace content; extract plain text for summarisation.

### 📊 Excel spreadsheet tools
Read cell ranges, write values, create sheets, and parse structured tables into JSON for agent reasoning.

### 📑 PowerPoint tools
Read slide content and speaker notes; add or update slides; export individual slides as images.

### 🔌 Zero-install Office
No Microsoft Office needed — all document manipulation is done with pure-Python libraries that handle the OOXML format directly.

### 🤖 MCP-native
Implements the Model Context Protocol tool interface over stdio, compatible with any MCP host including Claude Desktop, piclaw, and agentbox.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 220">
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

  <!-- Left: AI Agent -->
  <rect x="16" y="60" width="120" height="75" rx="8" class="box-accent"/>
  <text x="76" y="90" text-anchor="middle" class="label">AI agent</text>
  <text x="76" y="107" text-anchor="middle" class="sub">MCP host</text>
  <text x="76" y="122" text-anchor="middle" class="sub">Claude · PiClaw</text>

  <!-- Middle: MCP server -->
  <rect x="192" y="60" width="140" height="75" rx="8" class="box-green"/>
  <text x="262" y="87" text-anchor="middle" class="label">MCP server</text>
  <text x="262" y="104" text-anchor="middle" class="sub">stdio · JSON-RPC 2.0</text>
  <text x="262" y="119" text-anchor="middle" class="sub">tool dispatch</text>

  <!-- Right column: three doc type boxes -->
  <rect x="390" y="16" width="130" height="50" rx="8" class="box"/>
  <text x="455" y="37" text-anchor="middle" class="label">📄 Word</text>
  <text x="455" y="53" text-anchor="middle" class="sub">python-docx</text>

  <rect x="390" y="78" width="130" height="50" rx="8" class="box-warm"/>
  <text x="455" y="99" text-anchor="middle" class="label">📊 Excel</text>
  <text x="455" y="115" text-anchor="middle" class="sub">openpyxl</text>

  <rect x="390" y="140" width="130" height="50" rx="8" class="box-purple"/>
  <text x="455" y="161" text-anchor="middle" class="label">📎 PowerPoint</text>
  <text x="455" y="177" text-anchor="middle" class="sub">python-pptx</text>

  <!-- Arrows -->
  <!-- Agent → MCP server -->
  <line x1="136" y1="97" x2="190" y2="97" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <!-- MCP server → Word -->
  <line x1="332" y1="80" x2="388" y2="45" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- MCP server → Excel -->
  <line x1="332" y1="97" x2="388" y2="100" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- MCP server → PPT -->
  <line x1="332" y1="115" x2="388" y2="160" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="330" y="208" text-anchor="middle" class="sub">pure Python · no Office install · OOXML format directly</text>
</svg>
