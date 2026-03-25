import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  absoluteUrl,
  defaultOgImageUrl,
  formatPageTitle,
  SEO_DEFAULT,
  SEO_SITE_NAME,
} from "@/lib/seo";

export type SeoHeadProps = {
  /** Short title (e.g. "Menu") or full marketing title for the home page */
  title: string;
  description: string;
  /** Absolute or site-relative image URL for Open Graph / Twitter */
  ogImage?: string;
  /** When true, search engines should not index (admin, 404, etc.) */
  noindex?: boolean;
  /** Injected as JSON-LD (e.g. Organization on home) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "seo-jsonld";

/**
 * Updates document title, meta description, canonical, Open Graph, and Twitter cards for SPA routes.
 */
const SeoHead = ({ title, description, ogImage, noindex, jsonLd }: SeoHeadProps) => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    const fullTitle = formatPageTitle(title);
    document.title = fullTitle;

    setMeta("name", "description", description);

    const pathWithQuery = `${pathname}${search}`;
    const canonical = absoluteUrl(pathWithQuery);
    setLink("canonical", canonical);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SEO_SITE_NAME);
    setMeta("property", "og:locale", SEO_DEFAULT.locale);
    if (canonical.startsWith("http")) {
      setMeta("property", "og:url", canonical);
    }

    const imageUrl = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : absoluteUrl(ogImage.startsWith("/") ? ogImage : `/${ogImage}`)
      : defaultOgImageUrl();
    if (imageUrl.startsWith("http")) {
      setMeta("property", "og:image", imageUrl);
      setMeta("name", "twitter:image", imageUrl);
    }

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow");
    }

    let script = document.getElementById(JSON_LD_ID);
    if (jsonLd) {
      const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      if (!script) {
        script = document.createElement("script");
        script.id = JSON_LD_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data.length === 1 ? data[0] : data);
    } else if (script) {
      script.remove();
    }
  }, [title, description, ogImage, noindex, jsonLd, pathname, search]);

  return null;
};

export default SeoHead;
