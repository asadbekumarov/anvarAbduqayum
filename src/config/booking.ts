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

export const hasVerifiedBookingChannel: boolean =
  (activeBookingMode === "calcom" && Boolean(verifiedCalLink)) ||
  (activeBookingMode === "telegram" &&
    contactConfig.telegramDirect.isVerified &&
    Boolean(contactConfig.telegramDirect.url));

export interface BookingCtaTarget {
  href: string;
  isExternal: boolean;
}

/**
 * Single source of truth for all public-facing booking CTA destinations.
 * Never routes users to an unverified external administrator; falls back to
 * the localized informational demo state at /[locale]/bron.
 */
export function getBookingCtaTarget(locale: string = "uz"): BookingCtaTarget {
  const safeLocale = locale === "ru" || locale === "en" ? locale : "uz";

  if (activeBookingMode === "calcom" && Boolean(verifiedCalLink)) {
    return {
      href: `/${safeLocale}/bron`,
      isExternal: false,
    };
  }

  if (
    contactConfig.telegramDirect.isVerified &&
    Boolean(contactConfig.telegramDirect.url)
  ) {
    return {
      href: contactConfig.telegramDirect.url,
      isExternal: true,
    };
  }

  return {
    href: `/${safeLocale}/bron`,
    isExternal: false,
  };
}

