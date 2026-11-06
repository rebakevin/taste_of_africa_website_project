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

- [x] Source each from Unsplash first. Use Wikimedia Commons only where Unsplash has no good photo of the dish (likely
  Isombe, Injera). Never guess a photo ID. (Decided with the user.)
- [x] Pick photos that crop well to 16:9, 4:3 and square, since cards, hero and recipe pages use different ratios. Use
  `srcset`/`sizes` or width params so mobile does not load desktop-size images.
- [x] Check each URL returns HTTP 200 and `image/*`, then look at the image to confirm it shows the right dish.
- [x] Record each in the table below: file or URL, dish, credit.
- [x] Add a crop and size parameter to each URL (e.g. `?w=1200&q=80`) so pages stay light.
- [x] If any dish has no good photo, say so and ask. Do not substitute a different dish.
- [x] Write real `alt` text for each now (what is in the picture, not "image of food").
- [ ] Keep the mock's striped gradient as a CSS `background` behind each `<img>` so a failed hotlink still looks
  intentional.

**YouTube.** Needed: 1 home intro, 5 tutorials, 3 region videos (can reuse), 0 for about. About 9 embeds.

- [x] Find one video per dish and region. Prefer reputable channels and videos that allow embedding.
- [x] Verify each ID with the oEmbed endpoint (`youtube.com/oembed?url=...`): 200 means embeddable.
- [x] Use `youtube-nocookie.com/embed/<id>`.

**Maps.**

- [x] 5 country embeds (Nigeria, Egypt, Ethiopia, Rwanda, South Africa) using the keyless
  `maps.google.com/maps?q=<place>&output=embed` form.
- [x] 1 about-page landmark (pick one real, well-known food place or market, e.g. Khan el-Khalili, Cairo).

**Gate**: media table complete, every URL checked, every dish has a verified photo.

| Slot                 | Source URL | Credit | Alt text |
|----------------------|------------|--------|----------|
| hero                 | https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Lunch_on_the_street.jpg/1280px-Lunch_on_the_street.jpg | OussamaHamama, CC BY-SA 4.0 (Wikimedia Commons) | Overhead view of a shared meal on a round table: a leafy stew, boiled cassava, a chicken in orange sauce and balls of swallow, with a hand reaching in. |
| jollof-rice          | https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Jollof_rice_with_vegetable.jpg/960px-Jollof_rice_with_vegetable.jpg | Segun Famisa, CC BY-SA 4.0 | A plate of orange-red jollof rice topped with a stewed egg, beside a portion of cooked leafy greens. |
| koshari              | https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Egyptian_Koshari.jpg/960px-Egyptian_Koshari.jpg | Basma, CC BY-SA 4.0 | A foil bowl of koshari: macaroni and rice topped with chickpeas and red tomato sauce, with more sauce being spooned over it. |
| injera               | https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Injera_with_eight_kinds_of_stew.jpg/960px-Injera_with_eight_kinds_of_stew.jpg | Artem.G, CC BY-SA 4.0 | Overhead view of a round platter lined with injera, topped with small portions of lentils, vegetables and salad, with rolled injera around the edge. |
| isombe               | https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/ISOMBE.jpg/960px-ISOMBE.jpg | Mutiganda, CC BY-SA 4.0 | A wooden plate with a mound of dark green isombe over white rice, with a yellow scotch bonnet pepper on top. |
| bunny-chow           | https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chicken_Curry_Bunny_Chow.JPG/960px-Chicken_Curry_Bunny_Chow.JPG | Lucinda jolly, CC BY-SA 4.0 | A hollowed-out quarter loaf of white bread filled with orange curry, beside a torn piece of bread with curry on it, on a wooden board. |
| west-africa          | https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Food_Vendor_01.jpg/960px-Food_Vendor_01.jpg | Amuzujoe, CC BY-SA 4.0 | A street food vendor in Ghana in an apron and head wrap spooning stew into a container at a busy market stall. |
| north-africa         | https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Spice_shop_in_the_souks.jpeg/960px-Spice_shop_in_the_souks.jpeg | Dan Lundberg, CC BY-SA 2.0 | A Marrakech spice shop with cones of yellow, orange and red spices, jars of dried herbs on the shelves, and a shopkeeper at the back. |
| east-southern-africa | https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/ZA-Durban-curry-markt.jpg/960px-ZA-Durban-curry-markt.jpg | Bgabel, CC BY-SA 3.0 | Metal bowls of red, orange and yellow curry spices and crushed chilli on a Durban market counter. |

**Videos (all pass oEmbed, `youtube-nocookie.com/embed/<id>`)**

| Slot | ID | Title |
|------|----|-------|
| home intro | `1zyDUkdVZ0E` | Exploring the Richness of African Cuisine and Traditional Foods |
| jollof-rice | `gLBSHVaZQj4` | Nigerian party jollof rice |
| koshari | `nEC4hBdcq0k` | How to make authentic Egyptian Koshari |
| injera | `NwVSl3FQt78` | How to Make Injera (Ethiopian Flatbread) Mulu's Way |
| isombe | `eFt-j42yaRY` | Learn with me how to cook ISOMBE in Kigali Rwanda |
| bunny-chow | `vIVW3T8-w78` | Bunny Chow, Durban style chicken bunny |
| west-africa | `oqy5T4pcV5E` | West African Street Food Tour in Accra, Ghana |
| north-africa | `RjYgSqSXiOQ` | Moroccan Street Food After Dark, Jemaa El-fnaa, Marrakech |
| east-southern-africa | `pf8S_xvND-k` | 72 Hours in Addis Ababa (street food) |

**Maps** (`maps.google.com/maps?q=<place>&output=embed`): Nigeria, Egypt, Ethiopia, Rwanda, South Africa (done on recipe pages), about page landmark: `Khan+el-Khalili+Cairo`.

Notes: Unsplash blocks automated requests (401), so no photo ID could be verified; Wikimedia Commons used throughout
instead. No about image (optional). Images use Wikimedia thumbnail sizes (960px, hero 1280px), not `srcset`.


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

- [x] `<h1>`, hero `<figure>`/`<figcaption>`, story paragraph with `<mark>` on key ingredients (convert the mock's
  `*word*` markers).
- [x] Ingredients `<ul>`, every amount `<span class="amount" data-base="...">` with unit text beside it.
- [x] Servings control: `−`, count, `+`, with `aria-label`s and `aria-live` on the count.
- [x] Steps in `<details>` + `<summary>` with an `<ol>`.
- [x] YouTube `<iframe>` with `title`, nutrition `<table>` (`<caption>`, `<th scope>`), map `<iframe>`.
- [x] Links back to Recipes and to the region page.
- [x] CSS section for each component above, mobile-first (see Responsive plan).
- [x] `initIngredientScaling`: pure `scaleAmount(base, servings)` plus a DOM shell.

**Gate**: Jollof page complete at 375px, 768px and 1280px, scaling works from 1 to 12, no console errors.

## Phase 3: Remaining recipe pages

- [x] Copy the Jollof page to `koshari.html`, `injera.html`, `isombe.html`, `bunny-chow.html`.
- [x] Change only content, ids, `data-*`, region link, `aria-current`, media from Phase 0.
- [x] Fill each from the mock's data (story, ingredients, steps, nutrition).
- [x] Diff each page's structure against the Jollof page. Structure must be identical.

**Gate**: all 5 recipe pages pass RP1 to RP11.

## Phase 4: Recipes listing (`recipes.html`)

- [x] 5 recipe cards, each with `data-region`, `data-id`, image, name, country, description, recipe link, `❤️ Favorite`
  button with `aria-pressed`.
- [x] Filter bar: All, West Africa, North Africa, East & Southern Africa, with `data-filter` and `.active`.
- [x] `initRecipeFilter` (click listener, loop over cards, toggle `.hidden`).
- [x] `initFavorites` (toggle `.favorited`, persist JSON array in `favorites`, restore on load, validate what is read
  back).
- [x] Card grid CSS with `auto-fit`/`minmax`.

**Gate**: every filter works, 2 favorites survive a hard refresh, un-favoriting removes the id.

## Phase 5: Region template and pages

- [x] Build `west-africa.html` fully: intro, staples, techniques (≥3 `<mark>` on spices and methods), dish cards linking
  to recipes, YouTube embed, "also try" line.
- [x] Copy to `north-africa.html` and `east-southern-africa.html`.
- [x] East & Southern: three recipe links, plus Kenya (Nyama Choma) and Mozambique (Piri-Piri Chicken) as plain text
  with no links.

**Gate**: RG1 to RG5 pass, all dish links resolve.

## Phase 6: Home, About, Contact

- [x] `index.html` hero: CSS background image, overlay, welcome text, YouTube iframe.
- [x] Featured dishes: 4 `<figure>` cards with `<img>`, `<figcaption>`, recipe links.
- [x] Explore by region: 3 cards. Latest food trends: 3 `<article>` with heading, date and original text. ≥3 `<mark>`.
- [x] `about.html`: styled `<blockquote>` mission, 2 to 3 history paragraphs, landmark map.
- [x] `contact.html`: labelled name, email, country (`<input list>` + `<datalist>` with the explanatory comment),
  message, submit. Inline error element wired with `aria-describedby`.
- [x] `initContactForm`: `preventDefault`, trimmed message must be **more than** 20 characters, error otherwise, on
  success hide form and show "Thank you, [Name]! We've received your message." via `textContent`.

**Gate**: 20 characters fails, 21 passes, name appears safely, all 12 pages exist.

## Phase 7: Polish

- [x] Nav hover (color plus underline), card hover, input `:focus` glow, `mark` style. Hover and transition only, no
  `@keyframes`.
- [x] Check dark mode contrast on every page type.
- [x] Check 375px (mobile), 768px (tablet) and 1280px (desktop) on every page, plus 320px and 1024px edge widths. No
  horizontal scroll, no clipped text, no overlapping elements.
- [x] Rotate-test tablet portrait (768px) and landscape (1024px).
- [x] Add section comments in HTML, CSS and JS. Remove dead code and any `console.log`.

## Phase 8: Verification (`REQUIREMENTS.md` §13)

- [x] Open all 12 pages: zero console errors, also with JS disabled for content.
- [x] Link check: every `href` resolves (script it with grep and `ls`).
- [x] Every YouTube, map and image URL still returns 200.
- [x] `grep`: no `onclick=`, no `style=`, no `@keyframes`, no `innerHTML`, every `<img>` has `alt`, every page has
  `styles.css`, `script.js`, viewport, fonts.
- [x] Walk every row in `REQUIREMENTS.md` §1 to §10 and tick it. Confirm §11 items are absent.
- [x] W3C HTML validation on each page.
- [x] Favorites and theme persistence after a hard refresh.

**Gate**: all boxes ticked. Report any that are not.

## Phase 9: Ship (only when asked)

- [ ] `git init` is already done. Commit in small steps. Do not commit `CLAUDE.md` or `docs/code-conventions/`.
- [ ] Push to `taste_of_africa_website_project`.
