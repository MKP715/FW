import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { testimonials, books } from "../data/content.mjs";

export default {
  path: "client-reviews/",
  section: "attorney-at-law/",
  title: "Client Reviews",
  description: "What clients say about working with Francine D. Ward on trademarks, copyrights, publishing contracts and estate planning.",
  theme: "law",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Client reviews",
  title: lines("In their <em>own words.</em>"),
  lead: "Authors, business owners, nonprofits and families on what it's like to work with Francine.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Client Reviews" }],
})}

<section class="section">
  <div class="container">
    <div class="review-grid">
      ${testimonials.map(
        (t) => html`<figure class="card review reveal">
          <blockquote>“${esc(t.quote)}”</blockquote>
          <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${esc(t.who.charAt(0))}</span><span><span class="t-name">${esc(t.who)}</span><br><span class="t-role">${esc(t.role)}</span></span></figcaption>
        </figure>`
      )}
      <figure class="card review reveal theme-author" style="background:var(--ink);color:var(--ivory);border-color:var(--ink)">
        <p class="eyebrow">On Esteemable Acts</p>
        <blockquote style="color:var(--ivory);font-family:var(--font-display);font-size:1.4rem">“${esc(books[0].blurb.text)}”</blockquote>
        <figcaption style="color:rgba(251,247,241,.7)">— ${esc(books[0].blurb.by)}</figcaption>
      </figure>
    </div>
    <p class="notice">Reviews are excerpts shared by clients and are not a guarantee or prediction of the outcome of any future matter. Names are withheld to protect client privacy.</p>
  </div>
</section>

<section class="section section-sand section-tight">
  <div class="container center reveal">
    <p class="eyebrow" style="justify-content:center;display:flex">Worked with Francine?</p>
    <h2>Share your <em>experience.</em></h2>
    <p class="lead mx-auto">Your words help other creators and families find the help they need.</p>
    <a class="btn btn-accent mt-1" href="mailto:${site.email}?subject=${encodeURIComponent("My review of working with Francine")}">Send a review <span class="arrow">→</span></a>
  </div>
</section>

${ctaBand(ctx)}
`,
};
