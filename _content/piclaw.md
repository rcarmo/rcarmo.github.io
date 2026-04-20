---
section: highlight
status: active
tagline: A self-hosted AI agent workspace — streaming UI, persistent state, no CDN.
logo: assets/logos-opt/piclaw.png
---

## About
PiClaw packages the Pi Coding Agent runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, draw.io, kanban boards, VNC client, and MCP access. One docker run command, no CDN, no setup wizard.

## How it works
Supervisor runs as PID 1 inside the container, managing the Bun-based Pi agent runtime, an optional Ghostty-backed web terminal, and an optional VNC display. All persistent state lives on a bind-mounted /workspace volume — the container is stateless and replaceable.

The web UI communicates with the agent over SSE for streaming and WebSocket for real-time indicators. The tool surface is layered: a small always-active baseline, with additional tools activated on demand via list_tools and activate_tools — keeping token usage low while hundreds of capabilities remain available. Skills are TypeScript modules discovered at runtime from SKILL.md files.

Sessions branch as git-like conversation trees in SQLite. The keychain stores secrets encrypted with AES-GCM. Dream memory consolidation runs nightly to synthesise notes from all sessions and keep long-running workflows coherent.

## Features
### 💬 Streaming chat
Markdown, KaTeX, Mermaid, Adaptive Cards. Branch with /btw, queue follow-ups.

### 🗂 Workspace tooling
File browser, CodeMirror 6, Office/PDF viewers, draw.io, kanban, VNC — no separate apps.

### 🔌 Any LLM
Anthropic, OpenAI, Azure, Gemini, Ollama, or any OpenAI-compatible endpoint.

### 🧠 Persistent state
SQLite-backed history, media, tasks, encrypted keychain. Dream nightly consolidation.

### 🛠 Infrastructure tools
SSH, Proxmox, Portainer profiles. CDP browser automation. Sharp image processing. MCP.

### 📦 Single container
docker run -p 8080:8080 -v ./workspace:/workspace ghcr.io/rcarmo/piclaw:latest

## Posts
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
- [Thoughts on AI-Assisted Software Development in 2026](https://taoofmac.com/space/notes/2026/02/01/2130) — 2026-02-01
- [So You Want To Do Agentic Development](https://taoofmac.com/space/blog/2026/03/08/2130) — 2026-03-08
