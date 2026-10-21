"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface CtaBandProps {
  onOpenApply?: (serviceName?: string) => void;
  onOpenModal?: () => void;
}

export function CtaBand({ onOpenApply, onOpenModal }: CtaBandProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || onOpenModal || openApply;
  const t = useTranslations("ctaBand");
  const locale = useLocale();
  const isRu = locale === "ru";

  return (
    <section
      id="cta-band"
      aria-label={isRu ? "Диагностический вопрос" : "Diagnostik savol"}
      className="relative bg-gradient-to-r from-[#070D1F] via-[#0B132B]/50 to-[#0A0A0A] border-b border-white/[0.08] py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle deep navy depth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0F172A]/70 blur-[130px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        <div className="border-l border-platinum/30 pl-6 sm:pl-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* Left Column (lg:col-span-8) */}
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum block mb-4">
                {t("kicker")}
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-[-0.03em] leading-[1.08] text-white">
                {t("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {t("titleHighlight")}
                </span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-light mt-5 max-w-2xl leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Right Column (lg:col-span-4 lg:flex lg:justify-end) */}
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={() => handleApply(isRu ? "Стратегический разбор бизнеса" : "Strategik tahlil")}
                className="group inline-flex items-center justify-between gap-6 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-8 py-5 text-sm font-medium tracking-wide rounded-none transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>{t("cta")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
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
