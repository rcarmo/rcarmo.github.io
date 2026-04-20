/**
 * repo-island.mjs
 * Preact+htm island for live GitHub repo stats on rcarmo.github.io project pages.
 * Renders: hero meta bar, stats grid, release ECharts timeline.
 */
import { h, render } from '/assets/js/preact.module.js';
import { useState, useEffect } from '/assets/js/preact-hooks.module.js';
import htm from '/assets/js/htm.module.js';

const html = htm.bind(h);

// ── Helpers ──────────────────────────────────────────────────────────────────

const LANG_COLOR = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572a5',
  Go: '#00add8', Swift: '#f05138', Rust: '#dea584', C: '#555555',
  'C++': '#f34b7d', Shell: '#89e051', Dockerfile: '#384d54',
};

const SKIP_LANGS = new Set(['Dockerfile','Makefile','HTML','CSS','YAML','JSON','TOML','Shell','Batchfile','PowerShell','Roff','Nix']);
function realLang(lang) { return lang && !SKIP_LANGS.has(lang) ? lang : null; }
function langColor(lang) {
  return LANG_COLOR[lang] ?? '#7a8190';
}

function fmtNum(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

function fmtDate(iso) {
  if (!iso) return '—';
  return iso.slice(0, 7);
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

const Skel = ({ w = '4rem', h: height = '1em' }) =>
  html`<span style="display:inline-block;width:${w};height:${height};
    background:var(--surface2);border-radius:4px;animation:pulse 1.4s ease infinite;"></span>`;

// ── HeroMeta island ───────────────────────────────────────────────────────────

function HeroMeta({ fullName }) {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${fullName}`)
      .then(r => r.json())
      .then(setRepo)
      .catch(() => {});
  }, [fullName]);

  if (!repo) return html`
    <div class="hero-meta">
      <${Skel} w="3rem"/> <${Skel} w="2rem"/> <${Skel} w="5rem"/> <${Skel} w="4rem"/>
    </div>`;

  const color = langColor(realLang(repo.language));
  return html`
    <div class="hero-meta">
      <span class="stars">★ ${fmtNum(repo.stargazers_count)}</span>
      ${repo.forks_count > 0 ? html`<span>⑂ ${repo.forks_count}</span>` : null}
      ${realLang(repo.language) ? html`
        <span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;
            background:${color};vertical-align:middle;margin-right:3px;"></span>
          ${realLang(repo.language)}
        </span>` : null}
    </div>`;
}

// ── StatsBar island ───────────────────────────────────────────────────────────

function StatsBar({ fullName }) {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${fullName}`)
      .then(r => r.json())
      .then(setRepo)
      .catch(() => {});
  }, [fullName]);

  const color = repo ? langColor(repo.language) : null;

  return html`
    <div class="stats">
      <div class="stat">
        <div class="stat-l">Stars</div>
        <div class="stat-v">${repo ? fmtNum(repo.stargazers_count) : html`<${Skel} w="2.5rem"/>`}</div>
      </div>
      <div class="stat">
        <div class="stat-l">Forks</div>
        <div class="stat-v">${repo ? repo.forks_count : html`<${Skel} w="2rem"/>`}</div>
      </div>
      <div class="stat">
        <div class="stat-l">Language</div>
        <div class="stat-v" style="font-size:.9rem;padding-top:.35rem">
          ${repo
            ? html`<span style="display:inline-block;width:9px;height:9px;border-radius:50%;
                background:${color};vertical-align:middle;margin-right:3px;"></span>${repo.language ?? '—'}`
            : html`<${Skel} w="4rem"/>`}
        </div>
      </div>
      <div class="stat">
        <div class="stat-l">Created</div>
        <div class="stat-v" style="font-size:1.05rem;padding-top:.3rem">
          ${repo ? repo.created_at?.slice(0, 4) : html`<${Skel} w="2.5rem"/>`}
        </div>
      </div>
      <div class="stat">
        <div class="stat-l">Open issues</div>
        <div class="stat-v">${repo ? repo.open_issues_count : html`<${Skel} w="1.5rem"/>`}</div>
      </div>
    </div>`;
}

// ── ReleaseTimeline island ────────────────────────────────────────────────────

function ReleaseTimeline({ fullName, chartId }) {
  const [rels, setRels] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${fullName}/releases?per_page=50`)
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) { setRels([]); return; }
        const sorted = data
          .filter(r => r.published_at)
          .sort((a, b) => a.published_at < b.published_at ? -1 : 1)
          .map(r => ({ tag: r.tag_name, name: r.name || r.tag_name, date: r.published_at.slice(0, 10) }));
        setRels(sorted);
      })
      .catch(() => setRels([]));
  }, [fullName]);

  useEffect(() => {
    if (!rels || !rels.length || typeof echarts === 'undefined') return;
    const el = document.getElementById(chartId);
    if (!el) return;
    const dark = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const chart = echarts.init(el, dark ? 'dark' : null);
    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: p => {
          const d = p[0];
          const r = rels[d.dataIndex];
          return `<strong>${r.tag}</strong><br/>${r.name}<br/><span style="color:#888">${r.date}</span>`;
        },
      },
      grid: { left: 10, right: 10, top: 10, bottom: 48, containLabel: true },
      xAxis: {
        type: 'category',
        data: rels.map(r => r.date.slice(0, 7)),
        axisLabel: { color: dark ? '#6878a0' : '#4a5880', fontSize: 10, rotate: 45, interval: 'auto' },
        splitLine: { show: false },
      },
      yAxis: { show: false },
      series: [{
        type: 'bar',
        data: rels.map((_, i) => i + 1),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4f8ef7' },
            { offset: 1, color: 'rgba(79,142,247,0.3)' },
          ]),
        },
        emphasis: { itemStyle: { color: '#6aa3ff' } },
      }],
    });
    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [rels, chartId]);

  if (rels === null) return html`
    <div style="height:220px;display:flex;align-items:center;justify-content:center;color:var(--dim);font-size:.8rem">
      Loading releases…
    </div>`;

  if (!rels.length) return html`
    <div style="padding:1rem 0;color:var(--dim);font-size:.85rem">No releases yet.</div>`;

  return html`
    <div>
      <div id=${chartId} class="release-chart"></div>
      <p class="release-legend">${rels.length} release${rels.length !== 1 ? 's' : ''} · hover for details · newest right</p>
    </div>`;
}

// ── Public mount function ─────────────────────────────────────────────────────

/**
 * mount({ fullName, heroMetaEl, statsEl, releasesEl, chartId })
 */
export function mount({ fullName, heroMetaEl, statsEl, releasesEl, chartId }) {
  if (heroMetaEl) render(html`<${HeroMeta} fullName=${fullName}/>`, heroMetaEl);
  if (statsEl)    render(html`<${StatsBar}  fullName=${fullName}/>`, statsEl);
  if (releasesEl) render(html`<${ReleaseTimeline} fullName=${fullName} chartId=${chartId}/>`, releasesEl);
}

// ── Index-page islands ────────────────────────────────────────────────────

function langDot(lang, size=9) {
  const c = LANG_COLOR[lang] ?? '#94a3b8';
  return html`<span style="display:inline-block;width:${size}px;height:${size}px;
    border-radius:50%;background:${c};vertical-align:middle;margin-right:3px;flex-shrink:0;"></span>`;
}

/**
 * CardStar — renders live ★ count for one card pill.
 * Receives a pre-fetched `repo` object (or null while loading).
 */
function CardStar({ repo, fallback }) {
  if (!repo) return html`<span class="idx-stars">${fallback}</span>`;
  const n = repo.stargazers_count;
  const s = n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n);
  return html`<span class="idx-stars">★ ${s}</span>`;
}

/**
 * CardMeta — full meta row (stars + language dot) for a grid card.
 */
function CardMeta({ repo, fallbackStars, lang }) {
  const dl = realLang(repo ? repo.language : lang);
  return html`
    <div class="idx-meta">
      <${CardStar} repo=${repo} fallback=${fallbackStars}/>
      ${dl ? html`<span>${langDot(dl)}<span>${dl}</span></span>` : null}
    </div>`;
}

/**
 * HighlightMeta — live stars + forks + language + badge for the hl-card header.
 */
function HighlightMeta({ repo, fallbackStars, fallbackForks, lang, status }) {
  if (!repo) return html`
    <div class="hl-meta">
      <span class="hl-stars">${fallbackStars}</span>
      ${fallbackForks > 0 ? html`<span>⑂ ${fallbackForks}</span>` : null}
      ${realLang(lang) ? html`<span>${langDot(realLang(lang))}<span>${realLang(lang)}</span></span>` : null}
      <span class=${'badge badge-'+status}>${status}</span>
    </div>`;
  const sn = repo.stargazers_count;
  const stars = '★ ' + (sn >= 1000 ? (sn/1000).toFixed(1)+'k' : sn);
  const forks = repo.forks_count;
  const language = realLang(repo.language ?? lang);
  return html`
    <div class="hl-meta">
      <span class="hl-stars">${stars}</span>
      ${forks > 0 ? html`<span>⑂ ${forks}</span>` : null}
      ${language ? html`<span>${langDot(language)}<span>${language}</span></span>` : null}
      <span class=${'badge badge-'+status}>${status}</span>
    </div>`;
}

// Single shared cache: fullName → repo object
let _repoCache = null;
let _repoCachePromise = null;

function fetchRepos() {
  if (_repoCache) return Promise.resolve(_repoCache);
  if (!_repoCachePromise) {
    _repoCachePromise = fetch('https://api.github.com/users/rcarmo/repos?per_page=100&type=owner')
      .then(r => r.json())
      .then(repos => {
        if (!Array.isArray(repos)) return {};
        _repoCache = Object.fromEntries(repos.map(r => [r.full_name, r]));
        return _repoCache;
      })
      .catch(() => ({}));
  }
  return _repoCachePromise;
}

/**
 * IndexCardIsland — mounts a CardMeta island into a card's meta div.
 */
function IndexCardIsland({ fullName, fallbackStars, lang }) {
  const [repo, setRepo] = useState(null);
  useEffect(() => {
    fetchRepos().then(cache => { if (cache[fullName]) setRepo(cache[fullName]); });
  }, [fullName]);
  return html`<${CardMeta} repo=${repo} fallbackStars=${fallbackStars} lang=${lang}/>`;
}

/**
 * IndexHighlightIsland — mounts live meta into the highlight card.
 */
function IndexHighlightIsland({ fullName, fallbackStars, fallbackForks, lang, status }) {
  const [repo, setRepo] = useState(null);
  useEffect(() => {
    // highlight card is always rcarmo-owned, straight fetch
    fetch(`https://api.github.com/repos/${fullName}`)
      .then(r => r.json())
      .then(setRepo)
      .catch(() => {});
  }, [fullName]);
  return html`<${HighlightMeta} repo=${repo}
    fallbackStars=${fallbackStars} fallbackForks=${fallbackForks}
    lang=${lang} status=${status}/>`;
}

/**
 * mountIndex({ cards: [{el, fullName, fallbackStars, lang}],
 *              highlight: {el, fullName, fallbackStars, fallbackForks, lang, status} })
 */
export function mountIndex({ cards = [], highlight = null }) {
  for (const { el, fullName, fallbackStars, lang } of cards) {
    if (el) render(html`<${IndexCardIsland}
      fullName=${fullName} fallbackStars=${fallbackStars} lang=${lang}/>`, el);
  }
  if (highlight?.el) {
    render(html`<${IndexHighlightIsland}
      fullName=${highlight.fullName}
      fallbackStars=${highlight.fallbackStars}
      fallbackForks=${highlight.fallbackForks}
      lang=${highlight.lang}
      status=${highlight.status}/>`, highlight.el);
  }
}

// ── HeroStats island ──────────────────────────────────────────────────────

/**
 * HeroStats — fetches all known repos (splitting by owner) and renders
 * total stars, repo count, and top-3 languages dynamically.
 */
function HeroStats({ fullNames }) {
  const [stats, setStats] = useState(null);  // null = loading

  useEffect(() => {
    if (!fullNames || !fullNames.length) return;

    // Split by owner: batch-fetch rcarmo repos; fetch others individually
    const rcarmoOwned = fullNames.filter(n => n.startsWith('rcarmo/'));
    const others      = fullNames.filter(n => !n.startsWith('rcarmo/'));

    const fetches = [
      fetch('https://api.github.com/users/rcarmo/repos?per_page=100&type=owner')
        .then(r => r.json())
        .then(repos => Array.isArray(repos) ? repos : [])
        .catch(() => []),
      ...others.map(fn =>
        fetch(`https://api.github.com/repos/${fn}`)
          .then(r => r.json())
          .then(r => r.stargazers_count != null ? [r] : [])
          .catch(() => [])
      ),
    ];

    Promise.all(fetches).then(results => {
      const allRepos = results.flat();
      // Deduplicate by full_name and keep only repos we actually feature
      const knownSet = new Set(fullNames);
      const featured = allRepos.filter(r => knownSet.has(r.full_name));

      const totalStars = featured.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);

      const langCount = {};
      featured.forEach(r => {
        if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
      });
      const top3 = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([l]) => l);

      setStats({ totalStars, repoCount: featured.length, top3 });
    });
  }, []);

  const Skel = ({ w }) => html`<span style="display:inline-block;width:${w};height:1em;
    background:var(--surface2);border-radius:4px;animation:pulse 1.4s ease infinite;vertical-align:middle;"></span>`;

  const stars = stats
    ? (stats.totalStars >= 1000 ? (stats.totalStars/1000).toFixed(1)+'k' : String(stats.totalStars))
    : null;
  const langs = stats?.top3 ?? [];

  return html`
    <div class="hero-stats-row">
      <div class="hero-stat">
        <span class="hero-stat-v">${stars ?? html`<${Skel} w="3.5rem"/>`}</span>
        <span class="hero-stat-l">Total stars</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-v">${stats ? stats.repoCount : html`<${Skel} w="2rem"/>`}</span>
        <span class="hero-stat-l">Featured repos</span>
      </div>
      <div class="hero-stat" style="align-items:flex-start">
        <span class="hero-stat-l" style="margin-bottom:.3rem">Top languages</span>
        <span style="font-size:.95rem;font-weight:700;color:var(--text);letter-spacing:-.01em">
          ${langs.length ? langs.join(' · ') : html`<${Skel} w="9rem"/>`}
        </span>
      </div>
    </div>`;
}

/**
 * mountHeroStats(el, fullNames) — mount the live hero stats island.
 */
export function mountHeroStats(el, fullNames) {
  if (el) render(html`<${HeroStats} fullNames=${fullNames}/>`, el);
}
