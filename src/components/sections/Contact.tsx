"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

export function Contact() {
  const t = useTranslations("contact");
  const applyT = useTranslations("applyModal");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
    companySize: "10–50",
    business: "",
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, "");
    if (!val.startsWith("+998")) {
      val = "+998";
    }
    if (val.length <= 13) {
      setFormData((prev) => ({ ...prev, phone: val }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.name.trim().length < 2) {
      setErrorMessage("Iltimos, ismingizni to'liq kiriting.");
      return;
    }

    if (formData.phone.length < 13) {
      setErrorMessage("Iltimos, to'liq telefon raqamingizni kiriting (+998 ...)");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          companySize: formData.companySize || "10–50",
          business: formData.business || "Tezkor murojaat formasi",
          service: "Tezkor murojaat (Kontaktlar bo'limi)",
          locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Arizani yuborishda xatolik yuz berdi.");
        return;
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "+998",
        companySize: "10–50",
        business: "",
        honeypot: "",
      });
    } catch {
      setErrorMessage("Aloqa xatosi yuz berdi. Internetni tekshirib qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="aloqa"
      aria-label={t("title")}
      className="scroll-mt-20 relative bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/50 to-[#0A0A0A] border-t border-white/[0.08] py-14 sm:py-20 overflow-hidden"
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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-platinum">
                {t("kicker")}
              </span>
            </div>

            {/* H2 Heading with Editorial Masked Reveal */}
            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-5">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </MaskedHeading>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mt-4 max-w-xl">
              {t("description")}
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
                href={`tel:${t("phoneValue").replace(/\s+/g, "")}`}
                className="text-base font-light text-white hover:text-white/80 transition-colors font-mono"
              >
                {t("phoneValue")}
              </a>
            </div>

            {/* Telegram Row */}
            <div className="py-5 border-b border-white/[0.08] flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("telegramLabel")}
              </span>
              <a
                href="https://t.me/Ilxombegimkulov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light text-white hover:text-white/80 transition-colors font-mono"
              >
                {t("telegramValue")}
              </a>
            </div>

            {/* Office Row */}
            <div className="py-5 border-b border-white/[0.08] flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-platinum uppercase tracking-widest shrink-0">
                {t("addressLabel")}
              </span>
              <span className="text-base font-light text-white text-right">
                {t("addressValue")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column — Direct Quick Inquiry Form */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#0F172A]/80 via-[#0B132B]/60 to-[#0A0A0A] border border-white/[0.1] shadow-[0_20px_50px_rgba(7,13,31,0.5)] p-8 sm:p-10 relative z-10">
          <h3 className="font-serif italic text-2xl text-white mb-2">
            {t("formTitle")}
          </h3>
          <p className="text-xs text-platinum-light font-light mb-8">
            {t("formSubtitle")}
          </p>

          {isSuccess ? (
            <div className="py-4 text-left animate-in fade-in duration-300">
              {/* Top Status Indicator */}
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#C5A880] mb-4">
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
                  href="https://t.me/ilhombegimqulov"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  <span>Yana ariza qoldirish</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {errorMessage && (
                <div className="p-3 border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-light">
                  {errorMessage}
                </div>
              )}

              {/* Ism-familiya */}
              <div>
                <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-platinum block mb-2">
                  {t("nameLabel")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder={t("namePlaceholder")}
                  disabled={isSubmitting}
                  className="w-full bg-[#0A0A0A]/70 border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-platinum/50 focus:outline-none transition-colors rounded-none"
                />
              </div>

              {/* Telefon raqami */}
              <div>
                <label htmlFor="contact-phone" className="font-mono text-[10px] uppercase tracking-[0.2em] text-platinum block mb-2">
                  {t("phoneInputLabel")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={isSubmitting}
                  className="w-full bg-[#0A0A0A]/70 border border-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:border-platinum/50 focus:outline-none transition-colors rounded-none font-mono"
                />
              </div>

              {/* B2B Qualification: Kompaniya ko'lami */}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-platinum block mb-2">
                  {applyT("companyScaleLabel")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {[
                    { value: "1–10", sub: applyT("scale1Sub") },
                    { value: "10–50", sub: applyT("scale2Sub") },
                    { value: "50–200+", sub: applyT("scale3Sub") },
                    { value: "Startap", sub: applyT("scale4Sub") },
                  ].map((opt) => {
                    const isSelected = (formData.companySize || "10–50") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, companySize: opt.value }))
                        }
                        className={`py-2 px-2 font-mono text-xs transition-all rounded-none text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                          isSelected
                            ? "bg-[#0B132B]/80 border-[#C5A880] text-[#E2C79D] shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                            : "bg-[#0A0A0A]/70 border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/25"
                        }`}
                      >
                        <span className="font-semibold text-xs tracking-wider">{opt.value}</span>
                        <span className="text-[9px] opacity-70 tracking-normal font-sans">{opt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Biznes sohasi va savol */}
              <div>
                <label htmlFor="contact-business" className="font-mono text-[10px] uppercase tracking-[0.2em] text-platinum block mb-2">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {/* Liquid Sheen */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">{isSubmitting ? "Yuborilmoqda..." : t("formSubmit")}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
