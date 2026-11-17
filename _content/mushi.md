---
id: mushi
repo: rcarmo/mushi
section: agents
status: experimental
created: 2026-10-18
logo: assets/logos-opt/mushi.svg
tagline: Android coding agent with a local WebView, pi-durable and an embedded ARM64 Bun runtime.
---

## About
Mushi runs a coding agent directly on Android, with a local WebView interface and a signed Termux ARM64 Bun runtime. It uses Pi's durable agent runtime for SQLite conversations, coding tools and recovery after interrupted work.

The app includes shell and file access, web tools and QuickJS code mode. It is an experimental development build for ARM64 Android devices, not a Play Store-ready application.

## How it works
A foreground Android service hosts the runtime. The WebView communicates through a native bridge and an app-private Unix socket, with no public agent TCP listener. Conversations and tool state are stored in the app's private data.

The agent runs with the app's permissions and can access its own plaintext provider credentials. Android force-stop, Doze and vendor restrictions can interrupt background work; recovery cannot guarantee exactly-once external actions.

## Features
### Local coding tools
Read and edit files, run shell commands, fetch pages and search the web from the device.

### Durable conversations
SQLite-backed history and interrupted-task recovery through pi-durable.

### Provider login
OpenAI and Anthropic API keys, ChatGPT/Codex login and GitHub Copilot device login.

### Mobile rendering
Markdown, highlighted code, tool cards and Japanese ruby/furigana annotations in the WebView.

### ARM64 runtime
Uses signed Termux runtime packages without QEMU or PRoot. Targets arm64-v8a devices on Android 9 (API 28) or later.

### Data and update limits
Uninstalling erases app data; updates need the matching signing certificate. The extracted native prefix is not automatically upgraded.

## Gallery
- [Mushi on Android](assets/screenshots/mushi/screenshot.webp) -- Code-mode web search with Japanese reading annotations

## Diagram
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 114">
  <style>
    /* Default: light mode (for rsvg-convert and non-media-query agents) */
    .bg { fill: transparent; }
    .box { fill: #ffffff; stroke: #707070; stroke-width: 1.5; }
    .box-accent { fill: #dbeafe; stroke: #3b82f6; stroke-width: 1.5; }
    .box-green { fill: #74a7ff; stroke: #012f7b; stroke-width: 1.5; }
    .box-warm { fill: #fef3c7; stroke: #d97706; stroke-width: 1.5; }
    .box-purple { fill: #adadad; stroke: #000000; stroke-width: 1.5; }
    .box-teal { fill: #ebebeb; stroke: #474747; stroke-width: 1.5; }
    .box-slate { fill: #a7c6ff; stroke: #0042a9; stroke-width: 1.5; }
    .box-indigo { fill: #dfeed4; stroke: #4e7a27; stroke-width: 1.5; }
    .box-rose { fill: #dfeed4; stroke: #76bb40; stroke-width: 1.5; }
    .box-orange { fill: #ffedd5; stroke: #ea580c; stroke-width: 1.5; }
    .box-cyan { fill: #d9c9fe; stroke: #5e30eb; stroke-width: 1.5; }
    .label { fill: #1a2a40; }
    .sub { fill: #243b53; }
    text { font-family: -apple-system, "Segoe UI", Helvetica, sans-serif; }
    .label { font-size: 13px; font-weight: 600; }
    .sub { font-size: 11px; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: transparent; }
      .box { fill: #1a1e2a; stroke: #505050; }
      .box-accent { fill: #0d1e38; stroke: #2b5cb0; }
      .box-green { fill: #0a1a3a; stroke: #4a80d0; }
      .box-warm { fill: #221a10; stroke: #a06020; }
      .box-purple { fill: #222222; stroke: #666666; }
      .box-teal { fill: #1e1e1e; stroke: #666666; }
      .box-slate { fill: #0d1a38; stroke: #4a7ad0; }
      .box-indigo { fill: #1a2810; stroke: #5a8a30; }
      .box-rose { fill: #1a2810; stroke: #5aaa30; }
      .box-orange { fill: #2a1a08; stroke: #f97316; }
      .box-cyan { fill: #1a1030; stroke: #7040d0; }
      .label { fill: #d0daf0; }
      .sub { fill: #90a8c0; }
    }
  </style>
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#5070a0" stroke="none"/>
    </marker>
    <marker id="ahs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8z" fill="#3b82f6" stroke="none"/>
    </marker>
  </defs>
  <rect width="960" height="114" class="bg" rx="8"/>

  <rect x="30" y="30" width="180" height="60" rx="8" class="box-rose"/>
  <text x="120" y="56" text-anchor="middle" class="label">Android WebView</text>
  <text x="120" y="74" text-anchor="middle" class="sub">Chat + settings</text>

  <rect x="270" y="30" width="180" height="60" rx="8" class="box"/>
  <text x="360" y="56" text-anchor="middle" class="label">Native bridge</text>
  <text x="360" y="74" text-anchor="middle" class="sub">App-private Unix socket</text>

  <rect x="510" y="30" width="180" height="60" rx="8" class="box-green"/>
  <text x="600" y="56" text-anchor="middle" class="label">Bun + pi-durable</text>
  <text x="600" y="74" text-anchor="middle" class="sub">Foreground service</text>

  <rect x="750" y="30" width="180" height="60" rx="8" class="box-orange"/>
  <text x="840" y="56" text-anchor="middle" class="label">Tools and state</text>
  <text x="840" y="74" text-anchor="middle" class="sub">Shell, files, SQLite</text>

  <path d="M210,60 L270,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>
  <path d="M450,60 L510,60" fill="none" stroke="#5070a0" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ah)"/>
  <path d="M690,60 L750,60" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" marker-end="url(#ahs)"/>

  <text x="480" y="110" text-anchor="middle" class="sub">On-device Android agent with a private runtime connection</text>
</svg>