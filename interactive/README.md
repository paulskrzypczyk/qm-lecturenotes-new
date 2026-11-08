# Interactive figures — visual identity & ground rules

**Version 1.5 · 9 Nov 2026** (see the changelog at the end). This document is the single source of truth for every interactive element in the QM notes. Each new widget follows it. When a widget needs something the rules don't cover, the rule is added or changed here first, and then applied to *all* existing widgets.

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
- **Units.** The notes keep $a$, $\hbar$, $M$ symbolic, so a widget that must show numbers measures lengths in a named reference length ($a_0$ for a general wavefunction, Chapters 1–3 and 6; $L$ for the box; $\ell$ for the oscillator) and momenta in $\hbar$ over it; where the mass or time appear, masses are in a reference mass $M_0$ and time in $\tau = 2M_0a_0^2/\hbar$ (so that the Gaussian's width is $a_0\sqrt{1+t^2}$ for $a = a_0$, $M = M_0$). The note says so. The reference never clashes with a symbol the chapter already uses.
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
- **Widgets without a canvas** (concept checks, derivation steppers, reading progress) add the class `qm-no-canvas`: the body becomes one column and the toolbar, controls and readouts keep their places.
- **Statistics** (`statsBars()` in `src/core/dom.js`), when a widget has random outcomes: probability as a translucent band, observed frequency as a solid bar, both to 3 decimal places.
- **Spacing.** Multiples of 0.25rem. Inner padding is 1rem; the gap between groups is 0.75rem.
- **Captions.** The caption stays in MyST. The hint lives in the toolbar, not in the caption.

## 5. Marks (SVG)

Stroke widths are in screen pixels and never scale (`vector-effect: non-scaling-stroke`). Handle radii are also in screen pixels: widgets track the canvas size and convert.

| Element | Spec |
|---|---|
| axes | `--qm-ink`, 1px (`.qm-plot-axis`); horizontal axis through $y = 0$, vertical axis through $x = 0$ |
| curve (a wavefunction) | role colour, 2px, round joins (`.qm-curve`) |
| probability density (shown with its wavefunction) | role colour, 1.5px, dashed `4 3`, 80% opacity (`.qm-density`); a density drawn on its own, or *instead of* the wavefunction, is a plain solid curve |
| construction lines (width markers, drop lines) | role colour, 1px, dashed `3 3`, 70% opacity (`.qm-construct`); a marker runs from the axis up to the curve |
| areas (a width, a probability, a classically forbidden region) | role colour, 15% fill, no stroke (`.qm-area`) |
| marked points | 4.5px radius, filled, with a 1.5px `--qm-surface` ring |
| draggable handle | 7px radius, role colour, 2px surface ring. Invisible 18px-radius hit area. On hover or keyboard focus, a 2px ring (radius 11px) in the theme's `focus-ring` colour. Never use a CSS `outline` inside the SVG: it is drawn in viewBox units and comes out hundreds of pixels wide. A handle that slides along an axis shows the `ew-resize` cursor |
| vectors (where used) | role colour, 2.5px, filled triangular arrowhead (10px long) |
| complex curves | phase by hue along the curve (§2), modulus as height: the curve is drawn as short segments, each with its own `hsl()` stroke (`.qm-hue-seg`, 2.5px); the half of a helix behind its axis is thinner and fainter (`.qm-behind`: 1.75px, 50%) |
| modulus coloured by phase | $|\psi(x)|$ drawn as a line of that height, coloured by the phase (`.qm-hue-seg.qm-hue-line`, 4px), with a ring legend (`.qm-hue-ring`, 5px) labelled $0, \pi/2, \pi, 3\pi/2$ |
| outcomes of a coarse-grained measurement | histogram bars in accent-3: 1.5px outline, 8% fill (`.qm-bars`) |
| an approximating rectangle | role colour, 1.5px outline, no fill (`.qm-rect`) |
| 3D axes | ink, 1px, with a small filled arrowhead (`.qm-axis3`); the label of an axis seen end-on is hidden |
| energy levels | accent-3 lines (dashed `.qm-construct` between the turning points of a potential, solid `.qm-op-axis` on a bare ladder); on a bare ladder the chosen level is accent-1 and thicker; across a potential, where the accent-1 eigenfunction is drawn on its level, the chosen level stays accent-3 but is solid and thicker (`.qm-level.qm-on`), and the function's baseline is a thin ink axis (`.qm-plot-axis`) across the panel, so that nothing blue is mistaken for the wavefunction; each level is a button (`.qm-level`: pointer cursor, thicker on hover, focus colour on the keyboard focus) |
| potential and walls | accent-3 2px lines; the region where the potential is infinite or classically forbidden is an accent-3 area at 15% |
| heat-map | a `<canvas>` drawn into an SVG `<image>`: a sequential ramp from `--qm-surface` to accent-1 (gamma 0.8), repainted when the theme changes; the panel has an ink outline |

## 6. 2D plots

- **Canvas.** One SVG with a `0 0 100 100` viewBox (`src/core/plot2d.js`), holding one or more **panels**; each panel has a box in viewBox units and its own data ranges. Two 2:1 panels stacked (each 86 × 36) is the standard layout for "$x$ above, $p$ below" or "wavefunction above, density below".
- **Axis ranges are fixed** while the reader changes a parameter, so a change of width or height is seen as such; ranges are chosen so the extreme settings still fit (the vertical range covers the tallest curve the controls allow).
- **Energy diagrams.** A potential and its levels share one panel: the eigenfunction (or density) is drawn on its own level as a baseline, scaled so that it stays clear of its neighbours; levels are labelled $E_n$ at their right-hand end and can be clicked (or focused and pressed) to select them, the same choice as the level presets.
- **Axes have no numbers.** Like the static figures, the axes carry only their variable and the markers that matter ($\pm a$, $\pm\hbar/2a$); the readouts carry the numbers.
- **Markers on an axis are the handles.** The reader drags the quantity itself (the width $a$ at its marker), with a slider and presets as the exact, keyboard-accessible alternative (§7).
- **Dragging empty canvas does nothing** (no view to rotate); the cursor is the default arrow. The exception is a panel holding a **3D view** (`src/core/view3.js`: orthographic, yaw and pitch, fixed scale so nothing rescales when turned): dragging anywhere in that panel turns it (grab cursor), and a row of view presets (*oblique*, *side on*, *end on*) is the keyboard alternative.
- **A probe** (a handle on the $x$ axis that marks the same point in every view of the figure) is drawn in ink, since it belongs to no one object; the points it marks take the colour of the object they sit on.
- **Two handles on one axis** (the two edges of a region) may overlap; whichever knob is nearer the pointer is the one that moves.

## 7. Interaction

- **Direct manipulation first.** Drag the object itself. Every draggable thing also has an exact, keyboard-accessible alternative: a slider, or presets plus the arrow keys on its handle, with the exact value shown in a readout.
- **Drag targets are visible handles** with a resize or grab cursor.
- **Pointer Events** handle mouse, pen and touch. Use `touch-action: none` only on the canvas, so the page still scrolls elsewhere.
- **Presets** are a row of small buttons for the standard values. The active one is highlighted with accent-1.
- **Keyboard.** Every control is focusable in reading order. A focused handle responds to the arrow keys (one slider step, or a fine step with Shift), Home/End go to the ends, and the focus ring is always visible.
- **Motion.** Jumping to a preset animates over 300ms (ease-in-out). Dragging is immediate. A *demonstration* (an action that shows a process happening) takes 1.2s; its readouts update when it ends. With `prefers-reduced-motion`, nothing animates: the end state appears at once.
- **Time evolution** (`action()` in `src/core/dom.js`): a figure that shows a process in time has a **Play/Pause** action button (▶ / ❚❚, `aria-pressed`) and a time slider that scrubs; play runs at a fixed rate (a few seconds for the whole range), stops at the end, and starts again from zero on the next press. The readouts update every frame. Moving any other control pauses nothing but is shown live; dragging the time slider pauses. Because the reader starts it deliberately, play still runs under `prefers-reduced-motion`, but in coarse steps (every half second) instead of smoothly.
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
- **Figure numbers in `aria-label`s** follow the site's numbering (chapter.figure).
- **Static figures follow the theme too.** When the first widget on a page mounts, `inlineStaticFigures()` (in `dom.js`) fetches every SVG figure on the page and inlines it with its black ink as `currentColor`, its white as the page background and a few dark accents as `--qm-fig-*` variables that `style/style.css` lightens in dark mode. The placeholder of a widget is left as the hidden `<img>`; PNG/GIF figures, and pages without a widget, fall back to a light panel in dark mode (`style/style.css`, after 1.5 s).
- A static figure that is redrawn for a widget lives in `Pictures/<name>.svg` with its PDF in `Pictures/pdf/<name>.pdf` (drawn with matplotlib in the style of the existing figures: Computer Modern maths, the notes' blue `#0d6efd` and orange `#ee7219`).

## 10. Engineering

```
interactive/
  README.md            ← this document
  src/core/            ← shared code: card/controls (dom.js), KaTeX, SVG, 2D plots (plot2d.js), 3D view
                          (view3.js), number formatting, motion; and the maths, one file per topic
                          (gaussian.js, density.js, planewave.js)
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

### `prob-density` — Figure 1.6 (Chapter 1)

A wavefunction $\psi(x)$ (real, with one negative bump) above its probability density $\pd(x) = |\psi(x)|^2$, with the small region $x_0 \le x \le x_0 + dx$ shaded under the density, as in the static figure. The reader moves and widens the region and compares the exact probability (the shaded area) with the approximation $\pd(x_0)\,dx$ (the rectangle of height $\pd(x_0)$); a toggle shows all the outcomes of a position measurement with resolution $dx$.

- **Objects:** $\psi(x)$ and $\pd(x)$ (accent-1); the region (accent-1 area, dashed edges); the rectangle $\pd(x_0)\,dx$ (accent-2 outline); the outcomes of the coarse-grained measurement (accent-3 bars: $\pd$ averaged over each bin of width $dx$, aligned so that one bin is the region, so a bar's area is the probability of that outcome).
- **Interactions:** drag either edge of the region along the $x$ axis (arrow keys: $0.1\,a_0$, Shift for $0.02$); sliders $x_0$ and $dx$; presets $dx = 0.05\,a_0, 0.25\,a_0, a_0$ (animated); the toggle *all the outcomes…*.
- **Readouts:** $\pd(x_0)$; $x_0$; $\prob(x_0 \le x \le x_0 + dx)$ (exact); $dx$; $\pd(x_0)\,dx$; with the outcomes shown, their number and the sum of their probabilities (1); a note that changes with the toggle and names the units ($a_0$, $1/a_0$).
- **Measurement demo:** *Measure 1 copy* / *100* / *1,000* / *10,000 copies* draw positions from $\pd(x)$ (inverse-CDF sampling) and build up the observed frequencies in the outcome bins (accent-2, 30%), with the number measured and the fraction found in the region read out; *Clear* empties the sample. Measuring switches the outcomes on.
- **Static figure:** `Pictures/prob-density.svg` redrawn as the two panels (the original showed only $\pd(x)$); the caption mentions both.
- **Options**

  | Option | Default | Meaning |
  |---|---|---|
  | `x0` | 3.6 | left edge of the region, in units of $a_0$ (range $-0.5$ to $6$) |
  | `dx` | 0.25 | width of the region ($0.05$ to $1.5$) |
  | `outcomes` | false | show the outcomes of the coarse-grained measurement when the widget loads |

### `plane-wave` — Figure 2.1 (Chapter 2)

The three pictures of the complex plane wave $\psi(x) = Ae^{2\pi i x/\lambda}$ from the static figure, now linked: (a) $\mathrm{Re}\,\psi$ and $\mathrm{Im}\,\psi$ against $x$; (b) the helix traced by $(x, \mathrm{Re}\,\psi, \mathrm{Im}\,\psi)$, which can be turned; (c) the modulus $|\psi(x)| = A$ as a line of that height, coloured by the phase, with the colour wheel. A probe at a position $x$ marks the same value of $\psi(x)$ in all three (two points on the curves, a point on the helix with its radius, a point on the modulus line, and the phase on the wheel).

- **Objects:** $\mathrm{Re}\,\psi$ (accent-1) and $\mathrm{Im}\,\psi$ (accent-2), told apart by the readout swatches; the helix and the modulus line in phase hue (§2); the probe in ink.
- **Interactions:** drag the probe along the $x$ axis of (a) (arrow keys $0.1\,a_0$, Shift $0.02$); slider $\lambda$ ($0.5$ to $3\,a_0$) with presets $0.6, 1.2, 2.4\,a_0$; slider $A$ ($0.25$ to $1$); the toggle *negative momentum* ($\lambda \to -\lambda$: the helix winds the other way and the colours run backwards); drag the helix to turn it, or the view presets *oblique*, *side on*, *end on* (end on, the helix is the circle of the colour wheel).
- **Readouts:** $x$; $\phi = 2\pi x/\lambda$ (in units of $\pi$); $\psi(x) = Ae^{i\phi}$ as a complex number; $\lambda$ and $A$; $\mathrm{Re}\,\psi(x)$; $p = h/\lambda$ (de Broglie, in $\hbar/a_0$); $\mathrm{Im}\,\psi(x)$; a note on the phase advancing by $2\pi$ per wavelength and the units.
- **Static figure:** the existing `Pictures/complex-circ.svg`, unchanged.
- **Options**

  | Option | Default | Meaning |
  |---|---|---|
  | `lambda` | 1.2 | wavelength, in units of $a_0$ |
  | `A` | 1 | amplitude |
  | `negative` | false | start with $\lambda < 0$ |
  | `x` | 1.5 | position of the probe |
  | `view` | `"oblique"` | initial view of the helix: `"oblique"`, `"side"` or `"end"` |

### `wavepacket` — Figure 6.1 (Chapter 6)

The free Gaussian wavepacket $\psi(x,t)$ of equation (6.x), replacing the animated GIF (which stays as the placeholder: the PDF shows its filmstrip). Top: $|\psi(x,t)|$ as a curve coloured by its phase, with the colour wheel, exactly the representation of the animation. Bottom: the density $\pd(x,t)$ with $\av{x} = p_0t/M$ and the band $\av{x} \pm \Delta x(t)$ marked, and the initial density as a dashed ghost. The phase comes from the exact solution (`src/core/wavepacket.js`, checked against the Schrödinger equation in `npm test`), so the colour shows the position–momentum correlation building up: it cycles faster at the front of the packet than at the back.

- **Objects:** $|\psi(x,t)|$ in phase hue; $\pd(x,t)$ (accent-1) with its $\pm\Delta x$ band and markers; the ghost $\pd(x,0)$ (accent-1, dashed, faint); the centre marker in ink.
- **Interactions:** Play/Pause (time runs at $0.6\,\tau$ per second to $6\tau$); slider $t \in [0, 6\tau]$ with presets $0, 2\tau, 4\tau, 6\tau$ (with $a = a_0$, $M = M_0$ the first three are stills of Figure 6.2); the panels span $x \in [-5, 30]\,a_0$; sliders $a \in [0.5, 2]\,a_0$, $p_0 \in [0, 1.2]\,\hbar/a_0$ and the mass $M \in [0.5, 2]\,M_0$ (a narrower or lighter packet spreads faster; a heavier one moves more slowly); the toggle for the ghost.
- **Readouts:** $t$; $\Delta x(t) = \alpha(t)$ with its formula; $\av{x} = p_0t/M$; $\Delta x(t)$; $v = p_0/M$; $\Delta x(0) = a$; a note on the speed, the spreading, the meaning of the colour and the units.
- **Options**

  | Option | Default | Meaning |
  |---|---|---|
  | `t` | 0 | time, in units of $\tau$ |
  | `a` | 1 | initial width, in $a_0$ |
  | `p0` | 1 | average momentum, in $\hbar/a_0$ |
  | `M` | 1 | mass, in $M_0$ |
  | `ghost` | true | show the initial density |

### `isw` — Figure 7.4 (Chapter 7)

The energy eigenfunctions of the infinite square well, one at a time: $u_n(x)$ inside the well (walls and the forbidden outside in accent-3) above its density, with the energy ladder $E_n = n^2E_1$ at the right. A second mode superposes two levels, $(u_n e^{-iE_nt/\hbar} + u_m e^{-iE_mt/\hbar})/\sqrt 2$, showing $|\psi(x,t)|$ by phase with the colour wheel, the sloshing density, and $\av{x}(t)$.

- **Interactions:** presets $n = 1..6$, or click a level on the ladder; toggle *superpose with a second level*, presets $m$, Play/Pause, slider $t \in [0, 2\pi]\,\hbar/E_1$.
- **Readouts:** $u_n(x)$; $E_n$; the number of nodes; $E_1 = \pi^2\hbar^2/2ML^2$; $\av{x}$ (or $\av{x}(t)$); with a superposition: $t$, the period $T = 2\pi\hbar/(E_m - E_n)$, $E_m$ and $E_m - E_n$.
- **Options:** `n` (1), `m` (2), `superpose` (false), `t` (0).
- Maths in `src/core/isw.js` (tested: normalisation, orthogonality, the TISE, $\av{x}(t)$ against quadrature, the period).

### `ho` — Figure 8.2 (Chapter 8)

The harmonic oscillator: $V(x) = \tfrac12 M\omega^2x^2$ with the levels $E_n = \hbar\omega(n + \tfrac12)$ drawn between their turning points, and the chosen $u_n(x)$ (or $|u_n|^2$, solid, in its place) drawn on its level, whose baseline is a thin ink axis; the chosen level is solid accent-3 between the turning points. The classically forbidden region $|x| > x_t$ is shaded and the probability of finding the particle there is read out: tunnelling.

- **Interactions:** presets $n = 0..5$, or click a level; toggle *probability density*.
- **Readouts:** $E_n$; $x_t = \sqrt{2n+1}\,\ell$; $u_n(x) = N_n h_n(x/\ell)e^{-x^2/2\ell^2}$; $\prob(|x| > x_t)$ (3 d.p.); nodes; $V(x)$ in units of $\hbar\omega$ and $\ell$.
- **Options:** `n` (0), `density` (false).
- Maths in `src/core/ho.js` (Hermite polynomials by recurrence; tested against the table in the notes, normalisation, orthogonality, the TISE, $\mathrm{erfc}(1)$ for the ground state).

### `step` — Figure 9.3 (Chapter 9)

Scattering off a potential step: $|u_E^{\rR}(x)|$ coloured by its phase, with the step and the energy $E$ drawn across it (on a scale where $V_0$ is at height 1), above the curves $R(E/V_0)$ and $T(E/V_0)$ with the present energy marked by a handle. Below the step the wave is a standing wave with an evanescent tail and $R = 1$.

- **Interactions:** slider $E \in [0.05, 3]\,V_0$; presets $V_0/2$, $1.2V_0$, $2V_0$; drag the marker on the $E/V_0$ axis.
- **Readouts:** $E/V_0$; $R = |B|^2$; $k$; $T = 1 - R$; $k'$ or $\lambda$; $B$ and $C$ (or $|B|$, $|C|$ below the step). Lengths in $\ell_0 = \hbar/\sqrt{2MV_0}$.
- **Options:** `e` (1.6), the energy in units of $V_0$.
- Maths in `src/core/step.js` (tested: continuity of $u$ and $u'$ at the step, the TISE in both regions, $R + T = 1$, the formulas of the notes).

### `scatter` — Figure 9.5 (Chapter 9)

A Gaussian wavepacket scattering off the potential step, replacing the animated GIF (which stays as the placeholder: the PDF shows its filmstrip). Top: $|\psi(x,t)|$ coloured by its phase, with the step and the mean energy $E_0$ drawn across it on the step's energy scale, and the colour wheel between the panels. Bottom: $\pd(x,t)$ with the step. The packet is the superposition $\int \phi(E)\,u_E^{\rR}(x)\,e^{-iEt/\hbar}\,dE$ of right-moving eigenstates of the notes (`src/core/scatter.js`), summed over 384 energies with a Gaussian $\phi$ and the components below $V_0$ kept, so it partly reflects and partly transmits with interference fringes while the two parts overlap; long after the collision the probability on the left settles to $\bar R = \int |\phi|^2 R\,dE$, which the readouts compare with $R(E_0)$.

- **Objects:** $|\psi(x,t)|$ in phase hue; $\pd(x,t)$ (accent-1); the step (accent-3, `.qm-op-axis`) and the level $E_0$ (accent-3, dashed); the labels $\prob(x<0)$ (accent-1) and $\prob(x>0)$ (accent-2) over each side of the lower panel.
- **Interactions:** Play/Pause (time runs at $1.5\,\tau_0$ per second to $16\tau_0$); slider $t$ with presets $0, 4\tau_0, 8\tau_0, 16\tau_0$; slider $E_0 \in [0.3, 3]\,V_0$ with presets $V_0/2$, $1.2V_0$, $2V_0$; slider $a \in [0.6, 2.5]\,\ell_0$. The packet starts at $x_0 = -8\,\ell_0$; the panels span $x \in [-14, 10]\,\ell_0$ and the probabilities are integrated on a wider grid, so they stay right after the packets leave the panel.
- **Readouts:** $t$; $R(E_0)$, $T(E_0)$; $\prob(x<0)$; $\bar R$; $\prob(x>0)$; $E_0$ and $k_0$. Lengths in $\ell_0 = \hbar/\sqrt{2MV_0}$, time in $\tau_0 = \hbar/V_0$.
- **Options:** `t` (0), `e0` (1.5), `a` (1.5).
- Maths in `src/core/scatter.js` (tested: the packet starts as the free Gaussian of width $a$ at $x_0$ when $k_0 \ge 4\sigma_k$, unit norm, the time-dependent Schrödinger equation at points on both sides of the step, norm conservation, and $\prob(x<0) \to \bar R$ long after the collision). Each frame is one pass over the tabulated eigenfunctions (about 1 ms); the table is rebuilt (about 20 ms) when $E_0$ or $a$ changes.

### `box3d` — Figure 11.1 (Chapter 11)

The marginal density $\pd(x,y,t)$ of the superposition $(u_{(1,1,1)} + u_{(2,2,1)})/\sqrt2$ of the text as a heat-map over the $x$–$y$ face of the box, with the one-dimensional marginals $\pd(x,t)$ and $\pd(y,t)$ beside it. Play shows the density sloshing along the diagonal while the marginals never change. A second mode shows a single eigenstate $u_{n_x}(x)u_{n_y}(y)$.

- **Interactions:** Play/Pause and slider $t \in [0, 2.1]\,\hbar/\Ebox$ (two periods); toggle *a single eigenstate* with presets $n_x, n_y = 1..4$.
- **Readouts:** the state; $t$; the energies; the period $2\pi\hbar/6\Ebox$.
- **Options:** `t` (0), `eigenstate` (false), `nx` (2), `ny` (1).
- Placeholder: the original GIF (filmstrip in the PDF).

### `quiz` — concept checks (every chapter)

A multiple-choice question with instant feedback, two per chapter under *Check your understanding* (web-only: the PDF drops them). Model: `{ "q", "choices": [...], "answer": index, "why", "label" }`; `$…$` in any string is typeset. The chosen answer is coloured right or wrong, the correct one is shown, and the explanation appears below. Nothing is stored.

### `steps` — derivation steppers (Chapters 3 and 6)

A derivation revealed one line at a time, each with its justification: `{ "title", "intro", "steps": [{ "math": "aligned rows", "why" }] }`. *Next step* / *Show all* / Reset. In the PDF the plugin prints the lines as unnumbered `align*` blocks with the justifications in italics.

### `progress` — reading progress (every chapter)

*I have read Chapter n* at the end of each chapter, remembered in `localStorage` (this browser only) under `qm-notes-read`, with a bar and a list of the eleven chapters. Web-only.

---

## Changelog

- **1.5 (9 Nov 2026)** — `scatter` (Figure 9.5): the scattering of a Gaussian wavepacket off the potential step, computed as the superposition of right-moving eigenstates (`src/core/scatter.js`, `test/scatter.test.mjs`).
- **1.4.2 (9 Nov 2026)** — `ho`: the chosen level is solid accent-3 and the baseline of $u_n$ is an ink axis (no longer accent-1, which was confusable with the eigenfunction); the density is solid, since it replaces $u_n$ rather than being drawn over it (§5 table); the $u_n$ label moves to the left edge, clear of the $E_k$ labels. `wavepacket`: $x \in [-5, 30]\,a_0$ and $t \le 6\tau$ (presets $0, 2\tau, 4\tau, 6\tau$), so a packet can be followed for longer and further.
- **1.4.1 (9 Nov 2026)** — static SVG figures are inlined with theme-following colours once a widget is on the page (§9), so they look like the widgets in dark mode.
- **1.4 (8 Nov 2026)** — three widgets without a canvas (`quiz`, `steps`, `progress`; §4 rule) and the measurement demo in `prob-density` (`sample()` in `density.js`). `qm-widgets.css` §9.

- **1.3 (8 Nov 2026)** — four more widgets: `isw` (7.4), `ho` (8.2), `step` (9.3), `box3d` (11.1). Rules: §5 energy levels, potentials and heat-maps; §6 energy diagrams. Shared code: `src/core/hue.js` (phase-coloured curves and the wheel legend), `Panel.curve()` takes an `xRange`, maths modules `isw.js`, `ho.js`, `step.js`.

- **1.2 (6 Nov 2026)** — `wavepacket` (Figure 6.1) and the rules it needed: §3 the reference mass $M_0$ and time unit $\tau$; §7 time evolution with a Play/Pause action (`action()` in `dom.js`) and a scrubbing time slider.

- **1.1.1 (6 Nov 2026)** — `plane-wave`: panel (c) is the modulus $|\psi(x)| = A$ drawn as a line of that height coloured by the phase, as in the static figure (it had been a stripe of fixed height, so it did not respond to $A$); its axis carries $A$ and $-A$ like panel (a). §5 updated accordingly.
- **1.1 (5 Nov 2026)** — two more widgets, `prob-density` (Figure 1.6) and `plane-wave` (Figure 2.1), and the rules they needed: §3 the reference length $a_0$ for Chapters 1–3; §5 marks for phase-by-hue curves and stripes, histogram bars, an approximating rectangle and 3D axes; §6 a turnable 3D view (`src/core/view3.js`) with view presets, the ink probe, and overlapping handles; §9 figure numbers in `aria-label`s. `plot2d.js` gains `bars()`, `rect()`, `point()` and `dy()`. `Pictures/prob-density.svg` redrawn with $\psi(x)$ above $\pd(x)$.

- **1.0.3 (5 Nov 2026)** — shaded areas are 15% of the role colour (§2, §5; 8% was too faint beside a dashed curve). `gaussian-hup`: with the densities shown, the bands $\pm\Delta x$ and $\pm\Delta p$ (one standard deviation either side of the mean, i.e. between the dashed markers) are shaded under the densities, and the probability inside each (0.68) is read out.
- **1.0.2 (5 Nov 2026)** — readouts never scroll (§4): the sideways scrollbars showed as permanent bars on Windows. `gaussian-hup`: $a$ moved out of the $\psi(x)$ line into its own readout; $\Delta p$ and $\hbar/2$ written inline.
- **1.0.1 (5 Nov 2026)** — slider labels sit above the slider instead of beside it (§4): a long label ("$a = 0.50\,a_0$") was squeezing the slider. `gaussian-hup`: the probability-density toggle now hides the curves again when unticked (SVG elements ignore `.hidden`).
- **1.0 (5 Nov 2026)** — first version for the QM notes: the QIT ground rules (v1.4) carried over with a `qm-` namespace, the colour roles for this course (§2) and a 2D-plot section (§6) in place of the Bloch sphere; shared plot code `src/core/plot2d.js`; first widget `gaussian-hup` (Figure 3.1), with a redrawn two-panel static figure for the PDF.
