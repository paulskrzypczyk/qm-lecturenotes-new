# PDF export of the lecture notes

The notes can be exported to a single PDF in the style of the 2022 LaTeX notes
(Legrand-Orange-Book based: grey title banner, blue chapter numbers, margin
section numbers, Times body / Avant Garde headings, grey equation boxes,
"!" remarks).

## Rebuilding

Requirements: `myst` (mystmd ≥ 1.12) and a TeX distribution with `latexmk`
and `pdflatex` (TeX Live or MiKTeX; the packages used are standard:
times, avant, mdframed, titletoc, fancyhdr, tikz, xstring, datetime, …).
On Ubuntu/Debian: `texlive-latex-extra texlive-fonts-recommended latexmk`,
which is what `.github/workflows/deploy.yml` installs before building the
site, so the PDF is rebuilt on every push and never needs committing.
No Inkscape is needed: the figures come from the vector PDFs in
`Pictures/pdf/`.

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
that still contains the video boxes and exercises.)

## What goes into the PDF

Configured in `myst.yml` under `project.exports` (id `pdf`): chapters 1–11 and
the Gaussian-integrals appendix, each as a LaTeX chapter. The preface,
recap, problem sheets, problem-class sheets and licence are not included.

The plugin removes, for the PDF only: the video/slides boxes and iframes, all
dropdowns, the exercises and their "Exercises" headings, and the
"Updated: …" stamp. It also:

- renders `{card}` as the grey equation box, `{aside}` as a "!" remark, and the
  `{topic}` block as a titled Definition box; blockquotes become the
  blue-barred key-statement box (template);
- turns links to exercises into plain text ("the online exercises"), links to
  other pages into "Chapter N", and keeps explicit link text for internal
  references;
- wraps multi-line equations (those using `&`/`\\`) in `aligned` so they get a
  single equation number, as on the website;
- swaps each SVG figure for `Pictures/pdf/<name>.pdf` and each animated GIF
  for `Pictures/pdf/<name>-filmstrip.png` (four stills), adding a note to the
  caption.

All `**bold**` text is set in blue bold, like `\alert` in the old notes.

## Regenerating the figure assets

If an SVG in `Pictures/` changes, regenerate its PDF (any of these work):

```sh
rsvg-convert -f pdf -o Pictures/pdf/name.pdf Pictures/name.svg
inkscape Pictures/name.svg --export-type=pdf -o Pictures/pdf/name.pdf
```

The filmstrips were made with Pillow from frames 0, 30%, 60% and 100% of the
two wavepacket GIFs (2×2 grid) and from one oscillation period
(frames 0, 12, 25, 37) of `3D-box-p-x-y.gif`.

## Template files

- `template.tex` – the LaTeX template (jtex syntax: `[-doc.title-]`,
  `[- CONTENT -]`, …). Note that `[-` must not appear in LaTeX code; write
  `\makebox[{-2.5pt}]` rather than `\makebox[-2.5pt]`.
- `template.yml` – template metadata, options (`subtitle_text`, `year`) and
  the build engine (`-pdf` = pdflatex).
