# PDF export of the lecture notes

The notes can be exported to a single PDF whose layout follows the 2022 LaTeX
notes (Legrand-Orange-Book based: grey title banner, coloured chapter numbers
with a rule, margin section numbers, grey equation boxes, "!" remarks), with
Times for the body and Fira Sans for headings, labels and running heads.

## Rebuilding

Requirements: `myst` (mystmd ≥ 1.12) and a TeX distribution with `latexmk`
and `pdflatex` (TeX Live or MiKTeX; the packages used are standard: times,
FiraSans, mdframed, titletoc, fancyhdr, tikz, xstring, datetime, natbib, …).
On Ubuntu/Debian:
`texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra latexmk`
(Fira Sans is in `texlive-fonts-extra`), which is what
`.github/workflows/deploy.yml` installs before building the site, so the PDF
is rebuilt on every push and never needs committing. No Inkscape is needed:
the figures come from the files in `Pictures/pdf/`.

From the repository root:

```sh
MYST_PDF=1 myst build --pdf          # macOS / Linux
set MYST_PDF=1 && myst build --pdf   # Windows (cmd)
$env:MYST_PDF=1; myst build --pdf    # Windows (PowerShell)
```

The result is written to `exports/QM-lecture-notes.pdf`.

`MYST_PDF=1` switches on `plugins/pdf-export.mjs`. Without it the plugin does
nothing, so the normal website build (`myst build --html`, GitHub Pages) is
unaffected. (Building with `--pdf` but *without* the variable produces a PDF
that still contains the video boxes, the exercises and the web-only material.)

## What goes into the PDF

Configured in `myst.yml` under `project.exports` (id `pdf`): chapters 1–11 and
the Gaussian-integrals appendix, each as a LaTeX chapter. The preface, recap,
glossary, problem sheets, problem-class sheets and the licence page of the
website are not included. The template itself adds, after the chapters:

- a **Bibliography** of the original papers cited in the notes
  (`references.bib`, author–year, `plainnat`);
- a **Licence** page: the CC BY-NC-ND 4.0 terms in plain words, a pointer to
  the full legal code and to the online notes, and a suggested citation.

Both are unnumbered chapters with the same banner as the numbered ones. The
title page carries the University of Bristol logo and a short licence notice
at its foot, and every page has a small grey footer line with the title, the
copyright, the licence and the address of the online notes.

The plugin removes, for the PDF only: the video/slides boxes and iframes, all
dropdowns, the exercises and their "Exercises" headings, the "Updated: …"
stamp, everything inside a `{div}` with `:class: web-only` (concept checks,
the reading-progress switch, the "Try it yourself" text), live code cells and
their outputs, and the interactive widgets themselves. It also:

- renders `{card}` as the grey equation box, `{aside}` as a "!" remark, and the
  `{topic}` block as a titled Definition box; blockquotes become the
  bar-marked key-statement box (template);
- turns links to exercises into plain text ("the online exercises"), links to
  other pages into "Chapter N", keeps explicit link text for internal
  references, and prints Wikipedia (`wiki:`) links and glossary terms as plain
  text;
- prints a step-by-step derivation widget as an unnumbered `align*` with its
  justifications in italics, and a tab set as consecutive blocks with bold
  titles;
- wraps multi-line equations (those using `&`/`\\`) in `aligned` so they get a
  single equation number, as on the website;
- swaps each figure's image for its print version (next section), adding a
  note to the caption where the figure is interactive online.

## Figures in the PDF

For each figure the plugin looks in `Pictures/pdf/`, in this order:

1. `<name>-widget.png` — **stills of the interactive figure itself**, with a
   sidecar `<name>-widget.json` holding the note that is appended to the
   caption ("A still of the interactive figure in the online notes…"). Used
   for the nine interactive figures: a 2×2 grid of frames for the
   time-dependent ones (6.1, 9.5, 11.1), a single frame for the rest. `<name>`
   is the basename of the figure's `:placeholder:` image.
2. `<name>-filmstrip.png` — four stills of an animated GIF (the older route,
   kept as a fallback).
3. `<name>.pdf` — the vector copy of a static SVG.

To regenerate:

```sh
# a static SVG that has changed
rsvg-convert -f pdf -o Pictures/pdf/name.pdf Pictures/name.svg

# the stills of the interactive figures, after a widget's look has changed
cd interactive && npm run build && node stills.mjs          # all of them
cd interactive && npm run build && node stills.mjs name     # one figure
```

`stills.mjs` needs Playwright (`npm i -D playwright`, once) and Python with
Pillow; the frames taken for each figure are listed at the top of the script.
See `interactive/README.md` §12.

The static figures use the same colours as the interactive ones (a
wavefunction or density blue, a potential or energy level teal, a second
object orange), so recolour an SVG by editing its hex values, not with a
filter, and regenerate its PDF.

## Colours and type

Set near the top of `template.tex`:

| Name | Value | Used for |
|---|---|---|
| `maincolor` | `#1D4ED8` | chapter numbers and rules, section numbers, `**bold**` highlights, web addresses |
| `linkorange` | `#EA580C` | internal cross-references (equations, figures, sections) |
| `citeteal` | `#0D9488` | citations |

`maincolor` is a shade deeper than the blue of the wavefunctions in the
figures (`#2563EB`); the orange and the teal are the figures' other two accent
colours. All `**bold**` text is set in `maincolor` bold, like `\alert` in the
old notes. To change the heading font, replace `\usepackage{FiraSans}` by
another package that sets the sans-serif family (and make sure the Action
installs it).

## Template files

- `template.tex` – the LaTeX template (jtex syntax: `[-doc.title-]`,
  `[- CONTENT -]`, `[# if … #]`). Note that `[-` must not appear in LaTeX
  code; write `\makebox[{-2.5pt}]` rather than `\makebox[-2.5pt]`. A package
  listed under `packages:` in `template.yml` is *not* loaded by MyST: it must
  be `\usepackage`d here.
- `template.yml` – template metadata, the document parts it uses (title,
  authors, bibliography), options (`subtitle_text`, `year`), the files copied
  into the build, and the build engine (`-pdf` = pdflatex).
- `UoB_RGB_24.png` – the University of Bristol logo for the title page (a copy
  of `Pictures/UoB_RGB_24.png`; the template can only use files in its own
  folder). The logo is a trade mark of the University and is not covered by
  the notes' licence.

The wording of the Licence page, the footer line and the title-page notice is
in `template.tex` (search for `LICENCE` and `licenceline`); the address of the
online notes appears there four times.
