"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteMedia } from "@/config/siteMedia";
import { Lightbox, LightboxMedia } from "@/components/ui/Lightbox";

export function Diplomas() {
  const t = useTranslations("diplomas");
  const diplomas = siteMedia.diplomas;
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);

  return (
    <section
      id="sertifikatlar"
      aria-label="Diplom va sertifikatlar"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="11"
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {diplomas.map((doc, idx) => (
            <article
              key={doc.id}
              onClick={() =>
                setActiveMedia({
                  src: doc.src,
                  title: doc.title,
                  issuer: doc.issuer,
                  year: doc.year,
                  alt: doc.alt,
                })
              }
              className="group border border-border bg-elevated/40 p-4 sm:p-6 flex flex-col justify-between cursor-pointer hover:border-gold/60 transition-all duration-300 rounded-[2px] h-full hover:shadow-[0_4px_24px_rgba(197,168,128,0.1)]"
            >
              {/* Document Thumbnail Container - Portrait Aspect Ratio to prevent cropping */}
              <div className="relative aspect-[1/1.44] w-full border border-border/80 bg-[#0F0F0F] rounded-[4px] overflow-hidden p-2 sm:p-2.5 mb-6 group-hover:border-gold/50 transition-colors">
                <div className="relative w-full h-full rounded-[2px] overflow-hidden">
                  <Image
                    src={doc.thumb}
                    alt={doc.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain contrast-105 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Inspect Overlay Indicator */}
                <div className="absolute inset-0 bg-base/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-gold font-medium border border-gold/40 px-3.5 py-2 bg-base/90 rounded-[2px] shadow-lg flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>{t("zoomHint")}</span>
                  </span>
                </div>
              </div>

              {/* Document Meta */}
              <div className="border-t border-border-subtle pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-gold">
                  <span className="font-serif">/0{idx + 1}</span>
                  <span className="font-sans tracking-widest">{doc.year}</span>
                </div>
                <h3 className="font-serif text-lg text-white font-normal group-hover:text-gold transition-colors line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-xs text-muted font-light">
                  {doc.issuer}
                </p>
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
