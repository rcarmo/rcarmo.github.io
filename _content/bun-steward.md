---
section: ai-agents
status: active
tagline: Self-bootstrapping AI agent environment for Raspberry Pi and Rockchip ARM boards — AI that can recreate itself.
logo: assets/logos-opt/bun-steward.png
---

## About
bun-steward is a Bun-based agent sandbox that can fully bootstrap itself from scratch on a bare ARM board — Raspberry Pi, Rockchip RK3588, or any Armbian-supported SBC. An LLM agent drives the setup, installs its own dependencies, and configures its own environment, demonstrating that modern AI toolchains are small enough to run and self-replicate on $50 hardware.

## How it works
A minimal TypeScript bootstrap script connects to a local or remote LLM endpoint and enters a tool-use loop. The agent has access to shell execution, file read/write, and package installation tools. From there it can install Bun, clone repositories, configure services, and verify its own setup — the entire process is driven by the agent's reasoning rather than a fixed install script.

## Features
### 🤖 Self-bootstrapping agent
The agent installs its own runtime, dependencies, and configuration from a near-bare system — no Ansible, no cloud-init.

### 🍓 Raspberry Pi native
Tested on Pi 4/5 and Rockchip RK3588 boards running Armbian — works on 2 GB RAM with a quantised local model.

### 🧰 Tool-use loop
Shell execution, file I/O, and package management exposed as LLM tools — the agent decides what to run next.

### 🔌 Any LLM backend
Works with any OpenAI-compatible endpoint — local Ollama, remote Claude or GPT-4, or a Copilot proxy.

### 📦 Bun-native
Zero npm overhead — uses Bun's built-in HTTP client, subprocess API, and file system for the tool implementations.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" width="640" height="200">
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
  <rect x="20" y="60" width="110" height="80" rx="8" class="box-warm"/>
  <text x="75" y="98" text-anchor="middle" class="label">ARM board</text>
  <text x="75" y="113" text-anchor="middle" class="sub">Raspberry Pi / RK</text>
  <rect x="190" y="20" width="130" height="60" rx="8" class="box-accent"/>
  <text x="255" y="53" text-anchor="middle" class="label">Bootstrap</text>
  <text x="255" y="68" text-anchor="middle" class="sub">Bun install</text>
  <rect x="190" y="110" width="130" height="60" rx="8" class="box"/>
  <text x="255" y="143" text-anchor="middle" class="label">Tool loop</text>
  <text x="255" y="158" text-anchor="middle" class="sub">shell · files · pkg</text>
  <rect x="400" y="60" width="130" height="80" rx="8" class="box-b"/>
  <text x="465" y="98" text-anchor="middle" class="label">LLM agent</text>
  <text x="465" y="113" text-anchor="middle" class="sub">reasoning loop</text>
  <line x1="130" y1="100" x2="190" y2="70" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="130" y1="115" x2="190" y2="140" class="arrow" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="320" y1="80" x2="400" y2="90" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
  <line x1="400" y1="110" x2="320" y2="140" class="arr-accent" stroke-width="1.5" marker-end="url(#arr)"/>
</svg>
