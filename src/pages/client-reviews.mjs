import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { testimonials } from "../data/content.mjs";

// Reviews are shown in full (t.full), verbatim. Paragraphs in the data are separated
// by a blank line; the opening and closing quotation marks wrap the whole review.
function reviewText(t) {
  const paras = t.full.split(/\n\n+/);
  return paras.map((p, i) =>
    html`<p${i === paras.length - 1 ? ' class="mb-0"' : ""}>${i === 0 ? "“" : ""}${esc(p)}${i === paras.length - 1 ? "”" : ""}</p>`
  );
}

function byline(t) {
  return html`<figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${esc(t.who.charAt(0))}</span><span><span class="t-name">${esc(t.who)}</span>${t.title ? html`<br><span class="t-role">${esc(t.title)}</span>` : ""}</span></figcaption>`;
}

// On this page, reviews are grouped by kind of matter (trademarks → copyrights → business
// & contracts → publishing → estate). The order also keeps the three masonry columns
// roughly even, since CSS columns fill top to bottom. Anyone not listed goes last.
const pageOrder = ["Kendall S.", "Dan H.", "Susan R.", "Barbara M.", "Gwen Wilson, LCSW", "Keiko", "Lisa H.", "Shiriko S.", "Nancy B.", "John R.", "David Y."];
const rank = (t) => (pageOrder.includes(t.who) ? pageOrder.indexOf(t.who) : pageOrder.length);
const legal = testimonials.filter((t) => t.area !== "speaking").sort((a, b) => rank(a) - rank(b));
const speaking = testimonials.filter((t) => t.area === "speaking");

export default {
  path: "client-reviews/",
  section: "attorney-at-law/",
  title: "Client Reviews",
  description: "Client reviews of Francine D. Ward, in full: trademarks, copyrights, publishing and business contracts, living trusts, and her workshops and speaking.",
  theme: "law",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Client reviews",
  title: lines("In their <em>own words.</em>"),
  lead: "Authors, entrepreneurs, nonprofit leaders and families on what it's like to work with Francine — every review in full, as it was written.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Client Reviews" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Book a consultation <span class="arrow">→</span></a><a class="btn btn-ghost" href="${site.reviews.href}" target="_blank" rel="noopener">Read reviews on ${site.reviews.name} ${icon("arrowUpRight")}</a>`,
})}

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Law office</p>
      <h2>Trademarks, copyrights, contracts <em>&amp; trusts.</em></h2>
    </div>
    <div class="review-grid">
      ${legal.map(
        (t) => html`<figure class="card review reveal">
          <ul class="tag-list" style="margin:0 0 16px"><li class="tag">${esc(t.role)}</li></ul>
          <blockquote>${reviewText(t)}</blockquote>
          ${byline(t)}
        </figure>`
      )}
    </div>
    <p class="notice">Testimonials and endorsements on this page do not constitute a guarantee, warranty or prediction regarding the outcome of your legal matter; every matter is different. Reviews are reproduced as written — letters in [brackets] correct small typos.</p>
  </div>
</section>

<section class="section section-dark" id="speaking">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split split-top split-sticky">
      <div class="reveal">
        <p class="eyebrow">Speaking &amp; classes</p>
        <h2>From the <em>audience.</em></h2>
        <p class="lead">Several of the reviewers above first met Francine from the front of a room — at a workshop, a seminar or a class. Here's what an event organizer and a class participant had to say.</p>
        <div class="btn-row mt-2">
          <a class="btn btn-gold" href="${ctx.root}speaking/">Invite Francine to speak <span class="arrow">→</span></a>
        </div>
      </div>
      <div>
        ${speaking.map(
          (t, i) => html`<figure class="reveal" style="margin:0;--delay:${(0.1 * (i + 1)).toFixed(1)}s${i ? ";border-top:1px solid var(--line-light);padding-top:32px;margin-top:32px" : ""}">
            <ul class="tag-list" style="margin:0 0 16px"><li class="tag">${esc(t.role)}</li></ul>
            <blockquote style="margin:0 0 22px;font-family:var(--font-display);font-size:clamp(1.15rem,1.7vw,1.4rem);line-height:1.45">${reviewText(t)}</blockquote>
            ${byline(t)}
          </figure>`
        )}
      </div>
    </div>
  </div>
</section>

<section class="section section-sand section-tight">
  <div class="container center reveal">
    <p class="eyebrow" style="justify-content:center;display:flex">Worked with Francine?</p>
    <h2>Share your <em>experience.</em></h2>
    <p class="lead mx-auto">Your words help other creators, business owners and families find the help they need.</p>
    <div class="btn-row mt-1" style="justify-content:center">
      <a class="btn btn-accent" href="${site.reviews.href}" target="_blank" rel="noopener">Leave a review on ${site.reviews.name} ${icon("arrowUpRight")}</a>
      <a class="btn btn-ghost" href="mailto:${site.email}?subject=${encodeURIComponent("My review of working with Francine")}">Email your review</a>
    </div>
  </div>
</section>

${ctaBand(ctx)}
`,
};
