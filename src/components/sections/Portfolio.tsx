"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getContent } from "@/config/content";

interface PortfolioProps {
  locale?: string;
}

type CategoryKey = "all" | "mfg" | "horeca" | "service" | "council";

const MONOGRAM_PATHS = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="13" height="13" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M5 11V5l3 3.5L11 5v6"
      stroke="#B8860B"
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

  const lastFocusedTriggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalDialogRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  const companies = portfolio.companies || [];

  const filteredCompanies = companies.filter((c) => {
    if (selectedCategory === "all") return true;
    return c.category === selectedCategory;
  });

  const ventureCompanies = filteredCompanies.filter((c) => c.category !== "council");
  const uzbicCompany = companies.find((c) => c.id === "uzbic") || null;
  const showCouncilBand =
    selectedCategory === "all" || selectedCategory === "council";

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

  // Scroll lock, focus placement, Escape close, and Tab focus trap while dialog is open
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

  const roleBadgeClasses = (roleType?: string) => {
    if (roleType === "is-founder") {
      return "text-[var(--accent-gold-ink)] bg-[var(--accent-gold-soft)] border border-[var(--accent-gold-border)]";
    }
    if (roleType === "is-internal") {
      return "text-[var(--text-soft-editorial)] bg-[var(--bg-alabaster)] border border-dashed border-[var(--border-hairline-editorial-strong)]";
    }
    return "text-[var(--text-ink)] bg-[var(--bg-stone)] border border-[var(--border-hairline-editorial)]";
  };

  const ventureGridColsClass =
    ventureCompanies.length === 3
      ? "md:grid-cols-3"
      : ventureCompanies.length === 1
      ? "md:grid-cols-[minmax(0,760px)]"
      : "md:grid-cols-2";

  const filterKeys: CategoryKey[] = ["all", "mfg", "horeca", "service", "council"];

  return (
    <section
      id="portfel"
      aria-labelledby="portfolio-heading"
      className="bg-[var(--bg-alabaster)] text-[var(--text-ink)] py-16 lg:py-24 xl:py-28 border-b border-[var(--border-hairline-editorial)] scroll-mt-24"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 lg:items-end mb-6">
          <h2
            id="portfolio-heading"
            className="lg:col-span-7 font-serif text-[clamp(30px,4.2vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
          >
            <span className="font-mono text-[0.42em] font-semibold text-[var(--text-muted-aa)] align-super mr-2">
              {portfolio.sectionNum || "03"}
            </span>
            <span>
              {portfolio.title}
              {portfolio.titleEmphasis ? ` ${portfolio.titleEmphasis}` : ""}
            </span>
          </h2>

          <p className="lg:col-span-5 text-[16px] lg:text-[17px] leading-[1.65] text-[var(--text-soft-editorial)] [text-wrap:pretty]">
            {portfolio.subtitle}
          </p>
        </header>

        {/* Role Taxonomy Key (Clean Distinction: Commercial vs Partner vs Internal IT vs Public Council) */}
        {portfolio.taxonomy && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 py-4 border-y border-[var(--border-hairline-editorial)] mb-7"
            aria-label={portfolio.taxonomy.ariaLabel}
          >
            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--accent-gold)] shrink-0"
                aria-hidden="true"
              />
              <span>{portfolio.taxonomy.founder}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--bg-dark)] shrink-0"
                aria-hidden="true"
              />
              <span>{portfolio.taxonomy.partner}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] bg-[var(--text-muted-aa)] shrink-0"
                aria-hidden="true"
              />
              <span>{portfolio.taxonomy.internal}</span>
            </div>

            <div className="flex items-center gap-3 text-[13px] font-medium text-[var(--text-soft-editorial)] min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-[1px] border-2 border-[var(--accent-gold)] bg-transparent shrink-0"
                aria-hidden="true"
              />
              <span>{portfolio.taxonomy.public}</span>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-9"
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
                className={`min-h-[44px] px-4 py-2 rounded-[2px] border text-[13px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                  isActive
                    ? "bg-[var(--bg-dark)] border-[var(--bg-dark)] text-[var(--bg-surface-warm)]"
                    : "bg-[var(--bg-surface-warm)] border-[var(--border-hairline-editorial)] text-[var(--text-soft-editorial)] hover:border-[var(--text-ink)] hover:text-[var(--text-ink)]"
                }`}
              >
                {portfolio.filters[catKey]}
              </button>
            );
          })}
        </div>

        {/* PART A: COMMERCIAL VENTURES, CO-FOUNDED ENTERPRISES & INTERNAL IT */}
        {ventureCompanies.length > 0 && (
          <div className="mb-12">
            {portfolio.groups?.ventures && (
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[14px] font-semibold text-[var(--text-muted-aa)]">
                  {portfolio.groups.ventures} ({ventureCompanies.length})
                </span>
              </div>
            )}

            <div className={`grid grid-cols-1 ${ventureGridColsClass} gap-5`}>
              {ventureCompanies.map((company) => (
                <article
                  key={company.id}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a, button")) return;
                    const triggerBtn = e.currentTarget.querySelector<HTMLButtonElement>(
                      'button[data-portfolio-trigger="true"]'
                    );
                    openModal(company.id, triggerBtn || e.currentTarget);
                  }}
                  className="group bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial)] rounded-[2px] py-6 px-5 sm:py-7 sm:px-8 flex flex-col justify-between cursor-pointer transition-[border-color,transform,box-shadow] duration-200 hover:border-[var(--accent-gold)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-editorial-subtle)]"
                >
                  <div>
                    {/* Top Index + Year */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-hairline-subtle)] mb-4">
                      <span className="font-mono text-[12px] font-bold text-[var(--text-muted-aa)]">
                        {company.code}
                      </span>
                      <span className="font-mono text-[12px] font-semibold text-[var(--text-ink)] bg-[var(--bg-stone)] px-2.5 py-1 rounded-[2px]">
                        {company.year}
                      </span>
                    </div>

                    {/* Identity Plaque + Role Classification Badge */}
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                      {company.hasLogo && company.logoUrl ? (
                        <span className="h-12 px-4 bg-[var(--bg-dark)] border border-[var(--accent-gold-border)] rounded-[2px] inline-flex items-center justify-center shrink-0">
                          <Image
                            src={company.logoUrl}
                            alt={`${company.name} logo`}
                            width={280}
                            height={96}
                            className="h-8 w-auto object-contain block"
                          />
                        </span>
                      ) : (
                        <span className="h-11 px-4 bg-[var(--bg-stone)] border border-[var(--border-hairline-editorial)] rounded-[2px] inline-flex items-center gap-2 font-mono text-[13px] font-bold text-[var(--text-ink)] shrink-0">
                          {MONOGRAM_PATHS}
                          <span>
                            {company.monogram || company.name.slice(0, 2).toUpperCase()}
                          </span>
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center text-[12px] font-semibold px-3 py-1 rounded-[2px] ${roleBadgeClasses(
                          company.roleType
                        )}`}
                      >
                        {company.roleBadge || company.role}
                      </span>
                    </div>

                    {/* Card Name, Subtitle, Description */}
                    <h3 className="font-serif text-[25px] font-semibold leading-[1.2] text-[var(--text-ink)] mb-2">
                      {company.name}
                    </h3>

                    <p className="text-[14px] font-semibold text-[var(--text-ink)] mb-2">
                      {company.activity}
                    </p>

                    <p className="text-[15px] leading-[1.62] text-[var(--text-soft-editorial)] mb-5 [text-wrap:pretty]">
                      {company.desc}
                    </p>

                    {/* Discipline Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {company.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] font-medium text-[var(--text-soft-editorial)] bg-[var(--bg-alabaster)] border border-[var(--border-hairline-subtle)] px-3 py-1 rounded-[2px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Status + Detail Action */}
                  <div className="pt-4 border-t border-[var(--border-hairline-subtle)] flex items-center justify-between gap-3">
                    <span className="text-[13px] text-[var(--text-muted-aa)] font-medium leading-[1.35] flex-1 min-w-0">
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
                      className="min-h-[44px] px-4 bg-[var(--bg-alabaster)] text-[var(--text-ink)] border border-[var(--border-hairline-editorial-strong)] group-hover:bg-[var(--bg-dark)] group-hover:text-[var(--bg-surface-warm)] group-hover:border-[var(--bg-dark)] hover:bg-[var(--bg-dark)] hover:text-[var(--bg-surface-warm)] hover:border-[var(--bg-dark)] rounded-[2px] text-[13px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{portfolio.detailBtn}</span>
                      {ARROW_RIGHT_SVG}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* PART B: INDEPENDENT PUBLIC PLATFORM BAND (UZBIC SEPARATION) */}
        {showCouncilBand && uzbicCompany && (
          <div>
            {portfolio.groups?.council && (
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[14px] font-semibold text-[var(--text-muted-aa)]">
                  {portfolio.groups.council}
                </span>
              </div>
            )}

            <article
              aria-labelledby="uzbic-heading"
              className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] border border-[var(--accent-gold-border)] rounded-[2px] py-7 px-5 sm:px-7 md:py-10 md:px-11 relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
                {/* Left Narrative + Legal Separation Callout */}
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--accent-gold-light)] border border-[var(--accent-gold-border)] px-3 py-1 rounded-[2px] mb-4">
                    {portfolio.councilHighlight?.pill || uzbicCompany.badge}
                  </span>

                  <h3
                    id="uzbic-heading"
                    className="font-serif text-[clamp(26px,3.2vw,34px)] font-semibold text-[var(--text-on-dark)] leading-[1.2] mb-3"
                  >
                    {portfolio.councilHighlight?.title || uzbicCompany.name}
                  </h3>

                  <p className="text-[16px] leading-[1.68] text-[var(--text-muted-on-dark)] mb-5">
                    {portfolio.councilHighlight?.desc || uzbicCompany.desc}
                  </p>

                  {portfolio.councilHighlight?.legalNote && (
                    <div className="text-[13.5px] leading-[1.55] text-[var(--accent-gold-light)] border-l-2 border-[var(--accent-gold-light)] pl-4 mb-6">
                      {portfolio.councilHighlight.legalNote}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(e) => openModal(uzbicCompany.id, e.currentTarget)}
                      className="min-h-[44px] px-6 bg-[var(--accent-gold-light)] text-[var(--bg-dark)] border border-[var(--accent-gold-light)] hover:bg-[var(--bg-surface-warm)] hover:border-[var(--bg-surface-warm)] rounded-[2px] text-[13px] font-bold inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                    >
                      <span>
                        {portfolio.councilHighlight?.detailBtn || portfolio.detailBtn}
                      </span>
                      {ARROW_RIGHT_SVG}
                    </button>

                    {uzbicCompany.websiteUrl && (
                      <a
                        href={uzbicCompany.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-5 bg-transparent text-[var(--text-on-dark)] border border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] hover:bg-[var(--bg-dark-elevated)] rounded-[2px] text-[13px] font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                      >
                        <span>uzbic.uz</span>
                        {EXTERNAL_ARROW_SVG}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Institutional Seal Panel */}
                <div className="lg:col-span-5 bg-[var(--bg-dark-elevated)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] p-6 rounded-[2px]">
                  <div className="pb-4 border-b border-[var(--border-on-dark)] mb-4 flex items-center justify-between gap-3">
                    {uzbicCompany.logoUrl && (
                      <Image
                        src={uzbicCompany.logoUrl}
                        alt={`${uzbicCompany.name} logo`}
                        width={280}
                        height={96}
                        className="h-9 w-auto object-contain block"
                      />
                    )}
                    <span className="font-mono text-[12px] text-[var(--accent-gold-light)] font-bold">
                      {uzbicCompany.year}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 text-[13.5px]">
                    <div className="flex justify-between gap-3 pb-2 border-b border-[var(--border-on-dark)]">
                      <span className="text-[12.5px] text-[var(--text-muted-on-dark)]">
                        {portfolio.councilHighlight?.roleLabel || portfolio.modal.role}
                      </span>
                      <span className="font-semibold text-[var(--text-on-dark)] text-right">
                        {portfolio.councilHighlight?.roleValue || uzbicCompany.role}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 pb-2 border-b border-[var(--border-on-dark)]">
                      <span className="text-[12.5px] text-[var(--text-muted-on-dark)]">
                        {portfolio.councilHighlight?.typeLabel || portfolio.modal.model}
                      </span>
                      <span className="font-semibold text-[var(--text-on-dark)] text-right">
                        {portfolio.councilHighlight?.typeValue || uzbicCompany.model}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-[12.5px] text-[var(--text-muted-on-dark)]">
                        {portfolio.councilHighlight?.sourceLabel || portfolio.modal.source || "Manba:"}
                      </span>
                      <span className="font-semibold text-[var(--text-on-dark)] text-right">
                        {portfolio.councilHighlight?.sourceValue || uzbicCompany.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* ACCESSIBLE EDITORIAL MODAL DIALOG */}
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
            {/* Fixed Top Header Bar */}
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

            {/* Independent Scrollable Body */}
            <div
              ref={modalScrollRef}
              id="modalScrollArea"
              className="overflow-y-auto overscroll-contain px-5 py-6 pb-[max(28px,env(safe-area-inset-bottom,28px))] sm:px-8 sm:pt-7 sm:pb-8"
            >
              <h3
                id="modalCompanyTitle"
                className="font-serif text-[clamp(24px,4vw,32px)] font-semibold text-[var(--text-ink)] leading-[1.18] mb-4"
              >
                {activeCompany.name}
              </h3>

              <div className="text-[15px] leading-[1.68] text-[var(--text-soft-editorial)] mb-6 py-4 px-5 bg-[var(--bg-alabaster)] border-l-2 border-[var(--accent-gold)]">
                {activeCompany.fullDesc}
              </div>

              {/* Specifications Table */}
              <table className="w-full border-collapse mb-5 sm:mb-7">
                <tbody>
                  <tr className="border-b border-[var(--border-hairline-subtle)]">
                    <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                      {portfolio.modal.role}
                    </th>
                    <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                      {activeCompany.role}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--border-hairline-subtle)]">
                    <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                      {portfolio.modal.period}
                    </th>
                    <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                      {activeCompany.period}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--border-hairline-subtle)]">
                    <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                      {portfolio.modal.sector}
                    </th>
                    <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                      {activeCompany.sector}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--border-hairline-subtle)]">
                    <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                      {portfolio.modal.model}
                    </th>
                    <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                      {activeCompany.model}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--border-hairline-subtle)]">
                    <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                      {portfolio.modal.status || "Status"}
                    </th>
                    <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                      {activeCompany.status}
                    </td>
                  </tr>

                  {activeCompany.source && (
                    <tr className="border-b border-[var(--border-hairline-subtle)]">
                      <th className="text-left text-[12.5px] sm:text-[13px] font-semibold text-[var(--text-muted-aa)] py-2 pr-3 sm:py-3 w-[38%] align-top">
                        {portfolio.modal.source || "Source"}
                      </th>
                      <td className="text-[13.5px] sm:text-[14px] font-medium text-[var(--text-ink)] py-2 sm:py-3 leading-[1.45]">
                        {activeCompany.source}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Modal Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[var(--border-hairline-editorial)]">
                <div>
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
                  className="min-h-[48px] px-6 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold)] hover:border-[var(--accent-gold)] rounded-[2px] text-[14px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
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
