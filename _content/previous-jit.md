---
section: macos
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 160">
  <style>
    @media (prefers-color-scheme: dark) {
      .box { fill:#1a1e2a; stroke:#2a3040; stroke-width:1.5; }
      .hi  { fill:#1a0d28; stroke:#7030a0; stroke-width:1.5; }
      .hi2 { fill:#0d1e38; stroke:#2b5cb0; stroke-width:1.5; }
      .label{ fill:#d0daf0; } .sub{ fill:#5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .box { fill:#fff; stroke:#c8d0e0; stroke-width:1.5; }
      .hi  { fill:#ede9fe; stroke:#7c3aed; stroke-width:1.5; }
      .hi2 { fill:#dbeafe; stroke:#3b82f6; stroke-width:1.5; }
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

  <!-- Previous core -->
  <rect x="8"   y="30" width="130" height="100" rx="8" class="box"/>
  <text x="73"  y="62" text-anchor="middle" class="label">Previous core</text>
  <text x="73"  y="79" text-anchor="middle" class="sub">NeXT HW emulation</text>
  <text x="73"  y="95" text-anchor="middle" class="sub">M68K interpreter</text>
  <text x="73"  y="111" text-anchor="middle" class="sub">68030 / 68040</text>

  <line x1="138" y1="80" x2="174" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- JIT bridge -->
  <rect x="176" y="30" width="140" height="100" rx="8" class="hi"/>
  <text x="246" y="62" text-anchor="middle" class="label">JIT Bridge</text>
  <text x="246" y="79" text-anchor="middle" class="sub">uae2026_jit_bridge.cpp</text>
  <text x="246" y="95" text-anchor="middle" class="sub">compiler_unit.cpp</text>
  <text x="246" y="111" text-anchor="middle" class="sub">CPU loop hooks</text>

  <line x1="316" y1="80" x2="352" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- uae_cpu_2026 -->
  <rect x="354" y="30" width="150" height="100" rx="8" class="hi2"/>
  <text x="429" y="62" text-anchor="middle" class="label">uae_cpu_2026</text>
  <text x="429" y="79" text-anchor="middle" class="sub">AArch64 JIT compiler</text>
  <text x="429" y="95" text-anchor="middle" class="sub">transplanted from</text>
  <text x="429" y="111" text-anchor="middle" class="sub">macemu-jit</text>

  <line x1="504" y1="80" x2="540" y2="80" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <!-- ARM64 host -->
  <rect x="542" y="30" width="130" height="100" rx="8" class="box"/>
  <text x="607" y="62" text-anchor="middle" class="label">ARM64 Host</text>
  <text x="607" y="79" text-anchor="middle" class="sub">Apple Silicon</text>
  <text x="607" y="95" text-anchor="middle" class="sub">Raspberry Pi 5</text>
  <text x="607" y="111" text-anchor="middle" class="sub">Orange Pi</text>
</svg>
