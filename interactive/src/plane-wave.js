// Figure 2.1 — three ways of picturing the complex plane wave psi(x) = A e^{2 pi i x/lambda}:
// (a) its real and imaginary parts against x, (b) the helix traced by (x, Re psi, Im psi), and
// (c) the modulus |psi(x)| = A as a line of that height, coloured by the phase. A probe at a position x marks the same value
// of psi in all three views (and its phase on the colour wheel).
import { card, group, slider, presets, toggle, readout, note, drag } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { View3 } from './core/view3.js';
import { s, set, pathD, arrowHead } from './core/svg.js';
import { num, piUnits, piWords, complex, clamp } from './core/format.js';
import { tween, lerp } from './core/motion.js';
import { psi, phase, momentum, hue } from './core/planewave.js';

const DEFAULTS = { lambda: 1.2, A: 1, negative: false, x: 1.5, view: 'oblique' };
const X_RANGE = [0, 6];           // in units of a0
const L_MIN = 0.5, L_MAX = 3;     // wavelength range
const A_MIN = 0.25, A_MAX = 1;
const Y_A = [-1.2, 1.2];
const N_SEG = 240;                // helix and stripe segments
const VIEWS = { oblique: [-30, 25], side: [0, 0], end: [90, 0] };
const VIEW_PRESETS = [
  { key: 'oblique', tex: '\\text{oblique}', words: 'oblique view' },
  { key: 'side', tex: '\\text{side on}', words: 'side on view' },
  { key: 'end', tex: '\\text{end on}', words: 'end on view, looking along the x axis' },
];
const L_PRESETS = [
  { value: 0.6, tex: '0.6\\,a_0', words: 'lambda equals 0.6 a nought' },
  { value: 1.2, tex: '1.2\\,a_0', words: 'lambda equals 1.2 a nought' },
  { value: 2.4, tex: '2.4\\,a_0', words: 'lambda equals 2.4 a nought' },
];

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const v0 = VIEWS[opt('view')] || VIEWS.oblique;
    const state = { lambda: opt('lambda'), A: opt('A'), negative: !!opt('negative'), x: opt('x'), yaw: v0[0], pitch: v0[1] };
    let cancelTween = () => {};
    const signedLambda = () => (state.negative ? -state.lambda : state.lambda);

    const ui = card(el, {
      label: 'Figure 2.1: three ways of visualising a complex plane wave',
      hint: ['Drag the marker along the ', { tex: 'x' }, ' axis to follow ', { tex: '\\psi(x)' }, ' in all three views; drag the helix to turn it.'],
      onReset: () => {
        state.negative = !!DEFAULTS.negative; negToggle.set(state.negative);
        animateTo({ lambda: opt('lambda'), A: opt('A'), x: opt('x'), yaw: v0[0], pitch: v0[1] });
      },
    });

    // ── canvas: (a) Re/Im above, (b) helix in the middle, (c) |psi| coloured by phase + wheel below ──
    const { svg, labels } = plotCanvas(ui.canvas);
    const pa = new Panel(svg, labels, { box: { x: 8, y: 5, w: 66, h: 22 }, xRange: X_RANGE, yRange: Y_A }).axes();
    const pb = new Panel(svg, labels, { box: { x: 8, y: 29, w: 84, h: 38 }, xRange: X_RANGE, yRange: [0, 1] });
    const pc = new Panel(svg, labels, { box: { x: 8, y: 73, w: 66, h: 22 }, xRange: X_RANGE, yRange: Y_A }).axes();
    const view = new View3({ cx: pb.box.x + pb.box.w / 2, cy: pb.box.y + pb.box.h / 2, scale: 11, yaw: state.yaw, pitch: state.pitch });

    // (a)
    const curveRe = pa.curve('accent-1', { n: 360 });
    const curveIm = pa.curve('accent-2', { n: 360 });
    const probeLine = pa.vmark('ink');
    const ptRe = pa.point('accent-1'), ptIm = pa.point('accent-2');
    const labA = pa.label('A', { small: true }), labMA = pa.label('-A', { small: true });
    const labXa = pa.label('x');
    const labPa = pa.label('(a)', { small: true });
    const handle = pa.handle('ink', { label: 'position x of the probe', min: X_RANGE[0], max: X_RANGE[1], step: 0.1, fine: 0.02, words: (x) => `x equals ${num(x)} a nought`, onDrag: (x) => setX(x) });

    // (b): a drag surface, the axes, the helix segments, the probe
    const viewSurface = s('rect', { class: 'qm-view', x: pb.box.x, y: pb.box.y, width: pb.box.w, height: pb.box.h }, pb.g);
    const axisX = s('path', { class: 'qm-axis3' }, pb.g), headX = s('path', { class: 'qm-axis3-head' }, pb.g);
    const axisRe = s('path', { class: 'qm-axis3' }, pb.g), headRe = s('path', { class: 'qm-axis3-head' }, pb.g);
    const axisIm = s('path', { class: 'qm-axis3' }, pb.g), headIm = s('path', { class: 'qm-axis3-head' }, pb.g);
    const segsBack = s('g', {}, pb.g), segsFront = s('g', {}, pb.g);
    const segs = Array.from({ length: N_SEG }, () => s('path', { class: 'qm-hue-seg' }, segsBack));
    const radius = s('path', { class: 'qm-construct qm-ink' }, pb.g);
    const ptHelix = pb.point('ink');
    const labXb = pb.label('x'), labRe = pb.label('\\mathrm{Re}', { small: true }), labIm = pb.label('\\mathrm{Im}', { small: true });
    const labPb = pb.label('(b)', { small: true });

    // (c): |psi(x)| = A as a line coloured by phase, the probe on it, the colour wheel
    const modLine = Array.from({ length: N_SEG }, () => s('path', { class: 'qm-hue-seg qm-hue-line' }, pc.g));
    const probeLineC = pc.vmark('ink');
    const ptMod = pc.point('ink');
    const labAc = pc.label('A', { small: true }), labMAc = pc.label('-A', { small: true });
    const labXc = pc.label('x');
    const labPc = pc.label('(c)', { small: true });
    const WHEEL = { cx: 90, cy: 84, r: 6 };
    const wheel = s('g', {}, svg);
    for (let i = 0; i < 72; i++) {
      const t0 = (i / 72) * 2 * Math.PI, t1 = ((i + 1.15) / 72) * 2 * Math.PI;
      const pts = [];
      for (let j = 0; j <= 3; j++) { const t = t0 + ((t1 - t0) * j) / 3; pts.push([WHEEL.cx + WHEEL.r * Math.cos(t), WHEEL.cy - WHEEL.r * Math.sin(t)]); }
      s('path', { class: 'qm-hue-ring', d: pathD(pts), style: `stroke:${hue((t0 + t1) / 2)}` }, wheel);
    }
    const wheelPanel = new Panel(svg, labels, { box: { x: WHEEL.cx - WHEEL.r, y: WHEEL.cy - WHEEL.r, w: 2 * WHEEL.r, h: 2 * WHEEL.r }, xRange: [-1, 1], yRange: [-1, 1] });
    const ptWheel = wheelPanel.point('ink');
    const wl = [['0', 1, 0, 'right'], ['\\pi/2', 0, 1, 'above'], ['\\pi', -1, 0, 'left'], ['3\\pi/2', 0, -1, 'below']];
    for (const [t, x, y, anchor] of wl) wheelPanel.label(t, { small: true }).update(x, y, anchor, 0.55);

    // ── controls ──────────────────────────────────────────────────────────────────
    const gWave = group(ui.controls, 'Wave');
    const slL = slider(gWave, {
      symbol: '\\lambda', name: 'lambda', min: L_MIN, max: L_MAX, step: 0.01, value: state.lambda,
      fmt: (v) => `${num(v)}\\,a_0`, words: (v) => `${num(v)} a nought`, onInput: (v) => { cancelAll(); state.lambda = v; draw(); },
    });
    const prL = presets(gWave, L_PRESETS, (i) => animateTo({ lambda: L_PRESETS[i].value }));
    const slA = slider(gWave, {
      symbol: 'A', name: 'amplitude A', min: A_MIN, max: A_MAX, step: 0.01, value: state.A,
      fmt: (v) => num(v), words: (v) => num(v), onInput: (v) => { cancelAll(); state.A = v; draw(); },
    });
    const negToggle = toggle(gWave, {
      label: ['negative momentum: ', { tex: '\\psi(x) = A e^{-2\\pi i x/\\lambda}' }],
      checked: state.negative, onChange: (c) => { state.negative = c; draw(); },
    });
    const gView = group(ui.controls, 'Helix view');
    const prV = presets(gView, VIEW_PRESETS, (i) => { const [y, p] = VIEWS[VIEW_PRESETS[i].key]; animateTo({ yaw: y, pitch: p }); });

    // ── readouts ──────────────────────────────────────────────────────────────────
    const rX = readout(ui.readouts);
    const rPhi = readout(ui.readouts);
    const rPsi = readout(ui.readouts);
    const rL = readout(ui.readouts);
    const rRe = readout(ui.readouts, { role: 'accent-1' });
    const rP = readout(ui.readouts);
    const rIm = readout(ui.readouts, { role: 'accent-2' });
    note(ui.readouts, [
      'The phase ', { tex: '\\phi = 2\\pi x/\\lambda' }, ' advances by ', { tex: '2\\pi' }, ' every wavelength: the helix makes one turn, and the colours go once round the wheel. ',
      'Lengths are in units of a reference length ', { tex: 'a_0' }, ', momenta in units of ', { tex: '\\hbar/a_0' }, '.',
    ]);

    // ── drawing ───────────────────────────────────────────────────────────────────
    function draw() {
      const { A, x } = state;
      const lam = signedLambda();
      view.set(state.yaw, state.pitch);
      view.centreOn((X_RANGE[0] + X_RANGE[1]) / 2, 0, 0, pb.box.x + pb.box.w / 2, pb.box.y + pb.box.h / 2);

      // (a)
      curveRe.update((xx) => psi(xx, A, lam).re);
      curveIm.update((xx) => psi(xx, A, lam).im);
      const v = psi(x, A, lam);
      set(probeLine.el, { x1: pa.sx(x), x2: pa.sx(x), y1: pa.sy(A), y2: pa.sy(-A) });
      ptRe.update(x, v.re); ptIm.update(x, v.im);
      handle.update(x);
      const closeA = pa.sy(-A) - pa.sy(A) < 9;
      labA.update(0, A, closeA ? 'above-left' : 'left', 0.4);
      labMA.update(0, -A, closeA ? 'below-left' : 'left', 0.4);

      // (b): axes with arrowheads
      const axis3 = (line, head, X0, Y0, Z0, X1, Y1, Z1) => {
        const a = view.project(X0, Y0, Z0), b = view.project(X1, Y1, Z1);
        const { shaftEnd, head: hd } = arrowHead(a.x, a.y, b.x, b.y, 2.2, 0.9);
        set(line, { d: pathD([[a.x, a.y], shaftEnd]) });
        set(head, { d: hd });
        return b;
      };
      const ex = axis3(axisX, headX, -0.3, 0, 0, X_RANGE[1] + 0.7, 0, 0);
      const er = axis3(axisRe, headRe, 0, 0, 0, 0, 1.45, 0);
      const ei = axis3(axisIm, headIm, 0, 0, 0, 0, 0, 1.45);
      // an axis seen end-on is a point: its label has no clear spot (§3), so it is hidden
      const o = view.project(0, 0, 0), sx0 = view.project(-0.3, 0, 0);
      labXb.el.hidden = Math.hypot(ex.x - sx0.x, ex.y - sx0.y) < 6;
      labRe.el.hidden = Math.hypot(er.x - o.x, er.y - o.y) < 5;
      labIm.el.hidden = Math.hypot(ei.x - o.x, ei.y - o.y) < 5;
      labXb.update(pb.dx(ex.x), pb.dy(ex.y), 'below-right', 0.1);
      labRe.update(pb.dx(er.x), pb.dy(er.y), er.x < ex.x ? 'below-left' : 'below-right', 0.3);
      labIm.update(pb.dx(ei.x), pb.dy(ei.y), 'right', 0.3);
      // the helix, one segment per sample, coloured by phase; behind-the-axis halves are faint
      const pts = [];
      for (let i = 0; i <= N_SEG; i++) {
        const xx = X_RANGE[0] + ((X_RANGE[1] - X_RANGE[0]) * i) / N_SEG;
        const w = psi(xx, A, lam);
        const p = view.project(xx, w.re, w.im);
        const axisDepth = view.project(xx, 0, 0).depth;
        pts.push({ ...p, behind: p.depth < axisDepth });
      }
      for (let i = 0; i < N_SEG; i++) {
        const a = pts[i], b = pts[i + 1];
        const xm = X_RANGE[0] + ((X_RANGE[1] - X_RANGE[0]) * (i + 0.5)) / N_SEG;
        const seg = segs[i];
        set(seg, { d: pathD([[a.x, a.y], [b.x, b.y]]), style: `stroke:${hue(phase(xm, lam))}` });
        const behind = a.behind && b.behind;
        seg.classList.toggle('qm-behind', behind);
        const parent = behind ? segsBack : segsFront;
        if (seg.parentNode !== parent) parent.appendChild(seg);
      }
      const ph = view.project(x, v.re, v.im), pax = view.project(x, 0, 0);
      set(radius, { d: pathD([[pax.x, pax.y], [ph.x, ph.y]]) });
      ptHelix.update(pb.dx(ph.x), pb.dy(ph.y));
      ptHelix.el.style.fill = hue(phase(x, lam));

      // (c): the line |psi(x)| = A, one segment per sample, coloured by the phase there
      const w = (X_RANGE[1] - X_RANGE[0]) / N_SEG;
      for (let i = 0; i < N_SEG; i++) {
        const xa = X_RANGE[0] + w * i;
        set(modLine[i], { d: pathD([[pc.sx(xa), pc.sy(A)], [pc.sx(xa + w) + 0.05, pc.sy(A)]]), style: `stroke:${hue(phase(xa + w / 2, lam))}` });
      }
      probeLineC.update(x, A);
      const phi = phase(x, lam);
      ptMod.update(x, A);
      ptMod.el.style.fill = hue(phi);
      labAc.update(0, A, closeA ? 'above-left' : 'left', 0.4);
      labMAc.update(0, -A, closeA ? 'below-left' : 'left', 0.4);
      ptWheel.update(Math.cos(phi), Math.sin(phi));
      ptWheel.el.style.fill = hue(phi);

      // controls and readouts
      slL.set(state.lambda); slA.set(A);
      prL.setActive(L_PRESETS.findIndex((p) => Math.abs(p.value - state.lambda) < 1e-9));
      prV.setActive(VIEW_PRESETS.findIndex((p) => VIEWS[p.key][0] === state.yaw && VIEWS[p.key][1] === state.pitch));
      rX.set(`x = ${num(x)}\\,a_0`);
      rPhi.set(`\\phi = 2\\pi x/\\lambda = ${piUnits(phi)}`);
      rPsi.set(`\\psi(x) = A e^{i\\phi} = ${complex(v.re, v.im)}`);
      rRe.set(`\\mathrm{Re}\\,\\psi(x) = A\\cos\\phi = ${num(v.re)}`);
      rIm.set(`\\mathrm{Im}\\,\\psi(x) = A\\sin\\phi = ${num(v.im)}`);
      rL.set(`\\lambda = ${num(state.lambda)}\\,a_0,\\quad A = ${num(A)}`);
      rP.set(`p = h/\\lambda = ${num(momentum(lam))}\\,\\hbar/a_0`);
      handle.el.setAttribute('aria-valuetext', `x equals ${num(x)} a nought, phase ${piWords(phi)}`);
    }
    function placeFixedLabels() {
      labXa.update(X_RANGE[1], 0, 'right', 0.3);
      labPa.update(X_RANGE[0], Y_A[1], 'above-left', 0);
      labPb.update(X_RANGE[0], 1, 'below-right', 0.1);
      labXc.update(X_RANGE[1], 0, 'below-left', 0.2);   // the line sits above the axis, so below is clear
      labPc.update(X_RANGE[0], Y_A[1], 'above-left', 0);
    }
    function setX(x) { cancelAll(); state.x = clamp(x, X_RANGE[0], X_RANGE[1]); draw(); }
    let tweenTarget = null;   // where a running animation is heading, so a second preset doesn't cut the first short
    function animateTo(target) {
      cancelTween();
      const from = { ...state }, to = { ...state, ...(tweenTarget || {}), ...target };
      tweenTarget = to;
      cancelTween = tween((u) => {
        for (const k of ['lambda', 'A', 'x', 'yaw', 'pitch']) state[k] = lerp(from[k], to[k], u);
        draw();
      }, () => { cancelTween = () => {}; tweenTarget = null; });
    }
    const cancelAll = () => { cancelTween(); tweenTarget = null; };

    // dragging: the probe along the x axis; the helix view by its surface (mouse, pen, touch)
    const stopProbe = drag(handle.el, { start: () => true, move: (e) => setX(handle.toX(e)) });
    let last = null;
    pb.g.classList.add('qm-view-group');
    const stopView = drag(pb.g, {
      start: (e) => { cancelAll(); last = [e.clientX, e.clientY]; ui.canvas.classList.add('qm-grabbing'); return true; },
      move: (e) => {
        const k = 100 / svg.getBoundingClientRect().width;   // viewBox units per pixel
        state.yaw = ((state.yaw + (e.clientX - last[0]) * k * 1.5 + 180) % 360 + 360) % 360 - 180;
        state.pitch = clamp(state.pitch + (e.clientY - last[1]) * k * 1.5, -89, 89);
        last = [e.clientX, e.clientY];
        draw();
      },
      end: () => ui.canvas.classList.remove('qm-grabbing'),
    });
    const ro = new ResizeObserver(() => { handle.rescale(); for (const p of [ptRe, ptIm, ptHelix, ptMod, ptWheel]) p.rescale(); });
    ro.observe(ui.canvas);

    placeFixedLabels();
    draw();
    return () => { cancelTween(); stopProbe(); stopView(); ro.disconnect(); ui.destroy(); };
  },
};
