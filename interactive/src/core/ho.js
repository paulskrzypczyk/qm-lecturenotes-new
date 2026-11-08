// The harmonic oscillator of Chapter 8 (pure maths, no DOM, so it can be tested).
// Units: lengths in ell = sqrt(hbar / M omega), energies in hbar omega (so V(x) = x^2 / 2).
import { integrate } from './gaussian.js';

/** Physicists' Hermite polynomial H_n(y) by recurrence. */
export function hermite(n, y) {
  let h0 = 1, h1 = 2 * y;
  if (n === 0) return h0;
  for (let k = 1; k < n; k++) { const h2 = 2 * y * h1 - 2 * k * h0; h0 = h1; h1 = h2; }
  return h1;
}

const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));

/** Normalised energy eigenfunction u_n(x) = (2^n n! sqrt(pi))^{-1/2} H_n(x) e^{-x^2/2}. */
export function u(n, x) {
  return Math.pow(Math.pow(2, n) * fact(n) * Math.sqrt(Math.PI), -0.5) * hermite(n, x) * Math.exp(-(x * x) / 2);
}

/** The potential V(x) = x^2 / 2 and the energies E_n = n + 1/2. */
export const V = (x) => (x * x) / 2;
export const E = (n) => n + 0.5;

/** The classical turning points ±x_t, where V(x_t) = E_n: x_t = sqrt(2n + 1). */
export const turning = (n) => Math.sqrt(2 * n + 1);

/** The probability of finding the particle in the classically forbidden region |x| > x_t. */
export const forbidden = (n) => 2 * integrate((x) => u(n, x) ** 2, turning(n), turning(n) + 12, 3000);
