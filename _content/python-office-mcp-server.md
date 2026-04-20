---
section: ai-agents
status: active
tagline: MCP server for Microsoft Office automation — read, write, and manipulate Word, Excel, and PowerPoint files.
logo: assets/logos-opt/python-office-mcp-server.png
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
