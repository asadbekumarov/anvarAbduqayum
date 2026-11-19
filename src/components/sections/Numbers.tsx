"use client";

import React from "react";
import { getContent } from "@/config/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface NumbersProps {
  locale?: string;
}

export const Numbers: React.FC<NumbersProps> = ({ locale = "uz" }) => {
  const safeLocale = locale === "ru" || locale === "en" ? locale : "uz";
  const content = getContent(safeLocale);
  const { numbers } = content;

  if (!numbers || !numbers.counters || numbers.counters.length === 0) {
    return null;
  }

  const titleEmphasis =
    safeLocale === "ru"
      ? "факты"
      : safeLocale === "en"
      ? "Telemetry"
      : "ko‘rsatkichlar";

  return (
    <section
      id="raqamlar"
      aria-labelledby="numbers-heading"
      className="relative scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-[var(--bg-stone)] border-b border-[var(--border-hairline-editorial)]"
    >
      {/* Top Hairline Transition Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DDB52E]/35 to-transparent pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[var(--border-hairline-editorial)] mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[var(--accent-gold-soft)] border border-[var(--accent-gold-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.16em] uppercase text-[var(--accent-gold-ink)] font-bold">
                {numbers.moduleLabel || "QOLIP №03 // ASOSIY KO‘RSATKICHLAR"}
              </span>
            </div>
            <h2
              id="numbers-heading"
              className="font-serif text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--text-ink)]"
            >
              {numbers.title}{" "}
              <span className="text-[var(--accent-gold-ink)] font-normal italic">
                {titleEmphasis}
              </span>
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-soft-editorial)] lg:text-right [text-wrap:pretty]">
            {numbers.subtitle}
          </p>
        </header>

        {/* 5-Card Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {numbers.counters.map((counter, index) => {
            const indexString = `0${index + 1}`.slice(-2);
            const displayValue = `${counter.value}${counter.suffix}`;

            return (
              <div
                key={counter.id}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] shadow-[var(--shadow-editorial-subtle)] hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
              >
                {/* Top Corner Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline-editorial)]">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--text-muted-aa)]">
                    {"//"} {indexString}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Animated Stat Value */}
                <div className="my-5">
                  <div className="font-serif text-[34px] sm:text-[40px] lg:text-[44px] font-bold text-[var(--text-ink)] group-hover:text-[var(--accent-gold-ink)] tracking-tight leading-none transition-colors">
                    <AnimatedCounter value={displayValue} />
                  </div>
                  <h3 className="mt-3 text-[14px] sm:text-[15px] font-bold text-[var(--text-ink)] leading-snug">
                    {counter.label}
                  </h3>
                </div>

                {/* Bottom Specification */}
                <p className="text-[12px] sm:text-[12.5px] text-[var(--text-soft-editorial)] leading-relaxed pt-3 border-t border-[var(--border-hairline-editorial)]">
                  {counter.specification}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verification Footnote */}
        {numbers.footnote && (
          <div className="mt-8 pt-5 border-t border-[var(--border-hairline-editorial)] flex items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--text-muted-aa)] font-mono leading-relaxed">
              {numbers.footnote}
            </p>
            <span className="hidden sm:inline-block font-mono text-[10.5px] uppercase tracking-wider text-[var(--accent-gold-ink)] px-2.5 py-0.5 rounded bg-[var(--accent-gold-soft)] border border-[var(--accent-gold-border)] shrink-0">
              {safeLocale === "ru" ? "Верифицировано" : safeLocale === "en" ? "Verified" : "Tasdiqlangan"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
