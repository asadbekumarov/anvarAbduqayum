import { z } from "zod";

// Phone number matches Uzbekistan format (+998 followed by 9 digits)
export const phoneRegex = /^\+998\d{9}$/;

export const applySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" })
    .max(60, { message: "Ism 60 ta belgidan oshmasligi kerak" }),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, {
      message: "Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak",
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

export type ApplyFormData = z.infer<typeof applySchema>;
