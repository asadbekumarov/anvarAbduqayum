import React from "react";
import Link from "next/link";
import {
  getExportPortalContent,
  type ExportPortalLocale,
} from "../config/exportPortalContent";

interface ExportPortalViewProps {
  locale: string;
  isPartnershipIntakeEnabled: boolean;
}

function getToneBadgeClasses(
  tone: "verified" | "historical" | "pending" | "public"
): string {
  switch (tone) {
    case "verified":
      return "border-[var(--status-success-border)] bg-[var(--status-success-wash)] text-[var(--status-success-ink)]";
    case "historical":
      return "border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-stone)] text-[var(--text-ink)]";
    case "public":
      return "border-[var(--accent-gold)] bg-[var(--bg-stone)] text-[var(--accent-gold-ink)]";
    case "pending":
      return "border-dashed border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-alabaster)] text-[var(--text-soft-editorial)]";
  }
}

export function ExportPortalView({
  locale,
  isPartnershipIntakeEnabled,
}: ExportPortalViewProps) {
  const safeLocale: ExportPortalLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const content = getExportPortalContent(safeLocale);

  return (
    <article
      className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12"
      aria-labelledby="export-portal-title"
    >
      {/* Breadcrumbs + Back Home */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline-editorial)] pb-4">
        <nav aria-label={content.breadcrumbs.ariaLabel}>
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
            <li>
              <Link
                href={`/${safeLocale}`}
                className="inline-flex min-h-[44px] items-center hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                {content.breadcrumbs.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[var(--text-ink)]">
              {content.breadcrumbs.current}
            </li>
          </ol>
        </nav>

        <Link
          href={`/${safeLocale}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-ink)] transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
        >
          <span aria-hidden="true">←</span>
          <span>{content.backHome}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 border-b border-[var(--border-hairline-editorial)] pb-7">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold-ink)]">
          {content.eyebrow}
        </p>
        <h1
          id="export-portal-title"
          className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-ink)] sm:text-4xl"
        >
          {content.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--text-soft-editorial)]">
          {content.subtitle}
        </p>

        {/* Independent Demo / No-Personal-Guarantee Disclaimer */}
        <div
          role="note"
          data-testid="export-demo-disclaimer"
          className="mt-6 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] p-4 sm:p-5"
        >
          <span className="inline-flex items-center rounded-[2px] border border-[var(--accent-gold)] bg-[var(--bg-surface-warm)] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-gold-ink)]">
            {content.demoDisclaimer.badge}
          </span>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-soft-editorial)]">
            {content.demoDisclaimer.body}
          </p>
        </div>
      </header>

      {/* Section 01: Verified Manufacturing & Export Capabilities */}
      <section className="mb-10" aria-labelledby="export-capabilities-heading">
        <h2
          id="export-capabilities-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {content.capabilitiesSection.heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-soft-editorial)]">
          {content.capabilitiesSection.intro}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {content.capabilitiesSection.items.map((item) => (
            <div
              key={item.code}
              className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline-subtle)] pb-2.5">
                  <span className="font-mono text-[11px] font-bold text-[var(--accent-gold-ink)]">
                    {item.code}
                  </span>
                  <span className="font-mono text-[10.5px] text-[var(--text-muted-aa)]">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-[var(--text-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-soft-editorial)]">
                  {item.detail}
                </p>
              </div>
              <p className="mt-4 border-t border-[var(--border-hairline-subtle)] pt-2.5 font-mono text-[11px] text-[var(--text-muted-aa)]">
                {item.source}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 02: Legal & Verification Separation */}
      <section className="mb-10" aria-labelledby="export-separation-heading">
        <h2
          id="export-separation-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {content.separationSection.heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-soft-editorial)]">
          {content.separationSection.intro}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.separationSection.entities.map((entity) => (
            <div
              key={entity.title}
              className="flex flex-col justify-between rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-5"
            >
              <div>
                <span
                  className={`inline-flex items-center rounded-[2px] border px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${getToneBadgeClasses(
                    entity.tone
                  )}`}
                >
                  {entity.badge}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--text-ink)]">
                  {entity.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-soft-editorial)]">
                  {entity.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-hairline-subtle)] pt-3">
                <span className="font-mono text-[11px] text-[var(--text-muted-aa)]">
                  {entity.sourceNote}
                </span>
                {entity.externalUrl && (
                  <a
                    href={entity.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1 font-mono text-[11px] font-semibold text-[var(--accent-gold-ink)] underline underline-offset-4 hover:text-[var(--text-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>{entity.externalLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 03: Four Partnership Tracks */}
      <section className="mb-10" aria-labelledby="export-tracks-heading">
        <h2
          id="export-tracks-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {content.tracksSection.heading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-soft-editorial)]">
          {content.tracksSection.intro}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.tracksSection.tracks.map((track) => (
            <div
              key={track.code}
              className="rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] p-4"
            >
              <span className="font-mono text-[11px] font-bold text-[var(--accent-gold-ink)]">
                {track.code}
              </span>
              <h3 className="mt-2 font-serif text-base font-semibold text-[var(--text-ink)]">
                {track.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-soft-editorial)]">
                {track.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04: Conditional Actionable Handoff */}
      <section
        data-testid="export-cta-section"
        aria-labelledby="export-cta-heading"
        className="rounded-[2px] border border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-dark)] p-6 text-[var(--text-on-dark)] sm:p-8"
      >
        <h2
          id="export-cta-heading"
          className="font-serif text-2xl font-medium text-[var(--text-on-dark)]"
        >
          {content.ctaSection.heading}
        </h2>

        {isPartnershipIntakeEnabled ? (
          <div className="mt-3 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-[#C2C7D1]">
              {content.ctaSection.enabledBody}
            </p>
            <Link
              href={`/${safeLocale}/hamkorlik`}
              data-testid="export-hamkorlik-link"
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-[2px] bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#090909] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{content.ctaSection.enabledButton}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="mt-3 space-y-4">
            <span
              data-testid="export-intake-disabled-badge"
              className="inline-flex items-center rounded-[2px] border border-[rgba(212,175,55,0.45)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[#D4AF37]"
            >
              {content.ctaSection.disabledBadge}
            </span>
            <p className="max-w-2xl text-sm leading-relaxed text-[#C2C7D1]">
              {content.ctaSection.disabledBody}
            </p>
            <Link
              href={`/${safeLocale}#aloqa`}
              data-testid="export-fallback-contact-link"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[2px] border border-[rgba(255,255,255,0.28)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-on-dark)] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{content.ctaSection.fallbackContactButton}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}

