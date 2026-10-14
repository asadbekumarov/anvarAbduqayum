"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diplomas.map((doc, idx) => (
            <TiltCard
              key={doc.id}
              className="h-full rounded-[2px]"
            >
              <article
                onClick={() =>
                  setActiveMedia({
                    src: doc.src,
                    title: doc.title,
                    issuer: doc.issuer,
                    year: doc.year,
                    alt: doc.alt,
                  })
                }
                className="group border border-border bg-elevated/40 p-6 flex flex-col justify-between cursor-pointer hover:border-gold/60 transition-all duration-300 rounded-[2px] h-full"
              >
                {/* Document Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full border border-border-subtle bg-base overflow-hidden mb-6">
                  <Image
                    src={doc.thumb}
                    alt={doc.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />

                  {/* Inspect Overlay Indicator */}
                  <div className="absolute inset-0 bg-base/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-gold font-medium border border-gold/40 px-3 py-1.5 bg-base/90">
                      {t("zoomHint")}
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
            </TiltCard>
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
