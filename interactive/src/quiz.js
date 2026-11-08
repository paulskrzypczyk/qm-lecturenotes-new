// Concept checks: a multiple-choice question with instant feedback (no canvas). The model gives
//   { "q": "question (markdown-free text, $maths$ allowed)", "choices": ["…", …], "answer": 1,
//     "why": "the explanation shown after answering", "label": "Chapter 3, check 1" }
// Nothing is stored: a reload resets the question (reading progress is a separate widget).
import { card, h, rich } from './core/dom.js';

/** split "text with $maths$" into rich() parts */
const parts = (str) => String(str).split(/(\$[^$]+\$)/).filter(Boolean).map((p) => (p.startsWith('$') ? { tex: p.slice(1, -1) } : p));

export default {
  render({ model, el }) {
    const q = model.get('q') || '', choices = model.get('choices') || [], answer = model.get('answer') ?? 0, why = model.get('why') || '';
    const ui = card(el, { label: model.get('label') || 'Check your understanding', hint: 'Pick an answer, then read why.', onReset: () => reset() });
    ui.root.classList.add('qm-no-canvas');
    const name = `qm-quiz-${Math.random().toString(36).slice(2, 8)}`;
    ui.controls.append(h('p', { class: 'qm-question' }, rich(parts(q))));
    const list = h('div', { class: 'qm-choices', role: 'radiogroup', 'aria-label': 'answers' });
    const inputs = choices.map((c, i) => {
      const input = h('input', { type: 'radio', name, value: i });
      const lab = h('label', { class: 'qm-choice' }, input, rich(parts(c)));
      input.addEventListener('change', () => answered(i));
      list.append(lab);
      return { input, lab };
    });
    ui.controls.append(list);
    const fb = h('div', { class: 'qm-feedback', hidden: true, 'aria-live': 'polite' });
    ui.readouts.append(fb);
    function answered(i) {
      inputs.forEach(({ input, lab }, j) => { input.disabled = true; lab.classList.toggle('qm-right', j === answer); lab.classList.toggle('qm-wrong', j === i && i !== answer); });
      fb.hidden = false;
      fb.className = 'qm-feedback ' + (i === answer ? 'qm-right' : 'qm-wrong');
      fb.replaceChildren(rich([i === answer ? 'Correct. ' : 'Not quite. ', ...parts(why)]));
    }
    function reset() {
      inputs.forEach(({ input, lab }) => { input.disabled = false; input.checked = false; lab.classList.remove('qm-right', 'qm-wrong'); });
      fb.hidden = true;
    }
    return () => ui.destroy();
  },
};
