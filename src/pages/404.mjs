import { html, aurora, lines } from "../lib/layout.mjs";

export default {
  path: "404.html",
  title: "Page not found",
  description: "The page you were looking for has moved or no longer exists.",
  noindex: true,
  render: () => html`
<section class="hero">
  ${aurora()}
  <div class="container">
    <p class="eyebrow hero-fade">Error 404</p>
    <h1>${lines("This page took|a <em>different path.</em>")}</h1>
    <p class="lead hero-fade d1">The site has been rebuilt from the ground up, so some old links have moved. Every ending is a new beginning — let's find what you came for.</p>
    <div class="btn-row hero-fade d2">
      <a class="btn btn-gold" href="./">Back to home <span class="arrow">→</span></a>
      <a class="btn btn-ghost-light" href="attorney-at-law/">Law Office</a>
      <a class="btn btn-ghost-light" href="esteemable-acts/">Esteemable Acts</a>
      <a class="btn btn-ghost-light" href="news/">News</a>
      <a class="btn btn-ghost-light" href="contact/">Contact</a>
    </div>
  </div>
</section>
`,
};
