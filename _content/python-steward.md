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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 202">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="728" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">User prompt</text>
  <text x="120" y="74" text-anchor="middle" class="sub">task description</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">Steward</text>
  <text x="364" y="74" text-anchor="middle" class="sub">turn loop + tool dispatch</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-teal"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Tools</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">bash · read · edit</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">Turn state</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">message history</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="608" y="56" text-anchor="middle" class="label">LLM provider</text>
  <text x="608" y="74" text-anchor="middle" class="sub">OpenAI / Anthropic</text>

  <rect x="518" y="118" width="180" height="60" rx="8" class="box-orange"/>
  <text x="608" y="144" text-anchor="middle" class="label">Workspace</text>
  <text x="608" y="162" text-anchor="middle" class="sub">files + AGENTS.md</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L472,60 Q486,60 486,74 L486,134 Q486,148 500,148 L518,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="364" y="198" text-anchor="middle" class="sub">Simplest coding agent harness — Python, tool use, one file</text>
</svg>
