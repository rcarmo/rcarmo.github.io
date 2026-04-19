#!/usr/bin/env bun
/**
 * Build rich single-page project presentations.
 * Reads dossiers from _data/, writes to projects/.
 * Run: bun run build.ts
 */
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/workspace/projects/rcarmo.github.io";
const DATA = join(ROOT, "_data");
const OUT  = join(ROOT, "projects");
mkdirSync(OUT, { recursive: true });

type Post     = { title: string; url: string; date: string };
type Commit   = { sha: string; date: string; msg: string };
type Release  = { tag: string; name: string; date: string; body: string };
type Meta     = { name: string; full_name: string; description: string;
                  homepage: string | null; stars: number; forks: number;
                  language: string; created_at: string; pushed_at: string;
                  topics: string[] };
type Dossier  = { id: string; meta: Meta; readme: string; commits: Commit[];
                  releases: Release[]; posts: Post[]; logo: string | null };

// ── Hand-written project content (from the dossier data) ──────────────────
type Content = {
  tagline:      string;          // one sharp sentence
  about:        string;          // 2–3 sentence origin / purpose paragraph
  features:     { icon: string; title: string; body: string }[];
  architecture?: string;         // optional paragraph
  status:       "active" | "stable" | "maintained" | "archived";
};

const CONTENT: Record<string, Content> = {
  piku: {
    status: "stable",
    tagline: "Heroku-style git push deployments — without Heroku.",
    about: `Born on a 256 MB Raspberry Pi in 2016, piku lets you deploy apps with nothing but git and SSH. You push code, piku reads the Procfile, installs dependencies, and starts your workers. No Docker daemon, no orchestration framework, no ops overhead.`,
    features: [
      { icon: "⌥", title: "Git push workflow", body: "Push to deploy. `git remote add piku piku@server:appname` and you're done — the same workflow Heroku popularised, on your own server." },
      { icon: "⚙", title: "Any language, any size", body: "Python, Node, Go, Clojure, Java, Ruby, PHP, static sites. If it runs in a shell, piku can run it. Works on a $35 Raspberry Pi or a $5/mo VPS." },
      { icon: "🔒", title: "TLS included", body: "Let's Encrypt certificates provisioned automatically via ACME. Virtual host routing via nginx. Zero-downtime deploys via worker process replacement." },
      { icon: "⬆", title: "Scale without ops", body: "`ps:scale web=3` and nginx round-robins across your workers. `config:set KEY=value` for live env updates. No restart required." },
      { icon: "🌍", title: "Any POSIX host", body: "Runs on Debian, Ubuntu, FreeBSD, Alpine, even WSL. Tested on ARM and Intel. Actively maintained by the piku org — not just one developer." },
      { icon: "📖", title: "~1500 lines of readable code", body: "The entire runtime is one Python file you can read in an afternoon. No hidden complexity, no black boxes." },
    ],
  },
  piclaw: {
    status: "active",
    tagline: "A self-hosted AI agent workspace that actually works.",
    about: `PiClaw packages the Pi coding agent runtime into a Docker container with a streaming web UI, persistent state, built-in tools, and no CDN dependencies. It's the agent I use daily — for writing, code, infrastructure, and research — running on a $5 server.`,
    features: [
      { icon: "💬", title: "Streaming web UI", body: "Real-time chat with Markdown, KaTeX, Mermaid, Adaptive Cards. Thought and draft panels during generation. Branch conversations, side prompts, and queued follow-ups." },
      { icon: "🗂", title: "Workspace-native", body: "Browse files, preview documents, drag-upload, reference files in prompts. Built-in code editor, terminal, Office/PDF/image viewers, draw.io, kanban, VNC client." },
      { icon: "🔌", title: "Multi-provider LLM", body: "Anthropic, OpenAI, Azure, Gemini, Ollama, and any OpenAI-compatible endpoint. Switch mid-session, configure per-branch." },
      { icon: "🧠", title: "Persistent agent state", body: "SQLite-backed messages, media, tasks, token usage, and encrypted keychain. Dream memory consolidation keeps long-running sessions coherent." },
      { icon: "🛠", title: "Rich built-in tooling", body: "SSH, Proxmox, Portainer profiles. Browser automation via CDP. Image processing via Sharp. MCP server access via pi-mcp-adapter. Scheduled tasks." },
      { icon: "📦", title: "Zero CDN, single container", body: "Everything ships in one image. No external asset CDNs, no setup wizard. One `docker run` and you're live." },
    ],
    architecture: `Supervisor manages three services inside the container: the Bun-based agent runtime, an optional VNC display, and a Ghostty-backed web terminal. Agent state lives on a bind-mounted workspace volume. Extensions and skills are TypeScript modules hot-loaded at runtime.`,
  },
  vibes: {
    status: "active",
    tagline: "A mobile-first chat UI for AI agents — no setup, no overhead.",
    about: `Vibes is a lightweight web frontend that works with both ACP (GitHub Copilot, OpenAI Codex) and Pi agents via RPC. Built for the phone screen first: nothing to install, no build step, just a clean interface for talking to your agent from anywhere.`,
    features: [
      { icon: "📱", title: "Mobile-first", body: "Designed for real use on a phone. The layout, input handling, and scroll behaviour are tested on iOS and Android before desktop." },
      { icon: "⚡", title: "ACP + Pi", body: "Works with `copilot --acp`, `codex-acp`, and Pi agents via RPC. Protocol support is pluggable — add a new adapter in one file." },
      { icon: "🚿", title: "Streaming responses", body: "Server-sent events for live token streaming. No polling, no page refreshes, no spinners." },
      { icon: "🔩", title: "Zero build step", body: "A single Python file for the server and a single HTML file for the UI. Fork it and make it yours in an afternoon." },
    ],
  },
  webterm: {
    status: "active",
    tagline: "A Go web terminal built for running AI coding agents.",
    about: `webterm serves terminal sessions over HTTP/WebSocket with a dashboard mode for watching multiple agent sessions side-by-side in live-updating tiles. It's the terminal layer used by both agentbox and ghostty-web, and was ported from Python to Go for lower resource use and better concurrency.`,
    features: [
      { icon: "🖥", title: "Dashboard mode", body: "Watch multiple terminal sessions as live-updating tiles. Built for the use case of running several AI agents in parallel without switching windows." },
      { icon: "⚡", title: "WebAssembly rendering", body: "The terminal renderer is a WebAssembly module — low overhead, correct xterm escape handling, no heavy JS framework." },
      { icon: "📱", title: "Mobile-ready keybar", body: "Draggable sticky-key bar for Esc, Ctrl, Shift, Tab, and arrow keys. Makes the terminal usable from a phone for real work, not just `htop` screenshots." },
      { icon: "🔌", title: "Embedded-first", body: "Designed to be imported as a library, not just run standalone. Powers the terminal layer in agentbox, piclaw, and ghostty-web." },
    ],
    architecture: `A Go HTTP server that upgrades connections to WebSocket, pipes them to a PTY, and streams encoded terminal frames to the browser. go-te handles server-side VT100/xterm state. The frontend is a single HTML file with an xterm.js-compatible canvas renderer.`,
  },
  agentbox: {
    status: "active",
    tagline: "A container sandbox for coding agents — batteries included.",
    about: `Agentbox is a Docker image built specifically for running AI coding agents safely. It ships a curated Debian userland with every tool agents reach for — git, build systems, language runtimes, jq, ripgrep — without exposing host state. SKILL.md files are included for common agent workflows.`,
    features: [
      { icon: "🔒", title: "Isolated by default", body: "Agents run as a non-root user in a container with no access to host credentials, sockets, or secrets unless explicitly mounted." },
      { icon: "🛠", title: "Batteries included", body: "Bun, Node, Python 3, Go, Rust, gcc, git, ripgrep, jq, make, curl — everything an agent needs without a 10-minute setup step." },
      { icon: "🖥", title: "GUI variant", body: "The `:gui` tag adds a virtual framebuffer and RDP/VNC server for agents that need visual output — screenshots, browser automation, UI testing." },
      { icon: "📘", title: "SKILL.md files", body: "Pre-installed skill templates for common coding, deployment, and debugging patterns. Agents inherit project skills automatically on `make init`." },
      { icon: "🔗", title: "webterm integration", body: "Designed to work with webterm's dashboard mode — run 4 agents in parallel and watch their terminals side-by-side from a single browser tab." },
    ],
  },
  PhotosExport: {
    status: "stable",
    tagline: "Export everything from Apple Photos — metadata, albums, originals, edits.",
    about: `Apple Photos is a great app but a terrible archive. The built-in export silently drops EXIF data, misses Live Photo pairs, and can't reproduce album structure. PhotosExport uses the PhotoKit framework directly to ensure nothing is lost — originals, edited versions, burst sets, and all.`,
    features: [
      { icon: "📸", title: "Complete export", body: "Originals AND edited variants. Live Photos as matched photo+video pairs. Burst sets with all frames. Nothing silently skipped." },
      { icon: "📂", title: "Album structure preserved", body: "Full album hierarchy and smart album membership exported as a JSON manifest alongside the media files." },
      { icon: "🏷", title: "EXIF intact", body: "All EXIF, XMP, and IPTC metadata preserved in the exported files — not stripped or re-encoded." },
      { icon: "⚡", title: "Progress tracking", body: "Per-asset progress bar with accurate counts. Runs as a macOS command-line tool — scriptable, pausable, resumable." },
    ],
  },
  "ground-init": {
    status: "active",
    tagline: "Local machine bootstrap that reads like cloud-init but doesn't need a cloud.",
    about: `cloud-init is overkill for machines you configure by hand. ground-init is a Python script that takes a YAML config and idempotently applies it to a fresh Ubuntu, Debian, or Fedora system — packages, users, SSH keys, dotfiles, systemd services — with clear output at every step.`,
    features: [
      { icon: "📄", title: "YAML-driven", body: "Declare the desired state in a YAML file. ground-init applies it, reports what changed, and does nothing on re-runs when state is already correct." },
      { icon: "🔄", title: "Idempotent", body: "Run it once to set up, run it again to verify. Each step reports explicitly: changed, skipped, or failed." },
      { icon: "🐧", title: "Multi-distro", body: "Ubuntu, Debian, Fedora, and Fedora Silverblue (rpm-ostree). Ships with real-world sample configs as starting points." },
      { icon: "📦", title: "Zero dependencies", body: "Pure Python 3 stdlib. No Ansible, no Chef, no pip install — just Python and a text editor." },
    ],
  },
  "azure-stable-diffusion": {
    status: "stable",
    tagline: "Run Stable Diffusion on Azure spot instances — one command, a few cents an hour.",
    about: `Built in September 2022 when Stable Diffusion first dropped and everyone wanted GPU time they didn't own. A Makefile wrapping Azure Bicep that spins up an NC-series spot VM, pre-installs AUTOMATIC1111, and tears it down when you're done. Still useful for occasional large batch runs.`,
    features: [
      { icon: "⚡", title: "One command", body: "`make deploy` provisions the VM. `make open` forwards the web UI. `make destroy` deletes everything. Total setup time: ~8 minutes." },
      { icon: "💰", title: "Spot pricing", body: "NC6s_v3 spot instances run for under $0.10/hour. Batch 200 images for a few dollars, then tear it down." },
      { icon: "💾", title: "Persistent state", body: "Models and outputs live on an attached data disk that survives spot interruptions and `make destroy`/`deploy` cycles." },
      { icon: "🎨", title: "AUTOMATIC1111 ready", body: "WebUI pre-configured and accessible via SSH tunnel on first boot. Bring your own models or download from the VM." },
    ],
  },
  drawterm: {
    status: "stable",
    tagline: "Plan 9 drawterm — now legible on a Retina display.",
    about: `Standard drawterm renders at 1x on a 2x Retina screen, making Plan 9 and 9front sessions look like fine print. This fork patches the macOS rendering path to read the display scale factor and apply it — two lines of code that make a real difference.`,
    features: [
      { icon: "🔍", title: "HIDPI scaling", body: "Reads the macOS display scale factor and applies it to drawterm's rendering. Retina and 5K displays work correctly instead of rendering at half size." },
      { icon: "🍎", title: "Apple Silicon native", body: "Compiles natively for arm64. No Rosetta, no emulation layer." },
      { icon: "🧬", title: "Minimal diff", body: "The smallest possible change from upstream drawterm — easy to rebase when upstream updates." },
    ],
  },
  macemu: {
    status: "maintained",
    tagline: "Basilisk II and SheepShaver — updated for modern systems, with networking.",
    about: `A maintained fork of the Basilisk II (68k) and SheepShaver (PowerPC) Macintosh emulators with fixes for building on macOS 14+ and modern Linux. Networking via slirp means no tun/tap, no root required. Used as the emulation layer for the Maclock and mini Mac projects.`,
    features: [
      { icon: "💻", title: "68k + PowerPC", body: "Basilisk II for System 6–8 (68k Macs). SheepShaver for Mac OS 8.6–9.0.4 (PowerPC). Both build cleanly from the same repo." },
      { icon: "🌐", title: "Networking via slirp", body: "NAT networking without tun/tap or root privileges. Access the internet from inside the emulator on any host platform." },
      { icon: "🔧", title: "Modern build", body: "CMake build system. Fixes for macOS 14+ and glibc 2.38+ compile issues. No patched headers, no manual SDK tweaks." },
      { icon: "📟", title: "Used in Maclock", body: "The emulation engine running inside the Maclock project — a $20 alarm-clock-shaped Mac replica repurposed as a proper Mac Classic." },
    ],
  },
  "feed-summarizer": {
    status: "active",
    tagline: "LLM-powered RSS digest — powers feeds.carmo.io.",
    about: `A daily RSS/Atom summarizer that fetches feeds, extracts full article text, and generates concise summaries using a local or cloud LLM. The output is the daily digest at feeds.carmo.io. Designed to run on a low-power ARM server as a cron job — no daemon, no queue, no database.`,
    features: [
      { icon: "📰", title: "Full-text extraction", body: "Uses trafilatura to extract the actual article body, not just the RSS description snippet. Summaries are based on what the article actually says." },
      { icon: "🤖", title: "Local + cloud LLM", body: "Supports Ollama for local inference (runs on a Raspberry Pi 4) and OpenAI/Anthropic for higher quality. Switch with one env var." },
      { icon: "⏰", title: "Cron-friendly", body: "A single Python script. No daemon, no database, no message queue. Runs as a cron job, outputs static HTML and JSON." },
      { icon: "🌐", title: "Powers feeds.carmo.io", body: "The live daily digest at feeds.carmo.io is generated by this script, running on a low-power ARM server." },
    ],
  },
  umcp: {
    status: "active",
    tagline: "The smallest MCP server you can drop into a Python script.",
    about: `Every MCP implementation I found assumed you wanted a full framework. umcp is the opposite: two modules (asyncio and sync), zero external dependencies, tool registration via plain function decorators. Drop it into an existing script and you're done.`,
    features: [
      { icon: "🪶", title: "Zero dependencies", body: "Pure Python 3 stdlib. No pip install, no virtualenv setup. Copy one file and import it." },
      { icon: "⚡", title: "Async + sync", body: "Both `asyncio` and synchronous variants. Use whichever fits your existing code — no architectural changes required." },
      { icon: "🎯", title: "Decorator-based", body: "Register a tool with `@server.tool`. The docstring becomes the tool description. Return a value and it's serialized automatically." },
      { icon: "📌", title: "stdio transport", body: "MCP over stdio — the most universally supported transport. Works with Claude Desktop, Cursor, and any other MCP client." },
    ],
  },
  "go-busybox": {
    status: "active",
    tagline: "A static UNIX toolkit for AI agent sandboxes.",
    about: `AI agents need familiar shell tools — ls, grep, find, cat, sed — but giving them a full Linux userland in a minimal sandbox is excessive and risky. go-busybox compiles the essential POSIX utilities into a single static binary that drops into any container with zero runtime dependencies.`,
    features: [
      { icon: "📦", title: "Single static binary", body: "No shared libraries, no runtime dependencies. Drop it into any container regardless of what's installed. Compiles for any GOARCH." },
      { icon: "🔧", title: "The tools agents actually use", body: "ls, cat, grep, find, sed, awk basics, sort, wc, head, tail, xargs. The commands that appear in 90% of agent shell interactions." },
      { icon: "🛡", title: "Minimal attack surface", body: "No networking tools, no privilege escalation utilities, no package managers. Exactly what agents need for file work, nothing more." },
      { icon: "🍴", title: "Forkable", body: "Add or remove commands by modifying one file. The dispatch table makes it trivial to customise the toolset for your sandbox requirements." },
    ],
  },
  "proxmox-zpool-monitoring": {
    status: "stable",
    tagline: "ZFS pool metrics for Proxmox, exported to Graphite.",
    about: `Proxmox's built-in dashboards show VM metrics but give limited visibility into ZFS pool health and I/O trends. This script exports pool status, capacity, read/write IOPS, and error counts to Graphite — no agent daemon, no sidecar, just a cron job and a metrics endpoint.`,
    features: [
      { icon: "📊", title: "Pool health metrics", body: "ONLINE/DEGRADED/FAULTED status, errors, used/available capacity, and scrub results — all as time-series metrics in Graphite." },
      { icon: "⚡", title: "I/O tracking", body: "Per-pool read/write IOPS and bandwidth from `zpool iostat`. Spot the disk that's throttling your NAS in Grafana." },
      { icon: "⏰", title: "Cron-friendly", body: "A Python script that runs as a cron job. No daemon, no persistent process, no dependencies beyond Python 3." },
      { icon: "🔌", title: "Graphite/Grafana stack", body: "Exports via the Graphite plaintext protocol. Works with any Graphite-compatible backend — Carbon, InfluxDB + Graphite plugin, etc." },
    ],
  },
  "gnome-thumbnailers": {
    status: "stable",
    tagline: "Thumbnails for the file formats GNOME pretends don't exist.",
    about: `GNOME Files shows thumbnails for JPEGs and PNGs and then gives up. This collection adds thumbnailers for RAW photos (CR2/NEF/ARW), HEIC/HEIF images, FBX/OBJ/STL 3D models, and other formats photographers and hardware tinkerers actually work with.`,
    features: [
      { icon: "📷", title: "RAW photo support", body: "Thumbnails for CR2, NEF, ARW, ORF, RW2, and other RAW formats via rawpy. Your camera's RAW files finally show previews in Nautilus." },
      { icon: "🍎", title: "HEIC/HEIF", body: "Apple's preferred format since iOS 11. Thumbnail support via Pillow's HEIF plugin — see your iPhone photos as thumbnails without converting them." },
      { icon: "🧊", title: "3D model files", body: "Thumbnail renders for FBX, OBJ, and STL files. Useful for a workshop directory full of print files." },
      { icon: "🔧", title: "Drop-in install", body: "`make install` registers the thumbnailers. GNOME Files starts showing thumbnails immediately — no restart, no logout." },
    ],
  },
  "go-rdp": {
    status: "active",
    tagline: "RDP in a browser tab — no client install required.",
    about: `A Go HTTP/WebSocket server that proxies RDP sessions to a browser-based canvas client. Connect to Windows VMs from any modern browser without installing a native client. Part of the same Go terminal family as webterm, go-te, and ghostty-web.`,
    features: [
      { icon: "🌐", title: "Browser-based RDP", body: "Full RDP session in a browser tab. Canvas rendering, keyboard forwarding, mouse support. Works from any device with a modern browser." },
      { icon: "🔒", title: "No client install", body: "No RDP client, no VPN client, no plugins. Just a browser and a URL — useful for tablet access to Windows VMs." },
      { icon: "⚙", title: "Go backend", body: "Pure Go, no CGO on Linux. Single binary deployment. Shares the go-te terminal state engine with webterm and ghostty-web." },
    ],
  },
  "pve-microvm": {
    status: "active",
    tagline: "Run OCI images as hardware-isolated microVMs on Proxmox.",
    about: `Proxmox LXC containers share the kernel. Full VMs need manual image management. pve-microvm boots any OCI container image as a proper hardware-isolated microVM — hypervisor boundary, no shared kernel, sub-second starts for Alpine-based images.`,
    features: [
      { icon: "🛡", title: "Hypervisor isolation", body: "Each workload gets its own kernel via libkrun (macOS/Linux) or QEMU microvm. No shared kernel, no namespace breakout." },
      { icon: "🐳", title: "Any OCI image", body: "Pull from Docker Hub, ghcr.io, or any OCI registry. The image is extracted and booted directly — no VM template management." },
      { icon: "⚡", title: "Sub-second starts", body: "Alpine-based images boot in under a second. Dispose the VM and boot a fresh one in the time it takes to start a container." },
      { icon: "🔑", title: "vsock communication", body: "VMs communicate over virtio-vsock — no network bridge, no IP assignment required for simple agent workloads." },
    ],
  },
  "homekit-steam-user-switcher": {
    status: "stable",
    tagline: "Switch Steam accounts from your phone via HomeKit.",
    about: `A household with multiple Steam accounts on a shared gaming PC meant walking to the TV every time someone wanted to play. This Python service exposes each Steam account as a HomeKit switch — one tap, one Siri command, or one automation switches the active user.`,
    features: [
      { icon: "🏠", title: "HomeKit-native", body: "Each Steam account appears as a HomeKit Switch in the Home app. Trigger it with Siri, a shortcut, or a time-based automation." },
      { icon: "🎮", title: "No Steam API required", body: "Uses the Steam CLI flags to log out and log in locally. No API key, no OAuth flow, no Steam Web API account." },
      { icon: "🐧", title: "macOS and Linux", body: "Uses HAP-python for the HomeKit accessory implementation. Runs as a systemd service. Works on the gaming machine itself." },
    ],
  },
  "zmk-config-totem": {
    status: "stable",
    tagline: "A production-ready ZMK keymap for the Totem split keyboard.",
    about: `The Totem is one of the most compact practical split keyboards but its ZMK config ecosystem is scattered. This config adds ZMK Studio support for GUI-based keymap editing, home row mods with tuned timing, and combos that make 34 keys actually comfortable for daily writing and coding.`,
    features: [
      { icon: "🖥", title: "ZMK Studio", body: "GUI keymap editing without reflashing. Adjust layers, combos, and key assignments from a web interface — no toolchain required." },
      { icon: "✋", title: "Home row mods", body: "Mod-tap on the home row with per-key timing tuned to minimise accidental triggers during fast typing." },
      { icon: "⌨", title: "34-key layout", body: "Combos for common brackets and symbols make all punctuation reachable without a dedicated symbol layer." },
      { icon: "🍴", title: "Used as a template", body: "More forks than stars — this config is primarily used as a starting point for personal Totem keymaps." },
    ],
  },
  "ghostty-web": {
    status: "active",
    tagline: "Ghostty terminal sessions in a browser, with xterm.js compatibility.",
    about: `Ghostty is the best terminal I've used but it's native-only. ghostty-web serves Ghostty sessions over WebSocket to a browser client with an xterm.js-compatible API, so you can use Ghostty's rendering quality from a tablet or a remote browser session — no native app required.`,
    features: [
      { icon: "⚡", title: "Ghostty quality, browser access", body: "Ghostty's rendering runs server-side. The browser client gets the output over WebSocket — Ghostty's speed and correctness, accessible from any device." },
      { icon: "🔌", title: "xterm.js compatibility", body: "Implements the xterm.js API layer so existing tooling that embeds xterm.js can be switched to ghostty-web with minimal changes." },
      { icon: "🔗", title: "Shared terminal stack", body: "Built on go-te for server-side terminal state, shared with webterm and go-rdp. One codebase for the whole terminal family." },
    ],
  },
  "go-te": {
    status: "active",
    tagline: "A VT100/xterm terminal emulation library for Go.",
    about: `go-te is the shared terminal state engine used by webterm, go-rdp, and ghostty-web. It parses VT100/VT220/xterm escape sequences, maintains a cell buffer with full attribute support, and fires update callbacks — giving applications a correct terminal layer they can render however they like.`,
    features: [
      { icon: "🔣", title: "Full VT100/xterm support", body: "Escape sequences, CSI commands, colour attributes, alternate screen buffer, and cursor movement — the complete set needed for real-world terminal applications." },
      { icon: "📦", title: "Embeddable", body: "A Go library, not a server. Import it, provide a callback for screen updates, and render the cell buffer however your application needs." },
      { icon: "⚡", title: "Zero CGO", body: "Pure Go. Compiles to a static binary for any GOARCH. No libvte, no ncurses, no system library dependencies." },
    ],
  },
  gotel: {
    status: "active",
    tagline: "Minimal OpenTelemetry for Go services that need to stay lean.",
    about: `The official OTel Go SDK pulls in a significant dependency tree. gotel is a thin initialisation wrapper that sets up a TracerProvider and MeterProvider with sensible defaults, OTLP export, and a handful of helpers for common patterns — all without inflating your binary or your go.sum.`,
    features: [
      { icon: "📉", title: "Minimal dependencies", body: "Only the OTel API and a single exporter. No contrib packages, no auto-instrumentation frameworks, no reflection-heavy schemas." },
      { icon: "📤", title: "OTLP/gRPC + HTTP", body: "Both transport options in the same package. Switch between gRPC and HTTP exporter with one env var." },
      { icon: "🔗", title: "Used across the terminal stack", body: "Shared by webterm, go-rdp, and go-te for distributed tracing across the terminal service family." },
    ],
  },
};

// ── Verified posts ─────────────────────────────────────────────────────────
const POSTS: Record<string, Post[]> = JSON.parse(
  readFileSync(join(DATA, "verified-posts.json"), "utf-8")
);

// ── CSS ────────────────────────────────────────────────────────────────────
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #08090a;
  --card: #111214;
  --border: #1e2024;
  --border2: #2a2d33;
  --text: #f0f2f5;
  --muted: #7a8190;
  --dim: #464c5a;
  --accent: #4f8ef7;
  --accent-glow: rgba(79,142,247,.15);
  --green: #34d399;
  --amber: #fbbf24;
  --red: #f87171;
  --purple: #a78bfa;
  --radius: 10px;
  --radius-lg: 16px;
  --gap: clamp(1rem, 4vw, 2rem);
  --max: 960px;
  --feature-grid: repeat(auto-fill, minmax(260px, 1fr));
}
@media (prefers-color-scheme: light) {
  :root {
    --bg: #f8f9fb;
    --card: #ffffff;
    --border: #e4e7ed;
    --border2: #d1d5db;
    --text: #111827;
    --muted: #6b7280;
    --dim: #9ca3af;
    --accent: #2563eb;
    --accent-glow: rgba(37,99,235,.08);
    --green: #059669;
    --amber: #d97706;
    --red: #dc2626;
    --purple: #7c3aed;
  }
}
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
code { font-family: ui-monospace, "SF Mono", "Fira Code", Menlo, Consolas, monospace; font-size: .875em; background: var(--border); padding: .15em .35em; border-radius: 4px; }
/* ── Topbar ── */
.topbar { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.topbar-inner { max-width: var(--max); margin: 0 auto; padding: .75rem var(--gap); display: flex; align-items: center; gap: .75rem; font-size: .8rem; color: var(--muted); }
.topbar-inner a { color: var(--muted); font-weight: 500; } .topbar-inner a:hover { color: var(--text); text-decoration: none; }
.topbar-inner .sep { color: var(--border2); }
.topbar-inner .current { color: var(--text); font-weight: 600; }
/* ── Hero ── */
.hero { padding: 3.5rem var(--gap) 2.5rem; max-width: var(--max); margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: start; }
@media (max-width: 600px) { .hero { grid-template-columns: 1fr; } .hero-logo { display: none; } }
.hero-logo img { width: 80px; height: 80px; border-radius: 18px; box-shadow: 0 0 0 1px var(--border), 0 8px 24px rgba(0,0,0,.3); }
.hero h1 { font-size: clamp(1.6rem, 5vw, 2.6rem); font-weight: 700; letter-spacing: -.03em; line-height: 1.15; }
.hero h1 a { color: var(--text); } .hero h1 a:hover { color: var(--accent); text-decoration: none; }
.hero .tagline { font-size: clamp(.95rem, 2.5vw, 1.2rem); color: var(--muted); margin: .6rem 0 1.5rem; max-width: 540px; line-height: 1.5; }
.meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: .65rem 1.1rem; font-size: .82rem; color: var(--muted); margin-bottom: 1.5rem; }
.meta-stars { color: var(--amber); font-weight: 700; }
.meta-lang { display: inline-flex; align-items: center; gap: .35rem; }
.dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.dot-TypeScript{background:#3178c6}.dot-Python{background:#3572A5}.dot-Go{background:#00ADD8}
.dot-Swift{background:#F05138}.dot-C{background:#555}.dot-Cpp{background:#f34b7d}
.dot-Dockerfile{background:#384d54}.dot-Shell{background:#89e051}.dot-misc{background:#7a8190}
.badge { display: inline-flex; align-items: center; gap: .3rem; padding: .2rem .65rem; border-radius: 2em; font-size: .72rem; font-weight: 600; letter-spacing: .02em; }
.badge-active   { background: rgba(52,211,153,.12); color: #34d399; border: 1px solid rgba(52,211,153,.25); }
.badge-stable   { background: rgba(79,142,247,.12); color: #4f8ef7; border: 1px solid rgba(79,142,247,.25); }
.badge-maintained{background: rgba(167,139,250,.12); color: #a78bfa; border: 1px solid rgba(167,139,250,.25); }
.badge-archived { background: rgba(251,191,36,.12); color: #fbbf24; border: 1px solid rgba(251,191,36,.25); }
@media (prefers-color-scheme: light) {
  .badge-active{background:#d1fae5;color:#065f46;border-color:#6ee7b7}
  .badge-stable{background:#dbeafe;color:#1d4ed8;border-color:#93c5fd}
  .badge-maintained{background:#ede9fe;color:#5b21b6;border-color:#c4b5fd}
  .badge-archived{background:#fef3c7;color:#92400e;border-color:#fcd34d}
}
.topic-list { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1.5rem; }
.topic { font-size: .72rem; background: var(--card); border: 1px solid var(--border2); color: var(--muted); padding: .18rem .6rem; border-radius: 2em; }
.cta-row { display: flex; flex-wrap: wrap; gap: .65rem; }
.btn { display: inline-flex; align-items: center; gap: .4rem; padding: .5rem 1.1rem; border-radius: var(--radius); font-size: .85rem; font-weight: 500; transition: all .15s; }
.btn-primary { background: var(--accent); color: #fff; border: none; } .btn-primary:hover { opacity: .9; text-decoration: none; filter: brightness(1.1); }
.btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border2); } .btn-ghost:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
/* ── Divider ── */
.divider { border: none; border-top: 1px solid var(--border); max-width: var(--max); margin: 0 auto; }
/* ── Content wrap ── */
.wrap { max-width: var(--max); margin: 0 auto; padding: 2.5rem var(--gap); }
/* ── About ── */
.about-text { font-size: 1.05rem; line-height: 1.75; color: var(--text); max-width: 680px; }
/* ── Features ── */
.section-eyebrow { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--accent); margin-bottom: .5rem; }
.section-title { font-size: 1.4rem; font-weight: 700; letter-spacing: -.02em; margin-bottom: 1.75rem; }
.features-grid { display: grid; grid-template-columns: var(--feature-grid); gap: 1px; background: var(--border); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border); }
.feature { background: var(--card); padding: 1.5rem; display: flex; flex-direction: column; gap: .5rem; }
.feature-icon { font-size: 1.4rem; line-height: 1; }
.feature-title { font-size: .9rem; font-weight: 600; color: var(--text); }
.feature-body { font-size: .85rem; color: var(--muted); line-height: 1.6; }
/* ── Architecture ── */
.arch-text { font-size: .95rem; color: var(--muted); max-width: 680px; line-height: 1.75; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 1.5rem; }
/* ── Releases ── */
.releases { display: flex; flex-direction: column; gap: .75rem; }
.release { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.25rem; }
.release-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: .6rem; margin-bottom: .3rem; }
.release-tag { font-family: ui-monospace, monospace; font-size: .82rem; font-weight: 700; color: var(--accent); background: var(--accent-glow); padding: .1rem .45rem; border-radius: 4px; }
.release-name { font-weight: 500; font-size: .9rem; }
.release-date { color: var(--dim); font-size: .78rem; margin-left: auto; }
.release-body { font-size: .82rem; color: var(--muted); white-space: pre-wrap; word-break: break-word; max-height: 200px; overflow: hidden; }
/* ── History ── */
.history { display: flex; flex-direction: column; }
.commit { display: grid; grid-template-columns: 7rem 1fr auto; gap: .75rem; padding: .55rem 0; border-bottom: 1px solid var(--border); font-size: .82rem; align-items: start; }
.commit:last-child { border-bottom: none; }
.commit-date { color: var(--dim); white-space: nowrap; padding-top: .05rem; }
.commit-msg { color: var(--muted); word-break: break-word; }
.commit-sha { font-family: ui-monospace, monospace; font-size: .72rem; color: var(--dim); white-space: nowrap; }
/* ── Posts ── */
.posts { display: flex; flex-direction: column; gap: .5rem; }
.post { display: grid; grid-template-columns: 6.5rem 1fr; gap: .75rem; font-size: .875rem; }
.post-date { color: var(--dim); white-space: nowrap; padding-top: .1rem; font-size: .78rem; }
.post-title { color: var(--text); }
.post-title:hover { color: var(--accent); }
/* ── Stats bar ── */
.stats-bar { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 2.5rem; }
.stat { background: var(--card); padding: 1.1rem 1.25rem; }
.stat-label { font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; color: var(--dim); margin-bottom: .25rem; }
.stat-value { font-size: 1.4rem; font-weight: 700; letter-spacing: -.02em; color: var(--text); }
.stat-sub { font-size: .75rem; color: var(--muted); margin-top: .1rem; }
/* ── Footer ── */
footer { max-width: var(--max); margin: 0 auto; padding: 2rem var(--gap); border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
footer .left { font-size: .8rem; color: var(--dim); }
footer .right { display: flex; gap: 1.5rem; font-size: .8rem; }
footer .right a { color: var(--muted); } footer .right a:hover { color: var(--text); }
`;

function ghSvg() {
  return `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

function esc(s: string) {
  return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function page(d: Dossier, c: Content): string {
  const m = d.meta;
  const ghUrl = `https://github.com/${m.full_name}`;
  const displayName = m.full_name.split("/")[0] !== "rcarmo" ? m.full_name : m.name;
  const langDot = "dot-" + ({"C++":"Cpp"}[m.language] ?? m.language ?? "misc");
  const created = m.created_at?.slice(0,4) ?? "?";
  const pushed  = m.pushed_at?.slice(0,10) ?? "?";
  const posts   = POSTS[d.id] ?? [];
  const hasReleases = d.releases?.length > 0;
  const hasCommits  = d.commits?.length > 0;

  const logoHtml = d.logo
    ? `<div class="hero-logo"><img src="${d.logo}" alt="${esc(displayName)} logo"></div>` : "";

  const statsHtml = `
  <div class="stats-bar">
    <div class="stat"><div class="stat-label">Stars</div><div class="stat-value">${m.stars?.toLocaleString() ?? 0}</div><div class="stat-sub">on GitHub</div></div>
    <div class="stat"><div class="stat-label">Forks</div><div class="stat-value">${m.forks ?? 0}</div><div class="stat-sub">public forks</div></div>
    <div class="stat"><div class="stat-label">Language</div><div class="stat-value" style="font-size:1rem;padding-top:.35rem"><span class="dot ${langDot}"></span> ${esc(m.language ?? "—")}</div></div>
    <div class="stat"><div class="stat-label">First release</div><div class="stat-value" style="font-size:1.1rem;padding-top:.25rem">${created}</div></div>
    <div class="stat"><div class="stat-label">Last active</div><div class="stat-value" style="font-size:.95rem;padding-top:.3rem">${pushed}</div></div>
  </div>`;

  const featuresHtml = `
  <div class="wrap">
    <div class="section-eyebrow">Features</div>
    <div class="section-title">What it does</div>
    <div class="features-grid">
      ${c.features.map(f => `
      <div class="feature">
        <div class="feature-icon">${f.icon}</div>
        <div class="feature-title">${esc(f.title)}</div>
        <div class="feature-body">${esc(f.body)}</div>
      </div>`).join("")}
    </div>
  </div>`;

  const archHtml = c.architecture ? `
  <div class="wrap">
    <div class="section-eyebrow">Under the hood</div>
    <div class="section-title">Architecture</div>
    <p class="arch-text">${esc(c.architecture.trim().replace(/\n\s+/g," "))}</p>
  </div>` : "";

  const releasesHtml = hasReleases ? `
  <div class="wrap">
    <div class="section-eyebrow">Versions</div>
    <div class="section-title">Releases</div>
    <div class="releases">
      ${d.releases.slice(0, 8).map(r => `
      <div class="release">
        <div class="release-head">
          <span class="release-tag">${esc(r.tag)}</span>
          <span class="release-name">${esc(r.name)}</span>
          <span class="release-date">${r.date?.slice(0,10) ?? ""}</span>
        </div>
        ${r.body ? `<div class="release-body">${esc(r.body.trim())}</div>` : ""}
      </div>`).join("")}
    </div>
  </div>` : "";

  const historyHtml = hasCommits ? `
  <div class="wrap">
    <div class="section-eyebrow">History</div>
    <div class="section-title">Recent commits</div>
    <div class="history">
      ${d.commits.slice(0, 20).map(c2 => `
      <div class="commit">
        <span class="commit-date">${c2.date?.slice(0,10) ?? ""}</span>
        <span class="commit-msg">${esc(c2.msg)}</span>
        <span class="commit-sha">${c2.sha}</span>
      </div>`).join("")}
    </div>
  </div>` : "";

  const postsHtml = posts.length > 0 ? `
  <div class="wrap">
    <div class="section-eyebrow">Writing</div>
    <div class="section-title">On taoofmac.com</div>
    <div class="posts">
      ${posts.map(p => `
      <div class="post">
        <span class="post-date">${p.date}</span>
        <a class="post-title" href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a>
      </div>`).join("")}
    </div>
  </div>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${displayName} — Rui Carmo</title>
<meta name="description" content="${esc(c.tagline)}">
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}</style>
</head>
<body>

<header class="topbar">
  <div class="topbar-inner">
    <a href="/">rcarmo.github.io</a>
    <span class="sep">/</span>
    <span class="current">${displayName}</span>
  </div>
</header>

<main>
  <div class="hero">
    <div class="hero-content">
      <h1><a href="${ghUrl}" target="_blank" rel="noopener">${displayName}</a></h1>
      <p class="tagline">${esc(c.tagline)}</p>
      <div class="meta-row">
        <span class="meta-stars">★ ${m.stars?.toLocaleString() ?? 0}</span>
        ${m.forks > 0 ? `<span>⑂ ${m.forks}</span>` : ""}
        <span class="meta-lang"><span class="dot ${langDot}"></span>${esc(m.language ?? "misc")}</span>
        <span class="badge badge-${c.status}">${c.status}</span>
      </div>
      ${(m.topics?.length ?? 0) > 0 ? `<div class="topic-list">${m.topics.map(t => `<span class="topic">${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="cta-row">
        <a class="btn btn-primary" href="${ghUrl}" target="_blank" rel="noopener">${ghSvg()} View on GitHub</a>
        ${m.homepage ? `<a class="btn btn-ghost" href="${m.homepage}" target="_blank" rel="noopener">🌐 ${esc(m.homepage)}</a>` : ""}
      </div>
    </div>
    ${logoHtml}
  </div>

  <hr class="divider">

  <div class="wrap">
    <div class="section-eyebrow">About</div>
    <p class="about-text">${esc(c.about.trim().replace(/\n\s+/g, " "))}</p>
  </div>

  <div class="wrap">${statsHtml}</div>

  ${featuresHtml}
  ${archHtml}
  ${releasesHtml}
  ${historyHtml}
  ${postsHtml}
</main>

<footer>
  <div class="left">Last indexed ${pushed}</div>
  <div class="right">
    <a href="/">← All projects</a>
    <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener">GitHub</a>
  </div>
</footer>

</body>
</html>`;
}

// ── Build ──────────────────────────────────────────────────────────────────
let built = 0, skipped = 0;
for (const f of (readdirSync(DATA) as string[]).filter(f => f.endsWith(".dossier.json"))) {
  const proj = f.replace(".dossier.json", "");
  const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
  const c = CONTENT[proj];
  if (!c) { console.log(`  SKIP (no content) ${proj}`); skipped++; continue; }
  writeFileSync(join(OUT, `${proj}.html`), page(d, c));
  console.log(`  ✓ ${proj}`);
  built++;
}
console.log(`\nBuilt ${built} pages, skipped ${skipped}`);
