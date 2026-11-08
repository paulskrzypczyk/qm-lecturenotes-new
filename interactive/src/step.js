// Chapter 9 — scattering off a potential step. Top: the right-moving energy eigenfunction
// |u_E^R(x)| coloured by its phase (the representation of the static figure), with the step and the
// energy E drawn across it. Bottom: the reflection and transmission coefficients R and T against
// E/V0, with the present energy marked. The energy is set by the slider or by dragging the marker.
import { card, group, slider, presets, readout, note, drag } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set, pathD } from './core/svg.js';
import { num } from './core/format.js';
import { tween, lerp } from './core/motion.js';
import { k, kp, lambda, R, T, amplitudes, u } from './core/step.js';
import { hueCurve, wheel } from './core/hue.js';

const DEFAULTS = { e: 1.6 };
const E_RANGE = [0.05, 3];        // E / V0
const X_RANGE = [-8, 6];          // in units of ell0 = hbar / sqrt(2 M V0)
const Y_U = [0, 2.3];             // |u| reaches 2 as E -> V0 from above
const PRESETS = [
  { value: 0.5, tex: 'V_0/2', words: 'E equals half V nought' },
  { value: 1.2, tex: '1.2\\,V_0', words: 'E equals 1.2 V nought' },
  { value: 2, tex: '2V_0', words: 'E equals 2 V nought' },
];

export default {
  render({ model, el }) {
    const opt = (kk) => (model.get(kk) === undefined ? DEFAULTS[kk] : model.get(kk));
    const state = { e: opt('e') };
    let cancelTween = () => {};

    const ui = card(el, {
      label: 'Figure 9.3: right-moving energy eigenfunction of the potential step',
      hint: ['Change the energy ', { tex: 'E' }, ' with the slider, or drag the marker on the ', { tex: 'E/V_0' }, ' axis; below the step (', { tex: 'E < V_0' }, ') everything is reflected.'],
      onReset: () => animateTo(opt('e')),
    });

    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 38 }, xRange: X_RANGE, yRange: Y_U }).axes();
    const bot = new Panel(svg, labels, { box: { x: 8, y: 57, w: 86, h: 36 }, xRange: [0, E_RANGE[1]], yRange: [0, 1.15] }).axes();

    // the step (accent-3) on an energy scale where V0 sits at |u| = 1, and the energy level E
    const stepLine = s('path', { class: 'qm-op-axis qm-accent-3', d: pathD([[top.sx(X_RANGE[0]), top.sy(0)], [top.sx(0), top.sy(0)], [top.sx(0), top.sy(1)], [top.sx(X_RANGE[1]), top.sy(1)]]) }, top.g);
    const eLine = s('line', { class: 'qm-construct qm-accent-3' }, top.g);
    const hu = hueCurve(top, { n: 400 });
    const wh = wheel(svg, labels, { cx: 88, cy: 51, r: 3.8 });   // between the two panels
    const labU = top.label('|u_E^{\\rR}(x)|');
    const labX = top.label('x');
    const labV = top.label('V_0', { small: true });
    const labE = top.label('E', { small: true });
    const lab0 = top.label('0', { small: true });

    const curveR = bot.curve('accent-1', { n: 300 });
    const curveT = bot.curve('accent-2', { n: 300 });
    const markE = bot.vmark('ink');
    const ptR = bot.point('accent-1'), ptT = bot.point('accent-2');
    const labRT = bot.label('R,\\ T');
    const labEx = bot.label('E/V_0');
    const labOne = bot.label('1', { small: true });
    const labR = bot.label('R', { small: true }), labT = bot.label('T', { small: true });
    const handle = bot.handle('ink', { label: 'energy E over V nought', min: E_RANGE[0], max: E_RANGE[1], step: 0.05, fine: 0.01, words: (v) => `E equals ${num(v)} V nought`, onDrag: (v) => setE(v) });

    const gE = group(ui.controls, 'Energy');
    const slE = slider(gE, {
      symbol: 'E', name: 'energy E', min: E_RANGE[0], max: E_RANGE[1], step: 0.01, value: state.e,
      fmt: (v) => `${num(v)}\\,V_0`, words: (v) => `${num(v)} V nought`, onInput: (v) => setE(v),
    });
    const pr = presets(gE, PRESETS, (i) => animateTo(PRESETS[i].value));

    const rE = readout(ui.readouts, { role: 'accent-3' });
    const rR = readout(ui.readouts, { role: 'accent-1' });
    const rK = readout(ui.readouts);
    const rT = readout(ui.readouts, { role: 'accent-2' });
    const rK2 = readout(ui.readouts);
    const rB = readout(ui.readouts);
    note(ui.readouts, [
      'For ', { tex: 'E > V_0' }, ' the wave is partly reflected even though classically it would always pass: ', { tex: 'R \\to 1' }, ' as ', { tex: 'E \\to V_0' }, ' and ', { tex: 'R \\to 0' },
      ' for ', { tex: 'E \\gg V_0' }, '. For ', { tex: 'E < V_0' }, ' the wave decays beyond the step and ', { tex: 'R = 1' }, '. Lengths are in units of ',
      { tex: '\\ell_0 = \\hbar/\\sqrt{2MV_0}' }, ', so ', { tex: 'k = \\sqrt{E/V_0}/\\ell_0' }, '.',
    ]);

    curveR.update(R); curveT.update(T);
    function draw() {
      const { e } = state;
      hu.update((x) => u(x, e));
      set(eLine, { x1: top.sx(X_RANGE[0]), x2: top.sx(X_RANGE[1]), y1: top.sy(e), y2: top.sy(e) });
      eLine.style.display = e <= Y_U[1] ? '' : 'none';
      labE.el.hidden = e > Y_U[1] - 0.15;
      labE.update(X_RANGE[1], e, 'left', 0.3);
      markE.update(e, Math.max(R(e), T(e)));
      ptR.update(e, R(e)); ptT.update(e, T(e));
      handle.update(e);
      slE.set(e);
      pr.setActive(PRESETS.findIndex((p) => Math.abs(p.value - e) < 1e-9));
      const { B, C } = amplitudes(e);
      rE.set(`E/V_0 = ${num(e)}`);
      rR.set(`R = |B|^2 = ${num(R(e), 3)}`);
      rT.set(`T = 1 - R = ${num(T(e), 3)}`);
      rK.set(`k = \\sqrt{2ME}/\\hbar = ${num(k(e))}\\,/\\ell_0`);
      rK2.set(e > 1 ? `k' = \\sqrt{2M(E-V_0)}/\\hbar = ${num(kp(e))}\\,/\\ell_0` : `\\lambda = \\sqrt{2M(V_0-E)}/\\hbar = ${num(lambda(e))}\\,/\\ell_0`);
      rB.set(e > 1 ? `B = \\tfrac{k-k'}{k+k'} = ${num(B.re)},\\quad C = \\tfrac{2k}{k+k'} = ${num(C.re)}` : `|B| = 1,\\quad |C| = ${num(Math.hypot(C.re, C.im))}`);
    }
    function placeFixedLabels() {
      labU.update(X_RANGE[0], Y_U[1] * 0.9, 'right', 0.2);
      labX.update(X_RANGE[1], 0, 'right', 0.25);
      labV.update(X_RANGE[1], 1, 'above-left', 0.15);
      lab0.update(0, 0, 'below', 0.3);
      labRT.update(0, 1.15, 'above', 0.2);
      labEx.update(E_RANGE[1], 0, 'below-left', 0.2);
      labOne.update(1, 0, 'below', 0.4);
      labR.update(E_RANGE[1], R(E_RANGE[1]), 'right', 0.3);
      labT.update(E_RANGE[1], T(E_RANGE[1]), 'right', 0.3);
    }
    function setE(v) { cancelTween(); state.e = Math.min(E_RANGE[1], Math.max(E_RANGE[0], v)); draw(); }
    function animateTo(target) {
      cancelTween();
      const from = state.e;
      cancelTween = tween((uu) => { state.e = lerp(from, target, uu); draw(); }, () => { cancelTween = () => {}; });
    }
    const stopDrag = drag(handle.el, { start: () => true, move: (ev) => setE(handle.toX(ev)) });
    const ro = new ResizeObserver(() => { handle.rescale(); ptR.rescale(); ptT.rescale(); wh.rescale(); });
    ro.observe(ui.canvas);
    placeFixedLabels();
    draw();
    return () => { cancelTween(); stopDrag(); ro.disconnect(); ui.destroy(); };
  },
};
