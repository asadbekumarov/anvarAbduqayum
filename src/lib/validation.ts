import { z } from "zod";

/**
 * Standard international E.164 phone regex (+ followed by 1 to 15 digits).
 * Allows global numbers from Uzbekistan (+998), CIS (+7), Europe (+49, +44), UAE (+971), China (+86), USA (+1), etc.
 */
export const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
export const phoneRegex = internationalPhoneRegex;

export const applyFormSchema = z.object({
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
    .min(2, { message: "Biznes sohasi kamida 2 ta belgidan iborat bo'lishi kerak" })
    .max(80, { message: "Biznes sohasi 80 ta belgidan oshmasligi kerak" }),
  question: z
    .string()
    .trim()
    .max(1000, { message: "Savol 1000 ta belgidan oshmasligi kerak" })
    .optional()
    .or(z.literal("")),
  honeypot: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof applyFormSchema>;
