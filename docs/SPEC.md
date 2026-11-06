# Tastes of Africa: Build Spec

School assignment. Plain HTML5 + CSS + vanilla JS. No frameworks, no build step, no backend. **Stay in scope: build only what is listed here.**

Repo name: `taste_of_africa_website_project`. Deliverables: HTML files, `styles.css`, `script.js` (all in repo root, plus an `images/` folder only if needed).

## 1. Decisions (locked)

| Topic | Decision |
|---|---|
| Stack | Static HTML/CSS/JS, one shared `styles.css` and one shared `script.js` linked on every page |
| Countries (7) | Nigeria, Egypt, Ethiopia, Rwanda, South Africa get recipe pages. Kenya and Mozambique appear as text mentions only (assignment caps recipe pages at 5) |
| Recipes (5) | Jollof Rice (Nigeria, west-africa), Koshari (Egypt, north-africa), Injera (Ethiopia, east-southern-africa), Isombe (Rwanda, east-southern-africa), Bunny Chow (South Africa, east-southern-africa) |
| Regions (3) | West Africa, North Africa, East & Southern Africa (Kenya, Ethiopia, Rwanda, South Africa, Mozambique). Stays within the assignment's 2–3 region limit |
| Media | Claude Code picks: hotlinked Unsplash images, YouTube embeds, Google Maps embeds (no API key) |
| Rubric extras | Ingredient scaling and dark/light toggle: **included** |
| Newsletter form | **Not included** |
| Animations | Only simple CSS hover/transition effects, nothing more |

## 2. Files

```
index.html          Home
recipes.html        Recipe listing: filter buttons + favorites
jollof-rice.html    Recipe page (west-africa, Nigeria)
koshari.html        Recipe page (north-africa, Egypt)
injera.html         Recipe page (east-southern-africa, Ethiopia)
isombe.html         Recipe page (east-southern-africa, Rwanda)
bunny-chow.html     Recipe page (east-southern-africa, South Africa)
west-africa.html    Region page
north-africa.html   Region page
east-southern-africa.html   Region page
about.html          About Us
contact.html        Contact
styles.css
script.js
```

## 3. Shared layout (every page)

- `<header>` with site name and `<nav>`: Home, Recipes, Regions (links to the 3 region pages, or a simple 3-link group), About, Contact, plus a dark/light toggle button.
- `<main>` with one `<h1>` per page and proper `<h2>`/`<h3>` hierarchy.
- `<footer>` with a short copyright line.
- Every `<img>` has meaningful `alt` text.
- Every page links `styles.css` in the head and `script.js` with `defer`.
- Mobile viewport meta tag on every page.

## 4. Pages

### 4.1 Home (`index.html`)
1. **Hero** (`<section>`): large background image of African food, dark overlay, welcome heading and text, embedded YouTube video (`<iframe>`) introducing African food culture.
2. **Featured Dishes**: 4 dishes (Jollof Rice, Koshari, Injera, Bunny Chow), each a `<figure>` with `<img>` and `<figcaption>` (name + short description) and a link to its recipe page.
3. **Explore by Region**: 3 links/cards to the region pages.
4. **Latest Food Trends**: 3 `<article>` items, each with heading, date and short text. Content is original sample text. Do not copy real news.
5. Use `<mark>` on key ingredients or cultural influences in the text (at least 3 uses).

### 4.2 Recipes listing (`recipes.html`)
- Filter buttons: **All, West Africa, North Africa, East & Southern Africa**.
- 5 recipe cards, each with image, name, country, short description, link to the full recipe page, and a **❤️ Favorite** button.
- Each card has `data-region` (`west-africa` | `north-africa` | `east-southern-africa`) and `data-id` (e.g. `jollof-rice`).

### 4.3 Recipe pages (5 pages, same template)
Dishes: Jollof Rice, Koshari, Injera, Isombe, Bunny Chow.
Each contains:
- Dish name (`<h1>`), image in `<figure>`/`<figcaption>`, cultural description paragraph (with `<mark>` on key ingredient/influence).
- **Ingredients** in a `<ul>`. Each `<li>` holds an amount in a `<span class="amount" data-base="...">` so it can be scaled.
- **Servings control**: `−` / `+` buttons and a displayed count (default 4, min 1, max 12). Amounts update on click.
- **Instructions** in `<details>` + `<summary>` (expandable, `<ol>` inside).
- Embedded YouTube tutorial (`<iframe>`).
- Nutritional facts `<table>` (simple: calories, protein, carbs, fat per serving, with `<caption>` and `<th scope>`).
- Google Map `<iframe>` of the dish's country of origin (Nigeria, Egypt, Ethiopia, Rwanda, South Africa).
- Link back to Recipes and to the dish's region page.

### 4.4 Region pages (3 pages, same template)
Each contains:
- Description of the region's food culture, staples, cooking techniques.
- `<mark>` on spices/cooking methods (at least 3 uses).
- Example dishes with links to recipe pages (recipe pages exist only for the 5 dishes above. Other dishes mentioned are plain text, no link).
- At least one embedded YouTube video.

Region to recipe mapping: West → Jollof Rice (Nigeria). North → Koshari (Egypt). East & Southern → Injera (Ethiopia), Isombe (Rwanda), Bunny Chow (South Africa). The East & Southern page also mentions Kenya (e.g. Nyama Choma) and Mozambique (e.g. Piri-Piri Chicken) as plain text.

### 4.5 About Us (`about.html`)
- Styled mission statement (`<blockquote>` or highlighted `<section>`) about promoting African food heritage.
- Short history of African cuisine and global influence (2–3 paragraphs).
- Embedded Google Map of one cultural food landmark or restaurant (Claude Code picks one real, well-known place, e.g. a market or restaurant).

### 4.6 Contact (`contact.html`)
Form with `<label>` for every field:
- Name: `<input type="text">`, required
- Email: `<input type="email">`, required
- Country: `<input list>` + `<datalist>` of African countries (suggestions)
- Message: `<textarea>`, required
- Submit: `<button type="submit">`

(Requirement says "`<select>` with `<datalist>`". A `<select>` can't use a datalist, so use an `<input list="countries">` with `<datalist id="countries">`, which satisfies the intent. Add a short code comment saying so.)

## 5. JavaScript (`script.js`)

Wrap each feature in a check for the element it needs, so one file works on every page. Comment each section.

1. **Recipe filter** (`recipes.html`): `addEventListener('click')` on each filter button. Loop over cards, compare `card.dataset.region` to the button's `data-filter`, toggle a `.hidden` class (`display: none`). `All` shows everything. Active button gets an `.active` class.
2. **Favorites** (`recipes.html`): clicking ❤️ toggles a `.favorited` class (heart turns red) and updates a JSON array of recipe IDs in `localStorage` key `favorites`. On page load, read the array and restore the state of each button.
3. **Ingredient scaling** (recipe pages): `+`/`−` buttons change the servings count. Each `.amount` shows `data-base × (servings / 4)`, rounded to at most 2 decimals, trailing zeros trimmed.
4. **Dark/light toggle** (all pages): button toggles a `dark` class on `<body>`. Choice saved in `localStorage` key `theme` and applied on load.
5. **Contact validation** (`contact.html`): on submit, `event.preventDefault()`. If message length (trimmed) is 20 characters or fewer, show an inline error message and stop. Otherwise hide the form and show "Thank you, [Name]! We've received your message." using the name input. Insert the name with `textContent`, not `innerHTML`.

## 6. Styling (`styles.css`)

- **Palette (CSS variables)**: deep red `#8B2E1F`, warm yellow `#E9A820`, earthy brown `#4A2C1A`, cream background `#FFF6E5`, text `#2B1B12`. Dark mode overrides the variables (dark brown background, cream text).
- **Google Fonts**: headings `Alfa Slab One` (bold/expressive), body `Nunito` (clean). Linked in each page's `<head>`.
- Base: `font-size: 100%`, `line-height: 1.6`, consistent spacing scale in `rem`.
- **Nav**: horizontal flex, hover colour change + underline.
- **Home**: hero with background image + overlay and centred text. Dish cards with box-shadow and rounded corners. Clean grid for trend articles.
- **Recipes**: consistent card grid. Styled ingredient list, `<details>`, and table.
- **Embeds**: responsive wrapper (`aspect-ratio: 16/9`, `width: 100%`) for videos, similar for maps.
- **`mark`**: custom style (yellow background, brown text, small padding/radius).
- **About**: mission statement styled larger with a coloured left border. Map blends into the layout (rounded corners, max-width).
- **Contact**: styled inputs/textarea/select/button, `:focus` glow (border colour + box-shadow).
- **Responsive**: relative units (`%`, `rem`, `vw/vh`), `max-width: 100%` on images, CSS grid with `auto-fit`/`minmax`. Three target sizes, mobile-first: **mobile** (base, under 768px: nav wraps or stacks, one column), **tablet** (`@media (min-width: 48rem)`, 768px and up: two-column grids, nav on one row), **desktop** (`@media (min-width: 64rem)`, 1024px and up: three or more columns, wider content). Two breakpoints only.

## 7. Out of scope (do not build)

Newsletter signup, user accounts, a favorites page, search, animations beyond CSS hover/transition, more than 5 recipes or 3 regions, extra JS features, backend, frameworks.

## 8. Build order (for Claude Code)

1. `styles.css` + `script.js` skeletons and the shared header/footer.
2. Recipe template: build `jollof-rice.html` fully, then copy to the other 4.
3. `recipes.html` with filter + favorites.
4. Region template: build `west-africa.html`, copy to the other 2.
5. `index.html`, `about.html`, `contact.html`.
6. Pick and insert media (images, YouTube IDs, map embeds).
7. Check pass (below), then `git init`, commit, push to `taste_of_africa_website_project`.

## 9. Definition of done (maps to rubric)

- [ ] All 12 HTML pages exist and every nav link works
- [ ] Each page has semantic tags, one `<h1>`, alt text on all images, `<label>` on all form fields
- [ ] Every YouTube iframe and map iframe loads (open each page and check)
- [ ] Filter, favorites (survive a refresh), scaling, dark mode (survives a refresh), and validation (20-char rule + personalised thank-you) all work
- [ ] Page looks fine at ~375px wide and at desktop width
- [ ] Code has short comments, consistent indentation, no unused files
- [ ] Pushed to GitHub repo `taste_of_africa_website_project`
