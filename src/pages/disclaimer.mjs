import { site } from "../site.mjs";
import { html, esc, subHero, lines } from "../lib/layout.mjs";

// Change this date whenever the wording below changes (it is not the build date).
const updated = "October 17, 2026";

const sections = [
  ["advertising", "Attorney advertising"],
  ["not-advice", "Not legal advice"],
  ["no-relationship", "No attorney-client relationship"],
  ["jurisdiction", "Jurisdiction"],
  ["third-party", "Third-party links & services"],
  ["copyright", "Copyright & trademarks"],
  ["permissions", "Permissions & reprints"],
  ["privacy", "Privacy"],
];
const permissionHref = `mailto:${site.email}?subject=${encodeURIComponent("Permission request")}`;

export default {
  path: "disclaimer/",
  title: "Disclaimer, Privacy & Permissions",
  description: "Attorney advertising notice, legal disclaimer, privacy information and how to request permission to reprint content from the website of Francine D. Ward.",
  priority: "0.3",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "The fine print",
  title: lines("Disclaimer &amp; <em>privacy</em>"),
  lead: "Plain-English notes about what this website is — and isn't — and how to ask permission to reprint Francine's work.",
  crumbs: [{ label: "Disclaimer" }],
})}
<section class="section">
  <div class="container container-narrow prose">
    <nav class="callout" aria-label="On this page"><strong>On this page:</strong> ${sections.map(([id, label], i) => html`${i ? " · " : ""}<a href="#${id}">${label}</a>`)}</nav>

    <h2 id="advertising">Attorney advertising</h2>
    <p>This website is attorney advertising and may be considered a communication about legal services under the rules of professional conduct of California, New York and the District of Columbia. Francine D. Ward, Esq. is responsible for its content. Prior results and client reviews do not guarantee or predict a similar outcome in any future matter.</p>
    <p>${esc(site.legalName)} · ${esc(site.address.street)}, ${esc(site.address.city)}, ${site.address.region} ${site.address.postal} · <a href="tel:${site.phoneHref}">${site.phone}</a></p>

    <h2 id="not-advice">Not legal advice</h2>
    <p>Everything on this site — practice descriptions, Insights guides, legal blog articles, resources, checklists, worksheets and the IP &amp; AI Law Watch — is general information, offered for educational purposes only. It may be updated from time to time, but it isn't guaranteed to be complete or current; blog articles in particular reflect the law when each was written. Laws change, and every situation is different. Please don't act or refrain from acting based on this content without speaking with a lawyer licensed in your jurisdiction about your specific facts.</p>

    <h2 id="no-relationship">No attorney-client relationship</h2>
    <p>Reading this site, booking a consultation online, joining a Facebook community, asking for new-post emails, or contacting the office by phone, email or form does not create an attorney-client relationship. A relationship is formed only by a written engagement agreement. Until then, please don't send confidential or time-sensitive information.</p>

    <h2 id="jurisdiction">Jurisdiction</h2>
    <p>Francine D. Ward is admitted to practice law in California, New York and the District of Columbia. The office is based in California. Nothing on this site is intended to solicit clients in jurisdictions where she is not authorized to practice.</p>

    <h2 id="third-party">Third-party links &amp; services</h2>
    <p>The IP &amp; AI Law Watch summarizes publicly reported developments and links to the original publishers — courts, government agencies and news organizations — who own that content. Summaries are written for general audiences and may simplify complex proceedings; always consult the original source.</p>
    <p>Links to outside websites are provided for convenience only and are not endorsements. Some features live on other services: online booking is handled by Calendly, the communities are hosted on Facebook, videos play from YouTube, and reviews are posted on Yelp. The office has no control over those sites or their content and isn't responsible for them. If you visit or use them, you do so subject to their own terms and privacy policies — it's worth reading them, because they apply to you.</p>

    <h2 id="copyright">Copyright &amp; trademarks</h2>
    <p>The content of this website — including its text, articles, worksheets, images, photographs, video and audio, and their design and arrangement — is owned by Francine D. Ward, the ${esc(site.legalName)} or their licensors, and is protected by U.S. and international copyright, trademark and other intellectual property laws.</p>
    <p>You're welcome to use the site for your own personal, non-commercial purposes, including printing or downloading a reasonable number of pages and the free worksheets for your own use. Please don't modify the materials, remove copyright or trademark notices, or use photographs, illustrations, video or audio separately from the text that accompanies them. Any other use needs written permission (see below).</p>
    <p>Esteemable Acts®, the office's name and logo, and related names and logos are trademarks of Francine D. Ward and the ${esc(site.legalName)}. Other names and logos on this site belong to their respective owners.</p>

    <h2 id="permissions">Permissions &amp; reprints</h2>
    <p>Content on this website that belongs to Francine D. Ward or the ${esc(site.legalName)} — including legal material, self-help material and personal development publications — may be reprinted, reproduced, duplicated or displayed only with written consent, regardless of the amount. In some cases a fee may be charged. To protect the integrity of the work, approved content must be reprinted or reproduced unedited and attributed in the exact manner we prescribe.</p>
    <p>To request permission to use any content — articles, blog posts, essays, audio, images, photographs or any portion of them, in any format — <a href="${permissionHref}">email ${site.email}</a> with “Permission request” in the subject line and include:</p>
    <ul>
      <li>Your name</li>
      <li>Your mailing address</li>
      <li>Your phone number</li>
      <li>The reason for, and nature of, the use — where and how the material will appear</li>
      <li>The amount of material you'd like to use</li>
      <li>The exact material to be reproduced (for example, the title and link of the article, or the passage itself)</li>
    </ul>
    <p>Please allow approximately 10 business days for a reply after all of the required information has been received. Every effort is made to respond promptly and to accommodate special circumstances, but an immediate response can't be guaranteed — so please plan ahead, request permission with ample lead time, and wait the full 10 business days before following up.</p>
    <p>Event hosts and journalists: the bios and materials in the <a href="${ctx.root}speaking/#media-kit">media kit</a> are provided for promoting an event or story featuring Francine. For any other use, please ask first.</p>

    <h2 id="privacy">Privacy</h2>
    <p>This is a static website. It does not use analytics or advertising trackers and does not set cookies of its own. Fonts are hosted on this site, so no third-party font requests are made. Where a page includes a video, its preview image loads from YouTube's image servers, and the video itself loads from YouTube's privacy-enhanced player only when you press play. Booking a consultation takes you to Calendly's website, where Calendly's privacy policy applies.</p>
    <p>The Life Pillars worksheet saves your answers only in your own browser. If you use the contact or new-post email forms, your message is sent by email (or, if configured, through a form-processing service) solely so the office can respond to you. Your information is never sold.</p>
    <p>Questions about this notice? Email <a href="mailto:${site.email}">${site.email}</a>.</p>
    <p class="notice">Last updated ${updated}.</p>
  </div>
</section>
`,
};
