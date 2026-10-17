import { html, subHero, lines, ctaBand, portrait } from "../lib/layout.mjs";

const timeline = [
  ["The beginning", "Raised in poverty in the South Bronx", "By fourteen, Francine was addicted to heroin and alcohol. She dropped out of high school and ended up on the streets of New York, living what she would later call a life of addiction, crime and dysfunction."],
  ["Rock bottom", "Told she would never walk again", "Struck by a car in her twenties, she was told she would never walk again. It was one of many moments that could have been the end of the story."],
  ["The turning point", "A mentor named Louise", "Then she met Louise — a woman who got in her face and taught her that self-esteem isn't something you wait for. It's something you build, one right action at a time. Francine got clean and sober, and stayed that way."],
  ["1986", "Back to school", "The high-school dropout earned her bachelor's degree from Hunter College in New York."],
  ["1989", "Georgetown University Law Center", "She graduated from one of the country's top law schools with a Juris Doctor."],
  ["1991", "Admitted to practice", "On January 14, 1991, Francine began practicing law. She is admitted in New York, California and the District of Columbia, focusing on intellectual property and, later, estate planning."],
  ["1995", "Finding her voice on stage", "She began speaking professionally — to corporations, associations, recovery communities and bar groups — about self-esteem, fear and the law."],
  ["2003", "Esteemable Acts", "Her story and method became a book with a six-figure deal from a New York publisher: Esteemable Acts: 10 Actions for Building Real Self-Esteem (Broadway Books). 52 Weeks of Esteemable Acts (Hazelden) followed in 2005, and Staying Legal (ASTD Press) in 2007."],
  ["2021", "WealthCounsel Trailblazer Award", "Recognized by WealthCounsel for advancing her community through knowledge, excellence and education — a reminder, she wrote, that it's never too late to keep trying."],
  ["Today", "Living life on purpose", "Francine practices from Palm Desert, California, with virtual appointments for clients everywhere she's licensed. She teaches intellectual property and contract drafting at the California Desert Trial Academy College of Law, writes her Life Pillars series, and still believes the next right action changes everything."],
];

const media = ["KPIX CBS 5", "KRON 4", "ABC7 News", "ABA Journal", "T+D Magazine", "Chicago Tribune", "The Washington Post", "San Francisco Chronicle", "Black Enterprise", "Heart & Soul", "Woman's Own", "Hard Won Wisdom Podcast"];

export default {
  path: "meet-francine/",
  section: "meet-francine/",
  title: "Meet Francine",
  description: "Francine D. Ward's story: from addiction and the streets of New York to Georgetown Law, 35 years of law practice, three books, and a life built on esteemable acts.",
  theme: "author",
  priority: "0.9",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Meet Francine",
  title: lines("A walking, talking|<em>testimonial.</em>"),
  lead: "Attorney. Author. Speaker. Georgetown Law graduate, marathon runner, mentor — and living proof that it is never too late to become who you were meant to be.",
  crumbs: [{ label: "Meet Francine" }],
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="reveal reveal-left" style="max-width:440px;justify-self:center;width:100%">
        <div style="position:relative">${portrait(ctx)}</div>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">Hello, I'm Francine</p>
        <h2>I help people protect what they create — and <em>become</em> who they're meant to be.</h2>
        <p class="lead">For 35 years I've practiced law, helping authors, artists, entrepreneurs and families protect their creative work, their brands and their legacies through trademarks, copyrights, publishing agreements, wills and trusts.</p>
        <p>But my most important qualification isn't on my diploma. I know what it's like to start with nothing — no self-esteem, no future anyone could see. What changed my life wasn't a pep talk or a mirror full of affirmations. It was action: small, often uncomfortable steps in the direction of the person I wanted to be.</p>
        <p>That's what <em>Esteemable Acts</em> is about, and it's how I practice law, too — with honesty, preparation and genuine care for the people I serve.</p>
        <div class="badge-row mt-2">
          <span class="badge">J.D., Georgetown Law</span>
          <span class="badge">Admitted CA · NY · DC</span>
          <span class="badge">WealthCounsel Trailblazer</span>
          <span class="badge">Law school faculty</span>
          <span class="badge">Marathon runner</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="timeline">
  <div class="container">
    <div class="split split-top">
      <div class="section-head reveal" style="position:sticky;top:120px">
        <p class="eyebrow">The journey</p>
        <h2>From the streets to <em>the bar.</em></h2>
        <p class="lead">Francine shares her story openly — on stage, in her books and with clients — because someone out there needs to know that change is possible.</p>
      </div>
      <ol class="timeline">
        ${timeline.map(([y, t, d]) => html`<li><span class="tl-year">${y}</span><h3>${t}</h3><p>${d}</p></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container container-narrow center">
    <p class="eyebrow reveal" style="justify-content:center">In her words</p>
    <blockquote class="big-quote reveal"><span class="q-mark" aria-hidden="true">“</span>Real self-esteem does not come from how we think about ourselves or what we say about ourselves. It comes from how we <em>act</em> — how we behave.<cite>Francine D. Ward</cite></blockquote>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">What guides the work</p>
      <h2>Three promises to <em>every client.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.1">
      <div class="card reveal"><span class="card-num" aria-hidden="true">I</span><h3>Straight talk</h3><p>Plain English, honest options and clear next steps. You'll always know where you stand and why.</p></div>
      <div class="card reveal"><span class="card-num" aria-hidden="true">II</span><h3>Real preparation</h3><p>Every filing, contract and plan gets meticulous attention, because details are where protection lives.</p></div>
      <div class="card reveal"><span class="card-num" aria-hidden="true">III</span><h3>Genuine care</h3><p>Your work and your family matter. You'll be treated like a person, not a file number.</p></div>
    </div>
  </div>
</section>

<section class="section section-paper section-tight">
  <div class="container">
    <p class="eyebrow center reveal" style="display:flex;justify-content:center">As seen, read &amp; heard</p>
    <div class="reveal" style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px 34px;margin-top:10px">
      ${media.map((m) => html`<span style="font-family:var(--font-display);font-size:clamp(1.05rem,1.8vw,1.45rem);color:var(--ink-soft);opacity:.75">${m}</span>`)}
    </div>
  </div>
</section>

${ctaBand(ctx, {
  title: "Ready for your <em>next right action?</em>",
  lead: "Whether you need a trademark, a trust, a contract review or a speaker who'll leave your audience changed — let's talk.",
  secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}speaking/">Book Francine to speak</a>`,
})}
`,
};
