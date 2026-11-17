# Portfolio correctness and writing audit

17 November 2026. Scope: the six local additions and fourteen revised pages. No publication or commit performed.

## Findings corrected

### Diagram semantics

* **Vibes:** the inherited diagram claimed a Docker sandbox with isolated execution, contradicting the shared-host application. It now shows host processes and shared account/files, and names ACP/Pi RPC adapters. Existing node positions and arrows are unchanged.
* **Gi:** the combined terminal/web node sent both interfaces through an SSE-labelled web API. The web node now explicitly uses REST/SSE, and a separate terminal node connects directly to the shared turn engine. Existing nodes and routes were preserved; one node/route was added. Visual review found the first new route shared a stem with the inference connector; the final route uses a distinct lower engine attachment.
* **Piclaw:** SQLite/keychain state incorrectly connected directly to external services, while built-in tools appeared available only through extensions/skills. Removed that storage/external edge, added runtime-to-tools, and retained tools-to-external. Existing box geometry is unchanged; the new route goes around the boxes.
* **Swift USB Video Viewer:** the inherited diagram stopped at the USB dongle and omitted the application. Added an AVFoundation macOS viewer box/arrow and expanded the canvas by one column, preserving the existing source and capture boxes.
* **go-ai:** removed the all-SSE edge label, which did not describe all provider protocols. The output is now labelled text/tools/usage. Replaced the misleading automatic `auth.json` configuration implication with API keys/OAuth/environment inputs.
* **Guerite:** narrowed the managed-service subtitle to dependency ordering; alerts are emitted by Guerite, not the managed services.

Geometry/schema checks alone had not detected these semantic errors. The diagrams were re-read against current READMEs and supplementary API/architecture documents. An independent read-only judge identified the Piclaw edge error; a separate light/dark contact-sheet review identified the Gi shared-stem ambiguity. These checks are human/model review aids, not implementation execution.

### Factual prose

* **pve-microvm:** changed the active badge to experimental, matching its host-patching warning and upstream README.
* **Silverblue MacBook:** states the actual reference kernel (7.2.13) and the audio driver's 7.2-series restriction. Recovery is an operator requirement from the installation guide, not an automatic installer promise.
* **Guerite:** dependency checks skip blocked containers; the text no longer suggests an unbounded wait for readiness.
* **go-264:** narrowed WAV to integer mono/stereo PCM and MP4 audio to limited progressive AAC-LC/AC-3 formats. Removed the unsupported universal assertion that all unimplemented H.264 configurations are rejected. The progressive/YUV420/interlace/FMO/no-encoder limits remain explicit.
* **Archived ports:** Rust and Swift taglines now say archived, consistent with the badges and stopped-development paragraphs.

### Writing

Applied Memento's current writing-style and technical-docs guidance while retaining site-required headings and terse feature cards. Cut Kintsugi's repeated experimental-fork sentence, repeated compatibility-disclaimer language in go-ai and Vibes, the Calibre “process boundary matters” signpost, and go-264's manufactured “rather than every media file” contrast. Replaced passive acceptance/qualification language with the concrete version or behaviour where possible.

Kept useful limitations, source-supported humour, model/project identifiers, and the Piclaw trenchcoat line. The source convention `--` is intentional and renders as an em dash. No claim of AI authorship is made from wording or punctuation.

## Verification

* 89 project pages built; 43 tests passed, 165 assertions.
* 89 deterministic/browser diagrams: no errors, warnings or review findings.
* 774 internal references across 93 generated HTML files: valid.
* Style: zero errors/required fixes. The 54 advisories include pre-existing punctuation and fallback-logo warnings; all twenty audited pages have no required prose fixes.
* Posts and Gallery sections match the second-pass baseline exactly, including their links and captions. No curated asset bytes changed during the audit. Unrelated `AGENTS.md` edit preserved.
* `git diff --check` passes. Development verification only; pre-release performance profiling will be required if publication is authorised.

## Opus 5.5 polish pass

Rui requested a further audit with Opus 5.5. Delegation to that model is excluded by policy, so the active session was switched to Opus 5.5 and the audit was performed directly. All twenty pages and diagrams were re-read; uncertain claims were checked against current upstream READMEs.

* **Duplicated caveats:** Bouncer stated the unverified Funnel limit twice; one card now carries it, with a heading and emoji consistent with the page. Piclaw's fresh-instance login warning, go-264's no-encoder limit, ios-linuxkit's no-runtime-codegen and compatibility notes, Vibes' branch layout (three mentions), Kintsugi's AMD64/ARM64 sentence and Guerite's dependency-skip sentence each appeared twice or more; the duplicates were removed or turned into distinct information.
* **Accuracy and wording:** go-264's “Decoder-first” tagline implied an encoder that does not exist. pve-microvm's “restores the original patched files” was ambiguous. Piclaw said “ACP protocol”. Mushi's “reviewed target” and rexweb's “keyboard/input” copied awkward upstream phrasing; both now state the documented target or behaviour. Minicore and Memento lost two pieces of jargon (“interrupted-fault recovery handling”, “authorisation-scoped evidence set”).
* **Diagram labels:** Memento's index subtitle repeated its title (“Derived indexes / derived.sqlite indexes”); it now names what is indexed. go-ai's tool-calling subtitle repeated its label. Kintsugi's browser node omitted the VS Code editor. The first go-ai replacement overflowed its 82px box in the browser check and was shortened.
* **Consistency:** Piclaw's tagline used a literal em dash; it now uses the site's `--` convention.

Mobile rendering was checked at 390px over HTTP with site CSS in both themes: no page-level horizontal scroll on any of the twenty pages. Diagrams render at 960px inside a scrollable wrapper (about 0.9× for the widest, Gi), and the table of contents scrolls horizontally by design. An initial `file://` run did not load the absolute stylesheet path and was discarded.

## Final pass

Re-read all twenty pages' metadata, headings, prose, gallery captions and Posts. Verified the remaining open questions against current upstream READMEs.

* **Vibes diagram:** the agent boxes showed Codex and Claude, which the README does not document, and omitted Pi, a headline backend. They now show Copilot and OpenCode (both documented ACP examples) and Pi via its RPC adapter. The user subtitle “pick agent at runtime” was wrong (agents are selected at startup via environment variables) and now names the supported devices.
* Confirmed as correct or intentional: Memento's Gallery-before-Features order matches `HEAD`; rs-ai's “TypeSafe System One” matches upstream; curated post titles and the Piclaw gallery's em-dash captions were left as written.
* Trope scan across all twenty pages found no remaining filler or hype phrasing.
* Posts and Gallery sections of the fourteen existing pages are identical to `HEAD`.

Final validation: 43 tests pass; 89 diagrams have no static or browser findings; 774 internal links valid; style audit 0 errors / 53 advisories; at 390px with site CSS, all twenty pages in both themes have no page-level overflow and every diagram sits in a scrollable wrapper.

## Limits

Source verification used current upstream READMEs plus targeted contracts, install guides and architecture documents. It did not rerun firmware, Android, Azure, Calibre, Tailscale or other project implementations. Hardware-specific and unverified-live-service caveats were retained.

Light/dark contact sheets checked diagram labels and routing at desktop scale. Browser text metrics passed; these do not prove every mobile display/browser configuration. Local `rsvg-convert` is unavailable, so PNG social-card generation was skipped. No unrelated diagram redesign or renderer change was made.

All changes remain local and uncommitted. Temporary source copies, screenshots, build output and disposable logs were removed after use; this file retains the conclusions.
