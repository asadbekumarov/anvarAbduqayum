"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { getContent } from "@/config/content";

interface ExecutiveDossierProps {
  locale?: string;
}

export const ExecutiveDossier: React.FC<ExecutiveDossierProps> = ({
  locale = "uz",
}) => {
  const content = getContent(locale);
  const dossier = content.dossier;

  // Fallback if dossier is not defined
  const services = dossier?.services || [];
  const [selectedId, setSelectedId] = useState<string>(
    services[0]?.id || "governance"
  );
  // Mobile accordion: track which service is open (default to first)
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(
    services[0]?.id || "governance"
  );

  const tabListRef = useRef<HTMLDivElement>(null);

  const selectedService =
    services.find((s) => s.id === selectedId) || services[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % services.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + services.length) % services.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = services.length - 1;
    } else {
      return;
    }

    const nextService = services[nextIndex];
    if (nextService) {
      setSelectedId(nextService.id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]'
      );
      buttons?.[nextIndex]?.focus();
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  if (!dossier || services.length === 0) {
    return null;
  }

  return (
    <section
      id="xizmatlar"
      className="scroll-mt-24 bg-[#F6F3EC] text-[#14161A] border-t border-b border-[#E5E0D6] pt-14 pb-16 sm:pt-18 sm:pb-20 lg:py-28 relative overflow-hidden"
      aria-labelledby="dossier-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-[#D97736] uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" aria-hidden="true" />
            <span>{dossier.eyebrow}</span>
          </div>
          <h2
            id="dossier-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#14161A] leading-[1.2] mb-3 sm:mb-4"
          >
            {dossier.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#5A606E] leading-relaxed">
            {dossier.subtitle}
          </p>
        </div>

        {/* DESKTOP SPLIT VIEW (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Program Tabs */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={dossier.eyebrow}
            aria-orientation="vertical"
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {services.map((service, index) => {
              const isSelected = service.id === selectedId;
              return (
                <button
                  key={service.id}
                  id={`dossier-tab-${service.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`dossier-panel-${service.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedId(service.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`text-left p-6 rounded-lg transition-all duration-200 border relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] ${
                    isSelected
                      ? "bg-[#FFFFFF] border-[#E5E0D6] shadow-[0_10px_30px_rgba(20,22,26,0.06)]"
                      : "bg-transparent border-transparent hover:bg-[#FFFFFF]/60 hover:border-[#E5E0D6]/60"
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-3 bottom-3 w-1 bg-[#D97736] rounded-r"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`font-mono text-xs font-semibold tracking-wider ${
                        isSelected ? "text-[#D97736]" : "text-[#7A808C]"
                      }`}
                    >
                      {service.code}
                    </span>
                    <h3
                      className={`font-serif text-xl font-bold leading-snug transition-colors ${
                        isSelected ? "text-[#14161A]" : "text-[#14161A]/85 group-hover:text-[#14161A]"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#5A606E] leading-relaxed line-clamp-2 mt-0.5">
                      {service.shortSummary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Sticky Dossier Display Panel */}
          {selectedService && (
            <div
              key={selectedService.id}
              id={`dossier-panel-${selectedService.id}`}
              role="tabpanel"
              aria-labelledby={`dossier-tab-${selectedService.id}`}
              className="lg:col-span-7 sticky top-24 bg-[#FFFFFF] border border-[#E5E0D6] rounded-xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(20,22,26,0.04)] transition-opacity duration-200"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E5E0D6] text-xs font-mono">
                <span className="font-semibold text-[#D97736] tracking-wider uppercase">
                  {selectedService.code}
                </span>
                <span className="text-[#7A808C] uppercase tracking-wider bg-[#F6F3EC] px-2.5 py-1 rounded">
                  {dossier.labels.format}: {selectedService.format}
                </span>
              </div>

              {/* Title & Overview */}
              <div className="mt-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14161A] leading-tight tracking-tight">
                  {selectedService.name}
                </h3>
                <p className="text-base text-[#5A606E] leading-relaxed mt-4">
                  {selectedService.overview}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-5 rounded-lg bg-[#F6F3EC] border border-[#E5E0D6]/80">
                <div className="space-y-1">
                  <span className="block font-mono text-[11px] font-semibold tracking-wider text-[#7A808C] uppercase">
                    {dossier.labels.audience}
                  </span>
                  <p className="text-sm font-medium text-[#14161A] leading-snug">
                    {selectedService.audience}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="block font-mono text-[11px] font-semibold tracking-wider text-[#7A808C] uppercase">
                    {dossier.labels.format}
                  </span>
                  <p className="text-sm font-medium text-[#14161A] leading-snug">
                    {selectedService.format}
                  </p>
                </div>
              </div>

              {/* Key Focus Areas Checklist */}
              <div className="mb-8">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#14161A] mb-3">
                  {dossier.labels.focusAreas}
                </h4>
                <ul className="space-y-2.5">
                  {selectedService.focusAreas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-[#D97736] shrink-0 mt-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-[#3A3F4A] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Row - Factual Format + Direct Booking CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E5E0D6]">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7A808C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" aria-hidden="true" />
                  <span className="uppercase tracking-wider">{selectedService.format}</span>
                </div>

                <Link
                  href={`/${locale}/bron`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#14161A] hover:bg-[#D97736] text-[#FFFFFF] text-sm font-semibold rounded-md shadow-sm transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] min-h-[48px]"
                >
                  <span>{selectedService.ctaText || dossier.labels.ctaText}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE ACCORDION VIEW (< lg) */}
        <div className="block lg:hidden space-y-3.5">
          {services.map((service) => {
            const isOpen = openAccordionId === service.id;
            return (
              <div
                key={service.id}
                className="bg-[#FFFFFF] border border-[#E5E0D6] rounded-lg sm:rounded-xl overflow-hidden shadow-sm transition-all"
              >
                {/* Accordion Header Button (min 56px touch target, clear unclipped labels) */}
                <button
                  type="button"
                  id={`accordion-btn-${service.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${service.id}`}
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] bg-[#FFFFFF] active:bg-[#F6F3EC] transition-colors"
                >
                  <div className="flex flex-col gap-1 pr-1 sm:pr-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#D97736] tracking-wider uppercase">
                      {service.code}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#14161A] leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A606E] leading-relaxed mt-0.5">
                      {service.shortSummary}
                    </p>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center transition-transform duration-200 mt-0.5 ${
                      isOpen ? "rotate-180 bg-[#14161A] text-white" : "text-[#7A808C]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div
                    id={`accordion-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`accordion-btn-${service.id}`}
                    className="px-4 pb-5 pt-3 sm:px-5 sm:pb-6 border-t border-[#E5E0D6]/70 flex flex-col gap-4 sm:gap-5 bg-[#FFFFFF]"
                  >
                    {/* Overview */}
                    <p className="text-xs sm:text-sm text-[#5A606E] leading-relaxed">
                      {service.overview}
                    </p>

                    {/* Specifications */}
                    <div className="bg-[#F6F3EC] p-3.5 sm:p-4 rounded-lg border border-[#E5E0D6]/80 space-y-2.5">
                      <div>
                        <span className="block font-mono text-[10px] font-semibold tracking-wider text-[#7A808C] uppercase">
                          {dossier.labels.audience}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#14161A] mt-0.5">
                          {service.audience}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#E5E0D6]/60">
                        <span className="block font-mono text-[10px] font-semibold tracking-wider text-[#7A808C] uppercase">
                          {dossier.labels.format}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-[#14161A] mt-0.5">
                          {service.format}
                        </p>
                      </div>
                    </div>

                    {/* Key Focus Areas Checklist */}
                    <div>
                      <h4 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#14161A] mb-2">
                        {dossier.labels.focusAreas}
                      </h4>
                      <ul className="space-y-2">
                        {service.focusAreas.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <svg
                              className="w-3.5 h-3.5 text-[#D97736] shrink-0 mt-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs sm:text-sm text-[#3A3F4A] leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking CTA Button (Full width, minimum 48px height, safe padding) */}
                    <div className="pt-2 pb-1">
                      <Link
                        href={`/${locale}/bron`}
                        className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3.5 bg-[#14161A] active:bg-[#D97736] text-[#FFFFFF] text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736]"
                      >
                        <span>{service.ctaText || dossier.labels.ctaText}</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
