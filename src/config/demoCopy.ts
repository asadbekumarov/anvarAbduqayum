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
  };
  footer: {
    colophonNote: string;
    externalChannelsNote: string;
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
        "Tashqi havolalar Anvar Abduqayumning haqiqiy ommaviy kanallariga olib boradi — ushbu mustaqil demo sayt funksiyasi emas.",
      channelsBadge: "Tashqi kanallar · Demo tarkibida emas",
      channelsNote:
        "Quyidagi Telegram, telefon va pochta havolalari Anvar Abduqayumning haqiqiy tashqi manzillariga olib boradi. Murojaat shakli esa faqat demo tekshiruvdir.",
    },
    footer: {
      colophonNote:
        "Mustaqil dizayn konsepsiyasi (Demo). Ushbu sayt Anvar Abduqayum yoki uning jamoasi tomonidan buyurtma qilinmagan va tasdiqlanmagan.",
      externalChannelsNote:
        "Tashqi havolalar — ushbu demo saytdan tashqariga olib chiqadi",
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
        "Внешние ссылки ведут на реальные публичные каналы Анвара Абдукаюма и не относятся к функционалу этого демо-сайта.",
      channelsBadge: "Внешние каналы · Вне демо",
      channelsNote:
        "Ссылки ниже (Telegram, телефон и почта) ведут на реальные внешние контакты Анвара Абдукаюма. Форма обращения работает только в режиме демо-проверки.",
    },
    footer: {
      colophonNote:
        "Независимая дизайн-концепция (Демо). Данный сайт не заказан и не одобрен Анваром Абдукаюмом или его командой.",
      externalChannelsNote:
        "Внешние ссылки — ведут за пределы данного демо",
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
        "External links open Anvar Abduqayum's real public channels directly and operate outside this independent demo.",
      channelsBadge: "External channels · Outside demo",
      channelsNote:
        "The Telegram, telephone, and email links below open Anvar Abduqayum's real external contacts. The inquiry form runs demo validation only.",
    },
    footer: {
      colophonNote:
        "Independent design concept (Demo). This website has not been commissioned or endorsed by Anvar Abduqayum or his team.",
      externalChannelsNote:
        "External links — navigate outside this demo",
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

