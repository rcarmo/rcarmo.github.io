---
section: ai-agents
status: active
tagline: LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.
logo: assets/logos-opt/feed-summarizer.png
---

## About
Cron-job RSS/Atom summarizer. Fetches feeds, extracts full article text with trafilatura, batches prompts to a local Ollama or cloud LLM, writes a static HTML digest. No daemon, no database. Powers feeds.carmo.io.

## How it works
trafilatura extracts the actual article body from the linked page, not the RSS description snippet. Summaries batch to the LLM — about 50 articles/hour on a Raspberry Pi 4 with a quantised model. Output is a static HTML file and JSON. Add to crontab and forget it.

## Features
### 📰 Full-text extraction
trafilatura extracts the article body, not the RSS description.

### 🤖 Local or cloud LLM
Ollama on Raspberry Pi 4, or any OpenAI-compatible API.

### ⏰ Cron-friendly
One Python script, no daemon.

## Posts
- [My Rube Goldberg RSS Pipeline](https://taoofmac.com/space/blog/2026/01/17/2130) — 2026-01-17
- [Seizing The Means Of Production (Again)](https://taoofmac.com/space/notes/2026/02/01/1940) — 2026-02-01
