---
section: retro-embedded
status: active
created: 2026-04-27
logo: assets/logos-opt/previous-jit.png
tagline: ARM64 JIT-enabled fork of the Previous NeXT emulator — transplanting a modern AArch64 JIT toolchain.
---

## About
An ARM64 JIT-focused fork of [Previous](https://previous.alternative-system.com/), the NeXT Computer emulator. Doing for Previous what `macemu-jit` did for Basilisk II and SheepShaver: bring over a newer AArch64-capable JIT toolchain, wire it into the emulator cleanly, and build a fast validation loop around it.

## How it works
The transplanted `uae_cpu_2026` JIT/compiler subtree is vendored under `src/cpu/uae_cpu_2026/`. A bridge layer initialises the compiler inside Previous's CPU loop. A suite of shell harnesses runs interpreter vs JIT opcode equivalence checks and headless boot smoke tests against a fresh-copied disk image per run. Host ASLR is disabled for deterministic JIT mappings.

## Features
### 🏗 Transplanted JIT runtime
`uae_cpu_2026` vendored; bridge and runtime scaffolding complete.

### 🔬 Opcode equivalence harness
Interpreter vs JIT comparison across risky and missing opcode families.

### 💨 Headless boot harness
Fresh disk image per run — clean, reproducible bring-up tests.

### 🖥 Full NeXT hardware emulation
Original 68030 Cube, NeXTcube/station variants, NeXTdimension board.

### 🔩 Experimental build flag
`-DENABLE_EXPERIMENTAL_UAE2026_JIT=ON` — keeps upstream usable in parallel.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 114">
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
  <rect width="480" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">Previous core</text>
  <text x="120" y="74" text-anchor="middle" class="sub">68030 / 68040</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="360" y="56" text-anchor="middle" class="label">ARM64 Host</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Orange Pi</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="240" y="110" text-anchor="middle" class="sub">macemu-jit</text>
</svg>

## Posts
- [Notes for April 27 – May 3](https://taoofmac.com/space/notes/2026/05/03/2200) — 2026-05-03
