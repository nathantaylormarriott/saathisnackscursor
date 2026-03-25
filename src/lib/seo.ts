import { SITE_CONFIG } from "@/config/settings";

/** Base URL for canonical / OG URLs. Set `VITE_SITE_URL` in production (e.g. https://www.example.com). */
export function getSiteUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  return raw?.replace(/\/$/, "") ?? "";
}

/** Production URL from env, or `window.location.origin` in the browser when env is unset. */
export function getPublicSiteUrl(): string {
  const fromEnv = getSiteUrl();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/$/, "");
  }
  return "";
}

export function absoluteUrl(path: string): string {
  const base = getPublicSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base) {
    return normalized;
  }
  return `${base}${normalized === "/" ? "" : normalized}`;
}

export const SEO_SITE_NAME = SITE_CONFIG.name;

const DEFAULT_DESC =
  "Authentic South Asian catering in Birmingham — lunch packages and snack boxes. Collection only. Every order supports women's empowerment programmes at Saathi House.";

export const SEO_DEFAULT = {
  siteName: SEO_SITE_NAME,
  titleSuffix: ` | ${SEO_SITE_NAME}`,
  defaultTitle: `${SITE_CONFIG.name} — Authentic South Asian Catering in Birmingham`,
  defaultDescription: DEFAULT_DESC,
  locale: "en_GB",
} as const;

/** Per-route defaults for `<SeoHead />` (title segments or full home title). */
export const SEO = {
  home: {
    title: SEO_DEFAULT.defaultTitle,
    description: SEO_DEFAULT.defaultDescription,
  },
  menu: {
    title: "Menu",
    description:
      "Lunch catering packages and snack boxes — choose mains, starters, and sides. Authentic South Asian food in Birmingham. Collection only; enquire for pricing and availability.",
  },
  about: {
    title: "Our Story",
    description:
      "Saathi Snacks is a social enterprise at Saathi House, Birmingham: authentic catering that funds women's training, wellbeing, and community programmes.",
  },
  contact: {
    title: "Contact",
    description:
      "Enquire about catering, snack boxes, or kitchen hire. Email, phone, or send a message — we're based at Saathi House, Aston, Birmingham.",
  },
  blog: {
    title: "Stories",
    description: "News, recipes, and updates from the Saathi Snacks community kitchen in Birmingham.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist on Saathi Snacks.",
  },
  admin: {
    title: "Admin",
    description: "Saathi Snacks site administration.",
  },
} as const;

/** Short title segment → formatted document title */
export function formatPageTitle(pageTitle: string): string {
  const t = pageTitle.trim();
  if (t.includes("—") && t.includes(SITE_CONFIG.name)) {
    return t;
  }
  return `${t}${SEO_DEFAULT.titleSuffix}`;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl("/og-default.webp");
}

export function organizationJsonLd(): Record<string, unknown> {
  const url = getPublicSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    ...(url ? { "@id": `${url}/#foodestablishment`, url } : {}),
    name: SITE_CONFIG.name,
    description: SEO_DEFAULT.defaultDescription,
    telephone: `+44${SITE_CONFIG.phone.replace(/\s/g, "").replace(/^0/, "")}`,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "49 Bevington Road, Aston",
      addressLocality: "Birmingham",
      postalCode: "B6 6HR",
      addressCountry: "GB",
    },
    servesCuisine: "South Asian",
    parentOrganization: {
      "@type": "Organization",
      name: SITE_CONFIG.parentOrg,
      url: SITE_CONFIG.parentOrgUrl,
    },
    sameAs: [SITE_CONFIG.socials.instagram, SITE_CONFIG.socials.facebook].filter(Boolean),
  };
}
