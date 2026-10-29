/**
 * Markazlashtirilgan aloqa ma'lumotlari
 */

export interface TelegramAccount {
  handle: string;
  url: string;
  display: string;
  ariaLabel: string;
}

const buildTelegramAccount = (
  handleName: string,
  purpose: { uz: string; ru: string; en: string }
): TelegramAccount => {
  const cleanHandle = handleName.replace(/^@/, "");
  return {
    handle: cleanHandle,
    display: `@${cleanHandle}`,
    url: `https://t.me/${cleanHandle}`,
    ariaLabel: `Telegram (${cleanHandle}) - ${purpose.uz}`,
  };
};

export const contactConfig = {
  phone: {
    display: "+998 55 503 61 00",
    href: "tel:+998555036100",
    clean: "+998555036100",
    ariaLabel: "Telefon orqali bog'lanish: +998 55 503 61 00",
  },
  // Rasmiy blog va yangiliklar kanali
  telegramChannel: buildTelegramAccount("Ilxombegimkulov", {
    uz: "Rasmiy blog va yangiliklar kanali",
    ru: "Официальный канал новостей и аналитики",
    en: "Official blog and news channel",
  }),
  // To'g'ridan-to'g'ri shaxsiy lichka
  telegramDirect: buildTelegramAccount("IlhomBegimqulov", {
    uz: "To'g'ridan-to'g'ri shaxsiy aloqa",
    ru: "Прямая личная связь",
    en: "Direct personal contact",
  }),
  // Backward compatibility: umumiy telegram kanali
  get telegram() {
    return this.telegramChannel;
  },
  instagram: {
    url: "https://www.instagram.com/ilxom.begimkulov",
    handle: "@ilxom.begimkulov",
    display: "@ilxom.begimkulov",
    ariaLabel: "Instagram profiliga o'tish",
  },
  youtube: {
    url: "https://www.youtube.com/@IlxomBegimkulov",
    handle: "@IlxomBegimkulov",
    display: "@IlxomBegimkulov",
    ariaLabel: "YouTube kanaliga o'tish",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/ilhom-begimqulov",
    display: "Ilhom Begimqulov",
    ariaLabel: "LinkedIn profiliga o'tish",
  },
  email: {
    address: "info@ilhombegimqulov.uz",
    href: "mailto:info@ilhombegimqulov.uz",
    ariaLabel: "Email orqali bog'lanish: info@ilhombegimqulov.uz",
  },
  office: {
    hasExactAddress: true,
    addressUz: "Toshkent shahri, Furkat ko'chasi 18",
    addressRu: "г. Ташкент, ул. Фуркат 18",
    addressEn: "Tashkent, Furkat Street 18",
  },
};
