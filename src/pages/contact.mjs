import { site } from "../site.mjs";
import { html, esc, subHero, lines } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";

const topics = [
  "Trademark",
  "Copyright",
  "Publishing or licensing agreement",
  "AI & creative work",
  "Right of publicity / likeness",
  "Trade secrets or contracts",
  "Estate planning — wills & trusts",
  "Trust administration or probate",
  "Speaking engagement",
  "Media or press",
  "Something else",
];

const faqs = [
  ["Do I have to come into an office?", "No. Appointments are virtual, so you can meet from your home, office or studio. If you'd prefer a phone call, just say so when you reach out."],
  ["Is the first consultation really free?", "Yes. The initial consultation is complimentary. It's a chance to explain what you need, ask questions and decide together whether working with the office is a good fit."],
  ["Which jurisdictions do you cover?", "Francine is admitted to practice in California, New York and the District of Columbia. Trademark and copyright matters are largely federal, so in some cases help is possible beyond those places — ask during your consultation."],
  ["What should I bring to the consultation?", "For IP matters: the name, logo or work you want to protect, how and where you use it, and any contracts you've been asked to sign. For estate planning: a rough list of assets, who you'd like to provide for, and any existing wills or trusts."],
  ["Can I send documents through this form?", "Please don't send confidential information until an attorney-client relationship has been established. The consultation is the right time to decide what to share and how."],
  ["How do I book Francine to speak?", "Choose “Speaking engagement” in the form and include your event date, audience and format. The speaking page has topics and a media kit."],
];

export default {
  path: "contact/",
  section: "contact/",
  title: "Contact & Free Consultation",
  description: "Book a complimentary virtual consultation with the Law Office of Francine D. Ward — trademark, copyright, publishing, AI, and estate planning — or inquire about speaking.",
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
  },
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Contact",
  title: lines("Let's talk about|what you're <em>building.</em>"),
  lead: "A trademark, a trust, a book contract, a keynote — whatever brought you here, the first conversation is complimentary and virtual.",
  crumbs: [{ label: "Contact" }],
})}

<section class="section">
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">Send a message</p>
        <h2>Tell me what you need.</h2>
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
      <aside class="contact-cards reveal" style="--delay:.15s" aria-label="Contact details">
        <a class="contact-card" href="tel:${site.phoneHref}"><span class="ci">${icon("phone")}</span><span><h3>Call</h3><p>${site.phone}</p></span></a>
        <a class="contact-card" href="mailto:${site.email}"><span class="ci">${icon("mail")}</span><span><h3>Email</h3><p>${site.email}</p></span></a>
        <div class="contact-card"><span class="ci">${icon("video")}</span><span><h3>Appointments</h3><p>Virtual — meet from anywhere.<br><span class="muted" style="font-weight:500">Initial consultation is complimentary.</span></p></span></div>
        <a class="contact-card" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`)}" target="_blank" rel="noopener"><span class="ci">${icon("pin")}</span><span><h3>Mailing address</h3><p>${esc(site.address.street)}<br>${esc(site.address.city)}, ${site.address.region} ${site.address.postal}</p></span></a>
        <div class="contact-card"><span class="ci">${icon("scale")}</span><span><h3>Admitted to practice</h3><p>California · New York · District of Columbia</p></span></div>
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
      <div class="step"><h3>Reach out</h3><p>Send a message or call. Share the basics — what you're protecting and any deadlines.</p></div>
      <div class="step"><h3>Free consultation</h3><p>A virtual conversation to understand your goals, answer questions and map your options.</p></div>
      <div class="step"><h3>A clear plan</h3><p>You'll know the recommended path, the scope of work and what to expect before anything begins.</p></div>
      <div class="step"><h3>Protected &amp; supported</h3><p>Filings, agreements and plans handled with care — and ongoing guidance as your work and life grow.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container container-narrow">
    <div class="section-head center reveal"><p class="eyebrow">Good to know</p><h2>Frequently asked</h2></div>
    <div class="accordion reveal">
      ${faqs.map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p></div></details>`)}
    </div>
  </div>
</section>
`,
};
