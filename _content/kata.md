---
section: infrastructure
status: active
tagline: Coding kata practice environment with AI-assisted feedback — repetition makes perfect.
logo: assets/logos-opt/kata.png
---

## About
kata is a collection of coding exercises and a lightweight practice harness that uses an AI agent to give feedback on solutions. Write a solution to a kata, run it against the test suite, and get structured commentary on correctness, style, and alternative approaches — designed for deliberate practice rather than competitive programming.

## How it works
Each kata is a Python module with a problem description, a reference implementation, and a test suite. The harness runs the tests, captures output and timing, and feeds the result to a configured LLM along with the solution code. The agent returns feedback in a structured format covering correctness, edge-case handling, and idiomatic Python. Solutions and feedback are stored locally for review.

## Features
### 🥋 Structured kata library
Exercises organised by difficulty and domain — data structures, algorithms, string manipulation, and more.

### 🤖 AI feedback loop
Submit a solution and get LLM commentary on correctness, style, and alternative approaches — not just pass/fail.

### 🧪 Test-driven
Each kata has a comprehensive test suite; the harness shows which cases pass and which fail with clear diffs.

### 📈 Progress tracking
Local SQLite log of attempts and scores — review improvement over time and identify recurring weak spots.

### 🔌 Any LLM backend
Feedback agent works with any OpenAI-compatible endpoint — local Ollama or remote Claude/GPT.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #111520; }
      .box { fill: #1a1e2a; stroke: #2a3040; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-b { fill: #0d2220; stroke: #207060; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #3a5070; fill: none; }
      .arr-accent { stroke: #2b5cb0; fill: none; }
      .bg-fill { fill: #111520; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #c8d0e0; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-b { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
      .arrow { stroke: #90a8c0; fill: none; }
      .arr-accent { stroke: #3b82f6; fill: none; }
      .bg-fill { fill: #f0f4fa; }
    }
    text { font-family: -apple-system,"Segoe UI",Helvetica,sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect x="20" y="50" width="120" height="80" rx="8" class="box"/>
  <text x="80" y="88" text-anchor="middle" class="label">Kata module</text>
  <text x="80" y="103" text-anchor="middle" class="sub">problem + tests</text>
  <rect x="200" y="50" width="130" height="80" rx="8" class="box-accent"/>
  <text x="265" y="88" text-anchor="middle" class="label">Test runner</text>
  <text x="265" y="103" text-anchor="middle" class="sub">bun test / pytest</text>
  <rect x="390" y="20" width="120" height="60" rx="8" class="box-warm"/>
  <text x="450" y="53" text-anchor="middle" class="label">LLM feedback</text>
  <text x="450" y="68" text-anchor="middle" class="sub">style · edge cases</text>
  <rect x="390" y="100" width="120" height="60" rx="8" class="box-b"/>
  <text x="450" y="133" text-anchor="middle" class="label">Progress log</text>
  <text x="450" y="148" text-anchor="middle" class="sub">SQLite</text>
  <line x1="140" y1="90" x2="200" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="80" x2="390" y2="50" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="330" y1="100" x2="390" y2="130" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
