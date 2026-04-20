---
section: libraries
status: archived
tagline: Readability/Decruft article extraction reimplemented with BeautifulSoup and html5lib — clean text from any page.
logo: assets/logos-opt/soup-strainer.png
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
