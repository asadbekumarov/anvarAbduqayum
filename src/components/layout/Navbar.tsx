"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  const ctaT = useTranslations("cta");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: "#xizmatlar", label: t("services") },
    { href: "#bosqichlar", label: t("methodology") },
    { href: "#ekspert", label: t("expert") },
    { href: "#natijalar", label: t("media") },
    { href: "#faq", label: t("faq") },
    { href: "#aloqa", label: t("contact") },
  ];

  // Smooth scroll handler with header height offset
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Set active section immediately for instantaneous UI feedback
        setActiveSection(targetId);

        // Update URL hash without forcing jump
        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["xizmatlar", "bosqichlar", "ekspert", "natijalar", "faq", "aloqa"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!("IntersectionObserver" in window) || elements.length === 0) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Aktiv bo'lim hozirgi scroll bo'yicha IntersectionObserver orqali ajratiladi
    const observer = new IntersectionObserver(
      (entries) => {
        // Sahifa eng pastiga yetganda aloqa bo'limini faollashtirish
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80
        ) {
          setActiveSection("aloqa");
          return;
        }

        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(intersecting[0].target.id);
        } else if (window.scrollY < 150) {
          setActiveSection("");
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "h-16 md:h-[70px] bg-[#0A0A0A]/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.65)]"
            : "h-20 bg-[#0A0A0A]/70 backdrop-blur-md border-b border-white/[0.05]"
        }`}
      >
        <div className="max-w-[1600px] mx-auto w-full h-full px-4 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          {/* Brand Identity (Left) */}
          <div className="shrink-0 flex items-center">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              aria-label={common("brandAria")}
              className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]/60 rounded-sm py-1 pr-1 select-none"
            >
              {/* Minimalist Monogram Badge */}
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#C5A880]/40 group-hover:border-[#E2C79D] flex items-center justify-center shrink-0 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_12px_rgba(197,168,128,0.25)]">
                <span className="font-serif text-xs font-bold tracking-wider text-[#C5A880] group-hover:text-[#E2C79D] transition-colors">
                  IB
                </span>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-xs font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase group-hover:text-[#E2C79D] transition-colors leading-tight whitespace-nowrap">
                  ILHOM BEGIMQULOV
                </span>
                <span className="text-xs font-mono tracking-[0.14em] uppercase text-neutral-400 group-hover:text-neutral-300 transition-colors hidden sm:inline-block leading-tight mt-0.5 whitespace-nowrap">
                  {common("businessConsulting")}
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links (Center — Balanced Luxury Navigation) */}
          <nav
            aria-label={t("mainNavAria")}
            className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1.5 shrink-0 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 2xl:px-3 py-1 backdrop-blur-md"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center px-2.5 2xl:px-3.5 py-1.5 rounded-full text-[11px] 2xl:text-xs uppercase tracking-[0.05em] 2xl:tracking-[0.08em] font-medium transition-all duration-200 select-none whitespace-nowrap ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Single Button 'Ustozga shogird tushish' & Language Selector */}
          <div className="hidden xl:flex shrink-0 items-center justify-end gap-2.5 2xl:gap-3">
            {/* Single CTA Button: Ustozga shogird tushish */}
            <button
              type="button"
              onClick={() => handleApply({ service: ctaT("mentorship") })}
              className="h-9 2xl:h-10 shrink-0 group relative overflow-hidden rounded-sm bg-gradient-to-r from-[#C5A880] via-[#D4B992] to-[#C5A880] hover:brightness-105 active:scale-[0.98] px-4 2xl:px-5 font-sans text-xs uppercase tracking-[0.06em] text-[#0A0A0A] font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 2xl:gap-2 whitespace-nowrap shadow-[0_2px_12px_rgba(197,168,128,0.2)] hover:shadow-[0_4px_20px_rgba(197,168,128,0.35)]"
            >
              {/* Shimmer sweep effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
              <span className="relative z-10 whitespace-nowrap">{ctaT("mentorship")}</span>
              <svg
                className="w-3.5 h-3.5 shrink-0 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#0A0A0A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>

            <LanguageSwitcher />
          </div>

          {/* Tablet & Mobile Actions (Shown below XL screens) */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 xl:hidden">
            <div className="hidden sm:block">
              <button
                type="button"
                onClick={() => handleApply({ service: ctaT("mentorship") })}
                className="h-9 shrink-0 group relative overflow-hidden rounded-sm bg-gradient-to-r from-[#C5A880] to-[#D4B992] px-3.5 font-sans text-xs uppercase tracking-[0.06em] text-[#0A0A0A] font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-sm active:scale-[0.98]"
              >
                <span className="relative z-10 whitespace-nowrap">{ctaT("mentorship")}</span>
                <span className="text-xs font-bold">↗</span>
              </button>
            </div>

            <LanguageSwitcher />

            {/* Premium Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={common("openMenu")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenApply={(opts) => {
          setIsMobileMenuOpen(false);
          handleApply(opts);
        }}
      />
    </>
  );
}

