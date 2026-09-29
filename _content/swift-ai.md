---
id: swift-ai
repo: rcarmo/swift-ai
section: ai-ml
status: experimental
created: 2026-07-09
tagline: SwiftPM port of @earendil-works/pi-ai with typed streaming, tools and a shared multi-provider model catalogue.
---

## About
`swift-ai` brings the `@earendil-works/pi-ai` API and event model to Swift applications and services. It provides typed streaming, tool calls and a shared model registry, using [`go-ai`](go-ai) as its reference implementation.

The package tracks the `pi-ai` v0.84.0 API. Its generated catalogues include providers whose native transports are not bundled; applications can supply those separately.

## How it works
`SwiftAI.bootstrap()` initialises the actor-backed model and provider registry. A request resolves its model, credentials and provider implementation before passing through a common asynchronous `stream` or `complete` API.

HTTP providers convert SSE responses into shared typed events for text, reasoning, tool calls, usage and completion. Message transformation, partial JSON parsing and JSON Schema-based tool validation help keep provider-specific wire formats out of application code.

## Features
### Typed Swift surface
`Codable` types cover models, providers, messages, tools, usage, diagnostics, stream options and the common event protocol.

### Provider implementations
Implemented streaming paths include OpenAI Chat Completions, OpenAI Responses, Azure OpenAI Responses, Codex, Anthropic Messages, Mistral, Gemini, Gemini CLI and Baseten.

### OAuth support
OAuth support includes GitHub Copilot, OpenAI Codex, Anthropic, Gemini CLI and Antigravity.

### Streaming tools
SSE parsing, partial tool-argument JSON, JSON Schema validation, retry handling and request or response interception hooks.

### Generated catalogues
Includes release-pinned `pi-ai` v0.84.0 text and OpenRouter image catalogues.

### Lightweight core
Bedrock request building and Codex transport surfaces are present, but heavyweight vendor SDK and WebSocket transports remain pluggable rather than bundled.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 114">
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
    .sub { fill: #243b53; }
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
      .sub { fill: #90a8c0; }
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
  <rect width="1200" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Swift application</text>
  <text x="120" y="74" text-anchor="middle" class="sub">stream · complete · tools</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">SwiftAI registry</text>
  <text x="360" y="74" text-anchor="middle" class="sub">actor-backed models + providers</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Request resolver</text>
  <text x="600" y="74" text-anchor="middle" class="sub">model · credentials · options</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="840" y="56" text-anchor="middle" class="label">Provider transport</text>
  <text x="840" y="74" text-anchor="middle" class="sub">HTTP · SSE · pluggable</text>

  <rect x="990" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="1080" y="56" text-anchor="middle" class="label">Typed event stream</text>
  <text x="1080" y="74" text-anchor="middle" class="sub">text · reasoning · tools · usage</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M930,60 L990,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="600" y="110" text-anchor="middle" class="sub">Provider-neutral LLM streaming API for Swift</text>
</svg>
