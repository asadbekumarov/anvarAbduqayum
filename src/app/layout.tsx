import { ReactNode } from "react";
import type { Metadata } from "next";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";
import { SITE_URL } from "@/config/siteConfig";
import {
  OG_IMAGE_URL,
  getDefaultOgImageAlt,
  getOgImageDescriptor,
  getRobotsMetadata,
} from "@/lib/seo";

const demoRootMeta = getDemoCopy("uz").meta;
const rootTitle = featuresConfig.demoMode
  ? `Anvar Abduqayum — ${demoRootMeta.siteTitleSuffix}`
  : "Anvar Abduqayum | Ishlab chiqarish, Eksport va Biznes-mentor";
const rootDescription = featuresConfig.demoMode
  ? demoRootMeta.siteDescription
  : "20 yillik real ishlab chiqarish zavodlari, savdo tarmoqlari va xalqaro eksport tajribasi asosida biznesni tizimlashtirish hamda mentorlik.";
const rootSiteName = featuresConfig.demoMode
  ? demoRootMeta.siteName
  : "Anvar Abduqayum";
const rootOgAlt = getDefaultOgImageAlt("uz");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: getRobotsMetadata(),
  title: rootTitle,
  description: rootDescription,
  openGraph: {
    title: rootTitle,
    description: rootDescription,
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    url: SITE_URL,
    siteName: rootSiteName,
    images: [getOgImageDescriptor(rootOgAlt)],
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: rootDescription,
    images: [{ url: OG_IMAGE_URL, alt: rootOgAlt }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
