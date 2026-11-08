import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/config/content";
import { siteMedia } from "@/config/siteMedia";

interface HeroProps {
  locale?: string;
}

export const Hero: React.FC<HeroProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  const kickerBadge =
    content.hero.kickerBadge || "Sanoat • Amaliyot • Boshqaruv";
  const kickerText =
    content.hero.kickerText || "Toshkent • 20+ yillik tajriba";

  const metrics = content.hero.verifiedMetrics || [
    {
      value: "2005-yildan",
      label: "Ishlab chiqarish va tadbirkorlik amaliyoti",
    },
    {
      value: "Ko'p tarmoqli",
      label: "Sanoat, polimer, elektrotexnika va HoReCa korxonalari",
    },
    {
      value: "Xalqaro bozorlar",
      label: "MDH va xorijiy davlatlarga muntazam eksport",
    },
  ];

  const brands = content.hero.brands || [
    "TOYBOLA TOYS",
    "SAMTECH MASTERBATCHES",
    "VISAGE ELECTRIC",
    "PURO GELATERIA",
    "AFIYET KEBAB",
    "UZBIC COUNCIL",
    "IT SUPPORT",
  ];

  const bookingHref = `/${locale}/bron`;

  return (
    <>
      <section
        id="hero"
        className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-24 overflow-hidden border-b border-white/[0.09] bg-[#090A0D]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 25%, rgba(217, 119, 54, 0.08) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* =========================================================================
              MOBILE & TABLET HERO (lg:hidden) — VARIANT A: VISUAL AUTHORITY FIRST
              Hierarchy: 1. Headline -> 2. Compact Portrait -> 3. Description -> 4. CTAs -> 5. Compact Metrics
              ========================================================================= */}
          <div className="block lg:hidden space-y-4 sm:space-y-5">
            {/* 1. Kicker & Headline */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/[0.05] border border-white/[0.12] rounded-[3px] font-mono text-[11px] text-[#D97736] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
                <span>{kickerBadge}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-[1.14] tracking-tight text-white">
                <span className="font-editorial-italic font-normal text-[#E89E6C] block sm:inline">
                  {content.hero.headlineEmphasis}
                </span>{" "}
                <span>{content.hero.headlineSuffix}</span>
              </h1>
            </div>

            {/* 2. Compact Portrait Stage (Immediately establishes founder authority) */}
            <div className="rounded-[6px] overflow-hidden bg-[#111318] border border-white/[0.1] shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0d0f14]">
                <Image
                  src={siteMedia.hero.portrait.src}
                  alt={siteMedia.hero.portrait.alt || "Anvar Abduqayum"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                  className="object-cover object-top filter contrast-[1.02] brightness-[0.98]"
                />
              </div>
              <div className="py-2 px-3 bg-[#0e1017] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8E95A5]">
                <span className="font-medium text-white/90">Anvar Abduqayum</span>
                <span className="text-[10px] text-[#8E95A5] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                  {content.hero.portraitBadge || "Vaqtinchalik rasm"}
                </span>
              </div>
            </div>

            {/* 3. Short Editorial Lead */}
            <p className="text-sm sm:text-base text-[#A4ACB9] leading-relaxed">
              {content.hero.summary}
            </p>

            {/* 4. Action CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href={bookingHref}
                className="tap-target-48 px-6 py-3 bg-[#D97736] hover:bg-[#E68545] text-[#090A0D] font-mono text-xs font-bold tracking-wide rounded-[3px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(217,119,54,0.28)] transition-authority active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{content.hero.ctaPrimary}</span>
                <span>&rarr;</span>
              </Link>

              <a
                href="#xizmatlar"
                className="tap-target-48 px-5 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono text-xs font-semibold tracking-wide rounded-[3px] border border-white/[0.14] flex items-center justify-center gap-2 transition-authority focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736]"
              >
                <span>{content.hero.ctaSecondary}</span>
                <span className="text-[#D97736]">&darr;</span>
              </a>
            </div>

            {/* 5. Compact Credibility Metrics (1-row grid on mobile) */}
            <div className="pt-3 border-t border-white/[0.09] grid grid-cols-3 gap-2 sm:gap-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-[3px] p-2.5 text-center">
                  <span className="font-mono text-xs sm:text-base font-bold text-white block leading-tight">
                    {metric.value}
                  </span>
                  <p className="text-[10px] text-[#8E95A5] leading-tight mt-1 line-clamp-2">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              DESKTOP HERO (hidden lg:grid) — 100% PRESERVED CONCEPT D ARCHITECTURE
              Asymmetrical two-column grid: Left content & proof, Right 4:5 portrait frame
              ========================================================================= */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Who, What, Verified Evidence */}
            <div className="lg:col-span-7 space-y-6">
              {/* Kicker Strip */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs px-2.5 py-1 bg-white/[0.05] border border-white/[0.12] rounded-[3px] text-[#D97736] font-medium tracking-wide">
                  {kickerBadge}
                </span>
                <span className="font-mono text-xs text-[#8E95A5]">
                  {kickerText}
                </span>
              </div>

              {/* Headline with Playfair Display italic emphasis */}
              <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-white">
                <span className="font-editorial-italic font-normal text-[#E89E6C] inline">
                  {content.hero.headlineEmphasis}
                </span>{" "}
                <span>{content.hero.headlineSuffix}</span>
              </h1>

              {/* Editorial Lead Summary */}
              <p className="text-base lg:text-lg text-[#A4ACB9] leading-relaxed max-w-2xl">
                {content.hero.summary}
              </p>

              {/* Verified Evidence Row */}
              <div className="pt-4 border-t border-white/[0.09] grid grid-cols-3 gap-6">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                      {metric.value}
                    </span>
                    <p className="text-xs text-[#8E95A5] leading-snug">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs: Primary Consultation CTA + Secondary Services Anchor */}
              <div className="pt-3 flex items-center gap-4">
                <Link
                  href={bookingHref}
                  className="tap-target-48 px-7 py-3.5 bg-[#D97736] hover:bg-[#E68545] text-[#090A0D] font-mono text-xs font-bold tracking-wide rounded-[3px] flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(217,119,54,0.28)] transition-authority active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D]"
                >
                  <span>{content.hero.ctaPrimary}</span>
                  <span>&rarr;</span>
                </Link>

                <a
                  href="#xizmatlar"
                  className="tap-target-48 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono text-xs font-semibold tracking-wide rounded-[3px] border border-white/[0.14] hover:border-white/[0.3] flex items-center justify-center gap-2 transition-authority focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D]"
                >
                  <span>{content.hero.ctaSecondary}</span>
                  <span className="text-[#D97736]">&darr;</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean, Subtle Frame Without Text Overlays */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-[6px] overflow-hidden bg-[#111318] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  {/* Portrait Image (Preserves 4:5 aspect ratio, clean, no text on top) */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0d0f14]">
                    <Image
                      src={siteMedia.hero.portrait.src}
                      alt={siteMedia.hero.portrait.alt || "Anvar Abduqayum"}
                      fill
                      sizes="(max-width: 1200px) 50vw, 40vw"
                      priority
                      className="object-cover object-top filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 hover:scale-[1.01]"
                    />
                  </div>

                  {/* Discreet Understated Caption Bar Below the Image */}
                  <div className="py-2.5 px-3.5 bg-[#0e1017] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#8E95A5]">
                    <span className="font-medium text-white/90">
                      Anvar Abduqayum
                    </span>
                    <span className="text-[10px] text-[#8E95A5] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                      {content.hero.portraitBadge || "Vaqtinchalik rasm asseti"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Verified Brands Strip (Marquee Bar) */}
      <div className="bg-[#060709] border-b border-white/[0.08] py-3.5 sm:py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-6 font-mono text-xs sm:text-[13px] text-[#7A8292] tracking-wider">
            {brands.map((brand, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
                <span className="hover:text-white transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
