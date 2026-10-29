import { contactConfig } from "./contact";

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://ilhombegimqulov.uz";
};

export const SITE_URL = getBaseUrl();

export const siteConfig = {
  name: "Ilhom Begimqulov",
  title: "Ilhom Begimqulov | Biznes Konsultant va Amaliyotchi Trener",
  description:
    "Biznes boshqaruvi, operatsion tizimlar, sotuv bo'limi va jamoani kuchaytirish bo'yicha amaliy yechimlar.",
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
