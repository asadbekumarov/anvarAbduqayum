"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

interface ServicesProps {
  onOpenApply?: (serviceName?: string) => void;
}

export function Services({ onOpenApply }: ServicesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("services");
  const locale = useLocale();
  const isRu = locale === "ru";
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="xizmatlar"
      aria-label={isRu ? "Архитектура услуг" : "Xizmatlar arxitekturasi"}
      className="py-24 sm:py-32 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header & "Bepul Diagnostika" Bespoke Monolith */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
          {/* Left Column (lg:col-span-7 — Section Intro) */}
          <div className="lg:col-span-7">
            {/* Swiss Kicker */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
                {t("kicker")}
              </span>
            </div>

            {/* H2 Heading (Sans + Serif Italic mix) */}
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-6">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-base text-neutral-300 font-light leading-relaxed max-w-xl mt-5">
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
              className="relative bg-gradient-to-br from-[#0F172A]/80 via-[#0B132B]/60 to-[#0A0A0A] border border-white/[0.1] hover:border-platinum/30 p-8 sm:p-10 rounded-none transition-all duration-300 hover:bg-[#0F172A]/90 shadow-[0_15px_35px_rgba(7,13,31,0.45)] cursor-pointer group"
            >
              {/* Top Meta Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-platinum shrink-0" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-platinum">
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
              <p className="text-sm text-neutral-300 font-light leading-relaxed mt-3">
                {t("diagDesc")}
              </p>

              {/* Bottom Action Row */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <span className="font-mono text-[11px] text-platinum uppercase tracking-wider">
                  {t("diagPrivacy")}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-white flex items-center gap-2">
                  <span>{t("diagCta")}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Services — Architectural Ledger Rows (Table/List Layout) */}
        <div className="border-t border-white/[0.08] flex flex-col">
          {items.map((service) => (
            <div
              key={service.index}
              role="button"
              tabIndex={0}
              onClick={() => handleApply(service.title)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleApply(service.title);
                }
              }}
              aria-label={`${service.title} - ${t("selectService")}`}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline py-9 px-4 sm:px-6 border-b border-white/[0.08] bg-transparent hover:bg-[#0B132B]/20 transition-all duration-300 cursor-pointer rounded-none"
            >
              {/* Left Subtle Accent on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              {/* Column 1 (lg:col-span-1 — Index) */}
              <div className="lg:col-span-1">
                <span className="font-mono text-xs text-platinum group-hover:text-white transition-colors">
                  /{service.index}
                </span>
              </div>

              {/* Column 2 (lg:col-span-4 — Service Title) */}
              <div className="lg:col-span-4">
                <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Column 3 (lg:col-span-5 — Concrete B2B Description) */}
              <div className="lg:col-span-5">
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Column 4 (lg:col-span-2 — Minimal Action Trigger) */}
              <div className="lg:col-span-2 lg:text-right flex lg:justify-end items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-platinum group-hover:text-white transition-colors mt-2 lg:mt-0">
                <span>{t("selectService")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
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
