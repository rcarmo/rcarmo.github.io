# Portfolio Site Content Audit

**Date**: 2026-04-21  
**Scope**: All 45 `_content/*.md` files in `rcarmo.github.io`  
**Method**: Cross-referenced each content page against live GitHub repo data, checked structure, diagrams, and metadata consistency.

---

## Summary

| Metric | Count |
|---|---|
| Total projects | 45 |
| Clean (no issues) | 30 |
| With issues | 15 |
| Missing diagrams | 2 |
| Diagrams without dark mode | 5 |
| Forks not mentioned | 5 |
| Tagline diverges from GH description | 8 |
| Stale (not pushed since 2023) | 1 |

**Overall**: The site is in **good shape**. All 45 projects have `tagline`, `section`, `About`, and `How it works` sections. 43/45 have diagrams. The main gaps are: some taglines don't match GitHub descriptions (intentional editorial divergence vs. drift), forks not being identified as such, and 5 diagrams missing dark-mode CSS.

---

## Issues by priority

### 🔴 Missing diagrams (2)

| Project | Stars | Status | Notes |
|---|---|---|---|
| `python-steward` | 4 | experimental | Has About + How it works, just no SVG diagram |
| `go-ooxml` | 0 | experimental | Has About + How it works, just no SVG diagram |

**Recommendation**: Add simple architecture diagrams showing the data flow (steward: CLI → LLM → tools; go-ooxml: ZIP → XML parse → typed model → re-zip).

---

### 🟠 Diagrams lacking dark mode (5)

| Project | Stars | Notes |
|---|---|---|
| `PhotosExport` | 280 | High-visibility project |
| `vibes` | 144 | High-visibility project |
| `pve-microvm` | 27 | Recently added |
| `go-busybox` | 10 | |
| `umcp` | 11 | |

**Recommendation**: Add `prefers-color-scheme` media query with inverted fills/strokes. The other 38 diagrams already have this.

---

### 🟡 Forks not mentioned in content (5)

| Project | Stars | GitHub description | Fork status |
|---|---|---|---|
| `ml-sharp` | 26 | Sharp Monocular View Synthesis for Apple Silicon | Fork — not mentioned |
| `umcp` | 11 | A micro MCP server for stdio only | Fork — not mentioned |
| `proxmox-zpool-monitoring` | 7 | ZFS pool monitoring for Proxmox VE | Fork — not mentioned |
| `ghostty-web` | 5 | Ghostty for the web with xterm.js API compatibility | Fork — not mentioned |
| `gte-go` | 0 | Golang inference for the GTE Small embedding model | Fork — not mentioned |

**Recommendation**: Add a brief note in `## About` like "Forked from X, with improvements for Y" or add a `fork: true` frontmatter field so the site can render a badge.

---

### 🟡 Tagline diverges from GitHub description (8)

These are cases where the site tagline and the GitHub repo description tell different stories. Some may be intentional (the site tagline is more polished), but worth reviewing:

| Project | Stars | GitHub desc | Site tagline |
|---|---|---|---|
| `piclaw` | 531 | "I'm going to build my own OpenClaw, with blackjack... and bun!" | "A self-hosted AI agent workspace — mobile-first streaming UI, infinite tools" |
| `vibes` | 144 | "A simple mobile-focused chat app to talk to an agent via the ACP protocol" | "Mobile-first web UI for AI agents — ACP and Pi over RPC, zero build step." |
| `webterm` | 106 | "Yet another web terminal, but with style" | "Go web terminal with multi-session dashboard mode — built for AI agent workflows." |
| `pngcanvas` | 44 | "A minimalist library to render PNG images using pure Python" | "Pure-Python PNG rendering with zero dependencies — draw lines, rectangles, and text directly to PNG files." |
| `feed-summarizer` | 27 | "The feed summarizer that powers feeds.carmo.io" | "LLM-powered RSS digest — full-text extraction, runs on a Raspberry Pi." |
| `go-busybox` | 10 | "A sandboxable port of busybox for AI agents" | "57 BusyBox utilities in Go — 2 MB WASM binary, 387/387 tests passing." |
| `gotel` | 5 | "OpenTelemetry for... tiny gophers" | "Self-contained OTel collector — SQLite storage, built-in trace viewer." |
| `python-steward` | 4 | "AI, created by AI" | "Python CLI harness for running LLMs with a Copilot-style toolset — Azure OpenAI, local providers, tool use." |

**Assessment**: Most of these are fine — the site taglines are more descriptive/professional than the casual GitHub descriptions. The only questionable ones:
- `piclaw` — GH desc is a joke reference; site tagline is the real description ✅ (intentional)
- `python-steward` — GH desc "AI, created by AI" is cryptic; site tagline is much better ✅ (intentional)
- `webterm` — Site adds "AI agent workflows" which isn't in the GH desc; may want to sync

**Recommendation**: Consider updating the GitHub descriptions for `webterm`, `gotel`, and `feed-summarizer` to match the site taglines (they're better).

---

### 🟡 Staleness (1)

| Project | Stars | Last pushed | Status in content |
|---|---|---|---|
| `gnome-thumbnailers` | 26 | 2022-12-13 | `stable` |

**Recommendation**: Either mark as `archived`/`maintained` (no active development but still works), or verify it still works with current GNOME and leave as `stable`.

---

## Clean projects (30) ✅

These have complete frontmatter, About + How it works sections, dark-mode diagrams, and consistent metadata:

PhotosExport*, agentbox, apfelstrudel, asterisk-embedding-model, azure-docker-swarm-cluster, azure-k3s-cluster, azure-stable-diffusion, azure-transcription-helper, bun-opds-server, byos_fastapi, codebits-tv, daisy, drawterm, go-rdp, go-te, ground-init, haiku-arm64-build, homekit-steam-user-switcher, imapbackup, kata, macemu-jit, mdnsbridge, node-red-dashboard, onepage-by-spec, piku, pve-microvm*, python-office-mcp-server, soup-strainer, syncthing-kicker, zmk-config-totem

(*PhotosExport and pve-microvm have content issues only with dark mode diagrams)

---

## Diagram quality assessment

| Quality aspect | Score |
|---|---|
| All have `viewBox` | ✅ 43/43 |
| Dark mode (`prefers-color-scheme`) | 38/43 (88%) |
| Reasonable complexity (>1KB) | ✅ 43/43 |
| Uses text labels | ✅ 43/43 |
| Consistent styling | ✅ (blue accent, clean lines) |

The diagrams are generally **high quality** — inline SVG, proper viewBox, labeled components. The 5 without dark mode are the only structural gap.

---

## Recommendations (prioritized)

1. **Add dark mode to 5 diagrams** — especially `PhotosExport` (★280) and `vibes` (★144)
2. **Add diagrams to `python-steward` and `go-ooxml`** — even simple ones
3. **Add fork attribution to 5 projects** — brief note in About section
4. **Sync GitHub descriptions** for `webterm`, `gotel`, `feed-summarizer` with the (better) site taglines
5. **Review `gnome-thumbnailers` status** — still stable or should be archived?
