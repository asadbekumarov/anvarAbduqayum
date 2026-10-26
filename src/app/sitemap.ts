import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/config/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "uz" ? 1.0 : 0.8,
    alternates: {
      languages: {
        uz: `${baseUrl}/uz`,
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
      },
    },
  }));

  // Root entry
  entries.unshift({
    url: baseUrl,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  });

  return entries;
}
