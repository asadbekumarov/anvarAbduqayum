"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import { siteMedia } from "@/config/siteMedia";
import { BookingActionLink } from "@/components/ui/BookingActionLink";
import {
  MagneticPull,
  ParallaxLayer,
  ScrollReveal,
  StaggeredTextReveal,
  SWISS_EASE,
} from "@/components/ui/LuxuryMotion";

interface HeroProps {
  locale?: string;
}

export const Hero: React.FC<HeroProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  const kickerBadge =
    content.hero.kickerBadge || "MONOGRAF // SANOAT VA TIZIMLI BOSHQARUV";

  const metrics = content.hero.verifiedMetrics || [
    {
      value: "2008 / 2012",
      label: "VISAGE ELECTRIC MChJ va Toybola zavodi tashkili",
    },
    {
      value: "2015 — 2022",
      label: "Samtech, HoReCa loyihalari va UZBIC jamoat kengashi",
    },
    {
      value: "6 yo‘nalish",
      label: "Toybola (VISAGE ELECTRIC), Samtech, 2 HoReCa, ichki IT va UZBIC",
    },
  ];

  const cityYearLabel =
    content.hero.kickerText ||
    (locale === "ru"
      ? "Ташкент, 2026"
      : locale === "en"
      ? "Tashkent, 2026"
      : "Toshkent, 2026");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative bg-[var(--bg-alabaster)] border-b border-[var(--border-hairline)] ${
        featuresConfig.demoMode
          ? "pt-5 sm:pt-8 lg:pt-11"
          : "pt-[76px] sm:pt-24 lg:pt-28"
      } pb-12 sm:pb-14 lg:pb-16 overflow-hidden`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle Architectural Parallax Accents */}
        <ParallaxLayer
          aria-hidden={true}
          offset={28}
          className="pointer-events-none absolute -top-10 right-8 w-64 h-64 border border-[var(--accent-gold-border)] opacity-25 hidden lg:block"
        />
        <ParallaxLayer
          aria-hidden={true}
          offset={-20}
          className="pointer-events-none absolute bottom-6 left-4 w-32 h-32 border-l border-b border-[var(--border-hairline-editorial)] opacity-40 hidden lg:block"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-9 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Column: Monograph Editorial Content */}
          <div className="flex flex-col min-w-0">
            {/* Kicker Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SWISS_EASE }}
              className="inline-flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent-gold-ink)] mb-3.5 sm:mb-6"
            >
              <span
                className="w-6 h-[1.5px] bg-[var(--accent-gold)] shrink-0"
                aria-hidden="true"
              />
              <span>{kickerBadge}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-heading"
              className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-semibold leading-[1.08] text-[var(--text-ink)] tracking-tight mb-3.5 sm:mb-7 [overflow-wrap:break-word] min-w-0"
            >
              <em className="font-editorial-italic font-normal text-[var(--accent-gold-ink)] not-italic pr-2">
                <StaggeredTextReveal
                  text={content.hero.headlineEmphasis}
                  trigger="mount"
                  delay={0.05}
                />
              </em>{" "}
              <StaggeredTextReveal
                text={content.hero.headlineSuffix}
                trigger="mount"
                delay={0.18}
              />
            </h1>

            {/* Manifesto / Executive Summary */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: SWISS_EASE, delay: 0.28 }}
              className="text-sm sm:text-base lg:text-lg leading-[1.68] sm:leading-[1.7] text-[var(--text-soft)] max-w-[620px] mb-5 sm:mb-9"
            >
              {content.hero.summary}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: SWISS_EASE, delay: 0.36 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-6 sm:mb-12"
            >
              <MagneticPull>
                <BookingActionLink
                  locale={locale}
                  className="min-h-[48px] sm:min-h-[52px] px-7 sm:px-8 bg-[var(--bg-dark)] text-[var(--bg-surface)] text-xs font-sans font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2.5 border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-editorial-gold)] active:translate-y-0 transition-[background-color,border-color,color,transform,box-shadow] duration-200 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)]"
                >
                  <span>{content.hero.ctaPrimary || "Uchrashuv bo‘yicha yozish"}</span>
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
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
              </MagneticPull>
              <a
                href="#portfel"
                className="min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 bg-transparent text-[var(--text-ink)] text-xs font-sans font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2 border border-[var(--border-hairline-strong)] hover:border-[var(--text-ink)] hover:bg-[var(--bg-surface)] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,border-color,color,transform] duration-200 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)]"
              >
                <span>{content.hero.ctaSecondary || "Biznes ekotizimi"}</span>
              </a>
            </motion.div>

            {/* 3 Verified Metric Columns (Strict Factual Accuracy & Clear Mobile Clearance) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 pt-4 sm:pt-8 border-t border-[var(--border-hairline)]"
              aria-label="Tasdiqlangan Sanoat Ko'rsatkichlari"
            >
              {metrics.map((metric, idx) => {
                const match = metric.value.match(/^([^\s/—-]+)([\s/—-].+)?$/);
                const mainVal = match ? match[1] : metric.value;
                const subVal = match && match[2] ? match[2] : "";

                return (
                  <div key={idx} className="flex flex-col min-w-0">
                    <span className="font-serif text-2xl sm:text-3xl xl:text-[32px] font-semibold text-[var(--text-ink)] leading-none mb-1.5 block">
                      {mainVal}
                      {subVal && (
                        <span className="text-[var(--accent-gold-ink)] text-[0.82em] font-normal">
                          {subVal}
                        </span>
                      )}
                    </span>
                    <span className="text-[11.5px] leading-snug text-[var(--text-muted-aa)] font-sans block">
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Editorial Gallery Frame with Archival Matting */}
          <ScrollReveal
            delay={0.15}
            y={36}
            className="w-full max-w-[480px] mx-auto lg:max-w-none min-w-0"
          >
            <div className="group/portrait bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-3.5 sm:p-4 shadow-[var(--shadow-editorial-card)]">
              {/*
                INTERNAL ASSET DOCUMENTATION:
                Temporary archival portrait (/images/hero/portrait.webp) is framed via .portrait-img-editorial
                to exclude peripheral video title overlays using CSS layout/scaling only, preserving 100% of
                Anvar Abduqayum's authentic facial identity without AI manipulation. Replace with official
                studio photography asset once available.
              */}
              <div className="portrait-archival-mat overflow-hidden">
                <div className="portrait-image-wrapper transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/portrait:scale-[1.035]">
                  <Image
                    src={siteMedia.hero.portrait.src}
                    alt={`${content.hero.portraitCaption} — ${
                      content.hero.portraitRole || "Sanoatchi, Muhandis-Tadbirkor"
                    }`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="portrait-img-editorial"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 12%",
                      transformOrigin: "center top",
                      transform: "scale(1.24) translateY(-12px)",
                      filter: "contrast(1.04) brightness(0.97)",
                    }}
                  />
                </div>
              </div>

              {/* Clean Luxury Editorial Caption */}
              <div className="pt-3.5 mt-3 border-t border-[var(--border-hairline-subtle)] flex items-end justify-between flex-wrap gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg sm:text-xl font-semibold text-[var(--text-ink)] leading-tight">
                    {content.hero.portraitCaption || "Anvar Abduqayum"}
                  </p>
                  <p className="text-xs font-sans font-medium text-[var(--accent-gold-ink)] mt-1">
                    {content.hero.portraitRole || "Sanoatchi, Muhandis-Tadbirkor"}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-sans font-medium text-[var(--text-muted-aa)] block">
                    {cityYearLabel}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
