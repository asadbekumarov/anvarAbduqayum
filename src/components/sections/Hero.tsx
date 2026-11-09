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
    content.hero.kickerBadge || "MONOGRAF // SANOAT VA TIZIMLI BOSHQARUV";

  const metrics = content.hero.verifiedMetrics || [
    {
      value: "2004-yildan",
      label: "Tijorat va xalqaro savdo amaliyoti",
    },
    {
      value: "2012-yildan",
      label: "Toybola fabrikasi tashkil etilishi",
    },
    {
      value: "7 tizim",
      label: "Sanoat, polimer, HoReCa va IT tashabbusi",
    },
  ];

  const bookingHref = `/${locale}/bron`;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-[#FBF9F5] border-b border-[rgba(17,18,21,0.1)] pt-24 sm:pt-28 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] xl:grid-cols-[1.2fr_0.8fr] gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column: Monograph Editorial Content */}
          <div className="flex flex-col">
            {/* Kicker Bar */}
            <div className="inline-flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#B8860B] mb-5 sm:mb-6">
              <span className="w-6 h-[1.5px] bg-[#B8860B] shrink-0" aria-hidden="true" />
              <span>{kickerBadge}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-semibold leading-[1.08] text-[#111215] tracking-tight mb-5 sm:mb-7"
            >
              <em className="font-editorial-italic font-normal text-[#B8860B] not-italic pr-2">
                {content.hero.headlineEmphasis}
              </em>{" "}
              <span>{content.hero.headlineSuffix}</span>
            </h1>

            {/* Manifesto / Executive Summary */}
            <p className="text-sm sm:text-base lg:text-lg leading-[1.75] text-[#4B515D] max-w-[620px] mb-7 sm:mb-9">
              {content.hero.summary}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <Link
                href={bookingHref}
                className="min-h-[52px] px-7 sm:px-8 bg-[#111215] text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2.5 border border-[#111215] hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(184,134,11,0.25)] transition-all rounded-[2px]"
              >
                <span>{content.hero.ctaPrimary || "Uchrashuv bronlash"}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href="#xizmatlar"
                className="min-h-[52px] px-6 sm:px-7 bg-transparent text-[#111215] text-xs font-sans font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2 border border-[rgba(17,18,21,0.15)] hover:border-[#111215] hover:bg-white hover:-translate-y-0.5 transition-all rounded-[2px]"
              >
                <span>{content.hero.ctaSecondary || "Xizmatlar va dasturlar"}</span>
              </a>
            </div>

            {/* 3 Verified Metric Columns (Strict Historical Accuracy) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-7 sm:pt-8 border-t border-[rgba(17,18,21,0.1)]"
              aria-label="Tasdiqlangan Sanoat Ko'rsatkichlari"
            >
              {metrics.map((metric, idx) => {
                // Separate base number from suffix if present
                const match = metric.value.match(/^([^\s-]+)([\s-].+)?$/);
                const mainVal = match ? match[1] : metric.value;
                const subVal = match && match[2] ? match[2] : "";

                return (
                  <div key={idx} className="flex flex-col">
                    <span className="font-serif text-2xl sm:text-3xl xl:text-4xl font-semibold text-[#111215] leading-none mb-1.5 block">
                      {mainVal}
                      {subVal && (
                        <span className="text-[#B8860B] text-[0.85em] font-normal">
                          {subVal}
                        </span>
                      )}
                    </span>
                    <span className="text-[11.5px] leading-snug text-[#7A8290] uppercase tracking-wider font-sans block">
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Editorial Gallery Frame with Archival Matting */}
          <div className="w-full max-w-[480px] mx-auto lg:max-w-none">
            <div className="bg-white border border-[rgba(17,18,21,0.1)] p-3.5 sm:p-4 shadow-[0_20px_48px_rgba(17,18,21,0.08)]">
              {/* Archival Passe-Partout Matting */}
              <div className="portrait-archival-mat">
                <div className="portrait-image-wrapper">
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 right-3 z-20 bg-[#111215]/90 backdrop-blur-md border border-[rgba(184,134,11,0.25)] text-[#EDE8DF] px-2.5 py-1.5 font-mono text-[9.5px] tracking-wider uppercase flex items-center justify-between">
                    <span className="text-[#D4AF37] font-bold">ARXIV ASSETI</span>
                    <span>VAQTINCHALIK FOTO</span>
                  </div>

                  {/* Temporary Portrait Photo with Artifact-Free Editorial Framing */}
                  <Image
                    src={siteMedia.hero.portrait.src}
                    alt="Anvar Abduqayum — Sanoatchi, Muhandis-Tadbirkor (Vaqtinchalik arxiv fotosurati)"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="portrait-img-editorial"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 12%",
                      transformOrigin: "center top",
                      transform: "scale(1.24) translateY(-12px)",
                      filter: "contrast(1.04) brightness(0.97)",
                    }}
                  />
                </div>
              </div>

              {/* Museum Editorial Caption */}
              <div className="pt-3.5 mt-3 border-t border-[rgba(17,18,21,0.08)] flex items-end justify-between flex-wrap gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#111215] leading-tight">
                    Anvar Abduqayum
                  </h3>
                  <p className="text-[11.5px] font-mono font-semibold text-[#B8860B] uppercase tracking-wider mt-0.5">
                    {content.hero.portraitRole || "Sanoatchi, Muhandis-Tadbirkor"}
                  </p>
                  <p className="text-[10px] font-mono text-[#7A8290] mt-1 leading-snug">
                    {content.hero.portraitNote ||
                      "[Arxiv fotosurati // Vaqtinchalik vizual asset • Kelgusida tasdiqlangan professional fotosessiya bilan almashtiriladi]"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-semibold text-[#B8860B] tracking-widest block">
                    TOSHKENT &bull; 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
