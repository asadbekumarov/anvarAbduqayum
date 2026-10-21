import React from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { EventsTour } from "@/components/sections/EventsTour";
import { Partners } from "@/components/sections/Partners";
import { CtaBand } from "@/components/sections/CtaBand";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// Dynamic imports for heavy below-fold sections to reduce TBT
const Stages = dynamic(() => import("@/components/sections/Stages").then((m) => m.Stages));
const Expert = dynamic(() => import("@/components/sections/Expert").then((m) => m.Expert));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));
const Book = dynamic(() => import("@/components/sections/Book").then((m) => m.Book));
const Webinars = dynamic(() => import("@/components/sections/Webinars").then((m) => m.Webinars));
const Diplomas = dynamic(() => import("@/components/sections/Diplomas").then((m) => m.Diplomas));
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
      </main>

      <Footer />
    </div>
  );
}
