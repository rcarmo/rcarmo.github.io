---
section: terminal
status: active
created: 2026-02-13
tagline: VT100/VT520 terminal library for Go — pyte-faithful, ESCTest2, SVG export.
logo: assets/logos-opt/go-te.png
---

## About
Faithful Go port of the Python pyte library, validated against pyte's full test suite and ESCTest2 conformance tests. Multiple screen variants: base, diff (dirty tracking), history, debug. Powers webterm, go-rdp, and ghostty-web.

## How it works
Follows pyte's Stream + Screen architecture. The port reproduces pyte's exact semantics in Go — edge cases handled identically. DiffScreen tracks dirty cells for efficient WebSocket updates. SVG export snapshots any screen state for screenshots or test reports.

## Features
### 🔣 Pyte-faithful, VT100–VT520
1:1 pyte semantics. ESCTest2 conformance.

### 🖼 SVG export
Snapshot screen state as SVG.

### 📦 Pure Go
go get github.com/rcarmo/go-te. Any GOARCH.

### 🔗 Shared engine
Powers webterm, go-rdp, ghostty-web.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
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
      .bg { fill: transparent; }
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
      <path d="M0,0 L0,6 L8,3 z" fill="#5070a0"/></marker>
  </defs>
  <rect x="20" y="50" width="110" height="80" rx="8" class="box"/>
  <text x="75" y="88" text-anchor="middle" class="label">byte stream</text>
  <text x="75" y="103" text-anchor="middle" class="sub">PTY / pty data</text>
  <rect x="190" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="255" y="53" text-anchor="middle" class="label">VT parser</text>
  <text x="255" y="68" text-anchor="middle" class="sub">ESC sequences</text>
  <rect x="190" y="100" width="130" height="60" rx="8" class="box-warm"/>
  <text x="255" y="133" text-anchor="middle" class="label">Screen model</text>
  <text x="255" y="148" text-anchor="middle" class="sub">cells · attrs</text>
  <rect x="390" y="50" width="120" height="80" rx="8" class="box-b"/>
  <text x="450" y="88" text-anchor="middle" class="label">SVG / text</text>
  <text x="450" y="103" text-anchor="middle" class="sub">renderer output</text>
  <line x1="130" y1="90" x2="190" y2="70" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="255" y1="80" x2="255" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="70" x2="390" y2="80" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="130" x2="390" y2="100" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
