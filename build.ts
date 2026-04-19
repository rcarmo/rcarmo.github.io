#!/usr/bin/env bun
/**
 * Build per-project HTML pages for rcarmo.github.io
 * Run: bun run build.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "/workspace/projects/rcarmo.github.io/projects";
mkdirSync(OUT, { recursive: true });

type Post = { title: string; url: string; date: string };
type Project = {
  id: string; owner: string; name: string;
  stars: number; forks: number; lang: string; langClass: string;
  created: string; desc: string; longDesc: string;
  tags: string[]; posts: Post[]; homepage?: string;
};

const PROJECTS: Project[] = [
  {
    id: "piku", owner: "piku", name: "piku",
    stars: 6569, forks: 155, lang: "Python", langClass: "lang-Python",
    created: "2016",
    desc: "The tiniest PaaS you've ever seen.",
    longDesc: `Git-push deployments to your own server — Heroku-style, without the Heroku bill.
Piku was born in 2016 out of frustration with over-engineered deployment pipelines.
The idea was simple: if you can run SSH and Python on a Raspberry Pi, you can have
your own PaaS. The project grew from a weekend hack into a community-maintained tool
with support for Python, Node, Go, Clojure, Ruby, and more. Runs on a $35 Raspberry Pi or a $5/month VPS.`,
    tags: ["paas", "deployment", "git-push", "raspberry-pi", "python", "self-hosted"],
    homepage: "https://piku.github.io",
    posts: [
      { title: "Some Breakage May Ensue", date: "2016-04-25", url: "https://taoofmac.com/space/blog/2016/04/25/1400" },
      { title: "Third Python's The Charm", date: "2016-12-04", url: "https://taoofmac.com/space/blog/2016/12/04/1351" },
      { title: "A Random Asynchronous Walk", date: "2017-04-02", url: "https://taoofmac.com/space/blog/2017/04/02/2150" },
      { title: "My Quest for Home Automation, Part 2", date: "2018-03-25", url: "https://taoofmac.com/space/blog/2018/03/25/2244" },
      { title: "The Third Python", date: "2018-07-08", url: "https://taoofmac.com/space/blog/2018/07/08/1330" },
      { title: "My Quest for Home Automation, Part 3", date: "2018-09-23", url: "https://taoofmac.com/space/blog/2018/09/23/1840" },
      { title: "Dealing With a Million Legacy Files Every Day", date: "2019-08-11", url: "https://taoofmac.com/space/blog/2019/08/11/2230" },
      { title: "Deployment Pains", date: "2019-10-13", url: "https://taoofmac.com/space/blog/2019/10/13/1630" },
      { title: "Living The Static Life", date: "2021-03-06", url: "https://taoofmac.com/space/blog/2021/03/06/1130" },
      { title: "Building My Own Yahoo! Pipes", date: "2021-03-20", url: "https://taoofmac.com/space/blog/2021/03/20/1945" },
      { title: "Homelab Tour", date: "2022-02-12", url: "https://taoofmac.com/space/blog/2022/02/12/1930" },
      { title: "Getting Takahē to run on Piku", date: "2022-12-21", url: "https://taoofmac.com/space/blog/2022/12/21/0900" },
      { title: "A Fediverse Update", date: "2023-07-09", url: "https://taoofmac.com/space/blog/2023/07/09/1800" },
      { title: "Summer Minimalism", date: "2023-08-20", url: "https://taoofmac.com/space/blog/2023/08/20/1600" },
      { title: "My Quest For Home Automation, Part 6", date: "2025-05-03", url: "https://taoofmac.com/space/blog/2025/05/03/1830" },
      { title: "My Rube Goldberg RSS Pipeline", date: "2026-01-17", url: "https://taoofmac.com/space/blog/2026/01/17/2130" },
    ],
  },
  {
    id: "piclaw", owner: "rcarmo", name: "piclaw",
    stars: 526, forks: 37, lang: "TypeScript", langClass: "lang-TypeScript",
    created: "2026",
    desc: "I'm going to build my own OpenClaw, with blackjack… and bun!",
    longDesc: `A self-hosted AI agent sandbox built on Bun and TypeScript.
Piclaw packages a personal coding agent into a Docker container with a web UI,
WhatsApp integration, a terminal, VNC, and a rich skill/extension system.
It is the runtime that runs this very portfolio and powers day-to-day AI workflows.`,
    tags: ["ai", "agents", "bun", "typescript", "docker", "self-hosted"],
    posts: [
      { title: "Vibing with the Agent Control Protocol", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/2100" },
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
      { title: "Thoughts on AI-Assisted Software Development in 2026", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/2130" },
      { title: "So You Want To Do Agentic Development", date: "2026-03-08", url: "https://taoofmac.com/space/blog/2026/03/08/2130" },
    ],
  },
  {
    id: "PhotosExport", owner: "rcarmo", name: "PhotosExport",
    stars: 280, forks: 7, lang: "Swift", langClass: "lang-Swift",
    created: "2025",
    desc: "Export ALL your data from Apple Photos.",
    longDesc: `A macOS command-line tool that exports every photo, video, album, and
metadata from your Apple Photos library — including Live Photos, edited versions,
and all EXIF data. Written in Swift using the PhotoKit framework directly to
ensure nothing is missed. Built because the Photos export UI is notoriously
incomplete and third-party tools miss edge cases.`,
    tags: ["macos", "swift", "apple-photos", "export", "data-liberation"],
    posts: [
      { title: "We Can't Remember It For You Wholesale", date: "2016-09-25", url: "https://taoofmac.com/space/blog/2016/09/25/1050" },
      { title: "Renaming and Filing Photos and Videos in the HEIC/HEIF era", date: "2023-01-14", url: "https://taoofmac.com/space/blog/2023/01/14/1745" },
    ],
  },
  {
    id: "vibes", owner: "rcarmo", name: "vibes",
    stars: 142, forks: 3, lang: "Python", langClass: "lang-Python",
    created: "2026",
    desc: "A simple mobile-focused chat app to talk to an agent via the ACP protocol.",
    longDesc: `A lightweight Python web app implementing the Agent Communication Protocol (ACP)
to give you a clean mobile-first chat interface to any compatible AI agent.
Easy to self-host and extend — no heavy framework, no unnecessary dependencies.`,
    tags: ["acp", "agents", "python", "chat", "mobile"],
    posts: [
      { title: "Vibing with the Agent Control Protocol", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/2100" },
      { title: "Notes for February 2-7", date: "2026-02-07", url: "https://taoofmac.com/space/notes/2026/02/07/2000" },
    ],
  },
  {
    id: "webterm", owner: "rcarmo", name: "webterm",
    stars: 106, forks: 6, lang: "Go", langClass: "lang-Go",
    created: "2026",
    desc: "Yet another web terminal, but with style.",
    longDesc: `A Go-based web terminal server that drives a full xterm-compatible terminal
emulator in the browser over WebSockets. Designed to be embedded in larger systems
like the agent sandbox stack. Built with correctness and low resource usage in mind.`,
    tags: ["go", "terminal", "websocket", "xterm"],
    posts: [
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
      { title: "Notes for February 8-15", date: "2026-02-15", url: "https://taoofmac.com/space/notes/2026/02/15/1530" },
    ],
  },
  {
    id: "agentbox", owner: "rcarmo", name: "agentbox",
    stars: 97, forks: 5, lang: "Dockerfile", langClass: "lang-Dockerfile",
    created: "2026",
    desc: "Contain your coding agents (literally).",
    longDesc: `A curated Docker image to safely sandbox AI coding agents.
Provides a well-structured Debian-based environment with the tools agents commonly
need — git, build tools, runtimes — without exposing host system resources.
Ships as both a shell-only and a GUI-capable variant.`,
    tags: ["docker", "sandbox", "agents", "security"],
    posts: [
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
      { title: "Thoughts on AI-Assisted Software Development in 2026", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/2130" },
    ],
  },
  {
    id: "ground-init", owner: "rcarmo", name: "ground-init",
    stars: 64, forks: 1, lang: "Python", langClass: "lang-Python",
    created: "2022",
    desc: "Almost, but not quite, cloud-init.",
    longDesc: `A local machine bootstrap tool that does what cloud-init does for VMs,
but for bare-metal Linux machines you set up by hand. Idempotent Python scripts
that configure a fresh Ubuntu/Debian/Fedora system to a known state — packages,
users, SSH keys, dotfiles, services — without requiring a full config management stack.`,
    tags: ["linux", "devops", "bootstrap", "automation", "python"],
    posts: [
      { title: "Reviving a MacBook Air with Fedora Silverblue", date: "2025-11-05", url: "https://taoofmac.com/space/blog/2025/11/05/2200" },
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
    ],
  },
  {
    id: "azure-stable-diffusion", owner: "rcarmo", name: "azure-stable-diffusion",
    stars: 44, forks: 6, lang: "Makefile", langClass: "lang-misc",
    created: "2022",
    desc: "An Azure template to run Stable Diffusion on a GPU-enabled spot instance.",
    longDesc: `One-command deployment of Stable Diffusion on an Azure GPU spot instance.
Built when Stable Diffusion first dropped and everyone wanted to run it without
buying a $3,000 GPU. Uses spot pricing to make it affordable for occasional use,
tears down when you're done. Still referenced for temporary AI workloads on Azure.`,
    tags: ["azure", "stable-diffusion", "gpu", "cloud", "ai"],
    posts: [
      { title: "Very Stable Diffusion", date: "2022-09-03", url: "https://taoofmac.com/space/blog/2022/09/03/1400" },
      { title: "A Diffuse Return", date: "2022-11-27", url: "https://taoofmac.com/space/blog/2022/11/27/1800" },
    ],
  },
  {
    id: "pve-microvm", owner: "rcarmo", name: "pve-microvm",
    stars: 3, forks: 0, lang: "Shell", langClass: "lang-Shell",
    created: "2025",
    desc: "OCI microVMs for Proxmox VE.",
    longDesc: `Shell scripts to run lightweight microVMs directly from OCI container images
on Proxmox VE. Fills the gap between full VMs and LXC containers: hypervisor-level
isolation without the overhead of full VM images, using any Docker Hub image directly.`,
    tags: ["proxmox", "microvm", "oci", "containers", "homelab"],
    posts: [
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
    ],
  },
  {
    id: "homekit-steam-user-switcher", owner: "rcarmo", name: "homekit-steam-user-switcher",
    stars: 41, forks: 0, lang: "Python", langClass: "lang-Python",
    created: "2022",
    desc: "Remotely switch Steam users using HomeKit automations.",
    longDesc: `A HomeKit-accessible Python service that switches the active Steam user on a
shared PC or Mac. Useful for households with multiple Steam accounts — trigger
it from an iPhone, Siri, or a HomeKit automation before sitting down to play.`,
    tags: ["homekit", "steam", "python", "home-automation", "gaming"],
    posts: [
      { title: "Notes, 2025-12-24", date: "2025-12-24", url: "https://taoofmac.com/space/notes/2025/12/24/1400" },
    ],
  },
  {
    id: "drawterm", owner: "rcarmo", name: "drawterm",
    stars: 26, forks: 2, lang: "C", langClass: "lang-C",
    created: "2022",
    desc: "Plan 9 / 9front drawterm with HIDPI scaling on macOS.",
    longDesc: `A fork of the Plan 9 drawterm client with HIDPI scaling for modern Retina Macs.
Standard drawterm renders at 1x on a 2x display, making everything tiny.
This fork fixes that for anyone still using 9front or Plan 9 on current hardware.`,
    tags: ["plan9", "9front", "macos", "c", "hidpi"],
    posts: [
      { title: "Notes, 2025-12-24", date: "2025-12-24", url: "https://taoofmac.com/space/notes/2025/12/24/1400" },
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
    ],
  },
  {
    id: "macemu", owner: "rcarmo", name: "macemu",
    stars: 3, forks: 0, lang: "C++", langClass: "lang-Cpp",
    created: "2023",
    desc: "Basilisk II and SheepShaver Macintosh emulators.",
    longDesc: `My working fork of Basilisk II (68k) and SheepShaver (PowerPC) Macintosh
emulators, with networking support and minor fixes for building on modern systems.
Used to run classic Mac software on current hardware — the direct ancestor of
the Maclock and mini Mac projects documented on taoofmac.com.`,
    tags: ["emulation", "mac", "68k", "powerpc", "c++"],
    posts: [
      { title: "Notes for July 2024", date: "2024-07-21", url: "https://taoofmac.com/space/notes/2024/07/21/1800" },
      { title: "Notes, 2025-12-31", date: "2025-12-31", url: "https://taoofmac.com/space/notes/2025/12/31/1830" },
      { title: "Notes for March 23-29", date: "2026-03-29", url: "https://taoofmac.com/space/notes/2026/03/29/1300" },
      { title: "Notes for March 30 – April 5", date: "2026-04-05", url: "https://taoofmac.com/space/notes/2026/04/05/1700" },
    ],
  },
  {
    id: "feed-summarizer", owner: "rcarmo", name: "feed-summarizer",
    stars: 27, forks: 2, lang: "Python", langClass: "lang-Python",
    created: "2024",
    desc: "The feed summarizer that powers feeds.carmo.io.",
    longDesc: `An LLM-powered RSS/Atom feed summarizer. Ingests feeds, extracts full article
text, and generates concise summaries using a local or cloud language model.
Powers the public digest at feeds.carmo.io. Designed to run on a low-resource
server and be extended with custom prompts per feed.`,
    tags: ["llm", "rss", "python", "summarization", "self-hosted"],
    homepage: "https://feeds.carmo.io",
    posts: [
      { title: "My Rube Goldberg RSS Pipeline", date: "2026-01-17", url: "https://taoofmac.com/space/blog/2026/01/17/2130" },
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
    ],
  },
  {
    id: "umcp", owner: "rcarmo", name: "umcp",
    stars: 11, forks: 2, lang: "Python", langClass: "lang-Python",
    created: "2025",
    desc: "A micro MCP server for stdio only.",
    longDesc: `The smallest practical MCP server implementation, supporting both asyncio and
synchronous tool handlers over stdio. No external dependencies.
Designed to be embedded in existing Python tools or used as a reference
implementation when you don't want a full framework.`,
    tags: ["mcp", "python", "llm", "tools", "minimal"],
    posts: [
      { title: "Creating Per-Project MCP Servers", date: "2025-10-04", url: "https://taoofmac.com/space/blog/2025/10/04/1111" },
      { title: "Notes on SKILL.md vs MCP", date: "2026-01-14", url: "https://taoofmac.com/space/notes/2026/01/14/0830" },
    ],
  },
  {
    id: "go-busybox", owner: "rcarmo", name: "go-busybox",
    stars: 10, forks: 2, lang: "Go", langClass: "lang-Go",
    created: "2026",
    desc: "A sandboxable BusyBox port for AI agents.",
    longDesc: `A Go reimplementation of core BusyBox UNIX utilities, designed to run safely
inside agent sandboxes. Gives agents familiar shell tools (ls, cat, grep, sed, find)
without requiring a full Linux userland or root privileges.`,
    tags: ["go", "sandbox", "agents", "busybox", "unix"],
    posts: [
      { title: "Vibing with the Agent Control Protocol", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/2100" },
      { title: "Notes for February 2-7", date: "2026-02-07", url: "https://taoofmac.com/space/notes/2026/02/07/2000" },
      { title: "Notes for February 8-15", date: "2026-02-15", url: "https://taoofmac.com/space/notes/2026/02/15/1530" },
    ],
  },
  {
    id: "proxmox-zpool-monitoring", owner: "rcarmo", name: "proxmox-zpool-monitoring",
    stars: 7, forks: 2, lang: "Python", langClass: "lang-Python",
    created: "2022",
    desc: "ZFS pool monitoring for Proxmox VE.",
    longDesc: `Python scripts that export ZFS pool health, usage, and I/O metrics from Proxmox VE
to Graphite and Grafana. Fills a gap in the Proxmox built-in dashboards for
homelab users who want per-pool time-series visibility.`,
    tags: ["proxmox", "zfs", "monitoring", "graphite", "homelab"],
    posts: [
      { title: "Proxmox VE on the FriendlyELEC CM3588 NAS", date: "2024-11-09", url: "https://taoofmac.com/space/notes/2024/11/09/1940" },
    ],
  },
  {
    id: "gnome-thumbnailers", owner: "rcarmo", name: "gnome-thumbnailers",
    stars: 26, forks: 5, lang: "Python", langClass: "lang-Python",
    created: "2022",
    desc: "File thumbnailing utilities for GNOME 42+.",
    longDesc: `Python thumbnailer scripts for GNOME that handle formats the default
thumbnailer ignores — RAW photos, HEIC/HEIF, various video containers,
3D model files, and more. Drop-in install; GNOME Files immediately shows
thumbnails for file types it previously left blank.`,
    tags: ["gnome", "linux", "python", "thumbnails", "files"],
    posts: [
      { title: "You Can Leave Your Hat On", date: "2022-04-02", url: "https://taoofmac.com/space/blog/2022/04/02/2130" },
      { title: "Homelab Update", date: "2022-10-28", url: "https://taoofmac.com/space/blog/2022/10/28/1900" },
    ],
  },
  {
    id: "zmk-config-totem", owner: "rcarmo", name: "zmk-config-totem",
    stars: 2, forks: 7, lang: "misc", langClass: "lang-misc",
    created: "2024",
    desc: "ZMK keymap for the Totem split keyboard with Studio support.",
    longDesc: `Personal ZMK keymap for the Totem — an ultra-low-profile, 34-key split ergonomic
keyboard. Includes ZMK Studio support for GUI-based keymap editing. More forks than
stars suggests people use it as a starting point for their own Totem configs.`,
    tags: ["keyboard", "zmk", "split-keyboard", "ergonomics"],
    posts: [],
  },
  {
    id: "go-rdp", owner: "rcarmo", name: "go-rdp",
    stars: 9, forks: 1, lang: "Go", langClass: "lang-Go",
    created: "2026",
    desc: "A Go-backed web RDP client and reference implementation.",
    longDesc: `A browser-based RDP client built on a Go backend — connects to Windows machines
via RDP from any browser tab with no client install. Also a reference implementation
for Go-based RDP protocol handling. Part of the same family as webterm and go-te.`,
    tags: ["go", "rdp", "windows", "browser", "remote-desktop"],
    posts: [
      { title: "Notes for January 19-25", date: "2026-01-25", url: "https://taoofmac.com/space/notes/2026/01/25/2030" },
      { title: "Seizing The Means Of Production (Again)", date: "2026-02-01", url: "https://taoofmac.com/space/notes/2026/02/01/1940" },
      { title: "Notes for February 8-15", date: "2026-02-15", url: "https://taoofmac.com/space/notes/2026/02/15/1530" },
    ],
  },
  {
    id: "ghostty-web", owner: "rcarmo", name: "ghostty-web",
    stars: 5, forks: 2, lang: "TypeScript", langClass: "lang-TypeScript",
    created: "2026",
    desc: "Ghostty for the web with xterm.js API compatibility.",
    longDesc: `A TypeScript/Go project that serves Ghostty terminal sessions in a browser
with an xterm.js-compatible API layer. Lets you run Ghostty — the fast native
terminal — remotely through a web interface, reusing existing xterm.js tooling.`,
    tags: ["ghostty", "terminal", "typescript", "browser"],
    posts: [],
  },
  {
    id: "go-te", owner: "rcarmo", name: "go-te",
    stars: 7, forks: 0, lang: "Go", langClass: "lang-Go",
    created: "2026",
    desc: "A terminal emulation library for Go.",
    longDesc: `The core terminal emulation engine used by webterm, ghostty-web, and go-rdp.
A Go library implementing VT100/VT220/xterm escape sequence parsing and state
management, designed to be embedded in Go applications that need to drive
or display terminal sessions.`,
    tags: ["go", "terminal", "library", "vt100", "xterm"],
    posts: [],
  },
  {
    id: "gotel", owner: "rcarmo", name: "gotel",
    stars: 5, forks: 0, lang: "Go", langClass: "lang-Go",
    created: "2026",
    desc: "OpenTelemetry for tiny gophers.",
    longDesc: `A minimal, low-overhead OpenTelemetry client library for small Go services
and embedded tools. No heavy SDK dependency tree — just what you need
to emit traces and metrics from tools that should stay lean.`,
    tags: ["go", "opentelemetry", "observability", "tracing", "metrics"],
    posts: [],
  },
];

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d1117; --surface: #161b22; --border: #30363d;
    --text: #e6edf3; --muted: #8b949e; --accent: #58a6ff; --accent2: #f78166;
    --tag-bg: #21262d; --tag-text: #79c0ff; --star: #e3b341; --radius: 8px; --gap: 1.5rem;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #f6f8fa; --surface: #ffffff; --border: #d0d7de;
      --text: #1f2328; --muted: #656d76; --accent: #0969da;
      --tag-bg: #ddf4ff; --tag-text: #0550ae; --star: #9a6700;
    }
  }
  body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.7; }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .wrap { max-width: 860px; margin: 0 auto; padding: var(--gap); }
  nav { border-bottom: 1px solid var(--border); padding: 0.75rem var(--gap); display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: var(--muted); }
  nav a { color: var(--muted); } nav a:hover { color: var(--accent); }
  nav span { color: var(--border); }
  .hero { padding: 2.5rem 0 2rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
  .hero h1 { font-size: 2rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
  .hero h1 a { color: var(--text); } .hero h1 a:hover { color: var(--accent); text-decoration: none; }
  .hero .tagline { color: var(--muted); font-size: 1.05rem; margin: 0.6rem 0 1rem; }
  .stats { display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.875rem; color: var(--muted); margin-bottom: 1rem; }
  .stars { color: var(--star); font-weight: 600; }
  .lang-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .lang-TypeScript { background: #3178c6; } .lang-Python { background: #3572A5; }
  .lang-Go { background: #00ADD8; } .lang-Swift { background: #F05138; }
  .lang-C { background: #555555; } .lang-Cpp { background: #f34b7d; }
  .lang-Dockerfile { background: #384d54; } .lang-Shell { background: #89e051; }
  .lang-OpenSCAD { background: #e5cd31; } .lang-misc { background: #8b949e; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag { display: inline-block; background: var(--tag-bg); color: var(--tag-text); font-size: 0.75rem; padding: 0.15rem 0.55rem; border-radius: 2em; }
  section { margin: 2rem 0; }
  section h2 { font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
  .desc-text { color: var(--text); max-width: 680px; }
  .post-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .post-list li { display: flex; align-items: baseline; gap: 0.75rem; font-size: 0.9rem; }
  .post-list .date { color: var(--muted); font-size: 0.8rem; white-space: nowrap; min-width: 6rem; }
  .gh-link { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: var(--text); transition: border-color 0.15s; }
  .gh-link:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
  footer { text-align: center; color: var(--muted); font-size: 0.825rem; padding: 2.5rem var(--gap) 1.5rem; border-top: 1px solid var(--border); margin-top: 3rem; }
`;

function page(p: Project): string {
  const ghUrl = `https://github.com/${p.owner}/${p.name}`;
  const postsHtml = p.posts.length
    ? `<section>
      <h2>Related posts on taoofmac.com</h2>
      <ul class="post-list">
        ${p.posts.map(post =>
          `<li><span class="date">${post.date}</span><a href="${post.url}" target="_blank">${post.title}</a></li>`
        ).join("\n        ")}
      </ul>
    </section>`
    : "";

  const homepageHtml = p.homepage
    ? `<a class="gh-link" href="${p.homepage}" target="_blank">🌐 ${p.homepage}</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.name} — Rui Carmo</title>
<link rel="icon" href="https://github.com/rcarmo.png?size=32" type="image/png">
<style>${CSS}</style>
</head>
<body>
<nav>
  <div class="wrap" style="display:flex;align-items:center;gap:1rem;padding-top:0;padding-bottom:0;max-width:860px">
    <a href="/">rcarmo.github.io</a>
    <span>/</span>
    <span>${p.name}</span>
  </div>
</nav>
<div class="wrap">
  <div class="hero">
    <h1>
      <a href="${ghUrl}" target="_blank">${p.owner === "rcarmo" ? "" : p.owner + "/"}${p.name}</a>
    </h1>
    <p class="tagline">${p.desc}</p>
    <div class="stats">
      <span class="stars">★ ${p.stars.toLocaleString()}</span>
      ${p.forks > 0 ? `<span>⑂ ${p.forks} forks</span>` : ""}
      <span><span class="lang-dot ${p.langClass}"></span> ${p.lang}</span>
      <span>First released ${p.created}</span>
    </div>
    <div class="tags" style="margin-bottom:1.25rem">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join(" ")}
    </div>
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
      <a class="gh-link" href="${ghUrl}" target="_blank">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        View on GitHub
      </a>
      ${homepageHtml}
    </div>
  </div>

  <section>
    <h2>About</h2>
    <p class="desc-text">${p.longDesc.trim().replace(/\n/g, "<br>")}</p>
  </section>

  ${postsHtml}
</div>

<footer>
  <a href="/">← All projects</a> &nbsp;·&nbsp;
  <a href="https://taoofmac.com" target="_blank">taoofmac.com</a> &nbsp;·&nbsp;
  <a href="https://github.com/rcarmo" target="_blank">github.com/rcarmo</a>
</footer>
</body>
</html>`;
}

let built = 0;
for (const p of PROJECTS) {
  const html = page(p);
  writeFileSync(join(OUT, `${p.id}.html`), html);
  built++;
}
console.log(`Built ${built} project pages → ${OUT}`);
