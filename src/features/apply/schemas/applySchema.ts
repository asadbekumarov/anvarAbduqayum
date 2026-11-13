import { z } from "zod";

/**
 * Standard international E.164 phone regex (+ followed by 1 to 15 digits).
 * Allows international buyers and partners (+998, +7, +49, +971, +86, +1, +90, etc.) to apply.
 */
export const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
export const phoneRegex = internationalPhoneRegex;

export const applySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" })
      .max(60, { message: "Ism 60 ta belgidan oshmasligi kerak" }),
    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/[\s\-()]/g, ""))
      .refine((val) => internationalPhoneRegex.test(val), {
        message: "Telefon raqami xalqaro formatda bo'lishi kerak (masalan, +998901234567 yoki +79161234567)",
      }),
    business: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),
    company: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),
    companySize: z
      .string()
      .trim()
      .max(60)
      .optional()
      .or(z.literal("")),
    address: z
      .string()
      .trim()
      .max(300)
      .optional()
      .or(z.literal("")),
    question: z
      .string()
      .trim()
      .max(1000, { message: "Savol 1000 ta belgidan oshmasligi kerak" })
      .optional()
      .or(z.literal("")),
    service: z.string().trim().max(120).optional(),
    locale: z.string().trim().max(10).optional(),
    pageUrl: z.string().trim().max(300).optional(),
    honeypot: z.string().optional(),

    // Segmented B2B specific fields (International Partnership Portal)
    track: z
      .enum(["export", "distribution", "manufacturing", "general", "other"])
      .optional(),
    country: z.string().trim().max(120).optional().or(z.literal("")),
    targetCountry: z.string().trim().max(120).optional().or(z.literal("")),
    volume: z.string().trim().max(120).optional().or(z.literal("")),
    category: z.string().trim().max(120).optional().or(z.literal("")),
    productInterest: z.string().trim().max(120).optional().or(z.literal("")),
    region: z.string().trim().max(120).optional().or(z.literal("")),
    retailCoverage: z.string().trim().max(120).optional().or(z.literal("")),
    specs: z.string().trim().max(300).optional().or(z.literal("")),
    capacity: z.string().trim().max(120).optional().or(z.literal("")),
    email: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Elektron pochta manzili noto'g'ri formatda",
      }),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      // B2B intake submissions validate through track & company
      if (data.track) {
        return Boolean(
          (data.company && data.company.trim().length >= 2) ||
          (data.business && data.business.trim().length >= 2) ||
          true
        );
      }

      const isBook =
        data.service?.toLowerCase().includes("kitob") ||
        data.service?.toLowerCase().includes("книга") ||
        data.service?.toLowerCase().includes("book") ||
        data.service?.toLowerCase().includes("shpargalka") ||
        data.service?.toLowerCase().includes("шпаргалка");

      if (isBook) {
        return Boolean(data.address && data.address.trim().length >= 3);
      }
      return (
        Boolean(data.business && data.business.trim().length >= 2) ||
        Boolean(data.company && data.company.trim().length >= 2) ||
        Boolean(data.companySize && data.companySize.trim().length >= 1)
      );
    },
    (data) => {
      const isBook =
        data.service?.toLowerCase().includes("kitob") ||
        data.service?.toLowerCase().includes("книга") ||
        data.service?.toLowerCase().includes("book") ||
        data.service?.toLowerCase().includes("shpargalka") ||
        data.service?.toLowerCase().includes("шпаргалка");

      return {
        message: isBook
          ? "Yetkazib berish manzilini to'liq kiriting"
          : "Biznesingiz haqida ma'lumotni tanlang yoki kiriting",
        path: [isBook ? "address" : "business"],
      };
    }
  );

export type ApplyFormData = z.infer<typeof applySchema>;

