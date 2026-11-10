import React from "react";
import { getDemoCopy } from "@/config/demoCopy";

interface ConceptDisclosureBannerProps {
  locale?: string;
}

/**
 * Non-intrusive editorial masthead notice disclosing that the site is an
 * independent, unsolicited design concept when featuresConfig.demoMode is active.
 */
export function ConceptDisclosureBanner({
  locale = "uz",
}: ConceptDisclosureBannerProps) {
  const { disclosure } = getDemoCopy(locale);

  return (
    <aside
      id="concept-disclosure-banner"
      aria-label={disclosure.ariaLabel}
      className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] border-b border-[var(--border-gold)] py-2.5 sm:py-2"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-6">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
          <span className="text-[12.5px] font-semibold text-[var(--accent-gold-light)] shrink-0">
            {disclosure.badge}
          </span>
          <p className="text-[12.5px] sm:text-[13px] leading-[1.45] text-[var(--text-on-dark)] [text-wrap:pretty] min-w-0">
            {disclosure.statement}
          </p>
        </div>

        <span className="hidden md:inline-block text-[12px] font-medium text-[var(--text-muted-on-dark)] whitespace-nowrap shrink-0">
          {disclosure.modeTag}
        </span>
      </div>
    </aside>
  );
}

