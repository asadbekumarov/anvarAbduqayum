import React from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Dynamic imports for heavy below-fold sections to reduce TBT
const Stages = dynamic(() => import("@/components/sections/Stages").then((m) => m.Stages));
const Expert = dynamic(() => import("@/components/sections/Expert").then((m) => m.Expert));
const MediaArchive = dynamic(() => import("@/components/sections/MediaArchive").then((m) => m.MediaArchive));
const BookCtaSplit = dynamic(() => import("@/components/sections/BookCtaSplit").then((m) => m.BookCtaSplit));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-base text-white">
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

        {/* Section 07: Executive Contact Channels & Quick Consultation Form */}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
}
