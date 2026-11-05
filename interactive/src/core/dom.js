// Shared building blocks for every widget: the card (ground rules §4),
// controls (§7), readouts and accessibility hooks (§8).
// Nothing here sets a colour: elements get `qm-*` classes and the stylesheet
// (widgets/qm-widgets.css) does the rest.
import { tex } from './katex.js';

let _uid = 0;
export const uid = (p = 'qm') => `${p}-${++_uid}`;

/** Tiny element factory: h('div', {class: 'x', onclick: f}, child, 'text', …) */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c !== null && c !== undefined && c !== false) el.append(c);
  return el;
}

/** Mixed text + maths: rich(['Show ', {tex: '\\ket{\\psi^\\perp}'}]) */
export function rich(parts) {
  const span = h('span');
  for (const p of [].concat(parts)) {
    if (typeof p === 'string') span.append(p);
    else { const m = h('span', { class: 'qm-math' }); tex(m, p.tex); span.append(m); }
  }
  return span;
}

const ICON_POINTER = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v10l2.6-2.4 1.7 3.9 1.8-.8-1.7-3.8 3.6-.2z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>';
const ICON_RESET = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 8a4.8 4.8 0 1 0 1.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 2.6v2.6h2.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const KATEX_CSS = 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css';

/**
 * The widget card (§4). `host` is the element anywidget gives us; MyST renders
 * it inside a shadow root, so the card also:
 *   - brings KaTeX's stylesheet into the shadow root (page styles don't reach it);
 *   - mirrors the site's light/dark mode onto `data-theme` (selectors such as
 *     `html.dark` can't be seen from inside a shadow root);
 *   - hides the figure's static placeholder image while the widget is alive (§9).
 * Returns the regions to fill plus `destroy()`.
 */
export function card(host, { label, hint, onReset }) {
  const cleanups = [];

  // KaTeX CSS: reuse the page's own copy when there is one (works offline too).
  const pageKatex = document.querySelector('link[rel="stylesheet"][href*="katex"]');
  const katexLink = h('link', { rel: 'stylesheet', href: pageKatex ? pageKatex.href : KATEX_CSS });

  const resetBtn = h('button', { class: 'qm-btn qm-reset', type: 'button', onclick: () => onReset && onReset() });
  resetBtn.innerHTML = ICON_RESET;
  resetBtn.append('Reset');
  const tag = h('span', { class: 'qm-tag' });
  tag.innerHTML = ICON_POINTER;
  tag.append('Interactive');
  const hintEl = h('span', { class: 'qm-hint' }, typeof hint === 'string' ? hint : rich(hint));

  const canvas = h('div', { class: 'qm-canvas' });
  const controls = h('div', { class: 'qm-controls' });
  const readouts = h('div', { class: 'qm-readouts' });
  const root = h('div', { class: 'qm-widget', role: 'group', 'aria-label': label },
    h('div', { class: 'qm-toolbar' }, tag, hintEl, resetBtn),
    h('div', { class: 'qm-body' }, canvas, controls, readouts),
  );
  host.append(katexLink, root);

  // Light / dark mode, following the site's `html.dark` class.
  const html = document.documentElement;
  const syncTheme = () => root.setAttribute('data-theme', html.classList.contains('dark') ? 'dark' : 'light');
  syncTheme();
  const mo = new MutationObserver(syncTheme);
  mo.observe(html, { attributes: true, attributeFilter: ['class'] });
  cleanups.push(() => mo.disconnect());

  // Hide the static placeholder (the <img> that is a direct child of the <figure>).
  const outer = host.getRootNode() instanceof ShadowRoot ? host.getRootNode().host : host;
  const fig = outer && outer.closest ? outer.closest('figure') : null;
  if (fig) {
    for (const img of fig.querySelectorAll(':scope > img')) {
      const prev = img.style.display;
      img.style.display = 'none';
      cleanups.push(() => { img.style.display = prev; });
    }
  }

  return {
    root, canvas, controls, readouts,
    destroy() { cleanups.forEach((f) => f()); root.remove(); katexLink.remove(); },
  };
}

/** A titled group of controls inside the panel. */
export function group(parent, title) {
  const el = h('div', { class: 'qm-group' });
  if (title) el.append(h('div', { class: 'qm-group-title', text: title }));
  parent.append(el);
  return el;
}

/**
 * Range slider (§7, §8). The label shows "symbol = value" in KaTeX;
 * screen readers get `aria-valuetext` in words.
 */
export function slider(parent, { symbol, name, min, max, step, value, fmt, words, onInput }) {
  const id = uid('slider');
  const lab = h('label', { class: 'qm-slider-label', for: id });
  const input = h('input', { class: 'qm-range', type: 'range', id, min, max, step, value });
  const row = h('div', { class: 'qm-slider' }, lab, input);
  parent.append(row);
  const show = (v) => {
    tex(lab, `${symbol} = ${fmt(v)}`);
    input.setAttribute('aria-valuetext', `${name} ${words(v)}`);
  };
  input.addEventListener('input', () => { const v = Number(input.value); show(v); onInput(v); });
  show(value);
  return {
    el: row, input,
    set(v) { input.value = v; show(v); },
    setDisabled(d) { input.disabled = d; row.classList.toggle('qm-disabled', d); },
    setHidden(x) { row.hidden = x; },
  };
}

/** Row of preset buttons with KaTeX labels (§7). items: [{tex, words}] */
export function presets(parent, items, onPick) {
  const el = h('div', { class: 'qm-presets', role: 'group', 'aria-label': 'Presets' });
  const buttons = items.map((it, i) => {
    const b = h('button', { class: 'qm-btn qm-preset', type: 'button', 'aria-pressed': 'false', 'aria-label': it.words, onclick: () => onPick(i) });
    tex(b, it.tex);
    el.append(b);
    return b;
  });
  parent.append(el);
  return {
    el, buttons,
    setActive(idx) { buttons.forEach((b, i) => b.setAttribute('aria-pressed', i === idx ? 'true' : 'false')); },
  };
}

/** Checkbox toggle with a rich label. */
export function toggle(parent, { label, checked, onChange, role }) {
  const id = uid('toggle');
  const input = h('input', { type: 'checkbox', id, class: 'qm-check' });
  input.checked = !!checked;
  const lab = h('label', { for: id, class: 'qm-toggle' }, input, role ? h('span', { class: `qm-swatch qm-${role}` }) : null, rich(label));
  input.addEventListener('change', () => onChange(input.checked));
  parent.append(lab);
  return {
    el: lab, input,
    set(c) { input.checked = c; },
    setDisabled(d) { input.disabled = d; lab.classList.toggle('qm-disabled', d); },
  };
}

/** One readout line: optional role swatch (§2: colour links readout to object) + KaTeX. */
export function readout(parent, { role } = {}) {
  const body = h('div', { class: 'qm-readout-math' });
  const el = h('div', { class: 'qm-readout' + (role ? ` qm-has-swatch` : '') },
    role ? h('span', { class: `qm-swatch qm-${role}`, 'aria-hidden': 'true' }) : null, body);
  parent.append(el);
  return {
    el,
    set(src) { tex(body, src); },
    setHidden(x) { el.hidden = x; },
  };
}

/**
 * Expected-versus-observed bars for the outcomes of a measurement (full width, in the
 * readouts). Each outcome row: label, a track with a light band for the probability and
 * a solid bar for the observed frequency, and both numbers. Identity is by row label;
 * every row uses the same role colour.
 */
export function statsBars(parent, { outcomes, role = 'accent-3', digits = 3 }) {
  const el = h('div', { class: 'qm-stats', role: 'group', 'aria-label': 'Measurement statistics' });
  const head = h('div', { class: 'qm-stats-head' });
  const title = h('span', { class: 'qm-stats-title' });
  const last = h('span', { class: 'qm-stats-last' });
  head.append(title, last);
  el.append(head);
  const rows = outcomes.map((o) => {
    const lab = h('span', { class: 'qm-stats-label qm-math' });
    tex(lab, o.tex);
    const exp = h('span', { class: 'qm-bar-exp' });
    const obs = h('span', { class: 'qm-bar-obs' });
    const bar = h('span', { class: `qm-bar qm-${role}`, role: 'img' }, exp, obs);
    const pText = h('span', { class: 'qm-stats-num' });
    const fText = h('span', { class: 'qm-stats-num' });
    el.append(lab, bar, pText, fText);
    return { o, bar, exp, obs, pText, fText };
  });
  const legend = h('div', { class: 'qm-stats-legend' },
    h('span', { class: `qm-key-exp qm-${role}` }), 'probability', h('span', { class: `qm-key-obs qm-${role}` }), 'observed frequency');
  el.append(legend);
  parent.append(el);
  const pct = (x) => `${(100 * x).toFixed(2)}%`;
  const int = (n) => n.toLocaleString('en-GB');            // 1,000
  const dec = (x) => x.toFixed(digits);                    // §3: 3 places, so 1000 copies can be told apart
  return {
    el,
    /** probs: [p1, p2, …]; counts: [n1, n2, …] (all zero = nothing measured yet). */
    set(probs, counts) {
      const N = counts.reduce((a, b) => a + b, 0);
      title.textContent = N ? `Measured ${int(N)} cop${N === 1 ? 'y' : 'ies'}` : 'No copies measured yet';
      rows.forEach((r, i) => {
        const f = N ? counts[i] / N : 0;
        r.exp.style.width = pct(probs[i]);
        r.obs.style.width = pct(f);
        r.obs.hidden = !N;
        r.pText.textContent = dec(probs[i]);
        r.fText.textContent = N ? `${dec(f)} (${int(counts[i])})` : '–';
        r.bar.setAttribute('aria-label', `outcome ${r.o.words}: probability ${dec(probs[i])}`
          + (N ? `, observed ${counts[i]} of ${N}` : ''));
      });
    },
    /** A short note on the right of the heading, e.g. the last single outcome. */
    setLast(parts) { last.replaceChildren(parts ? rich(parts) : ''); },
  };
}

/** A full-width explanatory line under the readouts (text in the page font, maths in KaTeX). */
export function note(parent, parts) {
  const el = h('div', { class: 'qm-note' }, rich(parts));
  parent.append(el);
  return el;
}

/**
 * Pointer drag helper (§7: Pointer Events for mouse, pen and touch).
 * Calls start(e) → truthy to accept; move(e); end(e).
 */
export function drag(el, { start, move, end }) {
  let active = null;
  const down = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (start(e) === false) return;
    active = e.pointerId;
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const mv = (e) => { if (e.pointerId === active) move(e); };
  const up = (e) => {
    if (e.pointerId !== active) return;
    active = null;
    try { el.releasePointerCapture(e.pointerId); } catch (_) { /* already released */ }
    end && end(e);
  };
  el.addEventListener('pointerdown', down);
  el.addEventListener('pointermove', mv);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  return () => {
    el.removeEventListener('pointerdown', down);
    el.removeEventListener('pointermove', mv);
    el.removeEventListener('pointerup', up);
    el.removeEventListener('pointercancel', up);
  };
}
