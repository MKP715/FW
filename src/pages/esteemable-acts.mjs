import { site } from "../site.mjs";
import { html, esc, subHero, lines, formatDate } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { books, journal } from "../data/content.mjs";

const star = `<svg class="bc-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5c.8 5.3 3.2 7.7 8.5 8.5-5.3.8-7.7 3.2-8.5 8.5-.8-5.3-3.2-7.7-8.5-8.5 5.3-.8 7.7-3.2 8.5-8.5z"/></svg>`;

export function bookCover(b) {
  return html`<div class="book-3d ${b.cls}" aria-hidden="true">
  <span class="book-spine"></span>
  <span class="book-cover">${star}
    <span class="bc-kicker">${b.kicker}</span>
    <span class="bc-title">${b.title}${b.sub ? `<em>${b.sub}</em>` : ""}</span>
    <span class="bc-author">Francine D. Ward</span>
  </span>
</div>
<h3>${b.name.split(":")[0]}</h3>
<p class="muted" style="font-size:.85rem;font-weight:700;letter-spacing:.04em">${esc(b.meta)}</p>`;
}

const principles = [
  ["Self-esteem is not a quick fix.", "It challenges the myth that all you need to do is stand in front of a mirror, chant affirmations, or complete a 7, 30, or 60-day program."],
  ["Self-esteem isn't confidence.", "Plenty of accomplished people still mistreat others or need to put others down to feel worthy. Confidence is about ability; self-esteem is about how you live."],
  ["It's an outcome, not the goal.", "Self-esteem is a byproduct of a courageous, purposeful, service-driven life — what happens to you along the way."],
  ["Esteemable acts build it.", "Behavior comes first. When your behavior reflects your values, you naturally feel better about yourself and more mindful of how you treat others."],
  ["Courage grows it.", "Every time you face a fear or finish something you doubted you could do, your self-esteem gets stronger."],
];

const acts = [
  ["Take action", "Action is the key. Feelings follow behavior — so start by doing, not by waiting to feel ready."],
  ["Walk through fear", "Fear isn't a stop sign. Do the thing that scares you, and notice who you become on the other side."],
  ["Make the right choice", "Even when it's really hard to do. Especially then."],
  ["Keep agreements with yourself", "The promises you make to yourself are the ones that build — or break — your self-respect."],
  ["Live on purpose", "Know your values, and let your calendar and your checkbook reflect them."],
  ["Take baby steps", "Small, consistent actions beat dramatic overhauls. Consistency isn't perfection — it's resilience."],
  ["Let a mentor in", "None of us gets there alone. Mentors are a gift: let someone who has walked the road show you the way."],
  ["Forgive", "Forgiveness isn't excusing harm. It's the gift you give to yourself so you can move forward."],
  ["Be of service", "Helping others is one of the fastest ways to feel good about yourself — and to remember you matter."],
  ["Practice gratitude — and have fun", "Gratitude is a muscle, and choosing joy, on occasion, is an esteemable act too."],
];

const pillars = [
  ["coins", "Finance", "Money is one of the clearest places where self-worth shows up."],
  ["heart", "Health", "Choose one or two adjustments — not ten, or even five."],
  ["sun", "Spirituality", "The daily work of aligning your actions with your values."],
  ["smile", "Fun", "Joy is part of a healthy life's infrastructure."],
  ["compass", "Behavior", "When behavior matches values, esteem follows."],
  ["home", "Home", "A space that supports the life you're building."],
  ["briefcase", "Business", "Work with integrity, purpose and clear agreements."],
  ["hands", "Service", "Giving back is how we grow."],
  ["users", "Family & Friends", "Love is an action — consistently showing up."],
];

export default {
  path: "esteemable-acts/",
  section: "esteemable-acts/",
  title: "Esteemable Acts — Books & Philosophy",
  description: "Esteemable Acts by Francine D. Ward: real self-esteem comes from action. The five principles, ten esteemable acts to start with, the Life Pillars, books, and reflections.",
  theme: "author",
  priority: "0.9",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Esteemable Acts",
  title: lines("Self-esteem comes from|doing <em>esteemable acts.</em>"),
  lead: "Real self-esteem doesn't come from quick fixes or slogans — it comes from action. It isn't something you acquire. It's something you practice into being.",
  crumbs: [{ label: "Esteemable Acts" }],
  actions: html`<a class="btn btn-gold" href="#books">Explore the books <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="${ctx.root}resources/#worksheets">Free worksheets</a>`,
})}

<section class="section section-paper">
  <div class="container container-narrow center">
    <p class="big-quote word-reveal">Self-esteem comes from doing esteemable acts — those things that make you feel good about yourself. Walking through fear, making right choices even when it's really hard to do, and keeping agreements with yourself.</p>
    <p class="muted mt-2 reveal" style="letter-spacing:.14em;text-transform:uppercase;font-size:.85rem;font-weight:700">— Francine D. Ward</p>
  </div>
</section>

<section class="section" id="principles">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">The philosophy</p>
      <h2>Five principles that <em>change everything.</em></h2>
      <p class="lead">Most self-help asks you to think differently and hope you'll act differently. Esteemable Acts flips it: change what you do, and the way you see yourself follows.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${principles.map(
        ([t, d], i) => html`<div class="card reveal${i === 0 ? "" : ""}"><span class="card-num" aria-hidden="true">${i + 1}</span><h3 style="padding-right:40px">${t}</h3><p>${d}</p></div>`
      )}
      <a class="card reveal" href="${ctx.root}meet-francine/" style="background:var(--ink);color:var(--ivory);border-color:var(--ink)">
        <p class="eyebrow" style="color:var(--coral-2)">Living proof</p>
        <h3>From rock bottom to Georgetown Law.</h3>
        <p style="color:rgba(251,247,241,.75)">These principles aren't theory. They're how Francine rebuilt her own life.</p>
        <span class="card-foot link-arrow" style="color:var(--gold-2)">Read her story <span class="arrow">→</span></span>
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
      <p class="lead reveal" style="--delay:.1s">Drawn from the themes of Francine's books and journal. Pick one. Do it today. Notice how you feel tonight. That's the whole method.</p>
    </div>
    <ol class="actions-list mt-3" data-stagger="0.05">
      ${acts.map(([t, d]) => html`<li class="reveal"><div><h3>${t}</h3><p>${d}</p></div></li>`)}
    </ol>
  </div>
</section>

<section class="section" id="pillars">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Life Pillars</p>
        <h2>A life is built on <em>pillars.</em></h2>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="lead">Each pillar affects the others — an interdependent web. When one is neglected, the whole structure feels it. Francine's Life Pillars series takes them one at a time.</p>
        <p><strong>Try this:</strong> write down your top three values, and one way to act on each this week.</p>
      </div>
    </div>
    <div class="pillars mt-3" style="grid-template-columns:repeat(3,minmax(0,1fr))" data-stagger="0.06">
      ${pillars.map(([ic, t, d]) => html`<div class="pillar reveal"><span class="card-icon" style="margin:0 auto 14px">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`)}
    </div>
    <div class="center mt-2 reveal"><a class="btn btn-accent" href="${ctx.root}resources/#worksheets">Get the Vision &amp; Values worksheets <span class="arrow">→</span></a></div>
  </div>
</section>

<section class="section section-sand" id="books">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">The books</p>
      <h2>Read the work that <em>started it all.</em></h2>
    </div>
    <div class="books" data-stagger="0.12">
      ${books.map(
        (b) => html`<div class="book reveal" id="book-${b.id}">
          ${bookCover(b)}
          <p>${b.desc}</p>
          ${b.blurb ? html`<p style="font-family:var(--font-display);font-style:italic;color:var(--ink)">“${b.blurb.text}”<br><span class="muted" style="font-family:var(--font-body);font-style:normal;font-size:.82rem">— ${b.blurb.by}</span></p>` : ""}
          ${b.buy
            ? html`<a class="link-arrow" href="${b.buy}" target="_blank" rel="noopener">Find the book ${icon("arrowUpRight")}</a>`
            : html`<a class="link-arrow" href="${ctx.root}contact/">Ask about availability <span class="arrow">→</span></a>`}
        </div>`
      )}
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
      <p class="lead reveal" style="--delay:.1s">Short, honest reflections on fear, money, health, love and joy — the daily practice of Esteemable Acts. Subscribe to get new ones by email.</p>
    </div>
    <div class="grid grid-3 mt-3" data-stagger="0.06">
      ${journal.map(
        (j) => html`<article class="card reveal">
          <p class="news-meta"><span class="news-cat">${j.tag}</span><time datetime="${j.date}">${formatDate(j.date, { month: "long", year: "numeric" })}</time></p>
          <h3>${j.title}</h3>
          <p style="font-family:var(--font-display);font-size:1.1rem;color:var(--ink)">“${esc(j.text)}”</p>
        </article>`
      )}
    </div>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <div class="cta-band reveal reveal-scale">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="cta-band-inner">
        <div>
          <p class="eyebrow">The Esteemable Acts letter</p>
          <h2>One small, brave action. <em>Every week.</em></h2>
          <p class="lead">Reflections, worksheets and the occasional legal heads-up for creators — delivered to your inbox.</p>
        </div>
        <form class="newsletter" data-newsletter data-mailto="${site.email}" style="align-self:center">
          <label class="sr-only" for="ea-email">Email address</label>
          <input id="ea-email" type="email" placeholder="you@example.com" required>
          <button class="btn btn-gold" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
</section>
`,
};
