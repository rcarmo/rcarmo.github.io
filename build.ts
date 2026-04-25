#!/usr/bin/env bun
/**
 * Portfolio site builder.
 *
 * Reads _content/*.md as the sole content source.
 * Generates project pages + index.html.
 * All live metrics (stars, forks, releases) come from client-side GitHub API.
 *
 * Usage: bun run build.ts
 */
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, rmSync } from "node:fs";
import { extname, join } from "node:path";

// ── Paths ────────────────────────────────────────────────────────────────────
const ROOT    = import.meta.dir;
const CONTENT = join(ROOT, "_content");
const OUT     = join(ROOT, "projects");
const ASSETS  = join(ROOT, "assets");
const OG_OUT  = join(ASSETS, "og");
const SITE_URL = "https://rcarmo.github.io";
const ASSET_VERSION = Date.now().toString(36);
mkdirSync(OUT, { recursive: true });
mkdirSync(OG_OUT, { recursive: true });

// ── Types ────────────────────────────────────────────────────────────────────
interface Frontmatter {
  repo?: string;        // GitHub full_name, default rcarmo/{id}
  section: string;      // section key (auto-discovered)
  status: string;       // stable | maintained | experimental | archived
  tagline: string;      // one-liner
  created?: string;     // ISO date (YYYY-MM-DD) for maintainable fallback icon selection
  logo?: string;        // path to logo image (transparent bg)
  hidden?: boolean;     // omit from site
  featured?: boolean;    // pin to top of index
  related?: string;       // comma-separated project ids for cross-section related
}

interface Section {
  heading: string;      // e.g. "About", "How it works"
  body: string;         // raw markdown/html body
}

interface Project {
  id: string;           // filename without .md
  fm: Frontmatter;      // parsed frontmatter
  sections: Section[];  // parsed ## sections
  raw: string;          // raw markdown body (below frontmatter)
}

// ── Languages to filter from display ─────────────────────────────────────────
const SKIP_LANGS = new Set([
  'Dockerfile','Makefile','HTML','CSS','YAML','JSON','TOML',
  'Shell','Batchfile','PowerShell','Roff','Nix',
]);

// ── Markdown parsing ─────────────────────────────────────────────────────────

function parseFrontmatter(src: string): { fm: Frontmatter; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("Missing frontmatter");
  const lines = m[1].split("\n");
  const fm: any = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let val: any = line.slice(idx + 1).trim();
    if (val === "true") val = true;
    else if (val === "false") val = false;
    return fm; // this is wrong, let me fix
  }
  return { fm: fm as Frontmatter, body: m[2] };
}

function parseSections(body: string): Section[] {
  const sections: Section[] = [];
  const parts = body.split(/^## /m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const nlIdx = part.indexOf("\n");
    if (nlIdx < 0) continue;
    const heading = part.slice(0, nlIdx).trim();
    const sectionBody = part.slice(nlIdx + 1).trim();
    sections.push({ heading, body: sectionBody });
  }
  return sections;
}

function parseFeatures(body: string): { icon: string; title: string; body: string }[] {
  const features: { icon: string; title: string; body: string }[] = [];
  const parts = body.split(/^### /m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const nlIdx = part.indexOf("\n");
    const heading = nlIdx >= 0 ? part.slice(0, nlIdx).trim() : part.trim();
    const featureBody = nlIdx >= 0 ? part.slice(nlIdx + 1).trim() : "";
    // Extract emoji icon from heading start
    const emojiMatch = heading.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.*)/u);
    const icon = emojiMatch ? emojiMatch[1] : "→";
    const title = emojiMatch ? emojiMatch[2] : heading;
    features.push({ icon, title, body: featureBody });
  }
  return features;
}

function parsePosts(body: string): { title: string; url: string; date: string }[] {
  const posts: { title: string; url: string; date: string }[] = [];
  const lines = body.split("\n").filter(l => l.trim().startsWith("- ") || l.trim().startsWith("* "));
  for (const line of lines) {
    const m = line.match(/\[([^\]]+)\]\(([^)]+)\)(?:\s*[—–-]\s*(\S+))?/);
    if (m) posts.push({ title: m[1], url: m[2], date: m[3] || "" });
  }
  return posts;
}

function parseGallery(body: string): { title: string; src: string; caption: string }[] {
  const items: { title: string; src: string; caption: string }[] = [];
  const lines = body.split("\n").filter(l => l.trim().startsWith("- ") || l.trim().startsWith("* "));
  for (const line of lines) {
    const m = line.match(/\[([^\]]+)\]\(([^)]+)\)(?:\s*[—–-]\s*(.+))?/);
    if (m) items.push({ title: m[1].trim(), src: m[2].trim(), caption: (m[3] || "").trim() });
  }
  return items;
}

// ── Read all projects ────────────────────────────────────────────────────────

function readProjects(): Project[] {
  const files = readdirSync(CONTENT).filter(f => f.endsWith(".md")).sort();
  const projects: Project[] = [];

  for (const file of files) {
    const id = file.replace(/\.md$/, "");
    const src = readFileSync(join(CONTENT, file), "utf-8");

    const fmMatch = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) { console.warn(`  ⚠ ${file}: no frontmatter, skipping`); continue; }

    // Parse YAML frontmatter (simple key: value parser)
    const fm: any = {};
    for (const line of fmMatch[1].split("\n")) {
      const idx = line.indexOf(":");
      if (idx < 0) continue;
      const key = line.slice(0, idx).trim();
      let val: string | boolean = line.slice(idx + 1).trim();
      if (val === "true") val = true;
      else if (val === "false") val = false;
      fm[key] = val;
    }

    if (fm.hidden === true) { console.log(`  ⊘ ${id} (hidden)`); continue; }

    // Default repo to rcarmo/{id}
    if (!fm.repo) fm.repo = `rcarmo/${id}`;

    const body = fmMatch[2];
    const sections = parseSections(body);

    projects.push({ id, fm: fm as Frontmatter, sections, raw: body });
  }

  return projects;
}

// ── HTML helpers ─────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function mimeTypeFor(path: string): string {
  const ext = extname(path).toLowerCase();
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

function assetDataUri(pathOrNull: string | null): string | null {
  if (!pathOrNull) return null;
  const rel = pathOrNull.replace(/^\//, "");
  const full = join(ROOT, rel);
  if (!existsSync(full)) return null;
  const buf = readFileSync(full);
  return `data:${mimeTypeFor(full)};base64,${buf.toString("base64")}`;
}

function ogImageUrl(name: string): string {
  return `${SITE_URL}/assets/og/${name}.svg`;
}

function wrapOgText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) break;
  }
  if (lines.length < maxLines && current) lines.push(current);
  if (lines.length > maxLines) lines.length = maxLines;
  const consumed = lines.join(" ");
  if (consumed.length < text.trim().length && lines.length) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/[\s.]+$/, "") + "…";
  }
  return lines;
}

function buildOgCardSvg(opts: {
  title: string;
  description: string;
  kicker: string;
  imageDataUri?: string | null;
  accent?: string;
  meta?: string;
}): string {
  const accent = opts.accent || "#2563eb";
  const title = esc(opts.title);
  const kicker = esc(opts.kicker);
  const meta = esc(opts.meta || "rcarmo.github.io");
  const imageDataUri = opts.imageDataUri || "";
  const descLines = wrapOgText(opts.description, 42, 3)
    .map((line, index) => `<text x="344" y="${330 + index * 38}" font-family="Inter,system-ui,sans-serif" font-size="28" fill="#334155">${esc(line)}</text>`)
    .join("\n    ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5f9ff"/>
      <stop offset="100%" stop-color="#eaf1fb"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#8aa3c4" flood-opacity="0.20"/>
    </filter>
    <clipPath id="logoClip">
      <rect x="120" y="153" width="170" height="170" rx="36"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1110" cy="92" r="220" fill="#dbeafe" opacity="0.7"/>
  <circle cx="102" cy="578" r="190" fill="#eff6ff" opacity="0.85"/>
  <g filter="url(#shadow)">
    <rect x="66" y="66" width="1068" height="498" rx="34" fill="#ffffff"/>
    <rect x="66" y="66" width="1068" height="498" rx="34" fill="none" stroke="#d7e3f4"/>
    <rect x="66" y="66" width="1068" height="14" rx="14" fill="url(#accent)"/>
    <rect x="120" y="153" width="170" height="170" rx="36" fill="#eff6ff" stroke="#dbe5f1"/>
    ${imageDataUri ? `<image href="${imageDataUri}" x="136" y="169" width="138" height="138" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClip)"/>` : `<text x="205" y="256" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="72" font-weight="700" fill="#2563eb">◉</text>`}
    <text x="344" y="178" font-family="Inter,system-ui,sans-serif" font-size="24" font-weight="700" letter-spacing="1.5" fill="${accent}">${kicker}</text>
    <text x="344" y="258" font-family="IBM Plex Sans,Inter,system-ui,sans-serif" font-size="58" font-weight="700" fill="#0f172a">${title}</text>
    ${descLines}
    <rect x="344" y="468" width="212" height="48" rx="24" fill="#eff6ff" stroke="#dbeafe"/>
    <text x="450" y="500" text-anchor="middle" font-family="JetBrains Mono,ui-monospace,monospace" font-size="20" fill="#1e3a8a">${meta}</text>
    <text x="1046" y="508" text-anchor="end" font-family="Inter,system-ui,sans-serif" font-size="24" font-weight="600" fill="#64748b">rcarmo.github.io</text>
  </g>
</svg>`;
}

function writeOgCard(name: string, svg: string): void {
  writeFileSync(join(OG_OUT, `${name}.svg`), svg);
}

function buildMetaTags(opts: {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  imageAlt: string;
  type?: string;
}): string {
  const type = opts.type || "website";
  return [
    `<meta name="description" content="${esc(opts.description)}">`,
    `<meta property="og:type" content="${esc(type)}">`,
    `<meta property="og:site_name" content="rcarmo.github.io">`,
    `<meta property="og:title" content="${esc(opts.title)}">`,
    `<meta property="og:description" content="${esc(opts.description)}">`,
    `<meta property="og:url" content="${esc(opts.canonicalUrl)}">`,
    `<meta property="og:image" content="${esc(opts.imageUrl)}">`,
    `<meta property="og:image:type" content="image/svg+xml">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(opts.imageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(opts.title)}">`,
    `<meta name="twitter:description" content="${esc(opts.description)}">`,
    `<meta name="twitter:image" content="${esc(opts.imageUrl)}">`,
    `<meta name="twitter:image:alt" content="${esc(opts.imageAlt)}">`,
  ].join("\n");
}

function mdToHtml(md: string): string {
  // Minimal markdown→html: paragraphs, inline code, bold, italic, links
  // Preserves raw HTML (SVGs, etc.) passed through
  return md
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return "";
      // Pass through raw HTML blocks
      if (block.startsWith("<")) return block;
      // Inline formatting
      block = block
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      return `<p>${block}</p>`;
    })
    .join("\n");
}

// ── Logo handling ────────────────────────────────────────────────────────────

let RANDOM_FALLBACK_PROJECT_ID: string | null = null;

function projectAgeYears(project: Project): number {
  const currentYear = new Date().getUTCFullYear();
  const createdYear = Number(project.fm.created?.slice(0, 4));
  return Number.isFinite(createdYear) && createdYear > 0
    ? Math.max(0, currentYear - createdYear)
    : 4;
}

function hasRealLogo(project: Project): boolean {
  if (!project.fm.logo) return false;
  return existsSync(join(ROOT, project.fm.logo));
}

function selectRandomFallbackProject(projects: Project[]): void {
  const eligible = projects.filter(project => !hasRealLogo(project) && projectAgeYears(project) >= 2).sort((a, b) => a.id.localeCompare(b.id));
  if (!eligible.length) {
    RANDOM_FALLBACK_PROJECT_ID = null;
    return;
  }
  const seed = eligible.map(project => project.id).join('|');
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const pick = eligible[hash % eligible.length];
  RANDOM_FALLBACK_PROJECT_ID = pick.id;
}

function fallbackLogoPath(project: Project): string | null {
  const age = projectAgeYears(project);
  const fallbackName = project.id === RANDOM_FALLBACK_PROJECT_ID
    ? "default-05.png"
    : `default-0${Math.min(age, 4)}.png`;
  const fallbackPath = `assets/logos-opt/${fallbackName}`;
  const fullPath = join(ROOT, fallbackPath);
  return existsSync(fullPath) ? `/${fallbackPath}` : null;
}

function logoSrc(project: Project): string | null {
  const logoPath = project.fm.logo;
  if (logoPath) {
    const fullPath = join(ROOT, logoPath);
    if (existsSync(fullPath)) return `/${logoPath}`;
  }

  return fallbackLogoPath(project);
}

// ── Section helpers ──────────────────────────────────────────────────────────

function getSection(project: Project, heading: string): Section | undefined {
  return project.sections.find(s =>
    s.heading.toLowerCase() === heading.toLowerCase()
  );
}

function getSectionHtml(project: Project, heading: string): string {
  const s = getSection(project, heading);
  return s ? mdToHtml(s.body) : "";
}

// ── Build project page ───────────────────────────────────────────────────────

function buildProjectPage(project: Project, allProjects: Project[]): string {
  const { id, fm } = project;
  const fullName = fm.repo || `rcarmo/${id}`;
  const ghUrl = `https://github.com/${fullName}`;
  const canonicalUrl = `${SITE_URL}/projects/${id}/`;
  const logo = logoSrc(project);
  const palette = {
    'ai-agents': '#2d6dff',
    'ai-ml': '#7a4cff',
    'cloud': '#1ba1e3',
    'hardware': '#d97706',
    'infrastructure': '#0f9f7a',
    'libraries': '#a16207',
    'macos': '#db2777',
    'terminal': '#1f7a50',
    'featured': '#2563eb',
  } as Record<string, string>;
  writeOgCard(id, buildOgCardSvg({
    title: id,
    description: fm.tagline || '',
    kicker: (fm.section || 'project').replace(/-/g, ' ').toUpperCase(),
    imageDataUri: assetDataUri(logo),
    accent: palette[fm.section || ''] || '#2563eb',
    meta: fullName,
  }));
  const metaTags = buildMetaTags({
    title: `${id} — rcarmo`,
    description: fm.tagline || '',
    canonicalUrl,
    imageUrl: ogImageUrl(id),
    imageAlt: `${id} project card`,
    type: 'website',
  });

  // Gather content sections
  const aboutHtml    = getSectionHtml(project, "About");
  const howHtml      = getSectionHtml(project, "How it works");
  const gallerySection = getSection(project, "Gallery");
  const gallery      = gallerySection ? parseGallery(gallerySection.body) : [];
  const featuresSection = getSection(project, "Features");
  const features     = featuresSection ? parseFeatures(featuresSection.body) : [];
  const diagramSection = getSection(project, "Diagram");
  const releasesSection = getSection(project, "Releases");
  const postsSection = getSection(project, "Posts");
  const posts        = postsSection ? parsePosts(postsSection.body) : [];

  // TOC
  const toc: { id: string; label: string }[] = [];
  if (aboutHtml) toc.push({ id: "s-about", label: "Overview" });
  if (howHtml) toc.push({ id: "s-how", label: "How it works" });
  if (features.length) toc.push({ id: "s-features", label: "Features" });
  if (diagramSection) toc.push({ id: "s-diagram", label: "Diagram" });
  if (releasesSection) toc.push({ id: "s-releases", label: "Releases" });
  if (posts.length) toc.push({ id: "s-posts", label: "Posts" });

  const tocHtml = toc.map(t =>
    `<a href="#${t.id}" class="toc-link" data-section="${t.id}">${esc(t.label)}</a>`
  ).join("\n      ");

  const featuresHtml = features.map(f => `
    <div class="feature">
      <div class="feature-icon">${f.icon}</div>
      <div>
        <div class="feature-title">${esc(f.title)}</div>
        <div class="feature-body">${mdToHtml(f.body)}</div>
      </div>
    </div>`).join("\n");

  const postsHtml = posts.map(p => `
    <div class="post">
      <span class="post-date">${esc(p.date)}</span>
      <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a>
    </div>`).join("\n");

  const heroGalleryHtml = gallery.length ? `
  <section class="hero-media-band">
    <div class="hero-media-inner">
      <div class="hero-gallery" data-gallery tabindex="0" aria-label="Project gallery">
        <div class="hero-gallery-stage">
          ${gallery.map((item, index) => `
          <figure class="hero-gallery-slide${index === 0 ? ' is-active' : ''}" data-gallery-slide>
            <img src="/${esc(item.src)}" alt="${esc(item.title)}" loading="lazy">
          </figure>`).join("")}
        </div>
        <div class="hero-gallery-meta">
          <div class="hero-gallery-nav-row">
            <div class="hero-gallery-nav">
              <button type="button" class="hero-gallery-btn" data-gallery-prev aria-label="Previous image">◀</button>
              <input class="hero-gallery-goto" data-gallery-goto type="number" min="1" value="1" title="Jump to image">
              <span class="hero-gallery-status" data-gallery-status>/ ${gallery.length}</span>
              <button type="button" class="hero-gallery-btn" data-gallery-next aria-label="Next image">▶</button>
            </div>
            <div class="hero-gallery-hint">←/→ keyboard navigation</div>
          </div>
          <div class="hero-gallery-caption">
            ${gallery.map((item, index) => `
            <div class="hero-gallery-caption-item${index === 0 ? ' is-active' : ''}" data-gallery-caption>
              <div class="hero-gallery-caption-title">${esc(item.title)}</div>
              ${item.caption ? `<div class="hero-gallery-caption-body">${esc(item.caption)}</div>` : ""}
            </div>`).join("")}
          </div>
          <div class="hero-gallery-thumbs" role="tablist" aria-label="Gallery thumbnails">
            ${gallery.map((item, index) => `
            <button type="button" class="hero-gallery-thumb${index === 0 ? ' is-active' : ''}" data-gallery-thumb aria-label="Show image ${index + 1}: ${esc(item.title)}">
              <img src="/${esc(item.src)}" alt="" loading="lazy">
            </button>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>` : "";

  const relatedCandidates = allProjects
    .filter(p => p.fm.section === fm.section && p.id !== id)
    .map(p => ({
      id: p.id,
      fullName: p.fm.repo || `rcarmo/${p.id}`,
      logo: logoSrc(p),
    }));

  const logoImg = logo
    ? `<img class="hero-logo" src="${logo}" alt="${esc(fm.tagline || id)} logo">`
    : "";

  const statusBadge = fm.status
    ? `<span class="badge badge-${fm.status}">${fm.status}</span>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(id)} — rcarmo</title>
${metaTags}
<link rel="stylesheet" href="/assets/css/style.css">
<link id="dynamic-favicon" rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/favicon.png">
<link rel="canonical" href="${canonicalUrl}">
</head>
<body>
  <nav class="topnav">
    <a href="/" class="nav-home">rcarmo</a>
    <a href="${ghUrl}" target="_blank" rel="noopener" class="nav-gh">GitHub ↗</a>
  </nav>

  <header class="hero hero-project" id="hero" data-section="${esc(fm.section || "")}">
    <div class="hero-inner">
      ${logoImg}
      <div class="hero-text">
        <div class="hero-kicker">Project</div>
        <div class="hero-title-row">
          <h1>${esc(id)}</h1>
          ${statusBadge}
        </div>
        <p class="hero-tagline">${esc(fm.tagline || "")}</p>
        <div id="hero-meta-island-${id}" class="hero-meta">
          <!-- live: stars, forks, language -->
        </div>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${ghUrl}" target="_blank" rel="noopener">View on GitHub ↗</a>
        </div>
      </div>
      <div id="hero-related-${id}" class="hero-related" hidden></div>
    </div>
  </header>
${heroGalleryHtml}

  <div class="page-layout">
    <aside class="toc-sidebar">
      ${tocHtml}
    </aside>

    <main class="content">
      <div id="stats-island-${id}" class="stats-bar">
        <!-- live: stars, forks, issues, created -->
      </div>

${aboutHtml ? `      <section class="sec" id="s-about">
        <div class="sec-label">Overview</div>
        ${aboutHtml}
      </section>` : ""}

${howHtml ? `      <section class="sec" id="s-how">
        <div class="sec-label">How it works</div>
        ${howHtml}
      </section>` : ""}

${features.length ? `      <section class="sec" id="s-features">
        <div class="sec-label">Features</div>
        <div class="features-grid">
          ${featuresHtml}
        </div>
      </section>` : ""}

${diagramSection ? `      <section class="sec" id="s-diagram">
        <div class="sec-label">Architecture</div>
        <div class="diagram-wrap">${diagramSection.body}</div>
      </section>` : ""}

${releasesSection ? `      <section class="sec" id="s-releases">
        <div class="sec-label">Releases</div>
        ${releasesSection.body ? mdToHtml(releasesSection.body) : ""}
        <div id="rel-island-${id}">
          <!-- live: last 5 releases -->
        </div>
      </section>` : ""}

${posts.length ? `      <section class="sec" id="s-posts">
        <div class="sec-label">Posts</div>
        <div class="posts">${postsHtml}</div>
      </section>` : ""}
    </main>
  </div>

  <footer>
    <span class="foot-l">rcarmo.github.io</span>
    <span class="foot-r"><a href="/">Home</a> · <a href="${ghUrl}">Source</a></span>
  </footer>

  <script type="module" src="/assets/js/repo-island.mjs?v=${ASSET_VERSION}"></script>
  <script type="module">
    import { mount } from '/assets/js/repo-island.mjs?v=${ASSET_VERSION}';
    mount({
      fullName: '${fullName}',
      heroMetaEl: document.getElementById('hero-meta-island-${id}'),
      statsEl:    document.getElementById('stats-island-${id}'),
      releasesEl: document.getElementById('rel-island-${id}'),
      relatedEl:  document.getElementById('hero-related-${id}'),
      relatedCandidates: ${JSON.stringify(relatedCandidates)},
    });
  </script>
  <script>
    // Scroll-spy for TOC
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length) {
      const sections = [...tocLinks].map(l => ({
        link: l,
        el: document.getElementById(l.dataset.section)
      })).filter(s => s.el);
      const obs = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            const match = sections.find(s => s.el === e.target);
            if (match) match.link.classList.add('active');
          }
        }
      }, { rootMargin: '-20% 0px -70% 0px' });
      sections.forEach(s => obs.observe(s.el));
    }

    document.querySelectorAll('[data-gallery]').forEach((gallery) => {
      const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
      const captions = [...gallery.querySelectorAll('[data-gallery-caption]')];
      const prev = gallery.querySelector('[data-gallery-prev]');
      const next = gallery.querySelector('[data-gallery-next]');
      const goto = gallery.querySelector('[data-gallery-goto]');
      const status = gallery.querySelector('[data-gallery-status]');
      const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
      let index = 0;

      function renderGallery(nextIndex) {
        index = Math.max(0, Math.min(slides.length - 1, nextIndex));
        slides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === index);
        });
        captions.forEach((caption, i) => caption.classList.toggle('is-active', i === index));
        thumbs.forEach((thumb, i) => {
          thumb.classList.toggle('is-active', i === index);
          thumb.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
        if (goto) {
          goto.value = String(index + 1);
          goto.max = String(slides.length);
        }
        if (status) status.textContent = '/ ' + slides.length;
        if (prev) prev.disabled = index <= 0;
        if (next) next.disabled = index >= slides.length - 1;
      }

      prev?.addEventListener('click', () => renderGallery(index - 1));
      next?.addEventListener('click', () => renderGallery(index + 1));
      goto?.addEventListener('change', () => renderGallery(Number(goto.value || 1) - 1));
      goto?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') renderGallery(Number(goto.value || 1) - 1);
      });
      thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => renderGallery(i)));
      gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); renderGallery(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); renderGallery(index + 1); }
        if (e.key === 'Home') { e.preventDefault(); renderGallery(0); }
        if (e.key === 'End') { e.preventDefault(); renderGallery(slides.length - 1); }
      });
      renderGallery(0);
    });
  </script>
</body>
</html>`;
}

// ── Build index page ─────────────────────────────────────────────────────────

function buildIndex(projects: Project[]): string {
  const indexLogo = assetDataUri('/assets/avatar.png');
  writeOgCard('index', buildOgCardSvg({
    title: 'rcarmo',
    description: 'Open source projects by Rui Carmo',
    kicker: 'OPEN SOURCE',
    imageDataUri: indexLogo,
    accent: '#2563eb',
    meta: `${projects.length} projects`,
  }));
  const metaTags = buildMetaTags({
    title: 'rcarmo — open source',
    description: 'Open source projects by Rui Carmo',
    canonicalUrl: `${SITE_URL}/`,
    imageUrl: ogImageUrl('index'),
    imageAlt: 'rcarmo open source site card',
    type: 'website',
  });
  // Group by section, sort by stars (will be re-sorted client-side with live data)
  const groups = new Map<string, Project[]>();
  for (const p of projects) {
    const s = p.fm.section;
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s)!.push(p);
  }

  // Featured projects (pinned at top, across any section)
  const featured = projects.filter(p => p.fm.featured);

  // Section order: alphabetical (no more special "highlight" section)
  const sectionOrder = [...groups.keys()].sort((a, b) => a.localeCompare(b));

  // Section display names (derive from key)
  const SECTION_LABELS: Record<string,string> = {
    'ai-agents': 'AI Agents',
    'ai-ml': 'AI & ML',
    'macos': 'macOS',
    'infrastructure': 'Infrastructure',
    'terminal': 'Terminal & CLI',
    'hardware': 'Hardware',
    'libraries': 'Libraries',
  };
  function sectionLabel(key: string): string {
    return SECTION_LABELS[key] || key.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  }

  // Collect all fullNames for the hero stats bulk fetch
  const allFullNames = projects.map(p => p.fm.repo || `rcarmo/${p.id}`);

  let sectionsHtml = "";

  // Featured projects card(s)
  if (featured.length) {
    const featCards = featured.map(p => {
      const logo = logoSrc(p);
      const fullName = p.fm.repo || `rcarmo/${p.id}`;
      const logoHtml = `<div class="card-logo card-logo-lg"><img src="${logo}" alt="" loading="lazy"></div>`;
      return `
        <a href="/projects/${p.id}/" class="card card-featured" data-repo="${esc(fullName)}">
          ${logoHtml}
          <div class="card-body card-body-featured">
            <div class="card-kicker">Featured project</div>
            <div class="card-name card-name-featured">${esc(p.id)}</div>
            <div class="card-tagline card-tagline-featured">${esc(p.fm.tagline || "")}</div>
            <div id="card-meta-${p.id}" class="card-meta card-meta-featured"></div>
          </div>
        </a>`;
    }).join("\n");

    sectionsHtml += `
    <section class="idx-section idx-featured">
      <h2 class="idx-section-title">Featured</h2>
      <div class="card-grid card-grid-featured">${featCards}</div>
    </section>`;
  }
  for (const sKey of sectionOrder) {
    const sProjects = groups.get(sKey)!;
    const cardsHtml = sProjects.filter(p => !p.fm.featured).map(p => {
      const logo = logoSrc(p);
      const fullName = p.fm.repo || `rcarmo/${p.id}`;
      const logoHtml = `<div class="card-logo"><img src="${logo}" alt="" loading="lazy"></div>`;
      return `
        <a href="/projects/${p.id}/" class="card" data-repo="${esc(fullName)}">
          ${logoHtml}
          <div class="card-body">
            <div class="card-name">${esc(p.id)}</div>
            <div class="card-tagline">${esc(p.fm.tagline || "")}</div>
            <div id="card-meta-${p.id}" class="card-meta">
              <!-- live: stars, language -->
            </div>
          </div>
        </a>`;
    }).join("\n");

    sectionsHtml += `
    <section class="idx-section" id="section-${sKey}">
      <h2 class="idx-section-title">${esc(sectionLabel(sKey))}</h2>
      <div class="card-grid">
        ${cardsHtml}
      </div>
    </section>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>rcarmo — open source</title>
${metaTags}
<link rel="stylesheet" href="/assets/css/style.css">
<link id="dynamic-favicon" rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/favicon.png">
<link rel="canonical" href="${SITE_URL}/">
</head>
<body>
  <nav class="topnav">
    <a href="/" class="nav-home">rcarmo</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener" class="nav-gh">GitHub ↗</a>
  </nav>

  <header class="hero hero-index" id="hero">
    <div class="hero-inner hero-inner-centered">
      <div class="hero-row hero-row-centered">
        <div class="hero-copy hero-copy-centered">
          <h1 class="hero-title hero-title-centered">Open /<br><strong>source</strong> /<br>craft.</h1>
        </div>
        <div class="hero-aside hero-aside-centered">
          <img class="hero-avatar" src="/assets/avatar.png" alt="Rui Carmo" width="256" height="256">
        </div>
      </div>
      <div id="hero-stats-island" class="hero-stats hero-stats-centered"></div>
    </div>
  </header>
  <p class="index-intro">These were things I thought should exist, so I started making them. Turns out there were quite a few&hellip;</p>

  <main class="index-main">
    ${sectionsHtml}
  </main>

  <div id="typeahead-popup" class="typeahead-popup hidden" role="listbox" aria-label="Search results"></div>

  <footer>
    <span class="foot-l">rcarmo.github.io</span>
    <span class="foot-r"><a href="https://carmo.io">Career</a> · <a href="https://taoofmac.com">Blog</a> · <a href="https://github.com/rcarmo">GitHub</a></span>
  </footer>

  <script type="module" src="/assets/js/repo-island.mjs?v=${ASSET_VERSION}"></script>
  <script type="module">
    import { mountIndex, mountHeroStats } from '/assets/js/repo-island.mjs?v=${ASSET_VERSION}';
    const ALL_FULL_NAMES = ${JSON.stringify(allFullNames)};
    mountIndex(ALL_FULL_NAMES);
    mountHeroStats(document.getElementById('hero-stats-island'), ALL_FULL_NAMES);
  </script>
  <script>
  (function(){
    const typeahead = {
      buffer: '',
      matches: [],
      selectedIndex: -1,
      isActive: false,

      init() {
        document.addEventListener('keydown', (e) => {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
          if (e.key === 'Escape') { this.clear(); return; }
          if (e.key === 'Backspace') { e.preventDefault(); this.buffer = this.buffer.slice(0,-1); this.search(); return; }
          if (e.key === 'ArrowDown' && this.isActive) { e.preventDefault(); this.selectedIndex = (this.selectedIndex+1) % this.matches.length; this.highlight(); return; }
          if (e.key === 'ArrowUp' && this.isActive) { e.preventDefault(); this.selectedIndex = (this.selectedIndex-1+this.matches.length) % this.matches.length; this.highlight(); return; }
          if (e.key === 'Enter' && this.isActive && this.selectedIndex >= 0) { e.preventDefault(); window.location.href = this.matches[this.selectedIndex].url; this.clear(); return; }
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { this.buffer += e.key; this.search(); }
        });
      },

      getAllItems() {
        return [...document.querySelectorAll('.card')].map(card => ({
          name: (card.querySelector('.card-name') || card.querySelector('.card-name-featured'))?.textContent?.trim() || '',
          tagline: (card.querySelector('.card-tagline') || card.querySelector('.card-tagline-featured'))?.textContent?.trim() || '',
          url: card.getAttribute('href') || '#',
          logo: card.querySelector('img')?.getAttribute('src') || '',
          section: card.closest('.idx-section')?.querySelector('.idx-section-title')?.textContent?.trim() || '',
        }));
      },

      search() {
        const popup = document.getElementById('typeahead-popup');
        if (!this.buffer) { this.clear(); return; }
        const q = this.buffer.toLowerCase();
        this.matches = this.getAllItems().filter(function(item){ return (item.name + ' ' + item.tagline).toLowerCase().indexOf(q) >= 0; }).slice(0, 8);
        if (!this.matches.length) { this.clear(); return; }
        popup.innerHTML = '<div class="typeahead-header"><span class="typeahead-query">' + this.esc(this.buffer) + '</span><kbd>↑↓</kbd> navigate · <kbd>⏎</kbd> open · <kbd>esc</kbd> close</div>' +
          this.matches.map((m, i) =>
            '<a class="typeahead-item' + (i===0?' active':'') + '" href="' + this.esc(m.url) + '">' +
            (m.logo ? '<img class="typeahead-logo" src="' + this.esc(m.logo) + '" alt="">' : '<span class="typeahead-logo-placeholder"></span>') +
            '<div class="typeahead-text"><div class="typeahead-name">' + this.esc(m.name) + '</div>' +
            '<div class="typeahead-tagline">' + this.esc(m.tagline) + '</div></div>' +
            '<span class="typeahead-section">' + this.esc(m.section) + '</span></a>'
          ).join('');
        popup.classList.remove('hidden');
        this.isActive = true;
        this.selectedIndex = 0;
      },

      highlight() {
        const items = document.querySelectorAll('.typeahead-item');
        items.forEach((el, i) => el.classList.toggle('active', i === this.selectedIndex));
        if (items[this.selectedIndex]) items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
      },

      clear() {
        this.buffer = '';
        this.matches = [];
        this.selectedIndex = -1;
        this.isActive = false;
        const popup = document.getElementById('typeahead-popup');
        popup.classList.add('hidden');
        popup.innerHTML = '';
      },

      esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    };
    typeahead.init();
  })();
  </script>
</body>
</html>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const projects = readProjects();
selectRandomFallbackProject(projects);
console.log(`Read ${projects.length} projects from _content/`);
if (RANDOM_FALLBACK_PROJECT_ID) console.log(`Random fallback icon: ${RANDOM_FALLBACK_PROJECT_ID}`);

// Build project pages
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
rmSync(OG_OUT, { recursive: true, force: true });
mkdirSync(OG_OUT, { recursive: true });
writeOgCard('scenic-mode', buildOgCardSvg({
  title: 'rcarmo scenic mode',
  description: 'A scenic 3D explorer for browsing Rui Carmo’s open source project portfolio.',
  kicker: 'SCENIC MODE',
  imageDataUri: assetDataUri('/assets/avatar.png'),
  accent: '#2563eb',
  meta: 'interactive explorer',
}));
let built = 0;
for (const p of projects) {
  const html = buildProjectPage(p, projects);
  const projectDir = join(OUT, p.id);
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(join(projectDir, "index.html"), html);
  console.log(`  ✓ ${p.id}`);
  built++;
}

// Build index
const indexHtml = buildIndex(projects);
writeFileSync(join(ROOT, "index.html"), indexHtml);
console.log(`  ✓ index.html`);

console.log(`\nBuilt ${built} project pages, skipped ${readdirSync(CONTENT).filter(f=>f.endsWith('.md')).length - built}`);
