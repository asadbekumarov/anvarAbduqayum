"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { ApplyForm } from "./ApplyForm";
import { Button } from "@/components/ui/Button";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const t = useTranslations("applyModal");
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset success state whenever modal re-opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={t("title")}
      className="max-w-[480px] p-6 sm:p-7 relative overflow-hidden"
    >
      {/* Top subtle gold accent ray */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-gold/15 blur-2xl pointer-events-none rounded-full" />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border/70 bg-base/60 hover:bg-gold/10 hover:border-gold/50 text-muted hover:text-white transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {isSuccess ? (
        <div className="text-center py-6 sm:py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_24px_rgba(197,168,128,0.25)]">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-white font-medium">
            {t("successMessage") || "Arizangiz qabul qilindi!"}
          </h3>
          <p className="text-xs sm:text-sm text-muted font-light max-w-sm mx-auto leading-relaxed">
            Tez orada mutaxassisimiz siz bilan bog&apos;lanadi va barcha savollaringizga batafsil javob beradi.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="px-8 rounded-lg"
            >
              Yopish
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] font-sans tracking-[0.18em] font-semibold uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              KONSULTATSIYA
            </div>
            <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-white tracking-tight leading-tight">
              {t("title")}
            </h3>
            <p className="text-xs text-muted-light font-light mt-1.5 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <ApplyForm onSuccess={() => setIsSuccess(true)} />
        </div>
      )}
    </Modal>
  );
}
