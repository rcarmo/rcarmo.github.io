# Portfolio post-reference review

Review date: 2026-10-10. The findings below describe the initial review. Rui subsequently authorised the required updates; implementation status follows.

## Applied updates

* Added all 14 verified recent references across 12 projects, trimming only Piclaw and Piclaw Add-ons to keep five posts.
* Corrected all surviving publication-date errors; the old Piclaw Add-ons May reference was displaced by a stronger recent post. Synchronised the two July post-title separators.
* Removed the broken go-gte URL without inventing a replacement.
* Moved the six mutable resource links into undated About background text.
* Replaced drawterm's weak reference with the December notes explicitly discussing its macOS changes; added the same source-verified origin post to kata. Removed unsupported go-rdp and Steam/HomeKit references. Kept BusyBox's proposal-stage post as origin context; no claim of release evidence was added.
* Set Piclaw to stable and described monthly releases with hotfixes. Set rs-ai and swift-ai to maintenance and added explicit paused-development notes.
* Left Kintsugi, Gi and go-joker technical descriptions/assets unchanged; the review does not establish a new go-joker technical refresh.

Verification: 35 modified pages; 50 nonempty Posts lists, 115 references; canonical URLs, no duplicates, newest-first, maximum five. All diagram and gallery bytes preserved. Build: 83 projects; 43 passing tests / 165 assertions; 83 clean browser diagrams; 727 internal references across 87 staged HTML files pass. Style: zero errors/fixes, 52 existing advisory warnings. Rui subsequently authorised publication. Pre-release verification repeated all 43 tests and the build/audits successfully. Bun 1.4.2 captured 1,315 full-build CPU samples over 266.74 ms; tests had 494 samples, dominated by fixture subprocess waits. Retained heaps were chiefly compiled code and runtime structures; they are not allocation histories. No equivalent-workload performance improvement is claimed. Raw captures and disposable logs were analysed and removed; native/browser processes are outside capture.


## Scope and evidence

Reviewed the current Tao of Mac Atom feed (20 entries) against all 83 portfolio projects, including projects without a Posts section. Inventoried 50 existing Posts sections containing 112 references. Fetched 56 unique existing/recent article URLs and checked their response status, title and publication metadata.

The feed includes recently updated resource pages as well as dated posts. A feed update is not a new publication. The feed's oldest current dated post is 3 October; it does not provide complete coverage of the gap since the last 26 September reference refresh. No missing article is inferred for that gap.

All existing lists meet the maximum-five, newest-first and canonical-query-free rules. No duplicate base URLs were found. One existing URL returns 404.

## Missing recent references

14 additions across 12 project pages are source-verified:

| Post | Published | Project pages | Relevance |
|---|---|---|---|
| [We Need To Start Seeing Other Agents](https://taoofmac.com/space/blog/2026/10/10/1200) | 2026-10-10 | bouncer, go-joker, swift-ai, rs-ai, piclaw, kintsugi, webterm, agentbox, gi, piclaw-addons | Explicit links and discussion: proxy tunnels, runtime/language ports, agent maintenance, Kintsugi's new fork, previous coding environments, and the code-review add-on. |
| [The Lenovo Chromebook Plus](https://taoofmac.com/space/reviews/2026/10/04/1800) | 2026-10-04 | gi | Explicitly describes developing Gi locally on the Chromebook. |
| [Notes For September 27-October 3](https://taoofmac.com/space/notes/2026/10/03/1840) | 2026-10-03 | python-office-mcp-server, go-ooxml, gi | Shared OOXML fixtures/specification work; Gi's more Pi-like TUI and commands. |

Each reference is currently missing. Adding the 10 October post would displace the oldest entry on `piclaw` and `piclaw-addons` to preserve the five-post limit. Gi can accept all three new posts without trimming.

The other dated feed entries do not establish additional portfolio-project links. General references to Mistral, Android, hardware and music equipment should not be attached to similarly themed projects without evidence.

## Broken reference

`go-gte` lists **GTE-Small in Go** at `https://taoofmac.com/space/blog/2025/03/22/1900`, which returns **404**. Do not invent a replacement URL or title. Remove it or locate the intended article through the site's archive before publication.

## Publication-date corrections

These dated posts have confirmed metadata that differs from the date currently stored in portfolio pages. URL paths alone were not used as the acceptance check.

| Article | Correct published date | Pages requiring correction |
|---|---|---|
| [Notes for May 3-10](https://taoofmac.com/space/notes/2026/05/10/1433) | 2026-05-10 (stored 11 May) | vibes, go-rdp-android, go-joker, ghostty-web, go-ds4, go-pherence, macemu-jit, go-rdp, piclaw-addons, previous-jit |
| [Notes for April 13-19](https://taoofmac.com/space/notes/2026/04/19/1400) | 2026-04-19 (stored 21 April) | vibes |
| [Lessons on Building MCP Servers](https://taoofmac.com/space/blog/2026/04/29/2341) | 2026-04-29 (stored 30 April) | python-office-mcp-server, umcp |
| [Announcing ios-linuxkit: Linux on iPad, the Hard Way](https://taoofmac.com/space/blog/2026/05/16/1130) | 2026-05-16 (stored 19 May) | ghostty-web, macemu-jit, ios-linuxkit |
| [My AI Model Tier List for mid-2026](https://taoofmac.com/space/blog/2026/07/11/1500) | 2026-07-11 (stored 17 July) | go-ds4, llama-cpp |
| [The M5Stack Tab5](https://taoofmac.com/space/reviews/2026/07/18/1920) | 2026-07-18 (stored 20 July) | cydintosh, esp32-rtype |
| [Homelab Update](https://taoofmac.com/space/blog/2022/10/28/1900) | 2022-10-29 (stored 28 October) | gnome-thumbnailers |

Total: 21 reference instances across 17 pages. The Homelab Update URL contains 28 October, but the article's published metadata says 29 October; preserve the canonical URL and use the metadata date.

Two title differences are punctuation-only: `macemu-jit` and `memento` store **Notes for July 13-19** while the article title uses an en dash. These are optional title synchronisation, not relevance defects.

## Resource pages presented as posts

Six references use mutable topic/resource pages rather than dated articles:

* `sushy`, `imapbackup`, `pngcanvas`: [Python](https://taoofmac.com/space/dev/python), published 2007-04-15, with 2026 dates in Posts.
* `kata`: [Go (lang)](https://taoofmac.com/space/dev/golang), published 2013-06-28, stored as 2026-04-25.
* `ml-sharp`: [AI Image Generation](https://taoofmac.com/space/ai/image), published 2025-05-01, stored as 2026-05-20.
* `cydintosh`: [Emulation](https://taoofmac.com/space/emulation), published 2005-06-09, stored as 2026-07-31.

Do not mechanically replace these dates with old topic-page creation dates. Decide whether they belong as undated contextual links elsewhere on the project page, or whether a relevant dated article can replace them. They should not masquerade as recent posts.

## Relevance requiring a second pass

Most references have explicit repository links or project mentions. Some use contextual links and product names rather than identifiers; absence of a literal project ID is not sufficient to reject them. For example, the Web App Viewer notes explicitly discuss reusing the USB Video Viewer's window style, so that cross-reference is relevant.

These are weaker candidates to re-check before deleting anything:

* `drawterm` and `go-rdp`: **Seizing The Means Of Production (Again)** discusses the browser/container environment, but the project-specific connection is less direct than the references on agentbox/webterm.
* `go-busybox`: **Vibing with the Agent Control Protocol** describes an idea to port BusyBox to WASM, not a completed release. It may be useful origin context; do not treat it as implementation evidence.
* `homekit-steam-user-switcher`: **Notes for December 9-24** needs a clearer link to the Steam/HomeKit project before keeping it as a project-specific reference.
* `piclaw-addons`: **Apple Papercuts**, **The Siri For Families Apple Will Never Build**, and **Notes for May 3-10** have less direct links than the September/October add-on discussions. Reassess if stronger dated references displace them.

No relevance deletion is proposed solely from an automated string scan.

## Current project context from the 10 October post

Separate from Posts changes:

* **Piclaw:** the post calls it stable and switches to monthly/end-of-month releases, with hotfix exceptions. Portfolio status is still `active`; consider `stable` and a brief maintenance note. Do not imply it has been abandoned or replaced by Kintsugi.
* **rs-ai and swift-ai:** Rui says he is stopping work on both. Their portfolio pages still describe active early ports without the pause. Add a pause/maintenance note or select an appropriate status after confirming the desired catalogue treatment.
* **Kintsugi:** experimental exploration, not a replacement for Piclaw or a permanent hard-fork commitment. The new portfolio page already preserves that experimental framing.
* **Gi:** renewed investment in a portable, more RAM-efficient Pi-like TUI/web runtime. The freshly published Go-native Pi clone description is consistent; no immediate rewrite needed.
* **go-joker:** native/WASM compilation and SDL FFI are mentioned. Treat this as a candidate technical refresh, not permission to revive stale benchmark claims or change assets without source verification.

The article also describes the new Markport fork and an Obsidian agent, which are not separate portfolio entries today. Flagging their absence is not a request to add them automatically.

## Suggested next pass

1. Add the 14 source-verified recent references, canonical and newest-first; trim only where the five-post limit requires it.
2. Correct the 21 confirmed publication dates.
3. Remove or locate the broken go-gte URL; decide how to handle the six mutable resource links.
4. Confirm the intended Piclaw/rs-ai/swift-ai status changes separately.
5. Build and audit only after edits. Review the focused diff before publishing.

The initial review was read-only. The subsequently authorised development updates and checks are recorded above. No renderer or asset changes were needed. Disposable fetched articles, test logs and build output are removed after use; concise findings stay in this report.
