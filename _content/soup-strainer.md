---
section: libraries
status: archived
created: 2013-03-17
tagline: Readability/Decruft article extraction reimplemented with BeautifulSoup and html5lib — clean text from any page.
---

## About
soup-strainer is a Python reimplementation of the Readability "decruft" algorithm — the same technique Firefox Reader View and Pocket use to strip navigation, ads, and boilerplate from web pages and extract just the article body. Built on BeautifulSoup and html5lib for robust HTML5 parsing. Feed it a raw HTML string, get back clean readable content. ★34, predates most of the current readability-py ecosystem.

## How it works
The algorithm scores candidate block elements by analysing their text density, link density, class names, and tag types — high text density with low link density signals article content. The top-scoring candidate and its siblings are kept; everything else is stripped. html5lib parses even malformed HTML correctly, so it handles the full range of real-world pages that trip up lxml-based parsers.

## Features
### 📰 Article body extraction
Strips nav, ads, headers, and footers — returns the main readable content block as clean HTML.

### 🧹 html5lib parsing
Uses html5lib for spec-compliant HTML5 parsing — handles broken markup, missing closing tags, and encoding issues gracefully.

### 🔗 Link density scoring
Scores candidate elements by text-to-link ratio — correctly identifies navigation blocks that look like content.

### 🐍 Pure Python
No native extensions, no headless browser — runs anywhere Python and BeautifulSoup are available.

### 📦 Single module
The entire algorithm fits in one importable Python file — drop it into any scraping or content pipeline.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
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
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Raw HTML</text>
  <text x="120" y="74" text-anchor="middle" class="sub">web page / email</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">html5lib parser</text>
  <text x="360" y="74" text-anchor="middle" class="sub">spec-compliant DOM</text>

  <rect x="502" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="514" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="604" y="56" text-anchor="middle" class="label">Block scorer</text>
  <text x="604" y="74" text-anchor="middle" class="sub">text density · link ratio</text>
  <rect x="518" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="559" y="119" text-anchor="middle" class="label" style="font-size:11px">Strip</text>
  <text x="559" y="133" text-anchor="middle" class="sub" style="font-size:9px">ads · nav · junk</text>
  <rect x="608" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="649" y="119" text-anchor="middle" class="label" style="font-size:11px">Normalize</text>
  <text x="649" y="133" text-anchor="middle" class="sub" style="font-size:9px">whitespace · tags</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="56" text-anchor="middle" class="label">Clean article</text>
  <text x="848" y="74" text-anchor="middle" class="sub">sanitized HTML</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L514,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M694,60 L758,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="484" y="174" text-anchor="middle" class="sub">Readability decruft — extract article content from any web page</text>
</svg>
