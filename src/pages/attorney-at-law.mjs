import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand, portrait } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { testimonials } from "../data/content.mjs";
import { legalPosts } from "../lib/posts.mjs";
import { postCard } from "./blog.mjs";

// Sources: the previous site's Home, Meet Francine, Practice Areas and Estate Planning pages
// (Francine's own words), the 2019/2020 press kits, her blog posts, and the client reviews.

// Who the practice serves, each grounded in the press kits, posts or client reviews.
const audiences = [
  ["book", "Authors & writers", "Book contracts, ghostwriter agreements and copyright registration — and the rights you keep."],
  ["briefcase", "Entrepreneurs & business owners", "Trademarks, contracts and the right business entity, from startup onward."],
  ["mic", "Coaches, speakers & trainers", "A registered trademark for your signature process, and copyright for your courses and materials."],
  ["hands", "Nonprofits", "Copyright protection for the training guides and materials your mission depends on."],
  ["globe", "Websites & online businesses", "Terms of use and privacy policies, and clear ownership of the content on your site."],
  ["users", "Families & individuals", "Trust-based or will-based plans, powers of attorney and healthcare directives that protect the people you love."],
];

// How Francine works, in her words (Meet Francine and Estate Planning pages) and the 2020 press kit.
const approach = [
  ["Not a trust mill. Not a document factory.", "There's no one-size-fits-all plan — customization is key. Not everyone needs a complicated trust with sub-trusts; for others, a simple will may be all that's required."],
  ["Plain language, no jargon.", "You'll understand not just what documents you need, but why you need them, how they work, and how they protect you in real life."],
  ["You'll always speak directly with Francine.", "Not a paralegal or assistant. She takes the time to know you, your family and your goals."],
  ["A relationship, not a transaction.", "Life changes, and your legal planning should evolve with you — from trademark renewals to trust updates."],
];

// Client stories from the previous Practice Areas page, verbatim.
const stories = [
  ["trademark", "Trademark", "Naomie, a business consultant, wanted an instantly recognizable symbol to help her customers find her brand in the marketplace. With her leadership skills and my legal expertise, we pursued the trademark process to protect her unique services."],
  ["home", "Estate planning", "A hardworking couple, Jelani and Ruth, embarked on the journey of estate planning, aiming to secure their legacy and protect their assets for future generations. Through meticulous legal counsel, we navigated wills, trusts, and other vital documents to ensure their wishes are carried out effectively and responsibly."],
];

const costPost = legalPosts.find((p) => p.title === "How Much Does an Estate Plan Cost?");

const faqs = [
  [
    "Do I really need a lawyer?",
    (ctx) => html`<p>You never need a lawyer for anything, if you are willing, able, and have the requisite skill to handle a matter yourself. The operative words are “requisite skill.” If you perform a task incorrectly, you pay a lot more than had you invested in a lawyer.</p><p class="mb-0">The same goes for a trademark search: it isn't required, but if you bypass this vital step, you do so at your peril.</p>`,
  ],
  [
    "Is the first consultation really complimentary?",
    (ctx) => html`<p class="mb-0">Yes. All appointments are virtual, and initial consultations are complimentary, by appointment. You can <a href="${site.booking}" target="_blank" rel="noopener">book a 30-minute call online</a> or <a href="${ctx.root}contact/">send a message</a>.</p>`,
  ],
  [
    "Can you review a contract I've already been sent?",
    (ctx) => html`<p class="mb-0">Yes. Publishing, freelance, collaboration and business agreements can be reviewed before you sign — with an eye to the rights you're granting, how and when you get paid, and whether your rights ever come back to you.</p>`,
  ],
  [
    "When should I register a copyright?",
    (ctx) => html`<p class="mb-0">Copyright exists once your work is fixed in a tangible form, but registration is generally required before you can sue for infringement of a U.S. work — and registering before infringement, or within three months of publication, preserves statutory damages and attorney's fees.</p>`,
  ],
  [
    "What does an estate plan cost?",
    (ctx) => html`<p>It depends on the type of plan, the complexity of your estate, how many properties are involved, and whether the plan is for one person or a couple. As Francine explains: “With my clients, I usually include in my flat fee the primary residence. I prepare the deeds and the supplemental recording documents required by the county.”</p>${costPost ? html`<p class="mb-0"><a class="link-arrow" href="${ctx.root}${costPost.path}">Read: ${esc(costPost.title)} <span class="arrow">→</span></a></p>` : ""}`,
  ],
  [
    "Do you handle estate planning outside California?",
    (ctx) => html`<p class="mb-0">Estate planning depends on state law. Francine is admitted in California, New York and the District of Columbia; ask during your consultation whether your situation is a fit.</p>`,
  ],
];

// Reviews from the law practice (named, verbatim excerpts maintained in content.mjs).
const reviews = testimonials.filter((t) => t.area === "law" || t.area === "estate").slice(0, 6);

// Latest legal articles: newest estate-planning post, newest trademark post, newest other topic.
const latest = [
  legalPosts.find((p) => p.catSlug === "estate-planning"),
  legalPosts.find((p) => p.catSlug === "trademarks"),
  legalPosts.find((p) => p.catSlug !== "estate-planning" && p.catSlug !== "trademarks"),
].filter(Boolean);

const legalInsights = site.communities.find((c) => c.name === "Legal Insights");

export default {
  path: "attorney-at-law/",
  section: "attorney-at-law/",
  title: "Law Office — Intellectual Property & Estate Planning Attorney",
  description:
    "The Law Office of Francine D. Ward: trademarks, copyrights, publishing and business contracts, plus wills and trusts. 35 years of experience. Virtual appointments, complimentary initial consultation.",
  theme: "law",
  priority: "0.9",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "The Law Office of Francine D. Ward",
  title: lines("Safeguarding innovations.|Securing <em>legacies.</em>"),
  lead: "Intellectual property and estate planning counsel for authors, entrepreneurs, creators and families — backed by 35 years of experience and a J.D. from Georgetown University Law Center. Appointments are virtual. Initial consultation is complimentary.",
  crumbs: [{ label: "Law Office" }],
  actions: html`<a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a 30-minute call <span class="arrow">→</span></a><a class="btn btn-ghost" href="${ctx.root}contact/">Send a message</a><a class="btn btn-ghost" href="tel:${site.phoneHref}">${icon("phone")} ${site.phone}</a>`,
})}

<section class="section">
  <div class="container">
    <div class="grid grid-2" data-stagger="0.12">
      <a class="door door-law reveal" href="${ctx.root}intellectual-property/">
        <p class="eyebrow">Practice area</p>
        <h3>Intellectual Property</h3>
        <p>Trademarks, copyrights, publishing contracts, business agreements, and website terms of use and privacy policies.</p>
        <ul class="tag-list" style="margin-bottom:24px">${["Trademarks", "Copyrights", "Publishing", "Contracts", "Privacy"].map((t) => `<li class="tag" style="background:rgba(251,247,241,.14);color:#fff">${t}</li>`)}</ul>
        <span class="door-cta"><i>↗</i> Protect your work</span>
      </a>
      <a class="door door-author reveal" href="${ctx.root}estate-planning/" style="--door-bg:radial-gradient(90% 70% at 80% 10%,rgba(243,217,140,.55) 0%,transparent 60%),radial-gradient(80% 60% at 0% 100%,#7a3b2a 0%,transparent 70%),linear-gradient(160deg,#8a6220,#2a1a2e)">
        <p class="eyebrow">Practice area</p>
        <h3>Estate Planning</h3>
        <p>Revocable and irrevocable trusts, wills, powers of attorney, healthcare directives, and the deeds and assignments that fund your trust.</p>
        <ul class="tag-list" style="margin-bottom:24px">${["Trusts", "Wills", "Powers of attorney", "Healthcare directives", "Probate avoidance"].map((t) => `<li class="tag" style="background:rgba(251,247,241,.14);color:#fff">${t}</li>`)}</ul>
        <span class="door-cta"><i>↗</i> Secure your legacy</span>
      </a>
    </div>
  </div>
</section>

<section class="section section-paper" id="approach">
  <div class="container">
    <div class="split">
      <div class="reveal" style="max-width:440px;width:100%;justify-self:center">
        ${portrait(ctx, { file: "francine-library.jpg", alt: "Francine D. Ward in glasses and a black blazer, smiling, seated in a library with her hand at her chin" })}
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">My approach</p>
        <h2>Legal planning should feel <em>empowering.</em></h2>
        <blockquote style="margin:0 0 28px;font-family:var(--font-display);font-size:clamp(1.2rem,1.9vw,1.5rem);line-height:1.45">“I don't believe in overwhelming clients with legal jargon or pushing them through a process they don't understand. I believe in truth, transparency, and thoughtful guidance.”<cite class="muted" style="display:block;margin-top:12px;font-family:var(--font-body);font-style:normal;font-size:.9rem">— Francine D. Ward</cite></blockquote>
        <ul class="check-list">
          ${approach.map(([t, d]) => html`<li><strong>${t}</strong> ${d}</li>`)}
        </ul>
        <div class="mt-2" style="display:flex;flex-wrap:wrap;align-items:center;gap:18px">
          <img src="${ctx.root}assets/img/award-trailblazer-2021.webp" alt="WealthCounsel Trailblazer Award 2021 badge" width="130" height="99" style="width:130px;height:auto">
          <p class="mb-0 muted" style="flex:1 1 220px;font-size:.92rem">Recipient of the 2021 WealthCounsel Trailblazer Award. A 1989 graduate of Georgetown University Law Center, admitted in California, New York and the District of Columbia.</p>
        </div>
        <p class="mt-2 mb-0"><a class="link-arrow" href="${ctx.root}meet-francine/">Meet Francine <span class="arrow">→</span></a></p>
      </div>
    </div>
  </div>
</section>

<section class="section section-sand">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Who I help</p>
      <h2>Counsel for the people who <em>make things.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.07">
      ${audiences.map(([ic, t, d]) => html`<div class="card reveal"><span class="card-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`)}
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">How it works</p>
        <h2>Simple, virtual and <em>personal.</em></h2>
      </div>
      <ul class="check-list reveal" style="--delay:.1s">
        <li>All appointments are virtual — meet from home, office or studio.</li>
        <li>The initial consultation is complimentary, by appointment.</li>
        <li>You'll always speak directly with Francine, not a paralegal or assistant.</li>
        <li>Admitted to practice in California, New York and the District of Columbia.</li>
      </ul>
    </div>
    <div class="steps mt-3">
      <div class="step"><h3>Consult</h3><p>Tell me what you're building and what worries you. I listen deeply, and I ask the questions most people avoid.</p></div>
      <div class="step"><h3>Plan</h3><p>Your options, clearly explained — so you can make an informed decision about what works best for you.</p></div>
      <div class="step"><h3>Protect</h3><p>Searches, filings, agreements and estate documents, prepared with meticulous care.</p></div>
      <div class="step"><h3>Maintain</h3><p>Trademark renewals and monitoring, plan updates — and a lawyer who knows your story when life changes.</p></div>
    </div>
    <div class="btn-row mt-3 reveal">
      <a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a 30-minute call <span class="arrow">→</span></a>
    </div>
  </div>
</section>

<section class="section" id="reviews">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Client stories</p>
      <h2>How the work <em>protects.</em></h2>
      <p class="lead">One client has trusted Francine with every trademark filing for more than ten years. Others came to her for a living trust, a startup's trademark and contracts, or a nonprofit's copyright.</p>
    </div>
    <div class="grid grid-2" data-stagger="0.12">
      ${stories.map(
        ([ic, label, text]) => html`<figure class="card reveal" style="margin:0">
          <span class="card-icon">${icon(ic)}</span>
          <p class="eyebrow">${label}</p>
          <p style="margin:0 0 16px;font-family:var(--font-display);font-size:1.2rem;line-height:1.45">${esc(text)}</p>
          <figcaption class="muted">Illustrative example. Names and details are not those of actual clients.</figcaption>
        </figure>`
      )}
    </div>
    ${reviews.length
      ? html`<div class="review-grid mt-3">
      ${reviews.map(
        (t) => html`<figure class="card review reveal">
          <ul class="tag-list" style="margin:0 0 16px"><li class="tag">${esc(t.role)}</li></ul>
          <blockquote>“${esc(t.quote)}”</blockquote>
          <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${esc(t.who.charAt(0))}</span><span><span class="t-name">${esc(t.who)}</span>${t.title ? html`<br><span class="t-role">${esc(t.title)}</span>` : ""}</span></figcaption>
        </figure>`
      )}
    </div>`
      : ""}
    <p class="mt-1 mb-0 reveal"><a class="link-arrow" href="${ctx.root}client-reviews/">Read every review in full <span class="arrow">→</span></a></p>
    <p class="notice">Testimonials do not constitute a guarantee, warranty or prediction regarding the outcome of your legal matter; every matter is different.</p>
  </div>
</section>

<section class="section section-paper" id="faq">
  <div class="container container-narrow">
    <div class="section-head center reveal"><p class="eyebrow">Questions</p><h2>Before you <em>call.</em></h2></div>
    <div class="accordion reveal">
      ${faqs.map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body">${a(ctx)}</div></details>`)}
    </div>
    <div class="btn-row mt-2 reveal" style="justify-content:center">
      <a class="link-arrow" href="${ctx.root}intellectual-property/#trademark-faq">Trademark FAQ <span class="arrow">→</span></a>
      <a class="link-arrow" href="${ctx.root}estate-planning/#faq">Estate planning FAQ <span class="arrow">→</span></a>
      <a class="link-arrow" href="${ctx.root}resources/">Free checklists &amp; resources <span class="arrow">→</span></a>
    </div>
  </div>
</section>

${latest.length
  ? html`<section class="section" id="legal-blog">
  <div class="container">
    <div class="split" style="margin-bottom:clamp(28px,4vw,48px)">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">From the legal blog</p>
        <h2>Plain-English answers, <em>every step of the way.</em></h2>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="lead mb-0">Trusts, probate, trademarks, copyrights and contracts — ${legalPosts.length} articles on Francine's legal blog.</p>
        <p class="mt-1 mb-0"><a class="link-arrow" href="${ctx.root}legal-blog/">Read the legal blog <span class="arrow">→</span></a></p>
      </div>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${latest.map((p) => postCard(p, ctx))}
    </div>
    ${legalInsights
      ? html`<p class="mt-2 mb-0 muted reveal">Still gathering information? Join Francine's <a href="${legalInsights.href}" target="_blank" rel="noopener">Legal Insights community on Facebook</a> for ongoing guidance and support.</p>`
      : ""}
  </div>
</section>`
  : ""}

${ctaBand(ctx, {
  primary: html`<a class="btn btn-gold" href="${site.booking}" target="_blank" rel="noopener">Schedule a 30-minute call <span class="arrow">→</span></a>`,
  secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}contact/">Send a message</a>`,
})}
`,
};
