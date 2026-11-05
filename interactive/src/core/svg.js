// Small SVG helpers. Colours are never set here: elements get `qm-*` classes
// and the stylesheet supplies the colours (ground rules §2, §5).
const NS = 'http://www.w3.org/2000/svg';

export function s(tag, attrs = {}, parent = null) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined && v !== null) el.setAttribute(k, v);
  }
  if (parent) parent.appendChild(el);
  return el;
}

export function set(el, attrs) {
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

/** "M x y L x y ..." from [[x,y],...] */
export function pathD(pts, close = false) {
  if (!pts.length) return '';
  let d = `M${pts[0][0].toFixed(4)} ${pts[0][1].toFixed(4)}`;
  for (let i = 1; i < pts.length; i++) d += `L${pts[i][0].toFixed(4)} ${pts[i][1].toFixed(4)}`;
  return close ? d + 'Z' : d;
}

/**
 * Split a sampled 3D curve into front and back runs (by the sign of depth),
 * returning SVG path data for each (ground rules §6: back = hidden-line style).
 * `samples` is an array of {x, y, depth} in screen coordinates.
 */
export function splitFrontBack(samples) {
  const front = [], back = [];
  let run = [], runFront = null;
  for (const p of samples) {
    const isFront = p.depth >= 0;
    if (runFront === null) runFront = isFront;
    if (isFront !== runFront) {
      run.push([p.x, p.y]);
      (runFront ? front : back).push(run);
      run = [[p.x, p.y]];
      runFront = isFront;
    } else {
      run.push([p.x, p.y]);
    }
  }
  if (run.length) (runFront ? front : back).push(run);
  return {
    front: front.map((r) => pathD(r)).join(''),
    back: back.map((r) => pathD(r)).join(''),
  };
}

/** Arrow (shaft end + filled head) from a to b in screen units; head length in viewBox units. */
export function arrowHead(ax, ay, bx, by, len, halfWidth) {
  const dx = bx - ax, dy = by - ay;
  const L = Math.hypot(dx, dy);
  if (L < 1e-9) return { shaftEnd: [bx, by], head: '' };
  const ux = dx / L, uy = dy / L;
  const l = Math.min(len, L * 0.6);
  const w = halfWidth * (l / len);
  const baseX = bx - ux * l, baseY = by - uy * l;
  const head = pathD([[bx, by], [baseX - uy * w, baseY + ux * w], [baseX + uy * w, baseY - ux * w]], true);
  return { shaftEnd: [baseX + ux * l * 0.3, baseY + uy * l * 0.3], head };
}
