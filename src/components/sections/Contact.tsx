"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { contactConfig } from "@/config/contact";
import { formatSectionKicker } from "@/config/sections";
import {
  formatUzbekPhone,
  cleanUzbekPhone,
  isUzbekPhoneComplete,
} from "@/lib/formatPhone";

export function Contact() {
  const t = useTranslations("contact");
  const applyT = useTranslations("applyModal");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    companySize: "10–50",
    business: "",
    honeypot: "",
  });

  const [displayPhone, setDisplayPhone] = useState("+998 ");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzbekPhone(e.target.value);
    setDisplayPhone(formatted);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const errors: { name?: string; phone?: string } = {};

    if (formData.name.trim().length < 2) {
      errors.name = t("nameError");
    }

    if (!isUzbekPhoneComplete(displayPhone)) {
      errors.phone = t("phoneError");
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      setIsSubmitting(true);
      const cleanedPhone = cleanUzbekPhone(displayPhone);

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanedPhone,
          companySize: formData.companySize || "10–50",
          business:
            formData.business.trim() ||
            (locale === "ru"
              ? "Форма быстрого обращения"
              : locale === "en"
              ? "Rapid inquiry form"
              : "Tezkor murojaat formasi"),
          service:
            locale === "ru"
              ? "Быстрое обращение (Раздел контактов)"
              : locale === "en"
              ? "Rapid inquiry (Contact section)"
              : "Tezkor murojaat (Kontaktlar bo'limi)",
          locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.error || "Arizani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
        return;
      }

      setIsSuccess(true);
      // Success holatida forma tozalanishi mumkin
      setFormData({
        name: "",
        companySize: "10–50",
        business: "",
        honeypot: "",
      });
      setDisplayPhone("+998 ");
    } catch {
      setErrorMessage(
        "Aloqa xatosi yuz berdi. Internetni tekshirib qayta urinib ko'ring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeAddress =
    locale === "ru"
      ? contactConfig.office.addressRu
      : locale === "en"
      ? contactConfig.office.addressEn
      : contactConfig.office.addressUz;

  return (
    <section
      id="aloqa"
      aria-label={t("title")}
      className="scroll-mt-20 relative bg-gradient-to-b from-[#0A0A0A] via-[#0D1017] to-[#0A0A0A] border-t border-white/[0.08] py-16 sm:py-24 pb-28 sm:pb-32 overflow-hidden"
    >
      {/* Anchor aliases */}
      <span id="kontakt" className="absolute -top-24 pointer-events-none" />
      <span id="kontaktlar" className="absolute -top-24 pointer-events-none" />

      {/* Subtle midnight navy atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#0B132B]/50 blur-[140px] rounded-full"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        {/* Left Column — Editorial Details & Direct Ledger */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
                {formatSectionKicker("contact", t("kicker"))}
              </span>
            </div>

            {/* H2 Heading with Editorial Masked Reveal */}
            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-5">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </MaskedHeading>

            {/* TODO(confirm): Aniq manzil/xarita tasdiqlanmaguncha "tashrif buyuring" jumlasi yashirilgan (contactConfig.office.hasExactAddress: false) */}
            <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed mt-4 max-w-xl">
              {contactConfig.office.hasExactAddress ? t("description") : t("descriptionDirect")}
            </p>
          </div>

          {/* Contact Ledger */}
          <div className="border-t border-white/[0.08] mt-8">
            {/* Phone Row */}
            <div className="py-5 border-b border-white/[0.08] flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("phoneLabel")}
              </span>
              <a
                href={contactConfig.phone.href}
                aria-label={contactConfig.phone.ariaLabel}
                className="text-base font-light text-white hover:text-white/80 transition-colors font-mono"
              >
                {contactConfig.phone.display}
              </a>
            </div>

            {/* Telegram Channel Row (News & Updates) */}
            <div className="py-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("telegramChannelLabel")}
              </span>
              <a
                href={contactConfig.telegramChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contactConfig.telegramChannel.ariaLabel}
                className="text-base font-light text-white hover:text-[#E2C79D] transition-colors font-mono"
              >
                {contactConfig.telegramChannel.display}
              </a>
            </div>

            {/* Telegram Direct Row (Personal direct chat) */}
            <div className="py-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("telegramDirectLabel")}
              </span>
              <a
                href={contactConfig.telegramDirect.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contactConfig.telegramDirect.ariaLabel}
                className="text-base font-light text-white hover:text-[#E2C79D] transition-colors font-mono"
              >
                {contactConfig.telegramDirect.display}
              </a>
            </div>

            {/* Office Row */}
            <div className="py-5 border-b border-white/[0.08] flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("addressLabel")}
              </span>
              <span className="text-base font-light text-white text-right">
                {officeAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column — Direct Quick Inquiry Form */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#0F172A]/80 via-[#0B132B]/60 to-[#0A0A0A] border border-white/[0.1] shadow-[0_20px_50px_rgba(7,13,31,0.5)] p-8 sm:p-10 relative z-10">
          <h3 className="font-serif italic text-2xl text-white mb-2">
            {t("formTitle")}
          </h3>

          {/* TODO(confirm): "15 daqiqada aloqaga chiqamiz" va "100% maxfiylik" matnlari rasmiy xizmat ko'rsatish reglamenti (SLA) bo'yicha tasdiqlansin */}
          <p className="text-xs text-platinum-light font-light mb-8">
            {t("formSubtitle")}
          </p>

          {isSuccess ? (
            <div className="py-4 text-left animate-in fade-in duration-300">
              {/* Top Status Indicator */}
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                <span>{applyT("thankYouBadge")}</span>
              </div>

              {/* Headline */}
              <h4 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
                {applyT("thankYouTitle")}
              </h4>

              {/* Body Copy */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {applyT("thankYouBody")}
              </p>

              {/* What Happens Next (3-Step Mini Timeline) */}
              <div className="border-t border-b border-white/[0.08] py-4 mb-6 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-[#C5A880] shrink-0 font-bold">{applyT("timelineStep1Prefix")}</span>
                  <span className="text-neutral-300">{applyT("timelineStep1Text")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#94A3B8] shrink-0 font-bold">{applyT("timelineStep2Prefix")}</span>
                  <span className="text-neutral-400">{applyT("timelineStep2Text")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#94A3B8] shrink-0 font-bold">{applyT("timelineStep3Prefix")}</span>
                  <span className="text-neutral-400">{applyT("timelineStep3Text")}</span>
                </div>
              </div>

              {/* Value-Add Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={contactConfig.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={contactConfig.telegram.ariaLabel}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C5A880]/60 hover:border-[#C5A880] bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-[#E2C79D] hover:text-white font-mono text-xs uppercase tracking-[0.14em] transition-all rounded-none"
                >
                  <span>{applyT("actionTelegram")}</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/[0.12] hover:border-white/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-[0.14em] transition-all rounded-none cursor-pointer"
                >
                  <span>{t("submitAnother")}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Anti-spam honeypot (Spamdan himoya) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website" className="sr-only">
                  Website (leave blank)
                </label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error Alert with Retry button — user data is preserved */}
              {errorMessage && (
                <div
                  role="alert"
                  id="contact-form-error"
                  className="p-3.5 border border-red-500/40 bg-red-950/30 text-red-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="self-start sm:self-auto shrink-0 px-3 py-1.5 border border-red-400/50 hover:border-red-400 bg-red-900/40 hover:bg-red-900/70 text-red-100 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {t("retry")}
                  </button>
                </div>
              )}

              {/* Ism-familiya */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-300 block mb-2"
                >
                  {t("nameLabel")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder={t("namePlaceholder")}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={
                    fieldErrors.name
                      ? "contact-name-error"
                      : errorMessage
                      ? "contact-form-error"
                      : undefined
                  }
                  className={`w-full bg-[#0A0A0A]/70 border px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors rounded-none ${
                    fieldErrors.name
                      ? "border-red-500 focus:border-red-400"
                      : "border-white/[0.12] focus:border-platinum/50"
                  }`}
                />
                {fieldErrors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-1.5 text-xs text-red-400 font-light flex items-center gap-1.5"
                  >
                    <span aria-hidden="true">⚠</span>
                    <span>{fieldErrors.name}</span>
                  </p>
                )}
              </div>

              {/* Telefon raqami (+998 (XX) XXX-XX-XX maskasi) */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-300 block mb-2"
                >
                  {t("phoneInputLabel")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={displayPhone}
                  onChange={handlePhoneChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={
                    fieldErrors.phone
                      ? "contact-phone-error"
                      : errorMessage
                      ? "contact-form-error"
                      : undefined
                  }
                  placeholder="+998 (90) 123-45-67"
                  className={`w-full bg-[#0A0A0A]/70 border px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors rounded-none font-mono ${
                    fieldErrors.phone
                      ? "border-red-500 focus:border-red-400"
                      : "border-white/[0.12] focus:border-platinum/50"
                  }`}
                />
                {fieldErrors.phone && (
                  <p
                    id="contact-phone-error"
                    className="mt-1.5 text-xs text-red-400 font-light flex items-center gap-1.5"
                  >
                    <span aria-hidden="true">⚠</span>
                    <span>{fieldErrors.phone}</span>
                  </p>
                )}
              </div>

              {/* B2B Qualification: Kompaniya hajmi variantlari (Startap / Yangi loyiha bir xil tuzilishda) */}
              <div>
                <span
                  id="contact-scale-label"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-300 block mb-2"
                >
                  {applyT("companyScaleLabel")}
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="contact-scale-label"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2"
                >
                  {[
                    { value: "1–10", title: "1–10", sub: applyT("scale1Sub") },
                    { value: "10–50", title: "10–50", sub: applyT("scale2Sub") },
                    { value: "50–200+", title: "50–200+", sub: applyT("scale3Sub") },
                    { value: "Startap", title: "Startap", sub: applyT("scale4Sub") },
                  ].map((opt) => {
                    const isSelected = (formData.companySize || "10–50") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, companySize: opt.value }))
                        }
                        disabled={isSubmitting}
                        className={`min-h-[52px] py-2 px-2 font-mono text-xs transition-all rounded-none text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                          isSelected
                            ? "bg-[#0B132B] border-[#C5A880] text-[#E2C79D] shadow-[0_0_15px_rgba(197,168,128,0.2)] ring-1 ring-[#C5A880]/60"
                            : "bg-[#0A0A0A]/80 border-white/[0.12] text-neutral-300 hover:text-white hover:border-white/30"
                        }`}
                      >
                        <span className="font-semibold text-xs tracking-wider">{opt.title}</span>
                        <span className="text-[11px] opacity-80 tracking-normal font-sans text-center leading-tight">
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Biznes sohasi va savol */}
              <div>
                <label
                  htmlFor="contact-business"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-300 block mb-2"
                >
                  {t("businessInputLabel")}
                </label>
                <textarea
                  id="contact-business"
                  rows={3}
                  value={formData.business}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, business: e.target.value }))
                  }
                  placeholder={t("businessInputPlaceholder")}
                  disabled={isSubmitting}
                  className="w-full bg-[#0A0A0A]/70 border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-platinum/50 focus:outline-none transition-colors rounded-none resize-none"
                />
              </div>

              {/* Submit Button with Spinner & Disabled State */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-none mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(197,168,128,0.25)]"
              >
                {/* Liquid Sheen */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                {isSubmitting ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-[#0A0A0A]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>{applyT("submitting")}</span>
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{t("formSubmit")}</span>
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
