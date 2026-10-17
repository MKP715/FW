// The legal blog and the Esteemable Acts journal: Francine's posts from the previous
// WordPress site, republished at their original URLs so old links keep working.
import { site } from "../site.mjs";
import { html, esc, aurora, subHero, lines, ctaBand, formatDate } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts, legalPosts, journalPosts, blogCategories } from "../lib/posts.mjs";

const fill = (body, ctx) => body.replaceAll("{{root}}", ctx.root);

// Legal articles older than two years get a "laws change" note.
const cutoff = new Date();
cutoff.setFullYear(cutoff.getFullYear() - 2);
const cutoffIso = cutoff.toISOString().slice(0, 10);

export function postRow(p, ctx) {
  // Section headings make the archive search find posts by topic, not just by title.
  const headings = (p.body.match(/<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>/g) || []).map((h) => h.replace(/<[^>]+>/g, "")).join(" · ");
  return html`<a class="post-row" data-cat="${p.catSlug}" data-q="${esc(headings)}" href="${ctx.root}${p.path}">
  <time datetime="${p.date}">${formatDate(p.date)}</time>
  <span class="post-row-main">
    <span class="news-cat">${p.catLabel}</span>
    <span class="post-row-title">${esc(p.title)}</span>
    <span class="post-row-excerpt">${esc(p.excerpt)}</span>
  </span>
  <span class="post-row-meta">${p.readTime} min</span>
</a>`;
}

export function postCard(p, ctx) {
  return html`<a class="card reveal theme-${p.kind === "journal" ? "author" : "law"}" href="${ctx.root}${p.path}">
  <p class="news-meta"><span class="news-cat">${p.catLabel}</span><time datetime="${p.date}">${formatDate(p.date)}</time></p>
  <h3>${esc(p.title)}</h3>
  <p class="excerpt-3">${esc(p.excerpt)}</p>
  <span class="card-foot link-arrow">Read ${p.kind === "journal" ? "the reflection" : "the article"} <span class="arrow">→</span></span>
</a>`;
}

function toolbar({ chips, label, placeholder }) {
  return html`<div class="news-toolbar">
  ${chips ? html`<div class="chips" role="group" aria-label="Filter by topic">${chips}</div>` : ""}
  <label class="search-field">${icon("search")}<span class="sr-only">${label}</span><input type="search" placeholder="${placeholder}"></label>
</div>`;
}

// Legal blog index (and the old category URLs, which open with that topic selected).
function legalIndex(cat) {
  const counts = Object.fromEntries(blogCategories.map((c) => [c.slug, legalPosts.filter((p) => p.catSlug === c.slug).length]));
  return {
    path: cat ? cat.path : "legal-blog/",
    section: "insights/",
    title: cat ? `${cat.label} Articles — Legal Blog` : "Legal Blog — Estate Planning, Trademarks & Copyright",
    description: cat
      ? `${counts[cat.slug]} plain-English ${cat.label.toLowerCase()} articles by attorney Francine D. Ward.`
      : `${legalPosts.length} plain-English articles by attorney Francine D. Ward on estate planning, trusts, trademarks, copyrights and protecting what you create.`,
    theme: "law",
    priority: cat ? "0.6" : "0.8",
    render: (ctx) => html`
${subHero(ctx, {
  eyebrow: cat ? `Legal Blog · ${cat.label}` : "Legal Blog",
  title: lines(cat ? `${cat.label},|<em>in plain English.</em>` : "The law, explained|<em>in plain English.</em>"),
  lead: cat
    ? `${counts[cat.slug]} ${cat.label.toLowerCase()} articles by Francine D. Ward, out of ${legalPosts.length} on the legal blog. Search them, or pick another topic.`
    : `${legalPosts.length} articles by Francine D. Ward on wills and trusts, probate, trademarks, copyrights and the business of creative work. Pick a topic or search.`,
  crumbs: cat ? [{ label: "Insights", href: "insights/" }, { label: "Legal Blog", href: "legal-blog/" }, { label: cat.label }] : [{ label: "Insights", href: "insights/" }, { label: "Legal Blog" }],
  actions: html`<a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a consultation <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="${ctx.root}insights/">Plain-English guides</a>`,
})}
<section class="section section-tight" data-news data-limit="24" data-default="${cat ? cat.slug : "all"}">
  <div class="container">
    ${toolbar({
      chips: html`<button class="chip" type="button" data-filter="all" aria-pressed="${cat ? "false" : "true"}">All<span class="count">${legalPosts.length}</span></button>${blogCategories.map(
        (c) => html`<button class="chip" type="button" data-filter="${c.slug}" aria-pressed="${cat && cat.slug === c.slug ? "true" : "false"}">${c.label}<span class="count">${counts[c.slug]}</span></button>`
      )}`,
      label: "Search articles",
      placeholder: "Search articles…",
    })}
    <p class="muted list-count" aria-live="polite"><span data-news-count data-one="article" data-many="articles">${cat ? counts[cat.slug] : legalPosts.length} articles</span> · newest first</p>
    <div class="post-list">${legalPosts.map((p) => postRow(p, ctx))}</div>
    <p class="center mt-2"><button class="btn btn-ghost" type="button" data-news-more hidden>Show all ${cat ? counts[cat.slug] : legalPosts.length} articles</button></p>
    <div class="news-empty"><p>No articles match these filters.</p><p><button class="btn btn-ghost btn-sm" type="button" data-news-reset>${cat ? `Show all ${cat.label.toLowerCase()} articles` : "Show all articles"}</button></p><p>Or <a href="${ctx.root}contact/">ask Francine directly</a>.</p></div>
    <p class="notice">These articles are general information, not legal advice, and reflect the law when each was written. Reading them does not create an attorney-client relationship.</p>
  </div>
</section>
${ctaBand(ctx, { title: "Have a question about <em>your</em> situation?" })}
`,
  };
}

const journalIndex = {
  path: "esteemable-acts/journal/",
  section: "esteemable-acts/",
  title: "The Esteemable Acts Journal",
  description: `${journalPosts.length} reflections by Francine D. Ward on self-esteem, courage, habits and the Life Pillars — one esteemable act at a time.`,
  theme: "author",
  priority: "0.7",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Esteemable Acts® Journal",
  title: lines("Reflections for|<em>right living.</em>"),
  lead: `${journalPosts.length} essays on walking through fear, building habits, forgiveness, money, health and the Life Pillars. Read one a week — then take the action.`,
  crumbs: [{ label: "Esteemable Acts", href: "esteemable-acts/" }, { label: "Journal" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}${journalPosts[0].path}">Read the latest <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="${ctx.root}resources/#worksheets">Free worksheets</a>`,
})}
<section class="section section-tight" data-news data-limit="20" data-default="all">
  <div class="container">
    ${toolbar({ label: "Search the journal", placeholder: "Search the journal…" })}
    <p class="muted list-count" aria-live="polite"><span data-news-count data-one="reflection" data-many="reflections">${journalPosts.length} reflections</span> · newest first</p>
    <div class="post-list">${journalPosts.map((p) => postRow(p, ctx))}</div>
    <p class="center mt-2"><button class="btn btn-ghost" type="button" data-news-more hidden>Show all ${journalPosts.length} reflections</button></p>
    <div class="news-empty"><p>Nothing matches that search.</p><p><button class="btn btn-ghost btn-sm" type="button" data-news-reset>Show all reflections</button></p></div>
  </div>
</section>
${ctaBand(ctx, {
  title: "Ready for your <em>next right action?</em>",
  eyebrow: "Esteemable Acts®",
  extraLink: html`<a href="${ctx.root}speaking/">${icon("mic")} Speaking inquiries</a>`,
  lead: "Bring Francine's message of hope and action to your organization, or start with the free Life Pillars check-in.",
  primary: html`<a class="btn btn-gold" href="${ctx.root}speaking/">Book Francine to speak <span class="arrow">→</span></a>`,
  secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}resources/#worksheets">Life Pillars check-in</a>`,
})}
`,
};

const postPages = posts.map((p) => {
  const journal = p.kind === "journal";
  const cat = blogCategories.find((c) => c.slug === p.catSlug);
  const related = posts.filter((o) => o !== p && o.catSlug === p.catSlug);
  // Nearest older posts first, then the nearest newer ones, so each post gets its own neighbours.
  const pick = [...related.filter((o) => o.date < p.date), ...related.filter((o) => o.date >= p.date).reverse()].slice(0, 3);
  const archival = !journal && p.date < cutoffIso;
  return {
    path: p.path,
    section: journal ? "esteemable-acts/" : "insights/",
    title: p.title,
    description: p.excerpt,
    theme: journal ? "author" : "law",
    ogType: "article",
    priority: "0.5",
    updated: p.modified,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      dateModified: p.modified,
      author: { "@type": "Person", name: "Francine D. Ward", url: site.url + "/meet-francine/" },
      publisher: { "@type": "Organization", name: site.legalName },
      mainEntityOfPage: site.url + "/" + p.path,
    },
    render: (ctx) => html`
<section class="hero hero-sub hero-post">
  ${aurora()}
  <div class="container">
    <nav aria-label="Breadcrumb"><ol class="crumbs hero-fade"><li><a href="${ctx.root}">Home</a></li>${
      journal
        ? html`<li><a href="${ctx.root}esteemable-acts/">Esteemable Acts</a></li><li><a href="${ctx.root}esteemable-acts/journal/">Journal</a></li>`
        : html`<li><a href="${ctx.root}legal-blog/">Legal Blog</a></li>${cat ? html`<li><a href="${ctx.root}${cat.path || "legal-blog/?topic=" + cat.slug}">${cat.label}</a></li>` : ""}`
    }</ol></nav>
    <div class="post-head">
      <p class="eyebrow hero-fade">${journal ? "Esteemable Acts® Journal" : p.catLabel}</p>
      <h1 class="hero-fade">${esc(p.title)}</h1>
      <p class="article-meta hero-fade d1"><span>By Francine D. Ward</span><span aria-hidden="true">·</span><time datetime="${p.date}">${formatDate(p.date, { year: "numeric", month: "long", day: "numeric" })}</time><span aria-hidden="true">·</span><span>${p.readTime} min read</span></p>
    </div>
  </div>
</section>
<article class="section section-post">
  <div class="container container-narrow">
    ${archival
      ? html`<p class="callout post-archival"><strong>First published ${formatDate(p.date, { month: "long", year: "numeric" })}.</strong> Laws, fees and filing rules change. Please confirm current requirements, or <a href="${ctx.root}contact/">ask Francine</a>, before relying on this article.</p>`
      : ""}
    <div class="prose">${fill(p.body, ctx)}</div>
    ${journal ? "" : html`<p class="notice">This article is general information, not legal advice, and reflects the law when it was written. Reading it does not create an attorney-client relationship.</p>`}
    <aside class="author-box" aria-label="About the author">
      <img src="${ctx.root}assets/img/francine-library.jpg" alt="Francine D. Ward" width="96" height="120" loading="lazy">
      <div>
        <p class="author-name">Francine D. Ward</p>
        <p>${journal
          ? "Attorney, speaker and author of Esteemable Acts®. She writes about building real self-esteem the only way it's built: one right action at a time."
          : "Intellectual property and estate planning attorney admitted in California, New York and the District of Columbia, with 35 years of experience. Appointments are virtual."}</p>
        <div class="btn-row">
          ${journal
            ? html`<a class="btn btn-sm" href="${ctx.root}esteemable-acts/journal/">More reflections <span class="arrow">→</span></a><a class="btn btn-sm btn-ghost" href="${ctx.root}meet-francine/">Francine's story</a>`
            : html`<a class="btn btn-sm" href="${site.booking}" target="_blank" rel="noopener">Schedule a consultation <span class="arrow">→</span></a><a class="btn btn-sm btn-ghost" href="${ctx.root}legal-blog/">All articles</a>`}
        </div>
      </div>
    </aside>
  </div>
</article>
${pick.length
  ? html`<section class="section section-sand section-tight">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Keep reading</p><h2>More ${journal ? "<em>reflections.</em>" : `on <em>${esc(p.catLabel.toLowerCase())}.</em>`}</h2></div>
    <div class="grid grid-3" data-stagger="0.1">${pick.map((o) => postCard(o, ctx))}</div>
  </div>
</section>`
  : ""}
${journal
  ? ctaBand(ctx, {
      title: "One small, brave action. <em>Every week.</em>",
      eyebrow: "Esteemable Acts community",
      extraLink: html`<a href="${ctx.root}speaking/">${icon("mic")} Speaking inquiries</a>`,
      lead: "Join Francine's Esteemable Acts community on Facebook, or bring her message to your next event.",
      primary: html`<a class="btn btn-gold" href="${site.communities[1].href}" target="_blank" rel="noopener">Join the community <span class="arrow">→</span></a>`,
      secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}speaking/">Book Francine to speak</a>`,
    })
  : ctaBand(ctx)}
`,
  };
});

export default [legalIndex(null), ...blogCategories.filter((c) => c.path).map((c) => legalIndex(c)), journalIndex, ...postPages];
