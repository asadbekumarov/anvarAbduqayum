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
  onOpenApply: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenApply }: MobileMenuProps) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { href: "#hero", label: t("home") },
    { href: "#xizmatlar", label: t("services") },
    { href: "#tadbirlarimiz", label: t("events") },
    { href: "#bosqichlar", label: t("stages") },
    { href: "#hamkorlar", label: "Hamkorlar" },
    { href: "#ekspert", label: "Ekspert" },
    { href: "#fikrlar", label: "Fikrlar" },
    { href: "#kitob", label: "Kitob" },
    { href: "#kontaktlar", label: "Kontaktlar" },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={common("openMenu")}
      className="fixed inset-0 z-50 flex flex-col bg-base text-white lg:hidden"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 sm:px-6 h-20 border-b border-border shrink-0">
        <span className="font-serif text-lg tracking-wider font-semibold text-white">
          ILHOM BEGIMQULOV
        </span>
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
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="group flex items-center justify-between text-lg sm:text-2xl font-serif text-neutral-300 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              <span>{link.label}</span>
              <span className="text-[10px] sm:text-xs font-sans text-muted tracking-widest">
                /0{index + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="pt-8 border-t border-border flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans uppercase tracking-widest text-muted">
              Tilni o&apos;zgartirish
            </span>
            <LanguageSwitcher />
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              onClose();
              onOpenApply();
            }}
          >
            {common("cta")}
          </Button>
        </div>
      </div>
    </div>
  );
}
