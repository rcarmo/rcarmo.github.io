---
name: graph-design
description: Design, audit, and redraw inline SVG architecture diagrams for rcarmo.github.io using the site’s established visual language and source-verification workflow.
distribution: project
---

# Graph Design

Use this skill when creating, fixing, or auditing project diagrams in `projects/rcarmo.github.io`.

This captures the diagram conventions established during the April 2026 portfolio cleanup.

## Scope

Applies to:

- inline SVG diagrams embedded in `_content/*.md`
- architecture/flow redraws for project pages
- diagram consistency audits across multiple project files
- arrow routing, label placement, and dark/light behavior
- source verification against upstream repos/READMEs when diagrams describe real systems

## Canonical workflow

1. Read the project page in `_content/<project>.md`.
2. Read upstream docs/repo/README when the diagram represents real architecture.
3. Verify the current page copy matches reality before drawing.
4. Edit the `## Diagram` block in `_content/*.md`.
5. Rebuild with `bun run build.ts`.
6. Verify the generated `projects/*.html` output.
7. If publishing, commit, push, and push a new `v*` tag.

## Source of truth

- `_content/*.md` is canonical.
- Generated `projects/*.html` files are build outputs.
- Do not hand-maintain generated HTML.
- If the diagram and copy disagree, fix the source Markdown first.

## Core principles

### 1. Source accuracy over aesthetics

Do not invent architecture.

If the project has a real upstream README, codebase, or template structure:

- read it first
- verify the components and data flow
- prefer actual system boundaries over generic boxes

Examples of things that must be source-verified before drawing:

- cloud resource topology
- protocol direction
- whether a component is a parser, cache, relay, renderer, or wrapper
- whether a system uses ARM templates vs Bicep, Ollama vs Azure/OpenAI, etc.

### 2. Keep diagrams simple

Prefer a small number of boxes with a clear left-to-right or top-to-bottom story.

Good diagrams usually show:

- inputs
- core transform or coordinator
- outputs
- persistent state (if relevant)
- one or two important protocols

Avoid turning every diagram into a full subsystem map.

### 3. Match the page story

The diagram must reinforce the:

- tagline
- About section
- How it works section
- Features

If the diagram implies something not stated in the page text, either:

- fix the page text from source, or
- remove the unsupported implication from the diagram

## Visual language

Use the established inline SVG theme block.

### Required theme structure

Every diagram should include:

- `prefers-color-scheme: dark`
- `prefers-color-scheme: light`
- transparent background
- standard classes:
  - `.box`
  - `.box-accent`
  - `.box-green`
  - `.box-warm`
  - `.box-purple`
  - `.label`
  - `.sub`
- shared arrow markers:
  - `ah`
  - `ahs`

### Color usage

Typical meaning:

- `box-accent`: primary subject / main app / orchestrator
- `box-green`: positive output / running service / target runtime
- `box-warm`: input / config / storage / secondary artifact
- `box-purple`: helper state / library / model / internal subsystem
- `box`: neutral node

These are conventions, not hard laws, but be consistent within a diagram.

## Layout rules

### Preferred shapes

Use rounded rectangles:

- `rx="8"` for main boxes
- `rx="6"` or `8` consistently; avoid mixing too much

### Preferred flow directions

Use one of these:

- left → center → right
- top → middle → bottom
- left → center with split outputs to upper-right/lower-right

Avoid zig-zag stories unless the project genuinely needs them.

### Spacing

- leave clear horizontal gaps between columns
- keep enough vertical separation so labels and arrows do not collide
- do not let footer captions sit too close to arrows
- widen the viewBox when necessary rather than cramming text

### Box sizing

- prefer consistent widths within a column
- give text room to breathe
- if a label wraps awkwardly, split it into label/sub lines rather than shrinking everything

## Text rules

### Label hierarchy

Use:

- `.label` for the main component name
- `.sub` for explanation, protocol, or scope

### Wrap long text manually

Do not rely on SVG auto-wrapping.

Instead:

- split into multiple `<text>` lines
- move secondary info into `.sub`
- shorten wording where possible

Example:

- bad: `YYYY/MM hierarchy + JSON` on one cramped line
- good:
  - `YYYY/MM hierarchy`
  - `+ JSON`

### Keep wording concrete

Prefer:

- `State file`
- `last UID per folder`
- `busybox.wasm`
- `TinyGo · ~2 MB · stubs`

Avoid vague labels like:

- `processor`
- `engine`
- `system`
- `backend magic`

## Arrow rules

This was the biggest source of regressions. Follow these strictly.

### 1. Arrows must be present when they matter

If the system is a flow diagram, arrows are not optional.

Common required flows:

- input → processor
- processor → output
- request ↔ response
- state update downward into a state file

### 2. Arrows must land on sensible edges

Start/end arrows on box edges, not in empty space.

Prefer:

- horizontal arrows between columns
- vertical arrows between stacked boxes

### 3. Use rounded elbow connectors for orthogonal paths

Do **not** use plain hard-corner orthogonal polylines.

Preferred options:

- straight `<line>` when the connection is directly horizontal/vertical
- rounded `<path>` elbows when routing around another box or changing direction

Use SVG paths with rounded corners, e.g. `Q` segments at turns.

### 4. Avoid awkward diagonals

Do not use diagonals unless the diagram really benefits from them.

In most portfolio diagrams, orthogonal routing is clearer.

### 5. Differentiate important flows when useful

Common convention used on the site:

- blue/accent arrow (`ahs`) for primary request/input flow
- neutral blue-grey arrow (`ah`) for secondary or state/output flow

But consistency matters more than strict semantics.

### 6. Bidirectional flows should be explicit

If a project is really request/response, draw both directions.

Examples:

- DNS query → bridge → mDNS query
- mDNS response → bridge → DNS response

Do not collapse request/response into one ambiguous line.

## Diagram patterns that worked well

### A. Single transform

Use for exporters, converters, wrappers, generators.

Pattern:

- input box
- main tool box
- output box(es)

Examples:

- PhotosExport
- imapbackup
- bun-opds-server

### B. Coordinator plus helper state

Use for apps that maintain a state model or cache.

Pattern:

- frontend/client
- coordinator/server
- helper state below or beside it
- runtime target on the right

Examples:

- webterm
- imapbackup

### C. One source, multiple output targets

Use when a tool emits multiple artifacts or execution modes.

Pattern:

- source/entrypoint on left
- applet/model/grouping in center
- two output targets on right

Examples:

- go-busybox
- macemu-jit

### D. Request/response bridge

Use for relays, gateways, resolvers, proxies.

Pattern:

- client/source on left
- bridge in middle
- destination on right
- top arrows for requests, bottom arrows for responses

Example:

- mdnsbridge

## Known pitfalls

### Do not bulk-rewrite blindly

A previous mass SVG rewrite broke markers and even malformed tags.

If doing bulk changes:

- rebuild after changes
- inspect generated HTML
- spot-check multiple pages
- prefer incremental edits over massive regex rewrites when semantics matter

### Do not trust automated layout inference alone

Scripts can normalize spacing, but they often:

- lose arrows
- route arrows awkwardly
- preserve the wrong semantics
- produce hard-corner orthogonal connectors

Use automation only for repetitive cleanup, then review manually.

### Do not imply nonexistent components

Examples of mistakes to avoid:

- invented schema parser/cache layers
- wrong VM/runtime components
- stale protocol names
- outputs that do not actually exist

### Do not overfit to previous bad diagrams

If the old diagram is wrong, redraw from source instead of preserving it.

## Page-specific lessons learned

### PhotosExport

- give output boxes enough room
- manually split long labels like `+ JSON`
- exporter diagrams benefit from simple fan-out outputs

### mdnsbridge

- upstream README contained the correct diagram
- request/response arrows matter
- the labels should reflect DNS query, mDNS query, and returned IP

### bun-opds-server

- it needs all four arrows when representing Calibre → OPDS/kosync → reader/KOReader
- missing left-side arrows made the flow unreadable

### ground-init

- do not invent a parser/schema/cache if the page describes state convergence across packages/files/users/services/scripts

### macemu-jit

- diagram must say ARM64 host, not just Apple Silicon
- mention Raspberry Pi where relevant
- distinguish BasiliskII 68K JIT and SheepShaver PPC JIT when the page does

### go-busybox

- show multi-call entrypoint and outputs clearly
- do not muddle applets, WASM artifact, and sandbox semantics in one ambiguous cluster

### webterm

- separate browser UI, WASM renderer, server/go-te state, and PTY session
- make the dashboard/session model legible

### imapbackup

- the main diagram is IMAP server → script → local mbox
- state file hangs below the script
- show incremental UID tracking and TLS simply

## Audit checklist

When reviewing an existing diagram, check:

- Does it match the page copy?
- Does it match upstream source/docs?
- Are arrows present where the flow requires them?
- Do arrows terminate on box edges?
- Are elbow connectors rounded, not hard-cornered?
- Are labels readable at normal width?
- Does any line of text need manual wrapping?
- Are dark/light styles intact?
- Does the generated `projects/*.html` still contain the intended SVG?

## Build and verification

From repo root:

```bash
bun run build.ts
```

Then verify:

- target `projects/*.html` regenerated
- SVG markup is present in generated HTML
- markers/arrows survived build output
- no labels overflow boxes
- no missing arrows on published pages

Useful checks:

```bash
rg "<svg|marker-end|<path d=|<line " _content/*.md projects/*.html
rg "stroke-linejoin|marker-end" projects/*.html
```

## Publishing workflow

If the user wants the change published:

1. edit `_content/*.md`
2. run `bun run build.ts`
3. commit source + generated output
4. push `master`
5. create and push a new `v*` tag

## Deliverables

When done, report briefly:

- which project diagrams changed
- whether you verified against source/upstream docs
- whether you rebuilt the site
- whether you pushed/tagged
- any diagrams still needing manual visual review
