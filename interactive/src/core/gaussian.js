// The Gaussian wavefunction of Chapter 3 (pure maths, no DOM, so it can be tested).
// Units: lengths in a0 (a fixed reference length), momenta in hbar/a0, hbar = 1.

/** psi(x) = (1/(a sqrt(2 pi)))^{1/2} exp(-x^2 / 4a^2)   — equation (3.1) */
export function psi(x, a) {
  return Math.sqrt(1 / (a * Math.sqrt(2 * Math.PI))) * Math.exp(-(x * x) / (4 * a * a));
}

/** psi~(p) = (sqrt(2) a / (sqrt(pi) hbar))^{1/2} exp(-a^2 p^2 / hbar^2)   — equation (3.3) */
export function psiTilde(p, a) {
  return Math.sqrt((Math.SQRT2 * a) / Math.sqrt(Math.PI)) * Math.exp(-(a * a * p * p));
}

/** Standard deviations: Delta x = a, Delta p = hbar / 2a   — (3.2), (3.4) */
export const deltaX = (a) => a;
export const deltaP = (a) => 1 / (2 * a);

/** Probability densities */
export const density = (x, a) => psi(x, a) ** 2;
export const densityP = (p, a) => psiTilde(p, a) ** 2;

/** Simple quadrature on [lo, hi] (for the tests and the finite-region readouts). */
export function integrate(f, lo, hi, n = 4000) {
  const dx = (hi - lo) / n;
  let sum = 0.5 * (f(lo) + f(hi));
  for (let i = 1; i < n; i++) sum += f(lo + i * dx);
  return sum * dx;
}
