---
section: networking
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1058 178">
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
  <rect width="1058" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Written spec</text>
  <text x="120" y="74" text-anchor="middle" class="sub">plain English rules</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="360" y="56" text-anchor="middle" class="label">LLM codegen</text>
  <text x="360" y="74" text-anchor="middle" class="sub">iterative refinement</text>

  <rect x="502" y="22" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="559" y="30" width="180" height="60" rx="8" class="box-warm"/>
  <text x="649" y="56" text-anchor="middle" class="label">Single HTML file</text>
  <text x="649" y="74" text-anchor="middle" class="sub">self-contained app</text>
  <rect x="518" y="98" width="82" height="48" rx="6" class="box-accent"/>
  <text x="559" y="119" text-anchor="middle" class="label" style="font-size:11px">CSS Grid</text>
  <text x="559" y="133" text-anchor="middle" class="sub" style="font-size:9px">dense layout</text>
  <rect x="608" y="98" width="82" height="48" rx="6" class="box-accent"/>
  <text x="649" y="119" text-anchor="middle" class="label" style="font-size:11px">Hash router</text>
  <text x="649" y="133" text-anchor="middle" class="sub" style="font-size:9px">#/tab routing</text>
  <rect x="698" y="98" width="82" height="48" rx="6" class="box-green"/>
  <text x="739" y="119" text-anchor="middle" class="label" style="font-size:11px">Data fetch</text>
  <text x="739" y="133" text-anchor="middle" class="sub" style="font-size:9px">live widgets</text>

  <rect x="848" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="938" y="56" text-anchor="middle" class="label">Browser</text>
  <text x="938" y="74" text-anchor="middle" class="sub">zero-deploy dashboard</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L559,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M739,60 L848,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="529" y="174" text-anchor="middle" class="sub">Single-page dashboard — LLM-generated from a written spec</text>
</svg>
