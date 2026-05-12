# Surf Reader — Local Fonts

Two pulldown menus appear in the top-left of the site:
- **Title font** — swaps the serif/display face used for headings (CSS variable `--display`).
- **Subtitle font** — swaps the sans-serif used for body and UI (CSS variable `--sans`).

The site reads `fonts/fonts.yaml` to discover which fonts to offer. To make a
font usable, drop its `.woff2` files into a folder named after the font's `slug`
inside `fonts/`. Filenames must match what the YAML lists.

## Quick example — Fraunces

`fonts.yaml` declares:

```yaml
- family: Fraunces
  slug: fraunces
  files:
    - { weight: 500, style: normal, file: fraunces-500.woff2 }
    - { weight: 600, style: italic, file: fraunces-600-italic.woff2 }
    - { weight: 700, style: normal, file: fraunces-700.woff2 }
    - { weight: 800, style: normal, file: fraunces-800.woff2 }
    - { weight: 900, style: normal, file: fraunces-900.woff2 }
```

So Fraunces lives at:

```
fonts/
└── fraunces/
    ├── fraunces-500.woff2
    ├── fraunces-600-italic.woff2
    ├── fraunces-700.woff2
    ├── fraunces-800.woff2
    └── fraunces-900.woff2
```

## Easiest way to download — google-webfonts-helper

For any Google Font (most of the catalogue) the friendliest tool is
[google-webfonts-helper](https://gwfh.mranftl.com/fonts):

1. Open the site and search for the family (e.g. "Fraunces").
2. Tick the weights/styles you want (match the list under `files:` for that font in `fonts.yaml`).
3. Set "Customize folder prefix (optional)" to **blank** (we already use `fonts/<slug>/` paths in CSS).
4. Set "Browser support" to **Best support, plus older browsers** or **Modern browsers** — both ship `.woff2`.
5. Click **Download files as zip**.
6. Unzip into `fonts/<slug>/` and rename the files to the names listed in `fonts.yaml`.

The default google-webfonts-helper filenames look like `fraunces-v32-latin-500.woff2` — just rename the
relevant slice so they match the YAML (`fraunces-500.woff2`, etc.). The font picker uses these names
to register the `@font-face` blocks.

## Geist (and other non-Google fonts)

[Geist](https://vercel.com/font) is shipped by Vercel — download the `.woff2`
release directly from `vercel.com/font` and place each weight into `fonts/geist/`
with the names listed in `fonts.yaml`.

## Want to add another font?

1. Add a block to `fonts.yaml` under `title_fonts:` or `subtitle_fonts:`.
2. Create `fonts/<slug>/` and drop in the `.woff2` files with the exact filenames
   you listed.
3. Refresh the site. The new font appears in the pulldown automatically.

## How selections are remembered

When the client picks a font, the choice is saved to `localStorage` under
`sr_title_font` / `sr_subtitle_font`. Reopening the site restores the last pair.
Clearing site data resets to Fraunces (title) and Inter (subtitle).

## When the picker is locked in

Once the client has chosen, the picker can be removed by deleting
`<div id="fontPicker">` from `index.html` and the `<script src="js/font-picker.js">`
tag. The chosen fonts can then be hard-coded in `css/styles.css` under the
`:root { --display; --sans; }` block.
