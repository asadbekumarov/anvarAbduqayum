import type { ApplyFormData } from "../schemas/applySchema";
import {
  dispatchTelegramHtmlMessage,
  escapeTelegramHtml,
  sanitizeTelegramUrl,
  type TelegramDispatchResult,
} from "@/lib/telegramHtml";

/**
 * Formats and dispatches a structured B2B or consultation application lead to Telegram.
 * Handles specialized high-priority B2B partnership tracks (Export, Distribution, Manufacturing/OEM, General)
 * alongside legacy book orders and consultation requests. Escapes all dynamic inputs.
 */
export async function sendTelegramLead(
  lead: ApplyFormData,
  clientIp?: string
): Promise<TelegramDispatchResult> {
  const timestamp = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const isBookLead =
    lead.service?.toLowerCase().includes("kitob") ||
    lead.service?.toLowerCase().includes("книга") ||
    lead.service?.toLowerCase().includes("book") ||
    lead.service?.toLowerCase().includes("shpargalka") ||
    lead.service?.toLowerCase().includes("шпаргалка");

  const safeLocale = escapeTelegramHtml(
    lead.locale ? lead.locale.toUpperCase() : "UZ"
  );
  const safePageUrl = sanitizeTelegramUrl(lead.pageUrl, ["https:", "http:"]);
  const sourceStr = safePageUrl ? ` · ${escapeTelegramHtml(safePageUrl)}` : "";
  const safeClientIp =
    clientIp && clientIp !== "unknown" ? escapeTelegramHtml(clientIp) : "";

  let message: string;

  if (isBookLead) {
    message = [
      `🏛 <b>YANGI BUYURTMA | &quot;BIZNES SHPARGALKASI&quot; KITOBI</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Mijoz:</b> ${escapeTelegramHtml(lead.name)}`,
      `📞 <b>Telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      `📍 <b>Yetkazib berish manzili:</b> ${escapeTelegramHtml(lead.address || "Ko'rsatilmagan")}`,
      lead.companySize
        ? `🏢 <b>Kompaniya ko'lami:</b> ${escapeTelegramHtml(lead.companySize)}`
        : null,
      lead.question
        ? `📦 <b>Buyurtma / Izoh:</b>\n<i>${escapeTelegramHtml(lead.question)}</i>`
        : null,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `⚡ <i>15 daqiqa ichida aloqaga chiqish tavsiya etiladi.</i>`,
    ]
      .filter(Boolean)
      .join("\n");
  } else if (lead.track === "export") {
    // 1. Export Track (Target Country, HS-category/volume)
    const targetCountry = lead.country || lead.targetCountry || "Ko'rsatilmagan";
    const category = lead.category || lead.productInterest || "Polimer / O'yinchoqlar";
    const volume = lead.volume || "Ko'rsatilmagan";
    const company = lead.company || lead.business || "Ko'rsatilmagan";
    const notes = lead.notes || lead.question;

    message = [
      `🔥 <b>NEW EXPORT LEAD | YANGI EKSPORT BUYURTMASI</b>`,
      `🏛 <i>Anvar Abduqayum // Toy Bola International B2B Portal</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Mas'ul vakil:</b> ${escapeTelegramHtml(lead.name)}`,
      `🏢 <b>Kompaniya:</b> ${escapeTelegramHtml(company)}`,
      `📞 <b>Xalqaro telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      lead.email ? `✉️ <b>Email:</b> ${escapeTelegramHtml(lead.email)}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌍 <b>Maqsadli davlat / Bozor:</b> ${escapeTelegramHtml(targetCountry)}`,
      `📦 <b>Kategoriya / TIF TN:</b> ${escapeTelegramHtml(category)}`,
      `📊 <b>Taxminiy hajm / Partiya:</b> ${escapeTelegramHtml(volume)}`,
      notes ? `📝 <b>Qo'shimcha izoh / Talablar:</b>\n<i>${escapeTelegramHtml(notes)}</i>` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `⚡ <b>15 daqiqa ichida xalqaro B2B eksport bo'limi aloqaga chiqishi tavsiya etiladi.</b>`,
    ]
      .filter(Boolean)
      .join("\n");
  } else if (lead.track === "distribution") {
    // 2. Distribution Track (Region, retail coverage)
    const region = lead.region || lead.country || "Ko'rsatilmagan";
    const coverage = lead.retailCoverage || lead.category || "Ko'rsatilmagan";
    const volume = lead.volume || "Ko'rsatilmagan";
    const company = lead.company || lead.business || "Ko'rsatilmagan";
    const notes = lead.notes || lead.question;

    message = [
      `🌐 <b>NEW DISTRIBUTION LEAD | DISTRIBYUTSIYA TARMOG'I</b>`,
      `🏛 <i>Anvar Abduqayum // Toy Bola Regional B2B Portal</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Mas'ul diler:</b> ${escapeTelegramHtml(lead.name)}`,
      `🏢 <b>Kompaniya / Tarmoq:</b> ${escapeTelegramHtml(company)}`,
      `📞 <b>Xalqaro telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      lead.email ? `✉️ <b>Email:</b> ${escapeTelegramHtml(lead.email)}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📍 <b>Hudud / Shahar:</b> ${escapeTelegramHtml(region)}`,
      `🏬 <b>Chakana qamrov / Savdo kanali:</b> ${escapeTelegramHtml(coverage)}`,
      lead.volume ? `📊 <b>Savdo nuqtalari soni / Ko'lam:</b> ${escapeTelegramHtml(volume)}` : null,
      notes ? `📝 <b>Distribyutsiya shartlari:</b>\n<i>${escapeTelegramHtml(notes)}</i>` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `⚡ <b>Dilerlik bo'limi 15 daqiqa ichida aloqaga chiqishi tavsiya etiladi.</b>`,
    ]
      .filter(Boolean)
      .join("\n");
  } else if (lead.track === "manufacturing") {
    // 3. Manufacturing / OEM Track (Specs, capacity)
    const specs = lead.specs || lead.category || lead.productInterest || "Ko'rsatilmagan";
    const capacity = lead.capacity || lead.volume || "Ko'rsatilmagan";
    const company = lead.company || lead.business || "Ko'rsatilmagan";
    const notes = lead.notes || lead.question;

    message = [
      `🏭 <b>NEW OEM / MANUFACTURING LEAD | ISHLAB CHIQARISH</b>`,
      `🏛 <i>Anvar Abduqayum // Toy Bola Industrial Hub</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Buyurtmachi / Vakil:</b> ${escapeTelegramHtml(lead.name)}`,
      `🏢 <b>Korxona nomi:</b> ${escapeTelegramHtml(company)}`,
      `📞 <b>Xalqaro telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      lead.email ? `✉️ <b>Email:</b> ${escapeTelegramHtml(lead.email)}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `⚙️ <b>Qolip / Texnik spesifikatsiya:</b> ${escapeTelegramHtml(specs)}`,
      `📐 <b>Talab qilinadigan quvvat / Hajm:</b> ${escapeTelegramHtml(capacity)}`,
      lead.country ? `🌍 <b>Hudud / Bozor:</b> ${escapeTelegramHtml(lead.country)}` : null,
      notes ? `📝 <b>Texnik talablar va tafsilotlar:</b>\n<i>${escapeTelegramHtml(notes)}</i>` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `⚡ <b>Zavod muhandislik-ishlab chiqarish guruhi bilan bog'lanish zarur.</b>`,
    ]
      .filter(Boolean)
      .join("\n");
  } else if (lead.track === "general" || lead.track === "other") {
    // 4. General B2B Inquiry
    const company = lead.company || lead.business || "Ko'rsatilmagan";
    const category = lead.category || "Umumiy hamkorlik";
    const notes = lead.notes || lead.question || "Izohsiz";

    message = [
      `🤝 <b>NEW B2B GENERAL INQUIRY | HAMKORLIK MUROJAATI</b>`,
      `🏛 <i>Anvar Abduqayum // B2B Strategic Alliances</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Vakil:</b> ${escapeTelegramHtml(lead.name)}`,
      `🏢 <b>Tashkilot:</b> ${escapeTelegramHtml(company)}`,
      `📞 <b>Xalqaro telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      lead.email ? `✉️ <b>Email:</b> ${escapeTelegramHtml(lead.email)}` : null,
      `🎯 <b>Yo'nalish / Toifa:</b> ${escapeTelegramHtml(category)}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📝 <b>Taklif mazmuni:</b>\n<i>${escapeTelegramHtml(notes)}</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `⚡ <b>Rahbariyat kotibiyati tez orada ko'rib chiqadi.</b>`,
    ]
      .filter(Boolean)
      .join("\n");
  } else {
    // Default standard B2B application
    const company = lead.company || lead.business || "Ko'rsatilmagan";
    message = [
      `🏛 <b>YANGI B2B ARIZA — ANVAR ABDUQAYUM</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Mijoz:</b> ${escapeTelegramHtml(lead.name)}`,
      `📞 <b>Telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
      `🏢 <b>Kompaniya:</b> ${escapeTelegramHtml(company)}`,
      lead.companySize
        ? `📊 <b>Kompaniya ko'lami:</b> ${escapeTelegramHtml(lead.companySize)}`
        : null,
      `🎯 <b>Yo'nalish / Xizmat:</b> ${escapeTelegramHtml(lead.service || "Bepul Diagnostika (Umumiy)")}`,
      lead.email ? `✉️ <b>Email:</b> ${escapeTelegramHtml(lead.email)}` : null,
      lead.question
        ? `❓ <b>Savol / Izoh:</b>\n<i>${escapeTelegramHtml(lead.question)}</i>`
        : null,
      `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
      `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
      safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `⚡ <i>15 daqiqa ichida aloqaga chiqish tavsiya etiladi.</i>`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  return dispatchTelegramHtmlMessage(message, "[Telegram Lead Service]");
}
