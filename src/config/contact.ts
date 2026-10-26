/**
 * Markazlashtirilgan aloqa ma'lumotlari
 */

// TODO(confirm): Telegram handle va URL imlosi (ilhom_begimqulov vs Ilxombegimkulov) tasdiqlanmagan.
// Hozirgi ko'rinadigan matn "@ilhom_begimqulov" asos qilib olindi, havola handle'dan avtomatik generatsiya qilinadi.
const TELEGRAM_HANDLE_RAW = "ilhom_begimqulov";

const cleanTelegramHandle = TELEGRAM_HANDLE_RAW.replace(/^@/, "");

export const contactConfig = {
  phone: {
    display: "+998 55 503 61 00",
    href: "tel:+998555036100",
    clean: "+998555036100",
    ariaLabel: "Telefon orqali bog'lanish: +998 55 503 61 00",
  },
  telegram: {
    handle: `@${cleanTelegramHandle}`,
    url: `https://t.me/${cleanTelegramHandle}`,
    ariaLabel: `Telegram orqali bog'lanish: @${cleanTelegramHandle}`,
  },
  instagram: {
    // TODO(confirm): Instagram rasmiy profil nomi (ilxom.begimkulov vs ilhom.begimqulov) tasdiqlansin
    url: "https://www.instagram.com/ilxom.begimkulov",
    handle: "@ilxom.begimkulov",
    ariaLabel: "Instagram profiliga o'tish",
  },
  youtube: {
    // TODO(confirm): YouTube kanali rasmiy nomi (@IlxomBegimkulov) tasdiqlansin
    url: "https://www.youtube.com/@IlxomBegimkulov",
    handle: "@IlxomBegimkulov",
    ariaLabel: "YouTube kanaliga o'tish",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/ilhom-begimqulov",
    ariaLabel: "LinkedIn profiliga o'tish",
  },
  email: {
    // TODO(confirm): Domen nomi va rasmiy pochta (info@ilhombegimqulov.uz vs info@ilxombegimkulov.uz) tasdiqlansin
    address: "info@ilhombegimqulov.uz",
    href: "mailto:info@ilhombegimqulov.uz",
    ariaLabel: "Email orqali bog'lanish: info@ilhombegimqulov.uz",
  },
  office: {
    // TODO(confirm): Aniq manzil/xarita (ko'cha, bino raqami) tasdiqlanmagan. Aniq manzil bo'lmagani sababli "tashrif buyuring" jumlasi yashiriladi.
    hasExactAddress: false,
    addressUz: "Toshkent shahri, O'zbekiston",
    addressRu: "г. Ташкент, Узбекистан",
    addressEn: "Tashkent, Uzbekistan",
  },
};
