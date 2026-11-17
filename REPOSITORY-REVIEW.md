# Portfolio repository review — 17 November 2026

Compared all 433 public repositories returned by GitHub with the 83 existing portfolio pages. Read current READMEs for 39 likely additions or active existing projects. This is a repository/documentation review, not a live implementation or compatibility audit. No other agents were contacted.

## Authorised refresh applied

Rui approved the five strong additions other than bun-ooxml. Added **rexweb, fedora-silverblue-macbook, mushi, guerite and minicore**, alongside the already prepared NixOS page. Used Memento's current `/skills/writing/writing-style.md` and `/skills/writing/technical-docs.md`, read at revision `c9c3bb7eca06868b23aeae1b356c0c9f53349bd1`.

Revised **14 existing pages**: memento, piclaw, pve-microvm, vibes, kintsugi, gi, bouncer, go-ai, ios-linuxkit, go-264, python-umcp-calibre, swift-usb-video-viewer, rs-ai and swift-ai. The findings below describe the initial review; these revisions resolve the identified factual drift.

Memento's curator permissions and trash/purge model, Piclaw's deployment/add-on/authentication split, Vibes' branches, Calibre's exact mutation-version gate and the archived ports are corrected. Other revisions retain the distinction between implemented support and unverified development targets. The new Mushi page states its credential exposure and Android recovery limits; Silverblue retains its exact model/kernel qualifications; Minicore and rexweb state their remote-access limits.

Real Mushi/Guerite icons and rexweb/Mushi/Minicore screenshots came from their repositories. No suitable repository icon was found for rexweb, Silverblue, Minicore or NixOS, so the existing fallback mechanism is used. Added source-verified posts to rexweb and Silverblue. Existing Posts, galleries and curated assets are unchanged. The initial refresh changed inaccurate labels in seven legacy diagram sets. A subsequent correctness audit also repaired Vibes, Gi, Piclaw, go-ai and USB viewer semantics with targeted node/route changes; see `CORRECTNESS-AUDIT.md`. Existing node geometry, themes and marker IDs were preserved where possible. Five new diagrams use the site renderer.

Final local validation: **89 project pages, 43 tests / 165 assertions, 774 references across 93 HTML files**, and 89 browser-checked diagrams with no findings. Style: no errors or required fixes, with existing advisory warnings and expected fallback-logo warnings. The pre-existing `AGENTS.md` edit was preserved. No renderer/tooling changes, commit or publication were made. These are development checks; pre-release profiling is reserved for an authorised publication pass.

## Added locally

**[nixos-azure-arm64](https://github.com/rcarmo/nixos-azure-arm64)** — Cloud & Infrastructure, experimental. Builds fixed-size VHDs from a pinned Nix flake, publishes Azure Compute Gallery versions and verifies Arm64 Gen2 provisioning and root-disk growth. Supports local builds and temporary Azure builders driven by Run Command. Added a source-grounded four-stage diagram. The repository has no icon, so the page uses the normal fallback rather than invented artwork. Created 16 November; README/tree reviewed at `79ee46b6ae3ac7177c571a1cab34e44480809dba`.

## Strong candidates for new pages

| Repository | Suggested section | Why it merits a page / important limits |
|---|---|---|
| [rexweb](https://github.com/rcarmo/rexweb) | Remote Access | Single-binary Linux terminal service sharing workspaces, tabs and panes between browsers and Rex clients. Disconnects preserve shells; server restarts do not. Distinct from webterm, not a rename. |
| [fedora-silverblue-macbook](https://github.com/rcarmo/fedora-silverblue-macbook) | Apple | Substantial hardware enablement and rebuild kit for the 2016 MacBookPro13,2/T1 on Silverblue: Touch Bar, audio, Wi-Fi and S3. Keep the exact hardware/kernel qualifications; Touch ID is unsupported and some peripherals are untested. |
| [mushi](https://github.com/rcarmo/mushi) | Agents | Native Android UI with embedded pi-durable, a signed ARM64 Bun runtime, persisted conversations and coding tools. Experimental; not a generic Termux wrapper. |
| [guerite](https://github.com/rcarmo/guerite) | Cloud & Infrastructure | Standalone Docker updater with label selection, dependency-aware ordering, pruning and Pushover/webhook notifications. Docker API access is powerful and should be stated plainly. |
| [bun-ooxml](https://github.com/rcarmo/bun-ooxml) | Libraries | Bun/TypeScript DOCX, PPTX and XLSX editing; shared OOXML fixtures connect it to existing Go/Python work. Bounded document support, not a full Office suite. |
| [minicore](https://github.com/rcarmo/minicore) | Networking | Local Docker/FRRouting ISP-core simulator with read-only observation and separately gated state-changing MCP tools. A fixed teaching/experiment topology, not a production network orchestrator. |

The current Atom feed also provides relevant post leads for rexweb (**Notes for November 9–13**) and the Silverblue work (**Notes for November 1–8**). Source-check those articles when creating their pages.

## Older standalone projects worth curating

These are useful omissions, but I would add them as a separate archive pass rather than mix them into the recent-project batch:

* [rss2imap](https://github.com/rcarmo/rss2imap): standalone RSS-to-IMAP delivery, distinct from feed-summarizer.
* [python-webarchive](https://github.com/rcarmo/python-webarchive): creates Safari/WebKit webarchives on other platforms; clear library use case.
* [docker-xmind](https://github.com/rcarmo/docker-xmind): KasmVNC packaging for legacy XMind 8, not a modern XMind implementation.
* [raspi-cluster](https://github.com/rcarmo/raspi-cluster): established Raspberry Pi cluster notes/scripts; historical hardware/software assumptions need explicit framing.
* [textwrangler-bbedit-solarized](https://github.com/rcarmo/textwrangler-bbedit-solarized): long-lived editor colour scheme; keep it a small archive entry.
* [HJKLPlugin](https://github.com/rcarmo/HJKLPlugin): historical Mail.app vim navigation. README's tested environment is OS X Yosemite/Mail 8; do not imply modern macOS compatibility.
* [bottle-fever](https://github.com/rcarmo/bottle-fever): Fever API clone; README says on hold since 2014.
* [nomad-proxy](https://github.com/rcarmo/nomad-proxy): Supernote LAN proxy, explicitly experimental with no built-in authentication or TLS. Any page must retain those warnings.

Do not automatically add `fixtures-vibes`, `fixtures-ooxml`, profile/readme repos, templates or all upstream-tracking forks. `Yaki` says it was superseded by `yaki-tng`; do not present both as active publishing engines. `swift-markdown-engine`'s current README still describes the upstream Nodes editor, so the scope of Rui's changes needs checking before a portfolio claim. `ios-terax-ai` is a possible companion to ios-linuxkit but has experimental/fork-specific limits.

## Existing descriptions needing updates

### Highest priority: factual and security-relevant drift

* **Memento:** portfolio says model-authored proposals cannot approve themselves, no hard delete, and no direct writes. Current README permits authorised curators to review their own proposals (with audit identity), create/patch/rename directly, and trash/restore/confirmed purge. It also documents dynamic principals, credential verifiers/access management, persistent derived SQLite and short-lived Go inference workers. Rewrite the permission/deletion/storage description from the current contracts; do not keep the old absolute claims.
* **Piclaw:** the portfolio's Docker-only opening and single-container framing omit portable Linux/Apple Silicon macOS releases and experimental Windows. Current docs also state single-user by default, web localisation and no fresh-install web login gate. Any deployment example should use localhost binding and distinguish provider login from browser authentication. Preserve xterm.js default / optional Ghostty unless source confirms a change.
* **python-umcp-calibre:** portfolio pins mutation compatibility to Calibre **9.12.0**; current v0.3.5 README specifies **9.15.0**, with other versions read-only and writes opt-in. This should be refreshed from the plugin's current contract, not simply stripped of its version limitation.
* **rs-ai / swift-ai:** GitHub now marks both repositories **archived**. The portfolio has maintenance badges and stopped-development notes. Set archived badges and retain the frozen-release/unfinished-branch distinction after checking the final README/tag state.

### Substantial feature/architecture drift

* **go-ai:** portfolio states the v1.1.0 baseline. Current README says accepted v1.4.0 baseline, ongoing v1.5.0 work spanning pi-ai, pi-durable and pi-codemode; support for mixed schemas, classifiers, realtime audio, durable tools/tasks and QuickJS code-mode helpers. Distinguish accepted release from development target; avoid catalogue-size statistics.
* **ios-linuxkit:** current v2.6.0 supports an optional persistent AOT path alongside default interpretation, and native Linux ARM64 builds. Portfolio currently describes an interpreter-only iOS runtime. This needs a careful execution/security explanation, not a blind removal of the no-JIT wording.
* **Kintsugi:** current README describes v0.7.0, plans/budgets, reversible prompt optimisation (off by default and unmeasured cost/quality effects), networking controls, worktree workspaces, credentials and viewers. Old copy still describes a package split in progress and separate app/system images. Verify current deployment layout before updating those details.
* **Bouncer:** portfolio's earlier topology is behind the uniform ingress collection: local HTTPS, trusted external proxies, multiple embedded tsnet/Funnel nodes, hot reload, and Nix flake. README explicitly says live tailnet/Funnel acceptance is not yet verified; do not claim a live-tested service.
* **Vibes:** current `main` is Python, with the Go implementation on branch **`go`**. Portfolio says Python is on `python`, and still describes that branch layout in two places. Correct the branches; do not imply Python was removed.
* **Gi:** current docs describe default TUI plus `gi -web`, embedded SQLite/assets, native Go plugins (Go 1.27.2) with dynamic `invoke` discovery, and explicit Pi/Piclaw interface baselines. Portfolio still emphasises reusing Piclaw TypeScript verbatim and Clojure/JavaScript scripting; verify whether those scripting paths are still present before carrying them forward.
* **pve-microvm:** current scope includes OCI/rootfs/unikernel/alternative guest workflows, storage-backend integration and operational tooling. Existing page only describes patching two Proxmox files. Refresh the deployment story without reviving unqualified boot-time claims.
* **go-264:** current README also documents the independent pure-Go audio package with WAV and qualified AAC/MP4/MOV handling. A short addition would connect it to go-pherence's existing media-adapter description; don't imply full FFmpeg replacement.

### Smaller refreshes / no urgent rewrite

* **swift-usb-video-viewer:** current source selection and audio passthrough deserve a small feature update.
* **webterm / go-te:** reviewed architecture still matches the portfolio's browser/server split; rexweb would be a related project rather than a replacement. No urgent wholesale rewrite.
* **go-ds4:** CPU/CUDA are most mature, Vulkan opt-in and Metal experimental; current portfolio broadly preserves those distinctions.
* **llama-cpp:** Sigma and SpaceMIT K3 targets still match; a current profile/hardware refresh is optional, not evidence that the portfolio is wrong.
* **go-pherence:** broad native LLM/speech/experimental-vision framing still applies. Support matrices evolve; avoid copying all model/status/benchmark detail into the portfolio.

## Inventory limits

83 existing pages matched 81 repositories on Rui's account; `piku/piku` and `usetrmnl/byos_fastapi` are intentional cross-organisation entries. Of the 352 unmatched repositories, 126 are non-forks and 226 forks; these are inventory differences, not 352 recommended additions. Archived/historical repos are not automatically unsuitable for a personal archive.

All 433 metadata records were compared, but only 39 READMEs were read in depth. This is not a source audit of every fork, live-service verification, or a full post-archive refresh. Public metadata only; no private repositories are disclosed.

## Verification and publication state

The initial NixOS-only pass built 84 projects, passed 43 tests / 165 assertions, checked 733 references and 84 diagrams. The browser binary was initially missing; installation and rerun passed. The subsequently authorised additions and revisions are recorded at the top of this report. All changes remain local and uncommitted; nothing has been published.
