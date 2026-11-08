"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getContent } from "@/config/content";

export interface NavbarProps {
  locale?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const isHomePage =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // Handle scroll and sticky header state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Track active section via IntersectionObserver when on home page
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["xizmatlar", "portfel", "yol", "media", "aloqa"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Information architecture prioritized: Consulting/Services first
  const navLinks = [
    {
      id: "xizmatlar",
      href: "#xizmatlar",
      label: content.navigation.consulting || "Xizmatlar",
      code: "01",
    },
    {
      id: "portfel",
      href: "#portfel",
      label: content.navigation.portfolio || "Bizneslar",
      code: "02",
    },
    {
      id: "yol",
      href: "#yol",
      label: content.navigation.timeline || "Faoliyat yo‘li",
      code: "03",
    },
    {
      id: "media",
      href: "#media",
      label: content.navigation.media || "Media",
      code: "04",
    },
    {
      id: "aloqa",
      href: "#aloqa",
      label: content.navigation.contact || "Aloqa",
      code: "05",
    },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["uz", "ru", "en"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join("/")}`);
  };

  const bookingHref = `/${locale}/bron`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,box-shadow] duration-200 border-b ${
        scrolled
          ? "bg-[#090A0D]/95 backdrop-blur-md border-white/[0.09] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          : "bg-[#090A0D] border-white/[0.08] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram */}
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2.5 rounded-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D]"
            aria-label="Anvar Abduqayum Bosh Sahifasi"
          >
            <span className="w-2 h-2 rounded-full bg-[#D97736] group-hover:scale-125 transition-transform" />
            <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-white uppercase group-hover:text-[#D97736] transition-colors">
              ANVAR ABDUQAYUM
            </span>
          </Link>

          {/* Desktop Navigation - Clean readable Title Case */}
          <nav
            aria-label="Asosiy navigatsiya"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            {navLinks.map((item) => {
              const targetHref = isHomePage
                ? item.href
                : `/${locale}${item.href}`;
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={targetHref}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex items-center gap-1.5 py-1 text-sm font-medium rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D] ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#A4ACB9] hover:text-white"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] transition-colors ${
                      isActive
                        ? "text-[#D97736] font-bold"
                        : "text-[#D97736]/75 group-hover:text-[#D97736]"
                    }`}
                  >
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D97736] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Tools: Language Switcher & Consultation CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Minimalist Industrial Language Switcher */}
            <div
              className="inline-flex border border-white/[0.12] bg-[#12141A] p-0.5 rounded-[3px] font-mono text-[11px]"
              role="group"
              aria-label="Tilni tanlash"
            >
              {(["uz", "ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] ${
                    locale === lang
                      ? "bg-white/[0.16] text-white font-bold"
                      : "text-[#8E95A5] hover:text-white"
                  }`}
                  aria-pressed={locale === lang}
                  aria-label={`${lang.toUpperCase()} tiliga o'tish`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Primary Consultation CTA - Title Case */}
            <Link
              href={bookingHref}
              className="tap-target-48 px-4 py-2 bg-white/[0.06] hover:bg-[#D97736] hover:text-[#090A0D] text-white text-xs font-mono font-semibold tracking-wider rounded-[3px] border border-white/[0.14] hover:border-[#D97736] transition-authority flex items-center gap-2 group shadow-[0_2px_10px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D]"
            >
              <span>{content.navigation.ctaButton || "Uchrashuv bronlash"}</span>
              <span className="text-[#D97736] group-hover:text-[#090A0D] transition-colors">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div
              className="inline-flex sm:hidden border border-white/[0.12] bg-[#12141A] p-0.5 rounded-[3px] font-mono text-[10px]"
              role="group"
              aria-label="Tilni tanlash"
            >
              {(["uz", "ru", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`min-h-[44px] min-w-[36px] xs:min-w-[44px] px-2 py-2 flex items-center justify-center uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D97736] ${
                    locale === lang
                      ? "bg-white/[0.16] text-white font-bold"
                      : "text-[#8E95A5] hover:text-white"
                  }`}
                  aria-pressed={locale === lang}
                  aria-label={`${lang.toUpperCase()} tili`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="tap-target-48 p-2 text-white border border-white/[0.12] rounded-[3px] bg-[#12141A] hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736]"
              aria-expanded={mobileMenuOpen}
              aria-label="Menyuni ochish yoki yopish"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden pt-4 pb-6 mt-3 border-t border-white/[0.1] animate-in fade-in slide-in-from-top-2 duration-150"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigatsiya menyusi"
          >
            {/* 2-Column layout: Label (1fr) + Index (auto). Prevents overlap at 320px/360px/390px */}
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const targetHref = isHomePage
                  ? item.href
                  : `/${locale}${item.href}`;
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={targetHref}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`tap-target-48 grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 border rounded-[4px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97736] ${
                      isActive
                        ? "border-[#D97736] bg-[#181B24] text-white"
                        : "border-white/[0.08] bg-[#12141A] text-white/90 hover:text-white hover:border-[#D97736]/50"
                    }`}
                  >
                    <span className="text-sm font-medium truncate text-left">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#D97736] shrink-0 font-semibold tracking-wider text-right">
                      № {item.code}
                    </span>
                  </a>
                );
              })}

              <div className="pt-2">
                <Link
                  href={bookingHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="tap-target-48 w-full px-4 py-3 bg-[#D97736] text-[#090A0D] font-mono text-xs tracking-wider uppercase font-bold rounded-[3px] flex items-center justify-center gap-2 hover:bg-[#E68545] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{content.navigation.ctaButton || "Uchrashuv bronlash"}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
