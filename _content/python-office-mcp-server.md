---
section: agents
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 290">
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
  <rect width="720" height="290" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">AI agent</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Claude · PiClaw</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">MCP server</text>
  <text x="360" y="74" text-anchor="middle" class="sub">tool dispatch</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="56" text-anchor="middle" class="label">📄 Word</text>
  <text x="600" y="74" text-anchor="middle" class="sub">python-docx</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-warm"/>
  <text x="600" y="144" text-anchor="middle" class="label">📊 Excel</text>
  <text x="600" y="162" text-anchor="middle" class="sub">openpyxl</text>

  <rect x="510" y="206" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="232" text-anchor="middle" class="label">📎 PowerPoint</text>
  <text x="600" y="250" text-anchor="middle" class="sub">python-pptx</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,222 Q480,236 494,236 L510,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="360" y="286" text-anchor="middle" class="sub">pure Python · no Office install · OOXML format directly</text>
</svg>
