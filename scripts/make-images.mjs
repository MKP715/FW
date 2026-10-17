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

// Bundled Chromium if installed, otherwise the system Chrome.
const browser = await chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
const portraitB64 = await readFile(path.join(img, "francine-portrait.jpg")).then((b) => b.toString("base64")).catch(() => null);
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
body{margin:0;width:1200px;height:630px;background:linear-gradient(180deg,#fff6ec,#fbf7f1);color:#15122a;font-family:Manrope,sans-serif;position:relative;overflow:hidden}
.b{position:absolute;border-radius:50%;filter:blur(80px)}
.b1{width:560px;height:560px;left:700px;top:-220px;background:rgba(255,154,118,.5)}
.b2{width:520px;height:520px;left:-200px;top:300px;background:rgba(169,147,255,.38)}
.b3{width:420px;height:420px;left:360px;top:360px;background:rgba(243,217,140,.6)}
.c{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:22px}.top svg{width:76px;height:76px;border-radius:18px;box-shadow:0 10px 26px -8px rgba(43,37,82,.5)}
.n{font-family:Fraunces,serif;font-size:38px}.t{font-size:14px;letter-spacing:.28em;text-transform:uppercase;color:#4a4566;margin-top:6px}
h1{font-family:Fraunces,serif;font-weight:400;font-size:60px;line-height:1.05;letter-spacing:-.02em;margin:0;max-width:620px}
h1 em{color:#c24a2e}
.p{position:absolute;right:80px;top:60px;width:372px;height:465px;border-radius:999px 999px 26px 26px;overflow:hidden;box-shadow:0 30px 70px -30px rgba(43,37,82,.6);outline:1.5px solid rgba(201,161,74,.55);outline-offset:12px}
.p img{width:100%;height:100%;object-fit:cover}
</style></head><body><div class="b b1"></div><div class="b b2"></div><div class="b b3"></div>
${portraitB64 ? `<div class="p"><img src="data:image/jpeg;base64,${portraitB64}"></div>` : ""}
<div class="c"><div class="top">${svg}<div><div class="n">Francine D. Ward</div><div class="t">Attorney · Author · Speaker</div></div></div>
<h1>Protect what you create.<br>Practice your <em>worth.</em></h1></div></body></html>`);
await page.waitForLoadState("networkidle").catch(() => {});
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(img, "og-image.png") });

await browser.close();
console.log("Wrote favicon-32.png, apple-touch-icon.png, icon-512.png, og-image.png");
