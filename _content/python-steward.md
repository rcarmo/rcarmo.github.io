---
section: ai
status: experimental
created: 2025-12-20
tagline: The simplest coding agent harness that could possibly work — Python, tool use, done.
logo: assets/logos-opt/python-steward.png
---

## About
Steward is the simplest coding agent harness that could possibly work. A Python CLI that connects to an LLM, gives it tools (files, shell, web search), and runs a conversation loop. That's it. No framework, no plugin system, no abstractions — just a streaming tool-use loop in readable Python. Bootstrapped from an earlier Bun prototype, then rewritten in Python because sometimes you just want `pip install` and go.

## How it works
One conversation loop: the user types a prompt, Steward sends it to the LLM with a list of available tools, the model calls tools, Steward executes them and feeds results back. Repeat until the model is done. Tools are plain Python functions with type annotations — the JSON schema the model sees is generated automatically. Configuration is a `.env` file. The whole thing fits in your head.

## Features
### 🧠 The simplest thing that works
No framework, no plugin system, no abstractions. One file, one loop, readable Python. The whole agent fits in your head.

### 🤖 Multi-provider
Azure OpenAI, OpenAI, any OpenAI-compatible host, and a local echo provider for testing.

### 🔧 Copilot-style tools
File read/write, shell execution, web search, code running — the practical toolset for a coding agent.

### 📦 pip installable
No build step, no Node.js, no separate install beyond Python.

### 🔄 Streaming
Real-time streaming output with tool call interleaving.

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
  <text x="100" y="91" text-anchor="middle" class="label">User</text>
  <text x="100" y="109" text-anchor="middle" class="sub">CLI prompt</text>

  <rect x="250" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="330" y="91" text-anchor="middle" class="label">Steward</text>
  <text x="330" y="109" text-anchor="middle" class="sub">conversation loop</text>

  <rect x="480" y="24" width="160" height="60" rx="8" class="box-warm"/>
  <text x="560" y="50" text-anchor="middle" class="label">LLM</text>
  <text x="560" y="68" text-anchor="middle" class="sub">Azure / OpenAI</text>

  <rect x="480" y="106" width="160" height="60" rx="8" class="box"/>
  <text x="560" y="132" text-anchor="middle" class="label">Tools</text>
  <text x="560" y="150" text-anchor="middle" class="sub">files · shell · web</text>


  <text x="330" y="218" text-anchor="middle" class="sub">streaming tool-use loop — Python CLI</text>

  <path d="M180,95 L250,95" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M410,95 L435,95 Q445,95 445,85 L445,64 Q445,54 455,54 L480,54" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M410,95 L435,95 Q445,95 445,105 L445,126 Q445,136 455,136 L480,136" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
</svg>
