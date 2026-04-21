---
section: macos
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
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
  <rect x="20" y="50" width="120" height="80" rx="8" class="box-accent"/>
  <text x="80" y="88" text-anchor="middle" class="label">AI spec</text>
  <text x="80" y="103" text-anchor="middle" class="sub">structured comments</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-warm"/>
  <text x="265" y="88" text-anchor="middle" class="label">Copilot</text>
  <text x="265" y="103" text-anchor="middle" class="sub">code generation</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-green"/>
  <text x="450" y="88" text-anchor="middle" class="label">SwiftUI</text>
  <text x="450" y="103" text-anchor="middle" class="sub">treemap app</text>
  <linex1="140" y1="90" x2="200" y2="90" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
  <linex1="330" y1="90" x2="390" y2="90" stroke-width="1.5" marker-end="url(#ahs)"/ stroke="#3b82f6"/>
</svg>
