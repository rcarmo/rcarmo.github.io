#!/usr/bin/env bun
/**
 * Build rich single-page project presentations from dossier data.
 * Pages aim to be a mini "project brief" covering motivation, architecture,
 * chronology, and highlights — not just a glorified README card.
 *
 * Run: bun run build.ts
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/workspace/projects/rcarmo.github.io";
const DATA = join(ROOT, "_data");
const OUT  = join(ROOT, "projects");
mkdirSync(OUT, { recursive: true });

// ── Types ──────────────────────────────────────────────────────────────────
type Post     = { title: string; url: string; date: string };
type Commit   = { sha: string; date: string; msg: string };
type Release  = { tag: string; name: string; date: string; body: string };
type Meta     = { name: string; full_name: string; description: string; homepage: string | null;
                  stars: number; forks: number; language: string; created_at: string;
                  pushed_at: string; topics: string[] };
type Dossier  = { id: string; meta: Meta; readme: string; commits: Commit[];
                  releases: Release[]; posts: Post[] };

// ── Extra hand-written context (motivation, architecture, highlights) ──────
type Annotation = {
  motivation?:   string;   // Why this exists
  architecture?: string;   // How it works (paragraph or bullet list in MD)
  highlights?:   string[]; // Key points / notable features (3-6 bullets)
  status?:       string;   // "active" | "stable" | "maintained" | "archived"
};

const ANNOTATIONS: Record<string, Annotation> = {
  piku: {
    status: "active",
    motivation: `In 2016 I was tired of either paying Heroku prices or running heavy orchestration
      stacks for small personal projects. The idea was brutally simple: git push should be enough.
      Piku was inspired by Dokku but aimed even lower — it had to work on a first-generation
      Raspberry Pi with 512 MB of RAM.`,
    architecture: `Piku is a single Python script that acts as a git post-receive hook.
      When you push, it reads a Procfile and an ENV file, installs dependencies, and runs
      your app under uwsgi (Python/Ruby), Gunicorn, or a plain process supervisor.
      Nginx handles incoming HTTP. No Docker, no daemon, no sidecar containers.`,
    highlights: [
      "Supports Python, Node.js, Go, Clojure, Ruby, Java, PHP, and static sites",
      "Zero-downtime deploys via worker process replacement",
      "Let's Encrypt TLS integration with one config key",
      "Runs on any POSIX system — from a Raspberry Pi to a cloud VM",
      "Active community with 155+ forks and real production deployments",
      "Now maintained by the piku org rather than a single developer",
    ],
  },
  piclaw: {
    status: "active",
    motivation: `When the OpenClaw wave hit in early 2026 I wanted a self-hosted, practical agent
      workspace that wasn't just a thin wrapper around an API. Piclaw started as a Friday night
      experiment with Bun and TypeScript and turned into a daily driver within a week.`,
    architecture: `Piclaw packages the pi-mono agent runtime into a Docker container with Supervisor
      managing three services: the Bun-based agent process, an optional VNC server, and an optional
      web terminal. State — sessions, skills, keychain — lives on a bind-mounted workspace volume.
      Extensions are hot-loaded TypeScript modules; skills are Markdown-described scripts.`,
    highlights: [
      "Multi-provider LLM support (Anthropic, OpenAI, Gemini, Ollama, Azure)",
      "Web UI with branching conversation tree and Adaptive Card support",
      "Built-in terminal, VNC, and file editor — no separate tooling needed",
      "Skill system: agent learns new capabilities from SKILL.md files at runtime",
      "Dream memory consolidation keeps long-running sessions coherent",
      "Ships as ghcr.io/rcarmo/piclaw with nightly signed releases",
    ],
  },
  PhotosExport: {
    status: "stable",
    motivation: `Apple Photos is a great app but a terrible archive. The built-in export strips or
      manuals metadata, loses album structure, and makes it hard to verify you have everything.
      When I decided to move my library off iCloud I found no existing tool handled Live Photos,
      edited variants, and albums correctly at the same time.`,
    architecture: `A Swift command-line tool using Apple's PhotoKit framework directly.
      It enumerates every asset (including shared albums and smart albums), exports originals
      and edited variants with full EXIF metadata intact, and writes a JSON manifest of the
      complete album/moment structure. No Applescript, no undocumented APIs.`,
    highlights: [
      "Exports originals AND edited variants, not just one or the other",
      "Handles Live Photos, Burst photos, and panoramas correctly",
      "Preserves album membership and folder hierarchy in a JSON manifest",
      "Progress bar with accurate per-asset counts",
      "No third-party dependencies — pure Swift + PhotoKit",
    ],
  },
  vibes: {
    status: "active",
    motivation: `The Agent Communication Protocol needs a dead-simple reference client.
      Vibes is a minimal mobile-first web app that does exactly one thing: talk to an
      ACP-compatible agent cleanly on a phone screen.`,
    architecture: `A single Python file using aiohttp for the web server and the ACP SDK for
      agent communication. The frontend is plain HTML/CSS/JS — no build step, no framework.
      State is in-memory; the conversation resets on reload. Designed as a starting point
      for your own ACP client, not as a production app.`,
    highlights: [
      "Single-file Python server, zero build step",
      "Mobile-first CSS — actually usable on a phone without pinching",
      "Server-sent events for streaming agent responses",
      "Reference implementation of ACP client/session lifecycle",
    ],
  },
  webterm: {
    status: "active",
    motivation: `Every web terminal project is either too heavy (full Node stack, webpack, five
      dependencies) or too fragile (raw xterm.js with no proper server). Webterm started as
      the terminal component inside the piclaw container and was split out when it became
      clear other projects needed it too.`,
    architecture: `A Go HTTP server that upgrades connections to WebSocket and pipes them to a PTY.
      The frontend is a single HTML file with xterm.js. go-te provides the server-side
      terminal state; the client renders escape sequences natively. TLS termination is
      handled by the caller (nginx or the embedding application).`,
    highlights: [
      "Single Go binary with zero runtime dependencies",
      "go-te for correct VT100/VT220/xterm sequence handling",
      "Configurable shell, working directory, and environment",
      "Used as the terminal backend inside piclaw and ghostty-web",
    ],
  },
  agentbox: {
    status: "active",
    motivation: `Giving an AI agent access to a shell is powerful but risky if the shell is your
      actual machine. Agentbox is the container image I actually trust to run agents in: a
      well-structured Debian userland with the tools agents need, without exposing host state.`,
    architecture: `A multi-stage Dockerfile. The base layer installs a curated set of development
      tools (git, build-essential, common language runtimes, jq, ripgrep). A GUI variant adds
      a virtual framebuffer and RDP server for visual tasks. Both variants run as a non-root
      'agent' user with sudo access for installs.`,
    highlights: [
      "Ships as :latest (shell) and :gui (VNC/RDP) variants",
      "Includes Bun, Node.js, Python 3, Go, Rust, and common shell tools",
      "Non-root agent user with passwordless sudo for controlled escalation",
      "Used as the shell container inside the piclaw dev stack",
    ],
  },
  drawterm: {
    status: "stable",
    motivation: `I use 9front on a laptop with a Retina display. Every time I opened standard
      drawterm the text was microscopic — it renders at 1x regardless of display DPI.
      This fork adds two lines of code and makes it usable on modern hardware.`,
    architecture: `A minimal fork of the Plan 9 drawterm source. The only change is reading the
      macOS display scale factor and passing it to the drawterm rendering layer, so the
      terminal and graphics scale correctly on HiDPI screens.`,
    highlights: [
      "Adds HIDPI/Retina support to Plan 9 drawterm on macOS",
      "Minimal diff from upstream — easy to rebase on newer drawterm versions",
      "Supports Apple Silicon (arm64) natively",
    ],
  },
  macemu: {
    status: "maintained",
    motivation: `I wanted to run classic Mac software for writing and nostalgia. The canonical
      Basilisk II and SheepShaver builds have build system issues on modern macOS and Linux.
      This fork keeps a working build that compiles cleanly and includes networking support.`,
    architecture: `A C++ codebase implementing 68k (Basilisk II) and PowerPC (SheepShaver) CPU
      emulation on top of modern host systems. This fork adds a CMake build, fixes several
      macOS 14+ compile issues, and enables the slirp networking backend for internet access
      from inside the emulator.`,
    highlights: [
      "Builds cleanly on macOS 14+ (arm64 and x86_64) and modern Linux",
      "Networking via slirp — no tun/tap or root required",
      "Used as the Mac emulation layer in the Maclock mini-Mac project",
      "Maintained alongside drawterm as part of a retro-computing toolkit",
    ],
  },
  "ground-init": {
    status: "active",
    motivation: `cloud-init is great for VMs but overkill and awkward for machines you
      configure by hand. I needed something idempotent that could turn a fresh bare-metal
      install into a known good state — packages, dotfiles, SSH keys, services — without
      dragging in Ansible or Chef.`,
    architecture: `A Python script that reads a YAML configuration file and applies a
      sequence of declarative steps: install packages, create users, write files, enable
      services. Each step is idempotent and reports clearly whether it changed anything.
      Ships with sample configs for Ubuntu, Debian, and Fedora Silverblue.`,
    highlights: [
      "Works on Ubuntu, Debian, Fedora (including Silverblue/rpm-ostree)",
      "YAML-driven, idempotent step execution",
      "No external dependencies beyond Python 3 standard library",
      "Ships with real-world sample configs as starting points",
    ],
  },
  "azure-stable-diffusion": {
    status: "stable",
    motivation: `In September 2022 Stable Diffusion was brand new and the only practical way
      to run it was a GPU you either owned or paid for by the hour. This template let you
      spin up an Azure NC-series spot instance in one command, run it, and tear it down
      when done — with Azure spot pricing making it a few cents per image batch.`,
    architecture: `Azure Bicep/Makefile deployment that provisions a GPU VM (NC6s_v3 by default),
      installs CUDA and the Stable Diffusion web UI, and exposes it via a forwarded SSH tunnel.
      A Makefile wraps the az CLI commands: make deploy, make open, make destroy.`,
    highlights: [
      "One-command deploy/destroy with Azure CLI + Makefile",
      "Uses spot instances — typically < $0.10/hour for NC6s_v3",
      "Survives being interrupted — state on attached data disk",
      "AUTOMATIC1111 WebUI pre-configured and ready on first boot",
    ],
  },
  "feed-summarizer": {
    status: "active",
    motivation: `I read a lot of RSS feeds but can't keep up with volume. A nightly summary
      of what was actually interesting, generated by a local LLM, meant I could skim 50
      feeds in 5 minutes instead of 50. This is the script that powers feeds.carmo.io.`,
    architecture: `Python script that fetches RSS/Atom feeds with feedparser, extracts full
      article text with trafilatura, and sends batched prompts to a local or cloud LLM.
      Outputs a static HTML digest page and a JSON summary. Runs as a cron job.`,
    highlights: [
      "Runs on a low-power ARM server — minimal resource requirements",
      "Full article extraction, not just RSS description snippets",
      "Supports local (Ollama) and cloud (OpenAI, Anthropic) LLMs",
      "Powers the public feeds.carmo.io daily digest",
    ],
  },
  umcp: {
    status: "active",
    motivation: `MCP is a good protocol but every implementation I found assumed you wanted a
      full framework with decorators, schemas, and three layers of abstraction. I wanted
      something I could drop into an existing Python script in ten lines.`,
    architecture: `Two modules: one for asyncio, one for synchronous use. Both implement the
      MCP JSON-RPC protocol over stdio. You register tools as plain Python functions with
      a docstring for the description. The server handles the protocol; you write the logic.`,
    highlights: [
      "Zero external dependencies — pure Python stdlib",
      "Both async (asyncio) and sync variants in the same package",
      "Tool registration via plain function decorator",
      "Used as a reference by several MCP tutorial posts",
    ],
  },
  "go-busybox": {
    status: "active",
    motivation: `Giving agents a full Linux userland is excessive and potentially dangerous.
      But agents genuinely need common UNIX tools — ls, cat, grep, find, sed — to do
      useful file work. go-busybox gives them exactly those tools compiled into a single
      static binary that runs safely in a minimal container.`,
    architecture: `A Go multi-call binary. Each tool is a Go package implementing the core
      POSIX semantics of the corresponding utility. The main binary dispatches to the
      right implementation based on argv[0] or a subcommand name. No CGO, compiles
      to a static binary for any POSIX target.`,
    highlights: [
      "Single static binary — no runtime dependencies, no shared libraries",
      "Covers the tools agents actually reach for: ls, cat, grep, find, sed, awk basics",
      "Designed to drop into agent sandboxes with minimal attack surface",
      "Forkable — easy to add or remove tools for your specific use case",
    ],
  },
  "proxmox-zpool-monitoring": {
    status: "stable",
    motivation: `Proxmox has good VM-level metrics but its built-in ZFS monitoring is limited.
      I wanted per-pool capacity, I/O, and health trends in Grafana alongside the rest of
      the homelab metrics. This script fills that gap.`,
    architecture: `A Python script that runs as a cron job on each Proxmox node. It calls
      zpool status, zpool iostat, and zfs list, parses the output, and sends the metrics
      to Graphite via the plaintext protocol. Grafana reads from Graphite.`,
    highlights: [
      "No agent daemon — just a cron job and a Graphite endpoint",
      "Exports pool health, capacity, read/write IOPS, and error counts",
      "Tested on Proxmox 7.x and 8.x with single and multi-disk pools",
    ],
  },
  "gnome-thumbnailers": {
    status: "stable",
    motivation: `GNOME Files shows thumbnails for JPEGs and PNGs but silently skips RAW photos,
      HEIC files, 3D model files, and many video formats. This collection of thumbnailers
      fills those gaps so the file manager is actually useful for a photographer or hardware
      tinkerer's working directory.`,
    architecture: `A set of small Python scripts, each registered as a GNOME thumbnailer via a
      .thumbnailer file. Each script takes an input file path and output PNG path and produces
      a thumbnail using the appropriate library (rawpy for RAW, Pillow for HEIC, etc.).
      Installation is a single make install.`,
    highlights: [
      "Covers RAW (CR2/NEF/ARW/ORF/RW2), HEIC/HEIF, FBX/OBJ/STL 3D models",
      "Drop-in — no GNOME restart required after install",
      "Gracefully skips thumbnailing if a required library is missing",
    ],
  },
  "go-rdp": {
    status: "active",
    motivation: `I needed remote access to Windows VMs from a browser without installing
      anything on the client side. The existing Go RDP libraries were either incomplete
      or hadn't been maintained. go-rdp started as a reference implementation and became
      the backend for the piclaw agent-stack RDP access tool.`,
    architecture: `A Go HTTP/WebSocket server that proxies RDP sessions. The Go backend
      handles the RDP protocol (FreeRDP-compatible), renders frames as JPEG over WebSocket,
      and forwards keyboard/mouse events back. The frontend is a lightweight canvas-based
      viewer. go-te provides terminal multiplexing for text-mode sessions.`,
    highlights: [
      "Browser-based RDP — no client install, works from any modern browser",
      "Go backend with no CGO requirement on Linux",
      "Shared with go-te and webterm for the terminal-over-WebSocket layer",
    ],
  },
  "pve-microvm": {
    status: "active",
    motivation: `Proxmox LXC containers share the host kernel but can't run arbitrary OCI images.
      Full VMs have great isolation but require VM images and manual setup. MicroVMs give
      you proper hypervisor isolation while letting you use any OCI container image as the
      workload — the best of both worlds for homelab use.`,
    architecture: `Shell scripts wrapping libkrun (or QEMU microvm) to boot an OCI image as a
      microVM on Proxmox. A helper script pulls the OCI image, extracts its rootfs, configures
      a minimal kernel+initrd pair, and passes them to the VMM. The VM gets a vsock or virtio-net
      interface for communication.`,
    highlights: [
      "Run any Docker Hub image as a hardware-isolated microVM on Proxmox",
      "Sub-second cold starts for Alpine-based images",
      "No VM template management — OCI images are pulled and booted directly",
      "Foundation for the sandboxed agent execution experiments in piclaw",
    ],
  },
  "homekit-steam-user-switcher": {
    status: "stable",
    motivation: `My household shares a gaming PC with multiple Steam accounts. Switching users
      meant walking to the TV, dismissing the screensaver, clicking through menus. Adding
      a HomeKit virtual switch made it a one-tap action from the phone — or an automation
      that switches accounts at bedtime.`,
    architecture: `A Python service using the HAP-python library to expose a HomeKit accessory.
      Each Steam account is a HomeKit Switch. When activated, the service uses subprocess
      to log out the current Steam user and log in the target account via the Steam CLI flags.
      Runs as a systemd service on the gaming machine.`,
    highlights: [
      "Exposes each Steam account as a HomeKit Switch",
      "Works with Siri, Shortcuts, and HomeKit automations",
      "No Steam API key required — uses local Steam CLI",
      "Runs on macOS and Linux",
    ],
  },
  "zmk-config-totem": {
    status: "stable",
    motivation: `The Totem is one of the most compact practical split keyboards but its
      ZMK config ecosystem is fragmented. This config adds ZMK Studio support so you
      can edit the keymap via GUI without reflashing, and ships with a layout tuned
      for programming and writing.`,
    architecture: `Standard ZMK config repository structure: config/, boards/, and a GitHub
      Actions workflow that builds firmware on push. The keymap uses combos for common
      brackets and symbols, tap-dance for dual-purpose keys, and home row mods.`,
    highlights: [
      "ZMK Studio support — GUI keymap editing without reflashing",
      "Home row mods with per-key timing tuned to reduce accidental triggers",
      "7 more forks than stars — clearly used as a template",
    ],
  },
  "ghostty-web": {
    status: "active",
    motivation: `Ghostty is the best terminal emulator I've used but it's a native-only app.
      For remote access scenarios — SSH into a server, work from a tablet, access an agent
      sandbox — I wanted Ghostty's rendering quality in a browser tab. ghostty-web is the
      result: Ghostty sessions served over a web interface with xterm.js API compatibility.`,
    architecture: `A TypeScript frontend using xterm.js, backed by a Go WebSocket server that
      spawns Ghostty in server mode and proxies I/O. The xterm.js compatibility layer
      translates between xterm.js events and Ghostty's terminal protocol. go-te handles
      the server-side terminal state.`,
    highlights: [
      "Ghostty rendering quality in a browser — no native client required",
      "xterm.js-compatible API for easy integration with existing tooling",
      "Shares go-te with webterm and go-rdp for a unified terminal stack",
    ],
  },
  "go-te": {
    status: "active",
    motivation: `Building webterm, go-rdp, and ghostty-web independently meant writing the same
      VT100/xterm sequence parser three times. go-te extracts that core into a reusable
      Go library that the whole terminal family can share.`,
    architecture: `A Go library implementing a VT100/VT220/xterm terminal state machine.
      It parses escape sequences, maintains a cell buffer with attributes (bold, color, etc.),
      and fires callbacks for screen updates. Applications embed go-te and render the
      cell buffer however suits them — WebSocket frames, WebGL canvas, etc.`,
    highlights: [
      "Full VT100/VT220/xterm escape sequence support",
      "Pure Go, zero CGO, compiles to any GOARCH",
      "Used by webterm, go-rdp, and ghostty-web",
      "Designed for embedding — no opinionated rendering layer",
    ],
  },
  gotel: {
    status: "active",
    motivation: `OpenTelemetry is the right standard for observability but the official Go SDK
      pulls in a large dependency tree. For small tools and homelab services I wanted
      just the parts I actually use: span creation, metric recording, and OTLP export.`,
    architecture: `A thin wrapper over the OTel Go API that initialises a TracerProvider and
      MeterProvider with sensible defaults, exports via OTLP/gRPC or OTLP/HTTP, and
      provides a handful of helpers for common patterns (HTTP middleware, goroutine spans, etc.).`,
    highlights: [
      "Minimal OTel setup in five lines of Go",
      "Supports both OTLP/gRPC and OTLP/HTTP exporters",
      "Used across the Go terminal family (webterm, go-rdp, go-te) for tracing",
    ],
  },
};

// ── CSS ────────────────────────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d1117; --surface: #161b22; --surface2: #21262d;
    --border: #30363d; --text: #e6edf3; --muted: #8b949e;
    --accent: #58a6ff; --accent2: #f78166; --tag-bg: #21262d;
    --tag-text: #79c0ff; --star: #e3b341; --radius: 8px; --gap: 1.5rem;
    --max: 860px;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f6f8fa; --surface: #ffffff; --surface2: #f0f3f6;
      --border: #d0d7de; --text: #1f2328; --muted: #656d76;
      --accent: #0969da; --accent2: #cf222e;
      --tag-bg: #ddf4ff; --tag-text: #0550ae; --star: #9a6700;
    }
  }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 15px; line-height: 1.7; }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  code, .mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 0.875em; }
  .wrap { max-width: var(--max); margin: 0 auto; padding: 0 var(--gap); }
  /* Nav */
  nav { border-bottom: 1px solid var(--border); padding: 0.7rem 0; font-size: 0.875rem; color: var(--muted); }
  nav .wrap { display: flex; align-items: center; gap: 0.6rem; }
  nav a { color: var(--muted); } nav a:hover { color: var(--accent); }
  nav .sep { opacity: 0.4; }
  /* Hero */
  .hero { padding: 3rem 0 2.5rem; border-bottom: 1px solid var(--border); }
  .hero h1 { font-size: 2.2rem; font-weight: 700; letter-spacing: -0.02em; }
  .hero h1 a { color: var(--text); } .hero h1 a:hover { color: var(--accent); text-decoration: none; }
  .hero .tagline { font-size: 1.1rem; color: var(--muted); margin: 0.5rem 0 1.25rem; max-width: 640px; }
  .stats { display: flex; flex-wrap: wrap; gap: 1.2rem; font-size: 0.875rem; color: var(--muted); margin-bottom: 1rem; }
  .stat-stars { color: var(--star); font-weight: 600; }
  .lang-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; vertical-align: middle; margin-right: 3px; }
  .lang-TypeScript{background:#3178c6} .lang-Python{background:#3572A5}
  .lang-Go{background:#00ADD8} .lang-Swift{background:#F05138}
  .lang-C{background:#555555} .lang-Cpp{background:#f34b7d}
  .lang-Dockerfile{background:#384d54} .lang-Shell{background:#89e051}
  .lang-misc{background:#8b949e}
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; }
  .tag { background: var(--tag-bg); color: var(--tag-text); font-size: 0.75rem; padding: 0.15rem 0.55rem; border-radius: 2em; }
  .status-badge { font-size: 0.75rem; padding: 0.2rem 0.65rem; border-radius: 2em; font-weight: 600; }
  .status-active { background: #1a3e1a; color: #56d364; }
  .status-stable { background: #1a2e3e; color: #58a6ff; }
  .status-maintained { background: #2e1a3e; color: #bc8cff; }
  .status-archived { background: #2e2010; color: #e3b341; }
  @media (prefers-color-scheme: light) {
    .status-active { background: #dafbe1; color: #1a7f37; }
    .status-stable { background: #ddf4ff; color: #0969da; }
    .status-maintained { background: #fbefff; color: #8250df; }
    .status-archived { background: #fff8c5; color: #9a6700; }
  }
  .cta-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .btn { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--surface);
    border: 1px solid var(--border); border-radius: var(--radius); padding: 0.5rem 1rem;
    font-size: 0.875rem; font-weight: 500; color: var(--text); transition: border-color 0.15s; }
  .btn:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
  /* TOC */
  .toc { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1rem 1.25rem; margin: 2rem 0; display: inline-block; min-width: 200px; }
  .toc h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 0.6rem; }
  .toc ol { padding-left: 1.25rem; font-size: 0.875rem; line-height: 2; }
  .toc a { color: var(--muted); } .toc a:hover { color: var(--accent); }
  /* Sections */
  section { padding: 2.5rem 0; border-bottom: 1px solid var(--border); }
  section:last-of-type { border-bottom: none; }
  .section-label { font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--muted); margin-bottom: 1rem; }
  section h2 { font-size: 1.35rem; font-weight: 600; margin-bottom: 1rem; }
  section p { max-width: 680px; color: var(--text); margin-bottom: 0.75rem; }
  section ul { max-width: 680px; padding-left: 1.5rem; margin-bottom: 0.75rem; }
  section li { margin-bottom: 0.35rem; }
  /* Highlights */
  .highlights { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 0.75rem; margin-top: 0.5rem; }
  .highlight { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 0.85rem 1rem; font-size: 0.9rem; }
  .highlight::before { content: "→"; color: var(--accent); margin-right: 0.5rem; }
  /* Timeline */
  .timeline { display: flex; flex-direction: column; gap: 0; margin-top: 0.5rem; }
  .tl-item { display: grid; grid-template-columns: 9rem 1fr; gap: 1rem; padding: 0.6rem 0;
    border-top: 1px solid var(--border); font-size: 0.875rem; }
  .tl-item:first-child { border-top: none; }
  .tl-date { color: var(--muted); white-space: nowrap; font-size: 0.8rem; padding-top: 0.1rem; }
  .tl-msg { color: var(--text); word-break: break-word; }
  .tl-msg .sha { font-family: ui-monospace, monospace; font-size: 0.75em; color: var(--muted); margin-left: 0.5rem; }
  /* Posts */
  .post-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .post-item { display: grid; grid-template-columns: 6rem 1fr; gap: 0.75rem; font-size: 0.9rem; }
  .post-date { color: var(--muted); font-size: 0.8rem; padding-top: 0.15rem; }
  /* Releases */
  .release-list { display: flex; flex-direction: column; gap: 1rem; }
  .release { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.25rem; }
  .release-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.4rem; }
  .release-tag { font-weight: 600; font-family: ui-monospace, monospace; color: var(--accent); }
  .release-name { color: var(--text); }
  .release-date { color: var(--muted); font-size: 0.8rem; margin-left: auto; }
  .release-body { font-size: 0.85rem; color: var(--muted); white-space: pre-wrap; word-break: break-word; }
  /* Footer */
  footer { text-align: center; color: var(--muted); font-size: 0.825rem;
    padding: 2.5rem var(--gap) 1.5rem; border-top: 1px solid var(--border); margin-top: 1rem; }
  footer a { color: var(--muted); } footer a:hover { color: var(--accent); }
`;

const LANG_CLASS: Record<string, string> = {
  TypeScript: "lang-TypeScript", Python: "lang-Python", Go: "lang-Go",
  Swift: "lang-Swift", C: "lang-C", "C++": "lang-Cpp", Dockerfile: "lang-Dockerfile",
  Shell: "lang-Shell",
};

function ghIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

function esc(s: string) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function page(d: Dossier, ann: Annotation = {}): string {
  const m = d.meta;
  const ghUrl = `https://github.com/${m.full_name}`;
  const langClass = LANG_CLASS[m.language] ?? "lang-misc";
  const created = m.created_at.slice(0, 7);
  const pushed  = m.pushed_at.slice(0, 7);
  const status  = ann.status ?? "stable";
  const displayName = m.full_name.includes("/") && m.full_name.split("/")[0] !== "rcarmo"
    ? m.full_name : m.name;

  // Build sections conditionally
  const hasPosts    = d.posts.length > 0;
  const hasReleases = d.releases.length > 0;
  const hasCommits  = d.commits.length > 0;

  const tocItems = [
    ann.motivation   ? `<li><a href="#motivation">Motivation</a></li>` : "",
    ann.architecture ? `<li><a href="#architecture">Architecture</a></li>` : "",
    ann.highlights   ? `<li><a href="#highlights">Highlights</a></li>` : "",
    hasReleases      ? `<li><a href="#releases">Releases</a></li>` : "",
    hasCommits       ? `<li><a href="#history">History</a></li>` : "",
    hasPosts         ? `<li><a href="#posts">Posts</a></li>` : "",
  ].filter(Boolean).join("\n        ");

  const motivationSection = ann.motivation ? `
  <section id="motivation">
    <div class="wrap">
      <div class="section-label">Why it exists</div>
      <h2>Motivation</h2>
      <p>${esc(ann.motivation.trim().replace(/\n\s+/g, " "))}</p>
    </div>
  </section>` : "";

  const architectureSection = ann.architecture ? `
  <section id="architecture">
    <div class="wrap">
      <div class="section-label">How it works</div>
      <h2>Architecture</h2>
      <p>${esc(ann.architecture.trim().replace(/\n\s+/g, " "))}</p>
    </div>
  </section>` : "";

  const highlightsSection = ann.highlights ? `
  <section id="highlights">
    <div class="wrap">
      <div class="section-label">Notable features</div>
      <h2>Highlights</h2>
      <div class="highlights">
        ${ann.highlights.map(h => `<div class="highlight">${esc(h)}</div>`).join("\n        ")}
      </div>
    </div>
  </section>` : "";

  const releasesSection = hasReleases ? `
  <section id="releases">
    <div class="wrap">
      <div class="section-label">Versions</div>
      <h2>Releases</h2>
      <div class="release-list">
        ${d.releases.slice(0, 10).map(r => `
        <div class="release">
          <div class="release-header">
            <span class="release-tag">${esc(r.tag)}</span>
            <span class="release-name">${esc(r.name)}</span>
            <span class="release-date">${r.date.slice(0,10)}</span>
          </div>
          ${r.body ? `<div class="release-body">${esc(r.body.trim())}</div>` : ""}
        </div>`).join("")}
      </div>
    </div>
  </section>` : "";

  const historySection = hasCommits ? `
  <section id="history">
    <div class="wrap">
      <div class="section-label">Chronology (most recent ${d.commits.length} commits)</div>
      <h2>History</h2>
      <div class="timeline">
        ${d.commits.map(c => `
        <div class="tl-item">
          <span class="tl-date">${c.date.slice(0, 10)}</span>
          <span class="tl-msg">${esc(c.msg)}<span class="sha">${c.sha}</span></span>
        </div>`).join("")}
      </div>
    </div>
  </section>` : "";

  const postsSection = hasPosts ? `
  <section id="posts">
    <div class="wrap">
      <div class="section-label">On taoofmac.com</div>
      <h2>Related Posts</h2>
      <div class="post-list">
        ${d.posts.map(p => `
        <div class="post-item">
          <span class="post-date">${p.date}</span>
          <a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a>
        </div>`).join("")}
      </div>
    </div>
  </section>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${displayName} — Rui Carmo</title>
<meta name="description" content="${esc(m.description ?? "")}">
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}</style>
</head>
<body>

<nav>
  <div class="wrap">
    <a href="/">rcarmo.github.io</a>
    <span class="sep">/</span>
    <span>${displayName}</span>
  </div>
</nav>

<div class="hero">
  <div class="wrap">
    <h1><a href="${ghUrl}" target="_blank" rel="noopener">${displayName}</a></h1>
    <p class="tagline">${esc(m.description ?? "")}</p>
    <div class="stats">
      <span class="stat-stars">★ ${m.stars.toLocaleString()}</span>
      ${m.forks > 0 ? `<span>⑂ ${m.forks}</span>` : ""}
      <span><span class="lang-dot ${langClass}"></span>${m.language ?? "misc"}</span>
      <span class="mono">${created}</span>
      <span class="status-badge status-${status}">${status}</span>
    </div>
    <div class="tags">
      ${(m.topics ?? []).map(t => `<span class="tag">${esc(t)}</span>`).join(" ")}
    </div>
    <div class="cta-links">
      <a class="btn" href="${ghUrl}" target="_blank" rel="noopener">${ghIcon()} GitHub</a>
      ${m.homepage ? `<a class="btn" href="${m.homepage}" target="_blank" rel="noopener">🌐 ${esc(m.homepage)}</a>` : ""}
    </div>
    <div class="toc">
      <h3>On this page</h3>
      <ol>${tocItems}</ol>
    </div>
  </div>
</div>

${motivationSection}
${architectureSection}
${highlightsSection}
${releasesSection}
${historySection}
${postsSection}

<footer>
  <a href="/">← All projects</a> &nbsp;·&nbsp;
  <a href="https://taoofmac.com" target="_blank" rel="noopener">taoofmac.com</a> &nbsp;·&nbsp;
  <a href="https://github.com/rcarmo" target="_blank" rel="noopener">github.com/rcarmo</a>
  <br><br>Last indexed ${pushed}
</footer>

</body>
</html>`;
}

// ── Build all ──────────────────────────────────────────────────────────────
let built = 0;
for (const f of Array.from(require("node:fs").readdirSync(DATA) as string[]).filter((f:string) => f.endsWith(".dossier.json"))) {
  const proj = f.replace(".dossier.json", "");
  const d: Dossier = JSON.parse(readFileSync(join(DATA, f), "utf-8"));
  const ann = ANNOTATIONS[proj] ?? {};
  writeFileSync(join(OUT, `${proj}.html`), page(d, ann));
  built++;
}
console.log(`Built ${built} project pages → ${OUT}`);
