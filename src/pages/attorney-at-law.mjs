import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { testimonials } from "../data/content.mjs";

const audiences = [
  ["book", "Authors & writers", "Book deals, ghostwriting, copyright registration and the rights you keep."],
  ["music", "Artists & musicians", "Protect your catalog, your name and your voice — including from AI clones."],
  ["briefcase", "Entrepreneurs", "Brand clearance, trademarks, contracts and the legal basics every business needs."],
  ["mic", "Coaches, speakers & trainers", "Courses, workbooks, programs and frameworks deserve protection too."],
  ["hands", "Nonprofits", "Registering training materials and licensing your mission's content."],
  ["users", "Families & individuals", "Trust-based plans, wills and directives that protect the people you love."],
];

const faqs = [
  ["Do I need a lawyer to file a trademark?", "You can file on your own, but many applications stumble on clearance, the description of goods and services, or specimens — and a refusal can cost you months and fees. A short consultation before filing is usually the best investment you can make in a brand."],
  ["When should I register a copyright?", "Copyright exists when your work is created, but registration is generally required before you can sue for infringement in the U.S. — and registering early (before infringement, or within three months of publication) preserves statutory damages and attorney's fees."],
  ["Can you review a contract I've already been sent?", "Yes. Publishing, licensing, collaboration, influencer and freelance agreements are reviewed with an eye to the clauses that matter most: rights granted, payment, term, termination and reversion."],
  ["Do you handle estate planning outside California?", "Estate planning depends on state law. Francine is admitted in California, New York and the District of Columbia; ask during your consultation whether your situation is a fit."],
];

export default {
  path: "attorney-at-law/",
  section: "attorney-at-law/",
  title: "Law Office — Intellectual Property & Estate Planning Attorney",
  description: "The Law Office of Francine D. Ward: trademark, copyright, publishing, AI and right of publicity counsel, plus wills and trusts. Virtual appointments, complimentary initial consultation.",
  theme: "law",
  priority: "0.9",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "The Law Office of Francine D. Ward",
  title: lines("Safeguarding innovations.|Securing <em>legacies.</em>"),
  lead: "Intellectual property and estate planning counsel for authors, artists, entrepreneurs and families — backed by 35 years of experience and a J.D. from Georgetown University Law Center.",
  crumbs: [{ label: "Law Office" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Book a free consultation <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="tel:${site.phoneHref}">${icon("phone")} ${site.phone}</a>`,
})}

<section class="section">
  <div class="container">
    <div class="grid grid-2" data-stagger="0.12">
      <a class="door door-law reveal" href="${ctx.root}intellectual-property/" style="min-height:520px">
        <p class="eyebrow">Practice area</p>
        <h3>Intellectual Property</h3>
        <p>Trademarks, copyrights, publishing and licensing, AI and creative rights, right of publicity, trade secrets, advertising and privacy.</p>
        <ul class="tag-list" style="margin-bottom:24px">${["Trademarks", "Copyrights", "Publishing", "AI", "Right of publicity", "Contracts"].map((t) => `<li class="tag" style="background:rgba(251,247,241,.14);color:#fff">${t}</li>`)}</ul>
        <span class="door-cta"><i>↗</i> Protect your work</span>
      </a>
      <a class="door door-author reveal" href="${ctx.root}estate-planning/" style="min-height:520px;--door-bg:radial-gradient(90% 70% at 80% 10%,#f3d98c 0%,transparent 60%),radial-gradient(80% 60% at 0% 100%,#7a3b2a 0%,transparent 70%),linear-gradient(160deg,#b8862f,#2a1a2e)">
        <p class="eyebrow">Practice area</p>
        <h3>Estate Planning</h3>
        <p>Revocable living trusts, wills, powers of attorney, healthcare directives, trust administration and planning for your creative legacy.</p>
        <ul class="tag-list" style="margin-bottom:24px">${["Trusts", "Wills", "Powers of attorney", "Healthcare directives", "Probate avoidance"].map((t) => `<li class="tag" style="background:rgba(251,247,241,.14);color:#fff">${t}</li>`)}</ul>
        <span class="door-cta"><i>↗</i> Secure your legacy</span>
      </a>
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

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Client stories</p>
      <h2>Real people. <em>Protected.</em></h2>
    </div>
    <div class="grid grid-2" data-stagger="0.12">
      <figure class="card reveal" style="margin:0">
        <span class="card-icon">${icon("trademark")}</span>
        <p class="eyebrow">Trademark</p>
        <p style="margin:0 0 16px;font-family:var(--font-display);font-size:1.3rem;line-height:1.4">Naomie, a business consultant, wanted an instantly recognizable symbol to help her customers find her brand in the marketplace… With her leadership skills and my legal expertise, we pursued the trademark process to protect her unique services.</p>
        <figcaption class="muted">From Francine's practice</figcaption>
      </figure>
      <figure class="card reveal" style="margin:0">
        <span class="card-icon">${icon("home")}</span>
        <p class="eyebrow">Estate planning</p>
        <p style="margin:0 0 16px;font-family:var(--font-display);font-size:1.3rem;line-height:1.4">For Jelani and Ruth, through meticulous legal counsel, we navigated wills, trusts, and other vital documents to ensure their wishes are carried out effectively and responsibly.</p>
        <figcaption class="muted">From Francine's practice</figcaption>
      </figure>
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
        <li>Fees and scope are discussed and agreed before any work begins.</li>
        <li>Admitted to practice in California, New York and the District of Columbia.</li>
      </ul>
    </div>
    <div class="steps mt-3">
      <div class="step"><h3>Consult</h3><p>Tell me what you're building and what worries you. We'll map your options together.</p></div>
      <div class="step"><h3>Plan</h3><p>You'll get a clear recommendation, scope and timeline — no surprises.</p></div>
      <div class="step"><h3>Protect</h3><p>Searches, filings, agreements and estate documents prepared with meticulous care.</p></div>
      <div class="step"><h3>Maintain</h3><p>Renewals, monitoring, updates and a lawyer who knows your story when life changes.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Client reviews</p>
        <h2>Trusted for <em>decades.</em></h2>
        <p class="lead">Some clients have worked with Francine for more than ten years — on brands, books, businesses and families.</p>
        <a class="link-arrow" href="${ctx.root}client-reviews/">Read client reviews <span class="arrow">→</span></a>
      </div>
      <div class="grid" data-stagger="0.1">
        ${testimonials.slice(0, 3).map(
          (t) => html`<figure class="card reveal" style="margin:0"><blockquote style="margin:0 0 14px;font-size:1.05rem">“${esc(t.quote)}”</blockquote><figcaption><strong>${esc(t.who)}</strong> · <span class="muted">${esc(t.role)}</span></figcaption></figure>`
        )}
      </div>
    </div>
  </div>
</section>

<section class="section section-paper">
  <div class="container container-narrow">
    <div class="section-head center reveal"><p class="eyebrow">Questions</p><h2>Before you <em>call.</em></h2></div>
    <div class="accordion reveal">
      ${faqs.map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p></div></details>`)}
    </div>
    <p class="center mt-2 reveal"><a class="link-arrow" href="${ctx.root}resources/">Free checklists &amp; legal resources <span class="arrow">→</span></a></p>
  </div>
</section>

${ctaBand(ctx)}
`,
};
