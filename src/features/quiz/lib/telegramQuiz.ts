import {
  QUIZ_QUESTIONS,
  calculateQuizScore,
  getQuizTier,
} from "../data/quizData";
import type { QuizSubmissionData } from "../schemas/quizSchema";
import {
  dispatchTelegramHtmlMessage,
  escapeTelegramHtml,
  sanitizeTelegramUrl,
} from "@/lib/telegramHtml";

export interface TelegramQuizResult {
  success: boolean;
  messageId?: number;
  error?: string;
  notConfigured?: boolean;
  score: number;
  tierId: string;
  tierTitle: string;
}

/**
 * Formats and dispatches structured diagnostic quiz outcome to Telegram.
 * Escapes all dynamic inputs and fails closed when credentials are unconfigured.
 */
export async function sendTelegramQuizLead(
  payload: QuizSubmissionData,
  clientIp?: string
): Promise<TelegramQuizResult> {
  const score = calculateQuizScore(payload.answers);
  const tier = getQuizTier(score);
  const locale = (payload.locale || "uz") as "uz" | "ru" | "en";
  const localizedTierTitle = tier.title[locale] || tier.title.uz;

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
    return `<b>${idx + 1}.</b> ${escapeTelegramHtml(optLabel)} <i>(${escapeTelegramHtml(selectedPoints)} ball)</i>`;
  }).join("\n");

  const safeLocale = escapeTelegramHtml((payload.locale || "uz").toUpperCase());
  const safePageUrl = sanitizeTelegramUrl(payload.pageUrl, ["https:", "http:"]);
  const sourceStr = safePageUrl ? ` · ${escapeTelegramHtml(safePageUrl)}` : "";
  const safeClientIp =
    clientIp && clientIp !== "unknown" ? escapeTelegramHtml(clientIp) : "";

  const message = [
    `🏛 <b>Yangi TEST natijasi</b>`,
    `<b>&quot;Biznesingiz egasisiz ishlay oladimi?&quot;</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Ism:</b> ${escapeTelegramHtml(payload.name)}`,
    `📞 <b>Telefon:</b> <code>${escapeTelegramHtml(payload.phone)}</code>`,
    `🏢 <b>Kompaniya ko'lami:</b> ${escapeTelegramHtml(payload.companySize)}`,
    `📊 <b>Natija:</b> <b>${escapeTelegramHtml(score)} / 30 ball</b>`,
    `🏷 <b>Daraja:</b> <b>${escapeTelegramHtml(localizedTierTitle)}</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<b>SAVOLLAR BO'YICHA JAVOBLAR:</b>`,
    questionsSummary,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🌐 <b>Til / Manba:</b> ${safeLocale}${sourceStr}`,
    `🕒 <b>Vaqt:</b> ${escapeTelegramHtml(timestamp)} (Toshkent vaqti)`,
    safeClientIp ? `🌐 <b>IP:</b> <code>${safeClientIp}</code>` : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Tahlil natijalari bo'yicha bog'lanish tavsiya etiladi.</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  const dispatchResult = await dispatchTelegramHtmlMessage(
    message,
    "[Telegram Quiz Service]"
  );

  return {
    ...dispatchResult,
    score,
    tierId: tier.id,
    tierTitle: localizedTierTitle,
  };
}
