"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const common = useTranslations("common");
  const nav = useTranslations("nav");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "#hero", label: nav("home") },
    { href: "#xizmatlar", label: nav("services") },
    { href: "#tadbirlarimiz", label: nav("events") },
    { href: "#bosqichlar", label: nav("stages") },
  ];

  return (
    <footer className="border-t border-border bg-base text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border-subtle">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <span className="font-serif text-2xl tracking-wider font-semibold text-white">
              ILHOM BEGIMQULOV
            </span>
            <p className="text-sm font-sans text-muted max-w-sm leading-relaxed">
              {common("brandRole")}
            </p>
            <p className="text-xs font-sans text-muted-dark leading-relaxed">
              {t("location")}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted font-medium mb-1">
              Navigatsiya
            </span>
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold w-fit py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacts & Socials */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted font-medium">
              Aloqa
            </span>
            <a
              href={`tel:${t("phone").replace(/\s+/g, "")}`}
              className="text-sm font-sans text-white hover:text-gold transition-colors"
            >
              {t("phone")}
            </a>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://t.me/Ilxombegimkulov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full border border-border bg-elevated hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                title="Telegram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.6 4.7 3.9 11.1c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.6 5c.2.6.4.8.8.8.3 0 .5-.1.8-.4l2.3-2.2 4.7 3.5c.9.5 1.5.3 1.7-.8l3-14.1c.3-1.2-.5-1.7-1.3-.9Zm-11.9 8.7 9.7-6.1c.5-.3.9-.1.5.2l-8.3 7.5-.3 3.1-1.6-4.7Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ilxom.begimkulov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-border bg-elevated hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@IlxomBegimkulov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-border bg-elevated hover:bg-gold/10 hover:border-gold/60 text-neutral-300 hover:text-gold flex items-center justify-center transition-all duration-200 hover:scale-105"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.1 5.6 12 5.6 12 5.6s-5.1 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.5 12a31 31 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.8.5 6.9.5 6.9.5s5.1 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-3.8 31 31 0 0 0-.5-3.8ZM10.1 15.1V8.9l5.4 3.1-5.4 3.1Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>{t("rights")}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold py-1"
          >
            <span>{t("backToTop")}</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
