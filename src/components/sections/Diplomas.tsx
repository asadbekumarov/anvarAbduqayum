"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { Lightbox, LightboxMedia } from "@/components/ui/Lightbox";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";

export function Diplomas() {
  const t = useTranslations("diplomas");
  const diplomas = siteMedia.diplomas;
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);

  return (
    <section
      id="sertifikatlar"
      aria-label={t("title")}
      className="bg-[#0A0A0A] border-t border-white/[0.07] py-24 sm:py-32"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Header Row */}
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C5A880]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>

          {/* H2 Heading with Editorial Masked Reveal */}
          <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-5">
            {t("titlePrefix")}
            <span className="font-serif italic font-normal text-white/90">
              {t("titleHighlight")}
            </span>
          </MaskedHeading>

          <p className="text-base text-neutral-300 font-light max-w-xl mt-4 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Certificate Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {diplomas.map((doc, idx) => (
            <article
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
              aria-label={`${doc.title} — ${t("zoomHint")}`}
              className="group relative bg-[#0B132B]/20 border border-white/[0.08] p-4 sm:p-6 cursor-pointer hover:border-platinum/30 hover:bg-[#0B132B]/40 transition-all duration-500 rounded-none flex flex-col justify-between"
            >
              {/* Image Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141414] mb-4 border border-white/[0.04] flex items-center justify-center p-2">
                <KenBurnsImage delay={idx * 0.08}>
                  <Image
                    src={doc.thumb}
                    alt={doc.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain w-full h-full grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                </KenBurnsImage>

                {/* Lightbox Trigger Overlay */}
                <div className="absolute bottom-3 right-3 bg-[#070D1F]/90 border border-white/[0.12] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none z-10">
                  <span>{t("zoomHint")}</span>
                </div>
              </div>

              {/* Certificate Footer (Below Image) */}
              <div className="flex items-baseline justify-between pt-3 border-t border-white/[0.06] gap-4 transition-transform duration-500 ease-out group-hover:translate-x-1">
                <h3 className="text-sm font-normal text-white leading-snug line-clamp-2">
                  {doc.title}
                </h3>
                <span className="font-mono text-[10px] text-platinum-light uppercase tracking-wider shrink-0">
                  {doc.year ? `${doc.year}` : t("badgeLabel")}
                </span>
              </div>
            </article>
          ))}
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
