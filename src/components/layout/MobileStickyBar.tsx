"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { contactConfig } from "@/config/contact";

export function MobileStickyBar() {
  const { openApply } = useApplyModal();
  const ctaT = useTranslations("cta");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show sticky bar after scrolling past 200px (past hero fold)
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside
      aria-label="Tezkor aloqa va diagnostika"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/[0.12] px-3.5 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out shadow-[0_-8px_30px_rgba(0,0,0,0.8)] ${
        isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button (Compact) */}
        <a
          href={`tel:${contactConfig.phone.clean}`}
          aria-label={contactConfig.phone.ariaLabel}
          className="flex items-center justify-center w-11 h-11 shrink-0 bg-[#0F172A] border border-white/[0.15] text-platinum hover:text-white hover:border-[#C5A880]/50 transition-colors"
        >
          <svg
            className="w-4 h-4 text-[#C5A880]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </a>

        {/* Telegram Direct Chat Button */}
        <a
          href={contactConfig.telegramDirect.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contactConfig.telegramDirect.ariaLabel}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 px-3 bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/40 text-sky-300 font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
          <span className="font-semibold">Telegram</span>
        </a>

        {/* Free Diagnostic CTA Button */}
        <button
          type="button"
          onClick={() => openApply()}
          className="flex-[1.4] inline-flex items-center justify-center gap-1.5 h-11 px-3 bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A0A0A] font-semibold text-xs tracking-tight transition-colors shadow-sm"
        >
          <span>{ctaT("primaryShort")}</span>
          <span className="font-mono text-sm">→</span>
        </button>
      </div>
    </aside>
  );
}
