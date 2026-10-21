"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface HeroProps {
  onOpenModal?: () => void;
  onOpenApply?: () => void;
}

export default function Hero({ onOpenModal, onOpenApply }: HeroProps = {}) {
  const { openApply } = useApplyModal();
  const handleOpenModal = onOpenModal || onOpenApply || openApply;
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F0] pt-28 pb-16 flex flex-col justify-between overflow-hidden border-b border-white/[0.07]"
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
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>

          {/* Bespoke Editorial H1 (Sans + Serif Italic mix with Warm Champagne) */}
          <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-light tracking-[-0.03em] leading-[1.08] text-white">
            {t("titlePrefix")}
            <span className="font-serif italic font-normal text-champagne">
              {t("titleHighlight")}
            </span>
            {t("titleSuffix")}
          </h1>

          {/* Executive Subheadline with Platinum Tint */}
          <p className="text-base sm:text-lg text-platinum font-light leading-relaxed max-w-xl">
            {t("description")}
          </p>

          {/* Sharp Architectural CTAs (No rounded corners) */}
          <div className="pt-2 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={handleOpenModal}
              className="group inline-flex items-center gap-4 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-8 py-4 text-sm font-medium tracking-wide rounded-none transition-all duration-300 cursor-pointer"
            >
              <span>{t("ctaPrimary")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <a
              href="#xizmatlar"
              className="inline-flex items-center gap-3 px-4 py-4 text-sm text-neutral-300 hover:text-white border-b border-white/15 hover:border-white/50 transition-all"
            >
              <span>{t("ctaSecondary")}</span>
              <span className="font-mono text-xs text-platinum">/06</span>
            </a>
          </div>
        </div>

        {/* Right Column — Seamless Editorial Portrait (5 columns on lg:grid-cols-12) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[450px] aspect-[4/5] ml-auto">
            {/* Seamless blend into #0A0A0A background using CSS mask */}
            <div className="relative w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
              <Image
                src="/images/hero/portrait.webp"
                alt="Ilhom Begimqulov"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-top scale-[1.01] contrast-[1.04] grayscale-[10%]"
              />
              {/* Subtle side vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/30 pointer-events-none" />
            </div>

            {/* Minimalist Editorial Caption */}
            <div className="absolute bottom-2 left-0 border-l border-white/20 pl-4 py-0.5 pointer-events-none">
              <p className="font-serif italic text-2xl text-white/90 leading-none">
                Ilhom Begimqulov
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-platinum-light mt-1.5">
                {t("captionRole")}
              </p>
            </div>
          </div>
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
              <span className="text-sm text-neutral-300">
                {t("metric1Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="100" />
              <span className="text-white/40 font-serif italic ml-0.5">+</span>
            </div>
          </div>

          {/* Metric 02 */}
          <div className="sm:px-10 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-platinum block mb-1">
                {t("metric2Label")}
              </span>
              <span className="text-sm text-neutral-300">
                {t("metric2Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="10 000" />
              <span className="text-white/40 font-serif italic ml-0.5">+</span>
            </div>
          </div>

          {/* Metric 03 */}
          <div className="sm:pl-10 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-platinum block mb-1">
                {t("metric3Label")}
              </span>
              <span className="text-sm text-neutral-300">
                {t("metric3Desc")}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-white ml-4 flex items-baseline shrink-0">
              <AnimatedCounter value="8" />
              <span className="text-white/40 font-serif italic ml-0.5">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
