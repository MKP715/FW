import { statSync } from "node:fs";
import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand, videoEmbed } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts } from "../lib/posts.mjs";

// Republished posts, looked up by their original URL so links never break on a title edit.
const post = (path) => posts.find((p) => p.path === path) || null;
function readLink(ctx, p, cls = "link-arrow") {
  if (!p) return "";
  // Text and arrow share one span, and the last word stays with the arrow, so a long title wraps cleanly.
  const words = p.title.split(" ");
  const last = words.pop();
  return html`<a class="${cls}" href="${ctx.root}${p.path}"><span>Read “${esc(words.join(" "))}${words.length ? " " : ""}<span style="white-space:nowrap">${esc(last)}” <span class="arrow" style="display:inline-block">→</span></span></span></a>`;
}

// Francine's ten Life Pillars, in the order her "Life Pillars" essay (Feb 2026) lists them.
// slug = the saved-answer key in pillars.js; label = markup (soft hyphen lets a long word wrap on phones).
const pillars = [
  { name: "Finance", slug: "finance" },
  { name: "Health", slug: "health" },
  { name: "Spirituality", slug: "spirituality" },
  { name: "Fun", slug: "fun" },
  { name: "Behavior", slug: "behavior" },
  { name: "Home", slug: "home" },
  { name: "Business", slug: "business" },
  { name: "Miscellaneous", slug: "miscellaneous", label: "Miscel&shy;laneous", hint: "e.g., writing, learning a new skill" },
  { name: "Service", slug: "service" },
  { name: "Family & Friends", slug: "family-friends" },
];

// Pillars with their own essay so far.
const pillarPosts = [
  ["Finance", "esteemable-acts/life-pillars-finance/"],
  ["Health", "esteemable-acts/life-pillar-health/"],
  ["Spirituality", "esteemable-acts/spirituality/"],
  ["Fun", "esteemable-acts/life-pillar-fun/"],
];

// Verbatim from "Life Pillars" (2026): "Ask yourself: …"
const reviewQuestions = [
  "Which pillars felt supported last year?",
  "Which pillars were running on fumes?",
  "Where did I grow?",
  "Where did I avoid?",
  "Where did I overperform at the cost of everything else?",
];

// Francine's own PDFs (src/assets/downloads). Descriptions come from the worksheets and the posts that link them.
const downloadDir = new URL("../assets/downloads/", import.meta.url);
function fileSize(file) {
  try {
    const bytes = statSync(new URL(file, downloadDir)).size;
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null; // file missing: the card is left out rather than linking to nothing
  }
}

const downloads = {
  author: [
    {
      file: "Pillars-worksheet.pdf",
      pages: 13,
      icon: "spark",
      title: "Life Pillars worksheet",
      text: "<em>The Pillars of an Intentional Life.</em> Look back with honesty, mark how each pillar functioned last year — Running on Fumes, Adequate or Supported — and set adjustments with deadlines. Made to use with Francine’s video.",
      post: "esteemable-acts/life-pillars/",
    },
    {
      file: "Life-Pillar-Fun-Worksheet.pdf",
      pages: 4,
      icon: "smile",
      title: "Life Pillar – Fun worksheet",
      text: "“Fun is not frivolous. Fun is fuel.” Where was fun present last year, and where was it missing or postponed? Make one commitment for the year and list small ways to support it.",
      post: "esteemable-acts/life-pillar-fun/",
    },
    {
      file: "Combined-Spirituality-Worksheet.pdf",
      pages: 3,
      icon: "sun",
      title: "Life Pillar – Spirituality worksheet",
      text: "When did you feel spiritually connected last year? What practices helped you stay grounded? Questions for what Francine calls “an ongoing practice of becoming the person we were meant to be.”",
      post: "esteemable-acts/spirituality/",
    },
    {
      file: "Vision-and-Values-Part-3.pdf",
      pages: 11,
      icon: "coins",
      title: "Vision & Values, Part 3: Health + Finance",
      text: "<em>Your Health. Your Wealth.</em> Name your values for your body and your bank account, look honestly at your habits, and take small, practical steps forward.",
      post: "esteemable-acts/baby-steps-to-success/",
    },
    {
      file: "Vision-and-Values-Part-7-moving-forward.pdf",
      pages: 5,
      icon: "compass",
      title: "Vision & Values, Part 7: Path Forward",
      text: "<em>Let your vision lead. Let your values guide.</em> The closing worksheet of the series: write your life’s purpose and a personal vision statement, then see how you really spend your time.",
      post: "esteemable-acts/end-of-year-reflections/",
    },
    {
      file: "Class-9-Step-1.pdf",
      pages: 5,
      icon: "scroll",
      title: "Goal-setting worksheet",
      text: "<em>Take Action: A Guide to Finding Your Purpose.</em> Explore your heart’s desire, name the beliefs and obstacles in the way, and draft your life’s mission — the worksheet Francine starts her own new-year goals with.",
      post: "esteemable-acts/effective-goal-setting/",
    },
  ],
  law: [
    {
      file: "HOW-TO-CREATE-AN-ESTATE-PLANNING-INVENTORY-1.pdf",
      pages: 1,
      icon: "contract",
      title: "How to create an estate planning inventory",
      text: "A sample inventory laid out as a simple spreadsheet: property, estimated value, debts, owner or beneficiary, and account numbers. Use the format or build your own. “The key is to create the inventory and do it now.”",
      post: "legal-blog/estate-planning/an-estate-planning-inventory/",
    },
    {
      file: "Trust-Asset-Inventory.pdf",
      pages: 6,
      icon: "key",
      title: "Trust asset inventory worksheet",
      text: "Section by section: real estate, accounts, retirement plans, insurance, personal property, intellectual property, business interests, digital assets and where key documents are kept — with a log for your annual review.",
      post: "legal-blog/estate-planning/what-are-trust-assets/",
    },
    {
      file: "Deed-Title-table.pdf",
      pages: 1,
      icon: "home",
      title: "Deed vs. title, side by side",
      text: "A one-page table: a deed is the written document that transfers real property; title is the legal concept — the bundle of rights that comes with ownership.",
      post: "legal-blog/estate-planning/what-is-a-deed/",
    },
  ],
};

const checklists = [
  {
    id: "estate-checklist",
    icon: "home",
    title: "Estate planning preparation checklist",
    lead: "Gather what you can before your consultation. Don’t worry if it’s incomplete — that’s what the meeting is for.",
    items: [
      "Full legal names and birthdates for you, your spouse or partner, and your children",
      "Who you’d like as successor trustee, executor, guardian for minor children, and agents for your finances and healthcare",
      "A list of your assets: real estate, bank and investment accounts, retirement accounts, life insurance, vehicles, business interests (the inventory worksheets above help)",
      "Intellectual property: copyrights, trademarks, royalties, publishing contracts and publicity rights",
      "Digital assets: online accounts, domain names and any cryptocurrency — note where access information is kept, never the passwords themselves",
      "Copies of any existing will, trust, power of attorney, healthcare directive and beneficiary designations",
      "Special situations: a blended family, a beneficiary with special needs, pets, firearms, property in another state",
      "Your wishes for medical treatment and end-of-life care — and the questions you want to ask",
    ],
    post: "legal-blog/estate-planning/how-to-prepare-for-the-meeting-with-your-lawyer/",
  },
  {
    id: "estate-review-checklist",
    icon: "scroll",
    title: "Already have a plan? Check it.",
    lead: "Review your estate plan generally every 2–4 years — and sooner after a major life event.",
    items: [
      "A revocable living trust, fully funded: assets titled in the name of the trust",
      "A pour-over will to catch any assets not yet transferred into the trust (or, with no trust, a will)",
      "A durable power of attorney naming someone to manage your finances",
      "An advance healthcare directive naming your healthcare agent",
      "A HIPAA authorization so the people you choose can talk with your doctors",
      "Beneficiary designations on retirement accounts and life insurance that match your plan",
      "An up-to-date inventory of your assets, stored where your loved ones can find it",
      "Updated since any marriage, divorce, birth or adoption, death of a beneficiary, change of trustee or executor, change in finances or change in the tax laws",
    ],
    post: "legal-blog/estate-planning/preparing-for-estate-planning/",
  },
  {
    id: "trademark-checklist",
    icon: "trademark",
    title: "Brand & trademark readiness checklist",
    lead: "Before you print the business cards, run through these questions.",
    items: [
      "Is the name distinctive? Coined (made-up) and arbitrary marks are strongest; descriptive marks are weak, even when registered",
      "Have you searched the USPTO’s trademark search system, state records, domain names and social handles?",
      "Can you clearly describe the goods or services the mark will cover?",
      "Are you already using the mark in commerce — or do you need an intent-to-use application?",
      "Do you own your logo? Get a written assignment from the designer",
      "Do you have a calendar for the Section 8 declaration (years 5–6) and renewals (years 9–10)?",
      "Is someone monitoring for confusingly similar marks?",
    ],
    post: "legal-blog/trademarks/trademark-check/",
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
      "Read your AI tools’ terms: ownership of outputs, training on your inputs, indemnities",
      "Put collaboration, ghostwriting and freelance arrangements in writing — with assignments",
      "Review every contract for AI-training and digital-replica clauses before you sign",
      "Keep confidential and unpublished work out of public AI tools",
    ],
    more: ["legal-blog/copyrights/", "Copyright articles"],
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
  ["IP & AI Law Watch", "news/", "Our curated news on creators’ rights, updated regularly."],
];

const lifePillarsPost = post("esteemable-acts/life-pillars/");
const wednesdays = site.communities.find((c) => /wednesdays/i.test(c.name));
const legalInsights = site.communities.find((c) => c.name === "Legal Insights");

function downloadCard(d, ctx) {
  const size = fileSize(d.file);
  if (!size) return "";
  const p = post(d.post);
  return html`<article class="card reveal">
    <span class="card-icon">${icon(d.icon)}</span>
    <p class="news-meta">PDF · ${d.pages} ${d.pages === 1 ? "page" : "pages"} · ${size}</p>
    <h3>${esc(d.title)}</h3>
    <p>${d.text}</p>
    <div class="card-foot btn-row" style="gap:10px 18px">
      <a class="btn btn-sm btn-accent" href="${ctx.root}assets/downloads/${d.file}" download>${icon("download")} Download PDF<span class="sr-only">: ${esc(d.title)}</span></a>
      ${p ? html`<a class="link-arrow" href="${ctx.root}${p.path}">Read the post <span class="arrow">→</span><span class="sr-only">: ${esc(p.title)}</span></a>` : ""}
    </div>
  </article>`;
}

export default {
  path: "resources/",
  section: "resources/",
  title: "Free Resources — Worksheets, Checklists & Links",
  description: "Free tools from Francine D. Ward: an interactive Life Pillars check-in, downloadable Esteemable Acts and estate planning worksheets, and printable estate planning, trademark and copyright checklists.",
  theme: "author",
  scripts: ["assets/js/pillars.js"],
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Free resources",
  title: lines("Tools for the life — and|the <em>legacy</em> — you're building."),
  lead: "Francine’s own Esteemable Acts® worksheets, an interactive Life Pillars check-in, and printable checklists for estate planning, trademarks and copyright. Free, private and yours to keep.",
  crumbs: [{ label: "Resources" }],
  actions: html`<a class="btn btn-gold" href="#worksheets">Life Pillars check-in <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#downloads">Free downloads</a>`,
})}

<section class="section" id="worksheets" data-printable>
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Interactive worksheet</p>
        <h2>Your Life Pillars <em>check-in.</em></h2>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="lead">Francine’s Life Pillars are the ten categories she uses to set her goals each year — “the areas in my life that enable me to stay balanced.” Rate how each one functioned this past year, honestly. Your answers are saved only in this browser.</p>
        <p class="muted" style="margin:0">Prefer paper? <a href="#downloads">Download the worksheets</a>.</p>
      </div>
    </div>
    <div class="pillars-tool mt-3" data-pillars>
      <div class="card reveal">
        <p class="muted" style="font-size:.88rem;margin:0 0 18px">Borrow the language of Francine’s worksheet: 1–3 running on fumes, 4–7 adequate, 8–10 supported.</p>
        <div class="pillar-sliders">
          ${pillars.map(
            (p, i) => html`<div class="pillar-slider"><label for="pl-${i}">${p.label || esc(p.name)}${p.hint ? html`<span class="muted" style="display:block;font-size:.74rem;font-weight:500;line-height:1.3;margin-top:2px">${esc(p.hint)}</span>` : ""}</label><input id="pl-${i}" name="${p.slug}" type="range" min="1" max="10" step="1" value="5" data-label="${esc(p.name)}"><output for="pl-${i}">5</output></div>`
          )}
        </div>
      </div>
      <div class="card reveal" style="--delay:.1s;align-items:center;justify-content:center;padding-inline:clamp(12px,3vw,34px)">
        <svg class="radar" viewBox="-200 -150 400 300" role="img" aria-label="Radar chart of your Life Pillar ratings"></svg>
        <div class="pillar-summary">
          <div><span class="muted">Average</span><strong data-avg>5.0</strong></div>
          <div><span class="muted">Start with</span><strong data-low>${esc(pillars[0].name)}</strong></div>
        </div>
      </div>
    </div>
    <div class="card mt-2 reveal">
      <h3>Three values, three actions</h3>
      <p class="muted">In Francine’s words: “write down your top three values and brainstorm one way you can act on each this week.”</p>
      <div class="values-grid">
        ${[
          ["e.g. Integrity", "e.g. Have one honest conversation"],
          ["e.g. Consistency", "e.g. Take three 20-minute walks"],
          ["e.g. Self-compassion", "e.g. Go to bed one hour earlier"],
        ].map(
          ([v, a], i) => html`<div class="field"><label for="v${i + 1}">Value ${i + 1}</label><input id="v${i + 1}" name="value${i + 1}" data-pillars-text placeholder="${v}"></div>
          <div class="field"><label for="a${i + 1}">This week I will…</label><input id="a${i + 1}" name="action${i + 1}" data-pillars-text placeholder="${a}"></div>`
        )}
      </div>
      <div class="btn-row mt-2">
        <button class="btn btn-accent" type="button" data-print>${icon("download")} Print or save as PDF</button>
        <button class="btn btn-ghost" type="button" data-reset>Reset</button>
      </div>
    </div>
  </div>
</section>

<!-- Kept outside #worksheets so printing the check-in doesn't print the video. -->
<section class="section" id="life-pillars-video" style="padding-top:0">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Go deeper</p>
        <h3 style="font-size:clamp(1.5rem,2.6vw,2.1rem)">Work through the full worksheet <em>with Francine.</em></h3>
        <p>The check-in is a quick snapshot. The Life Pillars worksheet goes further: look back on the year with honesty, mark how each pillar functioned, and name your adjustments for the year ahead — each with a deadline. Watch the video and pause it as needed to fill in the worksheet.</p>
        <div class="btn-row mt-1">
          <a class="btn btn-accent" href="${ctx.root}assets/downloads/Pillars-worksheet.pdf" download>${icon("download")} Life Pillars worksheet (PDF)</a>
          ${readLink(ctx, lifePillarsPost)}
        </div>
        <p class="muted mt-2" style="margin-bottom:0">The Life Pillars series so far:</p>
        <ul class="tag-list" style="margin-top:8px">
          ${pillarPosts.map(([name, path]) => (post(path) ? html`<li><a class="tag" href="${ctx.root}${path}">${name}</a></li>` : ""))}
        </ul>
        ${wednesdays ? html`<p class="muted mt-1" style="font-size:.92rem">Feel called to share what you uncover? Join the conversation in Francine’s <a href="${wednesdays.href}" target="_blank" rel="noopener">${esc(wednesdays.name)} group</a> on Facebook.</p>` : ""}
      </div>
      <div class="reveal" style="--delay:.1s">
        ${videoEmbed("ZoGE5EkPAIo", "Life Pillars: work through the worksheet with Francine")}
      </div>
    </div>
  </div>
</section>

<section class="section section-dark" id="honest-review" data-printable>
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Before you set new goals</p>
        <h2>Five questions for an <em>honest review.</em></h2>
        <p class="lead">Before starting over, look back: at your wins, your setbacks and the habits behind both. Journal your answers — then choose one or two adjustments for each pillar.</p>
        <blockquote class="big-quote" style="font-size:clamp(1.3rem,2.2vw,1.75rem);margin-top:28px">“This reflection is not about blame. It is about being honest in assessing where you are.”<cite>Francine D. Ward, “Life Pillars”</cite></blockquote>
        <div class="btn-row mt-2">
          <button class="btn btn-gold" type="button" data-print>${icon("download")} Print the questions</button>
          ${lifePillarsPost ? html`<a class="btn btn-ghost-light" href="${ctx.root}${lifePillarsPost.path}">Read the essay</a>` : ""}
        </div>
      </div>
      <ol class="actions-list" style="grid-template-columns:1fr" data-stagger="0.05">
        ${reviewQuestions.map((q) => html`<li class="reveal"><div><p style="font-size:1.15rem;color:rgba(251,247,241,.9)">${q}</p></div></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="section" id="downloads">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Free downloads</p>
      <h2>Francine’s worksheets, <em>ready to print.</em></h2>
      <p class="lead">The same PDFs that accompany her Esteemable Acts reflections and estate planning articles. Download them, print them, and work through them at your own pace.</p>
    </div>
    <h3 class="reveal" style="font-size:1.35rem;margin-bottom:22px">Esteemable Acts worksheets</h3>
    <div class="grid grid-3" data-stagger="0.06">
      ${downloads.author.map((d) => downloadCard(d, ctx))}
    </div>
    <div class="theme-law" style="margin-top:clamp(48px,6vw,80px)">
      <h3 class="reveal" style="font-size:1.35rem;margin-bottom:22px">Estate planning worksheets</h3>
      <div class="grid grid-3" data-stagger="0.06">
        ${downloads.law.map((d) => downloadCard(d, ctx))}
      </div>
    </div>
  </div>
</section>

<section class="section section-sand theme-law" id="checklists">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Printable checklists</p>
      <h2>Legal homework, <em>made simple.</em></h2>
      <p class="lead">Check things off on screen or print a list to bring to your consultation.</p>
    </div>
    <div class="grid grid-2" data-stagger="0.1">
      ${checklists.map(
        (c) => html`<div class="card reveal" id="${c.id}" data-printable>
          <span class="card-icon">${icon(c.icon)}</span>
          <h3>${esc(c.title)}</h3>
          <p>${c.lead}</p>
          <ul class="checkbox-list">
            ${c.items.map((it, i) => html`<li><label><input type="checkbox" name="${c.id}-${i}"> <span>${it}</span></label></li>`)}
          </ul>
          <div class="card-foot btn-row" style="gap:10px 18px">
            <button class="btn btn-sm btn-ghost" type="button" data-print>${icon("download")} Print</button>
            ${c.post ? readLink(ctx, post(c.post)) : html`<a class="link-arrow" href="${ctx.root}${c.more[0]}">${c.more[1]} <span class="arrow">→</span></a>`}
          </div>
        </div>`
      )}
    </div>
    <p class="center mt-2 reveal"><a class="link-arrow" href="${ctx.root}legal-blog/estate-planning/">All estate planning articles <span class="arrow">→</span></a></p>
  </div>
</section>

<section class="section" id="links">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Official resources</p>
      <h2>Go straight to <em>the source.</em></h2>
    </div>
    <div class="grid grid-4" data-stagger="0.05">
      ${links.map(([t, href, d]) => {
        const ext = href.startsWith("http");
        return html`<a class="card reveal" href="${ext ? href : ctx.root + href}"${ext ? ' target="_blank" rel="noopener"' : ""}><h3 style="font-size:1.15rem">${esc(t)}</h3><p>${d}</p><span class="card-foot link-arrow">${ext ? "Visit" : "Open"} ${icon("arrowUpRight")}</span></a>`;
      })}
    </div>
    <p class="notice">Worksheets, checklists and links are general information, not legal advice. Outside websites are provided for convenience and aren’t endorsements.</p>
  </div>
</section>

${ctaBand(ctx, {
  title: "Checklist done? Let’s make it <em>official.</em>",
  secondary: legalInsights ? html`<a class="btn btn-ghost-light" href="${legalInsights.href}" target="_blank" rel="noopener">Join the Legal Insights group</a>` : "",
})}
`,
};
