"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const isHomePage =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // Handle sticky blur state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key support & focus restoration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["xizmatlar", "portfel", "yol", "tamoyil", "media", "aloqa"];
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

  // Information architecture matching Concept 3 Luxury Editorial
  const navLinks = [
    {
      id: "xizmatlar",
      href: "#xizmatlar",
      label: content.navigation.consulting || "Xizmatlar",
      drawerLabel: `${content.navigation.consulting || "Xizmatlar"} va Dossier`,
    },
    {
      id: "portfel",
      href: "#portfel",
      label: content.navigation.portfolio || "Bizneslar",
      drawerLabel: `${content.navigation.portfolio || "Bizneslar"} (7 Tizim)`,
    },
    {
      id: "yol",
      href: "#yol",
      label: content.navigation.timeline || "Faoliyat yo‘li",
      drawerLabel: "Bosib o‘tilgan yo‘l",
    },
    {
      id: "tamoyil",
      href: "#tamoyil",
      label: content.navigation.principles || "Qolip tamoyili",
      drawerLabel: "Qolip tamoyili",
    },
    {
      id: "media",
      href: "#media",
      label: content.navigation.media || "Media",
      drawerLabel: "Media va suhbatlar",
    },
    {
      id: "aloqa",
      href: "#aloqa",
      label: content.navigation.contact || "Aloqa",
      drawerLabel: "Aloqa va konsultatsiya",
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
    <>
      {/* Editorial Top Masthead Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          scrolled
            ? "bg-[#FBF9F5]/95 backdrop-blur-md border-[rgba(17,18,21,0.12)] py-3 shadow-[0_4px_24px_rgba(17,18,21,0.06)]"
            : "bg-[#FBF9F5] border-[rgba(17,18,21,0.08)] py-4"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Monogram */}
            <Link
              href={`/${locale}`}
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] rounded-[2px]"
              aria-label="Anvar Abduqayum — Bosh sahifa"
            >
              <span className="font-serif text-base sm:text-xl lg:text-[22px] font-bold tracking-[0.12em] text-[#111215] uppercase leading-none">
                ANVAR ABDUQAYUM<span className="text-[#B8860B]">.</span>
              </span>
              <span className="hidden sm:block text-[9.5px] font-sans font-semibold tracking-[0.14em] uppercase text-[#7A8290] mt-1">
                Sanoat &bull; Tizimli Boshqaruv &bull; Eksport
              </span>
            </Link>

            {/* Desktop Navigation Links (Editorial Minimalist) */}
            <nav
              aria-label="Asosiy menyu"
              className="hidden lg:flex items-center gap-7 xl:gap-8"
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
                    className={`relative py-1.5 text-[11.5px] font-sans font-semibold uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] rounded-[2px] ${
                      isActive
                        ? "text-[#111215] font-bold"
                        : "text-[#4B515D] hover:text-[#111215]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B8860B] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Tools: Language Switcher & Consultation CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher (UZ/RU/EN) */}
              <div
                className="hidden sm:inline-flex items-center bg-white border border-[rgba(17,18,21,0.1)] rounded-[4px] p-0.5 shadow-sm"
                role="group"
                aria-label="Tilni tanlash"
              >
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageChange(lang)}
                    className={`min-h-[44px] min-w-[44px] px-3 py-2 text-[11px] font-mono font-semibold uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] ${
                      locale === lang
                        ? "bg-[#111215] text-white font-bold"
                        : "text-[#7A8290] hover:text-[#111215]"
                    }`}
                    aria-pressed={locale === lang}
                    aria-label={`${lang.toUpperCase()} tiliga o'tish`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Consultation Booking CTA */}
              <Link
                href={bookingHref}
                className="hidden md:inline-flex items-center justify-center min-h-[44px] px-5 bg-[#111215] text-white text-[11px] font-sans font-semibold uppercase tracking-[0.12em] rounded-[2px] border border-[#111215] hover:bg-[#B8860B] hover:border-[#B8860B] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
              >
                <span>{content.navigation.ctaButton || "Uchrashuv bronlash"}</span>
              </Link>

              {/* Mobile Menu Toggle Button (Min 44px touch target) */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] w-11 h-11 p-2.5 flex items-center justify-center bg-white border border-[rgba(17,18,21,0.1)] rounded-[4px] text-[#111215] hover:bg-[#F4EFE6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-drawer-panel"
                aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
              >
                <div className="w-5 h-3.5 flex flex-col justify-between" aria-hidden="true">
                  <span
                    className={`block h-[1.75px] w-full bg-[#111215] rounded transition-transform duration-200 ${
                      mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-full bg-[#111215] rounded transition-opacity duration-200 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-full bg-[#111215] rounded transition-transform duration-200 ${
                      mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#111215]/50 backdrop-blur-sm z-[1999] lg:hidden animate-in fade-in duration-200"
          onClick={() => {
            setMobileMenuOpen(false);
            toggleButtonRef.current?.focus();
          }}
          aria-hidden="true"
        />
      )}

      {/* Accessible Mobile Drawer Panel */}
      <aside
        id="mobile-drawer-panel"
        className={`fixed top-0 right-0 w-full max-w-[320px] h-full bg-[#FBF9F5] border-l border-[rgba(17,18,21,0.1)] z-[2000] flex flex-col p-5 shadow-[-10px_0_30px_rgba(0,0,0,0.12)] overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigatsiya menyusi"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Drawer Header (Zero overlap with min-w-0 and clamp) */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(17,18,21,0.08)] mb-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="font-serif font-bold text-sm tracking-[0.08em] text-[#111215] truncate block uppercase">
              ANVAR ABDUQAYUM
            </span>
            <span className="text-[9.5px] font-mono text-[#7A8290] tracking-wider uppercase block mt-0.5">
              Navigatsiya
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              toggleButtonRef.current?.focus();
            }}
            className="min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center bg-white border border-[rgba(17,18,21,0.1)] rounded-[4px] text-2xl font-light text-[#111215] hover:bg-[#111215] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
            aria-label="Menyuni yopish"
          >
            &times;
          </button>
        </div>

        {/* Mobile Language Switcher Row (44px min touch target) */}
        <div
          className="grid grid-cols-3 gap-1.5 pb-4 mb-4 border-b border-[rgba(17,18,21,0.08)]"
          role="group"
          aria-label="Mobil tilni tanlash"
        >
          {(["uz", "ru", "en"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                handleLanguageChange(lang);
                setMobileMenuOpen(false);
              }}
              className={`min-h-[44px] flex items-center justify-center text-[11px] font-mono font-semibold uppercase rounded-[2px] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] ${
                locale === lang
                  ? "bg-[#111215] border-[#111215] text-white font-bold"
                  : "bg-white border-[rgba(17,18,21,0.1)] text-[#7A8290] hover:text-[#111215]"
              }`}
              aria-pressed={locale === lang}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Mobile Navigation Links */}
        <ul className="flex flex-col gap-1 mb-6 list-none">
          {navLinks.map((item) => {
            const targetHref = isHomePage
              ? item.href
              : `/${locale}${item.href}`;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <a
                  href={targetHref}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`min-h-[48px] py-3 flex items-center text-[13px] font-sans font-semibold uppercase tracking-[0.08em] border-b border-[rgba(17,18,21,0.06)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] ${
                    isActive
                      ? "text-[#B8860B] pl-1 font-bold"
                      : "text-[#111215] hover:text-[#B8860B] hover:pl-1.5"
                  }`}
                >
                  {item.drawerLabel}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Drawer Bottom CTA */}
        <div className="mt-auto pt-4 border-t border-[rgba(17,18,21,0.08)]">
          <Link
            href={bookingHref}
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[48px] w-full flex items-center justify-center bg-[#111215] text-white text-[11px] font-sans font-semibold uppercase tracking-[0.14em] rounded-[2px] hover:bg-[#B8860B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]"
          >
            <span>{content.navigation.ctaButton || "Uchrashuv bronlash"}</span>
          </Link>
          <p className="font-mono text-[10px] text-[#7A8290] mt-3 text-center tracking-wider">
            TOSHKENT &bull; 2026 // RASMIY PORTFOLIO
          </p>
        </div>
      </aside>
    </>
  );
};
