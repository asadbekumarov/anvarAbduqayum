import {
  QUIZ_QUESTIONS,
  calculateQuizScore,
  getQuizTier,
} from "../data/quizData";
import type { QuizSubmissionData } from "../schemas/quizSchema";

export interface TelegramQuizResult {
  success: boolean;
  messageId?: number;
  error?: string;
  score: number;
  tierId: string;
  tierTitle: string;
}

/**
 * Escapes HTML characters for Telegram parse_mode: "HTML"
 */
function cleanText(str?: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Dispatches structured diagnostic quiz outcome to Telegram channel/group.
 * Reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID from process.env.
 */
export async function sendTelegramQuizLead(
  payload: QuizSubmissionData,
  clientIp?: string
): Promise<TelegramQuizResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Recalculate score & tier strictly on server side
  const score = calculateQuizScore(payload.answers);
  const tier = getQuizTier(score);
  const locale = (payload.locale || "uz") as "uz" | "ru" | "en";
  const localizedTierTitle = tier.title[locale] || tier.title.uz;

  if (!token || !chatId) {
    console.warn(
      "[Telegram Quiz Service] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping dispatch in dev mode."
    );
    return {
      success: true,
      score,
      tierId: tier.id,
      tierTitle: localizedTierTitle,
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

  const questionsSummary = QUIZ_QUESTIONS.map((q, idx) => {
    const selectedPoints = payload.answers[idx] ?? 0;
    const option =
      q.options.find((opt) => opt.points === selectedPoints) || q.options[0];
    const optLabel = option.shortText[locale] || option.shortText.uz;
    return `<b>${idx + 1}.</b> ${cleanText(optLabel)} <i>(${selectedPoints} ball)</i>`;
  }).join("\n");

  const localeUpper = (payload.locale || "uz").toUpperCase();
  const sourceStr = payload.pageUrl ? ` · ${cleanText(payload.pageUrl)}` : "";

  const message = [
    `🏛 <b>Yangi TEST natijasi</b>`,
    `<b>"Biznesingiz egasisiz ishlay oladimi?"</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Ism:</b> ${cleanText(payload.name)}`,
    `📞 <b>Telefon:</b> <code>${cleanText(payload.phone)}</code>`,
    `🏢 <b>Kompaniya ko'lami:</b> ${cleanText(payload.companySize)}`,
    `📊 <b>Natija:</b> <b>${score} / 30 ball</b>`,
    `🏷 <b>Daraja:</b> <b>${cleanText(localizedTierTitle)}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>SAVOLLAR BO'YICHA JAVOBLAR:</b>`,
    questionsSummary,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🌐 <b>Til / Manba:</b> ${localeUpper}${sourceStr}`,
    `🕒 <b>Vaqt:</b> ${timestamp} (Toshkent vaqti)`,
    clientIp ? `🌐 <b>IP:</b> <code>${clientIp}</code>` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Tahlil natijalari bo'yicha bog'lanish tavsiya etiladi.</i>`,
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
      signal: AbortSignal.timeout(8000),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error("[Telegram Quiz Error Response]", data);
      return {
        success: false,
        error: data.description || "Telegram API ga yuborishda xatolik yuz berdi",
        score,
        tierId: tier.id,
        tierTitle: localizedTierTitle,
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id,
      score,
      tierId: tier.id,
      tierTitle: localizedTierTitle,
    };
  } catch (error) {
    console.error("[Telegram Quiz Network Error]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Telegram ulanish xatosi",
      score,
      tierId: tier.id,
      tierTitle: localizedTierTitle,
    };
  }
}
