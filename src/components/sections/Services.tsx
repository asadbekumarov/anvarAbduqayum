"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { BookingActionLink } from "@/components/ui/BookingActionLink";
import { useApplyModal, type OpenApplyOptions } from "@/features/apply/context/ApplyModalContext";
import { GridLine } from "@/components/ui/GridLine";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { formatSectionKicker } from "@/config/sections";

interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

interface ServicesProps {
  onOpenApply?: (options?: OpenApplyOptions) => void;
}

export function Services({ onOpenApply }: ServicesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("services");
  const ctaT = useTranslations("cta");
  const locale = useLocale();
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="xizmatlar"
      aria-label={t("title")}
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#070707] text-[#E5E5E5] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header & "Bepul Diagnostika" Bespoke Monolith */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
          {/* Left Column (lg:col-span-7 — Section Intro) */}
          <div className="lg:col-span-7">
            {/* Swiss Kicker */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                {formatSectionKicker("services", t("kicker"))}
              </span>
            </div>

            {/* H2 Heading (Sans + Serif Italic mix) with Editorial Masked Reveal */}
            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-6">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </MaskedHeading>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#9A9A9A] font-normal leading-relaxed max-w-xl mt-5">
              {t("description")}
            </p>
          </div>

          {/* Right Column (lg:col-span-5 — "Bepul Diagnostika" Bespoke Midnight Navy Monolith) */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#121212] border border-[#1E1E1E] hover:border-[#D4AF37]/60 p-7 sm:p-9 rounded-none transition-all duration-300 hover:-translate-y-1 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.08)] group">
              {/* Top Meta Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                    {t("diagKicker")}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#9A9A9A]">
                  {t("diagTime")}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#E5E5E5] mt-5">
                {t("diagTitle")}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#9A9A9A] font-normal leading-relaxed mt-3">
                {t("diagDesc")}
              </p>

              {/* Bottom Action Row with Privacy badge & Dual CTAs */}
              <div className="mt-8 pt-5 border-t border-[#1E1E1E] flex flex-col gap-4">
                <span className="font-mono text-xs text-[#707070] uppercase tracking-wider">
                  {t("diagPrivacy")}
                </span>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <BookingActionLink
                    locale={locale}
                    className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-5 py-3.5 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(212,175,55,0.25)] text-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
                    <span className="relative z-10 font-bold">{t("bookTimeCta")}</span>
                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 font-bold">
                      →
                    </span>
                  </BookingActionLink>

                  <button
                    type="button"
                    onClick={() => handleApply(t("diagServiceApplyName"))}
                    className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.04] text-[#E5E5E5] hover:text-white border border-[#1E1E1E] hover:border-[#D4AF37]/60 px-5 py-3.5 text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 text-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  >
                    <span>{ctaT("primaryShort")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Services — Architectural Ledger Rows (Table/List Layout) */}
        <div className="relative flex flex-col group/list mt-6 border-b border-[#1E1E1E]">
          {/* Top Divider Architectural Line Draw */}
          <GridLine />

          {items.map((service) => (
            <div
              key={service.index}
              role="button"
              tabIndex={0}
              onClick={() => handleApply({ service: service.title })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleApply({ service: service.title });
                }
              }}
              aria-label={`${service.title} - ${t("selectService")}`}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-baseline py-7 min-h-[64px] px-4 sm:px-6 bg-transparent hover:bg-[#121212] border-t border-[#1E1E1E] hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1 group-hover/list:opacity-50 hover:!opacity-100 cursor-pointer rounded-none touch-manipulation overflow-hidden"
            >
              {/* Subtle Watermark Number in Background */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-6xl sm:text-7xl font-bold text-[#D4AF37]/[0.05] group-hover:text-[#D4AF37]/[0.12] transition-colors duration-300"
              >
                {service.index}
              </span>

              {/* Left Subtle Gold Accent Indicator on Hover - expanding from bottom */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Column 1 (lg:col-span-1 — Index) */}
              <div className="lg:col-span-1 relative z-10">
                <span className="font-mono text-xs text-[#D4AF37] group-hover:text-white transition-colors duration-300 font-bold">
                  /{service.index}
                </span>
              </div>

              {/* Column 2 (lg:col-span-4 — Service Title with translate-x-2) */}
              <div className="lg:col-span-4 relative z-10">
                <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-[#E5E5E5] transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  {service.title}
                </h3>
              </div>

              {/* Column 3 (lg:col-span-5 — Concrete B2B Description) */}
              <div className="lg:col-span-5 relative z-10">
                <p className="text-sm sm:text-base text-[#9A9A9A] font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Column 4 (lg:col-span-2 — Minimal Action Trigger with >=44px touch target) */}
              <div className="lg:col-span-2 lg:text-right flex lg:justify-end items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#9A9A9A] group-hover:text-[#D4AF37] transition-colors duration-300 mt-2 lg:mt-0 min-h-[44px] relative z-10">
                <span>{t("selectService")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-mono">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
