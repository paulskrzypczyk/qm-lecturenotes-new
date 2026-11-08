// Reading progress (no canvas): a "mark this chapter as read" switch at the end of each chapter,
// remembered in this browser only (localStorage), with a bar showing how many of the chapters
// have been marked. Model: { "chapter": "06", "title": "Free particle" }. The list of chapters
// is fixed here so that every page agrees on the total.
import { card, h } from './core/dom.js';

const CHAPTERS = [
  ['01', 'Position'], ['02', 'Momentum'], ['03', 'Incompatible observables & HUP'], ['04', 'Energy'], ['05', 'Time evolution'],
  ['06', 'Free particle'], ['07', 'Infinite square well'], ['08', 'Harmonic oscillator'], ['09', 'Scattering'], ['10', 'QM in 3D'], ['11', '3D infinite box'],
];
const KEY = 'qm-notes-read';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* private mode: nothing is remembered */ } };

export default {
  render({ model, el }) {
    const ch = String(model.get('chapter') || '');
    const ui = card(el, { label: 'Reading progress', hint: 'Remembered in this browser only.', onReset: () => { const d = load(); delete d[ch]; save(d); draw(); } });
    ui.root.classList.add('qm-no-canvas');
    const box = h('input', { type: 'checkbox', class: 'qm-check', id: 'qm-read-' + ch });
    const lab = h('label', { for: 'qm-read-' + ch, class: 'qm-toggle' }, box, `I have read Chapter ${Number(ch)}${model.get('title') ? ': ' + model.get('title') : ''}`);
    box.addEventListener('change', () => { const d = load(); if (box.checked) d[ch] = Date.now(); else delete d[ch]; save(d); draw(); });
    ui.controls.append(lab);
    const bar = h('div', { class: 'qm-progress' });
    const fill = h('div', { class: 'qm-progress-fill' });
    const text = h('span');
    bar.append(h('div', { class: 'qm-progress-bar' }, fill), text);
    const list = h('div', { class: 'qm-progress-list' });
    ui.readouts.append(bar, list);
    function draw() {
      const d = load();
      box.checked = !!d[ch];
      const n = CHAPTERS.filter(([c]) => d[c]).length;
      fill.style.width = `${(100 * n) / CHAPTERS.length}%`;
      text.textContent = `${n} of ${CHAPTERS.length} chapters read`;
      list.replaceChildren(...CHAPTERS.map(([c, t]) => h('span', { class: d[c] ? 'qm-done' : '' }, `${d[c] ? '✓' : '○'} ${Number(c)} ${t}`)));
    }
    draw();
    const onStorage = (e) => { if (e.key === KEY) draw(); };
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('storage', onStorage); ui.destroy(); };
  },
};
