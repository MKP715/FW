# Francine D. Ward — website

A complete redesign and rebuild of [francineward.com](https://www.francineward.com/) for **Francine D. Ward — Attorney · Author · Speaker**: intellectual property and estate planning attorney, author of *Esteemable Acts*, and keynote speaker.

The site is fully static (HTML, CSS and a little vanilla JavaScript), has no runtime dependencies, and is ready to publish with **GitHub Pages**.

## What's inside

| Page | URL | What it does |
|---|---|---|
| Home | `/` | Hero with Francine's portrait, live news ticker, the three "doors" (Law · Author · Speaker), stats, practice areas, latest news, books, client testimonials, latest legal-blog articles |
| Meet Francine | `/meet-francine/` | Welcome video, her story in her own words, age-by-age reflection, timeline, recognition and service |
| Law Office | `/attorney-at-law/` | Practice overview, who she helps, named client reviews, process, FAQ, online booking |
| Intellectual Property | `/intellectual-property/` | Trademarks (with her trademark FAQ), copyrights, publishing, **AI & creative rights**, right of publicity, contracts, related blog articles |
| Estate Planning | `/estate-planning/` | Why work with Francine, essential documents, creative-legacy planning, trusts, probate, her estate-planning FAQ, pricing approach, related articles |
| Esteemable Acts | `/esteemable-acts/` | Philosophy, principles, ten esteemable acts, her ten Life Pillars, the books (real covers), videos, latest journal reflections, Facebook communities |
| **Legal Blog** *(migrated)* | `/legal-blog/` | 100 of her articles from the old site, filterable by topic and searchable; each keeps its original URL |
| **Esteemable Acts Journal** *(migrated)* | `/esteemable-acts/journal/` | 45 reflections from the old site, searchable; each keeps its original URL |
| Speaking | `/speaking/` | Her four signature talks (from her press kits), formats, audiences, audience reviews, **media kit** with copy-to-clipboard bios, high-res headshot and logo downloads |
| **News — IP & AI Law Watch** *(new)* | `/news/` | 27 curated, sourced stories on AI & copyright, AI music, deepfakes/right of publicity, trademarks and estate planning; filter chips, search, "why it matters" notes, and an RSS feed |
| Insights *(new)* | `/insights/` | Hub for her writing: four plain-English guides, latest legal-blog articles, latest journal reflections, quick-answer FAQ |
| Resources *(new)* | `/resources/` | Interactive Life Pillars check-in (her ten pillars) with live radar chart, her downloadable worksheets and estate-planning inventories (PDF), Vision & Values prompts, printable checklists, official links |
| Client Reviews | `/client-reviews/` | Every review from the old site in full, with the names shown there, plus audience reviews |
| Contact | `/contact/` | Online booking (Calendly, 30-minute consultation), message form, contact cards, next steps, FAQ |
| Disclaimer | `/disclaimer/` | Attorney advertising notice, privacy, permissions & reprints |

Also generated: `sitemap.xml`, `robots.txt`, `feed.xml` (RSS for the Law Watch), a custom `404.html`, and redirects for old WordPress URLs that have no page of their own (old category archives, retired posts, renamed pages). Together with the 145 posts republished at their original addresses, every URL that was live on the old site keeps working.

### Brand

- **Logo:** an "FW" monogram in champagne-gold strokes with a coral four-point star rising from the W's peak, a nod to her story of rising. Files: `src/assets/img/logo-mark.svg`, `favicon.svg`, plus generated PNGs.
- **Palette:** light and warm. Heroes use an ivory "dawn" gradient with soft peach, lavender and gold glows; text is midnight ink `#15122a`; the few dark bands (stats, testimonials, footer) use a softer dusk violet `#2b2552`. Champagne gold `#f3d98c`/`#c9a14a` and sunrise coral `#ee6a4d` are the highlights, with section accents teal (law), coral (author) and violet (speaker). Small accent text uses a darker "ink" version of each accent (e.g. `--coral-ink`) so it passes WCAG AA contrast.
- **Type:** *Fraunces* (display serif) and *Manrope* (text), both self-hosted under the SIL Open Font License, so no Google Fonts requests are made.
- **Motion:** drifting aurora gradients, line-by-line headline reveals, rotating hero word, scroll reveals, animated counters, a word-by-word quote reveal, a scroll-drawn timeline, marquees, 3D book covers, cursor-following card glow, and a circular-reveal mobile menu. All motion respects `prefers-reduced-motion`.

## Publish on GitHub Pages

The built site lives in **`docs/`** and is committed, so no build server is needed.

1. Merge this branch into `main`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Source: Deploy from a branch**, then **Branch: `main`**, folder **`/docs`**, and click **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/FW/`. All links are relative, so it works there as-is.

### Use the real domain (www.francineward.com)

When you're ready to switch over from the old site:

1. In **Settings → Pages → Custom domain**, enter `www.francineward.com` and save. GitHub then adds a `CNAME` file. To keep it in future builds, also create a file named `CNAME` in the repo root containing `www.francineward.com`; the build copies it into `docs/`.
2. At your domain registrar, point DNS at GitHub Pages:
   - `www` → a **CNAME** record pointing to `<your-username>.github.io`
   - the apex `francineward.com` → **A** records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Once the certificate is issued, tick **Enforce HTTPS**.

> The email address `info@fwardattorney.com` is on a different domain and is unaffected by these DNS changes. If you also have email on francineward.com, leave its MX records alone.

## Edit and rebuild

Requires Node.js 18 or newer. There is nothing to install.

```bash
npm run build      # renders src/ → docs/
npm run dev        # build, then preview at http://localhost:4173
```

| To change… | Edit |
|---|---|
| Phone, email, address, social links, nav | `src/site.mjs` |
| News stories (add, remove, feature) | `src/data/news.mjs`: copy an entry, set `featured: true` to spotlight it |
| Testimonials, books, old-URL redirects | `src/data/content.mjs` |
| Insights guides | `src/data/insights.mjs` |
| Blog posts (legal blog + journal) | `src/content/posts/*.html`: one file per post, JSON front matter in the opening comment; add a file to publish a new post |
| Page content | `src/pages/*.mjs` (one file per page) |
| Colors, type, layout, animation | `src/assets/css/main.css` |
| Interactions | `src/assets/js/main.js` |

After editing, run `npm run build` and commit both `src/` and `docs/`. To build somewhere else without touching `docs/` (e.g. to preview a change), set `OUT_DIR`: `OUT_DIR=../preview node scripts/build.mjs`.

### Photos

The portraits come from the Bre Flores Photography sessions on the old site, cropped to 880×1100:

- `francine-portrait.jpg`: home hero and the social-share image
- `francine-library.jpg`: Meet Francine and the blog author box
- `francine-outdoors.jpg`: Esteemable Acts
- `francine-speaking.jpg`: Speaking
- `francine-headshot-hires.jpg`: media-kit download

To swap one, replace the file with another 4:5 image of the same name and rebuild. If a portrait file is missing, the frame falls back to an animated gold monogram.

### Make the contact form send directly

By default the contact form opens the visitor's email app with the message pre-filled. To receive submissions without that step, create a free form endpoint (for example at formspree.io), put its URL in `formEndpoint` in `src/site.mjs`, and rebuild.

### Regenerate icons and the social-share image

`npm run images` re-renders `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` and `og-image.png` from the SVG logo and `francine-portrait.jpg`. It needs Playwright (`npm i -D playwright`). It uses Playwright's Chromium if that's installed, and otherwise your system Chrome.

## Content notes: please review before launch

In October 2026 the old WordPress site was crawled through its public REST API, and the new site's content was checked against it. Anything the old site, her posts or her 2019/2020 press kits couldn't support was removed (for example a Hunter College degree, a "January 14, 1991" start date, a mentor named Louise, a "six-figure deal", a list of media appearances and a Richard Carlson book blurb). What remains is drawn from those sources. A few things still need Francine's confirmation:

- **Biography.** Life-story details now come from her own 2022 post "Tell Your Story" and her old Meet Francine page. Her age passage says "Now at 71" exactly as she wrote it; update it if she wants. The ABA Intellectual Property Law Section council seat, Attorney Wellness Committee chair and teaching at the California Desert Trial Academy (Indio) come only from the 2019/2020 press kits, so they're written in the past tense. Confirm the wording and the school's exact name. *Staying Legal* (ASTD Press, 2007) isn't mentioned anywhere on the old site; confirm it should stay.
- **Testimonials** are verbatim, with the names shown on the old site (first name and last initial). Gwen Wilson and Maureen Keating are from the press kits and weren't on the old Client Reviews page. Confirm everyone is still happy to be named, and that Maureen's title is current. One-letter typo fixes are shown in [brackets].
- **Life Pillars.** The site follows her 2026 "Life Pillars" essay: ten pillars, including Miscellaneous. Her downloadable worksheet lists eleven in a different order ("Learning & Skill-Building", with Family and Friends separate). Decide which list is canonical.
- **Practice scope.** The old Practice Areas page listed only trademarks and estate planning. Her press kits add copyrights, publishing contracts, business agreements and website terms/privacy policies. AI, right of publicity, trade secrets and advertising appear as topics she writes about. Confirm what she actively takes on, and whether "You'll always speak directly with Francine" applies to IP matters as well as estate planning.
- **Estate planning.** Review interval: the FAQ says every 2–4 years (old Estate Planning page); a 2021 post says 3–5. Pricing: the site quotes her post that she usually includes the primary residence's deed in her flat fee; no prices are published. The FAQ, documents and probate content focus on California law.
- **Speaking.** The four signature talks and the areas of expertise are from her press kits. Confirm they're current and add newer talks if any.
- **Contact & booking.** Online booking goes to her Calendly 30-minute consultation (`site.booking`). Confirm whether that call is by phone, by video, or either. Permission requests go to info@fwardattorney.com; the old Permissions page listed permissions@fwardattorney.com. The old Terms of Use (governing law, arbitration) wasn't carried over; reinstate a reviewed version if wanted.
- **Social & community links** (`src/site.mjs`): Facebook `/Francinewardlawyer`, Instagram `/Francinewardlawyer`, LinkedIn `/in/trademarklawyer`, YouTube `@Francineward`, X `@Francineward`, the three Facebook groups (Legal Insights, Esteemable Acts, Esteemable Acts Wednesdays) and Yelp. All were taken from the old site. Her 2026 Spirituality post calls one group the "Vision and Values Group"; confirm the names.
- **Blog migration.** 145 of the 162 old posts were republished verbatim at their original URLs, with the WordPress sign-off boilerplate, "latest posts" lists and page-builder markup removed, YouTube embeds converted to click-to-play players, and her worksheets/inventories (PDFs) copied into `src/assets/downloads/`. Legal articles more than two years old show a "laws change" note. Seventeen weren't republished: six superseded by newer posts on the same topic, six syndicated "Thought You'd Like to See This" tax notes, and five pandemic-era items. Their URLs redirect. After import, leftover WordPress labels, dead Google+ links and split lists were cleaned up. Three trademark posts got a dated editor's note that the USPTO retired TESS in 2023. One correction was made: "Freelance Laws" said New York's Freelance Isn't Free Act took effect August 28, 2025; it took effect August 28, 2024. Older permalinks the old site redirected (e.g. `/estate-planning/what-is-a-will/`) redirect here too. A third-party presentation linked from one post (*Busting Estate Planning Myths*, by other presenters) was unlinked rather than rehosted.
- **Insights guides and the Law Watch** are new content written for this site, not from her blog, and are dated October 2026. Until she has reviewed them, they are credited to "the Law Office of Francine D. Ward" rather than bylined to her. Change the byline in `src/pages/insights.mjs` once she adopts them.
- **Phone number.** 760-636-0066 appears in the 2019/2020 press kits next to the office's old address; the current old site shows no phone. Confirm it before launch (it's set in `src/site.mjs`).
- **Client stories** on the Law Office page (Naomie; Jelani & Ruth) came from the old Practice Areas page and are now labeled as illustrative examples. If they're real clients who agreed to be described, the label can change.
- **Attorney advertising:** the footer and `/disclaimer/` include advertising, no-attorney-client-relationship, testimonial and jurisdiction notices. Have them checked against current California, New York and D.C. rules.

## Project structure

```
src/
  site.mjs              global settings (contact, socials, nav)
  lib/layout.mjs        page shell: head, header, footer, shared blocks
  lib/icons.mjs         inline SVG icons + logo
  pages/*.mjs           one module per page
  data/*.mjs            news, testimonials, books, insights, redirects
  content/posts/*.html  the migrated blog: one file per post (front matter + HTML)
  lib/posts.mjs         loads the posts; pages/blog.mjs renders posts and indexes
  assets/               css, js, fonts, images (copied to docs/assets)
scripts/
  build.mjs             zero-dependency static build → docs/
  make-images.mjs       PNG icon + OG image generator (Playwright)
docs/                   the published site (generated; commit it)
```
