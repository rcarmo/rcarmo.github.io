---
section: remote-access
status: active
created: 2026-01-28
tagline: Ghostty terminal sessions in a browser -- xterm.js compatibility.
---

## About
Forked from [coder/ghostty-web](https://github.com/coder/ghostty-web). Runs Ghostty's terminal parser in the browser through WebAssembly, with a TypeScript API modelled on xterm.js.

This fork adds renderer fixes and integration work for projects such as [webterm](webterm) and ios-linuxkit.

## How it works
The browser loads Ghostty's terminal parser as a WebAssembly module. TypeScript code connects terminal input and output to the host application and renders the screen. The host supplies the session transport; ghostty-web is not a server-side Ghostty process.

In [webterm](webterm), a Go backend manages PTY sessions and [go-te](go-te) produces server-side dashboard previews. Those services sit outside the browser terminal library.

## Features
### ⚡ Ghostty in the browser
WebAssembly terminal parsing with a TypeScript frontend.

### 🔌 Familiar API
An xterm.js-compatible API for integrating terminal views into web applications.

### 🔗 Application integration
Used by [webterm](webterm) and ios-linuxkit, with rendering fixes maintained in this fork.

## Posts
- [Announcing ios-linuxkit: Linux on iPad, the Hard Way](https://taoofmac.com/space/blog/2026/05/16/1130) — 2026-05-19
- [Notes for May 3-10](https://taoofmac.com/space/notes/2026/05/10/1433) — 2026-05-11

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
    .sub { fill: #243b53; }
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
      .sub { fill: #90a8c0; }
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
  <text x="120" y="56" text-anchor="middle" class="label">Browser</text>
  <text x="120" y="74" text-anchor="middle" class="sub">xterm.js</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-teal"/>
  <text x="360" y="56" text-anchor="middle" class="label">TypeScript</text>
  <text x="360" y="74" text-anchor="middle" class="sub">WS bridge</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">Ghostty PTY</text>
  <text x="600" y="74" text-anchor="middle" class="sub">native process</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>


</svg>
