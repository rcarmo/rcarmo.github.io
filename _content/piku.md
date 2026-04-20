---
section: infrastructure
status: stable
tagline: git push deployments to your own server — no Docker, no ops.
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
