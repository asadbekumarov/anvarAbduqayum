"use client";

import React from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { activeBookingMode } from "@/config/booking";
import { contactConfig } from "@/config/contact";

const CalcomBookingWidget = dynamic(() => import("./CalcomBookingWidget"), {
  ssr: false,
  loading: () => null,
});

function TelegramBookingHandoff() {
  const t = useTranslations("booking");

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Concept 3 Editorial Header */}
      <header className="mb-8 sm:mb-10 pb-8 border-b border-[var(--border-hairline-editorial)] max-w-4xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[13px] font-medium text-[var(--accent-gold-ink)]">
            07.A
          </span>
          <span className="text-[13.5px] font-semibold text-[var(--accent-gold-ink)]">
            {t("handoffKicker")}
          </span>
        </div>

        <h1 className="font-serif text-[clamp(30px,4.2vw,52px)] text-[var(--text-ink)] font-semibold tracking-[-0.02em] leading-[1.09] [overflow-wrap:break-word] [text-wrap:balance]">
          {t("handoffTitle")}
        </h1>

        <p className="mt-4 text-[16.5px] sm:text-[17px] text-[var(--text-soft-editorial)] font-normal leading-[1.65] max-w-[60ch] [text-wrap:pretty]">
          {t("handoffDescription")}
        </p>

        {/* Verified Official Channel Ledger (No Unconfirmed Commercial Promises) */}
        <dl className="mt-6 pt-5 border-t border-[var(--border-hairline-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <dt className="text-[12.5px] font-medium text-[var(--text-muted-aa)]">
              {t("handoffChannelLabel")}
            </dt>
            <dd className="text-[15px] font-semibold text-[var(--text-ink)] mt-0.5 font-mono">
              {t("handoffChannelValue")}
            </dd>
          </div>
          <div>
            <dt className="text-[12.5px] font-medium text-[var(--text-muted-aa)]">
              {t("handoffPhoneLabel")}
            </dt>
            <dd className="text-[15px] font-semibold text-[var(--text-ink)] mt-0.5 tabular-nums">
              {contactConfig.phone.display}
            </dd>
          </div>
        </dl>
      </header>

      {/* Concept 3 Obsidian Architectural Handoff Panel */}
      <section
        aria-labelledby="telegram-handoff-title"
        className="w-full border border-[var(--border-on-dark)] border-t-2 border-t-[var(--accent-gold-light)] bg-[var(--bg-dark)] text-[var(--text-on-dark)] rounded-[2px] shadow-[var(--shadow-editorial-card)] p-6 sm:p-10 lg:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
            <h2
              id="telegram-handoff-title"
              className="font-serif text-[clamp(24px,3vw,34px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[var(--text-on-dark)] [text-wrap:balance]"
            >
              {t("handoffPanelTitle")}
            </h2>

            <p className="text-[16px] leading-[1.68] text-[var(--text-muted-on-dark)] max-w-[54ch] [text-wrap:pretty]">
              {t("handoffPanelBody")}
            </p>

            <p className="text-[14px] leading-[1.55] text-[var(--text-muted-on-dark)] border-l-2 border-[var(--accent-gold-light)] pl-4 mt-1">
              {t("handoffNote")}
            </p>
          </div>

          <aside
            aria-label={t("handoffAdminLabel")}
            className="lg:col-span-5 bg-[var(--bg-dark-elevated)] border border-[var(--border-on-dark)] rounded-[2px] p-6 sm:p-8 flex flex-col gap-4 min-w-0"
          >
            <div className="pb-4 border-b border-[var(--border-on-dark-subtle)]">
              <p className="text-[13px] font-medium text-[var(--accent-gold-light)]">
                {t("handoffAdminLabel")}
              </p>
              <p className="mt-1 font-mono text-[16px] font-semibold text-[var(--text-on-dark)] [overflow-wrap:anywhere]">
                {contactConfig.telegramDirect.display}
              </p>
              <p className="mt-1 text-[13.5px] font-mono text-[var(--text-muted-on-dark)] [overflow-wrap:anywhere]">
                {contactConfig.telegramDirect.url}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <a
                href={contactConfig.telegramDirect.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full inline-flex items-center justify-center gap-3 bg-[var(--bg-surface)] hover:bg-[var(--accent-gold-light)] text-[var(--text-ink)] px-6 py-3 rounded-[2px] text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .39z" />
                </svg>
                <span>{t("handoffPrimaryCta")}</span>
              </a>

              <a
                href={contactConfig.phone.href}
                className="min-h-[48px] w-full inline-flex items-center justify-center gap-2.5 bg-transparent hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] px-6 py-3 rounded-[2px] text-[14.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
              >
                <svg
                  className="w-4 h-4 text-[var(--accent-gold-light)] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="tabular-nums">
                  {t("handoffSecondaryCta")}: {contactConfig.phone.display}
                </span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export function BookingView() {
  if (activeBookingMode === "calcom") {
    return <CalcomBookingWidget />;
  }

  return <TelegramBookingHandoff />;
}
