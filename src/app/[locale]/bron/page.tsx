import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { BookingView } from "@/features/booking/components/BookingView";
import { activeBookingMode } from "@/config/booking";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";
import { buildLocalizedMetadata } from "@/lib/seo";
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

  const isDemo = featuresConfig.demoMode;
  const demoMeta = getDemoCopy(locale).meta;

  const baseTitle =
    activeBookingMode === "calcom"
      ? isUz
        ? "Strategik uchrashuv | Anvar Abduqayum"
        : isRu
        ? "Стратегическая встреча | Анвар Абдукаюм"
        : "Strategic Meeting | Anvar Abduqayum"
      : isUz
      ? "Uchrashuv bo‘yicha yozish | Anvar Abduqayum"
      : isRu
      ? "Записаться через Telegram | Анвар Абдукаюм"
      : "Arrange a Meeting via Telegram | Anvar Abduqayum";

  const title = isDemo ? `${baseTitle} — ${demoMeta.bronTitleSuffix}` : baseTitle;

  const baseDescription =
    activeBookingMode === "calcom"
      ? isUz
        ? "Anvar Abduqayum bilan uchrashuv uchun qulay vaqtni tanlang."
        : isRu
        ? "Выберите удобное время для встречи с Анваром Абдукаюмом."
        : "Select a convenient time for a strategic consultation with Anvar Abduqayum."
      : isUz
      ? "Anvar Abduqayum bilan uchrashuv va hamkorlik masalalarini kelishish uchun rasmiy Telegram administrator orqali bog‘laning."
      : isRu
      ? "Согласуйте встречу или вопросы сотрудничества напрямую через официального Telegram-администратора Анвара Абдукаюма."
      : "Coordinate consultation inquiries and strategic meetings directly through Anvar Abduqayum's verified Telegram administrator.";

  const description = isDemo ? demoMeta.bronDescription : baseDescription;
  const siteName = isDemo ? demoMeta.siteName : "Anvar Abduqayum";

  return buildLocalizedMetadata({
    locale,
    routeSegment: "bron",
    title,
    description,
    siteName,
  });
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-alabaster)] text-[var(--text-ink)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-surface)]">
      <Navbar locale={locale} />

      <main
        className={`flex-1 ${
          featuresConfig.demoMode
            ? "pt-6 sm:pt-10"
            : "pt-24 sm:pt-28"
        } pb-16 sm:pb-20 flex flex-col`}
      >
        <BookingView />
      </main>

      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}
