// node test/scatter.test.mjs — checks src/core/scatter.js (Chapter 9, the scattering packet).
import { makePacket, tabulate, evolve, psiAt, probability, grid } from '../src/core/scatter.js';
let fails = 0;
const close = (name, got, want, tol = 1e-6) => { if (Math.abs(got - want) > tol) { fails++; console.log(`FAIL ${name}: got ${got}, want ${want}`); } };

const xs = grid(-150, 150, 6001);   // nk = 512 below puts the periodic images of the k grid beyond it
const out = { re: new Float64Array(xs.length), im: new Float64Array(xs.length) };

for (const [e0, a] of [[1.6, 2], [2.5, 1.5], [0.8, 3], [4, 1]]) {   // k0 >= 4 sigma_k, so the packet starts as the free Gaussian
  const x0 = -10;
  const P = makePacket({ e0, a, x0, nk: 512 });
  const tab = tabulate(P, xs);
  // at t = 0 the packet is the free Gaussian of width a centred on x0 (its tails at the step are negligible)
  evolve(P, tab, 0, out);
  close(`norm t=0 e0=${e0} a=${a}`, probability(xs, out, -150, 150), 1, 5e-3);
  for (const x of [x0 - a, x0, x0 + 0.7 * a]) {
    const i = xs.findIndex((v) => Math.abs(v - x) < 1e-9);
    const want = Math.exp(-((x - x0) ** 2) / (2 * a * a)) / Math.sqrt(2 * Math.PI * a * a);
    close(`|psi(x,0)|^2 x=${x} e0=${e0} a=${a}`, out.re[i] ** 2 + out.im[i] ** 2, want, 4e-3);
  }
  // the time-dependent Schrödinger equation i d psi/dt = -psi'' + V psi (units: 2M = hbar = V0 = 1)
  for (const [x, t] of [[-3.3, 2], [1.7, 3], [-0.4, 2.5]]) {
    const h = 2e-3, ht = 1e-3;
    const f = (xx, tt) => psiAt(P, xx, tt);
    const c = f(x, t), xp = f(x + h, t), xm = f(x - h, t), tp = f(x, t + ht), tm = f(x, t - ht);
    const dre = (tp.re - tm.re) / (2 * ht), dim = (tp.im - tm.im) / (2 * ht);
    const ppre = (xp.re - 2 * c.re + xm.re) / (h * h), ppim = (xp.im - 2 * c.im + xm.im) / (h * h);
    const V = x < 0 ? 0 : 1;
    // i (dre + i dim) = -dim + i dre  ==  (-ppre + V c.re) + i (-ppim + V c.im)
    const scale = Math.max(1e-3, c.mod);
    close(`TDSE re x=${x} t=${t} e0=${e0}`, -dim / scale, (-ppre + V * c.re) / scale, 5e-2);
    close(`TDSE im x=${x} t=${t} e0=${e0}`, dre / scale, (-ppim + V * c.im) / scale, 5e-2);
  }
  // the norm is conserved and, long after the collision, the probability on the left is the packet-averaged R
  const tLate = 10 / (2 * Math.sqrt(e0)) + 15;
  evolve(P, tab, tLate, out);
  close(`norm late e0=${e0} a=${a}`, probability(xs, out, -150, 150), 1, 5e-3);
  close(`P(x<0) late = rbar e0=${e0} a=${a}`, probability(xs, out, -150, 0), P.rbar, 1e-2);
}
console.log(fails ? `${fails} failure(s)` : 'scatter: all checks pass');
process.exit(fails ? 1 : 0);
