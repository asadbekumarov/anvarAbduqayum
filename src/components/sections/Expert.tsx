"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteMedia } from "@/config/siteMedia";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface ExpertProps {
  onOpenApply?: () => void;
}

export function Expert({ onOpenApply }: ExpertProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("expert");
  const common = useTranslations("common");
  const { portrait } = siteMedia.expert;

  return (
    <section
      id="ekspert"
      aria-label="Ekspert haqida"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="07"
          kicker={t("kicker")}
          title={t("name")}
          description={t("role")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="border border-border bg-elevated relative overflow-hidden rounded-[2px] group">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Quote Footer Stamp */}
              <div className="p-6 border-t border-border bg-base">
                <blockquote className="font-serif italic text-sm sm:text-base text-muted-light leading-relaxed">
                  &ldquo;{t("quote")}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Biography & Philosophy Column */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6 text-base sm:text-lg text-muted font-light leading-relaxed">
              <p className="text-white font-normal text-xl sm:text-2xl font-serif">
                {t("bio1")}
              </p>
              <p>{t("bio2")}</p>
            </div>

            {/* 4 Philosophy Pillars */}
            <div className="border-t border-border pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="border border-border p-4 sm:p-6 bg-elevated/40 rounded-[2px]">
                <span className="font-serif text-gold text-base sm:text-lg block mb-1.5 sm:mb-2">/01</span>
                <h4 className="font-serif text-base sm:text-lg text-white font-normal mb-1.5 sm:mb-2">
                  {t("pillar1Title")}
                </h4>
                <p className="text-xs text-muted leading-relaxed font-light">
                  {t("pillar1Desc")}
                </p>
              </div>

              <div className="border border-border p-4 sm:p-6 bg-elevated/40 rounded-[2px]">
                <span className="font-serif text-gold text-base sm:text-lg block mb-1.5 sm:mb-2">/02</span>
                <h4 className="font-serif text-base sm:text-lg text-white font-normal mb-1.5 sm:mb-2">
                  {t("pillar2Title")}
                </h4>
                <p className="text-xs text-muted leading-relaxed font-light">
                  {t("pillar2Desc")}
                </p>
              </div>

              <div className="border border-border p-4 sm:p-6 bg-elevated/40 rounded-[2px]">
                <span className="font-serif text-gold text-base sm:text-lg block mb-1.5 sm:mb-2">/03</span>
                <h4 className="font-serif text-base sm:text-lg text-white font-normal mb-1.5 sm:mb-2">
                  {t("pillar3Title")}
                </h4>
                <p className="text-xs text-muted leading-relaxed font-light">
                  {t("pillar3Desc")}
                </p>
              </div>

              <div className="border border-border p-4 sm:p-6 bg-elevated/40 rounded-[2px]">
                <span className="font-serif text-gold text-base sm:text-lg block mb-1.5 sm:mb-2">/04</span>
                <h4 className="font-serif text-base sm:text-lg text-white font-normal mb-1.5 sm:mb-2">
                  {t("pillar4Title")}
                </h4>
                <p className="text-xs text-muted leading-relaxed font-light">
                  {t("pillar4Desc")}
                </p>
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="pt-2 sm:pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleApply}
                className="w-full sm:w-auto text-center justify-center"
              >
                {common("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
