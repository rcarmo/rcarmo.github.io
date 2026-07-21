---
id: ios-linuxkit
repo: rcarmo/ios-linuxkit
section: apple
status: active
created: 2026-04-30
logo: assets/logos-opt/ios-linuxkit.png
tagline: Linux runtime for iOS — ARM64 emulation, Alpine packages, developer runtimes, no jailbreak
---

## About
A Linux runtime for iOS developers, packaging the ARM64 iSH work into a developer-focused environment for running shells, compilers, package managers, language runtimes, and agent CLIs directly on iPhone and iPad — no jailbreak, no `MAP_JIT`, no RWX memory. Built on iSH's Asbestos threaded-code interpreter with precompiled ARM64 gadget dispatch and a 48-bit guest address space for modern runtimes like V8, Go, and JVM.

## How it works
The interpreter translates AArch64 instructions through a threaded-code dispatch mechanism — no runtime code generation, so it passes App Store review. A 48-bit virtual address space lets large runtimes (V8, Go, Rust, JVM) allocate as they expect. The Alpine Linux userland runs on top, with `apk` for package management. Stabilized syscall paths cover signals/ucontext, futex/threads, vector I/O, socket control messages, and enough filesystem semantics for real developer workflows.

## Features
### 🐧 Full Alpine Linux userland
Shell, `apk`, C/C++, Go, Rust/Cargo, Bun, Node/npm, Python, Lua, Java/OpenJDK, Clojure, Erlang, Zig.

### 📱 App Store compatible
No JIT, no `MAP_JIT`, no RWX pages — passes review with pure interpreter dispatch.

### 🧠 48-bit address space
V8, JavaScriptCore, Go, Rust, and JVM all work with full virtual memory reservations.

### 🤖 AI agent runtimes
Claude CLI, Codex, and agent harnesses can bootstrap directly on iOS.

### 🖥 Ghostty-Web terminal
Integrated terminal frontend with themes, hardened ObjC/JS bridge, and async lifecycle management.

### 🧪 Reproducible test matrix
CI validates 15+ language runtimes against every kernel change.

## Posts
- [Open Minis Is the iOS Agent I Wish Siri AI Could Be](https://taoofmac.com/space/links/2026/07/20/2213) — 2026-07-20
- [Announcing ios-linuxkit: Linux on iPad, the Hard Way](https://taoofmac.com/space/blog/2026/05/16/1130) — 2026-05-19
- [Apple Papercuts](https://taoofmac.com/space/blog/2026/05/18/1320) — 2026-05-18
- [Notes for May 10-17](https://taoofmac.com/space/notes/2026/05/17/2120) — 2026-05-17


## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 968 202">
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
  <rect width="968" height="202" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-accent"/>
  <text x="120" y="56" text-anchor="middle" class="label">iOS app</text>
  <text x="120" y="74" text-anchor="middle" class="sub">App Store compatible</text>

  <rect x="262" y="22" width="204" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="274" y="30" width="180" height="60" rx="8" class="box-purple"/>
  <text x="364" y="56" text-anchor="middle" class="label">Asbestos interpreter</text>
  <text x="364" y="74" text-anchor="middle" class="sub">threaded-code ARM64</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-purple"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Syscall layer</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">signals · futex · mmap</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">48-bit VM</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">large runtimes</text>

  <rect x="518" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="608" y="56" text-anchor="middle" class="label">Alpine Linux</text>
  <text x="608" y="74" text-anchor="middle" class="sub">apk + userland</text>

  <rect x="758" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="848" y="56" text-anchor="middle" class="label">Developer runtimes</text>
  <text x="848" y="74" text-anchor="middle" class="sub">Go · Rust · Node · Python</text>

  <rect x="758" y="118" width="180" height="60" rx="8" class="box-indigo"/>
  <text x="848" y="144" text-anchor="middle" class="label">Agent CLIs</text>
  <text x="848" y="162" text-anchor="middle" class="sub">Claude · Codex · Pi</text>

  <path d="M210,60 L274,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M454,60 L518,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M698,60 L758,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <text x="728" y="54" text-anchor="middle" class="sub">apk</text>
  <path d="M698,60 L714,60 Q728,60 728,74 L728,134 Q728,148 742,148 L758,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="484" y="198" text-anchor="middle" class="sub">iOS Linux runtime — ARM64 interpreter + Alpine userland</text>
</svg>
