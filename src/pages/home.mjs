import { site } from "../site.mjs";
import { html, esc, aurora, ctaBand, formatDate, portrait } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { news } from "../data/news.mjs";
import { testimonials, books } from "../data/content.mjs";
import { articles } from "../data/insights.mjs";
import { newsCard } from "./news.mjs";
import { bookCover } from "./esteemable-acts.mjs";

const practice = [
  { icon: "trademark", title: "Trademarks", text: "Clearance, registration and lifelong maintenance for the names, logos and taglines that make your brand recognizable.", href: "intellectual-property/#trademark" },
  { icon: "copyright", title: "Copyrights", text: "Registration and protection for books, art, music, courses, websites and every kind of creative content.", href: "intellectual-property/#copyright" },
  { icon: "book", title: "Publishing & Licensing", text: "Book deals, licensing and work-for-hire agreements negotiated so the rights you keep are the rights you need.", href: "intellectual-property/#publishing" },
  { icon: "ai", title: "AI & Creative Rights", text: "Clear guidance on authorship, ownership and risk when you create with — or are copied by — artificial intelligence.", href: "intellectual-property/#ai" },
  { icon: "user", title: "Right of Publicity", text: "Your name, voice and likeness are assets. Protect them in contracts, online, and after you're gone.", href: "intellectual-property/#publicity" },
  { icon: "home", title: "Wills & Trusts", text: "Trust-based estate plans, wills, powers of attorney and healthcare directives — so your wishes are carried out.", href: "estate-planning/" },
];

export default {
  path: "",
  section: "",
  title: "Attorney, Author & Speaker",
  description: site.description,
  priority: "1.0",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Francine D. Ward",
        url: site.url,
        jobTitle: "Attorney, Author and Speaker",
        alumniOf: [{ "@type": "CollegeOrUniversity", name: "Georgetown University Law Center" }, { "@type": "CollegeOrUniversity", name: "Hunter College" }],
        sameAs: site.socials.map((s) => s.href),
      },
      {
        "@type": "LegalService",
        name: site.legalName,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postal, addressCountry: site.address.country },
        areaServed: ["California", "New York", "District of Columbia"],
        knowsAbout: ["Trademark law", "Copyright law", "Publishing agreements", "Right of publicity", "Estate planning", "Wills and trusts"],
      },
    ],
  },
  render: (ctx) => {
    const latest = news.slice(0, 3);
    return html`
<section class="hero hero-home" aria-label="Introduction">
  ${aurora()}
  <div class="container hero-inner">
    <div>
      <p class="pill-note hero-fade"><b>New</b> <span>IP &amp; AI Law Watch — <a href="${ctx.root}news/">the stories shaping creators' rights</a></span></p>
      <p class="eyebrow hero-fade">Attorney · Author · Speaker</p>
      <h1>
        <span class="line"><span>Protect your</span></span>
        <span class="line"><span><span class="rotator text-gradient" aria-label="ideas, brand, legacy, voice"><span>ideas.</span><span>brand.</span><span>legacy.</span><span>voice.</span></span></span></span>
        <span class="line"><span>Practice your <em>worth.</em></span></span>
      </h1>
      <p class="lead hero-fade d1">Francine D. Ward safeguards innovations and secures legacies as an intellectual property and estate planning attorney with 35 years of practice — and shows, as the author of <em>Esteemable Acts</em>, that real self-esteem is built by what you do.</p>
      <div class="btn-row hero-fade d2">
        <a class="btn btn-gold" href="${ctx.root}contact/">Book a free consultation <span class="arrow">→</span></a>
        <a class="btn btn-ghost-light" href="${ctx.root}esteemable-acts/">Discover Esteemable Acts</a>
      </div>
    </div>
    <div class="hero-portrait hero-fade d3">
      <div class="portrait-ring" aria-hidden="true"></div>
      ${portrait(ctx)}
      <div class="float-badge b1"><strong>35</strong><small>years practicing<br>law since 1991</small></div>
      <div class="float-badge b2"><strong>J.D.</strong><small>Georgetown<br>Law, 1989</small></div>
      <div class="float-badge b3"><strong>CA·NY·DC</strong><small>Bar<br>admissions</small></div>
    </div>
  </div>
  <a class="scroll-cue" href="#doors" aria-label="Scroll to content"><span>Scroll</span><i></i></a>
</section>

<div class="ticker" role="region" aria-label="Latest legal news">
  <span class="ticker-label"><span class="pulse" aria-hidden="true"></span>Law Watch</span>
  <div class="ticker-track">
    ${[0, 1].map((dup) =>
      news.slice(0, 8).map((n) => html`<a href="${ctx.root}news/#${n.id}"${dup ? ' aria-hidden="true" tabindex="-1"' : ""}><time datetime="${n.date}">${formatDate(n.date, { month: "short", year: "numeric" })}</time>${esc(n.title)}</a>`)
    )}
  </div>
</div>

<section class="section section-paper">
  <div class="container container-narrow center">
    <p class="eyebrow reveal">The story in one sentence</p>
    <p class="big-quote word-reveal">From the streets of New York to Georgetown Law, Francine's life proves one thing: self-esteem isn't something you think your way into. It's something you act your way into.</p>
    <div class="mt-2 reveal"><a class="link-arrow" href="${ctx.root}meet-francine/">Read Francine's story <span class="arrow">→</span></a></div>
  </div>
</section>

<section class="section" id="doors">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Three ways to work together</p>
      <h2>One mission: help you <em>protect</em> and <em>grow</em> what matters.</h2>
    </div>
    <div class="doors" data-stagger="0.12">
      <a class="door door-law reveal" href="${ctx.root}attorney-at-law/">
        <svg class="door-art" viewBox="0 0 120 120" fill="none" stroke="rgba(251,247,241,.55)" stroke-width="1.2" aria-hidden="true"><circle cx="60" cy="60" r="50"/><circle cx="60" cy="60" r="34"/><path d="M60 10v100M10 60h100"/><path d="M60 26l18 34-18 34-18-34z"/></svg>
        <p class="eyebrow">The Law Office</p>
        <h3>Intellectual property &amp; estate planning</h3>
        <p>Trademarks, copyrights, publishing, AI and right of publicity — plus wills and trusts that secure your legacy.</p>
        <span class="door-cta"><i>↗</i> Explore the practice</span>
      </a>
      <a class="door door-author reveal" href="${ctx.root}esteemable-acts/">
        <svg class="door-art" viewBox="0 0 120 120" fill="none" stroke="rgba(251,247,241,.6)" stroke-width="1.2" aria-hidden="true"><path d="M60 8c3 22 12 31 34 34-22 3-31 12-34 34-3-22-12-31-34-34 22-3 31-12 34-34z"/><path d="M96 78c1.4 8 4.6 11.2 12.6 12.6-8 1.4-11.2 4.6-12.6 12.6-1.4-8-4.6-11.2-12.6-12.6 8-1.4 11.2-4.6 12.6-12.6z"/></svg>
        <p class="eyebrow">The Author</p>
        <h3>Esteemable Acts</h3>
        <p>Self-esteem comes from doing esteemable acts. Books, life pillars, worksheets and a weekly practice for right living.</p>
        <span class="door-cta"><i>↗</i> Start the practice</span>
      </a>
      <a class="door door-speaker reveal" href="${ctx.root}speaking/">
        <svg class="door-art" viewBox="0 0 120 120" fill="none" stroke="rgba(251,247,241,.55)" stroke-width="1.2" aria-hidden="true"><rect x="44" y="12" width="32" height="58" rx="16"/><path d="M28 54a32 32 0 0 0 64 0M60 86v22M42 108h36"/><path d="M14 40c-6 10-6 22 0 32M106 40c6 10 6 22 0 32"/></svg>
        <p class="eyebrow">The Speaker</p>
        <h3>Keynotes that move people</h3>
        <p>From “Fear Ain't Nothin' But a 4-Letter Word” to the legal landmines of social media — stories that stick.</p>
        <span class="door-cta"><i>↗</i> Book Francine</span>
      </a>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">By the numbers</p>
        <h2>Decades of practice. A lifetime of <em>proof.</em></h2>
      </div>
      <p class="lead reveal" style="--delay:.1s">A 1989 graduate of Georgetown University Law Center, Francine has practiced law since January 14, 1991. She teaches intellectual property and contract drafting to the next generation of lawyers, and received the WealthCounsel Trailblazer Award for sharing knowledge with her community.</p>
    </div>
    <div class="stats mt-3">
      <div class="stat reveal"><div class="stat-num"><span data-count="35">35</span><sup>+</sup></div><p class="stat-label">Years as a practicing attorney</p></div>
      <div class="stat reveal" style="--delay:.1s"><div class="stat-num"><span data-count="3">3</span></div><p class="stat-label">Bar admissions — California, New York &amp; D.C.</p></div>
      <div class="stat reveal" style="--delay:.2s"><div class="stat-num"><span data-count="3">3</span></div><p class="stat-label">Published books, from Random House to Hazelden</p></div>
      <div class="stat reveal" style="--delay:.3s"><div class="stat-num"><span data-count="30">30</span><sup>+</sup></div><p class="stat-label">Years on stage as a professional speaker</p></div>
    </div>
  </div>
</section>

<section class="section theme-law">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Practice areas</p>
        <h2>Your guide in intellectual property &amp; <em>estate planning.</em></h2>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="lead">Your creative work, your brand and your family's future deserve the same care. Appointments are virtual and the initial consultation is complimentary.</p>
        <a class="link-arrow" href="${ctx.root}attorney-at-law/">See how the Law Office works <span class="arrow">→</span></a>
      </div>
    </div>
    <div class="grid grid-3 mt-3" data-stagger="0.08">
      ${practice.map(
        (p, i) => html`<a class="card reveal" href="${ctx.root}${p.href}">
          <span class="card-num" aria-hidden="true">0${i + 1}</span>
          <span class="card-icon">${icon(p.icon)}</span>
          <h3>${p.title}</h3>
          <p>${p.text}</p>
          <span class="card-foot link-arrow">Learn more <span class="arrow">→</span></span>
        </a>`
      )}
    </div>
  </div>
</section>

<section class="section section-sand theme-news">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">IP &amp; AI Law Watch</p>
        <h2>What's happening to <em>creators' rights</em> right now.</h2>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="lead">AI-generated music fraud, the Supreme Court and AI authorship, deepfake laws and billion-dollar settlements — curated and explained in plain English.</p>
        <a class="btn" href="${ctx.root}news/">Open the Law Watch <span class="arrow">→</span></a>
      </div>
    </div>
    <div class="news-grid mt-3" data-stagger="0.1">
      ${latest.map((n) => newsCard(n, { compact: true }))}
    </div>
  </div>
</section>

<div class="marquee-words" aria-hidden="true">
  <div class="track">
    ${[0, 1].map(() => ["Walk through fear", "Keep your agreements", "Make the right choice", "Be of service", "Live on purpose", "Practice gratitude", "Take the next right action"].map((w) => `<span>${w}</span>`))}
  </div>
</div>

<section class="section theme-author">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Esteemable Acts</p>
        <h2>Self-esteem isn't something you acquire. It's something you <em>practice into being.</em></h2>
        <p class="lead">Real self-esteem doesn't come from quick fixes or slogans — it comes from action. Francine's books and weekly reflections turn that idea into a way of living: walking through fear, making right choices even when it's hard, and keeping agreements with yourself.</p>
        <div class="btn-row mt-2">
          <a class="btn btn-accent" href="${ctx.root}esteemable-acts/">Explore Esteemable Acts <span class="arrow">→</span></a>
          <a class="btn btn-ghost" href="${ctx.root}resources/#worksheets">Free worksheets</a>
        </div>
      </div>
      <div class="books reveal" style="grid-template-columns:repeat(2,1fr);--delay:.15s">
        ${books.slice(0, 2).map((b) => html`<div class="book">${bookCover(b)}</div>`)}
      </div>
    </div>
  </div>
</section>

<section class="section section-dark testimonials-section">
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Kind words</p>
        <h2>Clients who've been <em>in good hands.</em></h2>
        <a class="link-arrow mt-1" href="${ctx.root}client-reviews/">Read all client reviews <span class="arrow">→</span></a>
      </div>
      <div class="testimonials reveal" data-carousel style="--delay:.1s">
        <div class="t-viewport">
          <div class="t-track">
            ${testimonials.map(
              (t) => html`<figure class="t-slide" style="margin:0">
                <blockquote class="t-quote">“${esc(t.quote)}”</blockquote>
                <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${esc(t.who.charAt(0))}</span><span><span class="t-name">${esc(t.who)}</span><br><span class="t-role">${esc(t.role)}</span></span></figcaption>
              </figure>`
            )}
          </div>
        </div>
        <div class="t-controls">
          <button class="t-btn" type="button" data-prev aria-label="Previous testimonial">${icon("arrowLeft")}</button>
          <button class="t-btn" type="button" data-next aria-label="Next testimonial">${icon("arrow")}</button>
          <div class="t-dots"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <div class="section-head reveal" style="margin-bottom:0">
        <p class="eyebrow">Insights</p>
        <h2>Plain-English guides for <em>creators &amp; families.</em></h2>
      </div>
      <div class="reveal" style="--delay:.1s"><a class="link-arrow" href="${ctx.root}insights/">All insights <span class="arrow">→</span></a></div>
    </div>
    <div class="grid grid-3 mt-3" data-stagger="0.1">
      ${articles.slice(0, 3).map(
        (a) => html`<a class="card reveal theme-${a.theme}" href="${ctx.root}insights/${a.slug}/">
          <p class="news-meta"><span class="news-cat">${a.category}</span><span>${a.readTime} min read</span></p>
          <h3>${a.title}</h3>
          <p>${a.dek}</p>
          <span class="card-foot link-arrow">Read the guide <span class="arrow">→</span></span>
        </a>`
      )}
    </div>
  </div>
</section>

${ctaBand(ctx, { title: "Let's protect what <em>matters</em> to you." })}
`;
  },
};
