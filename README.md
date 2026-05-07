# Surf Reader Promo Page

Single-page React + Vite site, ported from the original `index.html` bundle. All copy is i18n-driven (5 languages); all images come from a single registry so they swap with one line.

## Stack

- React 18 + TypeScript
- Vite 6
- react-i18next (browser language detector + localStorage cache)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Replace text

Translation strings live under `src/i18n/locales/<lang>/<namespace>.json` — same shape as the `esurfr` app.

```
src/i18n/locales/
  en/  ← canonical English (edit here first)
  es/  fr/  pt/  ja/   ← currently seeded as copies of EN; replace with real translations
```

Namespaces (one JSON file per page section):

| Namespace    | What it controls                          |
| ------------ | ----------------------------------------- |
| `common`     | Brand, nav, footer, language switcher     |
| `hero`       | Hero block (eyebrow, title, lede, CTAs)   |
| `problem`    | "Why surfers plateau" cards               |
| `flow`       | 3-step Map / Plan / Review cards          |
| `canvas`     | Canvas section + 8 break-type labels      |
| `features`   | 6 feature cards                           |
| `review`     | Post-surf review block + bullets          |
| `method`     | Martin Dunn quote + stats grid            |
| `cta`        | Final download CTA + store buttons        |

Add a new language by:

1. `cp -r src/i18n/locales/en src/i18n/locales/<code>`
2. Add `<code>` to `SUPPORTED_LNGS` in `src/i18n/i18n.ts`
3. Add the `<code>: { … }` block to `src/i18n/resources.ts`
4. Add a `languageSwitcher.<code>` label in every `common.json`

## Replace images

All `<img>` paths flow through `src/content/images.ts`.

```ts
export const images = {
  brandLogo: "/assets/12c4b12e-….png",
  heroPhoneScreenshot: "/assets/648e3d49-….png",
  breaks: { openBeach: "/assets/…", … }
};
```

To swap an image:

1. Drop the new file into `public/assets/` (any filename you like).
2. Update the path in `src/content/images.ts`.

The 33 original assets sit in `public/assets/` keyed by their original UUID. Files in `public/` are served as-is at the matching URL.

## Original bundle

The original 21 MB self-extracting `index.html` is preserved at `.archive/index.html.original`. The decoded HTML template + raw assets are in `extracted/` (kept out of the build but useful as a reference while porting).

## Layout

```
public/assets/                  ← swap-friendly image files
src/
  App.tsx                       ← top-level page composition
  main.tsx                      ← React entry, imports i18n
  components/                   ← one component per section
  content/images.ts             ← image registry
  i18n/
    i18n.ts                     ← i18next init (mirrors esurfr)
    resources.ts                ← static-imports all locale JSON
    locales/<lang>/*.json       ← translation strings
  styles/
    index.css                   ← resets + imports site.css
    site.css                    ← page styles extracted from the original bundle
```
