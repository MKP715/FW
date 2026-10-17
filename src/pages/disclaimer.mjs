import { site } from "../site.mjs";
import { html, subHero, lines } from "../lib/layout.mjs";

export default {
  path: "disclaimer/",
  title: "Disclaimer & Privacy",
  description: "Attorney advertising notice, legal disclaimer and privacy information for the website of Francine D. Ward.",
  priority: "0.3",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "The fine print",
  title: lines("Disclaimer &amp; <em>privacy</em>"),
  lead: "Plain-English notes about what this website is — and isn't.",
  crumbs: [{ label: "Disclaimer" }],
})}
<section class="section">
  <div class="container container-narrow prose">
    <h2>Attorney advertising</h2>
    <p>This website may be considered attorney advertising under the rules of professional conduct of California, New York and the District of Columbia. ${site.legalName} is responsible for its content. Prior results and client reviews do not guarantee or predict a similar outcome in any future matter.</p>

    <h2>Not legal advice</h2>
    <p>Everything on this site — practice descriptions, Insights articles, resources, checklists and the IP &amp; AI Law Watch — is general information. Laws change, and every situation is different. Please don't act or refrain from acting based on this content without speaking with a lawyer licensed in your jurisdiction about your specific facts.</p>

    <h2>No attorney-client relationship</h2>
    <p>Reading this site, subscribing to the newsletter, or contacting the office by phone, email or form does not create an attorney-client relationship. A relationship is formed only by a written engagement agreement. Until then, please don't send confidential or time-sensitive information.</p>

    <h2>Jurisdiction</h2>
    <p>Francine D. Ward is admitted to practice law in California, New York and the District of Columbia. Nothing on this site is intended to solicit clients in jurisdictions where she is not authorized to practice.</p>

    <h2>Third-party news and links</h2>
    <p>The IP &amp; AI Law Watch summarizes publicly reported developments and links to the original publishers — courts, government agencies and news organizations — who own that content. Summaries are written for general audiences and may simplify complex proceedings; always consult the original source. Links to outside websites are provided for convenience and are not endorsements.</p>

    <h2>Privacy</h2>
    <p>This is a static website. It does not use analytics or advertising trackers and does not set cookies. Fonts are hosted on this site, so no third-party font requests are made. The Life Pillars worksheet saves your answers only in your own browser. If you use the contact or newsletter forms, your message is sent by email (or, if configured, through a form-processing service) solely so the office can respond to you. Your information is never sold.</p>
    <p>Questions about this notice? Email <a href="mailto:${site.email}">${site.email}</a>.</p>
    <p class="notice">Last updated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.</p>
  </div>
</section>
`,
};
