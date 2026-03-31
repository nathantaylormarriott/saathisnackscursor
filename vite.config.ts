import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

/** Canonical origin for OG, sitemap, and client `import.meta.env.VITE_SITE_URL` (no trailing slash). */
function resolvePublicSiteUrl(mode: string): string {
  const fromFile = loadEnv(mode, process.cwd(), "").VITE_SITE_URL?.trim() || "";
  const raw =
    process.env.VITE_SITE_URL?.trim() ||
    fromFile ||
    process.env.URL?.trim() ||
    process.env.DEPLOY_PRIME_URL?.trim() ||
    (mode === "production" ? "https://saathisnacks.org" : "");
  return raw.replace(/\/$/, "");
}

const BLOG_SLUGS = [
  "why-corporate-lunch-social-enterprise",
  "behind-the-kitchen-women-of-saathi-snacks",
  "changing-lives-one-biryani",
] as const;

/** Writes `sitemap.xml` and `robots.txt` into `dist/` after build. Set `VITE_SITE_URL` for your live domain. */
function seoFilesPlugin(mode: string) {
  return {
    name: "seo-files",
    closeBundle() {
      const base = resolvePublicSiteUrl(mode);
      const lastmod = new Date().toISOString().split("T")[0];
      const paths = ["/", "/menu", "/about", "/contact", "/blog", ...BLOG_SLUGS.map((s) => `/blog/${s}`)];
      const urlEntries = paths
        .map((p) => {
          const loc = `${base}${p}`;
          const priority = p === "/" ? "1.0" : "0.8";
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
      const outDir = path.resolve(__dirname, "dist");
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      );
    },
  };
}

/** Injects absolute OG / Twitter image URLs and canonical / og:url into `index.html` for crawlers that do not execute JavaScript. */
function htmlAbsoluteOgPlugin(mode: string) {
  return {
    name: "html-absolute-og",
    transformIndexHtml(html: string) {
      const base = resolvePublicSiteUrl(mode);
      if (!base) {
        return html;
      }
      return html
        .replace(/content="\/og-default\.jpg"/g, `content="${base}/og-default.jpg"`)
        .replace(/<link rel="canonical" href="\/"\s*\/>/, `<link rel="canonical" href="${base}/" />`)
        .replace(
          /<meta\s+property="og:url"\s+content="\/"\s*\/>/,
          `<meta property="og:url" content="${base}/" />`,
        );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const publicSiteUrl = resolvePublicSiteUrl(mode);
  return {
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(publicSiteUrl),
    },
    server: {
      /** Listen on LAN so you can open the dev server on your phone (same Wi‑Fi). */
      host: true,
      port: 8080,
      /** If 8080 is in use, fail instead of picking another port (avoids “wrong URL” confusion). */
      strictPort: true,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      htmlAbsoluteOgPlugin(mode),
      mode === "development" && componentTagger(),
      mode === "production" && seoFilesPlugin(mode),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
