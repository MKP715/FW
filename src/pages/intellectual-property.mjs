import { html, subHero, lines, ctaBand } from "../lib/layout.mjs";

const areas = [
  {
    id: "trademark",
    title: "Trademarks",
    intro: "A trademark is legal protection for the distinctive signs — names, logos, slogans — you use in commerce to identify your goods or services. Federal registration gives you a legal presumption of ownership, nationwide protection and the right to sue in federal court.",
    items: [
      "Clearance searches before you invest in a name or logo",
      "USPTO applications, including intent-to-use filings — rights flow from use, so file early",
      "Choosing a strong mark: fanciful, arbitrary and suggestive marks beat descriptive ones",
      "Responses to USPTO office actions",
      "Section 8 declarations (years 5–6) and renewals (years 9–10, then every 10 years)",
      "Monitoring, cease-and-desist letters and infringement disputes — often resolved without court",
    ],
  },
  {
    id: "copyright",
    title: "Copyrights",
    intro: "Copyright protects original work the moment it's fixed in tangible form — books, art, music, photos, courses, software and more. Registration is what gives you the power to enforce it, and timely registration preserves statutory damages and attorney's fees.",
    items: [
      "Registration for books, manuscripts, artwork, music, photographs and courses",
      "Website content — the Copyright Office registers the copyrightable content on your site",
      "Registering AI-assisted work with proper disclosure of AI-generated material",
      "Joint ownership and collaboration agreements",
      "Infringement analysis, DMCA takedowns and fair-use questions",
    ],
  },
  {
    id: "publishing",
    title: "Publishing & Licensing",
    intro: "A book deal is a business deal. Misreading a single delivery clause can block publication or force you to repay your advance. Francine — herself a published author with a major New York house — reads every clause with you.",
    items: [
      "Publishing and book agreement negotiation",
      "Subsidiary rights: merchandising, serial, dramatic, audio, film, TV and foreign rights",
      "Delivery, warranty, accounting and royalty terms",
      "Out-of-print and reversion clauses so your rights come home",
      "Ghostwriter and work-made-for-hire agreements",
      "Licensing and royalty agreements for your content",
    ],
  },
  {
    id: "ai",
    title: "AI & Creative Rights",
    intro: "Who owns what a machine helps make? Can your work be used to train AI without permission? Courts and the U.S. Copyright Office are answering these questions right now — and the answers affect every creator.",
    items: [
      "Protecting AI-assisted work by documenting human authorship",
      "AI and digital-replica clauses in publishing, talent and employment contracts",
      "Training-data, licensing and opt-out questions",
      "Responding when your work, style or voice is copied by AI tools",
      "Practical AI-use policies for creative teams and small businesses",
    ],
    link: { href: "insights/do-you-own-what-ai-helps-you-make/", label: "Read: Do you own what AI helps you make?" },
  },
  {
    id: "publicity",
    title: "Right of Publicity",
    intro: "There is no federal right of publicity law — protection comes from the states, and California's is among the strongest, with a post-mortem right that lasts 70 years. Unlike privacy, it's a property right: it can be licensed, transferred and inherited.",
    items: [
      "Name, image, likeness and voice licensing",
      "Endorsement and influencer agreements",
      "Deepfakes and unauthorized digital replicas",
      "Planning for your publicity rights in your trust",
    ],
    link: { href: "insights/your-voice-your-likeness-your-legacy/", label: "Read: Your voice, your likeness, your legacy" },
  },
  {
    id: "contracts",
    title: "Contracts & Business",
    intro: "Always have a written agreement with everyone you hire to create for you. Clear contracts prevent the disputes that cost the most.",
    items: [
      "Contract review before you sign",
      "Independent-contractor and freelance agreements, including new state freelancer protections",
      "Terms of use, online terms and trial-offer language",
      "Guidance on forming the right business entity",
    ],
  },
  {
    id: "trade-secrets",
    title: "Trade Secrets",
    intro: "Recipes, client lists, processes, formulas — some of your most valuable assets can't be registered at all. They're protected by how carefully you guard them.",
    items: [
      "Nondisclosure and confidentiality agreements",
      "Employee and contractor IP-assignment provisions",
      "Reasonable-measures checklists for protecting confidential information",
    ],
  },
  {
    id: "advertising",
    title: "Advertising, Endorsements & Sweepstakes",
    intro: "Marketing is where good businesses get into trouble. The FTC expects advertisers and paid endorsers to disclose material connections — and to back up their claims.",
    items: [
      "FTC Endorsement Guides compliance for brands and influencers",
      "Avoiding false or misleading advertising claims",
      "“Risk-free” trials, auto-renewals and subscription terms",
      "Contest and sweepstakes rules",
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Online Business",
    intro: "If you collect customer data, privacy law applies to you. California's Consumer Privacy Act aims to keep companies from selling consumers' data without permission.",
    items: [
      "CCPA basics for small and growing businesses",
      "Privacy policies and terms of service",
      "Social media legal landmines — copyright, defamation and platform terms",
    ],
  },
];

export default {
  path: "intellectual-property/",
  section: "attorney-at-law/",
  title: "Intellectual Property — Trademark, Copyright, Publishing & AI",
  description: "Trademark registration and enforcement, copyright registration, publishing and licensing agreements, AI and creative rights, right of publicity, trade secrets, advertising and privacy.",
  theme: "law",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Intellectual Property",
  title: lines("Your ideas are|<em>assets.</em> Treat them that way."),
  lead: "Helping clients protect their valuable creative content through copyrights, and their logos, designs and business brands through trademarks — with carefully negotiated publishing and licensing agreements in between.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Intellectual Property" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Protect your work <span class="arrow">→</span></a>`,
})}

<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:220px 1fr;gap:clamp(24px,5vw,72px)" class="ip-layout">
      <nav class="toc" aria-label="On this page">
        ${areas.map((a) => html`<a href="#${a.id}">${a.title}</a>`)}
      </nav>
      <div class="feature-rows">
        ${areas.map(
          (a, i) => html`<div class="feature-row reveal" id="${a.id}" style="grid-template-columns:60px 1fr">
            <span class="fr-num">${String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>${a.title}</h3>
              <p class="mt-1">${a.intro}</p>
              <ul>${a.items.map((it) => `<li>${it}</li>`)}</ul>
              ${a.link ? html`<p class="mt-1 mb-0"><a class="link-arrow" href="${ctx.root}${a.link.href}">${a.link.label} <span class="arrow">→</span></a></p>` : ""}
            </div>
          </div>`
        )}
      </div>
    </div>
  </div>
</section>
<style>@media (max-width: 860px){ .ip-layout{ grid-template-columns:1fr !important } .ip-layout .toc{ position:static; display:flex; flex-wrap:wrap; gap:6px } .ip-layout .toc a{ border:1px solid var(--line); border-radius:999px; padding:6px 12px; font-size:.85rem } }</style>

<section class="section section-dark">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Stay current</p>
        <h2>AI is rewriting IP law <em>in real time.</em></h2>
        <p class="lead">Follow the court decisions, Copyright Office reports and new state laws that affect your work — explained in plain English.</p>
      </div>
      <div class="btn-row reveal" style="--delay:.1s;justify-content:flex-start">
        <a class="btn btn-gold" href="${ctx.root}news/?topic=ai-copyright">AI &amp; Copyright news <span class="arrow">→</span></a>
        <a class="btn btn-ghost-light" href="${ctx.root}resources/#trademark-checklist">Trademark checklist</a>
      </div>
    </div>
  </div>
</section>

${ctaBand(ctx, { title: "Let's protect your <em>brand and your work.</em>" })}
`,
};
