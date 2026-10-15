"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { siteMedia } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface EventsTourProps {
  onOpenApply?: () => void;
}

export function EventsTour({ onOpenApply }: EventsTourProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("events");
  const events = siteMedia.events;

  return (
    <section
      id="tadbirlarimiz"
      aria-label="Tadbirlarimiz"
      className="py-16 sm:py-24 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
          className="mb-8 sm:mb-12"
        />

        {/* 6 City Posters Grid with 3D Tilt & Gold Spotlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((evt, idx) => (
            <TiltCard
              key={evt.id}
              className="h-full rounded-[2px]"
            >
              <article className="group border border-border bg-elevated relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-gold/50 rounded-[2px] h-full">
                {/* Poster Image Container - Compact Height */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-base">
                  <Image
                    src={evt.image}
                    alt={evt.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />

                  {/* Dark Vignette Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* City Number Stamp */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-serif text-[11px] text-gold/80 tracking-widest font-semibold border border-gold/30 px-2 py-0.5 bg-base/80 backdrop-blur-xs">
                      /0{idx + 1}
                    </span>
                  </div>

                  {/* City & Country Typography */}
                  <div className="absolute bottom-3.5 left-4 right-4 z-10">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold font-medium block mb-0.5">
                      {evt.country}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-white tracking-wide leading-tight">
                      {evt.city}
                    </h3>
                  </div>
                </div>

                {/* Poster Footer Info - Compact */}
                <div className="p-4 sm:p-4.5 border-t border-border bg-base flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-medium text-white line-clamp-1">
                      {evt.title}
                    </h4>
                    <span className="text-[11px] text-muted font-light block mt-0.5">
                      {evt.date}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleApply}
                      className="text-xs font-sans uppercase tracking-wider text-muted group-hover:text-gold transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
                    >
                      <span>{t("cta")}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                    <span className="text-[10px] uppercase tracking-widest text-muted-dark">
                      CHOP ETILGAN
                    </span>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
