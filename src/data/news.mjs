// IP & AI Law Watch — curated news items, newest first.
// To add a story: copy an entry, give it a unique id, and run `npm run build`.
// `approx: true` shows the month only (use when the exact day is uncertain).
// `featured: true` puts the story in the spotlight at the top of /news/.

export const categories = [
  { slug: "ai-copyright", label: "AI & Copyright" },
  { slug: "ai-music", label: "AI & Music" },
  { slug: "right-of-publicity", label: "Right of Publicity" },
  { slug: "trademark", label: "Trademark & USPTO" },
  { slug: "estate-planning", label: "Estate Planning" },
  { slug: "privacy-tech", label: "Privacy & Tech" },
];

const items = [
  {
    id: "sdny-ai-music-streaming-fraud-sentence",
    date: "2026-10-06",
    featured: true,
    cat: "ai-music",
    title: "North Carolina man sentenced to 18 months in first-of-its-kind AI music streaming fraud case",
    source: "U.S. Attorney’s Office, Southern District of New York",
    url: "https://www.justice.gov/usao-sdny/pr/north-carolina-man-sentenced-18-months-prison-super-intelligence-assisted-music",
    summary:
      "Michael Smith of Cornelius, N.C., was sentenced by U.S. District Judge John G. Koeltl to 18 months in prison and two years of supervised release, and ordered to forfeit more than $8 million. Smith had pleaded guilty to conspiracy to commit wire fraud for using thousands of automated bot accounts to stream AI-generated songs on major platforms from 2017 to 2024, collecting more than $8 million in royalties.",
    why: "Streaming royalties are paid from a shared pool, so fake streams take money directly from real artists and songwriters. Smith was punished for the fraud — not for making music with AI.",
  },
  {
    id: "thomson-reuters-v-ross-third-circuit",
    date: "2026-09-29",
    approx: true,
    cat: "ai-copyright",
    title: "Third Circuit affirms: training ROSS’s AI on Westlaw headnotes was not fair use",
    source: "The National Law Review",
    url: "https://natlawreview.com/article/first-federal-appellate-fair-use-ruling-ai-training-rejects-non-generative-ais-use",
    summary:
      "In Thomson Reuters v. ROSS Intelligence, the Third Circuit affirmed a 2025 ruling that ROSS infringed by using Westlaw headnotes to train a competing, non-generative legal-research AI. The court found the headnotes copyrightable and ROSS’s commercial use harmful to Westlaw’s market — including the emerging market for licensing AI training data. Commentators call it the first federal appellate fair-use ruling on AI training, though the court set generative-AI cases aside.",
    why: "It’s the first appeals-court signal that copying content to train a competing AI product can fail fair use — and that licensing your content as training data is a real market worth protecting.",
  },
  {
    id: "sony-umg-v-suno-v6",
    date: "2026-09-18",
    cat: "ai-music",
    title: "Sony Music and Universal sue Suno again, targeting its new v6 model",
    source: "Variety",
    url: "https://variety.com/2026/music/news/sony-music-universal-music-sue-suno-label-backed-model-1236866921/",
    summary:
      "Sony Music and Universal Music Group filed a second copyright suit against AI music generator Suno, aimed at its newly launched v6 model. The complaint alleges v6 was trained partly on outputs of Suno’s earlier, allegedly infringing models — what the labels call “model laundering.” Suno says v6 was trained from scratch without their recordings. The labels’ original 2024 case remains pending.",
    why: "The case tests whether an AI company can escape an infringement claim by training a new model on an old model’s output — a question that matters to anyone licensing or using AI music tools.",
  },
  {
    id: "nyt-v-openai-summary-judgment",
    date: "2026-09-08",
    approx: true,
    cat: "ai-copyright",
    title: "NYT v. OpenAI & Microsoft reaches summary judgment as DOJ backs AI fair-use defense",
    source: "Axios",
    url: "https://axios.com/2026/09/08/nyt-openai-microsoft-copyright-lawsuit",
    summary:
      "Summary-judgment briefing is under way in The New York Times’ copyright suit against OpenAI and Microsoft, part of a consolidated proceeding before U.S. District Judge Sidney Stein in Manhattan. The Justice Department filed a non-binding statement of interest arguing that training large language models on copyrighted works is fair use; the newspaper plaintiffs asked the court to give it no weight.",
    why: "This is the highest-profile test of whether AI companies can train on journalism without a license — and the federal government taking a side is unusual.",
  },
  {
    id: "bartz-v-anthropic-final-approval",
    date: "2026-07-20",
    cat: "ai-copyright",
    title: "Court grants final approval to $1.5 billion authors’ settlement in Bartz v. Anthropic",
    source: "The Authors Guild",
    url: "https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/",
    summary:
      "A federal court in the Northern District of California granted final approval to the $1.5 billion class settlement resolving claims that books were downloaded from pirate libraries to build an AI training library. The settlement pays roughly $3,000 per work for about 480,000 works and requires destruction of the pirated files. It followed a 2025 ruling that training on lawfully acquired books was fair use, but keeping a library of pirated copies was not.",
    why: "How an AI company acquires its training data — not just how it uses it — can create billion-dollar liability. It’s also a powerful reminder of why registering your copyrights matters.",
  },
  {
    id: "no-fakes-act-senate-judiciary",
    date: "2026-06-18",
    cat: "right-of-publicity",
    title: "Revised NO FAKES Act clears Senate Judiciary Committee",
    source: "Office of U.S. Sen. Marsha Blackburn",
    url: "https://www.blackburn.senate.gov/2026/6/blackburn-coons-bipartisan-bill-to-protect-individuals-and-creators-from-deepfakes-passes-senate-judiciary-committee",
    summary:
      "The Senate Judiciary Committee approved a revised, bipartisan NO FAKES Act by voice vote. The bill would create a federal right to control digital replicas of a person’s voice and visual likeness, with a notice-and-takedown system, counter-notices, exemptions for news and satire, and post-mortem rights of up to 70 years. It still needs a full Senate vote and House action.",
    why: "If enacted, performers, creators and families would gain a nationwide way to stop unauthorized AI voice and likeness clones — and it would change how state laws like California’s apply.",
  },
  {
    id: "ftc-take-it-down-enforcement",
    date: "2026-05-19",
    cat: "privacy-tech",
    title: "FTC begins enforcing the TAKE IT DOWN Act’s 48-hour removal rule",
    source: "Federal Trade Commission",
    url: "https://www.ftc.gov/news-events/news/press-releases/2026/05/ftc-begins-enforcing-take-it-down-act",
    summary:
      "The TAKE IT DOWN Act, signed in May 2025, made it a federal crime to publish nonconsensual intimate images — real or AI-generated — and gave platforms a year to build a removal process. As of May 19, 2026, covered platforms must remove such images and known copies within 48 hours of a valid request. The FTC launched a complaint portal and sent compliance letters to major platforms.",
    why: "Victims of deepfake imagery now have a federal takedown right with a deadline, and any business that hosts user content needs a compliant removal process.",
  },
  {
    id: "val-kilmer-ai-estate-consent",
    date: "2026-04-16",
    cat: "estate-planning",
    title: "Val Kilmer returns via AI in a new film — with his estate’s consent",
    source: "ABC7",
    url: "https://abc7.com/post/val-kilmer-returns-ai-deep-grave-trailer/18897318/",
    summary:
      "The trailer for the historical drama “As Deep as the Grave” features an AI recreation of the late Val Kilmer, who had been cast years earlier but was too ill to film. The filmmakers said his estate approved the project, supplied materials and was compensated, and that the production followed SAG-AFTRA standards.",
    why: "Your voice and likeness can outlive you. A modern estate plan should say who controls them, and on what terms.",
  },
  {
    id: "cox-v-sony-supreme-court",
    date: "2026-03-25",
    cat: "ai-copyright",
    title: "Supreme Court narrows contributory copyright liability in Cox v. Sony",
    source: "Supreme Court of the United States",
    url: "https://www.supremecourt.gov/opinions/25pdf/24-171_bq7d.pdf",
    summary:
      "The Court reversed a roughly $1 billion jury verdict against internet provider Cox Communications, holding that a provider is not contributorily liable merely for continuing to serve subscribers it knows are infringing. Liability requires culpable intent — such as inducing infringement or offering a service tailored to it.",
    why: "It’s now harder to hold internet and tech platforms — including AI services — responsible for their users’ infringement, which changes enforcement strategy for creators.",
  },
  {
    id: "thaler-v-perlmutter-cert-denied",
    date: "2026-03-11",
    featured: true,
    cat: "ai-copyright",
    title: "Supreme Court denies artificial intelligence authorship claim for artwork copyright",
    source: "National Constitution Center",
    url: "https://constitutioncenter.org/blog/supreme-court-denies-artificial-intelligence-authorship-claim-for-artwork-copyright",
    summary:
      "On March 2, 2026, the Supreme Court declined to hear Thaler v. Perlmutter, leaving in place the D.C. Circuit’s unanimous 2025 ruling that the Copyright Act requires a human author. Stephen Thaler had sought to register “A Recent Entrance to Paradise,” an image generated by his AI system, listing the machine as its sole author. The D.C. Circuit noted that works made by humans who use AI can still be registered.",
    why: "Purely AI-generated work can’t be registered for copyright in the U.S. If you create with AI, document your own creative choices — selection, arrangement, editing — because that’s what protection rests on.",
  },
  {
    id: "heppner-ai-chats-not-privileged",
    date: "2026-02-17",
    cat: "privacy-tech",
    title: "Federal judge: a defendant’s chats with a consumer AI chatbot aren’t privileged",
    source: "Debevoise & Plimpton",
    url: "https://www.debevoise.com/insights/publications/2026/02/update-judge-rakoff-issues-written-opinion-that-ai",
    summary:
      "In United States v. Heppner (S.D.N.Y.), Judge Jed Rakoff issued a written opinion holding that a criminal defendant’s conversations with a consumer AI chatbot were not protected by attorney-client privilege or the work-product doctrine.",
    why: "Typing your legal situation into a public AI tool is not the same as talking to your lawyer. Those conversations may be discoverable — talk to counsel first.",
  },
  {
    id: "ny-synthetic-performer-law",
    date: "2025-12-11",
    cat: "right-of-publicity",
    title: "New York enacts AI “synthetic performer” ad disclosure and post-mortem likeness laws",
    source: "Office of New York Governor Kathy Hochul",
    url: "https://www.governor.ny.gov/news/governor-hochul-signs-legislation-protect-consumers-and-boost-ai-transparency-film-industry",
    summary:
      "Governor Hochul signed legislation requiring advertisers to disclose when ads use AI-generated “synthetic performers,” with civil penalties for violations. She also signed a law requiring consent from heirs or executors before a deceased person’s name, image or likeness is used commercially.",
    why: "Advertisers reaching New Yorkers must label AI “people,” and estates gain more control over a loved one’s likeness after death.",
  },
  {
    id: "uspto-ai-inventorship-guidance",
    date: "2025-11-28",
    cat: "trademark",
    title: "USPTO rescinds 2024 AI inventorship guidance and issues a revised standard",
    source: "Federal Register",
    url: "https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions",
    summary:
      "The U.S. Patent and Trademark Office published revised inventorship guidance for AI-assisted inventions, rescinding its 2024 guidance. AI systems cannot be named as inventors and are treated as tools; the same inventorship standard applies whether or not AI was used.",
    why: "Applicants who use AI must be able to show that a human conceived the invention — the same human-centered principle that runs through copyright law.",
  },
  {
    id: "warner-suno-settlement",
    date: "2025-11-25",
    cat: "ai-music",
    title: "Warner Music Group settles with Suno and partners on licensed AI music",
    source: "Rolling Stone",
    url: "https://www.rollingstone.com/music/music-features/suno-warner-music-group-AI-music-settlement-lawsuit-1235472868/",
    summary:
      "WMG settled its 2024 copyright suit against Suno and formed a partnership under which Suno will launch licensed models and add download limits. The deal includes opt-in controls for artists and songwriters over their names, images, likenesses, voices and compositions.",
    why: "It points toward a future where AI music is licensed and artists opt in — affecting how musicians are paid and whether they can control voice cloning.",
  },
  {
    id: "getty-v-stability-uk",
    date: "2025-11-04",
    cat: "ai-copyright",
    title: "UK High Court largely rejects Getty Images’ claims against Stability AI",
    source: "Courts and Tribunals Judiciary (UK)",
    url: "https://www.judiciary.uk/judgments/getty-images-v-stability-ai/",
    summary:
      "In Getty Images v. Stability AI, the High Court rejected Getty’s secondary copyright claim, finding that Stable Diffusion’s model weights do not store copies of Getty’s works. Getty succeeded only on a narrow trademark point about watermarks in some older outputs. Getty had dropped its main training claims during trial, so whether AI training itself infringes was not decided.",
    why: "A leading non-U.S. ruling that an AI model isn’t itself an “infringing copy” — and a reminder that where training happens, and what evidence you have, can decide these cases.",
  },
  {
    id: "umg-udio-settlement",
    date: "2025-10-29",
    cat: "ai-music",
    title: "Universal Music settles with Udio and plans a licensed AI music platform",
    source: "Music Business Worldwide",
    url: "https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform",
    summary:
      "UMG and AI song generator Udio announced a settlement and new licenses for recorded music and publishing, with plans for a subscription creation-and-streaming platform. UMG said artists would be paid both for training and for fan creations using their work.",
    why: "Major labels are turning lawsuits into licensing deals — setting expectations for how AI companies must pay rights holders.",
  },
  {
    id: "sora-mlk-estate",
    date: "2025-10-16",
    cat: "estate-planning",
    title: "OpenAI pauses Sora videos of Martin Luther King Jr. at his estate’s request",
    source: "TechCrunch",
    url: "https://techcrunch.com/2025/10/16/openai-pauses-sora-video-generations-of-martin-luther-king-jr",
    summary:
      "After users created disrespectful AI videos of Dr. King with the Sora app, OpenAI paused generations of his likeness in a joint statement with the King estate, and said representatives of other historical figures can ask for their likenesses to be excluded.",
    why: "Families and estates increasingly have to police a loved one’s likeness online. Naming who controls those rights in your estate plan matters.",
  },
  {
    id: "california-sb-683",
    date: "2025-10-10",
    cat: "right-of-publicity",
    title: "California adds fast injunctive relief and digital replicas to its right of publicity statute",
    source: "Hunton Andrews Kurth",
    url: "https://www.hunton.com/privacy-and-cybersecurity-law-blog/california-adds-injunctive-relief-to-its-right-of-publicity-statute-and-extends-liability-to-digital-replicas",
    summary:
      "Governor Newsom signed SB 683, amending California Civil Code § 3344 to expressly allow injunctions and temporary restraining orders against unauthorized use of a person’s name, voice or likeness — and to include digital replicas in the definitions of voice and likeness.",
    why: "Californians whose identity is misused, including through AI deepfakes, can seek quick court-ordered takedowns — not just money damages later.",
  },
  {
    id: "obbba-estate-tax-exemption",
    date: "2025-07-04",
    cat: "estate-planning",
    title: "New law sets a permanent $15 million estate and gift tax exemption starting in 2026",
    source: "Internal Revenue Service",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax",
    summary:
      "Legislation signed July 4, 2025 raised the federal basic exclusion amount to $15 million per person for 2026, with inflation indexing resuming in 2027 and no scheduled sunset. The generation-skipping transfer exemption is also $15 million, and the annual gift exclusion is $19,000 for 2026.",
    why: "The feared 2026 drop in the exemption didn’t happen, so plans built around it may deserve a review. Wills, trusts, incapacity planning and digital-asset instructions still matter for reasons that have nothing to do with tax.",
  },
  {
    id: "kadrey-v-meta-fair-use",
    date: "2025-06-25",
    cat: "ai-copyright",
    title: "Judge rules Meta’s AI training on authors’ books was fair use — on that record",
    source: "Perkins Coie",
    url: "https://perkinscoie.com/insights/update/court-sides-meta-fair-use-and-dmca-questions-leaves-door-open-future-challenges",
    summary:
      "Judge Vince Chhabria granted Meta summary judgment, finding its use of authors’ books to train Llama “highly transformative” and that the authors had not shown market harm. He stressed the ruling was narrow, warning that AI training that significantly harms the market for original works would be hard to defend as fair use.",
    why: "Together with other 2025 rulings, it suggests AI training may be fair use but can lose on evidence of market harm. Creators’ records of lost sales and licensing matter.",
  },
  {
    id: "disney-universal-v-midjourney",
    date: "2025-06-11",
    cat: "ai-copyright",
    title: "Disney and Universal sue Midjourney in the first major studio suit against an AI image generator",
    source: "NBC News",
    url: "https://www.nbcnews.com/business/business-news/disney-universal-sue-ai-image-company-midjourney-unlicensed-star-wars-rcna212369",
    summary:
      "Disney and Universal sued Midjourney in federal court in Los Angeles for direct and secondary copyright infringement, alleging the service trains on and outputs their characters, from Darth Vader to the Minions, and ignored their pre-suit letters.",
    why: "Owners of famous characters are testing whether AI companies are liable for what their tools output — not just what they train on.",
  },
  {
    id: "copyright-office-part-3-training",
    date: "2025-05-09",
    cat: "ai-copyright",
    title: "U.S. Copyright Office releases Part 3 of its AI report: generative AI training",
    source: "U.S. Copyright Office",
    url: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf",
    summary:
      "The Office released a pre-publication version of Part 3, concluding that several stages of AI training implicate copyright owners’ rights, that there is no blanket fair use for all training, and that fair use must be decided case by case. It favored letting voluntary licensing markets develop.",
    why: "It’s the federal copyright agency’s most detailed view on whether AI companies need permission to train on creative works, and courts and lawmakers are citing it.",
  },
  {
    id: "dewberry-v-dewberry",
    date: "2025-02-26",
    cat: "trademark",
    title: "Supreme Court limits trademark profit awards to named defendants (Dewberry v. Dewberry)",
    source: "Supreme Court of the United States",
    url: "https://www.supremecourt.gov/opinions/24pdf/23-900_19m1.pdf",
    summary:
      "In a unanimous opinion by Justice Kagan, the Court held that “defendant’s profits” under the Lanham Act covers only the named defendant — not unnamed corporate affiliates — throwing out an award of roughly $43 million built on affiliates’ profits.",
    why: "In a trademark lawsuit, whom you name as defendants can decide how much you can recover.",
  },
  {
    id: "copyright-office-part-2-copyrightability",
    date: "2025-01-29",
    cat: "ai-copyright",
    title: "U.S. Copyright Office releases Part 2 of its AI report: copyrightability",
    source: "U.S. Copyright Office",
    url: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
    summary:
      "The Office concluded that purely AI-generated material is not protected and that prompts alone generally don’t give enough control to make someone an author. Human-authored expression, creative selection and arrangement, and meaningful modifications of AI output can be protected.",
    why: "This is the practical rulebook for registering AI-assisted work: protection depends on the human contribution you can identify and disclose.",
  },
  {
    id: "california-ab-2602-ab-1836",
    date: "2024-09-17",
    cat: "right-of-publicity",
    title: "California enacts AB 2602 and AB 1836 to protect performers’ digital likenesses",
    source: "Office of California Governor Gavin Newsom",
    url: "https://www.gov.ca.gov/2024/09/17/governor-newsom-signs-bills-to-protect-digital-likeness-of-performers",
    summary:
      "AB 2602 targets contract terms that allow digital replicas of a performer, requiring a reasonably specific description of the intended use and representation by a lawyer or union. AB 1836 bars commercial use of a deceased performer’s digital replica without the estate’s consent, with exceptions such as news, satire and parody.",
    why: "California performers should scrutinize AI and digital-replica clauses in their contracts, and estates of deceased performers gain control over AI recreations.",
  },
  {
    id: "vidal-v-elster",
    date: "2024-06-13",
    cat: "trademark",
    title: "Supreme Court upholds ban on registering living people’s names without consent (“Trump Too Small”)",
    source: "Supreme Court of the United States",
    url: "https://www.supremecourt.gov/opinions/23pdf/22-704_4246.pdf",
    summary:
      "In Vidal v. Elster, the Court unanimously upheld the Lanham Act’s “names clause,” which bars registering a mark that identifies a particular living person without that person’s written consent.",
    why: "You generally can’t federally register a brand containing a living person’s name without their written consent — even as commentary or parody.",
  },
  {
    id: "tennessee-elvis-act",
    date: "2024-03-21",
    cat: "right-of-publicity",
    title: "Tennessee enacts the ELVIS Act, the first state law protecting musicians’ voices from AI cloning",
    source: "Rolling Stone",
    url: "https://www.rollingstone.com/music/music-news/elvis-act-tennessee-signed-ai-impersonation-1234992395",
    summary:
      "Governor Bill Lee signed the ELVIS Act, adding “voice” — both actual and simulated — to Tennessee’s personal rights law, which already covered name, photograph and likeness. It took effect July 1, 2024.",
    why: "It was the first U.S. law aimed squarely at AI voice clones, and other states and Congress have followed with similar proposals.",
  },
];

const catLabel = Object.fromEntries(categories.map((c) => [c.slug, c.label]));

export const news = items
  .map((n) => ({ ...n, category: catLabel[n.cat] }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

for (const n of news) {
  if (!n.category) throw new Error(`Unknown news category "${n.cat}" on ${n.id}`);
}
