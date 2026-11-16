# Original User Request

## Initial Request — 2026-11-10T14:35:37Z

use all skills and obsidian memory in your disposal and do

# Lando Norris — Style Reference
> highlighter ink on a topo map. Lay heavy uppercase statements over olive and chalk contour grounds, swap in lime serif words, and spend the neon only on controls and signatures.

**Theme:** mixed

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Lando Norris is a scroll-driven athlete site that alternates a deep Paddock Olive #282c20 canvas with Chalk Cream #f4f4ed sections, both laced with fine topographic contour lines. Signal Lime #d2ff00 is spent sparingly on 8px-radius store buttons, a hand-drawn signature scribble and the footer glow, while Moss Lime #b2c73a colours the serif words inside statements. Type is a deliberate collision: Mona Sans Variable set uppercase, narrowed to wdth 93 and pushed to wght 660–750, trades words mid-line with Brier, a sharp high-contrast display serif. Photography is scattered as small captioned fragments, helmets sit in notched outline cards on Visor Black #111112, and nothing carries a shadow.

## Colors

| Name | Value | Role |
|------|-------|------|
| Paddock Olive | `#282c20` | Body canvas, statement sections, footer panel and all dark text on light grounds — a green-black that keeps the lime feeling native |
| Chalk Cream | `#f4f4ed` | Light section canvas, menu button fill and light text on dark — a warm paper tone that carries the contour lines |
| Signal Lime | `#d2ff00` | Store and call-to-action button fills, the signature scribble and the footer glow — the helmet colour used as a live switch, never a wash |
| Moss Lime | `#b2c73a` | Brier serif words inside uppercase statements on dark grounds — a dulled lime so the serif reads as voice, not as a button |
| Visor Black | `#111112` | Helmet Hall of Fame canvas and other product-shot sections where colour helmets need a neutral void |
| Sage Fog | `#dde1d2` | Uppercase Mona Sans statement words on Paddock Olive — a warm off-white that sits behind the lime serif words |
| Tarmac Gray | `#535450` | One-pixel helmet-card outlines, contour-line fills and muted labels on dark sections |
| Lichen Gray | `#b4b8a5` | Caption pills, 1px pill borders and secondary copy on olive grounds |
| Stone Gray | `#b9bbad` | Supporting paragraph copy on the on-track and off-track teasers |
| Lime Halo Gradient | `radial-gradient(circle at 50% -190%, rgba(210, 255, 0, 0) 68%, rgb(210, 255, 0) 83%)` | Radial glow rising behind the footer panel, fading Signal Lime to transparent at the top of the page end |

## Typography

### Mona Sans Variable — The workhorse: uppercase statements, headlines, buttons, footer links and body. Big roles run narrowed with font-variation-settings "wdth" 93 and "wght" 660 (117.59px statement) or 750 (103.7px and 66.67px titles), at 0.82–0.9 line-height and up to -3.7px tracking, so headlines pack like a race-suit patch; body sits at 18.52px/400.
- **Substitute:** Mona Sans, Arial, sans-serif
- **Licence:** open (SIL Open Font License); free to use and self-host
- **Weights:** 400, 600, 700, 800
- **Sizes:** 9.26px, 11.11px, 13.33px, 14px, 14.81px, 18.52px, 22.22px, 27.78px, 32px, 66.67px, 77.78px, 103.7px, 117.59px
- **Line height:** 0.82, 0.85, 0.89, 0.90, 1.00, 1.25, 1.43
- **Letter spacing:** -3.7px at 103.7px; -1.85px at 66.67px; -0.93px at 117.59px; -0.19px at 18.52px; 0 at small sizes
- **OpenType features:** `"wdth" 93, "wght" 660 (statement); "wdth" 93, "wght" 750 (titles)`

### Brier — A sharp, high-contrast display serif dropped into Mona Sans lines as the emotional word (REDEFINING, WINS, LEGACY, CHAMPION) at 69.44–122.22px with -1.85 to -3.24px tracking, and used lowercase for quiet quotes at 22.22px and 29.63px with +0.74px tracking. Only the Bold file loads, so the 400 roles render from it.
- **Substitute:** Bodoni Moda, Georgia, serif
- **Licence:** commercial; buy a licence from its foundry, or use the substitute
- **Weights:** 400, 700
- **Sizes:** 22.22px, 29.63px, 66.67px, 69.44px, 80.56px, 103.7px, 108.33px, 122.22px
- **Line height:** 0.81, 0.83, 0.86, 0.89, 0.94, 1.04
- **Letter spacing:** -3.24px at 108.33px; -2.78px at 122.22px; -1.85px at 69.44px; +0.74px at 22.22px and 29.63px

## Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing |
|------|--------|--------|------|-------------|----------------|
| eyebrow | Mona Sans Variable | 400 | 9.26px | 1 | 0px |
| caption | Mona Sans Variable | 600 | 13.33px | 1.25 | 0px |
| button | Mona Sans Variable | 800 | 14.81px | 1 | 0px |
| body | Mona Sans Variable | 400 | 18.52px | 1.25 | -0.19px |
| quote | Brier | 400 | 22.22px | 0.94 | 0.74px |
| footer-link | Mona Sans Variable | 800 | 27.78px | 1 | 0px |
| lead-quote | Brier | 400 | 29.63px | 1.04 | 0.74px |
| title | Mona Sans Variable | 700 | 66.67px | 0.89 | -1.85px |
| impact | Mona Sans Variable | 700 | 103.7px | 0.82 | -3.7px |
| statement | Mona Sans Variable | 400 | 117.59px | 0.9 | -0.93px |
| display-serif | Brier | 700 | 122.22px | 0.83 | -2.78px |

## Spacing & Layout

**Base unit:** 4px

**Density:** spacious

- **Section gap:** 88.89px
- **Card padding:** 18.52px
- **Element gap:** 18.52px

### Border Radius

- **buttons:** 8px
- **nav:** 8px
- **badges:** 2.96px
- **indicator:** 14px
- **cards:** 0px
- **images:** 0px

## Components

### Floating Chrome Bar
**Role:** Fixed site navigation layer

No bar or fill: a fixed layer inset 18.52px with the stacked LANDO (serif) over NORRIS (heavy sans) SVG wordmark top-left, the LN monogram centred, and a Signal Lime Store button beside a 55.5px square menu button top-right. It sits over every section without a shadow.

### Assembling Helmet Hero
**Role:** Opening portrait moment

A full-viewport Chalk Cream #f4f4ed ground with contour lines and a centred chest-up 3D portrait whose wireframe helmet and livery visor bands slide into place. No headline: the floating chrome and a Next Race ticket at 18.52px inset frame it. On scroll it shrinks to an inset card over Paddock Olive #282c20.

### Signal Lime Store Button
**Role:** Primary navigation action

A 55.5px-high Signal Lime #d2ff00 rectangle with a 1px #d2ff00 border, 8px radius and 0 14.81px padding; a line bag icon then STORE in Mona Sans 18.52px/800 uppercase, Paddock Olive #282c20, 1.0 line-height. No shadow.

### Square Menu Button
**Role:** Menu toggle

A 55.5px square with 8px radius and a two-dash glyph of unequal lengths. On dark sections it is filled Chalk Cream #f4f4ed with a Paddock Olive glyph; on light sections it turns to a 1px Paddock Olive #282c20 outline on a transparent fill.

### Lime Arrow Button
**Role:** Section call to action

Signal Lime #d2ff00 fill, 8px radius, 0 14.81px padding, about 44px high. Label in Mona Sans 14.81px/800 uppercase Paddock Olive (VIEW ON TRACK, VISIT THE STORE) followed by a small hooked return-arrow icon; no border contrast, no shadow.

### Lime Icon Tile
**Role:** Arrow-only link under teasers

A 55px square of Signal Lime #d2ff00 with 8px radius holding only a hooked arrow glyph in Paddock Olive #282c20, aligned to the inner edge of the On Track and Off Track copy blocks.

### Mixed-Face Statement Block
**Role:** Manifesto headline

Centred uppercase lines in Sage Fog #dde1d2 Mona Sans Variable 117.59px ("wdth" 93, "wght" 660, 0.9 line-height, -0.93px) on Paddock Olive, with key words swapped for Moss Lime #b2c73a Brier 700 at 122.22px, 0.83 line-height and -2.78px tracking.

### Captioned Photo Fragment
**Role:** Scattered story imagery

Square-cornered photo with a 9.26px/400 uppercase Mona Sans caption 14.81px above it (QATAR, 2024). Fragments are scattered at uneven offsets in sizes from about 270px to 655px wide; smaller ones carry an olive duotone, one large frame stays full colour.

### Brier Callout Quote
**Role:** Personal quote with signature

Brier 22.22px/400 lowercase at 0.94 line-height and +0.74px tracking, Chalk Cream on dark or Paddock Olive on light, with two words bolded to 700. A small Signal Lime #d2ff00 signature scribble sits 18.52px below.

### Notched Helmet Card
**Role:** Helmet Hall of Fame tile

Visor Black #111112 cell framed by a 1px Tarmac Gray #535450 line with square corners and a chamfered notch rising to a caption tab at bottom-right. Helmet render centred; caption is Mona Sans 13.33px/600 Chalk Cream name plus 13.33px/700 Signal Lime year.

### Next Race Ticket
**Role:** Upcoming race widget

A narrow outlined ticket bottom-left of the hero with a notched tab carrying NEXT RACE in 9.26px/400 uppercase, a circuit outline, the race name, a 1px Paddock Olive #282c20 divider, then a laurel helmet badge and MCLAREN F1 SINCE 2019 in 9.26px caps.

### On Off Track Teaser
**Role:** Two-way section split

Two centred columns on Chalk Cream: Brier 108.33px/700 ON or OFF stacked over Mona Sans 103.7px/700 TRACK (-3.7px tracking, 0.82 line-height), an 18.52px/400 Paddock Olive line at -0.19px, and a Lime Icon Tile; cut-out helmet and portrait bleed off both edges.

### Store Feature Block
**Role:** Merchandise promotion

Chalk Cream half with a bag-icon LANDO STORE eyebrow at 16.67px uppercase, WORLD DRIVERS' in Mona Sans 103.7px/700 over CHAMPION in Brier 103.7px/700 (-3.7px), an 18.52px/400 paragraph and a Lime Arrow Button, beside a square-cornered product photo collage.

### Partner Logo Strip
**Role:** Sponsor marquee

A 51px-high single row of monochrome Paddock Olive #282c20 partner logos spaced evenly across the full width on Chalk Cream, crossed by a giant Signal Lime #d2ff00 brush-script Collabs word behind the PARTNERS & CAMPAIGNS title.

### Fanned Social Deck
**Role:** Social media showcase

Seven portrait photo cards with generously rounded corners fanned in an arc, the centre card upright and larger, outer cards rotated and tucked behind, under a WHAT'S UP (Mona Sans 66.67px/700) ON SOCIALS (Brier 66.67px/700, -1.85px) title on Chalk Cream.

### Inset Footer Panel
**Role:** Site footer

A Paddock Olive #282c20 panel inset 18.52px from the edges with a raised centre tab, on the Lime Halo Gradient ground. ALWAYS BRINGING THE FIGHT. in Mona Sans and Moss Lime Brier, link columns in Mona Sans 27.78px/800 uppercase Chalk Cream under 9.26px labels, a centre helmet portrait and a partner logo row.

## Do's and Don'ts

### Do
- Use Paddock Olive #282c20 and Chalk Cream #f4f4ed as the two alternating section grounds, both overlaid with thin topographic contour lines.
- Set uppercase statements in Mona Sans Variable 117.59px with "wdth" 93, "wght" 660, 0.9 line-height and -0.93px tracking.
- Pair each statement with one or two Brier 700 words in Moss Lime #b2c73a at 122.22px and -2.78px tracking, inline in the same line.
- Reserve Signal Lime #d2ff00 for filled buttons with 8px radius and Paddock Olive labels, the signature scribble and the footer glow.
- Keep labels as 9.26px/400 uppercase Mona Sans captions above photos, written as place and year ("QATAR, 2024").
- Place helmets and product shots on Visor Black #111112 inside 1px Tarmac Gray #535450 outline cards with a chamfered caption notch.
- Apply the 0.75s cubic-bezier(0.65, 0.05, 0, 1) curve to every reveal, clip-path wipe and transform.

### Don't
- Do not fill sections or large cards with Signal Lime #d2ff00; it lives on controls, the scribble and the footer halo only.
- Do not set the Brier serif words in Signal Lime on dark statements; use the duller Moss Lime #b2c73a.
- Do not use pill or fully rounded buttons; every control is an 8px-radius rectangle about 55px tall in the nav.
- Do not add drop shadows to cards, photos or buttons; separate with tone, 1px outlines and parallax.
- Do not set statements in sentence case or at normal width; keep Mona Sans uppercase at "wdth" 93.
- Do not use pure white or pure black text; light is Chalk Cream #f4f4ed or Sage Fog #dde1d2 and dark is Paddock Olive #282c20.
- Do not arrange photos in a tidy grid; scatter small captioned fragments at uneven offsets around one larger image.

## Elevation

There is no cast shadow anywhere. Depth comes from tonal switches between Paddock Olive, Chalk Cream and Visor Black sections, from 1px Tarmac Gray #535450 outlines with chamfered notches around helmet cards, and from scroll parallax: photo fragments and cut-out portraits drift at different speeds over the contour-line background instead of floating on shadows.

## Surfaces

- **Paddock Olive** (`#282c20`) — Body canvas, manifesto statement and inset footer panel.
- **Chalk Cream** (`#f4f4ed`) — Hero, teaser, store, partner and social sections.
- **Visor Black** (`#111112`) — Helmet Hall of Fame grid and its call-to-action strip.
- **Signal Lime** (`#d2ff00`) — Buttons, icon tiles and the glowing ground around the footer.

## Imagery

Photography is the content. The hero is a live WebGL portrait: a front-on cut-out of Lando whose wireframe helmet shell and visor slices assemble around his head on the cream contour ground. Below it come candid paddock and trackside shots, cut-out portraits and side-profile helmet renders. Photos are square-cornered and appear as small scattered fragments with 9.26px uppercase place-and-year captions, some desaturated into an olive-green duotone while one hero frame per cluster stays full colour. Helmets are isolated 3D renders (several animated with Rive) on Visor Black, their lime camouflage livery doubling as the brand pattern. Graphics are hand-made: a lime signature scribble, a looping "Collabs" brush word behind the partner logos, fine topographic contour lines on every ground, and monochrome partner logos in Paddock Olive. The social section fans rounded portrait cards in an arc.

## Layout

The site is a long, full-bleed, fluid-scaled scroll (rem is 14.81px at 1600px) with no visible max-width container. A fixed chrome layer (wordmark, monogram, Store and menu buttons) floats over everything, inset 18.52px. Sections switch ground as you scroll: a contour-lined Chalk Cream hero filled by a centred, chest-up 3D portrait of Lando with a small Next Race ticket bottom-left; on scroll the hero shrinks into an inset card over Paddock Olive while a giant mixed-face headline marquee and the lime signature pass behind it; then a centred manifesto of six uppercase lines, a scattered-photo horizontal story, a split On Track / Off Track teaser flanked by cut-out helmet and profile, a full-bleed portrait, a Visor Black four-column staggered helmet grid, a Chalk Cream store block with a product collage, a partner logo marquee, a fanned social-card deck, and an inset olive footer panel on a lime glow.

## Similar Brands

- **McLaren Racing** — Shares the motorsport photography, heavy uppercase sans headlines and a single saturated team colour used as the action accent.
- **Mercedes-AMG Petronas F1** — Uses a near-black canvas with one electric accent colour reserved for highlights and controls around car and driver imagery.
- **Formula 1** — Same heavy uppercase display type set tight over full-bleed driver and helmet photography.


use this design .md file to adjust my portfolio according to this the coffee theme should be removed it looks irrelavant

---
### Context & Constraints
- Workspace: D:\Arsalan\Portfolio_nextjs
- Profile: Muhammad Arsalan Warsi (Full-Stack / MERN Developer).
- Stack: Next.js 16.4.0 (Turbopack), Tailwind CSS v4, Framer Motion, TypeScript.
- User's Obsidian Memory Vault: C:\Users\LENOVO\Documents\Antigravity-Memory (check durable-memory/preferences.md and durable-memory/facts.md).
- Global skills library: 2,955 skills installed in C:\Users\LENOVO\.gemini\config\skills.
- The coffee theme (CoffeeCursor.tsx, CoffeeScrollRail.tsx, DeferredCoffeeCursor.tsx, coffee brewing graphics, cup/stream animations, warm coffee brown colors) must be completely removed and replaced with the Lando Norris design specification: Paddock Olive (#282c20), Chalk Cream (#f4f4ed), Signal Lime (#d2ff00), Moss Lime (#b2c73a), Visor Black (#111112), fine topographic contour line overlays, 8px radius buttons, chamfered cards, Mona Sans + Bodoni Moda / display serif typography, 0 shadows, and scroll-driven athletic precision.

## Follow-up — 2026-11-10T14:38:10Z

Please route and execute directly on the request as received. All specifications, design tokens, typography, component behaviors, and constraints are fully detailed in the prompt.

## Follow-up — 2026-11-11T17:10:32Z

continue

Note: The quota has reset after yesterday's 429 RESOURCE_EXHAUSTED error, and the server restarted (all subagents and background tasks were stopped). Please check your subagents (e.g., Project Orchestrator `90c00ba6-7763-4f5b-aeb5-9760561ec640` and its milestone/testing sub-orchestrators), check the latest `progress.md` / `BRIEFING.md` / `PROJECT.md` state, revive or respawn any stopped subagents and liveness/reporting crons as needed, and continue executing the portfolio redesign to completion.
