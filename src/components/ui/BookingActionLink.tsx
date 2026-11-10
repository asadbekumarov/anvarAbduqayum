import React from "react";
import Link from "next/link";
import { getBookingCtaTarget } from "@/config/booking";

interface BookingActionLinkProps {
  locale?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}

/**
 * Unified booking CTA link respecting activeBookingMode ("telegram" | "calcom").
 * Renders safe external target attributes for verified Telegram handoff and
 * Next.js localized routing when Cal.com booking is active.
 */
export function BookingActionLink({
  locale = "uz",
  className,
  onClick,
  ariaLabel,
  children,
}: BookingActionLinkProps) {
  const target = getBookingCtaTarget(locale);

  if (target.isExternal) {
    return (
      <a
        href={target.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={target.href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

