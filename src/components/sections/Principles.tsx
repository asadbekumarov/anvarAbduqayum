"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs as TabsPrimitive } from "radix-ui";
import { getContent } from "@/config/content";
import { MONOGRAPH_EASE } from "@/components/ui/RevealMask";
import { AudioThesisPlayer } from "@/components/ui/AudioThesisPlayer";

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
      className="relative bg-[#090A0D] text-[#F5F4F0] py-14 lg:py-20 scroll-mt-[76px] border-b border-[rgba(212,175,55,0.2)]"
    >
      {/* Top subtle hairline gradient transition from Stone to Obsidian */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.35)] to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-8 border-b border-white/[0.08] mb-8">
          <div className="lg:col-span-7 min-w-0">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#D4AF37] font-semibold mb-3 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                aria-hidden="true"
              />
              <span>
                {locale === "ru"
                  ? "05 // МЕТОДОЛОГИЯ «ПРЕСС-ФОРМЫ»"
                  : locale === "en"
                  ? "05 // THE «MOLD» MANAGEMENT PRINCIPLE"
                  : "05 // BOSHQARUVNING «QOLIP» TAMOYILI"}
              </span>
            </p>
            <h2
              id="principles-heading"
              className="font-serif text-[clamp(32px,4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em] text-[#FFFFFF] [overflow-wrap:break-word] [text-wrap:balance]"
            >
              {principles.title || "Qolip tamoyili"}
              {principles.titleEmphasis ? ` ${principles.titleEmphasis}` : ""}
            </h2>
          </div>

          <p className="lg:col-span-5 text-[15px] sm:text-[16px] leading-[1.65] text-[#9EA6B5] max-w-[58ch] [text-wrap:pretty]">
            {principles.subtitle}
          </p>
        </header>

        {/* Radix UI Tabs: 2-Column Desktop | Horizontal Scrollable Tabs on Mobile */}
        <TabsPrimitive.Root
          value={activeValue}
          onValueChange={(val) => {
            const idx = modules.findIndex((m, i) => getTabKey(m, i) === val);
            if (idx !== -1) setActiveIndex(idx);
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
        >
          {/* LEFT COLUMN: Philosophy Quote + Tab Triggers */}
          <div className="lg:col-span-5 flex flex-col gap-4 min-w-0">
            {/* Compact Philosophy Quote */}
            <div className="bg-[#111215] border border-white/[0.08] border-l-2 border-l-[#D4AF37] rounded-[2px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                  {principles.statementHeading || "Boshqaruv falsafasi"}
                </h3>
                <span className="font-mono text-[11px] text-[#8E95A5] tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(modules.length).padStart(2, "0")}
                </span>
              </div>
              <p className="font-serif italic text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#F5F4F0]">
                «{principles.manifesto}»
              </p>
            </div>

            {/* Tab List: Horizontal Scroll on Mobile, Vertical Stack on Desktop */}
            <TabsPrimitive.List
              aria-label={principles.tablistAriaLabel || principles.title}
              className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-2 pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {modules.map((mod, idx) => {
                const tabKey = getTabKey(mod, idx);
                const isSelected = idx === activeIndex;

                return (
                  <TabsPrimitive.Trigger
                    key={tabKey}
                    id={`mold-tab-${tabKey}`}
                    value={tabKey}
                    className={`relative shrink-0 lg:shrink snap-start min-h-[46px] px-4 py-3 text-left rounded-[2px] border flex items-center gap-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                      isSelected
                        ? "border-[#D4AF37]/50 text-[#FFFFFF]"
                        : "bg-transparent border-white/[0.08] text-[#8E95A5] hover:text-[#FFFFFF] hover:border-white/[0.2]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activePrincipleTabIndicator"
                        className="absolute inset-0 bg-[#161820] border-l-2 border-l-[#D4AF37] rounded-[2px] -z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 font-mono text-[11.5px] font-bold shrink-0 ${
                        isSelected ? "text-[#D4AF37]" : "text-[#8E95A5]"
                      }`}
                    >
                      {mod.index}
                    </span>
                    <span className="relative z-10 text-[13.5px] font-semibold leading-snug whitespace-nowrap lg:whitespace-normal">
                      {mod.title}
                    </span>
                  </TabsPrimitive.Trigger>
                );
              })}
            </TabsPrimitive.List>
          </div>

          {/* RIGHT COLUMN: Active Tab Content with Deliberate 0.6s Architectural Reveal */}
          <div className="lg:col-span-7 min-w-0">
            {modules.map((mod, idx) => {
              const tabKey = getTabKey(mod, idx);
              return (
                <TabsPrimitive.Content
                  key={tabKey}
                  value={tabKey}
                  id={`mold-panel-${tabKey}`}
                  className="bg-[#111215] border border-white/[0.1] rounded-[2px] p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      ease: MONOGRAPH_EASE,
                    }}
                  >
                    <div className="pb-3 border-b border-white/[0.08] mb-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-[#D4AF37]">
                        {mod.index}
                        {" // "}
                        {mod.technicalRule}
                      </span>
                      <AudioThesisPlayer
                        audioSrc={mod.audioSrc}
                        speechText={mod.speechText}
                        sourceUrl={mod.sourceUrl}
                        sourceLabel={mod.sourceLabel}
                        title={mod.title}
                        durationLabel={mod.audioDuration || "0:15"}
                        totalDurationSeconds={15}
                        locale={locale}
                      />
                    </div>

                    <h3 className="font-serif text-[22px] lg:text-[25px] font-bold leading-[1.22] text-[#FFFFFF] mb-3">
                      {mod.title}
                    </h3>

                    <p className="text-[14.5px] leading-[1.65] text-[#C2C7D1] [text-wrap:pretty] mb-4">
                      {mod.description}
                    </p>

                    {mod.appContext && (
                      <dl className="border-t border-white/[0.08] pt-3 mb-4">
                        <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E95A5] mb-1">
                          {principles.labels?.appContext || "Context"}
                        </dt>
                        <dd className="text-[13.5px] font-medium leading-[1.5] text-[#F5F4F0]">
                          {mod.appContext}
                        </dd>
                      </dl>
                    )}

                    {/* Operational Contrast Well: Manual vs Mold Method */}
                    <aside
                      aria-label={
                        principles.contrastAriaLabel || "Operational contrast"
                      }
                      className="bg-[#090A0D] p-4 sm:p-5 rounded-[2px] grid grid-cols-1 sm:grid-cols-2 gap-4 border border-white/[0.08] shadow-inner"
                    >
                      {mod.beforeText && (
                        <div className="sm:pr-4 sm:border-r border-white/[0.08] flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#EF4444]/80"
                              aria-hidden="true"
                            />
                            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#EF4444]">
                              {principles.labels?.before || "Shaxsga bog‘liq boshqaruv"}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-[#A1A7B3] leading-[1.5]">
                            {mod.beforeText}
                          </p>
                        </div>
                      )}

                      {mod.afterText && (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                              aria-hidden="true"
                            />
                            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#D4AF37]">
                              {principles.labels?.after || "Qolip yondashuvi"}
                            </span>
                          </div>
                          <p className="font-serif text-[14px] font-bold leading-[1.38] text-[#FFFFFF]">
                            {mod.afterText}
                          </p>
                        </div>
                      )}
                    </aside>

                    {principles.labels?.disclaimer && (
                      <p className="text-[11px] leading-[1.45] text-[#8E95A5] pt-3 border-t border-white/[0.06] mt-3">
                        {principles.labels.disclaimer}
                      </p>
                    )}
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
