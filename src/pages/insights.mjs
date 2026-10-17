import { html, subHero, lines, ctaBand, formatDate, aurora } from "../lib/layout.mjs";
import { articles } from "../data/insights.mjs";

const quick = [
  ["What's the difference between a trademark and a copyright?", "A trademark protects the names, logos and slogans that identify the source of goods or services. A copyright protects original creative expression — books, art, music, photos, software. Your business name is a trademark question; your book is a copyright question; your book's series title might be both."],
  ["How long does a trademark registration last?", "Potentially forever — if you keep using it and keep it maintained. File a Section 8 declaration between years five and six, renew between years nine and ten, and then every ten years."],
  ["Is the U.S. “first to file” or “first to use” for trademarks?", "Rights come from use, but federal registration gives you powerful nationwide priority. If you plan to launch a brand, an intent-to-use application can reserve your place in line before someone else files."],
  ["Can I copyright my website?", "The Copyright Office doesn't register websites as such, but it does register the copyrightable content on them — text, photos, artwork, video and code."],
  ["Who owns a ghostwritten book?", "It depends on the contract. Always have a written agreement with anyone you hire to write for you, with a work-made-for-hire clause where it applies and an assignment of rights as backup."],
  ["What makes someone a joint author?", "Joint ownership occurs when two or more people contribute expression intended to be merged into a single work. An idea alone isn't enough — you have to turn it into a tangible form."],
  ["Is there a federal right of publicity?", "No. It's governed by state law. California protects living people and gives a deceased personality's heirs rights for 70 years after death."],
  ["Do influencers really have to disclose sponsorships?", "Yes. Under the FTC's Endorsement Guides, advertisers and paid endorsers must clearly disclose material connections — payment, free products or relationships."],
  ["What is a HIPAA authorization, and why is it in my estate plan?", "It allows the people you name to speak with your doctors and access your medical information. Without it, privacy rules can keep even close family in the dark."],
  ["What happens to my cryptocurrency when I die?", "Crypto can be held in a revocable trust, but your fiduciaries also need a secure way to access wallets and private keys. Without them, the assets may be lost forever."],
];

const index = {
  path: "insights/",
  section: "insights/",
  title: "Insights — Plain-English Legal Guides",
  description: "Plain-English guides on copyright and AI, right of publicity, publishing contracts and estate planning from the Law Office of Francine D. Ward.",
  theme: "law",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Insights",
  title: lines("Know your rights.|<em>Then use them.</em>"),
  lead: "Plain-English guides for creators, entrepreneurs and families — on copyright and AI, your likeness, book deals and estate planning.",
  crumbs: [{ label: "Insights" }],
})}

<section class="section">
  <div class="container">
    <div class="grid grid-2" data-stagger="0.1">
      ${articles.map(
        (a, i) => html`<a class="card reveal theme-${a.theme}" href="${ctx.root}insights/${a.slug}/" style="${i === 0 ? "background:var(--ink);color:var(--ivory);border-color:var(--ink)" : ""}">
          <p class="news-meta"><span class="news-cat"${i === 0 ? ' style="color:var(--gold-2)"' : ""}>${a.category}</span><span${i === 0 ? ' style="color:rgba(251,247,241,.6)"' : ""}>${a.readTime} min read</span></p>
          <h3 style="font-size:clamp(1.5rem,2.4vw,2rem)">${a.title}</h3>
          <p${i === 0 ? ' style="color:rgba(251,247,241,.75)"' : ""}>${a.dek}</p>
          <span class="card-foot link-arrow"${i === 0 ? ' style="color:var(--gold-2)"' : ""}>Read the guide <span class="arrow">→</span></span>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section-sand" id="quick-answers">
  <div class="container container-narrow">
    <div class="section-head center reveal">
      <p class="eyebrow">Quick answers</p>
      <h2>Questions clients ask <em>every week.</em></h2>
    </div>
    <div class="accordion reveal">
      ${quick.map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p></div></details>`)}
    </div>
    <p class="notice">General information only — not legal advice. Every situation is different; talk to a lawyer licensed in your state about yours.</p>
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
    author: { "@type": "Person", name: "Francine D. Ward" },
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
      <div class="article-meta hero-fade d2"><span>By Francine D. Ward</span><span>·</span><time datetime="${a.date}">${formatDate(a.date, { year: "numeric", month: "long", day: "numeric" })}</time><span>·</span><span>${a.readTime} min read</span></div>
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
