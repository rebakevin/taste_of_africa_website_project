# Tastes of Africa

https://rebakevin.github.io/taste_of_africa_website_project/

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

Deploy: push to `main`. In the GitHub repo, set Settings > Pages > Source to GitHub Actions.
