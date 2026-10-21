"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";

interface BookCtaSplitProps {
  onOpenApply?: (serviceName?: string) => void;
}

export function BookCtaSplit({ onOpenApply }: BookCtaSplitProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const tBook = useTranslations("book");
  const tCta = useTranslations("ctaBand");
  const locale = useLocale();
  const isRu = locale === "ru";
  const { cover } = siteMedia.book;

  const handleOrderBook = () => {
    const bookTitle = isRu
      ? "Книга «Бизнес шпаргалка»"
      : "“Biznes shpargalkasi” kitobi";
    handleApply(bookTitle);
  };

  const specs = [
    { label: tBook("spec1Label"), value: tBook("spec1Value") },
    { label: tBook("spec2Label"), value: tBook("spec2Value") },
    { label: tBook("spec3Label"), value: tBook("spec3Value") },
  ];

  return (
    <section
      id="kitob"
      aria-label={isRu ? "Книга и стратегический разбор" : "Kitob va strategik tahlil"}
      className="scroll-mt-20 py-14 sm:py-20 border-t border-b border-white/[0.08] bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/30 to-[#0A0A0A] relative overflow-hidden"
    >
      {/* Anchor for CtaBand */}
      <span id="cta-band" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric ambient depth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#0F172A]/50 blur-[140px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 7 Columns: Book Presentation (Compact Split Card) */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(7,13,31,0.4)]">
            <div>
              {/* Kicker */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#C5A880]" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
                  {tBook("kicker")}
                </span>
              </div>

              {/* Title */}
              <MaskedHeading className="text-2xl sm:text-4xl font-light tracking-[-0.03em] leading-[1.12] text-white">
                {tBook("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {tBook("titleHighlight")}
                </span>
              </MaskedHeading>

              <p className="text-sm text-neutral-300 font-light mt-3 leading-relaxed max-w-xl">
                {tBook("description")}
              </p>

              {/* Compact Book Card Body: Cover + Specs */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Book Cover Frame (sm:col-span-4) */}
                <div className="sm:col-span-4 flex justify-center">
                  <div className="relative w-[150px] sm:w-[170px] aspect-[1/1.42] shadow-[0_20px_35px_rgba(0,0,0,0.85)] border border-white/[0.08] overflow-hidden transition-transform duration-500 hover:scale-[1.03]">
                    <KenBurnsImage>
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(max-width: 640px) 150px, 170px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </KenBurnsImage>
                  </div>
                </div>

                {/* Specs Ledger (sm:col-span-8) */}
                <div className="sm:col-span-8 flex flex-col justify-center divide-y divide-white/[0.06] border-y sm:border-y-0 border-white/[0.06]">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="py-2.5 flex items-baseline justify-between gap-3 font-mono text-xs"
                    >
                      <span className="uppercase tracking-[0.16em] text-platinum shrink-0 text-[11px]">
                        {spec.label}
                      </span>
                      <span className="text-neutral-300 font-sans text-xs text-right font-light">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-platinum">
                ORIGINAL NASHR
              </span>
              <button
                type="button"
                onClick={handleOrderBook}
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-6 py-3 text-xs uppercase tracking-[0.16em] font-medium rounded-none transition-colors duration-300 cursor-pointer"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{tBook("cta")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: CtaBand Diagnostic Provocation Monolith */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A]/85 via-[#0B132B]/60 to-[#0A0A0A] border border-white/[0.1] hover:border-platinum/30 p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(7,13,31,0.45)] transition-all">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-platinum" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-platinum">
                  {tCta("kicker")}
                </span>
              </div>

              <MaskedHeading className="text-2xl sm:text-3xl font-light tracking-[-0.03em] leading-[1.12] text-white">
                {tCta("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {tCta("titleHighlight")}
                </span>
              </MaskedHeading>

              <p className="text-sm text-neutral-300 font-light mt-4 leading-relaxed">
                {tCta("description")}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() =>
                  handleApply(isRu ? "Стратегический разбор бизнеса" : "Strategik tahlil")
                }
                className="group relative overflow-hidden inline-flex items-center justify-between gap-4 w-full bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-6 py-4 text-xs uppercase tracking-[0.16em] font-medium rounded-none transition-colors duration-300 cursor-pointer"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{tCta("cta")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
