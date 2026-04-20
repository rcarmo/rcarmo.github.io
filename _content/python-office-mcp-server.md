---
section: ai-agents
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="60" width="120" height="80" rx="8" class="box-accent"/>
  <text x="80" y="98" text-anchor="middle" class="label">AI Agent</text>
  <text x="80" y="113" text-anchor="middle" class="sub">MCP host</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box"/>
  <text x="265" y="53" text-anchor="middle" class="label">Word tools</text>
  <text x="265" y="68" text-anchor="middle" class="sub">python-docx</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-b"/>
  <text x="265" y="143" text-anchor="middle" class="label">Excel tools</text>
  <text x="265" y="158" text-anchor="middle" class="sub">openpyxl</text>
  <rect x="400" y="60" width="130" height="80" rx="8" class="box-warm"/>
  <text x="465" y="98" text-anchor="middle" class="label">PPT tools</text>
  <text x="465" y="113" text-anchor="middle" class="sub">python-pptx</text>
  <line x1="140" y1="100" x2="200" y2="60" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="120" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="200" y1="140" x2="200" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="400" y2="90" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="140" x2="400" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
