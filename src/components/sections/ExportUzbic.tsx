import React from "react";
import Image from "next/image";
import { getContent } from "@/config/content";
import { siteMedia } from "@/config/siteMedia";

interface ExportUzbicProps {
  locale?: string;
}

export const ExportUzbic: React.FC<ExportUzbicProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  return (
    <section id="eksport" className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#1C1A17]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.exportUzbic.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.exportUzbic.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              {content.exportUzbic.titleEmphasis}
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.exportUzbic.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Export Geography Blueprint vs UZBIC Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Industrial Export Destinations Matrix */}
          <div className="lg:col-span-6 mold-card p-6 sm:p-8 bg-[#EBE4D6] border border-[#1C1A17]/20 flex flex-col justify-between">
            <span className="corner-mark-tl" />
            <span className="corner-mark-br" />

            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1C1A17]/15 font-mono text-xs text-[#6B645A]">
                <span className="text-[#E2541B] font-semibold">LOGISTIKA MATRITSASI</span>
                <span>HARITYA KODI: EXP-UZ-2026</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1C1A17] mb-3">
                {content.exportUzbic.exportMapTitle}
              </h3>

              <p className="text-sm text-[#6B645A] mb-6 leading-relaxed">
                Toybola, Samtech va boshqa sanoat korxonalarining mahsulotlari xalqaro sifat sertifikatlari bilan quyidagi davlatlarga muntazam eksport qilinmoqda:
              </p>

              {/* Destination Pill Tags in JetBrains Mono */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {content.exportUzbic.destinations.map((dest) => (
                  <div
                    key={dest}
                    className="p-2.5 bg-[#F4EFE6] border border-[#1C1A17]/15 rounded-[1px] font-mono text-xs text-[#1C1A17] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#E2541B] shrink-0" />
                    <span className="truncate">{dest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industrial Blueprint Dimension footer */}
            <div className="pt-4 border-t border-[#1C1A17]/15 font-mono text-xs text-[#6B645A] flex items-center justify-between">
              <span>STANDART: INCOTERMS 2020</span>
              <span className="text-[#1F2F5C] font-semibold">15+ MAMLAQAT BOZORLARI</span>
            </div>
          </div>

          {/* Right Column: UZBIC Council & Export Mission */}
          <div className="lg:col-span-6 mold-card p-6 sm:p-8 bg-[#F4EFE6] border border-[#1C1A17]/20 flex flex-col justify-between">
            <span className="corner-mark-tl" />
            <span className="corner-mark-br" />

            <div>
              {/* Header with UZBIC Logo */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1C1A17]/15">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#1F2F5C] uppercase block mb-1">
                    {content.exportUzbic.uzbicCard.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
                    {content.exportUzbic.uzbicCard.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#6B645A] mt-0.5">
                    {content.exportUzbic.uzbicCard.acronymMeaning}
                  </p>
                </div>

                <div className="relative w-14 h-14 p-2 bg-[#EBE4D6] border border-[#1C1A17]/15 rounded-[2px] shrink-0">
                  <Image
                    src={siteMedia.companies.uzbic.logo}
                    alt={siteMedia.companies.uzbic.alt}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>

              {/* Mission Statement */}
              <p className="text-sm sm:text-base text-[#1C1A17]/85 leading-relaxed mb-6">
                {content.exportUzbic.uzbicCard.mission}
              </p>

              {/* 3 Strategic Pillars */}
              <div className="space-y-4 mb-8">
                {content.exportUzbic.uzbicCard.pillars.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    className="p-3.5 bg-[#EBE4D6]/60 border border-[#1C1A17]/10 rounded-[1px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#E2541B]">
                        0{idx + 1}.
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#1C1A17]">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#6B645A] leading-relaxed pl-5">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to UZBIC Official Site */}
            <div className="pt-4 border-t border-[#1C1A17]/15 flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B645A]">
                KENGASH PLATFORMASI
              </span>
              <a
                href={content.exportUzbic.uzbicCard.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target-48 font-mono text-xs tracking-wider uppercase font-semibold text-[#1C1A17] hover:text-[#E2541B] flex items-center gap-1.5 transition-colors"
              >
                <span>{content.exportUzbic.uzbicCard.linkText}</span>
                <span className="text-[#E2541B]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

