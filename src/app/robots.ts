import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
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
