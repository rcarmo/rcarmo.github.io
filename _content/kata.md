---
section: ai-agents
status: active
tagline: Coding kata practice environment with AI-assisted feedback — repetition makes perfect.
---

## About
kata is a collection of coding exercises and a lightweight practice harness that uses an AI agent to give feedback on solutions. Write a solution to a kata, run it against the test suite, and get structured commentary on correctness, style, and alternative approaches — designed for deliberate practice rather than competitive programming.

## How it works
Each kata is a Python module with a problem description, a reference implementation, and a test suite. The harness runs the tests, captures output and timing, and feeds the result to a configured LLM along with the solution code. The agent returns feedback in a structured format covering correctness, edge-case handling, and idiomatic Python. Solutions and feedback are stored locally for review.

## Features
### 🥋 Structured kata library
Exercises organised by difficulty and domain — data structures, algorithms, string manipulation, and more.

### 🤖 AI feedback loop
Submit a solution and get LLM commentary on correctness, style, and alternative approaches — not just pass/fail.

### 🧪 Test-driven
Each kata has a comprehensive test suite; the harness shows which cases pass and which fail with clear diffs.

### 📈 Progress tracking
Local SQLite log of attempts and scores — review improvement over time and identify recurring weak spots.

### 🔌 Any LLM backend
Feedback agent works with any OpenAI-compatible endpoint — local Ollama or remote Claude/GPT.
