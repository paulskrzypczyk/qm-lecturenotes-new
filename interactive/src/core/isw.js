// The infinite square well of Chapter 7 (pure maths, no DOM, so it can be tested).
// Units: lengths in L, energies in E_1 = pi^2 hbar^2 / 2ML^2, time in hbar/E_1 (hbar = 1).

/** Energy eigenfunction u_n(x) = sqrt(2/L) sin(n pi x / L) inside the well, 0 outside. */
export function u(n, x) {
  if (x < 0 || x > 1) return 0;
  return Math.SQRT2 * Math.sin(n * Math.PI * x);
}

/** Energy E_n = n^2 E_1. */
export const E = (n) => n * n;

/**
 * psi(x, t) for the equal superposition (|E_n> + |E_m>)/sqrt(2) (or the eigenstate |E_n> when m is
 * null): {re, im, mod, phase}. Each term evolves with e^{-i E t / hbar}.
 */
export function psi(x, t, n, m = null) {
  let re = u(n, x) * Math.cos(-E(n) * t), im = u(n, x) * Math.sin(-E(n) * t);
  if (m !== null) {
    re = (re + u(m, x) * Math.cos(-E(m) * t)) / Math.SQRT2;
    im = (im + u(m, x) * Math.sin(-E(m) * t)) / Math.SQRT2;
  }
  const mod = Math.hypot(re, im);
  const TAU = 2 * Math.PI;
  return { re, im, mod, phase: ((Math.atan2(im, re) % TAU) + TAU) % TAU };
}

export const density = (x, t, n, m = null) => psi(x, t, n, m).mod ** 2;

/** <x>(t) for the superposition: L/2 + cross term; for an eigenstate, L/2. */
export function meanX(t, n, m = null) {
  if (m === null || m === n) return 0.5;
  // <u_n| x |u_m> = (2/L) int_0^L x sin(n pi x/L) sin(m pi x/L) dx
  const I = (a, b) => (a === b ? 0.5 : (1 / (Math.PI * Math.PI)) * ((Math.cos((a - b) * Math.PI) - 1) / ((a - b) ** 2) - (Math.cos((a + b) * Math.PI) - 1) / ((a + b) ** 2)));
  const x_nm = I(n, m);
  return 0.5 + x_nm * Math.cos((E(m) - E(n)) * t);
}

/** The period of the oscillation of the superposition of levels n and m: 2 pi hbar / (E_m - E_n). */
export const period = (n, m) => (2 * Math.PI) / Math.abs(E(m) - E(n));
