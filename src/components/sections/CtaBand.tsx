"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

interface CtaBandProps {
  onOpenApply?: (serviceName?: string) => void;
  onOpenModal?: () => void;
}

export function CtaBand({ onOpenApply, onOpenModal }: CtaBandProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || onOpenModal || openApply;
  const t = useTranslations("ctaBand");
  const ctaT = useTranslations("cta");

  return (
    <section
      id="cta-band"
      aria-label={t("title")}
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
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum block mb-4">
                {t("kicker")}
              </span>

              {/* H2 Heading with Editorial Masked Reveal */}
              <MaskedHeading className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-[-0.03em] leading-[1.08] text-white">
                {t("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {t("titleHighlight")}
                </span>
              </MaskedHeading>

              <p className="text-base sm:text-lg text-neutral-300 font-light mt-5 max-w-2xl leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Right Column (lg:col-span-4 lg:flex lg:justify-end) */}
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={() => handleApply(t("strategicAnalysis"))}
                className="group relative overflow-hidden inline-flex items-center justify-between gap-6 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-8 py-5 text-sm font-medium tracking-wide rounded-none transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                {/* Liquid Sheen */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{ctaT("primary")}</span>
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
