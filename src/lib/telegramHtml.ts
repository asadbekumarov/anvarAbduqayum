const TELEGRAM_SEND_TIMEOUT_MS = 8000;

export interface TelegramDispatchResult {
  success: boolean;
  messageId?: number;
  error?: string;
  notConfigured?: boolean;
}

/**
 * Escapes all dynamic text inserted into Telegram Bot API HTML messages
 * (`parse_mode: "HTML"`) while preserving Uzbek, Cyrillic, and Latin characters.
 */
export function escapeTelegramHtml(value: unknown): string {
  const str =
    typeof value === "string"
      ? value
      : value === null || value === undefined
      ? ""
      : String(value);

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validates and normalizes an external URL for safe insertion inside Telegram
 * `<a href="...">` markup. Strictly rejects `javascript:`, `data:`, control
 * characters, and malformed URLs.
 */
export function sanitizeTelegramUrl(
  rawUrl?: string | null,
  allowedProtocols: readonly string[] = ["https:"]
): string {
  if (!rawUrl || typeof rawUrl !== "string") return "";

  const trimmed = rawUrl.trim();
  if (!trimmed || /[\u0000-\u001F\u007F]/.test(trimmed)) {
    return "";
  }

  try {
    const parsed = new URL(trimmed);
    if (!allowedProtocols.includes(parsed.protocol)) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

function redactTelegramSecrets(message: string): string {
  return message.replace(/\/bot[^/\s?]+/gi, "/bot[REDACTED]");
}

/**
 * Sends a formatted HTML message via Telegram Bot API.
 * Fails closed when TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is absent.
 */
export async function dispatchTelegramHtmlMessage(
  htmlMessage: string,
  logPrefix = "[Telegram Service]"
): Promise<TelegramDispatchResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.error(
      `${logPrefix} Missing required Telegram messaging credentials.`
    );
    return {
      success: false,
      notConfigured: true,
      error: "Telegram xizmati serverda sozlanmagan.",
    };
  }

  try {
    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_SEND_TIMEOUT_MS),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      console.error(`${logPrefix} Upstream delivery rejected`, {
        status: response.status,
        errorCode: data?.error_code,
      });
      return {
        success: false,
        error: "Telegram xizmatiga xabar yuborib bo'lmadi.",
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id,
    };
  } catch (error) {
    const safeReason =
      error instanceof Error
        ? redactTelegramSecrets(error.name || "FetchError")
        : "UnknownNetworkError";
    console.error(`${logPrefix} Network dispatch failure`, {
      reason: safeReason,
    });
    return {
      success: false,
      error: "Telegram tarmoq ulanishida xatolik yuz berdi.",
    };
  }
}

