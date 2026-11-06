# Afroful: Build TODO

One session, whole site. Sources: `SPEC.md` (what), `REQUIREMENTS.md` (checklist, wins on conflict),
`code-conventions/` (how), the two Afroful mocks (look and content).

Rule for every phase: stop at its **Gate**. Do not start the next phase until the gate passes.

## What the mocks give us

- **Look**: palette `#8B2E1F` red, `#E9A820` yellow, `#4A2C1A` brown, `#FFF6E5` cream, `#2B1B12` text. Alfa Slab One
  headings, Nunito body. Cards with soft shadow and large radius, yellow footer rule, dark mode via variables.
- **Content**: the mock's script holds the copy for all 5 recipes (story, ingredients with amounts and units, 4 steps,
  nutrition), the 3 regions (intro, staples, techniques, "also try") and the trend articles. Reuse it. Do not rewrite
  it.
- **Images**: the mocks contain **none**. Every photo is a striped placeholder with a label such as
  `[ hero photo: spread of West African feast, overhead ]`. Those labels are the shot list for Phase 0.
- **Mock-only things not to copy**: the single-page React app, inline styles, `JetBrains Mono` (placeholder labels
  only), the "Mobile views" footer link, fractions in the servings display (spec says decimals, max 2, trailing zeros
  trimmed).

---

## Phase 0: Media (images, videos, maps)

Done first, because the layout depends on real aspect ratios and the spec's "every embed loads" check needs real IDs.

**Images.** Needed: 1 hero, 5 dish photos (reused on home, listing, recipe pages), 3 region photos, 1 about image if
used. About 10 files.

- [ ] Source each from Unsplash first. Use Wikimedia Commons only where Unsplash has no good photo of the dish (likely
  Isombe, Injera). Never guess a photo ID. (Decided with the user.)
- [ ] Pick photos that crop well to 16:9, 4:3 and square, since cards, hero and recipe pages use different ratios. Use
  `srcset`/`sizes` or width params so mobile does not load desktop-size images.
- [ ] Check each URL returns HTTP 200 and `image/*`, then look at the image to confirm it shows the right dish.
- [ ] Record each in the table below: file or URL, dish, credit.
- [ ] Add a crop and size parameter to each URL (e.g. `?w=1200&q=80`) so pages stay light.
- [ ] If any dish has no good photo, say so and ask. Do not substitute a different dish.
- [ ] Write real `alt` text for each now (what is in the picture, not "image of food").
- [ ] Keep the mock's striped gradient as a CSS `background` behind each `<img>` so a failed hotlink still looks
  intentional.

**YouTube.** Needed: 1 home intro, 5 tutorials, 3 region videos (can reuse), 0 for about. About 9 embeds.

- [ ] Find one video per dish and region. Prefer reputable channels and videos that allow embedding.
- [ ] Verify each ID with the oEmbed endpoint (`youtube.com/oembed?url=...`): 200 means embeddable.
- [ ] Use `youtube-nocookie.com/embed/<id>`.

**Maps.**

- [ ] 5 country embeds (Nigeria, Egypt, Ethiopia, Rwanda, South Africa) using the keyless
  `maps.google.com/maps?q=<place>&output=embed` form.
- [ ] 1 about-page landmark (pick one real, well-known food place or market, e.g. Khan el-Khalili, Cairo).

**Gate**: media table complete, every URL checked, every dish has a verified photo.

| Slot                 | Source URL | Credit | Alt text |
|----------------------|------------|--------|----------|
| hero                 |            |        |          |
| jollof-rice          |            |        |          |
| koshari              |            |        |          |
| injera               |            |        |          |
| isombe               |            |        |          |
| bunny-chow           |            |        |          |
| west-africa          |            |        |          |
| north-africa         |            |        |          |
| east-southern-africa |            |        |          |

---

## Responsive plan (applies to every phase)

Three targets, mobile-first, two `min-width` breakpoints (`48rem` tablet, `64rem` desktop). This replaces the spec's
single `max-width: 768px` breakpoint and is recorded in `SPEC.md` §6.

| Piece                                         | Mobile (base)                                        | Tablet (≥768px)                        | Desktop (≥1024px)                               |
|-----------------------------------------------|------------------------------------------------------|----------------------------------------|-------------------------------------------------|
| Header and nav                                | Site name, toggle, nav wraps or stacks, 44px targets | Nav on one row                         | Nav on one row, more spacing                    |
| Container                                     | Full width, 1rem gutter                              | `max-width` about 48rem, 1.5rem gutter | `max-width` about 72rem, centred                |
| Hero                                          | Stacked: text, then video                            | Stacked, larger type                   | Text and video side by side                     |
| Card grids (dishes, recipes, regions, trends) | 1 column                                             | 2 columns                              | 3 to 4 columns                                  |
| Recipe page                                   | Single column. Servings control above ingredients    | Single column, wider                   | Two columns: image and facts beside ingredients |
| Embeds                                        | Full width, 16/9                                     | Capped width                           | Capped width, centred                           |
| Nutrition table                               | Fits at 375px, no overflow                           | Same                                   | Same                                            |
| Contact form                                  | Full-width fields                                    | Centred, capped width                  | Centred, capped width                           |
| Type                                          | `clamp()` for headings                               |                                        |                                                 |

- [ ] Use fluid rules (`auto-fit`/`minmax`, `clamp()`) first. Add a breakpoint rule only where fluid is not enough.
- [ ] Touch sizes: buttons, nav links, filter buttons and the servings `+`/`−` are at least 44px.
- [ ] Hero background image: `background-size: cover`, check the focal point on a tall phone crop.
- [ ] Do not hide content on mobile. Same content at every size.

## Phase 1: Foundation

- [x] Create `styles.css` with the layer order and banner sections from `modularity.md`: tokens (light and `body.dark`),
  reset, base, layout, ui, components, utilities, then the tablet and desktop media queries.
- [x] Tokens: palette, font stacks, spacing scale in `rem`, radius, shadow. No raw values afterwards.
- [x] Create `script.js` skeleton: constants block (`THEME_KEY`, `FAVORITES_KEY`, `DEFAULT_SERVINGS`, `MIN_SERVINGS`,
  `MAX_SERVINGS`, `MIN_MESSAGE_LENGTH`), storage helpers with `try/catch`, empty `init*` functions, entry point.
- [x] Build the canonical header, nav (Home, Recipes, Regions group, About, Contact), theme toggle with `aria-pressed`,
  and footer.
- [x] Add the Google Fonts `<link>` (Alfa Slab One, Nunito) with `preconnect`, plus viewport meta, `styles.css` and
  `script.js defer` as the head template.
- [x] Build the shared UI pieces: button, `mark`, card shell, `embed` wrapper (16/9), focus style.
- [x] Implement `initTheme` (toggle `body.dark`, persist `theme`, apply on load).

**Gate**: `index.html` stub shows header and footer correctly at 375px, 768px and 1280px, toggle works and survives a
refresh, console clean.

## Phase 2: Recipe template (`jollof-rice.html`, canonical)

- [ ] `<h1>`, hero `<figure>`/`<figcaption>`, story paragraph with `<mark>` on key ingredients (convert the mock's
  `*word*` markers).
- [ ] Ingredients `<ul>`, every amount `<span class="amount" data-base="...">` with unit text beside it.
- [ ] Servings control: `−`, count, `+`, with `aria-label`s and `aria-live` on the count.
- [ ] Steps in `<details>` + `<summary>` with an `<ol>`.
- [ ] YouTube `<iframe>` with `title`, nutrition `<table>` (`<caption>`, `<th scope>`), map `<iframe>`.
- [ ] Links back to Recipes and to the region page.
- [ ] CSS section for each component above, mobile-first (see Responsive plan).
- [ ] `initIngredientScaling`: pure `scaleAmount(base, servings)` plus a DOM shell.

**Gate**: Jollof page complete at 375px, 768px and 1280px, scaling works from 1 to 12, no console errors.

## Phase 3: Remaining recipe pages

- [ ] Copy the Jollof page to `koshari.html`, `injera.html`, `isombe.html`, `bunny-chow.html`.
- [ ] Change only content, ids, `data-*`, region link, `aria-current`, media from Phase 0.
- [ ] Fill each from the mock's data (story, ingredients, steps, nutrition).
- [ ] Diff each page's structure against the Jollof page. Structure must be identical.

**Gate**: all 5 recipe pages pass RP1 to RP11.

## Phase 4: Recipes listing (`recipes.html`)

- [ ] 5 recipe cards, each with `data-region`, `data-id`, image, name, country, description, recipe link, `❤️ Favorite`
  button with `aria-pressed`.
- [ ] Filter bar: All, West Africa, North Africa, East & Southern Africa, with `data-filter` and `.active`.
- [ ] `initRecipeFilter` (click listener, loop over cards, toggle `.hidden`).
- [ ] `initFavorites` (toggle `.favorited`, persist JSON array in `favorites`, restore on load, validate what is read
  back).
- [ ] Card grid CSS with `auto-fit`/`minmax`.

**Gate**: every filter works, 2 favorites survive a hard refresh, un-favoriting removes the id.

## Phase 5: Region template and pages

- [ ] Build `west-africa.html` fully: intro, staples, techniques (≥3 `<mark>` on spices and methods), dish cards linking
  to recipes, YouTube embed, "also try" line.
- [ ] Copy to `north-africa.html` and `east-southern-africa.html`.
- [ ] East & Southern: three recipe links, plus Kenya (Nyama Choma) and Mozambique (Piri-Piri Chicken) as plain text
  with no links.

**Gate**: RG1 to RG5 pass, all dish links resolve.

## Phase 6: Home, About, Contact

- [ ] `index.html` hero: CSS background image, overlay, welcome text, YouTube iframe.
- [ ] Featured dishes: 4 `<figure>` cards with `<img>`, `<figcaption>`, recipe links.
- [ ] Explore by region: 3 cards. Latest food trends: 3 `<article>` with heading, date and original text. ≥3 `<mark>`.
- [ ] `about.html`: styled `<blockquote>` mission, 2 to 3 history paragraphs, landmark map.
- [ ] `contact.html`: labelled name, email, country (`<input list>` + `<datalist>` with the explanatory comment),
  message, submit. Inline error element wired with `aria-describedby`.
- [ ] `initContactForm`: `preventDefault`, trimmed message must be **more than** 20 characters, error otherwise, on
  success hide form and show "Thank you, [Name]! We've received your message." via `textContent`.

**Gate**: 20 characters fails, 21 passes, name appears safely, all 12 pages exist.

## Phase 7: Polish

- [ ] Nav hover (color plus underline), card hover, input `:focus` glow, `mark` style. Hover and transition only, no
  `@keyframes`.
- [ ] Check dark mode contrast on every page type.
- [ ] Check 375px (mobile), 768px (tablet) and 1280px (desktop) on every page, plus 320px and 1024px edge widths. No
  horizontal scroll, no clipped text, no overlapping elements.
- [ ] Rotate-test tablet portrait (768px) and landscape (1024px).
- [ ] Add section comments in HTML, CSS and JS. Remove dead code and any `console.log`.

## Phase 8: Verification (`REQUIREMENTS.md` §13)

- [ ] Open all 12 pages: zero console errors, also with JS disabled for content.
- [ ] Link check: every `href` resolves (script it with grep and `ls`).
- [ ] Every YouTube, map and image URL still returns 200.
- [ ] `grep`: no `onclick=`, no `style=`, no `@keyframes`, no `innerHTML`, every `<img>` has `alt`, every page has
  `styles.css`, `script.js`, viewport, fonts.
- [ ] Walk every row in `REQUIREMENTS.md` §1 to §10 and tick it. Confirm §11 items are absent.
- [ ] W3C HTML validation on each page.
- [ ] Favorites and theme persistence after a hard refresh.

**Gate**: all boxes ticked. Report any that are not.

## Phase 9: Ship (only when asked)

- [ ] `git init` is already done. Commit in small steps. Do not commit `CLAUDE.md` or `docs/code-conventions/`.
- [ ] Push to `taste_of_africa_website_project`.
