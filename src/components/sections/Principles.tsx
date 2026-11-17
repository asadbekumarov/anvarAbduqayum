"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs as TabsPrimitive } from "radix-ui";
import { getContent } from "@/config/content";

interface PrinciplesProps {
  locale?: string;
}

export const Principles: React.FC<PrinciplesProps> = ({ locale = "uz" }) => {
  const shouldReduceMotion = useReducedMotion();
  const content = getContent(locale);
  const principles = content.principles;
  const modules = principles.modules || [];

  const getTabKey = (mod: (typeof modules)[number], idx: number) =>
    mod.id || mod.iconType || `pillar-${idx}`;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!principles || !modules.length) return null;

  const activeModule = modules[activeIndex] || modules[0];
  const activeValue = getTabKey(activeModule, activeIndex);

  return (
    <section
      id="tamoyil"
      aria-labelledby="principles-heading"
      className="relative bg-[#090A0D] text-[#F5F4F0] py-16 sm:py-20 lg:py-24 scroll-mt-[76px] border-b border-[rgba(212,175,55,0.2)]"
    >
      {/* Top subtle hairline gradient transition */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.35)] to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header (Balanced Headline + Explanatory Narrative) */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-end pb-10 border-b border-white/[0.08] mb-12">
          <div className="lg:col-span-7 min-w-0">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
              <span className="w-6 h-[1.5px] bg-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>
                {locale === "ru"
                  ? "05 // МЕТОДОЛОГИЯ «ПРЕСС-ФОРМЫ»"
                  : locale === "en"
                  ? "05 // THE «MOLD» MANAGEMENT PRINCIPLE"
                  : "05 // BOSHQARUVNING «QOLIP» TAMOYILI"}
              </span>
            </div>
            <h2
              id="principles-heading"
              className="font-serif text-[clamp(34px,4.5vw,58px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#FFFFFF] [text-wrap:balance]"
            >
              {principles.title || "Qolip tamoyili"}
              {principles.titleEmphasis ? ` ${principles.titleEmphasis}` : ""}
            </h2>
            <p className="font-serif italic text-[18px] sm:text-[21px] text-[#D4AF37] font-normal mt-2.5">
              {locale === "ru"
                ? "Инженерные стандарты и методология автономного управления"
                : locale === "en"
                ? "Engineering Standards & Autonomous Governance Methodology"
                : "Muhandislik standartlari va avtonom boshqaruv metodologiyasi"}
            </p>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#A6ACBA] max-w-[54ch] [text-wrap:pretty]">
              {principles.subtitle}
            </p>
          </div>
        </header>

        {/* 2-Column Architectural System: Left Philosophy & Rail, Right Executive Dossier */}
        <TabsPrimitive.Root
          value={activeValue}
          onValueChange={(val) => {
            const idx = modules.findIndex((m, i) => getTabKey(m, i) === val);
            if (idx !== -1) setActiveIndex(idx);
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* LEFT COLUMN: Philosophy Plaque + Module Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
            {/* Executive Philosophy Plaque */}
            <div className="bg-[#111319] border border-white/[0.08] border-l-2 border-l-[#D4AF37] rounded-[4px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">
                  {principles.statementHeading || "Boshqaruv falsafasi"}
                </span>
                <span className="font-mono text-[11px] text-[#8E95A5] tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(modules.length).padStart(2, "0")}
                </span>
              </div>
              <p className="font-serif italic text-[15px] sm:text-[16px] leading-[1.65] text-[#F5F4F0] mb-3">
                «{principles.manifesto}»
              </p>
              <span className="block font-mono text-[11px] text-[#8E95A5] uppercase tracking-wider">
                — Anvar Abduqayum
              </span>
            </div>

            {/* Architectural Module Selectors List */}
            <TabsPrimitive.List
              aria-label={principles.tablistAriaLabel || principles.title}
              className="flex flex-col gap-2.5"
            >
              {modules.map((mod, idx) => {
                const tabKey = getTabKey(mod, idx);
                const isSelected = idx === activeIndex;
                const romanNum =
                  idx === 0 ? "01" : idx === 1 ? "02" : idx === 2 ? "03" : "04";

                return (
                  <TabsPrimitive.Trigger
                    key={tabKey}
                    id={`mold-tab-${tabKey}`}
                    value={tabKey}
                    className={`relative min-h-[54px] px-5 py-3.5 text-left rounded-[4px] border flex items-center justify-between gap-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                      isSelected
                        ? "bg-[#141722] border-[#D4AF37]/50 text-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                        : "bg-[#0E1015]/60 border-white/[0.06] text-[#8E95A5] hover:text-[#FFFFFF] hover:bg-[#12141A] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`font-mono text-[12px] font-bold shrink-0 transition-colors ${
                          isSelected ? "text-[#D4AF37]" : "text-[#8E95A5]"
                        }`}
                      >
                        {romanNum} {"//"}
                      </span>
                      <span className="text-[14px] font-semibold leading-snug truncate">
                        {mod.title}
                      </span>
                    </div>
                    <span
                      className={`text-[13px] transition-transform duration-200 shrink-0 ${
                        isSelected
                          ? "text-[#D4AF37] translate-x-1"
                          : "text-[#555C69]"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </TabsPrimitive.Trigger>
                );
              })}
            </TabsPrimitive.List>
          </div>

          {/* RIGHT COLUMN: Active Module Executive Dossier */}
          <div className="lg:col-span-7 min-w-0">
            {modules.map((mod, idx) => {
              const tabKey = getTabKey(mod, idx);
              return (
                <TabsPrimitive.Content
                  key={tabKey}
                  value={tabKey}
                  id={`mold-panel-${tabKey}`}
                  className="bg-[#111319] border border-white/[0.09] rounded-[4px] p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Header: Rule & Primary Video Lecture Citation */}
                    <div className="pb-4 mb-6 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                          aria-hidden="true"
                        />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                          {mod.technicalRule || "Tizimli reglament qoidasi"}
                        </span>
                      </div>

                      {mod.sourceUrl && (
                        <a
                          href={mod.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-wider text-[#A6ACBA] hover:text-[#D4AF37] transition-colors"
                        >
                          <span>{mod.sourceLabel || "Video ma’ruza"}</span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 12L12 4M6 4h6v6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-[1.2] text-[#FFFFFF] mb-4">
                      {mod.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="text-[16px] sm:text-[17px] leading-[1.74] text-[#C2C7D1] [text-wrap:pretty] mb-6">
                      {mod.description}
                    </p>

                    {/* Operational Ecosystem Context */}
                    {mod.appContext && (
                      <div className="p-4 bg-[#0A0C10] border border-white/[0.06] rounded-[3px] mb-8">
                        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#8E95A5] mb-1.5">
                          {principles.labels?.appContext ||
                            "Ekotizimdagi amaliy qo‘llanilishi"}
                          :
                        </div>
                        <p className="text-[14px] leading-relaxed text-[#F5F4F0] font-medium">
                          {mod.appContext}
                        </p>
                      </div>
                    )}

                    {/* Comparative Analysis: Traditional vs The Mold Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {mod.beforeText && (
                        <div className="bg-[#0D0F14] border border-white/[0.06] rounded-[4px] p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2.5">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"
                                aria-hidden="true"
                              />
                              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#EF4444]">
                                {principles.labels?.before ||
                                  "Shaxsga bog‘liq boshqaruv"}
                              </span>
                            </div>
                            <p className="text-[13.5px] text-[#9EA6B5] leading-[1.6]">
                              {mod.beforeText}
                            </p>
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#555C69] mt-3 block">
                            Eski amaliyot
                          </span>
                        </div>
                      )}

                      {mod.afterText && (
                        <div className="bg-[#141722] border border-[#D4AF37]/30 rounded-[4px] p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                          <div>
                            <div className="flex items-center gap-2 mb-2.5">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                                aria-hidden="true"
                              />
                              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                                {principles.labels?.after || "«Qolip» yondashuvi"}
                              </span>
                            </div>
                            <p className="font-serif text-[14.5px] font-semibold text-[#FFFFFF] leading-[1.5]">
                              {mod.afterText}
                            </p>
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]/80 mt-3 block">
                            Tizimli yechim
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TabsPrimitive.Content>
              );
            })}
          </div>
        </TabsPrimitive.Root>
      </div>
    </section>
  );
};
