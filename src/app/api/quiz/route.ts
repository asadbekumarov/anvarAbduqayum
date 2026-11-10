import { NextRequest, NextResponse } from "next/server";
import { quizSubmissionSchema } from "@/features/quiz/schemas/quizSchema";
import { sendTelegramQuizLead } from "@/features/quiz/lib/telegramQuiz";
import { calculateQuizScore, getQuizTier } from "@/features/quiz/data/quizData";
import { checkRateLimit } from "@/lib/rateLimit";
import { featuresConfig } from "@/config/features";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!featuresConfig.quiz) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  try {
    // 1. Client IP for sliding window rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    // 2. Rate limit: 3 requests per 1 minute per IP
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

    // 3. Body parse
    const body = await req.json();

    // 4. Honeypot check: if bot detected, return successful fake response
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      const answers = Array.isArray(body.answers) ? body.answers : [];
      const score = calculateQuizScore(answers);
      const tier = getQuizTier(score);
      return NextResponse.json({
        ok: true,
        score,
        tier: {
          id: tier.id,
          title: tier.title,
          description: tier.description,
          recommendation: tier.recommendation,
        },
        telegramSent: true,
      });
    }

    // 5. Server-side validation with Zod
    const validationResult = quizSubmissionSchema.safeParse(body);
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

    // 6. Recalculate score & tier authoritatively on server
    const score = calculateQuizScore(validData.answers);
    const tier = getQuizTier(score);

    // 7. Dispatch to Telegram
    const telegramResult = await sendTelegramQuizLead(validData, clientIp);

    if (!telegramResult.success) {
      console.error("[Quiz Telegram Dispatch Failed]", {
        error: telegramResult.error,
        name: validData.name,
        phone: validData.phone,
        clientIp,
      });
      // Telegram xato qaytarsa ham foydalanuvchiga baribir natijani ko'rsatamiz
      return NextResponse.json({
        ok: true,
        score,
        tier: {
          id: tier.id,
          title: tier.title,
          description: tier.description,
          recommendation: tier.recommendation,
        },
        telegramSent: false,
        warning:
          "Natijangiz hisoblandi, lekin xabarni yuborishda texnik uzilish bo'ldi.",
      });
    }

    // 8. Server audit logging
    console.info("[Quiz Lead Processed]", {
      name: validData.name,
      phone: validData.phone,
      companySize: validData.companySize,
      score,
      tierId: tier.id,
      clientIp,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      score,
      tier: {
        id: tier.id,
        title: tier.title,
        description: tier.description,
        recommendation: tier.recommendation,
      },
      telegramSent: true,
    });
  } catch (error) {
    console.error("[Quiz API Error]", error);
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
