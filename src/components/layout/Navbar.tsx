"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

export interface NavbarProps {
  onOpenApply?: () => void;
}

export function Navbar({ onOpenApply }: NavbarProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: t("home") },
    { href: "#xizmatlar", label: t("services") },
    { href: "#tadbirlarimiz", label: t("events") },
    { href: "#bosqichlar", label: t("stages") },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/[0.07] transition-all">
        <div className="max-w-[1360px] mx-auto w-full h-full px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity (Left) */}
          <a
            href="#hero"
            className="flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            <span className="text-xs font-medium tracking-[0.22em] text-white uppercase">
              ILHOM BEGIMQULOV
            </span>
            <span className="h-3 w-[1px] bg-white/15 mx-3" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-platinum uppercase">
              B2B CONSULTING
            </span>
          </a>

          {/* Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.12em] uppercase text-platinum hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher & CTA (Right) */}
          <div className="hidden lg:flex items-center space-x-6">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={handleApply}
              className="rounded-none bg-[#C5A880] hover:bg-[#d4b992] px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-[#0A0A0A] font-medium transition-colors cursor-pointer"
            >
              {common("cta")}
            </button>
          </div>

          {/* Tablet & Mobile Actions: Language & Hamburger */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:hidden">
            <div className="hidden sm:block">
              <button
                type="button"
                onClick={handleApply}
                className="rounded-none bg-[#C5A880] hover:bg-[#d4b992] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#0A0A0A] font-medium transition-colors cursor-pointer"
              >
                {common("cta")}
              </button>
            </div>

            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={common("openMenu")}
              className="p-2 text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenApply={() => {
          setIsMobileMenuOpen(false);
          handleApply();
        }}
      />
    </>
  );
}
