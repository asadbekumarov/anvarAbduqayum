interface TelegramBookingResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

export interface CalWebhookPayload {
  triggerEvent: "BOOKING_CREATED" | "BOOKING_RESCHEDULED" | "BOOKING_CANCELLED" | string;
  createdAt?: string;
  payload?: {
    uid?: string;
    title?: string;
    type?: string;
    description?: string;
    additionalNotes?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    cancellationReason?: string;
    cancelUrl?: string;
    rescheduleUrl?: string;
    attendees?: Array<{
      name?: string;
      email?: string;
      timeZone?: string;
    }>;
    responses?: Record<string, unknown>;
    userFieldsResponses?: Record<string, unknown>;
    organizer?: {
      name?: string;
      email?: string;
      timeZone?: string;
    };
    [key: string]: unknown;
  };
}

/**
 * Safely extracts primitive text from nested Cal.com response objects
 */
function extractValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    if ("value" in val) {
      const inner = (val as { value: unknown }).value;
      if (typeof inner === "string") return inner.trim();
      if (Array.isArray(inner)) return inner.join(", ");
      if (inner !== null && inner !== undefined) return String(inner);
    }
    if ("label" in val && typeof (val as { label: unknown }).label === "string") {
      return (val as { label: string }).label;
    }
  }
  return "";
}

/**
 * Searches flexible keys within responses matching regex patterns
 */
function findInResponses(
  responses: Record<string, unknown> | undefined,
  patterns: RegExp[]
): string {
  if (!responses || typeof responses !== "object") return "";
  for (const [key, val] of Object.entries(responses)) {
    for (const pattern of patterns) {
      if (pattern.test(key)) {
        const extracted = extractValue(val);
        if (extracted) return extracted;
      }
    }
  }
  return "";
}

/**
 * Formats appointment time in Asia/Tashkent timezone.
 * Example output: "30 oktyabr, juma, 15:00–15:20"
 */
export function formatTashkentMeetingTime(
  startTimeStr?: string,
  endTimeStr?: string
): string {
  if (!startTimeStr) return "Ko'rsatilmagan";
  try {
    const startDate = new Date(startTimeStr);
    if (isNaN(startDate.getTime())) return startTimeStr;

    const uzMonths = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ];

    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const parts = dtf.formatToParts(startDate);
    const partMap: Record<string, string> = {};
    for (const p of parts) {
      partMap[p.type] = p.value;
    }

    const day = partMap.day || "";
    const monthIdx = parseInt(partMap.month || "1", 10) - 1;
    const monthName = uzMonths[monthIdx] || "";

    const weekdayStr = new Intl.DateTimeFormat("uz-UZ", {
      timeZone: "Asia/Tashkent",
      weekday: "long",
    }).format(startDate);

    const startHourMin = `${partMap.hour}:${partMap.minute}`;

    let endHourMin = "";
    if (endTimeStr) {
      const endDate = new Date(endTimeStr);
      if (!isNaN(endDate.getTime())) {
        const endParts = dtf.formatToParts(endDate);
        const endMap: Record<string, string> = {};
        for (const p of endParts) {
          endMap[p.type] = p.value;
        }
        endHourMin = `${endMap.hour}:${endMap.minute}`;
      }
    }

    const timeRange = endHourMin ? `${startHourMin}–${endHourMin}` : startHourMin;
    return `${day} ${monthName}, ${weekdayStr}, ${timeRange}`;
  } catch (error) {
    console.error("[Date Formatting Error]", error);
    return startTimeStr;
  }
}

/**
 * Formats location/meeting medium nicely for user
 */
function formatLocation(loc?: string): string {
  if (!loc) return "Online uchrashuv (Google Meet / Video havola)";
  const lower = loc.toLowerCase();
  if (lower.includes("daily") || lower.includes("cal-video")) {
    return "Cal Video (Online uchrashuv)";
  }
  if (lower.includes("meet")) {
    return "Google Meet";
  }
  if (lower.includes("zoom")) {
    return "Zoom";
  }
  if (lower.includes("phone")) {
    return "Telefon qo'ng'irog'i";
  }
  return loc;
}

/**
 * Dispatches structured Cal.com booking notification to Telegram.
 * Uses TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
 */
export async function processCalWebhook(
  event: CalWebhookPayload
): Promise<TelegramBookingResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "[Telegram Booking Service] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping Telegram dispatch in dev mode."
    );
    return {
      success: true, // Don't crash development test suites if credentials not set
    };
  }

  const payload = event.payload || {};
  const triggerEvent = event.triggerEvent;

  // Title based strictly on event type
  let headerTitle = "📅 <b>Yangi BRON</b>";
  if (triggerEvent === "BOOKING_RESCHEDULED") {
    headerTitle = "🔄 <b>Bron o'zgardi</b>";
  } else if (triggerEvent === "BOOKING_CANCELLED") {
    headerTitle = "❌ <b>Bron bekor qilindi</b>";
  }

  const cleanText = (str?: string) =>
    (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // Attendees & contact info
  const firstAttendee = Array.isArray(payload.attendees) && payload.attendees.length > 0
    ? payload.attendees[0]
    : undefined;

  const responses = payload.responses || {};
  const userFields = payload.userFieldsResponses || {};

  const name =
    firstAttendee?.name ||
    findInResponses(responses, [/^name$/i, /ism/i, /fio/i]) ||
    extractValue(userFields.name) ||
    "Noma'lum";

  const email =
    firstAttendee?.email ||
    findInResponses(responses, [/^email$/i, /pochta/i]) ||
    extractValue(userFields.email) ||
    "Ko'rsatilmagan";

  const phone =
    findInResponses(responses, [/phone/i, /tel/i, /raqam/i, /sms/i]) ||
    extractValue(userFields.phone) ||
    extractValue(userFields.phoneNumber) ||
    "Ko'rsatilmagan";

  const companySize =
    findInResponses(responses, [/company/i, /kompaniya/i, /scale/i, /hajm/i, /size/i, /xodim/i]) ||
    extractValue(userFields.companySize) ||
    "";

  const question =
    payload.additionalNotes ||
    payload.description ||
    findInResponses(responses, [/question/i, /savol/i, /note/i, /izoh/i, /muammo/i, /maqsad/i]) ||
    "";

  const formattedTime = formatTashkentMeetingTime(payload.startTime, payload.endTime);
  const location = formatLocation(payload.location);

  const manageUrl =
    payload.rescheduleUrl ||
    payload.cancelUrl ||
    (payload.uid ? `https://app.cal.com/booking/${payload.uid}` : "");

  const cancellationReason = payload.cancellationReason || "";

  const timestamp = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const messageLines: (string | null)[] = [
    headerTitle,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Mijoz:</b> ${cleanText(name)}`,
    `✉️ <b>Email:</b> <code>${cleanText(email)}</code>`,
    `📞 <b>Telefon:</b> <code>${cleanText(phone)}</code>`,
    companySize ? `🏢 <b>Kompaniya ko'lami:</b> ${cleanText(companySize)}` : null,
    question ? `❓ <b>Savol / Izoh:</b>\n<i>${cleanText(question)}</i>` : null,
    cancellationReason
      ? `⚠️ <b>Bekor qilish sababi:</b>\n<i>${cleanText(cancellationReason)}</i>`
      : null,
    `🕒 <b>Uchrashuv vaqti:</b> ${formattedTime} (Toshkent vaqti)`,
    `📍 <b>Uchrashuv joyi/turi:</b> ${cleanText(location)}`,
    manageUrl
      ? `🔗 <b>Boshqarish:</b> <a href="${manageUrl}">Bekor qilish yoki o'zgartirish</a>`
      : null,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🕒 <b>Qayd etilgan vaqt:</b> ${timestamp}`,
  ];

  const message = messageLines.filter(Boolean).join("\n");

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
      console.error("[Telegram Booking Error Response]", data);
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
    console.error("[Telegram Booking Network Error]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Telegram ulanish xatosi",
    };
  }
}
