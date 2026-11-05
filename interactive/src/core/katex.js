// KaTeX rendering for all widgets (ground rules §3).
// Same KaTeX version as the site's stylesheet, loaded from the same CDN.
// (The offline-preview build swaps this import for a bundled copy; see build.mjs.)
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.mjs';

// Keep in sync with `project.math` in myst.yml (plus \ket and \bra, which KaTeX
// provides on the site through its own physics-style macros).
export const MACROS = {
  '\\ket': '|#1\\rangle',
  '\\bra': '\\langle #1|',
  '\\infint': '\\int_{-\\infty}^{\\infty}',
  '\\vph': '\\vphantom{\\Bigg|}',
  '\\rI': '\\mathrm{I}',
  '\\rII': '\\mathrm{II}',
  '\\rIII': '\\mathrm{III}',
  '\\pd': '\\wp',
  '\\prob': '\\mathrm{prob}',
  '\\op': '\\hat{#1}_{\\mathrm{w}}',
  '\\inner': '\\langle #1 | #2 \\rangle',
  '\\av': '\\langle #1 \\rangle',
  '\\init': '\\mathrm{in}',
  '\\rR': '\\mathrm{R}',
  '\\rL': '\\mathrm{L}',
  '\\ivec': '\\boldsymbol{\\hat{\\imath}}',
  '\\jvec': '\\boldsymbol{\\hat{\\jmath}}',
  '\\kvec': '\\boldsymbol{\\hat{k}}',
  '\\rvec': '\\boldsymbol{r}',
  '\\pvec': '\\boldsymbol{p}',
  '\\Ebox': 'E_{\\text{box}}',
};

/** Typeset `src` into `el` (only touches the DOM when the output changes). */
export function tex(el, src, display = false) {
  const html = katex.renderToString(src, {
    displayMode: display,
    macros: { ...MACROS },
    throwOnError: false,
  });
  if (el._qmTex !== html) {
    el.innerHTML = html;
    el._qmTex = html;
  }
}
