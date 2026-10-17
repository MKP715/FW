import { html, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";

const pillars = ["Finance", "Health", "Spirituality", "Fun", "Behavior", "Home", "Business", "Service", "Family & Friends"];

const reflections = [
  "Take a snapshot of you: where are you right now in each area of your life — honestly?",
  "What are your top three values? Does your calendar reflect them? Does your bank statement?",
  "Where are your actions out of alignment with what you say matters?",
  "What one fear, if you walked through it this year, would change the most?",
  "What agreement with yourself have you been breaking? What would it take to keep it for seven days?",
  "Who could you be of service to this month?",
  "What will you do purely for joy?",
];

const checklists = [
  {
    id: "estate-checklist",
    icon: "home",
    title: "Estate planning preparation checklist",
    lead: "Gather what you can before your consultation. Don't worry if it's incomplete — that's what the meeting is for.",
    items: [
      "Full legal names and birthdates for you, your spouse or partner, and your children",
      "Who you'd like as successor trustee, executor, guardian for minors, and agents for finances and healthcare",
      "A rough list of assets: real estate, bank and investment accounts, retirement accounts, insurance, business interests",
      "Intellectual property: copyrights, royalties, trademarks, domains and publishing contracts",
      "Digital assets: important online accounts, archives and any cryptocurrency (never share keys by email)",
      "Existing wills, trusts, powers of attorney and beneficiary designations",
      "Special situations: blended family, a beneficiary with special needs, firearms, property in another state",
      "Your wishes for healthcare, end-of-life care and the use of your name and likeness",
    ],
  },
  {
    id: "trademark-checklist",
    icon: "trademark",
    title: "Brand & trademark readiness checklist",
    lead: "Before you print the business cards, run through these questions.",
    items: [
      "Is the name distinctive? Fanciful, arbitrary or suggestive marks are stronger than descriptive ones",
      "Have you searched the USPTO database, state records, domains and social handles?",
      "Can you clearly describe the goods or services the mark will cover?",
      "Are you already using the mark in commerce — or do you need an intent-to-use application?",
      "Do you own your logo? Get a written assignment from the designer",
      "Do you have a calendar for Section 8 declarations (years 5–6) and renewals (years 9–10)?",
      "Is someone monitoring for confusingly similar marks?",
    ],
  },
  {
    id: "copyright-checklist",
    icon: "copyright",
    title: "Copyright & AI checklist for creators",
    lead: "Protect your work in an age of generative AI.",
    items: [
      "Register important works promptly — ideally before publication or within three months after",
      "Keep drafts, sketches and edit histories that show your creative choices",
      "On applications, disclose AI-generated material and describe your human contribution",
      "Read your AI tools' terms: ownership of outputs, training on your inputs, indemnities",
      "Put collaboration, ghostwriting and freelance arrangements in writing — with assignments",
      "Review every contract for AI-training and digital-replica clauses before you sign",
      "Keep confidential and unpublished work out of public AI tools",
    ],
  },
];

const links = [
  ["U.S. Patent and Trademark Office — Trademark Search", "https://www.uspto.gov/trademarks/search", "Search registered and pending federal trademarks."],
  ["U.S. Copyright Office — Registration", "https://www.copyright.gov/registration/", "Register books, art, music, photos and more."],
  ["U.S. Copyright Office — Copyright & AI", "https://www.copyright.gov/ai/", "Reports and guidance on AI-generated material."],
  ["FTC — Endorsements, Influencers & Reviews", "https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews", "Disclosure rules for sponsored content."],
  ["California Attorney General — CCPA", "https://oag.ca.gov/privacy/ccpa", "California consumer privacy rights and business obligations."],
  ["IRS — Estate & Gift Taxes", "https://www.irs.gov/businesses/small-businesses-self-employed/estate-and-gift-taxes", "Current exemption amounts and filing rules."],
  ["California Courts — Self-Help Guide", "https://selfhelp.courts.ca.gov/", "Probate, guardianship and more."],
  ["IP & AI Law Watch", "../news/", "Our curated news on creators' rights, updated regularly."],
];

export default {
  path: "resources/",
  section: "resources/",
  title: "Free Resources — Worksheets, Checklists & Links",
  description: "Free tools from Francine D. Ward: an interactive Life Pillars check-in, Vision & Values reflection prompts, and printable estate planning, trademark and copyright checklists.",
  theme: "author",
  scripts: ["assets/js/pillars.js"],
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Free resources",
  title: lines("Tools for the life — and|the <em>legacy</em> — you're building."),
  lead: "Interactive worksheets for Esteemable Acts and printable legal checklists for creators, entrepreneurs and families. Free, private and yours to keep.",
  crumbs: [{ label: "Resources" }],
  actions: html`<a class="btn btn-gold" href="#worksheets">Life Pillars check-in <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#checklists">Legal checklists</a>`,
})}

<section class="section" id="worksheets" data-printable>
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Interactive worksheet</p>
        <h2>Your Life Pillars <em>check-in.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">Rate each pillar from 1 to 10 — honestly. Then name three values and one esteemable act for each this week. Your answers are saved only in this browser.</p>
    </div>
    <div class="pillars-tool mt-3" data-pillars>
      <div class="card reveal">
        <div class="pillar-sliders">
          ${pillars.map(
            (p, i) => html`<div class="pillar-slider"><label for="pl-${i}">${p}</label><input id="pl-${i}" name="p${i}" type="range" min="1" max="10" step="1" value="5" data-label="${p}"><output for="pl-${i}">5</output></div>`
          )}
        </div>
      </div>
      <div class="card reveal" style="--delay:.1s;align-items:center">
        <svg class="radar" viewBox="-70 -4 460 336" role="img" aria-label="Radar chart of your Life Pillar ratings"></svg>
        <div class="pillar-summary">
          <div><span class="muted">Average</span><strong data-avg>5.0</strong></div>
          <div><span class="muted">Start with</span><strong data-low>Finance</strong></div>
        </div>
      </div>
    </div>
    <div class="card mt-2 reveal">
      <h3>Three values, three actions</h3>
      <p class="muted">Write your top three values and one way to act on each this week.</p>
      <div class="values-grid">
        ${[1, 2, 3].map(
          (k) => html`<div class="field"><label for="v${k}">Value ${k}</label><input id="v${k}" name="value${k}" data-pillars-text placeholder="${["e.g. Honesty", "e.g. Health", "e.g. Service"][k - 1]}"></div>
          <div class="field"><label for="a${k}">This week I will…</label><input id="a${k}" name="action${k}" data-pillars-text placeholder="${["e.g. Have the conversation I've been avoiding", "e.g. Walk 20 minutes after lunch", "e.g. Call a friend who's struggling"][k - 1]}"></div>`
        )}
      </div>
      <div class="btn-row mt-2">
        <button class="btn btn-accent" type="button" data-print>${icon("download")} Print or save as PDF</button>
        <button class="btn btn-ghost" type="button" data-reset>Reset</button>
      </div>
    </div>
  </div>
</section>

<section class="section section-dark" id="vision-values" data-printable>
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Vision &amp; Values</p>
        <h2>Seven questions for an <em>honest review.</em></h2>
        <p class="lead">Use these at the end of a year, the start of a season, or any Sunday night. Journal your answers — then choose one action.</p>
        <button class="btn btn-gold mt-1" type="button" data-print>${icon("download")} Print the prompts</button>
      </div>
      <ol class="actions-list" style="grid-template-columns:1fr" data-stagger="0.05">
        ${reflections.map((r) => html`<li class="reveal"><div><p style="font-size:1.08rem;color:rgba(251,247,241,.88)">${r}</p></div></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="section theme-law" id="checklists">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Printable checklists</p>
      <h2>Legal homework, <em>made simple.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.1">
      ${checklists.map(
        (c) => html`<div class="card reveal" id="${c.id}" data-printable>
          <span class="card-icon">${icon(c.icon)}</span>
          <h3>${c.title}</h3>
          <p>${c.lead}</p>
          <ul class="checkbox-list">
            ${c.items.map((it, i) => html`<li><label><input type="checkbox" name="${c.id}-${i}"> <span>${it}</span></label></li>`)}
          </ul>
          <div class="card-foot"><button class="btn btn-sm btn-ghost" type="button" data-print>${icon("download")} Print</button></div>
        </div>`
      )}
    </div>
  </div>
</section>

<section class="section section-sand" id="links">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Official resources</p>
      <h2>Go straight to <em>the source.</em></h2>
    </div>
    <div class="grid grid-4" data-stagger="0.05">
      ${links.map(
        ([t, href, d]) => html`<a class="card reveal" href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}><h3 style="font-size:1.15rem">${t}</h3><p>${d}</p><span class="card-foot link-arrow">${href.startsWith("http") ? "Visit" : "Open"} ${icon("arrowUpRight")}</span></a>`
      )}
    </div>
    <p class="notice">Checklists and links are general information, not legal advice. Outside websites are provided for convenience and aren't endorsements.</p>
  </div>
</section>

${ctaBand(ctx, { title: "Checklist done? Let's make it <em>official.</em>" })}
`,
};
