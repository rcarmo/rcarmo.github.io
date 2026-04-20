---
section: libraries
status: archived
created: 2013-03-17
tagline: Readability/Decruft article extraction reimplemented with BeautifulSoup and html5lib — clean text from any page.
logo: assets/logos-opt/missing-3.png
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180">
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
  <rect x="20" y="50" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="88" text-anchor="middle" class="label">Raw HTML</text>
  <text x="80" y="103" text-anchor="middle" class="sub">any webpage</text>
  <rect x="200" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="265" y="53" text-anchor="middle" class="label">html5lib</text>
  <text x="265" y="68" text-anchor="middle" class="sub">spec-compliant parse</text>
  <rect x="200" y="100" width="130" height="60" rx="8" class="box-warm"/>
  <text x="265" y="133" text-anchor="middle" class="label">Score engine</text>
  <text x="265" y="148" text-anchor="middle" class="sub">text density · links</text>
  <rect x="400" y="50" width="130" height="80" rx="8" class="box-b"/>
  <text x="465" y="88" text-anchor="middle" class="label">Article</text>
  <text x="465" y="103" text-anchor="middle" class="sub">clean HTML</text>
  <line x1="140" y1="80" x2="200" y2="60" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="140" y1="100" x2="200" y2="130" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="400" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="130" x2="400" y2="110" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
