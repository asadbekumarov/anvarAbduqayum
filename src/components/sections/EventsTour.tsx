"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";

interface EventsTourProps {
  onOpenApply?: (serviceName?: string) => void;
}

const countryRuMap: Record<string, string> = {
  "Qozog'iston": "Казахстан",
  "Qirg'iziston": "Кыргызстан",
  "O'zbekiston": "Узбекистан",
  "Tojikiston": "Таджикистан",
};

const cityRuMap: Record<string, string> = {
  "Shymkent": "Шымкент",
  "Osh": "Ош",
  "Samarqand": "Самарканд",
  "Xo'jand": "Худжанд",
  "Toshkent": "Ташкент",
  "Farg'ona": "Фергана",
};

export function EventsTour({ onOpenApply }: EventsTourProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("events");
  const locale = useLocale();
  const isRu = locale === "ru";
  const events = siteMedia.events;

  return (
    <section
      id="tadbirlarimiz"
      aria-label={isRu ? "География и масштаб" : "Geografiya va ko'lam"}
      className="py-24 sm:py-32 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Section Header (12-Column Editorial Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          {/* Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* Swiss Kicker */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
                {t("kicker")}
              </span>
            </div>

            {/* H2 Heading (Sans + Serif Italic mix) with Editorial Masked Reveal */}
            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-6">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </MaskedHeading>
          </div>

          {/* Right Column (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Architectural Poster Grid (Replaces Rounded Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.08]">
          {events.map((evt, idx) => {
            const indexStr = idx < 9 ? `/0${idx + 1}` : `/${idx + 1}`;
            const displayCountry = isRu ? countryRuMap[evt.country] || evt.country : evt.country;
            const displayCity = isRu ? cityRuMap[evt.city] || evt.city : evt.city;

            return (
              <article
                key={evt.id}
                role="button"
                tabIndex={0}
                onClick={() => handleApply(`${displayCity} dagi biznes-tur`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleApply(`${displayCity} dagi biznes-tur`);
                  }
                }}
                aria-label={`${displayCity} - ${evt.title}`}
                className="group relative bg-[#0A0A0A] border-r border-b border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-[#0B132B]/30 hover:border-platinum/20 rounded-none cursor-pointer"
              >
                {/* Top Index & Country Bar (Above the image, NOT floating as a pill badge) */}
                <div className="flex items-center justify-between mb-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                  <span className="text-platinum group-hover:text-white transition-colors">
                    {indexStr}
                  </span>
                  <span className="text-platinum-light">
                    {displayCountry}
                  </span>
                </div>

                {/* Poster Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141414] mb-6">
                  <KenBurnsImage delay={idx * 0.08}>
                    <Image
                      src={evt.image}
                      alt={evt.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover w-full h-full grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                    />
                  </KenBurnsImage>
                  {/* Subtle dark gradient at the bottom of the image only */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-80 pointer-events-none"
                  />
                  {/* City Name positioned cleanly at bottom-left of image */}
                  <span className="absolute bottom-4 left-4 font-serif italic text-3xl text-white tracking-tight pointer-events-none z-10">
                    {displayCity}
                  </span>
                </div>

                {/* Bottom Metadata Row (Below Image) */}
                <div className="pt-4 border-t border-white/[0.06] flex items-end justify-between gap-4 transition-transform duration-500 ease-out group-hover:translate-x-1">
                  <div>
                    <h3 className="text-base font-normal text-white tracking-tight">
                      {evt.title}
                    </h3>
                    <span className="text-xs text-platinum-light font-light mt-1 block">
                      {evt.date}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-platinum shrink-0">
                    {t("status")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
