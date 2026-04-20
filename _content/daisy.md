---
section: ai-agents
status: active
tagline: AI SPEC-driven speed coding demo — a disk usage analyser built live with GitHub Copilot in Swift.
---

## About
Daisy is a macOS disk usage visualiser built as a live speed-coding demo, writing a full spec first and then letting GitHub Copilot drive the implementation. The result is a native SwiftUI app that scans a directory tree and renders a treemap of file sizes — built in one session to show what AI-assisted development looks like in practice.

## How it works
The app walks the file system asynchronously, accumulates sizes per directory, and renders an interactive treemap using SwiftUI Canvas. The AI spec was written first as structured comments describing the intended behaviour; Copilot then filled in the implementation. The repo includes the original spec alongside the finished code as a record of the process.

## Features
### 📊 Treemap visualisation
Interactive SwiftUI treemap showing relative directory sizes at a glance — click to drill down.

### ⚡ Async file scanning
Background scanning with progress updates; the UI stays responsive while large trees are traversed.

### 🤖 Spec-first AI workflow
The full Copilot session is documented — shows how writing a precise spec before prompting improves output quality.

### 🍎 Native SwiftUI
Runs on macOS with no Electron or web layer — fast, low memory, integrates with the system file picker.

### 📝 Reproducible methodology
Demonstrates a repeatable pattern: write spec → review with AI → implement → refine, applicable to any project.
