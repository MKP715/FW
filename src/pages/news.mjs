import { html, esc, subHero, lines, formatDate, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { news, categories } from "../data/news.mjs";

const displayDate = (n) => (n.approx ? formatDate(n.date, { month: "long", year: "numeric" }) : formatDate(n.date));

export function newsCard(n, { compact = false, href = "" } = {}) {
  return html`<article class="card news-card reveal" id="${n.id}" data-cat="${n.cat}">
  <p class="news-meta"><span class="news-cat">${esc(n.category)}</span><time datetime="${n.date}">${displayDate(n)}</time></p>
  <h3>${href ? html`<a href="${href}">${esc(n.title)}</a>` : esc(n.title)}</h3>
  <p${compact ? ' class="excerpt"' : ""}>${esc(n.summary)}</p>
  ${compact ? "" : html`<div class="why"><strong>Why it matters</strong>${esc(n.why)}</div>`}
  <div class="source"><span>${esc(n.source)}</span><a href="${esc(n.url)}" target="_blank" rel="noopener">Read source<span class="sr-only">: ${esc(n.title)} (opens in a new tab)</span> ${icon("arrowUpRight")}</a></div>
</article>`;
}

function featureArt(i) {
  // Abstract generative art for the spotlight cards — waveform for music, frame for art.
  if (i === 0) {
    const bars = Array.from({ length: 48 }, (_, k) => {
      const h = 18 + Math.abs(Math.sin(k * 0.55) * 60 + Math.cos(k * 0.23) * 30);
      return `<rect x="${20 + k * 12}" y="${200 - h / 2}" width="5" height="${h.toFixed(1)}" rx="2.5" fill="rgba(251,247,241,${(0.35 + (k % 5) * 0.12).toFixed(2)})"><animate attributeName="height" values="${h.toFixed(1)};${(h * 0.4).toFixed(1)};${h.toFixed(1)}" dur="${(1.6 + (k % 7) * 0.2).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="y" values="${(200 - h / 2).toFixed(1)};${(200 - h * 0.2).toFixed(1)};${(200 - h / 2).toFixed(1)}" dur="${(1.6 + (k % 7) * 0.2).toFixed(1)}s" repeatCount="indefinite"/></rect>`;
    }).join("");
    return `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bars}<text x="300" y="330" text-anchor="middle" fill="rgba(251,247,241,.75)" font-family="Manrope, sans-serif" font-size="12" letter-spacing="4">STREAMS ≠ LISTENERS</text></svg>`;
  }
  return `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect x="170" y="60" width="260" height="280" rx="6" fill="none" stroke="rgba(243,217,140,.8)" stroke-width="2"/>
    <rect x="186" y="76" width="228" height="248" rx="3" fill="rgba(21,18,42,.35)"/>
    <circle cx="300" cy="180" r="56" fill="none" stroke="rgba(251,247,241,.6)" stroke-dasharray="4 6"><animateTransform attributeName="transform" type="rotate" from="0 300 180" to="360 300 180" dur="30s" repeatCount="indefinite"/></circle>
    <path d="M300 128c4 30 18 44 48 48-30 4-44 18-48 48-4-30-18-44-48-48 30-4 44-18 48-48z" fill="rgba(255,154,118,.9)"/>
    <text x="300" y="300" text-anchor="middle" fill="rgba(251,247,241,.8)" font-family="Fraunces, serif" font-style="italic" font-size="18">Author: human?</text>
  </svg>`;
}

export default {
  path: "news/",
  section: "news/",
  title: "IP & AI Law Watch — News",
  description: "Curated news on AI and copyright, AI music, deepfakes and right of publicity, trademarks and estate planning — with plain-English notes on why each story matters.",
  theme: "news",
  priority: "0.9",
  render: (ctx) => {
    const featured = news.filter((n) => n.featured).slice(0, 2);
    const counts = Object.fromEntries(categories.map((c) => [c.slug, news.filter((n) => n.cat === c.slug).length]));
    return html`
${subHero(ctx, {
  eyebrow: "News · IP &amp; AI Law Watch",
  title: lines("The law is racing|to catch up with <em>AI.</em>"),
  lead: "Who owns what a machine makes? Can someone clone your voice? What happens to your likeness after you're gone? Here are the developments that matter to creators, entrepreneurs and families — each with a plain-English note on why it matters.",
  crumbs: [{ label: "News" }],
  actions: html`<a class="btn btn-gold" href="#latest">Read the latest <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#browse">Browse by topic</a>`,
})}

<section class="section" id="latest" data-news data-limit="9">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Spotlight</p>
      <h2>Two stories every creator should <em>know.</em></h2>
    </div>
    ${featured.map(
      (n, i) => html`<article class="news-feature reveal" aria-labelledby="f-${n.id}">
        <div class="news-feature-art">${featureArt(i)}</div>
        <div class="news-feature-body">
          <p class="news-meta" style="color:rgba(251,247,241,.65)"><span class="news-cat" style="color:var(--gold-2)">${esc(n.category)}</span><time datetime="${n.date}">${displayDate(n)}</time></p>
          <h2 id="f-${n.id}">${esc(n.title)}</h2>
          <p>${esc(n.summary)}</p>
          <p><strong style="color:var(--gold-2)">Why it matters:</strong> ${esc(n.why)}</p>
          <div class="btn-row mt-1"><a class="btn btn-gold btn-sm" href="${esc(n.url)}" target="_blank" rel="noopener">Read at ${esc(n.source.split(",")[0])} ${icon("arrowUpRight")}</a></div>
        </div>
      </article>`
    )}

    <div class="news-toolbar mt-3" id="browse">
      <div class="chips" role="group" aria-label="Filter by topic">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">All<span class="count">${news.length}</span></button>
        ${categories.map((c) => html`<button class="chip" type="button" data-filter="${c.slug}" aria-pressed="false">${c.label}<span class="count">${counts[c.slug]}</span></button>`)}
      </div>
      <label class="search-field">${icon("search")}<span class="sr-only">Search news</span><input type="search" placeholder="Search the Law Watch…"></label>
    </div>
    <p class="muted" style="margin-top:-16px;margin-bottom:24px;font-size:.9rem" aria-live="polite"><span data-news-count>${news.length} stories</span> · newest first · <a href="${ctx.root}feed.xml" type="application/rss+xml">RSS feed</a></p>
    <div class="news-grid">
      ${news.map((n) => newsCard(n))}
    </div>
    <p class="center mt-2"><button class="btn btn-ghost" type="button" data-news-more hidden>Show all ${news.length} stories</button></p>
    <div class="news-empty"><p>No stories match these filters.</p><p><button class="btn btn-ghost btn-sm" type="button" data-news-reset>Show all stories</button></p><p>Or <a href="${ctx.root}contact/">ask a question</a>.</p></div>
    <p class="notice">News summaries are general information written for a broad audience, not legal advice, and may simplify complex proceedings. Each story links to its original publisher, which owns that content; check the source for full and current details.</p>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">What this means for you</p>
        <h2>Five takeaways from a <em>year of AI law.</em></h2>
      </div>
      <ol class="check-list reveal" style="--delay:.1s;list-style:none">
        <li><strong>Human authorship is the line.</strong> Purely AI-generated work can't be registered for copyright in the U.S. Document your creative choices.</li>
        <li><strong>Register what you create.</strong> Timely registration unlocks statutory damages and attorney's fees — and registered works were at the heart of the largest AI copyright settlement yet.</li>
        <li><strong>Your voice and face are property.</strong> California, New York and Tennessee have new digital-replica laws, and Congress is weighing a federal right.</li>
        <li><strong>Read the AI clauses.</strong> Contracts now include digital-replica and AI-training terms. Don't sign them unread — or alone.</li>
        <li><strong>Plan for your digital legacy.</strong> Name who controls your likeness, accounts and creative rights in your estate plan.</li>
      </ol>
    </div>
  </div>
</section>

${ctaBand(ctx, {
  title: "Have a question about AI and <em>your</em> work?",
  lead: "Whether you're registering AI-assisted work, negotiating a contract with an AI clause, or protecting your likeness, a complimentary virtual consultation is the place to start.",
})}
`;
  },
};
