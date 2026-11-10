"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { BookingActionLink } from "@/components/ui/BookingActionLink";

interface ExecutiveDossierProps {
  locale?: string;
}

export const ExecutiveDossier: React.FC<ExecutiveDossierProps> = ({
  locale = "uz",
}) => {
  const content = getContent(locale);
  const dossier = content.dossier;

  const services = dossier?.services || [];
  const [selectedId, setSelectedId] = useState<string>(
    services[0]?.id || "governance"
  );
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

  if (!dossier || !services.length) return null;

  return (
    <section
      id="xizmatlar"
      aria-labelledby="dossier-heading"
      className="bg-[var(--bg-stone)] border-b border-[var(--border-hairline-editorial)] py-16 lg:py-24 xl:py-28 scroll-mt-24"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 lg:items-end mb-10 lg:mb-12 pb-7 lg:pb-8 border-b border-[var(--border-hairline-editorial)]">
          <h2
            id="dossier-heading"
            className="lg:col-span-7 font-serif text-[clamp(30px,4.2vw,50px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-ink)] [overflow-wrap:break-word] [text-wrap:balance] min-w-0"
          >
            {dossier.title}
          </h2>

          <p className="lg:col-span-5 text-[16px] lg:text-[17px] leading-[1.65] text-[var(--text-soft-editorial)] [text-wrap:pretty]">
            {dossier.subtitle}
          </p>
        </header>

        {/* DESKTOP SPLIT VIEW (Ledger Index + Sticky Pure Paper Folio) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Advisory Ledger Tablist */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={dossier.tablistAriaLabel || dossier.eyebrow}
            className="lg:col-span-5 flex flex-col border-t border-[var(--border-hairline-editorial-strong)]"
          >
            {services.map((service, index) => {
              const isSelected = service.id === selectedService.id;
              const numLabel = `0${index + 1}`;

              return (
                <button
                  key={service.id}
                  id={`dossier-tab-${service.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="dossier-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedId(service.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`group relative w-full text-left p-5 border-b grid grid-cols-[36px_minmax(0,1fr)_20px] gap-4 items-start transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${
                    isSelected
                      ? "bg-[var(--bg-surface-warm)] border-b-[var(--border-hairline-editorial-strong)]"
                      : "bg-transparent hover:bg-[var(--bg-hover-ivory)] border-b-[var(--border-hairline-editorial)]"
                  }`}
                >
                  {/* Gold margin rule for active tab */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent-gold)] origin-center transition-transform duration-200 ${
                      isSelected ? "scale-y-100" : "scale-y-0"
                    }`}
                    aria-hidden="true"
                  />

                  <span
                    className={`font-mono text-[14px] font-bold leading-[1.5] transition-colors ${
                      isSelected
                        ? "text-[var(--accent-gold-ink)]"
                        : "text-[var(--text-muted-aa)]"
                    }`}
                  >
                    {numLabel}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block text-[12px] font-semibold mb-1 transition-colors ${
                        isSelected
                          ? "text-[var(--accent-gold-ink)]"
                          : "text-[var(--text-muted-aa)]"
                      }`}
                    >
                      {service.code}
                    </span>
                    <span className="block font-serif text-[21px] font-semibold leading-[1.25] text-[var(--text-ink)] mb-1">
                      {service.name}
                    </span>
                    <span className="block text-[14px] leading-[1.5] text-[var(--text-soft-editorial)]">
                      {service.shortSummary}
                    </span>
                  </span>

                  <span
                    className={`mt-6 transition-[transform,opacity,color] duration-200 ${
                      isSelected
                        ? "text-[var(--accent-gold-ink)] opacity-100 translate-x-[3px]"
                        : "text-[var(--text-muted-aa)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent-gold-ink)] group-hover:translate-x-[3px]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Specification Paper Sheet */}
          <div className="lg:col-span-7 sticky top-24">
            <div
              id="dossier-panel"
              role="tabpanel"
              aria-labelledby={`dossier-tab-${selectedService.id}`}
              className="bg-[var(--bg-surface-warm)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px] p-10 xl:px-11"
            >
              {/* Masthead Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline-editorial)] mb-6">
                <span className="font-mono text-[12px] font-bold text-[var(--accent-gold-ink)]">
                  {selectedService.code}
                </span>
                <span className="text-[13px] font-medium text-[var(--text-soft-editorial)] bg-[var(--bg-stone)] px-3 py-1 rounded-[2px]">
                  {selectedService.format}
                </span>
              </div>

              <h3 className="font-serif text-[32px] font-semibold leading-[1.18] text-[var(--text-ink)] mb-4">
                {selectedService.name}
              </h3>

              <p className="text-[16px] leading-[1.7] text-[var(--text-soft-editorial)] mb-7 [text-wrap:pretty]">
                {selectedService.overview}
              </p>

              {/* Hairline Definition Spec Matrix */}
              <dl className="grid grid-cols-2 gap-6 py-5 border-y border-[var(--border-hairline-editorial)] mb-7">
                <div>
                  <dt className="text-[13px] font-semibold text-[var(--text-muted-aa)] mb-1">
                    {dossier.labels.audience}
                  </dt>
                  <dd className="text-[14.5px] font-medium leading-[1.5] text-[var(--text-ink)]">
                    {selectedService.audience}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] font-semibold text-[var(--text-muted-aa)] mb-1">
                    {dossier.labels.format}
                  </dt>
                  <dd className="text-[14.5px] font-medium leading-[1.5] text-[var(--text-ink)]">
                    {selectedService.format}
                  </dd>
                </div>
              </dl>

              {/* Numbered Focus Areas */}
              <h4 className="text-[14px] font-bold text-[var(--text-ink)] mb-3">
                {dossier.labels.focusAreas}
              </h4>
              <ol className="folio-checklist mb-8">
                {selectedService.focusAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="text-[15px] leading-[1.55] text-[var(--text-soft-editorial)]"
                  >
                    <span>{area}</span>
                  </li>
                ))}
              </ol>

              {/* Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-hairline-editorial)]">
                <BookingActionLink
                  locale={locale}
                  className="min-h-[48px] px-6 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] hover:-translate-y-px hover:shadow-[var(--shadow-editorial-gold)] rounded-[2px] inline-flex items-center justify-center gap-2 text-[14px] font-semibold whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span>{selectedService.ctaText || dossier.labels.ctaText}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </BookingActionLink>

                <a
                  href={contactConfig.telegramDirect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center px-1 py-2 text-[13.5px] font-semibold text-[var(--text-soft-editorial)] hover:text-[var(--accent-gold-ink)] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span className="border-b border-[var(--border-hairline-editorial-strong)] hover:border-b-[var(--accent-gold-ink)] pb-0.5">
                    Telegram: {contactConfig.telegramDirect.display}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET EDITORIAL ACCORDION (< 1024px) */}
        <div className="lg:hidden flex flex-col border-t border-[var(--border-hairline-editorial-strong)]">
          {services.map((service) => {
            const isOpen = openAccordionId === service.id;

            return (
              <div
                key={service.id}
                className={`border-b border-[var(--border-hairline-editorial)] transition-colors duration-200 ${
                  isOpen ? "bg-[var(--bg-surface-warm)] pb-2" : "bg-transparent"
                }`}
              >
                <button
                  id={`accordion-btn-${service.id}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${service.id}`}
                  onClick={() =>
                    setOpenAccordionId((prev) =>
                      prev === service.id ? null : service.id
                    )
                  }
                  className="w-full min-h-[60px] py-4 px-3 sm:px-5 grid grid-cols-[minmax(0,1fr)_32px] gap-3 items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[12px] font-bold text-[var(--accent-gold-ink)] mb-1">
                      {service.code}
                    </span>
                    <span className="block font-serif text-[20px] font-semibold leading-[1.25] text-[var(--text-ink)] mb-1">
                      {service.name}
                    </span>
                    <span className="block text-[14px] text-[var(--text-soft-editorial)] leading-[1.45]">
                      {service.shortSummary}
                    </span>
                  </span>

                  <span
                    className={`flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 text-[var(--accent-gold-ink)]"
                        : "text-[var(--text-ink)]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`accordion-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`accordion-btn-${service.id}`}
                    className="px-3 pb-5 sm:px-5 sm:pb-6"
                  >
                    <p className="text-[14.5px] text-[var(--text-soft-editorial)] leading-[1.65]">
                      {service.overview}
                    </p>

                    <dl className="border-t border-[var(--border-hairline-editorial)] pt-4 my-4 grid grid-cols-1 gap-3">
                      <div>
                        <dt className="text-[12px] font-bold text-[var(--text-muted-aa)] mb-0.5">
                          {dossier.labels.audience}
                        </dt>
                        <dd className="text-[14px] text-[var(--text-ink)] font-medium">
                          {service.audience}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[12px] font-bold text-[var(--text-muted-aa)] mb-0.5">
                          {dossier.labels.format}
                        </dt>
                        <dd className="text-[14px] text-[var(--text-ink)] font-medium">
                          {service.format}
                        </dd>
                      </div>
                    </dl>

                    <ol className="folio-checklist mb-5">
                      {service.focusAreas.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-[14.5px] leading-[1.55] text-[var(--text-soft-editorial)]"
                        >
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>

                    <BookingActionLink
                      locale={locale}
                      className="w-full min-h-[48px] px-5 bg-[var(--bg-dark)] text-[var(--bg-surface-warm)] border border-[var(--bg-dark)] active:bg-[var(--accent-gold)] active:border-[var(--accent-gold)] rounded-[2px] inline-flex items-center justify-center gap-2 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                    >
                      <span>{service.ctaText || dossier.labels.ctaText}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </BookingActionLink>
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
