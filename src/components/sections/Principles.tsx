"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs as TabsPrimitive } from "radix-ui";
import { getContent } from "@/config/content";
import { MONOGRAPH_EASE } from "@/components/ui/RevealMask";

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
      aria-label={principles.title || "Qolip tamoyili"}
      className="bg-[#090909] text-[#F5F4F0] py-10 lg:py-14 scroll-mt-20 border-b border-[rgba(212,175,55,0.2)]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Radix UI Tabs: 2-Column Desktop | Horizontal Scrollable Tabs on Mobile */}
        <TabsPrimitive.Root
          value={activeValue}
          onValueChange={(val) => {
            const idx = modules.findIndex((m, i) => getTabKey(m, i) === val);
            if (idx !== -1) setActiveIndex(idx);
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start"
        >
          {/* LEFT COLUMN: Compact Manifesto + Tab Triggers */}
          <div className="lg:col-span-5 flex flex-col gap-3 min-w-0">
            {/* Compact Philosophy Quote */}
            <div className="bg-[#111215] border border-[rgba(255,255,255,0.08)] border-l-2 border-l-[#D4AF37] rounded-[2px] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  {principles.statementHeading || "Boshqaruv falsafasi"}
                </h3>
                <span className="font-mono text-[11px] text-[#8E95A5] tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(modules.length).padStart(2, "0")}
                </span>
              </div>
              <p className="font-sans italic text-[14.5px] sm:text-[15.5px] leading-[1.45] text-[#F5F4F0]">
                {principles.manifesto}
              </p>
            </div>

            {/* Tab List: Horizontal Scroll on Mobile, Vertical List on Desktop */}
            <TabsPrimitive.List
              aria-label={principles.tablistAriaLabel || principles.title}
              className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-1.5 pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {modules.map((mod, idx) => {
                const tabKey = getTabKey(mod, idx);
                const isSelected = idx === activeIndex;

                return (
                  <TabsPrimitive.Trigger
                    key={tabKey}
                    id={`mold-tab-${tabKey}`}
                    value={tabKey}
                    className={`shrink-0 lg:shrink snap-start min-h-[44px] px-3.5 py-2.5 text-left rounded-[2px] border flex items-center gap-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isSelected
                        ? "bg-[#111215] border-[rgba(212,175,55,0.35)] border-l-2 border-l-[#D4AF37] text-[#F5F4F0]"
                        : "bg-transparent border-[rgba(255,255,255,0.08)] text-[#8E95A5] hover:text-[#F5F4F0] hover:border-[rgba(255,255,255,0.2)]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11.5px] font-bold shrink-0 ${
                        isSelected ? "text-[#D4AF37]" : "text-[#8E95A5]"
                      }`}
                    >
                      {mod.index}
                    </span>
                    <span className="text-[13px] font-semibold leading-snug whitespace-nowrap lg:whitespace-normal text-[#F5F4F0]">
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
                  className="bg-[#111215] border border-[rgba(255,255,255,0.1)] rounded-[2px] p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
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
                    <div className="pb-2.5 border-b border-[rgba(255,255,255,0.08)] mb-3">
                      <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-[#D4AF37]">
                        {mod.index}
                        {" // "}
                        {mod.technicalRule}
                      </span>
                    </div>

                    <h3 className="font-sans text-[19px] lg:text-[21px] font-bold leading-[1.2] text-[#F5F4F0] mb-2.5">
                      {mod.title}
                    </h3>

                    <p className="text-[13.5px] leading-[1.55] text-[#C2C7D1] [text-wrap:pretty] mb-3.5">
                      {mod.description}
                    </p>

                    {mod.appContext && (
                      <dl className="border-t border-[rgba(255,255,255,0.08)] pt-2.5 mb-3.5">
                        <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8E95A5] mb-0.5">
                          {principles.labels?.appContext || "Context"}
                        </dt>
                        <dd className="text-[13px] font-medium leading-[1.45] text-[#F5F4F0]">
                          {mod.appContext}
                        </dd>
                      </dl>
                    )}

                    {/* Operational Contrast Well */}
                    <aside
                      aria-label={
                        principles.contrastAriaLabel || "Operational contrast"
                      }
                      className="bg-[#090909] p-3.5 rounded-[2px] grid grid-cols-1 sm:grid-cols-2 gap-3.5 border border-[rgba(255,255,255,0.08)]"
                    >
                      {mod.beforeText && (
                        <div className="sm:pr-3 sm:border-r border-[rgba(255,255,255,0.08)]">
                          <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8E95A5] mb-0.5">
                            {principles.labels?.before || "Manual management"}
                          </span>
                          <p className="text-[12.5px] text-[#A1A7B3] leading-[1.45]">
                            {mod.beforeText}
                          </p>
                        </div>
                      )}

                      {mod.afterText && (
                        <div>
                          <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] mb-0.5">
                            {principles.labels?.after || "The Mold approach"}
                          </span>
                          <p className="font-sans text-[13.5px] font-bold leading-[1.3] text-[#F5F4F0]">
                            {mod.afterText}
                          </p>
                        </div>
                      )}
                    </aside>

                    {principles.labels?.disclaimer && (
                      <p className="text-[11px] leading-[1.4] text-[#8E95A5] pt-2.5 border-t border-[rgba(255,255,255,0.06)] mt-2.5">
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
