"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface StageItemRaw {
  step: string;
  title: string;
  description: string;
}

interface StagesProps {
  onOpenApply?: () => void;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export function Stages({ onOpenApply }: StagesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("stages");
  const common = useTranslations("common");

  const [activeTab, setActiveTab] = useState<string>("tab-systematization");

  const tabItems: TabItem[] = [
    { id: "tab-systematization", label: t("tab1") },
    { id: "tab-mentorship", label: t("tab2") },
  ];

  const systematizationItems: AccordionItemData[] = (
    t.raw("systematization") as StageItemRaw[]
  ).map((item, idx) => ({
    id: `sys-${idx + 1}`,
    step: item.step,
    title: item.title,
    description: item.description,
  }));

  const mentorshipItems: AccordionItemData[] = (
    t.raw("mentorship") as StageItemRaw[]
  ).map((item, idx) => ({
    id: `mentor-${idx + 1}`,
    step: item.step,
    title: item.title,
    description: item.description,
  }));

  const currentItems =
    activeTab === "tab-systematization"
      ? systematizationItems
      : mentorshipItems;

  return (
    <section
      id="bosqichlar"
      aria-label="Bosqichlar"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            index="04"
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            className="mb-0"
          />

          {/* Accessible Animated Tabs Switcher */}
          <div className="shrink-0">
            <Tabs
              items={tabItems}
              activeId={activeTab}
              onChange={setActiveTab}
            />
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
                items={currentItems}
                defaultOpenId={currentItems[0]?.id}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA Band */}
        <div className="mt-12 p-8 border border-border bg-elevated/40 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2px]">
          <div>
            <h4 className="font-serif text-xl text-white font-normal">
              {activeTab === "tab-systematization"
                ? "Biznesingizni tizimlashtirishga tayyormisiz?"
                : "Ustozdan individual mentorlik olishni istaysizmi?"}
            </h4>
            <p className="text-xs sm:text-sm text-muted mt-1 font-light">
              Dastlabki audit va diagnostika bo&apos;yicha maslahat oling.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={handleApply} className="shrink-0">
            {common("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
