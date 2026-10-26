import { NextRequest, NextResponse } from "next/server";
import { applySchema } from "@/features/apply/schemas/applySchema";
import { sendTelegramLead } from "@/features/apply/lib/telegram";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    // 2. Rate limit: 3 requests per 1 minute per IP (oddiy rate limit)
    const rateLimit = checkRateLimit(clientIp, 3, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Juda ko'p so'rov yuborildi. Iltimos, 1 daqiqadan so'ng qayta urinib ko'ring.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimit.resetAt - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    // 3. Parse JSON body
    const body = await req.json();

    // 4. Honeypot anti-spam check: if filled, silently return ok
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
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

    // 6. Dispatch message to Telegram Bot API
    const telegramResult = await sendTelegramLead(validData, clientIp);
    if (!telegramResult.success) {
      console.error("[Apply Telegram Dispatch Failed]", {
        error: telegramResult.error,
        name: validData.name,
        phone: validData.phone,
        clientIp,
      });
      // Clientga hech qachon bot token yoki chat ID chiqmasin, tushunarli xabar qaytarilsin
      return NextResponse.json(
        {
          ok: false,
          error:
            "Arizani qabul qilishda texnik xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki to'g'ridan-to'g'ri telefon orqali bog'laning.",
        },
        { status: 502 }
      );
    }

    // 7. Audit log in server console
    console.info("[Apply Lead Processed]", {
      name: validData.name,
      phone: validData.phone,
      companySize: validData.companySize,
      business: validData.business,
      hasQuestion: Boolean(validData.question),
      clientIp,
      telegramSent: telegramResult.success,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Apply API Error]", error);
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
