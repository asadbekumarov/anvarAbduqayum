"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

import { useLockScroll } from "@/hooks/useLockScroll";

export interface LightboxMedia {
  src: string;
  title: string;
  issuer?: string;
  year?: string;
  alt: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: LightboxMedia | null;
}

export function Lightbox({ isOpen, onClose, media }: LightboxProps) {
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

  if (!isOpen || !media) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={media.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full border border-border bg-base p-3.5 sm:p-6 rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border mb-3 sm:mb-4">
          <div>
            <h3 className="font-serif text-base sm:text-xl text-white font-medium">
              {media.title}
            </h3>
            {media.issuer && (
              <span className="text-[11px] sm:text-xs text-muted block mt-0.5">
                {media.issuer} {media.year && `• ${media.year}`}
              </span>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="p-1.5 sm:p-2 text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Enlarged Image Display - Portrait Friendly */}
        <div className="relative h-[55vh] sm:h-[72vh] max-h-[750px] w-full border border-border-subtle bg-[#0D0D0D] p-2 rounded-[2px] overflow-hidden">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
