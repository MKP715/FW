import { html, esc, subHero, lines, ctaBand, formatDate, aurora } from "../lib/layout.mjs";
import { articles } from "../data/insights.mjs";
import { posts, legalPosts, journalPosts, blogCategories } from "../lib/posts.mjs";
import { postCard } from "./blog.mjs";

// Quick answers: [question, answer, optional title of a blog post that goes deeper].
const quick = [
  ["What's the difference between a trademark and a copyright?", "A trademark protects the names, logos and slogans that identify the source of goods or services. A copyright protects original creative expression — books, art, music, photos, software. Your business name is a trademark question; your book is a copyright question; your book's series title might be both.", "What is a Trademark?"],
  ["How long does a trademark registration last?", "Potentially forever — if you keep using it and keep it maintained. File a Section 8 declaration between years five and six, renew between years nine and ten, and then every ten years.", "Trademark Duration"],
  ["Is the U.S. “first to file” or “first to use” for trademarks?", "Rights come from use, but federal registration gives you powerful nationwide priority. If you plan to launch a brand, an intent-to-use application can reserve your place in line before someone else files.", "Trademark Benefits"],
  ["Can I copyright my website?", "The Copyright Office doesn't register websites as such, but it does register the copyrightable content on them — text, photos, artwork, video and code."],
  ["Who owns a ghostwritten book?", "It depends on the contract. Always have a written agreement with anyone you hire to write for you, with a work-made-for-hire clause where it applies and an assignment of rights as backup.", "Hiring a Ghostwriter"],
  ["What makes someone a joint author?", "Joint ownership occurs when two or more people contribute expression intended to be merged into a single work. An idea alone isn't enough — you have to turn it into a tangible form.", "Joint Ownership: Rules of the Road"],
  ["Is there a federal right of publicity?", "No. It's governed by state law. California protects living people and gives a deceased personality's heirs rights for 70 years after death.", "Right of Publicity"],
  ["Do influencers really have to disclose sponsorships?", "Yes. Under the FTC's Endorsement Guides, advertisers and paid endorsers must clearly disclose material connections — payment, free products or relationships.", "FTC Endorsement Guides"],
  ["What is a HIPAA authorization, and why is it in my estate plan?", "It allows the people you name to speak with your doctors and access your medical information. Without it, privacy rules can keep even close family in the dark.", "What is a HIPAA Authorization?"],
  ["What happens to my cryptocurrency when I die?", "Crypto can be held in a revocable trust, but your fiduciaries also need a secure way to access wallets and private keys. Without them, the assets may be lost forever.", "Cryptocurrency and Your Estate Plan"],
];
const postByTitle = (title) => title && posts.find((p) => p.title === title);

// Topic shortcuts into the legal blog archive (estate planning and copyrights have landing pages).
const topicSlugs = ["estate-planning", "trademarks", "copyrights", "legal-insights"];
const topics = topicSlugs
  .map((slug) => blogCategories.find((c) => c.slug === slug))
  .filter(Boolean)
  .map((c) => ({ ...c, href: c.path || `legal-blog/?topic=${c.slug}`, count: legalPosts.filter((p) => p.catSlug === c.slug).length }));

const index = {
  path: "insights/",
  section: "insights/",
  title: "Insights — Legal Guides, Blog & Journal",
  description: `Plain-English legal guides, ${legalPosts.length} legal blog articles and the Esteemable Acts journal by attorney Francine D. Ward — copyright and AI, trademarks, publishing contracts and estate planning.`,
  theme: "law",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Insights",
  title: lines("Know your rights.|<em>Then use them.</em>"),
  lead: `Plain-English writing for creators, entrepreneurs and families — in-depth guides, ${legalPosts.length} articles from Francine's legal blog, and reflections from the Esteemable Acts® journal.`,
  crumbs: [{ label: "Insights" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}legal-blog/">Browse the legal blog <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#quick-answers">Quick answers</a>`,
})}

<section class="section" id="guides">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Plain-English guides</p>
      <h2>Start with the <em>big questions.</em></h2>
      <p class="lead">In-depth guides to the issues shaping creative work and family planning right now.</p>
    </div>
    <div class="grid grid-2" data-stagger="0.1">
      ${articles.map(
        (a) => html`<a class="card reveal theme-${a.theme}" href="${ctx.root}insights/${a.slug}/">
          <p class="news-meta"><span class="news-cat">${a.category}</span><span>${a.readTime} min read</span></p>
          <h3 style="font-size:clamp(1.5rem,2.4vw,2rem)">${a.title}</h3>
          <p>${a.dek}</p>
          <span class="card-foot link-arrow">Read the guide <span class="arrow">→</span></span>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section-sand" id="legal-blog">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">From the legal blog</p>
      <h2>The latest <em>articles.</em></h2>
      <p class="lead">${legalPosts.length} articles by Francine on wills and trusts, probate, trademarks, copyrights and the business of creative work. Pick a topic, or start with the newest.</p>
      <div class="btn-row mt-1" role="group" aria-label="Legal blog topics">
        ${topics.map((t) => html`<a class="btn btn-sm btn-ghost" href="${ctx.root}${t.href}">${t.label} <span class="muted">${t.count}<span class="sr-only"> articles</span></span></a>`)}
      </div>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${legalPosts.slice(0, 6).map((p) => postCard(p, ctx))}
    </div>
    <div class="btn-row mt-3 reveal" style="justify-content:center">
      <a class="btn" href="${ctx.root}legal-blog/">See all ${legalPosts.length} articles <span class="arrow">→</span></a>
    </div>
  </div>
</section>

<section class="section" id="quick-answers">
  <div class="container container-narrow">
    <div class="section-head center reveal">
      <p class="eyebrow">Quick answers</p>
      <h2>Questions clients ask <em>every week.</em></h2>
    </div>
    <div class="accordion reveal">
      ${quick.map(([q, a, more]) => {
        const p = postByTitle(more);
        return html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p>${p ? html`<p class="mb-0"><a class="link-arrow" href="${ctx.root}${p.path}">Read more: ${esc(p.title)} <span class="arrow">→</span></a></p>` : ""}</div></details>`;
      })}
    </div>
    <p class="notice">General information only — not legal advice. Every situation is different; talk to a lawyer licensed in your state about yours.</p>
  </div>
</section>

<section class="section section-sand section-tight theme-author" id="journal">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">From the Esteemable Acts journal</p>
      <h2>Not every question is <em>a legal one.</em></h2>
      <p class="lead">Francine also writes about self-esteem, courage, habits and the Life Pillars — reflections for building a life you're proud of, one right action at a time.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${journalPosts.slice(0, 3).map((p) => postCard(p, ctx))}
    </div>
    <p class="mt-2 reveal"><a class="link-arrow" href="${ctx.root}esteemable-acts/journal/">Read all ${journalPosts.length} reflections in the journal <span class="arrow">→</span></a></p>
  </div>
</section>

${ctaBand(ctx, { title: "Have a question that isn't <em>answered here?</em>" })}
`,
};

const articlePages = articles.map((a) => ({
  path: `insights/${a.slug}/`,
  section: "insights/",
  title: a.title,
  description: a.dek,
  theme: a.theme,
  ogType: "article",
  priority: "0.7",
  updated: a.date,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Law Office of Francine D. Ward" },
    publisher: { "@type": "Organization", name: "Law Office of Francine D. Ward" },
  },
  render: (ctx) => {
    const others = articles.filter((o) => o.slug !== a.slug).slice(0, 3);
    return html`
<section class="hero hero-sub">
  ${aurora()}
  <div class="container">
    <nav aria-label="Breadcrumb"><ol class="crumbs hero-fade"><li><a href="${ctx.root}">Home</a></li><li><a href="${ctx.root}insights/">Insights</a></li><li aria-current="page">${a.category}</li></ol></nav>
    <div style="max-width:900px">
      <p class="eyebrow hero-fade">${a.category}</p>
      <h1 style="font-size:clamp(2.3rem,5vw,4.4rem)">${lines(a.title)}</h1>
      <p class="lead hero-fade d1">${a.dek}</p>
      <div class="article-meta hero-fade d2"><span>From the Law Office of Francine D. Ward</span><span aria-hidden="true">·</span><time datetime="${a.date}">${formatDate(a.date, { year: "numeric", month: "long", day: "numeric" })}</time><span aria-hidden="true">·</span><span>${a.readTime} min read</span></div>
    </div>
  </div>
</section>
<article class="section">
  <div class="container container-narrow prose reveal">
    ${a.body}
    <p class="notice">This article is general information, not legal advice, and reflects the law as of its publication date. Reading it does not create an attorney-client relationship.</p>
  </div>
</article>
<section class="section section-sand section-tight">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Keep reading</p><h2>More <em>insights.</em></h2></div>
    <div class="grid grid-3" data-stagger="0.1">
      ${others.map(
        (o) => html`<a class="card reveal theme-${o.theme}" href="${ctx.root}insights/${o.slug}/"><p class="news-meta"><span class="news-cat">${o.category}</span><span>${o.readTime} min</span></p><h3>${o.title}</h3><p>${o.dek}</p></a>`
      )}
    </div>
  </div>
</section>
${ctaBand(ctx)}
`;
  },
}));

export default [index, ...articlePages];
