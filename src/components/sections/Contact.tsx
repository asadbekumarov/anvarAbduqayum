"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface ContactProps {
  onOpenApply?: () => void;
}

export function Contact({ onOpenApply }: ContactProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("contact");

  return (
    <section
      id="kontaktlar"
      aria-label="Kontaktlar"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="12"
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct Channels Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Card */}
            <div className="border border-border p-6 bg-elevated/40 rounded-[2px] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-2">
                  {t("phoneLabel")}
                </span>
                <a
                  href="tel:+998555036100"
                  className="font-serif text-2xl text-white hover:text-gold transition-colors block"
                >
                  +998 55 503 61 00
                </a>
              </div>
              <span className="text-xs text-muted font-light mt-4 block">
                {t("hoursValue")}
              </span>
            </div>

            {/* WhatsApp Card */}
            <div className="border border-border p-6 bg-elevated/40 rounded-[2px] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-2">
                  {t("whatsappLabel")}
                </span>
                <a
                  href="https://wa.me/998909696624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-2xl text-white hover:text-gold transition-colors block"
                >
                  +998 90 969 66 24
                </a>
              </div>
              <span className="text-xs text-muted font-light mt-4 block">
                WhatsApp orqali tezkor muloqot
              </span>
            </div>

            {/* Address Card */}
            <div className="border border-border p-6 bg-elevated/40 rounded-[2px] sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-1">
                  {t("addressLabel")}
                </span>
                <p className="font-serif text-base text-white">
                  {t("addressValue")}
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-muted">
                <a
                  href="https://t.me/Ilxombegimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Telegram
                </a>
                <span>/</span>
                <a
                  href="https://www.instagram.com/ilxom.begimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Instagram
                </a>
                <span>/</span>
                <a
                  href="https://www.youtube.com/@IlxomBegimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Consultation Direct Trigger Card */}
          <div className="lg:col-span-5 border border-gold/40 p-8 sm:p-10 bg-elevated/60 flex flex-col justify-between rounded-[2px]">
            <div className="space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-gold font-medium block">
                USTOZGA SHOGIRD TUSHISH
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                Strategik rivojlanish va tizimli o&apos;sish
              </h3>
              <p className="text-sm text-muted font-light leading-relaxed">
                Kompaniyangiz auditini o&apos;tkazish va shaxsiy konsalting dasturiga yozilish uchun ma&apos;lumotlaringizni qoldiring.
              </p>
            </div>

            <div className="pt-8">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleApply}
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
