"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { getContent } from "@/config/content";

interface PrinciplesProps {
  locale?: string;
}

export const Principles: React.FC<PrinciplesProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const principles = content.principles;

  const modules = principles.modules || [];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabListRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeModule = modules[activeIndex] || modules[0];

  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % modules.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + modules.length) % modules.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = modules.length - 1;
    }

    if (nextIndex !== -1) {
      setActiveIndex(nextIndex);
      const buttons =
        tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  const handleSummarySelect = (index: number) => {
    setActiveIndex(index);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  if (!principles || !modules.length || !activeModule) return null;

  return (
    <section
      id="tamoyil"
      aria-labelledby="philosophy-heading"
      className="bg-[var(--bg-alabaster)] py-20 lg:py-28 scroll-mt-24 border-b border-[var(--border-hairline-editorial)]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-6">
          <div className="lg:col-span-7 flex items-baseline gap-3 min-w-0">
            <span
              className="font-mono text-[14px] font-medium text-[var(--text-muted-aa)] shrink-0"
              aria-hidden="true"
            >
              {principles.sectionNum || "05"}
            </span>
            <h2
              id="philosophy-heading"
              className="font-serif text-[clamp(32px,4.1vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
            >
              {principles.title}
              {principles.titleEmphasis ? ` ${principles.titleEmphasis}` : ""}
            </h2>
          </div>

          <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
            {principles.subtitle}
          </p>
        </header>

        {/* Obsidian Editorial Business Philosophy Statement Band */}
        <article
          aria-labelledby="ph-statement-heading"
          className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] p-6 sm:p-10 lg:px-16 lg:py-14 border border-[var(--accent-gold-border)] rounded-[2px] mb-12 lg:mb-16"
        >
          <div className="max-w-[72ch] border-l-2 border-[var(--accent-gold-light)] pl-6 lg:pl-10">
            <h3
              id="ph-statement-heading"
              className="font-sans text-[16px] font-semibold text-[var(--accent-gold-light)] mb-3"
            >
              {principles.statementHeading || "Boshqaruv falsafasi"}
            </h3>

            <p
              id="ph-manifesto"
              className="font-serif italic text-[clamp(22px,2.5vw,31px)] font-medium leading-[1.42] text-[var(--text-on-dark)] mb-6"
            >
              {principles.manifesto}
            </p>

            <div className="flex flex-wrap items-baseline justify-between gap-4 pt-4 border-t border-[var(--border-on-dark)]">
              <span
                id="ph-framework"
                className="text-[15px] font-semibold text-[var(--accent-gold-light)]"
              >
                {principles.frameworkTag || principles.moduleLabel}
              </span>

              {principles.caveat && (
                <span className="text-[13px] text-[var(--text-muted-on-dark)] max-w-[48ch]">
                  {principles.caveat}
                </span>
              )}
            </div>
          </div>
        </article>

        {/* Interactive 4-Pillar Mold Inspector Tabs */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label={principles.tablistAriaLabel || principles.title}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-6"
        >
          {modules.map((mod, idx) => {
            const isSelected = idx === activeIndex;
            const tabKey = mod.id || mod.iconType;

            return (
              <button
                key={tabKey}
                id={`mold-tab-${tabKey}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="mold-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-[52px] px-4 py-3 text-left rounded-[2px] border flex flex-col justify-center gap-0.5 transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] disabled:opacity-55 disabled:cursor-not-allowed ${
                  isSelected
                    ? "bg-[var(--bg-dark)] border-[var(--bg-dark)] text-[var(--bg-surface-warm)]"
                    : "bg-[var(--bg-surface-warm)] border-[var(--border-hairline-editorial)] text-[var(--text-ink)] hover:border-[var(--text-ink)] active:bg-[var(--bg-stone)]"
                }`}
              >
                <span
                  className={`font-mono text-[12px] font-medium ${
                    isSelected
                      ? "text-[var(--accent-gold-light)]"
                      : "text-[var(--accent-gold-ink)]"
                  }`}
                >
                  {mod.index}
                </span>
                <span className="text-[14px] font-semibold leading-[1.3] text-inherit">
                  {mod.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Module Specification + Contrast Well */}
        <div
          ref={panelRef}
          id="mold-panel"
          role="tabpanel"
          aria-labelledby={`mold-tab-${activeModule.id || activeModule.iconType}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px] p-6 lg:p-10 mb-12 lg:mb-16 scroll-mt-24"
        >
          {/* Left Narrative & Application Context */}
          <div className="lg:col-span-6 min-w-0">
            <h3 className="font-serif text-[clamp(26px,2.8vw,34px)] font-semibold leading-[1.18] text-[var(--text-ink)] mb-4">
              {activeModule.title}
            </h3>

            <div className="text-[14px] font-semibold text-[var(--accent-gold-ink)] pb-4 border-b border-[var(--border-hairline-editorial)] mb-4">
              {activeModule.technicalRule}
            </div>

            <p className="text-[16px] leading-[1.7] text-[var(--text-soft-editorial)] max-w-[60ch] [text-wrap:pretty] mb-6">
              {activeModule.description}
            </p>

            {activeModule.appContext && (
              <dl className="border-t border-[var(--border-hairline-editorial)] pt-4">
                <dt className="text-[12px] font-semibold text-[var(--text-muted-aa)] mb-1">
                  {principles.labels?.appContext || "Context"}
                </dt>
                <dd className="text-[14.5px] font-medium leading-[1.55] text-[var(--text-ink)]">
                  {activeModule.appContext}
                </dd>
              </dl>
            )}
          </div>

          {/* Right Operational Shift Contrast Well */}
          <aside
            aria-label={principles.contrastAriaLabel || "Operational contrast"}
            className="lg:col-span-6 bg-[var(--bg-stone)] p-6 flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              {activeModule.beforeText && (
                <div className="pb-4 border-b border-[var(--border-hairline-editorial)]">
                  <span className="block text-[12px] font-semibold text-[var(--text-muted-aa)] mb-1">
                    {principles.labels?.before || "Manual management"}
                  </span>
                  <p className="text-[15px] text-[var(--text-soft-editorial)] leading-[1.5]">
                    {activeModule.beforeText}
                  </p>
                </div>
              )}

              {activeModule.afterText && (
                <div>
                  <span className="block text-[12px] font-semibold text-[var(--accent-gold-ink)] mb-1">
                    {principles.labels?.after || "The Mold approach"}
                  </span>
                  <p className="font-serif text-[19px] font-semibold leading-[1.35] text-[var(--text-ink)]">
                    {activeModule.afterText}
                  </p>
                </div>
              )}
            </div>

            {principles.labels?.disclaimer && (
              <p className="text-[13px] leading-[1.5] text-[var(--text-soft-editorial)] pt-4 border-t border-[var(--border-hairline-editorial)]">
                {principles.labels.disclaimer}
              </p>
            )}
          </aside>
        </div>

        {/* All 4 Pillars Hairline Summary Matrix */}
        <div
          id="pillars-summary-grid"
          className="grid grid-cols-1 md:grid-cols-2 border-t border-[var(--border-hairline-editorial-strong)]"
        >
          {modules.map((mod, idx) => (
            <button
              key={mod.id || mod.iconType}
              type="button"
              aria-pressed={idx === activeIndex}
              onClick={() => handleSummarySelect(idx)}
              className={`min-h-[64px] w-full text-left py-6 px-4 flex gap-4 items-start bg-transparent border-b border-[var(--border-hairline-editorial)] hover:bg-[var(--bg-surface-warm)] transition-[background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] disabled:opacity-55 disabled:cursor-not-allowed ${
                idx % 2 === 0
                  ? "md:border-r md:border-r-[var(--border-hairline-editorial)] md:pr-10"
                  : "md:pl-10"
              }`}
            >
              <span className="font-serif text-[20px] font-semibold text-[var(--accent-gold-ink)] leading-[1.2] shrink-0">
                0{idx + 1}
              </span>
              <span>
                <span className="block text-[16px] font-semibold text-[var(--text-ink)] mb-1">
                  {mod.title}
                </span>
                <span className="block text-[14px] text-[var(--text-soft-editorial)] leading-[1.5]">
                  {mod.shortSummary || mod.technicalRule}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
