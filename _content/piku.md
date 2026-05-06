---
repo: piku/piku
section: cloud-infra
status: stable
created: 2016-03-26
tagline: git push deployments to your own server — no Docker, no ops.
logo: assets/logos-opt/piku.png
---

## About
piku is a single Python script installed as a git post-receive hook. Push your code, piku reads the Procfile, installs dependencies, starts your workers under uwsgi, and wires them up behind nginx with optional Let's Encrypt TLS. The whole runtime fits in ~1,500 lines of readable Python 3 and runs on a first-generation Raspberry Pi.

## How it works
piku runs as a git post-receive hook. When you push a commit, it detects your application type from lock files and a Procfile, installs dependencies into an isolated per-app environment, and starts your declared processes under uwsgi acting as a process supervisor.

Nginx is reconfigured automatically on each deploy. Virtual hosts, TLS via Let's Encrypt, static file serving, and cache rules are driven by an ENV file you commit alongside your code. Zero-downtime deploys replace workers before stopping the old ones. ps:scale web=3 and config:set KEY=val take effect without touching code.

The implementation stays around 1,500 lines of Python with no external dependencies. That deliberate simplicity is a design goal — piku covers 80% of deployment use cases without becoming a platform.

## Features
### ⌥ Heroku-style workflow
git remote add piku piku@server:app. git push piku main. The full deploy flow.

### 🌐 Any language
Python, Node, Go, Clojure, Ruby, Java, PHP, static. Detected from lock files and Procfiles.

### 🔒 Automatic TLS
Let's Encrypt ACME, virtual host routing, zero-downtime worker replacement.

### ⬆ Live scaling
ps:scale web=3 and config:set KEY=val — no redeploy needed.

### 🐧 Any POSIX host
Debian, Ubuntu, Alpine, FreeBSD, WSL. ARM and Intel. Stable since 2016.

## Posts
- [Some Breakage May Ensue](https://taoofmac.com/space/blog/2016/04/25/1400) — 2016-04-25
- [Third Python's The Charm](https://taoofmac.com/space/blog/2016/12/04/1351) — 2016-12-04
- [The Third Python](https://taoofmac.com/space/blog/2018/07/08/1330) — 2018-07-08
- [Deployment Pains](https://taoofmac.com/space/blog/2019/10/13/1630) — 2019-10-13
- [Getting Takahē to run on Piku](https://taoofmac.com/space/blog/2022/12/21/0900) — 2022-12-21

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

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Developer</text>
  <text x="120" y="74" text-anchor="middle" class="sub">git push</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box-teal"/>
  <text x="360" y="56" text-anchor="middle" class="label">piku hook</text>
  <text x="360" y="74" text-anchor="middle" class="sub">post-receive</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">uwsgi</text>
  <text x="600" y="74" text-anchor="middle" class="sub">process manager</text>

  <rect x="510" y="118" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="144" text-anchor="middle" class="label">nginx</text>
  <text x="600" y="162" text-anchor="middle" class="sub">reverse proxy</text>

  <rect x="510" y="206" width="180" height="60" rx="8" class="box-accent"/>
  <text x="600" y="232" text-anchor="middle" class="label">env + deps</text>
  <text x="600" y="250" text-anchor="middle" class="sub">virtualenv / buildpacks</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Workers</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Procfile</text>

  <rect x="750" y="118" width="180" height="60" rx="8" class="box"/>
  <text x="840" y="144" text-anchor="middle" class="label">TLS + vhosts</text>
  <text x="840" y="162" text-anchor="middle" class="sub">Let's Encrypt</text>

  <rect x="750" y="206" width="180" height="60" rx="8" class="box-green"/>
  <text x="840" y="232" text-anchor="middle" class="label">Any language</text>
  <text x="840" y="250" text-anchor="middle" class="sub">Python / Node / Go</text>

  <path d="M210,60 L270,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,134 Q480,148 494,148 L510,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M450,60 L466,60 Q480,60 480,74 L480,222 Q480,236 494,236 L510,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,148 L750,148" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,236 L750,236" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>

  <text x="480" y="286" text-anchor="middle" class="sub">Any POSIX host — Raspberry Pi to cloud VM</text>
</svg>
