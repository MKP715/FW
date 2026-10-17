import { site } from "../site.mjs";
import { html, subHero, lines, portrait } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts } from "../lib/posts.mjs";

// Talk titles, the featured-talk copy and the areas of expertise come from Francine's
// 2019/2020 press kits. The featured copy is her press-kit text, condensed with ellipses.
const featured = {
  t: "Fear Ain’t Nothing But A <em>Four‑Letter Word</em>",
  hook: "What is more cunning, baffling, powerful, and more deadly than a speeding bullet? FEAR!",
  copy: [
    "It ruins families and … is the single biggest barrier to living a life of endless possibilities. F-E-A-R keeps us stuck, broke, dependent, and living beyond our means. It is the ultimate jailor because when F-E-A-R comes to visit it takes plenty of prisoners.",
    "It is the one thing we all have in common, whether we are head of our own company, working for someone else, retired, single, married, divorced, or in search of ourselves. In this program Francine demonstrates strategies for helping the audience get past this deadly killer of hope and dreams.",
  ],
  tags: ["Keynote", "Motivation & inspiration"],
  read: { title: "Walk Through Your Fear", label: "Francine on walking through fear" },
};

const topics = [
  {
    t: "Self-Esteem Comes from DOING Esteemable Acts",
    d: "Real self-esteem doesn't come from chanting affirmations in a mirror or finishing a 30-day program. It comes from action — consistent, often uncomfortable steps that line up with the person you want to be. In the words of the Esteemable Acts approach: “You can't think your way into right living—you must act your way into right thinking.”",
    tags: ["Self-esteem", "Personal growth"],
    link: { href: "esteemable-acts/", label: "The Esteemable Acts approach" },
  },
  {
    t: "You Can't Change What You Can't See",
    d: "It's an esteemable act to see yourself clearly. Francine looks at why we avoid the truth about ourselves, how denial gives our blind spots more control, and how an honest inventory — and a willingness to hear feedback — makes real change possible.",
    tags: ["Self-awareness", "Recovery"],
    read: { title: "Personal Inventory", label: "Read “Personal Inventory”" },
  },
  {
    t: "Lions, Tigers, &amp; Friends: Landmines When Playing in the Social Media Sandbox",
    d: "An intellectual property attorney's guide to the legal landmines of social media — from posting images you don't have the rights to, to what employees say online — and how to protect your content, your brand and your business.",
    tags: ["Social media & the law", "Business"],
    read: { title: "Use of Images – Read the License Carefully", label: "Read “Use of Images”" },
  },
];

const expertise = ["Women in Business", "Motivation & Inspiration", "Alcoholism & Drug Use", "Image & Self-Esteem", "Principles of Success"];

// Audiences documented by the press kits, client reviews and Francine's own posts.
const audiences = ["Women & family services agencies", "Recovery & community health organizations", "Nonprofit executive directors", "Writers & authors", "Entrepreneurs & small business owners"];

// Verbatim (shortened only with ellipses) from the press kits and the Client Reviews page.
const workshopReviews = [
  {
    q: "I had the pleasure of meeting her after attending one of her workshops on Intellectual Property/Copyright matters. The workshop was tailored to nonprofit executive directors and was truly excellent. It was interactive, fun, and had a great deal of useful information that we could immediately apply to work in our agencies. I learned so much that day.",
    who: "Gwen Wilson, LCSW",
    role: "Founder/Executive Director/CEO, G.O.A.L.S. For Women",
  },
  {
    q: "Francine Ward's book Esteemable Acts is one of my faves, so the opportunity to join her classes on publishing, social media and copyright how-to was a treat. I learned what I needed to know to further my writing career and more importantly was inspired. Thank you!",
    who: "Mary E.",
    role: "Class participant",
  },
  {
    q: "Then I attended one of Francine Ward's seminars and got her input. … Carefully applying the thoughtful advice in Ms. Ward's presentation, I crafted a new agreement, one in which the rights to my story reverted back to me after a reasonable period of time. The publisher signed it.",
    who: "Nancy B.",
    role: "Writer and seminar attendee",
  },
  {
    q: "She is also a great public speaker and inspiring writer.",
    who: "Barbara M.",
    role: "Client",
  },
];

const shortBio = `Francine D. Ward is an intellectual property and estate planning attorney, the author of <em>Esteemable Acts: 10 Actions for Building Real Self-Esteem</em> (Broadway Books) and <em>52 Weeks of Esteemable Acts: A Guide to Right Living</em> (Hazelden), and a professional speaker since 1995. A high-school dropout who once lived homeless on the streets of New York, she graduated from Georgetown University Law Center in 1989 and has been clean and sober for more than four decades. She is admitted to practice in California, New York and the District of Columbia.`;

const longBio = [
  `Francine D. Ward is proof that change is possible. At fourteen, she was a heroin addict and a practicing alcoholic. At eighteen, she was a high-school dropout living homeless on the streets of New York. At twenty-six, she was hit by a car and told she'd never walk again; in her early forties, she ran two marathons. She has been clean and sober for more than four decades.`,
  `Francine graduated from Georgetown University Law Center in 1989 and has 35 years of experience as an attorney. Admitted in California, New York and the District of Columbia, she helps clients protect their brands and creative work through trademarks and copyrights, and protect their families through wills, trusts and estate plans. She has taught intellectual property and contract drafting at the California Desert Trial Academy of Law in Indio, California, has served on the governing council of the American Bar Association's Intellectual Property Law Section and chaired its Attorney Wellness Committee, and received the WealthCounsel Trailblazer Award in 2021.`,
  `She is the author of <em>Esteemable Acts: 10 Actions for Building Real Self-Esteem</em> (Broadway Books, 2003) and <em>52 Weeks of Esteemable Acts: A Guide to Right Living</em> (Hazelden, 2005), and of <em>Staying Legal: A Guide to Copyright and Trademark Use</em> (ASTD Press). A professional speaker since 1995, she speaks on fear, self-esteem, recovery and the legal landmines of social media. Her law office is in Palm Desert, California.`,
];

const questions = [
  "You went from addiction at fourteen to Georgetown Law. What was the first esteemable act that changed your direction?",
  "Why don't affirmations build self-esteem — and what does?",
  "What's the difference between self-esteem and confidence?",
  "Why do you call fear “a four-letter word” — and how do you walk through it?",
  "How can someone recognize what they need to change in their own life?",
  "You've written about freezing in front of an audience of nine hundred people. What kept you going?",
  "As an intellectual property attorney, what legal landmines do people step on most often on social media?",
  "What's one action our listeners can take today?",
];

const postHref = (ctx, title) => {
  const p = posts.find((x) => x.title === title);
  return p ? `${ctx.root}${p.path}` : null;
};

const readLink = (ctx, item) => {
  if (item.link) return html`<a class="card-foot link-arrow" href="${ctx.root}${item.link.href}">${item.link.label} <span class="arrow">→</span></a>`;
  const href = item.read && postHref(ctx, item.read.title);
  return href ? html`<a class="card-foot link-arrow" href="${href}">${item.read.label} <span class="arrow">→</span></a>` : "";
};

export default {
  path: "speaking/",
  section: "speaking/",
  title: "Speaking — Keynotes, Workshops & Media Kit",
  description: "Book Francine D. Ward, a professional speaker since 1995, for talks on fear, self-esteem through action, recovery and the legal landmines of social media. Signature talks, workshops and media kit.",
  theme: "speaker",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Speaking",
  title: lines("Stories that stick.|Lessons that <em>last.</em>"),
  lead: "A professional speaker since 1995, Francine D. Ward has engaged audiences large and small with her story of triumph over insurmountable odds — and the everyday actions that make change possible.",
  crumbs: [{ label: "Speaking" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Check availability <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#talks">Signature talks</a><a class="btn btn-ghost-light" href="#media-kit">Media kit</a>`,
})}

<section class="section">
  <div class="container">
    <div class="split">
      <div class="reveal reveal-left" style="max-width:440px;justify-self:center;width:100%">
        <div style="position:relative">${portrait(ctx, { file: "francine-speaking.jpg", alt: "Francine D. Ward smiling outdoors beside a lake, one hand raised to her chin" })}</div>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">Meet the speaker</p>
        <h2>Her story <em>is</em> the message.</h2>
        <p class="lead">At fourteen, Francine was a heroin addict and a practicing alcoholic. At eighteen, she was a high-school dropout living homeless on the streets of New York. At twenty-six, she was hit by a car and told she'd never walk again.</p>
        <p>She went on to graduate from Georgetown University Law Center, practice law for 35 years, run two marathons in her early forties, and write two traditionally published self-help books. In an engaging, intelligent and often humorous style, she shares more than her story. She shows audiences that anything is possible, explains the Esteemable Acts® approach to lasting self-esteem, and makes the case for the unfashionable basics: hard work and determination.</p>
        <figure class="prose" style="margin:1.6rem 0 0">
          <blockquote style="margin:0 0 10px">“I speak for a living, and people say things like, ‘You're so inspirational,’ … Yet for every time I do well on the platform, there are memories of times I bombed and bombed big time.”</blockquote>
          ${postHref(ctx, "Learn a New Skill")
            ? html`<figcaption style="text-align:left;margin:0">Francine, in <a href="${postHref(ctx, "Learn a New Skill")}">“Learn a New Skill”</a></figcaption>`
            : html`<figcaption style="text-align:left;margin:0">Francine D. Ward</figcaption>`}
        </figure>
        <div class="badge-row mt-2">
          <span class="badge">Speaking since 1995</span>
          <span class="badge">Two self-help books</span>
          <span class="badge">J.D., Georgetown Law</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="talks">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Signature talks</p>
      <h2>Four talks. <em>One invitation</em> to act.</h2>
      <p class="lead">Each talk grows out of Francine's own life or her law practice, and each can be delivered at an online or in-person event. Ask about shaping one for your audience.</p>
    </div>

    <article class="card topic reveal" style="border-color:color-mix(in srgb,var(--accent) 45%,var(--line))">
      <div class="split split-top" style="gap:clamp(24px,4vw,64px)">
        <div>
          <p class="eyebrow">Featured keynote</p>
          <h3 style="font-size:clamp(1.8rem,3.4vw,2.7rem);line-height:1.1">${featured.t}</h3>
          <ul class="tag-list">${featured.tags.map((t) => html`<li class="tag">${t.replace("&", "&amp;")}</li>`)}</ul>
          ${readLink(ctx, featured) ? html`<p class="mt-2" style="margin-bottom:0">${readLink(ctx, featured).replace("card-foot ", "")}</p>` : ""}
        </div>
        <div>
          <p class="lead" style="font-family:var(--font-display);color:var(--ink)">${featured.hook}</p>
          ${featured.copy.map((p, i) => html`<p${i === featured.copy.length - 1 ? ' style="margin-bottom:0"' : ""}>${p}</p>`)}
        </div>
      </div>
    </article>

    <div class="grid grid-3 mt-2" data-stagger="0.08">
      ${topics.map(
        (tp) => html`<article class="card topic reveal">
          <h3>${tp.t}</h3>
          <p>${tp.d}</p>
          <div style="margin-top:auto">
            <ul class="tag-list" style="margin-bottom:6px">${tp.tags.map((t) => html`<li class="tag">${t.replace("&", "&amp;")}</li>`)}</ul>
            ${readLink(ctx, tp)}
          </div>
        </article>`
      )}
    </div>

    <div class="reveal mt-3">
      <p class="eyebrow">Areas of expertise</p>
      <div class="badge-row">${expertise.map((e) => html`<span class="badge">${e.replace("&", "&amp;")}</span>`)}</div>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="container-narrow" style="margin-inline:auto;padding:0">
      <p class="eyebrow reveal">From the audience</p>
      <figure class="reveal" style="margin:0">
        <blockquote class="t-quote">“As an avid conference fan…Francine is truly in the top 1% of great motivational speakers. She joins with her audience and touches the hearts and souls of the listeners. Her message is universal and embraces humor and joy…Francine's message…triggered a chain of events that not only cemented one [of] the best events our agency ever sponsored but created a cascading effect.”</blockquote>
        <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">M</span><span><span class="t-name">Maureen Keating, PCC-S, LICDC</span><br><span class="t-role">Director of Women &amp; Family Services, Community Health Center, Akron, OH</span></span></figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section" id="workshops">
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Workshops &amp; classes</p>
        <h2>Teaching what she <em>practices.</em></h2>
        <p class="lead">Alongside her keynotes, Francine has taught workshops, classes and seminars: classes for writers on publishing, social media and copyright how-to, seminars on publishing contracts, and an interactive intellectual property and copyright workshop tailored to nonprofit executive directors.</p>
        <p>She has also offered web-based programs to help entrepreneurs and small business owners understand their rights.</p>
        <h3 class="mt-2" style="font-size:1.3rem">Formats</h3>
        <ul class="check-list mt-1">
          <li><strong>Keynotes</strong> — to open, close or anchor your event</li>
          <li><strong>Workshops, classes &amp; seminars</strong> — interactive sessions with information people can put to work right away</li>
          <li><strong>Online or in person</strong> — whichever suits your event</li>
        </ul>
        <h3 class="mt-2" style="font-size:1.3rem">Audiences she has spoken to and taught</h3>
        <div class="badge-row mt-1">${audiences.map((a) => html`<span class="badge">${a.replace("&", "&amp;")}</span>`)}</div>
        <p class="callout mt-2" style="margin-bottom:0"><strong>Please note:</strong> workshops on legal topics share general information, not legal advice, and attending one doesn't create an attorney-client relationship.</p>
      </div>
      <div class="grid" data-stagger="0.08">
        ${workshopReviews.map(
          (r) => html`<figure class="card review reveal" style="margin:0">
            <blockquote>“${r.q}”</blockquote>
            <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">${r.who.charAt(0)}</span><span><span class="t-name">${r.who}</span><br><span class="t-role">${r.role}</span></span></figcaption>
          </figure>`
        )}
        <a class="link-arrow reveal" style="justify-self:start" href="${ctx.root}client-reviews/">Read all client reviews <span class="arrow">→</span></a>
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
      <p class="lead">Copy a bio, download a high-resolution headshot or the logo, or use the suggested interview questions. Need something else? <a href="mailto:${site.email}?subject=${encodeURIComponent("Media kit request")}" style="color:var(--gold-2)">Email the office</a>.</p>
    </div>
    <div class="grid grid-2" style="align-items:start">
      <div class="grid">
      <div class="card card-dark reveal">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h3 style="margin:0">Short bio</h3><button class="btn btn-sm btn-ghost-light" type="button" data-copy="#bio-short">${icon("copy")} Copy</button></div>
        <p id="bio-short" class="mt-1" style="margin-bottom:0">${shortBio}</p>
      </div>
      <div class="card card-dark reveal" style="--delay:.1s">
        <h3>Headshot &amp; logo</h3>
        <p>A high-resolution portrait of Francine (1600 × 2400 JPG) and the FW monogram — gold strokes and a rising coral star — for event programs, slides and press.</p>
        <div class="btn-row" style="margin:6px 0 18px">
          <a class="btn btn-sm btn-gold" href="${ctx.root}assets/img/francine-headshot-hires.jpg" download="Francine-D-Ward-headshot.jpg">${icon("download")} Download headshot (high-res JPG)</a>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin:0 0 18px">
          <img src="${ctx.root}assets/img/logo-mark.svg" alt="Francine D. Ward monogram logo" width="88" height="88" style="border-radius:20px">
          <div class="btn-row"><a class="btn btn-sm btn-ghost-light" href="${ctx.root}assets/img/logo-mark.svg" download="Francine-D-Ward-logo.svg">${icon("download")} Logo (SVG)</a><a class="btn btn-sm btn-ghost-light" href="${ctx.root}assets/img/icon-512.png" download="Francine-D-Ward-logo.png">${icon("download")} Logo (PNG)</a></div>
        </div>
        <div class="kit" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))">
          <div class="kit-item"><h4>Name</h4><p>Francine D. Ward</p></div>
          <div class="kit-item"><h4>Website</h4><p>francineward.com</p></div>
          <div class="kit-item"><h4>Email</h4><p>${site.email.replace("@", "@<wbr>")}</p></div>
          <div class="kit-item"><h4>Phone</h4><p>${site.phone}</p></div>
        </div>
      </div>
      </div>
      <div class="card card-dark reveal" style="--delay:.1s">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h3 style="margin:0">Long bio</h3><button class="btn btn-sm btn-ghost-light" type="button" data-copy="#bio-long">${icon("copy")} Copy</button></div>
        <div id="bio-long" class="mt-1">${longBio.map((p) => `<p>${p}</p>`)}</div>
      </div>
    </div>
    <div class="card card-dark reveal mt-2">
      <h3>Suggested interview questions</h3>
      <ol style="padding-left:1.2em;margin:0;color:rgba(251,247,241,.78);columns:2 320px;column-gap:48px">${questions.map((q) => `<li style="margin-bottom:10px;break-inside:avoid">${q}</li>`)}</ol>
    </div>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <div class="cta-band reveal reveal-scale">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="cta-band-inner">
        <div>
          <p class="eyebrow">Book Francine</p>
          <h2>Bring Francine to <em>your stage.</em></h2>
          <p class="lead">Share your date, your audience and the talk you have in mind. Send a speaking inquiry through the contact page (choose “Speaking engagement”) or call the office, and you'll hear back about availability, format and fees.</p>
          <div class="btn-row mt-2">
            <a class="btn btn-gold" href="${ctx.root}contact/">Send a speaking inquiry <span class="arrow">→</span></a>
          </div>
        </div>
        <div class="cta-contact">
          <a href="tel:${site.phoneHref}">${icon("phone")} Call ${site.phone}</a>
          <a href="mailto:${site.email}?subject=${encodeURIComponent("Speaking inquiry")}">${icon("mail")} ${site.email}</a>
          <a href="${ctx.root}contact/">${icon("mic")} Speaking inquiry form</a>
        </div>
      </div>
    </div>
  </div>
</section>
`,
};
