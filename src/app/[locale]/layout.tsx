import type { Metadata, Viewport } from "next";
import { Outfit, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ApplyModalProvider } from "@/features/apply/context/ApplyModalContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { contactConfig } from "@/config/contact";
import { SITE_URL } from "@/config/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const isRu = locale === "ru";

  const title = isUz
    ? "Ilhom Begimqulov | Biznes Konsultant va Amaliyotchi Trener"
    : isRu
    ? "Илхом Бегимкулов | Бизнес-консультант и тренер"
    : "Ilhom Begimqulov | Business Consultant & Executive Trainer";

  const description = isUz
    ? "Biznes boshqaruvi, operatsion tizimlar, sotuv bo'limi va jamoani kuchaytirish bo'yicha amaliy yechimlar. 10 yildan ortiq tajribaga ega amaliyotchi biznes konsultant."
    : isRu
    ? "Практические решения по управлению бизнесом, операционным процессам, отделу продаж и усилению команды."
    : "Practical management systems, operational excellence, sales architecture, and team empowerment by an experienced consultant.";

  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
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
      title,
      description,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `${SITE_URL}/${locale}`,
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
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-icon.png", type: "image/png" },
      ],
    },
    robots: !isProduction
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: "Ilhom Begimqulov",
    jobTitle:
      locale === "ru"
        ? "Бизнес-консультант и тренер"
        : locale === "en"
        ? "Business Consultant & Executive Trainer"
        : "Biznes Konsultant va Amaliyotchi Trener",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/images/hero/portrait.webp`,
    telephone: contactConfig.phone.clean,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Furkat ko'chasi 18",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: [
      contactConfig.telegramChannel.url,
      contactConfig.telegramDirect.url,
      contactConfig.instagram.url,
      contactConfig.youtube.url,
      contactConfig.linkedin.url,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Ilhom Begimqulov Consulting",
      url: SITE_URL,
    },
  };

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#0A0A0A] text-[#F5F5F0] font-sans selection:bg-[#C5A880] selection:text-[#0A0A0A] antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ApplyModalProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </ApplyModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
