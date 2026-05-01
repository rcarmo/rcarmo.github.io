---
section: cloud-infra
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

## Posts
- [Go (lang)](https://taoofmac.com/space/dev/golang) — 2026-04-25

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 290">
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
  <rect width="960" height="290" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="120" y="56" text-anchor="middle" class="label">kata-compose.yaml</text>
  <text x="120" y="74" text-anchor="middle" class="sub">app definition</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">kata wrapper</text>
  <text x="360" y="74" text-anchor="middle" class="sub">expand helpers + merge config</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Runtime helpers</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Python · Node · PHP · Bun</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-slate"/>
  <text x="600" y="144" text-anchor="middle" class="label">Generated compose</text>
  <text x="600" y="162" text-anchor="middle" class="sub">.docker-compose.yaml</text>

  <rect x="510" y="206" width="180" height="60" rx="8" class="box"/>
  <text x="600" y="232" text-anchor="middle" class="label">App layout</text>
  <text x="600" y="250" text-anchor="middle" class="sub">code · data · config · logs</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="840" y="56" text-anchor="middle" class="label">Deploy</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Compose / Swarm</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,222 Q480,236 494,236 L510,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L706,148 Q720,148 720,134 L720,74 Q720,60 734,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="286" text-anchor="middle" class="sub">optional Traefik routing and deploy hooks sit on top of a predictable per-app Docker layout</text>
</svg>
