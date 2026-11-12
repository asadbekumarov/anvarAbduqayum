import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { featuresConfig } from "@/config/features";
import { VentureDossierView } from "@/features/dossiers/components/VentureDossierView";
import {
  getAllVentureSlugs,
  getVentureDossier,
} from "@/features/dossiers/config/dossierData";
import { routing } from "@/i18n/routing";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  if (!featuresConfig.ventureDossiers) {
    return [];
  }

  return routing.locales.flatMap((locale) =>
    getAllVentureSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  if (!featuresConfig.ventureDossiers) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const dossier = getVentureDossier(locale, slug);
  if (!dossier) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${dossier.company.name} — ${dossier.ui.breadcrumbs.portfolio} | Anvar Abduqayum`;
  const description = dossier.company.desc;

  return buildLocalizedMetadata({
    locale,
    routeSegment: `portfel/${slug}`,
    title,
    description,
    siteName: "Anvar Abduqayum",
  });
}

export default async function VentureDossierPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  if (!featuresConfig.ventureDossiers) {
    notFound();
  }

  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const dossier = getVentureDossier(locale, slug);
  if (!dossier) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-alabaster)]">
      <Navbar locale={locale} />
      <main className="flex-1 pt-16 pb-20 md:pb-8">
        <VentureDossierView dossier={dossier} />
      </main>
      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}

