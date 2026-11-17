---
section: agents
status: active
created: 2026-01-30
tagline: Mobile-first Python web UI for AI agents, with a Go port -- ACP and Pi over RPC.
logo: assets/logos-opt/vibes.png
---

## About
Vibes is a Python web app for talking to AI coding agents from a phone, with a Go port that packages the frontend and SQLite storage in a single binary. Both implementations support ACP agents and Pi via RPC.

## Motivation
I wanted something I could use on my iPhone and iPad without adopting OpenClaw. GitHub Copilot and Codex through ACP worked, but felt limiting. [Pi](https://pi.dev) exposed the extension points I needed to explore an agent-based IDE that could run from my iPad.


## How it works
The Python server forwards prompts to an installed ACP agent or Pi RPC backend and streams replies over SSE. Browser assets are packaged with the application, alongside a workspace editor and an optional POSIX terminal.

Vibes binds to localhost and has no built-in login. Anyone who can reach it can operate the agent and workspace tools. Conversations share the server account and workspace; remote use needs authentication and HTTPS in front of it.

## Features
### 📱 Browser workspace
Chat, attachments, a tabbed CodeMirror editor, Vim mode and pop-out views for phones, tablets and desktops.

### ⚡ ACP and Pi RPC
Connect to separately installed and authenticated coding agents. Vibes includes neither a model nor a provider subscription.

### 🗂 Sessions and plans
Persistent conversations, queued follow-ups, run-bound steering and a shared revision-checked plan drawer.

### 🖥 Optional terminal
POSIX terminal sessions with reconnect and pop-out support, enabled explicitly.

### 🐍 Python with a Go port
Python is on `main`; the Go port has its own build and releases on `go`.

## Posts
- [Notes for September 13-20](https://taoofmac.com/space/notes/2026/09/20/1800) — 2026-09-20
- [Building Piclaw on Top of an Opinionated Coding Agent](https://taoofmac.com/space/blog/2026/08/21/2218) — 2026-08-21
- [Notes for May 3-10](https://taoofmac.com/space/notes/2026/05/10/1433) — 2026-05-10
- [Notes for April 27 – May 3](https://taoofmac.com/space/notes/2026/05/03/2200) — 2026-05-03
- [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400) — 2026-04-19

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1058 178">
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
  <rect width="1058" height="178" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">User</text>
  <text x="120" y="74" text-anchor="middle" class="sub">phone · tablet · desktop</text>

  <rect x="262" y="22" width="294" height="140" rx="12" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
  <rect x="319" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="409" y="56" text-anchor="middle" class="label">Vibes runtime</text>
  <text x="409" y="74" text-anchor="middle" class="sub">ACP / Pi RPC adapters</text>
  <rect x="278" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="319" y="119" text-anchor="middle" class="label" style="font-size:11px">Copilot</text>
  <text x="319" y="133" text-anchor="middle" class="sub" style="font-size:9px">ACP agent</text>
  <rect x="368" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="409" y="119" text-anchor="middle" class="label" style="font-size:11px">OpenCode</text>
  <text x="409" y="133" text-anchor="middle" class="sub" style="font-size:9px">ACP agent</text>
  <rect x="458" y="98" width="82" height="48" rx="6" class="box-indigo"/>
  <text x="499" y="119" text-anchor="middle" class="label" style="font-size:11px">Pi</text>
  <text x="499" y="133" text-anchor="middle" class="sub" style="font-size:9px">RPC adapter</text>

  <rect x="608" y="30" width="180" height="60" rx="8" class="box-slate"/>
  <text x="698" y="56" text-anchor="middle" class="label">Host processes</text>
  <text x="698" y="74" text-anchor="middle" class="sub">shared account / files</text>

  <rect x="848" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="938" y="56" text-anchor="middle" class="label">Workspace</text>
  <text x="938" y="74" text-anchor="middle" class="sub">files + editor + shell</text>

  <path d="M210,60 L319,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M499,60 L608,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M788,60 L848,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="529" y="174" text-anchor="middle" class="sub">Browser coding workspace with ACP and Pi RPC adapters</text>
</svg>
