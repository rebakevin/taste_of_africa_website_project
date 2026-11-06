# Afroful: Technical Requirements Checklist

Companion to `SPEC.md`. **Purpose:** every requirement from the assignment and rubric, with an ID, the file(s) it lives in, and a pass/fail test. Claude Code must walk this list at the end and tick every box before committing. If `SPEC.md` and this file disagree, this file wins.

Site name: **Afroful**. Repo name (fixed by the assignment): `taste_of_africa_website_project`.

Source tags: **[A]** assignment text, **[R]** rubric only, **[S]** locked decision in `SPEC.md`.

---

## 1. Global (all 12 HTML pages)

| ID | Requirement | Test |
|---|---|---|
| G1 [A] | `styles.css` linked in `<head>` of every page | grep all `.html` for `styles.css` |
| G2 [A] | `script.js` linked via `<script>` on every page | grep all `.html` for `script.js` |
| G3 [A] | Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`/`<figcaption>` used where they fit | Inspect each page |
| G4 [R] | Exactly one `<h1>` per page, headings never skip levels | Inspect each page |
| G5 [R] | Every `<img>` has non-empty descriptive `alt` | grep for `<img` without `alt=` |
| G6 [A] | `<nav>` on every page with links to Home, Recipes, Regions, About, Contact | Click every link on every page, none 404 |
| G7 [A] | `<footer>` on every page | Inspect |
| G8 [A] | `<meta name="viewport">` on every page | grep |
| G9 [A] | Google Fonts `<link>` on every page (heading font + body font) | grep |
| G10 [S] | Dark/light toggle button in header on every page | Click on 3 random pages |
| G11 [R] | Code is commented (each CSS section, each JS feature, any non-obvious HTML) and consistently indented | Read through |
| G12 [A] | No broken internal links; every `<a href>` target exists | Run link check (script or manual) |

## 2. Pages and files

| ID | File | Exists |
|---|---|---|
| P1 [A] | `index.html` | ☐ |
| P2 [A] | `recipes.html` | ☐ |
| P3 [A] | `jollof-rice.html` | ☐ |
| P4 [A] | `koshari.html` | ☐ |
| P5 [A] | `injera.html` | ☐ |
| P6 [A] | `isombe.html` | ☐ |
| P7 [A] | `bunny-chow.html` | ☐ |
| P8 [A] | `west-africa.html` | ☐ |
| P9 [A] | `north-africa.html` | ☐ |
| P10 [A] | `east-southern-africa.html` | ☐ |
| P11 [A] | `about.html` | ☐ |
| P12 [A] | `contact.html` | ☐ |
| P13 [A] | `styles.css` | ☐ |
| P14 [A] | `script.js` | ☐ |

12 HTML files + `styles.css` + `script.js`.

## 3. Home page (`index.html`)

| ID | Requirement | Test |
|---|---|---|
| H1 [A] | Hero section: large **background image** of African cuisine (CSS background), styled overlay, welcome text | Visual |
| H2 [A] | Hero contains an **embedded YouTube video** (`<iframe src="https://www.youtube.com/embed/...">`) introducing African food culture | Plays |
| H3 [A] | Featured Dishes: 3–4 dishes (spec: 4) | Count |
| H4 [A] | Each featured dish uses `<figure>` + `<img>` + `<figcaption>` | Inspect |
| H5 [A] | Each featured dish has a short description and a link to its recipe page | Click each |
| H6 [A] | "Explore by Region" with links to the 3 region pages | Click each |
| H7 [A] | "Latest Food Trends": 2–3 items (spec: 3), each an `<article>` | Count |
| H8 [A] | `<mark>` used on key ingredients/cultural influences (≥3 on page) | grep |

## 4. Recipes listing (`recipes.html`)

| ID | Requirement | Test |
|---|---|---|
| RL1 [A] | Filter buttons: All, West Africa, North Africa, East & Southern Africa | Visual |
| RL2 [A] | 5 recipe cards, each with `data-region` and `data-id` | grep |
| RL3 [S] | Region values exactly `west-africa`, `north-africa`, `east-southern-africa` | grep |
| RL4 [A] | Each card has image, name, country, short description, link to recipe page | Visual |
| RL5 [A] | Each card has a "❤️ Favorite" `<button>` | Visual |

## 5. Recipe pages (×5: Jollof, Koshari, Injera, Isombe, Bunny Chow)

Every item applies to **each** of the 5 pages.

| ID | Requirement | Test |
|---|---|---|
| RP1 [A] | Dish name (`<h1>`), image, cultural description | Visual |
| RP2 [A] | Image in `<figure>` with `<figcaption>` | Inspect |
| RP3 [A] | Ingredients in `<ul>` or `<ol>` | Inspect |
| RP4 [A] | Cooking instructions inside `<details>` + `<summary>` (expandable) | Click |
| RP5 [A] | Embedded YouTube tutorial `<iframe>` | Plays |
| RP6 [A] | Nutritional facts `<table>` with `<caption>`, `<th scope>` (optional in assignment, included) | Inspect |
| RP7 [A] | Country-of-origin map `<iframe>`: Nigeria / Egypt / Ethiopia / Rwanda / South Africa | Loads |
| RP8 [S] | `<mark>` on a key ingredient/influence in description | grep |
| RP9 [S] | Servings control (`−`, count, `+`; default 4, min 1, max 12) | Click |
| RP10 [S] | Each amount is `<span class="amount" data-base="...">` | grep |
| RP11 [S] | Links back to Recipes and to the dish's region page | Click |

## 6. Region pages (×3: West, North, East & Southern)

| ID | Requirement | Test |
|---|---|---|
| RG1 [A] | Description of food culture, staples, cooking techniques | Visual |
| RG2 [A] | Example dishes with links to recipe pages (West→Jollof, North→Koshari, East & Southern→Injera, Isombe, Bunny Chow) | Click each |
| RG3 [A] | ≥1 embedded YouTube video | Plays |
| RG4 [A] | `<mark>` on spices/cooking methods (≥3 per page) | grep |
| RG5 [S] | East & Southern page mentions Kenya (Nyama Choma) and Mozambique (Piri-Piri Chicken) as plain text, no links | Read |

## 7. About (`about.html`)

| ID | Requirement | Test |
|---|---|---|
| AB1 [A] | Mission statement promoting African food heritage, styled for readability | Visual |
| AB2 [A] | Brief history of African cuisine and global influence | Read |
| AB3 [A] | Embedded Google Map of a cultural food landmark or restaurant, blends with layout | Loads |

## 8. Contact (`contact.html`)

| ID | Requirement | Test |
|---|---|---|
| C1 [A] | Name: `<input type="text">` | Inspect |
| C2 [A] | Email: `<input type="email">` | Inspect |
| C3 [A] | Country: input with `<datalist>` of African countries. (Assignment says `<select>` + `<datalist>`, which is invalid HTML. Use `<input list>` + `<datalist>` and leave a code comment explaining) | Inspect |
| C4 [A] | Message: `<textarea>` | Inspect |
| C5 [A] | Submit: `<button type="submit">` | Inspect |
| C6 [A] | **Every** field has a `<label for>` matching its `id` | Inspect |
| C7 [S] | Name, email, message are `required` | Inspect |

## 9. JavaScript (`script.js`)

Guard every feature with an element check so one file runs on all pages without errors (console must be clean on every page).

| ID | Requirement | Test |
|---|---|---|
| J1 [A] | Filter: `addEventListener('click')` on filter buttons | Read code |
| J2 [A] | Filter: a **loop** over cards, comparing `dataset.region`, toggling `.hidden` or `display` | Read code |
| J3 [A] | Filter: "All" shows every card. Active button gets `.active` | Click each button |
| J4 [A] | Favorites: click toggles visual state (heart turns red) | Click |
| J5 [A] | Favorites: recipe ID stored in `localStorage` (key `favorites`, JSON array) | DevTools → Application |
| J6 [A] | Favorites: **persist after refresh**; on load, read `localStorage` and restore | Favorite 2, refresh, still red |
| J7 [A] | Favorites: un-favoriting removes the ID | Click twice |
| J8 [A] | Form: `event.preventDefault()` on submit | Read code |
| J9 [A] | Form: message must be **more than 20 characters**. Show inline error otherwise | Try 20 chars (fail) and 21 chars (pass) |
| J10 [A] | Form: on success, hide the form, show "Thank you, [Name]! We've received your message." using the entered name | Submit |
| J11 [S] | Name inserted with `textContent` (not `innerHTML`) | Read code |
| J12 [R/S] | Ingredient scaling updates all `.amount` values from `data-base × servings/4` | Click +/− |
| J13 [R/S] | Dark/light toggle toggles `body.dark`, persisted in `localStorage` key `theme`, restored on load | Toggle, refresh |
| J14 [R] | Uses proper DOM selection (`querySelector(All)`/`getElementById`) and event listeners, no inline `onclick` | grep for `onclick=` |

## 10. CSS (`styles.css`)

| ID | Requirement | Test |
|---|---|---|
| S1 [A] | Colour palette in CSS variables: deep red, warm yellow, earthy brown, cream | Read |
| S2 [A] | Consistent spacing (margins/padding) via a spacing scale | Visual |
| S3 [A] | Base font size and `line-height` set (1.6) | Read |
| S4 [A] | Google Fonts: bold heading font (Alfa Slab One), clean body font (Nunito) | Visual |
| S5 [A] | Nav styled with hover effect (colour change + underline) | Hover |
| S6 [A] | Hero: background image + overlay + styled text | Visual |
| S7 [A] | Featured dishes as cards: shadow + rounded corners | Visual |
| S8 [A] | Clean layout for Latest Food Trends | Visual |
| S9 [A] | Recipe cards with consistent spacing. Styled ingredient list, instructions, table | Visual |
| S10 [A] | Embedded videos and maps scale to fit the page (`width:100%`, `aspect-ratio`) | Resize |
| S11 [A] | Custom `mark` style | Visual |
| S12 [A] | Styled mission statement. Map blends into layout | Visual |
| S13 [A] | Styled inputs, textarea, select/input, button. **`:focus` states** with border/glow | Tab through form |
| S14 [A] | Relative units (`rem`, `%`, `vw/vh`) used throughout (no fixed `px` widths on layout) | Read |
| S15 [A] | Images `max-width:100%`. Text and layout reflow at ≤768px, usable at 375px, no horizontal scroll | Resize to 375px |
| S16 [S] | `body.dark` overrides the variables. Text contrast stays readable in both themes | Toggle on every page type |
| S17 [S] | Only CSS hover/transition effects. No keyframe animations | grep `@keyframes` |

## 11. Out of scope (must NOT be built)

- Newsletter signup
- Favorites page, search, accounts, backend, frameworks, build tools
- More than 5 recipe pages or 3 region pages
- Extra JS features beyond J1–J14

## 12. Rubric self-check (30 pts)

| Rubric row | Pts | What earns full marks | Covered by |
|---|---|---|---|
| Completeness | 6 | All pages, hero, forms, embedded media, CSS, extra subpages | P1–P14, H1–H8, RP5, RP7, RG3, AB3 |
| HTML Structure | 8 | Flawless semantic HTML, headings, lists, alt text, figure | G3–G5, H4, RP2–RP4, C6 |
| CSS & Styling | 4 | Selectors, properties, Google Fonts, consistent scheme | S1–S17 |
| Responsiveness & Functionality | 4 | Responsive, forms and embedded media all work | S14–S15, G6, G12, H2, RP5, RP7, C1–C7 |
| Code Quality & Creativity | 4 | Clean, commented code, enhancements | G11, S16, J13 |
| DOM Manipulation & Interactivity | 4 | Filter, favorites (localStorage), ingredient scaling, dark/light, form validation, proper DOM use | J1–J14 |

## 13. Final verification procedure (run before commit)

1. Open all 12 HTML files. Console has **zero errors**.
2. Click every nav link and every in-page link. Zero 404s (G12).
3. Confirm every YouTube and map iframe actually loads. Replace any that show "Video unavailable" or are blocked from embedding.
4. Walk every row in sections 1–10 and tick it.
5. Test at 375px, 768px and desktop width, in both themes.
6. Test favorites and theme persistence with a hard refresh.
7. Confirm Section 11 items are absent.
8. `git init`, commit, push to `taste_of_africa_website_project`.
