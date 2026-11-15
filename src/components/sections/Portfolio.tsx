"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import { getDossierUiCopy } from "@/features/dossiers/config/dossierData";
import { MonolithImage } from "@/components/ui/MonolithImage";
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
      return "text-[#C2C7D1] bg-[#14161A] border border-dashed border-white/20";
    }
    if (roleType === "is-founder") {
      return "text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/35";
    }
    if (roleType === "is-internal") {
      return "text-[#C2C7D1] bg-white/[0.05] border border-dashed border-white/20";
    }
    return "text-[#F5F4F0] bg-[#181B24] border border-white/10";
  };

  const getVerificationLabel = (status?: string) => {
    if (status === "pending") return portfolio.modal.pendingBadge || "Pending confirmation";
    if (status === "public") return portfolio.modal.publicBadge || "Public platform";
    if (status === "historical") return portfolio.taxonomy?.historical || "Historical record";
    if (status === "verified") return portfolio.modal.verifiedBadge || "Verified";
    return null;
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
  getVerificationLabel: (status?: string) => string | null;
  detailBtnText: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  company,
  idx,
  openModal,
  roleBadgeClasses,
  getVerificationLabel,
  detailBtnText,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coords (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel coords for spotlight
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Springs for 3D tilt physics (luxury feel)
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.13), transparent 70%)`
  );

  const borderSpotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(320px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.55), transparent 65%)`
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.4,
        delay: idx * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000 h-full"
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a, button")) return;
          const triggerBtn = e.currentTarget.querySelector<HTMLButtonElement>(
            'button[data-portfolio-trigger="true"]'
          );
          openModal(company.id, triggerBtn || e.currentTarget);
        }}
        className="group relative h-full bg-[#12141A] hover:bg-[#151821] border border-white/[0.08] rounded-[6px] p-5 sm:p-6 flex flex-col cursor-pointer transition-colors duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.6),0_0_28px_rgba(212,175,55,0.08)] overflow-hidden"
      >
        {/* Dynamic Cursor-Following Gold Spotlight */}
        {!shouldReduceMotion && isHovered && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[6px] z-0 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Dynamic Border Glow Tracking Pointer */}
        {!shouldReduceMotion && isHovered && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[6px] p-px z-10 opacity-75 transition-opacity duration-300"
            style={{
              background: borderSpotlightBg,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        )}

        {/* Subtle shimmer sweep on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
        >
          <div className="w-[140%] h-full -rotate-45 -translate-x-[160%] group-hover:translate-x-[220%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>

        {/* Top subtle gold highlight bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top: Code + Year */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.08] mb-4">
            <span className="font-mono text-[10.5px] font-bold text-[#D4AF37] uppercase tracking-wider truncate max-w-[68%]">
              {company.code}
            </span>
            <span className="font-mono text-[10.5px] font-medium text-[#C2C7D1] bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-[2px] shrink-0 tabular-nums">
              {company.year}
            </span>
          </div>

          {/* Logo / Monogram */}
          <div className="mb-4">
            {company.hasLogo && company.logoUrl ? (
              <MonolithImage
                src={company.logoUrl}
                alt={`${company.name} logo`}
                width={240}
                height={80}
                parallaxOffset={4}
                containerClassName="h-11 w-32 px-3 bg-[#0A0B0E] border border-white/[0.1] rounded-[4px] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]"
                imageClassName="h-6 w-auto object-contain"
              />
            ) : (
              <div className="h-11 px-3.5 bg-[#171922] border border-[#D4AF37]/30 rounded-[4px] inline-flex items-center gap-2.5 font-mono text-[12px] font-bold text-[#FFFFFF] shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                <span className="text-[#D4AF37]">{MONOGRAM_PATHS}</span>
                <span className="tracking-wider">{company.monogram || company.name.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Role badge */}
          <div className="flex items-center gap-2 flex-wrap mb-3.5">
            <span
              className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-[3px] leading-snug transition-transform duration-200 group-hover:translate-x-0.5 ${roleBadgeClasses(
                company.roleType,
                company.verificationStatus
              )}`}
            >
              {company.roleBadge || company.role}
            </span>
            {(company.verificationStatus === "pending" ||
              company.verificationStatus === "historical") && (
              <span className="inline-flex items-center text-[10px] font-mono text-[#8E95A5] border border-dashed border-white/20 px-2 py-0.5 rounded-[3px]">
                {getVerificationLabel(company.verificationStatus)}
              </span>
            )}
          </div>

          {/* Name + Activity */}
          <h3 className="font-serif text-[19px] sm:text-[20px] font-bold leading-[1.28] text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors mb-1.5">
            {company.name}
          </h3>
          <p className="text-[12.5px] font-medium text-[#D4AF37]/90 leading-snug mb-3">
            {company.activity}
          </p>

          {/* Description */}
          <p className="text-[13px] leading-[1.65] text-[#9EA6B5] mb-4 line-clamp-3 flex-1 font-sans">
            {company.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {company.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10.5px] font-mono text-[#A8B0BE] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-[2px] whitespace-nowrap transition-colors duration-200 group-hover:border-[#D4AF37]/25"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: status + action */}
          <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3 mt-auto">
            <div className="flex items-center gap-2 text-[11px] text-[#8E95A5] font-medium leading-tight min-w-0 flex-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80 shrink-0" aria-hidden="true" />
              <span className="truncate">{company.status}</span>
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
              className="min-h-[34px] px-3 bg-[#171922] text-[#D4AF37] border border-[#D4AF37]/35 group-hover:bg-[#D4AF37] group-hover:text-[#090A0D] group-hover:border-[#D4AF37] rounded-[3px] text-[11px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-sm active:scale-95"
            >
              <span>{detailBtnText}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                {ARROW_RIGHT_SVG}
              </span>
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

  return (
    <section
      id="portfel"
      aria-labelledby="portfolio-heading"
      className="relative bg-[#0A0B0E] text-[#F5F4F0] border-b border-[rgba(212,175,55,0.2)] scroll-mt-[76px] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Top subtle hairline transition from Alabaster to Obsidian */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.35)] to-transparent"
        aria-hidden="true"
      />
      {/* Animated Breathing Ambient Gold Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.025, 0.06, 0.025],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Industrial Blueprint Subtle Mesh Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 lg:items-end mb-8 pb-7 border-b border-white/[0.08]">
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

        {/* Top-Level View Switcher: Sliding Segmented Tabs */}
        <div className="mb-7">
          <div
            role="tablist"
            aria-label="Portfolio Tools & Views"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#12141A] border border-white/[0.08] rounded-[6px] shadow-sm relative"
          >
            {viewTabs.map((tab) => {
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveView(tab.id)}
                  className={`relative min-h-[40px] px-4 py-2 rounded-[4px] font-mono text-[11.5px] font-semibold uppercase tracking-[0.05em] flex items-center gap-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                    isActive ? "text-[#FFFFFF]" : "text-[#8E95A5] hover:text-[#FFFFFF]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeViewTabIndicator"
                      className="absolute inset-0 bg-[#1E212A] border border-[#D4AF37]/50 rounded-[4px] shadow-[0_4px_16px_rgba(212,175,55,0.18)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] shrink-0" />
                    )}
                    <span>{tab.label}</span>
                  </span>
                  {tab.count !== undefined && (
                    <span
                      className={`relative z-10 px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono transition-colors ${
                        isActive
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] font-bold"
                          : "bg-white/[0.06] text-[#8E95A5]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span
                      className={`relative z-10 px-2 py-0.5 rounded-[2px] text-[9.5px] font-mono uppercase tracking-[0.05em] transition-colors ${
                        isActive
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] font-bold border border-[#D4AF37]/40"
                          : "bg-white/[0.05] text-[#A8B0BE] border border-white/[0.08]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: VENTURES GALLERY */}
        {activeView === "gallery" && (
          <div>
            {/* Filter Tabs & Live Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
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
                      className={`relative min-h-[34px] px-3.5 py-1.5 rounded-[4px] text-[11.5px] font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        isActive ? "text-[#D4AF37] font-semibold" : "text-[#9EA6B5] hover:text-white"
                      }`}
                    >
                      {isActive ? (
                        <motion.div
                          layoutId="activeCategoryTabIndicator"
                          className="absolute inset-0 bg-[#D4AF37]/15 border border-[#D4AF37]/60 rounded-[4px] shadow-sm"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#13151B] border border-white/[0.06] rounded-[4px]" />
                      )}
                      <span className="relative z-10">{portfolio.filters[catKey]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#A8B0BE] bg-[#13151B] px-3.5 py-1.5 rounded-[4px] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" aria-hidden="true" />
                <span>{String(filteredCompanies.length).padStart(2, "0")} / {String(companies.length).padStart(2, "0")} KORXONA</span>
              </div>
            </div>

            {/* Interactive Animated Cards Grid with 3D Tilt & Cursor Spotlight */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredCompanies.map((company, idx) => (
                  <PortfolioCard
                    key={company.id}
                    company={company}
                    idx={idx}
                    openModal={openModal}
                    roleBadgeClasses={roleBadgeClasses}
                    getVerificationLabel={getVerificationLabel}
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
