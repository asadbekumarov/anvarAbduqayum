import { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE_URL, isIndexingEnabled } from "@/config/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: isIndexingEnabled
    ? { index: true, follow: true }
    : { index: false, follow: false },
  title: "Anvar Abduqayum | Ishlab chiqarish, Eksport va Biznes-mentor",
  description:
    "20 yillik real ishlab chiqarish zavodlari, savdo tarmoqlari va xalqaro eksport tajribasi asosida biznesni tizimlashtirish hamda mentorlik.",
  openGraph: {
    title: "Anvar Abduqayum | Ishlab chiqarish, Eksport va Biznes-mentor",
    description:
      "20 yillik real ishlab chiqarish zavodlari, savdo tarmoqlari va xalqaro eksport tajribasi asosida biznesni tizimlashtirish hamda mentorlik.",
    type: "website",
    url: SITE_URL,
    siteName: "Anvar Abduqayum",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Anvar Abduqayum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvar Abduqayum | Ishlab chiqarish, Eksport va Biznes-mentor",
    description:
      "20 yillik real ishlab chiqarish zavodlari, savdo tarmoqlari va xalqaro eksport tajribasi asosida biznesni tizimlashtirish hamda mentorlik.",
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
