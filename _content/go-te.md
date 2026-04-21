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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 206">
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
  <rect width="660" height="206" class="bg" rx="8"/>

  <rect x="20" y="65" width="160" height="60" rx="8" class="box"/>
  <text x="100" y="91" text-anchor="middle" class="label">byte stream</text>
  <text x="100" y="109" text-anchor="middle" class="sub">PTY / pty data</text>

  <rect x="250" y="24" width="160" height="60" rx="8" class="box-accent"/>
  <text x="330" y="50" text-anchor="middle" class="label">VT parser</text>
  <text x="330" y="68" text-anchor="middle" class="sub">ESC sequences</text>

  <rect x="250" y="106" width="160" height="60" rx="8" class="box-warm"/>
  <text x="330" y="132" text-anchor="middle" class="label">Screen model</text>
  <text x="330" y="150" text-anchor="middle" class="sub">cells · attrs</text>

  <rect x="480" y="65" width="160" height="60" rx="8" class="box-green"/>
  <text x="560" y="91" text-anchor="middle" class="label">SVG / text</text>
  <text x="560" y="109" text-anchor="middle" class="sub">renderer output</text>

</svg>
