"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
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
      className="bg-[var(--bg-alabaster)] border-b border-[var(--border-hairline-editorial)] py-12 lg:py-16 scroll-mt-24"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-6">
          <h2
            id="timeline-heading"
            className="lg:col-span-7 font-serif text-[clamp(32px,4.1vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
          >
            {timeline.title}
            {timeline.titleEmphasis ? ` ${timeline.titleEmphasis}` : ""}
          </h2>

          <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
            {timeline.subtitle}
          </p>
        </header>

        {/* Role Filter Tabs */}
        {timeline.filters && (
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={timeline.filterAriaLabel || timeline.moduleLabel}
            className="flex flex-wrap gap-2 mb-6"
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
                  className={`min-h-[44px] px-4 py-2 rounded-[2px] border text-[13px] font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] disabled:opacity-55 disabled:cursor-not-allowed ${
                    isSelected
                      ? "bg-[var(--bg-dark)] border-[var(--bg-dark)] text-[var(--bg-surface-warm)]"
                      : "bg-[var(--bg-surface-warm)] border-[var(--border-hairline-editorial)] text-[var(--text-soft-editorial)] hover:border-[var(--text-ink)] hover:text-[var(--text-ink)] active:bg-[var(--bg-stone-soft)]"
                  }`}
                >
                  {timeline.filters?.[key]}
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
          {filteredSteps.map((step) => {
            const stepKey = step.id || step.stageNumber;
            const isOpen = expandedIds.has(stepKey);
            const panelId = `tl-note-drawer-${stepKey}`;
            const btnId = `tl-verify-btn-${stepKey}`;

            return (
              <article
                key={stepKey}
                aria-labelledby={`tl-stage-title-${stepKey}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-5 lg:px-4 border-b border-[var(--border-hairline-editorial)] items-start transition-[background-color] duration-200 lg:hover:bg-[var(--bg-stone-soft)]"
              >
                {/* Col 1: Year Display + Attribution Tag */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className="font-serif text-[clamp(28px,2.8vw,38px)] font-semibold [font-variant-numeric:tabular-nums] leading-[1.05] text-[var(--text-ink)]">
                    {step.period}
                  </span>
                  {step.tag && (
                    <span
                      className={`self-start text-[12px] font-semibold px-3 py-1 rounded-[2px] ${roleTagClasses(
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
                    className="font-serif text-[clamp(22px,2.2vw,27px)] font-semibold leading-[1.24] text-[var(--text-ink)] mb-3 [overflow-wrap:break-word]"
                  >
                    {step.title}
                  </h3>
                  <p className="text-[16px] leading-[1.68] text-[var(--text-soft-editorial)] max-w-[60ch] [text-wrap:pretty]">
                    {step.summary}
                  </p>
                </div>

                {/* Col 3: Attribution, Source Citation & Verification Disclosure */}
                <div className="lg:col-span-3 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[var(--border-hairline-editorial)] pt-4 lg:pt-0 lg:pl-6">
                  <dl>
                    {step.role && (
                      <>
                        <dt className="text-[12px] font-semibold text-[var(--text-muted-aa)] mb-0.5">
                          {timeline.labels?.role || "Role"}
                        </dt>
                        <dd className="text-[14px] font-medium leading-[1.48] text-[var(--text-ink)] mb-3">
                          {step.role}
                        </dd>
                      </>
                    )}
                    {step.source && (
                      <>
                        <dt className="text-[12px] font-semibold text-[var(--text-muted-aa)] mb-0.5">
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
                        className="self-start min-h-[44px] px-4 py-2 bg-transparent border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-surface-warm)] hover:border-[var(--accent-gold-ink)] active:bg-[var(--bg-stone)] rounded-[2px] text-[13px] font-semibold text-[var(--text-ink)] inline-flex items-center gap-2 transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] disabled:opacity-55 disabled:cursor-not-allowed"
                      >
                        <span>
                          {isOpen
                            ? timeline.labels?.hide || "Hide"
                            : timeline.labels?.verify || "Verification note"}
                        </span>
                        <svg
                          width="14"
                          height="14"
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

                      {isOpen && (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          className="p-4 bg-[var(--bg-surface-warm)] border-l-2 border-[var(--accent-gold)] text-[14px] leading-[1.58] text-[var(--text-soft-editorial)]"
                        >
                          {step.verificationNote}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
