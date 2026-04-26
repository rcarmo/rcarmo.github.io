---
section: libraries
status: experimental
created: 2026-04-22
tagline: Unified LLM API for Go — streaming, tool calling, model registry, and multi-provider support.
logo: assets/logos-opt/go-ai.png
---

## About
go-ai is a Go port of `@mariozechner/pi-ai`: a unified LLM library that exposes the same high-level `Stream()`/`Complete()` API across multiple providers. It supports streaming deltas, typed tool calling, cross-provider message/context types, automatic model discovery, cost tracking, and provider-specific OAuth flows.

## How it works
At the center is a registry-driven core: API providers register streaming implementations, models are registered in a global model registry, and callers invoke `Stream()` or `Complete()` with a `Context`, `Model`, and optional tool definitions. Provider packages translate the common Go types into each provider's wire protocol and emit a unified event stream (`TextDelta`, `ThinkingDelta`, `ToolCallStart`, `Done`, etc.). OAuth helpers and generated model metadata sit alongside the core so the same library can drive OpenAI, Anthropic, Google, Mistral, Bedrock, Codex, and compatible APIs without changing the calling code.

## Features
### 🔄 Unified streaming API
Same `Stream()` / `Complete()` surface across providers.

### 🧰 Tool calling
Typed tools with JSON Schema parameters and streamed tool-call deltas.

### 🌐 Multi-provider
OpenAI, Anthropic, Google, Mistral, Bedrock, Codex, Azure/OpenAI-compatible APIs.

### 🧠 Cross-language compatible context
JSON-compatible with `pi-ai` types for Go ↔ TypeScript hand-off.

### 💵 Cost tracking
Per-request token usage and USD cost breakdown.

### 🔐 OAuth support
Built-in device flow / PKCE helpers for supported providers.

## Posts
- [Notes for April 20-26](https://taoofmac.com/space/notes/2026/04/26/2144) — 2026-04-26

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 280">
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
  <rect width="860" height="280" class="bg" rx="8"/>

  <rect x="20" y="72" width="180" height="72" rx="8" class="box-accent"/>
  <text x="110" y="100" text-anchor="middle" class="label">Go app / agent</text>
  <text x="110" y="118" text-anchor="middle" class="sub">Context + tools + model</text>

  <rect x="270" y="40" width="220" height="78" rx="8" class="box-green"/>
  <text x="380" y="70" text-anchor="middle" class="label">go-ai core</text>
  <text x="380" y="88" text-anchor="middle" class="sub">Stream() / Complete()</text>
  <text x="380" y="106" text-anchor="middle" class="sub">provider registry + event stream</text>

  <rect x="270" y="156" width="220" height="72" rx="8" class="box-purple"/>
  <text x="380" y="184" text-anchor="middle" class="label">Shared types</text>
  <text x="380" y="202" text-anchor="middle" class="sub">Message · Context · ToolCall · Usage</text>

  <rect x="560" y="24" width="180" height="72" rx="8" class="box"/>
  <text x="650" y="52" text-anchor="middle" class="label">Provider adapters</text>
  <text x="650" y="70" text-anchor="middle" class="sub">OpenAI · Anthropic · Google</text>
  <text x="650" y="88" text-anchor="middle" class="sub">Mistral · Bedrock · Codex</text>

  <rect x="560" y="120" width="180" height="72" rx="8" class="box-warm"/>
  <text x="650" y="148" text-anchor="middle" class="label">Model registry</text>
  <text x="650" y="166" text-anchor="middle" class="sub">generated models + discovery</text>

  <rect x="560" y="216" width="180" height="44" rx="8" class="box-warm"/>
  <text x="650" y="242" text-anchor="middle" class="label">OAuth helpers · PKCE/device flow</text>

  <rect x="770" y="72" width="70" height="72" rx="8" class="box-green"/>
  <text x="805" y="100" text-anchor="middle" class="label">LLM</text>
  <text x="805" y="118" text-anchor="middle" class="sub">APIs</text>

  <path d="M200,108 L270,108" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>
  <path d="M380,118 L380,156" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M490,79 L525,79 Q535,79 535,69 L535,60 Q535,60 545,60 L560,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M490,79 L525,79 Q535,79 535,146 L535,156 Q535,156 545,156 L560,156" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M490,79 L525,79 Q535,79 535,228 L535,238 Q535,238 545,238 L560,238" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ah)"/>
  <path d="M740,60 L755,60 Q765,60 765,70 L765,98 Q765,108 770,108" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#ahs)"/>

  <text x="430" y="268" text-anchor="middle" class="sub">JSON-compatible with pi-ai for Go ↔ TypeScript hand-off</text>
</svg>
