import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { QuizView } from "@/features/quiz/components/QuizView";
import { SITE_URL } from "@/config/siteConfig";
import { routing } from "@/i18n/routing";

interface TestPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: TestPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === "uz";
  const isRu = locale === "ru";

  const title = isUz
    ? "Biznes diagnostika testi | Ilhom Begimqulov"
    : isRu
    ? "Бизнес-диагностический тест | Илхом Бегимкулов"
    : "Business Diagnostic Test | Ilhom Begimqulov";

  const description = isUz
    ? "Biznesingiz egasisiz ishlay oladimi? 10 ta savol orqali operatsion boshqaruv tizimingizni 2 daqiqada tahlil qiling va darhol natija oling."
    : isRu
    ? "Может ли ваш бизнес работать без вас? Оцените операционную систему по 10 критериям за 2 минуты и получите персональный аудит."
    : "Can your business run without you? Evaluate your operational management in 2 minutes across 10 benchmarks and get immediate results.";

  const pagePath = locale === "uz" ? "/test" : `/${locale}/test`;
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uz: `${SITE_URL}/uz/test`,
        ru: `${SITE_URL}/ru/test`,
        en: `${SITE_URL}/en/test`,
        "x-default": `${SITE_URL}/uz/test`,
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

export default async function TestPage({ params }: TestPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Navbar />

      <main className="flex-1 pt-20 flex flex-col items-center justify-center">
        <QuizView />
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
