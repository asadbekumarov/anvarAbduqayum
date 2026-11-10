import { contactConfig } from "./contact";
import { featuresConfig } from "./features";

export const OFFICIAL_PRODUCTION_ORIGIN = "https://anvarabduqayum.uz";
export const DEMO_ORIGIN = "https://anvar-abduqayum-flax.vercel.app";

const resolveDemoOrigin = (): string => {
  const explicitDemo = process.env.NEXT_PUBLIC_DEMO_URL?.trim().replace(/\/$/, "");
  if (explicitDemo) return explicitDemo;

  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configured && configured !== OFFICIAL_PRODUCTION_ORIGIN) {
    return configured;
  }

  return DEMO_ORIGIN;
};

const getBaseUrl = (): string => {
  if (featuresConfig.demoMode) {
    return resolveDemoOrigin();
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  return OFFICIAL_PRODUCTION_ORIGIN;
};

export const SITE_URL = getBaseUrl();

/**
 * Explicit opt-in search engine indexing control.
 * Always disabled in demo mode, staging, preview, local, and unapproved environments.
 */
export const isIndexingEnabled =
  !featuresConfig.demoMode &&
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  SITE_URL === OFFICIAL_PRODUCTION_ORIGIN;

export const siteConfig = {
  name: "Anvar Abduqayum",
  title: "Anvar Abduqayum | Ishlab chiqarish, Eksport va Biznes-mentor",
  description:
    "20 yillik real ishlab chiqarish zavodlari, savdo tarmoqlari va xalqaro eksport tajribasi asosida biznesni tizimlashtirish.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/brand/og-image.png`,

  contact: {
    phone: contactConfig.phone.display,
    phoneClean: contactConfig.phone.clean,
    email: contactConfig.email.address,
    address: contactConfig.office.addressUz,
    workingHours: "Dush - Shan: 09:00 - 18:00",
  },

  socials: {
    telegram: contactConfig.telegramChannel.url,
    telegramChannel: contactConfig.telegramChannel.url,
    telegramDirect: contactConfig.telegramDirect.url,
    instagram: contactConfig.instagram.url,
    youtube: contactConfig.youtube.url,
    linkedin: contactConfig.linkedin.url,
  },

  navLinks: [
    { href: "#xizmatlar", labelKey: "services" },
    { href: "#bosqichlar", labelKey: "methodology" },
    { href: "#ekspert", labelKey: "expert" },
    { href: "#natijalar", labelKey: "media" },
    { href: "#faq", labelKey: "faq" },
    { href: "#aloqa", labelKey: "contact" },
  ],
};
