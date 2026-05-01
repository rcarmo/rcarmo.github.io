---
section: libraries
status: active
created: 2019-08-23
logo: assets/logos-opt/go-joker.png
tagline: Performance-optimised Clojure-like Lisp interpreter — IR bytecode, WASM backend, 527× faster arithmetic.
---

## About
An optimised fork of [Joker](https://github.com/candid82/joker) (Clojure-like Lisp interpreter in Go), built for embedding in [gi](https://github.com/rcarmo/gi). Adds an IR bytecode interpreter (26 opcodes), a WASM/wazero native compilation backend, generic tail-call optimisation, transient vector support, and evaluator fast-paths for arithmetic and binding lookup.

## How it works
Hot functions are compiled to a compact 26-opcode IR and executed by a tight bytecode loop instead of the original tree-walker. Pure numeric workloads can be further compiled to WASM via wazero, running in the same process with near-native speed. A runtime trampoline handles tail calls; parse-time rewriting eliminates stack growth for self-recursive functions.

## Features
### ⚡ IR bytecode interpreter
26-opcode IR replaces the tree-walker for hot loops — up to **40× faster** on word-frequency benchmarks.

### 🦀 WASM native backend
wazero compiles pure numeric functions to WebAssembly — **527×** faster on arithmetic loops, matching Bun/JSC.

### 🔁 Tail-call optimisation
Runtime trampoline + parse-time rewriting — arbitrary recursion depth without stack growth.

### 🔄 Transient vectors
In-place mutation for loop-local data structures; persistent semantics preserved externally.

### 🔌 Embeddable in Go
Designed to be embedded in gi as the Clojure scripting engine; same process, minimal overhead.

## Gallery
- [Benchmark improvements](assets/screenshots/go-joker/benchmark-improvements.svg) — IR vs original tree-walker across workloads
- [Cross-language comparison](assets/screenshots/go-joker/benchmark-cross-language.svg) — Joker vs Goja, Bun/JSC, Python 3.13

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 202">
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
  <rect width="960" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Joker source</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Clojure-like syntax</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="360" y="56" text-anchor="middle" class="label">Reader + Parser</text>
  <text x="360" y="74" text-anchor="middle" class="sub">AST generation</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="600" y="56" text-anchor="middle" class="label">IR Compiler</text>
  <text x="600" y="74" text-anchor="middle" class="sub">tco + optimizations</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-warm"/>
  <text x="600" y="144" text-anchor="middle" class="label">WASM target</text>
  <text x="600" y="162" text-anchor="middle" class="sub">browser / wazero</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="56" text-anchor="middle" class="label">Bytecode VM</text>
  <text x="840" y="74" text-anchor="middle" class="sub">register-based dispatch</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box-teal"/>
  <text x="840" y="144" text-anchor="middle" class="label">Go interop</text>
  <text x="840" y="162" text-anchor="middle" class="sub">host function bridge</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="720" y="54" text-anchor="middle" class="sub">IR</text>
  <path d="M600,90 L600,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M840,90 L840,118" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="198" text-anchor="middle" class="sub">Clojure-like interpreter with IR bytecode compiler — 527× faster than tree-walking</text>
</svg>
