"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { applySchema, type ApplyFormData } from "../schemas/applySchema";
import { cn } from "@/lib/utils";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InlineAlert, InlineAlertDescription } from "@/components/ui/inline-alert";
import { Spinner } from "@/components/ui/spinner";

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
      />

      {serverError && (
        <InlineAlert variant="danger" appearance="soft" className="border-red-500/30 bg-red-950/40 text-red-300">
          <InlineAlertDescription className="text-xs">
            {serverError}
          </InlineAlertDescription>
        </InlineAlert>
      )}

      {/* 2-Column Responsive Name & Phone Grid using Create UI Field & Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Ism */}
        <Field invalid={!!errors.name} size="sm">
          <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
            {t("nameLabel")} <span className="text-gold">*</span>
          </FieldLabel>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            disabled={isSubmitting}
          />
          {errors.name && <FieldError className="text-xs text-red-400 font-light">{errors.name}</FieldError>}
        </Field>

        {/* Telefon */}
        <Field invalid={!!errors.phone} size="sm">
          <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
            {t("phoneLabel")} <span className="text-gold">*</span>
          </FieldLabel>
          <Input
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+998 90 123 45 67"
            disabled={isSubmitting}
            className="font-mono"
          />
          {errors.phone && <FieldError className="text-xs text-red-400 font-light">{errors.phone}</FieldError>}
        </Field>
      </div>

      {isBook ? (
        <>
          {/* Yetkazib berish manzili */}
          <Field invalid={!!errors.address} size="sm">
            <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
              {t("addressLabel")} <span className="text-gold">*</span>
            </FieldLabel>
            <Input
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder={t("addressPlaceholder")}
              disabled={isSubmitting}
            />
            {errors.address && (
              <FieldError className="text-xs text-red-400 font-light">
                {errors.address}
              </FieldError>
            )}
          </Field>

          {/* Kitob soni yoki izoh */}
          <Field size="sm">
            <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
              {t("bookNoteLabel")}
            </FieldLabel>
            <Textarea
              rows={2}
              value={formData.question || ""}
              onChange={(e) => handleChange("question", e.target.value)}
              placeholder={t("bookNotePlaceholder")}
              disabled={isSubmitting}
            />
          </Field>
        </>
      ) : (
        <>
          {/* Biznesingiz bormi? (2-button segmented toggle) */}
          <Field invalid={!!errors.business} size="sm">
            <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
              {t("businessLabel")} <span className="text-gold">*</span>
            </FieldLabel>

            {/* 2-Button Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#0D0D0D] border border-[#262626] rounded-lg">
              <button
                type="button"
                onClick={() => handleSelectBusinessOption(true)}
                disabled={isSubmitting}
                className={cn(
                  "py-2 px-3 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-gold",
                  hasBusiness === true
                    ? "bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/50 shadow-[0_0_12px_rgba(197,168,128,0.2)] font-semibold"
                    : "text-muted-light hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    hasBusiness === true ? "bg-gold shadow-[0_0_6px_#C5A880]" : "bg-neutral-600"
                  )}
                />
                <span>{t("yes")}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectBusinessOption(false)}
                disabled={isSubmitting}
                className={cn(
                  "py-2 px-3 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40",
                  hasBusiness === false
                    ? "bg-white/10 text-white border border-white/30 shadow-sm font-semibold"
                    : "text-muted-light hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    hasBusiness === false ? "bg-white/90" : "bg-neutral-600"
                  )}
                />
                <span>{t("no")}</span>
              </button>
            </div>

            {/* Agar 'Ha' bo'lsa, biznes sohasi / kompaniya nomini ixtiyoriy kiritish */}
            {hasBusiness === true && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <Input
                  value={businessDetail}
                  onChange={(e) => handleDetailChange(e.target.value)}
                  placeholder={t("businessDetailPlaceholder")}
                  disabled={isSubmitting}
                  className="text-xs"
                  autoFocus
                />
              </div>
            )}

            {errors.business && (
              <FieldError className="text-xs text-red-400 font-light">{errors.business}</FieldError>
            )}
          </Field>

          {/* Savol / Izoh */}
          <Field size="sm">
            <FieldLabel className="text-xs font-sans uppercase tracking-wider text-muted-light font-medium">
              {t("questionLabel")}
            </FieldLabel>
            <Textarea
              rows={2}
              value={formData.question || ""}
              onChange={(e) => handleChange("question", e.target.value)}
              placeholder={t("questionPlaceholder")}
              disabled={isSubmitting}
            />
          </Field>
        </>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7D3B] hover:brightness-110 active:scale-[0.99] text-[#0A0A0A] font-semibold text-xs tracking-[0.16em] uppercase transition-all shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_25px_rgba(197,168,128,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="xs" variant="inverse" />
              <span>{t("submitting")}</span>
            </div>
          ) : (
            <>
              <span>{isBook ? t("bookSubmit") : t("submit")}</span>
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
