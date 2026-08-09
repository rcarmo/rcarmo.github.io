# Portfolio audit

Last full audit: 2026-08-09

## Scope

The audit covers all source pages under `_content/` and their generated diagram sources under `_diagrams/`.

Run:

```sh
bun audit-style.ts > /tmp/portfolio-style-audit.json
bun run build.ts
bun audit-links.ts
```

## Current result

| Check | Result |
|---|---:|
| Source pages | 78 |
| Structural errors | 0 |
| Stale-page prose fixes | 0 |
| Diagram source pairs | 78/78 |
| Diagram dark-mode failures | 0 |
| Diagram arrow warnings | 0 |
| Posts over five entries | 0 |
| Posts out of date order | 0 |
| Broken internal links | 0 |
| Intentional fallback-logo warnings | 23 |

One prose detector hit remains on the recently edited Piclaw page (`amazing` in Motivation). The current audit excludes recent prose from automatic rewriting; this is a review note, not a build failure.

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
- paragraphs over 110 words.

Findings are review triggers rather than blind substitutions. Legitimate technical nouns and literal phrases may be retained after review.

### Diagrams

Every diagram must:

- support light and dark colour schemes;
- use arrow markers for flows;
- use the shared renderer's readable dark secondary text colour;
- remain readable on mobile through the horizontal diagram scroller.

The shared renderer currently uses `#90a8c0` for dark secondary text. The minimum measured contrast against its diagram surfaces is 6.31:1.

### Logos

A missing `logo:` declaration is a warning. Twenty-three pages intentionally use the generated fallback artwork because no suitable project-specific source has been selected.

## Build result

The 2026-08-09 audit built 78 project pages, audited 83 HTML files, and checked 678 unique references without errors.
