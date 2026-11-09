// The scattering of a Gaussian wavepacket off the potential step (Chapter 9), pure maths, no DOM.
// Units as in step.js: V0 = 1, hbar = 1 and lengths in ell0 = hbar / sqrt(2 M V0), so that E = k^2
// (i.e. 2M = 1) and the group velocity is 2k; time is in tau0 = hbar / V0.
//
// The packet is the superposition of right-moving energy eigenstates of the notes,
//
//   psi(x, t) = (1 / sqrt(2 pi)) INT phi(k) u_k(x) e^{-i k^2 t} dk,
//   phi(k)    = (2 a^2 / pi)^{1/4} exp(-a^2 (k - k0)^2) exp(-i k x0),
//
// written over k = sqrt(E / V0) rather than E, with u_k(x) = u_E^R(x) from step.js. Far from the step
// u_k(x) = e^{ikx} + (a packet that has not arrived yet), so at t = 0 this is the free Gaussian of
// width a centred on x0 < 0 with mean momentum k0 = sqrt(E0 / V0). The components below the step
// (k < 1) are kept, so that the low-energy tail of the packet reflects with the evanescent penetration
// of its eigenfunctions. The integral is a sum over nk equally spaced k > 0; phi is renormalised on that
// grid so that the discretised packet has unit norm exactly (Parseval).
import { u, R, amplitudes, kp, lambda } from './step.js';

const SIGMAS = 4.5;   // the k grid spans k0 +- SIGMAS sigma_k, sigma_k = 1 / 2a

/** The packet's k grid and weights: {ks, wre, wim, dk, rbar} for E0/V0 = e0, width a and start x0. */
export function makePacket({ e0, a, x0, nk = 256 }) {
  const k0 = Math.sqrt(e0), sk = 1 / (2 * a);
  const kmin = Math.max(1e-3, k0 - SIGMAS * sk), kmax = k0 + SIGMAS * sk;
  const dk = (kmax - kmin) / (nk - 1);
  const ks = new Float64Array(nk), wre = new Float64Array(nk), wim = new Float64Array(nk);
  let norm = 0;
  for (let j = 0; j < nk; j++) {
    const k = kmin + j * dk;
    ks[j] = k;
    const g = Math.exp(-a * a * (k - k0) * (k - k0));
    norm += g * g;
  }
  norm *= dk;                                   // sum |phi|^2 dk, to be made 1
  const amp = 1 / Math.sqrt(norm);
  let rbar = 0;
  for (let j = 0; j < nk; j++) {
    const k = ks[j];
    const g = amp * Math.exp(-a * a * (k - k0) * (k - k0));   // |phi(k)| on the grid, normalised
    rbar += g * g * R(k * k) * dk;
    const c = (g * dk) / Math.sqrt(2 * Math.PI);                // phi dk / sqrt(2 pi), then the e^{-i k x0}
    wre[j] = c * Math.cos(-k * x0);
    wim[j] = c * Math.sin(-k * x0);
  }
  return { ks, wre, wim, dk, rbar, k0, a, x0 };
}

/** The eigenfunctions u_k(x_i) tabulated on the grid xs: {ure, uim} flattened as [j * nx + i]. */
export function tabulate(packet, xs) {
  const nk = packet.ks.length, nx = xs.length;
  const ure = new Float64Array(nk * nx), uim = new Float64Array(nk * nx);
  // the same formulas as u() in step.js, with the amplitudes found once per k (this runs on every slider move)
  for (let j = 0; j < nk; j++) {
    const kk = packet.ks[j], e = kk * kk;
    const { B, C } = amplitudes(e);
    const kq = kp(e), lm = lambda(e);
    const off = j * nx;
    for (let i = 0; i < nx; i++) {
      const x = xs[i];
      let re, im;
      if (x < 0) {              // e^{ikx} + B e^{-ikx}
        const c = Math.cos(kk * x), sn = Math.sin(kk * x);
        re = c + B.re * c + B.im * sn;
        im = sn - B.re * sn + B.im * c;
      } else if (e > 1) {       // C e^{ik'x}
        const c = Math.cos(kq * x), sn = Math.sin(kq * x);
        re = C.re * c - C.im * sn;
        im = C.re * sn + C.im * c;
      } else {                  // C e^{-lambda x}
        const g = Math.exp(-lm * x);
        re = C.re * g; im = C.im * g;
      }
      ure[off + i] = re; uim[off + i] = im;
    }
  }
  return { ure, uim, nx };
}

/** psi(x_i, t) on the tabulated grid, written into out.re / out.im (Float64Arrays of length nx). */
export function evolve(packet, table, t, out) {
  const { ks, wre, wim } = packet, { ure, uim, nx } = table, nk = ks.length;
  out.re.fill(0); out.im.fill(0);
  for (let j = 0; j < nk; j++) {
    const ph = -ks[j] * ks[j] * t;
    const c = Math.cos(ph), sn = Math.sin(ph);
    const cre = wre[j] * c - wim[j] * sn, cim = wre[j] * sn + wim[j] * c;   // phi(k) e^{-i k^2 t} dk / sqrt(2 pi)
    const off = j * nx;
    for (let i = 0; i < nx; i++) {
      const ar = ure[off + i], ai = uim[off + i];
      out.re[i] += cre * ar - cim * ai;
      out.im[i] += cre * ai + cim * ar;
    }
  }
  return out;
}

/** psi(x, t) at a single point (slow; for tests and spot values). */
export function psiAt(packet, x, t) {
  const { ks, wre, wim } = packet;
  let re = 0, im = 0;
  for (let j = 0; j < ks.length; j++) {
    const ph = -ks[j] * ks[j] * t, c = Math.cos(ph), sn = Math.sin(ph);
    const cre = wre[j] * c - wim[j] * sn, cim = wre[j] * sn + wim[j] * c;
    const v = u(x, ks[j] ** 2);
    re += cre * v.re - cim * v.im;
    im += cre * v.im + cim * v.re;
  }
  const TAU = 2 * Math.PI;
  return { re, im, mod: Math.hypot(re, im), phase: ((Math.atan2(im, re) % TAU) + TAU) % TAU };
}

/**
 * The probability INT_lo^hi |psi|^2 dx on the grid (trapezoid rule). A cell that straddles lo or hi is
 * clipped, with the density interpolated linearly to the limit, so that P(x<0) + P(x>0) = 1 whether
 * or not x = 0 is a grid point.
 */
export function probability(xs, out, lo, hi) {
  let p = 0;
  for (let i = 1; i < xs.length; i++) {
    let x0 = xs[i - 1], x1 = xs[i];
    if (x1 <= lo || x0 >= hi) continue;
    let d0 = out.re[i - 1] ** 2 + out.im[i - 1] ** 2, d1 = out.re[i] ** 2 + out.im[i] ** 2;
    if (x0 < lo) { d0 = d0 + ((d1 - d0) * (lo - x0)) / (x1 - x0); x0 = lo; }
    if (x1 > hi) { d1 = d0 + ((d1 - d0) * (hi - x0)) / (x1 - x0); x1 = hi; }
    p += ((d0 + d1) / 2) * (x1 - x0);
  }
  return p;
}


/**
 * The incident and reflected parts of the packet, tabulated separately on the grid xs for x < 0:
 * e^{ikx} (the incoming plane waves) and B e^{-ikx} (the reflected ones), so that evolve() with
 * either table gives psi_in(x, t) or psi_ref(x, t) there. (For x >= 0 both are zero.)
 */
export function tabulateParts(packet, xs) {
  const nk = packet.ks.length, nx = xs.length;
  const inc = { ure: new Float64Array(nk * nx), uim: new Float64Array(nk * nx), nx };
  const ref = { ure: new Float64Array(nk * nx), uim: new Float64Array(nk * nx), nx };
  for (let j = 0; j < nk; j++) {
    const kk = packet.ks[j], { B } = amplitudes(kk * kk), off = j * nx;
    for (let i = 0; i < nx; i++) {
      const x = xs[i];
      if (x >= 0) continue;
      const c = Math.cos(kk * x), sn = Math.sin(kk * x);
      inc.ure[off + i] = c; inc.uim[off + i] = sn;
      ref.ure[off + i] = B.re * c + B.im * sn;      // B e^{-ikx}
      ref.uim[off + i] = B.im * c - B.re * sn;
    }
  }
  return { inc, ref };
}

/** The weight p = INT_lo^hi |psi|^2 dx and the mean position <x> = INT x |psi|^2 dx / p on the grid. */
export function meanX(xs, out, lo, hi) {
  let p = 0, m = 0;
  for (let i = 1; i < xs.length; i++) {
    let x0 = xs[i - 1], x1 = xs[i];
    if (x1 <= lo || x0 >= hi) continue;
    let d0 = out.re[i - 1] ** 2 + out.im[i - 1] ** 2, d1 = out.re[i] ** 2 + out.im[i] ** 2;
    if (x0 < lo) { d0 = d0 + ((d1 - d0) * (lo - x0)) / (x1 - x0); x0 = lo; }
    if (x1 > hi) { d1 = d0 + ((d1 - d0) * (hi - x0)) / (x1 - x0); x1 = hi; }
    const w = x1 - x0;
    p += ((d0 + d1) / 2) * w;
    m += ((d0 * x0 + d1 * x1) / 2) * w;
  }
  return { p, mean: p > 0 ? m / p : NaN };
}

/** An equally spaced grid of n points from x0 to x1 (inclusive). */
export const grid = (x0, x1, n) => Float64Array.from({ length: n }, (_, i) => x0 + ((x1 - x0) * i) / (n - 1));
