# Surf Reader Promo - Expo (React Native + Web)

Same promo page as the Vite app (in `../`), built with React Native components via `react-native-web`. Mirrors the `esurfr` i18n layout (per-language folder + namespace JSONs).

## Run

```bash
npm install
npm run web        # dev - http://localhost:8081
npm run ios        # simulator (RN native build)
npm run android    # emulator
```

> Dev mode does **not** auto-serve `public/`. Image refs (`/assets/...`) only resolve in the production build. To preview images during dev either bundle them with `require('../public/assets/foo.png')` or run the production build below and serve `dist/`.

## Build a self-contained `index.html`

```bash
npm run build      # = expo export -p web && node scripts/inline.mjs
```

Produces:
- `dist/index.html` - standard SPA shell + external `_expo/static/js/*` and `assets/*` (~520 KB JS + 17 MB images, served separately)
- `dist/index.bundle.html` - **single 18.8 MB file**, every JS / CSS / image / font base64-inlined. Open via `file://` or any static host with no further deps.

The inliner (`scripts/inline.mjs`) walks the HTML, replaces every `<script src>` / `<link rel=stylesheet>` / `<img src>` / icon link with inline content, **and** scans the JS bundle for literal `"/assets/<file>"` strings (which is how Metro embeds image URIs in the bundle) and rewrites those to `data:` URIs too.

## Replace text

```
src/i18n/locales/<lng>/<namespace>.json
```
Five languages (`en` `es` `fr` `pt` `ja`), nine namespaces (`common`, `hero`, `problem`, `flow`, `canvas`, `features`, `review`, `method`, `cta`). Mirrors the Vite app - copy/paste between them works.

Add a language: `cp -r src/i18n/locales/en src/i18n/locales/<code>`, then add `<code>` to `SUPPORTED_LNGS` in `src/i18n/i18n.ts` and to the `resources` map in `src/i18n/resources.ts`.

## Replace images

`src/content/images.ts` is the single registry. Drop a new file into `public/assets/`, update the path. Same workflow as the Vite app.

## Layout

```
public/assets/                  ← static images (copied to dist/ at build)
src/
  i18n/
    i18n.ts                     ← i18next init (web detector + native fallback)
    resources.ts                ← static-imports all locale JSON
    locales/<lng>/*.json        ← 9 namespace files per language
  content/images.ts             ← image registry
  styles/theme.ts               ← colours, fonts, layout tokens (RN equivalent of CSS vars)
  components/
    Wrap, Eyebrow, Display      ← shared primitives
    Section                      ← background + paddingY container
    Nav, Hero, Problem, Flow,
    Canvas, Features, Review,
    Method, Languages, FinalCta,
    Footer, LanguageSwitcher
App.tsx                         ← top-level composition
index.ts                        ← Expo registerRootComponent entry
scripts/inline.mjs              ← post-export single-file inliner
```

## Notes / RN-Web caveats

- `display: grid` doesn't exist in RN - sections use flex with `flexBasis: '${100 / cols - 2}%'` for grid-like wrapping.
- `dangerouslySetInnerHTML` doesn't exist in `<Text>` - `<b>…</b>` and `<em>…</em>` from translation strings are stripped by `replace(/<[^>]+>/g, '')` and the emphasis is reapplied via nested `<Text style={{fontWeight}}>` where it matters.
- The interactive `CanvasDemo` and `ReviewDemo` from the Vite app aren't ported here - they assume DOM event APIs that need RN equivalents (PanResponder, Gesture Handler). If you need them on this app, port from `../src/components/CanvasDemo.tsx` using `View` + `PanResponder`.
- The hero phone is a static screenshot (`images.heroPhoneScreenshot`), same as the original bundle.
