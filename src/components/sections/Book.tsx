"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteMedia } from "@/config/siteMedia";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface BookProps {
  onOpenApply?: () => void;
}

export function Book({ onOpenApply }: BookProps) {
  const { openApply } = useApplyModal();
  const t = useTranslations("book");
  const { cover } = siteMedia.book;

  const handleOrderBook = () => {
    if (onOpenApply) {
      onOpenApply();
    } else {
      openApply(t("title"));
    }
  };

  const featureCards = [
    {
      num: "01",
      title: t("feature1"),
      desc: t("feature1Desc"),
    },
    {
      num: "02",
      title: t("feature2"),
      desc: t("feature2Desc"),
    },
    {
      num: "03",
      title: t("feature3"),
      desc: t("feature3Desc"),
    },
  ];

  const specs = [
    {
      icon: (
        <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      text: t("specCover"),
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ),
      text: t("specAudio"),
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: t("specCases"),
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      text: t("specDelivery"),
    },
  ];

  return (
    <section
      id="kitob"
      aria-label="Biznes shpargalkasi kitobi"
      className="py-20 sm:py-28 border-b border-border bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.04)_0%,transparent_70%)] pointer-events-none blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================= */}
          {/* LEFT: 3D HARDCOVER BOOK & SPECS */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* 3D Book Stage */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[460px] sm:h-[500px] flex items-center justify-center select-none">
              <div className="relative w-full h-full flex items-center justify-center perspective-1200">
                {/* Ground Drop Shadow */}
                <div
                  style={{
                    transform: "rotateX(75deg) translateZ(-40px)",
                  }}
                  className="absolute bottom-6 w-[260px] sm:w-[300px] h-[70px] bg-black/90 blur-xl rounded-full pointer-events-none z-0"
                  aria-hidden="true"
                />

                {/* Ambient Book Aura */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.14)_0%,transparent_70%)] blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* 3D Book Assembly */}
                <div
                  style={{
                    transform: "rotateX(8deg) rotateY(-16deg)",
                    transformStyle: "preserve-3d",
                  }}
                  className="relative w-[230px] sm:w-[260px] h-[340px] sm:h-[390px] preserve-3d transition-transform duration-500 hover:rotate-y-[-8deg] hover:scale-105"
                >
                  {/* 1. FRONT COVER */}
                  <div
                    className="absolute inset-0 preserve-3d rounded-r-[4px] rounded-l-[1px] border border-gold/40 shadow-2xl overflow-hidden bg-[#141414]"
                    style={{
                      transform: "translateZ(15px)",
                    }}
                  >
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(max-width: 768px) 260px, 300px"
                      className="object-cover contrast-110"
                      priority
                    />

                    {/* Hardcover Inner Bevel */}
                    <div
                      className="absolute inset-0 shadow-[inset_2px_0_4px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(223,186,115,0.3)] pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Left Spine Groove */}
                    <div
                      className="absolute top-0 bottom-0 left-[14px] w-[2px] bg-black/40 shadow-[1px_0_2px_rgba(255,255,255,0.1)] pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Periodic Metallic Gold Sheen Sweep Ray */}
                    <div
                      className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none animate-book-sheen"
                      aria-hidden="true"
                    />
                  </div>

                  {/* 2. 3D SPINE (LEFT FACET) */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[30px] bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-y border-l border-gold/40 flex items-center justify-center overflow-hidden"
                    style={{
                      transformOrigin: "left center",
                      transform: "rotateY(-90deg) translateX(-30px)",
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="text-[9px] font-sans uppercase tracking-[0.25em] text-gold/90 whitespace-nowrap font-medium"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      BIZNES SHPARGALKASI • ILHOM BEGIMQULOV
                    </span>
                  </div>

                  {/* 3. 3D RIGHT PAGES BLOCK (PAPER RIDGES) */}
                  <div
                    className="absolute top-[2px] bottom-[2px] right-0 w-[30px] border-y border-r border-[#8A7B62]/30"
                    style={{
                      transformOrigin: "right center",
                      transform: "rotateY(90deg) translateX(30px)",
                      background:
                        "repeating-linear-gradient(to right, #F5EFE0 0px, #EDE4CE 1px, #DFD4BC 2px, #EDE4CE 3px)",
                      boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
                    }}
                    aria-hidden="true"
                  />

                  {/* 4. 3D BOTTOM PAGES BLOCK */}
                  <div
                    className="absolute bottom-0 left-[3px] right-[2px] h-[30px] border-x border-b border-[#8A7B62]/30"
                    style={{
                      transformOrigin: "center bottom",
                      transform: "rotateX(-90deg) translateY(30px)",
                      background:
                        "repeating-linear-gradient(to bottom, #F5EFE0 0px, #EDE4CE 1px, #DFD4BC 2px, #EDE4CE 3px)",
                      boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
                    }}
                    aria-hidden="true"
                  />

                  {/* 5. BACK COVER */}
                  <div
                    className="absolute inset-0 bg-[#0F0F0F] border border-border rounded-l-[4px] rounded-r-[1px] shadow-2xl"
                    style={{
                      transform: "translateZ(-15px)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Glassmorphic Specs Strip */}
            <div className="w-full max-w-sm mt-4 p-3.5 border border-border/80 bg-elevated/60 backdrop-blur-sm rounded-lg grid grid-cols-2 gap-3 text-xs font-sans">
              {specs.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-neutral-300">
                  {item.icon}
                  <span className="truncate">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: DETAILS, VISIBLE CARDS & ACTION */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-serif text-gold text-sm tracking-widest font-semibold">
                  /09
                </span>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  {t("kicker")}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gold/15 text-gold border border-gold/30">
                  {t("badge")}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                {t("title")}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* 3 Rich Feature / Chapter Cards with Clear High-Contrast Typography */}
            <div className="space-y-3.5 pt-2">
              {featureCards.map((card) => (
                <div
                  key={card.num}
                  className="p-4 rounded-lg border bg-elevated/40 border-border hover:border-gold/30 hover:bg-elevated/60 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Number badge */}
                    <span className="w-7 h-7 rounded flex items-center justify-center font-serif text-xs font-bold shrink-0 bg-border text-gold group-hover:bg-gold/20 transition-colors">
                      {card.num}
                    </span>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-gold transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-300 font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action & Trust Guarantees */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center gap-6">
              <Button
                variant="primary"
                size="lg"
                onClick={handleOrderBook}
                className="w-full sm:w-auto px-8 h-14 font-semibold tracking-wider text-base shadow-[0_4px_20px_rgba(197,168,128,0.3)] hover:shadow-[0_6px_25px_rgba(197,168,128,0.45)]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>{t("cta")}</span>
                </span>
              </Button>

              {/* Trust Indicators */}
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>{t("trustFast")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>{t("trustAudio")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold">✓</span>
                  <span>{t("trustDirect")}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
