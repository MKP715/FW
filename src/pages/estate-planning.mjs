import { site } from "../site.mjs";
import { html, esc, subHero, lines, ctaBand, portrait } from "../lib/layout.mjs";
import { icon } from "../lib/icons.mjs";
import { posts } from "../lib/posts.mjs";
import { postCard } from "./blog.mjs";

// Republished posts are looked up by their (stable) original URL path.
const post = (path) => {
  const p = posts.find((x) => x.path === path);
  if (!p) console.warn(`[estate-planning] post not found: ${path}`);
  return p;
};
const EP = "legal-blog/estate-planning/";
// [path, optional shorter link label]
const links = (ctx, items, lead = "Read more:") => {
  const found = items.map(([path, label]) => [post(path), label]).filter(([p]) => p);
  return found.length
    ? html`<p class="acc-more"><strong>${lead}</strong> ${found.map(([p, label], i) => html`${i ? " · " : ""}<a href="${ctx.root}${p.path}">${esc(label || p.title)}</a>`)}</p>`
    : "";
};

// Francine's "Essential estate planning documents" list from the previous site.
const documents = [
  ["contract", "Last will & testament", "Directs how your assets are distributed and names an executor to carry out your wishes after you pass. It's also where you name guardians for minor children.", EP + "what-is-a-will/", "What is a Will?"],
  ["scroll", "Revocable living trust", "When properly funded, keeps your estate out of probate court, protects your privacy, and allows assets to transfer to loved ones quickly and smoothly.", EP + "what-is-a-trust-2/", "What is a Trust?"],
  ["key", "Durable power of attorney", "Names a trusted person to manage your finances and legal affairs if you become incapacitated — and stays in effect if you lose capacity.", EP + "what-is-a-power-of-attorney/", "What is a Power of Attorney?"],
  ["heart", "Healthcare directive", "States your medical wishes in writing so doctors and family know exactly what care you want if you cannot speak for yourself, and names your healthcare agent.", EP + "what-is-a-healthcare-directive/", "What is a Healthcare Directive?"],
  ["lock", "HIPAA authorization", "Allows the people you designate to access your medical information and communicate with your healthcare providers on your behalf.", EP + "what-is-a-hipaa-authorization/", "What is a HIPAA Authorization?"],
  ["shield", "Pour-over will", "Works alongside your trust as a safety net, so any assets not yet transferred into the trust are captured and distributed correctly.", EP + "what-is-a-will/", "How pour-over wills work"],
];

const reasons = [
  ["Plain language, no jargon", "I translate complex legal concepts into clear, everyday language so you always know exactly what your documents say and why."],
  ["Personalized plans, not cookie-cutter forms", "Your estate plan is custom-crafted to reflect your specific family, assets, and wishes — never a one-size-fits-all template."],
  ["You are more than a file number", "You will always speak directly with me, not a paralegal or assistant. I take the time to know you, your family, and your goals."],
  ["A relationship, not a transaction", "As your life changes, I am here to help you update and adapt your plan every step of the way."],
];

// From "How Much Does an Estate Plan Cost?" (2026).
const costFactors = [
  ["Trust-based or will-based", "Trust-based plans generally cost more because they include a living trust, funding guidance and additional documents that help avoid probate. Will-based plans cost less upfront but may lead to higher costs later due to probate."],
  ["Flat fee or hourly", "A flat fee gives you predictable pricing and a clear scope. Hourly billing can climb when an estate is complex or needs multiple revisions."],
  ["Complexity", "Multiple properties, blended families, business ownership and tax planning require more drafting and coordination."],
  ["Number of properties", "Additional properties almost always add cost — especially if they're outside your home state or outside the country."],
  ["One person or a couple", "A couple's plan needs coordinated documents for two people, often with mirrored provisions, but not always."],
];
const flatFee = [
  ["Predictability", "no surprise bills"],
  ["Clarity", "you know exactly what's included"],
  ["Efficiency", "thoughtful conversations without worrying about hourly charges"],
  ["Transparency", "you understand the value of each component"],
];

const worksheets = [
  {
    file: "HOW-TO-CREATE-AN-ESTATE-PLANNING-INVENTORY-1.pdf",
    icon: "check",
    title: "Estate planning inventory",
    meta: "PDF · 1 page",
    desc: "A sample inventory, laid out as a simple spreadsheet, of what your loved ones would need to find: your home, accounts, insurance, vehicles, valuables and more. Use the format or create your own — the key is to create the inventory and do it now.",
    read: EP + "an-estate-planning-inventory/",
  },
  {
    file: "Trust-Asset-Inventory.pdf",
    icon: "scroll",
    title: "Trust asset inventory worksheet",
    meta: "PDF · 6 pages",
    desc: "A section-by-section worksheet for real estate, financial and retirement accounts, insurance, personal property, intellectual property, business interests and digital assets — with space for key document locations and an annual review log.",
    read: EP + "what-are-trust-assets/",
  },
  {
    file: "Deed-Title-table.pdf",
    icon: "home",
    title: "Deed vs. title, side by side",
    meta: "PDF · 1 page",
    desc: "A one-page table that clears up a common confusion: a deed is the written document that transfers real property; title is the legal ownership itself.",
    read: EP + "what-is-a-deed/",
  },
];

// Francine's estate planning FAQ from the previous site, merged with this page's earlier
// questions. Answers are condensed from her own wording; each [path, label] adds a "Read more" link.
const faqGroups = [
  {
    label: "Getting started",
    items: [
      {
        q: "What is estate planning?",
        a: ["Estate planning is the process of deciding — in advance and in writing — how you want your assets distributed, who will manage your affairs, who will care for your minor children, and who will make medical and financial decisions on your behalf if you cannot make them yourself. Effective planning protects your family and avoids unnecessary conflict and expense."],
        more: [[EP + "what-is-estate-plan/"]],
      },
      {
        q: "Do I need an estate plan?",
        a: ["You are not legally required to have one. But without a plan, you leave decisions about your property to the government — and potentially to family members you don't choose. If you own property, have children, or care about who receives your assets, you need a plan."],
        more: [[EP + "preparing-for-estate-planning/"]],
      },
      {
        q: "Isn't estate planning only for the wealthy?",
        a: [
          "No. If you own anything — a home, a car, personal belongings, a bank account — you have an estate, and planning ensures those assets go where <em>you</em> want them to go.",
          "Tax is only one part of the picture. California doesn't impose an estate or inheritance tax for deaths on or after January 1, 2005, and federal estate tax can apply to large estates. Estate planning isn't about wealth — it's about protecting the people you love, preserving your legacy, and making sure your wishes are honored.",
        ],
        more: [[EP + "estate-planning-myths-2/"]],
      },
      {
        q: "What happens if I die without a will or trust?",
        a: ["That's called dying “intestate.” Your assets go through probate, and state law decides who inherits — a process called intestate succession. It typically starts with immediate family such as spouses, children, parents and siblings, who are not necessarily the people <em>you</em> would have chosen."],
        more: [[EP + "what-is-intestate-succession/"]],
      },
      {
        q: "Do I need a lawyer for estate planning?",
        a: [
          "You never need a lawyer for anything, if you are willing, able, and have the requisite skill to handle a matter yourself. The operative words are “requisite skill.” If you perform a task incorrectly, you pay a lot more than had you invested in a lawyer.",
          "Consulting a competent attorney is advisable for setting up trusts, minimizing taxes, navigating legal intricacies and unique family situations — and it gives you legal advice you can rely on. AI tools can help you get organized, but neither AI nor online forms can account for your unique circumstances.",
        ],
        more: [[EP + "choosing-a-lawyer/"], [EP + "ai-estate-planning/"]],
      },
    ],
  },
  {
    label: "Wills, trusts & key documents",
    items: [
      {
        q: "Will or trust — which do I need?",
        a: [
          "A will outlines how your assets should be distributed and who will care for minor children after your death, but it goes through probate — a public, court-supervised process. A trust is an arrangement in which a trustee manages your assets for your beneficiaries; it can take effect during your lifetime and, when properly funded, often avoids probate and keeps your affairs private.",
          "Not everyone needs a trust-based plan — for some people a will-based plan is sufficient. For California homeowners, a trust-based plan is often recommended to avoid probate. Your consultation will help you decide.",
        ],
        more: [[EP + "what-is-a-trust-2/"], [EP + "what-is-a-will/"], [EP + "wills-and-trusts-2/", "Wills and Trusts: A Quick Reference Guide"]],
      },
      {
        q: "Can I change my trust later?",
        a: ["Often, yes. A revocable trust can generally be amended, restated or revoked while you're alive and not incapacitated, as long as the trust document permits it; after your death it typically becomes irrevocable. An irrevocable trust can't simply be revoked, but some can be modified through a process called decanting, depending on your state's law. Because changes can carry tax and legal consequences, talk with an attorney first."],
        more: [[EP + "can-i-modify-amend-or-revoke-my-trust/", "Updating a Trust — What Does It Mean?"]],
      },
      {
        q: "What is a trustee?",
        a: ["A trustee is the person or institution responsible for managing the assets held in a trust, following the instructions in the trust document. The role carries significant legal responsibilities and requires careful judgment. Choosing the right trustee — and a successor trustee — is one of the most important decisions in your estate plan."],
        more: [[EP + "what-is-a-trustee/"], [EP + "how-to-choose-a-trustee/"], ["legal-blog/trustee-powers/", "Trustee Powers"]],
      },
      {
        q: "What is a beneficiary?",
        a: ["A beneficiary is a person or entity designated to receive assets, benefits, or funds from a will, trust, insurance policy, retirement account, or other financial instrument after the owner dies. Beneficiary designations on accounts and policies often override your will, so it's critical that they're up to date and consistent with your overall estate plan."],
        more: [],
      },
      {
        q: "What is a power of attorney?",
        a: ["A power of attorney authorizes someone you trust — your “agent” — to manage your financial affairs if you become incapacitated. A <em>durable</em> power of attorney remains in effect even if you lose mental capacity, making it one of the most critical documents in your plan. Without one, your family may have to go to court for the authority to act for you — a lengthy and expensive process."],
        more: [[EP + "what-is-a-power-of-attorney/"], [EP + "what-is-an-agent/"]],
      },
      {
        q: "What is a healthcare directive?",
        a: ["An advance healthcare directive (sometimes called a living will) documents your medical treatment wishes if you cannot speak for yourself, and designates a healthcare agent to make decisions on your behalf. Without one, these decisions may fall to family members who disagree — or to medical staff who don't know your values."],
        more: [[EP + "what-is-a-healthcare-directive/"]],
      },
      {
        q: "What is a HIPAA authorization?",
        a: ["A HIPAA authorization allows your designated representatives to access your protected health information. Without it, even your closest family members may be legally barred from discussing your medical situation with your healthcare providers — even in an emergency."],
        more: [[EP + "what-is-a-hipaa-authorization/"]],
      },
    ],
  },
  {
    label: "Incapacity & keeping your plan current",
    items: [
      {
        q: "What is incapacity?",
        a: ["Incapacity is a person's inability to make decisions because of a physical or mental condition. It can result from illness, injury, or cognitive decline, and it may require a designated person — such as your agent under a power of attorney, or a guardian — to make decisions on your behalf. With a plan in place, you, not the courts, choose who is in charge when you need help."],
        more: [[EP + "what-is-incapacity/", "Incapacity"]],
      },
      {
        q: "How often should I review my estate plan?",
        a: ["Generally every 2–4 years. Significant life events may shorten that time frame: marriage or divorce, the birth or adoption of a child, caring for a grandchild, the death or removal of a beneficiary, the death or change of a trustee or executor, moving to a new state, buying or selling real property, changes in your financial situation, or changes in the tax laws."],
        more: [["legal-blog/update-your-estate-plan/"]],
      },
    ],
  },
  {
    label: "Special situations",
    items: [
      {
        q: "Can I disinherit a family member?",
        a: [
          "In California, you generally have the right to disinherit anyone except a spouse, who has community property rights. But it must be done carefully and explicitly. California strongly protects “omitted” heirs: simply leaving a child out — or forgetting to update your plan after a child is born — may still entitle that child to a share.",
          "Name the person and state clearly that the omission is intentional. An unclear or outdated plan can invite legal challenges; an attorney can help you do this in a way that holds up.",
        ],
        more: [[EP + "disinherit-a-child/", "Disinherit a Child: Can You Do It in California?"]],
      },
      {
        q: "What is a pet trust?",
        a: ["A pet trust is a legally binding arrangement that provides for the care and financial support of your pet if you become incapacitated or pass away. It designates a caregiver, outlines your pet's care routine, and sets aside funds to cover their needs. All 50 states now recognize pet trusts. Simply mentioning your pet in your will isn't enough: a will can't require anyone to actually take your pet."],
        more: [[EP + "pet-trust-2/"]],
      },
      {
        q: "What happens to my digital assets?",
        a: ["Digital assets — cryptocurrency, online accounts, digital photos, and intellectual property — require specific planning. Without clear instructions and access credentials left in a secure, legally compliant way, they can be permanently lost; a lost cryptocurrency key can't be reset. Your estate plan should address digital assets explicitly and authorize your fiduciary to access and manage them."],
        more: [["legal-blog/crypto-and-estate-plan/"]],
      },
      {
        q: "How are firearms handled in my estate plan?",
        a: ["Firearms need special attention, because transferring them incorrectly — even to a family member — can violate federal and California law. Not all beneficiaries are legally permitted to own firearms, and weapons regulated under the National Firearms Act (NFA), such as suppressors or registered machine guns, have additional transfer requirements. A properly drafted trust can hold firearms and help ensure they pass to eligible beneficiaries without triggering an illegal transfer."],
        more: [],
      },
      {
        q: "What is a trust mill, and how do I avoid one?",
        a: [
          "A trust mill is a sales operation — often run by non-attorneys — that sells cookie-cutter estate planning documents at seminars, hotel luncheons or “free dinner” events, frequently while upselling high-commission annuities or insurance. The documents are often incomplete, poorly drafted, or never properly funded, so your family may still face probate even though you “have a trust.” In California, non-attorneys cannot draft legal documents or give legal advice.",
          "Avoid high-pressure sales, never provide sensitive information at a seminar, verify credentials with the State Bar of California, and work with a licensed attorney who takes time to understand your individual needs.",
        ],
        more: [[EP + "trust-mill-scams-2/"]],
      },
    ],
  },
];

const featured = [
  EP + "preparing-for-estate-planning/",
  EP + "what-is-a-trust-2/",
  EP + "estate-planning-myths-2/",
  EP + "avoid-probate-2/",
  EP + "trust-mill-scams-2/",
  EP + "disinherit-a-child/",
];

export default {
  path: "estate-planning/",
  section: "attorney-at-law/",
  title: "Estate Planning — Wills, Trusts & Legacy Planning",
  description: "Trust-based estate plans, wills, powers of attorney, healthcare directives and probate avoidance — plus an estate planning FAQ, free inventory worksheets, and planning for creators' intellectual property and digital assets.",
  theme: "law",
  priority: "0.8",
  render: (ctx) => {
    const legalInsights = site.communities.find((c) => c.name === "Legal Insights");
    const award = post("esteemable-acts/never-stop-trying-wealth-counsel-trailblazer-award/");
    const costPost = post(EP + "how-much-does-an-estate-plan-cost/");
    return html`
${subHero(ctx, {
  eyebrow: "Estate Planning",
  title: lines("Your wishes. Your family.|Your <em>legacy.</em>"),
  lead: "Preparing for the inevitable is an act of love. Trusts, wills, powers of attorney and healthcare directives — explained in plain language and tailored to your family, your assets and your wishes.",
  crumbs: [{ label: "Law Office", href: "attorney-at-law/" }, { label: "Estate Planning" }],
  actions: html`<a class="btn btn-gold" href="${ctx.root}contact/">Start your plan <span class="arrow">→</span></a><a class="btn btn-ghost-light" href="#faq">Estate planning FAQ</a>`,
})}

<section class="section" id="intro">
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">From Francine</p>
        <h2>Almost always <em>preventable.</em></h2>
        <p class="lead">Most people don't realize how exposed they are until something forces them to find out. An outdated will that no longer reflects your life. A family left guessing — or fighting — about what you would have wanted. Assets frozen in probate while your loved ones wait, grieve, and pay.</p>
        <p>These moments create chaos, conflict, and unnecessary pain, and they are almost always preventable. I built my practice to prevent those moments. With 35 years of experience as an attorney and a J.D. from Georgetown University Law Center, I have spent my career helping people protect what matters most: their families, their legacies, and the businesses they've worked hard to build.</p>
        <p>If you are ready to stop hoping things will work themselves out, this is the place to start.</p>
        <p class="muted mb-0"><em>— Francine D. Ward, Esq.</em></p>
      </div>
      <blockquote class="big-quote reveal" style="--delay:.1s"><span class="q-mark" aria-hidden="true">“</span>Estate planning isn't about death. It's about love, clarity, and the dignity of leaving things the way you intended — not the way the state decides.<cite>Francine D. Ward</cite></blockquote>
    </div>
  </div>
</section>

<section class="section section-sand" id="plan">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Essential estate planning documents</p>
      <h2>The core of every <em>solid plan.</em></h2>
      <p class="lead">The right documents depend on your state, your property and the size of your estate. For California homeowners, a trust-based estate plan is often recommended to avoid the probate process.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.07">
      ${documents.map(([ic, t, d, path, label]) => {
        const p = post(path);
        return html`<div class="card reveal"><span class="card-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p>${p ? html`<a class="card-foot link-arrow" href="${ctx.root}${p.path}">${label} <span class="arrow">→</span></a>` : ""}</div>`;
      })}
    </div>
    <div class="callout reveal mt-2" style="background:var(--paper)">
      <p class="mb-0"><strong>A trust only works if it's funded.</strong> Assets must be titled correctly and beneficiary designations updated. That's why a complete trust-based plan generally also includes an assignment of assets, a certificate of trust, trust funding guidance and the deed for your primary residence.</p>
      ${links(ctx, [[EP + "what-are-trust-assets/"], [EP + "what-is-a-deed/"]], "Learn more:")}
    </div>
  </div>
</section>

<section class="section section-dark" id="creative-legacy">
  <div class="aurora" aria-hidden="true" style="opacity:.4"><span></span><span></span><span></span><span></span></div>
  <div class="container">
    <div class="split">
      <div class="reveal">
        <p class="eyebrow">Where IP meets estate planning</p>
        <h2>Your creative work is part of your <em>estate.</em></h2>
        <p class="lead">A trust can be funded with intangible property rights — copyrights, trademarks, trade secrets, patents and publicity rights. Francine brings 35 years of experience in business and intellectual property law to planning for them alongside everything else you own.</p>
        ${(() => {
          const p = post("legal-blog/estate-planning-for-artists/");
          return p ? html`<a class="link-arrow" href="${ctx.root}${p.path}">Read: Estate Planning for Artists <span class="arrow">→</span></a>` : "";
        })()}
      </div>
      <ul class="check-list reveal" style="--delay:.1s">
        <li><strong>Copyrights and royalties</strong> — your work has value whether or not it earns much today. Registration is required to sue for infringement, including when your beneficiaries need to defend your rights.</li>
        <li><strong>Trademarks and brands</strong> — who owns and maintains them when you can't.</li>
        <li><strong>Your name, voice and likeness</strong> — California recognizes a 70-year postmortem right of publicity, and New York's now extends 40 years after death.</li>
        <li><strong>Digital assets</strong> — email, social media, cloud storage, online business assets and cryptocurrency, including the private keys that unlock it.</li>
        <li><strong>Records and agreements</strong> — registrations, licenses and income statements kept where your beneficiaries can find them.</li>
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
        <p class="lead">A trust is an arrangement where a trustee holds and manages assets for beneficiaries according to your instructions. The right type depends on your goals.</p>
        ${links(ctx, [[EP + "what-is-a-trust-2/"], ["legal-blog/revocable-trust-vs-irrevocable-trust-which-is-best-for-you/", "Revocable vs. Irrevocable Trust"]], "Read:")}
      </div>
      <div class="grid" data-stagger="0.08">
        <div class="card reveal"><h3>Revocable living trust</h3><p>While you're alive and competent you can be your own trustee and change or cancel the trust. Your successor trustee steps in at incapacity or death and carries out your instructions without needing court approval.</p></div>
        <div class="card reveal"><h3>Irrevocable trusts</h3><p>Generally can't be changed once signed, but often used for tax planning, asset protection and long-term gifting — and some can be modified through decanting.</p></div>
        <div class="card reveal"><h3>Special-purpose trusts</h3><p>Special needs, pet, charitable, generation-skipping and testamentary trusts — and trusts designed to hold firearms so they pass only to eligible beneficiaries.</p></div>
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
        <p class="lead">Probate is the court-supervised process of validating a will, gathering assets, paying debts and taxes, and distributing what remains. It's public, it can be costly, and it can take a minimum of six months to a year or more — even for simple estates.</p>
        ${links(ctx, [[EP + "what-is-probate/"], [EP + "avoid-probate-2/"]], "Read:")}
      </div>
      <div class="reveal" style="--delay:.1s">
        <p><strong>Probate is only needed for assets left in your individual name.</strong> Common ways to avoid it:</p>
        <ul class="check-list">
          <li>A properly funded revocable living trust — the most common approach</li>
          <li>Beneficiary designations on retirement accounts, life insurance and annuities</li>
          <li>Payable-on-death and transfer-on-death designations</li>
          <li>Joint ownership with right of survivorship, used carefully</li>
        </ul>
        <p class="muted mt-1 mb-0">Probate isn't always the enemy: court oversight can help when family conflict is expected or a will's validity may be challenged.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="why">
  <div class="container">
    <div class="split split-top">
      <div style="max-width:440px;justify-self:center;width:100%">
        <div class="reveal reveal-left">${portrait(ctx, { file: "francine-library.jpg", alt: "Francine D. Ward in glasses, resting her chin on her hand, in a library" })}</div>
        <div class="card reveal mt-2" style="align-items:center;text-align:center">
          <img src="${ctx.root}assets/img/award-trailblazer-2021.webp" alt="WealthCounsel Trailblazer Award 2021 badge" width="520" height="397" loading="lazy" style="width:150px;height:auto;margin-bottom:14px">
          <h3 style="font-size:1.25rem">WealthCounsel Trailblazer Award, 2021</h3>
          <p>Given to a member of WealthCounsel who strives to impact their community by sharing their passion for knowledge, excellence, and education.</p>
          ${award ? html`<a class="card-foot link-arrow" href="${ctx.root}${award.path}">Francine on receiving the award <span class="arrow">→</span></a>` : ""}
        </div>
      </div>
      <div class="reveal" style="--delay:.1s">
        <p class="eyebrow">Why work with Francine</p>
        <h2>An attorney who listens, explains, and <em>truly cares.</em></h2>
        <p class="lead">“My approach is intentionally different. I listen deeply. I ask the questions most people avoid. I help you see the bigger picture — not just what documents you need, but why you need them, how they work together, and how they protect you in real life.”</p>
        <ul class="check-list mt-2">
          ${reasons.map(([t, d]) => html`<li><strong>${t}.</strong> ${d}</li>`)}
        </ul>
        <p class="mt-2">Francine is not a trust mill or a document factory. There is no “one size fits all” estate plan — customization is key. Not everyone needs a complicated trust with sub-trusts; for others, a simple will may be all that's required. Whether you need a revocable or irrevocable trust, a pet trust or a special needs trust, the options are always discussed, so you understand them and can decide what works best for you.</p>
        <figure class="card review" style="margin:2rem 0 0">
          <div class="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“It was time, at long last, to put together a living trust. … Of particular appreciation was her gentle guidance, ensuring a detailed, tailored finished product. Bottom line; very professional, personally pleasant engagements, and absolutely pain free.”</blockquote>
          <figcaption class="t-meta"><span class="t-avatar" aria-hidden="true">J</span><span><span class="t-name">John R.</span><br><span class="t-role">Living trust client</span></span></figcaption>
        </figure>
      </div>
    </div>
    <p class="notice">Client reviews are excerpts shared by clients and are not a guarantee or prediction of the outcome of any future matter. <a href="${ctx.root}client-reviews/">More client reviews</a>.</p>
  </div>
</section>

<section class="section section-dark">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">The process</p><h2>Four steps to <em>peace of mind.</em></h2></div>
    <div class="steps">
      <div class="step"><h3>Complimentary consult</h3><p>A virtual conversation about your family, your assets and your wishes.</p></div>
      <div class="step"><h3>Gather</h3><p>Start an inventory of what you own with the free worksheets below. You can always add to it — just start.</p></div>
      <div class="step"><h3>Design &amp; draft</h3><p>Your plan is tailored to your family and explained in plain language, so you know what your documents say and why.</p></div>
      <div class="step"><h3>Sign &amp; fund</h3><p>Your documents are signed properly, the deed for your primary residence is prepared, and you get guidance for funding the rest of your trust.</p></div>
    </div>
    ${(() => {
      const p = post(EP + "how-to-prepare-for-the-meeting-with-your-lawyer/");
      return p ? html`<p class="mt-3 mb-0 reveal"><a class="link-arrow" href="${ctx.root}${p.path}">How to prepare for the meeting with your lawyer <span class="arrow">→</span></a></p>` : "";
    })()}
  </div>
</section>

<section class="section section-sand" id="worksheets">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Free worksheets</p>
      <h2>Get organized <em>before we meet.</em></h2>
      <p class="lead">If you become incapacitated or pass away, will your loved ones know where to find your assets? An inventory makes life easier for them — and it's an excellent first step toward creating your plan.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.08">
      ${worksheets.map((w) => {
        const p = post(w.read);
        return html`<div class="card reveal">
          <span class="card-icon">${icon(w.icon)}</span>
          <p class="news-meta">${w.meta}</p>
          <h3>${w.title}</h3>
          <p>${w.desc}</p>
          <div class="card-foot btn-row">
            <a class="btn btn-sm btn-accent" href="${ctx.root}assets/downloads/${w.file}" download>${icon("download")} Download</a>
            ${p ? html`<a class="link-arrow" href="${ctx.root}${p.path}">Read the article <span class="arrow">→</span></a>` : ""}
          </div>
        </div>`;
      })}
    </div>
    <p class="mt-2 mb-0 reveal"><a class="link-arrow" href="${ctx.root}resources/">More free checklists &amp; resources <span class="arrow">→</span></a></p>
  </div>
</section>

<section class="section" id="cost">
  <div class="container">
    <div class="split split-top">
      <div class="reveal">
        <p class="eyebrow">What it costs</p>
        <h2>What does an estate plan <em>cost?</em></h2>
        <p class="lead">The cost of estate planning varies because every person and situation is different. No two individuals are the same, and no two families have the same goals.</p>
        <h3 class="mt-2" style="font-size:1.3rem">What affects the cost</h3>
        <ul class="check-list">
          ${costFactors.map(([t, d]) => html`<li><strong>${t}.</strong> ${d}</li>`)}
        </ul>
      </div>
      <div class="reveal" style="--delay:.1s">
        <figure class="callout" style="margin:0 0 32px">
          <blockquote style="margin:0 0 12px;font-family:var(--font-display);font-size:1.25rem;line-height:1.45;color:var(--ink)">“With my clients, I usually include in my flat fee the primary residence. I prepare the deeds and the supplemental recording documents required by the county. This is important for my clients, because they want their home to be in the trust.”</blockquote>
          <figcaption><strong>— Francine D. Ward</strong></figcaption>
        </figure>
        <h3 style="font-size:1.3rem">Why flat-fee pricing works well</h3>
        <ul class="check-list">
          ${flatFee.map(([t, d]) => html`<li><strong>${t}</strong> — ${d}</li>`)}
        </ul>
        ${costPost ? html`<p class="mt-2 mb-0"><a class="link-arrow" href="${ctx.root}${costPost.path}">Read: How Much Does an Estate Plan Cost? <span class="arrow">→</span></a></p>` : ""}
      </div>
    </div>
  </div>
</section>

<section class="section section-sand" id="faq">
  <div class="container container-narrow">
    <div class="section-head center reveal">
      <p class="eyebrow">Estate planning FAQ</p>
      <h2>Honest answers to <em>common questions.</em></h2>
    </div>
    ${faqGroups.map(
      (g, gi) => html`<h3 class="eyebrow${gi ? " mt-3" : ""}">${g.label}</h3>
    <div class="accordion reveal">
      ${g.items.map(
        (f) => html`<details class="acc-item"><summary>${f.q}<span class="plus" aria-hidden="true"></span></summary><div class="acc-body">${f.a.map((para) => html`<p>${para}</p>`)}${links(ctx, f.more)}</div></details>`
      )}
    </div>`
    )}
    <p class="notice">These answers are general information, largely about California law, and are not legal advice. Every family's situation is different — bring your questions to a consultation.</p>
  </div>
</section>

<section class="section" id="articles">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">From the legal blog</p>
      <h2>Keep <em>learning.</em></h2>
      <p class="lead">Plain-English articles by Francine on trusts, wills, probate and the decisions that shape a plan.</p>
    </div>
    <div class="grid grid-3" data-stagger="0.06">
      ${featured.map(post).filter(Boolean).map((p) => postCard(p, ctx))}
    </div>
    <div class="btn-row mt-2 reveal">
      <a class="btn btn-ghost" href="${ctx.root}legal-blog/estate-planning/">All estate planning articles <span class="arrow">→</span></a>
      ${legalInsights ? html`<a class="link-arrow" href="${legalInsights.href}" target="_blank" rel="noopener">Join the Legal Insights community on Facebook ${icon("arrowUpRight")}</a>` : ""}
    </div>
  </div>
</section>

${ctaBand(ctx, {
  title: "Your estate plan starts with <em>one conversation.</em>",
  lead: "Whether you are starting from scratch or updating an existing plan, Francine will guide you through every step — clearly, personally, and without the legal jargon. Appointments are virtual, and your initial consultation is always complimentary.",
})}
`;
  },
};
