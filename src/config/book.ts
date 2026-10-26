/**
 * Kitob buyurtmasi va narx konfiguratsiyasi
 */

// TODO(confirm): Kitob narxi va buyurtma usuli (Telegram bot/menejer havolasi yoki sayt formasi) tasdiqlanmagan.
export interface BookConfig {
  /**
   * Telegram yoki tashqi buyurtma havolasi (masalan, "https://t.me/...").
   * Agar bo'sh qoldirilsa, tugma avtomatik ravishda saytdagi buyurtma formasiga olib o'tadi
   * va "Kitob buyurtmasi" mavzusini oldindan to'ldiradi.
   */
  orderUrl?: string;

  /**
   * Kitob narxi (ixtiyoriy). Agar mavjud bo'lsa, kitob blokida ko'rsatiladi.
   * TODO(confirm): Kitob narxi rasman tasdiqlanmagan.
   */
  price?: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const bookConfig: BookConfig = {
  // TODO(confirm): Kitob uchun Telegram buyurtma havolasi tasdiqlansin (hozircha bo'sh qoldirilgan, formaga yo'naltiradi)
  orderUrl: "",
  // TODO(confirm): Kitob narxi tasdiqlansin (hozircha belgilanmagan)
  price: undefined,
};
