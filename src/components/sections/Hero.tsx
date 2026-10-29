"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Marquee } from "@/components/ui/Marquee";
import { siteMedia } from "@/config/siteMedia";
import InteractiveCloth from "@/components/ui/InteractiveCloth";

interface HeroProps {
  onOpenModal?: () => void;
  onOpenApply?: () => void;
}

export default function Hero({ onOpenModal, onOpenApply }: HeroProps = {}) {
  const { openApply } = useApplyModal();
  const handleOpenModal = onOpenModal || onOpenApply || openApply;
  const t = useTranslations("hero");
  const ctaT = useTranslations("cta");

  return (
    <section
      id="hero"
      className="scroll-mt-20 relative min-h-[100svh] bg-[#0A0A0A] text-[#F5F5F0] pt-28 pb-16 flex flex-col justify-between overflow-hidden border-b border-white/[0.07]"
    >
      {/* Deep midnight navy atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-[10%] w-[550px] h-[550px] rounded-full bg-[#0B132B]/60 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[25%] w-[350px] h-[350px] rounded-full bg-[#0F172A]/40 blur-[100px]"
      />

      <div className="max-w-[1360px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column (7 columns on lg:grid-cols-12) */}
        <div className="lg:col-span-7 z-10 space-y-8">
          {/* Swiss Editorial Kicker */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>

          {/* Bespoke Editorial H1 (Sans + Serif Italic mix with Warm Champagne) */}
          <div className="overflow-hidden pb-[0.12em]">
            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-light tracking-[-0.03em] leading-[1.08] text-white animate-hero-mask-reveal will-change-transform">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-champagne">
                {t("titleHighlight")}
              </span>
              {t("titleSuffix")}
            </h1>
          </div>

          {/* Executive Subheadline with Platinum Tint */}
          <p className="text-base sm:text-lg text-platinum-light font-normal leading-relaxed max-w-xl">
            {t("description")}
          </p>

          {/* Sharp Architectural CTAs (No rounded corners) */}
          <div className="pt-2 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={handleOpenModal}
              className="group relative overflow-hidden inline-flex items-center gap-4 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-8 py-4 text-sm font-medium tracking-wide rounded-none transition-all duration-300 cursor-pointer"
            >
              {/* Liquid Sheen Overlay */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">{ctaT("primary")}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>

            <a
              href="#xizmatlar"
              className="inline-flex items-center gap-3 px-4 py-4 text-sm text-neutral-200 hover:text-white border-b border-white/20 hover:border-[#C5A880] transition-all group font-normal"
            >
              <span>{t("ctaSecondary")}</span>
              <span className="font-mono text-xs text-[#C5A880] transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* Right Column — 3D Interactive Cloth Portrait (5 columns on lg:grid-cols-12) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <InteractiveCloth
            imageSrc="/images/hero/portrait.webp"
            fallbackSrc="/images/hero/portrait.webp"
            captionName="Ilhom Begimqulov"
            captionRole={t("captionRole")}
            hintText={t("clothHint")}
            ariaLabel={t("clothAriaLabel")}
            fallbackAlt={t("portraitAlt")}
            className="w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0"
          />
        </div>
      </div>

      {/* Bottom Architectural Metrics Bar */}
      <div className="max-w-[1360px] mx-auto w-full px-6 md:px-12 pt-10 mt-12 border-t border-white/[0.07]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/[0.07]">
          {/* Metric 01 */}
          <div className="sm:pr-10 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-platinum block mb-1">
                {t("metric1Label")}
              </span>
              <span className="text-sm sm:text-base text-neutral-200 font-normal">
                {t("metric1Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="100" />
              <span className="text-[#C5A880] font-serif italic ml-0.5">+</span>
            </div>
          </div>

          {/* Metric 02 */}
          <div className="sm:px-10 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-platinum block mb-1">
                {t("metric2Label")}
              </span>
              <span className="text-sm sm:text-base text-neutral-200 font-normal">
                {t("metric2Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="10 000" />
              <span className="text-[#C5A880] font-serif italic ml-0.5">+</span>
            </div>
          </div>

          {/* Metric 03 */}
          <div className="sm:pl-10 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-platinum block mb-1">
                {t("metric3Label")}
              </span>
              <span className="text-sm sm:text-base text-neutral-200 font-normal">
                {t("metric3Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="8" />
              <span className="text-[#C5A880] font-serif italic ml-0.5">+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Streamlined Partner Logos Credibility Marquee Strip */}
      <div
        id="hamkorlar"
        className="w-full border-t border-white/[0.07] mt-8 py-5 bg-[#0B132B]/10 relative"
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-platinum whitespace-nowrap">
              {t("partnersLabel")}
            </span>
          </div>

          <div className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <Marquee speed={28} pauseOnHover innerClassName="gap-8 sm:gap-12 items-center pr-8 sm:pr-12">
              {siteMedia.partners.map((p, idx) => (
                <div
                  key={`${p.id}-${idx}`}
                  className="h-9 sm:h-11 flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 group cursor-default"
                  title={p.name}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={140}
                    height={52}
                    sizes="(max-width: 640px) 100px, 140px"
                    loading="lazy"
                    className="max-h-full w-auto max-w-[130px] sm:max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
