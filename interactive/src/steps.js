// A derivation one line at a time (no canvas). The model gives
//   { "title": "…", "intro": "…", "steps": [{ "math": "…aligned rows…", "why": "one sentence" }, …] }
// "Next step" reveals the next line with its justification; "Show all" reveals everything.
import { card, h, rich } from './core/dom.js';
import { tex } from './core/katex.js';

const parts = (str) => String(str).split(/(\$[^$]+\$)/).filter(Boolean).map((p) => (p.startsWith('$') ? { tex: p.slice(1, -1) } : p));

export default {
  render({ model, el }) {
    const steps = model.get('steps') || [];
    const ui = card(el, { label: model.get('title') || 'Derivation', hint: 'Reveal the derivation one step at a time.', onReset: () => show(0) });
    ui.root.classList.add('qm-no-canvas');
    if (model.get('intro')) ui.controls.append(h('p', { class: 'qm-question' }, rich(parts(model.get('intro')))));
    const list = h('div', { class: 'qm-steps' });
    const rows = steps.map((st, i) => {
      const m = h('div', { class: 'qm-step-math' });
      tex(m, `\\begin{aligned}${st.math}\\end{aligned}`, true);
      const row = h('div', { class: 'qm-step', hidden: true }, m, st.why ? h('div', { class: 'qm-step-why' }, rich(parts(st.why))) : null);
      list.append(row);
      return row;
    });
    ui.controls.append(list);
    const bar = h('div', { class: 'qm-actions' });
    const next = h('button', { class: 'qm-btn qm-action', type: 'button', onclick: () => show(shown + 1) }, '▶ Next step');
    const all = h('button', { class: 'qm-btn', type: 'button', onclick: () => show(steps.length) }, 'Show all');
    const count = h('span', { class: 'qm-hint' });
    bar.append(next, all, count);
    ui.readouts.append(bar);
    let shown = 0;
    function show(n) {
      shown = Math.max(0, Math.min(steps.length, n));
      rows.forEach((r, i) => { r.hidden = i >= shown; r.classList.toggle('qm-current', i === shown - 1); });
      next.disabled = shown >= steps.length;
      count.textContent = `${shown} of ${steps.length} steps`;
    }
    show(0);
    return () => ui.destroy();
  },
};
