// Regenerates PNG icons and the social-share image from the SVG logo.
// Requires Playwright (`npm i -D playwright` or a global install). Run: npm run images
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const img = path.resolve(here, "../src/assets/img");
const svg = await readFile(path.join(img, "logo-mark.svg"), "utf8");
const fontDir = path.resolve(here, "../src/assets/fonts");
const font = async (f) => `url(data:font/woff2;base64,${(await readFile(path.join(fontDir, f))).toString("base64")})`;
const fontFaces = `@font-face{font-family:Fraunces;font-style:normal;font-weight:100 900;src:${await font("fraunces-latin-full-normal.woff2")}}
@font-face{font-family:Fraunces;font-style:italic;font-weight:100 900;src:${await font("fraunces-latin-full-italic.woff2")}}
@font-face{font-family:Manrope;font-weight:200 800;src:${await font("manrope-latin-wght-normal.woff2")}}`;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [file, size] of [["favicon-32.png", 32], ["apple-touch-icon.png", 180], ["icon-512.png", 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`);
  await page.screenshot({ path: path.join(img, file), omitBackground: true });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head>
<style>
${fontFaces}
body{margin:0;width:1200px;height:630px;background:#15122a;color:#fbf7f1;font-family:Manrope,sans-serif;position:relative;overflow:hidden}
.b{position:absolute;border-radius:50%;filter:blur(90px)}
.b1{width:620px;height:620px;left:620px;top:-200px;background:rgba(238,106,77,.75)}
.b2{width:560px;height:560px;left:-160px;top:260px;background:rgba(107,79,216,.7)}
.b3{width:400px;height:400px;left:420px;top:330px;background:rgba(201,161,74,.55)}
.c{position:absolute;inset:0;padding:80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:22px}.top svg{width:84px;height:84px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.n{font-family:Fraunces,serif;font-size:40px}.t{font-size:15px;letter-spacing:.28em;text-transform:uppercase;opacity:.8;margin-top:6px}
h1{font-family:Fraunces,serif;font-weight:400;font-size:76px;line-height:1.02;letter-spacing:-.02em;margin:0;max-width:900px}
h1 em{color:#f3d98c}
</style></head><body><div class="b b1"></div><div class="b b2"></div><div class="b b3"></div>
<div class="c"><div class="top">${svg}<div><div class="n">Francine D. Ward</div><div class="t">Attorney · Author · Speaker</div></div></div>
<h1>Protect what you create.<br>Practice your <em>worth.</em></h1></div></body></html>`);
await page.waitForLoadState("networkidle").catch(() => {});
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(img, "og-image.png") });

await browser.close();
console.log("Wrote favicon-32.png, apple-touch-icon.png, icon-512.png, og-image.png");
