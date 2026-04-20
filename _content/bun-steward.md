---
section: ai-agents
status: active
tagline: Self-bootstrapping AI agent environment for Raspberry Pi and Rockchip ARM boards — AI that can recreate itself.
logo: assets/logos-opt/bun-steward.png
---

## About
bun-steward is a Bun-based agent sandbox that can fully bootstrap itself from scratch on a bare ARM board — Raspberry Pi, Rockchip RK3588, or any Armbian-supported SBC. An LLM agent drives the setup, installs its own dependencies, and configures its own environment, demonstrating that modern AI toolchains are small enough to run and self-replicate on $50 hardware.

## How it works
A minimal TypeScript bootstrap script connects to a local or remote LLM endpoint and enters a tool-use loop. The agent has access to shell execution, file read/write, and package installation tools. From there it can install Bun, clone repositories, configure services, and verify its own setup — the entire process is driven by the agent's reasoning rather than a fixed install script.

## Features
### 🤖 Self-bootstrapping agent
The agent installs its own runtime, dependencies, and configuration from a near-bare system — no Ansible, no cloud-init.

### 🍓 Raspberry Pi native
Tested on Pi 4/5 and Rockchip RK3588 boards running Armbian — works on 2 GB RAM with a quantised local model.

### 🧰 Tool-use loop
Shell execution, file I/O, and package management exposed as LLM tools — the agent decides what to run next.

### 🔌 Any LLM backend
Works with any OpenAI-compatible endpoint — local Ollama, remote Claude or GPT-4, or a Copilot proxy.

### 📦 Bun-native
Zero npm overhead — uses Bun's built-in HTTP client, subprocess API, and file system for the tool implementations.
