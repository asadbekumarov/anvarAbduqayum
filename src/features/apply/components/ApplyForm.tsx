"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { applySchema, type ApplyFormData } from "../schemas/applySchema";
import { cn } from "@/lib/utils";

interface ApplyFormProps {
  onSuccess: () => void;
}

export function ApplyForm({ onSuccess }: ApplyFormProps) {
  const t = useTranslations("applyModal");

  const [formData, setFormData] = useState<ApplyFormData>({
    name: "",
    phone: "+998",
    business: "",
    question: "",
    honeypot: "",
  });

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
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Honeypot anti-spam field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot || ""}
        onChange={(e) => handleChange("honeypot", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {serverError && (
        <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-lg">
          {serverError}
        </div>
      )}

      {/* 2-Column Responsive Name & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Ism */}
        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-muted-light mb-1.5 font-medium">
            {t("nameLabel")} <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            disabled={isSubmitting}
            className="w-full bg-[#0A0A0A] border border-[#262626] hover:border-[#383838] focus:border-gold focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 text-sm text-white placeholder:text-muted/60 transition-all rounded-lg outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400 font-light">{errors.name}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-muted-light mb-1.5 font-medium">
            {t("phoneLabel")} <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+998 90 123 45 67"
            disabled={isSubmitting}
            className="w-full bg-[#0A0A0A] border border-[#262626] hover:border-[#383838] focus:border-gold focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 text-sm text-white placeholder:text-muted/60 font-mono transition-all rounded-lg outline-none"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400 font-light">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Biznes sohasi / holati */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-muted-light mb-1.5 font-medium">
          {t("businessLabel")} <span className="text-gold">*</span>
        </label>
        
        {/* Quick selection pills */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            type="button"
            onClick={() => handleChange("business", "Ha, biznesim bor")}
            className={cn(
              "py-2 px-3 text-xs rounded-lg border transition-all text-center font-medium",
              formData.business.includes("Ha")
                ? "border-gold bg-gold/15 text-gold font-semibold shadow-[0_0_12px_rgba(197,168,128,0.2)]"
                : "border-[#262626] bg-[#0A0A0A] text-muted-light hover:border-[#383838] hover:text-white"
            )}
          >
            Ha, biznesim bor
          </button>
          <button
            type="button"
            onClick={() => handleChange("business", "Yo'q, yangi boshlayapman")}
            className={cn(
              "py-2 px-3 text-xs rounded-lg border transition-all text-center font-medium",
              formData.business.includes("Yo'q")
                ? "border-gold bg-gold/15 text-gold font-semibold shadow-[0_0_12px_rgba(197,168,128,0.2)]"
                : "border-[#262626] bg-[#0A0A0A] text-muted-light hover:border-[#383838] hover:text-white"
            )}
          >
            Yo&apos;q, yangi boshlayapman
          </button>
        </div>

        {/* Custom text input if user wants to specify company or sector */}
        <input
          type="text"
          value={formData.business}
          onChange={(e) => handleChange("business", e.target.value)}
          placeholder="Yoki biznes sohasi/kompaniya nomini yozing..."
          disabled={isSubmitting}
          className="w-full bg-[#0A0A0A] border border-[#262626] hover:border-[#383838] focus:border-gold focus:ring-1 focus:ring-gold/30 px-3.5 py-2 text-xs text-white placeholder:text-muted/50 transition-all rounded-lg outline-none"
        />
        {errors.business && (
          <p className="mt-1 text-xs text-red-400 font-light">{errors.business}</p>
        )}
      </div>

      {/* Savol / Izoh */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-muted-light mb-1.5 font-medium">
          {t("questionLabel")}
        </label>
        <textarea
          rows={2}
          value={formData.question || ""}
          onChange={(e) => handleChange("question", e.target.value)}
          placeholder={t("questionPlaceholder")}
          disabled={isSubmitting}
          className="w-full bg-[#0A0A0A] border border-[#262626] hover:border-[#383838] focus:border-gold focus:ring-1 focus:ring-gold/30 p-3 text-sm text-white placeholder:text-muted/60 transition-all resize-none rounded-lg outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7D3B] hover:brightness-110 active:scale-[0.99] text-[#0A0A0A] font-semibold text-xs tracking-[0.16em] uppercase transition-all shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_25px_rgba(197,168,128,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{t("submitting")}</span>
            </div>
          ) : (
            <>
              <span>{t("submit")}</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-dark font-light mt-2.5">
          <svg className="w-3.5 h-3.5 text-gold/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Ma&apos;lumotlaringiz xavfsizligi 100% kafolatlanadi</span>
        </div>
      </div>
    </form>
  );
}
