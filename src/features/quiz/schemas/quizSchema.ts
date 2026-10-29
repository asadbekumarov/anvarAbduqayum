import { z } from "zod";

export const phoneRegex = /^\+998\d{9}$/;

export const quizSubmissionSchema = z.object({
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
  companySize: z
    .string()
    .trim()
    .min(1, { message: "Kompaniya ko'lamini tanlang" })
    .max(60),
  answers: z
    .array(
      z
        .number()
        .int()
        .min(0, { message: "Ball kamida 0 bo'lishi kerak" })
        .max(3, { message: "Ball ko'pi bilan 3 bo'lishi kerak" })
    )
    .length(10, { message: "Barcha 10 ta savolga javob berilishi shart" }),
  locale: z.string().trim().max(10).optional(),
  pageUrl: z.string().trim().max(300).optional(),
  honeypot: z.string().optional(),
});

export type QuizSubmissionData = z.infer<typeof quizSubmissionSchema>;
