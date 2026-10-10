---
id: swift-ai
repo: rcarmo/swift-ai
section: ai-ml
status: maintenance
created: 2026-07-09
tagline: SwiftPM port of Pi's AI API -- typed streaming, tools and model registries; development paused at v1.0.1.
---

## About
`swift-ai` brings the `@earendil-works/pi-ai` API to Swift applications without requiring the TypeScript runtime. It provides typed streaming, tool calls, OAuth helpers and registries for chat, image and classifier models.

Development has stopped. The main branch retains the published v1.0.1 package, following `pi-ai` v1.0.1. Unfinished v1.1.0 work is preserved on the [release branch](https://github.com/rcarmo/swift-ai/tree/release/v1.1.0); pin v1.0.1 for the released package.

## How it works
`SwiftAI.bootstrap()` registers models and providers in actor-backed registries. Requests resolve a model, credentials and provider implementation, then use the asynchronous `stream` or `complete` API.

Provider clients translate wire responses into typed events using Swift value types, `Codable` and `AsyncStream`. Shared helpers handle SSE parsing, tool-argument validation, retries and prompt-cache metadata. A model's presence in the catalogue does not mean every transport is bundled.

## Features
### Typed Swift API
Common chat, image, classifier, message, tool, usage and diagnostic types, with actor-backed registries.

### Streaming providers
OpenAI Chat Completions and Responses, Azure Responses, Codex SSE, Anthropic, Gemini/Vertex, Gemini CLI, Mistral and Pi Messages implementations.

### Tools and reasoning
Streamed tool arguments, JSON Schema validation, reasoning events, prompt-cache helpers and context-overflow handling.

### Images and catalogues
OpenRouter image generation and generated chat, image and classifier registries from the pinned upstream release.

### OAuth and request hooks
Provider-specific sign-in, retry/backoff helpers, diagnostics and request/response interception.

### Frozen release
The SwiftPM package is released at v1.0.1. The paused v1.1.0 branch has unfinished, unverified changes and is not a completed upgrade.

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

## Posts
- [We Need To Start Seeing Other Agents](https://taoofmac.com/space/blog/2026/10/10/1200) — 2026-10-10
