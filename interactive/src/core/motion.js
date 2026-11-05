// Motion (ground rules §7): 300 ms ease-in-out for jumps to a preset;
// nothing animates when the reader prefers reduced motion.

export const DURATION = 300;

export function reducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Calls frame(u) with u going 0 → 1 (eased), then done(). Returns a cancel function.
 * With reduced motion, frame(1) is called straight away.
 */
export function tween(frame, done, ms = DURATION) {
  if (reducedMotion() || ms <= 0) { frame(1); done && done(); return () => {}; }
  let raf = 0, t0 = null, stopped = false;
  const step = (now) => {
    if (stopped) return;
    if (t0 === null) t0 = now;
    const t = Math.min(1, (now - t0) / ms);
    frame(easeInOut(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else done && done();
  };
  raf = requestAnimationFrame(step);
  return () => { stopped = true; cancelAnimationFrame(raf); };
}

export const lerp = (a, b, u) => a + (b - a) * u;

/** Shortest way round between two angles (radians). */
export function lerpAngle(a, b, u) {
  const TAU = 2 * Math.PI;
  let d = ((b - a) % TAU + TAU) % TAU;
  if (d > Math.PI) d -= TAU;
  return (((a + d * u) % TAU) + TAU) % TAU;
}
