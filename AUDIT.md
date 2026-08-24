# Portfolio audit

Last full audit: 2026-08-24

## Scope

The audit covers all source pages under `_content/` and their generated diagram sources under `_diagrams/`.

Run:

```sh
bun audit-style.ts > /tmp/portfolio-style-audit.json
bun test audit-diagrams.test.ts
bun audit-diagrams.ts --pretty > /tmp/portfolio-diagram-audit.json
bun audit-diagrams.ts --browser --pretty > /tmp/portfolio-diagram-browser-audit.json
bun run build.ts
bun audit-links.ts
```

## Current result

| Check | Result |
|---|---:|
| Source pages | 79 |
| Structural errors | 0 |
| Stale pages reviewed | 46 |
| Remaining stale-page prose findings | 0 |
| Recent pages reviewed (report-only) | 33 |
| Diagram source pairs | 79/79 |
| Diagram deterministic errors | 0 |
| Diagram deterministic warnings/review items | 0 |
| Browser text-overflow warnings | 0 |
| Diagram mutation and source-chain tests | 26 passed |
| Diagram dark-mode failures | 0 |
| Diagram arrow warnings | 0 |
| Posts over five entries | 0 |
| Posts out of date order | 0 |
| Broken internal links | 0 |
| Intentional fallback-logo warnings | 23 |

The writing audit uses `2026-07-18` as its prose cutoff and reads page history before the diagram-colour commit (`e8c9c865`), so mechanical SVG edits do not make old prose appear recent.

All 46 stale pages were reviewed. The pass corrected narrative punctuation, British spelling, malformed sentences, unsupported promotional claims and inaccurate technical descriptions. No stale-page prose findings remain.

The 33 recent pages are report-only. Current findings are:

- 65 Unicode punctuation instances across 15 pages;
- bounded-release or evidence-register wording on `go-ai`, `rs-ai`, `swift-ai` and `tau-prime`;
- migration or release-process wording on `shelf`, `sushy`, `vibes` and `wrdp`;
- `amazing` and `catalog` on `piclaw`.

The malformed sentence on `vibes` was corrected despite the cutoff because it was incomplete published text, not a discretionary style rewrite.

## Rules

### Structure

Each project must include:

- `section`, `status`, `created`, and `tagline` front matter;
- `## About`;
- `## How it works`;
- `## Features` with at least one `###` entry;
- `## Diagram`;
- matching `_diagrams/<id>.json` and `_diagrams/<id>.svg` files.

Known section and status values are validated. Declared logo paths must exist.

### Posts

Posts are limited to five entries per project and sorted newest-first. Each entry ends with an ISO date.

### Technical prose

`audit-style.ts` reports:

- inflated promotional terms;
- common AI vocabulary and filler transitions;
- copula substitutions such as `serves as`;
- manufactured contrast;
- vague project-status wording;
- document-focused meta-commentary;
- acceptance-report and migration-process vocabulary;
- Unicode em-dashes, smart quotes and arrows in narrative prose or taglines;
- common American spellings where the site uses British English;
- paragraphs over 110 words.

Findings are review triggers rather than blind substitutions. Legitimate technical nouns and literal phrases may be retained after review. Unicode em-dashes remain valid as the structural separator in Gallery and Posts entries; those sections are deliberately outside the prose scan.

### Diagrams

Every diagram must:

- support light and dark colour schemes;
- use arrow markers for flows;
- use the shared renderer's readable dark secondary text colour;
- remain readable on mobile through the horizontal diagram scroller.

`audit-diagrams.ts` is read-only and emits JSON. Confirmed errors produce exit code 1; warnings and manual-review candidates do not. It never rearranges or rewrites diagrams.

The deterministic audit validates:

- JSON schema, unique node IDs and valid edge endpoints;
- duplicate edges, self-loops, connected components and directed reachability;
- JSON/SVG node, subtitle, edge, marker and title agreement;
- node overlap and node/edge containment inside the SVG viewBox;
- connectors crossing unrelated nodes;
- connectors crossing each other;
- arrow endpoints landing on the expected box boundaries;
- hard-corner orthogonal routes that should use rounded bends;
- WCAG contrast for label and subtitle text against every node surface in both themes.

`--browser` adds light- and dark-theme SVG text measurement through Playwright. It checks labels and subtitles against their rendered node boxes. The browser pass is deliberately optional rather than part of deployment because it requires a local Playwright browser; the deterministic audit and its mutation suite run in CI.

The 26 tests deliberately break graph references, connectivity, IDs, graph shapes, rendered labels, box geometry, path commands, connectors, markers, endpoints, viewBox bounds, theme contrast, footer titles, inline SVG agreement and JSON/SVG pairing to prove each detector fires. The corpus pass found and corrected two label overflows without changing geometry: `MediaProjection` in `go-rdp-android` and `signals · futex · mmap` in `ios-linuxkit`.

The shared renderer uses `#243b53` for light secondary text and `#90a8c0` in dark mode. Their minimum measured contrast against the current diagram surfaces is 4.77:1 and 6.31:1 respectively.

### Logos

A missing `logo:` declaration is a warning. Twenty-three pages intentionally use the generated fallback artwork because no suitable project-specific source has been selected.

## Build result

The 2026-08-24 audit built 79 project pages, audited 84 HTML files, checked 685 unique references, and validated 79 diagrams in deterministic and browser modes without errors, warnings or review candidates.
