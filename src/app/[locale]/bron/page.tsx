import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { BookingView } from "@/features/booking/components/BookingView";
import { SITE_URL } from "@/config/siteConfig";
import { routing } from "@/i18n/routing";

interface BookingPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const isRu = locale === "ru";

  const title = isUz
    ? "Bepul diagnostika uchun vaqtni tanlang | Ilhom Begimqulov"
    : isRu
    ? "Выберите время бесплатной диагностики | Илхом Бегимкулов"
    : "Book a Free Diagnostic Session | Ilhom Begimqulov";

  const description = isUz
    ? "Biznesingizning og'riqli nuqtalarini tahlil qilamiz va qaysi yo'nalish eng tez natija berishini aniqlaymiz. 20 daqiqalik bepul diagnostika uchun vaqtni tanlang."
    : isRu
    ? "Проанализируем болевые точки вашего бизнеса и определим точки быстрого роста. Выберите удобное время для 20-минутной бесплатной диагностики."
    : "Analyze pain points in your business and identify high-impact systems. Select a convenient time for your 20-minute free diagnostic.";

  const pagePath = locale === "uz" ? "/bron" : `/${locale}/bron`;
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uz: `${SITE_URL}/uz/bron`,
        ru: `${SITE_URL}/ru/bron`,
        en: `${SITE_URL}/en/bron`,
        "x-default": `${SITE_URL}/uz/bron`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: canonicalUrl,
      siteName: "Ilhom Begimqulov",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#C5A880] selection:text-[#0A0A0A]">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 flex flex-col">
        <BookingView />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
