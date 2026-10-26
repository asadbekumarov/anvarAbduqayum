/**
 * O'zbekiston telefon raqamlari uchun maska va tozalash yordamchilari
 * Format: +998 (XX) XXX-XX-XX
 */

export function formatUzbekPhone(raw: string): string {
  // Faqat raqamlarni ajratib olish
  let digits = raw.replace(/\D/g, "");

  // Agar 998 bilan boshlansa, uni 9 raqamli qismdan ajratamiz
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  // Maksimal 9 ta raqam
  digits = digits.slice(0, 9);

  if (digits.length === 0) {
    return "+998 ";
  }
  if (digits.length <= 2) {
    return `+998 (${digits}`;
  }
  if (digits.length <= 5) {
    return `+998 (${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 7) {
    return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
}

/**
 * Validatsiya va serverga yuborish uchun toza format: +998XXXXXXXXX
 */
export function cleanUzbekPhone(formatted: string): string {
  let digits = formatted.replace(/\D/g, "");
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  return `+998${digits.slice(0, 9)}`;
}

/**
 * 9 ta raqam to'liq kiritilganligini tekshirish
 */
export function isUzbekPhoneComplete(formatted: string): boolean {
  let digits = formatted.replace(/\D/g, "");
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  return digits.length === 9;
}
