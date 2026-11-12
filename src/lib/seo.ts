import type { Metadata } from "next";
import { SITE_URL, isIndexingEnabled } from "@/config/siteConfig";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";

export const OG_IMAGE_PATH = "/images/brand/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/png";

const OG_LOCALE_BY_LANG = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
} as const;

export type SupportedLocale = keyof typeof OG_LOCALE_BY_LANG;

export function normalizeLocale(locale: string): SupportedLocale {
  if (locale === "ru") return "ru";
  if (locale === "en") return "en";
  return "uz";
}

export function getOgImageDescriptor(alt: string) {
  return {
    url: OG_IMAGE_URL,
    ...(OG_IMAGE_URL.startsWith("https://") ? { secureUrl: OG_IMAGE_URL } : {}),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    type: OG_IMAGE_TYPE,
    alt,
  };
}

export function getDefaultOgImageAlt(locale: string): string {
  const safeLocale = normalizeLocale(locale);
  if (featuresConfig.demoMode) {
    return getDemoCopy(safeLocale).meta.ogImageAlt;
  }
  if (safeLocale === "ru") {
    return "Анвар Абдукаюм — Промышленность, Системное управление, Экспорт";
  }
  if (safeLocale === "en") {
    return "Anvar Abduqayum — Industry, Systemic Governance, Export";
  }
  return "Anvar Abduqayum — Sanoat, Tizimli boshqaruv, Eksport";
}

export interface BuildLocalizedMetadataInput {
  locale: string;
  routeSegment?:
    | ""
    | "bron"
    | "hamkorlik"
    | "kutubxona"
    | "export"
    | `portfel/${string}`;
  title: string;
  description: string;
  siteName: string;
  ogImageAlt?: string;
}

export function getRobotsMetadata(): Metadata["robots"] {
  if (isIndexingEnabled) {
    return { index: true, follow: true };
  }
  return { index: false, follow: false, noarchive: true };
}

/**
 * Builds consistent localized Metadata (canonical, hreflang, Open Graph, Twitter, and robots)
 * while strictly respecting demoMode indexing restrictions.
 */
export function buildLocalizedMetadata({
  locale,
  routeSegment = "",
  title,
  description,
  siteName,
  ogImageAlt,
}: BuildLocalizedMetadataInput): Metadata {
  const safeLocale = normalizeLocale(locale);
  const suffix = routeSegment ? `/${routeSegment}` : "";
  const canonicalUrl = `${SITE_URL}/${safeLocale}${suffix}`;
  const ogLocale = OG_LOCALE_BY_LANG[safeLocale];
  const alternateLocale = (Object.keys(OG_LOCALE_BY_LANG) as SupportedLocale[])
    .filter((l) => l !== safeLocale)
    .map((l) => OG_LOCALE_BY_LANG[l]);
  const resolvedAlt = ogImageAlt || getDefaultOgImageAlt(safeLocale);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    robots: getRobotsMetadata(),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uz: `${SITE_URL}/uz${suffix}`,
        ru: `${SITE_URL}/ru${suffix}`,
        en: `${SITE_URL}/en${suffix}`,
        "x-default": `${SITE_URL}/uz${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale,
      alternateLocale,
      url: canonicalUrl,
      siteName,
      images: [getOgImageDescriptor(resolvedAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: OG_IMAGE_URL,
          alt: resolvedAlt,
        },
      ],
    },
  };
}

