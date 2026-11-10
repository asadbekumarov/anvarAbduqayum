"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { getVerifiedCalLink } from "@/config/booking";
import { contactConfig } from "@/config/contact";

// Dynamically import Cal embed with ssr: false to avoid window/document reference issues during SSR
const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => null,
});

/**
 * Preserved Cal.com booking widget for future reactivation.
 * Mounted exclusively when activeBookingMode === "calcom" with a verified NEXT_PUBLIC_CAL_LINK.
 */
export default function CalcomBookingWidget() {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const calLink = getVerifiedCalLink();
  const directBookingUrl = calLink ? `https://app.cal.com/${calLink}` : "";

  // Cal.com does not currently support 'uz' (Uzbek).
  // For 'uz' users, we provide 'ru' in the calendar embed as the regional secondary language,
  // while our entire website chrome and texts strictly stay in Uzbek.
  const embedLocale = locale === "en" ? "en" : "ru";

  useEffect(() => {
    if (!calLink) {
      setHasError(true);
      return;
    }

    let isMounted = true;
    let isWidgetReady = false;

    (async function initCal() {
      try {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi();
        if (!isMounted) return;

        // Configure theme, brand color token (#D4AF37), and layout
        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#D4AF37",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        // Listen for successful booking events
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            if (isMounted) setIsBooked(true);
          },
        });

        cal("on", {
          action: "bookingSuccessfulV2",
          callback: () => {
            if (isMounted) setIsBooked(true);
          },
        });

        // Trigger skeleton dismissal only when embed actually reaches ready state
        cal("on", {
          action: "linkReady",
          callback: () => {
            isWidgetReady = true;
            if (isMounted) setIsLoaded(true);
          },
        });

        // Transition to localized fallback if Cal reports an embed failure
        cal("on", {
          action: "linkFailed",
          callback: () => {
            if (isMounted) setHasError(true);
          },
        });
      } catch (err) {
        console.error("[Cal Embed Init Error]", err);
        if (isMounted) setHasError(true);
      }
    })();

    // Fallback timeout: verify rendered iframe visibility instead of revealing a blank box
    const timer = setTimeout(() => {
      if (!isMounted || isWidgetReady) return;
      const inlineEl = document.querySelector("cal-inline");
      const iframeEl = document.querySelector<HTMLIFrameElement>("iframe.cal-embed");
      const iframeReady =
        inlineEl?.getAttribute("loading") === "done" ||
        (iframeEl !== null &&
          getComputedStyle(iframeEl).visibility === "visible" &&
          iframeEl.getBoundingClientRect().height > 300);

      if (iframeReady) {
        setIsLoaded(true);
      } else {
        setHasError(true);
      }
    }, 12000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [calLink]);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Concept 3 Editorial Header Section */}
      <header className="mb-8 sm:mb-10 pb-8 border-b border-[var(--border-hairline-editorial)] max-w-4xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[13px] font-medium text-[var(--accent-gold-ink)]">
            07.A
          </span>
          <span className="text-[13.5px] font-semibold text-[var(--accent-gold-ink)]">
            {t("kicker")}
          </span>
        </div>

        <h1 className="font-serif text-[clamp(30px,4.2vw,52px)] text-[var(--text-ink)] font-semibold tracking-[-0.02em] leading-[1.09] [overflow-wrap:break-word] [text-wrap:balance]">
          {t("title")}
        </h1>

        <p className="mt-4 text-[16.5px] sm:text-[17px] text-[var(--text-soft-editorial)] font-normal leading-[1.65] max-w-[60ch] [text-wrap:pretty]">
          {t("description")}
        </p>
      </header>

      {/* Booking Success Notification Banner */}
      {isBooked && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-6 sm:p-8 bg-[var(--bg-surface-warm)] border border-[var(--status-success-border)] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="w-10 h-10 rounded-[2px] bg-[var(--status-success-wash)] border border-[var(--status-success-border)] flex items-center justify-center text-[var(--status-success-ink)] shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-[20px] font-semibold text-[var(--status-success-ink)] mb-1">
              {t("successTitle")}
            </h2>
            <p className="text-[15px] text-[var(--text-soft-editorial)] leading-[1.6]">
              {t("successMessage")}
            </p>
          </div>
        </div>
      )}

      {/* Obsidian Architectural Frame for Dark Cal.com Calendar */}
      <div className="relative w-full border border-[var(--border-on-dark)] border-t-2 border-t-[var(--accent-gold-light)] bg-[var(--bg-dark)] text-[var(--text-on-dark)] rounded-[2px] shadow-[var(--shadow-editorial-card)] overflow-hidden p-1.5 sm:p-3">
        {hasError || !calLink ? (
          <div className="py-16 sm:py-24 px-6 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[var(--accent-gold-border)] bg-[var(--bg-dark-elevated)] text-[var(--accent-gold-light)] rounded-[2px]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-on-dark)] font-semibold mb-3">
              {t("errorTitle")}
            </h2>
            <p className="text-[var(--text-muted-on-dark)] text-[15px] leading-[1.6] mb-8">
              {t("errorDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {directBookingUrl && (
                <a
                  href={directBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--bg-surface)] hover:bg-[var(--accent-gold-light)] text-[var(--text-ink)] px-7 py-3 rounded-[2px] text-[14.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  <span>{t("errorCalCta")}</span>
                </a>
              )}
              <a
                href={contactConfig.telegramDirect.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--bg-dark-elevated)] hover:border-[var(--accent-gold-light)] text-[var(--text-on-dark)] border border-[var(--border-on-dark)] px-7 py-3 rounded-[2px] text-[14.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
              >
                <span>{t("errorTelegramCta")}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[680px] w-full">
            {!isLoaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-[var(--bg-dark)] p-6 sm:p-10 flex flex-col gap-6 animate-pulse motion-reduce:animate-none"
              >
                <div className="flex items-center justify-between pb-6 border-b border-[var(--border-on-dark-subtle)]">
                  <div className="h-6 w-48 bg-[var(--bg-dark-elevated)] rounded-[2px]" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-[var(--bg-dark-elevated)] rounded-[2px]" />
                    <div className="h-8 w-8 bg-[var(--bg-dark-elevated)] rounded-[2px]" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-3 py-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-4 bg-[var(--bg-dark-elevated)] rounded-[2px]" />
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-3 flex-1">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="h-14 sm:h-20 bg-[var(--bg-dark-elevated)] border border-[var(--border-on-dark-subtle)] rounded-[2px]"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="w-full min-h-[680px]">
              <Cal
                calLink={calLink}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "680px",
                  overflow: "auto",
                }}
                config={{
                  layout: "month_view",
                  theme: "dark",
                  locale: embedLocale,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

