"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

interface LanguageOption {
  code: "uz" | "ru" | "en";
  label: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "uz", label: "UZ", nativeName: "O'zbekcha" },
  { code: "ru", label: "RU", nativeName: "Русский" },
  { code: "en", label: "EN", nativeName: "English" },
];

export interface LanguageSwitcherProps {
  direction?: "down" | "up";
  className?: string;
}

export function LanguageSwitcher({
  direction = "down",
  className = "",
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as "uz" | "ru" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextLocale: "uz" | "ru" | "en") => {
    setIsOpen(false);
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block font-mono text-xs ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="h-9 xl:h-10 px-2.5 xl:px-3.5 flex items-center gap-1.5 xl:gap-2 bg-[#121212] hover:bg-[#181818] border border-white/[0.14] hover:border-[#C5A880]/60 transition-all rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
      >
        <span className="font-mono text-xs font-medium text-white tracking-[0.16em] uppercase">
          {activeLang.code.toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 text-[#C5A880] transition-transform duration-300 ${
            isOpen
              ? direction === "up"
                ? "rotate-0"
                : "rotate-180"
              : direction === "up"
              ? "rotate-180"
              : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className={`absolute right-0 z-50 min-w-[150px] py-1.5 bg-[#121212] border border-white/[0.14] shadow-[0_15px_35px_rgba(0,0,0,0.95)] rounded-none ${
            direction === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          }`}
          style={{ backgroundColor: "#121212" }}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                disabled={isPending}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-[#C5A880]/15 text-[#E2C79D] font-medium"
                    : "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs uppercase font-mono tracking-wider ${
                      isSelected
                        ? "text-[#C5A880]"
                        : "text-neutral-400 group-hover:text-white"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                  <span className="font-sans text-xs">{lang.nativeName}</span>
                </div>
                {isSelected && (
                  <span className="text-[#C5A880] font-mono text-xs font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
