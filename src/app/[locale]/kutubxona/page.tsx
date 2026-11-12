import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { featuresConfig } from "@/config/features";
import { MediaLibraryView } from "@/features/media-library/components/MediaLibraryView";
import { getMediaLibraryUiCopy } from "@/features/media-library/config/mediaLibraryContent";
import { routing } from "@/i18n/routing";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  if (!featuresConfig.mediaLibrary) {
    return [];
  }
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  if (!featuresConfig.mediaLibrary) {
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

  const ui = getMediaLibraryUiCopy(locale);

  return buildLocalizedMetadata({
    locale,
    routeSegment: "kutubxona",
    title: ui.meta.title,
    description: ui.meta.description,
    siteName: "Anvar Abduqayum",
  });
}

export default async function MediaLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!featuresConfig.mediaLibrary) {
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
        <MediaLibraryView locale={locale} />
      </main>
      <Footer locale={locale} />
      <MobileStickyBar locale={locale} />
    </div>
  );
}

