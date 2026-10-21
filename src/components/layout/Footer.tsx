"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  const socialLinks = [
    { label: "Telegram", href: "https://t.me/Ilxombegimkulov" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ilhom-begimqulov" },
    { label: "Instagram", href: "https://www.instagram.com/ilxom.begimkulov" },
    { label: "YouTube", href: "https://www.youtube.com/@IlxomBegimkulov" },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#070D1F]/40 to-[#0A0A0A] border-t border-white/[0.08] py-12">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-medium tracking-[0.2em] text-xs text-white uppercase">
            {t("brand")}
          </span>
          <span className="text-xs text-platinum font-mono">
            {t("rights")}
          </span>
        </div>

        {/* Right: Monospace Social Links */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs text-platinum">
          {socialLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
              {idx < socialLinks.length - 1 && (
                <span className="text-white/20 select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
