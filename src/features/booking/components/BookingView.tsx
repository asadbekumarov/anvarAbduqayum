"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";

// Dynamically import Cal embed with ssr: false to avoid window/document reference issues during SSR
const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => null,
});

export function BookingView() {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const rawCalLink =
    process.env.NEXT_PUBLIC_CAL_LINK || "asadbek-umarov-klqsdt/15min";
  const calLink = rawCalLink
    ? rawCalLink
        .trim()
        .replace(/^https?:\/\/(app\.)?cal\.com\//i, "")
        .replace(/^\/+/, "")
        .replace(/\/+$/, "")
    : "";

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

        // Trigger skeleton dismissal when iframe finishes loading
        cal("on", {
          action: "linkReady",
          callback: () => {
            if (isMounted) setIsLoaded(true);
          },
        });
      } catch (err) {
        console.error("[Cal Embed Init Error]", err);
        if (isMounted) setHasError(true);
      }
    })();

    // Fallback timer to hide skeleton if linkReady is delayed or blocked
    const timer = setTimeout(() => {
      if (isMounted && !hasError) {
        setIsLoaded(true);
      }
    }, 3500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [calLink, hasError]);

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      {/* Editorial Header Section */}
      <div className="mb-8 sm:mb-12 max-w-3xl">
        {/* Swiss Architectural Kicker */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#D4AF37]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            {t("kicker")}
          </span>
        </div>

        {/* Playfair / Editorial Serif Heading */}
        <h1 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-[-0.02em] leading-[1.12]">
          {t("title")}
        </h1>

        {/* Narrative Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#9A9A9A] font-normal leading-relaxed max-w-2xl">
          {t("description")}
        </p>

        {/* 3 Value Pillars / Badges */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-[#1E1E1E] flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
              {t("badgeDuration")}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
              {t("badgePrice")}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
              {t("badgePrivacy")}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Success Notification Banner */}
      {isBooked && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-6 sm:p-8 bg-[#121212] border border-[#D4AF37] shadow-[0_12px_40px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-500 animate-in fade-in"
        >
          <div className="w-10 h-10 rounded-none bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-medium text-white mb-1">
              {t("successTitle")}
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              {t("successMessage")}
            </p>
          </div>
        </div>
      )}

      {/* Calendar Area or Fallback */}
      <div className="relative w-full border border-[#1E1E1E] bg-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {hasError || !calLink ? (
          /* Fallback Error Card if Calendar fails or env var missing */
          <div className="py-16 sm:py-24 px-6 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[#C5A880]/40 bg-[#C5A880]/10 text-[#C5A880]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <h2 className="font-serif italic text-2xl sm:text-3xl text-white mb-3">
              {t("errorTitle")}
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              {t("errorDesc")}
            </p>
            <a
              href="https://t.me/anvar_abduqayum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] px-7 py-4 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A880]"
            >
              <span>{t("errorTelegramCta")}</span>
              <span>→</span>
            </a>
          </div>
        ) : (
          <div className="relative min-h-[680px] w-full">
            {/* Minimalist Swiss Skeleton Loader */}
            {!isLoaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-[#0A0A0A] p-6 sm:p-10 flex flex-col gap-6 animate-pulse"
              >
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <div className="h-6 w-48 bg-white/[0.08] rounded-none" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-white/[0.06] rounded-none" />
                    <div className="h-8 w-8 bg-white/[0.06] rounded-none" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-3 py-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-4 bg-white/[0.05] rounded-none" />
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-3 flex-1">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="h-14 sm:h-20 bg-white/[0.03] border border-white/[0.04] rounded-none"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cal.com Embed Component */}
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
