export type PartnershipTrack = "export" | "distribution" | "manufacturing" | "general";

export const PARTNERSHIP_TRACKS: PartnershipTrack[] = [
  "export",
  "distribution",
  "manufacturing",
  "general",
];

export type PartnershipLocale = "uz" | "ru" | "en";

export interface TrackMeta {
  id: PartnershipTrack;
  code: string;
  title: string;
  badge: string;
  summary: string;
  highlights: string[];
}

export interface PartnershipContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backHome: string;
    industrialKicker: string;
  };
  demoNotice: {
    badge: string;
    text: string;
  };
  tracks: Record<PartnershipTrack, TrackMeta>;
  tabs: {
    ariaLabel: string;
  };
  fields: {
    // Export fields
    targetCountry: { label: string; placeholder: string; hint: string };
    hsCategory: { label: string; placeholder: string; hint: string; options: string[] };
    volume: { label: string; placeholder: string; hint: string };

    // Distribution fields
    region: { label: string; placeholder: string; hint: string };
    retailCoverage: { label: string; placeholder: string; hint: string; options: string[] };
    outlets: { label: string; placeholder: string; hint: string };

    // Manufacturing fields
    specs: { label: string; placeholder: string; hint: string };
    capacity: { label: string; placeholder: string; hint: string };
    toolingModel: { label: string; placeholder: string; hint: string; options: string[] };

    // General fields
    inquiryTopic: { label: string; placeholder: string; hint: string; options: string[] };
    proposalDetails: { label: string; placeholder: string; hint: string };

    // Universal Contact fields
    contactName: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    phone: { label: string; placeholder: string; hint: string; codeLabel: string };
    email: { label: string; placeholder: string };
    notes: { label: string; placeholder: string };
  };
  buttons: {
    submit: string;
    submitting: string;
    demoSubmit: string;
    reset: string;
  };
  errors: {
    required: string;
    min2: string;
    min10: string;
    invalidPhone: string;
    invalidEmail: string;
    serverError: string;
    networkError: string;
  };
  demoSuccess: {
    badge: string;
    title: string;
    subtitle: string;
    explanation: string;
    summaryTitle: string;
    trackLabel: string;
    companyLabel: string;
    contactLabel: string;
    phoneLabel: string;
    param1Label: string;
    param2Label: string;
  };
  liveSuccess: {
    badge: string;
    title: string;
    subtitle: string;
    eta: string;
  };
}

export const PARTNERSHIP_DATA: Record<PartnershipLocale, PartnershipContent> = {
  uz: {
    meta: {
      title: "Xalqaro B2B Hamkorlik Portali | Anvar Abduqayum",
      description:
        "Toy Bola va VISAGE ELECTRIC sanoat ekotizimi: eksport, mintaqaviy distribyutsiya, shartnomaviy ishlab chiqarish (OEM) va to'g'ridan-to'g'ri xarid arizalari.",
    },
    hero: {
      badge: "XALQARO B2B PLATFORMA // TOY BOLA",
      title: "Sanoat va Eksport bo'yicha",
      titleAccent: "Strategik Hamkorlik",
      subtitle:
        "20+ yillik yirik ishlab chiqarish, polimer quyish va eksport infratuzilmasi. Xalqaro xaridorlar, dilerlar va sanoat hamkorlari uchun to'g'ridan-to'g'ri aloqa portali.",
      backHome: "Bosh sahifaga qaytish",
      industrialKicker: "VISAGE ELECTRIC MChJ · Toy Bola zavodi · Oylik 500k+ mahsulot quvvati",
    },
    demoNotice: {
      badge: "DEMO REJIMI FAOL",
      text: "Tizim demonstratsion xavfsizlik rejimida ishlamoqda. Kiritilgan arizalar mijoz tomonida E.164 va B2B kontrakt talablari bo'yicha tekshiriladi, tashqi serverlarga uzatilmaydi.",
    },
    tracks: {
      export: {
        id: "export",
        code: "EXP-01",
        title: "Eksport va Xalqaro Xarid",
        badge: "XALQARO EKSPORT",
        summary: "Toy Bola bolalar o'yinchoqlari va polimer mahsulotlarini xorijiy bozorlarga to'g'ridan-to'g'ri eksport qilish.",
        highlights: [
          "TIF TN (HS Code) sertifikatlangan nomenklatura",
          "FCA / FOB / DAP xalqaro inkoterms yetkazib berish",
          "Konteynerli ulgurji partiyalar (20ft / 40ft HQ)",
        ],
      },
      distribution: {
        id: "distribution",
        code: "DST-02",
        title: "Mintaqaviy Distribyutsiya",
        badge: "DILERLIK TARMOG'I",
        summary: "MDH, Markaziy Osiyo va Kavkaz mintaqalarida eksklyuziv yoki rasmiy distribyutorlik huquqi.",
        highlights: [
          "Hududiy dilerlik kafolatlangan savdo marjasi",
          "Supermarket va retail tarmoqlari uchun maxsus qadoq",
          "Marketing va POS materiallar ta'minoti",
        ],
      },
      manufacturing: {
        id: "manufacturing",
        code: "MFG-03",
        title: "Shartnomaviy Ishlab Chiqarish (OEM/ODM)",
        badge: "OEM / ODM ZAVOD",
        summary: "Termoplastavtomatlarda (TPA) yuqori aniqlikdagi qolip quyish va mijoz brendi ostida ishlab chiqarish.",
        highlights: [
          "150T dan 850T gacha bo'lgan zamonaviy TPA parki",
          "Qolip (mold) loyihalash va sinov quyish xizmati",
          "Oziq-ovqat va bolalar uchun xavfsiz birlamchi polimerlar",
        ],
      },
      general: {
        id: "general",
        code: "GEN-04",
        title: "Umumiy B2B Murojaat",
        badge: "STRATEGIK ALYANS",
        summary: "Yirik korporativ loyihalar, texnologik xomashyo ta'minoti yoki qo'shma korxona tashabbuslari.",
        highlights: [
          "Boshqaruv kengashi va muassis bilan to'g'ridan-to'g'ri aloqa",
          "Institutsional investitsiya va xomashyo klasterlari",
          "Muzokaralar konfidensialligi kafolati",
        ],
      },
    },
    tabs: {
      ariaLabel: "B2B hamkorlik yo'nalishlari",
    },
    fields: {
      targetCountry: {
        label: "Maqsadli davlat / bozor *",
        placeholder: "Masalan: Qozog'iston, Rossiya, BAA, Germaniya, Ozarbayjon",
        hint: "Mahsulot yetkazib beriladigan asosiy xorijiy davlat.",
      },
      hsCategory: {
        label: "Mahsulot toifasi / TIF TN guruhi *",
        placeholder: "Toifani tanlang",
        hint: "Sizni qiziqtirgan asosiy mahsulotlar nomenklaturasi.",
        options: [
          "TIF TN 9503: Bolalar plastik o'yinchoqlari (Toy Bola)",
          "Polimer xo'jalik buyumlari va idishlar",
          "Plastik qutilar va logistika taralari",
          "Maxsus buyurtma polimer mahsulotlari",
        ],
      },
      volume: {
        label: "Kutilayotgan xarid hajmi / partiya *",
        placeholder: "Masalan: 1 ta 40ft HQ konteyner / oyiga (yoki $50,000+ partiya)",
        hint: "Oylik yoki bir martalik rejalashtirilgan minimal xarid hajmi.",
      },
      region: {
        label: "Distribyutsiya hududi / shahar *",
        placeholder: "Masalan: Olmaota va Janubiy Qozog'iston, Moskva va MO, Boku",
        hint: "Dilerlik qamrovi rejalashtirilayotgan aniq geografik hudud.",
      },
      retailCoverage: {
        label: "Asosiy chakana savdo kanallari *",
        placeholder: "Kanalni tanlang",
        hint: "Mavjud yoki rejalashtirilayotgan realizatsiya infratuzilmasi.",
        options: [
          "Federal / Milliy supermarketlar tarmog'i",
          "Bolalar mollari ixtisoslashgan tarmoqlari",
          "Mintaqaviy ulgurji savdo bazalari va dilerlar",
          "E-commerce / Marketplace (Wildberries, Ozon, Uzum)",
        ],
      },
      outlets: {
        label: "Faol savdo nuqtalari soni",
        placeholder: "Masalan: 45 ta do'kon, 3 ta ulgurji filial",
        hint: "Kompaniyangiz amaldagi qamrovi.",
      },
      specs: {
        label: "Mahsulot texnik talablari / Qolip spesifikatsiyasi *",
        placeholder: "Masalan: 250-grammli polipropilen korpus, 4-uyali issiq kanalli qolip...",
        hint: "Material turi (PP, PE, ABS), og'irligi, qolip mavjudligi yoki loyihalash ehtiyoji.",
      },
      capacity: {
        label: "Talab etiladigan oylik ishlab chiqarish quvvati *",
        placeholder: "Masalan: 100,000 dona / oyiga yoki 20 tonna polimer",
        hint: "Kerakli partiya hajmi va oylik yetkazib berish sur'ati.",
      },
      toolingModel: {
        label: "Hamkorlik formati va qolip ta'minoti *",
        placeholder: "Formatni tanlang",
        hint: "Ishlab chiqarish vositalarining mulkiy holati.",
        options: [
          "Buyurtmachi qolipi asosida quyish (Mijoz qolipi)",
          "Toy Bola zavodida yangi qolip tayyorlash (Full Turnkey)",
          "OEM: Tayyor Toy Bola modellarini xususiy brend ostida qadoqlash",
          "Qo'shma polimer ishlab chiqarish klasteri",
        ],
      },
      inquiryTopic: {
        label: "Murojaat yo'nalishi *",
        placeholder: "Yo'nalishni tanlang",
        hint: "Biznes masalasi yoki taklifning asosiy yo'nalishi.",
        options: [
          "Xomashyo va polimer ta'minoti bo'yicha hamkorlik",
          "Yirik korporativ buyurtma",
          "Qo'shma korxona (JV) yoki investitsiya loyihasi",
          "Boshqa strategik biznes taklif",
        ],
      },
      proposalDetails: {
        label: "Taklifning batafsil bayoni *",
        placeholder: "Kompaniyangiz faoliyati, maqsad va kutilayotgan hamkorlik formatini qisqacha bayon eting...",
        hint: "Tijoriy sirlarsiz umumiy konseptsiya.",
      },
      contactName: {
        label: "Mas'ul vakil (F.I.Sh.) *",
        placeholder: "Masalan: Rustam Karimov",
      },
      company: {
        label: "Kompaniya / Korxona nomi *",
        placeholder: "Masalan: Eurasia Retail Group MChJ / LLC",
      },
      phone: {
        label: "Xalqaro telefon raqami (E.164) *",
        placeholder: "+998 90 123 45 67",
        hint: "Davlat kodi bilan to'liq kiriting (masalan: +998..., +7..., +971..., +49...).",
        codeLabel: "Davlat kodi",
      },
      email: {
        label: "Korporativ elektron pochta",
        placeholder: "partnership@company.com",
      },
      notes: {
        label: "Qo'shimcha izoh yoki yetkazib berish shartlari",
        placeholder: "Inkoterms talablari, logistika punktlari yoki maxsus istaklar...",
      },
    },
    buttons: {
      submit: "B2B Murojaatni Yuborish",
      submitting: "Yuborilmoqda...",
      demoSubmit: "Demo Tekshiruvdan O'tkazish",
      reset: "Yangi So'rov Yuborish",
    },
    errors: {
      required: "Ushbu maydon to'ldirilishi shart.",
      min2: "Kamida 2 ta belgi kiriting.",
      min10: "Kamida 10 ta belgi kiriting.",
      invalidPhone: "Xalqaro raqamni to'g'ri kiriting (masalan, +998901234567 yoki +79161234567).",
      invalidEmail: "Elektron pochta manzili noto'g'ri formatda.",
      serverError: "Arizani qabul qilishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      networkError: "Tarmoq xatosi. Internet aloqasini tekshiring.",
    },
    demoSuccess: {
      badge: "DEMO REJIMI · MUROJAAT TEKSHIRILDI",
      title: "Demo Mode: B2B Request Validated",
      subtitle: "B2B arizangiz mijoz brauzerida E.164 va kontrakt mezonlari bo'yicha to'liq tekshirildi.",
      explanation:
        "Tizim xavfsiz Demo rejimida ishlayotgani sababli, kiritilgan ma'lumotlar serverga yoki Telegram botga jo'natilmadi. Barcha tekshiruvlar to'liq o'tdi.",
      summaryTitle: "Tekshirilgan B2B Parametrlari",
      trackLabel: "Yo'nalish",
      companyLabel: "Kompaniya",
      contactLabel: "Mas'ul shaxs",
      phoneLabel: "Telefon (E.164)",
      param1Label: "Asosiy parametr",
      param2Label: "Hajm / Quvvat",
    },
    liveSuccess: {
      badge: "ARIZA MUVAFFAQIYATLI QABUL QILINDI",
      title: "B2B Hamkorlik So'rovingiz Qabul Qilindi",
      subtitle:
        "Ma'lumotlar Anvar Abduqayumning xalqaro savdo va ishlab chiqarish bo'limiga yetkazildi.",
      eta: "Xalqaro B2B eksport menejeri 1 ish kuni (shoshilinch so'rovlar bo'yicha 2 soat) ichida siz bilan bog'lanadi.",
    },
  },
  ru: {
    meta: {
      title: "Международный B2B Портал Партнёрства | Анвар Абдукаюм",
      description:
        "Промышленная экосистема Toy Bola и VISAGE ELECTRIC: экспорт, региональная дистрибуция, контрактное производство (OEM) и прямые оптовые поставки.",
    },
    hero: {
      badge: "МЕЖДУНАРОДНАЯ B2B ПЛАТФОРМА // TOY BOLA",
      title: "Промышленное и Экспортное",
      titleAccent: "Партнёрство",
      subtitle:
        "20+ лет опыта в крупном промышленном производстве, литье полимеров и международных экспортных контрактах. Прямой канал связи для зарубежных закупщиков и дилеров.",
      backHome: "Вернуться на главную",
      industrialKicker: "ООО VISAGE ELECTRIC · Завод Toy Bola · Мощность 500k+ изделий/мес",
    },
    demoNotice: {
      badge: "РЕЖИМ ДЕМОНСТРАЦИИ АКТИВЕН",
      text: "Платформа функционирует в демонстрационном режиме. Заявки валидируются на стороне клиента по стандарту E.164 и B2B-контракту без передачи на внешние сервера.",
    },
    tracks: {
      export: {
        id: "export",
        code: "EXP-01",
        title: "Экспорт и Внешняя Торговля",
        badge: "МЕЖДУНАРОДНЫЙ ЭКСПОРТ",
        summary: "Прямые поставки детских игрушек Toy Bola и полимерных изделий на зарубежные рынки.",
        highlights: [
          "Номенклатура сертифицирована по ТН ВЭД (HS Code)",
          "Международные условия поставки FCA / FOB / DAP",
          "Контейнерные оптовые партии (20ft / 40ft HQ)",
        ],
      },
      distribution: {
        id: "distribution",
        code: "DST-02",
        title: "Региональная Дистрибуция",
        badge: "ДИЛЕРСКАЯ СЕТЬ",
        summary: "Права официального дилера или эксклюзивного дистрибьютора в регионах СНГ и ЕАЭС.",
        highlights: [
          "Гарантированная торговая маржинальность дилера",
          "Адаптированная упаковка для торговых сетей",
          "Маркетинговая и рекламная поддержка",
        ],
      },
      manufacturing: {
        id: "manufacturing",
        code: "MFG-03",
        title: "Контрактное Производство (OEM/ODM)",
        badge: "ЗАВОД OEM / ODM",
        summary: "Высокоточное литье под давлением на термопластавтоматах (ТПА) под брендом заказчика.",
        highlights: [
          "Парк современных ТПА усилием от 150 до 850 тонн",
          "Инжиниринг пресс-форм и тестовая отливка",
          "Сертифицированные безопасные полимеры (PP, PE, ABS)",
        ],
      },
      general: {
        id: "general",
        code: "GEN-04",
        title: "Общий B2B Запрос",
        badge: "СТРАТЕГИЧЕСКИЙ АЛЬЯНС",
        summary: "Крупные инфраструктурные поставки, полимерное сырье и совместные предприятия.",
        highlights: [
          "Прямое рассмотрение руководством промышленного холдинга",
          "Сырьевые и производственные кооперации",
          "Гарантия коммерческой конфиденциальности",
        ],
      },
    },
    tabs: {
      ariaLabel: "Направления B2B партнёрства",
    },
    fields: {
      targetCountry: {
        label: "Целевая страна / рынок *",
        placeholder: "Например: Россия, Казахстан, ОАЭ, Германия, Беларусь",
        hint: "Страна назначения и таможенного оформления поставок.",
      },
      hsCategory: {
        label: "Категория продукции / ТН ВЭД *",
        placeholder: "Выберите категорию",
        hint: "Основная группа интересующей продукции.",
        options: [
          "ТН ВЭД 9503: Пластиковые детские игрушки (Toy Bola)",
          "Полимерные хозяйственные товары и емкости",
          "Логистические ящики и тара",
          "Специальные полимерные изделия под заказ",
        ],
      },
      volume: {
        label: "Планируемый объём / партия *",
        placeholder: "Например: 1 контейнер 40ft HQ в месяц (или партия от $50,000)",
        hint: "Ориентировочный объём закупки.",
      },
      region: {
        label: "Регион дистрибуции / города *",
        placeholder: "Например: Москва и ЦФО, Алматы и Южный Казахстан, Баку",
        hint: "География планируемого дилерского присутствия.",
      },
      retailCoverage: {
        label: "Основные каналы сбыта *",
        placeholder: "Выберите канал",
        hint: "Каналы дистрибуции компании.",
        options: [
          "Федеральные и региональные розничные сети",
          "Специализированные детские сети",
          "Оптовые дистрибьюторские базы",
          "Маркетплейсы (Wildberries, Ozon, Uzum, Яндекс Маркет)",
        ],
      },
      outlets: {
        label: "Количество торговых точек",
        placeholder: "Например: 50+ магазинов, 3 распределительных центра",
        hint: "Текущее розничное покрытие.",
      },
      specs: {
        label: "Технические требования / Пресс-форма *",
        placeholder: "Например: Корпус 200г, полипропилен, 4-местная горячеканальная форма...",
        hint: "Материал, вес изделия, наличие готовой пресс-формы или техзадание.",
      },
      capacity: {
        label: "Необходимый объем производства / тираж *",
        placeholder: "Например: 100,000 шт./месяц или 25 тонн сырья",
        hint: "Требуемая производственная программа.",
      },
      toolingModel: {
        label: "Формат сотрудничества и оснастки *",
        placeholder: "Выберите формат",
        hint: "Модель использования производственных мощностей.",
        options: [
          "Литьё на пресс-форме заказчика",
          "Изготовление пресс-формы «под ключ» на базе Toy Bola",
          "Private Label: брендирование готовых линеек Toy Bola",
          "Совместное производственное предприятие",
        ],
      },
      inquiryTopic: {
        label: "Тема обращения *",
        placeholder: "Выберите тему",
        hint: "Ключевая направленность предложения.",
        options: [
          "Сырьевые полимерные поставки",
          "Крупный корпоративный заказ",
          "Совместное предприятие (JV) или инвестиции",
          "Другое деловое предложение",
        ],
      },
      proposalDetails: {
        label: "Краткое содержание предложения *",
        placeholder: "Опишите профиль вашей компании, задачи и предлагаемый формат сотрудничества...",
        hint: "Концептуальные параметры без закрытых коммерческих тайн.",
      },
      contactName: {
        label: "Контактное лицо (Ф.И.О.) *",
        placeholder: "Например: Алексей Смирнов",
      },
      company: {
        label: "Название компании / организации *",
        placeholder: "Например: Eurasia Trading LLC",
      },
      phone: {
        label: "Международный номер телефона (E.164) *",
        placeholder: "+7 916 123 45 67",
        hint: "Укажите номер с кодом страны (например: +7..., +998..., +971..., +49...).",
        codeLabel: "Код страны",
      },
      email: {
        label: "Корпоративная почта",
        placeholder: "procurement@company.com",
      },
      notes: {
        label: "Дополнительные требования / Инкотермс",
        placeholder: "Базис поставки (FCA, DAP), логистические хабы, сертификация...",
      },
    },
    buttons: {
      submit: "Отправить B2B-запрос",
      submitting: "Отправка...",
      demoSubmit: "Проверить в Демо-режиме",
      reset: "Создать новый запрос",
    },
    errors: {
      required: "Поле обязательно для заполнения.",
      min2: "Введите минимум 2 символа.",
      min10: "Введите минимум 10 символов.",
      invalidPhone: "Введите корректный международный номер (например, +79161234567 или +998901234567).",
      invalidEmail: "Некорректный формат электронной почты.",
      serverError: "Ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.",
      networkError: "Ошибка сети. Проверьте интернет-соединение.",
    },
    demoSuccess: {
      badge: "ДЕМО-РЕЖИМ · ЗАПРОС ВАЛИДИРОВАН",
      title: "Demo Mode: B2B Request Validated",
      subtitle: "Ваш B2B-запрос успешно проверен в браузере по стандарту E.164 и структуре B2B-контракта.",
      explanation:
        "Так как активен безопасный режим демонстрации, данные не передавались на сервер или в Telegram-канал. Все контрактные поля прошли проверку.",
      summaryTitle: "Проверенные B2B-параметры",
      trackLabel: "Направление",
      companyLabel: "Компания",
      contactLabel: "Контактное лицо",
      phoneLabel: "Телефон (E.164)",
      param1Label: "Ключевой параметр",
      param2Label: "Объем / Мощность",
    },
    liveSuccess: {
      badge: "ЗАПРОС УСПЕШНО ПРИНЯТ",
      title: "B2B-запрос зарегистрирован",
      subtitle:
        "Информация направлена в департамент внешнеэкономической деятельности и производства Анвара Абдукаюма.",
      eta: "Менеджер международного отдела свяжется с вами в течение 1 рабочего дня (по срочным запросам — в течение 2 часов).",
    },
  },
  en: {
    meta: {
      title: "International B2B Partnership Portal | Anvar Abduqayum",
      description:
        "Industrial ecosystem of Toy Bola & VISAGE ELECTRIC: wholesale export, regional distribution, contract injection molding (OEM/ODM), and supply contracts.",
    },
    hero: {
      badge: "INTERNATIONAL B2B PLATFORM // TOY BOLA",
      title: "Industrial & Export",
      titleAccent: "Strategic Partnership",
      subtitle:
        "20+ years of large-scale manufacturing, polymer molding, and cross-border exports. Direct gateway for international buyers, regional distributors, and OEM partners.",
      backHome: "Back to Home",
      industrialKicker: "VISAGE ELECTRIC LLC · Toy Bola Factory · 500k+ Units Monthly Capacity",
    },
    demoNotice: {
      badge: "DEMO MODE ACTIVE",
      text: "Platform is running in private safety demo mode. Submissions are strictly validated in your browser under international E.164 standards without external network dispatch.",
    },
    tracks: {
      export: {
        id: "export",
        code: "EXP-01",
        title: "Export & International Trade",
        badge: "GLOBAL EXPORT",
        summary: "Direct wholesale export of Toy Bola children's toys and polymer products to international markets.",
        highlights: [
          "Certified HS Code (9503 00) product catalog",
          "International Incoterms (FCA, FOB, DAP, CIF)",
          "Full container-load orders (20ft / 40ft HQ)",
        ],
      },
      distribution: {
        id: "distribution",
        code: "DST-02",
        title: "Regional Distribution",
        badge: "DEALER NETWORK",
        summary: "Official or exclusive distributorship rights across Central Asia, CIS, Middle East, and Europe.",
        highlights: [
          "Protected dealer territories with strong wholesale margins",
          "Customized multi-language retail packaging",
          "Marketing and point-of-sale collateral support",
        ],
      },
      manufacturing: {
        id: "manufacturing",
        code: "MFG-03",
        title: "Contract Manufacturing (OEM/ODM)",
        badge: "OEM / ODM HUB",
        summary: "High-precision plastic injection molding using modern machinery under client private labels.",
        highlights: [
          "Injection machine fleet spanning 150T to 850T clamp force",
          "Precision mold engineering and rapid pilot tooling",
          "Certified food-grade and child-safe virgin polymers",
        ],
      },
      general: {
        id: "general",
        code: "GEN-04",
        title: "General B2B Inquiry",
        badge: "STRATEGIC ALLIANCE",
        summary: "Enterprise procurement, raw material polymer supplies, or joint venture initiatives.",
        highlights: [
          "Executive board and foundry founder direct review",
          "Supply chain and polymer compound partnerships",
          "Non-disclosure and commercial confidentiality assured",
        ],
      },
    },
    tabs: {
      ariaLabel: "B2B partnership tracks",
    },
    fields: {
      targetCountry: {
        label: "Target country / market *",
        placeholder: "e.g., UAE, Kazakhstan, Germany, Russia, Turkey",
        hint: "Primary destination country for customs and logistics.",
      },
      hsCategory: {
        label: "Product category / HS classification *",
        placeholder: "Select category",
        hint: "Primary product category of interest.",
        options: [
          "HS Code 9503: Plastic Children's Toys (Toy Bola)",
          "Polymer household goods & containers",
          "Industrial crates and logistical boxes",
          "Custom engineered polymer parts",
        ],
      },
      volume: {
        label: "Expected volume / batch size *",
        placeholder: "e.g., 1 x 40ft HQ container / month (or $50,000+ batch)",
        hint: "Planned initial and recurring purchase volume.",
      },
      region: {
        label: "Distribution territory / city *",
        placeholder: "e.g., Almaty & Southern Kazakhstan, Dubai, Moscow region",
        hint: "Target geographical territory for dealer coverage.",
      },
      retailCoverage: {
        label: "Primary sales channels *",
        placeholder: "Select channel",
        hint: "Active or planned retail coverage channels.",
        options: [
          "National / Regional Supermarket Chains",
          "Specialty Toy and Child Retail Chains",
          "Wholesale Distributor Network",
          "E-Commerce / Major Marketplaces",
        ],
      },
      outlets: {
        label: "Active retail / distribution doors",
        placeholder: "e.g., 50+ retail doors, 3 distribution centers",
        hint: "Current retail reach of your firm.",
      },
      specs: {
        label: "Technical specifications / Mold tooling *",
        placeholder: "e.g., 200g PP housing, 4-cavity hot-runner mold...",
        hint: "Polymer type (PP, PE, ABS), unit weight, mold availability or tooling needed.",
      },
      capacity: {
        label: "Required production capacity / cadence *",
        placeholder: "e.g., 100,000 units / month or 20 metric tons",
        hint: "Monthly unit production requirement.",
      },
      toolingModel: {
        label: "Manufacturing model & tooling ownership *",
        placeholder: "Select model",
        hint: "Production arrangement and mold tooling setup.",
        options: [
          "Contract molding using client's existing tooling",
          "Turnkey new mold design & fabrication at Toy Bola",
          "Private label on existing Toy Bola catalog designs",
          "Joint venture manufacturing cluster",
        ],
      },
      inquiryTopic: {
        label: "Inquiry topic *",
        placeholder: "Select topic",
        hint: "Core subject of collaboration.",
        options: [
          "Polymer raw material and compounding",
          "Large enterprise procurement",
          "Joint venture (JV) or industrial investment",
          "Other strategic collaboration proposal",
        ],
      },
      proposalDetails: {
        label: "Proposal summary *",
        placeholder: "Briefly outline your enterprise background, objectives, and proposed format...",
        hint: "High-level overview without confidential secrets.",
      },
      contactName: {
        label: "Contact Person (Full Name) *",
        placeholder: "e.g., Alexander Vance",
      },
      company: {
        label: "Company / Enterprise Name *",
        placeholder: "e.g., Global Trade Dynamics Ltd",
      },
      phone: {
        label: "International Phone Number (E.164) *",
        placeholder: "+1 415 555 2671",
        hint: "Include country code (e.g., +1..., +971..., +49..., +998...).",
        codeLabel: "Country code",
      },
      email: {
        label: "Corporate Email Address",
        placeholder: "procurement@company.com",
      },
      notes: {
        label: "Additional Notes / Incoterms Requirements",
        placeholder: "Incoterms preferences (FCA, FOB, DAP), delivery hub, certifications...",
      },
    },
    buttons: {
      submit: "Submit B2B Inquiry",
      submitting: "Submitting...",
      demoSubmit: "Validate in Demo Mode",
      reset: "Submit Another Inquiry",
    },
    errors: {
      required: "This field is required.",
      min2: "Please enter at least 2 characters.",
      min10: "Please enter at least 10 characters.",
      invalidPhone: "Please enter a valid international phone number (e.g., +998901234567 or +14155552671).",
      invalidEmail: "Invalid corporate email address.",
      serverError: "An error occurred while submitting. Please try again.",
      networkError: "Network connection error. Please verify your connection.",
    },
    demoSuccess: {
      badge: "DEMO MODE · INTAKE VALIDATED",
      title: "Demo Mode: B2B Request Validated",
      subtitle: "Your B2B inquiry has passed full client-side validation under E.164 and contract standards.",
      explanation:
        "Because safe Demo Mode is enabled, no data was transmitted to external servers or Telegram. Client-side validation confirmed that all parameters are well-formed.",
      summaryTitle: "Validated B2B Parameters",
      trackLabel: "Track",
      companyLabel: "Company",
      contactLabel: "Contact Person",
      phoneLabel: "Phone (E.164)",
      param1Label: "Primary Specification",
      param2Label: "Volume / Capacity",
    },
    liveSuccess: {
      badge: "SUBMISSION CONFIRMED",
      title: "B2B Partnership Inquiry Received",
      subtitle: "Your proposal has been routed directly to Anvar Abduqayum's executive trade and export desk.",
      eta: "An international trade officer will respond within 1 business day (within 2 hours for priority requests).",
    },
  },
};

export function getPartnershipContent(locale: string = "uz"): PartnershipContent {
  if (locale === "ru") return PARTNERSHIP_DATA.ru;
  if (locale === "en") return PARTNERSHIP_DATA.en;
  return PARTNERSHIP_DATA.uz;
}
