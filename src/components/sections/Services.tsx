"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="xizmatlar"
      aria-label={t("title")}
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header & "Bepul Diagnostika" Bespoke Monolith */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
          {/* Left Column (lg:col-span-7 — Section Intro) */}
          <div className="lg:col-span-7">
            {/* Swiss Kicker */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
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
            <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-xl mt-5">
              {t("description")}
            </p>
          </div>

          {/* Right Column (lg:col-span-5 — "Bepul Diagnostika" Bespoke Midnight Navy Monolith) */}
          <div className="lg:col-span-5">
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleApply(t("diagServiceApplyName"))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleApply(t("diagServiceApplyName"));
                }
              }}
              aria-label={`${t("diagTitle")} - ${t("diagCta")}`}
              className="relative bg-gradient-to-br from-[#0F172A]/90 via-[#0B132B]/80 to-[#0A0A0A] border border-white/[0.12] hover:border-[#C5A880]/50 p-7 sm:p-9 rounded-none transition-all duration-300 hover:bg-[#0F172A] shadow-[0_15px_35px_rgba(7,13,31,0.5)] cursor-pointer group"
            >
              {/* Top Meta Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-platinum">
                    {t("diagKicker")}
                  </span>
                </div>
                <span className="font-mono text-xs text-platinum-light">
                  {t("diagTime")}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white mt-5">
                {t("diagTitle")}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed mt-3">
                {t("diagDesc")}
              </p>

              {/* Bottom Action Row - Wrap-safe for long Russian translations */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-xs text-platinum uppercase tracking-wider">
                  {t("diagPrivacy")}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#C5A880] group-hover:text-white flex items-center gap-2 transition-colors">
                  <span>{ctaT("primaryShort")}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Services — Architectural Ledger Rows (Table/List Layout) */}
        <div className="relative flex flex-col group/list mt-6 border-b border-white/[0.08]">
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
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-baseline py-7 min-h-[64px] px-4 sm:px-6 bg-transparent hover:bg-[#0B132B]/35 border-t border-white/[0.08] transition-all duration-300 group-hover/list:opacity-50 hover:!opacity-100 cursor-pointer rounded-none touch-manipulation"
            >
              {/* Left Subtle Gold Accent Indicator on Hover - expanding from bottom */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C5A880] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Column 1 (lg:col-span-1 — Index) */}
              <div className="lg:col-span-1">
                <span className="font-mono text-xs text-[#C5A880] group-hover:text-white transition-colors duration-300">
                  /{service.index}
                </span>
              </div>

              {/* Column 2 (lg:col-span-4 — Service Title with translate-x-2) */}
              <div className="lg:col-span-4">
                <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  {service.title}
                </h3>
              </div>

              {/* Column 3 (lg:col-span-5 — Concrete B2B Description) */}
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Column 4 (lg:col-span-2 — Minimal Action Trigger with >=44px touch target) */}
              <div className="lg:col-span-2 lg:text-right flex lg:justify-end items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-platinum group-hover:text-[#C5A880] transition-colors duration-300 mt-2 lg:mt-0 min-h-[44px]">
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
