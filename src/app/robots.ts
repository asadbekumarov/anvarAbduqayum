import { MetadataRoute } from "next";
import { SITE_URL, isIndexingEnabled } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
