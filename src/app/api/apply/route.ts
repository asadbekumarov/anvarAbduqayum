import { NextRequest, NextResponse } from "next/server";
import { applySchema } from "@/features/apply/schemas/applySchema";
import { sendTelegramLead } from "@/features/apply/lib/telegram";
import { checkRateLimit } from "@/lib/rateLimit";
import { featuresConfig } from "@/config/features";
import {
  DEFAULT_JSON_BODY_LIMIT_BYTES,
  extractTrustedClientIp,
  hashForRateLimit,
  parseBoundedJsonObject,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";

function rateLimitResponse(resetAt: number) {
  const retrySeconds = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    {
      ok: false,
      error:
        "Juda ko'p so'rov yuborildi. Iltimos, 1 daqiqadan so'ng qayta urinib ko'ring.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retrySeconds),
      },
    }
  );
}

export async function POST(req: NextRequest) {
  // Block all direct or browser-originated lead submissions in Private Demo Safety Mode
  if (featuresConfig.demoMode) {
    return NextResponse.json(
      {
        ok: false,
        demoMode: true,
        error:
          "Demo rejim faol: arizalarni qabul qilish va tashqi xabar yuborish o'chirilgan.",
      },
      { status: 403 }
    );
  }

  try {
    // 1. Global burst circuit-breaker before parsing/upstream dispatch
    const globalLimit = checkRateLimit("global:lead", 60, 60 * 1000);
    if (!globalLimit.success) {
      return rateLimitResponse(globalLimit.resetAt);
    }

    // 2. Trusted-proxy IP extraction + hashed per-IP rate limit (3 req / 60s)
    const clientIp = extractTrustedClientIp(req);
    const ipLimit = checkRateLimit(
      `lead:ip:${hashForRateLimit(clientIp)}`,
      3,
      60 * 1000
    );
    if (!ipLimit.success) {
      return rateLimitResponse(ipLimit.resetAt);
    }

    // 3. Parse bounded JSON object body (400 on malformed JSON, 413 on > 16 KB)
    const parsedBody = await parseBoundedJsonObject(
      req,
      DEFAULT_JSON_BODY_LIMIT_BYTES
    );
    if (!parsedBody.ok) {
      return NextResponse.json(
        { ok: false, error: parsedBody.error },
        { status: parsedBody.status }
      );
    }

    const body = parsedBody.data;

    // 4. Honeypot anti-spam check: return silent ok without hitting Telegram
    if (
      typeof body.honeypot === "string" &&
      body.honeypot.trim().length > 0
    ) {
      return NextResponse.json({ ok: true });
    }

    // 5. Server-side validation with Zod schema
    const validationResult = applySchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          errors: fieldErrors,
          error: "Ma'lumotlar noto'g'ri kiritildi",
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 6. Per-phone anti-abuse throttle (guards against proxy-header rotation spam)
    const phoneLimit = checkRateLimit(
      `lead:phone:${hashForRateLimit(validData.phone)}`,
      3,
      5 * 60 * 1000
    );
    if (!phoneLimit.success) {
      return rateLimitResponse(phoneLimit.resetAt);
    }

    // 7. Dispatch message to Telegram Bot API (fail-closed when unconfigured)
    const telegramResult = await sendTelegramLead(validData, clientIp);
    if (!telegramResult.success) {
      console.error("[Apply Telegram Dispatch Failed]", {
        notConfigured: Boolean(telegramResult.notConfigured),
        locale: validData.locale || "uz",
        hasQuestion: Boolean(validData.question),
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "Arizani qabul qilishda texnik xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki to'g'ridan-to'g'ri telefon orqali bog'laning.",
        },
        { status: telegramResult.notConfigured ? 503 : 502 }
      );
    }

    // 8. Non-PII operational log
    console.info("[Apply Lead Processed]", {
      locale: validData.locale || "uz",
      hasService: Boolean(validData.service),
      hasQuestion: Boolean(validData.question),
      telegramSent: true,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Apply API Error]", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "Serverda kutilmagan xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
      },
      { status: 500 }
    );
  }
}
