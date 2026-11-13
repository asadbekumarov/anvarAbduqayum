"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import { getDossierUiCopy } from "@/features/dossiers/config/dossierData";
import { MonolithImage } from "@/components/ui/MonolithImage";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface PortfolioProps {
  locale?: string;
}

type CategoryKey = "all" | "mfg" | "horeca" | "service" | "council";

const MONOGRAM_PATHS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="13" height="13" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M5 11V5l3 3.5L11 5v6"
      stroke="#D4AF37"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ARROW_RIGHT_SVG = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EXTERNAL_ARROW_SVG = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M5 11L11 5M6 5h5v5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Portfolio: React.FC<PortfolioProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const portfolio = content.portfolio;

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalDialogRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedTriggerRef = useRef<HTMLElement | null>(null);

  const companies = portfolio.companies || [];

  const filteredCompanies = companies.filter((c) => {
    if (selectedCategory === "all") return true;
    return c.category === selectedCategory;
  });

  const activeCompany = companies.find((c) => c.id === activeCompanyId) || null;

  const openModal = (companyId: string, triggerEl: HTMLElement) => {
    lastFocusedTriggerRef.current = triggerEl;
    setActiveCompanyId(companyId);
  };

  const closeModal = () => {
    setActiveCompanyId(null);
    const trigger = lastFocusedTriggerRef.current;
    if (trigger && typeof trigger.focus === "function") {
      requestAnimationFrame(() => trigger.focus());
    }
  };

  useEffect(() => {
    if (!activeCompany) {
      document.body.classList.remove("modal-locked");
      document.documentElement.classList.remove("modal-locked");
      return;
    }

    document.body.classList.add("modal-locked");
    document.documentElement.classList.add("modal-locked");

    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === "Tab" && modalDialogRef.current) {
        const focusables = Array.from(
          modalDialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleGlobalKeyDown);
      document.body.classList.remove("modal-locked");
      document.documentElement.classList.remove("modal-locked");
    };
  }, [activeCompany]);

  const roleBadgeClasses = (roleType?: string, verificationStatus?: string) => {
    if (verificationStatus === "pending") {
      return "text-[#C2C7D1] bg-[#14161A] border border-dashed border-[rgba(255,255,255,0.22)]";
    }
    if (roleType === "is-founder") {
      return "text-[#D4AF37] bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.38)]";
    }
    if (roleType === "is-internal") {
      return "text-[#C2C7D1] bg-[#12141A] border border-dashed border-[rgba(255,255,255,0.18)]";
    }
    return "text-[#F5F4F0] bg-[#181B24] border border-[rgba(255,255,255,0.14)]";
  };

  const getVerificationLabel = (status?: string) => {
    if (status === "pending") return portfolio.modal.pendingBadge || "Pending confirmation";
    if (status === "public") return portfolio.modal.publicBadge || "Public platform";
    if (status === "historical") return portfolio.taxonomy?.historical || "Historical record";
    if (status === "verified") return portfolio.modal.verifiedBadge || "Verified";
    return null;
  };

  const filterKeys: CategoryKey[] = ["all", "mfg", "horeca", "service", "council"];

  return (
    <section
      id="portfel"
      aria-labelledby="portfolio-heading"
      className="relative bg-[#090909] text-[#F5F4F0] border-b border-[rgba(212,175,55,0.2)] scroll-mt-20 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <header className="mb-6 sm:mb-8">
          <h2
            id="portfolio-heading"
            className="font-sans text-[28px] sm:text-[36px] md:text-[45px] font-bold uppercase tracking-[0.06em] leading-tight text-[#D4AF37]"
          >
            {portfolio.eyebrow || "BIZNES EKOTIZIMI VA KORXONALAR PORTFELI"}
          </h2>
        </header>

        <SectionDivider tone="dark" className="mb-5" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label={portfolio.eyebrow}
          >
            {filterKeys.map((catKey) => {
              const isActive = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-[2px] border text-[11.5px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? "bg-[#D4AF37] border-[#D4AF37] text-[#090909]"
                      : "bg-[#12141A] border-[rgba(255,255,255,0.14)] text-[#C2C7D1] hover:border-[#D4AF37] hover:text-[#F5F4F0]"
                  }`}
                >
                  {portfolio.filters[catKey]}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[11px] text-[#8E95A5] tabular-nums hidden sm:block">
            {String(filteredCompanies.length).padStart(2, "0")} PROJECTS
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {filteredCompanies.map((company, idx) => (
            <motion.article
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a, button")) return;
                const triggerBtn = e.currentTarget.querySelector<HTMLButtonElement>(
                  'button[data-portfolio-trigger="true"]'
                );
                openModal(company.id, triggerBtn || e.currentTarget);
              }}
              className="group bg-[#111215] border border-[rgba(255,255,255,0.1)] hover:border-[#D4AF37] rounded-[2px] p-5 flex flex-col cursor-pointer transition-colors duration-300"
            >
              {/* Top: Code + Year */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(255,255,255,0.08)] mb-4">
                <span className="font-mono text-[11px] font-bold text-[#D4AF37]">
                  {company.code}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#C2C7D1] bg-[#181B24] px-2 py-0.5 rounded-[2px]">
                  {company.year}
                </span>
              </div>

              {/* Logo / Monogram */}
              <div className="mb-3">
                {company.hasLogo && company.logoUrl ? (
                  <MonolithImage
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={240}
                    height={80}
                    parallaxOffset={6}
                    containerClassName="h-10 w-28 px-3 bg-[#090909] border border-[rgba(212,175,55,0.3)] rounded-[2px] flex items-center justify-center"
                    imageClassName="h-6 w-auto object-contain"
                  />
                ) : (
                  <span className="h-10 px-3 bg-[#181B24] border border-[rgba(255,255,255,0.12)] rounded-[2px] inline-flex items-center gap-2 font-mono text-[11.5px] font-bold text-[#F5F4F0]">
                    {MONOGRAM_PATHS}
                    <span>{company.monogram || company.name.slice(0, 2).toUpperCase()}</span>
                  </span>
                )}
              </div>

              {/* Role badge */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span
                  className={`inline-flex items-center text-[10.5px] font-semibold px-2 py-0.5 rounded-[2px] leading-snug ${roleBadgeClasses(
                    company.roleType,
                    company.verificationStatus
                  )}`}
                >
                  {company.roleBadge || company.role}
                </span>
                {(company.verificationStatus === "pending" ||
                  company.verificationStatus === "historical") && (
                  <span className="inline-flex items-center text-[10px] font-mono font-semibold text-[#8E95A5] border border-dashed border-[rgba(255,255,255,0.2)] px-2 py-0.5 rounded-[2px]">
                    {getVerificationLabel(company.verificationStatus)}
                  </span>
                )}
              </div>

              {/* Name + Activity */}
              <h3 className="font-sans text-[18px] font-bold leading-[1.25] text-[#F5F4F0] mb-1">
                {company.name}
              </h3>
              <p className="text-[12.5px] font-semibold text-[#D4AF37] mb-2.5">
                {company.activity}
              </p>

              {/* Description */}
              <p className="text-[13px] leading-[1.6] text-[#A1A7B3] mb-4 line-clamp-3 flex-1">
                {company.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {company.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] font-medium text-[#C2C7D1] bg-[#181B24] border border-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded-[2px] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer: status + action */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-2 mt-auto">
                <span className="text-[11.5px] text-[#8E95A5] font-medium leading-snug flex-1 min-w-0 line-clamp-2">
                  {company.status}
                </span>
                <button
                  type="button"
                  data-portfolio-trigger="true"
                  aria-haspopup="dialog"
                  aria-label={`${portfolio.detailBtn}: ${company.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(company.id, e.currentTarget);
                  }}
                  className="min-h-[36px] px-3 bg-transparent text-[#D4AF37] border border-[rgba(212,175,55,0.45)] group-hover:bg-[#D4AF37] group-hover:text-[#090909] group-hover:border-[#D4AF37] rounded-[2px] text-[11.5px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <span>{portfolio.detailBtn}</span>
                  {ARROW_RIGHT_SVG}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* MODAL DIALOG */}
      {activeCompany && (
        <div
          className="fixed inset-0 z-[3000] bg-[var(--bg-scrim)] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalCompanyTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalDialogRef}
            className="w-full max-w-[680px] max-h-[min(90dvh,780px)] sm:max-h-[min(86dvh,780px)] bg-[var(--bg-surface-warm)] text-[var(--text-ink)] rounded-t-[8px] sm:rounded-[2px] shadow-[var(--shadow-editorial-modal)] flex flex-col overflow-hidden relative text-left"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 border-b border-[var(--border-hairline-editorial)] bg-[var(--bg-alabaster)] shrink-0">
              <span className="font-sans text-[12px] font-bold text-[var(--accent-gold-ink)]">
                {activeCompany.code} ({activeCompany.period})
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label={portfolio.modal.closeAriaLabel || `${portfolio.closeBtn} (Escape)`}
                className="w-11 h-11 min-w-[44px] min-h-[44px] bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] hover:bg-[var(--bg-dark)] hover:text-[var(--bg-surface-warm)] rounded-[4px] text-[24px] leading-none font-normal text-[var(--text-ink)] flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div
              ref={modalScrollRef}
              className="overflow-y-auto overscroll-contain px-5 py-6 pb-[max(28px,env(safe-area-inset-bottom,28px))] sm:px-8 sm:pt-7 sm:pb-8"
            >
              <h3
                id="modalCompanyTitle"
                className="font-sans text-[clamp(22px,4vw,30px)] font-bold text-[var(--text-ink)] leading-[1.18] mb-4"
              >
                {activeCompany.name}
              </h3>

              <div className="text-[15px] leading-[1.68] text-[var(--text-soft-editorial)] mb-6 py-4 px-5 bg-[var(--bg-alabaster)] border-l-2 border-[var(--accent-gold)]">
                {activeCompany.fullDesc}
              </div>

              {activeCompany.verificationStatus === "pending" &&
                portfolio.modal.pendingNotice && (
                  <div className="text-[13.5px] leading-[1.55] text-[var(--text-ink)] mb-5 py-3 px-4 bg-[var(--bg-stone)] border border-dashed border-[var(--border-hairline-editorial-strong)] rounded-[2px]">
                    {portfolio.modal.pendingNotice}
                  </div>
                )}

              {activeCompany.legalMilestones && activeCompany.legalMilestones.length > 0 && (
                <div className="mb-6 bg-[var(--bg-alabaster)] border border-[var(--border-hairline-editorial)] rounded-[2px] p-4">
                  <h4 className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--accent-gold-ink)] mb-3">
                    {portfolio.modal.legalMilestones || "Chronology"}
                  </h4>
                  <ul className="space-y-2">
                    {activeCompany.legalMilestones.map((m) => (
                      <li
                        key={`${m.year}-${m.label}`}
                        className="flex items-baseline gap-3 text-[13.5px] leading-[1.45] text-[var(--text-soft-editorial)]"
                      >
                        <span className="font-mono font-bold text-[var(--text-ink)] shrink-0 tabular-nums">
                          {m.year}
                        </span>
                        <span>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <table className="w-full border-collapse mb-5 sm:mb-7">
                <tbody>
                  {[
                    { label: portfolio.modal.role, value: activeCompany.role },
                    { label: portfolio.modal.period, value: activeCompany.period },
                    { label: portfolio.modal.sector, value: activeCompany.sector },
                    { label: portfolio.modal.model, value: activeCompany.model },
                    { label: portfolio.modal.status || "Status", value: activeCompany.status },
                    ...(activeCompany.source
                      ? [{ label: portfolio.modal.source || "Source", value: activeCompany.source }]
                      : []),
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-[var(--border-hairline-subtle)]">
                      <th className="text-left text-[12.5px] font-semibold text-[var(--text-muted-aa)] py-2.5 pr-3 w-[38%] align-top">
                        {row.label}
                      </th>
                      <td className="text-[13.5px] font-medium text-[var(--text-ink)] py-2.5 leading-[1.45]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[var(--border-hairline-editorial)]">
                <div className="flex flex-wrap items-center gap-2.5">
                  {featuresConfig.ventureDossiers && (
                    <Link
                      href={`/${locale}/portfel/${activeCompany.id}`}
                      onClick={() => closeModal()}
                      className="min-h-[44px] px-4 bg-[var(--bg-stone)] border border-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[#090909] rounded-[2px] text-[13px] font-semibold text-[var(--accent-gold-ink)] inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{getDossierUiCopy(locale).openDossierLabel}</span>
                      {ARROW_RIGHT_SVG}
                    </Link>
                  )}
                  {activeCompany.websiteUrl ? (
                    <a
                      href={activeCompany.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-5 bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] hover:bg-[var(--bg-stone)] rounded-[2px] text-[13px] font-semibold text-[var(--text-ink)] inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{portfolio.modal.officialSite}</span>
                      {EXTERNAL_ARROW_SVG}
                    </a>
                  ) : (
                    <span className="text-[12.5px] text-[var(--text-muted-aa)] leading-snug block">
                      {portfolio.modal.noWebsiteNote}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-[44px] px-6 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold)] hover:border-[var(--accent-gold)] rounded-[2px] text-[13.5px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  {portfolio.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
