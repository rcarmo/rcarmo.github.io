#!/usr/bin/env bun
/**
 * Build rich single-page project presentations.
 * - Logos inlined as base64 data URIs
 * - Architecture diagrams inlined as SVG
 * - Releases loaded dynamically from GitHub API at page load (no stale baked data)
 * - Date-sorted releases with human-readable dates
 * - No commit list — only releases + verified posts
 * Run: bun run build.ts
 */
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/workspace/projects/rcarmo.github.io";
const DATA = join(ROOT, "_data");
const OUT  = join(ROOT, "projects");
mkdirSync(OUT, { recursive: true });

type Post    = { title: string; url: string; date: string };
type Meta    = { name: string; full_name: string; description: string;
                 homepage: string|null; stars: number; forks: number;
                 language: string; created_at: string; pushed_at: string; topics: string[] };
type Dossier = { id: string; meta: Meta; readme: string;
                 posts: Post[]; logo_data_uri: string|null; diagram_inline: string|null };

const POSTS: Record<string, Post[]> = JSON.parse(readFileSync(join(DATA,"verified-posts.json"),"utf-8"));

// ── Per-project content written from READMEs ─────────────────────────────
type Feature = { icon: string; title: string; body: string };
type Content = {
  tagline:  string;
  about:    string;   // 2–3 sentence overview
  how:      string;   // 3–5 paragraph explanation of how it actually works
  features: Feature[];
  status:   "active"|"stable"|"maintained"|"archived";
};

const C: Record<string, Content> = {
  piku: {
    status: "stable",
    tagline: "git push deployments to your own server — no Docker, no ops.",
    about: `piku is a single Python script installed as a git post-receive hook. Push your code, piku reads the Procfile, installs dependencies, starts your workers under uwsgi, and wires them up behind nginx with optional Let's Encrypt TLS. The whole runtime fits in ~1,500 lines of readable Python 3 and runs on a first-generation Raspberry Pi.`,
    how: `piku runs as a git post-receive hook on your server. When you push a commit, it detects your application type from lock files and a Procfile, installs dependencies into an isolated per-app environment (virtualenv for Python, node_modules for Node, a separate GOPATH for Go), and starts your declared processes under uwsgi acting as a process supervisor.

Nginx is reconfigured automatically on each deploy. Virtual hosts, TLS certificates (via Let's Encrypt ACME), static file serving paths, and cache rules are all driven by a single ENV file you commit alongside your code. Zero-downtime deploys work by replacing workers before shutting down the old ones. ps:scale web=3 and config:set KEY=val take effect without touching your code.

The entire implementation stays around 1,500 lines of Python with no external dependencies. You can read the whole thing in an afternoon. That deliberate simplicity is a design goal: piku covers 80% of common deployment use cases without becoming a platform.`,
    features: [
      { icon: "⌥", title: "Heroku-style workflow", body: "git remote add piku piku@yourserver:appname. git push piku main. The entire deploy flow." },
      { icon: "🌐", title: "Python, Node, Go, Clojure, Ruby, Java, PHP, static", body: "Language runtimes detected from lock files and Procfiles. If it runs in a shell it runs in piku." },
      { icon: "🔒", title: "Automatic TLS", body: "Let's Encrypt via ACME, virtual host routing via nginx, zero-downtime worker replacement." },
      { icon: "⬆", title: "Live scaling and config", body: "ps:scale web=3 and config:set KEY=val take effect instantly without a redeploy." },
      { icon: "🐧", title: "Any POSIX host", body: "Debian, Ubuntu, Alpine, FreeBSD, WSL. ARM and Intel. Stable since 2016, maintained by the piku org." },
    ],
  },
  piclaw: {
    status: "active",
    tagline: "A self-hosted AI agent workspace — streaming UI, persistent state, no CDN.",
    about: `PiClaw packages the Pi Coding Agent runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, draw.io, kanban boards, VNC client, and MCP access. Everything ships in one image; no CDN, no setup wizard, one docker run command.`,
    how: `PiClaw is a Docker container where Supervisor runs as PID 1 and manages three processes: the Bun-based Pi agent runtime, an optional Ghostty-backed web terminal (Go), and an optional VNC display. Persistent state lives on a bind-mounted /workspace volume — the container itself is stateless and replaceable.

The web UI communicates with the agent runtime over SSE for streaming responses and WebSocket for real-time indicators. The agent's tool surface is layered: a small always-active baseline, with additional tools activated on demand via list_tools and activate_tools. This keeps token usage low while making hundreds of capabilities available. Skills are Markdown-described TypeScript modules discovered at runtime from SKILL.md files.

The keychain stores secrets encrypted at rest with AES-GCM. Sessions branch as git-like conversation trees stored in SQLite — you can fork a conversation, explore a different direction, and return to the original branch. Dream memory consolidation runs nightly to synthesise daily notes from across all sessions and keep long-running workflows coherent.`,
    features: [
      { icon: "💬", title: "Streaming chat with branches", body: "Real-time Markdown, KaTeX, Mermaid, Adaptive Cards. Branch with /btw, queue follow-ups, steer mid-generation." },
      { icon: "🗂", title: "Full workspace tooling", body: "File browser, CodeMirror 6 editor, Office/CSV/PDF/image viewers, draw.io, kanban boards, VNC client — no separate apps." },
      { icon: "🔌", title: "Any LLM", body: "Anthropic, OpenAI, Azure, Gemini, Ollama, or any OpenAI-compatible endpoint. Switch mid-session without restart." },
      { icon: "🧠", title: "Persistent state", body: "SQLite-backed history, media, tasks, token usage, encrypted keychain. Dream nightly consolidation." },
      { icon: "🛠", title: "Infrastructure tools", body: "First-class SSH, Proxmox, Portainer profiles. CDP browser automation. Sharp image processing. MCP via pi-mcp-adapter." },
      { icon: "📦", title: "Single container, no CDN", body: "docker run -p 8080:8080 -v ./workspace:/workspace ghcr.io/rcarmo/piclaw:latest and you're live." },
    ],
  },
  vibes: {
    status: "active",
    tagline: "Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step.",
    about: `Vibes is a lightweight Python web app for talking to AI coding agents from a phone. It supports the Agent Communication Protocol (GitHub Copilot CLI, OpenAI Codex) and Pi agents via RPC. The server is a single aiohttp file; the UI is plain HTML/CSS with no build step.`,
    how: `The server uses aiohttp with server-sent events for streaming. When a message arrives from the browser, it's forwarded to the configured agent backend — either an ACP agent or a Pi agent via its RPC interface. Responses stream back token-by-token over SSE so the browser sees each word as it arrives.

The UI is a single HTML file — no bundler, no npm, no build step. This makes the project trivially forkable: want a different colour scheme, a different protocol, a custom keybar? Edit one file. PiClaw and Vibes share the same web UI codebase, so improvements in one flow back to the other.`,
    features: [
      { icon: "📱", title: "Phone-first layout", body: "Designed and tested on iOS and Android before desktop. Layout, scroll, and input all work on a small screen." },
      { icon: "⚡", title: "ACP + Pi RPC", body: "Connects to copilot --acp, OpenAI Codex, and Pi agents. Protocol adapters are pluggable." },
      { icon: "🚿", title: "SSE streaming", body: "Live token streaming. No polling, no spinners, no page refreshes." },
      { icon: "🔩", title: "Zero build step", body: "One Python file for the server, one HTML file for the UI. Clone and run." },
    ],
  },
  webterm: {
    status: "active",
    tagline: "Go web terminal with multi-session dashboard mode — built for AI agent workflows.",
    about: `webterm serves PTY sessions over HTTP/WebSocket with a dashboard view that tiles multiple active terminals in a single browser tab. Built for monitoring several AI coding agents in parallel. WASM renderer, correct VT100/xterm handling, sticky mobile keybar.`,
    how: `webterm runs a Go HTTP server that accepts WebSocket connections and spawns a PTY for each session. Terminal output is encoded and forwarded to the browser; keyboard events are decoded and written back to the PTY. go-te maintains the server-side VT100/xterm screen state, used for live tile previews in dashboard mode.

The frontend renders via a WebAssembly module compiled from a Go-based xterm renderer. Dashboard mode tiles N active sessions in a responsive CSS grid, each with its own WebSocket feed. This lets you monitor four or five AI agents in parallel from a single browser tab without switching windows or SSH sessions. The mobile sticky keybar (Esc, Ctrl, Shift, Tab, arrows) makes it usable for real work from a phone.`,
    features: [
      { icon: "🖥", title: "Multi-session dashboard", body: "Tile N agent terminals side-by-side. Watch them run in parallel without switching windows." },
      { icon: "⚡", title: "WASM renderer", body: "Correct xterm/VT100 escape handling via WebAssembly. No heavy JS framework." },
      { icon: "📱", title: "Mobile sticky keybar", body: "Draggable Esc/Ctrl/Shift/Tab/arrow keys with sticky combos for Ctrl+C and sequences." },
      { icon: "🔌", title: "Library-first", body: "Designed to be embedded. Powers the terminal layer in agentbox, piclaw, and ghostty-web." },
    ],
  },
  agentbox: {
    status: "active",
    tagline: "Docker sandbox for coding agents — preinstalled runtimes, opt-in services, DinD.",
    about: `Agentbox is a Debian Trixie container with Copilot CLI, Codex, and Pi preinstalled alongside git, gh, Bun, uv, and Homebrew. Docker, SSH, and RDP are disabled by default and enabled via env vars. A GUI image adds XFCE and XRDP. A workspace skeleton with SKILL.md templates seeds new projects.`,
    how: `The entrypoint script checks ENABLE_DOCKER, ENABLE_SSH, and ENABLE_RDP and starts only the services you asked for. All three default to off — the container is safe to expose without any network services running by default. When ENABLE_DOCKER=true, dockerd starts inside the container, enabling Docker-in-Docker for agents that build or run their own containers.

The agent user gets passwordless sudo for installs without running as root. The workspace skeleton at /home/agent/workspace-skel is copied into /workspace on first use without overwriting existing files, seeding new projects with SKILL.md templates that tell coding agents how to use available tools correctly. Additional agents (toad, opencode, gemini, mistral-vibe) install via make targets in the agent home directory without touching the image.`,
    features: [
      { icon: "🤖", title: "Agents preinstalled", body: "Copilot CLI, Codex, Pi ready to use. toad, opencode, gemini, vibe installable via make targets." },
      { icon: "🔒", title: "Opt-in services", body: "Docker, SSH, and RDP are all off by default. Enable with ENABLE_DOCKER=true, ENABLE_SSH=true, ENABLE_RDP=true." },
      { icon: "🖥", title: "CLI and GUI images", body: ":latest is headless. :gui adds XFCE, XRDP, and VS Code for visual agent tasks." },
      { icon: "📘", title: "Workspace skeleton", body: "make init-workspace copies a project scaffold with SKILL.md templates into /workspace without overwriting." },
      { icon: "🐳", title: "Docker-in-Docker", body: "Run privileged and the Docker daemon starts inside. Agents build and run containers without touching the host." },
    ],
  },
  PhotosExport: {
    status: "stable",
    tagline: "Export your complete Apple Photos library — originals, edits, Live Photos, metadata.",
    about: `PhotosExport uses the PhotoKit framework to export every PHAssetResource in a Photos library: originals, edited renders, Live Photo video pairs, burst frames, adjustment data, and retouching strokes. Deterministic YYYY/MM folder hierarchy, collision-safe naming, full JSON album manifest.`,
    how: `PhotosExport calls PHAssetResource for each asset in the library to get every stored resource, not just what Photos.app exposes in its export UI. This includes the original file, the edited full-size render if the photo has been processed, the video component of a Live Photo, burst frames, and raw adjustment data. Nothing is silently skipped.

Files get deterministic timestamp names (YYYYMMDDHHMMSSx.ext) stable across re-runs, with a single lowercase letter suffix only when needed for collision avoidance. The album manifest is written as JSON alongside the exported files, recording which assets belong to which albums, smart albums, and folders — the library structure the built-in export UI discards entirely. Every export error goes to a visible log file.`,
    features: [
      { icon: "📸", title: "Every resource type", body: "Originals, edits, Live Photo videos, burst frames, adjustment data, brush strokes — whatever Photos stores." },
      { icon: "📂", title: "Deterministic naming", body: "YYYYMMDDHHMMSSx.ext — stable across re-runs, collision-safe without guessing." },
      { icon: "🗂", title: "Full album manifest", body: "JSON sidecar with every album, smart album, and folder and their assets. The structure the export UI loses." },
      { icon: "📋", title: "Visible errors", body: "Export failures logged to export_errors.log. Nothing fails silently." },
    ],
  },
  drawterm: {
    status: "stable",
    tagline: "Plan 9 drawterm — HiDPI scaling, Metal rendering, Connect dialog, macOS clipboard.",
    about: `This fork patches the macOS Cocoa backend to read the display scale factor and scale drawterm accordingly, adds Metal-accelerated incremental redraws, a Preferences panel, a Connect dialog that persists credentials, and a macOS pasteboard bridge. Command maps to mod4 for rio bindings.`,
    how: `The canonical drawterm renders at 1:1 physical pixels regardless of display scale, making it unreadable on Retina Macs. This fork patches the Cocoa backend to read the display's backing scale factor and scale the drawterm framebuffer accordingly — a small change with a large visible effect.

The Metal rendering path limits full-surface invalidation to scale and resize events; normal terminal updates flush only the dirty region, eliminating the full-screen flicker of the original Core Graphics path. The Connect dialog persists CPU/auth host, user, and optionally a password in user defaults so you don't re-enter connection details every launch. The pasteboard bridge lets you copy and paste between the Plan 9 screen and macOS applications.`,
    features: [
      { icon: "🔍", title: "HiDPI / Retina scaling", body: "Reads display backing scale factor. Legible on 5K displays and modern MacBooks." },
      { icon: "⚡", title: "Metal incremental redraws", body: "Dirty-region updates only. No full-screen flicker on every keystroke." },
      { icon: "⌨", title: "macOS keyboard + clipboard", body: "Command → mod4 for rio bindings. Pasteboard bridge for text copy/paste between macOS and Plan 9." },
      { icon: "💾", title: "Persistent Connect dialog", body: "CPU/auth host, user, and password saved in user defaults between launches." },
    ],
  },
  macemu: {
    status: "maintained",
    tagline: "Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb packages.",
    about: `This fork targets Raspberry Pi with SDL2 framebuffer/KMS rendering — no X11, no desktop. Pre-built arm64 .deb packages in releases. Basilisk II runs System 6–8; SheepShaver runs Mac OS 8.6–9.0.4.`,
    how: `The SDL2 build is compiled without OpenGL, Wayland, and X11 support to reduce dependencies and improve startup time on Pi hardware. The framebuffer/KMS backend writes directly to the display without going through a compositor, which gives lower latency and less overhead than running through X11.

Pre-built .deb packages for arm64 are available from GitHub Releases for straightforward installation: download, dpkg -i, and run. Build-from-source instructions are included for other architectures. This fork is used as the emulation layer in the Maclock project — a $20 alarm-clock-shaped replica of a Mac Classic running real System 7 software.`,
    features: [
      { icon: "🥧", title: "Raspberry Pi optimised", body: "SDL2 framebuffer/KMS, no X11. Runs on a headless Pi Zero through Pi 5." },
      { icon: "📦", title: "Pre-built .deb packages", body: "arm64 packages in GitHub Releases. dpkg -i and run." },
      { icon: "💻", title: "68k and PowerPC", body: "Basilisk II for System 6–8. SheepShaver for Mac OS 8.6–9.0.4." },
      { icon: "🖥", title: "Direct framebuffer", body: "Lower latency than X11. No desktop environment required." },
    ],
  },
  "ground-init": {
    status: "active",
    tagline: "Idempotent Linux bootstrap — YAML-driven, like cloud-init but for bare metal.",
    about: `ground-init takes a YAML config and applies a sequence of declarative steps to a fresh Linux install: packages, users, files, services. Each step checks current state before acting. Pure Python 3 stdlib, no dependencies. Works on Ubuntu, Debian, and Fedora Silverblue.`,
    how: `Each step in the YAML config is a desired-state declaration, not an imperative command. The script checks whether the current state already matches before doing anything — if a package is installed, it's skipped; if a file has the right contents, it's left alone. Re-running the script on an already-configured machine verifies state without making unwanted changes.

The format covers the cases that come up in every fresh machine setup: apt/rpm-ostree package lists, file contents and permissions, user creation, systemd service enables, git clones, and shell script execution for anything else. Sample configs for common setups — developer workstation, homelab server, Fedora Silverblue overlay — are included as starting points.`,
    features: [
      { icon: "📄", title: "Idempotent YAML", body: "Desired-state declarations. Run twice to set up and verify. Every step reports: changed, skipped, or failed." },
      { icon: "🐧", title: "Ubuntu, Debian, Fedora Silverblue", body: "apt and rpm-ostree support. Sample configs included." },
      { icon: "📦", title: "Zero dependencies", body: "Pure Python 3 stdlib. Works before any package manager is configured on the new machine." },
    ],
  },
  "azure-stable-diffusion": {
    status: "stable",
    tagline: "One-command Stable Diffusion on Azure GPU spot instances.",
    about: `A Makefile wrapping Azure Bicep. make deploy provisions an NC-series GPU spot VM and installs AUTOMATIC1111. make open opens an SSH tunnel. make destroy tears everything down. Spot pricing keeps costs under $0.10/hour; models and outputs live on a separate data disk that survives preemptions.`,
    how: `make deploy runs a Bicep template that provisions a resource group, a data disk, and an NC-series GPU spot VM, then executes a cloud-init script that installs CUDA, clones AUTOMATIC1111, downloads default model weights, and starts the web server. make open opens an SSH tunnel and launches a browser pointing at localhost. make destroy deletes the resource group and everything in it.

Spot instances are preempted when Azure needs the capacity, but because models and outputs live on an attached data disk rather than the VM's ephemeral disk, nothing is lost. Rerun make deploy and the disk reattaches to the new VM. The original template targeted NC6s_v3 (6 vCPUs, 112 GB RAM, Tesla V100), running at well under $0.10/hour on spot pricing.`,
    features: [
      { icon: "⚡", title: "make deploy / make open / make destroy", body: "Three commands. Under ten minutes from nothing to AUTOMATIC1111 WebUI." },
      { icon: "💰", title: "Spot instance pricing", body: "NC6s_v3 spot: typically under $0.10/hour. Batch images, then destroy." },
      { icon: "💾", title: "Persistent model disk", body: "Models and outputs on an attached data disk. Survives spot preemptions and teardowns." },
    ],
  },
  "feed-summarizer": {
    status: "active",
    tagline: "LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.",
    about: `A cron-job RSS/Atom summarizer. Fetches feeds, extracts full article text with trafilatura, batches prompts to a local Ollama or cloud LLM, writes a static HTML digest. No daemon, no database. The nightly output is feeds.carmo.io.`,
    how: `The script fetches each configured RSS/Atom feed, extracts full article text using trafilatura (which handles the various page layouts that produce empty or truncated RSS descriptions), and batches the text into LLM prompts. The prompt produces a one-paragraph summary — concise, direct, noting if the article is opinion vs. factual.

Summaries collect into a single HTML file (the daily digest) and a JSON file for programmatic use. Running against a local Ollama instance with a quantised model handles roughly 50 articles per hour on a Raspberry Pi 4. The nightly output of this script is what you read at feeds.carmo.io.`,
    features: [
      { icon: "📰", title: "Full-text extraction", body: "trafilatura extracts the actual article body, not the RSS description snippet." },
      { icon: "🤖", title: "Local or cloud LLM", body: "Ollama (tested on Raspberry Pi 4) or any OpenAI-compatible API." },
      { icon: "⏰", title: "Cron-friendly", body: "One Python script, no daemon. Add to crontab." },
    ],
  },
  umcp: {
    status: "active",
    tagline: "Micro MCP server — zero deps, decorator-based tool registration, stdio only.",
    about: `umcp is a single-file MCP server implementation: register tools with a decorator, the server handles JSON-RPC 2.0 over stdio, you write plain Python functions. Zero external dependencies. Both asyncio and sync variants. Works with Claude Desktop, Cursor, any MCP client.`,
    how: `The protocol layer reads JSON-RPC 2.0 messages from stdin and dispatches to registered handlers. Decorate any Python function with @server.tool() and it becomes an MCP tool — the function's name is the tool name, the docstring is the description, and type annotations generate the JSON Schema for parameters.

The synchronous variant blocks on stdin in a loop. The asyncio variant runs an async loop for embedding in async applications. Both handle MCP initialisation, capability negotiation, and the full tool call/response lifecycle. Adding an MCP tool to an existing Python script takes three lines: import, decorate, run.`,
    features: [
      { icon: "🪶", title: "Zero dependencies", body: "Pure Python 3 stdlib. Copy one file, import it." },
      { icon: "⚡", title: "Async + sync", body: "@server.tool works on async def and plain def. Use whichever fits." },
      { icon: "🎯", title: "Decorator registration", body: "Docstring → description. Type annotations → JSON Schema. Return value → serialised." },
    ],
  },
  "go-busybox": {
    status: "active",
    tagline: "57 BusyBox utilities in Go — compiles to a 2 MB WASM binary, 387/387 tests passing.",
    about: `go-busybox implements 57 BusyBox-compatible utilities in Go. Compiles to a static native binary or a 2 MB WebAssembly module via TinyGo. All 387 BusyBox reference test cases pass. Multi-call binary dispatches by argv[0] or subcommand.`,
    how: `The binary is a multi-call binary in the BusyBox tradition: invoke as busybox ls or symlink a name to the binary and invoke that. Each applet is a Go package under cmd/ implementing the POSIX semantics of the corresponding utility.

The WASM target uses TinyGo to produce a 2 MB binary (vs ~20 MB with the standard Go compiler). OS-dependent operations — raw sockets, procfs reads, device ioctl calls — return stubs under WASM so the build succeeds and applets degrade gracefully. The test suite runs all 387 BusyBox reference test cases against the compiled binary.`,
    features: [
      { icon: "📦", title: "57 applets, 387/387 tests", body: "ash, awk, cat, grep, find, sed, ls, ps, kill, xargs, tar, wget, and 44 more." },
      { icon: "🌐", title: "2 MB WASM target", body: "TinyGo produces a 2 MB .wasm. Run under wasmtime with no filesystem access." },
      { icon: "📦", title: "Static native binary", body: "No shared libraries, no runtime deps. Any GOARCH." },
      { icon: "🛡", title: "Sandbox-safe", body: "OS-dependent applets stub under WASM. Boundaries held." },
    ],
  },
  "proxmox-zpool-monitoring": {
    status: "stable",
    tagline: "ZFS pool metrics for Proxmox — exported to Graphite, cron only.",
    about: `A Python cron script that exports ZFS pool health, I/O, and capacity from Proxmox VE to Graphite. No daemon, no agent, no configuration database. Just a script in crontab and a Graphite endpoint.`,
    how: `The script runs zpool status for health and error counts, zpool iostat for I/O rates, and zfs list for per-dataset space usage. Metrics are formatted as Graphite plaintext (metric.path value timestamp) and sent over TCP. The metric hierarchy is zfs.hostname.pool.metric so multiple Proxmox nodes share the same Graphite instance without key collisions. Run every 5 minutes from crontab for useful time-series data.`,
    features: [
      { icon: "📊", title: "Pool health and I/O", body: "ONLINE/DEGRADED/FAULTED status, errors, capacity, read/write IOPS and bandwidth." },
      { icon: "⏰", title: "Cron-only", body: "One Python script. Add to crontab, point at Graphite. No daemon." },
      { icon: "🔌", title: "Graphite plaintext", body: "Compatible with Carbon, InfluxDB + Graphite input, and other backends." },
    ],
  },
  "gnome-thumbnailers": {
    status: "stable",
    tagline: "File thumbnails for RAW, HEIC, and 3D models in GNOME Files.",
    about: `A set of Python thumbnailer scripts that add thumbnail support to GNOME Files for RAW photos (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF, and FBX/OBJ/STL 3D models. Register with make install — no GNOME restart.`,
    how: `Each thumbnailer is a Python script that takes a source file path and a target PNG path as arguments. GNOME's thumbnailer infrastructure calls these in a bwrap sandbox automatically when it encounters a registered MIME type. The scripts handle the sandbox gracefully — the only requirement is a readable source file. If a required library is absent, the script exits cleanly and GNOME skips thumbnailing for that file type without crashing.`,
    features: [
      { icon: "📷", title: "RAW formats", body: "CR2, NEF, ARW, ORF, RW2 via rawpy. Camera raw files show previews in Nautilus." },
      { icon: "🍎", title: "HEIC/HEIF", body: "Apple's default format since iOS 11. Via Pillow's HEIF plugin." },
      { icon: "🧊", title: "3D model files", body: "FBX, OBJ, STL. Useful for a directory full of print files." },
      { icon: "🔧", title: "Drop-in install", body: "make install. No restart. Thumbnails appear immediately for new file types." },
    ],
  },
  "go-rdp": {
    status: "active",
    tagline: "Browser-based RDP client — full MS-RDPBCGR spec, Go backend, WASM frontend.",
    about: `go-rdp connects to Windows machines via RDP from any browser without a native client. Go backend implementing the full MS-RDPBCGR specification; WASM frontend for rendering. Rewritten from scratch as a reference implementation.`,
    how: `The Go backend implements RDP protocol security negotiation, capability exchange, and display update decoding, then streams JPEG-encoded frame updates to the browser over WebSocket. Keyboard and mouse events from the browser are decoded and forwarded as RDP input PDUs. The WASM frontend runs a canvas-based renderer that applies frame updates.

TinyGo compiles the rendering logic to WebAssembly, keeping the JavaScript surface minimal. The implementation targets the full MS-RDPBCGR specification rather than just the common subset — more compatible with diverse Windows configurations, but with known edge cases that partial implementations handle via workarounds.`,
    features: [
      { icon: "🌐", title: "No native client", body: "Full RDP session in a browser canvas via WebAssembly." },
      { icon: "📋", title: "Full MS-RDPBCGR spec", body: "Rewritten from scratch against the full protocol spec. Passes the reference test suite." },
      { icon: "⚙", title: "Go + WASM", body: "Go backend, TinyGo WASM frontend. Docker image for one-command deployment." },
    ],
  },
  "pve-microvm": {
    status: "active",
    tagline: "QEMU microvm machine type for Proxmox VE — KVM isolation, under 200 ms boot.",
    about: `A Debian package that patches qemu-server to add the QEMU microvm machine type to the Proxmox VE UI. microvm VMs boot in under 200 ms, use only virtio-mmio, and give full KVM hardware isolation. Designed for semi-trusted workloads. Uninstall restores original files.`,
    how: `The package patches two qemu-server files to add microvm as a selectable machine type in the Proxmox VM hardware config. A standard Proxmox VM emulates a full x86 PC with PCI bus, legacy interrupt controllers, and BIOS firmware. A microvm skips all of that — it boots via direct kernel loading and communicates with the host through virtio-mmio memory-mapped I/O, which is faster and has a much smaller attack surface.

The net result is KVM-grade hardware isolation at LXC-comparable boot times. Useful for running coding agents and other semi-trusted workloads where LXC namespace isolation isn't enough but full VM overhead is impractical. This is currently the only Proxmox integration for the QEMU microvm machine type.`,
    features: [
      { icon: "⚡", title: "Under 200 ms boot", body: "No emulated PCI bus, no BIOS. virtio-mmio + direct kernel load." },
      { icon: "🛡", title: "Full KVM isolation", body: "Own kernel per VM. No shared kernel, no namespace breakout." },
      { icon: "🔌", title: "Proxmox UI integration", body: "Machine type option in the Proxmox web UI. Managed like any other VM." },
      { icon: "↩", title: "Fully reversible", body: "dpkg -r pve-microvm restores original qemu-server files." },
    ],
  },
  "homekit-steam-user-switcher": {
    status: "stable",
    tagline: "Switch Steam accounts on a shared gaming PC via HomeKit.",
    about: `A HAP-python service that exposes each Steam account as a HomeKit Switch. Tap in the Home app, tell Siri, or use an automation. Uses Steam's local --login flags; no Steam API, no Valve servers.`,
    how: `HAP-python advertises a HomeKit bridge on the local network. Each configured Steam account is a Switch accessory. When you flip a switch, the on_set_value handler runs subprocess with Steam's --login flag to switch accounts. Steam's --login and --logout flags are a documented local interface — no Web API, no OAuth, no network calls to Valve.

The service reads the current active account from the Steam registry file on startup and sets accessory states accordingly, so the Home app reflects which account is logged in when you open it. Runs as a systemd service on the gaming machine.`,
    features: [
      { icon: "🏠", title: "HomeKit native", body: "Each Steam account is a Switch in the Home app. Siri, Shortcuts, automations all work." },
      { icon: "🎮", title: "No Steam API", body: "Steam --login flag locally. No API key, no OAuth, no third-party services." },
      { icon: "🐧", title: "macOS and Linux", body: "HAP-python accessory server. Runs as systemd service on the gaming machine." },
    ],
  },
  "zmk-config-totem": {
    status: "stable",
    tagline: "ZMK keymap for the Totem — home row mods, combos, ZMK Studio support.",
    about: `Production-ready ZMK config for the 34-key Totem split keyboard. ZMK Studio support for GUI keymap editing without reflashing. Home row mods with per-key timing tuned over months of daily use. More forks than stars — used as a template.`,
    how: `ZMK firmware is configured via a Kconfig file, device tree overlay, and keymap file. ZMK Studio extends this with a runtime configuration protocol that lets a web app read and write the keymap over USB without a firmware rebuild.

The home row mod timing was tuned over months: long enough to avoid false triggers during fast typing, short enough to not introduce noticeable latency. Combo timing is set to work reliably on the Totem's aggressive column stagger. The 7:2 forks-to-stars ratio suggests most people use this config as a starting point rather than running it as-is — which is exactly the intent.`,
    features: [
      { icon: "🖥", title: "ZMK Studio", body: "GUI keymap editing over USB without reflashing firmware." },
      { icon: "✋", title: "Tuned home row mods", body: "Per-key timing from months of daily use. Reliable without false triggers." },
      { icon: "⌨", title: "34-key layout", body: "Combos for all punctuation. No dedicated symbol layer needed." },
      { icon: "🍴", title: "Used as a template", body: "7:2 forks-to-stars ratio tells the story." },
    ],
  },
  "ghostty-web": {
    status: "active",
    tagline: "Ghostty terminal sessions in a browser with xterm.js API compatibility.",
    about: `ghostty-web runs Ghostty in server mode, proxies sessions to a browser via WebSocket, and implements an xterm.js-compatible API layer. Shares go-te with webterm and go-rdp for the terminal state engine.`,
    how: `Ghostty runs in server mode connected to a Unix socket. The Go server proxies these connections to WebSocket, translating between Ghostty's wire protocol and WebSocket framing. The TypeScript frontend implements the xterm.js ITerminalAddon interface so existing xterm.js extensions work without modification against a ghostty-web backend.

go-te maintains server-side terminal state, enabling features that require knowing the current screen contents: dashboard tile previews, copy-on-select, title tracking. The architecture is deliberately shared with webterm and go-rdp so go-te improvements benefit all three.`,
    features: [
      { icon: "⚡", title: "Ghostty in the browser", body: "Ghostty runs server-side. Browser gets output over WebSocket — Ghostty's speed and correctness, any device." },
      { icon: "🔌", title: "xterm.js compatibility", body: "Implements the xterm.js ITerminalAddon API. Existing xterm.js tooling works unchanged." },
      { icon: "🔗", title: "Shared terminal engine", body: "go-te powers webterm, go-rdp, and ghostty-web from a single library." },
    ],
  },
  "go-te": {
    status: "active",
    tagline: "VT100/VT520 terminal emulator library for Go — pyte-faithful, SVG export, 100% ESCTest2.",
    about: `go-te is a faithful Go port of the Python pyte terminal emulator library, validated against pyte's full test suite and ESCTest2 conformance tests. Multiple screen variants: base, diff (dirty tracking), history (scrollback), debug. Used in webterm, go-rdp, and ghostty-web.`,
    how: `go-te follows pyte's architecture: a Stream (escape sequence parser) feeds events to a Screen (state machine). The port reproduces pyte's exact semantics in Go, not just its behaviour — edge cases that pyte handles in a specific way are reproduced identically. Additional coverage from ESCTest2 validates comprehensive CSI/OSC/DSR behaviour.

The Screen type has variants: a base screen for simple state queries, a DiffScreen that tracks dirty cells (used for efficient WebSocket updates in webterm), a HistoryScreen with scrollback buffer, and a DebugScreen that logs every event. SVG export lets you snapshot any screen state as a vector image for screenshots or test reports.`,
    features: [
      { icon: "🔣", title: "Pyte-faithful, VT100–VT520", body: "1:1 pyte semantics. ESCTest2 conformance. Alternate buffer, cursor save/restore." },
      { icon: "🖼", title: "SVG export", body: "Snapshot screen state as SVG for screenshots and test reporting." },
      { icon: "📦", title: "Pure Go, zero CGO", body: "go get github.com/rcarmo/go-te. Any GOARCH. No system library deps." },
      { icon: "🔗", title: "Powers webterm, go-rdp, ghostty-web", body: "One terminal state engine for the whole Go terminal family." },
    ],
  },
  gotel: {
    status: "active",
    tagline: "Self-contained OTel collector with SQLite storage and built-in trace viewer.",
    about: `gotel is a single-binary OpenTelemetry Collector that stores traces and metrics in SQLite and includes a built-in web UI. OTLP gRPC on 4317, OTLP HTTP on 4318, query API on 3200, trace viewer on 3000. No external storage, no Jaeger setup.`,
    how: `gotel is a complete OpenTelemetry Collector pipeline in one binary. It accepts traces and metrics via standard OTLP endpoints, runs them through a memory_limiter and batch processor, and writes to a local SQLite database. A built-in query server exposes the trace data as a REST API; a web trace explorer provides a Jaeger-like UI.

For local development and small homelab deployments, this replaces Collector + Jaeger/Tempo + Grafana with one binary and a SQLite file. An embedded default config works immediately; drop a config.yaml alongside the binary to switch exporters, add processors, or point at a remote Prometheus endpoint.`,
    features: [
      { icon: "📦", title: "Single binary", body: "go build -o gotel . and it runs. Embedded default config, works immediately." },
      { icon: "🗄", title: "SQLite storage", body: "Traces and metrics in a local file. No external storage dependency." },
      { icon: "🌐", title: "Built-in trace viewer", body: "Jaeger-like UI at :3000. No Grafana setup needed for local development." },
      { icon: "📊", title: "Standard OTLP endpoints", body: "gRPC on 4317, HTTP on 4318. Drop-in for the official OTel Collector for small deployments." },
    ],
  },
};

// ── CSS (reused from previous version with how-section additions) ──────────
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #08090a; --card: #111214; --border: #1e2024; --border2: #2a2d33;
  --text: #f0f2f5; --muted: #7a8190; --dim: #464c5a;
  --accent: #4f8ef7; --accent-glow: rgba(79,142,247,.12);
  --green: #34d399; --amber: #fbbf24;
  --radius: 10px; --radius-lg: 16px;
  --gap: clamp(1rem, 4vw, 2rem); --max: 960px;
}
@media (prefers-color-scheme: light) {
  :root {
    --bg: #f5f7fb; --card: #fff; --border: #e2e6ed; --border2: #ced3db;
    --text: #0f1319; --muted: #5c6370; --dim: #9ca3af;
    --accent: #1e6ef4; --accent-glow: rgba(30,110,244,.08);
    --green: #10b981; --amber: #d97706;
  }
}
html { scroll-behavior: smooth; }
body { background:var(--bg); color:var(--text); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Inter",Helvetica,Arial,sans-serif; font-size:15px; line-height:1.65; -webkit-font-smoothing:antialiased; }
a { color:var(--accent); text-decoration:none; } a:hover { text-decoration:underline; }
code { font-family:ui-monospace,"SF Mono","Fira Code",Menlo,Consolas,monospace; font-size:.875em; background:var(--border); padding:.1em .35em; border-radius:4px; }
.topbar { position:sticky; top:0; z-index:100; background:var(--bg); border-bottom:1px solid var(--border); backdrop-filter:blur(12px); }
.topbar-inner { max-width:var(--max); margin:0 auto; padding:.7rem var(--gap); display:flex; align-items:center; gap:.6rem; font-size:.8rem; color:var(--muted); }
.topbar-inner a { color:var(--muted); font-weight:500; } .topbar-inner a:hover { color:var(--text); text-decoration:none; }
.sep { color:var(--border2); } .current { color:var(--text); font-weight:600; }
.hero-wrap { max-width:var(--max); margin:0 auto; padding:3rem var(--gap) 2rem; }
.hero-inner { display:grid; grid-template-columns:1fr auto; gap:2rem; align-items:start; }
@media(max-width:560px){ .hero-inner { grid-template-columns:1fr; } .hero-logo { display:none; } }
.hero-logo img { width:88px; height:88px; border-radius:20px; box-shadow:0 0 0 1px var(--border2), 0 12px 32px rgba(0,0,0,.5); }
.hero h1 { font-size:clamp(1.8rem,5vw,2.8rem); font-weight:700; letter-spacing:-.03em; line-height:1.1; }
.hero h1 a { color:var(--text); } .hero h1 a:hover { color:var(--accent); text-decoration:none; }
.tagline { font-size:clamp(1rem,2.5vw,1.2rem); color:var(--muted); margin:.6rem 0 1.4rem; max-width:580px; line-height:1.5; }
.meta { display:flex; flex-wrap:wrap; align-items:center; gap:.6rem 1.1rem; font-size:.82rem; color:var(--muted); margin-bottom:1.25rem; }
.meta-stars { color:var(--amber); font-weight:700; font-size:.9rem; }
.dot { width:9px; height:9px; border-radius:50%; display:inline-block; vertical-align:middle; margin-right:3px; flex-shrink:0; }
.dot-TypeScript{background:#3178c6} .dot-Python{background:#3572A5} .dot-Go{background:#00ADD8}
.dot-Swift{background:#F05138} .dot-C{background:#555} .dot-Cpp{background:#f34b7d}
.dot-Dockerfile{background:#384d54} .dot-Shell{background:#89e051} .dot-misc{background:#7a8190}
.badge { display:inline-flex; align-items:center; padding:.2rem .6rem; border-radius:2em; font-size:.7rem; font-weight:700; letter-spacing:.03em; }
.badge-active   { background:rgba(52,211,153,.1);  color:#34d399; border:1px solid rgba(52,211,153,.2); }
.badge-stable   { background:rgba(79,142,247,.1);  color:#4f8ef7; border:1px solid rgba(79,142,247,.2); }
.badge-maintained{background:rgba(167,139,250,.1);color:#a78bfa; border:1px solid rgba(167,139,250,.2); }
.badge-archived { background:rgba(251,191,36,.1);  color:#fbbf24; border:1px solid rgba(251,191,36,.2); }
@media(prefers-color-scheme:light){
  .badge-active{background:#d1fae5;color:#065f46;border-color:#6ee7b7}
  .badge-stable{background:#dbeafe;color:#1d4ed8;border-color:#93c5fd}
  .badge-maintained{background:#ede9fe;color:#5b21b6;border-color:#c4b5fd}
  .badge-archived{background:#fef3c7;color:#92400e;border-color:#fcd34d}
}
.topics { display:flex; flex-wrap:wrap; gap:.35rem; margin-bottom:1.25rem; }
.topic { font-size:.72rem; background:var(--card); border:1px solid var(--border2); color:var(--muted); padding:.15rem .55rem; border-radius:2em; }
.cta { display:flex; flex-wrap:wrap; gap:.6rem; }
.btn { display:inline-flex; align-items:center; gap:.4rem; padding:.5rem 1.1rem; border-radius:var(--radius); font-size:.85rem; font-weight:500; transition:all .15s; }
.btn-p { background:var(--accent); color:#fff; } .btn-p:hover { filter:brightness(1.1); text-decoration:none; }
.btn-g { background:transparent; color:var(--text); border:1px solid var(--border2); } .btn-g:hover { border-color:var(--accent); color:var(--accent); text-decoration:none; }
.stats-wrap { max-width:var(--max); margin:0 auto; padding:0 var(--gap) 2rem; }
.stats { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; }
.stat { background:var(--card); padding:1rem 1.2rem; }
.stat-l { font-size:.68rem; text-transform:uppercase; letter-spacing:.08em; color:var(--dim); margin-bottom:.2rem; }
.stat-v { font-size:1.45rem; font-weight:700; letter-spacing:-.02em; }
.stat-sub { font-size:.7rem; color:var(--muted); margin-top:.1rem; }
.section { max-width:var(--max); margin:0 auto; padding:2.5rem var(--gap); border-top:1px solid var(--border); }
.eyebrow { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--accent); margin-bottom:.4rem; }
.section-title { font-size:1.35rem; font-weight:700; letter-spacing:-.02em; margin-bottom:1.25rem; }
/* About */
.about { font-size:1rem; line-height:1.8; color:var(--muted); max-width:700px; }
/* How it works — multi-paragraph prose */
.how { display:flex; flex-direction:column; gap:1.1rem; max-width:700px; }
.how p { font-size:.95rem; line-height:1.8; color:var(--muted); }
/* Feature grid */
.features { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; }
.feat { background:var(--card); padding:1.4rem; display:flex; flex-direction:column; gap:.45rem; }
.feat-icon { font-size:1.3rem; line-height:1; }
.feat-title { font-size:.88rem; font-weight:600; color:var(--text); }
.feat-body { font-size:.82rem; color:var(--muted); line-height:1.6; }
/* Diagram */
.diagram-wrap { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; padding:1.5rem; }
.diagram-wrap svg { width:100%; height:auto; display:block; }
/* Releases — dynamically loaded */
#releases-list { display:flex; flex-direction:column; gap:.5rem; }
.rel { display:grid; grid-template-columns:7rem 1fr; gap:1rem; padding:.7rem 0; border-bottom:1px solid var(--border); font-size:.875rem; align-items:start; }
.rel:last-child { border-bottom:none; }
.rel-date { color:var(--dim); font-size:.78rem; white-space:nowrap; padding-top:.1rem; }
.rel-right { display:flex; flex-direction:column; gap:.25rem; }
.rel-tag { font-family:ui-monospace,monospace; font-size:.75rem; font-weight:700; color:var(--accent); background:var(--accent-glow); padding:.1rem .4rem; border-radius:4px; display:inline-block; }
.rel-name { font-weight:500; color:var(--text); font-size:.88rem; }
.rel-body { font-size:.8rem; color:var(--muted); line-height:1.5; }
.rel-loading { color:var(--dim); font-size:.85rem; }
/* Posts */
.posts { display:flex; flex-direction:column; gap:.45rem; }
.post { display:grid; grid-template-columns:6rem 1fr; gap:.75rem; font-size:.875rem; }
.post-date { color:var(--dim); font-size:.75rem; padding-top:.12rem; white-space:nowrap; }
footer { max-width:var(--max); margin:0 auto; padding:1.75rem var(--gap); border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; }
.foot-l { font-size:.78rem; color:var(--dim); }
.foot-r { display:flex; gap:1.5rem; font-size:.78rem; }
.foot-r a { color:var(--muted); } .foot-r a:hover { color:var(--text); }
`;

function ghSvg() {
  return `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

function esc(s: string) { return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function fmtDate(iso: string): string {
  // "2026-04-19T13:52:46Z" → "19 Apr 2026"
  try {
    return new Date(iso).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  } catch { return iso.slice(0,10); }
}

function releasesScript(fullName: string): string {
  return `<script>
(function() {
  var el = document.getElementById('releases-list');
  if (!el) return;
  fetch('https://api.github.com/repos/${fullName}/releases?per_page=20')
    .then(function(r){ return r.ok ? r.json() : []; })
    .then(function(releases) {
      if (!releases || !releases.length) { el.innerHTML = '<p class="rel-loading">No releases yet.</p>'; return; }
      // Sort by published_at descending (API already does this, but be explicit)
      releases.sort(function(a,b){ return new Date(b.published_at)-new Date(a.published_at); });
      el.innerHTML = releases.slice(0,12).map(function(r) {
        var d = new Date(r.published_at);
        var dateFmt = d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
        var body = (r.body||'').trim().split('\\n')[0].slice(0,160);
        return '<div class="rel">'
          + '<span class="rel-date">' + dateFmt + '</span>'
          + '<div class="rel-right">'
          + '<div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap">'
          + '<span class="rel-tag">' + r.tag_name + '</span>'
          + (r.name && r.name !== r.tag_name ? '<span class="rel-name">' + r.name.replace(/</g,'&lt;') + '</span>' : '')
          + '</div>'
          + (body ? '<div class="rel-body">' + body.replace(/</g,'&lt;') + '</div>' : '')
          + '</div></div>';
      }).join('');
    })
    .catch(function() { el.innerHTML = '<p class="rel-loading">Could not load releases.</p>'; });
})();
</script>`;
}

function page(d: Dossier, c: Content): string {
  const m = d.meta;
  const ghUrl = `https://github.com/${m.full_name}`;
  const displayName = m.full_name.split("/")[0] !== "rcarmo" ? m.full_name : m.name;
  const langDot = "dot-" + ({"C++":"Cpp"}[m.language] ?? m.language ?? "misc");
  const posts = POSTS[d.id] ?? [];

  const logoHtml = d.logo_data_uri
    ? `<div class="hero-logo"><img src="${d.logo_data_uri}" alt="${esc(displayName)} logo" loading="lazy"></div>` : "";

  const howParas = c.how.trim().split(/\n\n+/).map(p => `<p>${esc(p.trim())}</p>`).join("\n");

  const diagramHtml = d.diagram_inline ? `
  <div class="section">
    <div class="eyebrow">Architecture</div>
    <div class="section-title">System diagram</div>
    <div class="diagram-wrap">${d.diagram_inline}</div>
  </div>` : "";

  const postsHtml = posts.length > 0 ? `
  <div class="section">
    <div class="eyebrow">Writing</div>
    <div class="section-title">On taoofmac.com</div>
    <div class="posts">
      ${posts.map(p => `
      <div class="post">
        <span class="post-date">${p.date}</span>
        <a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a>
      </div>`).join("")}
    </div>
  </div>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
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
  <div class="hero-wrap">
    <div class="hero-inner">
      <div class="hero">
        <h1><a href="${ghUrl}" target="_blank" rel="noopener">${displayName}</a></h1>
        <p class="tagline">${esc(c.tagline)}</p>
        <div class="meta">
          <span class="meta-stars">★ ${(m.stars ?? 0).toLocaleString()}</span>
          ${(m.forks ?? 0) > 0 ? `<span>⑂ ${m.forks}</span>` : ""}
          <span><span class="dot ${langDot}"></span>${esc(m.language ?? "misc")}</span>
          <span class="badge badge-${c.status}">${c.status}</span>
        </div>
        ${(m.topics?.length ?? 0) > 0 ? `<div class="topics">${m.topics.map(t => `<span class="topic">${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="cta">
          <a class="btn btn-p" href="${ghUrl}" target="_blank" rel="noopener">${ghSvg()} GitHub</a>
          ${m.homepage ? `<a class="btn btn-g" href="${m.homepage}" target="_blank" rel="noopener">🌐 Homepage</a>` : ""}
        </div>
      </div>
      ${logoHtml}
    </div>
  </div>

  <div class="stats-wrap">
    <div class="stats">
      <div class="stat"><div class="stat-l">Stars</div><div class="stat-v">${(m.stars ?? 0).toLocaleString()}</div><div class="stat-sub">on GitHub</div></div>
      <div class="stat"><div class="stat-l">Forks</div><div class="stat-v">${m.forks ?? 0}</div></div>
      <div class="stat"><div class="stat-l">Language</div><div class="stat-v" style="font-size:.95rem;padding-top:.4rem"><span class="dot ${langDot}"></span>${esc(m.language ?? "—")}</div></div>
      <div class="stat"><div class="stat-l">Created</div><div class="stat-v" style="font-size:1.1rem;padding-top:.3rem">${m.created_at?.slice(0,4) ?? "?"}</div></div>
      <div class="stat"><div class="stat-l">Last push</div><div class="stat-v" style="font-size:.9rem;padding-top:.35rem">${m.pushed_at?.slice(0,7) ?? "?"}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="eyebrow">Overview</div>
    <p class="about">${esc(c.about.trim())}</p>
  </div>

  <div class="section">
    <div class="eyebrow">How it works</div>
    <div class="section-title">Under the hood</div>
    <div class="how">${howParas}</div>
  </div>

  <div class="section">
    <div class="eyebrow">Capabilities</div>
    <div class="section-title">What it does</div>
    <div class="features">
      ${c.features.map(f => `<div class="feat"><div class="feat-icon">${f.icon}</div><div class="feat-title">${esc(f.title)}</div><div class="feat-body">${esc(f.body)}</div></div>`).join("")}
    </div>
  </div>

  ${diagramHtml}

  <div class="section">
    <div class="eyebrow">History</div>
    <div class="section-title">Releases</div>
    <div id="releases-list"><p class="rel-loading">Loading releases…</p></div>
  </div>

  ${postsHtml}
</main>
<footer>
  <div class="foot-l">Last indexed ${m.pushed_at?.slice(0,10) ?? "?"}</div>
  <div class="foot-r">
    <a href="/">← All projects</a>
    <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener">GitHub</a>
  </div>
</footer>
${releasesScript(m.full_name)}
</body>
</html>`;
}


// ── Build ──────────────────────────────────────────────────────────────────
let built = 0, skipped = 0;
for (const f of (readdirSync(DATA) as string[]).filter(f => f.endsWith(".dossier.json"))) {
  const proj = f.replace(".dossier.json","");
  const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
  const c = C[proj];
  if (!c) { console.log(`  SKIP ${proj}`); skipped++; continue; }
  writeFileSync(join(OUT, `${proj}.html`), page(d, c));
  console.log(`  ✓ ${proj}`);
  built++;
}
console.log(`\nBuilt ${built}, skipped ${skipped}`);
