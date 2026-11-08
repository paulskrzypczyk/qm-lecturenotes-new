// Figure 6.1 — the free Gaussian wavepacket psi(x, t) of equation (6.x). Top panel: |psi(x, t)|
// coloured by its phase (the representation of the notes' animation), with the colour wheel.
// Bottom panel: the density pd(x, t) with <x> = p0 t/M and the band <x> ± Delta x(t) marked, and
// the initial density as a ghost. Play runs time; the sliders set t and the initial wavefunction
// (a, p0) and the mass M, so the reader sees that a narrower or lighter packet spreads faster.
import { card, group, slider, presets, toggle, readout, note, action } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set, pathD } from './core/svg.js';
import { num, clamp } from './core/format.js';
import { tween, lerp, reducedMotion } from './core/motion.js';
import { psi, density, alpha, centre } from './core/wavepacket.js';
import { hue } from './core/planewave.js';

const DEFAULTS = { t: 0, a: 1, p0: 1, M: 1, ghost: true };
const X_RANGE = [-5, 30];       // a0 (room for a fast, light packet to run and spread)
const T_MAX = 6;                // in units of tau = 2 M0 a0^2 / hbar
const A_RANGE = [0.5, 2], P_RANGE = [0, 1.2], M_RANGE = [0.5, 2];
const Y_MOD = [0, 1.0];         // |psi| peaks at 0.89 for a = 0.5
const Y_PD = [0, 0.9];          // pd peaks at 0.80 for a = 0.5
const N_SEG = 300;
const RATE = 0.6;               // tau per second when playing (10 s for the full run)
const T_PRESETS = [0, 2, 4, 6].map((v) => ({ value: v, tex: v === 0 ? '0' : `${v}\\tau`, words: `t equals ${v} tau` }));

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { t: opt('t'), a: opt('a'), p0: opt('p0'), M: opt('M'), ghost: !!opt('ghost') };
    let cancelTween = () => {}, raf = 0, playing = false;
    const prm = () => ({ a: state.a, p0: state.p0, M: state.M });

    const ui = card(el, {
      label: 'Figure 6.1: time evolution of a Gaussian wavepacket',
      hint: ['Press play or drag ', { tex: 't' }, '; ', { tex: 'a' }, ', ', { tex: 'p_0' }, ' and ', { tex: 'M' }, ' set the wavefunction and the particle.'],
      onReset: () => { stop(); state.ghost = !!DEFAULTS.ghost; ghostToggle.set(state.ghost); animateTo({ t: opt('t'), a: opt('a'), p0: opt('p0'), M: opt('M') }); },
    });

    // ── canvas: |psi| coloured by phase above, the density below ───────────────────
    const { svg, labels } = plotCanvas(ui.canvas);
    const top = new Panel(svg, labels, { box: { x: 8, y: 5, w: 86, h: 36 }, xRange: X_RANGE, yRange: Y_MOD }).axes();
    const bot = new Panel(svg, labels, { box: { x: 8, y: 57, w: 86, h: 36 }, xRange: X_RANGE, yRange: Y_PD }).axes();

    const segs = Array.from({ length: N_SEG }, () => s('path', { class: 'qm-hue-seg' }, top.g));
    const band = bot.area('accent-1');
    const ghost = bot.curve('accent-1', { cls: 'qm-curve qm-density qm-faint', n: 300 });
    const curvePd = bot.curve('accent-1', { n: 300 });
    const markL = bot.vmark('accent-1'), markR = bot.vmark('accent-1'), markC = bot.vmark('ink');

    const labMod = top.label('|\\psi(x,t)|');
    const labXt = top.label('x');
    const labPd = bot.label('\\pd(x,t)');
    const labX = bot.label('x');
    const labC = bot.label('\\av{x}');

    // the colour wheel legend (top right of the upper panel)
    const WHEEL = { cx: 88, cy: 10, r: 4.5 };
    const wheel = s('g', {}, svg);
    for (let i = 0; i < 72; i++) {
      const t0 = (i / 72) * 2 * Math.PI, t1 = ((i + 1.15) / 72) * 2 * Math.PI;
      const pts = [];
      for (let j = 0; j <= 3; j++) { const th = t0 + ((t1 - t0) * j) / 3; pts.push([WHEEL.cx + WHEEL.r * Math.cos(th), WHEEL.cy - WHEEL.r * Math.sin(th)]); }
      s('path', { class: 'qm-hue-ring', d: pathD(pts), style: `stroke:${hue((t0 + t1) / 2)}` }, wheel);
    }
    const wheelPanel = new Panel(svg, labels, { box: { x: WHEEL.cx - WHEEL.r, y: WHEEL.cy - WHEEL.r, w: 2 * WHEEL.r, h: 2 * WHEEL.r }, xRange: [-1, 1], yRange: [-1, 1] });
    for (const [tx, x, y, anchor] of [['0', 1, 0, 'right'], ['\\pi/2', 0, 1, 'above'], ['\\pi', -1, 0, 'left'], ['3\\pi/2', 0, -1, 'below']]) wheelPanel.label(tx, { small: true }).update(x, y, anchor, 0.45);

    // ── controls ──────────────────────────────────────────────────────────────────
    const gTime = group(ui.controls, 'Time');
    const play = action(gTime, { label: 'Play', pauseLabel: 'Pause', onClick: () => (playing ? stop() : start()) });
    const slT = slider(gTime, {
      symbol: 't', name: 'time t', min: 0, max: T_MAX, step: 0.01, value: state.t,
      fmt: (v) => `${num(v)}\\,\\tau`, words: (v) => `${num(v)} tau`, onInput: (v) => { stop(); cancelTween(); state.t = v; draw(); },
    });
    const prT = presets(gTime, T_PRESETS, (i) => { stop(); animateTo({ t: T_PRESETS[i].value }); });
    const gWave = group(ui.controls, 'Wavefunction and particle');
    const slA = slider(gWave, {
      symbol: 'a', name: 'initial width a', min: A_RANGE[0], max: A_RANGE[1], step: 0.01, value: state.a,
      fmt: (v) => `${num(v)}\\,a_0`, words: (v) => `${num(v)} a nought`, onInput: (v) => { cancelTween(); state.a = v; draw(); },
    });
    const slP = slider(gWave, {
      symbol: 'p_0', name: 'momentum p nought', min: P_RANGE[0], max: P_RANGE[1], step: 0.01, value: state.p0,
      fmt: (v) => `${num(v)}\\,\\hbar/a_0`, words: (v) => `${num(v)} h bar over a nought`, onInput: (v) => { cancelTween(); state.p0 = v; draw(); },
    });
    const slM = slider(gWave, {
      symbol: 'M', name: 'mass M', min: M_RANGE[0], max: M_RANGE[1], step: 0.01, value: state.M,
      fmt: (v) => `${num(v)}\\,M_0`, words: (v) => `${num(v)} M nought`, onInput: (v) => { cancelTween(); state.M = v; draw(); },
    });
    const gShow = group(ui.controls, 'Show');
    const ghostToggle = toggle(gShow, {
      label: ['the initial density ', { tex: '\\pd(x, 0)' }, ' (dashed) for comparison'],
      checked: state.ghost, onChange: (c) => { state.ghost = c; draw(); },
    });

    // ── readouts ──────────────────────────────────────────────────────────────────
    const rT = readout(ui.readouts);
    const rDxF = readout(ui.readouts, { role: 'accent-1' });
    const rC = readout(ui.readouts, { role: 'accent-1' });
    const rDx = readout(ui.readouts, { role: 'accent-1' });
    const rV = readout(ui.readouts);
    const rDx0 = readout(ui.readouts, { role: 'accent-1' });
    note(ui.readouts, [
      'The packet moves at the classical speed ', { tex: 'v = p_0/M' }, ' and spreads: a narrower or lighter packet spreads faster. ',
      'The colour is the phase of ', { tex: '\\psi(x,t)' }, ': at later times it cycles faster at the front of the packet than at the back, since the front has the higher momentum. ',
      'Lengths are in units of ', { tex: 'a_0' }, ', momenta in ', { tex: '\\hbar/a_0' }, ', masses in ', { tex: 'M_0' }, ' and time in ', { tex: '\\tau = 2M_0a_0^2/\\hbar' }, '.',
    ]);

    // ── drawing ───────────────────────────────────────────────────────────────────
    function draw() {
      const { t } = state, P = prm();
      const xc = centre(t, P), al = alpha(t, P);
      // |psi| coloured by phase, one segment per sample
      const w = (X_RANGE[1] - X_RANGE[0]) / N_SEG;
      let prev = psi(X_RANGE[0], t, P);
      for (let i = 0; i < N_SEG; i++) {
        const x1 = X_RANGE[0] + w * (i + 1);
        const next = psi(x1, t, P);
        const mid = psi(x1 - w / 2, t, P);
        set(segs[i], { d: pathD([[top.sx(x1 - w), top.sy(prev.mod)], [top.sx(x1) + 0.03, top.sy(next.mod)]]), style: `stroke:${hue(mid.phase)}` });
        prev = next;
      }
      curvePd.update((x) => density(x, t, P));
      ghost.el.style.display = state.ghost ? '' : 'none';
      if (state.ghost) ghost.update((x) => density(x, 0, P));
      // the band and its markers stay inside the panel (a fast, light packet can spread past its edge)
      const inside = (x) => x >= X_RANGE[0] && x <= X_RANGE[1];
      band.update((x) => density(x, t, P), clamp(xc - al, X_RANGE[0], X_RANGE[1]), clamp(xc + al, X_RANGE[0], X_RANGE[1]));
      markL.update(xc - al, density(xc - al, t, P)); markR.update(xc + al, density(xc + al, t, P)); markC.update(xc, density(xc, t, P));
      markL.el.style.display = inside(xc - al) ? '' : 'none';
      markR.el.style.display = inside(xc + al) ? '' : 'none';
      markC.el.style.display = inside(xc) ? '' : 'none';
      labC.update(xc, 0, 'below', 0.9);
      labC.el.hidden = xc > X_RANGE[1] - 2.5;   // would sit on the x label (§3)

      slT.set(t); slA.set(state.a); slP.set(state.p0); slM.set(state.M);
      prT.setActive(T_PRESETS.findIndex((p) => Math.abs(p.value - t) < 1e-9));
      rT.set(`t = ${num(t)}\\,\\tau`);
      rC.set(`\\av{x} = p_0 t/M = ${num(xc)}\\,a_0`);
      rDxF.set(`\\Delta x(t) = \\alpha(t) = a\\sqrt{1 + \\hbar^2t^2/4M^2a^4}`);
      rDx.set(`\\Delta x(t) = ${num(al)}\\,a_0`);
      rDx0.set(`\\Delta x(0) = a = ${num(state.a)}\\,a_0`);
      rV.set(`v = p_0/M = ${num(state.p0 / state.M)}\\,\\hbar/(M_0a_0)`);
    }
    function placeFixedLabels() {
      labMod.update(0, Y_MOD[1] * 0.92, 'left', 0.5);
      labXt.update(X_RANGE[1], 0, 'below-left', 0.2);
      labPd.update(0, Y_PD[1] * 0.92, 'left', 0.5);
      labX.update(X_RANGE[1], 0, 'below-left', 0.2);
    }
    let tweenTarget = null;
    function animateTo(target) {
      cancelTween();
      const from = { ...state }, to = { ...state, ...(tweenTarget || {}), ...target };
      tweenTarget = to;
      cancelTween = tween((u) => {
        for (const k of ['t', 'a', 'p0', 'M']) state[k] = lerp(from[k], to[k], u);
        draw();
      }, () => { cancelTween = () => {}; tweenTarget = null; });
    }
    // playing: time runs at RATE tau per second until T_MAX (a demonstration the reader starts, so it runs
    // under reduced motion too, but in coarse steps rather than smoothly)
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

    placeFixedLabels();
    draw();
    return () => { stop(); cancelTween(); ui.destroy(); };
  },
};
