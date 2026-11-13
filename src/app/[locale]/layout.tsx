import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";
import { SITE_URL } from "@/config/siteConfig";
import { buildLocalizedMetadata } from "@/lib/seo";
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
  const demoMeta = getDemoCopy(locale).meta;
  const isDemo = featuresConfig.demoMode;

  const title = isDemo
    ? `${content.meta.siteTitle} — ${demoMeta.siteTitleSuffix}`
    : content.meta.siteTitle;
  const description = isDemo
    ? demoMeta.siteDescription
    : content.meta.siteDescription;
  const siteName = isDemo ? demoMeta.siteName : content.meta.founderName;

  return buildLocalizedMetadata({
    locale,
    routeSegment: "",
    title,
    description,
    siteName,
  });
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
        ...(contactConfig.phone.isVerified && contactConfig.phone.clean
          ? { telephone: contactConfig.phone.clean }
          : {}),
        ...(contactConfig.email.isVerified && contactConfig.email.address
          ? { email: contactConfig.email.address }
          : {}),
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
          contactConfig.telegramChannel.isVerified ? contactConfig.telegramChannel.url : "",
          contactConfig.instagram.isVerified ? contactConfig.instagram.url : "",
          contactConfig.youtube.isVerified ? contactConfig.youtube.url : "",
        ].filter(Boolean),
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
        className="min-h-screen flex flex-col bg-[var(--bg-alabaster)] text-[var(--text-ink)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-surface)] antialiased font-sans font-bold"
        suppressHydrationWarning
      >
        {!featuresConfig.demoMode && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
