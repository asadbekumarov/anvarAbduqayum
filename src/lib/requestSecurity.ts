import crypto from "crypto";
import net from "net";
import type { NextRequest } from "next/server";

export const DEFAULT_JSON_BODY_LIMIT_BYTES = 16 * 1024; // 16 KB
export const DEFAULT_WEBHOOK_BODY_LIMIT_BYTES = 64 * 1024; // 64 KB

export type RawBodyReadResult =
  | { ok: true; rawBody: string }
  | { ok: false; status: 400 | 413; error: string };

export type BoundedJsonResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; status: 400 | 413; error: string };

/**
 * Reads a request body as UTF-8 text while enforcing Content-Length and actual
 * decoded byte limits prior to JSON parsing.
 */
export async function readBoundedRawBody(
  req: NextRequest,
  maxBytes: number = DEFAULT_JSON_BODY_LIMIT_BYTES
): Promise<RawBodyReadResult> {
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredLength = Number(contentLengthHeader);
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
      return {
        ok: false,
        status: 413,
        error: "So'rov hajmi belgilangan me'yordan oshib ketdi.",
      };
    }
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return {
      ok: false,
      status: 400,
      error: "So'rov tanasini o'qib bo'lmadi.",
    };
  }

  if (Buffer.byteLength(rawBody, "utf8") > maxBytes) {
    return {
      ok: false,
      status: 413,
      error: "So'rov hajmi belgilangan me'yordan oshib ketdi.",
    };
  }

  return { ok: true, rawBody };
}

/**
 * Parses a bounded JSON object body, returning 400 on malformed JSON or non-object payloads
 * and 413 when the body exceeds `maxBytes`.
 */
export async function parseBoundedJsonObject(
  req: NextRequest,
  maxBytes: number = DEFAULT_JSON_BODY_LIMIT_BYTES
): Promise<BoundedJsonResult> {
  const rawResult = await readBoundedRawBody(req, maxBytes);
  if (!rawResult.ok) return rawResult;

  try {
    const parsed: unknown = JSON.parse(rawResult.rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        ok: false,
        status: 400,
        error: "JSON obyekt ko'rinishidagi so'rov yuborilishi kerak.",
      };
    }
    return { ok: true, data: parsed as Record<string, unknown> };
  } catch {
    return {
      ok: false,
      status: 400,
      error: "Noto'g'ri JSON formati yuborildi.",
    };
  }
}

function normalizeCandidateIp(rawValue: string | null): string | null {
  if (!rawValue) return null;
  const trimmed = rawValue.trim();
  if (!trimmed || trimmed.length > 64) return null;
  return net.isIP(trimmed) !== 0 ? trimmed : null;
}

/**
 * Extracts a validated client IP under the Vercel / reverse-proxy trust model:
 * prioritizes edge-managed headers (`x-vercel-forwarded-for`, `cf-connecting-ip`,
 * `x-real-ip`), and otherwise takes the rightmost proxy-appended entry of `x-forwarded-for`
 * rather than the caller-spoofable leftmost value.
 */
export function extractTrustedClientIp(req: NextRequest): string {
  const vercelIp = normalizeCandidateIp(
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0] ?? null
  );
  if (vercelIp) return vercelIp;

  const cfIp = normalizeCandidateIp(req.headers.get("cf-connecting-ip"));
  if (cfIp) return cfIp;

  const realIp = normalizeCandidateIp(req.headers.get("x-real-ip"));
  if (realIp) return realIp;

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor.split(",").map((part) => part.trim());
    for (let i = parts.length - 1; i >= 0; i -= 1) {
      const validIp = normalizeCandidateIp(parts[i]);
      if (validIp) return validIp;
    }
  }

  return "unknown";
}

/**
 * Produces a short irreversible SHA-256 digest for rate-limit keys and non-PII correlation.
 */
export function hashForRateLimit(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 24);
}

