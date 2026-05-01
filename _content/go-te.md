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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 178">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
    .box-teal { fill: #ccfbf1; stroke: #0d9488; stroke-width: 1.5; }
    .box-slate { fill: #f1f5f9; stroke: #64748b; stroke-width: 1.5; }
    .box-indigo { fill: #e0e7ff; stroke: #4f46e5; stroke-width: 1.5; }
    .box-rose { fill: #ffe4e6; stroke: #e11d48; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #cffafe; stroke: #0891b2; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #5070a0; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .box-teal { fill: #0d2228; stroke: #1a8a7a; }
      .box-slate { fill: #1e293b; stroke: #475569; }
      .box-indigo { fill: #1e1b4b; stroke: #6366f1; }
      .box-rose { fill: #2a0a12; stroke: #f43f5e; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #082f3a; stroke: #06b6d4; }
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
  <rect width="1040" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Byte stream</text>
  <text x="120" y="74" text-anchor="middle" class="sub">PTY / SSH / pipe</text>

  <rect x="290" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="380" y="56" text-anchor="middle" class="label">Escape parser</text>
  <text x="380" y="74" text-anchor="middle" class="sub">CSI · OSC · DCS</text>

  <rect x="542" y="22" width="196" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="550" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="640" y="56" text-anchor="middle" class="label">Screen model</text>
  <text x="640" y="74" text-anchor="middle" class="sub">cells · cursor · attrs</text>
  <rect x="554" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="595" y="119" text-anchor="middle" class="label" style="font-size:11px">History</text>
  <text x="595" y="133" text-anchor="middle" class="sub" style="font-size:9px">scroll buffer</text>
  <rect x="644" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="685" y="119" text-anchor="middle" class="label" style="font-size:11px">Modes</text>
  <text x="685" y="133" text-anchor="middle" class="sub" style="font-size:9px">DEC private</text>

  <rect x="810" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="900" y="56" text-anchor="middle" class="label">Consumer</text>
  <text x="900" y="74" text-anchor="middle" class="sub">renderer / diff / snapshot</text>

  <path d="M210,60 L290,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M470,60 L550,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M730,60 L810,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="520" y="174" text-anchor="middle" class="sub">Go terminal emulator library — VT100/VT220/VT520 screen model</text>
</svg>
