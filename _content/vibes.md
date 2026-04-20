---
section: ai-agents
status: active
tagline: Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step.
logo: assets/logos-opt/vibes.png
---

## About
Vibes is a lightweight Python web app for talking to AI coding agents from a phone. Supports ACP (GitHub Copilot CLI, OpenAI Codex) and Pi agents via RPC. Single Python file server, single HTML UI, no build step.

## How it works
The server uses aiohttp with server-sent events for streaming. When a message arrives from the browser, it forwards to the configured agent backend and streams tokens back via SSE. The UI is a single HTML file — no bundler, no npm. Fork it and make it yours in an afternoon. PiClaw and Vibes share the same web UI codebase.

## Features
### 📱 Phone-first
Designed and tested on iOS/Android before desktop.

### ⚡ ACP + Pi RPC
copilot --acp, OpenAI Codex, Pi agents. Protocol adapters are pluggable.

### 🚿 SSE streaming
Live token streaming. No polling, no spinners.

### 🔩 Zero build step
One Python file. One HTML file. Clone and run.

## Posts
- [Vibing with the Agent Control Protocol](https://taoofmac.com/space/notes/2026/02/01/2100) — 2026-02-01
- [Notes for February 2-7](https://taoofmac.com/space/notes/2026/02/07/2000) — 2026-02-07
