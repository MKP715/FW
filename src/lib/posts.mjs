// Blog posts imported from the previous WordPress site (src/content/posts/*.html).
// Each file starts with an HTML comment holding JSON front matter:
//   { title, date, modified, path, kind: "legal" | "journal", category, excerpt, words, wpId }
// Links inside a post use {{root}} so they resolve from any page depth.
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../content/posts/", import.meta.url));

export const blogCategories = [
  { slug: "estate-planning", label: "Estate Planning", path: "legal-blog/estate-planning/", theme: "law" },
  // The old site had a post at /legal-blog/trademarks/, so this topic has no landing page of its own.
  { slug: "trademarks", label: "Trademarks", path: null, theme: "law" },
  { slug: "copyrights", label: "Copyrights", path: "legal-blog/copyrights/", theme: "law" },
  { slug: "legal-insights", label: "Business, Privacy & Tech", path: null, theme: "law" },
  { slug: "contract-review", label: "Contracts", path: null, theme: "law" },
];
const catByLabel = { "Estate Planning": "estate-planning", Trademarks: "trademarks", Copyrights: "copyrights", "Legal Insights": "legal-insights", "Contract Review": "contract-review" };

export const posts = readdirSync(dir)
  .filter((f) => f.endsWith(".html"))
  .map((f) => {
    const src = readFileSync(dir + f, "utf8");
    const m = src.match(/^<!--([\s\S]*?)-->\s*/);
    const meta = JSON.parse(m[1]);
    const catSlug = meta.kind === "journal" ? "journal" : catByLabel[meta.category] || "legal-insights";
    const catLabel = meta.kind === "journal" ? "Esteemable Acts" : blogCategories.find((c) => c.slug === catSlug).label;
    return { ...meta, catSlug, catLabel, readTime: Math.max(2, Math.round(meta.words / 230)), body: src.slice(m[0].length) };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

export const legalPosts = posts.filter((p) => p.kind === "legal");
export const journalPosts = posts.filter((p) => p.kind === "journal");
