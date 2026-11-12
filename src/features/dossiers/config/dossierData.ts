import {
  getContent,
  type ClaimCitation,
  type LocaleContent,
} from "@/config/content";

export type DossierLocale = "uz" | "ru" | "en";
export type VerificationStatus = "verified" | "historical" | "public" | "pending";
export type RoleType = "is-founder" | "is-partner" | "is-internal" | "is-public";

export type PortfolioCompany = LocaleContent["portfolio"]["companies"][number];

export interface DossierUiCopy {
  breadcrumbs: {
    ariaLabel: string;
    home: string;
    portfolio: string;
  };
  backToPortfolio: string;
  demoNotice: string;
  verificationLabels: Record<VerificationStatus, string>;
  roleTypeLabels: Record<RoleType, string>;
  legalDisclaimers: {
    verified: string;
    historical: string;
    public: string;
    pending: string;
  };
  sections: {
    overviewHeading: string;
    milestonesHeading: string;
    specsHeading: string;
    citationsHeading: string;
    relatedHeading: string;
  };
  citationLabels: {
    source: string;
    timeframe: string;
    lastVerified: string;
    openSource: string;
    noExternalUrl: string;
  };
  openDossierLabel: string;
}

const DOSSIER_UI: Record<DossierLocale, DossierUiCopy> = {
  uz: {
    breadcrumbs: {
      ariaLabel: "Sahifa navigatsiyasi",
      home: "Bosh sahifa",
      portfolio: "Portfel",
    },
    backToPortfolio: "Portfel bo‘limiga qaytish",
    demoNotice:
      "Demo rejim · Ushbu dossier faqat ochiq manbalar va tasdiqlangan ma’lumotlar chegarasida taqdim etiladi.",
    verificationLabels: {
      verified: "Tasdiqlangan faol ma’lumot",
      historical: "Tarixiy bosqich (joriy mulkdorlik da’vo qilinmaydi)",
      public: "Mustaqil jamoat kengashi maqomi",
      pending: "Tasdiqlanishi kutilmoqda",
    },
    roleTypeLabels: {
      "is-founder": "Asoschi / Hammuassis",
      "is-partner": "Hamkor / Hammuassis",
      "is-internal": "Ichki infratuzilma tashabbusi",
      "is-public": "Jamoat kengashi raisi",
    },
    legalDisclaimers: {
      verified:
        "Ushbu sahifadagi faktlar ochiq nashrlar va rasmiy reyestr yozuvlari bilan solishtirilgan; ko‘rsatilgan rollar va sanalar birlashtirilmaydi.",
      historical:
        "Ushbu yozuv tarixiy tadbirkorlik bosqichini aks ettiradi va bugungi kunda joriy mulkdorlik yoki operatsion boshqaruv saqlanib qolganini anglatmaydi.",
      public:
        "Huquqiy ajratish: O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) — mustaqil nodavlat jamoat platformasi. Bu tuzilma xususiy tijorat korxonasi emas va Anvar Abduqayum bu yerda mulkdor emas, balki Jamoat Kengashi Raisi sifatida faoliyat yuritadi.",
      pending:
        "Ogohlantirish: Ushbu tashabbusning yuridik tuzilmasi, ulush nisbati yoki joriy maqomi mustaqil ochiq manbalarda to‘liq tasdiqlanmagan va mijoz tasdig‘ini kutmoqda.",
    },
    sections: {
      overviewHeading: "Umumiy ma’lumot va faoliyat chegarasi",
      milestonesHeading: "Yuridik va tarixiy bosqichlar",
      specsHeading: "Tuzilma ko‘rsatkichlari",
      citationsHeading: "Manbalarga tayangan faktlar va tekshiruv holati",
      relatedHeading: "Portfeldagi boshqa yo‘nalishlar",
    },
    citationLabels: {
      source: "Manba",
      timeframe: "Davr",
      lastVerified: "Oxirgi tekshiruv",
      openSource: "Manbani ochish",
      noExternalUrl: "Ochiq URL biriktirilmagan (ichki/reyestr yozuvi)",
    },
    openDossierLabel: "To‘liq dossierni ochish",
  },
  ru: {
    breadcrumbs: {
      ariaLabel: "Навигация по разделам",
      home: "Главная",
      portfolio: "Портфель",
    },
    backToPortfolio: "Вернуться к разделу «Портфель»",
    demoNotice:
      "Демо-режим · Досье ограничено публичными источниками и подтверждёнными фактами.",
    verificationLabels: {
      verified: "Подтверждённые данные",
      historical: "Исторический этап (текущее владение не заявляется)",
      public: "Независимый общественный совет",
      pending: "Ожидает подтверждения",
    },
    roleTypeLabels: {
      "is-founder": "Основатель / Сооснователь",
      "is-partner": "Партнёр / Сооснователь",
      "is-internal": "Внутренняя ИТ-инициатива",
      "is-public": "Председатель общественного совета",
    },
    legalDisclaimers: {
      verified:
        "Факты на этой странице сопоставлены с открытыми публикациями и реестровыми записями; юридическая регистрация и операционные этапы указаны раздельно.",
      historical:
        "Данная запись отражает исторический этап деятельности и не означает сохранение текущего владения или операционного контроля.",
      public:
        "Юридическое разграничение: Совет бизнеса и промышленности Узбекистана (UZBIC) — независимая негосударственная общественная платформа, а не коммерческий актив. Анвар Абдукаюм выступает здесь не владельцем, а Председателем Общественного совета.",
      pending:
        "Уведомление: юридическая форма, структура долей или текущий статус данной инициативы не подтверждены независимыми открытыми источниками и ожидают уточнения.",
    },
    sections: {
      overviewHeading: "Обзор и границы деятельности",
      milestonesHeading: "Юридическая и операционная хронология",
      specsHeading: "Параметры структуры",
      citationsHeading: "Источники и статус верификации утверждений",
      relatedHeading: "Другие проекты портфеля",
    },
    citationLabels: {
      source: "Источник",
      timeframe: "Период",
      lastVerified: "Дата проверки",
      openSource: "Открыть источник",
      noExternalUrl: "Публичный URL не прикреплён (реестровая/внутренняя запись)",
    },
    openDossierLabel: "Открыть досье",
  },
  en: {
    breadcrumbs: {
      ariaLabel: "Breadcrumb",
      home: "Home",
      portfolio: "Portfolio",
    },
    backToPortfolio: "Back to Portfolio section",
    demoNotice:
      "Demo Mode · This dossier is strictly scoped to verified public sources and disclosed role boundaries.",
    verificationLabels: {
      verified: "Verified Record",
      historical: "Historical Record (no current ownership implied)",
      public: "Independent Public Council",
      pending: "Pending Confirmation",
    },
    roleTypeLabels: {
      "is-founder": "Founder / Co-founder",
      "is-partner": "Partner / Co-founder",
      "is-internal": "Internal Infrastructure Initiative",
      "is-public": "Chairman of Public Council",
    },
    legalDisclaimers: {
      verified:
        "Facts on this page are cross-checked against public publications and registry records; incorporation dates and operational milestones are kept distinct.",
      historical:
        "This record documents a historical business stage and does not imply ongoing ownership or current operational control.",
      public:
        "Legal Separation Notice: The Uzbekistan Business & Industry Council (UZBIC) is an independent non-governmental public platform, not a private commercial asset. Anvar Abduqayum serves as Chairman of the Public Council rather than as a commercial owner.",
      pending:
        "Disclosure: The legal entity structure, equity share, or current operational role of this initiative has not been independently confirmed in public records and remains pending verification.",
    },
    sections: {
      overviewHeading: "Overview & Scope Boundaries",
      milestonesHeading: "Legal & Operational Milestones",
      specsHeading: "Entity Specifications",
      citationsHeading: "Source-Linked Claims & Verification Status",
      relatedHeading: "Other Portfolio Ventures",
    },
    citationLabels: {
      source: "Source",
      timeframe: "Timeframe",
      lastVerified: "Last verified",
      openSource: "View source",
      noExternalUrl: "No external URL attached (registry or pending internal record)",
    },
    openDossierLabel: "Open full dossier",
  },
};

function getCompanyCitations(
  id: string,
  locale: DossierLocale,
  company: PortfolioCompany
): ClaimCitation[] {
  if (company.citations && company.citations.length > 0) {
    return company.citations;
  }

  const verifiedDate = "2026-11-12";
  const spotInterviewUrl =
    locale === "ru"
      ? "https://www.spot.uz/ru/2022/11/17/abduqayum/"
      : "https://www.spot.uz/oz/2022/11/17/anvar-abduqayum/";

  switch (id) {
    case "toybola":
      return [
        {
          claim:
            locale === "ru"
              ? "Реестровая запись: ООО «VISAGE ELECTRIC» (ИНН 300821924, ОКЭД 32400) зарегистрировано 30 апреля 2008 года (руководитель: Абдукаюмов Бахтиёр Гайратович; доли учредителей публично не раскрыты и не доказывают единоличное владение)."
              : locale === "en"
                ? "Registry record: VISAGE ELECTRIC LLC (TIN 300821924, OKED 32400) was registered on April 30, 2008 (director listed as Abdukayumov Baxtiyor Gayratovich; shareholder split is not publicly disclosed and registration alone does not prove sole ownership)."
                : "Reyestr yozuvi: «VISAGE ELECTRIC» MChJ (STIR 300821924, OKED 32400) 2008-yil 30-aprelda ro‘yxatdan o‘tkazilgan (rahbar: Abdukayumov Baxtiyor Gayratovich; ulush taqsimoti ochiq reyestrda ko‘rsatilmagan va ro‘yxatga olish yakka mulkdorlikni isbotlamaydi).",
          sourceName: "Orginfo.uz (VISAGE ELECTRIC MChJ)",
          claimTimeframe: "2008-04-30",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "verified",
        },
        {
          claim:
            locale === "ru"
              ? "Датированное медиаинтервью: запуск производства игрушек (2009), начало экспорта игрушек (2010) и добавление электроники (2012)."
              : locale === "en"
                ? "Dated media interview claim: toy manufacturing started in 2009, toy exports in 2010, and electronics exports in 2012."
                : "Sanalangan media intervyusi: 2009-yilda o‘yinchoq ishlab chiqarish, 2010-yilda o‘yinchoq eksporti va 2012-yilda elektronika eksporti boshlangan.",
          sourceName: "Spot.uz (2022-11-17)",
          sourceUrl: spotInterviewUrl,
          claimTimeframe: "2009–2012",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "verified",
        },
        {
          claim:
            locale === "ru"
              ? "Публичные интервью об индустрии игрушек и экспортной деятельности в Узбекистане."
              : locale === "en"
                ? "Public interviews covering toy manufacturing and export operations in Uzbekistan."
                : "O‘zbekistonda o‘yinchoq ishlab chiqarish va eksport faoliyati bo‘yicha ochiq intervyular.",
          sourceName: "Kun.uz (2021-10-26 / 2022-03-04)",
          sourceUrl:
            "https://kun.uz/news/2022/03/04/ozbekistondagi-oyinchoqlar-biznesi-lideri-bugun-odamlar-tezkor-vaqt-qimmat-bolib-ketdi",
          claimTimeframe: "2021–2022",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "verified",
        },
        {
          claim:
            locale === "ru"
              ? "Официальный веб-ресурс бренда Toybola."
              : locale === "en"
                ? "Official Toybola brand website."
                : "Toybola brendining rasmiy veb-resursi.",
          sourceName: "Toybola.uz",
          sourceUrl: "https://toybola.uz",
          claimTimeframe: "2026-11-12",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "verified",
        },
      ];

    case "samtech":
      return [
        {
          claim: company.fullDesc,
          sourceName:
            company.source || "B2B industrial cooperation records (pending)",
          claimTimeframe: "2015 (pending)",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "pending",
        },
      ];

    case "afiyet":
      return [
        {
          claim:
            locale === "ru"
              ? "Исторический факт по интервью Spot.uz: первый ресторан AFIYET открылся в 2017 году. Сохранение текущего владения не подтверждено и не заявляется."
              : locale === "en"
                ? "Historical fact per Spot.uz interview: the first AFIYET restaurant opened in 2017. Ongoing or current ownership is unconfirmed and not claimed."
                : "Spot.uz intervyusidagi tarixiy fakt: birinchi AFIYET restorani 2017-yilda ochilgan. Joriy mulkdorlik saqlanib qolgani tasdiqlanmagan va da’vo qilinmaydi.",
          sourceName: "Spot.uz (2020 / 2022-11-17)",
          sourceUrl: spotInterviewUrl,
          claimTimeframe: "2017",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "historical",
        },
        {
          claim:
            locale === "ru"
              ? "Статус выхода (exit) / продажи ресторанных активов к 2025 году требует прямого подтверждения клиента; открытые реестры не содержат подтверждающей даты."
              : locale === "en"
                ? "Any exit or sale status of restaurant-sector holdings by 2025 requires direct client confirmation; public registries do not publish a verified exit date."
                : "2025-yilga kelib restoran biznesidan chiqish (exit) yoki sotish sanasi bevosita mijoz tasdig‘ini talab qiladi; ochiq reyestrlarda aniq sana tasdiqlanmagan.",
          sourceName:
            locale === "ru"
              ? "Публичные интервью YouTube / требуется подтверждение"
              : locale === "en"
                ? "Public YouTube interviews / client confirmation required"
                : "Ochiq YouTube intervyulari / mijoz tasdig‘i talab etiladi",
          claimTimeframe: "2024–2025 (unresolved)",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "pending",
        },
      ];

    case "puro":
      return [
        {
          claim:
            locale === "ru"
              ? "Исторический факт по интервью Spot.uz: первая точка PURO Gelateria открылась в 2020 году. Текущее владение не подтверждено и не заявляется."
              : locale === "en"
                ? "Historical fact per Spot.uz interview: the first PURO Gelateria opened in 2020. Ongoing or current ownership is unconfirmed and not claimed."
                : "Spot.uz intervyusidagi tarixiy fakt: birinchi PURO Gelateria nuqtasi 2020-yilda ochilgan. Joriy mulkdorlik tasdiqlanmagan va da’vo qilinmaydi.",
          sourceName: "Spot.uz (2020)",
          claimTimeframe: "2020",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "historical",
        },
        {
          claim:
            locale === "ru"
              ? "Текущий статус участия или возможного выхода (exit) из проекта требует подтверждения клиента."
              : locale === "en"
                ? "Current equity status or any exit date from this venture requires direct client confirmation."
                : "Ushbu loyihadagi joriy ulush yoki ehtimoliy chiqish (exit) sanasi mijoz tasdig‘ini talab qiladi.",
          sourceName:
            locale === "ru"
              ? "Требуется подтверждение клиента"
              : locale === "en"
                ? "Client confirmation required"
                : "Mijoz tasdig‘i talab etiladi",
          claimTimeframe: "2024–2025 (unresolved)",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "pending",
        },
      ];

    case "it-support":
      return [
        {
          claim: company.fullDesc,
          sourceName:
            company.source || "Internal initiative list (pending independent verification)",
          claimTimeframe: "2019 (pending)",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "pending",
        },
      ];

    case "uzbic":
      return [
        {
          claim:
            locale === "ru"
              ? "Официальный портал Совета бизнеса и промышленности Узбекистана (UZBIC) — независимой общественной B2B-платформы."
              : locale === "en"
                ? "Official portal of the Uzbekistan Business & Industry Council (UZBIC), an independent public B2B platform."
                : "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) mustaqil jamoat platformasining rasmiy portali.",
          sourceName: "UZBIC.uz",
          sourceUrl: "https://uzbic.uz",
          claimTimeframe: "2022–",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "public",
        },
        {
          claim:
            locale === "ru"
              ? "Участие в международном бизнес-форуме в Алматы по развитию узбекско-казахстанской кооперации."
              : locale === "en"
                ? "Participation in the Almaty business forum advancing Uzbekistan-Kazakhstan industrial cooperation."
                : "Olmaota biznes forumida O‘zbekiston–Qozog‘iston B2B kooperatsiyasini rivojlantirish bo‘yicha yoritilgan ma’lumot.",
          sourceName: "Yuz.uz",
          sourceUrl:
            "https://yuz.uz/ru/news/biznes-forum-v-almat-pokazal-vzaimnuyu-zainteresovannost-uzbekskogo-i-kazaxstanskogo-biznesa-v-rasshirenii-sotrudnichestva",
          claimTimeframe: "2022–2024",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "public",
        },
        {
          claim:
            locale === "ru"
              ? "Материалы о деловых контактах и форуме Makon в Ташкенте."
              : locale === "en"
                ? "Public coverage of Makon business forum participation in Tashkent."
                : "Toshkentdagi Makon biznes forumi va tadbirkorlar hamkorligi haqidagi nashr.",
          sourceName: "Kun.uz (2024-04-30)",
          sourceUrl:
            "https://kun.uz/news/2024/04/30/toshkentda-sotuvchilar-uchun-makon-forum-xalqaro-forumi-otkaziladi",
          claimTimeframe: "2024-04-30",
          lastVerifiedAt: verifiedDate,
          verificationStatus: "public",
        },
      ];

    default:
      return [];
  }
}

export function getDossierUiCopy(locale: string): DossierUiCopy {
  const safeLocale: DossierLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  return DOSSIER_UI[safeLocale];
}

export function getAllVentureSlugs(locale: string = "uz"): string[] {
  return getContent(locale).portfolio.companies.map((c) => c.id);
}

export interface VentureDossierRecord {
  locale: DossierLocale;
  company: PortfolioCompany;
  verificationStatus: VerificationStatus;
  roleType: RoleType;
  citations: ClaimCitation[];
  ui: DossierUiCopy;
  relatedCompanies: PortfolioCompany[];
}

export function getVentureDossier(
  locale: string,
  slug: string
): VentureDossierRecord | null {
  const safeLocale: DossierLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const content = getContent(safeLocale);
  const companies = content.portfolio.companies;
  const company = companies.find((c) => c.id === slug);

  if (!company) {
    return null;
  }

  const verificationStatus: VerificationStatus =
    company.verificationStatus ?? "verified";
  const roleType: RoleType = company.roleType ?? "is-partner";

  return {
    locale: safeLocale,
    company,
    verificationStatus,
    roleType,
    citations: getCompanyCitations(company.id, safeLocale, company),
    ui: DOSSIER_UI[safeLocale],
    relatedCompanies: companies.filter((c) => c.id !== company.id),
  };
}

