"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

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
  const locale = useLocale();
  const isRu = locale === "ru";

  const [activeTab, setActiveTab] = useState<string>("tab-systematization");
  const [openItem, setOpenItem] = useState<string>("sys-1");

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
      aria-label={isRu ? "Методология и этапы" : "Metodologiya va bosqichlar"}
      className="py-24 sm:py-32 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (lg:col-span-5 lg:sticky lg:top-28 — Strategy & Mode Switcher) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Swiss Kicker */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
                {t("kicker")}
              </span>
            </div>

            {/* H2 Heading (Sans + Serif Italic mix) */}
            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-6">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mt-5">
              {t("description")}
            </p>

            {/* Bespoke Architectural Tabs */}
            <div className="mt-10 flex flex-col border-t border-white/[0.08]">
              {tabItems.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setOpenItem(tab.id === "tab-systematization" ? "sys-1" : "mentor-1");
                    }}
                    className={`group flex items-center justify-between py-5 px-4 border-b border-white/[0.08] text-left transition-all rounded-none cursor-pointer w-full ${
                      isActive
                        ? "bg-gradient-to-r from-[#0B132B]/60 to-white/[0.02] border-l-2 border-l-[#C5A880] pl-5 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-[#0B132B]/20"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] block text-platinum mb-1">
                        {tab.direction}
                      </span>
                      <span className="text-base sm:text-lg font-normal tracking-tight">
                        {tab.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                );
              })}
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
                className="border-t border-white/[0.08]"
              >
                {currentItems.map((item) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border-b border-white/[0.08] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        className="w-full py-7 flex items-baseline justify-between gap-6 text-left group rounded-none cursor-pointer"
                      >
                        <span className="font-mono text-xs text-platinum group-hover:text-white shrink-0 w-12 transition-colors">
                          /{item.step}
                        </span>
                        <span className="text-xl sm:text-2xl font-light tracking-[-0.02em] text-white group-hover:translate-x-1 transition-transform flex-1">
                          {item.title}
                        </span>
                        <span className="font-mono text-lg text-platinum group-hover:text-white transition-transform shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE_SWISS }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 pl-0 sm:pl-12 pr-4 space-y-4">
                              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                                {item.description}
                              </p>

                              {item.points && item.points.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                  {item.points.map((pt, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-2.5">
                                      <span className="text-platinum/60 font-mono text-xs shrink-0 mt-0.5">
                                        —
                                      </span>
                                      <span className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
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
                                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-platinum hover:text-white transition-colors cursor-pointer group/btn"
                                >
                                  <span>{t("stageAction")}</span>
                                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                    →
                                  </span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Contextual CTA Monolith */}
            <div className="mt-12 p-8 border border-white/[0.08] bg-gradient-to-r from-[#070D1F] via-[#0B132B]/40 to-[#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-none shadow-[0_15px_35px_rgba(7,13,31,0.4)]">
              <div className="max-w-xl">
                <h3 className="font-serif italic text-xl sm:text-2xl text-white font-normal">
                  {t("ctaBandTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-light leading-relaxed">
                  {t("ctaBandDesc")}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleApply(
                    activeTab === "tab-systematization"
                      ? "Biznesni tizimlashtirish bosqichlari"
                      : "Shogirdlik va mentorlik bosqichlari"
                  )
                }
                className="shrink-0 inline-flex items-center gap-3 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-6 py-3.5 text-xs font-mono uppercase tracking-[0.16em] rounded-none transition-colors duration-300 cursor-pointer group/cta"
              >
                <span>{t("ctaBandButton")}</span>
                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
