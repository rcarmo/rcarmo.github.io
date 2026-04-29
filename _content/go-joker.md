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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 160">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .hi2 { fill:#0d2220; stroke:#207060; stroke-width:1.5; }
      .hi3 { fill:#1a0d28; stroke:#7030a0; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
      .hi2 { fill:#d1fae5; stroke:#059669; stroke-width:1.5; }
      .hi3 { fill:#ede9fe; stroke:#7c3aed; stroke-width:1.5; }
      .label{ fill:#1a2a40; } .sub{ fill:#5070a0; }
    }
    text { font-family:-apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label{ font-size:13px; font-weight:600; }
    .sub  { font-size:11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
  </defs>

  <!-- Input -->
  <rect x="8"   y="40" width="90" height="80" rx="8" class="box"/>
  <text x="53"  y="74" text-anchor="middle" class="label">Clojure</text>
  <text x="53"  y="91" text-anchor="middle" class="sub">source code</text>

  <line x1="98" y1="80" x2="130" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- Parser -->
  <rect x="132" y="40" width="100" height="80" rx="8" class="hi"/>
  <text x="182" y="68" text-anchor="middle" class="label">Parser</text>
  <text x="182" y="85" text-anchor="middle" class="sub">TCO rewriting</text>
  <text x="182" y="101" text-anchor="middle" class="sub">macro expand</text>

  <!-- Arrow down to IR -->
  <line x1="232" y1="80" x2="264" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- IR compiler -->
  <rect x="266" y="25" width="120" height="110" rx="8" class="hi2"/>
  <text x="326" y="52" text-anchor="middle" class="label">IR Compiler</text>
  <text x="326" y="70" text-anchor="middle" class="sub">26-opcode bytecode</text>
  <text x="326" y="86" text-anchor="middle" class="sub">fast-path eval</text>
  <text x="326" y="102" text-anchor="middle" class="sub">trampoline TCO</text>
  <text x="326" y="118" text-anchor="middle" class="sub">transient vectors</text>

  <!-- Arrow to WASM -->
  <line x1="386" y1="60" x2="418" y2="45" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <!-- Arrow to tree-walker -->
  <line x1="386" y1="100" x2="418" y2="110" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- WASM -->
  <rect x="420" y="15" width="130" height="55" rx="8" class="hi3"/>
  <text x="485" y="40" text-anchor="middle" class="label">WASM / wazero</text>
  <text x="485" y="57" text-anchor="middle" class="sub">527× on arithmetic</text>

  <!-- Fallback -->
  <rect x="420" y="90" width="130" height="55" rx="8" class="box"/>
  <text x="485" y="115" text-anchor="middle" class="label">Tree-walker</text>
  <text x="485" y="132" text-anchor="middle" class="sub">Joker fallback path</text>

  <!-- Arrow out -->
  <line x1="550" y1="42" x2="580" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="550" y1="117" x2="580" y2="85" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <rect x="582" y="55" width="110" height="50" rx="8" class="box"/>
  <text x="637" y="78" text-anchor="middle" class="label">Result</text>
  <text x="637" y="95" text-anchor="middle" class="sub">gi / embedding</text>
</svg>
