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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 178">
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
  <rect width="968" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Byte stream</text>
  <text x="120" y="74" text-anchor="middle" class="sub">PTY / SSH / pipe</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Escape parser</text>
  <text x="360" y="74" text-anchor="middle" class="sub">CSI · OSC · DCS</text>

  <rect x="502" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="514" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="604" y="56" text-anchor="middle" class="label">Screen model</text>
  <text x="604" y="74" text-anchor="middle" class="sub">cells · cursor · attrs</text>
  <rect x="518" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="559" y="119" text-anchor="middle" class="label" style="font-size:11px">History</text>
  <text x="559" y="133" text-anchor="middle" class="sub" style="font-size:9px">scroll buffer</text>
  <rect x="608" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="649" y="119" text-anchor="middle" class="label" style="font-size:11px">Modes</text>
  <text x="649" y="133" text-anchor="middle" class="sub" style="font-size:9px">DEC private</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="56" text-anchor="middle" class="label">Consumer</text>
  <text x="848" y="74" text-anchor="middle" class="sub">renderer / diff / snapshot</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L514,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M694,60 L758,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="484" y="174" text-anchor="middle" class="sub">Go terminal emulator library — VT100/VT220/VT520 screen model</text>
</svg>
