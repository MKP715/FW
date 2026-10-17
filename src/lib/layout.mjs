import { site } from "../site.mjs";
import { icon, logoMark } from "./icons.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Tagged template that joins arrays and drops null/false so pages can map() freely.
export function html(strings, ...values) {
  let out = "";
  strings.forEach((str, i) => {
    out += str;
    if (i < values.length) {
      const v = values[i];
      if (Array.isArray(v)) out += v.flat(Infinity).join("");
      else if (v !== null && v !== undefined && v !== false) out += v;
    }
  });
  return out;
}

export function formatDate(iso, opts = { year: "numeric", month: "short", day: "numeric" }) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}

function head(page, ctx) {
  const title = page.path === "" ? `${site.name} — ${page.title}` : `${page.title} | ${site.name}`;
  const desc = page.description || site.description;
  const canonical = site.url + "/" + page.path;
  const ogImage = site.url + "/assets/img/og-image.png";
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${page.base ? page.base : ""}
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
${page.noindex ? '<meta name="robots" content="noindex">' : ""}
<meta name="theme-color" content="#fbf7f1">
<meta property="og:type" content="${page.ogType || "website"}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${ctx.root}assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="${ctx.root}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${ctx.root}assets/img/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="${esc(site.name)} — IP &amp; AI Law Watch" href="${ctx.root}feed.xml">
${page.base
  ? "" // The 404 page resolves URLs via <base>, which the preload scanner doesn't wait for.
  : html`<link rel="preload" href="${ctx.root}assets/fonts/fraunces-latin-full-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.root}assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`}
<link rel="stylesheet" href="${ctx.root}assets/css/main.css?v=${ctx.version}">
<script>document.documentElement.classList.add("js")</script>
${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : ""}
</head>`;
}

function header(page, ctx) {
  const current = page.section || page.path;
  return html`<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
<header class="site-header${page.lightHeader ? " is-light" : ""}">
  <div class="container header-inner">
    <a class="brand" href="${ctx.root}" aria-label="${esc(site.name)} — home">
      ${logoMark()}
      <span class="brand-text"><span class="brand-name">Francine D. Ward</span><span class="brand-tag">${esc(site.tagline)}</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
        ${site.nav.map(
          (item) => html`<li><a class="nav-link" href="${ctx.root}${item.href}"${current === item.href ? ' aria-current="page"' : ""}>${item.label}${item.badge ? `<span class="sr-only"> (</span><span class="badge-new">${item.badge}</span><span class="sr-only">)</span>` : ""}</a></li>`
        )}
      </ul>
      <a class="btn btn-sm nav-cta" href="${ctx.root}contact/">Free consultation <span class="arrow">→</span></a>
    </nav>
  </div>
</header>`;
}

function footer(page, ctx) {
  return html`<footer class="site-footer">
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <p class="footer-big" aria-hidden="true">Esteem is an <em>action.</em></p>
    <div class="footer-grid">
      <div>
        <a class="brand" href="${ctx.root}">${logoMark("brand-mark", "f")}<span class="brand-text"><span class="brand-name">Francine D. Ward</span><span class="brand-tag">${esc(site.tagline)}</span></span></a>
        <p class="mt-1">Protecting the work you create, the legacy you leave, and the person you're becoming — with 35 years of practice and a life built one esteemable act at a time.</p>
        <p class="footer-communities">Join Francine's Facebook communities: ${site.communities.map((c, i) => html`${i ? " · " : ""}<a href="${c.href}" target="_blank" rel="noopener">${c.name}</a>`)}</p>
        ${site.socials.length
          ? html`<div class="socials">${site.socials.map((s) => html`<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name}">${icon(s.icon)}</a>`)}</div>`
          : ""}
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="${ctx.root}meet-francine/">Meet Francine</a></li>
          <li><a href="${ctx.root}esteemable-acts/">Esteemable Acts</a></li>
          <li><a href="${ctx.root}speaking/">Speaking &amp; Media Kit</a></li>
          <li><a href="${ctx.root}esteemable-acts/journal/">Esteemable Acts Journal</a></li>
          <li><a href="${ctx.root}news/">IP &amp; AI Law Watch</a></li>
          <li><a href="${ctx.root}insights/">Insights &amp; Guides</a></li>
          <li><a href="${ctx.root}resources/">Free Resources</a></li>
        </ul>
      </div>
      <div>
        <h4>Law Office</h4>
        <ul>
          <li><a href="${ctx.root}attorney-at-law/">Practice Overview</a></li>
          <li><a href="${ctx.root}intellectual-property/">Intellectual Property</a></li>
          <li><a href="${ctx.root}estate-planning/">Estate Planning</a></li>
          <li><a href="${ctx.root}legal-blog/">Legal Blog</a></li>
          <li><a href="${ctx.root}client-reviews/">Client Reviews</a></li>
          <li><a href="${site.booking}" target="_blank" rel="noopener">Book a Consultation</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li><a href="tel:${site.phoneHref}">${site.phone}</a></li>
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li><span style="opacity:.8">${esc(site.address.street)}<br>${esc(site.address.city)}, ${site.address.region} ${site.address.postal}</span></li>
        </ul>
        <h4 class="mt-2">New posts by email</h4>
        <form class="newsletter" data-newsletter data-mailto="${site.email}">
          <label class="sr-only" for="nl-email">Email address</label>
          <input id="nl-email" type="email" placeholder="you@example.com" required>
          <button class="btn btn-gold btn-sm" type="submit">Subscribe</button>
          <p class="nl-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
    <p class="disclaimer"><strong>Attorney Advertising.</strong> The information on this website is for general informational purposes only and is not legal advice. Viewing this site, reading its articles, or contacting the office does not create an attorney-client relationship. Prior results do not guarantee a similar outcome. Francine D. Ward is admitted to practice in California, New York, and the District of Columbia. News summaries link to their original publishers, who own that content. <a href="${ctx.root}disclaimer/">Full disclaimer &amp; privacy</a>.</p>
    <div class="footer-bottom">
      <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.legalName)}. All rights reserved.</span>
      <span><a href="${ctx.root}disclaimer/">Disclaimer</a> · <a href="${ctx.root}feed.xml">RSS</a> · <a href="${ctx.root}sitemap.xml">Sitemap</a></span>
    </div>
  </div>
</footer>
<button class="to-top" type="button" aria-label="Back to top">
  <svg viewBox="0 0 44 44" aria-hidden="true" style="position:absolute;inset:3px;width:44px;height:44px;transform:rotate(-90deg)"><circle class="progress" cx="22" cy="22" r="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="119.4" stroke-dashoffset="119.4"/></svg>
  ${icon("arrowUp")}
</button>
<script src="${ctx.root}assets/js/main.js?v=${ctx.version}" defer></script>
${(page.scripts || []).map((src) => `<script src="${ctx.root}${src}?v=${ctx.version}" defer></script>`)}
</body>
</html>`;
}

// Typewriter apostrophes render as tall ticks in Fraunces, so curl them in visible text.
// Only text between tags is touched — never attributes, scripts or styles.
export function smartQuotes(doc) {
  return doc
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*>)/)
    .map((part, i) => (i % 2 ? part : part.replace(/([A-Za-z])'([A-Za-z])/g, "$1’$2").replace(/([A-Za-z])'(?=[\s.,;:!?)”]|$)/g, "$1’")))
    .join("");
}

export function layout(page, ctx, body) {
  return smartQuotes(html`${head(page, ctx)}
<body class="${page.theme ? "theme-" + page.theme : ""}">
${header(page, ctx)}
<main id="main">
${body}
</main>
${footer(page, ctx)}`);
}

// Shared building blocks -------------------------------------------------

export function aurora() {
  return `<div class="aurora" aria-hidden="true"><span></span><span></span><span></span><span></span></div><div class="grain" aria-hidden="true"></div><div class="hero-grid-lines" aria-hidden="true"></div>`;
}

export function subHero(ctx, { eyebrow, title, lead, crumbs = [], actions = "", extra = "" }) {
  return html`<section class="hero hero-sub">
  ${aurora()}
  <div class="container">
    ${crumbs.length
      ? html`<nav aria-label="Breadcrumb"><ol class="crumbs hero-fade"><li><a href="${ctx.root}">Home</a></li>${crumbs.map((c) =>
          c.href ? html`<li><a href="${ctx.root}${c.href}">${c.label}</a></li>` : html`<li aria-current="page">${c.label}</li>`
        )}</ol></nav>`
      : ""}
    <div class="container-narrow" style="margin:0;max-width:900px">
      ${eyebrow ? html`<p class="eyebrow hero-fade">${eyebrow}</p>` : ""}
      <h1>${title}</h1>
      ${lead ? html`<p class="lead hero-fade d1">${lead}</p>` : ""}
      ${actions ? html`<div class="btn-row hero-fade d2">${actions}</div>` : ""}
      ${extra}
    </div>
  </div>
</section>`;
}

// Split a headline into animated lines: lines("Protect what|you <em>create</em>.")
export function lines(text) {
  return text
    .split("|")
    .map((l) => `<span class="line"><span>${l}</span></span>`)
    .join("");
}

export function ctaBand(ctx, { title = "Let’s protect what matters to you.", eyebrow = "Complimentary consultation", lead, primary, secondary, extraLink } = {}) {
  return html`<section class="section section-tight">
  <div class="container">
    <div class="cta-band reveal reveal-scale">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="cta-band-inner">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h2>${title}</h2>
          <p class="lead">${lead || "Appointments are virtual, so wherever you are in California, New York or D.C., the first conversation is on the house. Bring your questions — leave with a plan."}</p>
          <div class="btn-row mt-2">
            ${primary || html`<a class="btn btn-gold" href="${ctx.root}contact/">Book your consultation <span class="arrow">→</span></a>`}
            ${secondary || ""}
          </div>
        </div>
        <div class="cta-contact">
          <a href="tel:${site.phoneHref}">${icon("phone")} ${site.phone}</a>
          <a href="mailto:${site.email}">${icon("mail")} <span>${site.email.replace("@", "@<wbr>")}</span></a>
          ${extraLink || html`<a href="${site.booking}" target="_blank" rel="noopener">${icon("calendar")} Book a 30-minute call online</a>`}
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// YouTube video as a click-to-play facade: no request to YouTube until the visitor
// presses play (main.js swaps in a youtube-nocookie iframe).
export function videoEmbed(id, title, { caption = "" } = {}) {
  return `<figure class="video-embed" data-yt="${esc(id)}"><a class="video-facade" href="https://www.youtube.com/watch?v=${esc(id)}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><span class="video-play" aria-hidden="true"></span><span class="sr-only">Play video: </span><span class="video-title">${esc(title)}</span></a></figure>${caption ? `<p class="video-caption">${caption}</p>` : ""}`;
}

// Portrait: shows a photo from src/assets/img/ (default francine-portrait.jpg) when present,
// otherwise an animated monogram so the layout never shows a broken image.
// Photos are 880×1100 (4:5) crops of Bre Flores Photography portraits from the previous site.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { monogramArt } from "./icons.mjs";
const imgDir = fileURLToPath(new URL("../assets/img/", import.meta.url));
export const portraitFile = ["francine-portrait.webp", "francine-portrait.jpg", "francine-portrait.png"].find((f) => existsSync(imgDir + f));

export function portrait(ctx, { file = portraitFile, alt = "Portrait of Francine D. Ward", eager = false } = {}) {
  const photo = file && existsSync(imgDir + file) ? file : null;
  return `<div class="portrait-frame${photo ? " has-photo" : ""}">
    ${photo ? "" : `<div class="portrait-art">${monogramArt("pa")}</div>`}
    ${photo ? `<img src="${ctx.root}assets/img/${photo}" alt="${esc(alt)}" width="880" height="1100"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>` : ""}
  </div>`;
}
