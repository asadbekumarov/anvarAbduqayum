"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getContent } from "@/config/content";
import { featuresConfig } from "@/config/features";
import { BookingActionLink } from "@/components/ui/BookingActionLink";

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
  const drawerPanelRef = useRef<HTMLElement | null>(null);

  const isHomePage =
    pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  // Handle sticky header blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key closes mobile drawer and restores focus to trigger
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

  // Lock body scroll, toggle inert on closed drawer, and shift focus when drawer opens
  useEffect(() => {
    const panel = drawerPanelRef.current;
    if (panel) {
      if (mobileMenuOpen) {
        panel.removeAttribute("inert");
      } else {
        panel.setAttribute("inert", "");
      }
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const mq = window.matchMedia("(min-width: 1280px)");
    const handleViewportChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false);
      }
    };
    mq.addEventListener("change", handleViewportChange);

    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", handleViewportChange);
    };
  }, [mobileMenuOpen]);

  // Track active section deterministically across both scroll directions
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const navSectionIds = new Set([
      "xizmatlar",
      "portfel",
      "yol",
      "tamoyil",
      "media",
      "aloqa",
    ]);

    const updateActiveSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section")
      );
      if (sections.length === 0) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;
      if (atBottom) {
        setActiveSection("aloqa");
        return;
      }

      const probeY = Math.min(window.innerHeight * 0.3, 220);
      let currentId = "";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          currentId = navSectionIds.has(section.id) ? section.id : "";
          break;
        }
      }

      setActiveSection(currentId);
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isHomePage]);

  const taglineItems =
    locale === "ru"
      ? ["Промышленность", "Системное управление", "Экспорт"]
      : locale === "en"
      ? ["Industry", "Systemic Governance", "Export"]
      : ["Sanoat", "Tizimli Boshqaruv", "Eksport"];

  const cityLabel =
    locale === "ru"
      ? "Ташкент, 2026"
      : locale === "en"
      ? "Tashkent, 2026"
      : "Toshkent, 2026";

  // Navigation items synced with existing homepage section IDs
  const navLinks = [
    {
      id: "xizmatlar",
      href: "#xizmatlar",
      label: content.navigation.consulting || "Xizmatlar",
      drawerLabel:
        locale === "ru"
          ? "Услуги и досье"
          : locale === "en"
          ? "Services & Dossier"
          : `${content.navigation.consulting || "Xizmatlar"} va Dossier`,
    },
    {
      id: "portfel",
      href: "#portfel",
      label: content.navigation.portfolio || "Bizneslar",
      drawerLabel:
        locale === "ru"
          ? "Направления и проекты (7)"
          : locale === "en"
          ? "Ecosystem & Projects (7)"
          : `${content.navigation.portfolio || "Bizneslar"} (7 Yo‘nalish)`,
    },
    {
      id: "yol",
      href: "#yol",
      label: content.navigation.timeline || "Faoliyat yo‘li",
      drawerLabel: content.navigation.timeline || "Bosib o‘tilgan yo‘l",
    },
    {
      id: "tamoyil",
      href: "#tamoyil",
      label: content.navigation.principles || "Qolip tamoyili",
      drawerLabel: content.navigation.principles || "Qolip tamoyili",
    },
    {
      id: "media",
      href: "#media",
      label: content.navigation.media || "Media",
      drawerLabel: content.navigation.media || "Media va suhbatlar",
    },
    {
      id: "aloqa",
      href: "#aloqa",
      label: content.navigation.contact || "Aloqa",
      drawerLabel: content.navigation.contact || "Aloqa va konsultatsiya",
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

  return (
    <>
      {/* Editorial Top Masthead Header */}
      <header
        className={`${
          featuresConfig.demoMode
            ? "sticky top-0 left-0 right-0"
            : "fixed top-0 left-0 right-0"
        } z-50 border-b transition-[background-color,border-color,padding,box-shadow] duration-200 ${
          scrolled
            ? "bg-[var(--bg-alabaster-glass)] backdrop-blur-md border-[var(--border-hairline)] py-3 shadow-[var(--shadow-editorial-header)]"
            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-subtle)] py-4"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Monogram */}
            <Link
              href={`/${locale}`}
              className="group min-h-[44px] flex flex-col justify-center py-1 min-w-0 shrink-0 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)]"
            >
              <span className="font-serif text-base sm:text-xl xl:text-[22px] font-bold tracking-[0.12em] text-[var(--text-ink)] uppercase leading-none">
                ANVAR ABDUQAYUM<span className="text-[var(--accent-gold-ink)]">.</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 2xl:whitespace-nowrap text-[9.5px] font-sans font-semibold tracking-[0.12em] uppercase text-[var(--text-muted-aa)] mt-1">
                {taglineItems.map((item, idx) => (
                  <React.Fragment key={item}>
                    {idx > 0 && (
                      <span
                        className="w-px h-2.5 bg-[var(--border-hairline)]"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </span>
              <span className="sr-only">
                {locale === "ru"
                  ? "На главную"
                  : locale === "en"
                  ? "Home"
                  : "Bosh sahifa"}
              </span>
            </Link>

            {/* Desktop Navigation Links (Visible at >= 1280px to avoid horizontal crowding at 1024px) */}
            <nav
              aria-label={
                locale === "ru"
                  ? "Основное меню"
                  : locale === "en"
                  ? "Primary navigation"
                  : "Asosiy menyu"
              }
              className="hidden xl:flex items-center gap-3.5 2xl:gap-7"
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
                    className={`group relative min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-center leading-tight px-1.5 py-2 text-[11.5px] font-sans font-semibold uppercase tracking-[0.12em] transition-colors rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)] active:opacity-80 ${
                      isActive
                        ? "text-[var(--text-ink)] font-bold"
                        : "text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-1.5 left-0 w-full h-[1.5px] bg-[var(--accent-gold-ink)] origin-left transition-transform duration-200 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
                className="hidden sm:inline-flex items-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] p-0.5 shadow-sm"
                role="group"
                aria-label={
                  locale === "ru"
                    ? "Выбор языка"
                    : locale === "en"
                    ? "Language selector"
                    : "Tilni tanlash"
                }
              >
                {(["uz", "ru", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageChange(lang)}
                    className={`min-h-[44px] min-w-[44px] px-3 py-2 text-[11px] font-mono font-semibold uppercase rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] active:scale-[0.98] ${
                      locale === lang
                        ? "bg-[var(--bg-dark)] text-[var(--bg-surface)] font-bold"
                        : "text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
                    }`}
                    aria-pressed={locale === lang}
                    aria-label={`${lang.toUpperCase()} ${
                      locale === "ru" ? "язык" : locale === "en" ? "language" : "tili"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Consultation Booking CTA */}
              <BookingActionLink
                locale={locale}
                className="hidden md:inline-flex items-center justify-center min-h-[44px] px-4 2xl:px-5 max-w-[195px] text-center leading-[1.2] bg-[var(--bg-dark)] text-[var(--bg-surface)] text-[11px] font-sans font-semibold uppercase tracking-[0.12em] rounded-[2px] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] active:scale-[0.98] transition-[background-color,border-color,color,transform] duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)]"
              >
                <span>{content.navigation.ctaButton || "Uchrashuv bo‘yicha yozish"}</span>
              </BookingActionLink>

              {/* Mobile / Tablet Menu Toggle Button (Min 44px touch target) */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden min-h-[44px] min-w-[44px] w-11 h-11 p-2.5 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] text-[var(--text-ink)] hover:bg-[var(--bg-stone)] active:scale-[0.96] transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-drawer-panel"
                aria-label={
                  mobileMenuOpen
                    ? locale === "ru"
                      ? "Закрыть меню"
                      : locale === "en"
                      ? "Close menu"
                      : "Menyuni yopish"
                    : locale === "ru"
                    ? "Открыть меню"
                    : locale === "en"
                    ? "Open menu"
                    : "Menyuni ochish"
                }
              >
                <div className="w-5 h-3.5 flex flex-col justify-between" aria-hidden="true">
                  <span
                    className={`block h-[1.75px] w-full bg-[var(--bg-dark)] rounded transition-transform duration-200 ${
                      mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-full bg-[var(--bg-dark)] rounded transition-opacity duration-200 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.75px] w-full bg-[var(--bg-dark)] rounded transition-transform duration-200 ${
                      mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile / Tablet Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[var(--bg-backdrop)] backdrop-blur-sm z-[1999] xl:hidden animate-in fade-in duration-200"
          onClick={() => {
            setMobileMenuOpen(false);
            toggleButtonRef.current?.focus();
          }}
          aria-hidden="true"
        />
      )}

      {/* Accessible Mobile / Tablet Drawer Panel */}
      <aside
        ref={drawerPanelRef}
        id="mobile-drawer-panel"
        className={`fixed top-0 right-0 w-full max-w-[320px] h-full bg-[var(--bg-alabaster)] border-l border-[var(--border-hairline)] z-[2000] flex flex-col p-5 shadow-[var(--shadow-editorial-drawer)] overflow-y-auto transition-[transform,visibility] duration-300 ease-in-out xl:hidden ${
          mobileMenuOpen
            ? "translate-x-0 visible"
            : "translate-x-full invisible pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={
          locale === "ru"
            ? "Мобильное меню"
            : locale === "en"
            ? "Mobile navigation menu"
            : "Mobil navigatsiya menyusi"
        }
        aria-hidden={!mobileMenuOpen}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline-subtle)] mb-4 gap-3">
          <div className="min-w-0 flex-1">
            <span className="font-serif font-bold text-sm tracking-[0.08em] text-[var(--text-ink)] truncate block uppercase">
              ANVAR ABDUQAYUM
            </span>
            <span className="text-[11px] font-sans text-[var(--text-muted-aa)] block mt-0.5">
              {locale === "ru" ? "Навигация" : locale === "en" ? "Navigation" : "Navigatsiya"}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              toggleButtonRef.current?.focus();
            }}
            className="min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[4px] text-2xl font-light text-[var(--text-ink)] hover:bg-[var(--bg-dark)] hover:text-[var(--bg-surface)] active:scale-[0.96] transition-[background-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
            aria-label={
              locale === "ru"
                ? "Закрыть меню"
                : locale === "en"
                ? "Close menu"
                : "Menyuni yopish"
            }
          >
            &times;
          </button>
        </div>

        {/* Mobile Language Switcher Row (44px min touch target) */}
        <div
          className="grid grid-cols-3 gap-1.5 pb-4 mb-4 border-b border-[var(--border-hairline-subtle)]"
          role="group"
          aria-label={
            locale === "ru"
              ? "Выбор языка"
              : locale === "en"
              ? "Language selection"
              : "Mobil tilni tanlash"
          }
        >
          {(["uz", "ru", "en"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                handleLanguageChange(lang);
                setMobileMenuOpen(false);
              }}
              className={`min-h-[44px] flex items-center justify-center text-[11px] font-mono font-semibold uppercase rounded-[2px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] active:scale-[0.98] ${
                locale === lang
                  ? "bg-[var(--bg-dark)] border-[var(--bg-dark)] text-[var(--bg-surface)] font-bold"
                  : "bg-[var(--bg-surface)] border-[var(--border-hairline)] text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
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
                  className={`min-h-[48px] py-3 flex items-center text-[13px] font-sans font-semibold uppercase tracking-[0.08em] border-b border-[var(--border-stone)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] active:opacity-80 ${
                    isActive
                      ? "text-[var(--accent-gold-ink)] font-bold"
                      : "text-[var(--text-ink)] hover:text-[var(--accent-gold-ink)]"
                  }`}
                >
                  {item.drawerLabel}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Drawer Bottom CTA */}
        <div className="mt-auto pt-4 border-t border-[var(--border-hairline-subtle)]">
          <BookingActionLink
            locale={locale}
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[48px] w-full px-4 text-center flex items-center justify-center bg-[var(--bg-dark)] text-[var(--bg-surface)] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] rounded-[2px] hover:bg-[var(--accent-gold-ink)] active:scale-[0.98] transition-[background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
          >
            <span>{content.navigation.ctaButton || "Uchrashuv bo‘yicha yozish"}</span>
          </BookingActionLink>
          <p className="font-sans text-[11px] text-[var(--text-muted-aa)] mt-3 text-center">
            {cityLabel}
          </p>
        </div>
      </aside>
    </>
  );
};
