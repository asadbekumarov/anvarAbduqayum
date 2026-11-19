"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import { getDossierUiCopy } from "@/features/dossiers/config/dossierData";
import { ExportCorridorMap } from "@/components/sections/ExportCorridorMap";
import { OemConfigurator } from "@/components/sections/OemConfigurator";

interface PortfolioProps {
  locale?: string;
}

type PortfolioView = "gallery" | "oem" | "export";
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
  const [activeView, setActiveView] = useState<PortfolioView>("gallery");
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
      return "text-[#CBD5E1] bg-white/[0.04] border border-dashed border-white/20";
    }
    if (roleType === "is-founder") {
      return "text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 font-medium";
    }
    if (roleType === "is-internal") {
      return "text-[#CBD5E1] bg-white/[0.04] border border-dashed border-white/20";
    }
    return "text-[#E2E8F0] bg-white/[0.05] border border-white/10";
  };

  const filterKeys: CategoryKey[] = ["all", "mfg", "horeca", "service", "council"];

  const safeLocale = (locale as "uz" | "ru" | "en") || "uz";
  const viewTabs = {
    uz: [
      { id: "gallery" as const, label: "Portfel korxonalari", count: filteredCompanies.length },
      { id: "oem" as const, label: "OEM & B2B Konfigurator", badge: "3 BOSQICH" },
      { id: "export" as const, label: "Eksport Koridorlari (Xarita)", badge: "5 HUB" },
    ],
    ru: [
      { id: "gallery" as const, label: "Предприятия портфеля", count: filteredCompanies.length },
      { id: "oem" as const, label: "OEM & B2B Конфигуратор", badge: "3 ШАГА" },
      { id: "export" as const, label: "Экспортные коридоры (Карта)", badge: "5 ХАБОВ" },
    ],
    en: [
      { id: "gallery" as const, label: "Ventures Gallery", count: filteredCompanies.length },
      { id: "oem" as const, label: "OEM & B2B Configurator", badge: "3 STEPS" },
      { id: "export" as const, label: "Export Corridors Map", badge: "5 HUBS" },
    ],
  }[safeLocale];

interface PortfolioCardProps {
  company: {
    id: string;
    name: string;
    code: string;
    year: string;
    hasLogo: boolean;
    logoUrl?: string;
    monogram?: string;
    roleBadge?: string;
    role: string;
    roleType?: string;
    verificationStatus?: string;
    activity: string;
    desc: string;
    tags: string[];
    status: string;
  };
  idx: number;
  openModal: (companyId: string, triggerEl: HTMLElement) => void;
  roleBadgeClasses: (roleType?: string, verificationStatus?: string) => string;
  detailBtnText: string;
}

const getCleanRoleBadge = (roleBadge?: string, role?: string, roleType?: string) => {
  const raw = roleBadge || role || "";
  const clean = raw.split("(")[0].trim();
  if (clean) return clean;
  if (roleType === "is-founder") return "Asoschi";
  if (roleType === "is-partner") return "Hammuassis";
  if (roleType === "is-internal") return "Ichki IT";
  if (roleType === "is-public") return "Jamoat Kengashi";
  return raw;
};

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  company,
  idx,
  openModal,
  roleBadgeClasses,
  detailBtnText,
}) => {
  // Extract clean founding/launch year (e.g. "2008" from "2008 / 2009–2012")
  const cleanYear = company.year.match(/\d{4}/)?.[0] || company.year;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: idx * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full flex flex-col"
    >
      <article
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) return;
          const triggerBtn = e.currentTarget.querySelector<HTMLButtonElement>(
            'button[data-portfolio-trigger="true"]'
          );
          openModal(company.id, triggerBtn || e.currentTarget);
        }}
        className="group relative h-full bg-[#111319] hover:bg-[#141722] border border-white/[0.08] hover:border-[#D4AF37]/50 rounded-[4px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
      >
        {/* Subtle top hairline accent on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex flex-col h-full justify-between">
          {/* TOP SECTION: Index, Year & Role (Strictly Single-Line / Non-Breaking) */}
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.07] mb-5">
              <span className="font-mono text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[0.12em] whitespace-nowrap shrink-0">
                {String(idx + 1).padStart(2, "0")} {"//"} {cleanYear}
              </span>
              <span
                className={`inline-flex items-center text-[10.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] leading-tight whitespace-nowrap shrink-0 ${roleBadgeClasses(
                  company.roleType,
                  company.verificationStatus
                )}`}
                title={company.roleBadge || company.role}
              >
                {getCleanRoleBadge(company.roleBadge, company.role, company.roleType)}
              </span>
            </div>

            {/* BRAND PEDESTAL: High-fidelity brand logo hallmark */}
            <div className="h-14 w-full flex items-center justify-start mb-5">
              {company.hasLogo && company.logoUrl ? (
                <div className="h-12 w-48 px-3.5 bg-[#0C0E12] border border-white/[0.14] group-hover:border-[#D4AF37]/60 rounded-[4px] flex items-center justify-center transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_16px_rgba(212,175,55,0.2)]">
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={200}
                    height={50}
                    className="h-8 max-h-[85%] w-auto max-w-[92%] object-contain transition-transform duration-300 group-hover:scale-105"
                    priority={idx < 4}
                  />
                </div>
              ) : (
                <div className="h-12 px-4 bg-[#0C0E12] border border-white/[0.14] group-hover:border-[#D4AF37]/60 rounded-[4px] inline-flex items-center gap-2.5 font-mono text-[12px] font-bold text-[#FAF9F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="text-[#D4AF37]">{MONOGRAM_PATHS}</span>
                  <span className="tracking-widest">{company.monogram || company.name.slice(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* HEADLINE & ESSENCE */}
            <h3 className="font-serif text-[19px] sm:text-[20px] font-semibold leading-[1.28] text-[#FAF9F5] group-hover:text-[#D4AF37] transition-colors mb-2 min-h-[2.6rem] line-clamp-2">
              {company.name}
            </h3>
            <p className="font-sans text-[13px] sm:text-[13.5px] leading-[1.58] text-[#9EA6B5] line-clamp-2">
              {company.activity}
            </p>
          </div>

          {/* BOTTOM SECTION: 2 Clean Tags + Action Button */}
          <div className="pt-4 mt-5 border-t border-white/[0.07] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap min-w-0">
              {company.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-[#8E95A5] bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-[2px] truncate"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              data-portfolio-trigger="true"
              aria-haspopup="dialog"
              aria-label={`${detailBtnText}: ${company.name}`}
              onClick={(e) => {
                e.stopPropagation();
                openModal(company.id, e.currentTarget);
              }}
              className="group/btn text-[11px] font-mono uppercase tracking-wider text-[#FAF9F5] group-hover:text-[#D4AF37] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <span>{detailBtnText}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {ARROW_RIGHT_SVG}
              </span>
            </button>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

  return (
    <section
      id="portfel"
      aria-labelledby="portfolio-heading"
      className="relative bg-[#090A0D] text-[#F5F4F0] border-b border-[rgba(212,175,55,0.2)] scroll-mt-[76px] py-16 sm:py-20 lg:py-24"
    >
      {/* Top subtle hairline transition from Alabaster to Obsidian */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.35)] to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 lg:items-end mb-10 pb-8 border-b border-white/[0.08]">
          <div className="lg:col-span-7 min-w-0">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
              <span className="w-6 h-[1.5px] bg-[#D4AF37] shrink-0" aria-hidden="true" />
              <span>{portfolio.eyebrow || "02 // BIZNES EKOTIZIMI VA KORXONALAR PORTFELI"}</span>
            </div>
            <h2
              id="portfolio-heading"
              className="font-serif text-[clamp(28px,3.8vw,46px)] font-bold tracking-[-0.02em] text-[#FFFFFF] leading-[1.14] [text-wrap:balance]"
            >
              {portfolio.title || "Ko‘p tarmoqli sanoat korxonalari va jamoat platformasi"}
            </h2>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#9EA6B5] max-w-[55ch] [text-wrap:pretty]">
              {portfolio.subtitle}
            </p>
          </div>
        </header>

        {/* Master View Navigation Bar: Bespoke Architectural Segmented Navigator */}
        <div className="border-b border-white/[0.1] mb-8">
          <div
            role="tablist"
            aria-label="Portfolio Tools & Views"
            className="flex items-center gap-4 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
          >
            {viewTabs.map((tab, idx) => {
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveView(tab.id)}
                  className={`group pb-4 font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.14em] font-medium flex items-center gap-2.5 transition-colors relative whitespace-nowrap cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                    isActive ? "text-[#FAF9F5] font-semibold" : "text-[#7A8290] hover:text-[#C2C7D1]"
                  }`}
                >
                  <span className={`text-[11px] font-mono transition-colors ${isActive ? "text-[#D4AF37]" : "text-[#555C69]"}`}>
                    0{idx + 1} {"//"}
                  </span>
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-[2px] text-[10.5px] font-mono tabular-nums transition-colors ${
                        isActive
                          ? "bg-[#D4AF37]/15 text-[#D4AF37] font-bold"
                          : "bg-white/[0.04] text-[#7A8290]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono tracking-wider transition-colors ${
                        isActive
                          ? "bg-white/[0.08] text-[#FAF9F5] border border-white/20"
                          : "bg-white/[0.03] text-[#7A8290] border border-white/[0.06]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {/* Active Editorial Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="editorialActiveTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: VENTURES GALLERY */}
        {activeView === "gallery" && (
          <div>
            {/* Editorial Sub-Filter Toolbar */}
            <div className="flex flex-col gap-4 mb-8 pb-5 border-b border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D4AF37] shrink-0 font-semibold">
                    Sektor:
                  </span>
                  <div
                    className="flex flex-wrap items-center gap-2"
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
                          className={`min-h-[38px] px-3.5 py-1.5 rounded-[3px] text-[12px] font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] border ${
                            isActive
                              ? "bg-[#D4AF37] text-[#090A0D] border-[#D4AF37] font-bold shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
                              : "bg-[#12141A] text-[#9EA6B5] border-white/[0.08] hover:border-[#D4AF37]/50 hover:text-[#FAF9F5] hover:bg-white/[0.04]"
                          }`}
                        >
                          {portfolio.filters[catKey]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="font-mono text-[11px] tracking-wider text-[#7A8290] flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  <span>KO‘RSATILMOQDA: {filteredCompanies.length} TA KORXONA</span>
                </div>
              </div>
            </div>

            {/* Editorial Archival Cards Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredCompanies.map((company, idx) => (
                  <PortfolioCard
                    key={company.id}
                    company={company}
                    idx={idx}
                    openModal={openModal}
                    roleBadgeClasses={roleBadgeClasses}
                    detailBtnText={portfolio.detailBtn}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

    {/* VIEW 2: OEM & B2B CAPACITY CONFIGURATOR */}
    {activeView === "oem" && <OemConfigurator locale={locale} />}

    {/* VIEW 3: INTERACTIVE EXPORT CORRIDORS MAP */}
    {activeView === "export" && <ExportCorridorMap locale={locale} />}
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
              {activeCompany.hasLogo && activeCompany.logoUrl && (
                <div className="mb-4 inline-flex items-center h-12 w-48 px-3.5 bg-[#0C0E12] border border-white/[0.14] rounded-[4px] shadow-sm">
                  <Image
                    src={activeCompany.logoUrl}
                    alt={`${activeCompany.name} logo`}
                    width={200}
                    height={50}
                    className="h-8 w-auto max-w-[92%] object-contain"
                  />
                </div>
              )}
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
