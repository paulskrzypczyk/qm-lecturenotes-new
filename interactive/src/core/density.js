// A sample wavefunction for Chapter 1 (pure maths, no DOM, so it can be tested).
// psi(x) is a real sum of four Gaussian bumps, one of them negative, normalised so that
// the integral of pd(x) = |psi(x)|^2 is 1. Lengths are in units of a reference length a0.
import { integrate } from './gaussian.js';

/** The bumps: [amplitude, centre, width]. Chosen so that pd(x) looks like the static figure. */
export const BUMPS = [
  [0.80, 0.9, 0.42],
  [-0.55, 2.35, 0.30],
  [1.00, 3.65, 0.38],
  [0.62, 5.05, 0.36],
];

/** The x range of the figure (viewBox panels use the same range). */
export const X_RANGE = [-0.75, 6.25];

function raw(x) {
  let s = 0;
  for (const [c, mu, w] of BUMPS) s += c * Math.exp(-((x - mu) ** 2) / (2 * w * w));
  return s;
}

/** 1 / sqrt( int |raw|^2 ), computed once. */
const NORM = 1 / Math.sqrt(integrate((x) => raw(x) ** 2, X_RANGE[0] - 4, X_RANGE[1] + 4, 8000));

/** psi(x), real and normalised. */
export const psi = (x) => NORM * raw(x);

/** pd(x) = |psi(x)|^2 */
export const density = (x) => psi(x) ** 2;

/** The exact probability to find the particle in [a, b]:  int_a^b pd(x) dx. */
export const probability = (a, b, n = 200) => integrate(density, a, b, n);

/**
 * The outcomes of a position measurement with resolution dx: bins of width dx covering
 * [lo, hi], aligned so that one bin starts at x0. Returns [{a, b, p}] with p the probability.
 */
export function bins(x0, dx, lo = X_RANGE[0], hi = X_RANGE[1]) {
  const first = x0 - Math.ceil((x0 - lo) / dx) * dx;
  const out = [];
  for (let a = first; a < hi - 1e-9; a += dx) {
    const b = a + dx;
    out.push({ a, b, p: probability(Math.max(a, lo - 4), Math.min(b, hi + 4), 60) });
  }
  return out;
}
