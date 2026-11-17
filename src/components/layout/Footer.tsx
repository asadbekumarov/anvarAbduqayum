"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { BookingActionLink } from "@/components/ui/BookingActionLink";

interface FooterProps {
  locale?: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const routeLocale = useLocale();
  const pathname = usePathname() || "/";
  const rawLocale = locale || routeLocale || "uz";
  const safeLocale = rawLocale === "ru" || rawLocale === "en" ? rawLocale : "uz";
  const content = getContent(safeLocale);
  const { footer } = content;

  const isHomePage =
    pathname === `/${safeLocale}` ||
    pathname === `/${safeLocale}/` ||
    pathname === "/";

  const navLinks = [
    {
      href: "#hero",
      label:
        footer.indexLinks.find((l) => l.anchor === "#hero")?.label ||
        (safeLocale === "ru"
          ? "Главная"
          : safeLocale === "en"
          ? "Home"
          : "Asosiy sahifa"),
    },
    {
      href: "#portfel",
      label:
        footer.indexLinks.find((l) => l.anchor === "#portfel")?.label ||
        (safeLocale === "ru"
          ? "Экосистема бизнесов"
          : safeLocale === "en"
          ? "Business Portfolio"
          : "Biznes ekotizimi"),
    },
    {
      href: "#yol",
      label:
        footer.indexLinks.find((l) => l.anchor === "#yol")?.label ||
        (safeLocale === "ru"
          ? "Путь предпринимателя"
          : safeLocale === "en"
          ? "Journey"
          : "Faoliyat yo‘li"),
    },
    {
      href: "#tamoyil",
      label:
        footer.indexLinks.find((l) => l.anchor === "#tamoyil")?.label ||
        (safeLocale === "ru"
          ? "Принцип «Колип»"
          : safeLocale === "en"
          ? "Qolip Philosophy"
          : "Qolip tamoyili"),
    },
    {
      href: "#media",
      label:
        footer.indexLinks.find((l) => l.anchor === "#media")?.label ||
        (safeLocale === "ru"
          ? "Знания и медиа"
          : safeLocale === "en"
          ? "Knowledge & Media"
          : "Media"),
    },
    {
      href: "#aloqa",
      label:
        footer.indexLinks.find((l) => l.anchor === "#aloqa")?.label ||
        (safeLocale === "ru"
          ? "Контакты"
          : safeLocale === "en"
          ? "Contact"
          : "Aloqa"),
    },
  ];

  const address =
    contactConfig.office[
      safeLocale === "ru"
        ? "addressRu"
        : safeLocale === "en"
        ? "addressEn"
        : "addressUz"
    ];

  return (
    <footer
      id="sayt-yakuni"
      className="bg-[#090A0D] text-[#FFFFFF] border-t border-[rgba(212,175,55,0.2)] py-14 sm:py-20 selection:bg-[#D4AF37] selection:text-[#090A0D]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Tier: Monograph Brand Signature + Editorial Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-white/[0.08]">
          <div className="min-w-0">
            <h2 className="font-serif text-[28px] sm:text-[36px] font-bold tracking-tight text-[#FFFFFF]">
              {footer.founderName}
              <span className="text-[#D4AF37]">.</span>
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15.5px] font-serif italic text-[#A6ACBA] max-w-[580px] leading-relaxed">
              «{footer.tagline}»
            </p>
          </div>

          <div className="shrink-0">
            <BookingActionLink
              locale={safeLocale}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[3px] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090A0D] font-mono text-[12px] uppercase font-bold tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
            >
              <span>{footer.bookingCta}</span>
              <span aria-hidden="true">→</span>
            </BookingActionLink>
          </div>
        </div>

        {/* Middle Tier: 3-Column Architectural Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 py-12 sm:py-16 border-b border-white/[0.08]">
          {/* Column 1 (md:col-span-5): Index Navigation */}
          <div className="md:col-span-5 min-w-0">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.navHeading || "Sayt mundarijasi"}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((item) => {
                const targetHref = isHomePage
                  ? item.href
                  : `/${safeLocale}${item.href}`;
                return (
                  <li key={item.href}>
                    <Link
                      href={targetHref}
                      className="text-[13.5px] text-[#C2C7D1] hover:text-[#D4AF37] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2 (md:col-span-4): Verified Public Channels */}
          <div className="md:col-span-4 min-w-0">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.platformsHeading || "Rasmiy kanallar"}
            </h3>
            <ul className="flex flex-col gap-3">
              {contactConfig.instagram.url && (
                <li>
                  <a
                    href={contactConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 py-1 text-[13.5px] text-[#C2C7D1] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span className="font-medium text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors">
                      Instagram
                    </span>
                    <span className="font-mono text-[11.5px] text-[#7A8290]">
                      {contactConfig.instagram.display}
                    </span>
                    <span className="font-mono text-[12px] text-[#7A8290] group-hover:text-[#D4AF37] transition-colors">
                      ↗
                    </span>
                  </a>
                </li>
              )}
              {contactConfig.youtube.url && (
                <li>
                  <a
                    href={contactConfig.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 py-1 text-[13.5px] text-[#C2C7D1] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span className="font-medium text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors">
                      YouTube
                    </span>
                    <span className="font-mono text-[11.5px] text-[#7A8290]">
                      {contactConfig.youtube.display}
                    </span>
                    <span className="font-mono text-[12px] text-[#7A8290] group-hover:text-[#D4AF37] transition-colors">
                      ↗
                    </span>
                  </a>
                </li>
              )}
              <li>
                <div className="inline-flex items-center gap-2.5 py-1 text-[13.5px] text-[#C2C7D1]">
                  <span className="font-medium text-[#FFFFFF]">Telegram</span>
                  <span className="font-mono text-[11.5px] text-[#7A8290]">
                    Rasmiy qabulxona
                  </span>
                  <span className="font-mono text-[10px] text-[#D4AF37] uppercase px-1.5 py-0.5 rounded-[2px] bg-[#D4AF37]/10 border border-[#D4AF37]/25">
                    Onlayn
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 (md:col-span-3): Industrial Headquarters & Protocol */}
          <div className="md:col-span-3 min-w-0">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.contactHeading || "Qarorgoh va qabul"}
            </h3>
            <div className="flex flex-col gap-3 text-[13.5px] text-[#9EA6B5] leading-relaxed">
              <p className="text-[#FFFFFF] font-medium">
                {address || "Toshkent shahri, O‘zbekiston"}
              </p>
              <p className="text-[12.5px] text-[#8E95A5]">
                «VISAGE ELECTRIC» MChJ, Toybola zavodi va UZBIC Kengashi.
              </p>
              <div className="pt-2 border-t border-white/[0.06]">
                <p className="text-[12px] text-[#7A8290] leading-relaxed">
                  Barcha rasmiy murojaatlar sayt qabulxonasi va kotibiyat reglamenti asosida ko‘rib chiqiladi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Colophon & Return to Top */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-mono text-[11.5px] text-[#7A8290] text-left">
            {footer.colophonNote}
          </p>

          {isHomePage ? (
            <a
              href="#hero"
              className="font-mono text-[11.5px] uppercase tracking-[0.12em] font-semibold text-[#8E95A5] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{footer.backToTop}</span>
              <span aria-hidden="true">↑</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-[11.5px] uppercase tracking-[0.12em] font-semibold text-[#8E95A5] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 shrink-0 self-start sm:self-auto"
            >
              <span>{footer.backToTop}</span>
              <span aria-hidden="true">↑</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
