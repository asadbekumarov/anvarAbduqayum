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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full border border-white/[0.12] bg-[#0E0E0E] p-5 sm:p-7 rounded-none shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div>
            <h3 className="font-serif text-lg sm:text-2xl text-white font-normal">
              {media.title}
            </h3>
            {media.issuer && (
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 block mt-1">
                {media.issuer} {media.year && `• ${media.year}`}
              </span>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="p-1.5 text-neutral-400 hover:text-white font-mono text-xl transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Enlarged Image Display - Portrait Friendly */}
        <div className="relative h-[55vh] sm:h-[70vh] max-h-[750px] w-full border border-white/[0.06] bg-[#0A0A0A] p-2 rounded-none overflow-hidden flex items-center justify-center">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
