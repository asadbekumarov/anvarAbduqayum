import type { ApplyFormData } from "../schemas/applySchema";
import {
  dispatchTelegramHtmlMessage,
  escapeTelegramHtml,
  sanitizeTelegramUrl,
  type TelegramDispatchResult,
} from "@/lib/telegramHtml";

/**
 * Formats and dispatches a structured consultation application lead to Telegram.
 * Escapes all dynamic inputs and fails closed when credentials are unconfigured.
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

  const message = isBookLead
    ? [
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
        .join("\n")
    : [
        `🏛 <b>YANGI B2B ARIZA — ANVAR ABDUQAYUM</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `👤 <b>Mijoz:</b> ${escapeTelegramHtml(lead.name)}`,
        `📞 <b>Telefon:</b> <code>${escapeTelegramHtml(lead.phone)}</code>`,
        `🏢 <b>Kompaniya ko'lami:</b> ${escapeTelegramHtml(lead.companySize || "Ko'rsatilmagan")}`,
        `🎯 <b>Yo'nalish / Xizmat:</b> ${escapeTelegramHtml(lead.service || "Bepul Diagnostika (Umumiy)")}`,
        lead.business
          ? `💼 <b>Biznes / Holat:</b> ${escapeTelegramHtml(lead.business)}`
          : null,
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

  return dispatchTelegramHtmlMessage(message, "[Telegram Lead Service]");
}
