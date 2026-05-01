---
repo: piku/piku
section: cloud-deployment
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 240">
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
  <rect width="680" height="240" class="bg" rx="8"/>

  <rect x="20" y="84" width="130" height="56" rx="8" class="box-accent"/>
  <text x="85" y="106" text-anchor="middle" class="label">Developer</text>
  <text x="85" y="123" text-anchor="middle" class="sub">git push</text>

  <rect x="200" y="84" width="140" height="56" rx="8" class="box-accent"/>
  <text x="270" y="106" text-anchor="middle" class="label">piku hook</text>
  <text x="270" y="123" text-anchor="middle" class="sub">post-receive</text>

  <rect x="390" y="24" width="120" height="48" rx="8" class="box-green"/>
  <text x="450" y="43" text-anchor="middle" class="label">uwsgi</text>
  <text x="450" y="58" text-anchor="middle" class="sub">process manager</text>

  <rect x="390" y="96" width="120" height="48" rx="8" class="box-green"/>
  <text x="450" y="115" text-anchor="middle" class="label">nginx</text>
  <text x="450" y="130" text-anchor="middle" class="sub">reverse proxy</text>

  <rect x="390" y="168" width="120" height="48" rx="8" class="box"/>
  <text x="450" y="187" text-anchor="middle" class="label">env + deps</text>
  <text x="450" y="202" text-anchor="middle" class="sub">virtualenv / buildpacks</text>

  <rect x="560" y="24" width="100" height="48" rx="8" class="box"/>
  <text x="610" y="43" text-anchor="middle" class="label">Workers</text>
  <text x="610" y="58" text-anchor="middle" class="sub">Procfile</text>

  <rect x="560" y="96" width="100" height="48" rx="8" class="box"/>
  <text x="610" y="115" text-anchor="middle" class="label">TLS + vhosts</text>
  <text x="610" y="130" text-anchor="middle" class="sub">Let's Encrypt</text>

  <rect x="560" y="168" width="100" height="48" rx="8" class="box"/>
  <text x="610" y="187" text-anchor="middle" class="label">Any language</text>
  <text x="610" y="202" text-anchor="middle" class="sub">Python / Node / Go</text>

  <line x1="150" y1="112" x2="196" y2="112" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="340" y1="112" x2="386" y2="48" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="340" y1="112" x2="386" y2="120" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="340" y1="112" x2="386" y2="192" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="510" y1="48" x2="556" y2="48" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>
  <line x1="510" y1="120" x2="556" y2="120" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ahs)"/>
  <line x1="510" y1="192" x2="556" y2="192" stroke="#5070a0" stroke-width="1.5" marker-end="url(#ah)"/>

  <text x="340" y="232" text-anchor="middle" class="sub">Any POSIX host — Raspberry Pi to cloud VM</text>
</svg>
