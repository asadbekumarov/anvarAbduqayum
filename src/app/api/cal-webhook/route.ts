import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { processCalWebhook, type CalWebhookPayload } from "@/features/booking/lib/telegramBooking";

export const runtime = "nodejs";

/**
 * Cal.com Webhook Handler
 * Verifies HMAC SHA-256 signature from x-cal-signature-256 against CAL_WEBHOOK_SECRET,
 * filters for BOOKING_CREATED, BOOKING_RESCHEDULED, BOOKING_CANCELLED events,
 * and formats & forwards details to Telegram.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Read raw body as text for cryptographic HMAC verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-cal-signature-256");
    const secret = process.env.CAL_WEBHOOK_SECRET;

    // 2. Cryptographic HMAC verification if secret is configured and signature is present
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

      const sigBuf = Buffer.from(signature);
      const expectedBuf = Buffer.from(expectedSignature);

      // Timing-safe equality check preventing timing attacks
      if (
        sigBuf.length !== expectedBuf.length ||
        !crypto.timingSafeEqual(sigBuf, expectedBuf)
      ) {
        console.warn("[Cal Webhook] Invalid signature rejected");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    } else if (!secret) {
      console.warn("[Cal Webhook] CAL_WEBHOOK_SECRET is not configured on the server. Proceeding without signature verification.");
    } else if (!signature) {
      console.warn("[Cal Webhook] Incoming webhook has no x-cal-signature-256 header. Proceeding without signature verification.");
    }

    // 3. Parse JSON payload
    let event: CalWebhookPayload;
    try {
      event = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("[Cal Webhook] JSON parse error on verified payload", parseError);
      return NextResponse.json(
        { error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    const triggerEvent = event.triggerEvent;

    // 5. Handle only BOOKING_CREATED, BOOKING_RESCHEDULED, BOOKING_CANCELLED.
    // Quietly return 200 for other events.
    if (
      triggerEvent !== "BOOKING_CREATED" &&
      triggerEvent !== "BOOKING_RESCHEDULED" &&
      triggerEvent !== "BOOKING_CANCELLED"
    ) {
      return NextResponse.json(
        { received: true, ignored: true, triggerEvent },
        { status: 200 }
      );
    }

    // 6. Dispatch message to Telegram
    const telegramResult = await processCalWebhook(event);

    if (!telegramResult.success) {
      console.error("[Cal Webhook Telegram Dispatch Failed]", {
        error: telegramResult.error,
        triggerEvent,
        bookingUid: event.payload?.uid,
      });
      // Returning 500 prompts Cal.com webhook retry engine
      return NextResponse.json(
        { error: telegramResult.error || "Failed to dispatch Telegram message" },
        { status: 500 }
      );
    }

    console.info("[Cal Webhook Success]", {
      triggerEvent,
      bookingUid: event.payload?.uid,
      messageId: telegramResult.messageId,
    });

    return NextResponse.json(
      { success: true, triggerEvent, bookingUid: event.payload?.uid },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cal Webhook Unhandled Exception]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
