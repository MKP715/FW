import { html, subHero, lines, ctaBand } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";

const documents = [
  ["scroll", "Revocable living trust", "The heart of most California plans. Holds your assets during life and passes them privately, often without probate."],
  ["contract", "Pour-over will", "A safety net that catches any assets not formally transferred into your trust — and names guardians for minor children."],
  ["key", "Durable power of attorney", "Lets someone you trust handle finances if you can't. Without one, family may need a court guardianship."],
  ["heart", "Advance healthcare directive", "Names your healthcare agent and records your wishes for medical care."],
  ["shield", "HIPAA authorization", "Allows the people you choose to talk with your doctors and access your records."],
  ["home", "Deeds, assignments & certificate of trust", "The paperwork that actually funds your trust — real estate, accounts and personal property."],
];

const faqs = [
  ["Will or trust — which do I need?", "A will doesn't avoid probate; it simply directs the court on how to distribute your assets. A properly funded trust can often avoid probate entirely and keep your affairs private. Not everyone needs a trust-based plan — for some people a will-based plan is sufficient — and your consultation will help you decide."],
  ["What happens if I die without a will or trust?", "That's dying “intestate.” State law decides who inherits, and your assets go through probate — which may not match what you would have wanted."],
  ["Can I change my trust later?", "A revocable trust can generally be amended or revoked while you're alive and competent. Irrevocable trusts are harder to change, though some can be modified through techniques like decanting, depending on state law."],
  ["How long does probate take?", "Probate can take a minimum of six months to a year or more, even for simple estates — and it's a public process."],
  ["Does the new $15 million federal exemption mean I don't need a plan?", "Most families will never owe federal estate tax, but tax is only one reason to plan. Incapacity, guardianship for children, privacy, probate avoidance and control over your creative and digital assets matter at every income level."],
  ["How do I spot a “trust mill”?", "Be cautious of high-pressure seminars and one-size-fits-all trust packages sold by non-lawyers. Take your time, talk with family and advisors, and work with a licensed attorney."],
];

export default {
  path: "estate-planning/",
  section: "attorney-at-law/",
  title: "Estate Planning — Wills, Trusts & Legacy Planning",
  description: "Trust-based estate plans, wills, powers of attorney, healthcare directives and probate avoidance — plus planning for creators' intellectual property, digital assets and likeness.",
  theme: "law",
  priority: "0.8",
  render: (ctx) => html`
${subHero(ctx, {
  eyebrow: "Estate Planning",
  title: lines("Your wishes. Your family.|Your <em>legacy.</em>"),
  lead: "Trusts, wills, powers of attorney, healthcare directives and the documents that fund them — prepared with meticulous care so your wishes are carried out effectively and responsibly.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Estate Planning" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Start your plan <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="${ctx.root}resources/#estate-checklist">Free preparation checklist</a>`,
})}

<section class="section" id="plan">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">What's in a complete plan</p>
      <h2>Six documents that <em>protect everything.</em></h2>
    </div>
    <div class="grid grid-3" data-stagger="0.07">
      ${documents.map(([ic, t, d]) => html`<div class="card reveal"><span class="card-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`)}
    </div>
  </div>
</section>

<section class="section section-dark" id="creative-legacy">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Only here: where IP meets estate planning</p>
        <h2>Your creative work is part of your <em>estate.</em></h2>
        <p class="lead">Trusts can be funded with intangible property rights — copyrights, trademarks, trade secrets, patents and publicity rights. Few estate planners understand those assets. Francine has protected them for 35 years.</p>
      </div>
      <ul class="check-list reveal" style="--delay:.1s">
        <li><strong>Copyrights and royalties</strong> — books, music, art and courses that keep earning.</li>
        <li><strong>Trademarks and brands</strong> — who owns and maintains them when you can't.</li>
        <li><strong>Your name, voice and likeness</strong> — California's post-mortem right lasts 70 years, and AI makes it more valuable than ever.</li>
        <li><strong>Digital assets</strong> — accounts, archives, domains and cryptocurrency, including private keys.</li>
        <li><strong>A creative executor</strong> — someone who understands your work, named to manage it.</li>
      </ul>
    </div>
  </div>
</section>

<section class="section" id="trusts">
  <div class="container">
    <div class="split split-top">
      <div class="section-head reveal">
        <p class="eyebrow">Trusts, explained</p>
        <h2>Revocable or <em>irrevocable?</em></h2>
        <p class="lead">A trust is an arrangement where a trustee holds assets for beneficiaries according to your instructions. The right type depends on your goals.</p>
      </div>
      <div class="grid" data-stagger="0.08">
        <div class="card reveal"><h3>Revocable living trust</h3><p>You stay in control as trustee, can change it anytime, and your successor trustee steps in at incapacity or death — usually without probate.</p></div>
        <div class="card reveal"><h3>Irrevocable trusts</h3><p>Harder to change, but useful for specific goals such as asset protection, charitable giving and certain tax strategies.</p></div>
        <div class="card reveal"><h3>Special-purpose trusts</h3><p>Special needs, charitable, generation-skipping and testamentary trusts — and trusts designed to hold firearms lawfully under federal and California law.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="probate">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Probate</p>
        <h2>Why most families want to <em>avoid it.</em></h2>
        <p class="lead">Probate is the court-supervised process of gathering assets, paying debts and distributing what remains. It's public, it can be costly, and it can take a minimum of six months to a year or more — even for simple estates.</p>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p><strong>Probate is only needed for assets left in your individual name.</strong> Common ways to avoid it:</p>
        <ul class="check-list">
          <li>A properly funded revocable living trust — the most common approach</li>
          <li>Beneficiary designations on retirement accounts and insurance</li>
          <li>Payable-on-death and transfer-on-death designations</li>
          <li>Joint ownership, used carefully</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">The process</p><h2>Four steps to <em>peace of mind.</em></h2></div>
    <div class="steps">
      <div class="step"><h3>Complimentary consult</h3><p>A virtual conversation about your family, your assets and your wishes.</p></div>
      <div class="step"><h3>Gather</h3><p>A simple checklist helps you collect what's needed — no shoebox required.</p></div>
      <div class="step"><h3>Design &amp; draft</h3><p>Your plan is tailored, explained in plain English, and revised until it's right.</p></div>
      <div class="step"><h3>Sign &amp; fund</h3><p>Documents are signed properly and your trust is funded, so it actually works.</p></div>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="container container-narrow">
    <div class="section-head center reveal"><p class="eyebrow">Estate planning FAQ</p><h2>Honest answers to <em>common questions.</em></h2></div>
    <div class="accordion reveal">
      ${faqs.map(([q, a]) => html`<details class="acc-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${a}</p></div></details>`)}
    </div>
  </div>
</section>

${ctaBand(ctx, { title: "Let's put your wishes <em>in writing.</em>" })}
`,
};
