---
repo: piku/piku
section: cloud
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
- [A Random Asynchronous Walk](https://taoofmac.com/space/blog/2017/04/02/2150) — 2017-04-02
- [My Quest for Home Automation, Part 2](https://taoofmac.com/space/blog/2018/03/25/2244) — 2018-03-25
- [The Third Python](https://taoofmac.com/space/blog/2018/07/08/1330) — 2018-07-08
- [My Quest for Home Automation, Part 3](https://taoofmac.com/space/blog/2018/09/23/1840) — 2018-09-23
- [Dealing With a Million Legacy Files Every Day](https://taoofmac.com/space/blog/2019/08/11/2230) — 2019-08-11
- [Deployment Pains](https://taoofmac.com/space/blog/2019/10/13/1630) — 2019-10-13

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" width="640" height="240">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #1a1e24; }
      .box { fill: #21262d; stroke: #30363d; }
      .box-accent { fill: #0d2340; stroke: #2b6cb0; }
      .box-green { fill: #0d2a1f; stroke: #2a7a3a; }
      .box-warm { fill: #2a1e18; stroke: #c87020; }
      .label { fill: #e8d8d0; }
      .sublabel { fill: #705848; }
      .arrow { stroke: #705848; }
      .arrow-accent { stroke: #2b6cb0; }
      .line { stroke: #30363d; }
    }
    @media (prefers-color-scheme: light) {
      .bg { fill: #f0f4fa; }
      .box { fill: #ffffff; stroke: #d0d7de; }
      .box-accent { fill: #dbeafe; stroke: #3b82f6; }
      .box-green { fill: #d1fae5; stroke: #059669; }
      .box-warm { fill: #fef3c7; stroke: #d97706; }
      .label { fill: #1a2a40; }
      .sublabel { fill: #4a6480; }
      .arrow { stroke: #90a8c0; }
      .arrow-accent { stroke: #3b82f6; }
      .line { stroke: #d0d7de; }
    }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sublabel { font-size: 11px; }
    .arrow { stroke-width: 1.5; fill: none; marker-end: url(#arr); }
    .arrow-accent { stroke-width: 1.5; fill: none; marker-end: url(#arr-accent); }
    .line { stroke-width: 1; fill: none; }
  </style>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow" style="fill:currentColor;stroke:none"/>
    </marker>
    <marker id="arr-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" class="arrow-accent" style="fill:currentColor;stroke:none"/>
    </marker>
  </defs>
  <rect width="640" height="240" class="bg" rx="8"/>
  
  <rect x="20" y="80" width="120" height="52" rx="6" class="box-accent" stroke-width="1.5"/>
    <text x="80" y="102" text-anchor="middle" class="label">Developer</text>
    <text x="80" y="115" text-anchor="middle" class="sublabel">git push</text>
  <line x1="140" y1="106" x2="190" y2="106" class="arrow"/>
  <rect x="190" y="80" width="120" height="52" rx="6" class="box-accent" stroke-width="1.5"/>
    <text x="250" y="102" text-anchor="middle" class="label">piku hook</text>
    <text x="250" y="115" text-anchor="middle" class="sublabel">post-receive</text>
  <line x1="310" y1="106" x2="350" y2="106" class="arrow"/>
  <rect x="350" y="30" width="110" height="44" rx="6" class="box-green" stroke-width="1.5"/>
    <text x="405" y="48" text-anchor="middle" class="label">uwsgi</text>
    <text x="405" y="61" text-anchor="middle" class="sublabel">process mgr</text>
  <rect x="350" y="86" width="110" height="44" rx="6" class="box-green" stroke-width="1.5"/>
    <text x="405" y="104" text-anchor="middle" class="label">nginx</text>
    <text x="405" y="117" text-anchor="middle" class="sublabel">reverse proxy</text>
  <rect x="350" y="142" width="110" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="405" y="160" text-anchor="middle" class="label">virtualenv</text>
    <text x="405" y="173" text-anchor="middle" class="sublabel">per-app deps</text>
  <line x1="460" y1="52" x2="510" y2="52" class="arrow"/>
  <line x1="460" y1="108" x2="510" y2="108" class="arrow"/>
  <line x1="460" y1="164" x2="510" y2="164" class="arrow"/>
  <rect x="510" y="30" width="110" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="565" y="48" text-anchor="middle" class="label">App workers</text>
    <text x="565" y="61" text-anchor="middle" class="sublabel">Procfile</text>
  <rect x="510" y="86" width="110" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="565" y="104" text-anchor="middle" class="label">TLS / vhosts</text>
    <text x="565" y="117" text-anchor="middle" class="sublabel">Let's Encrypt</text>
  <rect x="510" y="142" width="110" height="44" rx="6" class="box" stroke-width="1.5"/>
    <text x="565" y="160" text-anchor="middle" class="label">Python / Node / Go…</text>
    <text x="565" y="173" text-anchor="middle" class="sublabel">any language</text>
  <text x="320" y="220" text-anchor="middle" class="sublabel">Any POSIX host — Raspberry Pi to cloud VM</text>

</svg>
