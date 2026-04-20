---
section: ai-agents
status: active
tagline: LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.
---

## About
Cron-job RSS/Atom summarizer. Fetches feeds, extracts full article text with trafilatura, batches prompts to a local Ollama or cloud LLM, writes a static HTML digest. No daemon, no database. Powers feeds.carmo.io.

## How it works
trafilatura extracts the actual article body from the linked page, not the RSS description snippet. Summaries batch to the LLM — about 50 articles/hour on a Raspberry Pi 4 with a quantised model. Output is a static HTML file and JSON. Add to crontab and forget it.

## Features
### 📰 Full-text extraction
trafilatura extracts the article body, not the RSS description.

### 🤖 Local or cloud LLM
Ollama on Raspberry Pi 4, or any OpenAI-compatible API.

### ⏰ Cron-friendly
One Python script, no daemon.

## Posts
- [My Rube Goldberg RSS Pipeline](https://taoofmac.com/space/blog/2026/01/17/2130) — 2026-01-17
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="640" height="220">
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
  <rect x="20" y="70" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="108" text-anchor="middle" class="label">RSS feeds</text>
  <text x="80" y="123" text-anchor="middle" class="sub">full-text fetch</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">Extractor</text>
  <text x="265" y="68" text-anchor="middle" class="sub">Readability</text>
  <rect x="200" y="110" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="143" text-anchor="middle" class="label">LLM</text>
  <text x="265" y="158" text-anchor="middle" class="sub">local/remote</text>
  <rect x="400" y="70" width="130" height="80" rx="8" class="box-b"/>
  <text x="465" y="108" text-anchor="middle" class="label">Digest</text>
  <text x="465" y="123" text-anchor="middle" class="sub">feeds.carmo.io</text>
  <line x1="140" y1="110" x2="200" y2="80" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="120" x2="200" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="400" y2="90" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="150" x2="400" y2="120" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
