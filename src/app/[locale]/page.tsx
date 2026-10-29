import React from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

import {
  StagesSkeleton,
  ExpertSkeleton,
  MediaArchiveSkeleton,
  BookCtaSkeleton,
  FAQSkeleton,
  ContactSkeleton,
} from "@/components/ui/skeletons";

// Dynamic imports for heavy below-fold sections with bespoke luxury skeletons to prevent CLS
const Stages = dynamic(
  () => import("@/components/sections/Stages").then((m) => m.Stages),
  { loading: () => <StagesSkeleton /> }
);
const Expert = dynamic(
  () => import("@/components/sections/Expert").then((m) => m.Expert),
  { loading: () => <ExpertSkeleton /> }
);
const MediaArchive = dynamic(
  () => import("@/components/sections/MediaArchive").then((m) => m.MediaArchive),
  { loading: () => <MediaArchiveSkeleton /> }
);
const BookCtaSplit = dynamic(
  () => import("@/components/sections/BookCtaSplit").then((m) => m.BookCtaSplit),
  { loading: () => <BookCtaSkeleton /> }
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <FAQSkeleton /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { loading: () => <ContactSkeleton /> }
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-white">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Section 01: Hero + Metrics + Partner Logos Strip */}
        <Hero />

        {/* Section 02: Services Ledger (6 compact table rows + Free Diagnostics Monolith) */}
        <RevealOnScroll>
          <Services />
        </RevealOnScroll>

        {/* Section 03: Stages Methodology Blueprint (2 tabs + compact accordion) */}
        <RevealOnScroll>
          <Stages />
        </RevealOnScroll>

        {/* Section 04: Founder Monograph + Compact Diplomas Strip with Lightbox */}
        <RevealOnScroll>
          <Expert />
        </RevealOnScroll>

        {/* Section 05: Tabbed Media, Cases & Business Tour Hub (Testimonials + Webinars + EventsTour) */}
        <RevealOnScroll>
          <MediaArchive />
        </RevealOnScroll>

        {/* Section 06: Book & Strategic Diagnostic Split-Screen */}
        <RevealOnScroll>
          <BookCtaSplit />
        </RevealOnScroll>

        {/* Section 07: High-Impact FAQ Architecture with Live Search & Categories */}
        <RevealOnScroll>
          <FAQ />
        </RevealOnScroll>

        {/* Section 08: Executive Contact Channels & Quick Consultation Form */}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
