// Chapter 11 — a particle in a 3D box. The marginal probability density pd(x, y, t) of the
// superposition (|E_(1,1,1)> + |E_(2,2,1)>)/sqrt 2 of the text, as a heat-map over the x-y face of
// the box, with the marginals pd(x, t) and pd(y, t) beside it (which never change, while the joint
// density sloshes along the diagonal). A second mode shows a single eigenstate (n_x, n_y).
import { card, group, slider, presets, toggle, readout, note, action, rich, h } from './core/dom.js';
import { plotCanvas, Panel } from './core/plot2d.js';
import { s, set, pathD } from './core/svg.js';
import { num, clamp } from './core/format.js';
import { reducedMotion } from './core/motion.js';
import { u } from './core/isw.js';

const DEFAULTS = { t: 0, eigenstate: false, nx: 2, ny: 1 };
const T_MAX = 2.1;             // two periods of 2 pi / 6 in units of hbar / E_box
const RATE = 0.5;
const N = 72;                  // heat-map resolution
const LEVELS = [1, 2, 3, 4].map((v) => ({ value: v, tex: `${v}`, words: `${v}` }));

/** pd(x, y, t) of the example superposition (1,1,1) + (2,2,1), integrated over z. */
export const pdExample = (x, y, t) => 0.5 * ((u(1, x) * u(1, y)) ** 2 + (u(2, x) * u(2, y)) ** 2 + 2 * Math.cos(6 * t) * u(1, x) * u(2, x) * u(1, y) * u(2, y));
/** its marginals, independent of t */
export const pdX = (x) => 0.5 * (u(1, x) ** 2 + u(2, x) ** 2);

export default {
  render({ model, el }) {
    const opt = (k) => (model.get(k) === undefined ? DEFAULTS[k] : model.get(k));
    const state = { t: opt('t'), eigenstate: !!opt('eigenstate'), nx: opt('nx'), ny: opt('ny') };
    let raf = 0, playing = false;

    const ui = card(el, {
      label: 'Figure 11.1: probability density in the x and y directions for a particle in a 3D box',
      hint: ['Press play: the density sloshes along the diagonal, while the marginals ', { tex: '\\pd(x,t)' }, ' and ', { tex: '\\pd(y,t)' }, ' stay put.'],
      onReset: () => { stop(); state.t = 0; state.eigenstate = false; eigToggle.set(false); state.nx = opt('nx'); state.ny = opt('ny'); draw(); },
    });

    const { svg, labels } = plotCanvas(ui.canvas);
    const map = new Panel(svg, labels, { box: { x: 12, y: 6, w: 60, h: 60 }, xRange: [0, 1], yRange: [0, 1] });
    const mx = new Panel(svg, labels, { box: { x: 12, y: 72, w: 60, h: 20 }, xRange: [0, 1], yRange: [0, 2.2] });
    const my = new Panel(svg, labels, { box: { x: 76, y: 6, w: 18, h: 60 }, xRange: [0, 2.2], yRange: [0, 1] });
    // the heat-map is a canvas drawn into an SVG <image>
    const cv = document.createElement('canvas'); cv.width = N; cv.height = N;
    const ctx = cv.getContext('2d');
    const img = s('image', { x: map.box.x, y: map.box.y, width: map.box.w, height: map.box.h, preserveAspectRatio: 'none' }, map.g);
    s('rect', { class: 'qm-outline', x: map.box.x, y: map.box.y, width: map.box.w, height: map.box.h }, map.g);
    const labMap = map.label('\\pd(x,y,t)');
    const labX = map.label('x', { small: true }), labY = map.label('y', { small: true });
    const lab0 = map.label('0', { small: true }), labLx = map.label('L', { small: true }), labLy = map.label('L', { small: true });
    mx.axes(); my.axes();
    const curveX = mx.curve('accent-1', { n: 200 });
    const curveY = s('path', { class: 'qm-curve qm-accent-1' }, my.g);
    const labPx = mx.label('\\pd(x,t)', { small: true });
    const labPy = my.label('\\pd(y,t)', { small: true });

    const gTime = group(ui.controls, 'Time');
    const play = action(gTime, { label: 'Play', pauseLabel: 'Pause', onClick: () => (playing ? stop() : start()) });
    const slT = slider(gTime, {
      symbol: 't', name: 'time t', min: 0, max: T_MAX, step: 0.01, value: state.t,
      fmt: (v) => `${num(v)}\\,\\hbar/\\Ebox`, words: (v) => `${num(v)} h bar over E box`, onInput: (v) => { stop(); state.t = v; draw(); },
    });
    const gState = group(ui.controls, 'State');
    const eigToggle = toggle(gState, {
      label: ['a single eigenstate ', { tex: 'u_{(n_x, n_y, n_z)}' }, ' instead of the superposition (stationary: nothing moves)'],
      checked: state.eigenstate, onChange: (c) => { stop(); state.eigenstate = c; draw(); },
    });
    gState.append(h('div', { class: 'qm-slider-label' }, rich([{ tex: 'n_x' }])));
    const prX = presets(gState, LEVELS.map((l) => ({ ...l, words: `n x equals ${l.value}` })), (i) => { state.nx = i + 1; draw(); });
    gState.append(h('div', { class: 'qm-slider-label' }, rich([{ tex: 'n_y' }])));
    const prY = presets(gState, LEVELS.map((l) => ({ ...l, words: `n y equals ${l.value}` })), (i) => { state.ny = i + 1; draw(); });

    const rState = readout(ui.readouts, { role: 'accent-1' });
    const rT = readout(ui.readouts);
    const rE = readout(ui.readouts, { role: 'accent-3' });
    const rPer = readout(ui.readouts);
    note(ui.readouts, [
      'Darker means a higher probability density. The marginals are time-independent because the two states differ in both ', { tex: 'n_x' }, ' and ', { tex: 'n_y' },
      ': only the joint density, with its cross term ', { tex: '\\cos(6\\Ebox t/\\hbar)' }, ', moves. Energies are in units of ', { tex: '\\Ebox = \\pi^2\\hbar^2/2ML^2' }, ', time in ', { tex: '\\hbar/\\Ebox' }, '.',
    ]);

    const css = () => getComputedStyle(ui.root);
    function paint(f, max) {
      const col = css().getPropertyValue('--qm-accent-1').trim() || '#2563eb';
      const bg = css().getPropertyValue('--qm-surface').trim() || '#fff';
      const c1 = parse(col), c0 = parse(bg);
      const data = ctx.createImageData(N, N);
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        const x = (i + 0.5) / N, y = 1 - (j + 0.5) / N;
        const v = Math.pow(clamp(f(x, y) / max, 0, 1), 0.8);
        const o = 4 * (j * N + i);
        data.data[o] = c0[0] + (c1[0] - c0[0]) * v; data.data[o + 1] = c0[1] + (c1[1] - c0[1]) * v; data.data[o + 2] = c0[2] + (c1[2] - c0[2]) * v; data.data[o + 3] = 255;
      }
      ctx.putImageData(data, 0, 0);
      img.setAttribute('href', cv.toDataURL());
    }
    function draw() {
      const { t, nx, ny } = state;
      if (state.eigenstate) {
        paint((x, y) => (u(nx, x) * u(ny, y)) ** 2, 4);
        curveX.update((x) => u(nx, x) ** 2);
        curveY.setAttribute('d', pathD(Array.from({ length: 201 }, (_, i) => { const y = i / 200; return [my.sx(u(ny, y) ** 2), my.sy(y)]; })));
        rState.set(`\\pd(x,y) = |u_{n_x}(x)u_{n_y}(y)|^2,\\quad n_x = ${nx},\\ n_y = ${ny}`);
        rE.set(`E = (n_x^2 + n_y^2 + n_z^2)\\,\\Ebox`);
        rPer.set(`\\text{stationary}`);
      } else {
        paint((x, y) => pdExample(x, y, t), 4);
        curveX.update(pdX);
        curveY.setAttribute('d', pathD(Array.from({ length: 201 }, (_, i) => { const y = i / 200; return [my.sx(pdX(y)), my.sy(y)]; })));
        rState.set(`\\psi = \\big(u_{(1,1,1)} + u_{(2,2,1)}\\big)/\\sqrt{2}`);
        rE.set(`E_{(1,1,1)} = 3\\Ebox,\\quad E_{(2,2,1)} = 9\\Ebox`);
        rPer.set(`\\text{period } 2\\pi\\hbar/6\\Ebox = ${num((2 * Math.PI) / 6)}\\,\\hbar/\\Ebox`);
      }
      rT.set(`t = ${num(t)}\\,\\hbar/\\Ebox`);
      slT.set(t);
      play.setDisabled(state.eigenstate); slT.setDisabled(state.eigenstate);
      prX.setActive(state.eigenstate ? nx - 1 : -1); prY.setActive(state.eigenstate ? ny - 1 : -1);
      prX.buttons.forEach((b) => { b.disabled = !state.eigenstate; }); prY.buttons.forEach((b) => { b.disabled = !state.eigenstate; });
      labMap.el.hidden = false;
    }
    function placeFixedLabels() {
      labMap.update(0, 1, 'above-right', 0.2);
      labX.update(0.5, 0, 'below', 0.3); labY.update(0, 0.5, 'left', 0.3);
      lab0.update(0, 0, 'below-left', 0.25); labLx.update(1, 0, 'below', 0.35); labLy.update(0, 1, 'left', 0.35);
      labPx.update(1, 2.2, 'below-left', 0.3);
      labPy.update(2.2, 1, 'below-left', 0.15);
    }
    function start() {
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
    // repaint when the theme changes (the colours of the heat-map follow it)
    const mo = new MutationObserver(() => draw());
    mo.observe(ui.root, { attributes: true, attributeFilter: ['data-theme'] });

    placeFixedLabels();
    draw();
    return () => { stop(); mo.disconnect(); ui.destroy(); };
  },
};

function parse(c) {
  c = c.trim();
  if (c.startsWith('#')) { const h = c.length === 4 ? c.slice(1).split('').map((x) => x + x).join('') : c.slice(1); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  const m = c.match(/\d+(\.\d+)?/g);
  return m ? m.slice(0, 3).map(Number) : [37, 99, 235];
}
