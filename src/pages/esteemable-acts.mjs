import { site } from "../site.mjs";
import { html, esc, subHero, lines, portrait, videoEmbed } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { books } from "../data/content.mjs";
import { posts, journalPosts } from "../lib/posts.mjs";
import { postCard } from "./blog.mjs";

const star = `<svg class="bc-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5c.8 5.3 3.2 7.7 8.5 8.5-5.3.8-7.7 3.2-8.5 8.5-.8-5.3-3.2-7.7-8.5-8.5 5.3-.8 7.7-3.2 8.5-8.5z"/></svg>`;

// Real cover scans in src/assets/img/: size (so the 3D book takes the cover's exact shape)
// and a spine color to match. content.mjs sets each book's `cover` path and `coverAlt`.
const covers = {
  "esteemable-acts": { file: "assets/img/book-esteemable-acts.jpg", w: 560, h: 848, spine: "#e9dfcb", alt: "Cover of Esteemable Acts: 10 Actions for Building Real Self-Esteem by Francine Ward, showing Francine smiling in a pale yellow jacket" },
  "52-weeks": { file: "assets/img/book-52-weeks.jpg", w: 560, h: 826, spine: "#3b2a3f", alt: "Cover of 52 Weeks of Esteemable Acts: A Guide to Right Living by Francine Ward, with an oak tree on a cream panel" },
};

// bookCover(b, ctx): the real cover inside the 3D book when the book has a cover scan,
// otherwise the typographic CSS cover (Staying Legal). Pass ctx from any page below the
// site root; without it the image URL is resolved relative to the root (the home page).
export function bookCover(b, ctx) {
  const known = covers[b.id] || {};
  const cover = b.cover || known.file;
  const src = cover ? (ctx ? ctx.root : "") + (cover.includes("/") ? cover : `assets/img/${cover}`) : "";
  const shape = src && known.w ? `aspect-ratio:${known.w} / ${known.h};` : "";
  const spine = src && known.spine ? `--spine-bg:${known.spine};` : "";
  return html`<div class="book-3d ${b.cls}"${src ? "" : ' aria-hidden="true"'}${shape || spine ? ` style="${shape}${spine}"` : ""}>
  <span class="book-spine" aria-hidden="true"></span>
  ${src
    ? html`<span class="book-cover"><img src="${src}" alt="${esc(b.coverAlt || known.alt || `Cover of ${b.name}`)}"${known.w ? ` width="${known.w}" height="${known.h}"` : ""} loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit"></span>`
    : html`<span class="book-cover">${star}
    <span class="bc-kicker">${b.kicker}</span>
    <span class="bc-title">${b.title}${b.sub ? `<em class="bc-sub">${b.sub}</em>` : ""}</span>
    <span class="bc-author">Francine D. Ward</span>
  </span>`}
</div>
<h3>${b.name.split(":")[0]}</h3>
<p class="muted" style="font-size:.85rem;font-weight:700;letter-spacing:.04em">${esc(b.meta)}</p>`;
}

// Esteemable Acts: the previous site's "Books" copy (Meet Francine / Esteemable Acts pages).
// 52 Weeks: content.mjs description plus the passage Francine quotes from the book in her
// post "Life Pillar – Spirituality". Other books use their content.mjs description.
const bookCopy = {
  "esteemable-acts": {
    desc: [
      "A must-read for anyone ready for a better life, based on the principles that led to Francine's own recovery from drug addiction, alcoholism, and low self-esteem. While many think self-esteem is all about having the right job, the right boyfriend (or girlfriend), or living in the right neighborhood, Francine shows that self-esteem is all about how you behave.",
      "You'll learn how to break down big, scary actions into small, doable steps — so you can build your self-esteem and live the life of your dreams.",
    ],
  },
  "52-weeks": {
    excerpt: "When I'm judging other people, it feeds into an existing belief I have about myself: that I'm better than you or worse than you.",
  },
};

// Core principles, condensed from the previous site's "Core Principles of Esteemable Acts".
const principles = [
  ["It's not a quick fix.", "Self-esteem requires effort. The results you get depend directly on the work you're willing to put in."],
  ["Self-esteem is not the same as confidence.", "Confidence, success and outward assurance don't guarantee that you like who you are. Many accomplished people still mistreat others or need to put others down to feel worthy."],
  ["Self-esteem is not the destination.", "It's the byproduct of living a courageous, purposeful, service-driven life — the lessons and growth along the way shape who you are and how you treat others."],
  ["Esteemable acts build self-esteem.", "You can't think your way into right living — you must act your way into right thinking. When your behavior reflects your values, you naturally feel better about yourself."],
  ["Courage grows self-esteem.", "Every time you walk through fear, tackle a challenge, or complete a task you doubted you could handle, you reinforce your own worth."],
];

// Not the book's chapters: ten actions Francine writes about in her journal, each linked
// to the reflection it comes from (slug of the republished post).
const acts = [
  ["Take action, one baby step at a time", "Progress rarely comes in leaps. Break the task into small pieces, and remember that every action counts.", "one-baby-step-at-a-time"],
  ["Walk through your fear", "Courage isn't the absence of fear. It's admitting you're afraid — then taking the action to get through it.", "walk-through-your-fear"],
  ["Have the courage to dream", "Dreams give you a reason to get out of bed in the morning, and to keep going on the days you want to give up.", "courage-to-dream"],
  ["Risk failure", "Failing is not the worst thing that can happen. Not trying is.", "courage-to-risk-failure"],
  ["Keep your agreements with yourself", "Stay focused on the goal, and be willing to take the action despite how you feel.", "focus-is-the-key"],
  ["See yourself clearly", "Take a personal inventory. When feedback stings, ask whether what they say could be true.", "personal-inventory"],
  ["Let go of victimhood", "Make a decision to take back your life. Ask what part you played, and choose responsibility over blame.", "let-go-of-victimhood"],
  ["Don't let obstacles take you down", "Give yourself time, keep the end in mind, ask for help — and be open to a new route.", "dont-let-obstacles-take-you-down"],
  ["Forgive", "Clean up unresolved issues now, not someday. Forgiveness is the gift you give to you.", "forgiveness-the-gift-you-give-to-you"],
  ["Practice gratitude", "Choose to see the good, say thank you every chance you get, and write a gratitude list every week.", "attitude-of-gratitude"],
];

// Francine's ten Life Pillars ("Life Pillars", Feb 2026), in her order. The first four have
// their own posts; the lines for the other six are her "might mean" pairs from the same post.
const pillarPosts = [
  ["coins", "Finance", "Money is a mirror. How you handle it reflects how you handle responsibility, truth and follow-through.", "life-pillars-finance"],
  ["heart", "Health", "Not a luxury: the infrastructure that supports every other pillar of your life.", "life-pillar-health"],
  ["sun", "Spirituality", "The daily work of aligning your actions with your values, your truth and your highest self.", "spirituality"],
  ["smile", "Fun", "Fun is not frivolous. Fun is fuel — part of a healthy life's infrastructure.", "life-pillar-fun"],
];
const pillarsMore = [
  ["compass", "Behavior", "Reducing reactivity instead of chasing productivity."],
  ["home", "Home", "Peace instead of perfection."],
  ["briefcase", "Business", "Simplifying instead of scaling."],
  ["book", "Miscellaneous", "Writing, learning a new skill — curiosity instead of achievement."],
  ["hands", "Service", "Quiet contribution instead of public identity."],
  ["users", "Family &amp; Friends", "Consistency over intensity."],
];

const videos = [
  ["JcUdcMtYpbg", "Love Is An Action"],
  ["gc3lgaPxeb4", "Esteemable Acts® Wednesdays: Taking Your Inventory"],
  ["0juY-ldPags", "Esteemable Acts® Declutter Day"],
];

const post = (slug) => posts.find((p) => p.path === `esteemable-acts/${slug}/`);
const dl = (ctx, file) => `${ctx.root}assets/downloads/${file}`;

export default {
  path: "esteemable-acts/",
  section: "esteemable-acts/",
  title: "Esteemable Acts — Books & Philosophy",
  description: "Esteemable Acts® by Francine D. Ward: real self-esteem comes from action. The core principles, ten esteemable acts to start with, the ten Life Pillars, her books, videos and weekly reflections.",
  theme: "author",
  priority: "0.9",
  render: (ctx) => {
    const lifePillars = post("life-pillars");
    // Recent reflections not already linked from the pillars section above.
    const featured = new Set(["life-pillars", ...pillarPosts.map((p) => p[3])].map((s) => `esteemable-acts/${s}/`));
    const recent = journalPosts.filter((p) => !featured.has(p.path)).slice(0, 6);
    const groups = site.communities.filter((c) => /esteemable/i.test(c.href));
    const youtube = site.socials.find((s) => s.icon === "youtube");
    return html`
${subHero(ctx, {
  eyebrow: "Esteemable Acts®",
  title: lines("Self-esteem comes from|doing <em>esteemable acts.</em>"),
  lead: "Real self-esteem doesn't come from quick fixes or slogans — it comes from action. It isn't something you acquire. It's something you practice into being.",
  crumbs: [{ label: "Esteemable Acts" }],
  actions: html`<a class="btn btn-gold" href="#books">Explore the books <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#pillars">The Life Pillars</a>`,
})}

<section class="section section-paper" id="approach">
  <div class="container">
    <div class="split">
      <div class="reveal reveal-left" style="max-width:420px;justify-self:center;width:100%">
        ${portrait(ctx, { file: "francine-outdoors.jpg", alt: "Francine D. Ward laughing outdoors beside a lake in the California desert, hand at her chin" })}
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">The approach</p>
        <h2>A new way to think about <em>self-esteem.</em></h2>
        <p class="lead">The Esteemable Acts® approach challenges the myth that all you need to do is stand in front of a mirror, chant affirmations, or complete a 7, 30, or 60-day program.</p>
        <p>Instead, it teaches that real self-esteem comes from consistent, often uncomfortable, affirmative steps that align with the person you want to be. A professional speaker since 1995, Francine teaches what she has lived.</p>
        <blockquote class="big-quote" style="margin-top:2rem;font-size:clamp(1.5rem,2.6vw,2.2rem)">
          <span class="q-mark" aria-hidden="true">“</span>Believe it or not, your behavior determines your feelings about YOU!
          <cite>Francine D. Ward</cite>
        </blockquote>
      </div>
    </div>
  </div>
</section>

<section class="section" id="principles">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">The philosophy</p>
      <h2>Five core principles of <em>Esteemable Acts.</em></h2>
      <p class="lead">Most self-help asks you to think differently and hope you'll act differently. Esteemable Acts flips it: change what you do, and the way you see yourself follows.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${principles.map(
        ([t, d], i) => html`<div class="card reveal"><span class="card-num" aria-hidden="true">${i + 1}</span><h3 style="padding-right:40px">${t}</h3><p>${d}</p></div>`
      )}
      <a class="card card-dark reveal" href="${ctx.root}meet-francine/">
        <p class="eyebrow">Living proof</p>
        <h3>From the streets of New York to Georgetown Law.</h3>
        <p>These principles aren't theory. They're how Francine rebuilt her own life — and how she has stayed clean and sober for more than four decades.</p>
        <span class="card-foot link-arrow">Read her story <span class="arrow">→</span></span>
      </a>
    </div>
  </div>
</section>

<section class="section section-dark" id="acts">
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Practice</p>
        <h2>Ten esteemable acts to <em>start with this week.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">Not the book's chapter list — ten actions Francine returns to again and again in her weekly reflections, each linked to the piece where she writes about it. Pick one. Do it today. Notice how you feel tonight.</p>
    </div>
    <ol class="actions-list mt-3" data-stagger="0.05">
      ${acts.map(([t, d, slug]) => {
        const p = post(slug);
        return html`<li class="reveal"><div><h3>${t}</h3><p>${d}</p>${p ? html`<a class="link-arrow" style="margin-top:10px;font-size:.9rem" href="${ctx.root}${p.path}">Read “${esc(p.title)}” <span class="arrow">→</span></a>` : ""}</div></li>`;
      })}
    </ol>
  </div>
</section>

<section class="section" id="pillars">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Life Pillars</p>
        <h2>A life is built on <em>pillars.</em></h2>
        <p class="lead">Ten areas Francine uses to set her goals each year. Each pillar affects the others, creating an interdependent web — when one is neglected, the whole structure feels it.</p>
      </div>
      <blockquote class="reveal" style="--delay:.1s;margin:0">
        <p class="big-quote" style="font-size:clamp(1.3rem,2.1vw,1.75rem)"><span class="q-mark" aria-hidden="true">“</span>A pillar is simply a tall structure that provides support. My life pillars are the categories I use when I set my annual goals. They are the areas in my life that enable me to stay balanced—my life support.”</p>
        <p class="muted mt-1" style="letter-spacing:.14em;text-transform:uppercase;font-size:.8rem;font-weight:700">— Francine D. Ward${lifePillars ? html`, <a href="${ctx.root}${lifePillars.path}">Life Pillars</a>` : ""}</p>
      </blockquote>
    </div>

    <div class="grid grid-4 mt-3" data-stagger="0.06">
      ${pillarPosts.map(([ic, t, d, slug]) => {
        const p = post(slug);
        return p
          ? html`<a class="card reveal" href="${ctx.root}${p.path}"><span class="card-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p><span class="card-foot link-arrow">Read the reflection <span class="arrow">→</span></span></a>`
          : html`<div class="card reveal"><span class="card-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`;
      })}
    </div>
    <p class="muted mt-3 reveal" style="font-weight:700">And six more — with what each might mean in practice:</p>
    <div class="pillars mt-1" data-stagger="0.05">
      ${pillarsMore.map(([ic, t, d]) => html`<div class="pillar reveal"><span class="card-icon" style="margin:0 auto 14px">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`)}
    </div>

    <div class="split split-top mt-3" style="padding-top:clamp(24px,4vw,48px);border-top:1px solid var(--line)">
      <div class="reveal">
        <h3>Do it alongside Francine.</h3>
        <p>The Life Pillars worksheet is made to be used with her video series. Watch, pause as needed, and fill it in at your own pace.</p>
        ${videoEmbed("ZoGE5EkPAIo", "Strengthen Your Finances, Strengthen Your Life | Pillars Series")}
        <div class="btn-row">
          <a class="btn btn-accent" href="${dl(ctx, "Pillars-worksheet.pdf")}" target="_blank" rel="noopener">${icon("download")} Life Pillars worksheet (PDF)</a>
        </div>
        <p class="mt-1" style="font-size:.95rem">More worksheets: <a href="${dl(ctx, "Life-Pillar-Fun-Worksheet.pdf")}" target="_blank" rel="noopener">Fun</a> · <a href="${dl(ctx, "Combined-Spirituality-Worksheet.pdf")}" target="_blank" rel="noopener">Spirituality</a> · or try the <a href="${ctx.root}resources/#worksheets">interactive Life Pillars check-in</a>.</p>
      </div>
      <div class="reveal" style="--delay:.1s">
        <h3>Your invitation</h3>
        <p>“This is not about copying my categories. It is about creating a container strong enough to hold your real life.” Do this work deliberately:</p>
        <ol class="check-list mt-1">
          <li>List the pillars you believe make up a stable life.</li>
          <li>Assess how each one truly functioned last year.</li>
          <li>Choose one or two adjustments per pillar.</li>
          <li>Write them down.</li>
          <li>Return to them every quarter, not just at the beginning of each year.</li>
        </ol>
        ${lifePillars ? html`<a class="link-arrow mt-2" href="${ctx.root}${lifePillars.path}">Read the full Life Pillars introduction <span class="arrow">→</span></a>` : ""}
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="books">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">The books</p>
      <h2>Read the work that <em>started it all.</em></h2>
    </div>
    <div class="books" data-stagger="0.12">
      ${books.map((b) => {
        const copy = bookCopy[b.id] || {};
        return html`<div class="book reveal" id="book-${b.id}">
          ${bookCover(b, ctx)}
          ${(copy.desc || [b.desc]).map((d) => html`<p>${d}</p>`)}
          ${copy.excerpt
            ? html`<p style="font-family:var(--font-display);font-style:italic;color:var(--ink)">“${esc(copy.excerpt)}”<br><span class="muted" style="font-family:var(--font-body);font-style:normal;font-size:.82rem">— from the book</span></p>`
            : ""}
          ${b.buy
            ? html`<a class="link-arrow" href="${b.buy}" target="_blank" rel="noopener">Find the book ${icon("arrowUpRight")}</a>`
            : html`<a class="link-arrow" href="${ctx.root}contact/">Ask about availability <span class="arrow">→</span></a>`}
        </div>`;
      })}
    </div>
  </div>
</section>

<section class="section section-paper" id="watch">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Watch</p>
        <h2>Esteemable Acts <em>on video.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">Short talks from Francine, including episodes of Esteemable Acts® Wednesdays.${youtube ? html` <a href="${youtube.href}" target="_blank" rel="noopener">More on her YouTube channel</a>.` : ""}</p>
    </div>
    <div class="grid grid-3 video-grid mt-2" data-stagger="0.08">
      ${videos.map(([id, title]) => html`<div class="reveal">${videoEmbed(id, title)}</div>`)}
    </div>
  </div>
</section>

<section class="section" id="journal">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">From the journal</p>
        <h2>Reflections for <em>right living.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">Short, honest reflections on fear, money, health, forgiveness and joy — the daily practice of Esteemable Acts, in Francine's own words.</p>
    </div>
    <div class="grid grid-3 mt-3" data-stagger="0.06">
      ${recent.map((p) => postCard(p, ctx))}
    </div>
    <div class="center mt-3 reveal">
      <a class="btn btn-accent" href="${ctx.root}esteemable-acts/journal/">Browse all ${journalPosts.length} reflections <span class="arrow">→</span></a>
    </div>
  </div>
</section>

<section class="section section-tight" id="community">
  <div class="container">
    <div class="cta-band reveal reveal-scale">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="cta-band-inner">
        <div>
          <p class="eyebrow">Community</p>
          <h2>Growth happens <em>in community.</em></h2>
          <p class="lead">Share what you uncover and reflect alongside others who are choosing to live with intention. Your insight may be exactly what someone else needs to see today — and their clarity may strengthen yours in return.</p>
          <div class="btn-row mt-2">
            ${groups.length ? html`<a class="btn btn-gold" href="${groups[0].href}" target="_blank" rel="noopener">Join the Facebook group <span class="arrow">→</span></a>` : ""}
            <a class="btn btn-ghost-light" href="${ctx.root}speaking/">Book Francine to speak</a>
          </div>
        </div>
        <div class="cta-contact">
          ${groups.map((g) => html`<a href="${g.href}" target="_blank" rel="noopener">${icon("facebook")} ${g.name} on Facebook</a>`)}
          ${youtube ? html`<a href="${youtube.href}" target="_blank" rel="noopener">${icon("youtube")} Francine on YouTube</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>
`;
  },
};
