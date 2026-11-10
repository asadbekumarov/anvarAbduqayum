import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { SITE_URL, isIndexingEnabled } from "@/config/siteConfig";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale);

  return {
    title: content.meta.siteTitle,
    description: content.meta.siteDescription,
    metadataBase: new URL(SITE_URL),
    robots: isIndexingEnabled
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
        "x-default": "/uz",
      },
    },
    openGraph: {
      title: content.meta.siteTitle,
      description: content.meta.siteDescription,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName: content.meta.founderName,
      images: [
        {
          url: `${SITE_URL}/images/brand/og-image.png`,
          width: 1200,
          height: 630,
          alt: content.meta.founderName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.siteTitle,
      description: content.meta.siteDescription,
      images: [`${SITE_URL}/images/brand/og-image.png`],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const content = getContent(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: content.meta.founderName,
        inLanguage: locale,
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: content.meta.founderName,
        jobTitle: content.meta.founderRole,
        description: content.meta.siteDescription,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/images/hero/portrait.webp`,
        telephone: contactConfig.phone.clean,
        email: contactConfig.email.address,
        address: {
          "@type": "PostalAddress",
          addressLocality: locale === "ru" ? "Ташкент" : locale === "en" ? "Tashkent" : "Toshkent",
          addressCountry: "UZ",
        },
        affiliation: {
          "@type": "Organization",
          name: "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC)",
          url: "https://uzbic.uz",
        },
        sameAs: [
          contactConfig.telegramChannel.url,
          contactConfig.instagram.url,
          contactConfig.youtube.url,
        ],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-[var(--bg-alabaster)] text-[var(--text-ink)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-surface)] antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
