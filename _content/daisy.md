---
section: apple
status: stable
created: 2026-02-02
tagline: AI SPEC-driven speed coding demo — a disk usage analyser built live with GitHub Copilot in Swift.
logo: assets/logos-opt/daisy.png
---

## About
Daisy is a macOS disk usage visualiser built as a live speed-coding demo, writing a full spec first and then letting GitHub Copilot drive the implementation. The result is a native SwiftUI app that scans a directory tree and renders a treemap of file sizes — built in one session to show what AI-assisted development looks like in practice.

## How it works
The app walks the file system asynchronously, accumulates sizes per directory, and renders an interactive treemap using SwiftUI Canvas. The AI spec was written first as structured comments describing the intended behaviour; Copilot then filled in the implementation. The repo includes the original spec alongside the finished code as a record of the process.

## Features
### 📊 Treemap visualisation
Interactive SwiftUI treemap showing relative directory sizes at a glance — click to drill down.

### ⚡ Async file scanning
Background scanning with progress updates; the UI stays responsive while large trees are traversed.

### 🤖 Spec-first AI workflow
The full Copilot session is documented — shows how writing a precise spec before prompting improves output quality.

### 🍎 Native SwiftUI
Runs on macOS with no Electron or web layer — fast, low memory, integrates with the system file picker.

### 📝 Reproducible methodology
Demonstrates a repeatable pattern: write spec → review with AI → implement → refine, applicable to any project.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 100">
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
  <rect width="720" height="100" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">AI spec</text>
  <text x="120" y="74" text-anchor="middle" class="sub">structured comments</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="360" y="56" text-anchor="middle" class="label">Copilot</text>
  <text x="360" y="74" text-anchor="middle" class="sub">code generation</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="56" text-anchor="middle" class="label">SwiftUI</text>
  <text x="600" y="74" text-anchor="middle" class="sub">treemap app</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>

## Posts
- [App Notes: Web App Viewer](https://taoofmac.com/space/notes/2026/04/29/1730) — 2026-04-29
