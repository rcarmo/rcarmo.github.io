---
section: cloud
status: active
created: 2025-12-19
tagline: Tiny micro-PaaS wrapper around Docker Compose or Swarm with implicit Traefik routing and git-push deploy hooks.
logo: assets/logos-opt/kata.png
---

## About
kata is a lightweight deployment wrapper for Docker that sits somewhere between a hand-written `docker-compose.yml` and a full platform. It reads a `kata-compose.yaml`, generates the final `.docker-compose.yaml`, and deploys the app either via Docker Compose or Docker Swarm. The current implementation focuses on simple per-app layouts, predictable directory structure, and optional HTTP routing through Traefik.

## How it works
For each app, kata parses a `kata-compose.yaml`, expands runtime helpers, merges environment variables from config files and service definitions, and writes a generated `.docker-compose.yaml` into the app directory. It can then launch the stack using Compose or Swarm, attach the routed service to a shared Traefik network, and inject the labels needed for host-based routing. It also manages the standard per-app directories for code, data, config, logs, virtualenv/runtime state, and git bare repositories.

## Features
### 🐳 Compose or Swarm deploys
Auto-selects Docker Compose or Docker Swarm per application, with an override when you need one mode explicitly.

### 🌐 Optional Traefik routing
Generate Traefik labels from a compact `traefik:` block and route apps through a shared reverse proxy on the `traefik-proxy` network.

### 🧱 Runtime image helpers
Builds lightweight runtime images on demand for Python, Node.js, PHP, Bun, and static assets instead of making every app hand-roll the same boilerplate.

### 🗂 Standard app layout
Creates and uses predictable paths for code, data, config, logs, env/runtime state, and git repositories under `KATA_ROOT`.

### 🔐 Secrets and deploy helpers
Includes helper commands for Swarm secrets, Traefik inspection, mode switching, and simple git push deployment hooks.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #2a3040; stroke-width: 1.5; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; stroke-width: 1.5; }
      .box-green { fill: #0d2220; stroke: #207060; stroke-width: 1.5; }
      .box-warm { fill: #221a10; stroke: #a06020; stroke-width: 1.5; }
      .box-purple { fill: #1a0d28; stroke: #7030a0; stroke-width: 1.5; }
      .label { fill: #d0daf0; }
      .sub { fill: #5070a0; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: transparent; }
      .box { fill: #ffffff; stroke: #c8d0e0; stroke-width: 1.5; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
      .box-green { fill: #d1fae5; stroke: #059669; stroke-width: 1.5; }
      .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
      .box-purple { fill: #ede9fe; stroke: #7c3aed; stroke-width: 1.5; }
      .label { fill: #1a2a40; }
      .sub { fill: #5070a0; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
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
  <rect x="390" y="100" width="120" height="60" rx="8" class="box-green"/>
  <text x="450" y="133" text-anchor="middle" class="label">Progress log</text>
  <text x="450" y="148" text-anchor="middle" class="sub">SQLite</text>
  <line x1="140" y1="90" x2="200" y2="90" stroke-width="1.5" marker-end="url(#ahs)" stroke="#3b82f6"/>
  <line x1="330" y1="80" x2="390" y2="50" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
  <line x1="330" y1="100" x2="390" y2="130" stroke-width="1.5" marker-end="url(#ah)" stroke="#5070a0"/>
</svg>
