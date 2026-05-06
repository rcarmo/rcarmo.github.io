---
section: libraries
status: active
created: 2019-08-23
logo: assets/logos-opt/go-joker.png
tagline: Performance-optimised Clojure-like Lisp interpreter — IR bytecode, WASM backend, 527× faster arithmetic.
---

## About
An optimized fork of [Joker](https://github.com/candid82/joker) (Clojure-like Lisp interpreter) for inclusion in [gi](gi), a self-hosted coding agent. Four execution tiers — WASM native via wazero JIT, typed IR with zero-boxing, boxed IR for collections, and tree-walker for full Clojure semantics — selected automatically per expression. Mandelbrot runs ~4200× faster than upstream; general Clojure code 10–500× faster.

## How it works
The compiler analyses each expression and emits to the fastest viable tier: pure numeric loops compile to WASM bytecode executed by wazero's JIT (~0.2ms), primitive/string/cursor loops use a typed IR stack with zero boxing (~2–8ms), collection-heavy code uses a boxed IR interpreter (~10–40ms), and everything else falls through to the tree-walker for full macro/special-form/I/O support. Generic tail-call optimization, transient vectors/maps, and a native StringCursor type round out the runtime.

## Features
### ⚡ 4-tier execution
WASM → Typed IR → Boxed IR → Tree-walker — automatic tier selection per expression.

### 🧮 WASM/wazero JIT
Pure integer/float loops compile to native code via wazero. ~0.2ms for Mandelbrot.

### 📦 Typed IR (zero-boxing)
Primitive, string, and cursor loops on an irValue stack — no interface{} boxing overhead.

### 🔄 Generic tail-call optimization
Recursive functions optimized across all tiers.

### 🗃 Transient vectors and maps
O(1) append/assoc for builder patterns — auto-promoted from persistent collections.

### 🔬 Runtime introspection
`disassemble`, `analyze`, `wasm-diagnostic`, `escape-analysis`, `profile`, `benchmark`, `mem-stats`, `gc` — all from Joker scripts.

### 🎨 Additional namespaces
`joker.imaging` (image processing), `joker.svg` (SVG generation + raster), `joker.pdf` (PDF documents).

## Gallery
- [Cross-language benchmark](https://raw.githubusercontent.com/rcarmo/go-joker/master/benchmarks/benchmark-cross-language.svg) — Joker vs Python vs Goja on CLBG benchmarks
- [Speedup vs upstream](https://raw.githubusercontent.com/rcarmo/go-joker/master/benchmarks/benchmark-improvements.svg) — improvement factors over original Joker
- [4-way comparison](https://raw.githubusercontent.com/rcarmo/go-joker/master/benchmarks/benchmark-4way-bars.svg) — bar chart across all tiers
- [4-way heatmap](https://raw.githubusercontent.com/rcarmo/go-joker/master/benchmarks/benchmark-4way-heatmap.svg) — heatmap view of tier performance
- [Architecture](https://raw.githubusercontent.com/rcarmo/go-joker/master/benchmarks/architecture.svg) — execution tier pipeline diagram

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
