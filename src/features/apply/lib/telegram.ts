import type { ApplyFormData } from "../schemas/applySchema";

interface TelegramSendResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

/**
 * Sends a structured consultation application lead to a Telegram group or channel.
 * Uses environment variables TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
 */
export async function sendTelegramLead(
  lead: ApplyFormData,
  clientIp?: string
): Promise<TelegramSendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[Telegram Service] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping Telegram dispatch in dev mode."
    );
    return {
      success: true, // Don't block application submission in dev mode
    };
  }

  const timestamp = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const cleanText = (str?: string) =>
    (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const isBookLead =
    lead.service?.toLowerCase().includes("kitob") ||
    lead.service?.toLowerCase().includes("книга") ||
    lead.service?.toLowerCase().includes("book") ||
    lead.service?.toLowerCase().includes("shpargalka") ||
    lead.service?.toLowerCase().includes("шпаргалка");

  const message = isBookLead
    ? [
        `<b>📚 YANGI BUYURTMA | "BIZNES SHPARGALKASI" KITOBI</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `👤 <b>Mijoz:</b> ${cleanText(lead.name)}`,
        `📞 <b>Telefon:</b> <code>${cleanText(lead.phone)}</code>`,
        `📍 <b>Yetkazib berish manzili:</b> ${cleanText(lead.address || "Ko'rsatilmagan")}`,
        lead.question
          ? `📦 <b>Buyurtma / Izoh:</b>\n<i>${cleanText(lead.question)}</i>`
          : null,
        `━━━━━━━━━━━━━━━━━━━━`,
        `⏰ <b>Vaqt:</b> ${timestamp} (Toshkent)`,
        clientIp ? `🌐 <b>IP:</b> <code>${clientIp}</code>` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : [
        `<b>💼 YANGI ARIZA | ILHOM BEGIMQULOV SAYTI</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `👤 <b>Ism:</b> ${cleanText(lead.name)}`,
        `📞 <b>Telefon:</b> <code>${cleanText(lead.phone)}</code>`,
        lead.business ? `🏢 <b>Biznes sohasi:</b> ${cleanText(lead.business)}` : null,
        lead.service ? `🎯 <b>Xizmat / Yo'nalish:</b> ${cleanText(lead.service)}` : null,
        lead.question
          ? `❓ <b>Savol / Izoh:</b>\n<i>${cleanText(lead.question)}</i>`
          : null,
        `━━━━━━━━━━━━━━━━━━━━`,
        `⏰ <b>Vaqt:</b> ${timestamp} (Toshkent)`,
        clientIp ? `🌐 <b>IP:</b> <code>${clientIp}</code>` : null,
      ]
        .filter(Boolean)
        .join("\n");

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      // Set reasonable timeout
      signal: AbortSignal.timeout(8000),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error("[Telegram Error Response]", data);
      return {
        success: false,
        error: data.description || "Telegram API ga yuborishda xatolik yuz berdi",
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id,
    };
  } catch (error) {
    console.error("[Telegram Network Error]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Telegram ulanish xatosi",
    };
  }
}
