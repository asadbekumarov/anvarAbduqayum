import type { PartnershipTrack } from "../schemas/partnershipSchema";

export type PartnershipLocale = "uz" | "ru" | "en";

export interface TrackMeta {
  id: PartnershipTrack;
  code: string;
  title: string;
  summary: string;
}

export interface PartnershipLocaleContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backHome: string;
  };
  demoNotice: {
    badge: string;
    privacyWarning: string;
  };
  steps: {
    step1Label: string;
    step2Label: string;
    nextButton: string;
    prevButton: string;
    submitDemoButton: string;
    submitProdButton: string;
  };
  tracksLabel: string;
  tracks: TrackMeta[];
  conditionalHeadings: Record<PartnershipTrack, string>;
  fields: {
    targetCountry: { label: string; placeholder: string };
    productInterest: { label: string; placeholder: string };
    estimatedVolume: { label: string; placeholder: string };
    distributionRegion: { label: string; placeholder: string };
    salesChannel: { label: string; placeholder: string; options: string[] };
    outletCount: { label: string; placeholder: string };
    cooperationModel: { label: string; placeholder: string; options: string[] };
    productionScope: { label: string; placeholder: string };
    targetTimeline: { label: string; placeholder: string };
    proposalCategory: { label: string; placeholder: string; options: string[] };
    proposalSummary: { label: string; placeholder: string };
    contactName: { label: string; placeholder: string };
    organization: { label: string; placeholder: string };
    phone: { label: string; placeholder: string; hint: string; codeLabel: string };
    email: { label: string; placeholder: string };
    notes: { label: string; placeholder: string };
  };
  errors: {
    summary: string;
    min2: string;
    min10: string;
    max80: string;
    max120: string;
    invalidPhone: string;
    invalidEmail: string;
  };
  confirmation: {
    badge: string;
    title: string;
    description: string;
    trackLabel: string;
    organizationLabel: string;
    phoneLabel: string;
    resetButton: string;
  };
}

const PARTNERSHIP_CONTENT: Record<PartnershipLocale, PartnershipLocaleContent> = {
  uz: {
    meta: {
      title: "B2B Hamkorlik Murojaati | Anvar Abduqayum",
      description:
        "Eksport, distribyutsiya, shartnomaviy ishlab chiqarish va biznes takliflari uchun ixtisoslashtirilgan B2B murojaat prototipi.",
    },
    header: {
      eyebrow: "B2B HAMKORLIK // PROTOTIP 4.8",
      title: "Hamkorlik yo‘nalishini tanlang",
      subtitle:
        "Eksport, distribyutsiya yoki ishlab chiqarish bo‘yicha murojaatlarni aniq mezonlar asosida shakllantirish uchun ixcham ikki bosqichli shakl.",
      backHome: "Bosh sahifaga qaytish",
    },
    demoNotice: {
      badge: "Demo rejim · Ma’lumot yuborilmaydi va saqlanmaydi",
      privacyWarning:
        "Namoyish vaqtida maxfiy tijorat sirlari, moliyaviy hisobotlar yoki shaxsiy hujjat raqamlarini kiritmang. Barcha maydonlar faqat brauzerda tekshiriladi.",
    },
    steps: {
      step1Label: "01 / Yo‘nalish va parametrlar",
      step2Label: "02 / Aloqa va tasdiqlash",
      nextButton: "Aloqa bosqichiga o‘tish",
      prevButton: "Orqaga",
      submitDemoButton: "Arizani yuborish",
      submitProdButton: "Murojaatni yuborish",
    },
    tracksLabel: "Hamkorlik turini tanlang",
    tracks: [
      {
        id: "export",
        code: "EXP-01",
        title: "Eksport va xalqaro yetkazib berish",
        summary: "Xalqaro ulgurji xarid, bozor bo‘yicha yetkazib berish va eksport shartnomalari.",
      },
      {
        id: "distribution",
        code: "DST-02",
        title: "Distribyutsiya va savdo tarmog‘i",
        summary: "Hududiy dilerlik, chakana tarmoqlar va ulgurji tarqatish kanallari.",
      },
      {
        id: "manufacturing",
        code: "MFG-03",
        title: "Shartnomaviy ishlab chiqarish (OEM/ODM)",
        summary: "Qolip quyish, polimer xomashyo va qo‘shma ishlab chiqarish loyihalari.",
      },
      {
        id: "other",
        code: "PRP-04",
        title: "Boshqa biznes takliflar",
        summary: "Strategik hamkorlik, infratuzilma yoki institutsional tashabbuslar.",
      },
    ],
    conditionalHeadings: {
      export: "Eksport parametrlari",
      distribution: "Distribyutsiya parametrlari",
      manufacturing: "Ishlab chiqarish parametrlari",
      other: "Taklif tafsilotlari",
    },
    fields: {
      targetCountry: {
        label: "Maqsadli davlat / bozor",
        placeholder: "Masalan: Qozog‘iston, BAA, Turkiya",
      },
      productInterest: {
        label: "Qiziqtirgan mahsulot yo‘nalishi",
        placeholder: "Masalan: Bolalar o‘yinchoqlari, polimer mahsulotlar",
      },
      estimatedVolume: {
        label: "Taxminiy partiya / hajm (ixtiyoriy)",
        placeholder: "Masalan: 1 ta 40ft konteyner / oyiga",
      },
      distributionRegion: {
        label: "Hudud / shahar",
        placeholder: "Masalan: Farg‘ona vodiysi, Olmaota",
      },
      salesChannel: {
        label: "Asosiy savdo kanali",
        placeholder: "Kanalni tanlang",
        options: [
          "Chakana tarmoqlar (Supermarket)",
          "Ulgurji distribyutsiya",
          "HoReCa / Umumiy ovqatlanish",
          "Onlayn / Marketplace",
        ],
      },
      outletCount: {
        label: "Faol savdo nuqtalari soni (ixtiyoriy)",
        placeholder: "Masalan: 25+ nuqta",
      },
      cooperationModel: {
        label: "Hamkorlik modeli",
        placeholder: "Modelni tanlang",
        options: [
          "OEM (Mijoz brendi ostida)",
          "ODM (Dizayn + ishlab chiqarish)",
          "Xomashyo / Qolip asosida buyurtma",
          "Qo‘shma korxona taklifi",
        ],
      },
      productionScope: {
        label: "Mahsulot yoki texnologik yo‘nalish",
        placeholder: "Masalan: Plastik qolip quyish, polimer granulalar",
      },
      targetTimeline: {
        label: "Rejalashtirilgan muddat (ixtiyoriy)",
        placeholder: "Masalan: 2026-yil 2-chorak",
      },
      proposalCategory: {
        label: "Taklif toifasi",
        placeholder: "Toifani tanlang",
        options: [
          "Strategik hamkorlik",
          "B2B xizmat / ta’minot",
          "Forum / Jamoat tashabbusi",
          "Boshqa masala",
        ],
      },
      proposalSummary: {
        label: "Taklifning qisqacha mazmuni",
        placeholder: "Hamkorlik maqsadi va kutilayotgan formatni qisqacha yozing...",
      },
      contactName: {
        label: "Mas’ul shaxs ismi",
        placeholder: "Ism va familiyangiz",
      },
      organization: {
        label: "Kompaniya / tashkilot nomi",
        placeholder: "Masalan: Eurasia Trade LLC",
      },
      phone: {
        label: "Xalqaro telefon raqami",
        placeholder: "90 123 45 67",
        hint: "Istalgan davlat kodi bilan xalqaro formatda kiriting (masalan: +998..., +7..., +971..., +49...).",
        codeLabel: "Davlat kodi",
      },
      email: {
        label: "Korporativ elektron pochta (ixtiyoriy)",
        placeholder: "name@company.com",
      },
      notes: {
        label: "Qo‘shimcha izoh (ixtiyoriy)",
        placeholder: "Maxfiy ma’lumotlarsiz qisqa izoh qoldiring...",
      },
    },
    errors: {
      summary: "Iltimos, belgilangan maydonlarni to‘g‘ri to‘ldiring.",
      min2: "Kamida 2 ta belgi kiriting.",
      min10: "Kamida 10 ta belgi kiriting.",
      max80: "80 ta belgidan oshmasligi kerak.",
      max120: "120 ta belgidan oshmasligi kerak.",
      invalidPhone: "To‘g‘ri xalqaro raqam kiriting (masalan, +998901234567 yoki +491512345678).",
      invalidEmail: "Elektron pochta manzili noto‘g‘ri formatda.",
    },
    confirmation: {
      badge: "Demo tekshiruv yakunlandi · Ma’lumot yuborilmadi",
      title: "B2B shakl brauzerda muvaffaqiyatli tekshirildi",
      description:
        "Demo rejim faol bo‘lgani sababli kiritilgan ma’lumotlar serverga yuborilmadi, saqlanmadi va Telegram/CRM tizimlariga uzatilmadi.",
      trackLabel: "Tanlangan yo‘nalish",
      organizationLabel: "Kompaniya",
      phoneLabel: "Telefon (tekshirilgan)",
      resetButton: "Boshqa yo‘nalishni sinab ko‘rish",
    },
  },
  ru: {
    meta: {
      title: "B2B-заявка на партнёрство (Демо) | Анвар Абдукаюм",
      description:
        "Изолированный прототип B2B-формы для экспорта, дистрибуции, контрактного производства и деловых предложений.",
    },
    header: {
      eyebrow: "B2B ПАРТНЁРСТВО // ПРОТОТИП 4.8",
      title: "Выберите направление партнёрства",
      subtitle:
        "Компактная двухшаговая форма для структурирования запросов по экспорту, дистрибуции, производству и деловому сотрудничеству.",
      backHome: "На главную",
    },
    demoNotice: {
      badge: "Демо-режим · Данные не отправляются и не сохраняются",
      privacyWarning:
        "Во время демонстрации не вводите коммерческую тайну, финансовую отчётность или конфиденциальные персональные данные. Проверка выполняется только в браузере.",
    },
    steps: {
      step1Label: "01 / Направление и параметры",
      step2Label: "02 / Контакты и проверка",
      nextButton: "Перейти к контактам",
      prevButton: "Назад",
      submitDemoButton: "Отправить заявку",
      submitProdButton: "Отправить заявку",
    },
    tracksLabel: "Выберите тип партнёрства",
    tracks: [
      {
        id: "export",
        code: "EXP-01",
        title: "Экспорт и международные поставки",
        summary: "Международные оптовые закупки, выход на внешние рынки и экспортные контракты.",
      },
      {
        id: "distribution",
        code: "DST-02",
        title: "Дистрибуция и торговые сети",
        summary: "Региональное дилерство, розничные сети и оптовые каналы сбыта.",
      },
      {
        id: "manufacturing",
        code: "MFG-03",
        title: "Контрактное производство (OEM/ODM)",
        summary: "Литьё под давлением, полимерное сырьё и совместные производственные проекты.",
      },
      {
        id: "other",
        code: "PRP-04",
        title: "Другие деловые предложения",
        summary: "Стратегическое партнёрство, инфраструктурные или общественные инициативы.",
      },
    ],
    conditionalHeadings: {
      export: "Параметры экспорта",
      distribution: "Параметры дистрибуции",
      manufacturing: "Параметры производства",
      other: "Детали предложения",
    },
    fields: {
      targetCountry: {
        label: "Целевая страна / рынок",
        placeholder: "Например: Казахстан, ОАЭ, Турция",
      },
      productInterest: {
        label: "Интересующая категория продукции",
        placeholder: "Например: Детские игрушки, полимерные изделия",
      },
      estimatedVolume: {
        label: "Ориентировочный объём (необязательно)",
        placeholder: "Например: 1 контейнер 40ft в месяц",
      },
      distributionRegion: {
        label: "Регион / город",
        placeholder: "Например: Алматы, Ташкентская область",
      },
      salesChannel: {
        label: "Основной канал сбыта",
        placeholder: "Выберите канал",
        options: [
          "Розничные сети (Супермаркеты)",
          "Оптовая дистрибуция",
          "HoReCa / Общественное питание",
          "Онлайн / Маркетплейсы",
        ],
      },
      outletCount: {
        label: "Количество торговых точек (необязательно)",
        placeholder: "Например: 25+ точек",
      },
      cooperationModel: {
        label: "Модель сотрудничества",
        placeholder: "Выберите модель",
        options: [
          "OEM (Под брендом заказчика)",
          "ODM (Разработка + производство)",
          "Заказ на сырьё / пресс-формы",
          "Совместное предприятие",
        ],
      },
      productionScope: {
        label: "Продукция или технологический профиль",
        placeholder: "Например: Литьё пластика, полимерные гранулы",
      },
      targetTimeline: {
        label: "Планируемые сроки (необязательно)",
        placeholder: "Например: II квартал 2026",
      },
      proposalCategory: {
        label: "Категория предложения",
        placeholder: "Выберите категорию",
        options: [
          "Стратегическое партнёрство",
          "B2B-услуги / поставки",
          "Форум / Общественная инициатива",
          "Другой вопрос",
        ],
      },
      proposalSummary: {
        label: "Краткая суть предложения",
        placeholder: "Опишите цель сотрудничества и предполагаемый формат...",
      },
      contactName: {
        label: "Контактное лицо",
        placeholder: "Имя и фамилия",
      },
      organization: {
        label: "Компания / организация",
        placeholder: "Например: Eurasia Trade LLC",
      },
      phone: {
        label: "Международный номер телефона",
        placeholder: "90 123 45 67",
        hint: "Укажите международный номер с кодом страны (например: +998..., +7..., +971..., +49...).",
        codeLabel: "Код страны",
      },
      email: {
        label: "Корпоративный email (необязательно)",
        placeholder: "name@company.com",
      },
      notes: {
        label: "Дополнительный комментарий (необязательно)",
        placeholder: "Краткое примечание без конфиденциальных данных...",
      },
    },
    errors: {
      summary: "Пожалуйста, проверьте выделенные поля.",
      min2: "Введите минимум 2 символа.",
      min10: "Введите минимум 10 символов.",
      max80: "Не более 80 символов.",
      max120: "Не более 120 символов.",
      invalidPhone: "Введите корректный международный номер (например, +998901234567 или +491512345678).",
      invalidEmail: "Некорректный формат электронной почты.",
    },
    confirmation: {
      badge: "Демо-проверка завершена · Сообщение не отправлялось",
      title: "B2B-форма успешно проверена в браузере",
      description:
        "В демо-режиме введённые данные не передаются на сервер, не сохраняются и не отправляются в Telegram или CRM.",
      trackLabel: "Выбранное направление",
      organizationLabel: "Организация",
      phoneLabel: "Телефон (проверен)",
      resetButton: "Протестировать другое направление",
    },
  },
  en: {
    meta: {
      title: "B2B Partnership Intake | Anvar Abduqayum",
      description:
        "Isolated prototype for segmented B2B partnership inquiries across Export, Distribution, Manufacturing, and Other Proposals.",
    },
    header: {
      eyebrow: "B2B PARTNERSHIP // PROTOTYPE 4.8",
      title: "Select a partnership track",
      subtitle:
        "A compact two-step intake flow tailored to export buyers, regional distributors, contract manufacturing partners, and strategic proposals.",
      backHome: "Back to home",
    },
    demoNotice: {
      badge: "Demo mode · No data transmitted or stored",
      privacyWarning:
        "Do not enter confidential financials, proprietary trade secrets, or sensitive personal IDs during demonstration. All validation runs locally in your browser.",
    },
    steps: {
      step1Label: "01 / Track & specifications",
      step2Label: "02 / Contact & validation",
      nextButton: "Continue to contact details",
      prevButton: "Back",
      submitDemoButton: "Submit intake",
      submitProdButton: "Submit proposal",
    },
    tracksLabel: "Choose partnership track",
    tracks: [
      {
        id: "export",
        code: "EXP-01",
        title: "Export & International Supply",
        summary: "Cross-border wholesale procurement, market entry, and export supply agreements.",
      },
      {
        id: "distribution",
        code: "DST-02",
        title: "Distribution & Retail Channels",
        summary: "Regional dealership networks, supermarket chains, and wholesale distribution.",
      },
      {
        id: "manufacturing",
        code: "MFG-03",
        title: "Contract Manufacturing (OEM/ODM)",
        summary: "Injection molding, polymer masterbatches, and joint industrial production.",
      },
      {
        id: "other",
        code: "PRP-04",
        title: "Other Business Proposals",
        summary: "Strategic alliances, infrastructure initiatives, or institutional collaborations.",
      },
    ],
    conditionalHeadings: {
      export: "Export specifications",
      distribution: "Distribution specifications",
      manufacturing: "Manufacturing specifications",
      other: "Proposal overview",
    },
    fields: {
      targetCountry: {
        label: "Target country / market",
        placeholder: "e.g., Kazakhstan, UAE, Germany",
      },
      productInterest: {
        label: "Product line of interest",
        placeholder: "e.g., Children's toys, polymer compounds",
      },
      estimatedVolume: {
        label: "Estimated volume / cadence (optional)",
        placeholder: "e.g., 1 x 40ft container per month",
      },
      distributionRegion: {
        label: "Target region / city",
        placeholder: "e.g., Almaty, Tashkent Region",
      },
      salesChannel: {
        label: "Primary sales channel",
        placeholder: "Select channel",
        options: [
          "Modern Retail / Supermarkets",
          "Wholesale Distribution",
          "HoReCa / Foodservice",
          "E-commerce / Marketplaces",
        ],
      },
      outletCount: {
        label: "Active retail / distribution points (optional)",
        placeholder: "e.g., 25+ outlets",
      },
      cooperationModel: {
        label: "Cooperation model",
        placeholder: "Select model",
        options: [
          "OEM (Client private label)",
          "ODM (Design + manufacturing)",
          "Tooling / Polymer supply order",
          "Joint manufacturing venture",
        ],
      },
      productionScope: {
        label: "Product or technical scope",
        placeholder: "e.g., Plastic injection molding, masterbatches",
      },
      targetTimeline: {
        label: "Target timeline (optional)",
        placeholder: "e.g., Q2 2026",
      },
      proposalCategory: {
        label: "Proposal category",
        placeholder: "Select category",
        options: [
          "Strategic partnership",
          "B2B services / supply",
          "Forum / Public initiative",
          "Other inquiry",
        ],
      },
      proposalSummary: {
        label: "Concise proposal summary",
        placeholder: "Outline the collaboration objective and expected format...",
      },
      contactName: {
        label: "Contact person",
        placeholder: "Full name",
      },
      organization: {
        label: "Company / organization",
        placeholder: "e.g., Eurasia Trade LLC",
      },
      phone: {
        label: "International phone number",
        placeholder: "90 123 45 67",
        hint: "Enter any international E.164 number with country code (e.g., +998..., +1..., +49..., +971...).",
        codeLabel: "Country code",
      },
      email: {
        label: "Corporate email (optional)",
        placeholder: "name@company.com",
      },
      notes: {
        label: "Additional note (optional)",
        placeholder: "Brief context without confidential details...",
      },
    },
    errors: {
      summary: "Please review the highlighted fields.",
      min2: "Enter at least 2 characters.",
      min10: "Enter at least 10 characters.",
      max80: "Must not exceed 80 characters.",
      max120: "Must not exceed 120 characters.",
      invalidPhone: "Enter a valid international phone number (e.g., +998901234567 or +491512345678).",
      invalidEmail: "Enter a valid email address.",
    },
    confirmation: {
      badge: "Demo validation complete · No data transmitted",
      title: "B2B intake validated locally in your browser",
      description:
        "Because demo mode is active, your submission was not transmitted, persisted, or dispatched to any external service.",
      trackLabel: "Selected track",
      organizationLabel: "Organization",
      phoneLabel: "Phone (validated)",
      resetButton: "Test another partnership track",
    },
  },
};

export function getPartnershipContent(
  locale: string = "uz"
): PartnershipLocaleContent {
  if (locale === "ru") return PARTNERSHIP_CONTENT.ru;
  if (locale === "en") return PARTNERSHIP_CONTENT.en;
  return PARTNERSHIP_CONTENT.uz;
}

