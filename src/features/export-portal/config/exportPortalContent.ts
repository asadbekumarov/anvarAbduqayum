export type ExportPortalLocale = "uz" | "ru" | "en";

export interface ExportPortalContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbs: {
    ariaLabel: string;
    home: string;
    current: string;
  };
  backHome: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  demoDisclaimer: {
    badge: string;
    body: string;
  };
  capabilitiesSection: {
    heading: string;
    intro: string;
    items: Array<{
      code: string;
      title: string;
      detail: string;
      source: string;
      status: string;
    }>;
  };
  separationSection: {
    heading: string;
    intro: string;
    entities: Array<{
      title: string;
      badge: string;
      tone: "verified" | "historical" | "pending" | "public";
      description: string;
      sourceNote: string;
      externalUrl?: string;
      externalLabel?: string;
    }>;
  };
  tracksSection: {
    heading: string;
    intro: string;
    tracks: Array<{
      code: string;
      title: string;
      summary: string;
    }>;
  };
  ctaSection: {
    heading: string;
    enabledBody: string;
    enabledButton: string;
    disabledBadge: string;
    disabledBody: string;
    fallbackContactButton: string;
  };
}

const EXPORT_PORTAL_CONTENT: Record<ExportPortalLocale, ExportPortalContent> = {
  uz: {
    meta: {
      title: "Xalqaro Eksport va B2B Hamkorlik Portali | Anvar Abduqayum",
      description:
        "Tasdiqlangan ishlab chiqarish va eksport tajribasi, huquqiy chegaralar hamda B2B hamkorlik yo‘nalishlari haqida tahririy portal.",
    },
    breadcrumbs: {
      ariaLabel: "Sahifa navigatsiyasi",
      home: "Bosh sahifa",
      current: "Eksport portali",
    },
    backHome: "Bosh sahifaga qaytish",
    eyebrow: "QOLIP // XALQARO EKSPORT VA B2B HAMKORLIK",
    title: "Xalqaro Eksport va Hamkorlik Portali",
    subtitle:
      "Ushbu sahifa faqat ochiq manbalarda tasdiqlangan ishlab chiqarish, eksport va jamoat platformasi ma’lumotlarini jamlaydi.",
    demoDisclaimer: {
      badge: "Mustaqil Demo Konsepsiya · Shaxsiy kafolat berilmaydi",
      body: "Anvar Abduqayum ushbu mustaqil demo konsepsiyani tasdiqlamagan, shaxsan ta’minot kafolati bermaydi, investitsiya qabul qilmaydi va konsalting xizmati ko‘rsatmaydi. Barcha ma’lumotlar faqat ochiq manbalar chegarasida taqdim etiladi.",
    },
    capabilitiesSection: {
      heading: "01 / Tasdiqlangan ishlab chiqarish va eksport tajribasi",
      intro:
        "Quyidagi ko‘rsatkichlar faqat ochiq korxona reyestrlari va sanalangan ommaviy intervyularda qayd etilgan faktlarga tayanadi. Tasdiqlanmagan quvvat yoki sertifikat raqamlari kiritilmagan.",
      items: [
        {
          code: "EXP-01",
          title: "Polimer o‘yinchoqlar ishlab chiqarish (Toybola / VISAGE ELECTRIC MChJ)",
          detail:
            "Orginfo.uz reyestrida «VISAGE ELECTRIC» MChJ 2008-yil 30-aprelda ro‘yxatdan o‘tgani (OKED 32400) qayd etilgan. Spot.uz (2022-11-17) intervyusiga ko‘ra 2009-yilda o‘yinchoq ishlab chiqarish, 2010-yilda o‘yinchoq eksporti va 2012-yilda elektronika eksporti boshlangan.",
          source: "Orginfo.uz (STIR 300821924) · Spot.uz (2022-11-17)",
          status: "Tasdiqlangan manba",
        },
        {
          code: "EXP-02",
          title: "Tashqi bozorlar va xalqaro B2B muloqot",
          detail:
            "Kun.uz (2022-03-04) va Toybola.uz ochiq ma’lumotlarida MDH va mintaqaviy bozorlarga eksport yo‘nalishlari hamda xalqaro hamkorlik murojaatlari haqida so‘z yuritilgan.",
          source: "Kun.uz (2022-03-04) · Toybola.uz",
          status: "Sanalangan media manbasi",
        },
        {
          code: "EXP-03",
          title: "Sertifikatlash va ishlab chiqarish hajmi bo‘yicha eslatma",
          detail:
            "Muayyan ISO/CE sertifikat raqamlari, joriy oylik ishlab chiqarish tonnaji va mijoz logotiplari mustaqil tekshiruvdan o‘tmaguncha demo namoyishda keltirilmaydi.",
          source: "Tahririy verifikatsiya siyosati",
          status: "Demo chegarasi",
        },
      ],
    },
    separationSection: {
      heading: "02 / Tijorat korxonalari, tarixiy rollar va UZBIC chegarasi",
      intro:
        "B2B hamkorlik muzokaralarida tijorat tuzilmalari, tarixiy loyihalar va mustaqil jamoat kengashi bir-biridan qat’iy ajratiladi:",
      entities: [
        {
          title: "Toybola / VISAGE ELECTRIC MChJ",
          badge: "Tasdiqlangan ishlab chiqarish manbasi",
          tone: "verified",
          description:
            "Yuridik ro‘yxatdan o‘tish (2008) va media intervyulardagi ishlab chiqarish/eksport bosqichlari (2009–2012) alohida ko‘rsatiladi; ro‘yxatga olish yakka mulkdorlik isboti sifatida talqin qilinmaydi.",
          sourceNote: "Orginfo.uz · Spot.uz (2022-11-17) · Kun.uz",
          externalUrl: "https://toybola.uz",
          externalLabel: "Toybola.uz",
        },
        {
          title: "AFIYET Kebab (2017) & PURO Gelateria (2020)",
          badge: "Tarixiy bosqich (joriy mulkdorlik da’vo qilinmaydi)",
          tone: "historical",
          description:
            "Spot.uz (2020/2022) intervyularida ochilish sanalari tasdiqlangan tarixiy HoReCa loyihalari. Joriy mulkdorlik yoki chiqish (exit) tafsilotlari mustaqil tasdiqlanmagan.",
          sourceNote: "Spot.uz (2020 / 2022)",
        },
        {
          title: "Samtech Masterbatches & IT Support",
          badge: "Tasdiqlanishi kutilmoqda",
          tone: "pending",
          description:
            "Huquqiy tuzilmasi va joriy maqomi mustaqil ochiq manbalarda tasdiqlanmagan; eksport shartnomalari uchun tasdiqlangan korxona sifatida taqdim etilmaydi.",
          sourceNote: "Mijoz tasdig‘i talab etiladi",
        },
        {
          title: "UZBIC — O‘zbekiston Biznes va Sanoat Kengashi",
          badge: "Mustaqil jamoat kengashi (tijorat aktivi emas)",
          tone: "public",
          description:
            "2022-yildan faoliyat yurituvchi nodavlat jamoat platformasi. Anvar Abduqayum bu yerda mulkdor emas, balki Jamoat Kengashi Raisi sifatida eksport kooperatsiyasiga ko‘maklashadi.",
          sourceNote: "uzbic.uz · Yuz.uz (2022-09-20) · NewTimes.kz (2022-07-08)",
          externalUrl: "https://uzbic.uz",
          externalLabel: "UZBIC.uz",
        },
      ],
    },
    tracksSection: {
      heading: "03 / B2B hamkorlik yo‘nalishlari",
      intro:
        "Potensial hamkorlar uchun murojaatlar quyidagi to‘rtta tuzilmaviy yo‘nalish bo‘yicha tasniflanadi:",
      tracks: [
        {
          code: "01",
          title: "Eksport",
          summary: "Xorijiy bozorlar uchun tayyor mahsulot yetkazib berish va bojxona-logistika so‘rovlari.",
        },
        {
          code: "02",
          title: "Distribyutsiya",
          summary: "Hududiy ulgurji tarmoqlar va chakana savdo kanallari bilan hamkorlik.",
        },
        {
          code: "03",
          title: "Ishlab chiqarish (OEM / ODM)",
          summary: "Shartnomaviy ishlab chiqarish va sanoat kooperatsiyasi bo‘yicha texnik so‘rovlar.",
        },
        {
          code: "04",
          title: "Boshqa biznes takliflari",
          summary: "B2B logistika, infratuzilma va qo‘shma sanoat tashabbuslari.",
        },
      ],
    },
    ctaSection: {
      heading: "Hamkorlik so‘rovini shakllantirish",
      enabledBody:
        "Izolyatsiya qilingan B2B hamkorlik murojaat prototipi yoqilgan. So‘rovingizni yo‘nalish bo‘yicha sinab ko‘rishingiz mumkin (Demo rejimda ma’lumot uzatilmaydi).",
      enabledButton: "Hamkorlik shakliga o‘tish",
      disabledBadge: "B2B shakl prototipi o‘chirilgan",
      disabledBody:
        "Ushbu namoyish muhitida alohida B2B murojaat shakli (/[locale]/hamkorlik) sukut bo‘yicha o‘chirilgan. Umumiy ma’lumot va aloqa tartibi bilan bosh sahifada tanishishingiz mumkin.",
      fallbackContactButton: "Aloqa tartibiga o‘tish",
    },
  },
  ru: {
    meta: {
      title: "Международный экспортный и B2B-портал | Анвар Абдукаюм",
      description:
        "Редакционный B2B-портал о подтверждённой производственной и экспортной деятельности, юридическом разграничении и направлениях партнёрства.",
    },
    breadcrumbs: {
      ariaLabel: "Навигация по разделам",
      home: "Главная",
      current: "Экспортный портал",
    },
    backHome: "На главную страницу",
    eyebrow: "QOLIP // МЕЖДУНАРОДНЫЙ ЭКСПОРТ И B2B",
    title: "Портал международного экспорта и партнёрства",
    subtitle:
      "Страница объединяет только подтверждённые открытыми источниками сведения о производственном, экспортном и общественном опыте.",
    demoDisclaimer: {
      badge: "Независимый демо-концепт · Без личных гарантий",
      body: "Анвар Абдукаюм не одобрял данный независимый демо-концепт, не даёт личных гарантий поставок, не принимает инвестиции и не оказывает консультационных услуг.",
    },
    capabilitiesSection: {
      heading: "01 / Подтверждённый производственный и экспортный опыт",
      intro:
        "Представленные факты опираются на открытые реестры и датированные публикации. Неподтверждённые объёмы выпуска, сертификаты или логотипы клиентов исключены.",
      items: [
        {
          code: "EXP-01",
          title: "Производство полимерных игрушек (Toybola / ООО «VISAGE ELECTRIC»)",
          detail:
            "В реестре Orginfo.uz зафиксирована регистрация ООО «VISAGE ELECTRIC» 30 апреля 2008 года (ОКЭД 32400). По интервью Spot.uz (17.11.2022), производство игрушек начато в 2009 г., экспорт игрушек — в 2010 г., экспорт электроники — в 2012 г.",
          source: "Orginfo.uz (ИНН 300821924) · Spot.uz (17.11.2022)",
          status: "Подтверждённый источник",
        },
        {
          code: "EXP-02",
          title: "Внешние рынки и международный B2B-диалог",
          detail:
            "В публикациях Kun.uz (04.03.2022) и на сайте Toybola.uz отражены экспортные поставки в страны СНГ и международные запросы о сотрудничестве.",
          source: "Kun.uz (04.03.2022) · Toybola.uz",
          status: "Датированный медиа-источник",
        },
        {
          code: "EXP-03",
          title: "Примечание о сертификации и мощностях",
          detail:
            "Конкретные номера сертификатов ISO/CE, текущие ежемесячные объёмы и перечни контрагентов не публикуются в демо-версии до независимой проверки.",
          source: "Политика редакционной верификации",
          status: "Ограничение демо",
        },
      ],
    },
    separationSection: {
      heading: "02 / Разграничение коммерческих активов, истории и UZBIC",
      intro:
        "При обсуждении B2B-сотрудничества строго разделяются коммерческие предприятия, исторические проекты и общественная деятельность:",
      entities: [
        {
          title: "Toybola / ООО «VISAGE ELECTRIC»",
          badge: "Подтверждённый производственный источник",
          tone: "verified",
          description:
            "Регистрация юрлица (2008) и операционные этапы по интервью (2009–2012) указаны раздельно; факт регистрации не используется как доказательство единоличного владения.",
          sourceNote: "Orginfo.uz · Spot.uz (17.11.2022) · Kun.uz",
          externalUrl: "https://toybola.uz",
          externalLabel: "Toybola.uz",
        },
        {
          title: "AFIYET Kebab (2017) & PURO Gelateria (2020)",
          badge: "Исторический этап (текущее владение не заявляется)",
          tone: "historical",
          description:
            "Исторические проекты HoReCa, даты открытия которых подтверждены интервью Spot.uz (2020/2022). Текущее владение или дата выхода не подтверждены реестрами.",
          sourceNote: "Spot.uz (2020 / 2022)",
        },
        {
          title: "Samtech Masterbatches & IT Support",
          badge: "Ожидает подтверждения",
          tone: "pending",
          description:
            "Юридическая форма и текущий статус не подтверждены независимыми реестрами и не заявляются в качестве гарантированных экспортных мощностей.",
          sourceNote: "Требуется подтверждение клиента",
        },
        {
          title: "UZBIC — Совет бизнеса и промышленности Узбекистана",
          badge: "Независимый общественный совет (не коммерческий актив)",
          tone: "public",
          description:
            "Негосударственная общественная B2B-платформа (с 2022 г.). Анвар Абдукаюм является Председателем Общественного совета, а не владельцем коммерческого актива.",
          sourceNote: "uzbic.uz · Yuz.uz (20.09.2022) · NewTimes.kz (08.07.2022)",
          externalUrl: "https://uzbic.uz",
          externalLabel: "UZBIC.uz",
        },
      ],
    },
    tracksSection: {
      heading: "03 / Направления B2B-партнёрства",
      intro:
        "Запросы потенциальных партнёров структурируются по четырём профильным трекам:",
      tracks: [
        {
          code: "01",
          title: "Экспорт",
          summary: "Поставки готовой продукции на внешние рынки и логистические параметры.",
        },
        {
          code: "02",
          title: "Дистрибуция",
          summary: "Региональные оптовые каналы и розничные сети сбыта.",
        },
        {
          code: "03",
          title: "Производство (OEM / ODM)",
          summary: "Контрактное производство и промышленная кооперация.",
        },
        {
          code: "04",
          title: "Другие бизнес-предложения",
          summary: "B2B-логистика, инфраструктура и совместные промышленные инициативы.",
        },
      ],
    },
    ctaSection: {
      heading: "Оформление партнёрского запроса",
      enabledBody:
        "Изолированный прототип B2B-анкеты активен. Вы можете протестировать подачу запроса по выбранному направлению (в демо-режиме данные не передаются).",
      enabledButton: "Перейти к форме партнёрства",
      disabledBadge: "Прототип B2B-формы отключён",
      disabledBody:
        "В текущей конфигурации выделенная форма B2B-запроса (/[locale]/hamkorlik) отключена по умолчанию. Ознакомьтесь с порядком связи на главной странице.",
      fallbackContactButton: "Перейти к разделу контактов",
    },
  },
  en: {
    meta: {
      title: "International Export & B2B Partnership Portal | Anvar Abduqayum",
      description:
        "Editorial B2B portal summarizing verified manufacturing and export records, legal boundaries, and structured partnership tracks.",
    },
    breadcrumbs: {
      ariaLabel: "Breadcrumb",
      home: "Home",
      current: "Export Portal",
    },
    backHome: "Back to Home",
    eyebrow: "QOLIP // INTERNATIONAL EXPORT & B2B",
    title: "International Export & Partnership Portal",
    subtitle:
      "This editorial portal consolidates only publicly verifiable manufacturing, export, and public-council records.",
    demoDisclaimer: {
      badge: "Independent Demo Concept · No Personal Supply Guarantees",
      body: "Anvar Abduqayum has not endorsed this independent concept, does not personally guarantee supply, does not accept investment, and does not provide advisory services through this demo.",
    },
    capabilitiesSection: {
      heading: "01 / Verified Manufacturing & Export Background",
      intro:
        "The items below strictly reflect public corporate registry entries and dated media interviews. Unverified plant capacities, certifications, or client logos are omitted.",
      items: [
        {
          code: "EXP-01",
          title: "Polymer Toy Manufacturing (Toybola / VISAGE ELECTRIC LLC)",
          detail:
            "Orginfo.uz records VISAGE ELECTRIC LLC registered on April 30, 2008 (OKED 32400). Per Spot.uz (2022-11-17), toy production began in 2009, toy exports in 2010, and electronics exports in 2012.",
          source: "Orginfo.uz (TIN 300821924) · Spot.uz (2022-11-17)",
          status: "Verified source",
        },
        {
          code: "EXP-02",
          title: "Regional Markets & International B2B Outreach",
          detail:
            "Dated coverage in Kun.uz (2022-03-04) and Toybola.uz documents CIS export activity and inbound international partnership inquiries.",
          source: "Kun.uz (2022-03-04) · Toybola.uz",
          status: "Dated media source",
        },
        {
          code: "EXP-03",
          title: "Certifications & Capacity Disclosure",
          detail:
            "Specific ISO/CE certificate numbers, current monthly output volumes, and client lists are withheld in this demo until independently verified.",
          source: "Editorial verification policy",
          status: "Demo boundary",
        },
      ],
    },
    separationSection: {
      heading: "02 / Commercial Ventures, Historical Roles & UZBIC Separation",
      intro:
        "Commercial entities, historical hospitality projects, and independent public-council governance are kept legally distinct:",
      entities: [
        {
          title: "Toybola / VISAGE ELECTRIC LLC",
          badge: "Verified manufacturing source",
          tone: "verified",
          description:
            "Corporate registration (2008) and interview-reported operational milestones (2009–2012) are kept separate; registration alone is not presented as proof of sole ownership.",
          sourceNote: "Orginfo.uz · Spot.uz (2022-11-17) · Kun.uz",
          externalUrl: "https://toybola.uz",
          externalLabel: "Toybola.uz",
        },
        {
          title: "AFIYET Kebab (2017) & PURO Gelateria (2020)",
          badge: "Historical stage (no current ownership claimed)",
          tone: "historical",
          description:
            "Hospitality ventures whose opening dates are documented in Spot.uz (2020/2022). Ongoing ownership or exit terms are unconfirmed in public registries.",
          sourceNote: "Spot.uz (2020 / 2022)",
        },
        {
          title: "Samtech Masterbatches & IT Support",
          badge: "Pending confirmation",
          tone: "pending",
          description:
            "Legal entity details and current formal role remain unconfirmed in public registries and are excluded from verified export commitments.",
          sourceNote: "Client confirmation required",
        },
        {
          title: "UZBIC — Uzbekistan Business & Industrial Council",
          badge: "Independent public council (non-commercial)",
          tone: "public",
          description:
            "Non-governmental B2B export cooperation platform active since 2022. Anvar Abduqayum serves as Council Chair rather than as a private commercial owner.",
          sourceNote: "uzbic.uz · Yuz.uz (2022-09-20) · NewTimes.kz (2022-07-08)",
          externalUrl: "https://uzbic.uz",
          externalLabel: "UZBIC.uz",
        },
      ],
    },
    tracksSection: {
      heading: "03 / Structured Partnership Tracks",
      intro:
        "Prospective B2B inquiries are organized across four clear tracks:",
      tracks: [
        {
          code: "01",
          title: "Export",
          summary: "Finished-goods supply to international markets and logistics requirements.",
        },
        {
          code: "02",
          title: "Distribution",
          summary: "Regional wholesale distribution and retail channel partnerships.",
        },
        {
          code: "03",
          title: "Manufacturing (OEM / ODM)",
          summary: "Contract manufacturing and industrial cooperation specifications.",
        },
        {
          code: "04",
          title: "Other Business Proposals",
          summary: "B2B logistics, supply-chain infrastructure, and joint industrial initiatives.",
        },
      ],
    },
    ctaSection: {
      heading: "Initiate a Structured Partnership Inquiry",
      enabledBody:
        "The isolated B2B partnership intake prototype is enabled. You can preview the track-specific form (in demoMode, no data is transmitted or stored).",
      enabledButton: "Open Partnership Intake",
      disabledBadge: "B2B Intake Prototype Disabled",
      disabledBody:
        "In this configuration, the dedicated B2B intake route (/[locale]/hamkorlik) is disabled by default. Review the contact protocol on the main page.",
      fallbackContactButton: "Go to Contact section",
    },
  },
};

export function getExportPortalContent(locale: string): ExportPortalContent {
  const safeLocale: ExportPortalLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  return EXPORT_PORTAL_CONTENT[safeLocale];
}

