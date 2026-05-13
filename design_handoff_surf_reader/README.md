# Handoff: Surf Reader - Marketing Site

## Overview
A single-page marketing site for **Surf Reader**, a pocket-sized surf-coaching companion app built around Martin Dunn's 40-year surf-coaching method. The page introduces the app's "Map → Plan → Review" loop, demonstrates the interactive beach-map canvas, walks through the post-surf review (7 criteria, 1–10 stars), and drives users to the App Store / Google Play.

Audience: surfers (beginner to intermediate) discovering the app, plus existing coaching customers of eSurfR.com / Martin Dunn Surf Camps.

## About the Design Files
The files in this bundle are **design references created in HTML/JSX** - prototypes showing intended look and behavior, **not** production code to copy directly.

Your task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, plain React, etc.) using its established patterns, component library and styling system. If no environment exists yet, pick the framework that best suits a marketing site (a static-site generator like Astro or Next.js with static export is recommended - the page is mostly content with two interactive React islands).

The HTML/CSS values below are exact and should be matched pixel-perfectly. The JSX organization is illustrative - feel free to break the two interactive widgets into proper components however your codebase prefers.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy and interactions. Implement pixel-perfect.

## File Map

| File | Purpose |
|---|---|
| `Surf Reader.html` | Full page markup + all CSS. Open this in a browser to see the live design. |
| `app.jsx` | Two interactive React widgets (Canvas Demo, Review Demo) plus three static "flow card" visuals and a hero phone preview. |
| `assets/` | All images: app logo (mark + full), 8 break-type aerial photos, 9 canvas tray icons, hero shot, app home screenshot. |

External dependencies in the HTML (replace with your codebase's equivalents):
- **React 18.3.1** + ReactDOM (UMD via unpkg) - replace with your existing React setup.
- **Babel standalone 7.29.0** - only needed because the JSX is loaded inline; remove once you have a real build pipeline.
- **Google Fonts: Fraunces, Inter** - keep these, install via your font-loading strategy.

---

## Page Structure (top → bottom)

1. **Sticky nav** - brand mark + wordmark left, nav links + "Get the app" pill button right.
2. **Hero** - eyebrow, big serif headline, lede, two CTAs, language strip, app screenshot inside a phone frame on the right; orange sun radial behind the phone, light wave SVG along bottom of section.
3. **Trust strip** - small caps label + 3 brand names (eSurfR.com, MartinDunn.com.au, Martin Dunn Surf Camps).
4. **Problem section** (`#why`) - section head + 3 numbered cards explaining why surfers plateau.
5. **How it works** (`#how`) - section head + 3 "flow cards" (Map → Plan → Review). Each has a custom visual on top and copy below.
6. **Canvas demo** (`#canvas`) - **dark navy** section. Section head + interactive `<CanvasDemo>` widget + 8-tile grid of break-type photos.
7. **Features** (`#features`) - light cream section, 3×2 grid of feature cards (icon tile + h3 + p).
8. **Review demo** (`#review`) - 2-column: copy + checklist left, interactive `<ReviewDemo>` card right.
9. **Method** (`#method`) - **dark navy** section. Quote + Martin Dunn attribution on left, 2×2 grid of sand-colored stats on right.
10. **Languages strip** - light cream, "Surf, in your language" with 5 language chips.
11. **Final CTA** (`#download`) - dark navy with orange radial top, big headline, App Store + Google Play store buttons.
12. **Footer** - small brand + copyright + privacy/support links.

---

## Design Tokens

### Colors (CSS custom properties in `:root`)

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0a1f3a` | Primary text color |
| `--ink-2` | `#14304f` | Secondary text / lede |
| `--navy` | `#0e2a4d` | Dark backgrounds, CTAs |
| `--navy-soft` | `#1a3a66` | Navy hover state |
| `--sky-1` | `#2193b0` | Wave gradient (dark teal) |
| `--sky-2` | `#6dd5ed` | Wave gradient (light teal) |
| `--sand` | `#f4c77e` | Stat numbers, quote color on dark sections |
| `--sand-soft` | `#fbe9c4` | (unused at runtime, kept for palette) |
| `--sunset` | `#f08a2a` | Primary accent - buttons, "swell" word, eyebrows |
| `--sunset-deep` | `#d96a14` | Sunset hover, eyebrow text |
| `--rip` | `#c62828` | Red - for rip-current strokes in canvas |
| `--paper` | `#fbf6ee` | Body background |
| `--paper-2` | `#fef9f0` | Subtle alt cream (problem + features sections) |
| `--line` | `rgba(14,42,77,0.12)` | Borders, dividers |
| `--line-strong` | `rgba(14,42,77,0.22)` | Stronger borders, ghost button outline |

Additional non-token colors:
- Dark canvas + final-CTA gradient: `linear-gradient(180deg, #0a1f3a 0%, #0e2a4d 60%, #143b6e 100%)`
- Final CTA bottom: `#061830` (also footer background)
- Drawing strokes: `#1565C0` (wave arrow), `#C62828` (rip dashed), `#212121` (freehand)

### Typography

| | Family | Stack |
|---|---|---|
| `--display` | **Fraunces** (Google) | `"Fraunces", ui-serif, Georgia, serif` |
| `--sans` | **Inter** (Google) | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` |

Fraunces weights used: 500, 600, 700, 800, 900 (variable opsz 9…144).
Inter weights used: 400, 500, 600, 700, 800.

Type roles:
- Hero h1: `clamp(44px, 6.4vw, 84px)`, Fraunces 700, letter-spacing `-0.02em`, line-height `1.02`, `text-wrap: balance`. The word "surf" is `<span class="swell">` → italic, Fraunces 600, color `--sunset`.
- Section h2 (`.section-head h2`): `clamp(34px, 4.4vw, 54px)`, Fraunces 700.
- Card titles (`.flow-card h3`, `.feature h3`, `.problem-card h3`): Fraunces 700, 20–26px.
- Eyebrow: Inter 700, 12px, uppercase, letter-spacing `0.18em`, color `--sunset-deep`. Has a `::before` 22×2px sunset bar.
- Body / lede: Inter 400, 17–19px, color `--ink-2`, line-height 1.55.
- Blockquote (method): Fraunces 600 italic, `clamp(26px, 3.2vw, 38px)`, color `--sand`.
- Buttons: Inter 600, 15px.
- Nav links: Inter 500, 14.5px, color `--ink-2`.

### Spacing & layout

- Page wrap: `max-width: 1200px`, horizontal padding `28px`.
- Narrow wrap: `max-width: 920px`, same horizontal padding.
- Section vertical padding: `110px 0`.
- Hero top padding: `92px 0 0`.
- Section head bottom margin: `60px`, max-width `720px`, centered text.

### Radii

- Cards: `20–28px` (problem/feature 20–22, flow 28, canvas 28, review 24).
- Buttons / pills: `999px` (fully round).
- Icon tiles: `12–14px`.

### Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(14,42,77,.06), 0 2px 8px rgba(14,42,77,.06)` |
| `--shadow-md` | `0 6px 18px rgba(14,42,77,.10), 0 18px 40px rgba(14,42,77,.10)` |
| `--shadow-lg` | `0 12px 30px rgba(14,42,77,.14), 0 30px 80px rgba(14,42,77,.18)` |

Sunset CTA shadow: `0 8px 22px rgba(240, 138, 42, .35)`.

---

## Sections in Detail

### 1. Nav (sticky)
- `position: sticky; top: 0; z-index: 50;`
- Background: `rgba(251,246,238,0.85)` with `backdrop-filter: saturate(160%) blur(14px)`.
- Bottom border: 1px `--line`.
- Inner: flex space-between, padding `14px 28px`, max-width 1200.
- Brand: 38×38 logo mark + Fraunces 800 20px wordmark "Surf Reader" colored `--navy`.
- Links: 28px gap, Inter 500 14.5px, hover color `--sunset-deep`.
- CTA: navy pill, white text, padding `10px 18px`, hover lifts 1px.
- Mobile (<760px): hide all nav links except the CTA-wrapper (class `.keep`).

### 2. Hero
- Two-column grid `1.05fr 1fr`, 64px gap. Stacks at <980px.
- Left column:
  - Eyebrow: "A surfer's planner & journal"
  - h1 (3 lines): "Read the **surf**. / Plan your session. / Reflect after." - "surf" is italic sunset.
  - Lede (≤560px wide): "Surf Reader is a pocket-sized coaching companion built around Martin Dunn's 40-year surf-coaching method. Map the break, set your intention before paddling out, then rate the surf you actually had - and watch your wave selection expertise grow session by session."
  - Two buttons: **Get Surf Reader** (sunset pill with arrow icon) + **See how it works** (ghost outline).
  - Two meta rows:
    - Row 1: bold "Use the app and learn better wave selection in 5 languages"
    - Row 2: English · Español · Português · 日本語 · Français (separated by 4px dot dividers)
- Right column: phone mockup
  - Aspect `9/16`, max-width 360px, centered.
  - Outer "phone": navy `#0a1f3a` body, `border-radius: 44px`, `padding: 12px`, big stacked shadows, `transform: rotate(-3deg)`.
  - Screen: 32px radius, contains `assets/app_home.png` as cover image.
- Behind the phone:
  - Orange sun: 460×460 radial gradient circle, positioned `top: 5%; right: -120px`.
  - Wave SVG along the bottom of the section, height 220px, opacity 0.35, linear gradient `#6dd5ed → #2193b0`.

### 3. Trust strip
- 36px from hero, centered row, opacity 0.7.
- Small caps label "BUILT ON MARTIN DUNN'S COACHING FROM" + 3 brand names (Fraunces 600, 18px, navy).

### 4. Problem (`#why`)
- Section background: `linear-gradient(180deg, --paper, --paper-2)` with top & bottom hairline borders.
- Section head: eyebrow "Why surfers plateau?" + h2 "Most sessions vanish the moment your wetsuit comes off." + paragraph copy.
- 3-column grid, 24px gap (stacks at <820px).
- Card: white, 1px `--line` border, 22px radius, 28px padding, `--shadow-sm`.
  - `.num`: Fraunces 700 56px, sunset, letter-spacing `-0.04em`.
  - Card titles: Fraunces 700 22px.
  - Card 1 - "01" - You read the lineup, then forget what you saw. *Sand banks shift, rips appear, peaks drift. Surf Reader turns your eyes-on-the-water into a saved beach map you can pull up before paddling out.*
  - Card 2 - "02" - You surf without an intention. *"Just have fun" is a great mantra and a poor session plan. The guided 7-question flow gives you one specific thing to work on this surf.*
  - Card 3 - "03" - You never honestly rate yourself. *Seven criteria, one to ten stars. The average becomes your **skill rating**. Trends emerge. Excuses don't.*

### 5. How it works (`#how`)
- Section head: eyebrow "The 3-step loop" + h2 "Map. Plan. Review. Repeat." + lede "One simple loop, repeated anytime you want. The same one Martin teaches at his surf camps - now in your pocket."
- 3-column grid, 32px gap (stacks at <980px).
- Card: white, 1px `--line` border, 28px radius, `--shadow-md`, flex-column.
  - Top: visual area, `aspect-ratio: 4/3`, sky-gradient fallback. Each gets a custom JSX visual (see `app.jsx` → `Flow1Map`, `Flow2Plan`, `Flow3Review`).
  - Body: 26px 28px 30px padding.
  - Step pill: small sunset circle with white number + uppercase sunset-deep label.
  - h3: Fraunces 700 26px.
- Card 1: **Map the break** - "Annotate the lineup with your finger." Body: *Pick from 8 break types - open beach, point, reef, rivermouth, breakwall and more. Drop your "Surfer" pin, draw the wave direction, mark the rip, place landmarks. Auto-saved as you draw.*
- Card 2: **Set your intention** - "Guided plan in seven questions." Body: *Where will you sit? How will you paddle out? Surf Reader walks you through Martin's 7-question coaching flow and writes a clean session plan you can save and revisit.*
- Card 3: **Rate your surf** - "Seven criteria, rated out of 10." Body: *From paddle-out to wave selection to positioning - score yourself honestly. The app calculates your skill rating and charts your progression, creating a session library in the process.*

### 6. Canvas demo (`#canvas`)
- Dark navy section: `linear-gradient(180deg, #0a1f3a, #0e2a4d 60%, #143b6e)`.
- Eyebrow color: `--sand` (with sand `::before` bar) instead of sunset.
- Section head h2 white; lede `rgba(255,255,255,.78)`.
- **Interactive `<CanvasDemo>`** (full spec under "Interactions" below).
- Below the demo: 4×2 grid of break-type tiles, 14px gap (2×4 on <980px).
  - Each tile: 16:11 aspect, 18px radius, the break image as cover, plus a dark pill label bottom-left ("Open Beach", "Right Point", "Left Point", "Beach Reef", "Outer Reef", "Rivermouth", "Beach Pier", "Breakwall").

### 7. Features (`#features`)
- Cream section, `linear-gradient(180deg, --paper-2, --paper)`.
- Section head: eyebrow "Built for the beach" + h2 "Designed for wet fingers, bright sun and zero patience."
- 3×2 grid, 20px gap (→ 2-col at <980px, 1-col at <640px).
- Card: white, 1px `--line` border, 20px radius, 26px 24px padding, `--shadow-sm`. Hover: lifts 4px, `--shadow-md`.
- Icon tile (`.ficon`): 44×44, 12px radius. Three color variants alternate by card index:
  - Default: `linear-gradient(135deg, --sky-2, --sky-1)` with teal-shadow.
  - `.alt`: `linear-gradient(135deg, --sand, --sunset)` with sunset-shadow.
  - `.alt2`: `linear-gradient(135deg, #5a86c4, --navy)` with navy-shadow.
- Six features (in order, with their icon stroke):
  1. **Skill Rating chart** (line chart icon) - "Your last surf and your overall trend, on the home screen. The chart that motivates the paddle out tomorrow."
  2. **Session library** (folder icon, `.alt`) - "Every session saved by beach name and date. Tap any past surf to read your plan, see the map and the stars."
  3. **Set Timer** (clock icon, `.alt2`) - "Tap as four sets roll in - Surf Reader gives you the average interval so you can be in position when the next one arrives."
  4. **Two planning modes** (hamburger icon) - "Guided 7-question flow when you want coaching, or freeform "I will…" notes when you already know the wave."
  5. **Coaching whispers** (zigzag icon, `.alt`) - "Subtle prompts, never lectures. The app teaches the loop on day one and disappears by day three - out of your way."
  6. **Offline-first** (wave-lines icon, `.alt2`) - "No reception in the dunes? Surf Reader doesn't care. Everything stored on-device. Your plans go with you, not to a cloud."

### 8. Review demo (`#review`)
- 2-column grid `1fr 1fr`, 56px gap (stacks at <980px).
- Left: eyebrow "The post-surf review" + h2 "Honest review beats hopeful memory." + lede + 3-item checklist (sunset checkmarks):
  - "7 self-assessment criteria, one tap each"
  - "Auto-averaged into a single Skill Rating (out of 10)"
  - "Comments field for that one detail you'll want next time"
- Right: **interactive `<ReviewDemo>`** (see Interactions below).

### 9. Method (`#method`) - **dark navy**
- Background: `linear-gradient(180deg, #0a1f3a, #0e2a4d)`. White text. Top/bottom thin white hairlines.
- Eyebrow is sunset on dark.
- Two-column grid `1.1fr 1fr`, 64px gap (stacks at <980px).
- Left:
  - Eyebrow "The Surf Reader Method"
  - h2 (white) "Forty years of coaching, distilled into one loop."
  - **Italic** sand blockquote: *"The surfers who improve fastest aren't the most talented. They're the ones who plan a session, surf the plan, and tell themselves the truth about how it went."*
  - Author row: 56px sand→sunset radial avatar with "MD", then "Martin Dunn" / "Pioneer of professional surf coaching · Founder, eSurfR.com" (subtitle `rgba(255,255,255,.6)`).
- Right: 2×2 grid of stat cards.
  - Card: `rgba(255,255,255,0.04)` background, `rgba(255,255,255,0.10)` 1px border, 18px radius, 24px 26px padding, **no shadow**.
  - `.num`: Fraunces 700 56px, **sand color** (including the inner `<span>`).
  - `.label`: `rgba(255,255,255,0.78)`, 14px, max-width 200px.
  - Stats: **40+** Years coaching surfers from grom to world tour. / **8** Break types Surf Reader knows how to map. / **7** Self-assessment criteria, calibrated for honest rating. / **5** Languages at launch - surf coaching, your tongue.

### 10. Languages strip - light cream (unchanged)
- Centered, padding `50px 0 80px`.
- Eyebrow "Surf, in your language" (sunset).
- Row of 5 chips, 28px gap, wrap:
  - English (EN), Español (ES), Português (PT), 日本語 (JA), Français (FR).
  - Chip: Fraunces 600 22px ink, sub-label below in Inter 600 11px uppercase letter-spacing `.16em`.

### 11. Final CTA (`#download`)
- Dark navy with an orange radial highlight at top: `radial-gradient(ellipse at top, rgba(240,138,42,.25) 0%, transparent 60%), linear-gradient(180deg, --navy 0%, #061830 100%)`.
- Plus a teal bottom glow via `::before` pseudo.
- Center-aligned, 110px top / 120px bottom padding.
- h2 white, `clamp(40px, 6vw, 76px)`, Fraunces 700, `text-wrap: balance`. "*want*" is italic sand.
- Lede `rgba(255,255,255,0.8)`, 19px, max 620px wide.
- Two store buttons side-by-side (flex, 14px gap, wrap):
  - White pill, navy text, 14px radius, big shadow, hover lifts.
  - Each has a small label ("Download on the" / "Get it on") and a big label ("App Store" / "Google Play") + brand SVG icon.
- Small caption: "No account required · Works fully offline · Your sessions stay on your device." `rgba(255,255,255,.55)` 13.5px.

### 12. Footer
- Background `#061830`. Padding `36px 0 40px`.
- Flex row, space-between: 28px logo mark + Fraunces 700 "Surf Reader" on left; `© 2026 Martin Dunn · eSurfR.com · Privacy · Support` on right.
- Link hover color: `--sand`.

---

## Interactive Components (in `app.jsx`)

### `<PhonePreview/>` (mounts to `#phoneScreen`)
Currently unused (the hero uses a static `<img>`), but kept in source as an alternate hero render. Shows sun/sky background with a skill-rating card (`7.6/10`), a sunset "Plan a session" CTA, and a recent-session card. Safe to omit if your codebase already uses the static image.

### `<Flow1Map/>` / `<Flow2Plan/>` / `<Flow3Review/>` (mount to `#flowVis1/2/3`)
Static decorative visuals on the three "how it works" cards. Implement as straightforward React components with inline SVG / image overlays.
- Flow 1: `assets/beach_right_hand.png` background, `assets/me_surfer.png` pin, blue wave arrow SVG with arrowhead marker, dashed red rip line.
- Flow 2: cream gradient background, 3 "guided plan" question cards stacked.
- Flow 3: navy gradient background, 5 rating rows with 10 stars each (last-row star count and fill values are illustrative).

### `<CanvasDemo/>` (mounts to `#canvasDemo`)
The page's biggest interactive piece. State:
- `breakId` - one of `right_hand | open | reef | rivermouth`. Switches the background photo from `assets/beach_*.png`. Each break has a seed set of pins/strokes that loads on switch.
- `mode` - `icons | draw | tools`. Switches the bottom toolbar contents.
- `selectedIcon` (icons mode) - clicking a tray icon selects it; clicking the canvas places it at relative coords and bounces it in (0.55s cubic-bezier(.2,1.6,.4,1) scale anim).
- `drawTool` (draw mode) - `wave | rip | freehand`. Each draws a different colored stroke. Mouse/touch drag captures relative-coord points which render via SVG path.
- Tools mode exposes **Undo** (pops last stroke, then last placement) and **Clear all**.

Tray icons (`TRAY` array, ordered): Surfer, House, Tree, Rocks, Lifesaver tower, Flag, Walking track, Car park, Building. All in `assets/icon_*.png` plus `me_surfer.png`.

Stroke colors: wave `#1565C0`, rip `#C62828` with dasharray `8 6`, freehand `#212121`. Wave strokes get an SVG arrow-marker end.

Canvas frame ("canvas-frame"): white 28px-radius card with padding. Top meta row shows the current break label + count pill. Stage is a 16:9 rounded inner area with the break image as cover + absolutely-positioned placed-icon divs and a stroke SVG overlay. Floating "hint" pill at the top center of the stage tells the user what to do next.

Toolbar (`.canvas-toolbar`): cream pill, three mode buttons left, mode-specific controls in the middle, sunset "Plan →" button right.

### `<ReviewDemo/>` (mounts to `#reviewDemo`)
- Card: white, 24px radius, `--shadow-md`, 28px padding.
- Header: h4 "Whale Beach - Right-hand point" / meta "3 May 2026 · 1.2m clean · 6:40am session · Plan: 'Earlier paddle, later drop.'"
- Seven criteria (`CRITERIA` array): Paddle out, Wave selection, Take-off timing, Bottom turn, Surf execution, Wave count, Energy & focus.
- For each criterion: label on the left, **10-star** row on the right. Stars are 18×18, sunset when on, `rgba(14,42,77,.18)` when off, hover scales 1.15.
- Click a star → that criterion's rating becomes that value. State `ratings = [9,7,8,6,7,8,9]` initially.
- Summary block: "Skill Rating" small caps + the live `avg.toFixed(1)` in Fraunces 700 32px, then `/10` next to it; right side has a 10-segment "ramp" gradient bar showing rounded avg as filled bars.

---

## Animations & Interactions

- **Reveal on scroll** (`.reveal` class): IntersectionObserver with `threshold: 0.15`, adds `.in` class. Elements start at `opacity: 0; translateY(18px)` and animate to `opacity: 1; translateY(0)` over 0.8s cubic-bezier(.2,.7,.3,1).
- **Smooth scroll**: `html { scroll-behavior: smooth; }` for in-page anchor jumps.
- **Buttons**: hover lifts 1–2px (`translateY(-1/-2px)`), 0.15s ease.
- **Feature cards**: hover lifts 4px and upgrades shadow `sm → md`, 0.2s.
- **Break tiles**: hover lifts 3px, 0.25s.
- **Star hover**: scale 1.15.
- **Placed-icon entry** (canvas): `bounceIn` 0.55s `cubic-bezier(.2,1.6,.4,1)` - see `@keyframes bounceIn`.
- **Stage hint pill**: opacity transition 0.35s when text changes.

## Responsive Breakpoints

| Max-width | Change |
|---|---|
| 980px | Hero grid stacks; flow grid stacks; review grid stacks; method grid stacks; features → 2-col; breaks → 2-col |
| 820px | Problem cards stack to 1-col |
| 760px | Nav links (other than CTA) hidden |
| 640px | Features → 1-col |

No mobile-specific designs were prepared beyond these reflows - the layout assumes a desktop-first marketing page that gracefully degrades.

## State Management

The two interactive components hold their own local state (React `useState`). Nothing is persisted, no fetching, no auth, no analytics wired up. The store-button links currently point to `#`; replace with real App Store / Play Store URLs.

## Assets

All in `assets/`:

| File | Use |
|---|---|
| `logo_mark.png` / `.svg` | 38×38 brand mark - nav and footer |
| `logo_full.png` / `.svg` | Full lockup - not currently used on the page |
| `app_home.png` | App home screenshot - fills the hero phone screen |
| `app_icon.png` | App icon (square) - not currently used |
| `hero.jpg` | Photographic hero option - not currently used |
| `beach_open.png`, `beach_right_hand.png`, `beach_left_hand.png`, `beach_reef.png`, `beach_outer_reef.png`, `beach_river_mouth.png`, `beach_pier.png`, `beach_jetty.png` | 8 aerial photos - used in the canvas demo background switcher and in the 8-tile gallery below the canvas |
| `me_surfer.png` | "Surfer" pin icon - canvas tray + Flow1Map visual |
| `icon_house.png`, `icon_tree.png`, `icon_rocks.png`, `icon_lifesaver_tower.png`, `icon_lifesaver_flag.png`, `icon_walking_track.png`, `icon_carpark.png`, `icon_building.png` | Canvas tray icons |
| `icon_sand_dunes.png`, `icon_wave_start.png` | Available tray icons not currently in the TRAY array - add if you want to extend |
| `esurfr_brand.png` | eSurfR logo - not currently used on the page |

All photographic assets came from Martin Dunn's eSurfR coaching library - confirm licensing before re-using outside the Surf Reader product.

## Copy Voice

Concise, slightly cheeky, surf-literate. Short sentences. Active voice. "Plan the surf you *want*. Then surf it." - that's the tone. Avoid corporate speak, avoid "leverage" / "robust" / "seamless". Don't use emoji.

## Implementation Notes

- The current `Surf Reader.html` is self-contained - opening it in a browser works. Use it as the visual source of truth.
- All inline `<style>` is in one block at the top of the HTML - port directly to your CSS layer (Tailwind via `@layer components`, CSS Modules, plain global CSS - anything works).
- The two interactive React widgets are decoupled - they each mount into their own DOM root (`#canvasDemo`, `#reviewDemo`). In a real React app, render them as normal children inside the page component.
- The phone preview's hero render is currently a static `<img src="assets/app_home.png">` inside `.phone-screen`. The `<PhonePreview/>` React variant in `app.jsx` is kept as an alternate option - pick one.
- The `<script type="application/json" id="speaker-notes">` pattern is **not** used here; this is a regular marketing page, not a deck.

## Open Questions for the Engineer

1. **Store links** - placeholders point to `#`. Replace once App Store / Play Store URLs exist.
2. **Real metrics** - the stats (40+, 8, 7, 5) are factual; the "skill rating" sample data in the review demo (7.6/10) is illustrative. The flow-card visuals are mocked too.
3. **Localization** - five languages are advertised but the page itself ships English-only. Decide if marketing page should localize, and if so, plug into your i18n stack.
4. **Privacy / Support links** - currently `#`.
5. **Analytics** - none wired.
6. **SEO** - only basic `<title>` and favicon set. Add OG tags, Twitter card, JSON-LD, etc.
