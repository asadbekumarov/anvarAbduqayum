"use client";

import React, { useState, useEffect } from "react";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";

interface MobileStickyBarProps {
  locale?: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  locale = "uz",
}) => {
  const content = getContent(locale);
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

  return (
    <aside
      aria-label="Tezkor aloqa paneli"
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#F6F3EC]/95 backdrop-blur-md border-t border-[#E5E0D6] p-2 transition-transform duration-200 shadow-[0_-4px_20px_rgba(20,22,26,0.08)] ${
        keyboardOpen ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        {/* Telegram Direct CTA (Primary) */}
        <a
          href={contactConfig.telegramDirect.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target-48 w-full bg-[#E2541B] text-white hover:bg-[#C94512] active:bg-[#B83E0F] font-mono text-xs tracking-wider uppercase font-semibold rounded-[4px] border border-[#C94512] flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2541B]"
        >
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .39z" />
          </svg>
          <span>{content.mobileStickyBar.telegramLabel}</span>
        </a>

        {/* Direct Call Link */}
        <a
          href={contactConfig.phone.href}
          className="tap-target-48 w-full bg-[#FFFFFF] text-[#14161A] hover:bg-[#EBE4D6] active:bg-[#DFD7C7] font-mono text-xs tracking-wider uppercase font-medium rounded-[4px] border border-[#E5E0D6] flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14161A]"
        >
          <svg
            className="w-4 h-4 text-[#14161A] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>{content.mobileStickyBar.callLabel}</span>
        </a>
      </div>
    </aside>
  );
};
