// node test/isw.test.mjs — checks src/core/isw.js (Chapter 7).
import { u, E, psi, density, meanX, period } from '../src/core/isw.js';
import { integrate } from '../src/core/gaussian.js';
let fails = 0;
const close = (name, got, want, tol = 1e-4) => { if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); } };
for (let n = 1; n <= 6; n++) {
  close(`norm n=${n}`, integrate((x) => u(n, x) ** 2, 0, 1, 4000), 1);
  for (let m = 1; m <= 6; m++) if (m !== n) close(`orthogonal ${n},${m}`, integrate((x) => u(n, x) * u(m, x), 0, 1, 4000), 0);
  close(`boundary n=${n}`, u(n, 0) + u(n, 1), 0, 1e-9);
  // TISE: -u'' / (pi^2) = n^2 u  in these units (E_1 = pi^2 hbar^2 / 2ML^2 -> -u''/(2M) = E u with 2M = pi^2 / E_1 ...)
  const x = 0.37, h = 1e-4;
  const upp = (u(n, x + h) - 2 * u(n, x) + u(n, x - h)) / (h * h);
  close(`TISE n=${n}`, -upp / (Math.PI * Math.PI), E(n) * u(n, x), 1e-3);
}
// superposition: normalised at all times, <x>(t) matches the numerical mean, period as stated
for (const [n, m] of [[1, 2], [2, 3], [1, 3], [3, 6]]) for (const t of [0, 0.3, 1.1, 2.5]) {
  close(`norm sup ${n},${m} t=${t}`, integrate((x) => density(x, t, n, m), 0, 1, 4000), 1);
  close(`<x> ${n},${m} t=${t}`, integrate((x) => x * density(x, t, n, m), 0, 1, 4000), meanX(t, n, m), 1e-4);
  close(`period ${n},${m}`, density(0.3, t + period(n, m), n, m), density(0.3, t, n, m), 1e-9);
}
close('<x> eigenstate', integrate((x) => x * density(x, 0.7, 4), 0, 1, 4000), 0.5);
console.log(fails ? `${fails} failure(s)` : 'isw: all checks passed');
process.exit(fails ? 1 : 0);
