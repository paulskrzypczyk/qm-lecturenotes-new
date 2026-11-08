// Chapter 1 — probability densities. Top panel: a wavefunction psi(x). Bottom panel: its
// probability density pd(x) = |psi(x)|^2 with the small region x0 <= x <= x0 + dx shaded.
// The reader slides and widens the region and compares the exact probability (the shaded
// area) with the approximation pd(x0) dx (the rectangle); a toggle shows all the outcomes of a
// position measurement with resolution dx (bins of width dx: coarse-graining).
import { card, group, slider, presets, toggle, readout, note, drag, rich, action, h } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { num, clamp } from './core/format.js';
import { tween, lerp } from './core/motion.js';
import { psi, density, probability, bins, sample, X_RANGE } from './core/density.js';

const DEFAULTS = { x0: 3.6, dx: 0.25, outcomes: false };
const DX_MIN = 0.05, DX_MAX = 1.5;
const X0_MIN = X_RANGE[0] + 0.25, X0_MAX = X_RANGE[1] - 0.25;   // the region stays inside the panel
const Y_PSI = [-0.55, 0.95];   // psi ranges from -0.44 to 0.80
const Y_PD = [0, 0.75];        // pd peaks at 0.65
const PRESETS = [
  { value: 0.05, tex: '0.05\\,a_0', words: 'd x equals 0.05 a nought' },
  { value: 0.25, tex: '0.25\\,a_0', words: 'd x equals 0.25 a nought' },
  { value: 1, tex: 'a_0', words: 'd x equals a nought' },
];

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { x0: opt('x0'), dx: opt('dx'), outcomes: !!opt('outcomes'), samples: [] };
    let cancelTween = () => {};

    const ui = card(el, {
      label: 'Figure 1.6: probability densities in quantum mechanics',
      hint: ['Drag the edges of the region ', { tex: 'x_0 \\leq x \\leq x_0 + dx' }, ' along the axis, or use the sliders.'],
      onReset: () => { state.outcomes = false; outToggle.set(false); state.samples = []; animateTo(opt('x0'), opt('dx')); },
    });

    // ── canvas: psi(x) above, pd(x) below ────────────────────────────────────────
    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 36 }, xRange: X_RANGE, yRange: Y_PSI }).axes();
    const bot = new Panel(svg, labels, { box: { x: 8, y: 57, w: 86, h: 36 }, xRange: X_RANGE, yRange: Y_PD }).axes();

    const barsEl = bot.bars('accent-3');
    const histEl = bot.bars('accent-2');   // observed frequencies of the measurements
    histEl.el.classList.add('qm-hist');
    const band = bot.area('accent-1');
    const curvePsi = top.curve('accent-1');
    const curvePd = bot.curve('accent-1');
    const approx = bot.rect('accent-2');
    const markL = bot.vmark('accent-1'), markR = bot.vmark('accent-1');

    const labPsi = top.label('\\psi(x)');
    const labXtop = top.label('x');
    const labPd = bot.label('\\pd(x)');
    const labX = bot.label('x');
    const labX0 = bot.label('x_0'), labX1 = bot.label('x_0 + dx');
    const labArea = bot.label('\\pd(x_0)\\,dx', { small: true });

    const wordsX = (x) => `${num(x)} a nought`;
    const hL = bot.handle('accent-1', { label: 'left edge x nought of the region', min: X0_MIN, max: X0_MAX, step: 0.1, fine: 0.02, words: wordsX, onDrag: (x) => setRegion(x, state.dx) });
    const hR = bot.handle('accent-1', { label: 'right edge x nought plus d x of the region', min: X0_MIN + DX_MIN, max: X0_MAX, step: 0.1, fine: 0.02, words: wordsX, onDrag: (x) => setRegion(state.x0, x - state.x0) });

    // ── controls ──────────────────────────────────────────────────────────────────
    const gRegion = group(ui.controls, 'Region');
    const slX0 = slider(gRegion, {
      symbol: 'x_0', name: 'x nought', min: X0_MIN, max: X0_MAX, step: 0.01, value: state.x0,
      fmt: (v) => `${num(v)}\\,a_0`, words: wordsX, onInput: (v) => setRegion(v, state.dx),
    });
    const slDx = slider(gRegion, {
      symbol: 'dx', name: 'd x', min: DX_MIN, max: DX_MAX, step: 0.01, value: state.dx,
      fmt: (v) => `${num(v)}\\,a_0`, words: wordsX, onInput: (v) => setRegion(state.x0, v),
    });
    const pr = presets(gRegion, PRESETS, (i) => animateTo(state.x0, PRESETS[i].value));
    const gShow = group(ui.controls, 'Show');
    const outToggle = toggle(gShow, {
      label: ['all the outcomes of a position measurement with resolution ', { tex: 'dx' }],
      checked: state.outcomes, onChange: (c) => { state.outcomes = c; draw(); },
    });
    const gMeasure = group(ui.controls, 'Measure');
    const measure = (n) => { if (!state.outcomes) { state.outcomes = true; outToggle.set(true); } for (let i = 0; i < n; i++) state.samples.push(sample()); draw(); };
    action(gMeasure, { label: 'Measure 1 copy', onClick: () => measure(1) });
    action(gMeasure, { label: 'Measure 100 copies', onClick: () => measure(100) });
    gMeasure.querySelector('.qm-actions').append(h('button', { class: 'qm-btn', type: 'button', onclick: () => { state.samples = []; draw(); } }, 'Clear'));

    // ── readouts ──────────────────────────────────────────────────────────────────
    const rPd = readout(ui.readouts, { role: 'accent-1' });
    const rX0 = readout(ui.readouts, { role: 'accent-1' });
    const rExact = readout(ui.readouts, { role: 'accent-1' });
    const rDx = readout(ui.readouts, { role: 'accent-1' });
    const rApprox = readout(ui.readouts, { role: 'accent-2' });
    const rOut = readout(ui.readouts, { role: 'accent-3' });
    const rMeas = readout(ui.readouts, { role: 'accent-2' });
    const rMeas2 = readout(ui.readouts, { role: 'accent-2' });
    const noteEl = note(ui.readouts, []);
    const NOTE_REGION = [
      'The shaded area is the exact probability to find the particle in the region; the rectangle of height ',
      { tex: '\\pd(x_0)' }, ' has area ', { tex: '\\pd(x_0)\\,dx' }, ', which agrees with it as ', { tex: 'dx \\to 0' },
      '. Lengths are in units of a reference length ', { tex: 'a_0' }, ', so ', { tex: '\\pd' }, ' is in units of ', { tex: '1/a_0' }, '.',
    ];
    const NOTE_OUTCOMES = [
      'A measurement with resolution ', { tex: 'dx' }, ' can only tell which region of width ', { tex: 'dx' },
      ' the particle is in. Each bar is ', { tex: '\\pd' }, ' averaged over its region, so its area is the probability of that outcome; the areas add up to 1. ',
      'Measuring many identically prepared copies builds up the observed frequencies (orange), which approach the probabilities.',
    ];

    // ── drawing ───────────────────────────────────────────────────────────────────
    curvePsi.update(psi);
    curvePd.update(density);
    function draw() {
      const { x0, dx } = state;
      const x1 = x0 + dx;
      const pd0 = density(x0);
      const exact = probability(x0, x1);
      band.update(density, x0, x1);
      approx.update(x0, x1, pd0);
      markL.update(x0, density(x0)); markR.update(x1, density(x1));
      hL.update(x0); hR.update(x1);

      barsEl.el.style.display = state.outcomes ? '' : 'none';
      rOut.setHidden(!state.outcomes);
      const N = state.samples.length;
      histEl.el.style.display = state.outcomes && N ? '' : 'none';
      rMeas.setHidden(!N); rMeas2.setHidden(!N);
      if (state.outcomes) {
        const b = bins(x0, dx);
        barsEl.update(b.map(({ a, b: bb, p }) => ({ a: Math.max(a, X_RANGE[0]), b: Math.min(bb, X_RANGE[1]), h: p / dx })));
        rOut.set(`${b.length}\\text{ outcomes, probabilities summing to }${num(b.reduce((s, o) => s + o.p, 0))}`);
        if (N) {
          // observed frequency of each outcome, drawn on the same scale as the density (area = frequency)
          const counts = b.map(({ a, b: bb }) => state.samples.filter((v) => v >= a && v < bb).length);
          // with few copies a single bin holds most of the frequency and its bar (frequency / dx) would
          // leave the panel: bars are capped at the top of the panel until the sample grows
          histEl.update(b.map(({ a, b: bb }, i) => ({ a: Math.max(a, X_RANGE[0]), b: Math.min(bb, X_RANGE[1]), h: Math.min(counts[i] / N / dx, Y_PD[1] * 0.98) })));
          const inRegion = state.samples.filter((v) => v >= x0 && v < x1).length;
          rMeas.set(`\\text{measured } ${N} \\text{ cop${N === 1 ? 'y' : 'ies'}}`);
          rMeas2.set(`\\text{found in the region: } ${inRegion}/${N} = ${num(inRegion / N, 3)}`);
        }
      }

      // labels (§3): x0 and x0 + dx under the axis, spread apart when the edges are close;
      // the area label above everything drawn near the region
      const close = bot.sx(x1) - bot.sx(x0) < 14;
      labX0.update(x0, 0, close ? 'below-left' : 'below', close ? 0.4 : 0.9);
      labX1.update(x1, 0, close ? 'below-right' : 'below', close ? 0.4 : 0.9);
      let topY = pd0;
      for (let i = 0; i <= 30; i++) topY = Math.max(topY, density(x0 - 0.4 + (dx + 0.8) * i / 30));
      if (state.outcomes) topY = Math.max(topY, probability(x0, x1) / dx);
      // hidden when it would sit on the panel's own label (§3)
      labArea.el.hidden = (x0 + x1) / 2 < 1.4 && topY > 0.45;
      labArea.update((x0 + x1) / 2, Math.min(topY, Y_PD[1]), 'above', 0.4);

      slX0.set(x0); slDx.set(dx);
      pr.setActive(PRESETS.findIndex((p) => Math.abs(p.value - dx) < 1e-9));
      rPd.set(`\\pd(x_0) = |\\psi(x_0)|^2 = ${num(pd0)}\\,/a_0`);
      rX0.set(`x_0 = ${num(x0)}\\,a_0`);
      rDx.set(`dx = ${num(dx)}\\,a_0`);
      rApprox.set(`\\pd(x_0)\\,dx = ${num(pd0 * dx, 3)}`);
      rExact.set(`\\prob(x_0 \\leq x \\leq x_0 + dx) = ${num(exact, 3)}`);
      noteEl.replaceChildren(rich(state.outcomes ? NOTE_OUTCOMES : NOTE_REGION));
    }
    function placeFixedLabels() {
      labPsi.update(0, Y_PSI[1] * 0.9, 'left', 0.5);
      labXtop.update(X_RANGE[1], 0, 'below-left', 0.2);
      labPd.update(0, Y_PD[1] * 0.92, 'right', 0.5);
      labX.update(X_RANGE[1], 0, 'below-left', 0.2);
    }
    function setRegion(x0, dx) {
      cancelTween();
      dx = clamp(dx, DX_MIN, DX_MAX);
      x0 = clamp(x0, X0_MIN, X0_MAX - dx);
      state.x0 = x0; state.dx = dx;
      draw();
    }
    function animateTo(x0, dx) {
      cancelTween();
      const from = { ...state };
      // a region that is shrinking or growing keeps its left edge; nothing else moves
      cancelTween = tween((u) => {
        state.dx = clamp(lerp(from.dx, dx, u), DX_MIN, DX_MAX);
        state.x0 = clamp(lerp(from.x0, x0, u), X0_MIN, X0_MAX - state.dx);
        draw();
      }, () => { cancelTween = () => {}; });
    }

    // The two handles overlap when dx is small, so whichever knob is nearer the pointer is the one dragged.
    let which = 'L';
    const pick = (e) => {
      const r = svg.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      which = Math.abs(px - bot.sx(state.x0)) <= Math.abs(px - bot.sx(state.x0 + state.dx)) ? 'L' : 'R';
      return true;
    };
    const moveRegion = (e) => (which === 'L' ? setRegion(hL.toX(e), state.dx) : setRegion(state.x0, hR.toX(e) - state.x0));
    const stopL = drag(hL.el, { start: pick, move: moveRegion });
    const stopR = drag(hR.el, { start: pick, move: moveRegion });
    const ro = new ResizeObserver(() => { hL.rescale(); hR.rescale(); });
    ro.observe(ui.canvas);

    placeFixedLabels();
    draw();
    return () => { cancelTween(); stopL(); stopR(); ro.disconnect(); ui.destroy(); };
  },
};
