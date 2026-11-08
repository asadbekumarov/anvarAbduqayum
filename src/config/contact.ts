/**
 * Markazlashtirilgan aloqa ma'lumotlari - Anvar Abduqayum
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
  telegramChannel: buildTelegramAccount("anvar_abduqayum", {
    uz: "Rasmiy blog va yangiliklar kanali",
    ru: "Официальный канал новостей и аналитики",
    en: "Official blog and news channel",
  }),
  // To'g'ridan-to'g'ri shaxsiy lichka / admin
  telegramDirect: buildTelegramAccount("anvar_abduqayum_admin", {
    uz: "To'g'ridan-to'g'ri murojaat va qabul",
    ru: "Прямая связь и прием заявок",
    en: "Direct inquiry and admissions",
  }),
  // Backward compatibility: umumiy telegram kanali
  get telegram() {
    return this.telegramChannel;
  },
  instagram: {
    url: "https://www.instagram.com/anvar_abduqayum",
    handle: "@anvar_abduqayum",
    display: "@anvar_abduqayum",
    ariaLabel: "Instagram profiliga o'tish",
  },
  youtube: {
    url: "https://www.youtube.com/@AnvarAbduqayum",
    handle: "@AnvarAbduqayum",
    display: "@AnvarAbduqayum",
    ariaLabel: "YouTube kanaliga o'tish",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/anvar-abduqayum",
    display: "Anvar Abduqayum",
    ariaLabel: "LinkedIn profiliga o'tish",
  },
  email: {
    address: "info@anvarabduqayum.uz",
    href: "mailto:info@anvarabduqayum.uz",
    ariaLabel: "Email orqali bog'lanish: info@anvarabduqayum.uz",
  },
  office: {
    hasExactAddress: true,
    addressUz: "Toshkent shahri, Bosh ofis va «Toy Bola» biznes majmuasi",
    addressRu: "г. Ташкент, Главный офис и бизнес-комплекс «Toy Bola»",
    addressEn: "Tashkent, Headquarters & «Toy Bola» business complex",
  },
};
