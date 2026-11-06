'use strict';

// Builds the static site into dist/.
//   index.html   is the shared layout: head, header, nav and footer.
//   pages/<name> holds one page: index.html plus small sections/*.html files.
// Each page is put into the layout, then all CSS files are joined into one styles.css.
// Run: node build-site.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, 'dist');
const PAGES_DIR = path.join(ROOT, 'pages');
const COMPONENTS_DIR = path.join(ROOT, 'components');
const HOME_PAGE = 'home';

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function listFolders(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listCssFiles(dir) {
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith('.css'))
    .sort()
    .map((name) => path.join(dir, name));
}

// ---- Page files ----
// The top of a page's index.html holds lines like <!-- title: About Us -->.
function readMeta(text) {
  const meta = {};
  const body = text.replace(/^<!-- (\w[\w-]*): (.*) -->\n/gm, (line, key, value) => {
    meta[key] = value;
    return '';
  });
  return { meta, body: body.trim() };
}

// Put every line of the text at the given indent.
function indentText(text, indent) {
  return text
    .split('\n')
    .map((line) => (line === '' ? line : indent + line))
    .join('\n');
}

// Replace each <!-- @section name --> line with pages/<page>/sections/name.html.
function addSections(html, pageDir, cssFiles) {
  return html.replace(/^([ \t]*)<!-- @section ([\w-]+) -->$/gm, (line, indent, name) => {
    const htmlFile = path.join(pageDir, 'sections', `${name}.html`);
    if (!fs.existsSync(htmlFile)) {
      throw new Error(`Missing section file: ${htmlFile}`);
    }

    const cssFile = path.join(pageDir, 'sections', `${name}.css`);
    if (fs.existsSync(cssFile)) cssFiles.push(cssFile);

    return indentText(readFile(htmlFile).trim(), indent);
  });
}

// ---- Layout ----
function markCurrentLink(layout, href) {
  const link = `href="${href}" class="nav-link"`;
  return layout.replace(link, `${link} aria-current="page"`);
}

function fillLayout(layout, meta, content) {
  const mainClass = meta['main-class'] ? ` ${meta['main-class']}` : '';
  const filled = layout
    .replace('{{title}}', meta.title)
    .replace('{{description}}', meta.description)
    .replace('{{mainClass}}', mainClass)
    .replace(/^([ \t]*)<!-- @content -->$/m, (line, indent) => indentText(content, indent));
  return markCurrentLink(filled, meta.nav);
}

// ---- Build ----
function buildPage(name, layout, cssFiles) {
  const pageDir = path.join(PAGES_DIR, name);
  const { meta, body } = readMeta(readFile(path.join(pageDir, 'index.html')));

  const pageCss = path.join(pageDir, 'index.css');
  if (fs.existsSync(pageCss)) cssFiles.push(pageCss);

  const content = addSections(body, pageDir, cssFiles);
  const fileName = name === HOME_PAGE ? 'index.html' : `${name}.html`;
  writeFile(path.join(OUTPUT_DIR, fileName), fillLayout(layout, meta, content) + '\n');
}

function buildStyles(cssFiles) {
  const parts = cssFiles.map((file) => readFile(file).trim());
  writeFile(path.join(OUTPUT_DIR, 'styles.css'), parts.join('\n\n') + '\n');
}

function buildSite() {
  const layout = readFile(path.join(ROOT, 'index.html'));
  const pages = listFolders(PAGES_DIR);

  // Order matters: base styles, then shared components, then each page.
  const cssFiles = [path.join(ROOT, 'styles.css'), ...listCssFiles(COMPONENTS_DIR)];
  pages.forEach((name) => buildPage(name, layout, cssFiles));

  buildStyles(cssFiles);
  fs.copyFileSync(path.join(ROOT, 'script.js'), path.join(OUTPUT_DIR, 'script.js'));
  console.log(`Built ${pages.length} pages into ${path.relative(ROOT, OUTPUT_DIR)}/`);
}

buildSite();
