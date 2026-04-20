---
section: ai-agents
status: active
tagline: Docker sandbox for coding agents — preinstalled runtimes, opt-in services, DinD.
logo: assets/logos-opt/agentbox.png
---

## About
Agentbox is a Debian Trixie container with Copilot CLI, Codex, and Pi preinstalled alongside git, gh, Bun, uv, and Homebrew. Docker, SSH, and RDP disabled by default, enabled via env vars. GUI image with XFCE and XRDP available. Workspace skeleton with SKILL.md templates.

## How it works
The entrypoint checks ENABLE_DOCKER, ENABLE_SSH, and ENABLE_RDP and starts only what you asked for — all three default to off. When ENABLE_DOCKER=true, dockerd starts inside the container for Docker-in-Docker. The agent user gets passwordless sudo. The workspace skeleton at /home/agent/workspace-skel copies into /workspace on first use without overwriting files.

## Features
### 🤖 Agents preinstalled
Copilot CLI, Codex, Pi ready. toad, opencode, gemini via make targets.

### 🔒 Opt-in services
Docker, SSH, RDP all off by default. Enable explicitly.

### 🖥 CLI and GUI images
:latest is headless. :gui adds XFCE, XRDP, VS Code.

### 📘 Workspace skeleton
SKILL.md templates without overwriting existing files.

### 🐳 Docker-in-Docker
Run privileged and agents get their own Docker daemon.

## Posts
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Thoughts on AI-Assisted Software Development in 2026](https://taoofmac.com/space/notes/2026/02/01/2130) — 2026-02-01
