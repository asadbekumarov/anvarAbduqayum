"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter, usePathname } from "next/navigation";
import { getContent } from "@/config/content";

export interface CommandPaletteProps {
  locale?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "quick" | "portfolio" | "sections";
  categoryLabel: string;
  badge?: string;
  shortcut?: string;
  onSelect: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  locale = "uz",
  isOpen: controlledIsOpen,
  onOpenChange: setControlledIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBlueprint, setIsBlueprint] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback((open: boolean) => {
    if (isControlled) {
      setControlledIsOpen?.(open);
    } else {
      setInternalIsOpen(open);
    }
  }, [isControlled, setControlledIsOpen]);

  const router = useRouter();
  const pathname = usePathname();
  const content = getContent(locale);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Sync blueprint mode on client
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsBlueprint(document.documentElement.classList.contains("blueprint-mode"));
    }
  }, [isOpen]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Listen to custom window events for opening
  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => window.removeEventListener("open-command-palette", handleCustomOpen);
  }, [setIsOpen]);

  // Reset query and selected index on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Toggle Blueprint Mode
  const toggleBlueprint = useCallback(() => {
    const active = document.documentElement.classList.toggle("blueprint-mode");
    setIsBlueprint(active);
    try {
      localStorage.setItem("blueprint-mode", active ? "1" : "0");
    } catch {
      // storage unavailable
    }
    setIsOpen(false);
  }, [setIsOpen]);

  // Jump to page section smoothly
  const jumpToSection = useCallback((hash: string) => {
    setIsOpen(false);
    const targetId = hash.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      router.push(`/${locale}#${targetId}`);
    }
  }, [locale, router, setIsOpen]);

  // Switch locale
  const switchLocale = useCallback((newLocale: string) => {
    setIsOpen(false);
    if (newLocale === locale) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["uz", "ru", "en"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join("/")}`);
  }, [locale, pathname, router, setIsOpen]);

  // Localized Labels
  const i18n = useMemo(() => {
    return {
      uz: {
        searchPlaceholder: "Buyruq qidiring yoki bo‘limga o‘ting...",
        quickTitle: "Tezkor amallar",
        portfolioTitle: "Portfel korxonalari",
        sectionsTitle: "Asosiy bo‘limlar",
        bookMeeting: "Uchrashuv rejalashtirish",
        bookDesc: "B2B strategik uchrashuv yoki boshqaruv dialogi",
        diagnostic: "B2B diagnostika testi",
        diagnosticDesc: "Tizimlashtirish darajasini aniqlovchi ekspress-test",
        blueprint: "Blueprint rejimini almashtirish",
        blueprintDesc: "CAD arxitektura chizma setkasi va indikatorlarini ko‘rsatish",
        active: "YOQILGAN",
        inactive: "O‘CHIRILGAN",
        noResults: "Mos keluvchi buyruq yoki korxona topilmadi.",
        navHint: "Harakatlanish",
        selectHint: "Tanlash",
        closeHint: "Yopish",
        heroSection: "Bosh sahifa / Matritsa",
        heroDesc: "Boshqaruv arxitekturasi va asosiy metrikalar",
        portfolioSection: "Biznes ekotizimi",
        portfolioDesc: "Sanoat, HORECA va xizmat kompaniyalari",
        principlesSection: "Qolip tamoyili",
        principlesDesc: "Avtonom boshqaruv metodologiyasi va audio tezislar",
        mediaSection: "Bilimlar va media",
        mediaDesc: "Tasdiqlangan video tahlillar va amaliy darslar",
        contactSection: "Rasmiy aloqa",
        contactDesc: "Boshqaruv qabulxonasi va rasmiy murojaat formati",
      },
      ru: {
        searchPlaceholder: "Поиск команды или раздел...",
        quickTitle: "Быстрые действия",
        portfolioTitle: "Компании портфеля",
        sectionsTitle: "Ключевые разделы",
        bookMeeting: "Запланировать встречу",
        bookDesc: "B2B стратегический диалог или управленческий совет",
        diagnostic: "B2B Экспресс-диагностика",
        diagnosticDesc: "Тест уровня систематизации бизнеса",
        blueprint: "Переключить Blueprint-режим",
        blueprintDesc: "Архитектурная сетка чертежей и технические индикаторы",
        active: "ВКЛЮЧЕН",
        inactive: "ВЫКЛЮЧЕН",
        noResults: "Команд или предприятий не найдено.",
        navHint: "Навигация",
        selectHint: "Выбрать",
        closeHint: "Закрыть",
        heroSection: "Главная / Матрица",
        heroDesc: "Управленческая архитектура и ключевые показатели",
        portfolioSection: "Бизнес-экосистема",
        portfolioDesc: "Промышленные, HORECA и сервисные активы",
        principlesSection: "Принцип «Колип»",
        principlesDesc: "Методология автономного управления и аудио-тезисы",
        mediaSection: "Знания и медиа",
        mediaDesc: "Верифицированные видео-разборы и практика",
        contactSection: "Официальные контакты",
        contactDesc: "Приемная и формат институционального обращения",
      },
      en: {
        searchPlaceholder: "Type a command or jump to section...",
        quickTitle: "Quick Actions",
        portfolioTitle: "Portfolio Ventures",
        sectionsTitle: "Core Sections",
        bookMeeting: "Book an Executive Meeting",
        bookDesc: "Schedule strategic B2B consultation or board dialog",
        diagnostic: "B2B Diagnostic Assessment",
        diagnosticDesc: "Express audit on management systematization level",
        blueprint: "Toggle Blueprint Mode",
        blueprintDesc: "Architectural CAD guidelines & blueprint overlay",
        active: "ACTIVE",
        inactive: "DEFAULT",
        noResults: "No matching commands or ventures found.",
        navHint: "Navigate",
        selectHint: "Select",
        closeHint: "Close",
        heroSection: "Executive Matrix (Hero)",
        heroDesc: "Operating architecture and verified scale metrics",
        portfolioSection: "Business Portfolio",
        portfolioDesc: "Manufacturing, hospitality and service ecosystem",
        principlesSection: "The Mold Principle",
        principlesDesc: "Autonomous governance framework & audio theses",
        mediaSection: "Knowledge & Media",
        mediaDesc: "Verified video briefings and operational analysis",
        contactSection: "Official Contact",
        contactDesc: "Executive reception and formal engagement channels",
      },
    }[locale as "uz" | "ru" | "en"] || {
      searchPlaceholder: "Type a command or jump to section...",
      quickTitle: "Quick Actions",
      portfolioTitle: "Portfolio Ventures",
      sectionsTitle: "Core Sections",
      bookMeeting: "Book an Executive Meeting",
      bookDesc: "Schedule strategic B2B consultation or board dialog",
      diagnostic: "B2B Diagnostic Assessment",
      diagnosticDesc: "Express audit on management systematization level",
      blueprint: "Toggle Blueprint Mode",
      blueprintDesc: "Architectural CAD guidelines & blueprint overlay",
      active: "ACTIVE",
      inactive: "DEFAULT",
      noResults: "No matching commands or ventures found.",
      navHint: "Navigate",
      selectHint: "Select",
      closeHint: "Close",
      heroSection: "Executive Matrix (Hero)",
      heroDesc: "Operating architecture and verified scale metrics",
      portfolioSection: "Business Portfolio",
      portfolioDesc: "Manufacturing, hospitality and service ecosystem",
      principlesSection: "The Mold Principle",
      principlesDesc: "Autonomous governance framework & audio theses",
      mediaSection: "Knowledge & Media",
      mediaDesc: "Verified video briefings and operational analysis",
      contactSection: "Official Contact",
      contactDesc: "Executive reception and formal engagement channels",
    };
  }, [locale]);

  // Compile all available items
  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];

    // 1. Quick Actions
    items.push(
      {
        id: "action-hamkorlik",
        title: locale === "ru" ? "Заявка на партнерство" : locale === "en" ? "Partnership Inquiry" : "Hamkorlik arizasi",
        subtitle: locale === "ru" ? "B2B партнерство и экспорт" : locale === "en" ? "B2B partnership portal" : "B2B hamkorlik portali",
        category: "quick",
        categoryLabel: i18n.quickTitle,
        shortcut: "H",
        onSelect: () => {
          setIsOpen(false);
          router.push(`/${locale}/hamkorlik`);
        },
      },
      {
        id: "action-test",
        title: i18n.diagnostic,
        subtitle: i18n.diagnosticDesc,
        category: "quick",
        categoryLabel: i18n.quickTitle,
        shortcut: "T",
        onSelect: () => {
          setIsOpen(false);
          router.push(`/${locale}/test`);
        },
      },
      {
        id: "action-blueprint",
        title: i18n.blueprint,
        subtitle: i18n.blueprintDesc,
        category: "quick",
        categoryLabel: i18n.quickTitle,
        badge: isBlueprint ? i18n.active : i18n.inactive,
        shortcut: "P",
        onSelect: toggleBlueprint,
      },
      {
        id: "action-lang-uz",
        title: "O‘zbekcha (UZ)",
        subtitle: "O‘zbek tiliga o‘tish (Lotin)",
        category: "quick",
        categoryLabel: i18n.quickTitle,
        badge: locale === "uz" ? "✓" : undefined,
        onSelect: () => switchLocale("uz"),
      },
      {
        id: "action-lang-ru",
        title: "Русский (RU)",
        subtitle: "Переключить на русский язык",
        category: "quick",
        categoryLabel: i18n.quickTitle,
        badge: locale === "ru" ? "✓" : undefined,
        onSelect: () => switchLocale("ru"),
      },
      {
        id: "action-lang-en",
        title: "English (EN)",
        subtitle: "Switch interface to English",
        category: "quick",
        categoryLabel: i18n.quickTitle,
        badge: locale === "en" ? "✓" : undefined,
        onSelect: () => switchLocale("en"),
      }
    );

    // 2. Core Sections
    items.push(
      {
        id: "section-hero",
        title: i18n.heroSection,
        subtitle: i18n.heroDesc,
        category: "sections",
        categoryLabel: i18n.sectionsTitle,
        shortcut: "#hero",
        onSelect: () => jumpToSection("#hero"),
      },
      {
        id: "section-portfel",
        title: i18n.portfolioSection,
        subtitle: i18n.portfolioDesc,
        category: "sections",
        categoryLabel: i18n.sectionsTitle,
        shortcut: "#portfel",
        onSelect: () => jumpToSection("#portfel"),
      },
      {
        id: "section-tamoyil",
        title: i18n.principlesSection,
        subtitle: i18n.principlesDesc,
        category: "sections",
        categoryLabel: i18n.sectionsTitle,
        shortcut: "#tamoyil",
        onSelect: () => jumpToSection("#tamoyil"),
      },
      {
        id: "section-media",
        title: i18n.mediaSection,
        subtitle: i18n.mediaDesc,
        category: "sections",
        categoryLabel: i18n.sectionsTitle,
        shortcut: "#media",
        onSelect: () => jumpToSection("#media"),
      },
      {
        id: "section-aloqa",
        title: i18n.contactSection,
        subtitle: i18n.contactDesc,
        category: "sections",
        categoryLabel: i18n.sectionsTitle,
        shortcut: "#aloqa",
        onSelect: () => jumpToSection("#aloqa"),
      }
    );

    // 3. Portfolio Ventures (Dynamically from content.portfolio.companies)
    const companies = content.portfolio?.companies || [];
    companies.forEach((company) => {
      items.push({
        id: `venture-${company.id}`,
        title: company.name,
        subtitle: company.code,
        category: "portfolio",
        categoryLabel: i18n.portfolioTitle,
        badge: company.category?.toUpperCase(),
        onSelect: () => {
          setIsOpen(false);
          router.push(`/${locale}/portfel/${company.id}`);
        },
      });
    });

    return items;
  }, [
    locale,
    isBlueprint,
    content,
    i18n,
    router,
    setIsOpen,
    toggleBlueprint,
    switchLocale,
    jumpToSection,
  ]);

  // Filter items matching search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const lower = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle?.toLowerCase().includes(lower) ||
        item.badge?.toLowerCase().includes(lower) ||
        item.shortcut?.toLowerCase().includes(lower)
    );
  }, [allItems, query]);

  // Reset selectedIndex when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Ensure selected item stays in view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(
        `[data-index="${selectedIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length ? (prev + 1) % filteredItems.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length
          ? (prev - 1 + filteredItems.length) % filteredItems.length
          : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
      }
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#090A0D]/75 backdrop-blur-md z-[2000] animate-in fade-in duration-150" />
        <Dialog.Content
          onKeyDown={handleKeyDown}
          aria-describedby="palette-description"
          className="fixed top-[12%] sm:top-[16%] left-1/2 -translate-x-1/2 w-full max-w-[640px] px-4 z-[2001] outline-none"
        >
          <div className="bg-[#17181D]/95 backdrop-blur-2xl border border-[rgba(212,175,55,0.25)] rounded-[4px] shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
            {/* Header: Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.08)] bg-[#111215]/60">
              <span className="text-[#D4AF37] font-mono text-sm" aria-hidden="true">
                ⌘
              </span>
              <Dialog.Title className="sr-only">Executive Command Palette</Dialog.Title>
              <span id="palette-description" className="sr-only">
                Instant search and keyboard navigation across platform actions, portfolio companies and core sections
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={i18n.searchPlaceholder}
                className="w-full bg-transparent text-[#F5F4F0] placeholder-[#8E95A5] text-[13.5px] font-sans focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-[#111215] border border-[rgba(255,255,255,0.12)] text-[10px] font-mono text-[#8E95A5]">
                ESC
              </kbd>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto overscroll-contain py-2 divide-y divide-[rgba(255,255,255,0.04)]"
            >
              {filteredItems.length === 0 ? (
                <div className="px-6 py-10 text-center text-[#8E95A5] text-[13px] font-mono">
                  {i18n.noResults}
                </div>
              ) : (
                (() => {
                  let lastCategory = "";
                  return filteredItems.map((item, idx) => {
                    const isNewCategory = item.category !== lastCategory;
                    lastCategory = item.category;
                    const isSelected = idx === selectedIndex;

                    return (
                      <React.Fragment key={item.id}>
                        {isNewCategory && (
                          <div className="px-4 pt-2.5 pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]/80">
                            {item.categoryLabel}
                          </div>
                        )}
                        <button
                          type="button"
                          data-index={idx}
                          onClick={item.onSelect}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors duration-100 focus:outline-none ${
                            isSelected
                              ? "bg-[rgba(212,175,55,0.12)] border-l-2 border-l-[#D4AF37] text-[#F5F4F0]"
                              : "border-l-2 border-l-transparent text-[#C2C7D1] hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[13px] font-medium leading-snug truncate ${
                                  isSelected ? "text-[#F5F4F0] font-semibold" : "text-[#E1E4EA]"
                                }`}
                              >
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-[2px] bg-[#111215] border border-[rgba(212,175,55,0.3)] text-[#D4AF37]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-[11.5px] text-[#8E95A5] truncate font-sans mt-0.5">
                                {item.subtitle}
                              </p>
                            )}
                          </div>

                          {item.shortcut && (
                            <kbd className="shrink-0 font-mono text-[10px] text-[#8E95A5] px-1.5 py-0.5 rounded-[2px] bg-[#111215] border border-[rgba(255,255,255,0.08)]">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  });
                })()
              )}
            </div>

            {/* Footer / Shortcuts Help */}
            <div className="px-4 py-2 bg-[#111215] border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[10.5px] font-mono text-[#8E95A5]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-[#17181D] rounded border border-[rgba(255,255,255,0.1)]">↑↓</kbd>
                  <span>{i18n.navHint}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-[#17181D] rounded border border-[rgba(255,255,255,0.1)]">↵</kbd>
                  <span>{i18n.selectHint}</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-[#17181D] rounded border border-[rgba(255,255,255,0.1)]">ESC</kbd>
                <span>{i18n.closeHint}</span>
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
