// Phase-by-hue drawing helpers (ground rules §2, §5): a curve whose colour is the phase of a
// complex function, and the colour-wheel legend. Shared by the wavepacket and well widgets.
import { s, set, pathD } from './svg.js';
import { Panel } from './plot2d.js';
import { hue } from './planewave.js';

/**
 * A curve y = |f(x)| coloured by arg f(x), drawn as n segments in `panel`.
 * update(f) where f(x) returns {mod, phase}.
 */
export function hueCurve(panel, { n = 300, cls = 'qm-hue-seg' } = {}) {
  const g = s('g', {}, panel.g);
  const segs = Array.from({ length: n }, () => s('path', { class: cls }, g));
  const [x0, x1] = panel.xRange;
  const w = (x1 - x0) / n;
  const update = (f) => {
    let prev = f(x0);
    for (let i = 0; i < n; i++) {
      const xa = x0 + w * i, xb = xa + w;
      const next = f(xb), mid = f(xa + w / 2);
      set(segs[i], { d: pathD([[panel.sx(xa), panel.sy(prev.mod)], [panel.sx(xb) + 0.03, panel.sy(next.mod)]]), style: `stroke:${hue(mid.phase)}` });
      prev = next;
    }
  };
  return { el: g, update };
}

/** The colour-wheel legend at (cx, cy) with radius r (viewBox units), labelled 0, pi/2, pi, 3pi/2. */
export function wheel(svg, labels, { cx, cy, r, gap = 0.45 }) {
  const g = s('g', {}, svg);
  for (let i = 0; i < 72; i++) {
    const t0 = (i / 72) * 2 * Math.PI, t1 = ((i + 1.15) / 72) * 2 * Math.PI;
    const pts = [];
    for (let j = 0; j <= 3; j++) { const th = t0 + ((t1 - t0) * j) / 3; pts.push([cx + r * Math.cos(th), cy - r * Math.sin(th)]); }
    s('path', { class: 'qm-hue-ring', d: pathD(pts), style: `stroke:${hue((t0 + t1) / 2)}` }, g);
  }
  const panel = new Panel(svg, labels, { box: { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r }, xRange: [-1, 1], yRange: [-1, 1] });
  const labs = [['0', 1, 0, 'right'], ['\\pi/2', 0, 1, 'above'], ['\\pi', -1, 0, 'left'], ['3\\pi/2', 0, -1, 'below']].map(([tx, x, y, anchor]) => {
    const l = panel.label(tx, { small: true }); l.update(x, y, anchor, gap); return l;
  });
  const pt = panel.point('ink');
  pt.el.style.display = 'none';
  return {
    el: g,
    /** show or hide the whole legend (ring, labels and marker) */
    show(on) { g.style.display = on ? '' : 'none'; labs.forEach((l) => { l.el.hidden = !on; }); if (!on) pt.el.style.display = 'none'; },
    /** mark a phase on the ring (or hide the marker with null) */
    mark(phase) {
      pt.el.style.display = phase === null ? 'none' : '';
      if (phase !== null) { pt.update(Math.cos(phase), Math.sin(phase)); pt.el.style.fill = hue(phase); }
    },
    rescale: pt.rescale,
  };
}
