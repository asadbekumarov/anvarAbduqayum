"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { applyFormSchema, ApplyFormData } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const t = useTranslations("applyModal");
  const common = useTranslations("common");

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
    business: "",
    question: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    business?: string;
    question?: string;
    global?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Keyboard and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    nameInputRef.current?.focus();

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Phone input mask for Uzbekistan format: +998 (XX) XXX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Extract only digits
    const digitsOnly = rawValue.replace(/\D/g, "");

    // Ensure it starts with 998
    let numbers = digitsOnly;
    if (!numbers.startsWith("998")) {
      numbers = "998" + numbers;
    }
    numbers = numbers.slice(0, 12); // Maximum 12 digits (998 + 9 digits)

    // Format display string
    let formatted = "+998";
    if (numbers.length > 3) {
      formatted += " (" + numbers.slice(3, 5);
    }
    if (numbers.length >= 5) {
      formatted += ") " + numbers.slice(5, 8);
    }
    if (numbers.length >= 8) {
      formatted += "-" + numbers.slice(8, 10);
    }
    if (numbers.length >= 10) {
      formatted += "-" + numbers.slice(10, 12);
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, global: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Normalize phone number to raw +998XXXXXXXXX for validation
    const rawDigits = formData.phone.replace(/\D/g, "");
    const normalizedPhone = rawDigits.startsWith("998")
      ? `+${rawDigits}`
      : `+998${rawDigits}`;

    const submissionPayload: ApplyFormData = {
      name: formData.name,
      phone: normalizedPhone,
      business: formData.business,
      question: formData.question,
      honeypot: formData.honeypot,
    };

    // 1. Client-side zod validation
    const validation = applyFormSchema.safeParse(submissionPayload);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
        business: fieldErrors.business?.[0],
        question: fieldErrors.question?.[0],
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors({
          global:
            data.error ||
            t("errorMessage") ||
            "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.",
        });
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "+998",
        business: "",
        question: "",
        honeypot: "",
      });
    } catch {
      setErrors({
        global:
          t("errorMessage") ||
          "Internet bilan aloqa uzildi. Iltimos tekshirib qaytadan urinib ko'ring.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full border border-border bg-obsidian p-6 sm:p-10 rounded-[2px] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={common("close")}
          className="absolute top-6 right-6 p-2 text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="space-y-3 mb-8 pr-8">

          <h3
            id="apply-modal-title"
            className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug"
          >
            {t("title")}
          </h3>

          <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="py-8 space-y-6 text-center border-t border-border">
            <div className="w-12 h-12 border border-white/20 mx-auto flex items-center justify-center text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-xl text-white">
                {t("successMessage")}
              </h4>
              <p className="text-xs text-muted font-light">
                Mutaxassislarimiz ish vaqtida siz bilan aloqaga chiqadi.
              </p>
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="mt-4"
            >
              {common("close")}
            </Button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Global Error Banner */}
            {errors.global && (
              <div
                role="alert"
                className="p-3 border border-red-900/60 bg-red-950/20 text-red-400 text-xs rounded-[2px]"
              >
                {errors.global}
              </div>
            )}

            {/* Hidden Honeypot Field for Spambots */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="hp_check">Leave empty</label>
              <input
                id="hp_check"
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {/* 1. Ism (Name) - Underline Style */}
            <div className="space-y-1">
              <label
                htmlFor="apply-name"
                className="text-xs font-sans uppercase tracking-[0.15em] text-muted block"
              >
                {t("nameLabel")} *
              </label>
              <input
                ref={nameInputRef}
                id="apply-name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
                placeholder={t("namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                className={`w-full py-2.5 bg-transparent border-b text-sm text-white placeholder-muted-dark focus:outline-none transition-colors rounded-none ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-white/50"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            {/* 2. Telefon (Phone) - Underline Style with Mask */}
            <div className="space-y-1">
              <label
                htmlFor="apply-phone"
                className="text-xs font-sans uppercase tracking-[0.15em] text-muted block"
              >
                {t("phoneLabel")} *
              </label>
              <input
                id="apply-phone"
                name="phone"
                type="tel"
                required
                disabled={isSubmitting}
                placeholder={t("phonePlaceholder")}
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full py-2.5 bg-transparent border-b text-sm font-mono text-white placeholder-muted-dark focus:outline-none transition-colors rounded-none ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-white/50"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* 3. Biznes sohasi (Business Domain) - Underline Style */}
            <div className="space-y-1">
              <label
                htmlFor="apply-business"
                className="text-xs font-sans uppercase tracking-[0.15em] text-muted block"
              >
                {t("businessLabel")} *
              </label>
              <input
                id="apply-business"
                name="business"
                type="text"
                required
                disabled={isSubmitting}
                placeholder={t("businessPlaceholder")}
                value={formData.business}
                onChange={handleChange}
                className={`w-full py-2.5 bg-transparent border-b text-sm text-white placeholder-muted-dark focus:outline-none transition-colors rounded-none ${
                  errors.business
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-white/50"
                }`}
              />
              {errors.business && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.business}
                </p>
              )}
            </div>

            {/* 4. Savol (Question) - Underline Style */}
            <div className="space-y-1">
              <label
                htmlFor="apply-question"
                className="text-xs font-sans uppercase tracking-[0.15em] text-muted block"
              >
                {t("questionLabel")}
              </label>
              <textarea
                id="apply-question"
                name="question"
                rows={3}
                disabled={isSubmitting}
                placeholder={t("questionPlaceholder")}
                value={formData.question}
                onChange={handleChange}
                className={`w-full py-2.5 bg-transparent border-b text-sm text-white placeholder-muted-dark focus:outline-none transition-colors resize-none rounded-none ${
                  errors.question
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-white/50"
                }`}
              />
              {errors.question && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.question}
                </p>
              )}
            </div>

            {/* Rectangular Submit Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
