import type { Metadata } from "next";
import {
  SITE_URL,
  isIndexingEnabled,
  DEMO_ORIGIN,
  OFFICIAL_PRODUCTION_ORIGIN,
} from "@/config/siteConfig";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";

// Publicly reachable origin for Open Graph crawlers (Telegram, WhatsApp, Facebook, LinkedIn)
export const getPublicOgOrigin = (): string => {
  if (SITE_URL && !SITE_URL.includes("localhost") && !SITE_URL.includes("127.0.0.1")) {
    return SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_DEMO_URL) {
    return process.env.NEXT_PUBLIC_DEMO_URL.trim().replace(/\/$/, "");
  }
  return DEMO_ORIGIN || OFFICIAL_PRODUCTION_ORIGIN;
};

export const OG_BASE_URL = getPublicOgOrigin();
export const OG_IMAGE_PATH = "/images/brand/og-image.jpg";
export const OG_IMAGE_PATH_PNG = "/images/brand/og-image.png";
export const OG_IMAGE_URL = `${OG_BASE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/jpeg";

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
  const base = getPublicOgOrigin();
  const url = `${base}${OG_IMAGE_PATH}`;
  return {
    url,
    secureUrl: url,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    type: OG_IMAGE_TYPE,
    alt,
  };
}

export function getOgImageDescriptors(alt: string) {
  const base = getPublicOgOrigin();
  return [
    {
      url: `${base}${OG_IMAGE_PATH}`,
      secureUrl: `${base}${OG_IMAGE_PATH}`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      type: "image/jpeg",
      alt,
    },
    {
      url: `${base}${OG_IMAGE_PATH_PNG}`,
      secureUrl: `${base}${OG_IMAGE_PATH_PNG}`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      type: "image/png",
      alt,
    },
  ];
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

export function getDefaultKeywords(locale: string): string[] {
  const safeLocale = normalizeLocale(locale);
  if (safeLocale === "ru") {
    return [
      "Анвар Абдукаюм",
      "промышленник Узбекистан",
      "производство в Узбекистане",
      "систематизация бизнеса",
      "принцип Колип",
      "Toybola",
      "Samtech Masterbatches",
      "UZBIC",
      "бизнес ментор",
      "экспорт и импорт",
      "стратегический консалтинг",
    ];
  }
  if (safeLocale === "en") {
    return [
      "Anvar Abduqayum",
      "industrialist Uzbekistan",
      "manufacturing entrepreneur",
      "business systemization",
      "Qolip framework",
      "Toybola Toys",
      "Samtech",
      "UZBIC council",
      "business mentor",
      "export ecosystem",
    ];
  }
  return [
    "Anvar Abduqayum",
    "sanoat tadbirkori",
    "ishlab chiqarish",
    "biznesni tizimlashtirish",
    "qolip tamoyili",
    "Toybola Toys",
    "Samtech Masterbatches",
    "UZBIC kengashi",
    "biznes mentor",
    "eksport ekotizimi",
    "strategik boshqaruv",
    "O'zbekiston tadbirkorlari",
    "korxona boshqaruvi",
  ];
}

export interface BuildLocalizedMetadataInput {
  locale: string;
  routeSegment?:
    | ""
    | "hamkorlik"
    | "kutubxona"
    | "export"
    | `portfel/${string}`;
  title: string;
  description: string;
  siteName: string;
  ogImageAlt?: string;
  keywords?: string[];
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
  keywords,
}: BuildLocalizedMetadataInput): Metadata {
  const safeLocale = normalizeLocale(locale);
  const suffix = routeSegment ? `/${routeSegment}` : "";
  const canonicalUrl = `${SITE_URL}/${safeLocale}${suffix}`;
  const ogLocale = OG_LOCALE_BY_LANG[safeLocale];
  const alternateLocale = (Object.keys(OG_LOCALE_BY_LANG) as SupportedLocale[])
    .filter((l) => l !== safeLocale)
    .map((l) => OG_LOCALE_BY_LANG[l]);
  const resolvedAlt = ogImageAlt || getDefaultOgImageAlt(safeLocale);
  const resolvedKeywords = keywords || getDefaultKeywords(safeLocale);

  return {
    title,
    description,
    keywords: resolvedKeywords,
    authors: [{ name: "Anvar Abduqayum", url: SITE_URL }],
    creator: "Anvar Abduqayum",
    publisher: "Anvar Abduqayum",
    metadataBase: new URL(getPublicOgOrigin()),
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
      images: getOgImageDescriptors(resolvedAlt),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: `${getPublicOgOrigin()}${OG_IMAGE_PATH}`,
          alt: resolvedAlt,
        },
      ],
    },
  };
}

