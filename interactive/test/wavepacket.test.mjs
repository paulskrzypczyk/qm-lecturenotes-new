// node test/wavepacket.test.mjs — checks the free Gaussian wavepacket of src/core/wavepacket.js (Chapter 6).
import { psi, density, alpha, centre } from '../src/core/wavepacket.js';
import { integrate } from '../src/core/gaussian.js';

let fails = 0;
const close = (name, got, want, tol = 1e-4) => {
  if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); }
};
for (const prm of [{ a: 1, p0: 1, M: 1 }, { a: 0.5, p0: 0, M: 1 }, { a: 2, p0: 1.5, M: 0.5 }, { a: 0.7, p0: 0.3, M: 2 }]) {
  for (const t of [0, 0.4, 1, 3]) {
    const lo = centre(t, prm) - 12 * alpha(t, prm), hi = centre(t, prm) + 12 * alpha(t, prm);
    const f = (x) => density(x, t, prm);
    close(`norm ${JSON.stringify(prm)} t=${t}`, integrate(f, lo, hi, 8000), 1);
    close(`<x> t=${t}`, integrate((x) => x * f(x), lo, hi, 8000), centre(t, prm));
    const m2 = integrate((x) => (x - centre(t, prm)) ** 2 * f(x), lo, hi, 8000);
    close(`Delta x t=${t}`, Math.sqrt(m2), alpha(t, prm));
    // at t = 0 it is the initial Gaussian with phase p0 x
    if (t === 0) {
      const v = psi(0.3, 0, prm);
      close('phase at t=0', Math.atan2(v.im, v.re), Math.atan2(Math.sin(prm.p0 * 0.3), Math.cos(prm.p0 * 0.3)));
    }
  }
  // Schrodinger equation i d/dT psi = -(1/2M) d^2/dx^2 psi, T = 2t, checked by finite differences
  for (const [x, t] of [[0.3, 0.5], [1.2, 1.2], [-0.4, 2]]) {
    const h = 1e-3, k = 1e-3;
    const p = (xx, tt) => psi(xx, tt, prm);
    const dT = { re: (p(x, t + k / 2).re - p(x, t - k / 2).re) / (2 * k), im: (p(x, t + k / 2).im - p(x, t - k / 2).im) / (2 * k) };   // d/dT = (d/dt)/2
    const dxx = { re: (p(x + h, t).re - 2 * p(x, t).re + p(x - h, t).re) / (h * h), im: (p(x + h, t).im - 2 * p(x, t).im + p(x - h, t).im) / (h * h) };
    // i (dT.re + i dT.im) = -dT.im + i dT.re  must equal  -(1/2M)(dxx.re + i dxx.im)
    const scale = Math.max(1e-6, Math.hypot(dxx.re, dxx.im) / (2 * prm.M));
    close(`SE re x=${x} t=${t}`, (-dT.im + dxx.re / (2 * prm.M)) / scale, 0, 2e-3);
    close(`SE im x=${x} t=${t}`, (dT.re + dxx.im / (2 * prm.M)) / scale, 0, 2e-3);
  }
}
console.log(fails ? `${fails} failure(s)` : 'wavepacket: all checks passed');
process.exit(fails ? 1 : 0);
