// node test/ho.test.mjs — checks src/core/ho.js (Chapter 8).
import { hermite, u, V, E, turning, forbidden } from '../src/core/ho.js';
import { integrate } from '../src/core/gaussian.js';
let fails = 0;
const close = (name, got, want, tol = 1e-4) => { if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); } };
// Hermite polynomials against the table in the notes (h_n(y)): 1, 2y, 4y^2 - 2, 8y^3 - 12y
for (const y of [-1.3, 0.2, 2]) { close('H0', hermite(0, y), 1); close('H1', hermite(1, y), 2 * y); close('H2', hermite(2, y), 4 * y * y - 2); close('H3', hermite(3, y), 8 * y ** 3 - 12 * y); }
for (let n = 0; n <= 5; n++) {
  close(`norm n=${n}`, integrate((x) => u(n, x) ** 2, -12, 12, 8000), 1);
  for (let m = 0; m < n; m++) close(`orth ${n},${m}`, integrate((x) => u(n, x) * u(m, x), -12, 12, 8000), 0);
  // TISE in these units: -u''/2 + x^2 u / 2 = E_n u
  const x = 0.7, h = 1e-3;
  const upp = (u(n, x + h) - 2 * u(n, x) + u(n, x - h)) / (h * h);
  close(`TISE n=${n}`, -upp / 2 + V(x) * u(n, x), E(n) * u(n, x), 1e-4);
  close(`turning n=${n}`, V(turning(n)), E(n), 1e-12);
}
// the notes' u_1 = sqrt(2/sqrt(pi)) x e^{-x^2/2}
close('u1 formula', u(1, 0.9), Math.sqrt(2 / Math.sqrt(Math.PI)) * 0.9 * Math.exp(-0.81 / 2));
close('forbidden ground state', forbidden(0), 0.1573, 1e-3);   // erfc(1)
console.log(fails ? `${fails} failure(s)` : 'ho: all checks passed');
process.exit(fails ? 1 : 0);
