import { z } from "zod";

export const PARTNERSHIP_TRACKS = [
  "export",
  "distribution",
  "manufacturing",
  "other",
] as const;

export type PartnershipTrack = (typeof PARTNERSHIP_TRACKS)[number];

/**
 * Normalizes an international phone input by removing spaces, dashes, and parentheses.
 */
export function normalizeInternationalPhone(raw: string): string {
  const cleaned = raw.trim().replace(/[\s\-()]/g, "");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

/**
 * Isolated E.164 international phone validation for the Phase 4.8 B2B prototype.
 * Does NOT modify the production +998 validation in src/lib/validation.ts.
 */
export const internationalPhoneRegex = /^\+[1-9]\d{6,14}$/;

export const partnershipSchema = z
  .object({
    track: z.enum(PARTNERSHIP_TRACKS),
    contactName: z.string().trim().min(2, "min2").max(80, "max80"),
    organization: z.string().trim().min(2, "min2").max(120, "max120"),
    phone: z
      .string()
      .trim()
      .transform(normalizeInternationalPhone)
      .refine((val) => internationalPhoneRegex.test(val), {
        message: "invalidPhone",
      }),
    email: z
      .string()
      .trim()
      .max(120)
      .refine(
        (val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "invalidEmail" }
      ),
    notes: z.string().trim().max(800).optional().or(z.literal("")),
    honeypot: z.string().optional(),

    // Export track fields
    targetCountry: z.string().trim().max(100).optional().or(z.literal("")),
    productInterest: z.string().trim().max(120).optional().or(z.literal("")),
    estimatedVolume: z.string().trim().max(100).optional().or(z.literal("")),

    // Distribution track fields
    distributionRegion: z.string().trim().max(100).optional().or(z.literal("")),
    salesChannel: z.string().trim().max(100).optional().or(z.literal("")),
    outletCount: z.string().trim().max(60).optional().or(z.literal("")),

    // Manufacturing track fields
    cooperationModel: z.string().trim().max(100).optional().or(z.literal("")),
    productionScope: z.string().trim().max(120).optional().or(z.literal("")),
    targetTimeline: z.string().trim().max(80).optional().or(z.literal("")),

    // Other business proposals track fields
    proposalCategory: z.string().trim().max(100).optional().or(z.literal("")),
    proposalSummary: z.string().trim().max(800).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.track === "export") {
      if (!data.targetCountry || data.targetCountry.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["targetCountry"],
          message: "min2",
        });
      }
      if (!data.productInterest || data.productInterest.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["productInterest"],
          message: "min2",
        });
      }
    }

    if (data.track === "distribution") {
      if (!data.distributionRegion || data.distributionRegion.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["distributionRegion"],
          message: "min2",
        });
      }
      if (!data.salesChannel || data.salesChannel.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salesChannel"],
          message: "min2",
        });
      }
    }

    if (data.track === "manufacturing") {
      if (!data.cooperationModel || data.cooperationModel.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cooperationModel"],
          message: "min2",
        });
      }
      if (!data.productionScope || data.productionScope.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["productionScope"],
          message: "min2",
        });
      }
    }

    if (data.track === "other") {
      if (!data.proposalCategory || data.proposalCategory.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["proposalCategory"],
          message: "min2",
        });
      }
      if (!data.proposalSummary || data.proposalSummary.trim().length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["proposalSummary"],
          message: "min10",
        });
      }
    }
  });

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;

