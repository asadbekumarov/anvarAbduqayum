"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { getContent } from "@/config/content";
import { contactConfig } from "@/config/contact";
import { featuresConfig } from "@/config/features";
import { getDemoCopy } from "@/config/demoCopy";
import { BookingActionLink } from "@/components/ui/BookingActionLink";

interface FooterProps {
  locale?: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const routeLocale = useLocale();
  const pathname = usePathname() || "/";
  const rawLocale = locale || routeLocale || "uz";
  const safeLocale = rawLocale === "ru" || rawLocale === "en" ? rawLocale : "uz";
  const isDemoMode = featuresConfig.demoMode;
  const content = getContent(safeLocale);
  const demoCopy = getDemoCopy(safeLocale);
  const { footer } = content;

  const isHomePage =
    pathname === `/${safeLocale}` ||
    pathname === `/${safeLocale}/` ||
    pathname === "/";

  return (
    <footer
      id="sayt-yakuni"
      className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] border-t border-[var(--border-on-dark)] pt-20 pb-28 sm:pb-14"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Masthead Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-12 border-b border-[var(--border-on-dark)]">
          <div className="md:col-span-8 min-w-0">
            <p className="font-serif text-[clamp(28px,3.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text-on-dark)] [text-wrap:balance]">
              {footer.founderName}
              <span className="text-[var(--accent-gold)]">.</span>
            </p>
            <p className="mt-3 text-[16px] leading-[1.6] text-[var(--text-muted-on-dark)] max-w-[48ch]">
              {footer.tagline}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap md:justify-end">
            <BookingActionLink
              locale={safeLocale}
              className="min-h-[46px] px-6 bg-transparent text-[var(--text-on-dark)] border border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)] hover:bg-[var(--bg-dark-elevated)] active:opacity-90 rounded-[2px] text-[14.5px] font-semibold inline-flex items-center justify-center whitespace-nowrap transition-[color,border-color,background-color,opacity] duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
            >
              {footer.bookingCta}
            </BookingActionLink>
          </div>
        </div>

        {/* Middle 3-Zone Editorial Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-[var(--border-on-dark-subtle)]">
          {/* Zone 1: Editorial Section Index */}
          <div className="md:col-span-5 min-w-0">
            <h2 className="text-[15px] font-semibold text-[var(--accent-gold-light)] mb-4">
              {footer.navHeading}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {footer.indexLinks.map((item) => {
                const targetHref = isHomePage
                  ? item.anchor
                  : `/${safeLocale}${item.anchor}`;
                return (
                  <li key={item.code}>
                    <Link
                      href={targetHref}
                      className="inline-flex items-center gap-2 min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                    >
                      <span className="font-mono text-[13px] text-[var(--accent-gold-light)] tabular-nums shrink-0">
                        {item.code}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Zone 2: Official Contact Channels */}
          <div className="md:col-span-4 min-w-0">
            <h2 className="text-[15px] font-semibold text-[var(--accent-gold-light)] mb-2">
              {footer.contactHeading}
            </h2>
            {isDemoMode && (
              <p className="text-[12.5px] leading-[1.45] text-[var(--text-muted-on-dark)] mb-3">
                {demoCopy.footer.externalChannelsNote}
              </p>
            )}
            <ul className="flex flex-col">
              <li>
                <a
                  href={contactConfig.phone.href}
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] tabular-nums [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  {contactConfig.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.email.href}
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  {contactConfig.email.address}
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.telegramDirect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  Telegram admin: {contactConfig.telegramDirect.display}
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.telegramChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  Telegram: {contactConfig.telegramChannel.display}
                </a>
              </li>
            </ul>
          </div>

          {/* Zone 3: Public Media & Booking */}
          <div className="md:col-span-3 min-w-0">
            <h2 className="text-[15px] font-semibold text-[var(--accent-gold-light)] mb-4">
              {footer.platformsHeading}
            </h2>
            <ul className="flex flex-col">
              <li>
                <a
                  href={contactConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  Instagram: {contactConfig.instagram.display}
                </a>
              </li>
              <li>
                <a
                  href={contactConfig.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  YouTube: {contactConfig.youtube.display}
                </a>
              </li>
              <li>
                <BookingActionLink
                  locale={safeLocale}
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[var(--text-muted-on-dark)] hover:text-[var(--text-on-dark)] border-b border-transparent hover:border-[var(--accent-gold-light)] [overflow-wrap:anywhere] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  {footer.bookingLinkLabel}
                </BookingActionLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div className="pt-7 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14px] leading-[1.5] text-[var(--text-muted-on-dark)] max-w-[68ch]">
            {isDemoMode ? demoCopy.footer.colophonNote : footer.colophonNote}
          </p>
          {isHomePage ? (
            <a
              href="#hero"
              className="inline-flex items-center min-h-[44px] px-1 text-[14px] font-semibold text-[var(--text-on-dark)] hover:text-[var(--accent-gold-light)] border-b border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
            >
              {footer.backToTop}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center min-h-[44px] px-1 bg-transparent border-0 border-b border-[var(--border-on-dark)] hover:border-[var(--accent-gold-light)] text-[14px] font-semibold text-[var(--text-on-dark)] hover:text-[var(--accent-gold-light)] transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)] cursor-pointer"
            >
              {footer.backToTop}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
