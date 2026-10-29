import { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ilhom Begimqulov | Biznes Konsultant va Amaliyotchi Trener",
  description:
    "Biznes boshqaruvi, operatsion tizimlar, sotuv bo'limi va jamoani kuchaytirish bo'yicha amaliy yechimlar. 10 yildan ortiq tajribaga ega amaliyotchi biznes konsultant.",
  openGraph: {
    title: "Ilhom Begimqulov | Biznes Konsultant va Amaliyotchi Trener",
    description:
      "Biznes boshqaruvi, operatsion tizimlar, sotuv bo'limi va jamoani kuchaytirish bo'yicha amaliy yechimlar.",
    type: "website",
    url: SITE_URL,
    siteName: "Ilhom Begimqulov",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Ilhom Begimqulov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilhom Begimqulov | Biznes Konsultant va Amaliyotchi Trener",
    description:
      "Biznes boshqaruvi, operatsion tizimlar, sotuv bo'limi va jamoani kuchaytirish bo'yicha amaliy yechimlar.",
    images: [`${SITE_URL}/og-image.png`],
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
