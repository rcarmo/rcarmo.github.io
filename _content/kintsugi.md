---
id: kintsugi
repo: rcarmo/kintsugi
section: agents
status: experimental
created: 2026-10-09
logo: assets/logos-opt/kintsugi.png
tagline: Self-hosted coding-agent workspaces -- an experimental AgentsInTheCloud fork with Draw.io and deployment controls.
---

## About
Kintsugi is an experimental fork of [AgentsInTheCloud](https://github.com/lucasmeijer/AgentsInTheCloud) for working with coding agents on self-hosted infrastructure. Its web interface brings together agent conversations, workspace files, Git changes and tools, with embedded Draw.io editing and previews.

The project is being split into smaller packages for workspace provisioning, agent integration and UI features. The package split and interface are still evolving.

## How it works
A Bun server manages workspaces and their agent sessions, provisioning containers through Docker on a dedicated Linux host. Workspace modules supply agent types, tools and views; live updates reach the browser through cable channels and Turbo Stream HTML updates.

The application keeps settings and workspace state outside the agent containers. GitHub connections and secret values are managed separately from agent sandboxes. Workspace tools are published as a read-only mount, while file and Git operations use the workspace's own environment.

Deployment uses separate application and system images. Release sources can be configured, including private GHCR repositories; the installer supports pinned updates and rollback.

## Features
### Coding-agent workspaces
Launch workspaces with agents, files, Git changes and task views in one browser interface.

### Modular implementation
Bun and TypeScript packages separate workspace lifecycle, agent integration, shared UI and individual workspace features.

### Draw.io integration
Edit diagrams in the workspace and preview them without opening a separate application.

### Workspace tools
Agent helpers are mounted read-only into workspaces, with stale helper files removed when the tool set changes.

### Deployment controls
Configurable Docker image sources, private GHCR authentication, pinned releases and installer rollback.

### Optional management API
A separate, token-authenticated management API, disabled by default. Non-loopback listeners require TLS; management bindings stay outside agent workspaces.

### Experimental fork
Requires a dedicated Linux server with Docker. The package split and UI are still evolving; the original MIT licence and third-party attributions are preserved.

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
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
    .sub { fill: #243b53; }
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
      .sub { fill: #90a8c0; }
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
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Browser workspace</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Agents, files, Git, Draw.io</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Bun server</text>
  <text x="360" y="74" text-anchor="middle" class="sub">Modules + live updates</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Docker host</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Workspace provisioning</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Agent container</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Tools + workspace files</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">Self-hosted coding-agent workspaces</text>
</svg>

## Posts
- [We Need To Start Seeing Other Agents](https://taoofmac.com/space/blog/2026/10/10/1200) — 2026-10-10
