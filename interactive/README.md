# Interactive figures — visual identity & ground rules

**Version 1.0.3 · 5 Nov 2026** (see the changelog at the end). This document is the single source of truth for every interactive element in the QM notes. Each new widget follows it. When a widget needs something the rules don't cover, the rule is added or changed here first, and then applied to *all* existing widgets.

The rules are those of the QIT notes' widgets (their README v1.4), carried over so that both sets of notes share one visual identity; §2 (colour roles) and §6 (2D plots instead of the Bloch sphere) are what differs.

---

## 1. Purpose

1. **Teach, don't decorate.** Each widget makes one idea from the surrounding text explorable. If an interaction doesn't help with that idea, leave it out.
2. **The default view is the figure.** When the page loads, the widget looks like the static figure it replaces, so the caption and the text still describe exactly what is on screen. (Where a widget adds a panel to the original figure, the static figure is redrawn to match, and the caption updated.)
3. **The figure is never lost.** A static figure stays in the source as the `:placeholder:`. It is what appears in the PDF, and on the web if JavaScript fails.
4. **Notation matches the notes exactly.** Same symbols, same macros (`src/core/katex.js` mirrors `myst.yml`), same conventions: $\psi(x)$, $\tilde\psi(p)$, $\pd(x) = |\psi(x)|^2$, $\Delta x$, $\hbar$, $u_n(x)$, $E_n$.

## 2. Colour

All colours come from CSS custom properties defined once in `widgets/qm-widgets.css`. The neutral roles are derived from the MyST theme's own `--myst-color-*` variables, so widgets follow the site in light and dark mode automatically. Widget code never contains a hex value.

MyST draws each widget inside a *shadow root*, so the stylesheet cannot see the site's `html.dark` class. The shared card code copies it onto the widget as `data-theme="light"`/`"dark"` (and follows the theme toggle while the page is open); the few dark-mode values below hang off that attribute.

### Neutral roles

| Role | Used for | Light | Dark |
|---|---|---|---|
| `--qm-surface` | widget background | theme `bg` (#fff) | theme `bg` (#1c1917) |
| `--qm-surface-2` | control panel, tags | theme `bg-secondary` | theme `bg-secondary` |
| `--qm-border` | card border, dividers | theme `border` | theme `border` |
| `--qm-ink` | axes, markers, text | theme `prose-body` (#44403c) | theme `prose-body` (#d6d3d1) |
| `--qm-ink-muted` | secondary labels, hints | #6b7280 | #9ca3af |
| `--qm-focus` | keyboard focus rings, handle hover ring | theme `focus-ring` (#3b82f6) | theme `focus-ring` (#60a5fa) |

### Accent roles

At most **three accent colours in any one figure**, each with a fixed meaning across the whole course:

| Role | Meaning | Light | Dark |
|---|---|---|---|
| `--qm-accent-1` | **the** wavefunction / state: $\psi(x)$, $\psi(x,t)$, $u_n(x)$ and their probability densities | #2563eb | #3b82f6 |
| `--qm-accent-2` | a second or contrasting object: the momentum wavefunction $\tilde\psi(p)$, a second state, the state after a process | #ea580c | #ea580c |
| `--qm-accent-3` | the physics acting on the state: potentials $V(x)$, energy levels, operators; and action buttons | #0d9488 | #0d9488 |

These pass the dataviz palette checks in both modes (lightness band, chroma floor, ≥ 3:1 against the surface, colour-blind separation ΔE ≥ 13.8, normal-vision ΔE ≥ 19). Do not add a fourth accent: show an extra thing with a different mark (dashed, hollow) or split the idea over two figures. Red and green are kept free for "error/correct" feedback.

**Complex values.** Where a widget shows a complex wavefunction, the **phase is shown by hue** (the colour wheel of the notes' animations) and the modulus by height, with a small wheel legend in the corner. This is the one place a full hue range is used; it never carries any other meaning.

**Rules**

- Colour identifies objects. **Text is always set in ink colours** (so the in-figure labels $\psi(x)$, $x$, $a$ are ink even where the static figure coloured them). A coloured swatch or underline next to a readout links it to its object.
- Never rely on colour alone. Every coloured object also has a label or a distinct mark.
- Translucent fills only, never solid: 15% of the accent for a shaded area that carries meaning (a width, a probability), 8% for a background fill.

## 3. Typography

- **Interface text** (hints, button and checkbox labels) inherits the page font, at `0.875rem`, or `0.8125rem` for hints.
- **All mathematics is typeset with KaTeX 0.15.2**, the same version the site uses, with the macros copied from `myst.yml` (`src/core/katex.js`). Never write maths as Unicode approximations.
- **Numbers** have 2 decimal places (statistics 3), use `tabular-nums` and keep a fixed width so readouts don't jiggle. Negative numbers use a true minus sign (KaTeX does this).
- **Units.** The notes keep $a$, $\hbar$, $M$ symbolic, so a widget that must show numbers measures lengths in a named reference length ($a_0$ for the Gaussian; $L$ for the box; $\ell$ for the oscillator) and momenta in $\hbar$ over it, and says so in its note. The reference never clashes with a symbol the chapter already uses.
- **In-figure labels** are KaTeX in `--qm-ink`, at about 1.05× the text size (they scale with the canvas), and never sit on top of a line or a handle:
  - the function's name sits to the left of its vertical axis near the top; the variable sits under the right-hand end of its horizontal axis;
  - a marker on an axis is labelled under the axis; when two markers come close, their labels move outwards (`below-left` / `below-right`) rather than overlap;
  - **labels never overlap** each other, a handle or a line; a label is hidden if no clear spot exists.
- **Behind** is shown by the mark (dashed line), never by fading the text.

## 4. Anatomy of a widget

```
┌──────────────────────────────────────────────────────────┐
│ ◆ Interactive   hint text in muted ink             ↺ Reset│  ← toolbar
├───────────────────────────┬──────────────────────────────┤
│                           │  WIDTH   presets, sliders    │
│        figure canvas      │                              │
│        (SVG + labels)     │  SHOW    toggles             │
├───────────────────────────┴──────────────────────────────┤
│ ▌readout            ▌readout                              │  ← readouts (KaTeX),
│ ▌readout             readout                              │    two columns when wide
│ note                                                      │
└──────────────────────────────────────────────────────────┘
Figure 3.1: caption (written in MyST, as before)
```

- **Card.** 1px `--qm-border` border, 0.5rem radius, `--qm-surface` background, no shadow. It is full width in the text column.
- **Toolbar.** On the left, a small "Interactive" tag (pointer icon) and a one-line hint saying what can be dragged or changed. On the right, a **Reset** button, which every widget has.
- **Layout.** When the card is ≥ 640px wide, the canvas sits beside the controls, with the readouts in a full-width row underneath (in as many columns as fit, at least 17rem each). When narrower, everything stacks: canvas, controls, readouts. This uses CSS container queries, so it responds to the column width rather than the screen width. The canvas is square with a maximum size of 360px; a plot widget stacks its panels inside it (two 2:1 panels fit a square).
- **Controls** are grouped under small uppercase headings in muted ink (e.g. WIDTH, SHOW). A slider shows its KaTeX label ("$a = 1.00\,a_0$") on its own line above the slider, so the slider is always full width whatever the label's length.
- **Readouts** have a 3px bar in the colour of the object they describe; readouts that describe no single object have none. A readout is one short formula: it never scrolls, so a long expression is split into two readouts (the formula, then the value of its parameter).
- **Note.** A widget may end its readouts with one full-width line of explanation: page font in muted ink, maths in KaTeX (`note()` in `src/core/dom.js`). The note also names the units (§3).
- **Actions.** A button that *does* something, rather than set a value, is outlined in accent-3 with a ▶ icon. Presets and Reset are ordinary buttons.
- **Statistics** (`statsBars()` in `src/core/dom.js`), when a widget has random outcomes: probability as a translucent band, observed frequency as a solid bar, both to 3 decimal places.
- **Spacing.** Multiples of 0.25rem. Inner padding is 1rem; the gap between groups is 0.75rem.
- **Captions.** The caption stays in MyST. The hint lives in the toolbar, not in the caption.

## 5. Marks (SVG)

Stroke widths are in screen pixels and never scale (`vector-effect: non-scaling-stroke`). Handle radii are also in screen pixels: widgets track the canvas size and convert.

| Element | Spec |
|---|---|
| axes | `--qm-ink`, 1px (`.qm-plot-axis`); horizontal axis through $y = 0$, vertical axis through $x = 0$ |
| curve (a wavefunction) | role colour, 2px, round joins (`.qm-curve`) |
| probability density (shown with its wavefunction) | role colour, 1.5px, dashed `4 3`, 80% opacity (`.qm-density`) |
| construction lines (width markers, drop lines) | role colour, 1px, dashed `3 3`, 70% opacity (`.qm-construct`); a marker runs from the axis up to the curve |
| areas (a width, a probability, a classically forbidden region) | role colour, 15% fill, no stroke (`.qm-area`) |
| marked points | 4.5px radius, filled, with a 1.5px `--qm-surface` ring |
| draggable handle | 7px radius, role colour, 2px surface ring. Invisible 18px-radius hit area. On hover or keyboard focus, a 2px ring (radius 11px) in the theme's `focus-ring` colour. Never use a CSS `outline` inside the SVG: it is drawn in viewBox units and comes out hundreds of pixels wide. A handle that slides along an axis shows the `ew-resize` cursor |
| vectors (where used) | role colour, 2.5px, filled triangular arrowhead (10px long) |
| complex curves | phase by hue along the curve (§2), modulus as height |

## 6. 2D plots

- **Canvas.** One SVG with a `0 0 100 100` viewBox (`src/core/plot2d.js`), holding one or more **panels**; each panel has a box in viewBox units and its own data ranges. Two 2:1 panels stacked (each 86 × 36) is the standard layout for "$x$ above, $p$ below" or "wavefunction above, density below".
- **Axis ranges are fixed** while the reader changes a parameter, so a change of width or height is seen as such; ranges are chosen so the extreme settings still fit (the vertical range covers the tallest curve the controls allow).
- **Axes have no numbers.** Like the static figures, the axes carry only their variable and the markers that matter ($\pm a$, $\pm\hbar/2a$); the readouts carry the numbers.
- **Markers on an axis are the handles.** The reader drags the quantity itself (the width $a$ at its marker), with a slider and presets as the exact, keyboard-accessible alternative (§7).
- **Dragging empty canvas does nothing** (no view to rotate); the cursor is the default arrow.

## 7. Interaction

- **Direct manipulation first.** Drag the object itself. Every draggable thing also has an exact, keyboard-accessible alternative: a slider, or presets plus the arrow keys on its handle, with the exact value shown in a readout.
- **Drag targets are visible handles** with a resize or grab cursor.
- **Pointer Events** handle mouse, pen and touch. Use `touch-action: none` only on the canvas, so the page still scrolls elsewhere.
- **Presets** are a row of small buttons for the standard values. The active one is highlighted with accent-1.
- **Keyboard.** Every control is focusable in reading order. A focused handle responds to the arrow keys (one slider step, or a fine step with Shift), Home/End go to the ends, and the focus ring is always visible.
- **Motion.** Jumping to a preset animates over 300ms (ease-in-out). Dragging is immediate. A *demonstration* (an action that shows a process happening) takes 1.2s; its readouts update when it ends. With `prefers-reduced-motion`, nothing animates: the end state appears at once.
- **No hidden state.** Every quantity that changes is shown in a readout.
- **Randomness.** Random outcomes use `Math.random()` and are revealed only when a demonstration ends.

## 8. Accessibility

- The widget root has `role="group"` and an `aria-label` that names the figure.
- Sliders and handles have a label and an `aria-valuetext` that is read in words (e.g. "a equals 1.00 a nought").
- Colour is never the only way to tell objects apart (§2), and contrast is checked.
- All interface text meets WCAG AA: ink colours reach ≥ 4.5:1.

## 9. Embedding in the notes

````md
````{figure}
:label: f-gaussian
:placeholder: ./Pictures/gaussian-hup
:alt: …
:width: 320px
:align: center
```{anywidget} ./interactive/widgets/gaussian-hup.mjs
:css: ./interactive/widgets/qm-widgets.css
{ "a": 1 }
```
Caption.
````
````

- **Label and numbering.** The label and the figure number are unchanged, so existing cross-references still work.
- **`:placeholder:`** is the static figure, which the PDF export uses (`plugins/pdf-export.mjs` swaps it for `Pictures/pdf/<name>.pdf`, so give it no extension). Once a widget renders, the shared card code hides the placeholder image; if the widget never renders, the static figure stays visible.
- **Keep `:width:` and `:align:`**: they now only affect the placeholder, i.e. the PDF.
- **The JSON body** sets the widget's options. Every widget lists its options, with defaults, in its own section below.
- A static figure that is redrawn for a widget lives in `Pictures/<name>.svg` with its PDF in `Pictures/pdf/<name>.pdf` (drawn with matplotlib in the style of the existing figures: Computer Modern maths, the notes' blue `#0d6efd` and orange `#ee7219`).

## 10. Engineering

```
interactive/
  README.md            ← this document
  src/core/            ← shared code: card/controls (dom.js), KaTeX, SVG, 2D plots (plot2d.js),
                          number formatting, motion; and the maths, one file per topic (gaussian.js)
  src/<widget>.js      ← one file per widget
  widgets/             ← built files used by the site (committed): <widget>.mjs + qm-widgets.css
  preview/             ← one classic script with every widget + KaTeX, and test.html (not committed)
  test/                ← checks for the maths:  npm test
  build.mjs            ← esbuild script:  cd interactive && npm install && npm run build
```

- **Dependencies.** KaTeX is the only runtime dependency. It is loaded from the same CDN as the site's KaTeX stylesheet. Everything else is plain JavaScript and SVG, with no frameworks.
- **Shared code.** Widgets share all of their building blocks through `src/core/`. A widget file contains only its physics-specific layout; the maths lives in its own module with tests.
- **Shadow DOM.** MyST renders each widget in its own shadow root. Page stylesheets don't reach inside, so the card loads KaTeX's stylesheet into the shadow root (reusing the page's copy), and `qm-widgets.css` arrives through the directive's `:css:` option. CSS custom properties (the theme's colours) and inherited text styles do cross the boundary.
- **CSS scope.** Everything is namespaced: class names start with `qm-`, and all styles live in `qm-widgets.css`; there are no global rules.
- **Clean-up.** `render()` returns a clean-up function that removes listeners and observers (and un-hides the placeholder), as anywidget expects.
- **Rebuild after every change** (`npm run build`) and commit the files in `widgets/`: the site uses the built files, not `src/`, and the GitHub Action does not run this build. `node_modules/` and `preview/` are in `.gitignore`.
- **Size.** Each widget should stay under about 25 kB minified, not counting KaTeX.
- **Previewing.** `preview/test.html?model={...}&dark=1` mounts a widget from the preview bundle in a shadow root with the site's colour variables, for screenshots with Playwright.

## 11. Checklist before a widget ships

- [ ] The default view reproduces the static figure, and the caption is still accurate (for both the widget and the PDF placeholder).
- [ ] Light and dark mode both look right, including switching the theme toggle while the page is open.
- [ ] It works at 390px wide (stacked layout) and at full column width.
- [ ] Drag with mouse and touch; use the keyboard only (Tab, arrow keys, Home/End); Reset works.
- [ ] Move every control to its extremes: no two labels overlap, and no label sits on a line or handle; nothing leaves its panel.
- [ ] Readouts are correct. Check against the formulas in the chapter, and run `npm test`.
- [ ] The other widgets still look the same (shared code changes affect all of them).
- [ ] The placeholder is hidden on the web and present in the PDF export (`MYST_PDF=1 myst build --pdf`).
- [ ] `myst build` gives no new warnings.
- [ ] Check every rule in §2–§8 of this document.

---

## Widget catalogue

### `gaussian-hup` — Figure 3.1 (Chapter 3)

The Gaussian wavefunction $\psi(x)$ of equation (3.1) and its momentum wavefunction $\tilde\psi(p)$ of (3.3), one above the other, with the widths $\Delta x = a$ and $\Delta p = \hbar/2a$ marked. Changing $a$ squeezes one and stretches the other; the product $\Delta x\,\Delta p = \hbar/2$ never changes — the Gaussian saturates the HUP.

- **Objects:** $\psi(x)$ (accent-1) with dashed markers at $\pm a$; $\tilde\psi(p)$ (accent-2) with markers at $\pm\hbar/2a$; optionally the densities $\pd(x)$, $\pd(p)$ as dashed curves, with the band $-\Delta x \le x \le \Delta x$ (one standard deviation either side of the mean, between the dashed markers) and likewise $-\Delta p \le p \le \Delta p$ shaded under them.
- **Interactions:** drag the marker at $a$ on the $x$ axis, or the marker at $\hbar/2a$ on the $p$ axis (arrow keys on a focused marker: 0.05 $a_0$, Shift for 0.01); the slider $a$; presets $a_0/2$, $a_0$, $2a_0$ (animated); the toggle *probability densities*.
- **Readouts:** $\psi(x)$; $\tilde\psi(p)$; $a$; $\Delta x\,\Delta p = \hbar/2$; $\Delta x = a$; $\Delta p = \hbar/2a$; with the densities shown, the probability inside each band ($0.68$, the same for every $a$); a note on saturation and the units ($a_0$, $\hbar/a_0$).
- **Options** (JSON body; the defaults reproduce the static figure)

  | Option | Default | Meaning |
  |---|---|---|
  | `a` | 1 | the width $a$, in units of $a_0$ |
  | `a_min`, `a_max` | 0.5, 2 | range of the slider and markers |
  | `densities` | false | show the probability densities when the widget loads |

---

## Changelog

- **1.0.3 (5 Nov 2026)** — shaded areas are 15% of the role colour (§2, §5; 8% was too faint beside a dashed curve). `gaussian-hup`: with the densities shown, the bands $\pm\Delta x$ and $\pm\Delta p$ (one standard deviation either side of the mean, i.e. between the dashed markers) are shaded under the densities, and the probability inside each (0.68) is read out.
- **1.0.2 (5 Nov 2026)** — readouts never scroll (§4): the sideways scrollbars showed as permanent bars on Windows. `gaussian-hup`: $a$ moved out of the $\psi(x)$ line into its own readout; $\Delta p$ and $\hbar/2$ written inline.
- **1.0.1 (5 Nov 2026)** — slider labels sit above the slider instead of beside it (§4): a long label ("$a = 0.50\,a_0$") was squeezing the slider. `gaussian-hup`: the probability-density toggle now hides the curves again when unticked (SVG elements ignore `.hidden`).
- **1.0 (5 Nov 2026)** — first version for the QM notes: the QIT ground rules (v1.4) carried over with a `qm-` namespace, the colour roles for this course (§2) and a 2D-plot section (§6) in place of the Bloch sphere; shared plot code `src/core/plot2d.js`; first widget `gaussian-hup` (Figure 3.1), with a redrawn two-panel static figure for the PDF.
