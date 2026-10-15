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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Direct Channels Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Phone Card */}
            <div className="border border-border p-4.5 sm:p-6 bg-elevated/40 rounded-[2px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-2">
                  {t("phoneLabel")}
                </span>
                <a
                  href="tel:+998555036100"
                  className="font-serif text-lg xs:text-xl sm:text-2xl text-white hover:text-gold transition-colors block break-words"
                >
                  +998 55 503 61 00
                </a>
              </div>
              <span className="text-xs text-muted font-light mt-3 sm:mt-4 block">
                {t("hoursValue")}
              </span>
            </div>

            {/* WhatsApp Card */}
            <div className="border border-border p-4.5 sm:p-6 bg-elevated/40 rounded-[2px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-2">
                  {t("whatsappLabel")}
                </span>
                <a
                  href="https://wa.me/998909696624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg xs:text-xl sm:text-2xl text-white hover:text-gold transition-colors block break-words"
                >
                  +998 90 969 66 24
                </a>
              </div>
              <span className="text-xs text-muted font-light mt-3 sm:mt-4 block">
                WhatsApp orqali tezkor muloqot
              </span>
            </div>

            {/* Address Card */}
            <div className="border border-border p-4.5 sm:p-6 bg-elevated/40 rounded-[2px] sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted block mb-1">
                  {t("addressLabel")}
                </span>
                <p className="font-serif text-base text-white">
                  {t("addressValue")}
                </p>
              </div>
              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
                <a
                  href="https://t.me/Ilxombegimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-10 h-10 rounded-full border border-border bg-base/80 hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                  title="Telegram: @Ilxombegimkulov"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.6 4.7 3.9 11.1c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.4.8.8.8.3 0 .5-.1.8-.4l2.3-2.2 4.7 3.5c.9.5 1.5.3 1.7-.8l3-14.1c.3-1.2-.5-1.7-1.3-.9Zm-11.9 8.7 9.7-6.1c.5-.3.9-.1.5.2l-8.3 7.5-.3 3.1-1.6-4.7Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ilxom.begimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-border bg-base/80 hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                  title="Instagram: @ilxom.begimkulov"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@IlxomBegimkulov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full border border-border bg-base/80 hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                  title="YouTube: @IlxomBegimkulov"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.1 5.6 12 5.6 12 5.6s-5.1 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.5 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.8.5 6.9.5 6.9.5s5.1 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-3.8 31 31 0 0 0-.5-3.8ZM10.1 15.1V8.9l5.4 3.1-5.4 3.1Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Consultation Direct Trigger Card */}
          <div className="lg:col-span-5 border border-gold/40 p-5 sm:p-8 lg:p-10 bg-elevated/60 flex flex-col justify-between rounded-[2px]">
            <div className="space-y-3 sm:space-y-4">
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
