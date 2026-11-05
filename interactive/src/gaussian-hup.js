// Figure 3.1 — the Gaussian wavefunction and the Heisenberg uncertainty principle.
// Top panel: psi(x) with its width a marked (the original figure). Bottom panel: the
// momentum wavefunction psi~(p), width hbar/2a. Change a and watch one squeeze as the
// other stretches, while Delta x Delta p stays at hbar/2.
import { card, group, slider, presets, toggle, readout, note, drag } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { num } from './core/format.js';
import { tween, lerp } from './core/motion.js';
import { psi, psiTilde, density, densityP, deltaX, deltaP, integrate } from './core/gaussian.js';

const DEFAULTS = { a: 1, a_min: 0.5, a_max: 2, densities: false };
const X_RANGE = [-6, 6];     // in units of a0
const P_RANGE = [-3, 3];     // in units of hbar/a0
const Y_MAX_X = 0.95;        // psi(x) peaks at 0.89 when a = 0.5
const Y_MAX_P = 1.65;        // |psi~(p)|^2 peaks at 1.6 when a = 2
const PRESETS = [
  { value: 0.5, tex: 'a_0/2', words: 'a equals half a nought' },
  { value: 1, tex: 'a_0', words: 'a equals a nought' },
  { value: 2, tex: '2a_0', words: 'a equals two a nought' },
];

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const aMin = opt('a_min'), aMax = opt('a_max');
    const state = { a: opt('a'), densities: !!opt('densities') };
    let cancelTween = () => {};

    const ui = card(el, {
      label: 'Figure 3.1: the Gaussian wavefunction and its momentum wavefunction',
      hint: [{ tex: 'a' }, ' sets the width: drag the marker on either axis, or use the slider.'],
      onReset: () => { state.densities = false; densToggle.set(false); animateTo(opt('a')); },
    });

    // ── canvas: two panels, psi(x) above, psi~(p) below ─────────────────────────────
    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 36 }, xRange: X_RANGE, yRange: [0, Y_MAX_X] }).axes();
    const bot = new Panel(svg, labels, { box: { x: 8, y: 57, w: 86, h: 36 }, xRange: P_RANGE, yRange: [0, Y_MAX_P] }).axes();

    const bandX = top.area('accent-1');
    const bandP = bot.area('accent-2');
    const densX = top.curve('accent-1', { cls: 'qm-curve qm-density' });
    const densP = bot.curve('accent-2', { cls: 'qm-curve qm-density' });
    const curveX = top.curve('accent-1');
    const curveP = bot.curve('accent-2');
    const markXl = top.vmark('ink'), markXr = top.vmark('ink');
    const markPl = bot.vmark('ink'), markPr = bot.vmark('ink');

    const labPsiX = top.label('\\psi(x)');
    const labX = top.label('x');
    const labMa = top.label('-a'), labPa = top.label('a');
    const labPsiP = bot.label('\\tilde{\\psi}(p)');
    const labP = bot.label('p');
    const labMp = bot.label('-\\hbar/2a'), labPp = bot.label('\\hbar/2a');

    const words = (a) => `a equals ${num(a)} a nought`;
    const handleX = top.handle('accent-1', { label: 'width a of the wavefunction', min: aMin, max: aMax, step: 0.05, fine: 0.01, words, onDrag: (a) => setA(a) });
    const handleP = bot.handle('accent-2', {
      label: 'width hbar over 2a of the momentum wavefunction', min: deltaP(aMax), max: deltaP(aMin), step: 0.02, fine: 0.005,
      words: (p) => `delta p equals ${num(p)} h bar over a nought`,
      onDrag: (p) => setA(1 / (2 * p)),
    });

    // ── controls ──────────────────────────────────────────────────────────────────
    const gWidth = group(ui.controls, 'Width');
    const sl = slider(gWidth, {
      symbol: 'a', name: 'a', min: aMin, max: aMax, step: 0.01, value: state.a,
      fmt: (v) => `${num(v)}\\,a_0`, words: (v) => `${num(v)} a nought`, onInput: (v) => setA(v),
    });
    const pr = presets(gWidth, PRESETS, (i) => animateTo(PRESETS[i].value));
    const gShow = group(ui.controls, 'Show');
    const densToggle = toggle(gShow, {
      label: ['probability densities ', { tex: '\\pd(x) = |\\psi(x)|^2' }, ' and ', { tex: '\\pd(p) = |\\tilde{\\psi}(p)|^2' }, ', with the widths ', { tex: '\\Delta x' }, ', ', { tex: '\\Delta p' }, ' shaded'],
      checked: state.densities, onChange: (c) => { state.densities = c; draw(); },
    });

    // ── readouts ──────────────────────────────────────────────────────────────────
    const rPsi = readout(ui.readouts, { role: 'accent-1' });
    const rPsiT = readout(ui.readouts, { role: 'accent-2' });
    const rA = readout(ui.readouts, { role: 'accent-1' });
    const rHUP = readout(ui.readouts);
    const rDx = readout(ui.readouts, { role: 'accent-1' });
    const rDp = readout(ui.readouts, { role: 'accent-2' });
    const rBandX = readout(ui.readouts, { role: 'accent-1' });
    const rBandP = readout(ui.readouts, { role: 'accent-2' });
    note(ui.readouts, [
      'Whatever the width ', { tex: 'a' }, ', the product ', { tex: '\\Delta x\\,\\Delta p' }, ' stays at ', { tex: '\\hbar/2' },
      ': the Gaussian saturates the Heisenberg uncertainty principle. Lengths are in units of a fixed length ',
      { tex: 'a_0' }, ', momenta in units of ', { tex: '\\hbar/a_0' }, '.',
    ]);

    // ── drawing ───────────────────────────────────────────────────────────────────
    function draw() {
      const a = state.a;
      curveX.update((x) => psi(x, a));
      curveP.update((p) => psiTilde(p, a));
      // SVG elements have no `hidden` property, so toggle display directly
      densX.el.style.display = densP.el.style.display = state.densities ? '' : 'none';
      const dp = deltaP(a);
      bandX.el.style.display = bandP.el.style.display = state.densities ? '' : 'none';
      rBandX.setHidden(!state.densities); rBandP.setHidden(!state.densities);
      if (state.densities) {
        densX.update((x) => density(x, a));
        densP.update((p) => densityP(p, a));
        // the shaded bands: one standard deviation either side of the mean, under the density
        bandX.update((x) => density(x, a), -a, a);
        bandP.update((p) => densityP(p, a), -dp, dp);
        const px = integrate((x) => density(x, a), -a, a, 400);
        const pp = integrate((p) => densityP(p, a), -dp, dp, 400);
        rBandX.set(`\\prob(-\\Delta x \\leq x \\leq \\Delta x) = ${num(px)}`);
        rBandP.set(`\\prob(-\\Delta p \\leq p \\leq \\Delta p) = ${num(pp)}`);
      }
      markXl.update(-a, psi(a, a)); markXr.update(a, psi(a, a));
      markPl.update(-dp, psiTilde(dp, a)); markPr.update(dp, psiTilde(dp, a));
      // labels never overlap (§3): when the two markers are close, spread the labels outwards
      spread(labMa, labPa, top, a, 7);
      spread(labMp, labPp, bot, dp, 11);
      handleX.update(a); handleP.update(dp);

      sl.set(a);
      pr.setActive(PRESETS.findIndex((p) => Math.abs(p.value - a) < 1e-9));
      rPsi.set(`\\psi(x) = \\Big(\\tfrac{1}{a\\sqrt{2\\pi}}\\Big)^{1/2} e^{-x^2/4a^2}`);
      rA.set(`a = ${num(a)}\\,a_0`);
      rPsiT.set(`\\tilde{\\psi}(p) = \\Big(\\tfrac{\\sqrt{2}\\,a}{\\sqrt{\\pi}\\,\\hbar}\\Big)^{1/2} e^{-a^2p^2/\\hbar^2}`);
      rDx.set(`\\Delta x = a = ${num(deltaX(a))}\\,a_0`);
      rDp.set(`\\Delta p = \\hbar/2a = ${num(dp)}\\,\\hbar/a_0`);
      rHUP.set(`\\Delta x\\,\\Delta p = ${num(deltaX(a) * dp)}\\,\\hbar = \\hbar/2`);
    }
    function spread(neg, pos, panel, x, minPct) {
      const close = panel.sx(x) - panel.sx(-x) < minPct;
      neg.update(-x, 0, close ? 'below-left' : 'below', close ? 0.5 : 0.9);
      pos.update(x, 0, close ? 'below-right' : 'below', close ? 0.5 : 0.9);
    }
    function placeFixedLabels() {
      labPsiX.update(0, Y_MAX_X * 0.92, 'left', 0.5);
      labX.update(X_RANGE[1], 0, 'below-left', 0.2);
      labPsiP.update(0, Y_MAX_P * 0.92, 'left', 0.5);
      labP.update(P_RANGE[1], 0, 'below-left', 0.2);
    }
    function setA(a) {
      cancelTween();
      state.a = Math.min(aMax, Math.max(aMin, a));
      draw();
    }
    function animateTo(target) {
      cancelTween();
      const from = state.a;
      cancelTween = tween((u) => { state.a = lerp(from, target, u); draw(); }, () => { cancelTween = () => {}; });
    }

    // dragging the markers along their axes (mouse, pen, touch)
    const stopDragX = drag(handleX.el, { start: () => true, move: (e) => setA(handleX.toX(e)) });
    const stopDragP = drag(handleP.el, { start: () => true, move: (e) => setA(1 / (2 * Math.max(1e-6, handleP.toX(e)))) });

    const ro = new ResizeObserver(() => { handleX.rescale(); handleP.rescale(); });
    ro.observe(ui.canvas);

    placeFixedLabels();
    draw();

    return () => { cancelTween(); stopDragX(); stopDragP(); ro.disconnect(); ui.destroy(); };
  },
};
