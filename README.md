# Francine D. Ward — website

A complete redesign and rebuild of [francineward.com](https://www.francineward.com/) for **Francine D. Ward — Attorney · Author · Speaker**: intellectual property and estate planning attorney, author of *Esteemable Acts*, and keynote speaker.

The site is fully static (HTML, CSS and a little vanilla JavaScript), has no runtime dependencies, and is ready to publish with **GitHub Pages**.

## What's inside

| Page | URL | What it does |
|---|---|---|
| Home | `/` | Animated hero, live news ticker, the three "doors" (Law · Author · Speaker), stats, practice areas, latest news, books, testimonials, insights |
| Meet Francine | `/meet-francine/` | Her story as a scroll-animated timeline, credentials, values, media appearances |
| Law Office | `/attorney-at-law/` | Practice overview, who she helps, client stories, process, FAQ |
| Intellectual Property | `/intellectual-property/` | Trademarks, copyrights, publishing, **AI & creative rights**, right of publicity, contracts, trade secrets, advertising, privacy |
| Estate Planning | `/estate-planning/` | Plan documents, creative-legacy planning, trusts, probate, process, FAQ |
| Esteemable Acts | `/esteemable-acts/` | Philosophy, five principles, ten esteemable acts, Life Pillars, 3D book covers, journal, newsletter |
| Speaking | `/speaking/` | Keynote topics, formats, audiences, **media kit** with copy-to-clipboard bios and logo downloads |
| **News — IP & AI Law Watch** *(new)* | `/news/` | 27 curated, sourced stories on AI & copyright, AI music, deepfakes/right of publicity, trademarks and estate planning; filter chips, search, "why it matters" notes, and an RSS feed |
| Insights *(new)* | `/insights/` | Four plain-English guides + quick-answer FAQ |
| Resources *(new)* | `/resources/` | Interactive Life Pillars check-in with live radar chart, Vision & Values prompts, printable legal checklists, official links |
| Client Reviews | `/client-reviews/` | Testimonials |
| Contact | `/contact/` | Consultation form, contact cards, next steps, FAQ |
| Disclaimer | `/disclaimer/` | Attorney advertising notice, privacy |

Also generated: `sitemap.xml`, `robots.txt`, `feed.xml` (RSS for the Law Watch), a custom `404.html`, and **63 redirects** from old WordPress URLs (e.g. `/practice-areas-2/`, `/media-kit/`, `/esteemable-acts/love-is-an-action/`) so existing links and search results keep working.

### Brand

- **Logo:** an "FW" monogram in champagne-gold strokes with a coral four-point star rising from the W's peak, a nod to her story of rising. Files: `src/assets/img/logo-mark.svg`, `favicon.svg`, plus generated PNGs.
- **Palette:** midnight ink `#15122a`, ivory `#fbf7f1`, champagne gold `#f3d98c`/`#c9a14a`, sunrise coral `#ee6a4d`, with section accents: teal (law), coral (author), violet (speaker).
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
| Testimonials, books, journal quotes, old-URL redirects | `src/data/content.mjs` |
| Insights articles | `src/data/insights.mjs` |
| Page content | `src/pages/*.mjs` (one file per page) |
| Colors, type, layout, animation | `src/assets/css/main.css` |
| Interactions | `src/assets/js/main.js` |

After editing, run `npm run build` and commit both `src/` and `docs/`.

### Add Francine's photo

Save a portrait (about 800×1000 px, vertical) as **`src/assets/img/francine-portrait.jpg`** (`.webp` and `.png` also work) and rebuild. It appears automatically in the home hero and on Meet Francine. Until then, an animated gold monogram fills the frame.

### Make the contact form send directly

By default the contact form opens the visitor's email app with the message pre-filled. To receive submissions without that step, create a free form endpoint (for example at formspree.io), put its URL in `formEndpoint` in `src/site.mjs`, and rebuild.

### Regenerate icons and the social-share image

`npm run images` re-renders `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` and `og-image.png` from the SVG logo. It needs Playwright: `npm i -D playwright`.

## Content notes: please review before launch

The old site couldn't be downloaded directly from the build environment, so its content was reconstructed from search-indexed copies of francineward.com, her press kits, publisher listings and speaker-bureau profiles. Please have Francine review:

- **Biography and timeline** (`meet-francine`, speaking bios). Life-story details come from her own published bios. Confirm the Hunter College 1986 B.A. and the wording of personal history she's comfortable sharing.
- **Testimonials** are excerpts from the old Client Reviews page and press kits. Names weren't reliably attributed there, so they're labeled by type of matter. Confirm each, and add names or initials only with client permission.
- **Social links** in `src/site.mjs` were taken from the old site's markup: LinkedIn `/in/trademarklawyer/`, Facebook `/Francineward/`, X `@Francineward`, YouTube. Confirm they're current, and add Instagram if wanted.
- **"Ten esteemable acts"** on the Esteemable Acts page are drawn from themes in her books and blog. They are deliberately **not** presented as the book's own ten chapters, which weren't available. Swap in the book's list if preferred.
- **Speaking topics** come from her press kits. The IP talk title was modernized to "…in the Internet & AI Age."
- **Insights articles and the Law Watch** are general information, not legal advice, and are dated October 2026. News items link to their original publishers. A few dates are shown as month-only where sources differed by a day.
- **Old blog posts:** the full text of the ~50 Esteemable Acts and legal blog posts on WordPress wasn't migrated. Old post URLs redirect to the matching new sections. To bring the posts over, export them from WordPress (**Tools → Export**) and they can be converted into Insights and Journal pages.
- **Attorney advertising:** the footer and `/disclaimer/` include advertising, no-attorney-client-relationship and jurisdiction notices. Have them checked against current California, New York and D.C. rules.

## Project structure

```
src/
  site.mjs              global settings (contact, socials, nav)
  lib/layout.mjs        page shell: head, header, footer, shared blocks
  lib/icons.mjs         inline SVG icons + logo
  pages/*.mjs           one module per page
  data/*.mjs            news, testimonials, books, insights, redirects
  assets/               css, js, fonts, images (copied to docs/assets)
scripts/
  build.mjs             zero-dependency static build → docs/
  make-images.mjs       PNG icon + OG image generator (Playwright)
docs/                   the published site (generated; commit it)
```
