// 2D plots for the QM widgets (ground rules §6): one SVG canvas (viewBox 0 0 100 100)
// holding one or more panels, each with its own data coordinates. Colours are never
// set here: elements get `qm-*` classes and a role class, and the stylesheet does the rest.
import { s, set, pathD } from './svg.js';
import { h } from './dom.js';
import { tex } from './katex.js';

/**
 * A plot area inside the canvas.
 *   box:    {x, y, w, h} in viewBox units (0–100)
 *   xRange: [x0, x1], yRange: [y0, y1] in data units
 */
export class Panel {
  constructor(svg, labels, { box, xRange, yRange }) {
    this.svg = svg;
    this.labels = labels;
    this.box = box;
    this.xRange = xRange;
    this.yRange = yRange;
    this.g = s('g', { class: 'qm-panel' }, svg);
  }

  /** data → viewBox */
  sx(x) { const [x0, x1] = this.xRange; return this.box.x + ((x - x0) / (x1 - x0)) * this.box.w; }
  sy(y) { const [y0, y1] = this.yRange; return this.box.y + this.box.h - ((y - y0) / (y1 - y0)) * this.box.h; }
  /** viewBox → data (x only; used by handles on the x axis) */
  dx(sx) { const [x0, x1] = this.xRange; return x0 + ((sx - this.box.x) / this.box.w) * (x1 - x0); }
  dy(sy) { const [y0, y1] = this.yRange; return y0 + ((this.box.y + this.box.h - sy) / this.box.h) * (y1 - y0); }

  /** Horizontal axis through y = 0 and vertical axis through x = 0 (where they fall in range). */
  axes() {
    const { x, y, w, h } = this.box;
    const y0 = this.sy(0);
    s('line', { class: 'qm-plot-axis', x1: x, y1: y0, x2: x + w, y2: y0 }, this.g);
    const [xa, xb] = this.xRange;
    if (xa < 0 && xb > 0) {
      const x0 = this.sx(0);
      s('line', { class: 'qm-plot-axis', x1: x0, y1: y, x2: x0, y2: y + h }, this.g);
    }
    return this;
  }

  /** A curve y = f(x) sampled n times across the panel. Returns {el, update(f)}. */
  curve(role, { n = 200, cls = 'qm-curve', xRange } = {}) {
    const el = s('path', { class: `${cls} qm-${role}` }, this.g);
    const update = (f, range) => {
      const [x0, x1] = range || xRange || this.xRange;
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const x = x0 + ((x1 - x0) * i) / n;
        pts.push([this.sx(x), this.sy(f(x))]);
      }
      set(el, { d: pathD(pts) });
    };
    return { el, update };
  }

  /** The area under y = f(x) between xa and xb (translucent fill in the role colour). */
  area(role, { n = 120 } = {}) {
    const el = s('path', { class: `qm-area qm-${role}` }, this.g);
    const update = (f, xa, xb) => {
      const pts = [[this.sx(xa), this.sy(0)]];
      for (let i = 0; i <= n; i++) {
        const x = xa + ((xb - xa) * i) / n;
        pts.push([this.sx(x), this.sy(f(x))]);
      }
      pts.push([this.sx(xb), this.sy(0)]);
      set(el, { d: pathD(pts, true) });
    };
    return { el, update };
  }

  /** Bars (a histogram) as one path: update([{a, b, h}]) draws a bar from x = a to b of height h. */
  bars(role) {
    const el = s('path', { class: `qm-bars qm-${role}` }, this.g);
    const update = (items) => {
      const y0 = this.sy(0);
      let d = '';
      for (const { a, b, h: hh } of items) {
        const xa = this.sx(a).toFixed(3), xb = this.sx(b).toFixed(3), yt = this.sy(hh).toFixed(3);
        d += `M${xa} ${y0.toFixed(3)}L${xa} ${yt}L${xb} ${yt}L${xb} ${y0.toFixed(3)}Z`;
      }
      set(el, { d });
    };
    return { el, update };
  }

  /** A hollow rectangle on the axis: update(xa, xb, top). */
  rect(role) {
    const el = s('path', { class: `qm-rect qm-${role}` }, this.g);
    const update = (xa, xb, top) => set(el, { d: pathD([[this.sx(xa), this.sy(0)], [this.sx(xa), this.sy(top)], [this.sx(xb), this.sy(top)], [this.sx(xb), this.sy(0)]], true) });
    return { el, update };
  }

  /** A marked point (§5: 4.5px radius, filled, with a surface ring). update(x, y); rescale() on resize. */
  point(role) {
    const el = s('circle', { class: `qm-point qm-${role}`, r: 1.5 }, this.g);
    const scale = () => {
      const r = this.svg.getBoundingClientRect();
      set(el, { r: 4.5 * (r.width ? 100 / r.width : 0.3) });
    };
    const update = (x, y) => { set(el, { cx: this.sx(x), cy: this.sy(y) }); };
    scale();
    return { el, update, rescale: scale };
  }

  /** A dashed vertical marker from the axis up to y = top (construction line, §5). */
  vmark(role) {
    const el = s('line', { class: `qm-construct qm-${role}` }, this.g);
    const update = (x, top) => set(el, { x1: this.sx(x), x2: this.sx(x), y1: this.sy(0), y2: this.sy(top) });
    return { el, update };
  }

  /**
   * A KaTeX label anchored at a data point. `anchor` is where the label sits relative to
   * the point: 'above', 'below', 'left', 'right', or 'above-left' etc. Offsets in em.
   */
  label(src, { role, small } = {}) {
    const el = h('div', { class: 'qm-label' + (small ? ' qm-small' : '') + (role ? ` qm-${role}` : '') });
    tex(el, src);
    this.labels.append(el);
    const update = (x, y, anchor = 'below', gap = 0.35) => {
      const px = this.sx(x), py = this.sy(y);
      const [vx, vy] = ANCHORS[anchor] || ANCHORS.below;
      el.style.left = `${px}%`;
      el.style.top = `${py}%`;
      // translate by anchor then nudge by `gap` em
      el.style.transform = `translate(${-50 + 50 * vx}%, ${-50 + 50 * vy}%) translate(${vx * gap}em, ${vy * gap}em)`;
    };
    return { el, update };
  }

  /**
   * A draggable handle that slides along the x axis (§7): a knob with an invisible hit
   * area and a focus ring; the arrow keys move it in steps. onDrag(x) receives data x.
   */
  handle(role, { label, min, max, step, fine, onDrag, words }) {
    const g = s('g', { class: `qm-handle qm-${role}`, tabindex: 0, role: 'slider', 'aria-label': label }, this.g);
    const hit = s('circle', { class: 'qm-hit', r: 18 }, g);
    const ring = s('circle', { class: 'qm-ring', r: 11 }, g);
    const knob = s('circle', { class: 'qm-knob', r: 7 }, g);
    let cur = min;
    const scale = () => {
      // radii are in screen pixels (§5): convert using the rendered size
      const r = this.svg.getBoundingClientRect();
      const k = r.width ? 100 / r.width : 0.3;
      set(hit, { r: 18 * k }); set(ring, { r: 11 * k }); set(knob, { r: 7 * k });
    };
    const update = (x) => {
      cur = x;
      const px = this.sx(x), py = this.sy(0);
      set(g, { transform: `translate(${px} ${py})`, 'aria-valuenow': x, 'aria-valuemin': min, 'aria-valuemax': max, 'aria-valuetext': words(x) });
      scale();
    };
    const clamp = (v) => Math.min(max, Math.max(min, v));
    g.addEventListener('keydown', (e) => {
      const d = e.shiftKey ? fine : step;
      let v = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v = cur + d;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v = cur - d;
      else if (e.key === 'Home') v = min;
      else if (e.key === 'End') v = max;
      if (v === null) return;
      e.preventDefault();
      onDrag(clamp(v));
    });
    // pointer position → data x
    const toX = (e) => {
      const r = this.svg.getBoundingClientRect();
      const sx = ((e.clientX - r.left) / r.width) * 100;
      return clamp(this.dx(sx));
    };
    return { el: g, update, toX, rescale: scale };
  }
}

const ANCHORS = {
  above: [0, -1], below: [0, 1], left: [-1, 0], right: [1, 0],
  'above-left': [-1, -1], 'above-right': [1, -1], 'below-left': [-1, 1], 'below-right': [1, 1],
};

/** The canvas: an SVG with a 100×100 viewBox and a label layer on top. */
export function plotCanvas(canvasEl) {
  const svg = s('svg', { viewBox: '0 0 100 100', class: 'qm-plot' }, canvasEl);
  const labels = h('div', { class: 'qm-labels' });
  canvasEl.append(labels);
  return { svg, labels };
}
