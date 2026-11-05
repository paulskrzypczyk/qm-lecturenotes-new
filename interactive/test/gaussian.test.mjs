// node test/gaussian.test.mjs — checks the maths of src/core/gaussian.js against Chapter 3.
import { psi, psiTilde, deltaX, deltaP, density, densityP, integrate } from '../src/core/gaussian.js';

let fails = 0;
const close = (name, got, want, tol = 1e-4) => {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); }
};

for (const a of [0.5, 0.7, 1, 1.3, 2]) {
  // normalisation in x and p
  close(`norm x a=${a}`, integrate((x) => density(x, a), -40, 40), 1);
  close(`norm p a=${a}`, integrate((p) => densityP(p, a), -40, 40), 1);
  // means vanish, variances are a^2 and 1/(4 a^2)
  close(`<x> a=${a}`, integrate((x) => x * density(x, a), -40, 40), 0);
  close(`<p> a=${a}`, integrate((p) => p * densityP(p, a), -40, 40), 0);
  close(`<x^2> a=${a}`, integrate((x) => x * x * density(x, a), -40, 40), deltaX(a) ** 2);
  close(`<p^2> a=${a}`, integrate((p) => p * p * densityP(p, a), -40, 40), deltaP(a) ** 2);
  // the product saturates the HUP
  close(`HUP a=${a}`, deltaX(a) * deltaP(a), 0.5, 1e-12);
  // psi~ really is the Fourier transform of psi (equation (2.17)), checked at a few p
  for (const p of [-1.5, -0.4, 0, 0.8, 2]) {
    const re = integrate((x) => psi(x, a) * Math.cos(p * x), -40, 40) / Math.sqrt(2 * Math.PI);
    const im = integrate((x) => -psi(x, a) * Math.sin(p * x), -40, 40) / Math.sqrt(2 * Math.PI);
    close(`FT re a=${a} p=${p}`, re, psiTilde(p, a));
    close(`FT im a=${a} p=${p}`, im, 0);
  }
}
console.log(fails ? `${fails} failure(s)` : 'gaussian: all checks passed');
process.exit(fails ? 1 : 0);
