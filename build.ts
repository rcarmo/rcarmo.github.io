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
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#080c18;--surface:#0e1424;--surface2:#141c30;
  --border:rgba(60,120,255,.1);--border2:rgba(80,140,255,.18);
  --text:#dde8ff;--muted:#6a88bb;--dim:#344668;
  --accent:#4a8aff;--accent-glow:rgba(74,138,255,.15);
  --amber:#fbbf24;--green:#34d399;
  --radius:8px;--radius-lg:14px;
  --gap:clamp(1rem,4vw,2rem);--max:880px;
}
html{scroll-behavior:smooth;}
body{
  background-color:var(--bg);
  background-image:radial-gradient(circle,rgba(60,120,255,.055) 1px,transparent 1px);
  background-size:24px 24px;
  color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
  font-size:15px;line-height:1.65;-webkit-font-smoothing:antialiased;
}
a{color:var(--accent);text-decoration:none;}a:hover{text-decoration:underline;}
code{font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:.875em;
  background:var(--surface2);padding:.1em .35em;border-radius:4px;border:1px solid var(--border);}
.topbar{position:sticky;top:0;z-index:100;background:rgba(8,12,24,.92);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border2);box-shadow:0 2px 16px rgba(0,0,0,.5);}
.topbar-inner{max-width:var(--max);margin:0 auto;padding:.65rem var(--gap);
  display:flex;align-items:center;gap:.5rem;font-size:.72rem;
  font-family:ui-monospace,monospace;color:var(--muted);}
.topbar-inner a{color:rgba(140,190,255,.9);font-weight:600;}
.topbar-inner a:hover{color:#fff;text-decoration:none;}
.sep{color:var(--border2);}.current{color:var(--text);font-weight:600;}
.outer{max-width:var(--max);margin:0 auto;padding:2rem var(--gap) 4rem;}
.hero{padding:2.5rem 0 2rem;display:flex;gap:1.5rem;align-items:flex-start;justify-content:space-between;}
@media(max-width:520px){.hero{flex-direction:column-reverse;}.hero-logo{display:none;}}
.hero-logo img{width:88px;height:88px;border-radius:18px;flex-shrink:0;
  box-shadow:0 0 0 1px var(--border2),0 0 36px rgba(74,138,255,.22),0 8px 24px rgba(0,0,0,.6);}
h1{font-size:clamp(1.8rem,5vw,2.6rem);font-weight:800;letter-spacing:-.03em;line-height:1.1;}
h1 a{color:var(--text);}h1 a:hover{color:var(--accent);text-decoration:none;}
.tagline{font-size:clamp(.95rem,2.2vw,1.15rem);color:var(--muted);margin:.55rem 0 1.1rem;max-width:560px;line-height:1.55;}
.meta{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;font-size:.79rem;color:var(--muted);margin-bottom:1.1rem;}
.stars{color:var(--amber);font-weight:800;font-size:.95rem;text-shadow:0 0 12px rgba(251,191,36,.35);}
.lang-dot{width:9px;height:9px;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:3px;}
.badge{display:inline-flex;align-items:center;padding:.18rem .55rem;border-radius:2em;font-size:.68rem;font-weight:700;letter-spacing:.04em;}
.badge-active  {background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.25);}
.badge-stable  {background:rgba(74,138,255,.1);color:#4a8aff;border:1px solid rgba(74,138,255,.25);}
.badge-maintained{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.25);}
.badge-archived{background:rgba(248,113,113,.1);color:#f87171;border:1px solid rgba(248,113,113,.25);}
.topics{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1.1rem;}
.topic{font-size:.7rem;background:var(--surface2);border:1px solid var(--border2);
  color:var(--muted);padding:.13rem .5rem;border-radius:2em;font-family:ui-monospace,monospace;}
.cta{display:flex;flex-wrap:wrap;gap:.55rem;}
.btn{display:inline-flex;align-items:center;gap:.4rem;padding:.48rem 1rem;
  border-radius:var(--radius);font-size:.83rem;font-weight:600;transition:all .15s;}
.btn-p{background:linear-gradient(135deg,#3a7aff 0%,#2860e0 100%);color:#fff;
  box-shadow:0 2px 12px rgba(60,130,255,.3);}
.btn-p:hover{filter:brightness(1.12);text-decoration:none;}
.btn-g{background:var(--surface2);color:var(--text);border:1px solid var(--border2);}
.btn-g:hover{border-color:var(--accent);color:var(--accent);text-decoration:none;}
.stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));
  gap:1px;background:var(--border);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2.5rem;}
.stat{background:var(--surface);padding:.85rem 1rem;}
.stat-l{font-size:.64rem;text-transform:uppercase;letter-spacing:.1em;
  color:var(--dim);margin-bottom:.2rem;font-family:ui-monospace,monospace;}
.stat-v{font-size:1.35rem;font-weight:800;letter-spacing:-.02em;color:var(--text);}
.stat-sub{font-size:.68rem;color:var(--muted);margin-top:.1rem;}
.activity-chart{height:80px;}
.sec{padding:2rem 0;border-top:1px solid var(--border);}
.eyebrow{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;
  color:var(--accent);margin-bottom:.4rem;font-family:ui-monospace,monospace;}
.sec-title{font-size:1.2rem;font-weight:700;letter-spacing:-.02em;margin-bottom:1.1rem;}
.about{font-size:.98rem;line-height:1.8;color:var(--muted);max-width:680px;}
.how{display:flex;flex-direction:column;gap:.9rem;max-width:680px;}
.how p{font-size:.92rem;line-height:1.8;color:var(--muted);}
.features{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));
  gap:1px;background:var(--border);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;}
.feat{background:var(--surface);padding:1.2rem;display:flex;flex-direction:column;gap:.4rem;transition:background .15s;}
.feat:hover{background:var(--surface2);}
.feat-icon{font-size:1.2rem;line-height:1;}
.feat-title{font-size:.86rem;font-weight:600;color:var(--text);}
.feat-body{font-size:.79rem;color:var(--muted);line-height:1.6;}
.diagram-wrap{background:var(--surface);border:1px solid var(--border2);
  border-radius:var(--radius-lg);overflow:hidden;padding:1.25rem;}
.diagram-wrap svg{width:100%;height:auto;display:block;}
.releases{display:flex;flex-direction:column;position:relative;padding-left:1.2rem;}
.releases::before{content:'';position:absolute;left:.35rem;top:.5rem;bottom:0;
  width:1px;background:linear-gradient(to bottom,var(--accent),transparent 90%);}
.release{position:relative;padding:.6rem 0 .6rem .5rem;border-bottom:1px solid var(--border);}
.release:last-child{border-bottom:none;}
.release::before{content:'';position:absolute;left:-.6rem;top:.9rem;
  width:.5rem;height:.5rem;border-radius:50%;
  background:var(--accent);box-shadow:0 0 6px var(--accent);}
.rel-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:.5rem;margin-bottom:.2rem;}
.rel-date{color:var(--dim);font-size:.72rem;font-family:ui-monospace,monospace;}
.rel-tag{font-family:ui-monospace,monospace;font-size:.72rem;font-weight:700;
  color:var(--accent);background:var(--accent-glow);padding:.06rem .38rem;border-radius:4px;}
.rel-name{color:var(--text);font-size:.84rem;}
.rel-note{font-size:.76rem;color:var(--muted);line-height:1.5;}
.rel-loading{color:var(--dim);font-size:.82rem;}
.posts{display:flex;flex-direction:column;gap:.4rem;}
.post{display:grid;grid-template-columns:5.5rem 1fr;gap:.75rem;font-size:.86rem;}
.post-date{color:var(--dim);font-size:.72rem;padding-top:.1rem;
  white-space:nowrap;font-family:ui-monospace,monospace;}
footer{max-width:var(--max);margin:0 auto;padding:1.5rem var(--gap);
  border-top:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.foot-l{font-size:.72rem;color:var(--dim);font-family:ui-monospace,monospace;}
.foot-r{display:flex;gap:1.5rem;font-size:.72rem;}
.foot-r a{color:var(--muted);}  .foot-r a:hover{color:var(--text);}
`;

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
  const dot    = LANG_DOT[m.language] ?? LANG_DOT["misc"];
  const accent = LANG_ACCENT[m.language] ?? "#4a8aff";
  const posts  = POSTS[d.id] ?? [];
  const { labels, values } = commitActivity(d.commits);
  const actId  = `act${d.id.replace(/[^a-z]/gi,"")}`;

  const logo   = d.logo_data_uri
    ? `<div class="hero-logo"><img src="${d.logo_data_uri}" alt="${esc(dispN)} logo"></div>` : "";

  const how = c.how.trim().split(/\n\n+/).map(p => `<p>${esc(p.trim())}</p>`).join("\n  ");

  const diag = d.diagram_inline ? `
  <div class="sec">
    <div class="eyebrow">Architecture</div>
    <div class="sec-title">System diagram</div>
    <div class="diagram-wrap">${d.diagram_inline}</div>
  </div>` : "";

  const postsHtml = posts.length > 0 ? `
  <div class="sec">
    <div class="eyebrow">Writing</div>
    <div class="sec-title">On taoofmac.com</div>
    <div class="posts">
      ${posts.map(p => `<div class="post"><span class="post-date">${p.date}</span><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></div>`).join("")}
    </div>
  </div>` : "";

  const actSpan = values.length >= 2
    ? `<div class="stat" style="grid-column:span 2;min-width:0">
        <div class="stat-l">Commit activity</div>
        <div id="${actId}" class="activity-chart"></div>
      </div>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${dispN} — Rui Carmo</title>
<meta name="description" content="${esc(c.tagline)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(dispN)} — Rui Carmo">
<meta property="og:description" content="${esc(c.tagline)}">
${d.logo_data_uri ? `<meta property="og:image" content="https://rcarmo.github.io/assets/og/${d.id}.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://rcarmo.github.io/assets/og/${d.id}.png">` : ''}
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}</style>
<script src="/assets/js/echarts.min.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <a href="/">rcarmo.github.io</a><span class="sep">/</span>
    <span class="current">${dispN}</span>
  </div>
</header>

<div class="outer">
  <div class="hero">
    <div>
      <h1><a href="${ghUrl}" target="_blank" rel="noopener">${dispN}</a></h1>
      <p class="tagline">${esc(c.tagline)}</p>
      <div class="meta">
        <span class="stars">★ ${(m.stars??0).toLocaleString()}</span>
        ${(m.forks??0)>0?`<span>⑂ ${m.forks}</span>`:""}
        <span><span class="lang-dot" style="background:${dot}"></span>${esc(m.language??"misc")}</span>
        <span class="badge badge-${c.status}">${c.status}</span>
      </div>
      ${(m.topics?.length??0)>0?`<div class="topics">${m.topics.map(t=>`<span class="topic">${esc(t)}</span>`).join("")}</div>`:""}
      <div class="cta">
        <a class="btn btn-p" href="${ghUrl}" target="_blank" rel="noopener">${ghSvg()} GitHub</a>
        ${m.homepage?`<a class="btn btn-g" href="${m.homepage}" target="_blank" rel="noopener">🌐 Homepage</a>`:""}
      </div>
    </div>
    ${logo}
  </div>

  <div class="stats">
    <div class="stat"><div class="stat-l">Stars</div><div class="stat-v">${(m.stars??0).toLocaleString()}</div><div class="stat-sub">on GitHub</div></div>
    <div class="stat"><div class="stat-l">Forks</div><div class="stat-v">${m.forks??0}</div></div>
    <div class="stat"><div class="stat-l">Language</div><div class="stat-v" style="font-size:.9rem;padding-top:.4rem"><span class="lang-dot" style="background:${dot}"></span>${esc(m.language??"—")}</div></div>
    <div class="stat"><div class="stat-l">Created</div><div class="stat-v" style="font-size:1rem;padding-top:.3rem">${m.created_at?.slice(0,4)??"?"}</div></div>
    <div class="stat"><div class="stat-l">Last push</div><div class="stat-v" style="font-size:.85rem;padding-top:.38rem">${m.pushed_at?.slice(0,7)??"?"}</div></div>
    ${actSpan}
  </div>

  <div class="sec">
    <div class="eyebrow">Overview</div>
    <p class="about">${esc(c.about.trim())}</p>
  </div>

  <div class="sec">
    <div class="eyebrow">Under the hood</div>
    <div class="sec-title">How it works</div>
    <div class="how">${how}</div>
  </div>

  <div class="sec">
    <div class="eyebrow">Capabilities</div>
    <div class="sec-title">What it does</div>
    <div class="features">
      ${c.features.map(f=>`<div class="feat"><div class="feat-icon">${f.icon}</div><div class="feat-title">${esc(f.title)}</div><div class="feat-body">${esc(f.body)}</div></div>`).join("")}
    </div>
  </div>

  ${diag}

  <div class="sec">
    <div class="eyebrow">History</div>
    <div class="sec-title">Releases</div>
    <div class="releases" id="rl"><p class="rel-loading">Loading…</p></div>
  </div>

  ${(d.releases?.length??0)>=3 ? `
  <div class="sec">
    <div class="eyebrow">Activity</div>
    <div class="sec-title">Release timeline</div>
    <div id="rel-chart-${d.id}" style="width:100%;height:120px;margin-top:.5rem"></div>
    <script>
    (function(){
      const el=document.getElementById("rel-chart-${d.id}");
      if(!el||!window.echarts) return;
      const raw=${JSON.stringify((d.releases??[]).slice(0,16).sort((a,b)=>a.date<b.date?-1:1).map(r=>({tag:r.tag,date:(r.date||"").slice(0,7)})))};
      const chart=echarts.init(el,"dark");
      chart.setOption({
        backgroundColor:"transparent",
        tooltip:{trigger:"axis",formatter:p=>"<b>"+raw[p[0]?.dataIndex]?.tag+"</b><br>"+p[0]?.name},
        grid:{left:0,right:12,top:16,bottom:40,containLabel:true},
        xAxis:{type:"category",data:raw.map(r=>r.date),axisLabel:{color:"#8b949e",fontSize:10,rotate:30},axisLine:{lineStyle:{color:"#30363d"}}},
        yAxis:{show:false},
        series:[{type:"bar",data:raw.map((_,i)=>1),itemStyle:{color:"${LANG_ACCENT[m.language??'misc']??'#4a8aff'}",opacity:.8},
          emphasis:{itemStyle:{opacity:1}},barWidth:"60%"}]
      });
      window.addEventListener("resize",()=>chart.resize());
    })();
    </script>
  </div>` : ""}

  ${postsHtml}
</div>

<footer>
  <div class="foot-l">last push ${m.pushed_at?.slice(0,10)??"?"}</div>
  <div class="foot-r">
    <a href="/">← all projects</a>
    <a href="https://taoofmac.com" target="_blank">taoofmac.com</a>
    <a href="https://github.com/rcarmo" target="_blank">github.com/rcarmo</a>
  </div>
</footer>
${activityScript(actId, labels, values, accent)}
${releasesScript(m.full_name)}
</body>
</html>`;
}

// ── Build ─────────────────────────────────────────────────────────────────
let built = 0, skipped = 0;
for (const f of (readdirSync(DATA) as string[]).filter(f => f.endsWith(".dossier.json"))) {
  const proj = f.replace(".dossier.json","");
  const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
  const c = C[proj];
  if (!c) { skipped++; continue; }
  writeFileSync(join(OUT, `${proj}.html`), page(d, c));
  console.log(`  ✓ ${proj}`);
  built++;
}
console.log(`\nBuilt ${built}, skipped ${skipped}`);
