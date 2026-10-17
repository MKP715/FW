import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand, portrait, videoEmbed } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts } from "../lib/posts.mjs";

// Sources (old francineward.com, crawled 2026-10): the Meet Francine page (her own words),
// the posts "Tell Your Story" (2022) and "Never Stop Trying | Wealth Counsel Trailblazer Award"
// (2021), the WealthCounsel award citation shown in that post, and the 2019/2020 press kits.
// Quoted text is verbatim; anything in quotation marks must stay that way.
const postByTitle = (t) => posts.find((p) => p.title === t);
const tellYourStory = postByTitle("Tell Your Story");
const trailblazerPost = postByTitle("Never Stop Trying | Wealth Counsel Trailblazer Award");

const timeline = (ctx) => [
  ["Age 14", "Addicted at fourteen", "At fourteen, Francine was a heroin addict and a practicing alcoholic."],
  ["Age 18", "Homeless in New York", "At eighteen, she was a high school dropout living homeless on the streets of New York."],
  ["Age 26", "Told she'd never walk again", "At twenty-six, she was hit by a car and told she would never walk again."],
  ["Recovery", "Getting clean and sober", "Francine got clean and sober, and stayed that way. “I recognized that I couldn't change without help—lots of help,” she writes. “I asked for help and took the suggestions given.”"],
  ["1989", "Georgetown University Law Center", "The high school dropout earned her J.D. from Georgetown University Law Center. She is admitted to practice in California, New York and the District of Columbia."],
  ["1995", "Finding her voice on stage", "Francine began speaking professionally, engaging audiences large and small with her story of triumph over seemingly insurmountable odds."],
  ["Early 40s", "Two marathons", "The woman who was told she'd never walk again ran two 26.2-mile marathons in her early forties."],
  ["2003 &amp; 2005", "Esteemable Acts®", html`Her approach became a book: <em>Esteemable Acts: 10 Actions for Building Real Self-Esteem</em> (Broadway Books, 2003), followed by <em>52 Weeks of Esteemable Acts: A Guide to Right Living</em> (Hazelden, 2005) and <em>Staying Legal</em> (ASTD Press) in 2007. <a class="link-arrow" href="${ctx.root}esteemable-acts/#books">See the books <span class="arrow">→</span></a>`],
  ["2021", "WealthCounsel Trailblazer Award", "Honored by WealthCounsel for the impact she made on its community of attorneys. Her takeaway: “it's never too late to keep on trying.”"],
  ["Today", "A life of service", html`Forty-three years clean and sober as of 2022, Francine practices intellectual property and estate planning law from Palm Desert, California, writes the <a href="${ctx.root}esteemable-acts/journal/">Esteemable Acts journal</a>, and works out almost daily. Her life, she says, “is about being of service to others.”`],
];

// Verbatim from the old Meet Francine page. (Original reads "way too may television shows";
// the obvious typo is corrected to "many".)
const ages = [
  ["18", "At 18, I thought I was invincible."],
  ["25", "Yet at 25, I didn't think I'd live to see 26."],
  ["30", "By the time I turned 30, I was in the middle of a significant life change."],
  ["40", "Then by 40, I was living my dream."],
  ["50", "At 50, I couldn't believe how awesome I felt. 50 rocked!"],
  ["60", "Then I hit 60 and I felt my life was over. I cried for days and weeks at the thought of being old. I was probably watching way too many television shows, where 60-year-old people were in rocking chairs."],
  ["61", "By 61, I started to appreciate the gift of a long life."],
  ["71", "Now at 71, I am living and loving every fabulous moment of it."],
];

// Age-by-age list: a two-column row (big italic age, then her sentence) that works at every width.
const ageRow = "display:grid;grid-template-columns:clamp(56px,9vw,104px) minmax(0,1fr);gap:clamp(14px,3vw,36px);align-items:baseline;padding:clamp(16px,2.2vw,24px) 0;border-bottom:1px solid var(--line)";
const ageNum = "font-family:var(--font-display);font-style:italic;font-size:clamp(2.1rem,4.6vw,3.4rem);line-height:1;color:var(--accent-ink)";
const ageText = "margin:0;font-family:var(--font-display);font-size:clamp(1.15rem,2vw,1.5rem);line-height:1.4;color:var(--ink)";

const service = (ctx) => [
  {
    ic: "scale",
    title: "American Bar Association",
    body: "Francine has served on the Council, the governing body of the ABA's Intellectual Property Law Section, and chaired the section's Attorney Wellness Committee.",
  },
  {
    ic: "graduation",
    title: "Teaching future lawyers",
    body: "She has taught intellectual property and contract drafting to law students at the California Desert Trial Academy of Law in Indio, California.",
  },
  {
    ic: "users",
    title: "Community",
    body: "Join Francine's Facebook communities for ongoing guidance and support:",
    extra: html`<ul class="tag-list">${site.communities.map((c) => html`<li><a class="tag" href="${c.href}" target="_blank" rel="noopener">${esc(c.name)}</a></li>`)}</ul>`,
  },
];

export default {
  path: "meet-francine/",
  section: "meet-francine/",
  title: "Meet Francine",
  description: "Meet Francine D. Ward: from addiction and the streets of New York to Georgetown Law, 35 years as an attorney, the Esteemable Acts books, and a practice built on truth, transparency and thoughtful guidance.",
  theme: "author",
  priority: "0.9",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Meet Francine",
  title: lines("It's never too late|to keep on <em>trying.</em>"),
  lead: "Attorney, author and speaker Francine D. Ward has spent 35 years helping people protect their families, their legacies and the businesses they've built. Her own story — from the streets of New York to Georgetown Law — is the proof behind everything she teaches.",
  crumbs: [{ label: "Meet Francine" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Book a free consultation <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#welcome">Watch her welcome</a>`,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="reveal reveal-left" style="max-width:440px;justify-self:center;width:100%">
        ${portrait(ctx, { file: "francine-library.jpg", alt: "Francine D. Ward, smiling in glasses and a black blazer, seated in a library with her hand at her chin" })}
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">Hello, I'm Francine</p>
        <h2>I built my practice to <em>prevent those moments.</em></h2>
        <p class="lead">Most people don't realize how exposed they are until something forces them to find out. An outdated will that no longer reflects their life. A brand name they assumed was “theirs” until someone else claimed it first. A family left guessing because no one ever talked about what should happen.</p>
        <p>These are the moments that create chaos, conflict, and unnecessary pain — and they're almost always preventable. With 35 years of experience as an attorney and a J.D. from Georgetown University Law Center, I've spent my career helping people protect what matters most: their families, their legacies, and the identities of the businesses they've worked hard to build.</p>
        <div class="badge-row mt-2">
          <span class="badge">J.D., Georgetown Law, 1989</span>
          <span class="badge">Admitted CA · NY · DC</span>
          <span class="badge">35 years in practice</span>
          <span class="badge">WealthCounsel Trailblazer 2021</span>
          <span class="badge">Speaker since 1995</span>
          <span class="badge">Two-time marathoner</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="welcome">
  <div class="container">
    <div class="split split-top">
      <div class="reveal" style="position:sticky;top:120px">
        <p class="eyebrow">A welcome from Francine</p>
        ${videoEmbed("GX_w6kOrtfI", "Francine D. Ward, Esq. — Welcome")}
        <p class="muted" style="font-size:.95rem">All appointments are virtual, and initial consultations are complimentary by appointment only.</p>
        <a class="btn btn-gold btn-sm" href="${site.booking}" target="_blank" rel="noopener">${icon("calendar")} Book a 30-minute call</a>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">How I work</p>
        <h2>Truth, transparency and <em>thoughtful guidance.</em></h2>
        <p class="lead">My approach is intentionally different. I listen deeply. I ask the questions most people avoid. I help you see the bigger picture — not just what documents you need, but why you need them, how they work, and how they protect you in real life.</p>
        <p>Clients come to me because they want more than paperwork. They want a lawyer who:</p>
        <ul class="check-list">
          <li>tells the truth with compassion,</li>
          <li>understands the complexity of family dynamics,</li>
          <li>respects the emotional weight of planning for the future,</li>
          <li>and can translate complicated issues into clear, grounded decisions.</li>
        </ul>
        <p class="mt-2">My work blends legal strategy with clarity coaching and honest conversation. Estate planning and trademark protection aren't just legal tasks; they're acts of responsibility, love, and foresight. My goal is simple: to help you make decisions today that stand the test of time.</p>
        <div class="btn-row mt-1">
          <a class="link-arrow" href="${ctx.root}estate-planning/">Estate planning <span class="arrow">→</span></a>
          <a class="link-arrow" href="${ctx.root}intellectual-property/">Trademarks &amp; copyrights <span class="arrow">→</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="story">
  <div class="container">
    <div class="split split-top">
      <div class="section-head reveal" style="position:sticky;top:120px">
        <p class="eyebrow">The journey</p>
        <h2>From the streets of New York to <em>Georgetown Law.</em></h2>
        <p class="lead">It took Francine years to tell her story openly and without shame. Now she shares it on stage, in her books and with clients, because hearing it “helps them know anything can be overcome.”</p>
        ${tellYourStory ? html`<a class="link-arrow" href="${ctx.root}${tellYourStory.path}">Read her story in her words <span class="arrow">→</span></a>` : ""}
      </div>
      <ol class="timeline">
        ${timeline(ctx).map(([y, t, d]) => html`<li><span class="tl-year">${y}</span><h3>${t}</h3><p>${d}</p></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container container-narrow center">
    <p class="eyebrow reveal" style="justify-content:center">In her words</p>
    <blockquote class="big-quote reveal" style="text-wrap:balance"><span class="q-mark" aria-hidden="true">“</span>Believe it or not, your behavior determines your feelings about YOU!<cite>Francine D. Ward, author of <em>Esteemable Acts</em></cite></blockquote>
  </div>
</section>

<section class="section section-paper" id="every-age">
  <div class="container container-narrow">
    <div class="section-head center reveal">
      <p class="eyebrow">Every age, a new chapter</p>
      <h2>Life is not a destination, <em>it's a journey.</em></h2>
      <p class="lead mx-auto">As the years have passed, Francine's look has changed, her thinking has changed, and her life condition has changed. What has not changed is her message of hope. In her own words:</p>
    </div>
    <ol style="list-style:none;margin:0;padding:0;border-top:1px solid var(--line)">
      ${ages.map(([age, text]) => html`<li class="reveal" style="${ageRow}"><span style="${ageNum}" aria-hidden="true">${age}</span><p style="${ageText}">${text}</p></li>`)}
    </ol>
    <p class="center mt-3 reveal" style="font-family:var(--font-display);font-size:clamp(1.1rem,1.8vw,1.35rem);line-height:1.5;color:var(--ink-soft);max-width:58ch;margin-inline:auto">“The true test of a successful person is their willingness to weather life's ‘inevitable’ storms. Everyone has their turn in the barrel. Aging is one of life's storms. Loss is one of life's storms. … If we are lucky, we GET to experience all with room to spare. I speak from experience.”</p>
  </div>
</section>

<section class="section section-sand" id="recognition">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Recognition &amp; service</p>
      <h2>Honored by peers. <em>Committed to giving back.</em></h2>
    </div>
    <div class="split split-top split-sticky">
      <figure class="card reveal" style="margin:0">
        <img src="${ctx.root}assets/img/award-trailblazer-2021.webp" alt="WealthCounsel Trailblazer Award 2021 badge" width="520" height="397" loading="lazy" style="width:min(240px,72%);margin:0 auto 24px">
        <h3>WealthCounsel Trailblazer Award, 2021</h3>
        <p>WealthCounsel gives this award to a member who has joined within the last three years and already made a big impact within its community. The citation reads:</p>
        <blockquote style="margin:0 0 8px;padding-left:20px;border-left:3px solid var(--accent);font-family:var(--font-display);font-size:1.12rem;line-height:1.5;color:var(--ink)">“An experienced IP attorney-turned-estate planning attorney, Francine has blended her IP expertise with her passion for teaching and helping others. Recognized by her peers as a thought leader, Francine does not hesitate to share her knowledge and experience in intellectual property and how it can impact estate planning.”</blockquote>
        ${trailblazerPost ? html`<a class="card-foot link-arrow" href="${ctx.root}${trailblazerPost.path}">Her reflection on the award <span class="arrow">→</span></a>` : ""}
      </figure>
      <div class="grid" style="gap:18px" data-stagger="0.1">
        ${service(ctx).map(
          (s) => html`<div class="card reveal"><span class="card-icon">${icon(s.ic)}</span><h3>${s.title}</h3><p style="margin:0">${s.body}</p>${s.extra || ""}</div>`
        )}
      </div>
    </div>
  </div>
</section>

${ctaBand(ctx, {
  title: "Ready for your <em>next right action?</em>",
  lead: "Whether you need a trademark, a trust, a contract review or a speaker who'll leave your audience changed — let's talk. Appointments are virtual, and the first consultation is complimentary.",
  secondary: html`<a class="btn btn-ghost-light" href="${ctx.root}speaking/">Book Francine to speak</a>`,
})}
`,
};
