#!/usr/bin/env bun
/**
 * Project pages — dark game aesthetic with ECharts activity sparklines,
 * release timelines with live GitHub API, glow logos, full dossier data.
 * Leverages image_process-optimised logos and vendored ECharts.
 */
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/workspace/projects/rcarmo.github.io";
const DATA = join(ROOT, "_data");
const OUT  = join(ROOT, "projects");
mkdirSync(OUT, { recursive: true });

type Post    = { title: string; url: string; date: string };
type Commit  = { sha: string; date: string; msg: string };
type Release = { tag: string; name: string; date: string; body: string };
type Meta    = { name: string; full_name: string; description: string;
                 homepage: string|null; stars: number; forks: number;
                 language: string; created_at: string; pushed_at: string;
                 topics: string[] };
type Dossier = { id: string; meta: Meta; commits: Commit[];
                 releases: Release[]; posts: Post[];
                 logo_data_uri: string|null; diagram_inline: string|null };


const POSTS: Record<string, Post[]> = JSON.parse(readFileSync(join(DATA,"verified-posts.json"),"utf-8"));


// ── Content ─────────────────────────────────────────────
type Feature = { icon: string; title: string; body: string };
type Content = {
  tagline: string; about: string; how: string;
  features: Feature[]; status: 'active'|'stable'|'maintained'|'archived';
};

const C: Record<string, Content> = {
  piku: {
    status: "stable",
    tagline: "git push deployments to your own server — no Docker, no ops.",
    about: `piku is a single Python script installed as a git post-receive hook. Push your code, piku reads the Procfile, installs dependencies, starts your workers under uwsgi, and wires them up behind nginx with optional Let's Encrypt TLS. The whole runtime fits in ~1,500 lines of readable Python 3 and runs on a first-generation Raspberry Pi.`,
    how: `piku runs as a git post-receive hook. When you push a commit, it detects your application type from lock files and a Procfile, installs dependencies into an isolated per-app environment, and starts your declared processes under uwsgi acting as a process supervisor.

Nginx is reconfigured automatically on each deploy. Virtual hosts, TLS via Let's Encrypt, static file serving, and cache rules are driven by an ENV file you commit alongside your code. Zero-downtime deploys replace workers before stopping the old ones. ps:scale web=3 and config:set KEY=val take effect without touching code.

The implementation stays around 1,500 lines of Python with no external dependencies. That deliberate simplicity is a design goal — piku covers 80% of deployment use cases without becoming a platform.`,
    mermaid: `flowchart LR
    Dev["Developer\\ngit push"] --> Hook["piku hook\\npost-receive"]
    Hook --> Deps["Install deps\\nvenv / node_modules"]
    Hook --> Nginx["Configure\\nnginx + TLS"]
    Deps --> Workers["Start workers\\nuwsgi"]
    Workers --> App["Live app"]
    Nginx --> App`,
    features: [
      { icon: "⌥", title: "Heroku-style workflow", body: "git remote add piku piku@server:app. git push piku main. The full deploy flow." },
      { icon: "🌐", title: "Any language", body: "Python, Node, Go, Clojure, Ruby, Java, PHP, static. Detected from lock files and Procfiles." },
      { icon: "🔒", title: "Automatic TLS", body: "Let's Encrypt ACME, virtual host routing, zero-downtime worker replacement." },
      { icon: "⬆", title: "Live scaling", body: "ps:scale web=3 and config:set KEY=val — no redeploy needed." },
      { icon: "🐧", title: "Any POSIX host", body: "Debian, Ubuntu, Alpine, FreeBSD, WSL. ARM and Intel. Stable since 2016." },
    ],
  },
  piclaw: {
    status: "active",
    tagline: "A self-hosted AI agent workspace — streaming UI, persistent state, no CDN.",
    about: `PiClaw packages the Pi Coding Agent runtime into a Docker container with a streaming web UI, multi-provider LLM support, and built-in tools including a Ghostty terminal, code editor, document viewers, draw.io, kanban boards, VNC client, and MCP access. One docker run command, no CDN, no setup wizard.`,
    how: `Supervisor runs as PID 1 inside the container, managing the Bun-based Pi agent runtime, an optional Ghostty-backed web terminal, and an optional VNC display. All persistent state lives on a bind-mounted /workspace volume — the container is stateless and replaceable.

The web UI communicates with the agent over SSE for streaming and WebSocket for real-time indicators. The tool surface is layered: a small always-active baseline, with additional tools activated on demand via list_tools and activate_tools — keeping token usage low while hundreds of capabilities remain available. Skills are TypeScript modules discovered at runtime from SKILL.md files.

Sessions branch as git-like conversation trees in SQLite. The keychain stores secrets encrypted with AES-GCM. Dream memory consolidation runs nightly to synthesise notes from all sessions and keep long-running workflows coherent.`,
    mermaid: `flowchart TB
    Browser["Browser / Mobile"] --> |"SSE + WebSocket"| WebUI["Web UI\\nStreaming chat"]
    WebUI --> Agent["Pi Agent Runtime\\n(Bun)"]
    Agent --> LLM["LLM providers\\nAnthropic · OpenAI · Ollama…"]
    Agent --> Tools["Tools\\nSSH · Proxmox · Portainer · MCP"]
    Agent --> Skills["Skills\\nTypeScript modules"]
    Agent --> DB["SQLite state\\nSessions · Keychain · Media"]
    subgraph Container["Docker container"]
        WebUI
        Agent
        Terminal["Ghostty terminal"]
        VNC["VNC display"]
    end`,
    features: [
      { icon: "💬", title: "Streaming chat", body: "Markdown, KaTeX, Mermaid, Adaptive Cards. Branch with /btw, queue follow-ups." },
      { icon: "🗂", title: "Workspace tooling", body: "File browser, CodeMirror 6, Office/PDF viewers, draw.io, kanban, VNC — no separate apps." },
      { icon: "🔌", title: "Any LLM", body: "Anthropic, OpenAI, Azure, Gemini, Ollama, or any OpenAI-compatible endpoint." },
      { icon: "🧠", title: "Persistent state", body: "SQLite-backed history, media, tasks, encrypted keychain. Dream nightly consolidation." },
      { icon: "🛠", title: "Infrastructure tools", body: "SSH, Proxmox, Portainer profiles. CDP browser automation. Sharp image processing. MCP." },
      { icon: "📦", title: "Single container", body: "docker run -p 8080:8080 -v ./workspace:/workspace ghcr.io/rcarmo/piclaw:latest" },
    ],
  },
  vibes: {
    status: "active",
    tagline: "Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step.",
    about: `Vibes is a lightweight Python web app for talking to AI coding agents from a phone. Supports ACP (GitHub Copilot CLI, OpenAI Codex) and Pi agents via RPC. Single Python file server, single HTML UI, no build step.`,
    how: `The server uses aiohttp with server-sent events for streaming. When a message arrives from the browser, it forwards to the configured agent backend and streams tokens back via SSE. The UI is a single HTML file — no bundler, no npm. Fork it and make it yours in an afternoon. PiClaw and Vibes share the same web UI codebase.`,
    mermaid: `flowchart LR
    Phone["Browser / Phone"] --> |HTTP + SSE| Server["vibes server\\naiohttp"]
    Server --> |ACP| ACP["copilot --acp\\ncodex-acp"]
    Server --> |RPC| Pi["Pi agent\\nRPC"]`,
    features: [
      { icon: "📱", title: "Phone-first", body: "Designed and tested on iOS/Android before desktop." },
      { icon: "⚡", title: "ACP + Pi RPC", body: "copilot --acp, OpenAI Codex, Pi agents. Protocol adapters are pluggable." },
      { icon: "🚿", title: "SSE streaming", body: "Live token streaming. No polling, no spinners." },
      { icon: "🔩", title: "Zero build step", body: "One Python file. One HTML file. Clone and run." },
    ],
  },
  webterm: {
    status: "active",
    tagline: "Go web terminal with multi-session dashboard mode — built for AI agent workflows.",
    about: `webterm serves PTY sessions over HTTP/WebSocket with a dashboard that tiles multiple active terminals in a single browser tab — built for monitoring several AI coding agents in parallel. WASM renderer, correct xterm handling, sticky mobile keybar.`,
    how: `A Go HTTP server accepts WebSocket connections and spawns a PTY for each session. go-te maintains the server-side VT100/xterm screen state for live tile previews in dashboard mode. The frontend renders via WebAssembly for correct escape handling without a JS library. A mobile sticky keybar (Esc, Ctrl, Shift, arrows) makes it usable from a phone.`,
    mermaid: `flowchart LR
    Browser["Browser / Phone\\nWASM renderer"] --> |WebSocket| Server["Go HTTP server"]
    Server --> PTY1["PTY / agent 1"]
    Server --> PTY2["PTY / agent 2"]
    Server --> PTY3["PTY / agent N"]
    Server --> goTE["go-te\\nVT100 state"]`,
    features: [
      { icon: "🖥", title: "Multi-session dashboard", body: "Tile N agent terminals side-by-side. Watch them run in parallel." },
      { icon: "⚡", title: "WASM renderer", body: "Correct xterm/VT100 handling via WebAssembly." },
      { icon: "📱", title: "Mobile keybar", body: "Sticky Esc/Ctrl/Shift/Tab/arrows with sticky combos." },
      { icon: "🔌", title: "Library-first", body: "Powers the terminal in agentbox, piclaw, and ghostty-web." },
    ],
  },
  agentbox: {
    status: "active",
    tagline: "Docker sandbox for coding agents — preinstalled runtimes, opt-in services, DinD.",
    about: `Agentbox is a Debian Trixie container with Copilot CLI, Codex, and Pi preinstalled alongside git, gh, Bun, uv, and Homebrew. Docker, SSH, and RDP disabled by default, enabled via env vars. GUI image with XFCE and XRDP available. Workspace skeleton with SKILL.md templates.`,
    how: `The entrypoint checks ENABLE_DOCKER, ENABLE_SSH, and ENABLE_RDP and starts only what you asked for — all three default to off. When ENABLE_DOCKER=true, dockerd starts inside the container for Docker-in-Docker. The agent user gets passwordless sudo. The workspace skeleton at /home/agent/workspace-skel copies into /workspace on first use without overwriting files.`,
    mermaid: `flowchart TB
    subgraph Container["agentbox container"]
        Agent["Copilot CLI / Codex / Pi"]
        Tools["git · gh · bun · uv · brew"]
        SSH["SSH (opt-in)"]
        RDP["XRDP (opt-in)"]
        DinD["Docker daemon (opt-in)"]
    end
    Container --> |"bind mount"| Workspace["/workspace"]
    Container --> |"webterm dashboard"| Browser["Browser"]`,
    features: [
      { icon: "🤖", title: "Agents preinstalled", body: "Copilot CLI, Codex, Pi ready. toad, opencode, gemini via make targets." },
      { icon: "🔒", title: "Opt-in services", body: "Docker, SSH, RDP all off by default. Enable explicitly." },
      { icon: "🖥", title: "CLI and GUI images", body: ":latest is headless. :gui adds XFCE, XRDP, VS Code." },
      { icon: "📘", title: "Workspace skeleton", body: "SKILL.md templates without overwriting existing files." },
      { icon: "🐳", title: "Docker-in-Docker", body: "Run privileged and agents get their own Docker daemon." },
    ],
  },
  PhotosExport: {
    status: "stable",
    tagline: "Export your complete Apple Photos library — originals, edits, Live Photos, metadata.",
    about: `PhotosExport uses PhotoKit to export every PHAssetResource: originals, edited renders, Live Photo video pairs, burst frames, adjustment data. Deterministic YYYY/MM folder hierarchy, collision-safe naming, full JSON album manifest.`,
    how: `PhotoKit sees everything Photos.app stores — not just what the export UI exposes. For each asset, it fetches all resource types: original file, edited full-size render, Live Photo video component, burst frames, and raw adjustment data. Files get deterministic timestamp names stable across re-runs. The JSON manifest records full album and folder membership.`,
    mermaid: `flowchart LR
    Photos["Photos.app library"] --> |PhotoKit API| Tool["PhotosExport CLI"]
    Tool --> Originals["Originals\\n.jpg / .heic / .raw"]
    Tool --> Edits["Edited renders\\nFullSizeRender"]
    Tool --> Live["Live Photo video\\n.mov pairs"]
    Tool --> Manifest["album-manifest.json\\nfull structure"]`,
    features: [
      { icon: "📸", title: "Every resource", body: "Originals, edits, Live Photo videos, burst frames, adjustment data." },
      { icon: "📂", title: "Deterministic names", body: "YYYYMMDDHHMMSSx.ext — stable, collision-safe." },
      { icon: "🗂", title: "Album manifest", body: "JSON sidecar preserving album, smart album, and folder structure." },
      { icon: "📋", title: "Visible errors", body: "Nothing fails silently — export_errors.log for every failure." },
    ],
  },
  drawterm: {
    status: "stable",
    tagline: "Plan 9 drawterm — HiDPI scaling, Metal rendering, Connect dialog, clipboard bridge.",
    about: `This fork patches the macOS Cocoa backend for HiDPI-aware scaling, adds Metal-accelerated incremental redraws, a Preferences panel, a Connect dialog that persists credentials, and a macOS pasteboard bridge. Command maps to mod4 for rio bindings.`,
    how: `Standard drawterm renders at 1:1 pixels on Retina screens — unreadable on modern Macs. This fork reads the display backing scale factor and scales the framebuffer accordingly. The Metal rendering path only invalidates the dirty region on each update instead of the full surface. The Connect dialog saves CPU/auth host and credentials to user defaults.`,
    features: [
      { icon: "🔍", title: "HiDPI scaling", body: "Reads display scale. Legible on 5K displays." },
      { icon: "⚡", title: "Metal redraws", body: "Dirty-region updates only. No full-screen flicker." },
      { icon: "⌨", title: "macOS keyboard + clipboard", body: "Command → mod4, pasteboard bridge." },
      { icon: "💾", title: "Connect dialog", body: "Host, user, password persist between launches." },
    ],
  },
  macemu: {
    status: "maintained",
    tagline: "Basilisk II and SheepShaver for Raspberry Pi — SDL2 framebuffer, pre-built .deb.",
    about: `Fork targeting Raspberry Pi with SDL2 framebuffer/KMS — no X11, no desktop required. Pre-built arm64 .deb packages in releases. Basilisk II runs System 6–8; SheepShaver runs Mac OS 8.6–9.0.4.`,
    how: `SDL2 is compiled without OpenGL, Wayland, and X11 to reduce dependencies and startup time. The framebuffer/KMS backend writes directly to the display without a compositor. Pre-built .deb packages install with dpkg -i. Used as the emulation layer in the Maclock project.`,
    features: [
      { icon: "🥧", title: "Raspberry Pi optimised", body: "SDL2 framebuffer/KMS, no X11. Pi Zero through Pi 5." },
      { icon: "📦", title: "Pre-built packages", body: "arm64 .deb in GitHub Releases. dpkg -i and run." },
      { icon: "💻", title: "68k and PowerPC", body: "Basilisk II for System 6–8. SheepShaver for Mac OS 8.6–9.0.4." },
      { icon: "🖥", title: "Direct framebuffer", body: "Lower latency than X11." },
    ],
  },
  "ground-init": {
    status: "active",
    tagline: "Idempotent Linux bootstrap — YAML-driven, like cloud-init for bare metal.",
    about: `ground-init takes a YAML config and applies declarative steps to a fresh Linux install: packages, users, files, services. Each step checks current state before acting. Pure Python 3 stdlib, no dependencies.`,
    how: `Each YAML step is a desired-state declaration. The script checks whether the current state matches before doing anything — installed packages are skipped, files with correct content are left alone. Re-running verifies state without unwanted changes. Covers apt/rpm-ostree packages, file contents, user creation, systemd services, git clones, and shell scripts.`,
    features: [
      { icon: "📄", title: "Idempotent YAML", body: "Desired-state declarations. Run twice: setup and verify." },
      { icon: "🐧", title: "Ubuntu, Debian, Fedora Silverblue", body: "apt and rpm-ostree support." },
      { icon: "📦", title: "Zero dependencies", body: "Pure Python 3 stdlib." },
    ],
  },
  "azure-stable-diffusion": {
    status: "stable",
    tagline: "One-command Stable Diffusion on Azure GPU spot instances.",
    about: `Makefile wrapping Azure Bicep. make deploy provisions an NC-series GPU spot VM and installs AUTOMATIC1111. make open opens an SSH tunnel. make destroy tears it down. Spot pricing keeps costs under $0.10/hour.`,
    how: `make deploy runs a Bicep template that provisions a resource group, data disk, and GPU spot VM, then runs cloud-init to install CUDA and AUTOMATIC1111. Models live on an attached data disk that survives spot preemptions and teardowns. make destroy cleans up everything except the data disk configuration.`,
    features: [
      { icon: "⚡", title: "Three commands", body: "make deploy, make open, make destroy. Under 10 minutes total." },
      { icon: "💰", title: "Spot pricing", body: "NC6s_v3: typically under $0.10/hour." },
      { icon: "💾", title: "Persistent models", body: "Data disk survives spot preemptions and redeployments." },
    ],
  },
  "feed-summarizer": {
    status: "active",
    tagline: "LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi.",
    about: `Cron-job RSS/Atom summarizer. Fetches feeds, extracts full article text with trafilatura, batches prompts to a local Ollama or cloud LLM, writes a static HTML digest. No daemon, no database. Powers feeds.carmo.io.`,
    how: `trafilatura extracts the actual article body from the linked page, not the RSS description snippet. Summaries batch to the LLM — about 50 articles/hour on a Raspberry Pi 4 with a quantised model. Output is a static HTML file and JSON. Add to crontab and forget it.`,
    mermaid: `flowchart LR
    Feeds["RSS/Atom feeds"] --> |feedparser| Extract["trafilatura\\nfull-text extract"]
    Extract --> LLM["LLM\\nOllama / OpenAI"]
    LLM --> Digest["Static HTML digest\\nfeeds.carmo.io"]`,
    features: [
      { icon: "📰", title: "Full-text extraction", body: "trafilatura extracts the article body, not the RSS description." },
      { icon: "🤖", title: "Local or cloud LLM", body: "Ollama on Raspberry Pi 4, or any OpenAI-compatible API." },
      { icon: "⏰", title: "Cron-friendly", body: "One Python script, no daemon." },
    ],
  },
  umcp: {
    status: "active",
    tagline: "Micro MCP server — zero deps, decorator-based, stdio only.",
    about: `Single-file MCP server: decorate Python functions with @server.tool(), the server handles JSON-RPC 2.0 over stdio, you write plain functions. Zero external dependencies. Async and sync variants.`,
    how: `The protocol layer reads JSON-RPC 2.0 from stdin and dispatches to registered handlers. Decorate a function with @server.tool() — its name becomes the tool name, its docstring the description, its type annotations the JSON Schema. Return a value and it serialises automatically. Adding MCP to an existing Python script takes three lines.`,
    mermaid: `flowchart LR
    Client["MCP client\\nClaude / Cursor"] --> |"JSON-RPC 2.0 (stdio)"| Server["umcp server"]
    Server --> T1["@server.tool\\nasync handler"]
    Server --> T2["@server.tool\\nsync handler"]`,
    features: [
      { icon: "🪶", title: "Zero dependencies", body: "Pure Python 3 stdlib. Copy one file." },
      { icon: "⚡", title: "Async + sync", body: "@server.tool on async def and plain def." },
      { icon: "🎯", title: "Decorator registration", body: "Docstring → description. Annotations → JSON Schema." },
    ],
  },
  "go-busybox": {
    status: "active",
    tagline: "57 BusyBox utilities in Go — 2 MB WASM binary, 387/387 tests passing.",
    about: `go-busybox implements 57 BusyBox-compatible utilities in Go. Compiles to a static native binary or a 2 MB WebAssembly module via TinyGo. All 387 BusyBox reference test cases pass.`,
    how: `A multi-call binary: invoke as busybox ls or symlink a name to the binary. Each applet is a Go package under cmd/. The WASM target uses TinyGo for a 2 MB binary. OS-dependent operations return stubs under WASM so applets degrade gracefully without panicking.`,
    mermaid: `flowchart TB
    Binary["busybox binary\\nmulti-call"] --> |native| Applets["57 applets\\nash · awk · grep · find…"]
    Binary --> |TinyGo| WASM["busybox.wasm\\n2 MB"]
    WASM --> Sandbox["wasmtime\\nno filesystem access"]`,
    features: [
      { icon: "📦", title: "57 applets, 100% tests", body: "ash, awk, grep, find, sed, ls, ps, tar, wget, and more." },
      { icon: "🌐", title: "2 MB WASM", body: "TinyGo target. Run under wasmtime with no host access." },
      { icon: "📦", title: "Static binary", body: "No shared libraries, no runtime deps, any GOARCH." },
      { icon: "🛡", title: "Sandbox-safe", body: "OS-dependent applets stub under WASM." },
    ],
  },
  "proxmox-zpool-monitoring": {
    status: "stable",
    tagline: "ZFS pool metrics for Proxmox — exported to Graphite, cron only.",
    about: `Python cron script exporting ZFS pool health, I/O, and capacity from Proxmox VE to Graphite. No daemon, no agent. Just a script and a metrics endpoint.`,
    how: `Runs zpool status, zpool iostat, and zfs list, formats output as Graphite plaintext (metric.path value timestamp), and sends over TCP. Metric hierarchy is zfs.hostname.pool.metric so multiple nodes share one Graphite instance. Run every 5 minutes from crontab.`,
    features: [
      { icon: "📊", title: "Pool health and I/O", body: "Health status, errors, capacity, IOPS, bandwidth." },
      { icon: "⏰", title: "Cron-only", body: "One script, one endpoint. No daemon." },
      { icon: "🔌", title: "Graphite plaintext", body: "Compatible with Carbon, InfluxDB, and others." },
    ],
  },
  "gnome-thumbnailers": {
    status: "stable",
    tagline: "File thumbnails for RAW, HEIC, and 3D models in GNOME Files.",
    about: `Python thumbnailer scripts adding GNOME Files thumbnail support for RAW photos (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF, and FBX/OBJ/STL 3D models. Register with make install — no restart required.`,
    how: `Each script takes a source path and target PNG path. GNOME's thumbnailer infrastructure calls these in a bwrap sandbox when it encounters a registered MIME type. Scripts exit cleanly if a required library is missing — GNOME silently skips that file type without crashing anything.`,
    features: [
      { icon: "📷", title: "RAW formats", body: "CR2, NEF, ARW, ORF, RW2 via rawpy." },
      { icon: "🍎", title: "HEIC/HEIF", body: "Via Pillow's HEIF plugin." },
      { icon: "🧊", title: "3D files", body: "FBX, OBJ, STL thumbnail renders." },
      { icon: "🔧", title: "Drop-in", body: "make install, thumbnails appear immediately." },
    ],
  },
  "go-rdp": {
    status: "active",
    tagline: "Browser-based RDP client — full MS-RDPBCGR spec, Go backend, WASM frontend.",
    about: `go-rdp connects to Windows VMs via RDP from any browser without a native client. Go backend implementing the full MS-RDPBCGR specification as a reference implementation; WASM frontend for rendering.`,
    how: `The Go backend handles RDP security negotiation, capability exchange, and display updates, streaming JPEG-encoded frames to the browser over WebSocket. Keyboard and mouse events are forwarded as RDP input PDUs. TinyGo compiles the frontend renderer to WASM.`,
    mermaid: `flowchart LR
    Browser["Browser\\nWASM renderer"] --> |WebSocket| Go["Go RDP proxy"]
    Go --> |RDP protocol| Windows["Windows VM"]`,
    features: [
      { icon: "🌐", title: "No native client", body: "RDP in a browser canvas via WebAssembly." },
      { icon: "📋", title: "Full spec", body: "MS-RDPBCGR reference implementation." },
      { icon: "⚙", title: "Go + WASM", body: "Docker image for one-command deployment." },
    ],
  },
  "pve-microvm": {
    status: "active",
    tagline: "QEMU microvm for Proxmox VE — KVM isolation, under 200 ms boot.",
    about: `Debian package patching qemu-server to add QEMU microvm machine type to the Proxmox UI. microvm VMs boot in under 200 ms, use only virtio-mmio, and give full KVM isolation. Uninstall restores original files.`,
    how: `Patches two qemu-server files to add microvm as a selectable machine type. A standard Proxmox VM emulates a full x86 PC with PCI bus and BIOS. A microvm skips all that — direct kernel load, virtio-mmio only, much smaller attack surface. The result is KVM-grade isolation at LXC-comparable boot times. Currently the only Proxmox integration for QEMU microvm.`,
    mermaid: `flowchart LR
    UI["Proxmox UI\\nmachine type: microvm"] --> QEMU["QEMU microvm\\nvirtio-mmio only"]
    QEMU --> |"< 200ms"| Guest["Guest kernel\\n+ workload"]
    subgraph vs["vs. standard VM"]
        QEMU2["QEMU standard\\nPCI + BIOS + ACPI"]
        Guest2["Guest kernel\\n2-10s boot"]
    end`,
    features: [
      { icon: "⚡", title: "Under 200 ms boot", body: "No emulated PCI, no BIOS. Direct kernel load." },
      { icon: "🛡", title: "Full KVM isolation", body: "Own kernel per VM. No shared kernel." },
      { icon: "🔌", title: "Proxmox UI", body: "Appears as a machine type option. Managed like any VM." },
      { icon: "↩", title: "Fully reversible", body: "dpkg -r restores original qemu-server files." },
    ],
  },
  "homekit-steam-user-switcher": {
    status: "stable",
    tagline: "Switch Steam accounts on a shared PC via HomeKit.",
    about: `HAP-python service exposing each Steam account as a HomeKit Switch. Uses Steam's local --login flag — no Steam API, no Valve servers.`,
    how: `HAP-python advertises a HomeKit bridge on the local network. When you flip a switch, on_set_value runs subprocess with Steam's --login flag. Steam's local CLI handles the account switch without any Web API calls. The service reads the current active account from the Steam registry file on startup.`,
    features: [
      { icon: "🏠", title: "HomeKit native", body: "Siri, Shortcuts, automations all work." },
      { icon: "🎮", title: "No Steam API", body: "Local --login flag only. No Valve network calls." },
      { icon: "🐧", title: "macOS and Linux", body: "Runs as systemd service." },
    ],
  },
  "zmk-config-totem": {
    status: "stable",
    tagline: "ZMK keymap for the Totem — home row mods, combos, ZMK Studio.",
    about: `Production-ready ZMK config for the 34-key Totem split keyboard with ZMK Studio support for GUI keymap editing without reflashing. Home row mods tuned over months of daily use. 7:2 forks-to-stars — used as a template.`,
    how: `ZMK Studio enables GUI keymap editing over USB without a firmware rebuild. Home row mod timing was tuned over months: long enough to avoid false triggers, short enough to avoid latency. Combo timing works reliably on the Totem's aggressive column stagger.`,
    features: [
      { icon: "🖥", title: "ZMK Studio", body: "GUI keymap editing without reflashing." },
      { icon: "✋", title: "Tuned home row mods", body: "Per-key timing from months of use." },
      { icon: "⌨", title: "34-key layout", body: "Combos for all punctuation." },
      { icon: "🍴", title: "Template-ready", body: "7:2 forks-to-stars tells the story." },
    ],
  },
  "ghostty-web": {
    status: "active",
    tagline: "Ghostty terminal sessions in a browser — xterm.js compatibility.",
    about: `ghostty-web runs Ghostty in server mode, proxies sessions to a browser via WebSocket, and implements an xterm.js-compatible API. Shares go-te with webterm and go-rdp.`,
    how: `Ghostty runs server-mode connected to a Unix socket. The Go server proxies to WebSocket and translates protocols. The TypeScript frontend implements the xterm.js ITerminalAddon interface so existing extensions work unchanged. go-te maintains server-side terminal state for tile previews and copy-on-select.`,
    features: [
      { icon: "⚡", title: "Ghostty in browser", body: "Server-side Ghostty. Browser gets output over WebSocket." },
      { icon: "🔌", title: "xterm.js compat", body: "Existing xterm.js tooling works unchanged." },
      { icon: "🔗", title: "Shared engine", body: "go-te used by webterm, go-rdp, and ghostty-web." },
    ],
  },
  "go-te": {
    status: "active",
    tagline: "VT100/VT520 terminal library for Go — pyte-faithful, ESCTest2, SVG export.",
    about: `Faithful Go port of the Python pyte library, validated against pyte's full test suite and ESCTest2 conformance tests. Multiple screen variants: base, diff (dirty tracking), history, debug. Powers webterm, go-rdp, and ghostty-web.`,
    how: `Follows pyte's Stream + Screen architecture. The port reproduces pyte's exact semantics in Go — edge cases handled identically. DiffScreen tracks dirty cells for efficient WebSocket updates. SVG export snapshots any screen state for screenshots or test reports.`,
    features: [
      { icon: "🔣", title: "Pyte-faithful, VT100–VT520", body: "1:1 pyte semantics. ESCTest2 conformance." },
      { icon: "🖼", title: "SVG export", body: "Snapshot screen state as SVG." },
      { icon: "📦", title: "Pure Go", body: "go get github.com/rcarmo/go-te. Any GOARCH." },
      { icon: "🔗", title: "Shared engine", body: "Powers webterm, go-rdp, ghostty-web." },
    ],
  },
  gotel: {
    status: "active",
    tagline: "Self-contained OTel collector — SQLite storage, built-in trace viewer.",
    about: `Single-binary OpenTelemetry Collector storing traces and metrics in SQLite with a built-in web trace viewer. OTLP gRPC 4317, HTTP 4318, query API 3200, viewer 3000. No Jaeger, no Tempo, no Grafana needed.`,
    how: `A complete OTel Collector pipeline in one binary: OTLP endpoints → memory_limiter → batch processor → SQLite. The built-in query server exposes trace data as REST; the web viewer provides a Jaeger-like UI. One binary, one file, zero external storage.`,
    mermaid: `flowchart LR
    Services["Your services"] --> |"OTLP gRPC 4317\\nOTLP HTTP 4318"| gotel["gotel\\nsingle binary"]
    gotel --> SQLite["SQLite\\ntraces + metrics"]
    gotel --> |"query API :3200"| API["REST API"]
    gotel --> |"web UI :3000"| Viewer["Trace viewer"]`,
    features: [
      { icon: "📦", title: "Single binary", body: "go build -o gotel . and run. Embedded config." },
      { icon: "🗄", title: "SQLite storage", body: "Traces in a local file. No external dependency." },
      { icon: "🌐", title: "Built-in viewer", body: "Jaeger-like UI at :3000." },
      { icon: "📊", title: "Standard OTLP", body: "gRPC 4317 + HTTP 4318. Drop-in collector." },
    ],
  },
};


// ── CSS ───────────────────────────────────────────────────────────────────
const LANG_DOT: Record<string,string> = {
  TypeScript:"#3178c6",Python:"#3572A5",Go:"#00ADD8",Swift:"#F05138",
  C:"#555","C++":"#f34b7d",Dockerfile:"#384d54",Shell:"#89e051",misc:"#7a8190",
};

const LANG_ACCENT: Record<string,string> = {
  TypeScript:"#4a8aff",Go:"#00c8f0",Python:"#4a90d9",Swift:"#ff7030",
  C:"#999","C++":"#e060a0",Dockerfile:"#5090a0",Shell:"#50c050",
};

const CSS = `
@font-face {
  font-family:'Inter';font-style:normal;font-display:swap;font-weight:100 900;
  src:url('/assets/fonts/inter-var.woff2') format('woff2');
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,
    U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,
    U+2215,U+FEFF,U+FFFD;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#ffffff;--surface:#f8fafc;--surface2:#f1f5f9;--border:#e2e8f0;--border2:#cbd5e1;
  --text:#0f172a;--muted:#475569;--dim:#94a3b8;--subtle:#cbd5e1;
  --accent:#2563eb;--accent-dim:#eff6ff;--accent-muted:#bfdbfe;
  --amber:#d97706;--green:#16a34a;--red:#dc2626;
  --radius:8px;--radius-lg:12px;--gap:clamp(1rem,4vw,2rem);--max:960px;
  --font:'Inter',system-ui,-apple-system,sans-serif;
  --mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  --shadow-sm:0 1px 2px rgba(0,0,0,.06);
  --shadow:0 4px 12px rgba(0,0,0,.08);
  --shadow-lg:0 12px 40px rgba(0,0,0,.12);
}
@media(prefers-color-scheme:dark){
  :root{
    --bg:#0c0e14;--surface:#111520;--surface2:#181e2c;--border:rgba(255,255,255,.07);
    --border2:rgba(255,255,255,.13);--text:#e8edf5;--muted:#7089b0;--dim:#3f5070;
    --subtle:#2a3550;--accent:#4f8ef7;--accent-dim:rgba(79,142,247,.1);
    --accent-muted:rgba(79,142,247,.3);--amber:#f59e0b;--green:#34d399;--red:#f87171;
    --shadow-sm:0 1px 2px rgba(0,0,0,.3);--shadow:0 4px 12px rgba(0,0,0,.4);
    --shadow-lg:0 12px 40px rgba(0,0,0,.6);
  }
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--font);
  font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;
  font-feature-settings:'cv05','cv08','cv10','tnum';font-optical-sizing:auto;}
a{color:var(--accent);text-decoration:none;}a:hover{text-decoration:underline;}
code,kbd{font-family:var(--mono);font-size:.875em;background:var(--surface2);
  padding:.1em .35em;border-radius:4px;border:1px solid var(--border);}

/* ── Topbar ── */
.topbar{position:sticky;top:0;z-index:200;background:rgba(255,255,255,.88);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);box-shadow:var(--shadow-sm);}
@media(prefers-color-scheme:dark){.topbar{background:rgba(12,14,20,.9);}}
.topbar-inner{max-width:var(--max);margin:0 auto;padding:.6rem var(--gap);
  display:flex;align-items:center;gap:.6rem;font-size:.75rem;font-family:var(--mono);color:var(--muted);}
.topbar-inner a{color:var(--muted);}.topbar-inner a:hover{color:var(--text);text-decoration:none;}
.sep{color:var(--subtle)}.current{color:var(--text);font-weight:600;}

/* ── Hero banner (project pages) ── */
.hero-banner{position:relative;overflow:hidden;height:320px;background:var(--surface2);}
.hero-bg{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.hero-overlay{position:absolute;inset:0;
  background:linear-gradient(to right,rgba(6,8,18,.92) 0%,rgba(6,8,18,.7) 52%,rgba(6,8,18,.15) 100%);}
.hero-content{position:absolute;inset:0;display:flex;flex-direction:row;align-items:center;
  justify-content:space-between;padding:3.5rem var(--gap);
  max-width:var(--max);margin:0 auto;left:0;right:0;gap:2rem;overflow:hidden;}
.hero-text{display:flex;flex-direction:column;justify-content:flex-start;
  flex:1;min-width:0;gap:.4rem;max-height:100%;overflow:hidden;}
.hero-logo{flex-shrink:0;width:160px;height:160px;object-fit:contain;
  filter:drop-shadow(0 4px 32px rgba(0,0,0,.6));}
.hero-content h1{font-size:clamp(1.6rem,5vw,2.4rem);font-weight:700;
  letter-spacing:-.03em;line-height:1.1;color:#fff;}
.hero-content h1 a{color:#fff;}.hero-content h1 a:hover{opacity:.8;text-decoration:none;}
.tagline{font-size:clamp(.88rem,2vw,1.05rem);color:rgba(255,255,255,.75);line-height:1.5;max-width:520px;}
.hero-meta{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .8rem;font-size:.78rem;
  color:rgba(255,255,255,.6);}
.stars{color:#fcd34d;font-weight:700;}
.dot{width:9px;height:9px;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:3px;}
.dot-TypeScript{background:#3178c6}.dot-Python{background:#3572A5}.dot-Go{background:#00ADD8}
.dot-Swift{background:#F05138}.dot-C{background:#555}.dot-Cpp{background:#f34b7d}
.dot-Dockerfile{background:#384d54}.dot-Shell{background:#89e051}.dot-misc{background:#94a3b8}
.badge{display:inline-flex;align-items:center;padding:.15rem .5rem;border-radius:2em;
  font-size:.68rem;font-weight:600;letter-spacing:.03em;}
.badge-active{background:#dcfce7;color:#166534;border:1px solid #bbf7d0;}
.badge-stable{background:#dbeafe;color:#1e40af;border:1px solid #bfdbfe;}
.badge-maintained{background:#fef3c7;color:#92400e;border:1px solid #fde68a;}
.badge-archived{background:#fee2e2;color:#991b1b;border:1px solid #fecaca;}
@media(prefers-color-scheme:dark){
  .badge-active{background:rgba(52,211,153,.1);color:#34d399;border-color:rgba(52,211,153,.2);}
  .badge-stable{background:rgba(79,142,247,.1);color:#4f8ef7;border-color:rgba(79,142,247,.2);}
  .badge-maintained{background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.2);}
  .badge-archived{background:rgba(248,113,113,.1);color:#f87171;border-color:rgba(248,113,113,.2);}
}
.topics{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.4rem;}
.topic{font-size:.68rem;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  color:rgba(255,255,255,.7);padding:.12rem .45rem;border-radius:2em;font-family:var(--mono);}
.cta{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem;}
.btn{display:inline-flex;align-items:center;gap:.4rem;padding:.42rem .95rem;border-radius:var(--radius);
  font-size:.8rem;font-weight:500;font-family:var(--font);transition:all .15s;letter-spacing:-.01em;}
.btn-p{background:var(--accent);color:#fff;box-shadow:0 1px 3px rgba(37,99,235,.25);}
.btn-p:hover{filter:brightness(1.1);text-decoration:none;}
.btn-g{background:var(--surface);color:var(--text);border:1px solid var(--border2);}
.btn-g:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
@media(prefers-color-scheme:dark){
  .btn-g{background:rgba(255,255,255,.06);}
}
@media(max-width:860px){
  .hero-banner{height:260px;}.hero-content{flex-direction:column;}.hero-logo{display:none;}
}

/* ── Page layout ── */
.outer{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:156px 1fr;
  gap:0 36px;padding:2.5rem var(--gap) 4rem;}
.main{min-width:0;}
.toc{position:sticky;top:56px;align-self:start;padding:12px 0;
  grid-row:1/-1;max-height:calc(100dvh - 80px);overflow-y:auto;}
.toc::-webkit-scrollbar{width:3px;}.toc::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
.toc-title{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;
  color:var(--dim);padding:0 0 10px;margin-bottom:6px;border-bottom:1px solid var(--border);
  font-family:var(--mono);}
.toc a{display:block;font-size:.75rem;color:var(--muted);text-decoration:none;padding:4px 8px;
  border-radius:5px;border-left:2px solid transparent;transition:all .15s;margin-bottom:1px;}
.toc a:hover{color:var(--text);background:var(--surface);}
.toc a.active{color:var(--accent);border-left-color:var(--accent);background:var(--accent-dim);}
@media(max-width:860px){
  .outer{grid-template-columns:1fr;padding-top:0;}
  .toc{position:sticky;top:44px;z-index:100;display:flex;gap:4px;overflow-x:auto;max-height:none;
    background:var(--bg);border-bottom:1px solid var(--border);padding:8px var(--gap);
    margin:0 calc(-1*var(--gap));grid-row:auto;-webkit-overflow-scrolling:touch;}
  .toc::-webkit-scrollbar{display:none;}.toc-title{display:none;}
  .toc a{white-space:nowrap;flex-shrink:0;border-left:none;border-bottom:2px solid transparent;
    border-radius:4px 4px 0 0;padding:5px 10px;font-size:.72rem;}
  .toc a.active{border-left:none;border-bottom-color:var(--accent);background:var(--accent-dim);}
}

/* ── Stats bar ── */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));max-width:640px;
  gap:1px;background:var(--border);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2rem;box-shadow:var(--shadow-sm);}
.stat{background:var(--surface);padding:.8rem 1rem;}
.stat-l{font-size:.64rem;text-transform:uppercase;letter-spacing:.1em;color:var(--dim);
  margin-bottom:.2rem;font-family:var(--mono);}
.stat-v{font-size:1.3rem;font-weight:700;letter-spacing:-.02em;color:var(--text);}

/* ── Sections ── */
.sec{padding:2.5rem 0;border-top:1px solid var(--border);}
.eyebrow{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;
  color:var(--accent);margin-bottom:.35rem;font-family:var(--mono);}
.sec-title{font-size:1.2rem;font-weight:700;letter-spacing:-.02em;margin-bottom:1rem;color:var(--text);}
.about{font-size:.97rem;line-height:1.8;color:var(--text);max-width:680px;}
.how{display:flex;flex-direction:column;gap:.9rem;max-width:680px;}
.how p{font-size:.92rem;line-height:1.8;color:var(--muted);}

/* ── Feature grid ── */
.features{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;
  background:var(--border);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm);}
.ve-card{background:var(--bg);padding:1.3rem;display:flex;flex-direction:column;gap:.4rem;
  transition:background .15s;}
.ve-card:hover{background:var(--surface);}
.ve-icon{font-size:1.25rem;line-height:1;}
.ve-title{font-size:.85rem;font-weight:600;color:var(--text);}
.ve-body{font-size:.78rem;color:var(--muted);line-height:1.6;}

/* ── Architecture diagram ── */
.diagram-wrap{background:var(--surface);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;padding:1.5rem;box-shadow:var(--shadow-sm);}
.diagram-wrap svg{width:100%;height:auto;display:block;}

/* ── Release chart ── */
.release-chart{width:100%;height:220px;margin-bottom:.5rem;}
.release-legend{font-size:.73rem;color:var(--muted);margin-top:.5rem;}

/* ── Posts ── */
.posts{display:flex;flex-direction:column;gap:.4rem;}
.post{display:grid;grid-template-columns:5.5rem 1fr;gap:.7rem;font-size:.875rem;}
.post-date{color:var(--dim);font-size:.72rem;padding-top:.1rem;
  white-space:nowrap;font-family:var(--mono);}

/* ── Skeleton pulse ── */
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}

/* ── Footer ── */
footer{max-width:var(--max);margin:0 auto;padding:1.5rem var(--gap);
  border-top:1px solid var(--border);display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.foot-l{font-size:.73rem;color:var(--dim);font-family:var(--mono);}
.foot-r{display:flex;gap:1.5rem;font-size:.73rem;}
.foot-r a{color:var(--muted);}.foot-r a:hover{color:var(--text);}
`;

const SKIP_LANGS = new Set(['Dockerfile','Makefile','HTML','CSS','YAML','JSON','TOML','Shell','Batchfile','PowerShell','Roff','Nix']);
function realLang(lang: string|null|undefined): string|null {
  return lang && !SKIP_LANGS.has(lang) ? lang : null;
}

function ghSvg() {
  return `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
}
function esc(s: string) { return String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function commitActivity(commits: Commit[]) {
  const map = new Map<string, number>();
  (commits ?? []).forEach(c => { const mo = c.date.slice(0,7); map.set(mo, (map.get(mo)??0)+1); });
  const sorted = [...map.entries()].sort((a,b) => a[0].localeCompare(b[0]));
  return { labels: sorted.map(([k]) => k.slice(5)), values: sorted.map(([,v]) => v) };
}

function activityScript(id: string, labels: string[], values: number[], accent: string) {
  if (values.length < 2) return "";
  const L = JSON.stringify(labels), V = JSON.stringify(values);
  return `<script>
(function(){
  const el=document.getElementById('${id}');
  if(!el||typeof echarts==='undefined')return;
  const c=echarts.init(el,'dark');
  c.setOption({
    backgroundColor:'transparent',
    grid:{left:0,right:0,top:4,bottom:16},
    tooltip:{trigger:'axis',formatter:p=>p[0].name+': '+p[0].value+' commits'},
    xAxis:{type:'category',data:${L},axisLabel:{color:'#4a6890',fontSize:9},
      axisLine:{lineStyle:{color:'#1a2848'}}},
    yAxis:{type:'value',show:false},
    series:[{type:'bar',data:${V},
      itemStyle:{color:'${accent}',opacity:.65,borderRadius:2},
      emphasis:{itemStyle:{opacity:1}}}]
  });
  window.addEventListener('resize',()=>c.resize());
})();</script>`;
}

function releasesScript(fullName: string) {
  return `<script>
(function(){
  var el=document.getElementById('rl');if(!el)return;
  fetch('https://api.github.com/repos/${fullName}/releases?per_page=12')
    .then(r=>r.ok?r.json():[])
    .then(function(rs){
      if(!rs||!rs.length){el.innerHTML='<p class="rel-loading">No releases yet.</p>';return;}
      rs.sort(function(a,b){return new Date(b.published_at)-new Date(a.published_at);});
      el.innerHTML=rs.slice(0,10).map(function(r){
        var d=new Date(r.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
        var note=(r.body||'').trim().split('\\n')[0].replace(/</g,'&lt;').slice(0,130);
        var nm=r.name&&r.name!==r.tag_name?'<span class="rel-name">'+r.name.replace(/</g,'&lt;')+'</span>':'';
        return '<div class="release"><div class="rel-head"><span class="rel-date">'+d+'</span><span class="rel-tag">'+r.tag_name+'</span>'+nm+'</div>'+(note?'<div class="rel-note">'+note+'</div>':'')+'</div>';
      }).join('');
    })
    .catch(function(){el.innerHTML='<p class="rel-loading">Could not load releases.</p>';});
})();</script>`;
}

function page(d: Dossier, c: Content): string {
  const m = d.meta;
  const ghUrl  = `https://github.com/${m.full_name}`;
  const dispN  = m.full_name.split("/")[0] !== "rcarmo" ? m.full_name : m.name;
  const langDot = "dot-" + ({"C++":"Cpp"}[m.language] ?? m.language ?? "misc");
  const posts   = POSTS[d.id] ?? [];
  const rels    = d.releases ?? [];
  const hasDiag = !!d.diagram_inline;
  const hasRels = rels.length > 0;
  const hasPosts = posts.length > 0;

  // TOC links
  const tocLinks: {id:string;label:string}[] = [
    {id:"s-about",    label:"Overview"},
    {id:"s-how",      label:"How it works"},
    {id:"s-features", label:"Features"},
    ...(hasDiag ? [{id:"s-diagram", label:"Diagram"}] : []),
    {id:"s-releases", label:"Releases"},
    ...(hasPosts? [{id:"s-posts",   label:"Posts"}]    : []),
  ];

  const howParas = c.how.trim().split(/\n\n+/).map(p => `<p>${esc(p.trim())}</p>`).join("\n  ");

  // Releases — Preact island fetches live from GitHub API
  const releasesSection = `
  <div class="sec" id="s-releases">
    <div class="eyebrow">History</div>
    <div class="sec-title">Releases</div>
    <div id="rel-island-${d.id}">
      <div style="height:220px;display:flex;align-items:center;justify-content:center;color:var(--dim);font-size:.8rem">Loading…</div>
    </div>
  </div>`;

    const diagramSection = hasDiag ? `
  <div class="sec" id="s-diagram">
    <div class="eyebrow">Architecture</div>
    <div class="sec-title">System diagram</div>
    <div class="diagram-wrap">${d.diagram_inline}</div>
  </div>` : "";

  const postsSection = hasPosts ? `
  <div class="sec" id="s-posts">
    <div class="eyebrow">Writing</div>
    <div class="sec-title">On taoofmac.com</div>
    <div class="posts">
      ${posts.map((p: Post) => `
      <div class="post">
        <span class="post-date">${p.date}</span>
        <a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a>
      </div>`).join("")}
    </div>
  </div>` : "";

  const mermaidScript = hasDiag
    ? `<script src="/assets/js/mermaid.min.js"></script>
<script>
const dark=window.matchMedia('(prefers-color-scheme:dark)').matches;
mermaid.initialize({startOnLoad:true,theme:'base',look:'classic',themeVariables:{
  primaryColor:dark?'#134e4a':'#ccfbf1',primaryBorderColor:dark?'#14b8a6':'#0d9488',
  primaryTextColor:dark?'#f0fdfa':'#134e4a',lineColor:dark?'#4a6285':'#94a3b8',fontSize:'13px'}});
</script>` : "";

  // Island script — Preact renders all dynamic sections from live GitHub API
  const islandScript = `
<script src="/assets/js/echarts.min.js"></script>
<script type="module">
import { mount } from '/assets/js/repo-island.mjs';
mount({
  fullName: '${m.full_name}',
  heroMetaEl: document.getElementById('hero-meta-island-${d.id}'),
  statsEl:    document.getElementById('stats-island-${d.id}'),
  releasesEl: document.getElementById('rel-island-${d.id}'),
  chartId:    'rel-chart-${d.id}',
});
</script>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${dispN} — Rui Carmo</title>
<meta name="description" content="${esc(c.tagline)}">
<meta property="og:image" content="/assets/banners/${d.id}.png">
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}</style>
${mermaidScript}
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <a href="/">rcarmo.github.io</a>
    <span class="sep">/</span>
    <span class="current">${dispN}</span>
  </div>
</header>

<!-- Hero banner -->
<div class="hero-banner">
  <img class="hero-bg" src="/assets/banners/${d.id}.png" alt="" loading="eager" aria-hidden="true">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-text">
    <h1><a href="${ghUrl}" target="_blank" rel="noopener">${dispN}</a></h1>
    <p class="tagline">${esc(c.tagline)}</p>
    <div id="hero-meta-island-${d.id}">
      <div class="hero-meta">
        <span class="stars">★ ${(m.stars ?? 0).toLocaleString()}</span>
        ${(m.forks ?? 0) > 0 ? `<span>⑂ ${m.forks}</span>` : ""}
        ${realLang(m.language) ? `<span><span class="dot ${langDot}"></span>${esc(realLang(m.language)!)}</span>` : ""}
        <span class="badge badge-${c.status}">${c.status}</span>
      </div>
    </div>
    ${(m.topics?.length ?? 0) > 0
      ? `<div class="topics">${m.topics.map((t:string) => `<span class="topic">${esc(t)}</span>`).join("")}</div>`
      : ""}
    <div class="cta">
      <a class="btn btn-p" href="${ghUrl}" target="_blank" rel="noopener">${ghSvg()} GitHub</a>
      ${m.homepage ? `<a class="btn btn-g" href="${m.homepage}" target="_blank" rel="noopener">🌐 Homepage</a>` : ""}
    </div>
    </div>
    ${d.logo_data_uri ? `<img class="hero-logo" src="${d.logo_data_uri}" alt="${dispN} logo">` : ""}
  </div>
</div>

<div class="outer">
  <!-- TOC -->
  <nav class="toc" id="toc">
    <div class="toc-title">Contents</div>
    ${tocLinks.map(l => `<a href="#${l.id}">${l.label}</a>`).join("\n    ")}
  </nav>

  <!-- Main content -->
  <div class="main">
    <!-- Stats bar — Preact island, live from GitHub API -->
    <div id="stats-island-${d.id}" style="margin-top:1.5rem">
      <div class="stats">
        <div class="stat"><div class="stat-l">Stars</div><div class="stat-v">${(m.stars ?? 0).toLocaleString()}</div></div>
        <div class="stat"><div class="stat-l">Forks</div><div class="stat-v">${m.forks ?? 0}</div></div>
        <div class="stat"><div class="stat-l">Language</div><div class="stat-v" style="font-size:.9rem;padding-top:.35rem">${realLang(m.language) ? `<span class="dot ${langDot}"></span>${esc(realLang(m.language)!)}` : '—'}</div></div>
        <div class="stat"><div class="stat-l">Created</div><div class="stat-v" style="font-size:1.05rem;padding-top:.3rem">${m.created_at?.slice(0,4) ?? "?"}</div></div>
        <div class="stat"><div class="stat-l">Last push</div><div class="stat-v" style="font-size:.85rem;padding-top:.35rem">${m.pushed_at?.slice(0,7) ?? "?"}</div></div>
      </div>
    </div>>

    <div class="sec" id="s-about">
      <div class="eyebrow">Overview</div>
      <p class="about">${esc(c.about.trim())}</p>
    </div>

    <div class="sec" id="s-how">
      <div class="eyebrow">Under the hood</div>
      <div class="sec-title">How it works</div>
      <div class="how">${howParas}</div>
    </div>

    <div class="sec" id="s-features">
      <div class="eyebrow">Capabilities</div>
      <div class="sec-title">What it does</div>
      <div class="features">
        ${c.features.map((f:Feature) => `<div class="ve-card"><div class="ve-icon">${f.icon}</div><div class="ve-title">${esc(f.title)}</div><div class="ve-body">${esc(f.body)}</div></div>`).join("")}
      </div>
    </div>

    ${diagramSection}
    ${releasesSection}
    ${postsSection}
  </div>
</div>

<footer>
  <div class="foot-l">Last indexed ${m.pushed_at?.slice(0,10) ?? "?"}</div>
  <div class="foot-r">
    <a href="/">← All projects</a>
    <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener">GitHub</a>
  </div>
</footer>

${islandScript}
<script>
// Scroll-spy for TOC
(function(){
  const toc=document.getElementById('toc');
  if(!toc)return;
  const links=toc.querySelectorAll('a');
  const sections=[];
  links.forEach(l=>{const el=document.getElementById(l.getAttribute('href').slice(1));if(el)sections.push({el,link:l});});
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){
      links.forEach(l=>l.classList.remove('active'));
      const m=sections.find(s=>s.el===e.target);
      if(m){m.link.classList.add('active');
        if(window.innerWidth<=860)m.link.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});}
    }});
  },{rootMargin:'-10% 0px -80% 0px'});
  sections.forEach(s=>obs.observe(s.el));
  links.forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();
    const el=document.getElementById(l.getAttribute('href').slice(1));
    if(el){el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'','#'+el.id);}});});
})();
</script>
</body>
</html>`;
}

// ── Build ─────────────────────────────────────────────────────────────────
let built = 0, skipped = 0;
for (const f of (readdirSync(DATA) as string[]).filter(f => f.endsWith(".dossier.json"))) {
  const proj = f.replace(".dossier.json","");
  const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
  const c = C[proj] ?? readContent(proj);
  if (!c) { skipped++; continue; }
  writeFileSync(join(OUT, `${proj}.html`), page(d, c));
  console.log(`  ✓ ${proj}`);
  built++;
}
console.log(`\nBuilt ${built}, skipped ${skipped}`);

// ── Index page ─────────────────────────────────────────────────────────────

const SECTION_ORDER = ['highlight','ai-agents','ai-ml','terminal','macos','infrastructure','hardware','libraries'];
const SECTION_LABELS: Record<string,string> = {
  'highlight':     'Highlight',
  'ai-agents':     'Agentic tools',
  'ai-ml':         'Machine Learning & Models',
  'terminal':      'Terminal stack',
  'macos':         'macOS & Apple',
  'infrastructure':'Infrastructure & homelab',
  'hardware':      'Hardware & keyboards',
  'libraries':     'Libraries & utilities',
};

function readFrontmatter(proj: string): { section: string; status: string; tagline: string } {
  try {
    const text = readFileSync(join(ROOT, "_content", `${proj}.md`), "utf-8");
    const section = text.match(/^section:\s*(.+)$/m)?.[1]?.trim() ?? "infrastructure";
    const status  = text.match(/^status:\s*(.+)$/m)?.[1]?.trim() ?? "active";
    const tagline = text.match(/^tagline:\s*(.+)$/m)?.[1]?.trim() ?? "";
    return { section, status, tagline };
  } catch { return { section: "infrastructure", status: "active", tagline: "" }; }
}

function readContent(proj: string): Content | null {
  try {
    const text = readFileSync(join(ROOT, "_content", `${proj}.md`), "utf-8");
    const tagline = text.match(/^tagline:\s*(.+)$/m)?.[1]?.trim() ?? "";
    const status  = (text.match(/^status:\s*(\w+)$/m)?.[1]?.trim() ?? "active") as Content["status"];

    // Extract sections: ## About, ## How it works, ## Features
    const stripFm = text.replace(/^---[\s\S]+?---\n/, "");
    const aboutM  = stripFm.match(/## About\n([\s\S]+?)(?=\n## |$)/);
    const howM    = stripFm.match(/## How it works\n([\s\S]+?)(?=\n## |$)/);
    const featM   = stripFm.match(/## Features\n([\s\S]+?)(?=\n## |$)/);

    const about = aboutM?.[1]?.trim() ?? tagline;
    const how   = howM?.[1]?.trim() ?? "";

    // Parse ### icon title\nbody feature blocks
    const features: Feature[] = [];
    if (featM?.[1]) {
      const blocks = featM[1].matchAll(/###\s+(.+?)\n([\s\S]+?)(?=\n###|$)/g);
      for (const [, header, body] of blocks) {
        const iconMatch = header.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|[^\s])/u);
        const icon  = iconMatch?.[0] ?? "•";
        const title = header.replace(icon, "").trim();
        features.push({ icon, title, body: body.trim() });
      }
    }

    return { tagline, about, how, features, status };
  } catch { return null; }
}

const INDEX_CSS = `
/* ── Homepage hero ── */
.site-hero{
  min-height:88vh;display:flex;flex-direction:column;justify-content:center;
  position:relative;overflow:hidden;background:var(--bg);
  border-bottom:1px solid var(--border);}
/* dot grid */
.site-hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle,var(--border2) 1px,transparent 1px);
  background-size:24px 24px;}
/* radial fade so dots disappear at edges */
.site-hero::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 80% 80% at 50% 50%,transparent 40%,var(--bg) 100%);}
.site-hero-inner{
  position:relative;z-index:1;max-width:var(--max);margin:0 auto;
  padding:5rem var(--gap) 4rem;
  display:grid;grid-template-columns:1fr 200px;align-items:center;gap:4rem;}
.hero-kicker{
  font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;
  color:var(--accent);font-family:var(--mono);margin-bottom:1.2rem;}
.hero-h1{
  font-size:clamp(3rem,8vw,5.5rem);font-weight:800;letter-spacing:-.05em;
  line-height:.95;color:var(--text);margin-bottom:1.4rem;}
.hero-h1 span{color:var(--accent);}
.hero-sub{
  font-size:clamp(1rem,2.2vw,1.2rem);color:var(--muted);max-width:500px;
  line-height:1.65;margin-bottom:2rem;font-weight:400;}
.hero-actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-bottom:2.5rem;}
.hero-divider{
  width:40px;height:3px;background:var(--accent);border-radius:2px;margin-bottom:2rem;}
.hero-stats-row{
  display:flex;gap:2.5rem;flex-wrap:wrap;}
.hero-stat{display:flex;flex-direction:column;gap:.15rem;}
.hero-stat-v{
  font-size:1.8rem;font-weight:800;color:var(--text);letter-spacing:-.04em;
  font-variant-numeric:tabular-nums;}
.hero-stat-l{
  font-size:.65rem;text-transform:uppercase;letter-spacing:.12em;
  color:var(--dim);font-family:var(--mono);}
.hero-avatar-wrap{
  display:flex;flex-direction:column;align-items:center;gap:1rem;}
.hero-avatar{
  width:140px;height:140px;border-radius:50%;border:3px solid var(--border2);
  box-shadow:var(--shadow-lg);object-fit:cover;display:block;}
.hero-avatar-links{
  display:flex;flex-direction:column;align-items:center;gap:.4rem;width:100%;}
.hero-avatar-link{
  display:flex;align-items:center;justify-content:center;gap:.4rem;
  padding:.35rem .7rem;border-radius:2em;font-size:.72rem;font-weight:500;
  border:1px solid var(--border2);color:var(--muted);text-decoration:none;
  transition:all .15s;white-space:nowrap;width:100%;}
.hero-avatar-link:hover{
  border-color:var(--accent);color:var(--accent);
  background:var(--accent-dim);text-decoration:none;}
@media(max-width:700px){
  .site-hero-inner{grid-template-columns:1fr;gap:2.5rem;padding:3.5rem var(--gap) 3rem;}
  .hero-avatar-wrap{flex-direction:row;justify-content:flex-start;gap:1.2rem;align-items:center;}
  .hero-avatar{width:72px;height:72px;}
  .hero-avatar-links{flex-direction:row;width:auto;}
  .hero-h1{font-size:clamp(2.2rem,10vw,3rem);}
}

/* ── Section headers ── */
.idx-outer{max-width:var(--max);margin:0 auto;padding:0 var(--gap) 4rem;}
.idx-section{padding:3rem 0;border-top:1px solid var(--border);}
.idx-section:first-child{border-top:none;padding-top:2.5rem;}
.idx-eyebrow{font-size:.65rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.14em;color:var(--accent);margin-bottom:.4rem;font-family:var(--mono);}
.idx-section-hdr{display:flex;align-items:baseline;gap:.7rem;margin-bottom:1.3rem;}
.idx-title{font-size:1.45rem;font-weight:800;letter-spacing:-.03em;color:var(--text);}
.idx-count{font-size:.7rem;font-weight:700;background:var(--accent-dim);color:var(--accent);
  border:1px solid var(--accent-muted);padding:.18rem .5rem;border-radius:2em;
  font-family:var(--mono);vertical-align:baseline;}

/* ── Card grid ── */
.idx-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:1px;background:var(--border);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm);}
.idx-card{
  display:flex;gap:1rem;padding:1rem 1.1rem;background:var(--bg);
  text-decoration:none;color:inherit;transition:background .12s;align-items:stretch;
  min-height:84px;}
.idx-card:hover{background:var(--surface);text-decoration:none;}
.idx-logo-wrap{width:52px;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:4px 0;}
.idx-logo{width:100%;height:auto;max-height:80%;object-fit:contain;border-radius:7px;}
.idx-logo-ph{width:52px;flex-shrink:0;border-radius:8px;
  background:var(--surface);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.idx-body{min-width:0;flex:1;}
.idx-name{font-size:.875rem;font-weight:600;color:var(--text);margin-bottom:.2rem;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.idx-desc{font-size:.78rem;color:var(--muted);line-height:1.55;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.idx-meta{display:flex;align-items:center;gap:.55rem;margin-top:.5rem;
  font-size:.7rem;color:var(--dim);}
.idx-stars{color:var(--amber);font-weight:700;}

/* ── Highlight card ── */
.hl-wrap{border:1px solid var(--border2);border-radius:var(--radius-lg);
  overflow:hidden;box-shadow:var(--shadow);}
.hl-inner{display:grid;grid-template-columns:1fr auto;gap:2rem;
  align-items:center;padding:2rem 2.2rem;cursor:pointer;transition:background .12s;}
.hl-inner:hover{background:var(--surface);}
.hl-body{min-width:0;}
.hl-eyebrow{font-size:.65rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.14em;color:var(--accent);font-family:var(--mono);margin-bottom:.5rem;}
.hl-name{font-size:1.6rem;font-weight:800;letter-spacing:-.04em;margin-bottom:.4rem;
  color:var(--text);}
.hl-name a{color:var(--text);}.hl-name a:hover{color:var(--accent);}
.hl-tagline{color:var(--muted);font-size:.95rem;margin-bottom:1rem;
  line-height:1.65;max-width:500px;}
.hl-meta{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .85rem;
  font-size:.8rem;color:var(--muted);margin-bottom:1rem;}
.hl-stars{color:var(--amber);font-weight:700;font-size:.9rem;}
.hl-actions{display:flex;flex-wrap:wrap;gap:.55rem;}
.hl-logo{width:140px;height:140px;object-fit:contain;flex-shrink:0;
  filter:drop-shadow(0 4px 20px rgba(0,0,0,.15));}
@media(prefers-color-scheme:dark){.hl-logo{filter:drop-shadow(0 4px 20px rgba(0,0,0,.5));}}
@media(max-width:640px){
  .hl-inner{grid-template-columns:1fr;}.hl-logo{width:80px;height:80px;}
  .idx-grid{grid-template-columns:1fr;}
}
`

function indexPage(
  dossiers: Map<string, Dossier>,
  contents: Map<string, { section:string; status:string; tagline:string }>
): string {

  // Group projects by section
  const groups = new Map<string, string[]>();
  for (const [proj, c] of contents) {
    const s = c.section;
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s)!.push(proj);
  }

  const langDotIdx = (lang: string|null) =>
    "dot-" + ({"C++":"Cpp"}[lang ?? ""] ?? lang ?? "misc");

  function card(proj: string): string {
    const d = dossiers.get(proj);
    const c = contents.get(proj);
    if (!d || !c) return "";
    const m = d.meta;
    const dispN = m.full_name.split("/")[0] !== "rcarmo" ? m.full_name : m.name;
    const langD = langDotIdx(m.language);
    const logoImg = d.logo_data_uri
      ? `<div class="idx-logo-wrap"><img class="idx-logo" src="${d.logo_data_uri}" alt="${esc(dispN)} logo"></div>`
      : `<div class="idx-logo-ph">📦</div>`;
    return `<a class="idx-card" href="/projects/${proj}.html" data-repo="${m.full_name}">
  ${logoImg}
  <div class="idx-body">
    <div class="idx-name">${esc(dispN)}</div>
    <div class="idx-desc">${esc(c.tagline)}</div>
    <div id="card-meta-${proj}" class="idx-meta">
      <span class="idx-stars">★ ${(m.stars??0).toLocaleString()}</span>
      ${realLang(m.language) ? `<span><span class="dot ${langD}"></span>${esc(realLang(m.language)!)}</span>` : ""}
    </div>
  </div>
</a>`;
  }

  function highlightCard(proj: string): string {
    const d = dossiers.get(proj);
    const c = contents.get(proj);
    if (!d || !c) return "";
    const m = d.meta;
    const ghUrl = `https://github.com/${m.full_name}`;
    const langD = langDotIdx(m.language);
    const logoImg = d.logo_data_uri
      ? `<img class="hl-logo" src="${d.logo_data_uri}" alt="${esc(m.name)} logo">`
      : "";
    return `<div class="hl-wrap">
  <div class="hl-inner" onclick="location.href='/projects/${proj}.html'" role="link" tabindex="0">
    <div class="hl-body">
      <div class="hl-name"><a href="/projects/${proj}.html">${esc(m.name)}</a></div>
      <p class="hl-tagline">${esc(c.tagline)}</p>
      <div id="hl-meta-${proj}" class="hl-meta">
        <span class="hl-stars">★ ${(m.stars??0).toLocaleString()}</span>
        ${(m.forks??0)>0 ? `<span>⑂ ${m.forks}</span>` : ""}
        ${realLang(m.language) ? `<span><span class="dot ${langD}"></span>${esc(realLang(m.language)!)}</span>` : ""}
        <span class="badge badge-${c.status}">${c.status}</span>
      </div>
      <div class="hl-actions">
        <a class="btn btn-p" href="/projects/${proj}.html">View project →</a>
        <a class="btn btn-g" href="${ghUrl}" target="_blank" rel="noopener">${ghSvg()} GitHub</a>
      </div>
    </div>
    ${logoImg}
  </div>
</div>`;
  }

  const sections = SECTION_ORDER
    .filter(s => groups.has(s))
    .map(s => {
      const projs = groups.get(s)!;
      const label = SECTION_LABELS[s] ?? s;
      if (s === "highlight") {
        return `<div class="idx-section">
  <div class="idx-eyebrow">Featured project</div>
  <div class="idx-section-hdr"><div class="idx-title">${label}</div></div>
  ${projs.map(p => highlightCard(p)).join("\n")}
</div>`;
      }
      return `<div class="idx-section">
  <div class="idx-eyebrow">Projects</div>
  <div class="idx-section-hdr">
    <div class="idx-title">${label}</div>
    <span class="idx-count">${projs.length}</span>
  </div>
  <div class="idx-grid">
    ${projs.map(p => card(p)).join("\n    ")}
  </div>
</div>`;
    }).join("\n\n");

  // All full_names for the island
  const allRepos = [...contents.values()]
    .map((_, i) => [...dossiers.values()][i]?.meta.full_name)
    .filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rui Carmo — Open Source</title>
<meta name="description" content="Open source projects by Rui Carmo — AI agents, terminals, deployment, macOS tools, and more.">
<meta property="og:image" content="https://github.com/rcarmo.png?size=400">
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}${INDEX_CSS}</style>
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <a href="/">rcarmo.github.io</a>
    <div style="flex:1"></div>
    <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener">github.com/rcarmo</a>
  </div>
</header>

<!-- Hero -->
<section class="site-hero">
  <div class="site-hero-inner">
    <div class="hero-text-col">
      <div class="hero-kicker">Principal Architect &amp; Software Engineer</div>
      <h1 class="hero-h1">Open<br><span>source</span><br>craft.</h1>
      <p class="hero-sub">Building tools for AI agents, terminals, deployment, and homelab infrastructure — most of it runs on a Raspberry Pi somewhere.</p>
      <div class="hero-divider"></div>
      <div id="hero-stats-island">
        <div class="hero-stats-row">
          <div class="hero-stat"><span class="hero-stat-v">—</span><span class="hero-stat-l">Total stars</span></div>
          <div class="hero-stat"><span class="hero-stat-v">${dossiers.size}</span><span class="hero-stat-l">Featured repos</span></div>
          <div class="hero-stat" style="align-items:flex-start"><span class="hero-stat-l" style="margin-bottom:.3rem">Top languages</span><span style="font-size:.95rem;font-weight:700;color:var(--text)">—</span></div>
        </div>
      </div>
    </div>
    <div class="hero-avatar-wrap">
      <img class="hero-avatar" src="https://github.com/rcarmo.png?size=280" alt="Rui Carmo" loading="eager">
      <div class="hero-avatar-links">
        <a class="hero-avatar-link" href="https://taoofmac.com" target="_blank" rel="noopener">✍️ taoofmac.com</a>
        <a class="hero-avatar-link" href="https://github.com/rcarmo" target="_blank" rel="noopener">${ghSvg()} GitHub</a>
        <a class="hero-avatar-link" href="alt.html">🌿 3D garden</a>
      </div>
    </div>
  </div>
</section>

<div class="idx-outer">
${sections}
</div>

<footer>
  <div class="foot-l">rcarmo.github.io</div>
  <div class="foot-r">
    <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener">GitHub</a>
    <a href="alt.html">3D garden</a>
  </div>
</footer>

<script type="module">
import { mountIndex, mountHeroStats } from '/assets/js/repo-island.mjs';

// Pre-baked card data (from dossier + content at build time)
const CARD_DATA = ${JSON.stringify(
  [...dossiers.entries()]
    .filter(([proj]) => contents.get(proj)?.section !== 'highlight')
    .map(([proj, d]) => ({
      id: proj,
      fullName: d.meta.full_name,
      fallbackStars: '\u2605 ' + (d.meta.stars ?? 0).toLocaleString(),
      lang: d.meta.language ?? '',
    }))
)};

const HL_DATA = ${JSON.stringify((() => {
  const hlEntry = [...dossiers.entries()].find(([proj]) => contents.get(proj)?.section === 'highlight');
  if (!hlEntry) return null;
  return {
    id: hlEntry[0],
    fullName: hlEntry[1].meta.full_name,
    fallbackStars: '\u2605 ' + (hlEntry[1].meta.stars ?? 0).toLocaleString(),
    fallbackForks: hlEntry[1].meta.forks ?? 0,
    lang: hlEntry[1].meta.language ?? '',
    status: contents.get(hlEntry[0])?.status ?? 'active',
  };
})())};

mountIndex({
  cards: CARD_DATA.map(c => ({
    ...c,
    el: document.getElementById('card-meta-' + c.id),
  })),
  highlight: HL_DATA ? {
    ...HL_DATA,
    el: document.getElementById('hl-meta-' + HL_DATA.id),
  } : null,
});

// Hero stats: all featured repo full_names (includes cross-org repos like piku/piku)
const ALL_FULL_NAMES = [
  ...CARD_DATA.map(c => c.fullName),
  ...(HL_DATA ? [HL_DATA.fullName] : []),
];
mountHeroStats(document.getElementById('hero-stats-island'), ALL_FULL_NAMES);
</script>
</body>
</html>`;
}

// ── Build index ───────────────────────────────────────────────────────────
{
  const dossierMap = new Map<string, Dossier>();
  const contentMap = new Map<string, { section:string; status:string; tagline:string }>();

  for (const f of (readdirSync(DATA) as string[]).filter(f => f.endsWith(".dossier.json"))) {
    const proj = f.replace(".dossier.json","");
    const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
    dossierMap.set(proj, d);
    contentMap.set(proj, readFrontmatter(proj));
  }

  writeFileSync(join(ROOT, "index.html"), indexPage(dossierMap, contentMap));
  console.log("  ✓ index.html");
}
