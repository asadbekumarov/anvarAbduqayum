"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
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
          business: formData.business || "Tezkor murojaat formasi",
          service: "Tezkor murojaat (Kontaktlar bo'limi)",
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Arizani yuborishda xatolik yuz berdi.");
        return;
      }

      setIsSuccess(true);
      setFormData({ name: "", phone: "+998", business: "", honeypot: "" });
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
      className="relative bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/50 to-[#0A0A0A] border-t border-white/[0.08] py-24 sm:py-32 overflow-hidden"
    >
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

            <h2 className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-5">
              {t("titlePrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {t("titleHighlight")}
              </span>
            </h2>

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
            <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 mx-auto border border-white/30 flex items-center justify-center text-white font-mono text-lg">
                ✓
              </div>
              <p className="text-sm font-light text-white max-w-sm mx-auto">
                {t("formSuccess")}
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-neutral-300 underline pt-4 cursor-pointer"
              >
                Yana ariza qoldirish
              </button>
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
                className="w-full bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Yuborilmoqda..." : t("formSubmit")}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
