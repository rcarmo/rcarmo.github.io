/**
 * repo-island.mjs — live GitHub data for rcarmo.github.io
 *
 * Single bulk fetch for rcarmo/* repos + individual fetches for cross-org.
 * Results cached in sessionStorage so navigation between pages costs zero API calls.
 * No ECharts dependency — releases render as a simple list.
 *
 * Exports:
 *   mount({ fullName, heroMetaEl, statsEl, releasesEl, relatedEl })
 *   mountIndex(allFullNames)
 *   mountHeroStats(el, allFullNames)
 */
import { h, render } from '/assets/js/preact.module.js';
import { useState, useEffect } from '/assets/js/preact-hooks.module.js';
import htm from '/assets/js/htm.module.js';
const html = htm.bind(h);

// ── Language filter ──────────────────────────────────────────────────────────
const SKIP_LANGS = new Set([
  'Dockerfile','Makefile','HTML','CSS','YAML','JSON','TOML',
  'Shell','Batchfile','PowerShell','Roff','Nix',
]);
function realLang(lang) { return lang && !SKIP_LANGS.has(lang) ? lang : null; }

// ── Language colours ─────────────────────────────────────────────────────────
const LANG_COLOR = {
  Python:'#3572A5', TypeScript:'#3178c6', JavaScript:'#f1e05a', Go:'#00ADD8',
  Rust:'#dea584', Swift:'#F05138', 'C++':'#f34b7d', C:'#555555',
  Java:'#b07219', Ruby:'#701516', Kotlin:'#A97BFF',
};
function langColor(lang) { return LANG_COLOR[lang] || '#7a8190'; }

// ── Formatting helpers ───────────────────────────────────────────────────────
function fmtNum(n) { return n >= 1000 ? (n/1000).toFixed(1) + 'k' : String(n ?? 0); }
function fmtDate(iso) { return iso ? iso.slice(0, 10) : '—'; }

// ── Skeleton placeholder ─────────────────────────────────────────────────────
function Skel({ w }) {
  return html`<span class="skel" style="width:${w}"></span>`;
}

// ── GitHub API with sessionStorage cache ─────────────────────────────────────
const CACHE_KEY = 'gh_repo_cache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data; // Map-like object: { "rcarmo/piku": {...}, ... }
  } catch { return null; }
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* quota exceeded — ok */ }
}

async function fetchAllRepos(fullNames) {
  // Check cache first
  const cached = getCache();
  if (cached) return cached;

  const repoMap = {};

  // Bulk fetch rcarmo/* with pagination (handles >100 repos)
  try {
    let page = 1;
    while (page <= 4) { // max 400 repos
      const res = await fetch(`https://api.github.com/users/rcarmo/repos?per_page=100&type=owner&page=${page}`);
      if (!res.ok) break;
      const repos = await res.json();
      if (!Array.isArray(repos) || !repos.length) break;
      for (const r of repos) repoMap[r.full_name] = r;
      if (repos.length < 100) break; // last page
      page++;
    }
  } catch { /* offline — ok */ }

  // Fetch any repos not yet in map (cross-org + any missed)
  const missing = fullNames.filter(fn => !repoMap[fn]);
  await Promise.allSettled(
    missing.map(async fn => {
      try {
        const res = await fetch(`https://api.github.com/repos/${fn}`);
        if (res.ok) repoMap[fn] = await res.json();
      } catch { /* skip */ }
    })
  );

  setCache(repoMap);
  return repoMap;
}

// ── Components ───────────────────────────────────────────────────────────────

/** Hero meta bar: ★ stars · ⑂ forks · Language */
function HeroMeta({ repo }) {
  if (!repo) return html`<div class="hero-meta"><${Skel} w="12rem"/></div>`;
  const lang = realLang(repo.language);
  const color = langColor(lang);
  return html`
    <div class="hero-meta">
      <span class="metric metric-stars"><svg class="icon-star" viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg> ${fmtNum(repo.stargazers_count)}</span>
      ${repo.forks_count > 0 ? html`<span class="metric metric-forks"><svg class="icon-fork" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg> ${repo.forks_count}</span>` : null}
      ${lang ? html`
        <span class="metric metric-lang">
          <span class="lang-dot" style="background:${color}"></span>
          ${lang}
        </span>` : null}
    </div>`;
}

/** Stats bar: Stars · Forks · Open issues · Created */
function StatsBar({ repo }) {
  return html`
    <div class="stats-bar">
      <div class="stat">
        <div class="stat-label">Stars</div>
        <div class="stat-value">${repo ? fmtNum(repo.stargazers_count) : html`<${Skel} w="2rem"/>`}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Forks</div>
        <div class="stat-value">${repo ? fmtNum(repo.forks_count) : html`<${Skel} w="1.5rem"/>`}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Open issues</div>
        <div class="stat-value">${repo ? repo.open_issues_count : html`<${Skel} w="1.5rem"/>`}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Created</div>
        <div class="stat-value stat-value-sm">${repo ? repo.created_at?.slice(0,4) : html`<${Skel} w="2.5rem"/>`}</div>
      </div>
    </div>`;
}

/** Release list: version, date, one-liner. Max 5. */
function ReleaseList({ fullName }) {
  const [releases, setReleases] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!fullName) return;
    fetch(`https://api.github.com/repos/${fullName}/releases?per_page=5`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setReleases(Array.isArray(data) ? data : []))
      .catch(() => setError(true));
  }, [fullName]);

  if (error) return null; // hide section entirely
  if (!releases) return html`<div class="rel-loading"><${Skel} w="10rem"/></div>`;
  if (!releases.length) return null;

  return html`
    <div class="release-list">
      ${releases.map(r => html`
        <div class="release-item">
          <span class="rel-tag">${r.tag_name}</span>
          <span class="rel-date">${fmtDate(r.published_at)}</span>
          <span class="rel-name">${r.name && r.name !== r.tag_name ? r.name : ''}</span>
        </div>
      `)}
    </div>`;
}

/** Card meta: ★ stars · Language dot (for index page cards) */
function CardMeta({ repo, lang }) {
  const dl = realLang(repo ? repo.language : lang);
  return html`
    <div class="card-meta">
      <span class="metric metric-stars"><svg class="icon-star" viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg> ${repo ? fmtNum(repo.stargazers_count) : "…"}</span>
      ${dl ? html`<span class="metric metric-lang"><span class="lang-dot" style="background:${langColor(dl)}"></span>${dl}</span>` : null}
    </div>`;
}

/** Index page hero stats: total stars, repo count, top languages */
function HeroStats({ allRepos, repoCount }) {
  if (!allRepos) return html`<div class="hero-stats"><${Skel} w="16rem"/></div>`;

  const repos = Object.values(allRepos);
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
  const langCount = {};
  repos.forEach(r => {
    const lang = realLang(r.language);
    if (lang) langCount[lang] = (langCount[lang] ?? 0) + 1;
  });
  const top3 = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([l]) => l);

  return html`
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-value">${totalStars >= 1000 ? (totalStars/1000).toFixed(1)+'k' : totalStars}</span>
        <span class="hero-stat-label">Total stars</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-value">${repoCount ?? repos.length}</span>
        <span class="hero-stat-label">Featured repos</span>
      </div>
      <div class="hero-stat" style="align-items:flex-start">
        <span class="hero-stat-label">Top languages</span>
        <span class="hero-stat-value hero-stat-langs">${top3.join(' · ')}</span>
      </div>
    </div>`;
}

// ── Mount functions ──────────────────────────────────────────────────────────

/**
 * mount() — project page. Fetches repo data and renders islands.
 */
export function mount({ fullName, heroMetaEl, statsEl, releasesEl, relatedEl }) {
  // Collect all fullNames from the page for the bulk fetch
  const allNames = [fullName];

  fetchAllRepos(allNames).then(repoMap => {
    const repo = repoMap[fullName] || null;

    if (heroMetaEl) render(html`<${HeroMeta} repo=${repo}/>`, heroMetaEl);
    if (statsEl) render(html`<${StatsBar} repo=${repo}/>`, statsEl);
  });

  if (releasesEl) render(html`<${ReleaseList} fullName=${fullName}/>`, releasesEl);
}

/**
 * mountIndex() — index page. Bulk fetch + render card metas.
 */
export function mountIndex(allFullNames) {
  fetchAllRepos(allFullNames).then(repoMap => {
    // Render card metas
    for (const fn of allFullNames) {
      const repo = repoMap[fn];
      const id = fn.split('/').pop();
      const el = document.getElementById(`card-meta-${id}`);
      if (el) render(html`<${CardMeta} repo=${repo}/>`, el);
    }
  });
}

/**
 * mountHeroStats() — index page hero stats.
 */
export function mountHeroStats(el, allFullNames) {
  if (!el) return;
  // Show skeleton immediately
  render(html`<${HeroStats} allRepos=${null}/>`, el);

  fetchAllRepos(allFullNames).then(repoMap => {
    // Pass ALL repos for total stars, featured count as separate prop
    render(html`<${HeroStats} allRepos=${repoMap} repoCount=${allFullNames.length}/>`, el);
  });
}
