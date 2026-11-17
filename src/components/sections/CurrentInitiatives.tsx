"use client";

import React from "react";
import { motion } from "framer-motion";
import { getContent } from "@/config/content";

interface CurrentInitiativesProps {
  locale?: string;
}

const STATUS_STYLE_MAP: Record<
  "verified_educational" | "pending_confirmation" | "public_presentation",
  string
> = {
  verified_educational:
    "bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)] border border-[var(--accent-gold-border)]",
  pending_confirmation:
    "bg-[var(--bg-stone)] text-[var(--text-ink)] border border-dashed border-[var(--border-hairline-editorial-strong)]",
  public_presentation:
    "bg-[var(--bg-alabaster)] text-[var(--text-soft-editorial)] border border-[var(--border-hairline-editorial-strong)]",
};

const EXTERNAL_ARROW_SVG = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 12L12 4M6 4h6v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CurrentInitiatives: React.FC<CurrentInitiativesProps> = ({
  locale = "uz",
}) => {
  const content = getContent(locale);
  const initiatives = content.initiatives;

  if (!initiatives || !initiatives.items?.length) return null;

  return (
    <section
      id="tashabbuslar"
      aria-labelledby="initiatives-heading"
      className="bg-[var(--bg-stone)] text-[var(--text-ink)] border-b border-[var(--border-hairline-editorial)] py-14 lg:py-20 scroll-mt-[76px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-8 border-b border-[var(--border-hairline-editorial)] mb-8">
          <div className="lg:col-span-7 min-w-0">
            <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[var(--accent-gold-ink)] font-semibold mb-3 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]"
                aria-hidden="true"
              />
              <span>
                {locale === "ru"
                  ? "04 // ТЕКУЩИЕ ИНИЦИАТИВЫ И ОБРАЗОВАНИЕ"
                  : locale === "en"
                  ? "04 // CURRENT INITIATIVES & EDUCATION"
                  : "04 // JORIY TASHABBUSLAR VA TA’LIMIY LOYIHALAR"}
              </span>
            </p>
            <h2
              id="initiatives-heading"
              className="font-serif text-[clamp(32px,4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance]"
            >
              {initiatives.title}
            </h2>
          </div>

          <p className="lg:col-span-5 text-[15px] sm:text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
            {initiatives.subtitle}
          </p>
        </header>


        {/* 3 Restrained Editorial Cards with Subtle Hover Elevation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {initiatives.items.map((item, idx) => {
            const statusText =
              initiatives.statusLabels?.[item.status] || item.tag;
            const statusClass =
              STATUS_STYLE_MAP[item.status] || STATUS_STYLE_MAP.public_presentation;

            return (
              <motion.article
                key={item.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-labelledby={`initiative-title-${item.id}`}
                className="bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] hover:border-[var(--accent-gold)] hover:shadow-[var(--shadow-editorial-subtle)] rounded-[2px] p-6 sm:p-7 flex flex-col justify-between gap-6 transition-[border-color,box-shadow] duration-200 min-w-0"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Index + Period Row */}
                  <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[var(--border-hairline-subtle)]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] font-semibold text-[var(--text-muted-aa)] min-w-0">
                      {`0${idx + 1} // ${item.tag}`}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-ink)] bg-[var(--bg-stone)] px-2.5 py-1 rounded-[2px] tabular-nums whitespace-nowrap shrink-0">
                      {item.period}
                    </span>
                  </div>

                  {/* Verification / Scope Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-[2px] text-[11px] font-semibold uppercase tracking-wider ${statusClass}`}
                    >
                      {statusText}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3
                    id={`initiative-title-${item.id}`}
                    className="font-serif text-[21px] sm:text-[23px] font-semibold leading-[1.26] text-[var(--text-ink)] [overflow-wrap:break-word]"
                  >
                    {item.title}
                  </h3>

                  <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[var(--text-soft-editorial)] [text-wrap:pretty]">
                    {item.summary}
                  </p>
                </div>

                {/* Legal/Factual Caveat + Primary Verified Source Link */}
                <div className="flex flex-col gap-4 pt-3 border-t border-[var(--border-hairline-subtle)]">
                  <p className="text-[12.5px] sm:text-[13px] leading-[1.58] text-[var(--text-soft-editorial)] bg-[var(--bg-alabaster)]/90 border-l-2 border-[var(--accent-gold)] px-3.5 py-2.5 rounded-r-[2px]">
                    {item.caveat}
                  </p>

                  <div>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group min-h-[44px] w-full px-4 py-2.5 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-dark)] hover:text-white hover:border-[var(--bg-dark)] rounded-[2px] text-[12.5px] font-semibold inline-flex items-center justify-between gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer"
                    >
                      <span className="truncate">{item.sourceLabel}</span>
                      <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        {EXTERNAL_ARROW_SVG}
                      </span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
