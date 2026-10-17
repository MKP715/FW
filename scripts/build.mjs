// Zero-dependency static site build.
//   node scripts/build.mjs        → renders src/ into docs/ (served by GitHub Pages)
// Each module in src/pages exports a page object (or an array of them):
//   { path: "news/", title, description, theme, section, render(ctx) → html }
import { readdir, readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { site } from "../src/site.mjs";
import { layout, esc } from "../src/lib/layout.mjs";
import { news } from "../src/data/news.mjs";
import { redirects } from "../src/data/redirects.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(here, "..");
const srcDir = path.join(rootDir, "src");
// OUT_DIR lets you build somewhere else (e.g. to preview) without touching docs/.
const outDir = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.join(rootDir, "docs");
// Cache-busting token that only changes when the CSS/JS actually change.
const version = createHash("sha1")
  .update(await readFile(path.join(srcDir, "assets/css/main.css")))
  .update(await readFile(path.join(srcDir, "assets/js/main.js")))
  .update(await readFile(path.join(srcDir, "assets/js/pillars.js")))
  .digest("hex")
  .slice(0, 10);

const rootFor = (p) => (p === "" ? "./" : "../".repeat(p.split("/").filter(Boolean).length));

async function loadPages() {
  const dir = path.join(srcDir, "pages");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".mjs")).sort();
  const pages = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    const exported = mod.default;
    for (const p of Array.isArray(exported) ? exported : [exported]) pages.push(p);
  }
  return pages;
}

async function write(rel, content) {
  const file = path.join(outDir, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

function redirectPage(from, to) {
  const root = rootFor(from);
  const target = root + to;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Redirecting… | ${esc(site.name)}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${site.url}/${to.split(/[?#]/)[0]}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)}${to.includes("#") ? "" : " + location.hash"})</script>
</head><body style="font-family:system-ui;background:#15122a;color:#fbf7f1;display:grid;place-items:center;min-height:100vh;margin:0">
<p>This page has moved. <a style="color:#f3d98c" href="${target}">Continue to the new page →</a></p>
</body></html>`;
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => `  <url><loc>${site.url}/${p.path}</loc><lastmod>${p.updated || today}</lastmod><priority>${p.path === "" ? "1.0" : p.priority || "0.7"}</priority></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function feed() {
  const items = news
    .map((n) => {
      const [y, m, d] = n.date.split("-").map(Number);
      const pub = new Date(Date.UTC(y, m - 1, d, 12)).toUTCString();
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${esc(n.url)}</link>
      <guid isPermaLink="false">${esc(n.id)}</guid>
      <pubDate>${pub}</pubDate>
      <category>${esc(n.category)}</category>
      <source url="${esc(n.url)}">${esc(n.source)}</source>
      <description>${esc(n.summary + " Why it matters: " + n.why)}</description>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — IP &amp; AI Law Watch</title>
    <link>${site.url}/news/</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Curated developments in copyright, trademark, AI, right of publicity and estate planning, with plain-English notes on why they matter.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
}

async function build() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(path.join(srcDir, "assets"), path.join(outDir, "assets"), { recursive: true });

  const pages = await loadPages();
  const seen = new Set();
  for (const page of pages) {
    if (seen.has(page.path)) throw new Error(`Duplicate page path: ${page.path}`);
    seen.add(page.path);
    const ctx = { root: rootFor(page.path), version, site };
    if (page.path === "404.html") {
      // 404 is served at arbitrary depths, so resolve links from the site root at runtime.
      ctx.root = "";
      page.base = `<script>(function(){var h=location.hostname,p=location.pathname.split("/");var b=/\\.github\\.io$/.test(h)&&p[1]?"/"+p[1]+"/":"/";document.write('<base href="'+b+'">')})()</script>`;
    }
    const body = page.render(ctx);
    const file = page.path.endsWith(".html") ? page.path : page.path + "index.html";
    await write(file, layout(page, ctx, body));
  }

  for (const [from, to] of Object.entries(redirects)) {
    if (seen.has(from)) throw new Error(`Redirect collides with page: ${from}`);
    await write(from + "index.html", redirectPage(from, to));
  }

  await write("sitemap.xml", sitemap(pages.filter((p) => p.path !== "404.html")));
  await write("feed.xml", feed());
  await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  await write(".nojekyll", "");
  if (existsSync(path.join(rootDir, "CNAME"))) await cp(path.join(rootDir, "CNAME"), path.join(outDir, "CNAME"));

  console.log(`Built ${pages.length} pages + ${Object.keys(redirects).length} redirects → ${path.relative(rootDir, outDir) || "."}/`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
