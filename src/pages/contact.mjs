import { site } from "../site.mjs";
import { html, esc, subHero, lines } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";

const topics = [
  "Trademark",
  "Copyright",
  "Publishing or licensing agreement",
  "AI & creative work",
  "Right of publicity / likeness",
  "Contracts & business agreements",
  "Estate planning — wills & trusts",
  "Speaking engagement",
  "Media or press",
  "Something else",
];

const legalInsights = site.communities.find((c) => c.name === "Legal Insights") || site.communities[0];
const ext = 'target="_blank" rel="noopener"';

// Answers are trusted HTML so they can link to related pages.
const faqs = (ctx) => [
  ["How do I book a consultation?", `The quickest way is to <a class="link-arrow" href="${site.booking}" ${ext}>choose a time online</a> — the booking page lists the 30-minute consultation times that are open. You can also call <a href="tel:${site.phoneHref}">${site.phone}</a>, email <a href="mailto:${site.email}">${site.email}</a>, or send a message with the form on this page.`],
  ["Do I have to come into an office?", "No. All appointments are virtual, so you can meet from your home, office or studio. If you'd prefer a phone call, just say so when you reach out."],
  ["Is the first consultation really free?", "Yes. The initial consultation is complimentary, by appointment. It's a chance to explain what you need, ask questions and decide together whether working with the office is a good fit."],
  ["Which jurisdictions do you cover?", "Francine is admitted to practice in California, New York and the District of Columbia. Trademark and copyright matters are largely federal, so in some cases help is possible beyond those places — ask during your consultation."],
  ["What should I bring to the consultation?", `For IP matters: the name, logo or work you want to protect, how and where you use it, and any contracts you've been asked to sign. For estate planning: a rough list of assets, who you'd like to provide for, and any existing wills or trusts. Francine's <a href="${ctx.root}assets/downloads/HOW-TO-CREATE-AN-ESTATE-PLANNING-INVENTORY-1.pdf">guide to creating an estate planning inventory</a> (PDF) is a good place to start.`],
  ["Can I send documents through this form?", "Please don't send confidential information until an attorney-client relationship has been established. The consultation is the right time to decide what to share and how."],
  ["Where can I learn more before we talk?", `Browse the plain-English guides and the legal blog on the <a href="${ctx.root}insights/">Insights</a> page. If you're still gathering information, you're welcome to join Francine's <a href="${legalInsights.href}" ${ext}>${legalInsights.name} community on Facebook</a> for ongoing guidance and support.`],
  ["How do I book Francine to speak?", `Choose “Speaking engagement” in the form and include your event date, audience and format. The <a href="${ctx.root}speaking/">speaking page</a> has topics and a media kit.`],
];

export default {
  path: "contact/",
  section: "contact/",
  title: "Contact & Free Consultation",
  description: "Schedule a complimentary 30-minute virtual consultation with the Law Office of Francine D. Ward — trademarks, copyright, publishing and estate planning — or inquire about speaking.",
  theme: "law",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.legalName,
    url: site.url + "/contact/",
    telephone: site.phone,
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postal, addressCountry: site.address.country },
    areaServed: ["California", "New York", "District of Columbia"],
    sameAs: site.socials.map((s) => s.href),
  },
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Contact",
  title: lines("Let's talk about|what you're <em>building.</em>"),
  lead: "A trademark, a trust, a book contract, a keynote — whatever brought you here, the first conversation is complimentary and virtual.",
  crumbs: [{ label: "Contact" }],
  actions: html`<a class="btn btn-gold" href="${site.booking}" ${ext}>${icon("calendar")} Schedule a 30-minute consultation<span class="sr-only"> (opens in a new tab)</span></a><a class="btn btn-ghost-light" href="#message">Prefer to write?</a>`,
})}

<section class="section">
  <div class="container">
    <div class="split split-top">
      <div>
        <div class="card" id="book">
          <span class="card-icon">${icon("calendar")}</span>
          <p class="eyebrow">Book online</p>
          <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Schedule a <span style="white-space:nowrap">30-minute</span> <em>consultation.</em></h2>
          <p class="lead">Pick a time that suits you on Francine's online calendar. The initial consultation is complimentary — a chance to explain what you need, ask questions and leave with a clear sense of your options.</p>
          <ul class="check-list mt-1">
            <li>Virtual — meet from home, office or studio</li>
            <li>Complimentary initial consultation, by appointment</li>
            <li>Trademarks, copyright, publishing and estate planning</li>
          </ul>
          <div class="btn-row mt-2">
            <a class="btn btn-gold" href="${site.booking}" ${ext}>Choose a time <span class="arrow">→</span><span class="sr-only"> (opens in a new tab)</span></a>
            <span class="form-note">Opens Francine's Calendly booking page in a new tab.</span>
          </div>
        </div>

        <div class="mt-3" id="message">
          <p class="eyebrow">Prefer to write?</p>
          <h2 style="font-size:clamp(1.8rem,3.4vw,2.6rem)">Send a <em>message.</em></h2>
          <p class="lead">Share a little about your situation and the best way to reach you. You'll hear back to schedule your consultation.</p>
          <form class="form mt-2" data-contact data-mailto="${site.email}"${site.formEndpoint ? ` data-endpoint="${esc(site.formEndpoint)}"` : ""} novalidate>
            <div class="form-row">
              <div class="field"><label for="c-name">Full name</label><input id="c-name" name="name" autocomplete="name" required></div>
              <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
            </div>
            <div class="form-row">
              <div class="field"><label for="c-phone">Phone <span class="muted">(optional)</span></label><input id="c-phone" name="phone" type="tel" autocomplete="tel"></div>
              <div class="field"><label for="c-topic">How can we help?</label>
                <select id="c-topic" name="topic" required>
                  <option value="">Choose a topic…</option>
                  ${topics.map((t) => html`<option>${t}</option>`)}
                </select>
              </div>
            </div>
            <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" name="message" placeholder="A short description is perfect — no confidential details yet, please." required></textarea></div>
            <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
            <label class="field-check"><input type="checkbox" name="consent" required> <span>I understand that contacting the office does not create an attorney-client relationship, and that I shouldn't send confidential information until one is established.</span></label>
            <div class="btn-row"><button class="btn btn-accent" type="submit">Send message <span class="arrow">→</span></button><span class="form-note">Prefer the phone? Call <a href="tel:${site.phoneHref}">${site.phone}</a>.</span></div>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>

      <aside class="contact-cards reveal" style="--delay:.15s" aria-label="Contact details">
        <a class="contact-card" href="tel:${site.phoneHref}"><span class="ci">${icon("phone")}</span><span><h3>Call</h3><p>${site.phone}</p></span></a>
        <a class="contact-card" href="mailto:${site.email}"><span class="ci">${icon("mail")}</span><span><h3>Email</h3><p>${site.email}</p></span></a>
        <div class="contact-card"><span class="ci">${icon("video")}</span><span><h3>Appointments</h3><p>Virtual — meet from anywhere.<br><span class="muted" style="font-weight:500">Initial consultation is complimentary.</span></p></span></div>
        <a class="contact-card" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`)}" ${ext}><span class="ci">${icon("pin")}</span><span><h3>Mailing address</h3><p>${esc(site.address.street).replace("Ste. ", "Ste.&nbsp;")}<br>${esc(site.address.city)}, ${site.address.region} ${site.address.postal}</p></span></a>
        <div class="contact-card"><span class="ci">${icon("scale")}</span><span><h3>Admitted to practice</h3><p>California · New York · District of Columbia</p></span></div>
        <p class="eyebrow mt-1 mb-0">Stay connected</p>
        <a class="contact-card" href="${legalInsights.href}" ${ext}><span class="ci">${icon("facebook")}</span><span><h3>${legalInsights.name} on Facebook</h3><p>Still gathering information? Join the community for ongoing guidance and support.</p></span></a>
        <a class="contact-card" href="${site.reviews.href}" ${ext}><span class="ci">${icon("quote")}</span><span><h3>Reviews on ${site.reviews.name}</h3><p>See what clients say about working with Francine.</p></span></a>
      </aside>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="aurora" aria-hidden="true" style="opacity:.35"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">What happens next</p>
      <h2>From first message to <em>peace of mind.</em></h2>
    </div>
    <div class="steps">
      <div class="step"><h3>Book or reach out</h3><p>Pick a time online, send a message or call. Share the basics — what you're protecting and any deadlines.</p></div>
      <div class="step"><h3>Free consultation</h3><p>A virtual conversation to understand your goals, answer questions and map your options.</p></div>
      <div class="step"><h3>A clear plan</h3><p>You'll know the recommended path, the scope of work and what to expect before anything begins.</p></div>
      <div class="step"><h3>Protected &amp; supported</h3><p>Filings, agreements and plans handled with care — and guidance as your work and life change.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container container-narrow">
    <div class="section-head center reveal"><p class="eyebrow">Good to know</p><h2>Frequently asked</h2></div>
    <div class="accordion reveal">
      ${faqs(ctx).map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p></div></details>`)}
    </div>
    <div class="btn-row mt-2 reveal" style="justify-content:center">
      <a class="btn btn-gold" href="${site.booking}" ${ext}>Schedule a 30-minute consultation <span class="arrow">→</span><span class="sr-only"> (opens in a new tab)</span></a>
    </div>
  </div>
</section>
`,
};
