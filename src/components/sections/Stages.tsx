"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { GridLine } from "@/components/ui/GridLine";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { formatSectionKicker } from "@/config/sections";

interface StageItemRaw {
  step: string;
  title: string;
  description: string;
  points?: string[];
}

interface StagesProps {
  onOpenApply?: (serviceName?: string) => void;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export function Stages({ onOpenApply }: StagesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("stages");
  const ctaT = useTranslations("cta");

  const [activeTab, setActiveTab] = useState<string>("tab-systematization");
  const [openItem, setOpenItem] = useState<string>("");

  const tabItems = [
    {
      id: "tab-systematization",
      direction: t("direction1"),
      title: t("tab1"),
    },
    {
      id: "tab-mentorship",
      direction: t("direction2"),
      title: t("tab2"),
    },
  ];

  const systematizationItems = (
    t.raw("systematization") as StageItemRaw[]
  ).map((item, idx) => ({
    id: `sys-${idx + 1}`,
    step: item.step,
    title: item.title,
    description: item.description,
    points: item.points || [],
  }));

  const mentorshipItems = (
    t.raw("mentorship") as StageItemRaw[]
  ).map((item, idx) => ({
    id: `mentor-${idx + 1}`,
    step: item.step,
    title: item.title,
    description: item.description,
    points: item.points || [],
  }));

  const currentItems =
    activeTab === "tab-systematization"
      ? systematizationItems
      : mentorshipItems;

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="bosqichlar"
      aria-label={t("title")}
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#070707] text-[#E5E5E5] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column (lg:col-span-5 — Strategy, Mode Switcher & Perfectly Level Diagnostic CTA) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Swiss Kicker */}
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  {formatSectionKicker("stages", t("kicker"))}
                </span>
              </div>

              {/* H2 Heading (Sans + Serif Italic mix) with Editorial Masked Reveal */}
              <MaskedHeading className="text-3xl sm:text-4xl lg:text-[42px] font-light tracking-[-0.03em] leading-[1.1] text-white">
                {t("titlePrefix")}
                <span className="font-serif italic font-normal text-white/90">
                  {t("titleHighlight")}
                </span>
              </MaskedHeading>

              {/* Bespoke Architectural Tabs */}
              <div className="flex flex-col border-t border-[#1E1E1E]">
                {tabItems.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setOpenItem("");
                      }}
                      className={`group flex items-center justify-between py-4 px-4 border-b border-[#1E1E1E] text-left transition-all duration-300 rounded-none cursor-pointer w-full ${
                        isActive
                          ? "bg-[#121212] border-l-2 border-l-[#D4AF37] pl-5 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                          : "text-[#9A9A9A] hover:text-white hover:bg-white/[0.03] hover:pl-5"
                      }`}
                    >
                      <div>
                        <span className="font-mono text-xs uppercase tracking-[0.16em] block text-[#D4AF37] mb-0.5">
                          {tab.direction}
                        </span>
                        <span className="text-base sm:text-lg font-normal tracking-tight text-white">
                          {tab.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4AF37]">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contextual CTA Monolith fitted into Left Column, aligned flush with bottom of right column */}
            <div className="mt-8 lg:mt-0 p-6 sm:p-7 border border-[#1E1E1E] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 bg-[#121212] rounded-none shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <h3 className="font-serif italic text-lg sm:text-xl text-white font-normal leading-snug">
                {t("ctaBandTitle")}
              </h3>
              <p className="text-sm text-[#9A9A9A] mt-2 font-normal leading-relaxed">
                {t("ctaBandDesc")}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() =>
                    handleApply(
                      activeTab === "tab-systematization"
                        ? "Biznesni tizimlashtirish bosqichlari"
                        : "Shogirdlik va mentorlik bosqichlari"
                    )
                  }
                  className="w-full group/cta relative overflow-hidden inline-flex items-center justify-between bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-5 py-3 text-xs font-mono uppercase tracking-[0.16em] font-semibold rounded-none transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
                >
                  {/* Liquid Sheen */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full" />
                  <span className="relative z-10 font-bold">{ctaT("primary")}</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1.5 font-bold">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-7 — Sharp Accordion Blueprint) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_SWISS }}
                className="relative flex flex-col group/stages-list"
              >
                <GridLine />

                {currentItems.map((item, idx) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div
                      key={item.id}
                      className="group relative transition-all duration-300 group-hover/stages-list:opacity-40 hover:!opacity-100 hover:bg-[#121212]/50 px-2 sm:px-4 rounded-none overflow-hidden"
                    >
                      {/* Watermark Step Number in Background */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none select-none absolute right-12 top-3 font-mono text-5xl sm:text-6xl font-bold text-[#D4AF37]/[0.04] group-hover:text-[#D4AF37]/[0.1] transition-colors duration-300"
                      >
                        {item.step}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`stage-content-${item.id}`}
                        id={`stage-button-${item.id}`}
                        className="w-full py-5 flex items-baseline justify-between gap-6 text-left rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] relative z-10"
                      >
                        <span className="font-mono text-xs text-[#D4AF37] group-hover:text-white shrink-0 w-12 transition-colors duration-300">
                          /{item.step}
                        </span>
                        <span className="text-xl sm:text-2xl font-light tracking-[-0.02em] text-[#E5E5E5] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 flex-1">
                          {item.title}
                        </span>
                        <span className="font-mono text-lg text-[#D4AF37] group-hover:text-white transition-transform shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`stage-content-${item.id}`}
                            role="region"
                            aria-labelledby={`stage-button-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE_SWISS }}
                            className="overflow-hidden relative z-10"
                          >
                            <div className="pb-8 pl-0 sm:pl-12 pr-4 space-y-4">
                              <p className="text-base text-[#9A9A9A] font-normal leading-relaxed">
                                {item.description}
                              </p>

                              {item.points && item.points.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                  {item.points.map((pt, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-2.5">
                                      <span className="text-[#D4AF37] font-mono text-xs shrink-0 mt-0.5">
                                        —
                                      </span>
                                      <span className="text-sm text-[#9A9A9A] font-normal leading-relaxed">
                                        {pt}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="pt-2">
                                <button
                                  type="button"
                                  onClick={() => handleApply(`${item.title} bosqichi`)}
                                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors cursor-pointer group/btn min-h-[44px]"
                                >
                                  <span>{t("stageAction")}</span>
                                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5 font-mono">
                                    →
                                  </span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Staggered architectural divider line */}
                      <GridLine delay={idx * 0.08} />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
