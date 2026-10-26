"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";
import { siteMedia } from "@/config/siteMedia";

export function Partners() {
  const t = useTranslations("partners");
  const partners = siteMedia.partners;

  return (
    <section
      id="hamkorlar"
      aria-label={t("title")}
      className="bg-[#0A0A0A] border-t border-b border-white/[0.07] py-16 sm:py-20 overflow-hidden"
    >
      {/* Minimalist Single Bar Header Row */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 mb-10 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="w-8 h-[1px] bg-[#C5A880] inline-block mr-4" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>
          <span className="font-mono text-xs text-platinum tracking-wider">
            {t("count")}
          </span>
        </div>
      </div>

      {/* Marquee Track with Edge Fade Masks */}
      <div className="relative w-full border-y border-white/[0.08] py-4 bg-[#0B132B]/20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee speed={36} pauseOnHover innerClassName="gap-4 sm:gap-6 pr-4 sm:pr-6">
          {partners.map((p, idx) => (
            <div
              key={`${p.id}-${idx}`}
              className="flex items-center gap-4 sm:gap-5 px-5 sm:px-6 py-3.5 bg-[#0F172A]/40 hover:bg-[#0B132B]/70 border border-white/[0.08] hover:border-platinum/30 transition-all duration-300 rounded-none shrink-0 group cursor-default"
            >
              {/* Logo Badge without white box */}
              <div className="w-24 h-14 sm:w-28 sm:h-16 flex items-center justify-center shrink-0">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={80}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Bold Readable Brand Name & Category */}
              <div className="flex flex-col justify-center pr-3 min-w-[120px] sm:min-w-[140px]">
                <span className="text-base sm:text-lg font-medium text-white tracking-tight group-hover:text-white transition-colors whitespace-nowrap">
                  {p.name}
                </span>
                <span className="font-mono text-xs text-platinum-light uppercase tracking-widest mt-0.5 whitespace-nowrap">
                  {t("b2bPartner")}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
