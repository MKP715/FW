import { site } from "../site.mjs";
import { html, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";

const topics = [
  { t: "Fear Ain't Nothin' But a 4-Letter Word", d: "Fear drives more of our choices than we admit. What separates people who feel left behind from people living well is their willingness to walk through it. A raw, funny, practical keynote on doing it scared.", tags: ["Motivation", "Keynote"], sig: true },
  { t: "Self-Esteem Comes from DOing Esteemable Acts", d: "The signature talk. Why affirmations don't build self-esteem — and the everyday actions that do. Audiences leave with one esteemable act to take before bed.", tags: ["Self-esteem", "Keynote", "Workshop"], sig: true },
  { t: "Self-Esteem Is Not What You Think It Is!", d: "Confidence, ego and self-esteem aren't the same thing. A myth-busting session on what real self-worth looks like at work and at home.", tags: ["Leadership", "Women in business"] },
  { t: "You Can't Change What You Can't See!", d: "Awareness comes before change. How to recognize the patterns holding you back — and take accountability for the next right action.", tags: ["Personal growth", "Recovery"] },
  { t: "Get Off Your But and Get Busy!", d: "Every excuse starts with “but.” A high-energy session on moving from intention to action.", tags: ["Motivation", "Teams"] },
  { t: "Lions, Tigers & Friends: Navigating Social Media Legal Landmines", d: "The legal issues to watch out for online — copyright, defamation, privacy and platform terms — and strategies for side-stepping them.", tags: ["Law", "CLE-friendly", "Business"] },
  { t: "What Every Entrepreneur MUST Know About the Law!", d: "The most common — and most expensive — legal mistakes small business owners make, and how to avoid them.", tags: ["Entrepreneurs", "Workshop"] },
  { t: "Protecting Your Intellectual Property in the Internet & AI Age", d: "Trademarks, copyrights and your likeness in a world of generative AI, deepfakes and viral content. Updated with the latest court decisions.", tags: ["Law", "Creators", "AI"] },
  { t: "How I Got a 6-Figure Deal from a New York Publisher", d: "For aspiring authors: the proposal, the pitch, the contract — and the clauses that protect your rights.", tags: ["Writers", "Publishing"] },
];

const shortBio = `Francine D. Ward is an intellectual property and estate planning attorney admitted in California, New York and the District of Columbia; the author of Esteemable Acts: 10 Actions for Building Real Self-Esteem (Broadway Books) and 52 Weeks of Esteemable Acts (Hazelden); and a professional speaker since 1995. A former high-school dropout who overcame addiction, she graduated from Georgetown University Law Center in 1989.`;

const longBio = `Francine D. Ward is living proof that it's never too late to become who you were meant to be. At fourteen she was addicted to heroin and alcohol; by eighteen she was a high-school dropout on the streets of New York. With the help of a mentor who taught her that self-esteem comes from action, she got clean and sober, earned her bachelor's degree from Hunter College, and graduated from Georgetown University Law Center in 1989.

Francine has practiced law since January 14, 1991. Admitted in California, New York and the District of Columbia, she helps authors, artists, entrepreneurs and families protect their creative work, brands and legacies through trademarks, copyrights, publishing and licensing agreements, wills and trusts. She teaches intellectual property and contract drafting at the California Desert Trial Academy College of Law and received the WealthCounsel Trailblazer Award.

She is the author of Esteemable Acts: 10 Actions for Building Real Self-Esteem (Broadway Books), 52 Weeks of Esteemable Acts: A Guide to Right Living (Hazelden) and Staying Legal: A Guide to Copyright and Trademark Use (ASTD Press). A professional speaker since 1995, she has been featured on KPIX, KRON and ABC7 and in the ABA Journal, the Chicago Tribune and The Washington Post.`;

const questions = [
  "You went from addiction at fourteen to Georgetown Law. What was the first esteemable act that changed your direction?",
  "Why don't affirmations build self-esteem — and what does?",
  "What's the difference between self-esteem and confidence?",
  "How can someone recognize what they need to change in their own life?",
  "What role has fear played in your recovery and your success?",
  "What does an “esteemable act” look like on an ordinary Tuesday?",
  "As an IP attorney, what should creators know about AI and their work right now?",
  "What's one action our listeners can take today?",
];

export default {
  path: "speaking/",
  section: "speaking/",
  title: "Speaking — Keynotes, Workshops & Media Kit",
  description: "Book Francine D. Ward for keynotes and workshops on self-esteem, fear and action, and on intellectual property, social media and AI law. Topics, formats and media kit.",
  theme: "speaker",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Speaking",
  title: lines("Stories that stick.|Lessons that <em>last.</em>"),
  lead: "Francine has spoken professionally since 1995 — to corporations, associations, women's groups, recovery communities and bar associations. Raw, funny and practical, she leaves audiences ready to take their next right action.",
  crumbs: [{ label: "Speaking" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Check availability <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#media-kit">Media kit</a>`,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Keynotes &amp; workshops</p>
        <h2>Two worlds. <em>One stage.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">Few speakers can move an audience to tears about recovery and then explain the copyright clause in their contract. Francine does both — so you can book her for inspiration, for education, or for the rare talk that delivers each.</p>
    </div>
    <div class="grid grid-3 mt-3" data-stagger="0.06">
      ${topics.map(
        (tp) => html`<div class="card topic reveal"${tp.sig ? ' style="border-color:color-mix(in srgb,var(--accent) 45%,var(--line))"' : ""}>
          ${tp.sig ? '<p class="eyebrow" style="margin-bottom:10px">Signature keynote</p>' : ""}
          <h3>${tp.t}</h3>
          <p>${tp.d}</p>
          <ul class="tag-list">${tp.tags.map((t) => `<li class="tag">${t}</li>`)}</ul>
        </div>`
      )}
    </div>
  </div>
</section>

<section class="section section-sand">
  <div class="container">
    <div class="grid grid-2">
      <div class="reveal">
        <p class="eyebrow">Formats</p>
        <h2>Built for your <em>event.</em></h2>
        <ul class="check-list mt-2">
          <li><strong>Keynote</strong> — 45 to 60 minutes to open or close your event</li>
          <li><strong>Half-day workshop</strong> — interactive, with exercises and takeaways</li>
          <li><strong>Full-day workshop</strong> — deep work for teams and retreats</li>
          <li><strong>Virtual sessions</strong> — webinars, panels and online summits</li>
          <li><strong>Podcasts &amp; media</strong> — interviews on recovery, self-esteem and IP law</li>
        </ul>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">Audiences</p>
        <h2>Who books <em>Francine.</em></h2>
        <div class="badge-row mt-2">
          ${["Corporations", "Women's leadership", "Recovery & wellness", "Bar associations & CLE", "Law schools", "Entrepreneurs", "Writers' conferences", "Creative professionals", "Faith communities", "Nonprofits"].map((b) => `<span class="badge">${b}</span>`)}
        </div>
        <p class="mt-2">Recent conversations include the <em>Hard Won Wisdom</em> podcast (“Esteemable Acts: From Rock Bottom to Pure Power”), the ABA's <em>Voices of Recovery</em> series, and the <em>Creator Economy Law</em> podcast.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-dark" id="media-kit">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Media kit</p>
      <h2>Everything you need to <em>introduce Francine.</em></h2>
      <p class="lead">Copy a bio, grab the logo, or use our suggested interview questions. For high-resolution headshots and a speaker one-sheet, <a href="mailto:${site.email}?subject=${encodeURIComponent("Media kit request")}" style="color:var(--gold-2)">email the office</a>.</p>
    </div>
    <div class="grid grid-2">
      <div class="card card-dark reveal">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h3 style="margin:0">Short bio</h3><button class="btn btn-sm btn-ghost-light" type="button" data-copy="#bio-short">${icon("copy")} Copy</button></div>
        <p id="bio-short" class="mt-1">${shortBio}</p>
      </div>
      <div class="card card-dark reveal" style="--delay:.1s">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h3 style="margin:0">Long bio</h3><button class="btn btn-sm btn-ghost-light" type="button" data-copy="#bio-long">${icon("copy")} Copy</button></div>
        <div id="bio-long" class="mt-1">${longBio.split("\n\n").map((p) => `<p>${p}</p>`)}</div>
      </div>
    </div>
    <div class="grid grid-2 mt-2">
      <div class="card card-dark reveal">
        <h3>Suggested interview questions</h3>
        <ol style="padding-left:1.2em;color:rgba(251,247,241,.78)">${questions.map((q) => `<li style="margin-bottom:8px">${q}</li>`)}</ol>
      </div>
      <div class="card card-dark reveal" style="--delay:.1s">
        <h3>Brand assets</h3>
        <p>The FW monogram — gold strokes and a rising coral star — for event programs and slides.</p>
        <div style="display:flex;gap:18px;align-items:center;margin:18px 0">
          <img src="${ctx.root}assets/img/logo-mark.svg" alt="Francine D. Ward monogram logo" width="88" height="88" style="border-radius:20px">
          <div class="btn-row"><a class="btn btn-sm btn-gold" href="${ctx.root}assets/img/logo-mark.svg" download>${icon("download")} Logo (SVG)</a><a class="btn btn-sm btn-ghost-light" href="${ctx.root}assets/img/apple-touch-icon.png" download>${icon("download")} Logo (PNG)</a></div>
        </div>
        <div class="kit" style="grid-template-columns:1fr 1fr">
          <div class="kit-item"><h4>Name</h4><p>Francine D. Ward</p></div>
          <div class="kit-item"><h4>Website</h4><p>francineward.com</p></div>
          <div class="kit-item"><h4>Booking</h4><p>${site.email}</p></div>
          <div class="kit-item"><h4>Phone</h4><p>${site.phone}</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand(ctx, {
  title: "Bring Francine to <em>your stage.</em>",
  lead: "Share your date, audience and theme, and you'll hear back about availability, format and fees.",
  primary: html`<a class="btn btn-gold" href="${ctx.root}contact/">Request Francine <span class="arrow">→</span></a>`,
})}
`,
};
