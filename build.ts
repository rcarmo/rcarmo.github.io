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
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { join, basename } from "node:path";

// ── Paths ────────────────────────────────────────────────────────────────────
const ROOT    = import.meta.dir;
const CONTENT = join(ROOT, "_content");
const OUT     = join(ROOT, "projects");
const ASSETS  = join(ROOT, "assets");
mkdirSync(OUT, { recursive: true });

// ── Types ────────────────────────────────────────────────────────────────────
interface Frontmatter {
  repo?: string;        // GitHub full_name, default rcarmo/{id}
  section: string;      // section key (auto-discovered)
  status: string;       // stable | maintained | experimental | archived
  tagline: string;      // one-liner
  logo?: string;        // path to logo image (transparent bg)
  hidden?: boolean;     // omit from site
  featured?: boolean;    // pin to top of index
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

function logoDataUri(project: Project): string | null {
  const logoPath = project.fm.logo;
  if (!logoPath) return null;
  const fullPath = join(ROOT, logoPath);
  if (!existsSync(fullPath)) return null;
  const raw = readFileSync(fullPath);
  const ext = logoPath.split(".").pop()?.toLowerCase();
  const mime = ext === "svg" ? "image/svg+xml" : ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${raw.toString("base64")}`;
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

function buildProjectPage(project: Project): string {
  const { id, fm } = project;
  const fullName = fm.repo || `rcarmo/${id}`;
  const ghUrl = `https://github.com/${fullName}`;
  const logo = logoDataUri(project);

  // Gather content sections
  const aboutHtml    = getSectionHtml(project, "About");
  const howHtml      = getSectionHtml(project, "How it works");
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
<meta name="description" content="${esc(fm.tagline || "")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="canonical" href="https://rcarmo.github.io/projects/${id}.html">
</head>
<body>
  <nav class="topnav">
    <a href="/" class="nav-home">rcarmo</a>
    <a href="${ghUrl}" target="_blank" rel="noopener" class="nav-gh">GitHub ↗</a>
  </nav>

  <header class="hero" id="hero">
    <div class="hero-inner">
      ${logoImg}
      <div class="hero-text">
        <h1>${esc(id)}</h1>
        <p class="hero-tagline">${esc(fm.tagline || "")}</p>
        <div id="hero-meta-island-${id}" class="hero-meta">
          <!-- live: stars, forks, language -->
        </div>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${ghUrl}" target="_blank" rel="noopener">View on GitHub ↗</a>
        </div>
      </div>
    </div>
  </header>

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

      <section class="sec" id="s-related">
        <div class="sec-label">Related</div>
        <div id="related-island-${id}" data-section="${esc(fm.section)}">
          <!-- populated client-side or at build time -->
        </div>
      </section>
    </main>
  </div>

  <footer>
    <span class="foot-l">rcarmo.github.io</span>
    <span class="foot-r"><a href="/">Home</a> · <a href="${ghUrl}">Source</a></span>
  </footer>

  <script type="module" src="/assets/js/repo-island.mjs"></script>
  <script type="module">
    import { mount } from '/assets/js/repo-island.mjs';
    mount({
      fullName: '${fullName}',
      heroMetaEl: document.getElementById('hero-meta-island-${id}'),
      statsEl:    document.getElementById('stats-island-${id}'),
      releasesEl: document.getElementById('rel-island-${id}'),
      relatedEl:  document.getElementById('related-island-${id}'),
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
  </script>
</body>
</html>`;
}

// ── Build index page ─────────────────────────────────────────────────────────

function buildIndex(projects: Project[]): string {
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
  function sectionLabel(key: string): string {
    return key.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  }

  // Collect all fullNames for the hero stats bulk fetch
  const allFullNames = projects.map(p => p.fm.repo || `rcarmo/${p.id}`);

  let sectionsHtml = "";

  // Featured projects card(s)
  if (featured.length) {
    const featCards = featured.map(p => {
      const logo = logoDataUri(p);
      const fullName = p.fm.repo || `rcarmo/${p.id}`;
      const logoHtml = logo
        ? `<div class="card-logo card-logo-lg"><img src="${logo}" alt="" loading="lazy"></div>`
        : `<div class="card-logo card-logo-lg card-logo-placeholder"></div>`;
      return `
        <a href="/projects/${p.id}.html" class="card card-featured" data-repo="${esc(fullName)}">
          ${logoHtml}
          <div class="card-body">
            <div class="card-name">${esc(p.id)}</div>
            <div class="card-tagline">${esc(p.fm.tagline || "")}</div>
            <div id="card-meta-${p.id}" class="card-meta"></div>
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
    const cardsHtml = sProjects.map(p => {
      const logo = logoDataUri(p);
      const fullName = p.fm.repo || `rcarmo/${p.id}`;
      const logoHtml = logo
        ? `<div class="card-logo"><img src="${logo}" alt="" loading="lazy"></div>`
        : `<div class="card-logo card-logo-placeholder"></div>`;
      return `
        <a href="/projects/${p.id}.html" class="card" data-repo="${esc(fullName)}">
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
<meta name="description" content="Open source projects by Rui Carmo">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="canonical" href="https://rcarmo.github.io/">
</head>
<body>
  <nav class="topnav">
    <a href="/" class="nav-home">rcarmo</a>
    <a href="https://github.com/rcarmo" target="_blank" rel="noopener" class="nav-gh">GitHub ↗</a>
  </nav>

  <header class="hero hero-index" id="hero">
    <div class="hero-inner">
      <h1 class="hero-title">Open / <strong>source</strong> / craft.</h1>
      <div id="hero-stats-island" class="hero-stats">
        <!-- live: total stars, repo count, top languages -->
      </div>
    </div>
  </header>

  <main class="index-main">
    ${sectionsHtml}
  </main>

  <footer>
    <span class="foot-l">rcarmo.github.io</span>
    <span class="foot-r"><a href="https://taoofmac.com">Blog</a> · <a href="https://github.com/rcarmo">GitHub</a></span>
  </footer>

  <script type="module" src="/assets/js/repo-island.mjs"></script>
  <script type="module">
    import { mountIndex, mountHeroStats } from '/assets/js/repo-island.mjs';
    const ALL_FULL_NAMES = ${JSON.stringify(allFullNames)};
    mountIndex(ALL_FULL_NAMES);
    mountHeroStats(document.getElementById('hero-stats-island'), ALL_FULL_NAMES);
  </script>
</body>
</html>`;
}

// ── Related projects (build-time) ────────────────────────────────────────────

function injectRelated(html: string, project: Project, allProjects: Project[]): string {
  const related = allProjects
    .filter(p => p.fm.section === project.fm.section && p.id !== project.id)
    .slice(0, 4);

  if (!related.length) {
    return html.replace(
      `<div id="related-island-${project.id}" data-section="${esc(project.fm.section)}">`,
      `<div id="related-island-${project.id}" data-section="${esc(project.fm.section)}" style="display:none">`
    );
  }

  const relatedHtml = related.map(r => {
    const logo = logoDataUri(r);
    const logoImg = logo ? `<img src="${logo}" alt="" class="related-logo">` : "";
    return `<a href="/projects/${r.id}.html" class="related-card">${logoImg}<span>${esc(r.id)}</span></a>`;
  }).join("\n          ");

  return html.replace(
    `<div id="related-island-${project.id}" data-section="${esc(project.fm.section)}">
          <!-- populated client-side or at build time -->
        </div>`,
    `<div id="related-island-${project.id}" class="related-grid">
          ${relatedHtml}
        </div>`
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

const projects = readProjects();
console.log(`Read ${projects.length} projects from _content/`);

// Build project pages
let built = 0;
for (const p of projects) {
  let html = buildProjectPage(p);
  html = injectRelated(html, p, projects);
  writeFileSync(join(OUT, `${p.id}.html`), html);
  console.log(`  ✓ ${p.id}`);
  built++;
}

// Build index
const indexHtml = buildIndex(projects);
writeFileSync(join(ROOT, "index.html"), indexHtml);
console.log(`  ✓ index.html`);

console.log(`\nBuilt ${built} project pages, skipped ${readdirSync(CONTENT).filter(f=>f.endsWith('.md')).length - built}`);
