"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { siteMedia } from "@/config/siteMedia";

export function Expert() {
  const t = useTranslations("expert");
  const locale = useLocale();
  const isRu = locale === "ru";
  const { portrait } = siteMedia.expert;

  return (
    <section
      id="ekspert"
      aria-label={isRu ? "Об эксперте" : "Ekspert haqida"}
      className="py-24 sm:py-32 border-b border-white/[0.08] bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/40 to-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      {/* Subtle midnight navy atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-1/3 w-[500px] h-[500px] bg-[#0B132B]/50 blur-[140px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top Section Kicker */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-[1px] bg-[#C5A880]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
            {t("kicker")}
          </span>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Editorial Portrait (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full bg-[#0F172A]/40 overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(7,13,31,0.5)]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                className="object-cover w-full h-full contrast-[1.05] grayscale-[10%]"
                loading="lazy"
              />
            </div>

            {/* Below Image Metadata Bar */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-platinum">
              <span>{t("name")}</span>
              <span className="text-platinum-light">{t("experience")}</span>
            </div>
          </div>

          {/* Right Column — Biography, Editorial Quote & 3 Pillars (lg:col-span-7 space-y-10) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.12] text-white">
              {t("headlinePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("headlineHighlight")}
              </span>
              {t("headlineSuffix")}
            </h2>

            {/* Editorial Pull-Quote */}
            <blockquote className="border-l border-platinum/40 pl-6 py-1 font-serif italic text-xl sm:text-2xl text-neutral-200 leading-relaxed">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            {/* Biography Prose */}
            <div className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed space-y-4">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
            </div>

            {/* The 3 Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] pt-0">
              {/* Pillar 1 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-[10px] text-platinum tracking-[0.2em] block mb-2">
                  {t("pillar1Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar1Title")}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {t("pillar1Desc")}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-[10px] text-platinum tracking-[0.2em] block mb-2">
                  {t("pillar2Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar2Title")}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {t("pillar2Desc")}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 first:pl-0 last:pr-0">
                <span className="font-mono text-[10px] text-platinum tracking-[0.2em] block mb-2">
                  {t("pillar3Tag")}
                </span>
                <h3 className="text-lg font-normal text-white mb-2">
                  {t("pillar3Title")}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {t("pillar3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
