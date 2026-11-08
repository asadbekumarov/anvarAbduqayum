"use client";

import React, { useState, useTransition, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  QUIZ_QUESTIONS,
  calculateQuizScore,
  getQuizTier,
} from "../data/quizData";
import {
  formatUzbekPhone,
  cleanUzbekPhone,
  isUzbekPhoneComplete,
} from "@/lib/formatPhone";

type QuizStep = "intro" | "questions" | "lead" | "result";

interface QuizResultData {
  score: number;
  tier: {
    id: string;
    title: { uz: string; ru: string; en: string };
    description: { uz: string; ru: string; en: string };
    recommendation: { uz: string; ru: string; en: string };
  };
  telegramSent?: boolean;
}

export function QuizView() {
  const t = useTranslations("quiz");
  const locale = useLocale() as "uz" | "ru" | "en";
  const [, startTransition] = useTransition();

  const [step, setStep] = useState<QuizStep>("intro");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Lead form state
  const [name, setName] = useState<string>("");
  const [displayPhone, setDisplayPhone] = useState<string>("+998 ");
  const [phone, setPhone] = useState<string>("+998");
  const [companySize, setCompanySize] = useState<string>("10–50");
  const [honeypot, setHoneypot] = useState<string>("");

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    companySize?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resultData, setResultData] = useState<QuizResultData | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleStart = () => {
    setAnswers([]);
    setCurrentIdx(0);
    setStep("questions");
  };

  const handleSelectOption = useCallback(
    (points: 0 | 1 | 2 | 3) => {
      if (isTransitioning) return;

      const nextAnswers = [...answers];
      nextAnswers[currentIdx] = points;
      setAnswers(nextAnswers);
      setIsTransitioning(true);

      setTimeout(() => {
        startTransition(() => {
          if (currentIdx + 1 < totalQuestions) {
            setCurrentIdx((prev) => prev + 1);
          } else {
            setStep("lead");
          }
          setIsTransitioning(false);
        });
      }, 260);
    },
    [answers, currentIdx, isTransitioning, totalQuestions]
  );

  const handleBackQuestion = () => {
    if (isTransitioning) return;
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setStep("intro");
    }
  };

  const handleBackFromLead = () => {
    setCurrentIdx(totalQuestions - 1);
    setStep("questions");
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setDisplayPhone(formatted);
    const cleaned = cleanUzbekPhone(formatted);
    setPhone(cleaned);
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; phone?: string; companySize?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      errors.name = t("nameError");
    }
    if (!isUzbekPhoneComplete(phone)) {
      errors.phone = t("phoneError");
    }
    if (!companySize) {
      errors.companySize = t("scaleError");
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          companySize,
          answers,
          locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot,
        }),
      });

      const data = await response.json();

      if (data.ok && data.tier) {
        setResultData({
          score: data.score,
          tier: data.tier,
          telegramSent: data.telegramSent,
        });
        setStep("result");
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // Fallback: calculate locally if server returned error
        const localScore = calculateQuizScore(answers);
        const localTier = getQuizTier(localScore);
        setResultData({
          score: localScore,
          tier: {
            id: localTier.id,
            title: localTier.title,
            description: localTier.description,
            recommendation: localTier.recommendation,
          },
          telegramSent: false,
        });
        setStep("result");
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (err) {
      console.error("[Quiz Submit Error]", err);
      // Fallback display on network exception
      const localScore = calculateQuizScore(answers);
      const localTier = getQuizTier(localScore);
      setResultData({
        score: localScore,
        tier: {
          id: localTier.id,
          title: localTier.title,
          description: localTier.description,
          recommendation: localTier.recommendation,
        },
        telegramSent: false,
      });
      setStep("result");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers([]);
    setCurrentIdx(0);
    setResultData(null);
    setFormErrors({});
    setStep("intro");
  };

  // Pre-calculate localized tier details for result screen
  const currentTierTitle = resultData
    ? resultData.tier.title[locale] || resultData.tier.title.uz
    : "";
  const currentTierDesc = resultData
    ? resultData.tier.description[locale] || resultData.tier.description.uz
    : "";
  const currentTierRec = resultData
    ? resultData.tier.recommendation[locale] || resultData.tier.recommendation.uz
    : "";

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:py-20 relative bg-[#070707] text-[#E5E5E5]">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0B132B]/35 blur-[140px] rounded-full"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <AnimatePresence mode="wait">
          {/* ================= STEP 1: INTRO ================= */}
          {step === "intro" && (
            <motion.div
              key="step-intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-[#1E1E1E] hover:border-[#D4AF37]/50 p-8 sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.12] text-white">
                {t("introTitle")}
              </h1>

              <p className="mt-4 text-lg sm:text-xl font-serif italic text-[#D4AF37]">
                {t("introSubtitle")}
              </p>

              <p className="mt-5 text-sm sm:text-base text-[#9A9A9A] font-normal leading-relaxed max-w-xl">
                {t("introDescription")}
              </p>

              {/* Quick 3-metric reassurance strip */}
              <div className="grid grid-cols-3 gap-3 my-8 pt-6 border-t border-[#1E1E1E]">
                <div>
                  <span className="block font-mono text-xs text-[#9A9A9A] uppercase tracking-wider">
                    Savollar
                  </span>
                  <span className="font-mono text-base sm:text-lg text-white font-medium">
                    10 ta
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xs text-[#9A9A9A] uppercase tracking-wider">
                    Vaqt
                  </span>
                  <span className="font-mono text-base sm:text-lg text-white font-medium">
                    2 daqiqa
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xs text-[#9A9A9A] uppercase tracking-wider">
                    Natija
                  </span>
                  <span className="font-mono text-base sm:text-lg text-[#D4AF37] font-medium">
                    Darhol
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStart}
                className="group relative overflow-hidden inline-flex items-center justify-between gap-6 w-full sm:w-auto bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-9 py-5 text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10 font-bold">{t("startAction")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                  →
                </span>
              </button>
            </motion.div>
          )}

          {/* ================= STEP 2: QUESTIONS ================= */}
          {step === "questions" && currentQuestion && (
            <motion.div
              key={`question-${currentIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-[#1E1E1E] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all"
            >
              {/* Top progress and back row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleBackQuestion}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-[#9A9A9A] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 py-1"
                  aria-label={t("backAction")}
                >
                  <span>←</span>
                  <span>{t("backAction")}</span>
                </button>

                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#D4AF37]">
                  {t("questionOf", {
                    current: currentIdx + 1,
                    total: totalQuestions,
                  })}
                </span>
              </div>

              {/* Accessible Framer Motion Animated Progress Bar */}
              <div
                role="progressbar"
                aria-label={t("stepAria", {
                  current: currentIdx + 1,
                  total: totalQuestions,
                })}
                aria-valuenow={currentIdx + 1}
                aria-valuemin={1}
                aria-valuemax={totalQuestions}
                className="w-full h-1.5 bg-[#1E1E1E] mb-8 overflow-hidden rounded-full"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full"
                  initial={false}
                  animate={{
                    width: `${((currentIdx + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              {/* Question Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-snug tracking-[-0.02em] mb-8 min-h-[64px]">
                {currentQuestion.title[locale] || currentQuestion.title.uz}
              </h2>

              {/* Answer Options Radio Group */}
              <div
                role="radiogroup"
                aria-label={
                  currentQuestion.title[locale] || currentQuestion.title.uz
                }
                className="space-y-3"
              >
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = answers[currentIdx] === option.points;
                  const letter = ["A", "B", "C", "D"][optIdx];

                  return (
                    <div
                      key={optIdx}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => handleSelectOption(option.points)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectOption(option.points);
                        }
                      }}
                      className={`group relative p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 outline-none select-none rounded-none ${
                        isSelected
                          ? "bg-[#161616] border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "bg-[#070707]/60 border-[#1E1E1E] text-[#9A9A9A] hover:border-[#D4AF37]/50 hover:bg-[#161616] hover:text-white focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                        <span
                          className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center font-mono text-xs transition-colors border ${
                            isSelected
                              ? "bg-[#D4AF37] text-[#070707] border-[#D4AF37] font-bold"
                              : "bg-white/[0.02] border-[#1E1E1E] text-[#9A9A9A] group-hover:border-[#D4AF37]/40 group-hover:text-white"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed font-normal">
                          {option.text[locale] || option.text.uz}
                        </span>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#D4AF37]"
                            : "border-white/20 group-hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: LEAD FORM ================= */}
          {step === "lead" && (
            <motion.div
              key="step-lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-[#1E1E1E] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all"
            >
              <button
                type="button"
                onClick={handleBackFromLead}
                className="font-mono text-xs uppercase tracking-[0.16em] text-[#9A9A9A] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 mb-6 py-1"
              >
                <span>←</span>
                <span>{t("backAction")}</span>
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  10 / 10 TUGALLANDI
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug tracking-[-0.02em] mb-2">
                {t("leadTitle")}
              </h2>

              <p className="text-sm text-[#9A9A9A] font-normal leading-relaxed mb-8">
                {t("leadSubtitle")}
              </p>

              <form onSubmit={handleSubmitLead} noValidate className="space-y-6">
                {/* Anti-spam Honeypot */}
                <input
                  type="text"
                  name="b_address"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label
                    htmlFor="quiz-name"
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2"
                  >
                    {t("nameLabel")} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="quiz-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formErrors.name) {
                        setFormErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder={t("namePlaceholder")}
                    disabled={isSubmitting}
                    className="w-full bg-[#070707]/80 border border-[#1E1E1E] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#D4AF37] focus:outline-none transition-colors rounded-none"
                  />
                  {formErrors.name && (
                    <p className="font-mono text-xs text-amber-300 mt-1.5">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="quiz-phone"
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2"
                  >
                    {t("phoneLabel")} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="quiz-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={displayPhone}
                    onChange={handlePhoneInputChange}
                    placeholder="+998 90 123 45 67"
                    disabled={isSubmitting}
                    className="w-full bg-[#070707]/80 border border-[#1E1E1E] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#D4AF37] focus:outline-none transition-colors rounded-none font-mono"
                  />
                  {formErrors.phone && (
                    <p className="font-mono text-xs text-amber-300 mt-1.5">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Company Scale (Matching ApplyForm options) */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-[0.2em] text-[#9A9A9A] block mb-2">
                    {t("companyScaleLabel")} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: "1–10", sub: t("scale1Sub") },
                      { value: "10–50", sub: t("scale2Sub") },
                      { value: "50–200+", sub: t("scale3Sub") },
                      { value: "Startap", sub: t("scale4Sub") },
                    ].map((opt) => {
                      const isSelected = companySize === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setCompanySize(opt.value);
                            if (formErrors.companySize) {
                              setFormErrors((prev) => ({
                                ...prev,
                                companySize: undefined,
                              }));
                            }
                          }}
                          disabled={isSubmitting}
                          className={`py-3 px-2 font-mono text-xs transition-all rounded-none text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                            isSelected
                              ? "bg-[#161616] border-[#D4AF37] text-[#F3E5AB] shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]"
                              : "bg-[#070707]/60 border-[#1E1E1E] text-[#9A9A9A] hover:text-white hover:border-[#D4AF37]/40"
                          }`}
                        >
                          <span className="font-semibold text-xs tracking-wider">
                            {opt.value}
                          </span>
                          <span className="text-xs opacity-75 tracking-normal font-sans">
                            {opt.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {formErrors.companySize && (
                    <p className="font-mono text-xs text-amber-300 mt-1.5">
                      {formErrors.companySize}
                    </p>
                  )}
                </div>

                {/* Submit CTA Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden inline-flex items-center justify-between gap-6 w-full sm:w-auto bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-50 text-[#070707] px-9 py-5 text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span className="relative z-10 font-bold">
                      {isSubmitting
                        ? t("submittingAction")
                        : t("viewResultAction")}
                    </span>
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ================= STEP 4: RESULT ================= */}
          {step === "result" && resultData && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-[#1E1E1E] p-6 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all"
            >
              {/* Header kicker */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                  {t("levelLabel")}
                </span>
              </div>

              {/* Status tier badge */}
              {resultData.tier.id === "dependent" && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs uppercase tracking-wider mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>0–11 BALL · KRITIK OPERATSION BOG&apos;LIQLIK</span>
                </div>
              )}
              {resultData.tier.id === "partial" && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs uppercase tracking-wider mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>12–21 BALL · QISMAN TIZIMLASHGAN BIZNES</span>
                </div>
              )}
              {resultData.tier.id === "systemic" && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>22–30 BALL · AVTONOM VA EKSPORTGA TAYYOR TIZIM</span>
                </div>
              )}

              {/* Score & Tier Title */}
              <div className="border-b border-[#1E1E1E] pb-8 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
                  <span className="font-mono text-5xl sm:text-6xl text-[#D4AF37] font-light tracking-tight">
                    {resultData.score}
                  </span>
                  <span className="font-mono text-sm sm:text-base text-[#9A9A9A] tracking-wider">
                    {t("resultScoreOutOf")}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-light text-white tracking-[-0.02em] leading-snug">
                  {currentTierTitle}
                </h2>
              </div>

              {/* Diagnostic Interpretation and Actionable Recommendation */}
              <div className="space-y-6 mb-10">
                <div>
                  <p className="text-base sm:text-lg text-[#E5E5E5] leading-relaxed font-light">
                    {currentTierDesc}
                  </p>
                </div>

                <div className="bg-[#070707] border border-[#1E1E1E] p-5 sm:p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
                    {t("recommendationHeading")}
                  </span>
                  <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed font-normal">
                    {currentTierRec}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Booking Page, Telegram Direct Consultation & Retake */}
              <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <Link
                  href="/bron"
                  className="group relative overflow-hidden inline-flex items-center justify-between gap-4 flex-1 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#070707] px-7 py-4 text-xs uppercase tracking-[0.14em] font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)] text-center"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative z-10 font-bold">
                    {locale === "ru"
                      ? "Записаться на 20-минутную диагностику с Анваром Абдукаюмом"
                      : locale === "en"
                      ? "Book 20-min Diagnostic Session with Anvar Abduqayum"
                      : "Anvar Abduqayum bilan 20 daqiqalik bepul diagnostikaga yozilish"}
                  </span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                    →
                  </span>
                </Link>

                <a
                  href="https://t.me/anvar_abduqayum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.04] text-[#9A9A9A] hover:text-white border border-[#1E1E1E] hover:border-[#D4AF37]/60 px-6 py-4 text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer text-center"
                >
                  <span>{t("telegramDirectAction")}</span>
                </a>

                <button
                  type="button"
                  onClick={handleRetake}
                  className="group inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/[0.04] text-[#9A9A9A] hover:text-white border border-[#1E1E1E] hover:border-white/30 px-5 py-4 text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer text-center"
                >
                  <span>{t("retakeAction")}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
