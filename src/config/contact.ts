/**
 * Markazlashtirilgan aloqa ma'lumotlari - Anvar Abduqayum
 */

export interface TelegramAccount {
  isVerified: boolean;
  handle: string;
  url: string;
  display: string;
  ariaLabel: string;
}

const buildTelegramAccount = (
  handleName: string,
  purpose: { uz: string; ru: string; en: string },
  isVerified: boolean
): TelegramAccount => {
  const cleanHandle = handleName.replace(/^@/, "");
  if (!isVerified || !cleanHandle) {
    return {
      isVerified: false,
      handle: "",
      display: "",
      url: "",
      ariaLabel: "",
    };
  }
  return {
    isVerified: true,
    handle: cleanHandle,
    display: `@${cleanHandle}`,
    url: `https://t.me/${cleanHandle}`,
    ariaLabel: `Telegram (${cleanHandle}) - ${purpose.uz}`,
  };
};

export const contactConfig = {
  phone: {
    // Removed unverified template phone; preserve structure for future authorized confirmation
    isVerified: false,
    display: "",
    href: "",
    clean: "",
    ariaLabel: "",
  },
  // Pending client confirmation: t.me/anvarabduqayum vs t.me/anvarabduqayumuz
  telegramChannel: buildTelegramAccount(
    "",
    {
      uz: "Rasmiy blog va yangiliklar kanali",
      ru: "Официальный канал новостей и аналитики",
      en: "Official blog and news channel",
    },
    false
  ),
  // Pending client confirmation: executive / booking administrator username
  telegramDirect: buildTelegramAccount(
    "",
    {
      uz: "To'g'ridan-to'g'ri murojaat va qabul",
      ru: "Прямая связь и прием заявок",
      en: "Direct inquiry and admissions",
    },
    false
  ),
  // Backward compatibility: umumiy telegram kanali
  get telegram() {
    return this.telegramChannel;
  },
  instagram: {
    isVerified: true,
    url: "https://www.instagram.com/anvar_abduqayum",
    handle: "@anvar_abduqayum",
    display: "@anvar_abduqayum",
    ariaLabel: "Instagram profiliga o'tish",
  },
  youtube: {
    isVerified: true,
    url: "https://www.youtube.com/@AnvarAbduqayum",
    handle: "@AnvarAbduqayum",
    display: "@AnvarAbduqayum",
    ariaLabel: "YouTube kanaliga o'tish",
  },
  linkedin: {
    // Unverified personal LinkedIn profile
    isVerified: false,
    url: "",
    display: "",
    ariaLabel: "",
  },
  email: {
    // Unverified email address
    isVerified: false,
    address: "",
    href: "",
    ariaLabel: "",
  },
  office: {
    hasExactAddress: false,
    addressUz: "Toshkent shahri, O‘zbekiston",
    addressRu: "г. Ташкент, Узбекистан",
    addressEn: "Tashkent, Uzbekistan",
  },
};
