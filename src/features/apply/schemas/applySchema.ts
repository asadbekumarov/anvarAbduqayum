import { z } from "zod";

// Phone number matches Uzbekistan format (+998 followed by 9 digits)
export const phoneRegex = /^\+998\d{9}$/;

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
      .regex(phoneRegex, {
        message: "Telefon raqami +998XXXXXXXXX formatida bo'lishi kerak",
      }),
    business: z
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
  })
  .refine(
    (data) => {
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

