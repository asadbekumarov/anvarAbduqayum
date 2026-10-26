"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";
import { Lightbox, LightboxMedia } from "@/components/ui/Lightbox";
import { formatSectionKicker } from "@/config/sections";

export function Expert() {
  const t = useTranslations("expert");
  const { portrait } = siteMedia.expert;
  const diplomas = siteMedia.diplomas;
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);

  return (
    <section
      id="ekspert"
      aria-label={t("name")}
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/40 to-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      {/* Subtle midnight navy atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-1/3 w-[500px] h-[500px] bg-[#0B132B]/50 blur-[140px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top Section Kicker */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-[1px] bg-[#C5A880]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
            {formatSectionKicker("expert", t("kicker"))}
          </span>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Editorial Portrait (lg:col-span-5) */}
          <div className="lg:col-span-5 group">
            <div className="relative aspect-[3/4] w-full bg-[#0F172A]/40 overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(7,13,31,0.5)]">
              <KenBurnsImage>
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover w-full h-full contrast-[1.05] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  loading="lazy"
                />
              </KenBurnsImage>
            </div>

            {/* Below Image Metadata Bar */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.18em] text-platinum transition-transform duration-500 group-hover:translate-x-1">
              <span>{t("name")}</span>
              <span className="text-platinum-light">{t("experience")}</span>
            </div>
          </div>

          {/* Right Column — Biography, Editorial Quote & 3 Pillars (lg:col-span-7 space-y-10) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Headline with Editorial Masked Reveal */}
            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.12] text-white">
              {t("headlinePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("headlineHighlight")}
              </span>
              {t("headlineSuffix")}
            </MaskedHeading>

            {/* Editorial Pull-Quote */}
            <blockquote className="border-l border-platinum/40 pl-6 py-1 font-serif italic text-xl sm:text-2xl text-neutral-200 leading-relaxed">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            {/* Biography Prose */}
            <div className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed space-y-4">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
            </div>

            {/* The 3 Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] pt-0">
              {/* Pillar 1 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-xs text-platinum tracking-[0.16em] block mb-2">
                  {t("pillar1Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar1Title")}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {t("pillar1Desc")}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-xs text-platinum tracking-[0.16em] block mb-2">
                  {t("pillar2Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar2Title")}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {t("pillar2Desc")}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-xs text-platinum tracking-[0.16em] block mb-2">
                  {t("pillar3Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar3Title")}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {t("pillar3Desc")}
                </p>
              </div>
            </div>

            {/* Embedded International Certificates & Diplomas */}
            <div id="sertifikatlar" className="pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-platinum">
                  {t("certificatesHint")}
                </span>
                <span className="font-mono text-xs text-platinum-light uppercase tracking-wider">
                  / 03
                </span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar">
                {diplomas.map((doc, idx) => (
                  <div
                    key={doc.id || idx}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setActiveMedia({
                        src: doc.src,
                        title: doc.title,
                        issuer: doc.issuer,
                        year: doc.year,
                        alt: doc.alt,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveMedia({
                          src: doc.src,
                          title: doc.title,
                          issuer: doc.issuer,
                          year: doc.year,
                          alt: doc.alt,
                        });
                      }
                    }}
                    aria-label={`${doc.title} — zoom`}
                    className="group relative w-[180px] sm:w-[210px] shrink-0 bg-[#0B132B]/25 hover:bg-[#0B132B]/50 border border-white/[0.08] hover:border-platinum/30 p-3 transition-all duration-300 rounded-none cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141414] mb-2 border border-white/[0.04] flex items-center justify-center p-1.5">
                      <Image
                        src={doc.thumb}
                        alt={doc.alt}
                        fill
                        loading="lazy"
                        sizes="210px"
                        className="object-contain w-full h-full grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500 ease-out"
                      />
                      <div className="absolute bottom-1 right-1 bg-[#070D1F]/90 border border-white/[0.1] px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Zoom
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-normal text-white truncate group-hover:translate-x-0.5 transition-transform">
                          {doc.title}
                        </h4>
                        {doc.issuer && (
                          <p className="text-xs text-neutral-300 font-light truncate mt-0.5">
                            {doc.issuer}
                          </p>
                        )}
                      </div>
                      <span className="font-mono text-xs text-platinum shrink-0">
                        {doc.year || "CERT"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        isOpen={Boolean(activeMedia)}
        onClose={() => setActiveMedia(null)}
        media={activeMedia}
      />
    </section>
  );
}
