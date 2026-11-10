import { NextRequest, NextResponse } from "next/server";
import { quizSubmissionSchema } from "@/features/quiz/schemas/quizSchema";
import { sendTelegramQuizLead } from "@/features/quiz/lib/telegramQuiz";
import { calculateQuizScore, getQuizTier } from "@/features/quiz/data/quizData";
import { checkRateLimit } from "@/lib/rateLimit";
import { featuresConfig } from "@/config/features";
import {
  DEFAULT_JSON_BODY_LIMIT_BYTES,
  extractTrustedClientIp,
  hashForRateLimit,
  parseBoundedJsonObject,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";

function quizRateLimitResponse(resetAt: number) {
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
  if (!featuresConfig.quiz) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }

  if (featuresConfig.demoMode) {
    return NextResponse.json(
      {
        ok: false,
        demoMode: true,
        error: "Demo mode active: lead submission and notifications disabled.",
      },
      { status: 403 }
    );
  }

  try {
    const globalLimit = checkRateLimit("global:quiz", 60, 60 * 1000);
    if (!globalLimit.success) {
      return quizRateLimitResponse(globalLimit.resetAt);
    }

    const clientIp = extractTrustedClientIp(req);
    const rateLimit = checkRateLimit(
      `quiz:ip:${hashForRateLimit(clientIp)}`,
      3,
      60 * 1000
    );
    if (!rateLimit.success) {
      return quizRateLimitResponse(rateLimit.resetAt);
    }

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

    if (
      typeof body.honeypot === "string" &&
      body.honeypot.trim().length > 0
    ) {
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

    const phoneLimit = checkRateLimit(
      `quiz:phone:${hashForRateLimit(validData.phone)}`,
      3,
      5 * 60 * 1000
    );
    if (!phoneLimit.success) {
      return quizRateLimitResponse(phoneLimit.resetAt);
    }

    const score = calculateQuizScore(validData.answers);
    const tier = getQuizTier(score);

    const telegramResult = await sendTelegramQuizLead(validData, clientIp);

    if (!telegramResult.success) {
      console.error("[Quiz Telegram Dispatch Failed]", {
        notConfigured: Boolean(telegramResult.notConfigured),
        tierId: tier.id,
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
        telegramSent: false,
        warning:
          "Natijangiz hisoblandi, lekin xabarni yuborishda texnik uzilish bo'ldi.",
      });
    }

    console.info("[Quiz Lead Processed]", {
      tierId: tier.id,
      score,
      telegramSent: true,
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
    console.error("[Quiz API Error]", {
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
