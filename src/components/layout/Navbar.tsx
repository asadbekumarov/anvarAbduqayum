"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#hero", label: t("home") },
    { href: "#xizmatlar", label: t("services") },
    { href: "#tadbirlarimiz", label: t("events") },
    { href: "#bosqichlar", label: t("stages") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 bg-base ${
          isScrolled ? "border-b border-border" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand / Logo */}
            <a
              href="#hero"
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <span className="font-serif text-lg sm:text-xl tracking-wider font-semibold text-white group-hover:text-gold transition-colors">
                ILHOM BEGIMQULOV
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted -mt-1 hidden sm:block">
                Biznes Konsultant
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <LanguageSwitcher />

              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
              >
                {common("cta")}
              </Button>
            </div>

            {/* Tablet & Mobile Actions: Language & Hamburger */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:hidden">
              <div className="hidden sm:block">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApply}
                >
                  {common("cta")}
                </Button>
              </div>

              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label={common("openMenu")}
                className="p-2 text-white hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
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
