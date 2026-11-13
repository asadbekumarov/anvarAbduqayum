import { z } from "zod";
import { internationalPhoneRegex } from "@/features/apply/schemas/applySchema";

export const PARTNERSHIP_TRACKS = [
  "export",
  "distribution",
  "manufacturing",
  "general",
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

export const b2bPartnershipSchema = z
  .object({
    track: z.enum(PARTNERSHIP_TRACKS),
    contactName: z.string().trim().min(2, "min2").max(80, "max80"),
    company: z.string().trim().min(2, "min2").max(120, "max120"),
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
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: "invalidEmail" }
      ),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
    honeypot: z.string().optional(),

    // Track a) Export: target country & HS-category/volume
    targetCountry: z.string().trim().max(120).optional().or(z.literal("")),
    hsCategory: z.string().trim().max(120).optional().or(z.literal("")),
    volume: z.string().trim().max(120).optional().or(z.literal("")),

    // Track b) Distribution: region & retail coverage
    region: z.string().trim().max(120).optional().or(z.literal("")),
    retailCoverage: z.string().trim().max(120).optional().or(z.literal("")),
    outlets: z.string().trim().max(80).optional().or(z.literal("")),

    // Track c) Manufacturing / OEM: specs & capacity
    specs: z.string().trim().max(300).optional().or(z.literal("")),
    capacity: z.string().trim().max(120).optional().or(z.literal("")),
    toolingModel: z.string().trim().max(120).optional().or(z.literal("")),

    // Track d) General Inquiry: topic & proposal details
    inquiryTopic: z.string().trim().max(120).optional().or(z.literal("")),
    proposalDetails: z.string().trim().max(1000).optional().or(z.literal("")),
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
      if (!data.hsCategory || data.hsCategory.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["hsCategory"],
          message: "min2",
        });
      }
      if (!data.volume || data.volume.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["volume"],
          message: "min2",
        });
      }
    } else if (data.track === "distribution") {
      if (!data.region || data.region.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["region"],
          message: "min2",
        });
      }
      if (!data.retailCoverage || data.retailCoverage.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["retailCoverage"],
          message: "min2",
        });
      }
    } else if (data.track === "manufacturing") {
      if (!data.specs || data.specs.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["specs"],
          message: "min2",
        });
      }
      if (!data.capacity || data.capacity.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["capacity"],
          message: "min2",
        });
      }
    } else if (data.track === "general") {
      if (!data.inquiryTopic || data.inquiryTopic.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["inquiryTopic"],
          message: "min2",
        });
      }
      if (!data.proposalDetails || data.proposalDetails.trim().length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["proposalDetails"],
          message: "min10",
        });
      }
    }
  });

export type B2BPartnershipFormValues = z.infer<typeof b2bPartnershipSchema>;

// Backwards-compatibility aliases
export const partnershipSchema = b2bPartnershipSchema;
export type PartnershipFormValues = B2BPartnershipFormValues;
