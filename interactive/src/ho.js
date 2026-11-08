// Chapter 8 — the harmonic oscillator. The potential V(x) = M omega^2 x^2 / 2 with the energy levels
// E_n = hbar omega (n + 1/2) drawn across it; the chosen eigenfunction u_n(x) (or its density) is
// drawn on its own level. The classically forbidden region |x| > x_t, where V > E_n, is shaded, and
// the probability of finding the particle there is read out: tunnelling.
import { card, group, presets, toggle, readout, note } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set } from './core/svg.js';
import { num } from './core/format.js';
import { tex } from './core/katex.js';
import { u, V, E, turning, forbidden } from './core/ho.js';

const DEFAULTS = { n: 0, density: false };
const N_MAX = 5;
const X_RANGE = [-5, 5];       // in units of ell
const Y_RANGE = [-0.7, 7];     // in units of hbar omega
const SCALE = 1.1;             // height of u_n (or pd) per unit, in energy units
const LEVELS = Array.from({ length: N_MAX + 1 }, (_, i) => ({ value: i, tex: `${i}`, words: `n equals ${i}` }));

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { n: opt('n'), density: !!opt('density') };

    const ui = card(el, {
      label: 'Figure 8.2: energy eigenfunctions of the harmonic oscillator',
      hint: ['Pick a level ', { tex: 'n' }, ' (or click one on the potential). The shaded region is classically forbidden: the particle has less energy than the potential there.'],
      onReset: () => { state.n = opt('n'); state.density = false; densToggle.set(false); draw(); },
    });

    const { svg, labels } = plotCanvas(ui.canvas);
    const P = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 88 }, xRange: X_RANGE, yRange: Y_RANGE });
    // axes: x through E = 0, E upwards at x = 0 (behind everything)
    s('line', { class: 'qm-plot-axis', x1: P.sx(X_RANGE[0]), x2: P.sx(X_RANGE[1]), y1: P.sy(0), y2: P.sy(0) }, P.g);
    s('line', { class: 'qm-plot-axis', x1: P.sx(0), x2: P.sx(0), y1: P.sy(Y_RANGE[0]), y2: P.sy(Y_RANGE[1]) }, P.g);
    const forbL = s('rect', { class: 'qm-area qm-accent-3' }, P.g), forbR = s('rect', { class: 'qm-area qm-accent-3' }, P.g);
    const xMaxV = Math.sqrt(2 * Y_RANGE[1]);   // where V(x) leaves the panel
    const curveV = P.curve('accent-3', { n: 300, xRange: [-xMaxV, xMaxV] });
    curveV.update(V);
    const levels = LEVELS.map(({ value: k }) => {
      const xt = turning(k);
      const g = s('g', { class: 'qm-level qm-accent-3', tabindex: 0, role: 'button', 'aria-label': `select level n = ${k}` }, P.g);
      s('rect', { class: 'qm-hit', x: P.sx(-xt), y: P.sy(E(k)) - 1.6, width: P.sx(xt) - P.sx(-xt), height: 3.2, fill: 'transparent' }, g);
      const line = s('line', { class: 'qm-construct', x1: P.sx(-xt), x2: P.sx(xt), y1: P.sy(E(k)), y2: P.sy(E(k)) }, g);
      const label = P.label(`E_{${k}}`, { small: true });
      label.update(xt, E(k), 'right', 0.35);
      g.addEventListener('click', () => pick(k));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k); } });
      return { g, line, label };
    });
    // the baseline of u_n: a thin ink axis through the chosen level (not accent-1, which is the eigenfunction's colour)
    const base = s('line', { class: 'qm-plot-axis' }, P.g);
    const curveU = P.curve('accent-1', { n: 400 });
    const curvePd = P.curve('accent-1', { n: 400 });    // solid: it is drawn instead of u_n, not over it (§5)
    const tL = P.vmark('ink'), tR = P.vmark('ink');
    const labV = P.label('V(x)');
    const labX = P.label('x');
    const labE = P.label('E');
    const labU = P.label('u_n(x)');
    const labTl = P.label('-x_t', { small: true }), labTr = P.label('x_t', { small: true });

    const gLevel = group(ui.controls, 'Energy level');
    const prN = presets(gLevel, LEVELS, (i) => pick(i));
    const gShow = group(ui.controls, 'Show');
    const densToggle = toggle(gShow, {
      label: ['the probability density ', { tex: '\\pd(x) = |u_n(x)|^2' }, ' instead of ', { tex: 'u_n(x)' }],
      checked: state.density, onChange: (c) => { state.density = c; draw(); },
    });

    const rE = readout(ui.readouts, { role: 'accent-3' });
    const rT = readout(ui.readouts, { role: 'accent-3' });
    const rU = readout(ui.readouts, { role: 'accent-1' });
    const rF = readout(ui.readouts, { role: 'accent-1' });
    const rNodes = readout(ui.readouts, { role: 'accent-1' });
    const rEll = readout(ui.readouts);
    note(ui.readouts, [
      'Classically a particle of energy ', { tex: 'E_n' }, ' can only reach the turning points ', { tex: '\\pm x_t' }, ', where ', { tex: 'V(x_t) = E_n' },
      '. Quantum mechanically the eigenfunction leaks beyond them, and the probability of finding the particle there falls as ', { tex: 'n' }, ' grows. Lengths are in units of ',
      { tex: '\\ell = \\sqrt{\\hbar/M\\omega}' }, ', energies in ', { tex: '\\hbar\\omega' }, '.',
    ]);

    function draw() {
      const { n } = state;
      const xt = turning(n), En = E(n);
      // shaded forbidden region: outside the turning points, between the level and the potential is the
      // physically meaningful band, but a full-height band reads more clearly on a plot with many levels
      set(forbL, { x: P.sx(X_RANGE[0]), y: P.sy(Y_RANGE[1]), width: P.sx(-xt) - P.sx(X_RANGE[0]), height: P.sy(Y_RANGE[0]) - P.sy(Y_RANGE[1]) });
      set(forbR, { x: P.sx(xt), y: P.sy(Y_RANGE[1]), width: P.sx(X_RANGE[1]) - P.sx(xt), height: P.sy(Y_RANGE[0]) - P.sy(Y_RANGE[1]) });
      set(base, { x1: P.sx(X_RANGE[0]), x2: P.sx(X_RANGE[1]), y1: P.sy(En), y2: P.sy(En) });
      curveU.el.style.display = state.density ? 'none' : '';
      curvePd.el.style.display = state.density ? '' : 'none';
      if (state.density) curvePd.update((x) => En + 2 * SCALE * u(n, x) ** 2);   // densities are lower: drawn at twice the scale
      else curveU.update((x) => En + SCALE * u(n, x));
      tL.update(-xt, En); tR.update(xt, En);
      labTl.update(-xt, 0, 'below', 0.4); labTr.update(xt, 0, 'below', 0.4);
      tex(labU.el, state.density ? `|u_{${n}}(x)|^2` : `u_{${n}}(x)`);   // short, so it clears V(x) at the left edge
      labU.update(X_RANGE[0], En + SCALE * 0.75, 'right', 0.3);   // at the left edge, clear of the E_k labels on the right
      // the chosen level stays accent-3 (the potential's colour) but is drawn solid and thicker (§5)
      levels.forEach((l, i) => { const on = i === n; l.g.classList.toggle('qm-on', on); l.g.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      prN.setActive(n);
      rE.set(`E_n = \\hbar\\omega(n + \\tfrac{1}{2}) = ${num(En, 1)}\\,\\hbar\\omega`);
      rT.set(`x_t = \\sqrt{(2n+1)}\\,\\ell = ${num(xt)}\\,\\ell`);
      rU.set(`u_n(x) = N_n h_n(x/\\ell)\\,e^{-x^2/2\\ell^2},\\quad n = ${n}`);
      rF.set(`\\prob(|x| > x_t) = ${num(forbidden(n), 3)}`);
      rNodes.set(`\\text{nodes: } ${n}`);
      rEll.set(`V(x) = \\tfrac{1}{2}M\\omega^2x^2 = \\tfrac{1}{2}\\hbar\\omega\\,(x/\\ell)^2`);
    }
    function placeFixedLabels() {
      labV.update(-xMaxV * 0.82, V(xMaxV * 0.82), 'left', 0.4);
      labX.update(X_RANGE[1], 0, 'below-left', 0.2);
      labE.update(0, Y_RANGE[1], 'left', 0.4);
    }
    function pick(k) { state.n = k; draw(); }

    placeFixedLabels();
    draw();
    return () => ui.destroy();
  },
};
