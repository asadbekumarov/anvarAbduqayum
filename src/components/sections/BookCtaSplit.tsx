"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";
import { formatSectionKicker } from "@/config/sections";
import { bookConfig } from "@/config/book";

interface BookCtaSplitProps {
  onOpenApply?: (serviceName?: string) => void;
}

export function BookCtaSplit({ onOpenApply }: BookCtaSplitProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const tBook = useTranslations("book");
  const tCta = useTranslations("ctaBand");
  const ctaCommon = useTranslations("cta");
  const locale = useLocale();
  const { cover } = siteMedia.book;

  // TODO(confirm): narx va buyurtma usuli (Telegram buyurtma havolasi yoki sayt formasi) rasman tasdiqlansin
  const handleOrderBook = () => {
    if (bookConfig.orderUrl && bookConfig.orderUrl.trim().length > 0) {
      window.open(bookConfig.orderUrl, "_blank", "noopener,noreferrer");
      return;
    }
    handleApply(`${tBook("bookTitle")} (${ctaCommon("primary")})`);
  };

  const priceValue = bookConfig.price
    ? locale === "ru"
      ? bookConfig.price.ru
      : locale === "en"
      ? bookConfig.price.en
      : bookConfig.price.uz
    : null;

  const specs = [
    { label: tBook("spec1Label"), value: tBook("spec1Value") },
    { label: tBook("spec2Label"), value: tBook("spec2Value") },
    { label: tBook("spec3Label"), value: tBook("spec3Value") },
    ...(priceValue
      ? [
          {
            label:
              locale === "ru"
                ? "04 / ЦЕНА"
                : locale === "en"
                ? "04 / PRICE"
                : "04 / NARXI",
            value: priceValue,
          },
        ]
      : []),
  ];

  return (
    <section
      id="kitob"
      aria-label={tBook("sectionAria")}
      className="scroll-mt-20 py-14 sm:py-20 border-t border-b border-white/[0.08] bg-[#070707] relative overflow-hidden"
    >
      {/* Anchor for CtaBand */}
      <span id="cta-band" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric ambient depth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#0B132B]/40 blur-[140px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 7 Columns: Book Presentation (Compact Split Card) */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#1E1E1E] hover:border-[#D4AF37]/50 p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300">
            <div>
              {/* Kicker */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  {formatSectionKicker("book", tBook("kicker"))}
                </span>
              </div>

              {/* Title */}
              <MaskedHeading className="text-2xl sm:text-4xl font-light tracking-[-0.03em] leading-[1.12] text-white">
                {tBook("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {tBook("titleHighlight")}
                </span>
              </MaskedHeading>

              <p className="text-sm sm:text-base text-[#9A9A9A] font-normal mt-3 leading-relaxed max-w-xl">
                {tBook("description")}
              </p>

              {/* Compact Book Card Body: Cover + Specs */}
              <div className="mt-6 pt-6 border-t border-[#1E1E1E] grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Book Cover Frame (sm:col-span-4) */}
                <div className="sm:col-span-4 flex justify-center">
                  <div className="relative w-[150px] sm:w-[170px] aspect-[1/1.42] shadow-[0_20px_35px_rgba(0,0,0,0.85)] border border-[#1E1E1E] overflow-hidden transition-transform duration-500 hover:scale-[1.03]">
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
                <div className="sm:col-span-8 flex flex-col justify-center divide-y divide-[#1E1E1E] border-y sm:border-y-0 border-[#1E1E1E]">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="py-2.5 flex items-baseline justify-between gap-3 font-mono text-xs"
                    >
                      <span className="uppercase tracking-[0.16em] text-[#D4AF37] shrink-0 text-xs">
                        {spec.label}
                      </span>
                      <span className="text-[#E5E5E5] font-sans text-xs sm:text-sm text-right font-normal">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-6 pt-5 border-t border-[#1E1E1E] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
                {tBook("pedestalLeft")}
              </span>
              <button
                type="button"
                onClick={handleOrderBook}
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-6 py-3 text-xs uppercase tracking-[0.16em] font-medium rounded-none transition-colors duration-300 cursor-pointer shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10 font-bold">{tBook("cta")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: CtaBand Diagnostic Provocation Monolith */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#1E1E1E] hover:border-[#D4AF37]/50 p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#D4AF37]">
                  {tCta("kicker")}
                </span>
              </div>

              <MaskedHeading className="text-2xl sm:text-3xl font-light tracking-[-0.03em] leading-[1.12] text-white">
                {tCta("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {tCta("titleHighlight")}
                </span>
              </MaskedHeading>

              <p className="text-sm sm:text-base text-[#9A9A9A] font-normal mt-4 leading-relaxed">
                {tCta("description")}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#1E1E1E] flex flex-col gap-3">
              <Link
                href="/test"
                className="group relative overflow-hidden inline-flex items-center justify-between gap-4 w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-5 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] font-medium rounded-none transition-colors duration-300 cursor-pointer shadow-[0_4px_16px_rgba(212,175,55,0.25)] whitespace-nowrap"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10 whitespace-nowrap font-bold">{tCta("startTest")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0 font-bold">
                  →
                </span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  handleApply(tCta("strategicAnalysis"))
                }
                className="group relative inline-flex items-center justify-between gap-3 w-full bg-transparent hover:bg-white/[0.04] text-[#E5E5E5] hover:text-white border border-[#1E1E1E] hover:border-[#D4AF37]/60 px-5 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs uppercase tracking-[0.10em] sm:tracking-[0.14em] font-medium rounded-none transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span className="relative z-10 whitespace-nowrap">{ctaCommon("primary")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-[#D4AF37] shrink-0 font-mono">
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
