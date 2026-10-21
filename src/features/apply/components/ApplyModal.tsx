"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { ApplyForm } from "./ApplyForm";

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
          aria-label="Yopish"
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
        <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
          <div className="w-14 h-14 mx-auto border border-white/40 flex items-center justify-center text-white font-mono text-xl">
            ✓
          </div>
          <h4 className="font-serif italic text-2xl text-white">
            {isBook ? t("bookSuccessMessage") : t("successMessage")}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
            {isBook
              ? "Tez orada operatorimiz siz bilan bog'lanadi va yetkazib berish tafsilotlarini kelishib oladi."
              : "Tez orada mutaxassisimiz siz bilan bog'lanadi va barcha savollaringizga batafsil javob beradi."}
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 border border-white/[0.12] hover:border-white text-xs font-mono uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#0A0A0A] transition-colors rounded-none cursor-pointer"
            >
              Yopish
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
