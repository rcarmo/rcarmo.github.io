---
section: networking
status: stable
created: 2025-11-21
tagline: LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.
logo: assets/logos-opt/feed-summarizer.png
---

## About
Cron-job RSS/Atom summarizer. Fetches feeds, extracts full article text with readability-lxml, batches prompts to Azure OpenAI, and writes static HTML and JSON digests. No daemon, no database. Powers feeds.carmo.io.

## How it works
The fetcher pulls feed entries, fetches linked pages when needed, and uses readability-lxml to extract the article body. Summaries are generated via Azure OpenAI, then published as static HTML and JSON output. Add it to crontab and forget it.

## Features
### 📰 Full-text extraction
readability-lxml extracts the article body, not just the RSS description.

### 🤖 Azure OpenAI summarization
Uses the OpenAI Python client against Azure OpenAI for async summarization.

### ⏰ Cron-friendly
One Python script, no daemon.

### 📄 Static output
Writes both HTML and JSON digests for publishing.

## Posts
- [My Rube Goldberg RSS Pipeline](https://taoofmac.com/space/blog/2026/01/17/2130) — 2026-01-17
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
    .sub { fill: #5070a0; }
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">RSS / Atom / Mastodon</text>
  <text x="120" y="74" text-anchor="middle" class="sub">OPML + config</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="360" y="56" text-anchor="middle" class="label">Fetcher</text>
  <text x="360" y="74" text-anchor="middle" class="sub">asyncio workers</text>

  <rect x="270" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="144" text-anchor="middle" class="label">SQLite</text>
  <text x="360" y="162" text-anchor="middle" class="sub">articles + state</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Summarizer</text>
  <text x="600" y="74" text-anchor="middle" class="sub">LLM-powered</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="600" y="144" text-anchor="middle" class="label">LLM provider</text>
  <text x="600" y="162" text-anchor="middle" class="sub">OpenAI / Anthropic / local</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Publisher</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Atom feed output</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="840" y="144" text-anchor="middle" class="label">Azure Blob</text>
  <text x="840" y="162" text-anchor="middle" class="sub">optional upload</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M360,90 L360,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M600,90 L600,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">asyncio pipeline — fetch → summarize → publish → upload</text>
</svg>
