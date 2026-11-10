import { contactConfig } from "./contact";
import { featuresConfig, type BookingMode } from "./features";

const UNVERIFIED_CAL_PLACEHOLDERS = ["asadbek-umarov"];

/**
 * Extracts a verified Cal.com slug strictly from NEXT_PUBLIC_CAL_LINK.
 * Never falls back to any unrelated developer/placeholder event.
 */
export function getVerifiedCalLink(): string {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!raw) return "";

  const normalized = raw
    .trim()
    .replace(/^https?:\/\/(app\.)?cal\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  if (!normalized) return "";

  const lower = normalized.toLowerCase();
  if (UNVERIFIED_CAL_PLACEHOLDERS.some((pattern) => lower.includes(pattern))) {
    return "";
  }

  return normalized;
}

export const verifiedCalLink = getVerifiedCalLink();

/**
 * Effective booking mode: Cal.com only activates when featuresConfig.bookingMode
 * is explicitly set to "calcom" AND a verified non-placeholder event URL exists.
 */
export const activeBookingMode: BookingMode =
  featuresConfig.bookingMode === "calcom" && Boolean(verifiedCalLink)
    ? "calcom"
    : "telegram";

export interface BookingCtaTarget {
  href: string;
  isExternal: boolean;
}

/**
 * Single source of truth for all public-facing booking CTA destinations.
 */
export function getBookingCtaTarget(locale: string = "uz"): BookingCtaTarget {
  if (activeBookingMode === "calcom") {
    const safeLocale = locale === "ru" || locale === "en" ? locale : "uz";
    return {
      href: `/${safeLocale}/bron`,
      isExternal: false,
    };
  }

  return {
    href: contactConfig.telegramDirect.url,
    isExternal: true,
  };
}

