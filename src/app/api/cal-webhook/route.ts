import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { featuresConfig } from "@/config/features";
import {
  processCalWebhook,
  type CalWebhookPayload,
} from "@/features/booking/lib/telegramBooking";
import {
  DEFAULT_WEBHOOK_BODY_LIMIT_BYTES,
  readBoundedRawBody,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";

function verifyCalHmacSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  const normalizedHex = signatureHeader.trim().replace(/^sha256=/i, "");
  if (!/^[0-9a-f]{64}$/i.test(normalizedHex)) {
    return false;
  }

  const expectedHex = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const sigBuf = Buffer.from(normalizedHex, "hex");
  const expectedBuf = Buffer.from(expectedHex, "hex");

  return (
    sigBuf.length === expectedBuf.length &&
    crypto.timingSafeEqual(sigBuf, expectedBuf)
  );
}

/**
 * Fail-closed Cal.com Webhook Handler.
 * Rejects any request missing CAL_WEBHOOK_SECRET, x-cal-signature-256, or valid HMAC SHA-256.
 */
export async function POST(req: NextRequest) {
  if (featuresConfig.demoMode) {
    return NextResponse.json(
      {
        ok: false,
        demoMode: true,
        error: "Demo mode active: booking webhook dispatch disabled.",
      },
      { status: 403 }
    );
  }

  try {
    const secret = process.env.CAL_WEBHOOK_SECRET?.trim();
    if (!secret) {
      console.error("[Cal Webhook] Webhook secret is not configured.");
      return NextResponse.json(
        { ok: false, error: "Webhook verification is not configured" },
        { status: 503 }
      );
    }

    const signature = req.headers.get("x-cal-signature-256");
    if (!signature || !signature.trim()) {
      console.warn("[Cal Webhook] Missing x-cal-signature-256 header");
      return NextResponse.json(
        { ok: false, error: "Missing signature" },
        { status: 401 }
      );
    }

    const rawResult = await readBoundedRawBody(
      req,
      DEFAULT_WEBHOOK_BODY_LIMIT_BYTES
    );
    if (!rawResult.ok) {
      return NextResponse.json(
        { ok: false, error: rawResult.error },
        { status: rawResult.status }
      );
    }

    if (!verifyCalHmacSignature(rawResult.rawBody, signature, secret)) {
      console.warn("[Cal Webhook] Invalid signature rejected");
      return NextResponse.json(
        { ok: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    let event: CalWebhookPayload;
    try {
      const parsed: unknown = JSON.parse(rawResult.rawBody);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return NextResponse.json(
          { ok: false, error: "Invalid webhook JSON payload" },
          { status: 400 }
        );
      }
      event = parsed as CalWebhookPayload;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    const triggerEvent = event.triggerEvent;
    if (typeof triggerEvent !== "string" || !triggerEvent.trim()) {
      return NextResponse.json(
        { ok: false, error: "Missing triggerEvent" },
        { status: 400 }
      );
    }

    if (
      triggerEvent !== "BOOKING_CREATED" &&
      triggerEvent !== "BOOKING_RESCHEDULED" &&
      triggerEvent !== "BOOKING_CANCELLED"
    ) {
      return NextResponse.json(
        { ok: true, received: true, ignored: true, triggerEvent },
        { status: 200 }
      );
    }

    const telegramResult = await processCalWebhook(event);
    if (!telegramResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to dispatch booking notification",
        },
        { status: telegramResult.notConfigured ? 503 : 502 }
      );
    }

    console.info("[Cal Webhook Processed]", {
      triggerEvent,
      dispatched: true,
    });

    return NextResponse.json(
      { ok: true, success: true, triggerEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cal Webhook Unhandled Exception]", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
