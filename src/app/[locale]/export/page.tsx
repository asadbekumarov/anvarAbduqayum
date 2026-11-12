import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { featuresConfig } from "@/config/features";
import { ExportPortalView } from "@/features/export-portal/components/ExportPortalView";
import { getExportPortalContent } from "@/features/export-portal/config/exportPortalContent";
import { routing } from "@/i18n/routing";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  if (!featuresConfig.exportPortal) {
    return [];
  }
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  if (!featuresConfig.exportPortal) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const content = getExportPortalContent(locale);

  return buildLocalizedMetadata({
    locale,
    routeSegment: "export",
    title: content.meta.title,
    description: content.meta.description,
    siteName: "Anvar Abduqayum",
  });
}

export default async function ExportPortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!featuresConfig.exportPortal) {
    notFound();
  }

  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-alabaster)]">
      <Navbar locale={locale} />
      <main className="flex-1 pt-16 pb-20 md:pb-8">
        <ExportPortalView
          locale={locale}
          isPartnershipIntakeEnabled={featuresConfig.partnershipIntake}
        />
      </main>
      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}

