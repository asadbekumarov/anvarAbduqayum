"use client";

import React, { useState, useTransition, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
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
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:py-20 relative">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0F172A]/40 blur-[140px] rounded-full"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* ================= STEP 1: INTRO ================= */}
        {step === "intro" && (
          <div className="bg-gradient-to-b from-[#0F172A]/60 via-[#0B132B]/40 to-[#0A0A0A] border border-white/[0.1] p-8 sm:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880]">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.12] text-white">
              {t("introTitle")}
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-serif italic text-white/90">
              {t("introSubtitle")}
            </p>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
              {t("introDescription")}
            </p>

            {/* Quick 3-metric reassurance strip */}
            <div className="grid grid-cols-3 gap-3 my-8 pt-6 border-t border-white/[0.08]">
              <div>
                <span className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  Savollar
                </span>
                <span className="font-mono text-base sm:text-lg text-white font-medium">
                  10 ta
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  Vaqt
                </span>
                <span className="font-mono text-base sm:text-lg text-white font-medium">
                  2 daqiqa
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                  Natija
                </span>
                <span className="font-mono text-base sm:text-lg text-[#C5A880] font-medium">
                  Darhol
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="group relative overflow-hidden inline-flex items-center justify-between gap-6 w-full sm:w-auto bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-9 py-5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(197,168,128,0.25)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">{t("startAction")}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        )}

        {/* ================= STEP 2: QUESTIONS ================= */}
        {step === "questions" && currentQuestion && (
          <div className="bg-gradient-to-b from-[#0F172A]/70 via-[#0B132B]/45 to-[#0A0A0A] border border-white/[0.1] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
            {/* Top progress and back row */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                type="button"
                onClick={handleBackQuestion}
                className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 py-1"
                aria-label={t("backAction")}
              >
                <span>←</span>
                <span>{t("backAction")}</span>
              </button>

              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#C5A880]">
                {t("questionOf", {
                  current: currentIdx + 1,
                  total: totalQuestions,
                })}
              </span>
            </div>

            {/* Accessible Progress Bar */}
            <div
              role="progressbar"
              aria-label={t("stepAria", {
                current: currentIdx + 1,
                total: totalQuestions,
              })}
              aria-valuenow={currentIdx + 1}
              aria-valuemin={1}
              aria-valuemax={totalQuestions}
              className="w-full h-1 bg-white/[0.08] mb-8 overflow-hidden"
            >
              <div
                className="h-full bg-[#C5A880] transition-all duration-300 ease-out"
                style={{
                  width: `${((currentIdx + 1) / totalQuestions) * 100}%`,
                }}
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
                    className={`group relative p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 outline-none select-none ${
                      isSelected
                        ? "bg-[#0B132B] border-[#C5A880] text-white shadow-[0_0_20px_rgba(197,168,128,0.2)]"
                        : "bg-[#0A0A0A]/60 border-white/[0.08] text-neutral-300 hover:border-white/30 hover:bg-white/[0.03] hover:text-white focus-visible:border-[#C5A880] focus-visible:ring-1 focus-visible:ring-[#C5A880]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center font-mono text-xs transition-colors border ${
                          isSelected
                            ? "bg-[#C5A880] text-[#0A0A0A] border-[#C5A880] font-bold"
                            : "bg-white/[0.02] border-white/15 text-neutral-400 group-hover:border-white/30 group-hover:text-white"
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
                          ? "border-[#C5A880]"
                          : "border-white/20 group-hover:border-white/40"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 3: LEAD FORM ================= */}
        {step === "lead" && (
          <div className="bg-gradient-to-b from-[#0F172A]/70 via-[#0B132B]/45 to-[#0A0A0A] border border-white/[0.1] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
            <button
              type="button"
              onClick={handleBackFromLead}
              className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 mb-6 py-1"
            >
              <span>←</span>
              <span>{t("backAction")}</span>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880]">
                10 / 10 TUGALLANDI
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-white leading-snug tracking-[-0.02em] mb-2">
              {t("leadTitle")}
            </h2>

            <p className="text-sm text-neutral-300 font-normal leading-relaxed mb-8">
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
                  className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 block mb-2"
                >
                  {t("nameLabel")} <span className="text-[#C5A880]">*</span>
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
                  className="w-full bg-[#0A0A0A]/80 border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#C5A880] focus:outline-none transition-colors rounded-none"
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
                  className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 block mb-2"
                >
                  {t("phoneLabel")} <span className="text-[#C5A880]">*</span>
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
                  className="w-full bg-[#0A0A0A]/80 border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#C5A880] focus:outline-none transition-colors rounded-none font-mono"
                />
                {formErrors.phone && (
                  <p className="font-mono text-xs text-amber-300 mt-1.5">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Company Scale (Matching ApplyForm options) */}
              <div>
                <label className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-300 block mb-2">
                  {t("companyScaleLabel")} <span className="text-[#C5A880]">*</span>
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
                            ? "bg-[#0B132B]/80 border-[#C5A880] text-[#E2C79D] shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                            : "bg-[#0A0A0A]/60 border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/25"
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
                  className="group relative overflow-hidden inline-flex items-center justify-between gap-6 w-full sm:w-auto bg-[#C5A880] hover:bg-[#d4b992] disabled:opacity-50 text-[#0A0A0A] px-9 py-5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(197,168,128,0.25)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative z-10">
                    {isSubmitting
                      ? t("submittingAction")
                      : t("viewResultAction")}
                  </span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 4: RESULT ================= */}
        {step === "result" && resultData && (
          <div className="bg-gradient-to-b from-[#0F172A]/80 via-[#0B132B]/50 to-[#0A0A0A] border border-white/[0.12] p-6 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all">
            {/* Header kicker */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880]">
                {t("levelLabel")}
              </span>
            </div>

            {/* Score & Tier Title */}
            <div className="border-b border-white/[0.08] pb-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
                <span className="font-mono text-5xl sm:text-6xl text-[#C5A880] font-light tracking-tight">
                  {resultData.score}
                </span>
                <span className="font-mono text-sm sm:text-base text-neutral-400 tracking-wider">
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
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-light">
                  {currentTierDesc}
                </p>
              </div>

              <div className="bg-[#0A0A0A]/70 border border-white/[0.08] p-5 sm:p-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
                  {t("recommendationHeading")}
                </span>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {currentTierRec}
                </p>
              </div>
            </div>

            {/* Action Buttons: Booking Page, Telegram Direct Consultation & Retake */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <Link
                href="/bron"
                className="group relative overflow-hidden inline-flex items-center justify-between gap-6 flex-1 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-7 py-4 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(197,168,128,0.25)] text-center"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{t("ctaTelegram")}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>

              <a
                href="https://t.me/IlhomBegimqulov"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.04] text-neutral-300 hover:text-white border border-white/20 hover:border-[#C5A880]/60 px-6 py-4 text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer text-center"
              >
                <span>{t("telegramDirectAction")}</span>
              </a>

              <button
                type="button"
                onClick={handleRetake}
                className="group inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 px-5 py-4 text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer text-center"
              >
                <span>{t("retakeAction")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
