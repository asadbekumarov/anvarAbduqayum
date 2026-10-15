"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/ui/Marquee";
import { siteMedia } from "@/config/siteMedia";

export function Partners() {
  const t = useTranslations("partners");
  const partners = siteMedia.partners;

  return (
    <section
      id="hamkorlar"
      aria-label="Hamkorlar"
      className="py-20 sm:py-24 border-b border-border bg-base overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          index="05"
          kicker={t("kicker")}
          title={t("title")}
          className="mb-0"
        />
      </div>

      {/* Relative Marquee Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full">
        {/* Left & Right Gradient Fade Masks */}
        <div
          className="absolute inset-y-0 left-0 w-10 sm:w-28 lg:w-48 bg-gradient-to-r from-base via-base/90 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-10 sm:w-28 lg:w-48 bg-gradient-to-l from-base via-base/90 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Row 1: Forward Marquee */}
        <div className="border-y border-border py-4 sm:py-6 bg-elevated/20">
          <Marquee speed={38}>
            {partners.map((p) => (
              <div
                key={`r1-${p.id}`}
                className="h-14 sm:h-16 px-5 sm:px-8 flex items-center justify-center border border-border bg-base hover:border-gold hover:bg-elevated/80 hover:shadow-[0_0_25px_rgba(197,168,128,0.16)] transition-all duration-300 shrink-0 rounded-[2px] group"
              >
                <span className="font-serif text-xs sm:text-sm tracking-wider uppercase text-muted group-hover:text-gold transition-colors duration-200">
                  {p.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Row 2: Reverse Marquee */}
        <div className="border-b border-border py-4 sm:py-6 bg-elevated/40">
          <Marquee speed={44} reverse>
            {[...partners].reverse().map((p) => (
              <div
                key={`r2-${p.id}`}
                className="h-14 sm:h-16 px-5 sm:px-8 flex items-center justify-center border border-border bg-base hover:border-gold hover:bg-elevated/80 hover:shadow-[0_0_25px_rgba(197,168,128,0.16)] transition-all duration-300 shrink-0 rounded-[2px] group"
              >
                <span className="font-serif text-xs sm:text-sm tracking-wider uppercase text-muted group-hover:text-gold transition-colors duration-200">
                  {p.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
