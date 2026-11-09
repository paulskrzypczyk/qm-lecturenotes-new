// Figure 9.5 — a Gaussian wavepacket scattering off the potential step (replacing the animated GIF).
// Top: |psi(x, t)| coloured by its phase, with the step and the packet's mean energy drawn across it,
// and the colour wheel. Bottom: the density pd(x, t) with the step. The packet is the superposition of
// right-moving energy eigenstates of the notes (src/core/scatter.js), so it partly reflects and partly
// transmits, with interference fringes while the incoming and reflected parts overlap; the probability
// on each side of the step is read out and, long after the collision, settles to R and T averaged over
// the packet's energies.
import { card, group, slider, presets, toggle, readout, note, action } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set, pathD } from './core/svg.js';
import { num, clamp } from './core/format.js';
import { tween, lerp, reducedMotion } from './core/motion.js';
import { R, T } from './core/step.js';
import { makePacket, tabulate, tabulateParts, evolve, probability, meanX, grid } from './core/scatter.js';
import { hueCurve, wheel } from './core/hue.js';

const DEFAULTS = { t: 0, e0: 1.5, a: 4, means: false };
const X0_PER_A = -4;               // the packet starts at x0 = -4a, clear of the step, in ell0 = hbar / sqrt(2 M V0)
const X_RANGE = [-44, 16];         // room for a packet of width up to 6 ell0 starting at -24 ell0
const T_MAX = 80;                  // tau0 = hbar / V0 (the slowest packet, E0 = 0.1 V0 from x0 = -24, is back where it started by then)
const E_RANGE = [0.12, 3], A_RANGE = [2.5, 6];  // the packet is the advertised Gaussian of width a only when Delta p <= p0/4, i.e.
                                   // a >= aMin(e0) = 2/k0 (5.8 at E0 = 0.12 V0): the a slider's lower limit follows E0
const aMin = (e0) => Math.min(A_RANGE[1], Math.max(A_RANGE[0], 2 / Math.sqrt(e0)));
const Y_MOD = [0, 0.75];           // |psi| peaks at 0.45 for a = 2.5 (the standing wave at the step reaches twice that: clipped)
const Y_PD = [0, 0.5];             // pd peaks at 0.2 for a = 2.5 (up to 0.8 in the standing wave: clipped)
const V_STEP = 0.3 * Y_MOD[1];     // the height the step is drawn at in the top panel (V0 on its energy scale)
const N_SEG = 300;                 // segments of the phase-coloured curve; psi is computed at their ends and midpoints
const N_WIDE = 2401;               // points of the wide grid the probabilities are integrated on (odd: x = 0 is a point; 0.3 ell0 apart)
const X_WIDE = [-360, 360];        // wide enough for everything that leaves the panel before T_MAX (E0 = 3 V0: 3.5 ell0 per tau0)
const N_K = 384;                   // energies in the superposition (the k grid's periodic images, 2 pi / dk, stay beyond X_WIDE)
const RATE = 4;                    // tau0 per second when playing (20 s for the full run; play stops earlier when the packets have left)
const P_GONE = 0.02;               // play stops once less than this much probability is left in the panel
const P_MARK = 0.02;               // a part's <x> marker is shown only while that part carries at least this much probability
const T_PRESETS = [0, 20, 40, 80].map((v) => ({ value: v, tex: v === 0 ? '0' : `${v}\\tau_0`, words: `t equals ${v} tau nought` }));
const E_PRESETS = [
  { value: 0.25, tex: 'V_0/4', words: 'E nought equals a quarter of V nought' },
  { value: 0.5, tex: 'V_0/2', words: 'E nought equals half V nought' },
  { value: 1.2, tex: '1.2\\,V_0', words: 'E nought equals 1.2 V nought' },
  { value: 2, tex: '2V_0', words: 'E nought equals 2 V nought' },
];

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { t: opt('t'), e0: opt('e0'), a: opt('a'), means: !!opt('means') };
    let cancelTween = () => {}, raf = 0, playing = false;

    const ui = card(el, {
      label: 'Figure 9.5: scattering of a Gaussian wavepacket by a potential step',
      hint: ['Press play or drag ', { tex: 't' }, '; ', { tex: 'E_0' }, ' and ', { tex: 'a' }, ' set the packet\u2019s mean energy and width. Even with ', { tex: 'E_0 > V_0' }, ' part of it is reflected; a wide packet with ', { tex: 'E_0 < V_0' }, ' is reflected entirely.'],
      onReset: () => { stop(); state.means = !!DEFAULTS.means; meansToggle.set(state.means); animateTo({ t: opt('t'), e0: opt('e0'), a: opt('a') }); },
    });

    // ── canvas ─────────────────────────────────────────────────────────────────────
    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 34 }, xRange: X_RANGE, yRange: Y_MOD }).axes();
    const bot = new Panel(svg, labels, { box: { x: 8, y: 61, w: 86, h: 32 }, xRange: X_RANGE, yRange: Y_PD }).axes();

    // the step (accent-3) in both panels, and the mean energy E0 on the top panel's energy scale
    const stepPath = (P, hgt) => pathD([[P.sx(X_RANGE[0]), P.sy(0)], [P.sx(0), P.sy(0)], [P.sx(0), P.sy(hgt)], [P.sx(X_RANGE[1]), P.sy(hgt)]]);
    s('path', { class: 'qm-op-axis qm-accent-3', d: stepPath(top, V_STEP) }, top.g);
    s('path', { class: 'qm-op-axis qm-accent-3', d: stepPath(bot, 0.3 * Y_PD[1]) }, bot.g);
    const eLine = s('line', { class: 'qm-construct qm-accent-3' }, top.g);
    const hu = hueCurve(top, { n: N_SEG });
    const curvePd = bot.curve('accent-1', { n: N_SEG });
    const wh = wheel(svg, labels, { cx: 51, cy: 50.5, r: 3 });   // between the two panels, mid-way across (the right end is where the x labels are)
    const labMod = top.label('|\\psi(x,t)|');
    const labXt = top.label('x');
    const labV = top.label('V_0', { small: true });
    const labE = top.label('E_0', { small: true });
    const labPd = bot.label('\\pd(x,t)');
    const labX = bot.label('x');
    const labL = bot.label('\\prob(x<0)', { small: true, role: 'accent-1' });
    const labR = bot.label('\\prob(x>0)', { small: true, role: 'accent-2' });
    // <x> of the incident, reflected and transmitted parts (shown by the toggle), as in Figure 7.4
    const markIn = bot.vmark('ink'), markRef = bot.vmark('ink'), markTr = bot.vmark('ink');
    const labIn = bot.label('\\mathrm{in}', { small: true }), labRef = bot.label('\\mathrm{R}', { small: true }), labTr = bot.label('\\mathrm{T}', { small: true });   // the readout gives the values

    // ── the maths: psi on the drawing grid (segment ends and midpoints) and on a wide grid for the probabilities
    const xsDraw = grid(X_RANGE[0], X_RANGE[1], 2 * N_SEG + 1);
    const xsWide = grid(X_WIDE[0], X_WIDE[1], N_WIDE);
    const outDraw = { re: new Float64Array(xsDraw.length), im: new Float64Array(xsDraw.length) };
    const outWide = { re: new Float64Array(N_WIDE), im: new Float64Array(N_WIDE) };
    const hDraw = (X_RANGE[1] - X_RANGE[0]) / (2 * N_SEG);
    let packet = null, tabDraw = null, tabWide = null, parts = null, built = { e0: NaN, a: NaN };
    const outIn = { re: new Float64Array(N_WIDE), im: new Float64Array(N_WIDE) }, outRef = { re: new Float64Array(N_WIDE), im: new Float64Array(N_WIDE) };
    function rebuild() {
      if (built.e0 === state.e0 && built.a === state.a) return;
      packet = makePacket({ e0: state.e0, a: state.a, x0: X0_PER_A * state.a, nk: N_K });
      tabDraw = tabulate(packet, xsDraw);
      tabWide = tabulate(packet, xsWide);
      parts = null;                                      // the incident/reflected tables are built when first needed
      built = { e0: state.e0, a: state.a };
    }
    const at = (x) => { const i = clamp(Math.round((x - X_RANGE[0]) / hDraw), 0, xsDraw.length - 1); return { re: outDraw.re[i], im: outDraw.im[i] }; };
    const TAU = 2 * Math.PI;

    // ── controls ───────────────────────────────────────────────────────────────────
    const gTime = group(ui.controls, 'Time');
    const play = action(gTime, { label: 'Play', pauseLabel: 'Pause', onClick: () => (playing ? stop() : start()) });
    const slT = slider(gTime, {
      symbol: 't', name: 'time t', min: 0, max: T_MAX, step: 0.02, value: state.t,
      fmt: (v) => `${num(v)}\\,\\tau_0`, words: (v) => `${num(v)} tau nought`, onInput: (v) => { stop(); cancelTween(); state.t = v; draw(); },
    });
    const prT = presets(gTime, T_PRESETS, (i) => { stop(); animateTo({ t: T_PRESETS[i].value }); });
    const gPk = group(ui.controls, 'Wavepacket');
    const slE = slider(gPk, {
      symbol: 'E_0', name: 'mean energy E nought', min: E_RANGE[0], max: E_RANGE[1], step: 0.01, value: state.e0,
      fmt: (v) => `${num(v)}\\,V_0`, words: (v) => `${num(v)} V nought`, onInput: (v) => { cancelTween(); state.e0 = v; state.a = Math.max(state.a, aMin(v)); draw(); },
    });
    const prE = presets(gPk, E_PRESETS, (i) => animateTo({ e0: E_PRESETS[i].value, a: Math.max(state.a, aMin(E_PRESETS[i].value)) }));
    const slA = slider(gPk, {
      symbol: 'a', name: 'width a (its lower limit follows E nought)', min: aMin(state.e0), max: A_RANGE[1], step: 0.01, value: state.a,
      fmt: (v) => `${num(v)}\\,\\ell_0`, words: (v) => `${num(v)} ell nought`, onInput: (v) => { cancelTween(); state.a = v; draw(); },
    });
    const gShow = group(ui.controls, 'Show');
    const meansToggle = toggle(gShow, {
      label: ['the mean position ', { tex: '\\av{x}' }, ' of the incident, reflected and transmitted parts'],
      checked: state.means, onChange: (c) => { state.means = c; draw(); },
    });

    // ── readouts ───────────────────────────────────────────────────────────────────
    const rT = readout(ui.readouts);
    const rRT = readout(ui.readouts, { role: 'accent-3' });
    const rPL = readout(ui.readouts, { role: 'accent-1' });
    const rRbar = readout(ui.readouts, { role: 'accent-3' });
    const rPR = readout(ui.readouts, { role: 'accent-2' });
    const rK = readout(ui.readouts);
    const rDE = readout(ui.readouts);
    const rMIn = readout(ui.readouts), rMR = readout(ui.readouts), rMT = readout(ui.readouts);   // shown with the <x> toggle
    note(ui.readouts, [
      'The packet is the superposition ', { tex: '\\int \\phi(E)\\,u_E^{\\rR}(x)\\,e^{-iEt/\\hbar}\\,dE' }, ' of right-moving eigenstates, a Gaussian of width ',
      { tex: 'a' }, ' starting at ', { tex: 'x = -4a' }, '. It carries a spread of energies ', { tex: '\\Delta E' }, ', so long after the collision the probability on the left settles to ',
      { tex: '\\bar R' }, ', the reflection coefficient averaged over that spread: close to ', { tex: 'R(E_0)' }, ' when ', { tex: '\\Delta E' }, ' is small compared with ', { tex: '|E_0 - V_0|' },
      ' (a wide packet, or ', { tex: 'E_0' }, ' well away from ', { tex: 'V_0' }, '). The width cannot be made smaller than ', { tex: '2\\ell_0^2/k_0' }, ', so that ', { tex: '\\Delta p \\le p_0/4' }, ': a narrower packet would contain momenta pointing away from the step, and could not be built from right-moving eigenstates. The fringes are the incoming and reflected parts interfering, and the packet spreads as it travels, as in Chapter 6. Lengths are in units of ',
      { tex: '\\ell_0 = \\hbar/\\sqrt{2MV_0}' }, ' and time in ', { tex: '\\tau_0 = \\hbar/V_0' }, '.',
    ]);

    // ── drawing ────────────────────────────────────────────────────────────────────
    function draw() {
      state.a = Math.max(state.a, aMin(state.e0));          // the packet must stay a Gaussian (Delta p <= p0/4)
      slA.setRange(aMin(state.e0));
      rebuild();
      const { t, e0, a } = state;
      evolve(packet, tabDraw, t, outDraw);
      evolve(packet, tabWide, t, outWide);
      hu.update((x) => {
        const { re, im } = at(x);
        return { mod: Math.min(Math.hypot(re, im), Y_MOD[1]), phase: ((Math.atan2(im, re) % TAU) + TAU) % TAU };
      });
      curvePd.update((x) => { const { re, im } = at(x); return Math.min(re * re + im * im, Y_PD[1]); });
      const eh = (e0 / 1) * V_STEP;                       // E0 on the step's energy scale
      set(eLine, { x1: top.sx(X_RANGE[0]), x2: top.sx(X_RANGE[1]), y1: top.sy(eh), y2: top.sy(eh) });
      const showE = eh <= Y_MOD[1] * 0.82;                 // hidden once it would run through the |psi| label
      eLine.style.display = showE ? '' : 'none';
      labE.el.hidden = !showE;
      labE.update(X_RANGE[0], eh, 'above-right', 0.15);
      const pL = probability(xsWide, outWide, X_WIDE[0], 0), pR = probability(xsWide, outWide, 0, X_WIDE[1]);
      // <x> of the three parts: the incident and reflected waves are the e^{ikx} and B e^{-ikx} components
      // of the superposition for x < 0; the transmitted part is everything at x > 0
      const marks = [[markIn, labIn, 'in'], [markRef, labRef, 'R'], [markTr, labTr, 'T']];
      const hideMarks = () => marks.forEach(([mark, lab]) => { mark.el.style.display = 'none'; lab.el.hidden = true; });
      if (state.means) {
        if (!parts) parts = tabulateParts(packet, xsWide);
        evolve(packet, parts.inc, t, outIn); evolve(packet, parts.ref, t, outRef);
        const ms = [meanX(xsWide, outIn, X_WIDE[0], 0), meanX(xsWide, outRef, X_WIDE[0], 0), meanX(xsWide, outWide, 0, X_WIDE[1])];
        hideMarks();
        // visible markers, left to right; a label within 3.5 ell0 of the previous one drops to a second row
        const vis = marks.map((mk, i) => ({ mk, m: ms[i] })).filter(({ m }) => m.p >= P_MARK && m.mean >= X_RANGE[0] && m.mean <= X_RANGE[1]).sort((u, v) => u.m.mean - v.m.mean);
        let prevX = -Infinity, prevRow = 0;
        for (const { mk: [mark, lab], m } of vis) {
          const { re, im } = at(m.mean);
          mark.el.style.display = '';
          mark.update(m.mean, Math.min(re * re + im * im, Y_PD[1]));
          const row = m.mean - prevX < 3.5 && prevRow === 0 ? 1 : 0;
          lab.el.hidden = m.mean > X_RANGE[1] - 2.5;          // would sit on the x label
          lab.update(m.mean, 0, 'below', row ? 2.1 : 0.9);
          prevX = m.mean; prevRow = row;
        }
        // the part's probability is shown beside its mean, so that a marker lingering on a slow tail explains itself
        const part = (name, m) => (m.p >= P_MARK ? `\\av{x}_{\\mathrm{${name}}} = ${num(m.mean, 1)}\\,\\ell_0\\;(${Math.round(m.p * 100)}\\%)` : `\\av{x}_{\\mathrm{${name}}}\\text{: —}`);
        rMIn.set(part('in', ms[0])); rMR.set(part('R', ms[1])); rMT.set(part('T', ms[2]));
      } else hideMarks();
      rMIn.setHidden(!state.means); rMR.setHidden(!state.means); rMT.setHidden(!state.means);

      slT.set(t); slE.set(e0); slA.set(a);
      prT.setActive(T_PRESETS.findIndex((p) => Math.abs(p.value - t) < 1e-9));
      prE.setActive(E_PRESETS.findIndex((p) => Math.abs(p.value - e0) < 1e-9));
      rT.set(`t = ${num(t)}\\,\\tau_0`);
      rK.set(`k_0 = \\sqrt{2ME_0}/\\hbar = ${num(packet.k0)}\\,/\\ell_0`);
      rDE.set(`\\Delta E \\approx p_0\\,\\Delta p/M = ${num(packet.k0 / a)}\\,V_0`);
      rRT.set(`R(E_0) = ${num(R(e0), 3)},\\quad T(E_0) = ${num(T(e0), 3)}`);
      rRbar.set(`\\bar R = \\int |\\phi|^2 R\\,dE = ${num(packet.rbar, 3)}`);
      rPL.set(`\\prob(x < 0) = ${num(pL, 3)}`);
      rPR.set(`\\prob(x > 0) = ${num(pR, 3)}`);
    }
    function placeFixedLabels() {
      labMod.update(X_RANGE[0], Y_MOD[1] * 0.9, 'right', 0.2);
      labXt.update(X_RANGE[1], 0, 'right', 0.25);   // beside the axis, clear of the wheel below it
      labV.update(X_RANGE[1], V_STEP, 'above-left', 0.15);
      labPd.update(X_RANGE[0], Y_PD[1] * 0.9, 'right', 0.2);
      labX.update(X_RANGE[1], 0, 'below-left', 0.2);
      labL.update(X_RANGE[0] / 2, Y_PD[1] * 0.72, 'above', 0.2);
      labR.update(X_RANGE[1] / 2, Y_PD[1] * 0.72, 'above', 0.2);
    }
    let tweenTarget = null;
    function animateTo(target) {
      cancelTween();
      const from = { ...state }, to = { ...state, ...(tweenTarget || {}), ...target };
      tweenTarget = to;
      cancelTween = tween((u) => {
        for (const k of ['t', 'e0', 'a']) state[k] = lerp(from[k], to[k], u);
        draw();
      }, () => { cancelTween = () => {}; tweenTarget = null; });
    }
    // playing: time runs at RATE tau0 per second until T_MAX (a demonstration the reader starts, so it
    // runs under reduced motion too, in coarse steps rather than smoothly)
    function start() {
      cancelTween();
      if (state.t >= T_MAX - 1e-9) state.t = 0;
      playing = true; play.setPlaying(true);
      let last = null;
      const step = (now) => {
        if (!playing) return;
        if (last === null) last = now;
        const dt = ((now - last) / 1000) * RATE;
        if (reducedMotion()) { if (dt >= 1) { state.t = clamp(state.t + 1, 0, T_MAX); last = now; draw(); } }
        else { state.t = clamp(state.t + dt, 0, T_MAX); last = now; draw(); }
        if (state.t >= T_MAX - 1e-9 || probability(xsDraw, outDraw, X_RANGE[0], X_RANGE[1]) < P_GONE) { stop(); return; }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    function stop() { playing = false; cancelAnimationFrame(raf); play.setPlaying(false); }

    const ro = new ResizeObserver(() => wh.rescale());
    ro.observe(ui.canvas);
    placeFixedLabels();
    draw();
    return () => { stop(); cancelTween(); ro.disconnect(); ui.destroy(); };
  },
};
