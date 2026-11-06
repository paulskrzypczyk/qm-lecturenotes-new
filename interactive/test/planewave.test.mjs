// node test/planewave.test.mjs — checks the maths of src/core/planewave.js (Chapter 2).
import { psi, phase, wavenumber, momentum, hue } from '../src/core/planewave.js';

let fails = 0;
const close = (name, got, want, tol = 1e-9) => {
  if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); }
};
for (const lam of [0.5, 1.2, 3, -1.2]) for (const A of [0.25, 1]) for (const x of [-2, 0, 0.3, 1.2, 5.9]) {
  const v = psi(x, A, lam);
  close(`|psi| lam=${lam} A=${A} x=${x}`, Math.hypot(v.re, v.im), A);                // modulus is A everywhere
  const w = psi(x + lam, A, lam);
  close(`period re lam=${lam} x=${x}`, w.re, v.re, 1e-9); close(`period im`, w.im, v.im, 1e-9);   // period lambda
  const ph = phase(x, lam);
  if (ph < 0 || ph >= 2 * Math.PI) { fails++; console.log(`FAIL phase out of range: ${ph}`); }
  close(`phase matches psi lam=${lam} x=${x}`, Math.atan2(v.im, v.re), Math.atan2(Math.sin(ph), Math.cos(ph)), 1e-9);
}
close('k', wavenumber(2), Math.PI);
close('p = hbar k', momentum(1.2), 2 * Math.PI / 1.2);
if (!(momentum(-1.2) < 0)) { fails++; console.log('FAIL negative lambda should give p < 0'); }
if (hue(0) !== 'hsl(0 90% 50%)' || hue(Math.PI) !== 'hsl(180 90% 50%)') { fails++; console.log('FAIL hue mapping', hue(0), hue(Math.PI)); }
console.log(fails ? `${fails} failure(s)` : 'planewave: all checks passed');
process.exit(fails ? 1 : 0);
