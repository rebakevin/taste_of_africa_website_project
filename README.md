# Tastes of Africa

https://rebakevin.github.io/taste_of_africa_website_project/

## Why components

- Single HTML files would grow too big to manage.
- Each page is split into small sections, and shared styles live in `components/`.
- `node build-site.js` joins them into the finished site in `dist/`.

## Prerequisite

You need Node.js installed.

## Run

Build the site into `dist/`:

```
node build-site.js
```

Run it locally at http://localhost:8000:

```
cd dist
python3 -m http.server 8000
```

Edit the source files, not `dist/`. Rebuild after every change.

## Deploy

- Push to `main`.
- A GitHub Actions workflow builds the site and publishes `dist/` to GitHub Pages.
- Set Settings > Pages > Source to GitHub Actions.
