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

  const color = langColor(repo.language);
  const pushed = fmtDate(repo.pushed_at);

  return html`
    <div class="hero-meta">
      <span class="stars">★ ${fmtNum(repo.stargazers_count)}</span>
      ${repo.forks_count > 0 ? html`<span>⑂ ${repo.forks_count}</span>` : null}
      ${repo.language ? html`
        <span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;
            background:${color};vertical-align:middle;margin-right:3px;"></span>
          ${repo.language}
        </span>` : null}
      <span style="color:var(--dim);font-size:.75rem">pushed ${pushed}</span>
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
        <div class="stat-l">Last push</div>
        <div class="stat-v" style="font-size:.85rem;padding-top:.35rem">
          ${repo ? fmtDate(repo.pushed_at) : html`<${Skel} w="3.5rem"/>`}
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
