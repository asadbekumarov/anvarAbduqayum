"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContent } from "@/config/content";

interface TimelineProps {
  locale?: string;
}

type TimelineFilterKey = "all" | "personal" | "partner" | "council";

const ITEMS_PER_PAGE = 6;

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
      return "bg-[#D4AF37]/15 text-[#8C6D15] border border-[#D4AF37]/35";
    }
    if (tagClass === "tag-founding") {
      return "bg-[#111215] text-[#FAF9F5] border border-[#111215]";
    }
    if (tagClass === "tag-partner") {
      return "bg-slate-100 text-slate-800 border border-slate-200";
    }
    if (tagClass === "tag-council") {
      return "bg-emerald-50 text-emerald-900 border border-emerald-200";
    }
    return "bg-[#FAF8F5] text-[#555A68] border border-[#E2DDD5]";
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
          <div className="mb-10 sm:mb-14">
            <div
              ref={tabListRef}
              role="tablist"
              aria-label={timeline.filterAriaLabel || timeline.moduleLabel}
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
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
                    className={`relative min-h-[44px] px-4 sm:px-5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                      isSelected
                        ? "bg-[#111215] text-white shadow-md"
                        : "text-[#5A5E6B] hover:text-[#111215] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      <span>{name}</span>
                      {countStr && (
                        <span
                          className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                            isSelected
                              ? "bg-[#D4AF37] text-black"
                              : "bg-black/5 text-black/60"
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

        {/* Editorial Chronological Stream with Continuous Vertical Track */}
        <div id="chronicle-list" className="relative space-y-8 sm:space-y-10">
          {/* Continuous Timeline Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] sm:left-[35px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/35 to-transparent hidden sm:block pointer-events-none"
          />

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

              return (
                <motion.article
                  key={stepKey}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  aria-labelledby={`tl-stage-title-${stepKey}`}
                  className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 lg:gap-8 group"
                >
                  {/* Left Chronology Beacon / Node */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl bg-[#11131A] border-2 border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(212,175,55,0.18)] flex flex-col items-center justify-center text-center z-10 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#D4AF37]">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">
                        {stageNum}
                      </span>
                      <span className="font-serif text-[12px] sm:text-[13px] font-extrabold text-white tracking-tight leading-none mt-0.5">
                        {step.period.includes("—") ? step.period.split("—")[0].trim() : step.period.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Right Milestone Card */}
                  <div className="flex-1 min-w-0 w-full bg-white border border-[#E6E1D8] rounded-2xl p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:border-[#D4AF37]/60 hover:shadow-[0_12px_36px_rgba(212,175,55,0.08)] transition-all duration-300 relative overflow-hidden">
                    {/* Subtle Gold Hairline on Hover */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />

                    {/* Top Header inside Card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
                        <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-[#8C6D15] font-bold">
                          {step.focus || `BOSQICH ${stageNum}`}
                        </span>
                      </div>

                      {step.tag && (
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${roleTagClasses(
                            step.tagClass
                          )}`}
                        >
                          {step.tag}
                        </span>
                      )}
                    </div>

                    {/* Big Period / Epoch & Stage Title */}
                    <div className="mb-3">
                      <div className="font-serif text-[28px] sm:text-[34px] font-extrabold text-[#111215] tracking-tight leading-none mb-2">
                        {step.period}
                      </div>
                      <h3
                        id={`tl-stage-title-${stepKey}`}
                        className="font-serif text-[20px] sm:text-[23px] font-bold leading-[1.3] text-[#111215] group-hover:text-[#8C6D15] transition-colors [overflow-wrap:break-word]"
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Summary */}
                    <p className="text-[15.5px] sm:text-[16.5px] leading-[1.72] text-[#4A4E5A] mb-5 max-w-[70ch]">
                      {step.summary}
                    </p>

                    {/* Milestone Highlight (Executive Quote Callout) */}
                    {step.milestone && (
                      <div className="my-5 p-4 sm:p-5 bg-[#FAF8F5] border-l-4 border-[#D4AF37] rounded-r-xl flex items-start gap-3.5 shadow-xs">
                        <svg
                          className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="font-serif italic text-[15px] sm:text-[16px] text-[#24272E] leading-relaxed">
                          «{step.milestone}»
                        </p>
                      </div>
                    )}

                    {/* Provenance & Verification Footer Bar */}
                    <div className="pt-4 border-t border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#4A4E5A]">
                        {step.role && (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#737887] font-semibold">
                              {timeline.labels?.role || "Maqom"}:
                            </span>
                            <strong className="font-semibold text-[#111215]">
                              {step.role}
                            </strong>
                          </span>
                        )}

                        {step.source && (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#737887] font-semibold">
                              {timeline.labels?.source || "Manba"}:
                            </span>
                            <span className="font-mono text-[12px] text-[#4A4E5A]">
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
                          className="self-start sm:self-auto min-h-[36px] px-3.5 py-1.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:border-[#D4AF37] hover:bg-white text-[12px] font-mono font-semibold text-[#111215] inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                        >
                          <span>
                            {isOpen
                              ? timeline.labels?.hide || "Izohni yopish"
                              : timeline.labels?.verify || "Huquqiy va faktik izoh"}
                          </span>
                          <svg
                            width="12"
                            height="12"
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
                            <div className="mt-4 p-4 sm:p-5 bg-[#FAF8F5] border border-[#D4AF37]/35 rounded-xl text-[13.5px] leading-relaxed text-[#353945] flex items-start gap-3 shadow-inner">
                              <span className="font-mono text-[10.5px] font-bold text-[#8C6D15] bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30 uppercase shrink-0 mt-0.5">
                                ARXIV //
                              </span>
                              <p className="text-[#353945]">{step.verificationNote}</p>
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

        {/* Centered Editorial Pagination (Shown only if totalPages > 1) */}
        {totalPages > 1 && (
          <nav
            aria-label={
              locale === "ru"
                ? "Пагинация хроники"
                : locale === "en"
                ? "Chronicle pagination"
                : "Solnoma sahifalari"
            }
            className="mt-12 sm:mt-16 flex justify-center items-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full p-1.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  scrollToChronicleTop();
                }}
                className="min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-semibold text-[#111215] hover:bg-[#FAF8F5] disabled:opacity-35 disabled:pointer-events-none transition-colors inline-flex items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
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
                        className={`min-h-[40px] min-w-[38px] sm:min-w-[42px] px-2.5 sm:px-3.5 py-2 rounded-xl text-[12px] sm:text-[13px] font-mono font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                          isCurrent
                            ? "bg-[#111215] text-[#FAF9F5] shadow-sm"
                            : "bg-transparent text-[#5A5E6B] hover:bg-[#FAF8F5] hover:text-[#111215]"
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
                className="min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-semibold text-[#111215] hover:bg-[#FAF8F5] disabled:opacity-35 disabled:pointer-events-none transition-colors inline-flex items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
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
