"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getContent } from "@/config/content";

interface PrinciplesProps {
  locale?: string;
}

export const Principles: React.FC<PrinciplesProps> = ({ locale = "uz" }) => {
  const shouldReduceMotion = useReducedMotion();
  const content = getContent(locale);
  const principles = content.principles;
  const modules = principles.modules || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!principles || !modules.length) return null;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const localizedBadge =
    locale === "ru"
      ? "BOSHQARUV METODOLOGIYASI"
      : locale === "en"
      ? "GOVERNANCE METHODOLOGY"
      : "BOSHQARUV METODOLOGIYASI";

  const icons = {
    sop: (
      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    governance: (
      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    metrics: (
      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    culture: (
      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <section
      id="tamoyil"
      aria-labelledby="principles-heading"
      className="relative bg-[#07080B] text-[#FAF9F5] py-20 sm:py-28 scroll-mt-[76px] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Orqa fon nur effekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#D4AF37]/[0.025] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asosiy Sarlavha Bloki */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-[11px] font-mono uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            {localizedBadge}
          </div>
          <h2
            id="principles-heading"
            className="font-serif text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-white tracking-tight leading-[1.12]"
          >
            {principles.title || "Qolip tamoyili"}
            {principles.titleEmphasis ? (
              <span className="text-[#D4AF37]"> {principles.titleEmphasis}</span>
            ) : null}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#9EA6B5] mt-3.5 leading-relaxed">
            {principles.subtitle}
          </p>
        </div>

        {/* Anvar Abduqayum Boshqaruv Falsafasi (Katta Manifest Bloki) */}
        <div className="bg-gradient-to-r from-[#12141C] via-[#151824] to-[#12141C] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-9 lg:p-12 mb-14 sm:mb-20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Bezak chizig'i */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-4xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-3">
                {principles.statementHeading || "Boshqaruv falsafasi"}
              </span>
              <p className="font-serif text-[18px] sm:text-[22px] lg:text-[25px] text-white font-medium leading-[1.45] italic">
                «{principles.manifesto}»
              </p>
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-white/[0.08]">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center font-serif font-bold text-[#D4AF37] text-lg">
                  A
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white">Anvar Abduqayum</h4>
                  <p className="text-[12px] text-[#7E8798]">Sanoatchi, investor va 20 yillik ishlab chiqarish amaliyotchisi</p>
                </div>
              </div>
            </div>

            {/* Testga chorlovchi mini-kartochka */}
            <div className="bg-[#0A0C10] border border-white/[0.08] rounded-xl p-5 lg:w-[320px] shrink-0 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10.5px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Amaliy Diagnostika
                </span>
                <h5 className="text-[14px] font-semibold text-white">
                  Biznesingiz qolip tizimida ishlay oladimi?
                </h5>
                <p className="text-[12px] text-[#8C94A4] mt-1.5 leading-relaxed">
                  2 daqiqalik audit orqali kompaniyangizning operatsion holatini baholang.
                </p>
              </div>
              <Link
                href={`/${locale}/test`}
                className="w-full py-2.5 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#E5BE42] text-[#090A0D] text-[12px] font-mono font-bold uppercase tracking-wider text-center transition-all shadow-[0_4px_16px_rgba(212,175,55,0.25)]"
              >
                Testdan o‘tish →
              </Link>
            </div>
          </div>
        </div>

        {/* 4 TA ASOSIY METODOLOGIYA USTUNI (2x2 Zamonaviy Grid) */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08]">
            <h3 className="font-serif text-[22px] sm:text-[26px] font-bold text-white">
              Tizimli Boshqaruvning 4 ta Ustuni
            </h3>
            <span className="text-[12px] font-mono text-[#7E8798] hidden sm:block">
              ANVAR ABDUQAYUM OPERATSION STANDARTI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((mod, idx) => {
              const num = `0${idx + 1}`;
              const isExpanded = expandedId === mod.id;
              const iconKey = (mod.iconType || "sop") as keyof typeof icons;

              return (
                <div
                  key={mod.id || idx}
                  className="bg-[#11131B] border border-white/[0.08] hover:border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] group relative"
                >
                  {/* Kartochka yuqori qismi: Raqam, Ikonka va Video Manba */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#171A24] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/40 transition-colors">
                        {icons[iconKey] || icons.sop}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-semibold block">
                          Ustun {num}
                        </span>
                        <h4 className="font-serif text-[19px] sm:text-[21px] font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {mod.title}
                        </h4>
                      </div>
                    </div>

                    {mod.sourceUrl && (
                      <a
                        href={mod.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-[#D4AF37]/15 border border-white/[0.08] hover:border-[#D4AF37]/40 text-[#8C94A4] hover:text-[#D4AF37] text-[11px] font-mono transition-all flex items-center gap-1 shrink-0"
                        title="Video ma’ruzani ko‘rish"
                      >
                        <span>Kun.uz</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Qoida va Tavsif */}
                  <div className="flex flex-col gap-2.5">
                    <div className="inline-flex items-center gap-2 text-[12px] font-mono text-[#E5BE42] bg-[#D4AF37]/[0.08] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                      <span className="font-medium truncate">{mod.technicalRule}</span>
                    </div>

                    <p className="text-[14px] sm:text-[14.5px] text-[#A6ACBA] leading-relaxed mt-1">
                      {mod.description}
                    </p>
                  </div>

                  {/* 2 Taqqoslash Bloki: ❌ Eski usul vs ✅ Qolip yechimi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Eski amaliyot */}
                    <div className="p-3.5 rounded-xl bg-[#171317] border border-red-500/15 flex flex-col justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider">
                        <span>✕</span>
                        <span>{principles.labels?.before || "Shaxsga bog‘liq"}</span>
                      </div>
                      <p className="text-[12.5px] text-[#A0A7B5] leading-snug">
                        {mod.beforeText}
                      </p>
                    </div>

                    {/* Yangi Qolip yechimi */}
                    <div className="p-3.5 rounded-xl bg-[#151915] border border-emerald-500/20 flex flex-col justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        <span>✓</span>
                        <span>{principles.labels?.after || "Qolip yondashuvi"}</span>
                      </div>
                      <p className="text-[12.5px] text-[#E2E8F0] leading-snug">
                        {mod.afterText}
                      </p>
                    </div>
                  </div>

                  {/* Zavod Konteksti */}
                  {mod.appContext && (
                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[12px] text-[#7E8798]">
                      <span className="text-[#D4AF37] font-mono font-semibold shrink-0">Amaliyotda:</span>
                      <span className="text-[#C2C7D1] truncate">{mod.appContext}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
