import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { ExecutiveDossier } from "@/components/sections/ExecutiveDossier";
import { Portfolio } from "@/components/sections/Portfolio";
import { Timeline } from "@/components/sections/Timeline";
import { Principles } from "@/components/sections/Principles";
import { Numbers } from "@/components/sections/Numbers";
import { ExportUzbic } from "@/components/sections/ExportUzbic";
import { Mistakes } from "@/components/sections/Mistakes";
import { MediaSection } from "@/components/sections/MediaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ConsultingModule } from "@/components/sections/ConsultingModule";
import { InvestmentModule } from "@/components/sections/InvestmentModule";
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
        {/* Section 01: Hero (Blueprint Portrait + 5-sec Proof + Primary Telegram CTA) */}
        {featuresConfig.sections.hero && <Hero locale={locale} />}

        {/* Section 02: Phase 2.2 Executive Dossier (Services & Consulting) */}
        {featuresConfig.sections.dossier && <ExecutiveDossier locale={locale} />}

        {/* Section 02: Biznes portfeli (Mold sheet module cards: 7 enterprises) */}
        {featuresConfig.sections.portfolio && <Portfolio locale={locale} />}

        {/* Section 03: Yo'l (Timeline from first business to today) */}
        {featuresConfig.sections.timeline && <Timeline locale={locale} />}

        {/* Section 04: Qolip tamoyili (How businesses run without owner: CSS/SVG snapping modules) */}
        {featuresConfig.sections.principles && <Principles locale={locale} />}

        {/* Section 05: Raqamlar (Animated mono counters) */}
        {featuresConfig.sections.numbers && <Numbers locale={locale} />}

        {/* Section 06: Eksport va UZBIC (Export geography & Council platform) */}
        {featuresConfig.sections.exportUzbic && <ExportUzbic locale={locale} />}

        {/* Section 07: Mening xatolarim (Honest interview lessons & system fixes) */}
        {featuresConfig.sections.mistakes && <Mistakes locale={locale} />}

        {/* Section 08: Media (YouTube interviews + Press coverage) */}
        {featuresConfig.sections.media && <MediaSection locale={locale} />}

        {/* Section 09: Aloqa (Telegram, Socials + Protected Contact Form) */}
        {featuresConfig.sections.contact && <ContactSection locale={locale} />}

        {/* Future Modules - strictly governed by feature flags (disabled in v1) */}
        {featuresConfig.consulting && <ConsultingModule />}
        {featuresConfig.investment && <InvestmentModule />}
      </main>

      {/* Blueprint Industrial Footer & Mobile Sticky Bar */}
      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}
