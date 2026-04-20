---
section: ai-agents
status: active
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180" width="600" height="180">
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
  <rect x="20" y="50" width="120" height="80" rx="8" class="box-accent"/>
  <text x="80" y="88" text-anchor="middle" class="label">AI spec</text>
  <text x="80" y="103" text-anchor="middle" class="sub">structured comments</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-warm"/>
  <text x="265" y="88" text-anchor="middle" class="label">Copilot</text>
  <text x="265" y="103" text-anchor="middle" class="sub">code generation</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-b"/>
  <text x="450" y="88" text-anchor="middle" class="label">SwiftUI</text>
  <text x="450" y="103" text-anchor="middle" class="sub">treemap app</text>
  <line x1="140" y1="90" x2="200" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="90" x2="390" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
