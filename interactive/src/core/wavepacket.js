// The free Gaussian wavepacket of Chapter 6 (pure maths, no DOM, so it can be tested).
// Units: lengths in a0, momenta in hbar/a0, masses in a reference mass M0, and time in
// tau = 2 M0 a0^2 / hbar, so that with a = a0 and M = M0 the width is alpha(t) = a sqrt(1 + t^2).
// Internally hbar = a0 = M0 = 1 and the physical time is T = 2 t.
//
//   psi(x, T) = (2 pi a^2)^{-1/4} beta^{-1/2} exp( -(x - p0 T/M)^2 / (4 a^2 beta) + i p0 x - i p0^2 T / 2M ),
//   beta = 1 + i T / (2 M a^2),
//
// which is equation (6.x) with the phase factor e^{i phi(x,t)} written out.

/** Physical time from the time in units of tau. */
const T = (t) => 2 * t;

/** The width Delta x(t) = alpha(t) = a sqrt(1 + hbar^2 T^2 / 4 M^2 a^4). */
export const alpha = (t, { a, M }) => a * Math.sqrt(1 + (T(t) / (2 * M * a * a)) ** 2);

/** The centre <x>(t) = p0 T / M. */
export const centre = (t, { p0, M }) => (p0 * T(t)) / M;

/** psi(x, t) as {re, im, mod, phase} (phase in [0, 2 pi)). */
export function psi(x, t, { a, p0, M }) {
  const Tt = T(t);
  const bi = Tt / (2 * M * a * a);          // beta = 1 + i bi
  const b2 = 1 + bi * bi;                   // |beta|^2
  const u = x - (p0 * Tt) / M;
  // -(u^2 / 4a^2) / beta  =  -(u^2 / 4a^2) (1 - i bi) / |beta|^2
  const g = -(u * u) / (4 * a * a * b2);
  const re = g;                              // real part of the exponent
  let im = -g * bi + p0 * x - (p0 * p0 * Tt) / (2 * M);
  im -= Math.atan2(bi, 1) / 2;               // from beta^{-1/2}
  const mod = Math.pow(2 * Math.PI * a * a, -0.25) * Math.pow(b2, -0.25) * Math.exp(re);
  const TAU = 2 * Math.PI;
  const phase = ((im % TAU) + TAU) % TAU;
  return { re: mod * Math.cos(phase), im: mod * Math.sin(phase), mod, phase };
}

/** The probability density pd(x, t) = |psi|^2. */
export const density = (x, t, prm) => psi(x, t, prm).mod ** 2;
