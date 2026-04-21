---
name: portfolio-site-management
description: Maintain rcarmo.github.io thoroughly: content, icons, diagrams, favicon, build, rebuild/tag/push workflow, and client-side sorting/related behavior.
distribution: project
---

# Portfolio Site Management

Manage the `projects/rcarmo.github.io` portfolio site thoroughly and safely.

## Scope

This skill applies when working on:

- project metadata under `_content/*.md`
- generated pages (`index.html`, `projects/*.html`)
- site generator logic in `build.ts`
- client-side behavior in `assets/js/repo-island.mjs`
- styles in `assets/css/style.css`
- icons, logos, favicon, banners, and diagrams under `assets/`
- release/tag/publish workflow for the site

## Canonical files

Read these before making non-trivial changes:

- `build.ts`
- `assets/js/repo-island.mjs`
- `assets/css/style.css`
- `.github/workflows/build.yml`
- relevant `_content/<project>.md` files

## Site model

- `_content/*.md` is the source of truth for project metadata and page content.
- `build.ts` generates:
  - `index.html`
  - `projects/*.html`
- Live GitHub metadata is filled in client-side by `assets/js/repo-island.mjs`.
- Do not hand-edit generated HTML unless debugging temporarily; persist real fixes in source files.

## Working rules

1. Read before editing.
2. Prefer fixing generator/content logic over patching generated output.
3. Rebuild only when needed.
4. Do not say work is done without verifying generated output.
5. Keep dark/light mode behavior intact.

## Important user preferences

### Visual language

- Clean black/white design with blue accent.
- IBM Plex headings, Inter body, JetBrains Mono.
- Avoid heavy gradients and visual clutter.
- Icons should not have framed boxes/borders unless explicitly requested.
- Diagrams must render at natural size, not stretched full width.

### Home page

- The home hero stays centered.
- Motto + avatar are the focal point.
- Stats sit below the centered hero group.

### Icons and logos

- Never embed icons as base64 data URIs.
- Always reference logo/image files by normal paths/URLs.
- Preserve real project-specific icons whenever they exist.
- Use fallback/default icons only when a real `logo:` is absent or missing.
- If a user reports an icon exists, verify both:
  - `_content/<project>.md`
  - corresponding assets under `assets/logos-opt/` and `assets/logos/`
- Remove letter-generated/fake icons when the user wants placeholders/default behavior instead.

### Favicon

- Favicon should be derived from the avatar.
- Publish from site root when possible:
  - `favicon.ico`
  - `favicon.png`
- Generated pages should reference root favicon paths, not deep asset paths.

### Related items

- Hero-area related items must be chosen from the same section/category.
- They must be sorted client-side by descending live GitHub stars.
- Limit to top 5.
- Do not render the header or block until live data is available.

## Metadata policy

Use frontmatter consistently:

- `repo:` GitHub full name when not `rcarmo/<id>`
- `section:` category key
- `status:` stable/active/etc.
- `created:` `YYYY-MM-DD` when known
- `logo:` only for real curated/project-specific icons
- `featured:` for homepage featured projects
- `related:` only if explicitly needed beyond same-section logic

### Creation dates

When assigning age-based fallback icons or maintaining historical metadata:

1. Query GitHub for repository creation date.
2. Store it as `created: YYYY-MM-DD` in frontmatter.
3. Prefer maintainable metadata over one-off logic.

## Diagram policy

When editing a project diagram:

- Prefer inline SVG.
- Make it light/dark aware using `prefers-color-scheme`.
- Reflect actual architecture from docs/repo behavior, not generic boxes.
- Keep sizes reasonable and allow natural scaling in page CSS.
- Mermaid is acceptable only if it clearly improves maintainability and rendering is reliable in this site.

## Build and verification

### Rebuild

From repo root:

```bash
bun run build.ts
```

### Verify after rebuild

Check at least:

- `index.html` was regenerated
- relevant `projects/*.html` pages were regenerated
- logo references are file paths, not data URIs
- no broken/missing hero logos
- related items behavior still makes sense
- diagrams render with natural sizing
- favicon references point to root paths

Useful checks:

```bash
rg "data:image|card-logo-placeholder|missing-random|default.png" index.html projects/*.html
rg "repo-island\.mjs\?v=" index.html projects/*.html
```

## Publishing workflow

The repo publishes via GitHub Actions.

### Important

- Ordinary pushes to `master` do not necessarily publish.
- Tag pushes matching `v*` trigger the release workflow.

Always read `.github/workflows/build.yml` before changing publish assumptions.

### Standard publish sequence

When the user explicitly asks to publish/rebuild/tag/push:

1. Commit source/content changes.
2. Rebuild with `bun run build.ts`.
3. Commit generated output if it changed.
4. Push `master`.
5. Create and push a new `v*` tag.

Example pattern:

```bash
git add -A
git commit -m "Apply latest content updates"
bun run build.ts
git add index.html projects/*.html
git commit -m "Rebuild site"
git push origin master
git tag -a vYYYY.MM.DD.N -m "Release vYYYY.MM.DD.N"
git push origin vYYYY.MM.DD.N
```

## Common tasks

### Add or fix a project icon

1. Check `_content/<project>.md` for `logo:`.
2. Check `assets/logos-opt/<project>.*` and `assets/logos/<project>.*`.
3. If a real icon exists, point `logo:` at it.
4. If no real icon exists, remove fake/generated icon assets and let fallback logic handle it.
5. Rebuild only if requested or needed for verification.

### Replace a diagram

1. Read the project content file.
2. Read the upstream docs/README if the project architecture matters.
3. Replace only the `## Diagram` section.
4. Keep the SVG theme-aware.
5. Rebuild and verify rendering.

### Fix sorting/hero behavior

1. Inspect `assets/js/repo-island.mjs` first.
2. If behavior depends on live GitHub data, keep ranking client-side.
3. Cache-bust the JS import when necessary so browsers pick up changes.
4. Rebuild generated pages after changing script references.

### Fix favicon issues

1. Compare with known-good local web UI behavior if needed.
2. Prefer root-level `favicon.ico` and `favicon.png`.
3. Update `build.ts` head tags.
4. Rebuild and republish.

## Do not

- Do not reintroduce base64-embedded icons.
- Do not mass-replace real icons with defaults.
- Do not add decorative icon frames the user removed.
- Do not assume cache issues are fixed without cache-busting if JS changed.
- Do not rebuild unless the task needs it or the user asked.

## Deliverables

When finished, report briefly:

- what changed
- which source files changed
- whether you rebuilt
- whether you pushed/tagged
- any remaining uncertainty or follow-up needed
