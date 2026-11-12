export type DemoLocale = "uz" | "ru" | "en";

export interface DemoCopy {
  disclosure: {
    ariaLabel: string;
    badge: string;
    statement: string;
    modeTag: string;
  };
  contactForm: {
    badge: string;
    subtitle: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
    resetButton: string;
  };
  externalChannels: {
    outboundNotice: string;
    channelsBadge: string;
    channelsNote: string;
    pendingContactsNote: string;
  };
  footer: {
    colophonNote: string;
    externalChannelsNote: string;
    pendingContactsNote: string;
  };
  meta: {
    siteTitleSuffix: string;
    siteDescription: string;
    siteName: string;
    ogImageAlt: string;
    bronTitleSuffix: string;
    bronDescription: string;
  };
}

const DEMO_COPY: Record<DemoLocale, DemoCopy> = {
  uz: {
    disclosure: {
      ariaLabel: "Mustaqil dizayn konsepsiyasi haqida eslatma",
      badge: "Konsepsiya · Demo",
      statement:
        "Mustaqil dizayn konsepsiyasi. Ushbu sayt Anvar Abduqayum yoki uning jamoasi tomonidan buyurtma qilinmagan va tasdiqlanmagan.",
      modeTag: "Xususiy namoyish",
    },
    contactForm: {
      badge: "Demo rejim · Xabar yuborilmaydi",
      subtitle:
        "Namoyish shakli: kiritilgan ma’lumotlar faqat brauzerda tekshiriladi, saqlanmaydi va hech qayerga yuborilmaydi.",
      submitButton: "Shaklni tekshirish (Demo)",
      successTitle: "Shakl tekshirildi — xabar yuborilmadi (Demo)",
      successMessage:
        "Barcha majburiy maydonlar brauzerda tekshirildi. Demo rejim sababli hech qanday ariza yuborilmadi va shaxsiy ma’lumotlaringiz saqlanmadi.",
      resetButton: "Shaklni qayta tekshirish",
    },
    externalChannels: {
      outboundNotice:
        "Uchrashuv va to‘g‘ridan-to‘g‘ri admin kontaktlari rasmiy tasdiqdan o‘tgach faollashtiriladi. Demo rejimda avtomatik ariza yuborilmaydi.",
      channelsBadge: "Tasdiqlangan ommaviy kanallar",
      channelsNote:
        "Quyidagi havolalar faqat ochiq manbalarda tasdiqlangan Instagram va YouTube sahifalariga olib boradi. Telefon, elektron pochta va Telegram admin kontaktlari rasmiy tasdiqsiz ko‘rsatilmaydi.",
      pendingContactsNote:
        "To‘g‘ridan-to‘g‘ri telefon raqami, elektron pochta va Telegram admin manzili muallif jamoasi tasdig‘idan so‘ng qo‘shiladi.",
    },
    footer: {
      colophonNote:
        "Mustaqil dizayn konsepsiyasi (Demo). Ushbu sayt Anvar Abduqayum yoki uning jamoasi tomonidan buyurtma qilinmagan va tasdiqlanmagan.",
      externalChannelsNote:
        "Ommaviy kanallar — saytdan tashqariga olib chiqadi",
      pendingContactsNote:
        "Telefon, pochta va to‘g‘ridan-to‘g‘ri Telegram admin kontaktlari rasmiy tasdiqdan so‘ng joylanadi.",
    },
    meta: {
      siteTitleSuffix: "Mustaqil dizayn konsepsiyasi (Demo)",
      siteDescription:
        "Mustaqil dizayn konsepsiyasi (demo). Ushbu sayt Anvar Abduqayum yoki uning jamoasi tomonidan buyurtma qilinmagan va tasdiqlanmagan.",
      siteName: "Anvar Abduqayum — Concept Demo",
      ogImageAlt:
        "Anvar Abduqayum — Sanoat, Tizimli boshqaruv, Eksport. Mustaqil veb-sayt konsepsiyasi",
      bronTitleSuffix: "Demo namoyish",
      bronDescription:
        "Mustaqil dizayn konsepsiyasi doirasidagi uchrashuv sahifasi namoyishi. Avtomatik xabar yuborilmaydi.",
    },
  },
  ru: {
    disclosure: {
      ariaLabel: "Уведомление о независимой дизайн-концепции",
      badge: "Концепция · Демо",
      statement:
        "Независимая дизайн-концепция. Данный сайт не заказан и не одобрен Анваром Абдукаюмом или его командой.",
      modeTag: "Частный показ",
    },
    contactForm: {
      badge: "Демо-режим · Сообщение не отправляется",
      subtitle:
        "Демонстрационная форма: поля проверяются только в браузере, данные не сохраняются и никуда не отправляются.",
      submitButton: "Проверить форму (Демо)",
      successTitle: "Форма проверена — сообщение не отправлялось (Демо)",
      successMessage:
        "Все обязательные поля проверены локально в браузере. В демо-режиме заявка никуда не отправлялась, а персональные данные не сохранялись.",
      resetButton: "Проверить форму снова",
    },
    externalChannels: {
      outboundNotice:
        "Прямые контакты для записи активируются только после официального подтверждения командой. В демо-режиме заявки не отправляются.",
      channelsBadge: "Подтвержденные публичные каналы",
      channelsNote:
        "Ссылки ниже ведут только на подтвержденные в открытых источниках страницы Instagram и YouTube. Телефон, email и Telegram-администратор не публикуются без официального подтверждения.",
      pendingContactsNote:
        "Прямой телефон, электронная почта и контакт Telegram-администратора будут добавлены после официального подтверждения командой.",
    },
    footer: {
      colophonNote:
        "Независимая дизайн-концепция (Демо). Данный сайт не заказан и не одобрен Анваром Абдукаюмом или его командой.",
      externalChannelsNote:
        "Публичные каналы — ведут за пределы данного демо",
      pendingContactsNote:
        "Телефон, email и прямой Telegram-администратор не публикуются до официального подтверждения.",
    },
    meta: {
      siteTitleSuffix: "Независимая дизайн-концепция (Демо)",
      siteDescription:
        "Независимая дизайн-концепция (демо). Данный сайт не заказан и не одобрен Анваром Абдукаюмом или его командой.",
      siteName: "Анвар Абдукаюм — Concept Demo",
      ogImageAlt:
        "Анвар Абдукаюм — Промышленность, Системное управление, Экспорт. Независимая концепция сайта",
      bronTitleSuffix: "Демо-просмотр",
      bronDescription:
        "Демонстрационная страница согласования встречи в рамках независимой концепции. Автоматические сообщения не отправляются.",
    },
  },
  en: {
    disclosure: {
      ariaLabel: "Independent design concept disclosure",
      badge: "Concept · Demo",
      statement:
        "Independent design concept. This website has not been commissioned or endorsed by Anvar Abduqayum or his team.",
      modeTag: "Private preview",
    },
    contactForm: {
      badge: "Demo mode · No message sent",
      subtitle:
        "Demonstration form: inputs are validated in your browser only. Personal data is never stored or transmitted.",
      submitButton: "Validate form (Demo)",
      successTitle: "Form validated — no message was sent (Demo)",
      successMessage:
        "All required fields passed browser validation. Because demo mode is active, no submission was sent and your personal details were not collected or stored.",
      resetButton: "Test validation again",
    },
    externalChannels: {
      outboundNotice:
        "Direct meeting and administrator links remain paused in demo mode until officially verified by the team. No bookings or messages are dispatched.",
      channelsBadge: "Verified public channels",
      channelsNote:
        "The links below open publicly verified Instagram and YouTube profiles only. Direct phone, email, and Telegram administrator handles are omitted pending official confirmation.",
      pendingContactsNote:
        "Direct telephone, email, and Telegram administrator contacts will appear here only after official team confirmation.",
    },
    footer: {
      colophonNote:
        "Independent design concept (Demo). This website has not been commissioned or endorsed by Anvar Abduqayum or his team.",
      externalChannelsNote:
        "Public channels — navigate outside this demo",
      pendingContactsNote:
        "Telephone, email, and Telegram administrator contacts are omitted pending official verification.",
    },
    meta: {
      siteTitleSuffix: "Independent Design Concept (Demo)",
      siteDescription:
        "Independent design concept preview showcasing a portfolio architecture. Not commissioned, approved, or endorsed by Anvar Abduqayum or his team.",
      siteName: "Anvar Abduqayum — Concept Demo",
      ogImageAlt:
        "Anvar Abduqayum — Industry, Systemic Governance, Export. Independent Website Concept",
      bronTitleSuffix: "Demo Preview",
      bronDescription:
        "Demonstration meeting coordination page for an independent design concept. No automatic messages are sent.",
    },
  },
};

export function getDemoCopy(locale: string = "uz"): DemoCopy {
  if (locale === "ru") return DEMO_COPY.ru;
  if (locale === "en") return DEMO_COPY.en;
  return DEMO_COPY.uz;
}

