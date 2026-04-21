---
section: ai-ml
status: active
created: 2025-11-21
tagline: LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.
logo: assets/logos-opt/feed-summarizer.png
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

### 📄 Static output
Writes both HTML and JSON digests for publishing.

## Posts
- [My Rube Goldberg RSS Pipeline](https://taoofmac.com/space/blog/2026/01/17/2130) — 2026-01-17
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 230">
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

  <rect x="20" y="80" width="140" height="70" rx="8" class="box"/>
  <text x="90" y="109" text-anchor="middle" class="label">RSS / Atom feeds</text>
  <text x="90" y="126" text-anchor="middle" class="sub">poll links + metadata</text>

  <rect x="210" y="80" width="150" height="70" rx="8" class="box-accent"/>
  <text x="285" y="109" text-anchor="middle" class="label">trafilatura</text>
  <text x="285" y="126" text-anchor="middle" class="sub">extract full article text</text>

  <rect x="410" y="80" width="150" height="70" rx="8" class="box-warm"/>
  <text x="485" y="109" text-anchor="middle" class="label">LLM summarizer</text>
  <text x="485" y="126" text-anchor="middle" class="sub">local Ollama or API</text>

  <rect x="610" y="80" width="130" height="70" rx="8" class="box-green"/>
  <text x="675" y="109" text-anchor="middle" class="label">Digest</text>
  <text x="675" y="126" text-anchor="middle" class="sub">HTML + JSON</text>

  <rect x="410" y="20" width="150" height="40" rx="8" class="box-purple"/>
  <text x="485" y="45" text-anchor="middle" class="label">cron job</text>

  <line x1="160" y1="115" x2="208" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="360" y1="115" x2="408" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="560" y1="115" x2="608" y2="115" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="485" y1="60" x2="485" y2="78" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="380" y="195" text-anchor="middle" class="sub">batch prompts · static output · Raspberry Pi friendly</text>
</svg>
