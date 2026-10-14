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
    { href: "#testlar", label: nav("tests") },
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
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://t.me/Ilxombegimkulov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-muted hover:text-gold transition-colors"
              >
                Telegram
              </a>
              <span className="text-border">/</span>
              <a
                href="https://www.instagram.com/ilxom.begimkulov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-muted hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <span className="text-border">/</span>
              <a
                href="https://www.youtube.com/@IlxomBegimkulov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-muted hover:text-gold transition-colors"
              >
                YouTube
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
