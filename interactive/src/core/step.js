// Scattering off a potential step (Chapter 9), pure maths. Units: V0 = 1, hbar = 1, and lengths in
// ell0 = hbar / sqrt(2 M V0), so that k = sqrt(E/V0) and k' = sqrt(E/V0 - 1) (or lambda = sqrt(1 - E/V0)).

/** Wavenumbers for energy e = E/V0. */
export const k = (e) => Math.sqrt(e);
export const kp = (e) => (e > 1 ? Math.sqrt(e - 1) : 0);
export const lambda = (e) => (e < 1 ? Math.sqrt(1 - e) : 0);

/** The reflection coefficient R = |B|^2 (1 for E < V0) and T = 1 - R. */
export function R(e) {
  if (e <= 1) return 1;
  const a = k(e), b = kp(e);
  return ((a - b) / (a + b)) ** 2;
}
export const T = (e) => 1 - R(e);

/** The amplitudes B (reflected) and C (transmitted) as complex numbers {re, im}, with A = 1. */
export function amplitudes(e) {
  const a = k(e);
  if (e > 1) {
    const b = kp(e);
    return { B: { re: (a - b) / (a + b), im: 0 }, C: { re: (2 * a) / (a + b), im: 0 } };
  }
  // E < V0:  B = -(lambda + ik)/(lambda - ik),  C = -2ik/(lambda - ik)
  const l = lambda(e);
  const d = l * l + a * a;                       // |lambda - ik|^2
  // (lambda + ik)(lambda + ik) / d  = (l^2 - k^2 + 2 i l k)/d, with the minus sign
  const B = { re: -(l * l - a * a) / d, im: -(2 * l * a) / d };
  // -2ik (lambda + ik) / d = (2k^2 - 2 i l k)/d
  const C = { re: (2 * a * a) / d, im: -(2 * l * a) / d };
  return { B, C };
}

/** The right-moving eigenfunction u_E^R(x) as {re, im, mod, phase}. */
export function u(x, e) {
  const { B, C } = amplitudes(e);
  const a = k(e);
  let re, im;
  if (x < 0) {
    // e^{ikx} + B e^{-ikx}
    re = Math.cos(a * x) + B.re * Math.cos(-a * x) - B.im * Math.sin(-a * x);
    im = Math.sin(a * x) + B.re * Math.sin(-a * x) + B.im * Math.cos(-a * x);
  } else if (e > 1) {
    const b = kp(e);
    re = C.re * Math.cos(b * x) - C.im * Math.sin(b * x);
    im = C.re * Math.sin(b * x) + C.im * Math.cos(b * x);
  } else {
    const g = Math.exp(-lambda(e) * x);
    re = C.re * g; im = C.im * g;
  }
  const mod = Math.hypot(re, im);
  const TAU = 2 * Math.PI;
  return { re, im, mod, phase: ((Math.atan2(im, re) % TAU) + TAU) % TAU };
}
