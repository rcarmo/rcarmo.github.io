---
section: infrastructure
status: maintained
created: 2025-02-21
tagline: Keyboard-oriented browser homepage designed by LLM spec — bookmarks, search, and widgets, no mouse needed.
---

## About
onepage-by-spec is a static single-file browser start page built by writing a precise spec first and letting an LLM generate the implementation. The result is a keyboard-driven homepage with configurable bookmarks, a command bar for quick searches, and lightweight widgets — all in one self-contained HTML file you can drop in your browser's new-tab slot or serve from a Raspberry Pi.

## How it works
The entire page is a single HTML file with inline CSS and vanilla JavaScript — no build step, no npm, no server required. The keyboard command bar intercepts key presses and dispatches to bookmarks, search engines, or widget actions. Configuration lives in a small JSON block at the top of the file. The spec-driven origin means the code is clean and well-commented — easy to fork and customise.

## Features
### ⌨️ Keyboard-first navigation
Type a shortcut to jump to a bookmark, trigger a search, or toggle a widget — no mouse required for common actions.

### 🔍 Multi-engine search
Configure any number of search engines with short prefixes — `g query` for Google, `gh query` for GitHub, etc.

### 📌 Bookmark groups
Organise bookmarks into labelled groups displayed as a clean grid — customise via the JSON config block.

### 🗂️ Single HTML file
No dependencies, no build step — copy one file to serve it from anywhere, including a browser `file://` URL.

### 🤖 Spec-driven origin
Written to demonstrate LLM spec methodology — the original spec is included alongside the generated code.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180">
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
  <rect x="20" y="50" width="110" height="80" rx="8" class="box-warm"/>
  <text x="75" y="88" text-anchor="middle" class="label">Spec file</text>
  <text x="75" y="103" text-anchor="middle" class="sub">structured comments</text>
  <rect x="190" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="255" y="88" text-anchor="middle" class="label">LLM codegen</text>
  <text x="255" y="103" text-anchor="middle" class="sub">Copilot / GPT</text>
  <rect x="390" y="50" width="130" height="80" rx="8" class="box-green"/>
  <text x="455" y="88" text-anchor="middle" class="label">Single HTML</text>
  <text x="455" y="103" text-anchor="middle" class="sub">browser homepage</text>
  <line x1="130" y1="90" x2="190" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <line x1="320" y1="90" x2="390" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
</svg>
