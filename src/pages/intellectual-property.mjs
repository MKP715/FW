import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts } from "../lib/posts.mjs";
import { postCard } from "./blog.mjs";
import { testimonials } from "../data/content.mjs";
import { articles } from "../data/insights.mjs";

// Sources for this page: the previous site's Trademarks page (FAQ), the 2019/2020 press kits
// (practice description), Francine's republished blog posts, and the client reviews.

// Republished blog posts, looked up by their exact titles. Missing titles are skipped.
const post = (title) => posts.find((p) => p.title === title);
const postLinks = (titles) => titles.map(post).filter(Boolean);
// Site-authored Insights articles, linked only while they exist.
const article = (slug) => articles.find((a) => a.slug === slug);

function readLinks(ctx, items, label = "Read") {
  if (!items.length) return "";
  return html`<p class="mt-1 mb-0"><strong>${label}:</strong> ${items
    .map((p) => `<a href="${ctx.root}${p.path}">${esc(p.title.replace(/\.$/, ""))}</a>`)
    .join(" · ")}</p>`;
}

// Practice areas, per the press kits: copyrights, trademarks, publishing agreements,
// business agreements and entity formation, website terms of use and privacy policies.
const areas = [
  {
    id: "trademark",
    title: "Trademarks",
    intro:
      "A trademark is a source identifier — a word, phrase, logo, design, sound, fragrance, color, or a combination of those things — that tells customers where a product or service comes from. Francine helps clients understand what can be protected and how to defend those valuable rights, from choosing a mark to keeping the registration alive.",
    items: [
      "Choosing a protectable mark — distinctive marks are strong; descriptive ones are weak",
      "Comprehensive clearance searches before you invest in a name or logo",
      "USPTO applications, use-based or intent-to-use, in every class your business needs",
      "Responses to USPTO office actions",
      "Post-registration filings: the Declaration of Continued Use, the optional Declaration of Incontestability, and renewals",
      "Monitoring your mark and addressing infringers — starting, where possible, with a letter rather than a lawsuit",
    ],
    note: (ctx) => {
      const t = testimonials.find((x) => x.full && /note of information/.test(x.full));
      return t
        ? html`<p class="callout mt-1">How to first approach an infringer, as one client remembers Francine's advice: “It's always better to start on a note of information…” <span class="muted">— ${esc(t.who)}</span></p>`
        : "";
    },
    reads: ["What is a Trademark?", "Trademark Check.", "Trademark Protection.", "Trademark Duration"],
    extra: (ctx) => html`<p class="mt-1 mb-0"><a class="link-arrow" href="#trademark-faq">Trademark FAQ <span class="arrow">↓</span></a></p>`,
  },
  {
    id: "copyright",
    title: "Copyrights",
    intro:
      "Copyright protects an original work of authorship once it's fixed in a tangible form — a book, article, course, photograph, artwork, song or website. Registration with the U.S. Copyright Office is what lets you enforce it in court, and registering early preserves your right to statutory damages and attorney's fees. Francine counsels clients on the most effective way to achieve copyright protection.",
    items: [
      "Copyright registration for books, training materials, courses, artwork, photographs and website content",
      "Work-made-for-hire and assignment agreements, so you own what you paid someone to create",
      "Joint-authorship and collaboration agreements — before you write the book or the song together",
      "Using other people's work safely: image licenses, permissions and fair use",
    ],
    reads: ["Use of Images – Read the License Carefully", "Joint Ownership: Rules of the Road", "Who Owns AI created content?"],
  },
  {
    id: "publishing",
    title: "Publishing",
    intro:
      "Authors hire Francine to counsel them on the intricacies of the publishing process, which often involves carefully negotiating their book contracts. She is a traditionally published author herself — <em>Esteemable Acts®</em> (Broadway Books) and <em>52 Weeks of Esteemable Acts</em> (Hazelden) — so she knows the process as an author and as a lawyer.",
    items: [
      "Book and publishing contract review and negotiation",
      "What you grant and what you keep: rights, royalties and accounting terms",
      "Reversion clauses, so your rights can come back to you",
      "Ghostwriter and work-made-for-hire agreements",
      "Waivers and releases for the real people in your book",
    ],
    note: (ctx) => {
      const t = testimonials.find((x) => x.full && /objectives collide/.test(x.full));
      return t
        ? html`<p class="callout mt-1">“Publishers want your work because they can make money on it. They're business people … and sometimes their objectives collide with yours.” <span class="muted">— Francine, as remembered by ${esc(t.who)}, who then crafted a new agreement in which the rights to her story reverted to her</span></p>`
        : "";
    },
    reads: ["Hiring a Ghostwriter"],
    insight: "publishing-contract-clauses",
  },
  {
    id: "contracts",
    title: "Contracts & Business",
    intro:
      "Having a written agreement with everyone you do business with is the key to protecting yourself. Francine reviews, prepares and negotiates agreements based on current law, and counsels clients on choosing the right form of business entity.",
    items: [
      "Contract review before you sign",
      "Independent-contractor and freelance agreements, including New York's Freelance Isn't Free Act",
      "Collaboration and service agreements",
      "Choosing and forming the right business entity",
    ],
    reads: ["Freelance Laws", "Have You Thought of Setting Up a Non Profit?"],
  },
  {
    id: "privacy",
    title: "Websites & Privacy",
    intro:
      "Running a website comes with legal homework. Francine educates clients on the importance of well-crafted terms of use and privacy policies, especially under California's Consumer Privacy Act (CCPA) and Europe's General Data Protection Regulation (GDPR).",
    items: [
      "Website terms of use and privacy policies",
      "CCPA and GDPR basics for small and growing businesses",
      "Who owns your website — the content, graphics and code a developer creates for you",
      "Social media legal issues: what you can post, share and borrow",
    ],
    reads: ["Privacy Policy. Terms and Conditions. COPPA.", "California Consumer Privacy Act (CCPA)", "Social Media At Work"],
  },
];

// Trademark FAQ from the previous site's Trademarks page, condensed. "TESS" (retired by the
// USPTO in 2023) is now "the USPTO's trademark search system".
const faq = [
  {
    q: "What is a trademark?",
    a: [
      "A device that serves as a source identifier. Devices can be a word, phrase, logo, design, sound, fragrance, color, or a combination of those things, which identifies the source of a product or the source of a service. A trademark lets consumers know a product or service originates from a particular person or entity.",
      "Note that you don't own the word itself — you own how the trademark is used with the goods or services you specify.",
    ],
    read: "What is a Trademark?",
  },
  {
    q: "What are some examples of trademarks?",
    a: ["Nike, Adobe, Microsoft, Apple, Google, Ford, Lexus, Mercedes Benz, Roku, Tesla, Coke, Diet Coke and Pepsi — and slogans such as Just Do It and I'm Lovin' It. There are many more."],
  },
  {
    q: "What is the difference between a strong and a weak trademark?",
    a: [
      "In the trademark world, the more distinctive a mark, the greater the level of protection. Strong, distinctive trademarks are registered on the Principal Register and enjoy the greatest protection. Made-up (fanciful or coined) words such as Google and Xerox are the strongest, followed by arbitrary marks (Apple for computers) and suggestive marks (Coppertone for sunscreen).",
      "Descriptive marks are weak. If a weak trademark gets registered, it is placed on the Supplemental Register; after five years of use, an owner who can prove the mark has acquired distinctiveness may seek registration on the Principal Register. Generic terms can't be protected at all.",
    ],
    read: "Trademark Check.",
  },
  {
    q: "What is the difference between common law and registered trademarks?",
    a: [
      "Common law trademarks have been used over a period of time but have not been registered with the United States Patent and Trademark Office (USPTO).",
      "The U.S. is a first-to-use country, so use creates rights. But if you don't register and someone else registers the same mark, you will need to prove your common law rights — which can be costly, and you could lose.",
    ],
    read: "Trademark Benefits",
  },
  {
    q: "What are the benefits of trademark registration?",
    a: ["Despite the cost of filing and of maintaining a registration, the benefits include:"],
    list: [
      "a legal presumption of ownership",
      "nationwide protection",
      "constructive notice to third parties",
      "the right to record your registration with U.S. Customs and Border Protection",
      "a listing in the USPTO's trademark search system",
      "the right to use the ® registration symbol",
      "the right to file a lawsuit in federal court",
    ],
    read: "Register Trademark",
  },
  {
    q: "Which trademark symbol should I use?",
    a: [
      "After a comprehensive trademark search, once an application has been filed and you are reasonably confident it won't be challenged, you may use the ™ symbol. Once the USPTO officially registers the trademark, use the ® — which may only be used once the mark is registered.",
    ],
  },
  {
    q: "How long does a trademark last?",
    a: ["Forever, so long as the registrant performs all post-registration actions:"],
    list: [
      "filing the Declaration of Continued Use between years 5 and 6 after registration",
      "renewing between years 9 and 10 after registration, and every 10 years after that",
      "monitoring the marketplace to make sure no one is violating your rights",
      "most of all, using your trademark the way you declared in your Statement of Use or Allegation of Use",
    ],
    after: "Many owners also file the optional Declaration of Incontestability after five years — often together with the Declaration of Continued Use.",
    read: "Trademark Duration",
  },
  {
    q: "Do I really need to do a trademark search?",
    a: [
      "No, a search is not required. That said, if you bypass this vital and essential step, you do so at your peril. A comprehensive search tells you about potential challenges and what to do about them, and helps determine whether a mark is weak or strong.",
      "A quick “knock-out” search only screens out obvious conflicts. A comprehensive search goes further: federal registrations and applications in the USPTO's trademark search system, state registries, search engines and social media, business and domain-name directories — and foreign databases if you plan to expand abroad.",
    ],
    read: "Trademark Search",
  },
  {
    q: "What is the difference between a use-based and an intent-to-use (ITU) application?",
    a: [
      "A use-based application is filed when you have everything you need: satisfactory specimens showing the mark in use, the required fee, and a properly completed application. An intent-to-use application is a placeholder — it states that you have a bona fide intention to use the trademark, and you prove the use later.",
      "Even if you're ready to file a use-based application, it's sometimes strategically best to file an ITU, because it gives you more time to prepare specimens.",
    ],
  },
];

// Issues Francine writes about. Kept separate from the practice areas above so the page
// doesn't overstate her services; each card links to her own posts.
const issues = [
  {
    id: "ai",
    icon: "ai",
    eyebrow: "AI & creative rights",
    title: "Who owns what a machine helps make?",
    text: "Francine has been writing about artificial intelligence and intellectual property since 2020 — from South Africa's patent for an invention credited to an AI system to the buzzwords everyone is suddenly using. U.S. copyright protects human authorship, so if you create with AI, keep a record of your own creative contribution and read your AI tool's terms.",
    reads: ["Who Owns AI created content?", "AI Buzzwords."],
    insight: "do-you-own-what-ai-helps-you-make",
    news: true,
  },
  {
    id: "publicity",
    icon: "user",
    eyebrow: "Right of publicity",
    title: "Your name and likeness are property.",
    text: "The right of publicity prevents the unauthorized commercial use of a person's identity — name, likeness, voice, signature and more, depending on the state. There is no federal right of publicity law. California protects living people and, for 70 years after death, deceased personalities. Unlike privacy, it's a property right, so it can be transferred or inherited. Using someone's name, photo or story in your book or on your website? Ask first, and get a signed release.",
    reads: ["Right of Publicity", "Right of Publicity: Avoid Being Sued!"],
    insight: "your-voice-your-likeness-your-legacy",
  },
  {
    id: "advertising",
    icon: "megaphone",
    eyebrow: "Advertising & endorsements",
    title: "Tell the truth — and disclose the connection.",
    text: "The FTC's Endorsement Guides require both advertisers and the endorsers they pay to disclose material connections, and advertisers must be able to back up their claims. False or misleading statements about your products, or a competitor's, can land you in state or federal court.",
    reads: ["FTC Endorsement Guides", "False Advertising"],
  },
  {
    id: "trade-secrets",
    icon: "lock",
    eyebrow: "Trade secrets",
    title: "Some assets are protected by keeping them secret.",
    text: "Recipes, processes, formulas and client lists usually can't be registered. They're protected as trade secrets only as long as you take reasonable steps to keep them confidential, including written confidentiality terms with the people you work with. Like copyrights, trademarks and publicity rights, they are property that can be placed in a trust.",
    reads: ["What are Trust Assets?"],
    estate: true,
  },
];

const featured = postLinks([
  "Trademark Check.",
  "Trademark Search",
  "Register Trademark",
  "Use of Images – Read the License Carefully",
  "Hiring a Ghostwriter",
  "FTC Endorsement Guides",
]);

const topics = [
  ["Trademarks", "legal-blog/?topic=trademarks"],
  ["Copyrights", "legal-blog/copyrights/"],
  ["Contracts", "legal-blog/?topic=contract-review"],
  ["Business, privacy & tech", "legal-blog/?topic=legal-insights"],
];

// Three IP reviews: one each for trademarks, copyright and website terms/privacy, when present.
// (The publishing review is quoted in the Publishing row instead.)
function ipReviews() {
  const law = testimonials.filter((t) => t.area === "law");
  const picked = [];
  for (const re of [/trademark/i, /copyright/i, /privacy|terms/i]) {
    const t = law.find((x) => re.test(x.role || "") && !picked.includes(x));
    if (t) picked.push(t);
  }
  return picked;
}

const legalInsights = site.communities.find((c) => c.name === "Legal Insights");

export default {
  path: "intellectual-property/",
  section: "attorney-at-law/",
  title: "Intellectual Property — Trademarks, Copyrights & Publishing",
  description:
    "Trademark clearance, registration and maintenance; copyright registration; publishing contracts; business agreements; website terms of use and privacy policies — plus a trademark FAQ and plain-English articles by Francine D. Ward.",
  theme: "law",
  priority: "0.8",
  render: (ctx) => {
    const reviews = ipReviews();
    return html`
${subHero(ctx, {
  eyebrow: "Intellectual Property",
  title: lines("Your ideas are|<em>assets.</em> Treat them that way."),
  lead: "Helping clients protect their valuable creative content through copyrights, their logos, designs and business brands through trademarks, and their books through carefully negotiated publishing agreements.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Intellectual Property" }],
  actions: html`<a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a 30-minute call <span class="arrow">→</span></a><a class="btn btn-ghost" href="#trademark-faq">Trademark FAQ</a>`,
})}

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:220px 1fr;gap:clamp(24px,5vw,72px)" class="ip-layout">
      <nav class="toc" aria-label="On this page">
        ${areas.map((a) => html`<a href="#${a.id}">${esc(a.title)}</a>`)}
        <a href="#trademark-faq">Trademark FAQ</a>
        <a href="#issues">Issues to know</a>
        <a href="#articles">Articles</a>
      </nav>
      <div class="feature-rows">
        ${areas.map(
          (a, i) => html`<div class="feature-row reveal" id="${a.id}">
            <span class="fr-num">${String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>${esc(a.title)}</h3>
              <p class="mt-1">${a.intro}</p>
              <ul>${a.items.map((it) => `<li>${it}</li>`)}</ul>
              ${a.note ? a.note(ctx) : ""}
              ${readLinks(ctx, postLinks(a.reads || []), "Francine's articles")}
              ${a.insight && article(a.insight) ? html`<p class="mt-1 mb-0"><a class="link-arrow" href="${ctx.root}insights/${a.insight}/">${esc(article(a.insight).title)} <span class="arrow">→</span></a></p>` : ""}
              ${a.extra ? a.extra(ctx) : ""}
            </div>
          </div>`
        )}
      </div>
    </div>
  </div>
</section>
<style>@media (max-width: 860px){ .ip-layout{ grid-template-columns:1fr !important } .ip-layout .toc{ position:static; display:flex; flex-wrap:wrap; gap:6px } .ip-layout .toc a{ border:1px solid var(--line); border-radius:999px; padding:6px 12px; font-size:.85rem } } .ip-layout .feature-row{ grid-template-columns:60px 1fr } @media (max-width: 560px){ .ip-layout .feature-row{ grid-template-columns:1fr; gap:4px } }</style>

<section class="section section-sand" id="trademark-faq">
  <div class="container container-narrow">
    <div class="section-head center reveal">
      <p class="eyebrow">Trademark FAQ</p>
      <h2>Make your <em>mark.</em></h2>
      <p class="lead">Straight answers to the questions Francine hears most about trademarks.</p>
    </div>
    <div class="accordion reveal">
      ${faq.map((f) => {
        const p = f.read ? post(f.read) : null;
        return html`<details class="acc-item"><summary>${f.q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body">
          ${f.a.map((t) => html`<p>${esc(t)}</p>`)}
          ${f.list ? html`<ul>${f.list.map((li) => html`<li>${esc(li)}</li>`)}</ul>` : ""}
          ${f.after ? html`<p>${esc(f.after)}</p>` : ""}
          ${p ? html`<p class="mb-0"><a class="link-arrow" href="${ctx.root}${p.path}">Read: ${esc(p.title.replace(/\.$/, ""))} <span class="arrow">→</span></a></p>` : ""}
        </div></details>`;
      })}
    </div>
    <div class="btn-row mt-2 reveal" style="justify-content:center">
      <a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a call <span class="arrow">→</span></a>
      <a class="btn btn-ghost" href="${ctx.root}resources/#trademark-checklist">Trademark checklist</a>
    </div>
  </div>
</section>

<section class="section" id="issues">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Issues to know</p>
      <h2>Where creativity meets <em>the law.</em></h2>
      <p class="lead">Francine writes about these issues in plain English. If one touches your work, bring your questions to your consultation.</p>
    </div>
    <div class="grid grid-2" data-stagger="0.08">
      ${issues.map((it) => {
        const links = postLinks(it.reads).map((p) => html`<li><a class="link-arrow" href="${ctx.root}${p.path}">${esc(p.title.replace(/\.$/, ""))} <span class="arrow">→</span></a></li>`);
        const a = it.insight ? article(it.insight) : null;
        if (a) links.push(html`<li><a class="link-arrow" href="${ctx.root}insights/${a.slug}/">${esc(a.title)} <span class="arrow">→</span></a></li>`);
        if (it.news) links.push(html`<li><a class="link-arrow" href="${ctx.root}news/?topic=ai-copyright">AI &amp; copyright news <span class="arrow">→</span></a></li>`);
        if (it.estate) links.push(html`<li><a class="link-arrow" href="${ctx.root}estate-planning/">Estate planning <span class="arrow">→</span></a></li>`);
        return html`<article class="card reveal" id="${it.id}">
          <span class="card-icon">${icon(it.icon)}</span>
          <p class="eyebrow">${it.eyebrow}</p>
          <h3>${it.title}</h3>
          <p>${esc(it.text)}</p>
          <div class="card-foot"><ul style="list-style:none;padding:0;margin:0;display:grid;gap:8px">${links}</ul></div>
        </article>`;
      })}
    </div>
  </div>
</section>

${reviews.length
  ? html`<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Client reviews</p>
      <h2>What IP clients <em>say.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.1">
      ${reviews.map(
        (t) => html`<figure class="reveal" style="margin:0">
          <ul class="tag-list" style="margin:0 0 16px"><li class="tag">${esc(t.role)}</li></ul>
          <blockquote style="margin:0 0 22px;font-family:var(--font-display);font-size:clamp(1.1rem,1.5vw,1.3rem);line-height:1.45">“${esc(t.quote)}”</blockquote>
          <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${esc(t.who.charAt(0))}</span><span><span class="t-name">${esc(t.who)}</span>${t.title ? html`<br><span class="t-role">${esc(t.title)}</span>` : ""}</span></figcaption>
        </figure>`
      )}
    </div>
    <p class="mt-3 mb-0 reveal"><a class="link-arrow" href="${ctx.root}client-reviews/">Read every review in full <span class="arrow">→</span></a></p>
    <p class="notice" style="border-color:var(--line-light);color:rgba(251,247,241,.6)">Testimonials do not constitute a guarantee, warranty or prediction regarding the outcome of your legal matter; every matter is different.</p>
  </div>
</section>`
  : ""}

<section class="section" id="articles">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">From the legal blog</p>
      <h2>Plain-English answers, <em>in Francine's words.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.07">
      ${featured.map((p) => postCard(p, ctx))}
    </div>
    <div class="btn-row mt-2 reveal">
      ${topics.map(([label, href]) => html`<a class="btn btn-ghost btn-sm" href="${ctx.root}${href}">${label}</a>`)}
      <a class="link-arrow" href="${ctx.root}legal-blog/">All legal articles <span class="arrow">→</span></a>
    </div>
    ${legalInsights
      ? html`<p class="mt-2 mb-0 muted reveal">Still gathering information? Join Francine's <a href="${legalInsights.href}" target="_blank" rel="noopener">Legal Insights community on Facebook</a> for ongoing guidance and support.</p>`
      : ""}
  </div>
</section>

${ctaBand(ctx, {
  title: "Let's protect your <em>brand and your work.</em>",
  primary: html`<a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a 30-minute call <span class="arrow">→</span></a>`,
  secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}contact/">Send a message</a>`,
})}
`;
  },
};
