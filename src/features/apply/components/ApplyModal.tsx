"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { ApplyForm } from "./ApplyForm";
import { contactConfig } from "@/config/contact";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string | null;
}

export function ApplyModal({
  isOpen,
  onClose,
  selectedService,
}: ApplyModalProps) {
  const t = useTranslations("applyModal");
  const commonT = useTranslations("common");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  const isBook = Boolean(
    selectedService?.toLowerCase().includes("kitob") ||
    selectedService?.toLowerCase().includes("книга") ||
    selectedService?.toLowerCase().includes("book") ||
    selectedService?.toLowerCase().includes("shpargalka") ||
    selectedService?.toLowerCase().includes("шпаргалка")
  );

  const modalTitle = isBook
    ? t("bookTitle") || "«Biznes shpargalkasi» kitobi"
    : selectedService
    ? `${selectedService} — ${t("title")}`
    : t("title");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={modalTitle}
      className="!max-w-lg w-full p-8 sm:p-10 relative bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#0A0A0A] border border-white/[0.12] rounded-none shadow-[0_30px_70px_rgba(7,13,31,0.85)]"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.08]">
        <h3 className="font-serif italic text-2xl text-white">
          {modalTitle}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label={commonT("close")}
          className="font-mono text-xl text-platinum hover:text-white transition-colors p-1 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Dynamic Context Badge */}
      {selectedService && (
        <div className="bg-[#0B132B]/60 border-l-2 border-platinum/60 px-4 py-2.5 mb-6 font-mono text-xs text-white">
          <span className="text-platinum mr-2">{t("selectedPrefix")}</span>
          {selectedService}
        </div>
      )}

      {isSuccess ? (
        <div className="py-2 text-left animate-in fade-in duration-300">
          {/* Top Status Indicator */}
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span>{t("thankYouBadge")}</span>
          </div>

          {/* Headline */}
          <h4 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
            {isBook ? t("bookSuccessMessage") : t("thankYouTitle")}
          </h4>

          {/* Body Copy */}
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
            {isBook ? t("bookSuccessBody") : t("thankYouBody")}
          </p>

          {/* What Happens Next (3-Step Mini Timeline inside Thank You screen) */}
          <div className="border-t border-b border-white/[0.08] py-4 mb-6 space-y-3 font-mono text-xs">
            <div className="flex items-start gap-2">
              <span className="text-[#C5A880] shrink-0 font-bold">{t("timelineStep1Prefix")}</span>
              <span className="text-neutral-300">{t("timelineStep1Text")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#94A3B8] shrink-0 font-bold">{t("timelineStep2Prefix")}</span>
              <span className="text-neutral-400">{t("timelineStep2Text")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#94A3B8] shrink-0 font-bold">{t("timelineStep3Prefix")}</span>
              <span className="text-neutral-400">{t("timelineStep3Text")}</span>
            </div>
          </div>

          {/* Value-Add Action (Replaces PDF Lead Magnet) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={contactConfig.telegramChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contactConfig.telegramChannel.ariaLabel}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C5A880]/60 hover:border-[#C5A880] bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-[#E2C79D] hover:text-white font-mono text-xs uppercase tracking-[0.14em] transition-all rounded-none"
            >
              <span>{t("actionTelegram")}</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                const el = document.getElementById("natijalar");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/[0.12] hover:border-white/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-[0.14em] transition-all rounded-none cursor-pointer"
            >
              <span>{t("actionWebinars")}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ApplyForm
            onSuccess={() => setIsSuccess(true)}
            selectedService={selectedService}
            isBook={isBook}
          />
        </div>
      )}
    </Modal>
  );
}
