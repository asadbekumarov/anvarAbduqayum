"use client";

import React, { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { formatSectionKicker } from "@/config/sections";

type CategoryKey = "all" | "systematization" | "consulting" | "mentorship" | "guarantees";

interface FAQItem {
  id: string;
  category: "systematization" | "consulting" | "mentorship" | "guarantees";
  question: string;
  answer: string;
}

export function FAQ() {
  const t = useTranslations("faq");
  const ctaT = useTranslations("cta");
  const locale = useLocale();
  const isUz = locale === "uz";
  const isRu = locale === "ru";
  const { openApply } = useApplyModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [openId, setOpenId] = useState<string>("");

  // Raw items from translation
  const rawItems = useMemo<FAQItem[]>(() => {
    return [
      {
        id: "q1",
        category: "systematization",
        question: t("items.0.question"),
        answer: t("items.0.answer"),
      },
      {
        id: "q2",
        category: "systematization",
        question: t("items.1.question"),
        answer: t("items.1.answer"),
      },
      {
        id: "q3",
        category: "consulting",
        question: t("items.2.question"),
        answer: t("items.2.answer"),
      },
      {
        id: "q4",
        category: "consulting",
        question: t("items.3.question"),
        answer: t("items.3.answer"),
      },
      {
        id: "q5",
        category: "mentorship",
        question: t("items.4.question"),
        answer: t("items.4.answer"),
      },
      {
        id: "q6",
        category: "mentorship",
        question: t("items.5.question"),
        answer: t("items.5.answer"),
      },
      {
        id: "q7",
        category: "guarantees",
        question: t("items.6.question"),
        answer: t("items.6.answer"),
      },
      {
        id: "q8",
        category: "guarantees",
        question: t("items.7.question"),
        answer: t("items.7.answer"),
      },
    ];
  }, [t]);

  // Dynamic search & category filtering
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return rawItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;
      const qMatch = item.question.toLowerCase().includes(query);
      const aMatch = item.answer.toLowerCase().includes(query);
      return qMatch || aMatch;
    });
  }, [rawItems, searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const handleCategoryClick = (cat: CategoryKey) => {
    setSelectedCategory((prev) => (prev === cat ? "all" : cat));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setOpenId("");
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      systematization: 0,
      consulting: 0,
      mentorship: 0,
      guarantees: 0,
    };
    rawItems.forEach((item) => {
      if (item.category && item.category in counts) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [rawItems]);

  const formatCount = (count: number) => {
    if (isUz) return `${count} ta savol`;
    if (isRu) {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 === 1 && mod100 !== 11) return `${count} ответ`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} ответа`;
      return `${count} ответов`;
    }
    return `${count} ${count === 1 ? "answer" : "answers"}`;
  };

  const categories = [
    {
      key: "systematization" as CategoryKey,
      title: t("categories.systematization.title"),
      count: formatCount(categoryCounts.systematization || 0),
      countNum: categoryCounts.systematization || 0,
      glyph: (
        // Candlesticks / System architecture glyph
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] group-hover:text-[#E2C79D] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      key: "consulting" as CategoryKey,
      title: t("categories.consulting.title"),
      count: formatCount(categoryCounts.consulting || 0),
      countNum: categoryCounts.consulting || 0,
      glyph: (
        // Target / Strategic Diagnostics glyph
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] group-hover:text-[#E2C79D] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
          <path strokeLinecap="round" d="M12 3v2m0 14v2m-9-9h2m14 0h2" />
        </svg>
      ),
    },
    {
      key: "mentorship" as CategoryKey,
      title: t("categories.mentorship.title"),
      count: formatCount(categoryCounts.mentorship || 0),
      countNum: categoryCounts.mentorship || 0,
      glyph: (
        // Executive Mentorship / Star glyph
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] group-hover:text-[#E2C79D] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      key: "guarantees" as CategoryKey,
      title: t("categories.guarantees.title"),
      count: formatCount(categoryCounts.guarantees || 0),
      countNum: categoryCounts.guarantees || 0,
      glyph: (
        // Trending Growth / ROI glyph
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] group-hover:text-[#E2C79D] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  const visibleCategories = categories.filter((c) => c.countNum > 0);

  return (
    <section
      id="faq"
      className="relative w-full bg-[#0A0A0A] text-white py-20 sm:py-28 overflow-hidden border-t border-white/[0.08]"
    >
      {/* 1. Subtle luxury gold light spill along top edge */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent z-10" />

      {/* 2. Central atmospheric gold & obsidian depth glow */}
      <div
        className="pointer-events-none absolute top-[92px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[950px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(197, 168, 128, 0.12) 0%, rgba(11, 19, 43, 0.35) 45%, rgba(10, 10, 10, 0) 75%)",
        }}
      />

      {/* 3. Stepped architectural vertical gold light bars (harmonious with site design) */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[460px] max-w-[1778px] mx-auto flex justify-between px-6 sm:px-12 opacity-80 overflow-hidden">
        {/* Left side stepped bars */}
        <div className="flex items-start gap-4 sm:gap-6">
          <div
            className="w-[60px] sm:w-[88px] h-[340px] sm:h-[410px] rounded-b-md border-x border-[#C5A880]/20"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.25) 0%, rgba(197, 168, 128, 0.06) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[280px] sm:h-[340px] rounded-b-md border-x border-[#C5A880]/20"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.20) 0%, rgba(197, 168, 128, 0.05) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[220px] sm:h-[270px] rounded-b-md border-x border-[#C5A880]/15 hidden md:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.16) 0%, rgba(197, 168, 128, 0.04) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[160px] sm:h-[200px] rounded-b-md border-x border-[#C5A880]/15 hidden lg:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.03) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[110px] sm:h-[140px] rounded-b-md border-x border-[#C5A880]/10 hidden xl:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.08) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Right side stepped bars */}
        <div className="flex items-start gap-4 sm:gap-6 flex-row-reverse">
          <div
            className="w-[60px] sm:w-[88px] h-[340px] sm:h-[410px] rounded-b-md border-x border-[#C5A880]/20"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.25) 0%, rgba(197, 168, 128, 0.06) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[280px] sm:h-[340px] rounded-b-md border-x border-[#C5A880]/20"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.20) 0%, rgba(197, 168, 128, 0.05) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[220px] sm:h-[270px] rounded-b-md border-x border-[#C5A880]/15 hidden md:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.16) 0%, rgba(197, 168, 128, 0.04) 60%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[160px] sm:h-[200px] rounded-b-md border-x border-[#C5A880]/10 hidden lg:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.09) 0%, rgba(158, 125, 59, 0.02) 55%, transparent 100%)",
            }}
          />
          <div
            className="w-[60px] sm:w-[88px] h-[110px] sm:h-[140px] rounded-b-md border-x border-[#C5A880]/10 hidden xl:block"
            style={{
              background: "linear-gradient(180deg, rgba(197, 168, 128, 0.06) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* CONTENT COLUMN: 1224u max width, centred */}
      <div className="relative z-10 max-w-[1224px] mx-auto px-5 sm:px-8">
        {/* HERO AREA (Centred) */}
        <div className="flex flex-col items-center text-center max-w-[860px] mx-auto">
          {/* Pill Tag (Gold tinted glass, matching brand identity) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A880]/35 bg-[#C5A880]/10 backdrop-blur-md shadow-[0_0_16px_rgba(197,168,128,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_6px_#C5A880]" />
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-[#E2C79D] font-medium">
              {formatSectionKicker("faq", t("kicker"))}
            </span>
          </div>

          {/* Headline: Serif luxury display heading */}
          <h2 className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-[1.18]">
            {isUz ? t("headlineUz") : t("headline")}
          </h2>

          {/* Lede: Clean readable text */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-[680px]" style={{ color: '#CBD5E1' }}>
            {t("lede")}
          </p>

          {/* Gold Shimmer Button (Site brand signature) */}
          <button
            type="button"
            onClick={openApply}
            className="mt-7 group relative overflow-hidden h-[48px] sm:h-[50px] px-7 rounded-sm bg-gradient-to-r from-[#C5A880] via-[#D4B992] to-[#C5A880] hover:brightness-105 active:scale-[0.98] text-[#0A0A0A] font-sans text-xs sm:text-sm uppercase tracking-[0.08em] font-semibold flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(197,168,128,0.3)] transition-all cursor-pointer"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="relative z-10">{ctaT("primary")}</span>
            <svg className="w-4 h-4 relative z-10 text-[#0A0A0A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>

        {/* SEARCH BAR (74px tall, frosted glass with gold focus) */}
        <div className="mt-14 sm:mt-18 max-w-[1224px] mx-auto">
          <div className="relative group">
            {/* Magnifier icon */}
            <div className="absolute inset-y-0 left-0 pl-6 sm:pl-7 flex items-center pointer-events-none z-10">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A880]/80 group-focus-within:text-[#C5A880] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            {/* Input with gold focus ring */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchLabel")}
              className="w-full h-[58px] sm:h-[68px] pl-[58px] sm:pl-[72px] pr-14 rounded-full bg-[#0F172A]/50 hover:bg-[#0F172A]/70 text-white placeholder:text-neutral-400 text-sm sm:text-base border border-white/[0.12] focus:border-[#C5A880] focus:ring-4 focus:ring-[#C5A880]/20 backdrop-blur-xl outline-none transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={t("clearSearch")}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs">
                  ✕
                </div>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORIES (2×2 grid with site's gold & navy cards) */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {visibleCategories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryClick(cat.key)}
                className={`w-full h-[106px] sm:h-[129px] rounded-full flex items-center gap-5 sm:gap-6 px-4 sm:px-6 transition-all duration-300 text-left cursor-pointer border group ${
                  isSelected
                    ? "bg-[#0F172A]/95 border-[#C5A880] shadow-[0_0_24px_rgba(197,168,128,0.25)] scale-[1.01]"
                    : "bg-[#131B2E]/60 hover:bg-[#1A243D]/80 border-white/[0.12] hover:border-[#C5A880]/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                }`}
              >
                {/* 99u round icon disc */}
                <div
                  className={`w-[74px] h-[74px] sm:w-[99px] sm:h-[99px] rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? "bg-[#C5A880]/15 border-[#C5A880]/50"
                      : "bg-white/[0.04] border-white/12 group-hover:border-[#C5A880]/40 group-hover:bg-[#C5A880]/10"
                  }`}
                >
                  {cat.glyph}
                </div>

                {/* Card text */}
                <div className="flex flex-col min-w-0 pr-3 sm:pr-4 justify-center">
                  <span
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-tight transition-colors line-clamp-2 leading-snug"
                    style={{ color: isSelected ? "#E2C79D" : "#FFFFFF" }}
                  >
                    {cat.title}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-mono mt-0.5 sm:mt-1"
                    style={{ color: isSelected ? "#C5A880" : "#94A3B8" }}
                  >
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE FILTER STATUS */}
        {(selectedCategory !== "all" || searchQuery) && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-sm text-platinum">
              {filteredItems.length} {isUz ? "ta savol ko'rsatilmoqda" : "questions found"}
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-[#C5A880] hover:text-[#E2C79D] hover:underline cursor-pointer font-medium"
            >
              {t("clearSearch")}
            </button>
          </div>
        )}

        {/* ACCORDION (One-at-a-time, animated grid transition) */}
        <div className="mt-10 sm:mt-14 space-y-4 sm:space-y-5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-xl bg-[#0F172A]/30 border border-white/[0.08]">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-neutral-400 mb-3 text-lg">
                🔍
              </div>
              <p className="text-base text-platinum-light font-medium">
                {t("noResults")}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 px-5 py-2 rounded-sm bg-gradient-to-r from-[#C5A880] to-[#D4B992] text-[#0A0A0A] font-sans text-xs uppercase tracking-wider font-semibold hover:brightness-105 transition-all cursor-pointer"
              >
                {t("clearSearch")}
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl bg-[#0F172A]/30 border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#C5A880]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)] bg-[#0B132B]/50"
                      : "border-white/[0.08] hover:border-white/[0.16] hover:bg-[#0F172A]/50"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                    className="w-full text-left min-h-[68px] sm:min-h-[76px] px-6 sm:px-8 py-5 flex items-center justify-between gap-6 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <span className="text-base sm:text-lg font-medium text-white group-hover:text-[#E2C79D] transition-colors leading-snug">
                      {item.question}
                    </span>

                    {/* Circular Chevron */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-r from-[#C5A880] to-[#E2C79D] border-[#C5A880] text-[#0A0A0A] rotate-180 shadow-[0_0_12px_rgba(197,168,128,0.4)]"
                          : "bg-white/[0.03] border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/25"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.25"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  {/* Smooth Animated Answer (grid-template-rows: 0fr -> 1fr) */}
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className="grid transition-all duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-7 pt-1">
                        <div className="h-[1px] w-full bg-white/[0.08] mb-4" />
                        <p className="text-sm sm:text-base leading-relaxed font-normal text-[#CBD5E1]" style={{ color: '#CBD5E1' }}>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* BOTTOM CALLOUT / CONSULTATION CARD */}
        <div className="mt-14 sm:mt-18 p-7 sm:p-9 rounded-sm bg-gradient-to-r from-[#0B132B]/60 via-[#0A0A0A] to-[#0B132B]/60 border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {t("bottomCard.title")}
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-[540px]">
              {t("bottomCard.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={openApply}
            className="shrink-0 h-[46px] sm:h-[48px] px-6 sm:px-8 rounded-sm bg-gradient-to-r from-[#C5A880] to-[#D4B992] hover:brightness-105 active:scale-[0.98] text-[#0A0A0A] font-sans text-xs uppercase tracking-[0.08em] font-semibold transition-all shadow-[0_4px_16px_rgba(197,168,128,0.3)] hover:shadow-[0_6px_24px_rgba(197,168,128,0.45)] cursor-pointer"
          >
            {t("bottomCard.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}
