// Number formatting (ground rules §3): 2 decimals, angles in units of pi.

/** Fixed-width decimal for use inside TeX (no "-0.00"). */
export function num(x, dp = 2) {
  const s = x.toFixed(dp);
  return /^-0\.0*$/.test(s) ? s.slice(1) : s;
}

/** Angle in units of pi, e.g. 0.30\pi */
export function piUnits(a, dp = 2) {
  return `${num(a / Math.PI, dp)}\\pi`;
}

/** Words for screen readers, e.g. "0.30 pi" */
export function piWords(a, dp = 2) {
  return `${num(a / Math.PI, dp)} pi`;
}

/** Complex number re + i im as TeX, e.g. 0.24 - 0.17i */
export function complex(re, im, dp = 2) {
  const r = num(re, dp), i = num(Math.abs(im), dp);
  if (Number(i) === 0) return r;
  if (Number(r) === 0) return `${im < 0 ? '-' : ''}${i}i`;
  return `${r} ${im < 0 ? '-' : '+'} ${i}i`;
}

export const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
