import React from "react";
import Link from "next/link";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import type {
  RoleType,
  VentureDossierRecord,
  VerificationStatus,
} from "../config/dossierData";

interface VentureDossierViewProps {
  dossier: VentureDossierRecord;
}

function getVerificationBadgeStyle(status: VerificationStatus): string {
  switch (status) {
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

function getRoleBadgeStyle(roleType: RoleType): string {
  switch (roleType) {
    case "is-founder":
      return "border-[var(--accent-gold)] bg-[var(--bg-surface-warm)] text-[var(--accent-gold-ink)]";
    case "is-public":
      return "border-[var(--text-ink)] bg-[var(--bg-dark)] text-[var(--text-on-dark)]";
    case "is-internal":
      return "border-dashed border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-stone)] text-[var(--text-soft-editorial)]";
    case "is-partner":
      return "border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] text-[var(--text-ink)]";
  }
}

export function VentureDossierView({ dossier }: VentureDossierViewProps) {
  const { locale, company, verificationStatus, roleType, citations, ui, relatedCompanies } =
    dossier;
  const portfolioCopy = getContent(locale).portfolio;

  return (
    <article
      className="mx-auto w-full max-w-[960px] px-4 py-8 sm:px-6 sm:py-12"
      aria-labelledby="venture-dossier-title"
    >
      {/* Breadcrumbs + Back to Portfolio */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline-editorial)] pb-4">
        <nav aria-label={ui.breadcrumbs.ariaLabel}>
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-[var(--text-muted-aa)]">
            <li>
              <Link
                href={`/${locale}`}
                className="inline-flex min-h-[44px] items-center hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                {ui.breadcrumbs.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${locale}#portfel`}
                className="inline-flex min-h-[44px] items-center hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                {ui.breadcrumbs.portfolio}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              className="font-semibold text-[var(--text-ink)]"
            >
              {company.name}
            </li>
          </ol>
        </nav>

        <Link
          href={`/${locale}#portfel`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-ink)] transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{ui.backToPortfolio}</span>
        </Link>
      </div>

      {/* Demo mode scoping banner */}
      {featuresConfig.demoMode && (
        <div
          role="note"
          className="mb-7 rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-stone)] px-4 py-3 text-xs font-medium leading-relaxed text-[var(--text-soft-editorial)]"
        >
          {ui.demoNotice}
        </div>
      )}

      {/* Header block */}
      <header className="mb-8 border-b border-[var(--border-hairline-editorial)] pb-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]">
            {company.code}
          </span>
          <span className="font-mono text-[11.5px] text-[var(--text-muted-aa)]">
            · {company.year}
          </span>
        </div>

        <h1
          id="venture-dossier-title"
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[var(--text-ink)] sm:text-4xl"
        >
          {company.name}
        </h1>

        <p className="mt-2 text-base font-medium text-[var(--text-soft-editorial)]">
          {company.activity}
        </p>

        {/* Strict verificationStatus & roleType distinction */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <span
            data-testid="verification-status-badge"
            data-status={verificationStatus}
            className={`inline-flex min-h-[32px] items-center rounded-[2px] border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${getVerificationBadgeStyle(
              verificationStatus
            )}`}
          >
            {ui.verificationLabels[verificationStatus]}
          </span>

          <span
            data-testid="role-type-badge"
            data-role-type={roleType}
            className={`inline-flex min-h-[32px] items-center rounded-[2px] border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${getRoleBadgeStyle(
              roleType
            )}`}
          >
            {ui.roleTypeLabels[roleType]}
          </span>
        </div>
      </header>

      {/* Legal Separation / Status Disclaimer */}
      <section
        aria-label="Legal and verification disclosure"
        data-testid="legal-disclaimer"
        className={`mb-8 rounded-[2px] border p-4 sm:p-5 ${
          verificationStatus === "public"
            ? "border-[var(--accent-gold)] bg-[var(--bg-stone)]"
            : verificationStatus === "pending"
              ? "border-dashed border-[var(--border-hairline-editorial-strong)] bg-[var(--bg-stone)]"
              : "border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)]"
        }`}
      >
        <p className="text-sm leading-relaxed text-[var(--text-ink)]">
          {ui.legalDisclaimers[verificationStatus]}
        </p>
      </section>

      {/* Overview */}
      <section className="mb-8" aria-labelledby="dossier-overview-heading">
        <h2
          id="dossier-overview-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {ui.sections.overviewHeading}
        </h2>
        <div className="mt-3 rounded-[2px] border-l-2 border-[var(--accent-gold)] bg-[var(--bg-surface-warm)] px-5 py-4 text-[15px] leading-[1.7] text-[var(--text-soft-editorial)]">
          {company.fullDesc}
        </div>
      </section>

      {/* Legal & Operational Milestones (when available) */}
      {company.legalMilestones && company.legalMilestones.length > 0 && (
        <section className="mb-8" aria-labelledby="dossier-milestones-heading">
          <h2
            id="dossier-milestones-heading"
            className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
          >
            {ui.sections.milestonesHeading}
          </h2>
          <ul className="mt-3 divide-y divide-[var(--border-hairline-subtle)] rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)]">
            {company.legalMilestones.map((m) => (
              <li
                key={`${m.year}-${m.label}`}
                className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-[var(--text-ink)]">
                  {m.year}
                </span>
                <span className="text-sm leading-relaxed text-[var(--text-soft-editorial)]">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Entity Specifications */}
      <section className="mb-9" aria-labelledby="dossier-specs-heading">
        <h2
          id="dossier-specs-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {ui.sections.specsHeading}
        </h2>

        <div className="mt-3 overflow-x-auto rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)]">
          <table className="w-full border-collapse text-left">
            <tbody>
              <tr className="border-b border-[var(--border-hairline-subtle)]">
                <th className="w-[38%] px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.role}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.role}
                </td>
              </tr>
              <tr className="border-b border-[var(--border-hairline-subtle)]">
                <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.period}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.period}
                </td>
              </tr>
              <tr className="border-b border-[var(--border-hairline-subtle)]">
                <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.sector}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.sector}
                </td>
              </tr>
              <tr className="border-b border-[var(--border-hairline-subtle)]">
                <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.model}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.model}
                </td>
              </tr>
              <tr className="border-b border-[var(--border-hairline-subtle)]">
                <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.status || "Status"}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.status}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted-aa)]">
                  {portfolioCopy.modal.officialSite}
                </th>
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-ink)]">
                  {company.websiteUrl ? (
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-[var(--accent-gold-ink)] underline underline-offset-4 hover:text-[var(--text-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{company.websiteUrl}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="text-[var(--text-muted-aa)]">
                      {portfolioCopy.modal.noWebsiteNote}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Source-Linked Verified Claims */}
      <section className="mb-10" aria-labelledby="dossier-citations-heading">
        <h2
          id="dossier-citations-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {ui.sections.citationsHeading}
        </h2>

        <div className="mt-3 space-y-3">
          {citations.map((citation, idx) => (
            <div
              key={`${citation.sourceName}-${idx}`}
              className="rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center rounded-[2px] border px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${getVerificationBadgeStyle(
                    citation.verificationStatus
                  )}`}
                >
                  {ui.verificationLabels[citation.verificationStatus]}
                </span>

                <span className="font-mono text-[11px] text-[var(--text-muted-aa)]">
                  {ui.citationLabels.lastVerified}: {citation.lastVerifiedAt}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-ink)]">
                {citation.claim}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline-subtle)] pt-3 text-xs text-[var(--text-soft-editorial)]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>
                    <strong className="font-semibold text-[var(--text-ink)]">
                      {ui.citationLabels.source}:
                    </strong>{" "}
                    {citation.sourceName}
                  </span>
                  {citation.claimTimeframe && (
                    <span>
                      <strong className="font-semibold text-[var(--text-ink)]">
                        {ui.citationLabels.timeframe}:
                      </strong>{" "}
                      {citation.claimTimeframe}
                    </span>
                  )}
                </div>

                {citation.sourceUrl ? (
                  <a
                    href={citation.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[11.5px] font-semibold text-[var(--accent-gold-ink)] underline underline-offset-4 hover:text-[var(--text-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>{ui.citationLabels.openSource}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-[var(--text-muted-aa)]">
                    {ui.citationLabels.noExternalUrl}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sibling Venture Dossiers */}
      <section
        className="border-t border-[var(--border-hairline-editorial)] pt-7"
        aria-labelledby="dossier-related-heading"
      >
        <h2
          id="dossier-related-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]"
        >
          {ui.sections.relatedHeading}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCompanies.map((item) => {
            const itemStatus: VerificationStatus =
              item.verificationStatus ?? "verified";
            return (
              <Link
                key={item.id}
                href={`/${locale}/portfel/${item.id}`}
                className="flex min-h-[84px] flex-col justify-between rounded-[2px] border border-[var(--border-hairline-editorial)] bg-[var(--bg-surface-warm)] p-4 transition-colors hover:border-[var(--accent-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--accent-gold-ink)]">
                  {ui.verificationLabels[itemStatus]}
                </span>
                <span className="mt-1.5 font-serif text-base font-semibold text-[var(--text-ink)]">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}

