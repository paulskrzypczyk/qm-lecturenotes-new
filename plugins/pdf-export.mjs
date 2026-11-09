// MyST plugin: transforms applied ONLY when building the PDF/LaTeX export.
//
// Activate with the environment variable MYST_PDF=1, e.g.
//     MYST_PDF=1 myst build --pdf          (macOS / Linux)
//     set MYST_PDF=1 && myst build --pdf   (Windows cmd)
//     $env:MYST_PDF=1; myst build --pdf    (Windows PowerShell)
//
// Without MYST_PDF the plugin does nothing, so the website build is unaffected.
//
// What it does (see templates/latex/qm-notes/template.tex for the matching LaTeX):
//   * removes the video/slides boxes, iframes, dropdowns, exercises and the
//     "Exercises" headings, and the "Updated: ..." stamp;
//   * turns {card} into the grey equation box  (eqBox),
//     {aside} into a "!" remark                 (remark),
//     {topic} into a titled definition box      (definition);
//   * links to removed exercises become plain text; links to other pages
//     become "Chapter N"; abbreviations become plain text;
//   * multi-line equations are wrapped in aligned (one equation number);
//   * SVG figures are pointed at the vector PDFs in Pictures/pdf, and the
//     animated GIFs at the filmstrip PNGs there.

import fs from 'node:fs';
import path from 'node:path';

const ACTIVE = !!process.env.MYST_PDF;

/** Plain-text content of a node (for headings / titles). */
function toText(node) {
  if (!node) return '';
  if (typeof node.value === 'string') return node.value;
  return (node.children || []).map(toText).join('');
}

const raw = (tex) => ({ type: 'raw', tex });
const text = (value) => ({ type: 'text', value });

/** Which nodes to drop entirely. */
function shouldRemove(node) {
  switch (node.type) {
    case 'iframe':
    case 'exercise':
    case 'details':
      return true;
    case 'admonition':
      return node.kind === 'important' || node.kind === 'tip';
    case 'div':
      return typeof node.class === 'string' && /updated-date|web-only/.test(node.class);
    case 'code':
    case 'outputs':
    case 'output':
      return node.executable === true || node.type !== 'code';   // live (thebe) cells are web-only
    case 'heading':
      return toText(node).trim() === 'Exercises';
    case 'paragraph':
      return /^Updated: \d/.test(toText(node));
    default:
      return false;
  }
}

/** Map a page link such as "02-momentum" or "/free-particle" to a chapter name. */
function chapterNameFromUrl(url) {
  const base = path.basename(url.replace(/\.md$/, ''));
  const m = base.match(/^(\d\d)-/);
  if (m) return `Chapter ${parseInt(m[1], 10)}`;
  if (/gaussian-integrals/.test(base)) return 'Appendix A';
  return null;
}

/** Does the math value contain alignment (& or \\) outside any sub-environment? */
/** A tab title like "Quantum state $\\ket{\\psi}$" as text and inlineMath children (for the bold heading). */
function parseTitle(title, kind = 'strong') {
  const parts = String(title).split(/(\$[^$]+\$)/).filter(Boolean).map((p) =>
    p.startsWith('$') ? { type: 'inlineMath', value: p.slice(1, -1) } : { type: 'text', value: p });
  return kind ? { type: kind, children: parts } : { type: 'span', children: parts };
}

function needsAligned(value) {
  const trimmed = value.trim();
  if (/^\\begin\{(equation|multline|gather|align|alignat|flalign|eqnarray)\*?\}/.test(trimmed)) return false;
  const stripped = trimmed.replace(/\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}/g, '');
  return /&|\\\\/.test(stripped);
}

function wrapAligned(value) {
  let v = value.replace(/\\nonumber/g, '').trim();
  v = v.replace(/(\\\\\s*)+$/, '').trim(); // drop trailing line breaks
  return `\\begin{aligned}\n${v}\n\\end{aligned}`;
}

/** Rewrite an image URL to the PDF/filmstrip asset if one exists. Returns {url, filmstrip}. */
function rewriteImage(url, dir) {
  if (!url || /^https?:/.test(url)) return null;
  const ext = path.extname(url).toLowerCase();
  const base = path.basename(url, ext);
  // a figure that is interactive on the site: stills of the widget itself (made by stills.mjs), with a
  // sidecar JSON giving the caption note and the number of frames
  const still = `./Pictures/pdf/${base}-widget.png`;
  if (fs.existsSync(path.join(dir, still))) {
    let meta = {};
    try { meta = JSON.parse(fs.readFileSync(path.join(dir, `./Pictures/pdf/${base}-widget.json`), 'utf8')); } catch { /* no sidecar */ }
    return { url: still, widget: true, frames: meta.frames ?? 1, note: meta.note ?? 'A still of the interactive figure in the online notes.' };
  }
  if (ext === '.gif') {
    const candidate = `./Pictures/pdf/${base}-filmstrip.png`;
    if (fs.existsSync(path.join(dir, candidate))) return { url: candidate, filmstrip: true };
    return null;
  }
  if (ext === '.svg' || ext === '') {
    const candidate = `./Pictures/pdf/${base}.pdf`;
    if (fs.existsSync(path.join(dir, candidate))) return { url: candidate, filmstrip: false };
  }
  return null;
}

/** Recursively transform a node's children (in place). */
function transformChildren(node, dir, stats) {
  if (!node.children) return;
  const out = [];
  for (const child of node.children) {
    if (shouldRemove(child)) {
      stats.removed[child.type] = (stats.removed[child.type] || 0) + 1;
      continue;
    }
    const replacement = transformNode(child, dir, stats);
    if (child.type === 'image' && node.type !== 'container') {
      // a bare {image} directive: centre it like a figure
      out.push(raw('\\begin{center}\n'), replacement, raw('\\end{center}\n'));
      continue;
    }
    if (Array.isArray(replacement)) out.push(...replacement);
    else out.push(replacement);
  }
  node.children = out;
}

/** Transform one node; may return a node or an array of nodes. */
function transformNode(node, dir, stats) {
  // Handle children first (so nested cards/asides etc. are converted too)
  transformChildren(node, dir, stats);

  switch (node.type) {
    case 'card': {
      stats.cards++;
      return [raw('\\begin{eqBox}\n'), ...node.children, raw('\n\\end{eqBox}\n')];
    }
    case 'aside': {
      const titleNode = node.children.find((c) => c.type === 'admonitionTitle');
      const body = node.children.filter((c) => c.type !== 'admonitionTitle');
      const title = titleNode ? toText(titleNode).trim() : '';
      if (node.kind === 'topic') {
        stats.topics++;
        const label = node.identifier || node.label;
        const head = `\\begin{definition}${title ? `[${title}]` : ''}${label ? `\\label{${label}}` : ''}\n`;
        return [raw(head), ...body, raw('\n\\end{definition}\n')];
      }
      stats.asides++;
      const head = title
        ? `\\begin{remark}\\textbf{${title.replace(/\.$/, '')}.} `
        : '\\begin{remark}';
      // Flatten the first paragraph so the title and the text sit on the same line
      return [raw(head), ...body, raw('\n\\end{remark}\n')];
    }
    case 'abbreviation': {
      return node.children.length ? node.children : text(toText(node));
    }
    case 'anywidget': {
      // the interactive widgets: a derivation stepper becomes its lines of maths with the
      // justifications; everything else is web-only (figures keep their placeholder image)
      const m = node.model || {};
      if (Array.isArray(m.steps)) {
        const out = [];
        if (m.intro) out.push({ type: 'paragraph', children: [parseTitle(m.intro, 'emphasis')] });
        for (const st of m.steps) {
          out.push(raw(`\\begin{align*}${st.math}\\end{align*}`));   // unnumbered, so the chapter's equation numbers are unchanged
          if (st.why) out.push({ type: 'paragraph', children: [parseTitle(st.why, 'emphasis')] });
        }
        return out;
      }
      return [];
    }
    case 'tabSet': {
      // tabs become consecutive blocks, each headed by its tab title in bold
      const out = [];
      for (const item of node.children || []) {
        if (item.type !== 'tabItem') continue;
        out.push({ type: 'paragraph', children: [parseTitle(item.title || '')] });
        out.push(...(item.children || []));
      }
      return out;
    }
    case 'crossReference': {
      // glossary terms ({term} roles): the glossary page is not in the PDF, so plain text
      if (String(node.identifier || '').startsWith('term-')) return node.children || [];
      return node;
    }
    case 'link': {
      const url = node.url || '';
      if (url === '#dirac-delta-function') {
        // the {topic} box is rendered as raw LaTeX, so the MyST target no longer exists
        return node.children.length ? node.children : text('the Dirac delta function');
      }
      if (url.startsWith('#ex-')) {
        stats.exerciseLinks++;
        return node.children.length ? node.children : text('the online exercises');
      }
      if (url.startsWith('#') && node.children.length) {
        // explicit link text to a label: myst-to-tex would replace the text by
        // "Section 4.3.2" / "(1.13)", so write the hyperlink ourselves
        const label = url.slice(1);
        if (/^e-/.test(label)) {
          return [...node.children, text(' ('), raw(`\\ref{${label}}`), text(')')];
        }
        return [raw(`\\hyperref[${label}]{`), ...node.children, raw('}')];
      }
      if (/^wiki:|wikipedia\.org\//.test(url)) {
        // {wiki} hover links are a web nicety: plain text in the PDF
        return node.children.length ? node.children : text(node.title || url);
      }
      if (!url.startsWith('#') && !/^(https?:|mailto:)/.test(url)) {
        // internal page link
        const name = chapterNameFromUrl(url);
        if (node.children.length) return node.children;
        return text(name || url);
      }
      return node;
    }
    case 'math': {
      if (typeof node.value === 'string' && needsAligned(node.value)) {
        node.value = wrapAligned(node.value);
        stats.aligned++;
      }
      return node;
    }
    case 'image': {
      const r = rewriteImage(node.url, dir);
      if (r) {
        node.url = r.url;
        node.urlSource = r.url;
        if (r.filmstrip) {
          node.width = '90%';
          node.filmstrip = true;
          stats.filmstrips++;
        }
        if (r.widget) {
          node.width = r.frames > 1 ? '85%' : '60%';
          node.widgetNote = r.note;
          stats.filmstrips++;
        }
        stats.images++;
      }
      return node;
    }
    case 'container': {
      // Add a note to the caption of filmstrip figures
      const img = node.children.find((c) => c.type === 'image' && (c.filmstrip || c.widgetNote));
      if (img) {
        const cap = node.children.find((c) => c.type === 'caption');
        const para = cap?.children?.find((c) => c.type === 'paragraph');
        if (para) {
          const note = img.widgetNote ?? 'Four stills from the animation in the online notes.';
          // the note may contain $...$ maths
          const parts = note.split(/(\$[^$]+\$)/);
          for (const part of parts) {
            if (!part) continue;
            if (part.startsWith('$')) para.children.push({ type: 'inlineMath', value: part.slice(1, -1) });
            else para.children.push(text(part));
          }
          para.children.unshift(...[]);
          para.children.splice(para.children.length - parts.filter(Boolean).length, 0, text(' '));
        }
      }
      return node;
    }
    default:
      return node;
  }
}

const pdfTransform = {
  name: 'qm-pdf-export',
  stage: 'document',
  plugin: (opts, utils) => (tree, vfile) => {
    if (!ACTIVE) return;
    const dir = path.dirname(vfile.path);
    const stats = { removed: {}, cards: 0, asides: 0, topics: 0, exerciseLinks: 0, aligned: 0, images: 0, filmstrips: 0 };
    transformChildren(tree, dir, stats);
    const removed = Object.entries(stats.removed)
      .map(([k, v]) => `${k}×${v}`)
      .join(' ');
    console.log(
      `[pdf-export] ${path.basename(vfile.path)}: removed {${removed}}; cards ${stats.cards}, asides ${stats.asides}, topics ${stats.topics}, aligned ${stats.aligned}, images ${stats.images} (filmstrips ${stats.filmstrips}), exercise links ${stats.exerciseLinks}`,
    );
  },
};

/** Abbreviations (TISE, HUP, ...) are inserted by MyST after the document stage;
 *  flatten them to plain text so LaTeX does not need the glossaries package. */
function flattenAbbreviations(node) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    flattenAbbreviations(child);
    if (child.type === 'abbreviation') return child.children?.length ? child.children : [text(toText(child))];
    return [child];
  });
}

const abbreviationTransform = {
  name: 'qm-pdf-export-abbreviations',
  stage: 'project',
  plugin: (opts, utils) => (tree, vfile) => {
    if (!ACTIVE) return;
    flattenAbbreviations(tree);
  },
};

const plugin = {
  name: 'QM lecture notes PDF export',
  transforms: [pdfTransform, abbreviationTransform],
};

export default plugin;
