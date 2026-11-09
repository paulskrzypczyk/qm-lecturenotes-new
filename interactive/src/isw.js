// Chapter 7 — the infinite square well. Top: the energy eigenfunction u_n(x) inside the well (or,
// in superposition mode, |psi(x,t)| of (|E_n> + |E_m>)/sqrt 2 coloured by phase); bottom: the
// probability density; right: the energy ladder E_n = n^2 E_1, where a level can be clicked.
// The superposition sloshes back and forth: Play runs it and <x>(t) is read out.
import { card, group, slider, presets, toggle, readout, note, action } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set, pathD } from './core/svg.js';
import { num, clamp } from './core/format.js';
import { tween, lerp, reducedMotion } from './core/motion.js';
import { u, E, psi, density, meanX, period } from './core/isw.js';
import { hueCurve, wheel } from './core/hue.js';
import { tex } from './core/katex.js';

const DEFAULTS = { n: 1, m: 2, superpose: false, t: 0 };
const N_MAX = 6;
const X_RANGE = [-0.15, 1.15];   // in units of L
const Y_U = [-1.6, 2.1];         // u_n ranges over ±sqrt(2); |psi| of a superposition up to 2
const Y_PD = [0, 4.2];
const T_MAX = 2 * Math.PI;       // in units of hbar/E_1
const RATE = 0.6;                // time units per second when playing
const LEVELS = Array.from({ length: N_MAX }, (_, i) => ({ value: i + 1, tex: `${i + 1}`, words: `n equals ${i + 1}` }));

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { n: opt('n'), m: opt('m'), superpose: !!opt('superpose'), t: opt('t') };
    let cancelTween = () => {}, raf = 0, playing = false;

    const ui = card(el, {
      label: 'Figure 7.4: eigenfunctions of the infinite square well',
      hint: ['Pick a level ', { tex: 'n' }, ' (or click one on the energy ladder); superpose two levels and press play to see the state move.'],
      onReset: () => { stop(); state.superpose = false; supToggle.set(false); state.n = opt('n'); state.m = opt('m'); animateTo({ t: 0 }); },
    });

    // ── canvas ────────────────────────────────────────────────────────────────────
    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 52, h: 38 }, xRange: X_RANGE, yRange: Y_U });
    const bot = new Panel(svg, labels, { box: { x: 8, y: 52, w: 52, h: 40 }, xRange: X_RANGE, yRange: Y_PD });
    const lad = new Panel(svg, labels, { box: { x: 78, y: 5, w: 14, h: 87 }, xRange: [0, 1], yRange: [0, 38.5] });
    // the walls of the well (accent-3: the potential), shaded outside
    for (const p of [top, bot]) {
      const [y0, y1] = p.yRange;
      s('rect', { class: 'qm-area qm-accent-3', x: p.sx(X_RANGE[0]), y: p.sy(y1), width: p.sx(0) - p.sx(X_RANGE[0]), height: p.sy(y0) - p.sy(y1) }, p.g);
      s('rect', { class: 'qm-area qm-accent-3', x: p.sx(1), y: p.sy(y1), width: p.sx(X_RANGE[1]) - p.sx(1), height: p.sy(y0) - p.sy(y1) }, p.g);
      s('line', { class: 'qm-plot-axis', x1: p.sx(X_RANGE[0]), x2: p.sx(X_RANGE[1]), y1: p.sy(0), y2: p.sy(0) }, p.g);
      for (const xw of [0, 1]) s('line', { class: 'qm-op-axis qm-accent-3', x1: p.sx(xw), x2: p.sx(xw), y1: p.sy(y0), y2: p.sy(y1) }, p.g);
    }
    const curveU = top.curve('accent-1', { n: 400 });
    const hueU = hueCurve(top, { n: 300 });
    const curvePd = bot.curve('accent-1', { n: 400 });
    const markX = bot.vmark('ink');
    const wh = wheel(svg, labels, { cx: 69, cy: 40, r: 3.6 });   // in the clear gap between the panels (which end at x = 60) and the ladder (from 78)
    const labU = top.label('u_n(x)');
    const labX = top.label('x'), labX2 = bot.label('x');
    const lab0 = top.label('0', { small: true }), labL = top.label('L', { small: true });
    const lab0b = bot.label('0', { small: true }), labLb = bot.label('L', { small: true });
    const labPd = bot.label('\\pd(x)');
    const labAv = bot.label('\\av{x}', { small: true });
    // the energy ladder: one clickable line per level, with its label
    s('line', { class: 'qm-plot-axis', x1: lad.sx(0), x2: lad.sx(0), y1: lad.sy(0), y2: lad.sy(38.5) }, lad.g);
    const labE = lad.label('E');
    const levels = LEVELS.map(({ value: k }) => {
      const g = s('g', { class: 'qm-level qm-accent-3', tabindex: 0, role: 'button', 'aria-label': `select level n = ${k}` }, lad.g);
      s('rect', { class: 'qm-hit', x: lad.sx(0), y: lad.sy(E(k)) - 2.2, width: lad.box.w, height: 4.4, fill: 'transparent' }, g);
      const line = s('line', { class: 'qm-op-axis', x1: lad.sx(0), x2: lad.sx(1), y1: lad.sy(E(k)), y2: lad.sy(E(k)) }, g);
      const label = lad.label(`E_{${k}}`, { small: true });
      label.update(1, E(k), 'right', 0.3);
      g.addEventListener('click', () => pick(k));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k); } });
      return { g, line, label };
    });

    // ── controls ──────────────────────────────────────────────────────────────────
    const gLevel = group(ui.controls, 'Energy level');
    const prN = presets(gLevel, LEVELS, (i) => pick(i + 1));
    const gSup = group(ui.controls, 'Superposition');
    const supToggle = toggle(gSup, {
      label: ['superpose with a second level ', { tex: 'm' }, ': ', { tex: '\\psi(x,t) = \\big(u_n(x)e^{-iE_nt/\\hbar} + u_m(x)e^{-iE_mt/\\hbar}\\big)/\\sqrt{2}' }],
      checked: state.superpose, onChange: (c) => { stop(); state.superpose = c; draw(); },
    });
    const prM = presets(gSup, LEVELS.map((l) => ({ ...l, words: l.words.replace('n equals', 'm equals') })), (i) => { stop(); state.m = i + 1; draw(); });
    const play = action(gSup, { label: 'Play', pauseLabel: 'Pause', onClick: () => (playing ? stop() : start()) });
    const slT = slider(gSup, {
      symbol: 't', name: 'time t', min: 0, max: T_MAX, step: 0.01, value: state.t,
      fmt: (v) => `${num(v)}\\,\\hbar/E_1`, words: (v) => `${num(v)} h bar over E 1`, onInput: (v) => { stop(); cancelTween(); state.t = v; draw(); },
    });

    // ── readouts ──────────────────────────────────────────────────────────────────
    const rU = readout(ui.readouts, { role: 'accent-1' });
    const rE = readout(ui.readouts, { role: 'accent-3' });
    const rNodes = readout(ui.readouts, { role: 'accent-1' });
    const rE1 = readout(ui.readouts, { role: 'accent-3' });
    const rX = readout(ui.readouts, { role: 'accent-1' });
    const rT = readout(ui.readouts);
    const rPer = readout(ui.readouts);
    const rEm = readout(ui.readouts, { role: 'accent-3' });
    note(ui.readouts, [
      'An energy eigenstate is stationary: its density never changes. A superposition of two levels is not: it sloshes from side to side with period ',
      { tex: 'T = 2\\pi\\hbar/(E_m - E_n)' }, '. Energies are in units of ', { tex: 'E_1 = \\pi^2\\hbar^2/2ML^2' }, ', time in ', { tex: '\\hbar/E_1' }, '.',
    ]);

    // ── drawing ───────────────────────────────────────────────────────────────────
    function draw() {
      const { n, m, t } = state;
      const sup = state.superpose && m !== n;
      curveU.el.style.display = sup ? 'none' : '';
      hueU.el.style.display = sup ? '' : 'none';
      wh.show(sup);
      if (sup) hueU.update((x) => psi(x, t, n, m));
      else curveU.update((x) => u(n, x));
      curvePd.update((x) => density(x, t, n, sup ? m : null));
      const xc = meanX(t, n, sup ? m : null);
      markX.update(xc, density(xc, t, n, sup ? m : null));
      labAv.update(xc, 0, 'below', 0.9);
      labU.el.hidden = false;
      tex(labU.el, sup ? '|\\psi(x,t)|' : `u_{${n}}(x)`);
      tex(labPd.el, sup ? '\\pd(x,t)' : '\\pd(x)');
      levels.forEach((l, i) => {
        const k = i + 1;
        const on = k === n || (sup && k === m);
        l.g.classList.toggle('qm-on', on);          // stays accent-3 (the ladder's colour), drawn thicker and at full opacity (§5)
        l.line.style.strokeWidth = on ? '3.5' : '';
        l.g.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      prN.setActive(n - 1); prM.setActive(sup ? m - 1 : -1);
      prM.buttons.forEach((b) => { b.disabled = !state.superpose; });
      play.setDisabled(!sup); slT.setDisabled(!sup);
      slT.set(t);
      rU.set(`u_n(x) = \\sqrt{2/L}\\,\\sin(n\\pi x/L),\\quad n = ${n}`);
      rE.set(`E_n = n^2 E_1 = ${E(n)}\\,E_1`);
      rNodes.set(`\\text{nodes inside the well: } ${n - 1}`);
      rE1.set(`E_1 = \\pi^2\\hbar^2/2ML^2`);
      rX.set(sup ? `\\av{x}(t) = ${num(xc)}\\,L` : `\\av{x} = L/2`);
      rT.setHidden(!sup); rPer.setHidden(!sup); rEm.setHidden(!sup);
      if (sup) {
        rT.set(`t = ${num(t)}\\,\\hbar/E_1`);
        rPer.set(`T = 2\\pi\\hbar/(E_m - E_n) = ${num(period(n, m))}\\,\\hbar/E_1`);
        rEm.set(`E_m = ${E(m)}\\,E_1,\\quad E_m - E_n = ${Math.abs(E(m) - E(n))}\\,E_1`);
      }
    }
    function placeFixedLabels() {
      labU.update(0.03, Y_U[1] * 0.85, 'right', 0.2);
      labPd.update(0.03, Y_PD[1] * 0.9, 'right', 0.2);
      labX.update(X_RANGE[1], 0, 'right', 0.25); labX2.update(X_RANGE[1], 0, 'right', 0.25);
      lab0.update(0, 0, 'below-left', 0.3); labL.update(1, 0, 'below-right', 0.3);
      lab0b.update(0, 0, 'below-left', 0.3); labLb.update(1, 0, 'below-right', 0.3);
      labE.update(0, 38.5, 'above', 0.3);
    }
    function pick(k) { stop(); cancelTween(); if (state.superpose && k === state.n) return; state.n = k; draw(); }
    function animateTo(target) {
      cancelTween();
      const from = { ...state }, to = { ...state, ...target };
      cancelTween = tween((uu) => { state.t = lerp(from.t, to.t, uu); draw(); }, () => { cancelTween = () => {}; });
    }
    function start() {
      cancelTween();
      if (state.t >= T_MAX - 1e-9) state.t = 0;
      playing = true; play.setPlaying(true);
      let last = null;
      const step = (now) => {
        if (!playing) return;
        if (last === null) last = now;
        const dt = ((now - last) / 1000) * RATE;
        if (reducedMotion()) { if (dt >= 0.5) { state.t = clamp(state.t + 0.5, 0, T_MAX); last = now; draw(); } }
        else { state.t = clamp(state.t + dt, 0, T_MAX); last = now; draw(); }
        if (state.t >= T_MAX - 1e-9) { stop(); return; }
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

