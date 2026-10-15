"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
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

  const [activeTab, setActiveTab] = useState<string>("tab-systematization");
  const [openItem, setOpenItem] = useState<string>("");

  const tabItems = [
    { id: "tab-systematization", label: t("tab1") },
    { id: "tab-mentorship", label: t("tab2") },
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

  const currentIntro =
    activeTab === "tab-systematization"
      ? {
          title: t("introSmallTitle"),
          desc: t("introSmallDesc"),
          badge: "B2B BOSQICHLAR",
        }
      : {
          title: t("introCorporateTitle"),
          desc: t("introCorporateDesc"),
          badge: "MASSHTABLASH",
        };

  return (
    <section
      id="bosqichlar"
      aria-label="Bosqichlar"
      className="py-16 sm:py-24 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <SectionHeader
            index="04"
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            className="mb-0 max-w-3xl"
          />

          {/* Interactive Animated Tabs Switcher */}
          <div className="w-full lg:w-auto shrink-0">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val);
                setOpenItem("");
              }}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-row border border-border/80 bg-elevated/70 p-1 rounded-xl gap-1 border-b-0">
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="w-full flex items-center justify-center text-center py-2.5 px-2 sm:px-5 text-[11px] sm:text-xs uppercase tracking-normal sm:tracking-wider font-medium transition-all text-muted hover:text-white data-[state=active]:text-base data-[state=active]:bg-gold data-[state=active]:font-semibold rounded-lg shadow-sm whitespace-normal sm:whitespace-nowrap leading-tight sm:leading-normal min-h-[44px]"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Tab Intro Highlight Card */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl border border-gold/25 bg-gradient-to-r from-elevated/90 via-base to-elevated/90 relative overflow-hidden backdrop-blur-xs">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold font-semibold block mb-1">
                {currentIntro.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                {currentIntro.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 font-light max-w-3xl leading-relaxed">
                {currentIntro.desc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleApply(currentIntro.title)}
              className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-gold/40 text-gold bg-gold/10 hover:bg-gold hover:text-base transition-all duration-200"
            >
              <span>{t("stageAction")}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* 6-Step Smooth Accordion Container */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_SWISS }}
            >
              <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className="relative divide-y divide-border border-y border-border"
              >
                {currentItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="relative transition-colors duration-300 border-none data-[state=open]:bg-elevated/40 hover:bg-elevated/20 group/accordion-item"
                  >
                    <AccordionTrigger className="w-full flex items-center justify-between py-5 sm:py-6 px-4 sm:px-6 text-left cursor-pointer hover:no-underline group outline-none">
                      <div className="flex items-center gap-4 sm:gap-6 min-w-0 pr-4">
                        <span className="font-serif text-lg sm:text-xl text-gold tracking-widest shrink-0 font-medium">
                          /{item.step}
                        </span>
                        <span className="font-serif text-base sm:text-xl text-white font-normal group-hover:text-gold transition-colors truncate">
                          {item.title}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 sm:px-6 pb-6 pt-0 text-neutral-300 font-light leading-relaxed pl-12 sm:pl-16">
                      <div className="space-y-4">
                        {/* Summary description */}
                        <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Structured Checklist Points from ilxombegimqulov.uz */}
                        {item.points && item.points.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                            {item.points.map((pt, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-base/80 border border-border/80 hover:border-gold/30 transition-colors"
                              >
                                <span className="text-gold text-xs shrink-0 mt-0.5" aria-hidden="true">
                                  ❖
                                </span>
                                <span className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                                  {pt}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action link */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleApply(`${item.title} bosqichi`)}
                            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-gold hover:text-gold-light group/btn font-medium transition-colors"
                          >
                            <span>{t("stageAction")}</span>
                            <svg
                              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Contextual CTA Band */}
        <div className="mt-12 p-6 sm:p-8 border border-gold/30 bg-gradient-to-r from-elevated via-[#151515] to-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
          <div className="relative z-10 max-w-2xl">
            <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">
              {t("ctaBandTitle")}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 font-light leading-relaxed">
              {t("ctaBandDesc")}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleApply("Biznesni tizimlashtirish bosqichlari")}
            className="shrink-0 bg-gold hover:bg-gold-light text-[#0A0A0A] font-medium shadow-[0_0_20px_rgba(197,168,128,0.25)] rounded-lg transition-all"
          >
            <span>{t("ctaBandButton")}</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
