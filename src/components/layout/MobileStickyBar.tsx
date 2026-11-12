"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";

interface MobileStickyBarProps {
  locale?: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  locale,
}) => {
  const routeLocale = useLocale();
  const rawLocale = locale || routeLocale || "uz";
  const safeLocale = rawLocale === "ru" || rawLocale === "en" ? rawLocale : "uz";
  const content = getContent(safeLocale);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Automatically hide sticky bar when mobile virtual keyboard is open
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setKeyboardOpen(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const regionLabel =
    safeLocale === "ru"
      ? "Панель быстрой связи"
      : safeLocale === "en"
      ? "Quick contact bar"
      : "Tezkor aloqa paneli";

  const hasVerifiedTelegram =
    contactConfig.telegramDirect.isVerified &&
    Boolean(contactConfig.telegramDirect.url);
  const hasVerifiedPhone =
    contactConfig.phone.isVerified && Boolean(contactConfig.phone.href);

  return (
    <aside
      aria-label={regionLabel}
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[var(--bg-alabaster-glass)] backdrop-blur-md border-t border-[var(--border-hairline-editorial-strong)] px-3 py-2 transition-[transform,opacity] duration-200 motion-reduce:transition-none shadow-[var(--shadow-sticky-top)] ${
        keyboardOpen ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {hasVerifiedTelegram || hasVerifiedPhone ? (
        <div
          className={`grid gap-2 ${
            hasVerifiedTelegram && hasVerifiedPhone
              ? "grid-cols-[1.45fr_1fr]"
              : "grid-cols-1"
          }`}
        >
          {hasVerifiedTelegram && (
            <a
              href={contactConfig.telegramDirect.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-w-0 min-h-[48px] px-2 min-[375px]:px-3 bg-[var(--bg-dark)] text-[var(--bg-surface)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] active:opacity-90 border border-[var(--bg-dark)] rounded-[2px] font-sans text-[11.5px] min-[375px]:text-[13px] font-semibold flex items-center justify-center gap-1.5 min-[375px]:gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
            >
              <svg className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .39z" />
              </svg>
              <span className="truncate">{content.mobileStickyBar.telegramLabel}</span>
            </a>
          )}

          {hasVerifiedPhone && (
            <a
              href={contactConfig.phone.href}
              className="w-full min-w-0 min-h-[48px] px-2 min-[375px]:px-3 bg-transparent text-[var(--text-ink)] hover:border-[var(--accent-gold-ink)] hover:bg-[var(--accent-gold-soft)] active:bg-[var(--bg-stone)] border border-[var(--border-hairline-editorial-strong)] rounded-[2px] font-sans text-[11.5px] min-[375px]:text-[13px] font-semibold flex items-center justify-center gap-1.5 min-[375px]:gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
            >
              <svg
                className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 text-[var(--accent-gold-ink)] shrink-0"
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
              <span className="truncate">{content.mobileStickyBar.callLabel}</span>
            </a>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1">
          <Link
            href={`/${safeLocale}#aloqa`}
            className="w-full min-w-0 min-h-[48px] px-3 bg-[var(--bg-dark)] text-[var(--bg-surface)] hover:bg-[var(--accent-gold-ink)] active:opacity-90 border border-[var(--bg-dark)] rounded-[2px] font-sans text-[12.5px] font-semibold flex items-center justify-center gap-2 whitespace-nowrap transition-[background-color,border-color] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
          >
            <span className="truncate">{content.mobileStickyBar.telegramLabel}</span>
          </Link>
        </div>
      )}
    </aside>
  );
};
