"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContent } from "@/config/content";

interface TimelineProps {
  locale?: string;
}

type TimelineFilterKey = "all" | "personal" | "partner" | "council";

const ITEMS_PER_PAGE = 3;

export const Timeline: React.FC<TimelineProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const timeline = content.ecosystemTimeline || content.timeline;

  const [selectedFilter, setSelectedFilter] = useState<TimelineFilterKey>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(["toybola-founding"])
  );

  const tabListRef = useRef<HTMLDivElement>(null);

  const steps = timeline.steps || [];
  const filteredSteps = steps.filter((step) => {
    if (selectedFilter === "all") return true;
    return step.filterCat === selectedFilter;
  });

  const totalPages = Math.ceil(filteredSteps.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedSteps = filteredSteps.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const filterKeys: TimelineFilterKey[] = ["all", "personal", "partner", "council"];

  const handleSelectFilter = (key: TimelineFilterKey) => {
    setSelectedFilter(key);
    setCurrentPage(1);
  };

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
      handleSelectFilter(nextKey);
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

  const scrollToChronicleTop = () => {
    const el = document.getElementById("yol");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const roleTagClasses = (tagClass?: string) => {
    if (tagClass === "tag-personal") {
      return "bg-[rgba(184,134,11,0.08)] text-[#7A5600] border border-[rgba(184,134,11,0.3)]";
    }
    if (tagClass === "tag-founding") {
      return "bg-[#111215] text-[#FAF9F5] border border-[#111215]";
    }
    if (tagClass === "tag-council") {
      return "bg-[rgba(17,18,21,0.06)] text-[#111215] border border-[rgba(17,18,21,0.22)]";
    }
    return "bg-[var(--bg-surface-warm)] text-[var(--text-soft-editorial)] border border-[var(--border-hairline-editorial)]";
  };

  if (!timeline || !steps.length) return null;

  return (
    <section
      id="yol"
      aria-labelledby="timeline-heading"
      className="bg-[var(--bg-alabaster)] border-b border-[var(--border-hairline-editorial)] py-16 sm:py-20 lg:py-24 scroll-mt-[76px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header (Strong Left Headline + Proportional Right Narrative) */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-end pb-10 border-b border-[var(--border-hairline-editorial-strong)] mb-12">
          <div className="lg:col-span-7 min-w-0">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent-gold-ink)] mb-3 sm:mb-4">
              <span className="w-6 h-[1.5px] bg-[var(--accent-gold-ink)] shrink-0" aria-hidden="true" />
              <span>
                {locale === "ru"
                  ? "03 // ХРОНИКА ПРЕДПРИНИМАТЕЛЯ"
                  : locale === "en"
                  ? "03 // ENTREPRENEURIAL JOURNEY"
                  : "03 // BOSIB O‘TILGAN YO‘L VA SANOAT XRONIKASI"}
              </span>
            </div>
            <h2
              id="timeline-heading"
              className="font-serif text-[clamp(34px,4.5vw,58px)] font-bold leading-[1.08] tracking-[-0.025em] text-[var(--text-ink)] [text-wrap:balance]"
            >
              {timeline.title || "Bosib o‘tilgan yo‘l"}
              {timeline.titleEmphasis ? ` ${timeline.titleEmphasis}` : ""}
            </h2>
            <p className="font-serif italic text-[18px] sm:text-[21px] text-[var(--accent-gold-ink)] font-normal mt-2.5">
              {locale === "ru"
                ? "2005 — 2026: 20 лет производственной и общественной практики"
                : locale === "en"
                ? "2005 — 2026: 20 Years of Industrial & Public Leadership"
                : "2005 — 2026: 20 yillik sanoat va jamoat faoliyati solnomasi"}
            </p>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-soft-editorial)] max-w-[54ch] [text-wrap:pretty]">
              {timeline.subtitle}
            </p>
          </div>
        </header>

        {/* Category Filter Toolbar */}
        {timeline.filters && (
          <div className="mb-12 sm:mb-16">
            <div
              ref={tabListRef}
              role="tablist"
              aria-label={timeline.filterAriaLabel || timeline.moduleLabel}
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-[4px] bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] shadow-[0_2px_8px_rgba(17,18,21,0.04)]"
            >
              {filterKeys.map((key, index) => {
                const isSelected = selectedFilter === key;
                const rawLabel = timeline.filters?.[key] || key;
                const match = rawLabel.match(/^(.*?)(?:\s*\((\d+)\))?$/);
                const name = match?.[1]?.trim() || rawLabel;
                const countNum = match?.[2] ? parseInt(match[2], 10) : null;
                const countStr =
                  countNum !== null
                    ? countNum < 10
                      ? `0${countNum}`
                      : `${countNum}`
                    : null;

                return (
                  <button
                    key={key}
                    id={`tl-filter-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleSelectFilter(key)}
                    onKeyDown={(e) => handleFilterKeyDown(e, index)}
                    className={`relative min-h-[42px] px-4 sm:px-5 py-2 rounded-[3px] text-[13px] font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                      isSelected
                        ? "text-[#FAF9F5]"
                        : "text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeTimelineFilter"
                        className="absolute inset-0 bg-[#111215] rounded-[3px] shadow-sm -z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      <span>{name}</span>
                      {countStr && (
                        <span
                          className={`font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] transition-colors ${
                            isSelected
                              ? "bg-white/20 text-[#FAF9F5]"
                              : "bg-[var(--bg-stone)] text-[var(--text-muted-aa)]"
                          }`}
                        >
                          {countStr}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Editorial Chronological Monograph Stream */}
        <div id="chronicle-list" className="space-y-12 sm:space-y-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {paginatedSteps.map((step, idx) => {
              const globalIdx = startIndex + idx;
              const stepKey = step.id || step.stageNumber || `step-${globalIdx}`;
              const isOpen = expandedIds.has(stepKey);
              const panelId = `tl-note-drawer-${stepKey}`;
              const btnId = `tl-verify-btn-${stepKey}`;
              const stageNum =
                step.stageNumber ||
                (globalIdx + 1 < 10 ? `0${globalIdx + 1}` : `${globalIdx + 1}`);

              const isLastItem = idx === paginatedSteps.length - 1;

              return (
                <motion.article
                  key={stepKey}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  aria-labelledby={`tl-stage-title-${stepKey}`}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pb-12 sm:pb-16 ${
                    isLastItem
                      ? ""
                      : "border-b border-[var(--border-hairline-editorial)]"
                  } items-start`}
                >
                  {/* Left Column: Bold Epoch & Period Marker */}
                  <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent-gold-ink)] mb-2">
                      <span className="w-2 h-2 rounded-[1px] bg-[var(--accent-gold)]" aria-hidden="true" />
                      <span>BOSQICH {stageNum}</span>
                    </div>

                    <h3 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] font-bold leading-[1.02] text-[var(--text-ink)] tracking-tight my-1.5 [font-variant-numeric:tabular-nums]">
                      {step.period}
                    </h3>

                    {step.tag && (
                      <span
                        className={`mt-2.5 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-[2px] ${roleTagClasses(
                          step.tagClass
                        )}`}
                      >
                        {step.tag}
                      </span>
                    )}
                  </div>

                  {/* Right Column: Historical Narrative & Archival Footnote */}
                  <div className="lg:col-span-8 min-w-0 flex flex-col justify-between">
                    <div>
                      {step.focus && (
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-gold-ink)] font-semibold mb-2">
                          {step.focus}
                        </p>
                      )}

                      <h4
                        id={`tl-stage-title-${stepKey}`}
                        className="font-serif text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.26] text-[var(--text-ink)] mb-3.5 [overflow-wrap:break-word]"
                      >
                        {step.title}
                      </h4>

                      <p className="text-[16px] sm:text-[17px] leading-[1.74] text-[var(--text-soft-editorial)] max-w-[66ch] [text-wrap:pretty] mb-5">
                        {step.summary}
                      </p>

                      {step.milestone && (
                        <div className="p-4 bg-[var(--bg-surface-warm)] border-l-2 border-[var(--accent-gold)] rounded-r-[3px] text-[14px] text-[var(--text-soft-editorial)] italic mb-6">
                          «{step.milestone}»
                        </div>
                      )}
                    </div>

                    {/* Archival Provenance & Verification Footer Bar */}
                    <div className="pt-4 border-t border-[var(--border-hairline-editorial)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--text-soft-editorial)]">
                        {step.role && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted-aa)] font-semibold">
                              {timeline.labels?.role || "Maqom"}:
                            </span>
                            <strong className="font-medium text-[var(--text-ink)]">
                              {step.role}
                            </strong>
                          </span>
                        )}

                        {step.source && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted-aa)] font-semibold">
                              {timeline.labels?.source || "Manba"}:
                            </span>
                            <span className="font-mono text-[12px] text-[var(--text-soft-editorial)]">
                              {step.source}
                            </span>
                          </span>
                        )}
                      </div>

                      {step.verificationNote && (
                        <button
                          id={btnId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleVerification(stepKey)}
                          className="self-start sm:self-auto font-mono text-[12px] font-semibold text-[var(--accent-gold-ink)] hover:text-[var(--text-ink)] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                        >
                          <span>
                            {isOpen
                              ? timeline.labels?.hide || "Izohni yopish"
                              : timeline.labels?.verify || "Faktik tasdiq"}
                          </span>
                          <svg
                            width="11"
                            height="11"
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
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Expandable Verification Archival Note */}
                    {step.verificationNote && (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={btnId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.22,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3.5 p-4 bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] rounded-[3px] text-[13px] leading-relaxed text-[var(--text-soft-editorial)] flex items-start gap-3 shadow-[0_1px_4px_rgba(17,18,21,0.03)]">
                              <span className="font-mono text-[11px] font-bold text-[var(--accent-gold-ink)] shrink-0 mt-0.5">
                                ARXIV //
                              </span>
                              <span>{step.verificationNote}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Centered Editorial Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label={
              locale === "ru"
                ? "Пагинация хроники"
                : locale === "en"
                ? "Chronicle pagination"
                : "Solnoma sahifalari"
            }
            className="mt-10 sm:mt-12 flex justify-center items-center"
          >
            {/* Controls: Prev Button, Page Number Buttons, Next Button */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  scrollToChronicleTop();
                }}
                className="min-h-[40px] px-3 sm:px-4 py-2 rounded-[3px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] text-[12px] sm:text-[13px] font-semibold text-[var(--text-ink)] hover:bg-[var(--bg-stone-soft)] hover:border-[var(--accent-gold-border)] disabled:opacity-35 disabled:pointer-events-none transition-colors inline-flex items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] shadow-[0_1px_3px_rgba(17,18,21,0.03)] cursor-pointer"
              >
                <span aria-hidden="true">←</span>
                <span>
                  {locale === "ru"
                    ? "Назад"
                    : locale === "en"
                    ? "Previous"
                    : "Oldingi"}
                </span>
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isCurrent = pageNum === safePage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          scrollToChronicleTop();
                        }}
                        className={`min-h-[40px] min-w-[36px] sm:min-w-[40px] px-2.5 sm:px-3.5 py-2 rounded-[3px] text-[12px] sm:text-[13px] font-mono font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer ${
                          isCurrent
                            ? "bg-[#111215] text-[#FAF9F5] shadow-sm"
                            : "bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] text-[var(--text-soft-editorial)] hover:bg-[var(--bg-stone-soft)] hover:text-[var(--text-ink)]"
                        }`}
                      >
                        {pageNum < 10 ? `0${pageNum}` : pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  scrollToChronicleTop();
                }}
                className="min-h-[40px] px-3 sm:px-4 py-2 rounded-[3px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] text-[12px] sm:text-[13px] font-semibold text-[var(--text-ink)] hover:bg-[var(--bg-stone-soft)] hover:border-[var(--accent-gold-border)] disabled:opacity-35 disabled:pointer-events-none transition-colors inline-flex items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] shadow-[0_1px_3px_rgba(17,18,21,0.03)] cursor-pointer"
              >
                <span>
                  {locale === "ru"
                    ? "Вперед"
                    : locale === "en"
                    ? "Next"
                    : "Keyingi"}
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
};
