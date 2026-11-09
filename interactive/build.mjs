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
import { readdirSync, statSync, writeFileSync, cpSync, mkdirSync } from 'node:fs';
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

// 3. The preview harness beside the bundle: a test page (…/preview/test.html?w=<widget>&model=<json>&dark=1)
//    and KaTeX's stylesheet and fonts from node_modules, so that the page works from file:// with no
//    network. The whole preview/ folder is generated and git-ignored; stills.mjs uses it for the PDF.
mkdirSync(path.join(here, 'preview'), { recursive: true });
cpSync(path.join(here, 'node_modules/katex/dist/katex.min.css'), path.join(here, 'preview/katex.min.css'));
cpSync(path.join(here, 'node_modules/katex/dist/fonts'), path.join(here, 'preview/fonts'), { recursive: true });
writeFileSync(path.join(here, 'preview/test.html'), String.raw`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="katex.min.css">
<style>
  :root { --myst-color-bg:#fff; --myst-color-bg-secondary:#f9fafb; --myst-color-border:#e5e7eb; --myst-color-prose-body:#44403c; --myst-color-focus-ring:#3b82f6; }
  html.dark { --myst-color-bg:#1c1917; --myst-color-bg-secondary:#292524; --myst-color-border:#44403c; --myst-color-prose-body:#d6d3d1; --myst-color-focus-ring:#60a5fa; background:#1c1917; }
  body { margin:0; padding:16px; font-family: system-ui, sans-serif; background: var(--myst-color-bg); color: var(--myst-color-prose-body); }
  figure { margin: 0 auto; max-width: 800px; }
  figcaption { font-size: 0.9rem; margin-top: .5rem; }
</style></head><body>
<figure><img id="ph" src="../../Pictures/gaussian.svg" alt="placeholder" style="width:400px"><div id="host"></div>
<figcaption>Caption…</figcaption></figure>
<script src="qm-widgets.js"></script>
<script>
  const params = new URLSearchParams(location.search);
  if (params.get('dark')) document.documentElement.classList.add('dark');
  const model = params.get('model') ? JSON.parse(params.get('model')) : {};
  const name = params.get('w') || 'gaussian-hup';
  window.cleanup = QMWidgets.mount(document.getElementById('host'), name, model, '../widgets/qm-widgets.css');
</script></body></html>`);
