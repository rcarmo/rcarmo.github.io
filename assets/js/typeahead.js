// Shared typeahead find — works on index (scrapes cards) and project pages (uses embedded data)
export function mountTypeahead(getItems) {
  // inject popup if not already in DOM
  if (!document.getElementById('typeahead-popup')) {
    const div = document.createElement('div');
    div.id = 'typeahead-popup';
    div.className = 'typeahead-popup hidden';
    div.setAttribute('role', 'listbox');
    div.setAttribute('aria-label', 'Search results');
    document.body.appendChild(div);
  }

  const state = { buffer: '', matches: [], idx: -1, active: false };

  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function getPopup() { return document.getElementById('typeahead-popup'); }

  function highlight() {
    const items = getPopup().querySelectorAll('.typeahead-item');
    items.forEach((el, i) => el.classList.toggle('active', i === state.idx));
    if (items[state.idx]) items[state.idx].scrollIntoView({ block: 'nearest' });
  }

  function clear() {
    state.buffer = ''; state.matches = []; state.idx = -1; state.active = false;
    const p = getPopup(); p.classList.add('hidden'); p.innerHTML = '';
  }

  function search() {
    const p = getPopup();
    if (!state.buffer) { clear(); return; }
    const q = state.buffer.toLowerCase();
    state.matches = getItems()
      .filter(m => (m.name + ' ' + m.tagline).toLowerCase().indexOf(q) >= 0)
      .slice(0, 8);
    if (!state.matches.length) { clear(); return; }
    p.innerHTML =
      '<div class="typeahead-header"><span class="typeahead-query">' + esc(state.buffer) + '</span>' +
      '<kbd>↑↓</kbd> navigate · <kbd>⏎</kbd> open · <kbd>esc</kbd> close</div>' +
      state.matches.map((m, i) =>
        '<a class="typeahead-item' + (i===0?' active':'') + '" href="' + esc(m.url) + '">' +
        (m.logo ? '<img class="typeahead-logo" src="' + esc(m.logo) + '" alt="">' : '<span class="typeahead-logo-placeholder"></span>') +
        '<div class="typeahead-text"><div class="typeahead-name">' + esc(m.name) + '</div>' +
        '<div class="typeahead-tagline">' + esc(m.tagline) + '</div></div>' +
        '<span class="typeahead-section">' + esc(m.section) + '</span></a>'
      ).join('');
    p.classList.remove('hidden');
    state.active = true; state.idx = 0;
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'Escape') { clear(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); state.buffer = state.buffer.slice(0,-1); search(); return; }
    if (e.key === 'ArrowDown' && state.active) { e.preventDefault(); state.idx = (state.idx+1) % state.matches.length; highlight(); return; }
    if (e.key === 'ArrowUp'   && state.active) { e.preventDefault(); state.idx = (state.idx-1+state.matches.length) % state.matches.length; highlight(); return; }
    if (e.key === 'Enter' && state.active && state.idx >= 0) { e.preventDefault(); window.location.href = state.matches[state.idx].url; clear(); return; }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { state.buffer += e.key; search(); }
  });
}

// Convenience: build item list from index page card DOM (used on index.html)
export function itemsFromCards() {
  return [...document.querySelectorAll('.card')].map(card => ({
    name:    (card.querySelector('.card-name') || card.querySelector('.card-name-featured'))?.textContent?.trim() || '',
    tagline: (card.querySelector('.card-tagline') || card.querySelector('.card-tagline-featured'))?.textContent?.trim() || '',
    url:     card.getAttribute('href') || '#',
    logo:    card.querySelector('img')?.getAttribute('src') || '',
    section: card.closest('.idx-section')?.querySelector('.idx-section-title')?.textContent?.trim() || '',
  }));
}
