// node test/density.test.mjs — checks the maths of src/core/density.js (Chapter 1).
import { psi, density, probability, bins, X_RANGE } from '../src/core/density.js';

let fails = 0;
const close = (name, got, want, tol = 1e-4) => {
  if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); }
};
// normalised, with pd >= 0 and psi real with a sign change
close('norm', probability(X_RANGE[0] - 4, X_RANGE[1] + 4, 8000), 1);
let min = 1, max = 0;
for (let x = -1; x <= 7; x += 0.01) { min = Math.min(min, psi(x)); max = Math.max(max, psi(x)); if (density(x) < 0) fails++; }
if (!(min < 0 && max > 0)) { fails++; console.log('FAIL psi should change sign'); }
// the outcomes of a coarse-grained measurement are a probability distribution, for any alignment
for (const dx of [0.05, 0.25, 0.7, 1.5]) for (const x0 of [-0.5, 1.3, 3.6, 5.9]) {
  const b = bins(x0, dx);
  close(`bins sum dx=${dx} x0=${x0}`, b.reduce((s, o) => s + o.p, 0), 1, 2e-3);
  if (!b.some((o) => Math.abs(o.a - x0) < 1e-9)) { fails++; console.log(`FAIL no bin starts at x0 (dx=${dx}, x0=${x0})`); }
  if (b[0].a > X_RANGE[0] + 1e-9 || b[b.length - 1].b < X_RANGE[1] - 1e-9) { fails++; console.log(`FAIL bins do not cover the range (dx=${dx})`); }
}
// pd(x0) dx approximates the exact probability, with an error that shrinks like dx^2
for (const x0 of [0.5, 2.0, 3.65, 4.4]) {
  const errs = [0.2, 0.1, 0.05].map((dx) => Math.abs(probability(x0, x0 + dx) - density(x0) * dx));
  if (!(errs[0] > errs[1] && errs[1] > errs[2])) { fails++; console.log(`FAIL error not decreasing at x0=${x0}: ${errs}`); }
}
console.log(fails ? `${fails} failure(s)` : 'density: all checks passed');
process.exit(fails ? 1 : 0);
