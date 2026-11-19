import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, isIndexingEnabled } from "@/config/siteConfig";
import { featuresConfig } from "@/config/features";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) {
    return [];
  }

  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "uz" ? 1.0 : 0.8,
    alternates: {
      languages: {
        uz: `${baseUrl}/uz`,
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/uz`,
      },
    },
  }));

  const testEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/test`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "uz" ? 0.9 : 0.7,
    alternates: {
      languages: {
        uz: `${baseUrl}/uz/test`,
        ru: `${baseUrl}/ru/test`,
        en: `${baseUrl}/en/test`,
        "x-default": `${baseUrl}/uz/test`,
      },
    },
  }));

  const hamkorlikEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/hamkorlik`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "uz" ? 0.9 : 0.7,
    alternates: {
      languages: {
        uz: `${baseUrl}/uz/hamkorlik`,
        ru: `${baseUrl}/ru/hamkorlik`,
        en: `${baseUrl}/en/hamkorlik`,
        "x-default": `${baseUrl}/uz/hamkorlik`,
      },
    },
  }));

  return [
    ...homeEntries,
    ...(featuresConfig.quiz ? testEntries : []),
    ...(featuresConfig.partnershipIntake ? hamkorlikEntries : []),
  ];
}
