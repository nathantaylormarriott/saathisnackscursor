import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

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
      const env = loadEnv(mode, process.cwd(), "");
      const base = (env.VITE_SITE_URL || "https://saathisnacks.org").replace(/\/$/, "");
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

/** Injects absolute OG / Twitter image URLs into `index.html` for crawlers that do not execute JavaScript. */
function htmlAbsoluteOgPlugin(mode: string) {
  return {
    name: "html-absolute-og",
    transformIndexHtml(html: string) {
      const env = loadEnv(mode, process.cwd(), "");
      const base = (env.VITE_SITE_URL || "https://saathisnacks.org").replace(/\/$/, "");
      return html.replace(/content="\/og-default\.webp"/g, `content="${base}/og-default.webp"`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
}));
