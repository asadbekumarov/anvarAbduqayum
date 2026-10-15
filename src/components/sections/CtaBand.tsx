"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface CtaBandProps {
  onOpenApply?: () => void;
}

export function CtaBand({ onOpenApply }: CtaBandProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("ctaBand");

  return (
    <section
      id="cta-band"
      aria-label="Harakatga chaqiruv"
      className="py-20 sm:py-28 border-b border-border bg-elevated relative overflow-hidden"
    >
      {/* Editorial Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-border flex justify-between">
          <div className="w-px h-full bg-border" />
          <div className="w-px h-full bg-border hidden sm:block" />
          <div className="w-px h-full bg-border hidden lg:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-8">

          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.18] sm:leading-[1.12]">
            &ldquo;{t("title")}&rdquo;
          </h2>

          <p className="text-sm sm:text-xl text-muted font-light leading-relaxed max-w-2xl">
            {t("description")}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleApply}
              className="w-full sm:w-auto text-center justify-center"
            >
              {t("cta")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#kontaktlar"
              className="w-full sm:w-auto text-center justify-center"
            >
              Bog&apos;lanish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
