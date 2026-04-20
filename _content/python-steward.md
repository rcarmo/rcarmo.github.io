---
section: ai-agents
status: experimental
created: 2025-12-20
tagline: Python CLI harness for running LLMs with a Copilot-style toolset — Azure OpenAI, local providers, tool use.
logo: assets/logos-opt/python-steward.png
---

## About
Steward is a Python CLI agent that runs LLMs with a practical toolset — file operations, shell commands, web search, and code execution. Developed primarily against Azure OpenAI but also supports OpenAI-compatible hosts and a local echo provider. Bootstrapped from an earlier Bun prototype, then rewritten in Python for broader compatibility.

## How it works
Steward connects to an LLM provider (Azure OpenAI, OpenAI, or any compatible API) and exposes a set of tools the model can call: reading/writing files, running shell commands, searching the web, and managing context. The CLI runs a conversation loop where the model can chain tool calls to accomplish tasks, with streaming output and conversation history.

Configuration is via environment variables or a `.env` file. Tools are registered as Python functions with JSON schema descriptions that the model sees as available actions.

## Features
### 🤖 Multi-provider
Azure OpenAI, OpenAI, any OpenAI-compatible host, and a local echo provider for testing.

### 🔧 Copilot-style tools
File read/write, shell execution, web search, code running — the practical toolset for a coding agent.

### 📦 pip installable
`pip install git+https://github.com/rcarmo/python-steward.git` — no build step, no Node.js required.

### 🔄 Streaming
Real-time streaming output with tool call interleaving.
