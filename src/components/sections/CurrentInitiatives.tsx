import React from "react";
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
      className="bg-[var(--bg-stone)] text-[var(--text-ink)] border-b border-[var(--border-hairline-editorial)] py-12 lg:py-16 scroll-mt-24"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end pb-6 border-b border-[var(--border-hairline-editorial)] mb-6">
          <div className="lg:col-span-7 min-w-0">
            <div className="inline-flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent-gold-ink)] mb-3">
              <span
                className="w-6 h-[1.5px] bg-[var(--accent-gold)] shrink-0"
                aria-hidden="true"
              />
              <span>{initiatives.eyebrow}</span>
            </div>
            <h2
              id="initiatives-heading"
              className="font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance]"
            >
              {initiatives.title}
            </h2>
          </div>

          <p className="lg:col-span-5 text-[16px] leading-[1.65] text-[var(--text-soft-editorial)] max-w-[58ch] [text-wrap:pretty]">
            {initiatives.subtitle}
          </p>
        </header>

        {/* Factual Scope Disclosure Bar */}
        <aside
          aria-label={initiatives.eyebrow}
          className="bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] border-l-[3px] border-l-[var(--accent-gold)] rounded-[2px] px-5 py-4 mb-9"
        >
          <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[var(--text-soft-editorial)]">
            {initiatives.disclaimer}
          </p>
        </aside>

        {/* 3 Restrained Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {initiatives.items.map((item, idx) => {
            const statusText =
              initiatives.statusLabels?.[item.status] || item.tag;
            const statusClass =
              STATUS_STYLE_MAP[item.status] || STATUS_STYLE_MAP.public_presentation;

            return (
              <article
                key={item.id}
                aria-labelledby={`initiative-title-${item.id}`}
                className="bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] hover:border-[var(--accent-gold)] hover:shadow-[var(--shadow-editorial-subtle)] rounded-[2px] p-6 sm:p-7 flex flex-col justify-between gap-5 transition-[border-color,box-shadow] duration-200 min-w-0"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Index + Period Row */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border-hairline-subtle)]">
                    <span className="font-mono text-[11.5px] font-bold text-[var(--text-muted-aa)] truncate min-w-0">
                      {`0${idx + 1} // ${item.tag}`}
                    </span>
                    <span className="font-mono text-[11.5px] font-semibold text-[var(--text-ink)] bg-[var(--bg-stone)] px-2.5 py-1 rounded-[2px] tabular-nums whitespace-nowrap shrink-0">
                      {item.period}
                    </span>
                  </div>

                  {/* Verification / Scope Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center min-h-[28px] px-3 py-1 rounded-[2px] text-[12px] font-semibold ${statusClass}`}
                    >
                      {statusText}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3
                    id={`initiative-title-${item.id}`}
                    className="font-serif text-[22px] sm:text-[24px] font-semibold leading-[1.24] text-[var(--text-ink)] [overflow-wrap:break-word]"
                  >
                    {item.title}
                  </h3>

                  <p className="text-[15px] leading-[1.65] text-[var(--text-soft-editorial)] [text-wrap:pretty]">
                    {item.summary}
                  </p>
                </div>

                {/* Legal/Factual Caveat + Primary Verified Source Link */}
                <div className="flex flex-col gap-4 pt-3 border-t border-[var(--border-hairline-subtle)]">
                  <p className="text-[13px] leading-[1.55] text-[var(--text-soft-editorial)] bg-[var(--bg-alabaster)] border-l-2 border-[var(--accent-gold)] px-3.5 py-2.5">
                    {item.caveat}
                  </p>

                  <div>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] w-full sm:w-auto px-4 bg-transparent text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-dark)] hover:text-[var(--bg-surface-warm)] hover:border-[var(--bg-dark)] rounded-[2px] text-[13px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{item.sourceLabel}</span>
                      {EXTERNAL_ARROW_SVG}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
