"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface BookProps {
  onOpenApply?: (serviceName?: string) => void;
}

export function Book({ onOpenApply }: BookProps) {
  const { openApply } = useApplyModal();
  const t = useTranslations("book");
  const locale = useLocale();
  const isRu = locale === "ru";
  const { cover } = siteMedia.book;

  const handleOrderBook = () => {
    const bookTitle = isRu
      ? "Книга «Бизнес шпаргалка»"
      : "“Biznes shpargalkasi” kitobi";
    if (onOpenApply) {
      onOpenApply(bookTitle);
    } else {
      openApply(bookTitle);
    }
  };

  const specs = [
    {
      label: t("spec1Label"),
      value: t("spec1Value"),
    },
    {
      label: t("spec2Label"),
      value: t("spec2Value"),
    },
    {
      label: t("spec3Label"),
      value: t("spec3Value"),
    },
  ];

  return (
    <section
      id="kitob"
      aria-label={isRu ? "Книга «Бизнес шпаргалка»" : "Biznes shpargalkasi kitobi"}
      className="bg-gradient-to-b from-[#0A0A0A] via-[#0B132B]/25 to-[#0A0A0A] border-t border-b border-white/[0.08] py-24 sm:py-32 overflow-hidden relative"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column — Museum-Style Pedestal Box (lg:col-span-5) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative aspect-[4/5] w-full max-w-[420px] bg-[#070D1F]/50 border border-white/[0.1] shadow-[0_20px_50px_rgba(7,13,31,0.5)] p-8 sm:p-12 flex items-center justify-center overflow-hidden">
            {/* Architectural Crosshair Lines */}
            <div
              className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.04] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.04] pointer-events-none"
              aria-hidden="true"
            />

            {/* Book Cover Frame */}
            <div className="relative w-[210px] sm:w-[250px] aspect-[1/1.42] shadow-[0_25px_45px_rgba(0,0,0,0.85)] border border-white/[0.08] transition-transform duration-700 hover:scale-[1.02] z-10">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 768px) 210px, 250px"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Bottom Pedestal Caption */}
            <div className="absolute bottom-4 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-platinum z-10">
              <span>{t("pedestalLeft")}</span>
              <span className="text-platinum-light">{t("pedestalRight")}</span>
            </div>
          </div>
        </div>

        {/* Right Column — Editorial Details & Specifications (lg:col-span-7) */}
        <div className="lg:col-span-7">
          {/* Swiss Kicker */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>

          {/* H2 Heading */}
          <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-6">
            {t("titlePrefix")}
            <span className="font-serif italic font-normal text-white/90">
              {t("titleHighlight")}
            </span>
          </h2>

          {/* Description */}
          <p className="text-base text-neutral-300 font-light leading-relaxed mt-5 max-w-xl">
            {t("description")}
          </p>

          {/* Book Specifications Ledger */}
          <div className="mt-10 border-t border-white/[0.08]">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="py-4 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-platinum shrink-0">
                  {spec.label}
                </span>
                <span className="text-sm text-neutral-300 font-light sm:text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={handleOrderBook}
              className="group inline-flex items-center gap-4 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-8 py-4 text-sm font-medium tracking-wide rounded-none transition-all duration-300 cursor-pointer"
            >
              <span>{t("cta")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
