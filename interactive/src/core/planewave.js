// The complex plane wave of Chapter 2 (pure maths, no DOM, so it can be tested).
// psi(x) = A e^{2 pi i x / lambda}, with lambda signed: lambda < 0 is the wave e^{-2 pi i x/|lambda|},
// i.e. negative momentum. Lengths in units of a reference length a0, momenta in hbar/a0.

/** Wavenumber k = 2 pi / lambda (so that psi = A e^{ikx}); lambda = 0 is not allowed. */
export const wavenumber = (lambda) => (2 * Math.PI) / lambda;

/** de Broglie: p = h / lambda = hbar k, in units of hbar/a0 with lambda in a0. */
export const momentum = (lambda) => wavenumber(lambda);

/** The phase 2 pi x / lambda, reduced to [0, 2 pi). */
export function phase(x, lambda) {
  const TAU = 2 * Math.PI;
  return (((TAU * x) / lambda) % TAU + TAU) % TAU;
}

/** psi(x) as {re, im}. */
export function psi(x, A, lambda) {
  const th = (2 * Math.PI * x) / lambda;
  return { re: A * Math.cos(th), im: A * Math.sin(th) };
}

/** Phase by hue (ground rules §2): the colour wheel of the notes, red at 0, cyan at pi. */
export function hue(theta) {
  const deg = ((theta * 180) / Math.PI) % 360;
  return `hsl(${((deg % 360) + 360) % 360} 90% 50%)`;
}
