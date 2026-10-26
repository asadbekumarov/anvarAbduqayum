import { contactConfig } from "./contact";

// TODO(confirm): Domen yozilishi (ilhombegimqulov.uz vs ilxombegimkulov.uz) tasdiqlanmagan
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ilhombegimqulov.uz";

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
    telegram: contactConfig.telegram.url,
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
