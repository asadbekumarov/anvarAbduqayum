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

  // Clean, prioritized navigation links
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

  const partnershipHeading =
    safeLocale === "ru"
      ? "ПАРТНЕРСТВО И ПРИЕМ"
      : safeLocale === "en"
      ? "PARTNERSHIP & INTAKE"
      : "HAMKORLIK VA QABUL";

  const partnershipNote =
    safeLocale === "ru"
      ? "Официальные обращения и рассмотрение предложений по регламенту."
      : safeLocale === "en"
      ? "Official inquiries and proposal review according to standards."
      : "Rasmiy murojaatlar va takliflar reglament asosida ko‘rib chiqiladi.";

  return (
    <footer
      id="sayt-yakuni"
      className="bg-[#090909] text-[#FFFFFF] border-t border-[rgba(212,175,55,0.2)] py-16 sm:py-20 selection:bg-[#D4AF37] selection:text-[#090909]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Section: Brand + CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="min-w-0">
            <h2 className="font-sans text-[26px] sm:text-[34px] font-bold tracking-tight text-[#FFFFFF] uppercase">
              {footer.founderName}
              <span className="text-[#D4AF37]">.</span>
            </h2>
            <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-[#9A9A9A] max-w-[560px]">
              {footer.tagline}
            </p>
          </div>

          <div className="shrink-0">
            <BookingActionLink
              locale={safeLocale}
              className="group min-h-[48px] px-7 bg-transparent text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090909] rounded-[2px] text-[13px] font-bold uppercase tracking-[0.08em] inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.08)] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{footer.bookingCta}</span>
            </BookingActionLink>
          </div>
        </div>

        {/* Middle Links Grid: Responsive grid-cols-1 md:grid-cols-3 lg:grid-cols-4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 py-12 sm:py-16 border-b border-white/[0.08]">
          {/* Column 1: Sayt bo'limlari */}
          <div className="min-w-0">
            <h3 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.navHeading}
            </h3>
            <ul className="flex flex-col space-y-3">
              {navLinks.map((item) => {
                const targetHref = isHomePage
                  ? item.href
                  : `/${safeLocale}${item.href}`;
                return (
                  <li key={item.href}>
                    <Link
                      href={targetHref}
                      className="group inline-flex items-center text-[14px] text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="transition-colors duration-300">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2: Ommaviy kanallar */}
          <div className="min-w-0">
            <h3 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.platformsHeading}
            </h3>
            <ul className="flex flex-col space-y-3">
              {contactConfig.instagram.url && (
                <li>
                  <a
                    href={contactConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1"
                  >
                    <span>Instagram</span>
                    <span className="text-[#9A9A9A] text-[13px] group-hover:text-[#D4AF37]/80 transition-colors">
                      ({contactConfig.instagram.display})
                    </span>
                    <span className="text-[12px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
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
                    className="group inline-flex items-center gap-2 text-[14px] text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1"
                  >
                    <span>YouTube</span>
                    <span className="text-[#9A9A9A] text-[13px] group-hover:text-[#D4AF37]/80 transition-colors">
                      ({contactConfig.youtube.display})
                    </span>
                    <span className="text-[12px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      ↗
                    </span>
                  </a>
                </li>
              )}
              {contactConfig.telegramChannel.url && (
                <li>
                  <a
                    href={contactConfig.telegramChannel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[14px] text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1"
                  >
                    <span>Telegram</span>
                    <span className="text-[#9A9A9A] text-[13px] group-hover:text-[#D4AF37]/80 transition-colors">
                      ({contactConfig.telegramChannel.display})
                    </span>
                    <span className="text-[12px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      ↗
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Rasmiy aloqa */}
          <div className="min-w-0">
            <h3 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {footer.contactHeading}
            </h3>
            <div className="flex flex-col space-y-3 text-[14px]">
              <p className="text-[#9A9A9A] leading-relaxed">
                {address}
              </p>
              {contactConfig.email.address && (
                <div>
                  <a
                    href={`mailto:${contactConfig.email.address}`}
                    className="group inline-flex items-center gap-1.5 text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1"
                  >
                    <span>{contactConfig.email.address}</span>
                    <span className="text-[12px] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      ↗
                    </span>
                  </a>
                </div>
              )}
              {contactConfig.phone.isVerified && contactConfig.phone.display && (
                <div>
                  <a
                    href={contactConfig.phone.href}
                    className="group inline-flex items-center gap-1.5 text-[#FFFFFF] hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 font-mono text-[13.5px]"
                  >
                    <span>{contactConfig.phone.display}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Hamkorlik va qabul */}
          <div className="min-w-0">
            <h3 className="font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-5">
              {partnershipHeading}
            </h3>
            <div className="flex flex-col space-y-3.5 text-[14px]">
              <p className="text-[#9A9A9A] text-[13.5px] leading-relaxed">
                {partnershipNote}
              </p>
              <div>
                <BookingActionLink
                  locale={safeLocale}
                  className="group inline-flex items-center gap-2 text-[13.5px] font-bold text-[#D4AF37] hover:text-[#FFFFFF] transition-all duration-300 hover:translate-x-1"
                >
                  <span className="border-b border-[#D4AF37]/50 pb-0.5 group-hover:border-[#FFFFFF]">
                    {footer.bookingLinkLabel}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </BookingActionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright left, Back-to-top right */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[13px] sm:text-[13.5px] text-[#9A9A9A] text-left">
            {footer.colophonNote}
          </p>

          {isHomePage ? (
            <a
              href="#hero"
              className="group text-[13px] sm:text-[13.5px] font-semibold text-[#9A9A9A] hover:text-[#D4AF37] transition-all duration-300 inline-flex items-center gap-2 shrink-0 self-start sm:self-auto hover:-translate-y-0.5"
            >
              <span>{footer.backToTop}</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group text-[13px] sm:text-[13.5px] font-semibold text-[#9A9A9A] hover:text-[#D4AF37] transition-all duration-300 inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 shrink-0 self-start sm:self-auto hover:-translate-y-0.5"
            >
              <span>{footer.backToTop}</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
