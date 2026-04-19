#!/usr/bin/env bun
/**
 * Build rich single-page project presentations from dossier data.
 * Logos are inlined as base64 data URIs; architecture diagrams are inline SVG.
 * No commit noise — only releases and verified posts are shown.
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
                  language: string; created_at: string; pushed_at: string; topics: string[] };
type Dossier  = { id: string; meta: Meta; readme: string; commits: Commit[];
                  releases: Release[]; posts: Post[];
                  logo_data_uri: string | null; diagram_inline: string | null };

// ── Verified posts ────────────────────────────────────────────────────────
const POSTS: Record<string, Post[]> = JSON.parse(
  readFileSync(join(DATA, "verified-posts.json"), "utf-8")
);

// ── Content (written from the actual READMEs) ─────────────────────────────
type Feature = { icon: string; title: string; body: string };
type Content = {
  tagline:     string;
  about:       string;
  features:    Feature[];
  status:      "active" | "stable" | "maintained" | "archived";
};

const C: Record<string, Content> = {
  piku: {
    status: "stable",
    tagline: "git push deployments to your own server — no Docker, no ops.",
    about: `piku is a single Python script installed as a git post-receive hook. Push your code, piku reads the Procfile, installs dependencies into a per-app virtualenv/gopath/node_modules, starts your workers under uwsgi, and wires them up behind nginx with optional Let's Encrypt TLS. The whole runtime fits in ~1500 lines of readable Python and runs on a first-generation Raspberry Pi.`,
    features: [
      { icon: "⌥", title: "Heroku-style workflow", body: "git remote add piku piku@yourserver:appname. git push piku main. That's the entire deploy flow." },
      { icon: "🌐", title: "Python, Node, Go, Clojure, Ruby, Java, PHP, static", body: "If it runs in a shell it runs in piku. Language runtimes are detected from lock files and Procfiles." },
      { icon: "🔒", title: "Automatic TLS", body: "Let's Encrypt certificates via ACME, virtual host routing, zero-downtime deploys, and static file serving — all configured through a single ENV file." },
      { icon: "⬆", title: "Live scaling and config", body: "ps:scale web=3 and config:set KEY=val take effect instantly without a redeploy or restart." },
      { icon: "🐧", title: "Any POSIX host", body: "Runs on Debian, Ubuntu, Alpine, FreeBSD, WSL. Tested on ARM and Intel from a $35 Raspberry Pi to cloud VMs. Stable since 2016, maintained by the piku org." },
    ],
  },
  piclaw: {
    status: "active",
    tagline: "A self-hosted AI agent workspace — streaming UI, persistent state, built-in tools.",
    about: `PiClaw packages the Pi Coding Agent runtime into a Docker container with a streaming web UI, multi-provider LLM support, SQLite-backed state, and no CDN dependencies. Built-in tools include a Ghostty terminal, code editor, Office/PDF/image viewers, draw.io, kanban boards, VNC client, browser automation, and MCP access — everything needed for practical daily agent work in one container.`,
    features: [
      { icon: "💬", title: "Streaming chat with branches", body: "Real-time Markdown, KaTeX, Mermaid, Adaptive Cards. Branch conversations with /btw, queue follow-ups, steer mid-generation." },
      { icon: "🗂", title: "Full workspace tooling", body: "Sidebar file browser with drag-upload, in-browser code editor (CodeMirror 6), Office/CSV/PDF/image viewers, draw.io, kanban boards, VNC client — no separate apps." },
      { icon: "🔌", title: "Any LLM", body: "Anthropic, OpenAI, Azure, Gemini, Ollama, or any OpenAI-compatible endpoint. Configurable per session — no restart needed." },
      { icon: "🧠", title: "Persistent state", body: "SQLite-backed message history, media, tasks, token usage, and encrypted keychain. Dream memory consolidation keeps long sessions coherent." },
      { icon: "🛠", title: "Infrastructure tools", body: "First-class SSH, Proxmox, and Portainer profiles. CDP browser automation. Sharp image processing. MCP server access via pi-mcp-adapter. Scheduled tasks." },
      { icon: "📦", title: "Single container, no CDN", body: "docker run -p 8080:8080 -v ./workspace:/workspace ghcr.io/rcarmo/piclaw:latest and you're live. Everything ships in the image." },
    ],
  },
  vibes: {
    status: "active",
    tagline: "Mobile-first web UI for AI agents — ACP and Pi over RPC.",
    about: `Vibes is a lightweight Python web app for talking to AI coding agents from a phone. It supports the Agent Communication Protocol (copilot --acp, codex-acp) and Pi agents via RPC. The server is a single Python file using aiohttp with server-sent events for streaming. The UI is plain HTML/CSS — no build step, no framework. Fork it and make it yours in an afternoon.`,
    features: [
      { icon: "📱", title: "Phone-first layout", body: "Designed on a phone, tested on iOS and Android before desktop. Layout, scroll, and input handling all work correctly on a small screen." },
      { icon: "⚡", title: "ACP + Pi RPC", body: "Connects to GitHub Copilot CLI, OpenAI Codex, and Pi agents. Protocol adapters are pluggable — add a new backend in one file." },
      { icon: "🚿", title: "SSE streaming", body: "Live token streaming via server-sent events. No polling, no loading spinners, no page refreshes." },
      { icon: "🔩", title: "Zero build step", body: "One Python file for the server, one HTML file for the UI. Clone and run. PiClaw and Vibes share the same web UI codebase." },
    ],
  },
  webterm: {
    status: "active",
    tagline: "A Go web terminal with multi-session dashboard mode for AI agent workflows.",
    about: `webterm serves PTY sessions over HTTP/WebSocket with a dashboard view that tiles multiple active terminals in a single browser tab — built specifically for monitoring several AI coding agents in parallel. The frontend uses a WebAssembly terminal renderer for correct VT100/xterm handling. A sticky mobile keybar (Esc, Ctrl, Shift, arrows) makes it usable from a phone for real work. Go port of an earlier Python implementation.`,
    features: [
      { icon: "🖥", title: "Multi-session dashboard", body: "Tile N agent terminals side-by-side in one browser tab. Watch them run in parallel without switching windows or SSH sessions." },
      { icon: "⚡", title: "WASM renderer", body: "Terminal rendering via WebAssembly — correct xterm/VT100 escape handling, low overhead, no heavy JS framework dependency." },
      { icon: "📱", title: "Mobile keybar", body: "Draggable sticky keybar with Esc, Ctrl, Shift, Tab, and arrow keys. Sticky combos for Ctrl+C, Ctrl+Z, and common sequences." },
      { icon: "🔌", title: "Library-first", body: "Designed to be imported as a Go library and embedded in other services. Powers the terminal layer in agentbox, piclaw, and ghostty-web." },
    ],
  },
  agentbox: {
    status: "active",
    tagline: "A Docker sandbox with preinstalled coding agents and optional Docker-in-Docker.",
    about: `Agentbox provides a Debian Trixie container with preinstalled coding agents (Copilot CLI, Codex, Pi), development tools, Homebrew, APT, uv, and Bun. Services — Docker daemon, SSH, RDP — are disabled by default and enabled via environment variables. A GUI image adds XFCE, XRDP, and VS Code. A workspace skeleton with SKILL.md templates is included for initialising new projects.`,
    features: [
      { icon: "🤖", title: "Agents preinstalled", body: "Copilot CLI, Codex, and Pi coding agent are ready to use. toad, opencode, gemini, and vibe are installable via make -C ~ targets." },
      { icon: "🔒", title: "Opt-in services", body: "Docker, SSH, and RDP are all off by default. Enable only what you need with ENABLE_DOCKER=true, ENABLE_SSH=true, or ENABLE_RDP=true." },
      { icon: "🖥", title: "CLI and GUI images", body: "The :latest tag is headless. :gui adds XFCE, XRDP, and VS Code — full desktop in a container for visual agent tasks." },
      { icon: "📘", title: "Workspace skeleton", body: "make init-workspace copies a project scaffold with SKILL.md templates into your /workspace without overwriting existing files." },
      { icon: "🐳", title: "Docker-in-Docker", body: "When running privileged, the Docker daemon starts inside the container. Agents can build and run containers without touching the host." },
    ],
  },
  PhotosExport: {
    status: "stable",
    tagline: "Export your complete Apple Photos library — originals, edits, Live Photos, metadata.",
    about: `PhotosExport is a macOS command-line tool that exports every asset from an Apple Photos library using the PhotoKit framework — originals, edited variants, Live Photo video pairs, burst frames, adjustment data, brush strokes. It writes a deterministic YYYY/MM folder hierarchy with collision-safe timestamp names and a full JSON manifest of album membership. No private APIs, no AppleScript.`,
    features: [
      { icon: "📸", title: "Every resource type", body: "Exports PHAssetResource for originals, FullSizeRender edits, Live Photo video, burst frames, adjustment data, and brush stroke retouches — whatever Photos has stored." },
      { icon: "📂", title: "Deterministic naming", body: "YYYYMMDDHHMMSSx.ext — timestamp from creationDate, single lowercase letter suffix only when needed for collision avoidance. Stable across re-runs." },
      { icon: "🗂", title: "Full album manifest", body: "JSON sidecar listing every album, smart album, and folder and the assets they contain. Preserves the library structure, not just the files." },
      { icon: "📋", title: "Error log included", body: "Export errors are written to export_errors.log in the output directory. Nothing fails silently." },
    ],
  },
  drawterm: {
    status: "stable",
    tagline: "Plan 9 drawterm for modern macOS — Retina scaling, Preferences dialog, Metal rendering.",
    about: `This fork updates drawterm for current macOS while preserving Unix, Windows, and X11 support. The Cocoa backend gains HiDPI-aware scaling (logical vs device pixels, fractional scale slider, raw-pixel mode), a Preferences dialog, Metal-accelerated incremental redraws, a macOS pasteboard bridge for text snarf, a Connect dialog that persists credentials, and proper Command key mapping to mod4 for rio bindings. Plus an icon.`,
    features: [
      { icon: "🔍", title: "Retina and HiDPI", body: "Logical vs device pixel scaling, fractional scale slider, and raw-pixel mode (scale 0). The screen is legible on a 5K display." },
      { icon: "⚡", title: "Metal incremental redraws", body: "Full-surface invalidation only on scale/resize events. Normal updates flush only the dirty region — no more full-screen flicker." },
      { icon: "⌨", title: "macOS keyboard and clipboard", body: "Command maps to mod4 for rio/riow bindings. macOS pasteboard bridge for text snarf. Menu shortcuts for Full Screen, Hide, Connect, and Quit." },
      { icon: "💾", title: "Connect dialog", body: "Cocoa Connect dialog to set CPU/auth hosts, user, and optional saved password. Credentials persist between launches in user defaults." },
    ],
  },
  macemu: {
    status: "maintained",
    tagline: "Basilisk II and SheepShaver for Raspberry Pi — SDL2, no X11, pre-built .deb packages.",
    about: `This fork of the Basilisk II (68k Mac) and SheepShaver (PowerPC Mac) emulators targets Raspberry Pi with SDL2 framebuffer/KMS rendering — no X11 or desktop required. Pre-built .deb packages for arm64 are available in releases. Build scripts use an optimised SDL2 build that runs on the Pi's bare console, making it practical to run classic Mac software on a headless Raspberry Pi.`,
    features: [
      { icon: "🥧", title: "Raspberry Pi optimised", body: "SDL2 built with framebuffer/KMS, no OpenGL, no X11. Runs on a headless Pi Zero through Pi 5 — no desktop environment needed." },
      { icon: "📦", title: "Pre-built packages", body: "arm64 .deb packages available from GitHub Releases. dpkg -i and you're done. Build from source instructions are included for other targets." },
      { icon: "💻", title: "68k and PowerPC", body: "Basilisk II runs System 6–8 on 68k. SheepShaver runs Mac OS 8.6–9.0.4 on PowerPC. Both emulators share the same build system." },
      { icon: "🖥", title: "Direct framebuffer access", body: "SDL2 framebuffer backend writes directly to the display buffer — lower latency and less overhead than running through X11 or a compositor." },
    ],
  },
  "ground-init": {
    status: "active",
    tagline: "Idempotent local machine bootstrap — like cloud-init but for bare metal.",
    about: `ground-init is a Python script that reads a YAML config and applies a sequence of declarative steps to a fresh Linux install: install packages, create users, write files, enable services. Each step reports whether it changed anything. No Ansible, no Chef, no pip install — just Python 3 stdlib. Ships with sample configs for Ubuntu, Debian, and Fedora Silverblue (rpm-ostree).`,
    features: [
      { icon: "📄", title: "YAML-driven, idempotent", body: "Declare the desired state. Run it once to set up, run it again to verify. Every step reports: changed, skipped, or failed." },
      { icon: "🐧", title: "Ubuntu, Debian, Fedora Silverblue", body: "Supports apt and rpm-ostree package managers. Sample configs for common setups are included as starting points." },
      { icon: "📦", title: "Zero dependencies", body: "Pure Python 3 standard library. No pip install, no virtualenv. Works on a fresh OS install before any package manager is configured." },
    ],
  },
  "azure-stable-diffusion": {
    status: "stable",
    tagline: "One-command Stable Diffusion on Azure GPU spot instances.",
    about: `Built in September 2022 when Stable Diffusion first dropped. A Makefile wrapping Azure Bicep provisions an NC-series GPU spot VM, installs CUDA and AUTOMATIC1111 WebUI, and exposes it via SSH tunnel. make deploy, make open, make destroy. Spot pricing keeps it under $0.10/hour for an NC6s_v3. Models and outputs live on an attached data disk that survives spot interruptions.`,
    features: [
      { icon: "⚡", title: "make deploy / make open / make destroy", body: "Three commands. Eight minutes from nothing to AUTOMATIC1111 WebUI. Zero to teardown is two minutes." },
      { icon: "💰", title: "Spot instance pricing", body: "NC6s_v3 spot: typically under $0.10/hour. Batch 200 images for a few dollars, then destroy the VM." },
      { icon: "💾", title: "Persistent model storage", body: "Models and outputs live on an attached data disk — survive spot preemptions and make destroy / make deploy cycles." },
    ],
  },
  "feed-summarizer": {
    status: "active",
    tagline: "LLM-powered RSS digest — runs on a Raspberry Pi, powers feeds.carmo.io.",
    about: `A cron-job RSS/Atom summarizer. It fetches feeds, extracts full article text with trafilatura (not just the RSS description snippet), sends batched prompts to a local Ollama instance or a cloud LLM, and writes a static HTML digest. No daemon, no database, no message queue. The nightly output is what you see at feeds.carmo.io.`,
    features: [
      { icon: "📰", title: "Full article extraction", body: "trafilatura extracts the actual article body from the linked page, not just the RSS description. Summaries reflect what the article actually says." },
      { icon: "🤖", title: "Local or cloud LLM", body: "Ollama for local inference (tested on a Raspberry Pi 4 with a quantised model) or any OpenAI-compatible API. One env var to switch." },
      { icon: "⏰", title: "Cron-friendly", body: "A single Python script. No daemon, no persistent process. Add it to crontab and forget it." },
    ],
  },
  umcp: {
    status: "active",
    tagline: "A micro MCP server — zero deps, decorator-based, stdio only.",
    about: `Every MCP framework I found required three layers of abstraction. umcp is a single-file implementation: register tools with a decorator, the server handles the JSON-RPC protocol, you write plain Python functions. Zero external dependencies. Both asyncio and synchronous variants in the same package. Works with Claude Desktop, Cursor, and any other MCP client over stdio.`,
    features: [
      { icon: "🪶", title: "Zero external dependencies", body: "Pure Python 3 stdlib. Copy one file, import it, add decorators. Works before you've even set up a virtualenv." },
      { icon: "⚡", title: "Async and sync", body: "@server.tool works on both async def and plain def functions. Use whichever fits your existing code with no architectural changes." },
      { icon: "🎯", title: "Decorator registration", body: "The function's docstring becomes the tool description. Parameters are inferred from type annotations. Return a value and it's serialised automatically." },
    ],
  },
  "go-busybox": {
    status: "active",
    tagline: "57 BusyBox utilities in Go — compiles to a 2 MB WASM binary for agent sandboxes.",
    about: `go-busybox implements 57 BusyBox-compatible utilities in Go. It compiles to a static native binary or a 2 MB WebAssembly module via TinyGo, suitable for dropping into agent sandboxes that need familiar UNIX tools without a full Linux userland. All 387 reference test cases pass. The single multi-call binary dispatches by argv[0] or subcommand.`,
    features: [
      { icon: "📦", title: "57 applets, 387/387 tests", body: "ash, awk, cat, grep, find, sed, ls, ps, kill, xargs, tar, wget, and 44 more — all passing the BusyBox reference test suite." },
      { icon: "🌐", title: "Compiles to WASM", body: "TinyGo produces a 2 MB .wasm file (4.7 MB unoptimised). Run it under wasmtime with no filesystem access for fully sandboxed execution." },
      { icon: "📦", title: "Single static binary", body: "One binary dispatches all 57 applets by argv[0] or subcommand name. No shared libraries, no runtime dependencies, any GOARCH." },
      { icon: "🛡", title: "Sandbox-safe", body: "OS-dependent applets (network, raw sockets, procfs) return stubs under WASM. The agent gets the tools it needs, the sandbox keeps its boundaries." },
    ],
  },
  "proxmox-zpool-monitoring": {
    status: "stable",
    tagline: "ZFS pool metrics for Proxmox — cron + Graphite, no daemon.",
    about: `A Python cron script that exports ZFS pool health, I/O, and capacity metrics from Proxmox VE nodes to Graphite. Designed for homelab setups where you want per-pool trends in Grafana alongside VM metrics but don't want to run an agent daemon on every node. Parses zpool status, zpool iostat, and zfs list.`,
    features: [
      { icon: "📊", title: "Pool health and I/O", body: "ONLINE/DEGRADED/FAULTED status, error counts, used/available capacity, read/write IOPS and bandwidth from zpool iostat." },
      { icon: "⏰", title: "Cron-only", body: "One Python script. Add it to crontab, point it at a Graphite endpoint. No daemon, no agent, no configuration database." },
      { icon: "🔌", title: "Graphite plaintext protocol", body: "Writes metrics using the Graphite plaintext line protocol over TCP. Compatible with Carbon, InfluxDB + Graphite input, and other backends." },
    ],
  },
  "gnome-thumbnailers": {
    status: "stable",
    tagline: "File thumbnails for RAW photos, HEIC, and 3D models in GNOME Files.",
    about: `GNOME Files generates thumbnails for JPEGs and PNGs and silently skips everything else. This is a set of Python thumbnailer scripts registered via .thumbnailer files that add thumbnail support for RAW photos (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF images, FBX/OBJ/STL 3D model files, and other formats. Install with make install — no GNOME restart required.`,
    features: [
      { icon: "📷", title: "RAW photo formats", body: "CR2, NEF, ARW, ORF, RW2 via rawpy. Your camera's raw files show previews in Nautilus without converting them first." },
      { icon: "🍎", title: "HEIC/HEIF", body: "Apple's default photo format since iOS 11. Thumbnail generation via Pillow's HEIF plugin." },
      { icon: "🧊", title: "3D model files", body: "Thumbnail renders for FBX, OBJ, and STL. Useful when your working directory is full of 3D print files." },
      { icon: "🔧", title: "Drop-in, no restart", body: "make install registers the thumbnailers. GNOME Files starts generating thumbnails for new file types immediately." },
    ],
  },
  "go-rdp": {
    status: "active",
    tagline: "Browser-based RDP client in Go — full MS-RDPBCGR spec, WASM frontend.",
    about: `go-rdp is a browser-based RDP client with a Go backend and a WebAssembly frontend. The Go implementation is a complete rewrite targeting the full MS-RDPBCGR specification rather than just the common subset — intended as a reference implementation for RDP in Go. Functional with known limitations; connect to Windows VMs from any browser without a native client.`,
    features: [
      { icon: "🌐", title: "No native client", body: "Full RDP session rendered to a browser canvas via WebAssembly. Works from any device with a modern browser." },
      { icon: "📋", title: "MS-RDPBCGR reference", body: "Rewritten from scratch against the full Microsoft RDP protocol specification. Passes the reference test suite included in the repo." },
      { icon: "⚙", title: "Go + WASM", body: "Go backend handles the RDP protocol. TinyGo compiles the frontend to WASM. Docker image available for one-command deployment." },
    ],
  },
  "pve-microvm": {
    status: "active",
    tagline: "QEMU microvm machine type for Proxmox VE — KVM isolation at container speed.",
    about: `A Debian package that patches qemu-server to unlock QEMU's microvm machine type in the Proxmox VE web UI. microvm VMs boot in under 200 ms, use only virtio-mmio (no emulated PC), and give full KVM hardware isolation — everything between a Proxmox LXC container and a full VM. Designed for running coding agents and semi-trusted workloads safely. Fully reversible: uninstall restores original files.`,
    features: [
      { icon: "⚡", title: "< 200 ms boot time", body: "QEMU microvm uses a stripped-down machine type with no emulated PCI bus or legacy devices. Boot times match LXC containers." },
      { icon: "🛡", title: "Full KVM isolation", body: "Each microvm gets its own kernel via KVM. No shared kernel, no namespace breakout, no LXC container escape surface." },
      { icon: "🔌", title: "Proxmox UI integration", body: "Appears as a machine type option in the Proxmox web UI. Managed with the same tools as any other VM — no new runtime or CLI required." },
      { icon: "↩", title: "Fully reversible", body: "dpkg -r pve-microvm restores the original qemu-server files. No permanent patches, no kernel modules." },
    ],
  },
  "homekit-steam-user-switcher": {
    status: "stable",
    tagline: "Switch Steam accounts on a shared gaming PC via HomeKit.",
    about: `A household with multiple Steam accounts on a shared PC meant walking to the TV every time someone wanted to play. This Python service uses HAP-python to expose each Steam account as a HomeKit Switch. Tap it in the Home app, tell Siri, or use it in an automation — it logs out the current user and logs in the target account via Steam's local CLI flags. Runs as a systemd service.`,
    features: [
      { icon: "🏠", title: "HomeKit native", body: "Each Steam account is a HomeKit Switch. Control it from the Home app, Siri, Shortcuts, or a time-based automation." },
      { icon: "🎮", title: "No Steam API required", body: "Uses Steam's --login flag locally. No Steam Web API account, no OAuth flow, no third-party services." },
      { icon: "🐧", title: "macOS and Linux", body: "HAP-python accessory server. Runs as a systemd service on the gaming machine itself." },
    ],
  },
  "zmk-config-totem": {
    status: "stable",
    tagline: "ZMK keymap for the Totem — home row mods, combos, ZMK Studio support.",
    about: `A production-ready ZMK config for the Totem, a 34-key column-staggered split keyboard. ZMK Studio support means you can edit the keymap via a web GUI without reflashing. Home row mods use per-key timing tuned over months of daily use to minimise accidental triggers. Combos cover common brackets and symbols. More forks than stars — used as a starting point for personal keymaps.`,
    features: [
      { icon: "🖥", title: "ZMK Studio", body: "Edit layers, combos, and key bindings from a web GUI without reflashing firmware. Requires a Studio-enabled build." },
      { icon: "✋", title: "Tuned home row mods", body: "Mod-tap on the home row with per-key timing that survives fast typing without false triggers. Tested on daily writing and coding." },
      { icon: "⌨", title: "34 keys, no compromises", body: "Combos for brackets, symbols, and navigation. All punctuation reachable without a dedicated symbol layer." },
      { icon: "🍴", title: "Template for others", body: "The 7:2 forks-to-stars ratio tells the real story — this config is used as a starting point, not just starred and forgotten." },
    ],
  },
  "ghostty-web": {
    status: "active",
    tagline: "Ghostty terminal sessions served to a browser with xterm.js compatibility.",
    about: `ghostty-web is a TypeScript/Go project that runs Ghostty in server mode and proxies its terminal sessions to a browser via WebSocket, with an xterm.js-compatible API layer. The goal is Ghostty's rendering quality and speed accessible from a tablet or browser session. Shares go-te with webterm and go-rdp for the server-side terminal state engine.`,
    features: [
      { icon: "⚡", title: "Ghostty quality, browser access", body: "Ghostty runs server-side; the browser gets rendered output over WebSocket. Speed and correctness of a native terminal, accessible from any device." },
      { icon: "🔌", title: "xterm.js API compatibility", body: "The xterm.js API layer means existing tooling built on xterm.js can switch to ghostty-web with minimal changes." },
      { icon: "🔗", title: "Shared terminal engine", body: "go-te handles server-side terminal state — the same library used by webterm and go-rdp. One consistent terminal family." },
    ],
  },
  "go-te": {
    status: "active",
    tagline: "VT100/VT520 terminal emulator library for Go — pyte-faithful, SVG export.",
    about: `go-te is a faithful Go port of the Python pyte terminal emulator library, validated against pyte's full test suite and ESCTest2 conformance tests. It models a VT100/VT220/VT520 screen with primary/alternate buffers, dirty-tracking, scrollback history, and SVG export. Used as the server-side terminal state engine in webterm, go-rdp, and ghostty-web.`,
    features: [
      { icon: "🔣", title: "Pyte-faithful semantics", body: "1:1 match with pyte test behaviour. VT100/VT220/VT520 escape sequences, CSI/OSC/DSR commands, alternate buffer, cursor save/restore." },
      { icon: "🖼", title: "SVG export", body: "Export any screen buffer state to SVG — useful for terminal screenshots, test reporting, and documentation." },
      { icon: "📦", title: "Pure Go, zero CGO", body: "go get github.com/rcarmo/go-te. Compiles to any GOARCH. No libvte, no ncurses, no system library dependencies." },
      { icon: "🔗", title: "Powers webterm, go-rdp, ghostty-web", body: "The shared terminal state engine across the whole Go terminal family." },
    ],
  },
  gotel: {
    status: "active",
    tagline: "A self-contained OpenTelemetry collector with SQLite storage and built-in trace viewer.",
    about: `gotel is a single-binary OpenTelemetry collector that stores traces and metrics in SQLite and includes a built-in web UI for exploring trace data. Designed for small deployments and local development where running a full Jaeger/Tempo stack is overkill. Exposes OTLP gRPC (4317), OTLP HTTP (4318), a query API (3200), and the trace viewer (3000).`,
    features: [
      { icon: "📦", title: "Single binary", body: "go build -o gotel . and it runs. Ships with an embedded default config — OTLP → memory_limiter → batch → SQLite. Override with config.yaml if needed." },
      { icon: "🗄", title: "SQLite storage", body: "Traces and metrics stored in a local SQLite file. No external storage dependency, no volume mounts, just a file." },
      { icon: "🌐", title: "Built-in trace viewer", body: "Web UI at :3000 for exploring trace data. No Grafana setup required for local development." },
      { icon: "📊", title: "OTLP gRPC and HTTP", body: "Standard OTLP endpoints on ports 4317 (gRPC) and 4318 (HTTP). Drop-in replacement for the official OTel Collector for small deployments." },
    ],
  },
};

// ── CSS ────────────────────────────────────────────────────────────────────
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
/* Topbar */
.topbar { position:sticky; top:0; z-index:100; background:var(--bg); border-bottom:1px solid var(--border); backdrop-filter:blur(12px); }
.topbar-inner { max-width:var(--max); margin:0 auto; padding:.7rem var(--gap); display:flex; align-items:center; gap:.6rem; font-size:.8rem; color:var(--muted); }
.topbar-inner a { color:var(--muted); font-weight:500; } .topbar-inner a:hover { color:var(--text); text-decoration:none; }
.sep { color:var(--border2); }
.current { color:var(--text); font-weight:600; }
/* Hero */
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
.badge-active   { background:rgba(52,211,153,.1); color:#34d399; border:1px solid rgba(52,211,153,.2); }
.badge-stable   { background:rgba(79,142,247,.1); color:#4f8ef7; border:1px solid rgba(79,142,247,.2); }
.badge-maintained { background:rgba(167,139,250,.1); color:#a78bfa; border:1px solid rgba(167,139,250,.2); }
.badge-archived { background:rgba(251,191,36,.1); color:#fbbf24; border:1px solid rgba(251,191,36,.2); }
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
/* Stats */
.stats-wrap { max-width:var(--max); margin:0 auto; padding:0 var(--gap) 2rem; }
.stats { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; }
.stat { background:var(--card); padding:1rem 1.2rem; }
.stat-l { font-size:.68rem; text-transform:uppercase; letter-spacing:.08em; color:var(--dim); margin-bottom:.2rem; }
.stat-v { font-size:1.45rem; font-weight:700; letter-spacing:-.02em; }
.stat-sub { font-size:.7rem; color:var(--muted); margin-top:.1rem; }
/* Sections */
.section { max-width:var(--max); margin:0 auto; padding:2.5rem var(--gap); border-top:1px solid var(--border); }
.eyebrow { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--accent); margin-bottom:.4rem; }
.section-title { font-size:1.35rem; font-weight:700; letter-spacing:-.02em; margin-bottom:1.5rem; }
/* About */
.about { font-size:1rem; line-height:1.8; color:var(--muted); max-width:680px; }
/* Feature grid */
.features { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1px; background:var(--border); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; }
.feat { background:var(--card); padding:1.4rem; display:flex; flex-direction:column; gap:.45rem; }
.feat-icon { font-size:1.3rem; line-height:1; }
.feat-title { font-size:.88rem; font-weight:600; color:var(--text); }
.feat-body { font-size:.82rem; color:var(--muted); line-height:1.6; }
/* Diagram */
.diagram-wrap { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; padding:1.5rem; }
.diagram-wrap svg { width:100%; height:auto; display:block; }
/* Releases */
.releases { display:flex; flex-direction:column; gap:.6rem; }
.release { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:.9rem 1.1rem; }
.rel-head { display:flex; align-items:baseline; flex-wrap:wrap; gap:.5rem; margin-bottom:.25rem; }
.rel-tag { font-family:ui-monospace,monospace; font-size:.8rem; font-weight:700; color:var(--accent); background:var(--accent-glow); padding:.1rem .4rem; border-radius:4px; }
.rel-name { font-weight:500; font-size:.88rem; }
.rel-date { color:var(--dim); font-size:.75rem; margin-left:auto; }
.rel-body { font-size:.8rem; color:var(--muted); white-space:pre-wrap; word-break:break-word; max-height:180px; overflow:hidden; }
/* Posts */
.posts { display:flex; flex-direction:column; gap:.45rem; }
.post { display:grid; grid-template-columns:6rem 1fr; gap:.75rem; font-size:.875rem; }
.post-date { color:var(--dim); font-size:.75rem; padding-top:.12rem; white-space:nowrap; }
/* Footer */
footer { max-width:var(--max); margin:0 auto; padding:1.75rem var(--gap); border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; }
.foot-l { font-size:.78rem; color:var(--dim); }
.foot-r { display:flex; gap:1.5rem; font-size:.78rem; }
.foot-r a { color:var(--muted); } .foot-r a:hover { color:var(--text); }
`;

function ghSvg() {
  return `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

function esc(s: string) { return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function page(d: Dossier, c: Content): string {
  const m = d.meta;
  const ghUrl = `https://github.com/${m.full_name}`;
  const displayName = m.full_name.split("/")[0] !== "rcarmo" ? m.full_name : m.name;
  const langDot = "dot-" + ({"C++":"Cpp"}[m.language] ?? m.language ?? "misc");
  const posts = POSTS[d.id] ?? [];
  const hasReleases = (d.releases?.length ?? 0) > 0;

  const logoHtml = d.logo_data_uri
    ? `<div class="hero-logo"><img src="${d.logo_data_uri}" alt="${esc(displayName)} logo" loading="lazy"></div>` : "";

  const statsHtml = `<div class="stats-wrap"><div class="stats">
    <div class="stat"><div class="stat-l">Stars</div><div class="stat-v">${(m.stars ?? 0).toLocaleString()}</div><div class="stat-sub">on GitHub</div></div>
    <div class="stat"><div class="stat-l">Forks</div><div class="stat-v">${m.forks ?? 0}</div></div>
    <div class="stat"><div class="stat-l">Language</div><div class="stat-v" style="font-size:.95rem;padding-top:.4rem"><span class="dot ${langDot}"></span>${esc(m.language ?? "—")}</div></div>
    <div class="stat"><div class="stat-l">Created</div><div class="stat-v" style="font-size:1.1rem;padding-top:.3rem">${m.created_at?.slice(0,4) ?? "?"}</div></div>
    <div class="stat"><div class="stat-l">Last push</div><div class="stat-v" style="font-size:.9rem;padding-top:.35rem">${m.pushed_at?.slice(0,7) ?? "?"}</div></div>
  </div></div>`;

  const diagramHtml = d.diagram_inline ? `
  <div class="section">
    <div class="eyebrow">Architecture</div>
    <div class="section-title">How it works</div>
    <div class="diagram-wrap">${d.diagram_inline}</div>
  </div>` : "";

  const releasesHtml = hasReleases ? `
  <div class="section">
    <div class="eyebrow">Versions</div>
    <div class="section-title">Releases</div>
    <div class="releases">
      ${d.releases.slice(0, 8).map(r => `
      <div class="release">
        <div class="rel-head">
          <span class="rel-tag">${esc(r.tag)}</span>
          <span class="rel-name">${esc(r.name)}</span>
          <span class="rel-date">${r.date?.slice(0,10) ?? ""}</span>
        </div>
        ${r.body?.trim() ? `<div class="rel-body">${esc(r.body.trim())}</div>` : ""}
      </div>`).join("")}
    </div>
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
  ${statsHtml}
  <div class="section">
    <div class="eyebrow">About</div>
    <p class="about">${esc(c.about.trim().replace(/\n\s+/g," "))}</p>
  </div>
  <div class="section">
    <div class="eyebrow">Features</div>
    <div class="section-title">What it does</div>
    <div class="features">
      ${c.features.map(f => `<div class="feat"><div class="feat-icon">${f.icon}</div><div class="feat-title">${esc(f.title)}</div><div class="feat-body">${esc(f.body)}</div></div>`).join("")}
    </div>
  </div>
  ${diagramHtml}
  ${releasesHtml}
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
