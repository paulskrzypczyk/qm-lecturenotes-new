// node test/step.test.mjs — checks src/core/step.js (Chapter 9).
import { k, kp, lambda, R, T, amplitudes, u } from '../src/core/step.js';
let fails = 0;
const close = (name, got, want, tol = 1e-6) => { if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); } };
for (const e of [0.2, 0.6, 0.999, 1.001, 1.5, 2.5, 4]) {
  // continuity of u and u' at x = 0
  const h = 1e-6;
  const l = u(-h, e), r = u(h, e);
  close(`continuity re e=${e}`, l.re, r.re, 1e-5); close(`continuity im e=${e}`, l.im, r.im, 1e-5);
  const dl = { re: (u(-h, e).re - u(-2 * h, e).re) / h, im: (u(-h, e).im - u(-2 * h, e).im) / h };
  const dr = { re: (u(2 * h, e).re - u(h, e).re) / h, im: (u(2 * h, e).im - u(h, e).im) / h };
  close(`derivative re e=${e}`, dl.re, dr.re, 1e-3); close(`derivative im e=${e}`, dl.im, dr.im, 1e-3);
  // TISE in both regions: -u'' = (e - V) u  (units V0 = 1, hbar^2/2M = 1 / ... with x in ell0: -u'' = (e - V(x)) u)
  for (const x of [-2.3, 1.7]) {
    const hh = 1e-4;
    const upp = (c) => (u(x + hh, e)[c] - 2 * u(x, e)[c] + u(x - hh, e)[c]) / (hh * hh);
    const Vx = x < 0 ? 0 : 1;
    close(`TISE re x=${x} e=${e}`, -upp('re'), (e - Vx) * u(x, e).re, 1e-3);
    close(`TISE im x=${x} e=${e}`, -upp('im'), (e - Vx) * u(x, e).im, 1e-3);
  }
  // R + T = 1, |B|^2 = R, and the formulas of the notes in terms of E/V0
  close(`R+T e=${e}`, R(e) + T(e), 1);
  const { B } = amplitudes(e);
  close(`|B|^2 = R e=${e}`, B.re ** 2 + B.im ** 2, R(e));
  if (e > 1) {
    const s = Math.sqrt(e), s1 = Math.sqrt(e - 1);
    close(`R formula e=${e}`, R(e), ((s - s1) / (s + s1)) ** 2);
    close(`T formula e=${e}`, T(e), (4 * s * s1) / (s + s1) ** 2);
  } else close(`R=1 below step e=${e}`, R(e), 1);
}
console.log(fails ? `${fails} failure(s)` : 'step: all checks passed');
process.exit(fails ? 1 : 0);
