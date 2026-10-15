"use client";

import React, { useEffect, useRef } from "react";
import { useLockScroll } from "@/hooks/useLockScroll";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  ariaLabel?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  ariaLabel = "Dialog",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useLockScroll(isOpen);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8",
        overlayClassName
      )}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-[#111111]/95 backdrop-blur-2xl border border-border/80 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(197,168,128,0.06)] p-5 sm:p-8 animate-in zoom-in-95 fade-in duration-200 rounded-2xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
