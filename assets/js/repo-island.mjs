/**
 * repo-island.mjs — live GitHub data for rcarmo.github.io
 *
 * Vanilla JS only.
 * Single bulk fetch for rcarmo/* repos + individual fetches for cross-org repos.
 * Session cache avoids repeat API traffic while navigating the site.
 */

const SKIP_LANGS = new Set([
  'Dockerfile', 'Makefile', 'HTML', 'CSS', 'YAML', 'JSON', 'TOML',
  'Shell', 'Batchfile', 'PowerShell', 'Roff', 'Nix',
]);

const LANG_COLOR = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a', Go: '#00ADD8',
  Rust: '#dea584', Swift: '#F05138', 'C++': '#f34b7d', C: '#555555',
  Java: '#b07219', Ruby: '#701516', Kotlin: '#A97BFF',
};

const CACHE_KEY = 'gh_repo_cache';
const CACHE_TTL = 30 * 60 * 1000;

function realLang(lang) {
  return lang && !SKIP_LANGS.has(lang) ? lang : null;
}

function langColor(lang) {
  return LANG_COLOR[lang] || '#7a8190';
}

function fmtNum(n) {
  if (n == null) return '—';
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function fmtDate(iso) {
  return iso ? iso.slice(0, 10) : '—';
}

function getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || !parsed?.data) return null;
    if (Date.now() - parsed.ts > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore quota issues
  }
}

async function fetchAllRepos(fullNames) {
  const cached = getCache() || {};
  const repoMap = { ...cached };
  const missingFromCache = fullNames.filter((name) => !repoMap[name]);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  if (!cached['rcarmo/rcarmo.github.io']) {
    try {
      const res = await fetch('https://api.github.com/users/rcarmo/repos?per_page=100&type=owner&sort=stars&direction=desc', {
        signal: controller.signal,
      });
      if (res.ok) {
        const repos = await res.json();
        if (Array.isArray(repos)) {
          for (const repo of repos) repoMap[repo.full_name] = repo;
        }
      }
    } catch {
      // offline or timeout
    }
  }

  const missing = fullNames.filter((name) => !repoMap[name]);
  await Promise.allSettled(missing.map(async (name) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${name}`);
      if (res.ok) repoMap[name] = await res.json();
    } catch {
      // ignore individual failures
    }
  }));

  clearTimeout(timeout);
  if (Object.keys(repoMap).length && (missingFromCache.length || !Object.keys(cached).length)) {
    setCache(repoMap);
  }
  return repoMap;
}

function starIcon(size = 16) {
  return `<svg class="icon-star" viewBox="0 0 16 16" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>`;
}

function forkIcon(size = 14) {
  return `<svg class="icon-fork" viewBox="0 0 16 16" width="${size}" height="${size}" aria-hidden="true"><path fill="currentColor" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>`;
}

function renderCardMeta(el, repo) {
  if (!el) return;
  const lang = realLang(repo?.language);
  el.innerHTML = `
    <span class="metric metric-stars">${starIcon()} ${repo ? fmtNum(repo.stargazers_count) : '…'}</span>
    ${lang ? `<span class="metric metric-lang"><span class="lang-dot" style="background:${langColor(lang)}"></span>${lang}</span>` : ''}
  `;
}

function sortIndexSections(repoMap) {
  const grids = document.querySelectorAll('.idx-section .card-grid');
  for (const grid of grids) {
    if (grid.classList.contains('card-grid-featured')) continue;
    const cards = Array.from(grid.querySelectorAll('.card[data-repo]'));
    cards
      .sort((a, b) => {
        const repoA = repoMap[a.dataset.repo] || null;
        const repoB = repoMap[b.dataset.repo] || null;
        const starsA = repoA?.stargazers_count ?? -1;
        const starsB = repoB?.stargazers_count ?? -1;
        if (starsA !== starsB) return starsB - starsA;
        const nameA = a.querySelector('.card-name')?.textContent?.trim() || '';
        const nameB = b.querySelector('.card-name')?.textContent?.trim() || '';
        return nameA.localeCompare(nameB);
      })
      .forEach((card) => grid.appendChild(card));
  }
}

function renderHeroMeta(el, repo) {
  if (!el) return;
  if (!repo) {
    el.innerHTML = `<span class="metric">GitHub data unavailable</span>`;
    return;
  }

  const lang = realLang(repo.language);
  el.innerHTML = `
    <span class="metric metric-stars">${starIcon(16)} ${fmtNum(repo.stargazers_count)}</span>
    ${repo.forks_count > 0 ? `<span class="metric metric-forks">${forkIcon(14)} ${fmtNum(repo.forks_count)}</span>` : ''}
    ${lang ? `<span class="metric metric-lang"><span class="lang-dot" style="background:${langColor(lang)}"></span>${lang}</span>` : ''}
  `;
}

function renderStatsBar(el, repo) {
  if (!el) return;
  el.innerHTML = `
    <div class="stat">
      <div class="stat-label">Stars</div>
      <div class="stat-value">${repo ? fmtNum(repo.stargazers_count) : '—'}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Forks</div>
      <div class="stat-value">${repo ? fmtNum(repo.forks_count) : '—'}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Open issues</div>
      <div class="stat-value">${repo ? repo.open_issues_count : '—'}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Created</div>
      <div class="stat-value stat-value-sm">${repo ? repo.created_at?.slice(0, 4) : '—'}</div>
    </div>
  `;
}

function renderHeroStats(el, repoMap, repoCount, totalPublicRepos) {
  if (!el) return;
  const repos = Object.values(repoMap || {});

  const totalLabel = totalPublicRepos
    ? ` <span class="hero-stat-total">/ ${fmtNum(totalPublicRepos)}</span>` : '';

  if (!repos.length) {
    el.innerHTML = `
    <div class="hero-stat">
      <span class="hero-stat-value">—</span>
      <span class="hero-stat-label">Total stars</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-value">${repoCount}${totalLabel}</span>
      <span class="hero-stat-label">Featured repos</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-value hero-stat-langs">—</span>
      <span class="hero-stat-label">Top languages</span>
    </div>`;
    return;
  }

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const langCount = {};
  for (const repo of repos) {
    const lang = realLang(repo.language);
    if (lang) langCount[lang] = (langCount[lang] || 0) + 1;
  }
  const top3 = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  el.innerHTML = `
    <div class="hero-stat">
      <span class="hero-stat-value">${fmtNum(totalStars)}</span>
      <span class="hero-stat-label">Total stars</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-value">${repoCount}${totalLabel}</span>
      <span class="hero-stat-label">Featured repos</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-value hero-stat-langs">${top3.join(' · ') || '—'}</span>
      <span class="hero-stat-label">Top languages</span>
    </div>
  `;
}

function renderHeroRelated(el, currentFullName, relatedCandidates, repoMap) {
  if (!el) return;

  const ranked = (relatedCandidates || [])
    .map((candidate) => ({
      ...candidate,
      repo: repoMap[candidate.fullName] || null,
    }))
    .filter((candidate) => candidate.fullName !== currentFullName && candidate.repo)
    .sort((a, b) => {
      const starsA = a.repo?.stargazers_count ?? -1;
      const starsB = b.repo?.stargazers_count ?? -1;
      if (starsA !== starsB) return starsB - starsA;
      return a.id.localeCompare(b.id);
    })
    .slice(0, 5);

  if (!ranked.length) {
    el.innerHTML = '';
    el.hidden = true;
    return;
  }

  el.innerHTML = `
    <div class="related-label">Related</div>
    ${ranked.map((candidate) => {
      const img = candidate.logo ? `<img src="${candidate.logo}" alt="" class="related-logo">` : '<span class="related-logo" aria-hidden="true"></span>';
      return `<a href="/projects/${candidate.id}/" class="related-link">${img}<span>${candidate.id}</span></a>`;
    }).join('')}
  `;
  el.hidden = false;
}

async function renderReleaseList(el, fullName) {
  if (!el || !fullName) return;
  el.innerHTML = `<div class="rel-loading"><span class="skel" style="width:10rem"></span></div>`;
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/releases?per_page=5`);
    if (!res.ok) throw new Error('release fetch failed');
    const releases = await res.json();
    if (!Array.isArray(releases) || !releases.length) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `<div class="release-list">${releases.map((r) => `
      <div class="release-item">
        <span class="rel-tag">${r.tag_name || ''}</span>
        <span class="rel-date">${fmtDate(r.published_at)}</span>
        <span class="rel-name">${r.name && r.name !== r.tag_name ? r.name : ''}</span>
      </div>
    `).join('')}</div>`;
  } catch {
    el.innerHTML = '';
  }
}

export function mount({ fullName, heroMetaEl, statsEl, releasesEl, relatedEl, relatedCandidates = [] }) {
  const fetchNames = [fullName, ...relatedCandidates.map((candidate) => candidate.fullName)];
  fetchAllRepos(fetchNames).then((repoMap) => {
    const repo = repoMap[fullName] || null;
    renderHeroMeta(heroMetaEl, repo);
    renderStatsBar(statsEl, repo);
    renderHeroRelated(relatedEl, fullName, relatedCandidates, repoMap);
  }).catch(() => {
    renderHeroMeta(heroMetaEl, null);
    renderStatsBar(statsEl, null);
    renderHeroRelated(relatedEl, fullName, relatedCandidates, {});
  });

  if (releasesEl) renderReleaseList(releasesEl, fullName);
}

export function mountIndex(allFullNames) {
  fetchAllRepos(allFullNames).then((repoMap) => {
    for (const fullName of allFullNames) {
      const id = fullName.split('/').pop();
      renderCardMeta(document.getElementById(`card-meta-${id}`), repoMap[fullName] || null);
    }
    sortIndexSections(repoMap);
  }).catch(() => {
    for (const fullName of allFullNames) {
      const id = fullName.split('/').pop();
      renderCardMeta(document.getElementById(`card-meta-${id}`), null);
    }
    sortIndexSections({});
  });
}

export function mountHeroStats(el, allFullNames) {
  if (!el) return;
  el.innerHTML = `<span class="metric">Loading stats…</span>`;
  const userFetch = fetch('https://api.github.com/users/rcarmo', { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : null).catch(() => null);
  fetchAllRepos(allFullNames)
    .then(repoMap => userFetch.then(user =>
      renderHeroStats(el, repoMap, allFullNames.length, user?.public_repos ?? null)))
    .catch(() => renderHeroStats(el, {}, allFullNames.length, null));
}
