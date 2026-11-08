"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { getContent } from "@/config/content";

interface PortfolioProps {
  locale?: string;
}

export const Portfolio: React.FC<PortfolioProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const portfolio = content.portfolio;

  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "mfg" | "horeca" | "service" | "council"
  >("all");

  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const lastFocusedCardRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  const companies = portfolio.companies || [];

  const filteredCompanies = companies.filter((c) => {
    if (selectedCategory === "all") return true;
    return c.category === selectedCategory;
  });

  const activeCompany = companies.find((c) => c.id === activeCompanyId) || null;

  // Open modal handler
  const openModal = (companyId: string, triggerEl: HTMLElement) => {
    lastFocusedCardRef.current = triggerEl;
    setActiveCompanyId(companyId);

    // Lock background scroll on both body and html
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  // Close modal handler
  const closeModal = () => {
    setActiveCompanyId(null);

    // Unlock background scroll
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.touchAction = "";

    // Restore focus to triggering card
    if (lastFocusedCardRef.current && typeof lastFocusedCardRef.current.focus === "function") {
      lastFocusedCardRef.current.focus();
    }
  };

  // Focus close button on modal open and reset scroll position
  useEffect(() => {
    if (activeCompany) {
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [activeCompany]);

  // Global keyboard listener for Escape key and focus trapping inside modal
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!activeCompany) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCompany]);

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, companyId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(companyId, e.currentTarget);
    }
  };

  return (
    <section
      id="portfel"
      className="py-14 sm:py-20 lg:py-28 bg-[#090A0D] text-[#F5F4F0] border-t border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#D97736] tracking-[0.1em] uppercase mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" aria-hidden="true" />
            <span>{portfolio.eyebrow}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#F5F4F0] max-w-[880px] mb-3.5">
            {portfolio.title}
            {portfolio.titleEmphasis && (
              <span className="text-[#D97736] italic ml-1 font-medium">
                {portfolio.titleEmphasis}
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base lg:text-[17px] text-[#8E95A5] max-w-[780px] leading-relaxed">
            {portfolio.subtitle}
          </p>

          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap gap-2 mt-6"
            role="tablist"
            aria-label="Korxonalar toifasi"
          >
            {[
              { id: "all", label: portfolio.filters.all },
              { id: "mfg", label: portfolio.filters.mfg },
              { id: "horeca", label: portfolio.filters.horeca },
              { id: "service", label: portfolio.filters.service },
              { id: "council", label: portfolio.filters.council },
            ].map((f) => {
              const isActive = selectedCategory === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    setSelectedCategory(
                      f.id as "all" | "mfg" | "horeca" | "service" | "council"
                    )
                  }
                  className={`min-h-[44px] inline-flex items-center justify-center font-mono text-[11px] font-semibold uppercase tracking-wider px-3.5 sm:px-4 py-2.5 rounded-[5px] border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] ${
                    isActive
                      ? "bg-[#151820] border-[#D97736] text-[#FFFFFF] shadow-[0_0_12px_rgba(217,119,54,0.18)]"
                      : "bg-[#111318] border-white/[0.08] text-[#A4ACB9] hover:bg-[#151820] hover:border-[#D97736]/40 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">
          {filteredCompanies.map((comp) => {
            // Span classes based on gridSpan
            const spanClass =
              comp.gridSpan === "major"
                ? "md:col-span-6"
                : comp.gridSpan === "strategic"
                ? "md:col-span-6"
                : "md:col-span-4";

            return (
              <div
                key={comp.id}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${comp.name} ${portfolio.detailBtn}`}
                onClick={(e) => openModal(comp.id, e.currentTarget)}
                onKeyDown={(e) => handleCardKeyDown(e, comp.id)}
                className={`card-entity ${spanClass} bg-[#151820] border border-white/[0.09] hover:border-[#D97736]/45 rounded-[10px] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_20px_rgba(217,119,54,0.15)] focus-visible:outline-2 focus-visible:outline-[#D97736] focus-visible:outline-offset-2 text-left`}
              >
                {/* Card Visual Frame */}
                <div
                  className={`entity-visual-frame relative w-full bg-[#1C202B] border-b border-white/[0.08] overflow-hidden flex items-center justify-center ${
                    comp.gridSpan === "standard"
                      ? "h-[96px] sm:h-[150px]"
                      : "h-[96px] sm:h-[180px]"
                  }`}
                >
                  {/* Blueprint Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-60 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                  />

                  {/* Top-left Category Badge */}
                  <span className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#090A0D]/90 border border-white/10 text-[#D97736] backdrop-blur-sm">
                    {comp.badge}
                  </span>

                  {/* Top-right Year Tag */}
                  <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 font-mono text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:py-1 rounded bg-[#090A0D]/90 border border-white/10 text-[#A4ACB9]">
                    {comp.year}
                  </span>

                  {/* Brand Mark Box */}
                  <div className="z-10 text-center px-3">
                    <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md bg-[#090A0D]/75 border border-white/15">
                      {comp.hasLogo && comp.logoUrl && (
                        <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                          <Image
                            src={comp.logoUrl}
                            alt={`${comp.name} logo`}
                            fill
                            className="object-contain brightness-110"
                          />
                        </div>
                      )}
                      <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wide text-white uppercase">
                        {comp.name}
                      </span>
                    </div>

                    <span className="block font-mono text-[8.5px] sm:text-[9.5px] text-[#8E95A5] uppercase tracking-wider mt-1 sm:mt-1.5">
                      {comp.assetLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold text-[#D97736] tracking-wide uppercase">
                        {comp.role}
                      </span>
                      <span className="font-mono text-[10px] text-[#8E95A5]">
                        {comp.code.split("//")[0]?.trim()}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#F5F4F0] mb-1 leading-snug">
                      {comp.name}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] font-medium text-[#D2D7E0] leading-snug mb-2 sm:mb-2.5">
                      {comp.activity}
                    </p>

                    <p className="text-xs sm:text-sm text-[#A4ACB9] leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                      {comp.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                      {comp.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9.5px] sm:text-[10.5px] text-[#A4ACB9] bg-[#1C202B] border border-white/5 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] gap-2">
                      <span className="font-mono text-[10.5px] sm:text-[11px] text-[#8E95A5] font-medium truncate">
                        {comp.categoryBadge}
                      </span>

                      <span className="entity-action-btn font-mono text-[11px] sm:text-[11.5px] font-bold text-[#D97736] bg-[#D97736]/10 border border-[#D97736]/30 px-3 py-1.5 rounded inline-flex items-center gap-1.5 transition-colors shrink-0">
                        <span>{portfolio.detailBtn}</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          ACCESSIBLE DETAIL DIALOG MODAL / DRAWER
          ========================================================================= */}
      {activeCompany && (
        <div
          className="fixed inset-0 z-[99999] bg-[#090A0D]/88 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalCompanyTitle"
        >
          <div className="modal-dialog bg-[#151820] border border-[#D97736]/45 rounded-t-2xl sm:rounded-xl max-w-[760px] w-full max-h-[88vh] max-h-[88dvh] flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(217,119,54,0.18)] relative text-left">
            
            {/* Fixed Top Bar (Always visible) */}
            <div className="modal-top-bar flex-shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111318] border-b border-white/[0.09] flex items-center justify-between z-10">
              <span className="font-mono text-[11px] font-bold text-[#D97736] tracking-wider uppercase">
                {activeCompany.code}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label={`${portfolio.closeBtn} (Escape)`}
                className="btn-close-modal min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#1C202B] border border-white/10 text-[#F5F4F0] hover:bg-[#D97736] hover:text-[#090A0D] flex items-center justify-center font-bold text-base transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736]"
              >
                ✕
              </button>
            </div>

            {/* Independent Scrollable Area */}
            <div
              ref={modalScrollRef}
              id="modalScrollArea"
              className="modal-scroll-area flex-1 overflow-y-auto overscroll-contain"
            >
              {/* Hero Frame */}
              <div className="relative w-full h-[120px] sm:h-[180px] bg-[#1C202B] border-b border-white/[0.08] flex items-center justify-center overflow-hidden shrink-0">
                <div
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                  aria-hidden="true"
                />

                <div className="z-10 text-center px-4">
                  <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-md bg-[#090A0D]/75 border border-white/15">
                    {activeCompany.hasLogo && activeCompany.logoUrl && (
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                        <Image
                          src={activeCompany.logoUrl}
                          alt={`${activeCompany.name} logo`}
                          fill
                          className="object-contain brightness-110"
                        />
                      </div>
                    )}
                    <span className="font-mono text-sm sm:text-base font-extrabold tracking-wide text-white uppercase">
                      {activeCompany.name}
                    </span>
                  </div>

                  <span className="block font-mono text-[9px] sm:text-[10px] text-[#8E95A5] uppercase tracking-wider mt-1.5">
                    {activeCompany.assetLabel}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 lg:p-8 pb-[max(28px,env(safe-area-inset-bottom,28px))]">
                <h3
                  id="modalCompanyTitle"
                  className="font-serif text-xl sm:text-3xl font-bold text-white mb-1 leading-snug"
                >
                  {activeCompany.name}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-[#D97736] mb-4">
                  {activeCompany.activity}
                </p>

                <p className="text-[13.5px] sm:text-[14.5px] text-[#C3C9D5] leading-relaxed mb-6">
                  {activeCompany.fullDesc}
                </p>

                {/* Specifications Matrix Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-4 sm:p-5 rounded-lg bg-[#111318] border border-white/[0.08] mb-6">
                  <div>
                    <h4 className="font-mono text-[10px] text-[#8E95A5] uppercase tracking-wider mb-1">
                      {portfolio.modal.role}
                    </h4>
                    <p className="text-xs sm:text-[13.5px] font-semibold text-[#F5F4F0]">
                      {activeCompany.role}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-[#8E95A5] uppercase tracking-wider mb-1">
                      {portfolio.modal.period}
                    </h4>
                    <p className="text-xs sm:text-[13.5px] font-semibold text-[#F5F4F0]">
                      {activeCompany.period}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-[#8E95A5] uppercase tracking-wider mb-1">
                      {portfolio.modal.sector}
                    </h4>
                    <p className="text-xs sm:text-[13.5px] font-semibold text-[#F5F4F0]">
                      {activeCompany.sector}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] text-[#8E95A5] uppercase tracking-wider mb-1">
                      {portfolio.modal.model}
                    </h4>
                    <p className="text-xs sm:text-[13.5px] font-semibold text-[#F5F4F0]">
                      {activeCompany.model}
                    </p>
                  </div>
                </div>

                {/* Capability Tags */}
                <div className="mb-6">
                  <h4 className="font-mono text-[10.5px] text-[#8E95A5] uppercase tracking-wider mb-2">
                    {portfolio.modal.caps}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCompany.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10.5px] sm:text-[11px] text-[#A4ACB9] bg-[#1C202B] border border-white/5 px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-white/[0.08] gap-3 sm:gap-4">
                  <span className="font-mono text-[11px] sm:text-[11.5px] text-[#8E95A5] leading-snug">
                    {activeCompany.status}
                  </span>

                  <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-2.5 items-stretch sm:items-center">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="font-mono text-xs font-semibold bg-[#1C202B] hover:bg-[#252A38] text-[#F5F4F0] px-4 py-2.5 rounded-[5px] border border-white/10 transition-colors text-center"
                    >
                      {portfolio.closeBtn}
                    </button>

                    {activeCompany.websiteUrl && (
                      <a
                        href={activeCompany.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 font-mono text-xs font-bold bg-[#D97736] hover:bg-[#E88545] text-[#090A0D] px-4 py-2.5 rounded-[5px] transition-colors text-center"
                      >
                        <span>{portfolio.modal.officialSite}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
