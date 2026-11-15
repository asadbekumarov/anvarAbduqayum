"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContent } from "@/config/content";

interface TimelineProps {
  locale?: string;
}

type TimelineFilterKey = "all" | "personal" | "partner" | "council";

export const Timeline: React.FC<TimelineProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const timeline = content.ecosystemTimeline || content.timeline;

  const [selectedFilter, setSelectedFilter] = useState<TimelineFilterKey>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(["toybola-founding"])
  );

  const tabListRef = useRef<HTMLDivElement>(null);

  const steps = timeline.steps || [];
  const filteredSteps = steps.filter((step) => {
    if (selectedFilter === "all") return true;
    return step.filterCat === selectedFilter;
  });

  const filterKeys: TimelineFilterKey[] = ["all", "personal", "partner", "council"];

  const handleFilterKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % filterKeys.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + filterKeys.length) % filterKeys.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = filterKeys.length - 1;
    }

    if (nextIndex !== -1) {
      const nextKey = filterKeys[nextIndex];
      setSelectedFilter(nextKey);
      const buttons =
        tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  const toggleVerification = (stepKey: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepKey)) next.delete(stepKey);
      else next.add(stepKey);
      return next;
    });
  };

  const roleTagClasses = (tagClass?: string) => {
    if (tagClass === "tag-personal") {
      return "bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] border border-[var(--accent-gold-border)]";
    }
    if (tagClass === "tag-founding") {
      return "bg-[var(--bg-surface-warm)] text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)]";
    }
    if (tagClass === "tag-council") {
      return "bg-[var(--bg-dark)] text-[var(--accent-gold-light)] border border-[var(--accent-gold-border)]";
    }
    return "bg-[var(--bg-alabaster)] text-[var(--text-soft-editorial)] border border-[var(--border-hairline-editorial)]";
  };

  if (!timeline || !steps.length) return null;

  return (
    <section
      id="yol"
      aria-labelledby="timeline-heading"
      className="bg-[var(--bg-alabaster)] border-b border-[var(--border-hairline-editorial)] py-12 lg:py-16 scroll-mt-[76px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-8 border-b border-[var(--border-hairline-editorial)] mb-8">
          <div className="lg:col-span-7 min-w-0">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[var(--accent-gold-ink)] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              <span>
                {locale === "ru"
                  ? "03 // ХРОНИКА ПРЕДПРИНИМАТЕЛЯ"
                  : locale === "en"
                  ? "03 // ENTREPRENEURIAL JOURNEY"
                  : "03 // BOSIB O‘TILGAN YO‘L VA SANOAT XRONIKASI"}
              </span>
            </p>
            <h2
              id="timeline-heading"
              className="font-serif text-[clamp(32px,4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance]"
            >
              {timeline.title}
              {timeline.titleEmphasis ? ` ${timeline.titleEmphasis}` : ""}
            </h2>
          </div>

          <p className="lg:col-span-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
            {timeline.subtitle}
          </p>
        </header>

        {/* Role Filter Tabs (Segmented sliding control) */}
        {timeline.filters && (
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={timeline.filterAriaLabel || timeline.moduleLabel}
            className="inline-flex flex-wrap items-center gap-1.5 mb-8 p-1.5 rounded-[4px] bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)]"
          >
            {filterKeys.map((key, index) => {
              const isSelected = selectedFilter === key;
              return (
                <button
                  key={key}
                  id={`tl-filter-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedFilter(key)}
                  onKeyDown={(e) => handleFilterKeyDown(e, index)}
                  className={`relative min-h-[40px] px-4 py-2 rounded-[3px] text-[13px] font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                    isSelected
                      ? "text-white"
                      : "text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeTimelineFilter"
                      className="absolute inset-0 bg-[var(--bg-dark)] rounded-[3px] shadow-sm -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{timeline.filters?.[key]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Role Attribution Key */}
        {timeline.legend && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 py-4 border-t border-[var(--border-hairline-subtle)] border-b border-[var(--border-hairline-editorial)] mb-10"
            aria-label={timeline.legend.ariaLabel}
          >
            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--accent-gold)] shrink-0"
                aria-hidden="true"
              />
              <span>{timeline.legend.personal}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--bg-dark)] shrink-0"
                aria-hidden="true"
              />
              <span>{timeline.legend.founding}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--text-muted-aa)] shrink-0"
                aria-hidden="true"
              />
              <span>{timeline.legend.partner}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] border-2 border-[var(--accent-gold)] bg-transparent shrink-0"
                aria-hidden="true"
              />
              <span>{timeline.legend.council}</span>
            </div>
          </div>
        )}

        {/* Asymmetric Monochrome Monograph List */}
        <div
          id="chronicle-list"
          className="border-t border-[var(--border-hairline-editorial-strong)]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredSteps.map((step) => {
              const stepKey = step.id || step.stageNumber;
              const isOpen = expandedIds.has(stepKey);
              const panelId = `tl-note-drawer-${stepKey}`;
              const btnId = `tl-verify-btn-${stepKey}`;

              return (
                <motion.article
                  key={stepKey}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  aria-labelledby={`tl-stage-title-${stepKey}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-6 lg:px-4 border-b border-[var(--border-hairline-editorial)] items-start transition-[background-color] duration-200 lg:hover:bg-[var(--bg-stone-soft)]/50 group"
                >
                  {/* Col 1: Year Display + Attribution Tag */}
                  <div className="lg:col-span-3 flex flex-col gap-2">
                    <span className="font-serif text-[clamp(28px,2.8vw,36px)] font-bold [font-variant-numeric:tabular-nums] leading-[1.05] text-[var(--text-ink)] group-hover:text-[var(--accent-gold-ink)] transition-colors duration-200">
                      {step.period}
                    </span>
                    {step.tag && (
                      <span
                        className={`self-start text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-[2px] ${roleTagClasses(
                          step.tagClass
                        )}`}
                      >
                        {step.tag}
                      </span>
                    )}
                  </div>

                  {/* Col 2: Stage Title & Historical Narrative */}
                  <div className="lg:col-span-6 min-w-0">
                    <h3
                      id={`tl-stage-title-${stepKey}`}
                      className="font-serif text-[clamp(20px,2vw,25px)] font-semibold leading-[1.28] text-[var(--text-ink)] mb-3 [overflow-wrap:break-word]"
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] leading-[1.68] text-[var(--text-soft-editorial)] max-w-[60ch] [text-wrap:pretty]">
                      {step.summary}
                    </p>
                  </div>

                  {/* Col 3: Attribution, Source Citation & Verification Disclosure */}
                  <div className="lg:col-span-3 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[var(--border-hairline-editorial)] pt-4 lg:pt-0 lg:pl-6">
                    <dl>
                      {step.role && (
                        <>
                          <dt className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-muted-aa)] mb-0.5">
                            {timeline.labels?.role || "Role"}
                          </dt>
                          <dd className="text-[14px] font-medium leading-[1.48] text-[var(--text-ink)] mb-3">
                            {step.role}
                          </dd>
                        </>
                      )}
                      {step.source && (
                        <>
                          <dt className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-muted-aa)] mb-0.5">
                            {timeline.labels?.source || "Source"}
                          </dt>
                          <dd className="text-[14px] font-medium leading-[1.48] text-[var(--text-ink)] mb-1">
                            {step.source}
                          </dd>
                        </>
                      )}
                    </dl>

                    {step.verificationNote && (
                      <>
                        <button
                          id={btnId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleVerification(stepKey)}
                          className="self-start min-h-[38px] px-3.5 py-1.5 bg-transparent border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-surface-warm)] hover:border-[var(--accent-gold-ink)] active:bg-[var(--bg-stone)] rounded-[2px] text-[13px] font-semibold text-[var(--text-ink)] inline-flex items-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                        >
                          <span>
                            {isOpen
                              ? timeline.labels?.hide || "Yopish"
                              : timeline.labels?.verify || "Manba va tasdiq"}
                          </span>
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              d="M4 6l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              id={panelId}
                              role="region"
                              aria-labelledby={btnId}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 p-3.5 bg-[var(--bg-surface-warm)] border-l-2 border-[var(--accent-gold)] text-[13px] sm:text-[14px] leading-[1.58] text-[var(--text-soft-editorial)] rounded-r-[2px]">
                                {step.verificationNote}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
