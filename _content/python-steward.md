---
section: ai-agents
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
`pip install git+https://github.com/rcarmo/python-steward.git` — no build step, no Node.js required.

### 🔄 Streaming
Real-time streaming output with tool call interleaving.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #21262d; stroke: #30363d; }
      .box-accent { fill: #0d2340; stroke: #2b6cb0; }
      .box-green { fill: #0d2a1f; stroke: #2a7a3a; }
      .box-warm { fill: #2a1e18; stroke: #c87020; }
      .label { fill: #e8e8e8; font-size: 13px; font-weight: 600; }
      .sub { fill: #8b949e; font-size: 11px; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #d0d7de; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-green { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .label { fill: #1a2a40; font-size: 13px; font-weight: 600; }
      .sub { fill: #6b7280; font-size: 11px; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#5070a0"/></marker>
  </defs>
  <rect x="20" y="60" width="100" height="60" rx="8" class="box-accent"/>
  <text x="70" y="87" text-anchor="middle" class="label">User</text>
  <text x="70" y="103" text-anchor="middle" class="sub">CLI prompt</text>
  <rect x="170" y="60" width="120" height="60" rx="8" class="box-green"/>
  <text x="230" y="87" text-anchor="middle" class="label">Steward</text>
  <text x="230" y="103" text-anchor="middle" class="sub">conversation loop</text>
  <rect x="350" y="25" width="120" height="45" rx="8" class="box-warm"/>
  <text x="410" y="45" text-anchor="middle" class="label">LLM</text>
  <text x="410" y="60" text-anchor="middle" class="sub">Azure / OpenAI</text>
  <rect x="350" y="90" width="120" height="45" rx="8" class="box"/>
  <text x="410" y="110" text-anchor="middle" class="label">Tools</text>
  <text x="410" y="125" text-anchor="middle" class="sub">files · shell · web</text>
  <line x1="120" y1="90" x2="170" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="290" y1="75" x2="350" y2="50" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="290" y1="105" x2="350" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="260" y="160" text-anchor="middle" class="sub">streaming tool-use loop — Python CLI</text>
</svg>
