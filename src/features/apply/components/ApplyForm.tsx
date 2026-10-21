"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { applySchema, type ApplyFormData } from "../schemas/applySchema";

interface ApplyFormProps {
  onSuccess: () => void;
  selectedService?: string | null;
  isBook?: boolean;
}

export function ApplyForm({ onSuccess, selectedService, isBook }: ApplyFormProps) {
  const t = useTranslations("applyModal");

  const [formData, setFormData] = useState<ApplyFormData>({
    name: "",
    phone: "+998",
    business: "",
    address: "",
    question: "",
    service: selectedService || undefined,
    honeypot: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const [hasBusiness, setHasBusiness] = useState<boolean | null>(null);
  const [businessDetail, setBusinessDetail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, "");
    if (!value.startsWith("+998")) {
      value = "+998";
    }
    if (value.length <= 13) {
      setFormData((prev) => ({ ...prev, phone: value }));
      if (errors.phone) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      }
    }
  };

  const handleChange = (field: keyof ApplyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSelectBusinessOption = (hasBiz: boolean) => {
    setHasBusiness(hasBiz);
    if (hasBiz) {
      const text = businessDetail.trim() ? `${t("yes")}: ${businessDetail.trim()}` : t("yes");
      handleChange("business", text);
    } else {
      setBusinessDetail("");
      handleChange("business", t("no"));
    }
  };

  const handleDetailChange = (detail: string) => {
    setBusinessDetail(detail);
    const text = detail.trim() ? `${t("yes")}: ${detail.trim()}` : t("yes");
    handleChange("business", text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = applySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setServerError(
          data.error || "Arizani yuborishda xatolik yuz berdi. Iltimos qayta urinib ko'ring."
        );
        return;
      }

      onSuccess();
    } catch {
      setServerError("Tarmoqda xatolik yuz berdi. Internet aloqasini tekshiring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot anti-spam field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot || ""}
        onChange={(e) => handleChange("honeypot", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {serverError && (
        <div className="p-3 border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-light">
          {serverError}
        </div>
      )}

      {/* 2-Column Responsive Name & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Ism */}
        <div>
          <label htmlFor="apply-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
            {t("nameLabel")} <span className="text-neutral-500">*</span>
          </label>
          <input
            id="apply-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            disabled={isSubmitting}
            className="w-full bg-[#111111] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none"
          />
          {errors.name && (
            <span className="text-[11px] text-red-400 font-mono mt-1 block">
              {errors.name}
            </span>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="apply-phone" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
            {t("phoneLabel")} <span className="text-neutral-500">*</span>
          </label>
          <input
            id="apply-phone"
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+998 90 123 45 67"
            disabled={isSubmitting}
            className="w-full bg-[#111111] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none font-mono"
          />
          {errors.phone && (
            <span className="text-[11px] text-red-400 font-mono mt-1 block">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      {isBook ? (
        <>
          {/* Yetkazib berish manzili */}
          <div>
            <label htmlFor="apply-address" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              {t("addressLabel")} <span className="text-neutral-500">*</span>
            </label>
            <input
              id="apply-address"
              type="text"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder={t("addressPlaceholder")}
              disabled={isSubmitting}
              className="w-full bg-[#111111] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none"
            />
            {errors.address && (
              <span className="text-[11px] text-red-400 font-mono mt-1 block">
                {errors.address}
              </span>
            )}
          </div>

          {/* Kitob soni yoki izoh */}
          <div>
            <label htmlFor="apply-book-note" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              {t("bookNoteLabel")}
            </label>
            <textarea
              id="apply-book-note"
              rows={2}
              value={formData.question || ""}
              onChange={(e) => handleChange("question", e.target.value)}
              placeholder={t("bookNotePlaceholder")}
              disabled={isSubmitting}
              className="w-full bg-[#111111] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none resize-none"
            />
          </div>
        </>
      ) : (
        <>
          {/* Biznesingiz bormi? (Architectural Joined 2-button toggle) */}
          <div>
            <label htmlFor="apply-business" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              {t("businessLabel")} <span className="text-neutral-500">*</span>
            </label>

            <div className="grid grid-cols-2 border border-white/[0.12] divide-x divide-white/[0.12]">
              <button
                type="button"
                onClick={() => handleSelectBusinessOption(true)}
                disabled={isSubmitting}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-[0.18em] transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer ${
                  hasBusiness === true
                    ? "bg-white text-[#0A0A0A] font-medium"
                    : "bg-[#111111] text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{t("yes")}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectBusinessOption(false)}
                disabled={isSubmitting}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-[0.18em] transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer ${
                  hasBusiness === false
                    ? "bg-white text-[#0A0A0A] font-medium"
                    : "bg-[#111111] text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{t("no")}</span>
              </button>
            </div>

            {/* Agar 'Ha' bo'lsa, biznes sohasi / kompaniya nomi kiritish */}
            {hasBusiness === true && (
              <div className="mt-2.5 animate-in fade-in duration-200">
                <input
                  type="text"
                  value={businessDetail}
                  onChange={(e) => handleDetailChange(e.target.value)}
                  placeholder={t("businessDetailPlaceholder")}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/[0.12] px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none"
                  autoFocus
                />
              </div>
            )}

            {errors.business && (
              <span className="text-[11px] text-red-400 font-mono mt-1 block">
                {errors.business}
              </span>
            )}
          </div>

          {/* Savol / Izoh */}
          <div>
            <label htmlFor="apply-question" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-2">
              {t("questionLabel")}
            </label>
            <textarea
              id="apply-question"
              rows={2}
              value={formData.question || ""}
              onChange={(e) => handleChange("question", e.target.value)}
              placeholder={t("questionPlaceholder")}
              disabled={isSubmitting}
              className="w-full bg-[#111111] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none transition-colors rounded-none resize-none"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{t("submitting")}</span>
          ) : (
            <>
              <span>{isBook ? t("bookSubmit") : t("submit")}</span>
              <span>→</span>
            </>
          )}
        </button>

        {/* Security badge */}
        <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-center mt-3">
          100% MAXFIYLIK KAFOLATLANADI
        </p>
      </div>
    </form>
  );
}
