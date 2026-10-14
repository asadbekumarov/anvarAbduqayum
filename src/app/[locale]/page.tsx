import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { EventsTour } from "@/components/sections/EventsTour";
import { Stages } from "@/components/sections/Stages";
import { Partners } from "@/components/sections/Partners";
import { CtaBand } from "@/components/sections/CtaBand";
import { Expert } from "@/components/sections/Expert";
import { Testimonials } from "@/components/sections/Testimonials";
import { Book } from "@/components/sections/Book";
import { Webinars } from "@/components/sections/Webinars";
import { Diplomas } from "@/components/sections/Diplomas";
import { Contact } from "@/components/sections/Contact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

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
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: Services (6 table-like rows) */}
        <RevealOnScroll>
          <Services />
        </RevealOnScroll>

        {/* Section 03: EventsTour (6 Latin city posters) */}
        <RevealOnScroll>
          <EventsTour />
        </RevealOnScroll>

        {/* Section 04: Stages (2 tabs + 6-step accordion) */}
        <RevealOnScroll>
          <Stages />
        </RevealOnScroll>

        {/* Section 05: Partners (27 logos continuous marquee) */}
        <RevealOnScroll>
          <Partners />
        </RevealOnScroll>

        {/* Section 06: CTA Band (High-contrast editorial callout) */}
        <RevealOnScroll>
          <CtaBand />
        </RevealOnScroll>

        {/* Section 07: Expert (Biography, philosophy pillars) */}
        <RevealOnScroll>
          <Expert />
        </RevealOnScroll>

        {/* Section 08: Testimonials (13 video cases in responsive strip) */}
        <RevealOnScroll>
          <Testimonials />
        </RevealOnScroll>

        {/* Section 09: Book (Biznes shpargalkasi kitobi) */}
        <RevealOnScroll>
          <Book />
        </RevealOnScroll>

        {/* Section 10: Webinars (14 masterclass archive videos) */}
        <RevealOnScroll>
          <Webinars />
        </RevealOnScroll>

        {/* Section 11: Diplomas (3 credentials + Lightbox zoom) */}
        <RevealOnScroll>
          <Diplomas />
        </RevealOnScroll>

        {/* Section 12: Contact (Direct channels, address, and consultation trigger) */}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>

        {/* Section 13: Tests Anchor Target */}
        <RevealOnScroll>
          <section id="testlar" className="py-12 border-b border-border/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader
                index="13"
                kicker="BIZNES DIAGNOSTIKA"
                title="Biznes salomatligini aniqlash testi"
                description="Tez orada taqdim etiladi."
              />
            </div>
          </section>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
}
