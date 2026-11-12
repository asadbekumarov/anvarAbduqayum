import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Principles } from "@/components/sections/Principles";
import { MediaSection } from "@/components/sections/MediaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { featuresConfig } from "@/config/features";
import { getContent } from "@/config/content";
import { getDemoCopy } from "@/config/demoCopy";
import { buildLocalizedMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-alabaster)] text-[var(--text-ink)] antialiased">
      {/* Blueprint Industrial Top Navigation */}
      <Navbar locale={locale} />

      <main className="flex-1">
        {/* 01 — Hero */}
        {featuresConfig.sections.hero && <Hero locale={locale} />}

        {/* 02 — Business Portfolio */}
        {featuresConfig.sections.portfolio && <Portfolio locale={locale} />}

        {/* 03 — Management Philosophy (The Mold / Qolip Principle) */}
        {featuresConfig.sections.principles && <Principles locale={locale} />}

        {/* 04 — Business Knowledge & Media */}
        {featuresConfig.sections.media && <MediaSection locale={locale} />}

        {/* 05 — Official Contact */}
        {featuresConfig.sections.contact && <ContactSection locale={locale} />}
      </main>

      {/* Blueprint Industrial Footer & Mobile Sticky Bar */}
      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}
