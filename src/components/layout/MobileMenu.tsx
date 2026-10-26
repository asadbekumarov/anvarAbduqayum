"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CloseButton } from "@/components/ui/close-button";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { useLockScroll } from "@/hooks/useLockScroll";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: (options?: { service?: string }) => void;
}

export function MobileMenu({ isOpen, onClose, onOpenApply }: MobileMenuProps) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const ctaT = useTranslations("cta");
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Fokus tuzog'i (Focus Trap)
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { href: "#xizmatlar", label: t("services") },
    { href: "#bosqichlar", label: t("methodology") },
    { href: "#ekspert", label: t("expert") },
    { href: "#natijalar", label: t("media") },
    { href: "#faq", label: t("faq") },
    { href: "#aloqa", label: t("contact") },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={common("openMenu")}
      className="fixed inset-0 z-50 flex flex-col bg-base text-white xl:hidden overscroll-contain"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 sm:px-6 h-20 border-b border-border shrink-0">
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="font-serif text-lg tracking-wider font-semibold text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          ILHOM BEGIMQULOV
        </a>
        <CloseButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={common("closeMenu")}
          appearance="soft"
          variant="neutral"
          size="lg"
          className="text-muted hover:text-white"
        />
      </div>

      {/* Nav List */}
      <div
        ref={menuRef}
        className="flex-1 flex flex-col justify-between px-6 py-8 overflow-y-auto"
      >
        <nav className="flex flex-col space-y-2 sm:space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="group flex items-center justify-between text-lg sm:text-2xl font-serif text-neutral-300 hover:text-white transition-colors py-3 border-b border-white/[0.08]"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-muted tracking-widest group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="pt-8 border-t border-border flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans uppercase tracking-widest text-muted">
              Tilni o&apos;zgartirish
            </span>
            <LanguageSwitcher direction="up" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                onClose();
                onOpenApply({ service: ctaT("mentorship") });
              }}
            >
              {ctaT("mentorship")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
