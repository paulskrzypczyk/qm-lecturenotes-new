// Stills of the interactive figures for the PDF (ground rules §12): screenshots of each widget's canvas
// (light theme, 3x) at chosen states, composed into one PNG per figure (a 2x2 grid for the
// time-dependent ones), written to Pictures/pdf/<placeholder-base>-widget.png with a sidecar
// <base>-widget.json carrying the caption note that plugins/pdf-export.mjs appends. Needs Playwright
// (`npm i -D playwright` once) and Python with Pillow. Run `node stills.mjs [base ...]` after changing
// a widget's look; the preview bundle must be built first (`npm run build`).
import { chromium } from 'playwright';   // npm i -D playwright (not a dependency of the build)
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'Pictures', 'pdf');
const TMP = path.join(HERE, 'preview', '.stills');
mkdirSync(TMP, { recursive: true });

// base = the placeholder image's basename (what the plugin looks up); frames = [{model, label}]
const FIGS = {
  'prob-density': { widget: 'prob-density', frames: [{ model: {} }], note: 'A still of the interactive figure in the online notes.' },
  'complex-circ': { widget: 'plane-wave', frames: [{ model: {} }], note: 'A still of the interactive figure in the online notes, in which the helix can be turned and the probe moved.' },
  'gaussian-hup': { widget: 'gaussian-hup', frames: [{ model: {} }], note: 'A still of the interactive figure in the online notes.' },
  'Gaussian-wavepacket': { widget: 'wavepacket', grid: [2, 2], frames: [{ model: { t: 0 } }, { model: { t: 2 } }, { model: { t: 4 } }, { model: { t: 6 } }], note: 'Four stills, at $t = 0$, $2\\tau$, $4\\tau$ and $6\\tau$ with $\\tau = 2Ma^2/\\hbar$, of the interactive figure in the online notes.' },
  'eigenstates-inf-sq-well': { widget: 'isw', frames: [{ model: { n: 3 } }], note: 'A still of the interactive figure in the online notes, showing $n = 3$.' },
  'eigenstates-ho': { widget: 'ho', frames: [{ model: { n: 3 } }], note: 'A still of the interactive figure in the online notes, showing $n = 3$.' },
  'right-moving-scattering-phase': { widget: 'step', frames: [{ model: { e: 1.6 } }], note: 'A still of the interactive figure in the online notes, at $E = 1.6\\,V_0$.' },
  'finite-step-scattering': { widget: 'scatter', grid: [2, 2], frames: [{ model: { t: 0 } }, { model: { t: 6.5 } }, { model: { t: 10 } }, { model: { t: 20 } }], note: 'Four stills, at $t = 0$, $6.5\\tau_0$, $10\\tau_0$ and $20\\tau_0$ with $\\tau_0 = \\hbar/V_0$, of the interactive figure in the online notes ($E_0 = 1.5\\,V_0$, $a = 4\\,\\ell_0$).' },
  '3D-box-p-x-y': { widget: 'box3d', grid: [2, 2], frames: [{ model: { t: 0 } }, { model: { t: 0.26 } }, { model: { t: 0.52 } }, { model: { t: 0.78 } }], note: 'Four stills over one period of the interactive figure in the online notes.' },
};

const only = process.argv.slice(2);
const b = await chromium.launch();
for (const [base, fig] of Object.entries(FIGS)) {
  if (only.length && !only.includes(base)) continue;
  const files = [];
  for (let i = 0; i < fig.frames.length; i++) {
    const ctx = await b.newContext({ viewport: { width: 760, height: 900 }, deviceScaleFactor: 3 });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => console.log('PAGEERROR', base, e.message));
    const q = fig.frames[i].model && Object.keys(fig.frames[i].model).length ? '&model=' + encodeURIComponent(JSON.stringify(fig.frames[i].model)) : '';
    await p.goto(`file://${path.join(HERE, 'preview', 'test.html')}?w=${fig.widget}${q}`);
    await p.waitForTimeout(900);
    const el = p.locator('.qm-canvas').first();
    const f = `${TMP}/${base}-${i}.png`;
    const bb = await el.boundingBox();
    // labels below the lower axis hang outside the canvas box: include a margin
    await p.screenshot({ path: f, clip: { x: bb.x - 8, y: bb.y - 4, width: bb.width + 16, height: bb.height + 30 } });
    files.push(f);
    await ctx.close();
  }
  // compose with PIL (grid or single), trimming each frame's transparent/white margins a little
  const [cols, rows] = fig.grid || [1, 1];
  const out = `${OUT}/${base}-widget.png`;
  execFileSync('python3', ['-c', `
import sys
from PIL import Image
files = sys.argv[1].split(','); cols, rows = int(sys.argv[2]), int(sys.argv[3]); out = sys.argv[4]
ims = [Image.open(f).convert('RGB') for f in files]
w = max(i.width for i in ims); h = max(i.height for i in ims); gap = 36
W = cols * w + (cols - 1) * gap; H = rows * h + (rows - 1) * gap
canvas = Image.new('RGB', (W, H), 'white')
for k, im in enumerate(ims):
    x = (k % cols) * (w + gap); y = (k // cols) * (h + gap)
    canvas.paste(im, (x, y))
canvas.save(out, optimize=True)
print(out, canvas.size)
`, files.join(','), String(cols), String(rows), out]);
  writeFileSync(`${OUT}/${base}-widget.json`, JSON.stringify({ note: fig.note, frames: fig.frames.length }, null, 2) + '\n');
}
await b.close();
