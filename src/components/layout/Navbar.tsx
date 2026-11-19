"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getContent } from "@/config/content";
import { BookingActionLink } from "@/components/ui/BookingActionLink";
import { CommandPalette } from "@/components/ui/CommandPalette";

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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

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

    const mq = window.matchMedia("(min-width: 1024px)");
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
      "portfel",
      "yol",
      "tashabbuslar",
      "tamoyil",
      "media",
      "xizmatlar",
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

  const cityLabel =
    locale === "ru"
      ? "Ташкент, 2026"
      : locale === "en"
      ? "Tashkent, 2026"
      : "Toshkent, 2026";

  // Navigation items synced with approved Business Ecosystem homepage section IDs
  const navLinks = [
    {
      id: "portfel",
      href: "#portfel",
      desktopPrimary: true,
      label:
        locale === "ru"
          ? "Экосистема"
          : locale === "en"
          ? "Portfolio"
          : "Ekotizim",
      drawerLabel:
        locale === "ru"
          ? "02 — Экосистема и проекты"
          : locale === "en"
          ? "02 — Business Portfolio"
          : "02 — Biznes ekotizimi",
    },
    {
      id: "yol",
      href: "#yol",
      desktopPrimary: true,
      label:
        locale === "ru"
          ? "Хроника"
          : locale === "en"
          ? "Journey"
          : "Faoliyat yo‘li",
      drawerLabel:
        locale === "ru"
          ? "03 — Путь предпринимателя"
          : locale === "en"
          ? "03 — Entrepreneurial Journey"
          : "03 — Bosib o‘tilgan yo‘l",
    },
    {
      id: "tashabbuslar",
      href: "#tashabbuslar",
      desktopPrimary: true,
      label:
        locale === "ru"
          ? "Инициативы"
          : locale === "en"
          ? "Initiatives"
          : "Tashabbuslar",
      drawerLabel:
        locale === "ru"
          ? "04 — Текущие инициативы"
          : locale === "en"
          ? "04 — Current Initiatives"
          : "04 — Joriy tashabbuslar",
    },
    {
      id: "tamoyil",
      href: "#tamoyil",
      desktopPrimary: true,
      label:
        locale === "ru"
          ? "Принцип"
          : locale === "en"
          ? "Philosophy"
          : "Qolip tamoyili",
      drawerLabel:
        locale === "ru"
          ? "05 — Принцип «Колип»"
          : locale === "en"
          ? "05 — Management Philosophy"
          : "05 — Qolip tamoyili",
    },
    {
      id: "media",
      href: "#media",
      desktopPrimary: true,
      label:
        locale === "ru"
          ? "Медиа"
          : locale === "en"
          ? "Media"
          : "Media",
      drawerLabel:
        locale === "ru"
          ? "06 — Знания и медиа"
          : locale === "en"
          ? "06 — Knowledge & Media"
          : "06 — Bilimlar va media",
    },
    {
      id: "xizmatlar",
      href: "#xizmatlar",
      desktopPrimary: false,
      label:
        locale === "ru"
          ? "B2B-диалог"
          : locale === "en"
          ? "Collaboration"
          : "Hamkorlik",
      drawerLabel:
        locale === "ru"
          ? "07 — Концепция B2B-диалога"
          : locale === "en"
          ? "07 — B2B Collaboration Concept"
          : "07 — B2B hamkorlik",
    },
    {
      id: "aloqa",
      href: "#aloqa",
      desktopPrimary: true,
      label: content.navigation.contact || "Aloqa",
      drawerLabel:
        locale === "ru"
          ? "08 — Официальные контакты"
          : locale === "en"
          ? "08 — Official Contact"
          : "08 — Rasmiy aloqa",
    },
  ];

  const desktopNavLinks = navLinks.filter((item) => item.desktopPrimary);

  const ctaLabel = content.navigation.ctaButton || "Hamkorlik tartibi";

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
        className={`sticky top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,padding,box-shadow] duration-200 ${
          scrolled
            ? "bg-[var(--bg-alabaster-glass)] backdrop-blur-md border-[var(--border-hairline)] py-3 shadow-[var(--shadow-editorial-header)]"
            : "bg-[var(--bg-alabaster)] border-[var(--border-hairline-subtle)] py-4"
        }`}
      >
        {/* Subtle gold hairline on bottom edge when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/30 to-transparent transition-opacity duration-300 pointer-events-none ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-2.5 xl:gap-4">
            {/* Brand Monogram */}
            <Link
              href={`/${locale}`}
              className="group min-h-[40px] flex flex-col justify-center py-1 min-w-0 shrink-0 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)]"
            >
              <span className="font-serif text-[15px] min-[360px]:text-base sm:text-lg xl:text-[19px] 2xl:text-[21px] font-bold tracking-[0.04em] min-[360px]:tracking-[0.06em] xl:tracking-[0.08em] text-[var(--text-ink)] uppercase leading-none whitespace-nowrap">
                ANVAR ABDUQAYUM<span className="text-[var(--accent-gold-ink)]">.</span>
              </span>
              <span className="sr-only">
                {locale === "ru"
                  ? "На главную"
                  : locale === "en"
                  ? "Home"
                  : "Bosh sahifa"}
              </span>
            </Link>

            {/* Desktop Navigation Links (Responsive from lg: 1024px+ with interactive gliding indicator) */}
            <nav
              aria-label={
                locale === "ru"
                  ? "Основное меню"
                  : locale === "en"
                  ? "Primary navigation"
                  : "Asosiy menyu"
              }
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-2.5 shrink-0"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {desktopNavLinks.map((item) => {
                const targetHref = isHomePage
                  ? item.href
                  : `/${locale}${item.href}`;
                const isActive = activeSection === item.id;
                const isHovered = hoveredLink === item.id;

                return (
                  <a
                    key={item.id}
                    href={targetHref}
                    onMouseEnter={() => setHoveredLink(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative min-h-[36px] xl:min-h-[38px] inline-flex items-center justify-center whitespace-nowrap px-1.5 xl:px-2 2xl:px-2.5 py-1.5 text-[10.5px] xl:text-[11px] 2xl:text-[11.5px] font-sans font-semibold uppercase tracking-[0.04em] xl:tracking-[0.07em] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)] active:opacity-80 shrink-0 ${
                      isActive
                        ? "text-[var(--text-ink)] font-bold"
                        : "text-[var(--text-soft-editorial)] hover:text-[var(--text-ink)]"
                    }`}
                  >
                    {/* Floating Hover Background Pill (for inactive links) */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-[#111215]/[0.04] rounded-[4px] border border-[var(--border-hairline)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}

                    <span className="relative z-10 whitespace-nowrap">{item.label}</span>

                    {/* Active Golden Underline with Crisp High Contrast */}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-1 right-1 h-[2px] bg-[var(--accent-gold-ink)] rounded-full shadow-[0_1px_3px_rgba(122,86,0,0.35)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    ) : (
                      <span className="absolute bottom-1 left-1 right-1 h-[1.5px] bg-[var(--accent-gold-ink)]/40 rounded-full scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-200" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Tools: Language Select Option & Consultation CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Minimalist Editorial Monographic Language Switcher */}
              <div
                className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[3px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] font-mono text-[10px] uppercase tracking-wider shrink-0"
                role="group"
                aria-label={
                  locale === "ru"
                    ? "Выбор языка"
                    : locale === "en"
                    ? "Language selector"
                    : "Tilni tanlash"
                }
              >
                {(["uz", "ru", "en"] as const).map((lang, idx) => {
                  const isSelected = locale === lang;
                  return (
                    <React.Fragment key={lang}>
                      {idx > 0 && (
                        <span className="text-[var(--border-hairline-editorial-strong)] select-none text-[8.5px]">
                          /
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(lang)}
                        aria-pressed={isSelected}
                        className={`px-1 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                          isSelected
                            ? "font-bold text-[var(--accent-gold-ink)] bg-[var(--accent-gold)]/10"
                            : "text-[var(--text-muted-aa)] hover:text-[var(--text-ink)]"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Executive Command Palette Trigger [ Search Icon ] */}
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="min-h-[34px] min-w-[34px] xl:min-h-[38px] xl:min-w-[38px] p-1.5 xl:p-2 inline-flex items-center justify-center rounded-[4px] bg-[#17181D] border border-[rgba(212,175,55,0.35)] hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#1E2027] active:scale-[0.98] transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shrink-0 cursor-pointer"
                aria-label={
                  locale === "ru"
                    ? "Поиск и команды (⌘K)"
                    : locale === "en"
                    ? "Search & Command Palette (⌘K)"
                    : "Qidiruv va buyruqlar paneli (⌘K)"
                }
                title={
                  locale === "ru"
                    ? "Поиск по сайту (⌘K / Ctrl+K)"
                    : locale === "en"
                    ? "Search site (⌘K / Ctrl+K)"
                    : "Sayt bo‘yicha qidiruv (⌘K / Ctrl+K)"
                }
              >
                <svg
                  className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#D4AF37]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              {/* Consultation Booking CTA (shows from xl: 1280px+ to ensure zero overflow) */}
              <BookingActionLink
                locale={locale}
                className="hidden xl:inline-flex items-center justify-center min-h-[36px] xl:min-h-[38px] px-3.5 xl:px-4 2xl:px-5 whitespace-nowrap text-center leading-none bg-[var(--bg-dark)] text-[var(--bg-surface)] text-[10.5px] xl:text-[11px] font-sans font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] rounded-[4px] border border-[var(--bg-dark)] hover:bg-[var(--accent-gold-ink)] hover:border-[var(--accent-gold-ink)] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-alabaster)] shrink-0"
              >
                <span className="whitespace-nowrap">{ctaLabel}</span>
              </BookingActionLink>

              {/* Mobile / Tablet Menu Toggle Button (Min 44px touch target) */}
              <button
                ref={toggleButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] w-11 h-11 p-2.5 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[6px] text-[var(--text-ink)] hover:bg-[var(--bg-stone)] active:scale-[0.96] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] shrink-0"
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

      {/* Accessible Mobile / Tablet Drawer with Framer Motion Spring Physics */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with Blur Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1999] lg:hidden"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleButtonRef.current?.focus();
              }}
              aria-hidden="true"
            />

            {/* Mobile / Tablet Drawer Panel */}
            <motion.aside
              ref={drawerPanelRef}
              id="mobile-drawer-panel"
              role="dialog"
              aria-modal="true"
              aria-label={
                locale === "ru"
                  ? "Мобильное меню"
                  : locale === "en"
                  ? "Mobile navigation menu"
                  : "Mobil navigatsiya menyusi"
              }
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 w-full max-w-[340px] sm:max-w-[380px] h-full bg-[var(--bg-alabaster)] border-l border-[var(--border-hairline)] z-[2000] flex flex-col p-4 min-[380px]:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl overflow-y-auto overscroll-contain lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline-subtle)] mb-4 gap-3">
                <div className="min-w-0 flex-1">
                  <span className="font-serif font-bold text-base tracking-[0.08em] text-[var(--text-ink)] whitespace-nowrap truncate block uppercase">
                    ANVAR ABDUQAYUM<span className="text-[var(--accent-gold-ink)]">.</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-gold-ink)] whitespace-nowrap block mt-0.5">
                    {locale === "ru" ? "Навигация и сервисы" : locale === "en" ? "Navigation & Services" : "Navigatsiya va xizmatlar"}
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleButtonRef.current?.focus();
                  }}
                  className="min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-[6px] text-xl font-light text-[var(--text-ink)] hover:bg-[var(--bg-dark)] hover:text-[var(--bg-surface)] active:scale-[0.96] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                  aria-label={
                    locale === "ru"
                      ? "Закрыть меню"
                      : locale === "en"
                      ? "Close menu"
                      : "Menyuni yopish"
                  }
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Language Switcher (Segmented luxury control) */}
              <div className="mb-5 pb-4 border-b border-[var(--border-hairline-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted-aa)]">
                    {locale === "ru" ? "Язык интерфейса" : locale === "en" ? "Interface Language" : "Interfeys tili"}
                  </span>
                </div>
                <div
                  className="relative flex items-center p-1 bg-[#17181D] rounded-[6px] border border-[rgba(212,175,55,0.25)] shadow-sm"
                  role="group"
                  aria-label={
                    locale === "ru"
                      ? "Выбор языка"
                      : locale === "en"
                      ? "Language selection"
                      : "Mobil tilni tanlash"
                  }
                >
                  {(["uz", "ru", "en"] as const).map((lang) => {
                    const isSelected = locale === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          handleLanguageChange(lang);
                          setMobileMenuOpen(false);
                        }}
                        className={`relative flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-[4px] transition-colors z-10 ${
                          isSelected
                            ? "text-[#D4AF37]"
                            : "text-[#9EA3B0] hover:text-[#FFFFFF]"
                        }`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="mobileActiveLangPill"
                            className="absolute inset-0 bg-[#252832] rounded-[4px] shadow-sm border border-[rgba(212,175,55,0.5)]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 tracking-wider">
                          {lang === "uz" ? "UZ" : lang === "ru" ? "RU" : "EN"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Command Palette Trigger */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandPaletteOpen(true);
                }}
                className="min-h-[44px] w-full mb-5 flex items-center justify-between px-3.5 py-2.5 rounded-[6px] bg-[#17181D] border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] text-[#F5F4F0] text-xs font-mono transition-colors active:scale-[0.98] shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <span className="font-sans font-medium text-[#E1E4EA]">
                    {locale === "ru"
                      ? "Командная панель"
                      : locale === "en"
                      ? "Command Palette"
                      : "Buyruqlar paneli"}
                  </span>
                </span>
                <kbd className="px-2 py-0.5 rounded bg-[#111215] text-[#D4AF37] text-[10px] border border-[#D4AF37]/30 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Navigation Links with Stagger Animation */}
              <ul className="flex flex-col gap-1 mb-6 list-none p-0 m-0">
                {navLinks.map((item, index) => {
                  const targetHref = isHomePage
                    ? item.href
                    : `/${locale}${item.href}`;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.035, duration: 0.2 }}
                    >
                      <a
                        href={targetHref}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group min-h-[46px] px-3 py-2.5 flex items-center justify-between text-[12.5px] font-sans font-semibold uppercase tracking-[0.06em] rounded-[6px] transition-all duration-150 border-b border-[var(--border-stone)]/40 ${
                          isActive
                            ? "bg-[var(--accent-gold)]/10 text-[var(--accent-gold-ink)] border-[var(--accent-gold)]/30 font-bold"
                            : "text-[var(--text-ink)] hover:bg-[var(--bg-stone)]/60 hover:text-[var(--accent-gold-ink)]"
                        }`}
                      >
                        <span>{item.drawerLabel}</span>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold-ink)] shadow-[0_0_6px_var(--accent-gold-ink)]" />
                        ) : (
                          <span className="text-[var(--text-soft-editorial)] group-hover:translate-x-0.5 transition-transform text-xs">
                            →
                          </span>
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer Bottom CTA */}
              <div className="mt-auto pt-4 border-t border-[var(--border-hairline-subtle)]">
                <BookingActionLink
                  locale={locale}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[46px] w-full px-4 text-center flex items-center justify-center whitespace-nowrap bg-[var(--bg-dark)] text-[var(--bg-surface)] text-[11px] font-sans font-semibold uppercase tracking-[0.12em] rounded-[4px] hover:bg-[var(--accent-gold-ink)] active:scale-[0.98] transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span className="whitespace-nowrap">{ctaLabel}</span>
                </BookingActionLink>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted-aa)] mt-3 text-center whitespace-nowrap">
                  {cityLabel}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Executive Command Palette Modal */}
      <CommandPalette
        locale={locale}
        isOpen={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
    </>
  );
};
