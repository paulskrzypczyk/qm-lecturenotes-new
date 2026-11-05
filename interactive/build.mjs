// Build every widget (ground rules §10).
//
//   cd interactive && npm install && npm run build
//
// Outputs
//   widgets/<name>.mjs      ES module used by the site (` ```{anywidget} ` directive).
//                           KaTeX is NOT bundled: it is imported from the CDN, same version as the site.
//   preview/qm-widgets.js  One classic script with every widget + KaTeX, for the offline preview
//                           (pages opened from disk can't load ES modules). Exposes window.QMWidgets.
import * as esbuild from 'esbuild';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, 'src');
const names = readdirSync(src)
  .filter((f) => f.endsWith('.js') && statSync(path.join(src, f)).isFile())
  .map((f) => f.replace(/\.js$/, ''));

const KATEX_CDN = /^https:\/\/cdn\.jsdelivr\.net\/npm\/katex@[^/]+\/dist\/katex\.mjs$/;
const common = { bundle: true, minify: true, target: ['es2020'], legalComments: 'none', logLevel: 'info' };

// 1. Site build: one ES module per widget.
for (const name of names) {
  await esbuild.build({
    ...common,
    entryPoints: [path.join(src, `${name}.js`)],
    outfile: path.join(here, 'widgets', `${name}.mjs`),
    format: 'esm',
    external: ['https://*'],
  });
}

// 2. Offline-preview build: everything in one IIFE, with KaTeX bundled from node_modules.
const localKatex = {
  name: 'local-katex',
  setup(b) {
    b.onResolve({ filter: KATEX_CDN }, () => ({ path: path.join(here, 'node_modules/katex/dist/katex.mjs') }));
  },
};
const entry = [
  ...names.map((n, i) => `import w${i} from './src/${n}.js';`),
  `const all = { ${names.map((n, i) => `'${n}': w${i}`).join(', ')} };`,
  `function mount(host, name, model, cssHref) {`,
  `  const data = Object.assign({}, model || {});`,
  `  const m = { get: (k) => data[k], set: (k, v) => { data[k] = v; }, on() {}, off() {} };`,
  `  const root = host.shadowRoot || host.attachShadow({ mode: 'open' });`,
  `  const el = document.createElement('div');`,
  `  el.style.position = 'relative';`,
  `  root.replaceChildren(el);`,
  `  if (cssHref) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = cssHref; el.append(l); }`,
  `  return all[name].render({ model: m, el });`,
  `}`,
  `window.QMWidgets = { widgets: all, mount };`,
].join('\n');
await esbuild.build({
  ...common,
  stdin: { contents: entry, resolveDir: here, sourcefile: 'preview-entry.js' },
  outfile: path.join(here, 'preview', 'qm-widgets.js'),
  format: 'iife',
  plugins: [localKatex],
});
