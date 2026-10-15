"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/badge";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

interface ServicesProps {
  onOpenApply?: (serviceName?: string) => void;
}

export function Services({ onOpenApply }: ServicesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="xizmatlar"
      aria-label="Xizmatlar"
      className="py-20 sm:py-28 border-b border-border bg-base relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern 2-Column Responsive Header with High-Conversion Diagnostic Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-14 sm:mb-16">
          {/* Left Column: Heading, Context & Trust Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-serif text-gold text-sm tracking-widest font-semibold">
                  /02
                </span>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted font-medium">
                  {t("kicker")}
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-gold/60" />
                <span className="text-[11px] font-sans uppercase tracking-wider text-gold/80 font-medium">
                  {t("tagDirection")}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white max-w-2xl leading-[1.15]">
                {t("title")}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl font-light leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Credibility / Feature Tags */}
            <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-light bg-elevated/70 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {t("tagClients")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-light bg-elevated/70 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {t("tagPractice")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-light bg-elevated/70 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {t("consultPerk2")}
              </span>
            </div>
          </div>

          {/* Right Column: Diagnostic & Quick Consultation Card (eliminates the empty void & solves UX) */}
          <div className="lg:col-span-5">
            <div className="h-full relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group">
              {/* Subtle top ambient gold light ray */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-80" />
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-gold/10 blur-3xl pointer-events-none rounded-full" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="neutral"
                    appearance="outline"
                    size="sm"
                    className="border-gold/40 text-gold bg-gold/5 uppercase tracking-[0.16em] text-[10px] font-semibold gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
                    {t("consultCardKicker")}
                  </Badge>
                  <span className="text-[11px] text-muted-light font-mono flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {t("duration")}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight">
                  {t("consultCardTitle")}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-muted-light font-light leading-relaxed">
                  {t("consultCardDesc")}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center group/btn relative overflow-hidden bg-gold hover:bg-gold-light text-[#0A0A0A] font-medium shadow-[0_0_20px_rgba(197,168,128,0.25)] rounded-lg transition-all"
                  onClick={() => handleApply("Dastlabki bepul konsultatsiya")}
                >
                  <span>{t("consultCta")}</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Button>

                {/* Micro trust indicators */}
                <div className="flex items-center justify-between text-[11px] text-muted-light font-light pt-1">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t("consultPerk1")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t("consultPerk3")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Interactive Service Rows */}
        <div className="border-t border-border flex flex-col">
          {items.map((service) => (
            <TiltCard
              key={service.index}
              className="border-b border-border transition-colors duration-200 hover:bg-elevated/60 group cursor-pointer"
            >
              <div
                className="py-5 sm:py-8 px-4 sm:px-6"
                onClick={() => handleApply(service.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleApply(service.title);
                  }
                }}
                aria-label={`${service.title} - ${t("selectService")}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-start md:items-center">
                  {/* Index & Title: Flex on mobile, separate grid cells on desktop */}
                  <div className="flex items-center gap-3 md:contents">
                    {/* Index Numeral */}
                    <div className="md:col-span-2">
                      <span className="font-serif text-xl sm:text-3xl font-light text-gold group-hover:gold-gradient-text transition-colors">
                        /{service.index}
                      </span>
                    </div>

                    {/* Service Title */}
                    <div className="md:col-span-4">
                      <h3 className="font-serif text-lg sm:text-2xl text-white font-normal group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Service Description */}
                  <div className="md:col-span-4">
                    <p className="text-xs sm:text-sm text-muted font-light leading-relaxed group-hover:text-muted-light transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* Row Action Button */}
                  <div className="md:col-span-2 flex md:justify-end pt-1 md:pt-0">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-border group-hover:border-gold/50 text-muted-light group-hover:text-gold group-hover:bg-gold/5 transition-all duration-200">
                      <span>{t("selectService")}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
