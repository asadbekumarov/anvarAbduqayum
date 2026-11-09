/**
 * Central Content Repository for Anvar Abduqayum Website
 * Design Concept: "Qolip" (Mold / Module)
 * Uzbek (Latin) primary, structured for i18n (RU / EN).
 * No hardcoded names or texts inside UI components.
 */

export interface LocaleContent {
  meta: {
    siteTitle: string;
    siteDescription: string;
    founderName: string;
    founderRole: string;
    founderTagline: string;
  };
  navigation: {
    portfolio: string;
    timeline: string;
    principles: string;
    numbers: string;
    exportUzbic: string;
    mistakes: string;
    media: string;
    contact: string;
    ctaButton: string;
    consulting?: string;
    bookingCta?: string;
  };
  hero: {
    moduleLabel: string;
    statusBadge: string;
    dimensionSpec: string;
    headlinePrefix: string;
    headlineEmphasis: string;
    headlineSuffix: string;
    summary: string;
    ctaPrimary: string;
    ctaSecondary: string;
    portraitCaption: string;
    blueprintDimensions: {
      width: string;
      tolerance: string;
      standard: string;
    };
    kickerBadge?: string;
    kickerText?: string;
    verifiedMetrics?: Array<{
      value: string;
      label: string;
    }>;
    portraitRole?: string;
    portraitBadge?: string;
    portraitNote?: string;
    brands?: string[];
  };
  dossier: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labels: {
      programSpec: string;
      format: string;
      audience: string;
      overview: string;
      focusAreas: string;
      ctaText: string;
    };
    services: Array<{
      id: string;
      code: string;
      name: string;
      shortSummary: string;
      audience: string;
      overview: string;
      focusAreas: string[];
      format: string;
      ctaText: string;
    }>;
  };
  portfolio: {
    moduleLabel?: string;
    title: string;
    titleEmphasis?: string;
    subtitle: string;
    moldLegend?: string;
    eyebrow: string;
    filters: {
      all: string;
      mfg: string;
      horeca: string;
      service: string;
      council: string;
    };
    detailBtn: string;
    closeBtn: string;
    modal: {
      role: string;
      period: string;
      sector: string;
      model: string;
      caps: string;
      officialSite: string;
    };
    companies: Array<{
      id: string;
      name: string;
      code: string;
      category: "mfg" | "horeca" | "service" | "council";
      gridSpan: "major" | "standard" | "strategic";
      badge: string;
      year: string;
      activity: string;
      desc: string;
      fullDesc: string;
      role: string;
      period: string;
      sector: string;
      model: string;
      categoryBadge: string;
      tags: string[];
      status: string;
      hasLogo: boolean;
      logoUrl?: string;
      assetLabel: string;
      websiteUrl?: string | null;
      moduleNumber?: string;
      foundedYear?: string;
      highlight?: string;
      description?: string;
      externalUrl?: string;
      logoKey?: string;
    }>;
  };
  timeline: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    steps: Array<{
      period: string;
      stageNumber: string;
      title: string;
      summary: string;
      milestone: string;
      focus: string;
    }>;
  };
  principles: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    manifesto: string;
    modules: Array<{
      index: string;
      title: string;
      description: string;
      technicalRule: string;
      iconType: "sop" | "governance" | "metrics" | "culture";
    }>;
  };
  numbers: {
    moduleLabel: string;
    title: string;
    subtitle: string;
    footnote: string;
    counters: Array<{
      id: string;
      value: number;
      suffix: string;
      prefix?: string;
      label: string;
      specification: string;
    }>;
  };
  exportUzbic: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    exportMapTitle: string;
    destinations: string[];
    uzbicCard: {
      tag: string;
      name: string;
      acronymMeaning: string;
      mission: string;
      pillars: Array<{
        title: string;
        desc: string;
      }>;
      linkText: string;
      linkUrl: string;
    };
  };
  mistakes: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    intro: string;
    lessons: Array<{
      code: string;
      title: string;
      misconception: string;
      reality: string;
      moldedOutcome: string;
    }>;
  };
  media: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    youtubeHeading: string;
    pressHeading: string;
    videos: Array<{
      id: string;
      title: string;
      channel: string;
      youtubeId: string;
      durationPlaceholder: string;
      topicBadge: string;
      isAvailable?: boolean;
      statusNote?: string;
    }>;
    pressMentions: Array<{
      id: string;
      outlet: string;
      articleTitle: string;
      datePlaceholder: string;
      url: string;
      publicationType: string;
    }>;
  };
  contact: {
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    directTitle: string;
    directText: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      topicLabel: string;
      topicOptions: Array<{ id: string; label: string }>;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
    };
    socials: {
      telegram: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
  mobileStickyBar: {
    telegramLabel: string;
    callLabel: string;
  };
  footer: {
    founderName: string;
    tagline: string;
    licenseSpec: string;
    rightsReserved: string;
    blueprintStamp: string;
  };
}

export const siteContent: Record<"uz" | "ru" | "en", LocaleContent> = {
  uz: {
    meta: {
      siteTitle: "Anvar Abduqayum | Sanoatchi, Ishlab Chiqaruvchi va Asoschi",
      siteDescription:
        "O'zbek tadbirkori va sanoatchisi Anvar Abduqayumning shaxsiy portfeli. 7 ta sanoat korxonasi, «Qolip» boshqaruv tamoyili va xalqaro eksport tizimlari.",
      founderName: "Anvar Abduqayum",
      founderRole: "Sanoatchi, Muhandis-Tadbirkor",
      founderTagline: "Biznes egasisiz ham benuqson ishlaydigan mustahkam qolipdir.",
    },
    navigation: {
      portfolio: "Bizneslar",
      timeline: "Faoliyat yo‘li",
      principles: "Qolip tamoyili",
      numbers: "Raqamlar",
      exportUzbic: "Eksport va UZBIC",
      mistakes: "Mening xatolarim",
      media: "Media",
      contact: "Aloqa",
      ctaButton: "Uchrashuv bronlash",
      consulting: "Xizmatlar",
      bookingCta: "Uchrashuv bronlash",
    },
    hero: {
      moduleLabel: "QOLIP №00 // BOSH MATRITSA",
      statusBadge: "SANOAT VA EKSPORT EKOTIZIMI",
      dimensionSpec: "STANDART: ISO / O'zDSt 2026 // SERIYA: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Egasisiz ishlaydigan",
      headlineSuffix: " tizimlar va sanoat darajasidagi boshqaruv.",
      summary:
        "Anvar Abduqayum — Toybola Toys, Samtech Masterbatches, Visage Electric va UZBIC asoschisi. O'zbekiston sanoat ishlab chiqarishi va xalqaro eksportida sinalgan intizom asosida biznesingizni operatsion qafasdan mustaqil tizimga olib chiqing.",
      ctaPrimary: "Uchrashuv bronlash",
      ctaSecondary: "Xizmatlar va dasturlar",
      portraitCaption: "Anvar Abduqayum",
      blueprintDimensions: {
        width: "KO'P TARMOQLI",
        tolerance: "MDH & XALQARO",
        standard: "2005-YILDAN TAJRIBA",
      },
      kickerBadge: "MONOGRAF // SANOAT VA TIZIMLI BOSHQARUV",
      kickerText: "Toshkent • 2026",
      verifiedMetrics: [
        {
          value: "2004-yildan",
          label: "Tijorat va xalqaro savdo amaliyoti",
        },
        {
          value: "2012-yildan",
          label: "Toybola fabrikasi tashkil etilishi",
        },
        {
          value: "7 tizim",
          label: "Sanoat, polimer, HoReCa va IT tashabbusi",
        },
      ],
      portraitRole: "Sanoatchi, Muhandis-Tadbirkor",
      portraitBadge: "ARXIV ASSETI // VAQTINCHALIK FOTO",
      portraitNote: "[Arxiv fotosurati // Vaqtinchalik vizual asset • Kelgusida tasdiqlangan professional fotosessiya bilan almashtiriladi]",
      brands: [
        "TOYBOLA TOYS",
        "SAMTECH MASTERBATCHES",
        "VISAGE ELECTRIC",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      eyebrow: "Xizmatlar va Konsalting Dossiyesi",
      title: "Biznes egalari va ishlab chiqaruvchilar uchun 4 ta strategik yo‘nalish",
      subtitle:
        "Har bir yo‘nalish 20 yillik amaliy tajribaga asoslangan. Tizimli boshqaruvdan tortib korxonalarni modernizatsiya qilish va eksportga chiqishgacha.",
      labels: {
        programSpec: "DASTUR SPETSIFIKATSIYASI",
        format: "FORMAT",
        audience: "Kimlar uchun",
        overview: "Dastur mazmuni",
        focusAreas: "Asosiy yo‘nalishlar",
        ctaText: "Uchrashuv bronlash",
      },
      services: [
        {
          id: "governance",
          code: "DASTUR 01 // INDIVIDUAL GOVERNANCE",
          name: "Biznes boshqaruvi va delegatsiyalash",
          shortSummary:
            "Asoschining operatsion boshqaruvdan chiqishi va avtonom boshqaruv tizimini shakllantirish.",
          audience:
            "Kompaniyani operatsion xaosdan avtonom tizimga olib chiqmoqchi bo‘lgan tadbirkorlar va asoschilar",
          overview:
            "Asoschining har kungi mikromenejmentdan ozod bo‘lishi, ishonchli delegatsiyalash mexanizmlarini joriy qilish va inson omiliga emas, aniq standartlarga tayanuvchi tizimli boshqaruv strukturasini qurish.",
          focusAreas: [
            "Operatsion boshqaruv va strategik rejalashtirishni aniq ajratish",
            "Vakolat va mas'uliyatni bosqichma-bosqich asosiy rahbarlarga o‘tkazish",
            "Rahbar ishtirokisiz ham barqaror ishlaydigan standart reglamentlar tizimi",
          ],
          format: "Yakka tartibdagi format / Amaliy sessiyalar",
          ctaText: "Konsultatsiyaga yozilish",
        },
        {
          id: "manufacturing",
          code: "DASTUR 02 // INDUSTRIAL ENGINEERING",
          name: "Ishlab chiqarish jarayonlarini optimallashtirish",
          shortSummary:
            "Standart ish reglamentlari (SOP), tannarx tahlili va mahsulot sifatini oshirish.",
          audience:
            "Zavod va sexlarini kengaytirayotgan, mahsulot tannarxini optimallashtirmoqchi bo‘lgan sanoatchilar",
          overview:
            "20 yillik zavod amaliyoti asosida ishlab chiqarish maydonchasini tahlil qilish: standart ish reglamentlari (SOP), texnologik xaritalar va xomashyo yo‘qotishlarini minimallashtirish.",
          focusAreas: [
            "Standart ish reglamentlari (SOP) va xomashyo sarfini nazorat qilish",
            "Uskunalarning to‘liq quvvatda ishlash samaradorligini tahlil qilish",
            "Yaroqsiz mahsulotlar (brak) ulushini kamaytirish va sikl vaqtini qisqartirish",
          ],
          format: "Amaliy tahlil va korxona maydonida ishlash",
          ctaText: "Konsultatsiyaga yozilish",
        },
        {
          id: "export",
          code: "DASTUR 03 // GLOBAL EXPANSION",
          name: "UZBIC doirasida eksport hamkorligi",
          shortSummary:
            "Mahalliy mahsulotlarni tashqi bozorlarga olib chiqish va B2B kooperatsiya.",
          audience:
            "Mahsulotini xorijiy bozorlarga eksport qilishni rejalashtirgan yoki geografiyasini kengaytirayotgan ishlab chiqaruvchilar",
          overview:
            "O‘zbekiston Biznes va Ishlab Chiqaruvchilar Kengashi (UZBIC) doirasida amaliy tajriba almashish: xalqaro standartlarga moslashish, xorijiy xaridorlar bilan to‘g‘ridan-to‘g‘ri aloqa va tashqi savdo yo‘nalishlari.",
          focusAreas: [
            "Mahsulotni xalqaro sifat va sertifikatlashtirish talablariga moslash",
            "MDH va boshqa tashqi bozorlarga chiqish bo‘yicha amaliy yo‘l xaritasi",
            "B2B kooperatsiya va eksport konsortsiumlari mexanizmi",
          ],
          format: "UZBIC Kengashi doirasidagi amaliy konsultatsiya",
          ctaText: "Eksport bo‘yicha murojaat",
        },
        {
          id: "diagnostic",
          code: "DASTUR 04 // DIAGNOSTIC ENTRY",
          name: "Boshlang‘ich strategik konsultatsiya",
          shortSummary:
            "Kompaniyadagi 3 ta asosiy to‘siqni aniqlash va aniq harakatlar rejasi.",
          audience:
            "Biznesidagi asosiy to‘siqlarni aniqlab, birinchi navbatdagi qadamlarni belgilamoqchi bo‘lgan tadbirkorlar",
          overview:
            "20 daqiqalik boshlang‘ich diagnostika: kompaniyaning hozirgi holatini tahlil qilish, jarayonlardagi yoki boshqaruvdagi asosiy to‘siqlarni aniqlash va yo‘nalish belgilash.",
          focusAreas: [
            "Kompaniya jarayonlarini tezkor birlamchi tahlil qilish",
            "Operatsion boshqaruv yoki ishlab chiqarishdagi asosiy to‘siqlarni aniqlash",
            "Amaliy yo‘nalish va hamkorlik formatini aniqlashtirish",
          ],
          format: "20 daqiqalik onlayn diagnostika",
          ctaText: "Diagnostikaga yozilish",
        },
      ],
    },
    portfolio: {
      moduleLabel: "MODUL 02 // BIZNES EKOTIZIMI",
      eyebrow: "BIZNES EKOTIZIMI VA KORXONALAR PORTFELI",
      title: "20 yillik ishlab chiqarish va ko‘p tarmoqli ",
      titleEmphasis: "tadbirkorlik ekotizimi",
      subtitle:
        "Har bir korxona — mustaqil tizimli boshqaruv va aniq texnologik standartlarga tayangan muhandislik qolipi kabi faoliyat yuritadi. Sanoat polimerlaridan tortib xalqaro eksport konsortsiumigacha.",
      moldLegend: "SANOAT EKOTIZIMI // 7 TA MUSTAQIL TIZIM",
      filters: {
        all: "BARCHASI (7)",
        mfg: "ISHLAB CHIQARISH (3)",
        horeca: "HORECA & RESTORANLAR (2)",
        service: "B2B SERVIS & IT (1)",
        council: "SANOAT KENGASHI (1)",
      },
      detailBtn: "Batafsil dosye",
      closeBtn: "Yopish",
      modal: {
        role: "Asoschining o‘rni",
        period: "Faoliyat davri",
        sector: "Sanoat sektori",
        model: "Boshqaruv modeli",
        caps: "Texnologik va institutsional yo‘nalishlar",
        officialSite: "Rasmiy veb-sayt",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "MODUL 01 // ISHLAB CHIQARISH",
          category: "mfg",
          gridSpan: "major",
          badge: "ISHLAB CHIQARISH // ZAVOD",
          year: "2009 / 2012",
          activity: "Bolalar plastik o‘yinchoqlari fabrikasi",
          desc: "Bolalar uchun polimer o‘yinchoqlar ishlab chiqaruvchi fabrika. 2009-yildan ishlab chiqarish amaliyoti boshlangan, 2012-yilda Toybola brendi va zavod quvvatlari tashkil topgan.",
          fullDesc: "2009-yildagi dastlabki o‘yinchoq ishlab chiqarish tajribasidan boshlab, 2012-yilda zamonaviy Toybola zavod quvvatlari yo‘lga qo‘yilgan. Korxonada avtomatlashtirilgan plastik quyish texnologiyalari va standartlashtirilgan qoliplar joriy etilgan bo‘lib, operatsion jarayonlar tizimli reglamentlar asosida ishlaydi.",
          role: "Asoschi va Hammuassis",
          period: "2009-yildan faoliyat / 2012-yildan zavod",
          sector: "Polimer sanoati & O‘yinchoqlar",
          model: "Tizimli reglamentlar & Direktorlar kengashi",
          categoryBadge: "Sanoat & Polimerlar",
          tags: ["Plastik quyish", "Avtomatlashgan qoliplar", "MDH eksporti"],
          status: "Faktik maqom: Tasdiqlangan ishlab chiqarish korxonasi",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Tasdiqlangan korxona aktivi]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "MODUL 02 // KIMYO MAJMUASI",
          category: "mfg",
          gridSpan: "major",
          badge: "ISHLAB CHIQARISH // KIMYO",
          year: "2015-yildan",
          activity: "Polimer xomashyosi va rang konsentratlari",
          desc: "Polimer va plastmassa korxonalari uchun rang konsentratlari va modifikatsiyalovchi masterbatch xomashyosi ishlab chiqarish loyihasi (hammuassislik asosida).",
          fullDesc: "Sanoat miqyosidagi polimer korxonalari uchun modifikatorlar va rang beruvchi masterbatch xomashyosi ishlab chiqarish loyihasi. Hammuassislik asosida tashkil etilgan bo‘lib, mahalliy korxonalarning import xomashyoga bog‘liqligini kamaytirishga xizmat qiladi.",
          role: "Hammuassis / Hamkor",
          period: "2015-yildan buyon (Sanoat loyihasi)",
          sector: "Kimyo sanoati & Polimerlar",
          model: "B2B xomashyo ishlab chiqarish & Ta'minot",
          categoryBadge: "Kimyo Majmuasi",
          tags: ["Kimyo sanoati", "Polimer modifikatorlar", "B2B Xomashyo"],
          status: "Faktik maqom: Hammuassislikdagi sanoat loyihasi",
          hasLogo: false,
          assetLabel: "[Hammuassislikdagi sanoat loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "MODUL 03 // ELEKTROTEXNIKA",
          category: "mfg",
          gridSpan: "standard",
          badge: "ISHLAB CHIQARISH",
          year: "2018-yildan",
          activity: "Elektrotexnika va montaj uskunalari",
          desc: "Turar-joy va sanoat ob'ektlari uchun elektrotexnika, kalitlar va montaj jihozlari ishlab chiqarish loyihasi (hammuassislik asosida).",
          fullDesc: "Sanoat va maishiy ob'ektlar uchun energiya xavfsiz kalitlar, rozetkalar va elektrotexnika komponentlari ishlab chiqarish loyihasi. Hammuassislik asosida yo‘lga qo‘yilgan bo‘lib, mahsulotlar avtomatlashtirilgan montaj liniyalarida ishlab chiqariladi.",
          role: "Hammuassis / Hamkor",
          period: "2018-yildan buyon (Sanoat loyihasi)",
          sector: "Elektrotexnika sanoati",
          model: "Avtomatlashtirilgan liniyalar & B2B/B2C",
          categoryBadge: "Elektrotexnika",
          tags: ["Elektrotexnika", "Montaj liniyasi", "Xavfsizlik"],
          status: "Faktik maqom: Hammuassislikdagi sanoat loyihasi",
          hasLogo: false,
          assetLabel: "[Hammuassislikdagi sanoat loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "MODUL 04 // HORECA RESTORANLAR",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // RESTORAN",
          year: "2017-yildan",
          activity: "Turk taomlari restoranlar tarmog‘i",
          desc: "Standartlashtirilgan retseptura va oshxona tizimiga asoslangan turk taomlari restoranlar tarmog‘i. Birinchi restoran 2017-yilda ochilgan.",
          fullDesc: "Spot.uz nashriga berilgan rasmiy intervyuda qayd etilganidek, birinchi Afiyet restorani 2017-yilda ochilgan. Loyihada umumiy ovqatlanish jarayonlari qat'iy texnologik xaritalar va standartlar asosida boshqariladi.",
          role: "Asoschi va Hamkor",
          period: "2017-yildan buyon (Spot intervyusi)",
          sector: "HoReCa & Umumiy ovqatlanish",
          model: "Standartlashtirilgan oshxona tarmog‘i",
          categoryBadge: "Umumiy ovqatlanish",
          tags: ["Standart oshxona", "Fast-Casual", "Retseptura standarti"],
          status: "Faktik maqom: Tasdiqlangan restoranlar tarmog‘i",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Tasdiqlangan restoran tarmog‘i]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "MODUL 05 // HORECA KAFE",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // KAFE",
          year: "2020-yildan",
          activity: "Italyancha muzqaymoq & kafe tarmog‘i",
          desc: "Italiya retsepturasi va sovuq logistika zanjiriga asoslangan dondurma va muzqaymoq tarmog‘i. Birinchi nuqtasi 2020-yilda ochilgan.",
          fullDesc: "Spot.uz intervyusida tasdiqlanganidek, birinchi Puro 2020-yilda faoliyatini boshlagan. Tabiiy masalliqlar, italyancha retseptura va uzluksiz sovuq ta'minot zanjiri asosida faoliyat yurituvchi kafe tarmog‘i.",
          role: "Hamkor va Tashabbuskor",
          period: "2020-yildan buyon (Spot intervyusi)",
          sector: "HoReCa & Qandolatchilik",
          model: "Chakana savdo va sovuq ta'minot",
          categoryBadge: "Kafe & Qandolatchilik",
          tags: ["Sovuq logistika", "Italiya retsepturasi", "Kafe tarmog‘i"],
          status: "Faktik maqom: Tasdiqlangan kafe tarmog‘i",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Tasdiqlangan kafe aktivi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "MODUL 06 // B2B SERVIS",
          category: "service",
          gridSpan: "strategic",
          badge: "B2B SERVIS // IT TIZIMLAR",
          year: "2019-yildan",
          activity: "Korxonalarni avtomatlashtirish va IT infratuzilma",
          desc: "Korxonalarning ichki operatsion jarayonlari, ombor va boshqaruv hisobotlarini avtomatlashtirishga qaratilgan amaliy IT loyihasi.",
          fullDesc: "Ekotizimdagi sanoat korxonalari va savdo tarmoqlarini raqamlashtirish uchun shakllantirilgan operatsion IT jamoasi tashabbusi. Ichki ERP, ombor nazorati va analitik hisobotlarni avtomatlashtirishga xizmat qiladi. (Alohida dasturiy korporatsiya emas, ichki infratuzilma tashabbusi sifatida boshqariladi).",
          role: "Loyiha tashabbuskori va Tizim maslahatchisi",
          period: "2019-yildan buyon (Ichki IT tashabbus)",
          sector: "Axborot Texnologiyalari & Korporativ Servis",
          model: "ERP integratsiyasi & Jarayonlar nazorati",
          categoryBadge: "B2B Raqamli Servis",
          tags: ["ERP tizimlari", "Ombor nazorati", "Boshqaruv hisoboti"],
          status: "Faktik maqom: Ichki jarayonlarni raqamlashtirish tashabbusi",
          hasLogo: false,
          assetLabel: "[Ichki jarayonlarni raqamlashtirish tashabbusi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "UZBIC",
          code: "MODUL 07 // SANOAT KENGASHI",
          category: "council",
          gridSpan: "strategic",
          badge: "SANOAT KENGASHI // PLATFORMA",
          year: "2022-yildan",
          activity: "O‘zbekiston Biznes va Sanoat Kengashi",
          desc: "O‘zbekiston Biznes va Sanoat Kengashi — mahalliy ishlab chiqaruvchilar va eksportchilarni birlashtiruvchi mustaqil jamoat platformasi.",
          fullDesc: "2022-yilda tashkil etilgan O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) — tadbirkorlar va sanoatchilarning mustaqil jamoat platformasi. Kengash korxonalar o‘rtasida sanoat kooperatsiyasini yo‘lga qo‘yish va tashqi bozorlarga chiqishda amaliy ko‘mak beradi. (Muhim: UZBIC xususiy tijorat aktivi emas, Anvar Abduqayum raisligidagi jamoat platformasidir).",
          role: "Kengash Raisi (Jamoat maqomi)",
          period: "2022-yildan buyon (Kengash faoliyati)",
          sector: "Sanoat diplomatiyasi & Eksport platformasi",
          model: "B2B eksport konsortsiumlari",
          categoryBadge: "Sanoat Kengashi & Platforma",
          tags: ["Xalqaro eksport", "Sanoat kooperatsiyasi", "Jamoat platformasi"],
          status: "Faktik maqom: Mustaqil jamoat platformasi (Tijorat aktivi emas)",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Mustaqil jamoat platformasi // Tijorat aktivi emas]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      moduleLabel: "QOLIP №02 // TARIXIY VAQT CHIZIG'I",
      title: "Bosib o'tilgan ",
      titleEmphasis: "yo'l",
      subtitle:
        "Tadbirkorlik bir kechada shakllanmaydi. Metall qolip kabi har bir bosqichda sinovlar orqali toblanib, mukammallashib borilgan.",
      steps: [
        {
          period: "2004 — 2011",
          stageNumber: "01",
          title: "Savdo maktabi va birinchi xalqaro logistika",
          summary:
            "Bozor talabini anglash, mayda ulgurji savdo va Xitoy hamda Turkiyadan birinchi xomashyo partiyalarini olib kelish. Bozor kon'yunkturasi va mijoz psixologiyasi bo'yicha mustahkam poydevor.",
          milestone: "Dastlabki kapital va bozor ehtiyojlarini o'rganish",
          focus: "Xalqaro savdo amaliyoti",
        },
        {
          period: "2012 — 2015",
          stageNumber: "02",
          title: "Sanoatga qadam: Toybola fabrikasining tug'ilishi",
          summary:
            "Importga qaramlikni to'xtatish maqsadida birinchi sanoat qoliplari va termoplast uskunalarini xarid qilish. Toshkentda xavfsiz bolalar o'yinchoqlarini quyish bo'yicha to'liq siklli ishlab chiqarish boshlanishi.",
          milestone: "1-million dona o'yinchoq ishlab chiqarilishi",
          focus: "Plastik quyish va mahalliylashtirish",
        },
        {
          period: "2016 — 2018",
          stageNumber: "03",
          title: "Vertikal integratsiya: Xomashyo va elektrotexnika",
          summary:
            "Tashqi yetkazib beruvchilarga bog'lanib qolmaslik uchun o'z bo'yoq xomashyomiz — Samtech Masterbatches yo'lga qo'yildi. Zudlik bilan yangi tarmoq — Visage Electric elektrotexnika fabrikasi ishga tushirildi.",
          milestone: "Import xomashyosiga qaramlikni 60% ga qisqartirish",
          focus: "Zanjirli sanoat kooperatsiyasi",
        },
        {
          period: "2019 — 2021",
          stageNumber: "04",
          title: "Xizmat ko'rsatish: Qolip tamoyilining HoReCa'da sinovi",
          summary:
            "Sanoatdagi aniq reglament va standartlarni umumiy ovqatlanish sohasiga tatbiq qilish: AFIYET doner tarmog'i va PURO italyan gelateriyasi ochildi. Tizim egasisiz sifatni kafolatlashi isbotlandi.",
          milestone: "Oshpaz omiliga bog'liq bo'lmagan avtonom oshxona modeli",
          focus: "Standartlashtirish va franchayz",
        },
        {
          period: "2022 — Bugun",
          stageNumber: "05",
          title: "UZBIC va eksport kooperatsiyasi davri",
          summary:
            "Korxonalarning kundalik boshqaruvi professional direktorlar kengashiga topshirildi. Diqqat-e'tibor O'zbekiston sanoat eksportini kengaytirish, UZBIC kengashi orqali boshqa tadbirkorlarga jahon bozorlarini ochishga qaratildi.",
          milestone: "Boshqaruv to'liq korporativ tizimga o'tkazildi",
          focus: "Global eksport va strategik rivojlanish",
        },
      ],
    },
    principles: {
      moduleLabel: "QOLIP №03 // METODIK STANDART",
      title: "Qolip ",
      titleEmphasis: "tamoyili",
      subtitle:
        "Qolip nima? Bu bir marta o'ta sinchkovlik bilan loyihalanadigan va keyin egasining ishtirokisiz millionlab mukammal nusxalarni ishlab chiqaradigan tizimdir.",
      manifesto:
        "«Agar biznesingiz siz ta'tildaligingizda to'xtab qolsa — bu biznes emas, bu o'zingiz o'zingizga yaratgan ish o'rnidir. Haqiqiy tadbirkorlik — egasiga muhtoj bo'lmagan mustaqil korporativ mexanizmni qura olish san'atidir.»",
      modules: [
        {
          index: "MODUL A",
          title: "Texnologik Reglamentlar (SOP)",
          description:
            "Korxonadagi har bir qadam, stanokni yoqishdan tortib xomashyo qabul qilishgacha yozma reglamentlangan. Shaxs o'zgargani bilan qolip o'zgarmaydi — yangi xodim birinchi kundanoq standart bo'yicha ishlay oladi.",
          technicalRule: "RULE // Xodimga emas, jarayon protokoliga tayanish",
          iconType: "sop",
        },
        {
          index: "MODUL B",
          title: "Korporativ Boshqaruv Kengashi",
          description:
            "Operatsion vazifalar asoschining zimmasidan to'liq olingan. Har bir korxonada mustaqil ijrochi direktor, moliya bo'limi va nazorat kengashi mavjud bo'lib, qarorlar his-tuyg'ular bilan emas, vakolat doirasida qabul qilinadi.",
          technicalRule: "RULE // Vakolatlarni to'liq delegatsiya qilish va javobgarlik",
          iconType: "governance",
        },
        {
          index: "MODUL C",
          title: "Raqamli Ko'rsatkichlar (ERP / KPI)",
          description:
            "Har kuni soat 18:00 da zavod va omborlardagi har bir gramm xomashyo, chiqindi va tannarx ERP tizimida aks etadi. Egasi har qanday nuqtadan turib korxona sog'lig'ini 5 ta asosiy metrika orqali ko'rib turadi.",
          technicalRule: "RULE // Raqamlar bilan gaplashish, taxminlarni bekor qilish",
          iconType: "metrics",
        },
        {
          index: "MODUL D",
          title: "Madaniyat va Mas'uliyat Zanjiri",
          description:
            "Xodimlar jarayonning shunchaki ijrochisi emas, uning egalari kabi tarbiyalanadi. Qolipdagi har qanday og'ish (brak) darhol aniqlanadi va jazolash emas, tizimni takomillashtirish orqali bartaraf etiladi.",
          technicalRule: "RULE // Tizim xatosini inson aybi bilan adashtirmaslik",
          iconType: "culture",
        },
      ],
    },
    numbers: {
      moduleLabel: "QOLIP №04 // ANIQ METRIKALAR",
      title: "Raqamlar va ",
      subtitle:
        "Sanoatda so'zlar emas, stanoklar soni, eksport hajmi va mahsulot sifatining aniq raqamlari gapiradi.",
      footnote:
        "* Izoh: Raqamlar ko'rsatkichlari korxonalarning rasmiy hisobotlari asosida davriy ravishda yangilanadi (oxirgi verifikatsiya: 2026-yil holatiga).",
      counters: [
        {
          id: "experience",
          value: 20,
          suffix: "+",
          label: "Yillik amaliy tajriba",
          specification: "Sanoat, savdo va ishlab chiqarishda",
        },
        {
          id: "companies",
          value: 7,
          suffix: "",
          label: "Faoliyatdagi korxonalar",
          specification: "O'zaro bog'langan sanoat ekotizimi",
        },
        {
          id: "countries",
          value: 15,
          suffix: "+",
          label: "Eksport mamlakatlari",
          specification: "MDH, Yaqin Sharq va Yevroosiyo",
        },
        {
          id: "workplaces",
          value: 1200,
          suffix: "+",
          label: "Yaratilgan ish o'rni",
          specification: "Muhandislar, ustalar va mutaxassislar",
        },
        {
          id: "assortment",
          value: 500,
          suffix: "+",
          label: "Mahsulotlar turlari (SKU)",
          specification: "Standartlashtirilgan sanoat katalogi",
        },
      ],
    },
    exportUzbic: {
      moduleLabel: "QOLIP №05 // JAHON BOZORLARI",
      title: "Eksport geografiyasi va ",
      titleEmphasis: "UZBIC",
      subtitle:
        "Mahalliy bozor bilan cheklanib qolish — sanoat quvvatlarining imkoniyatini bo'g'ish demakdir. O'zbek mahsulotlari jahon standartlariga to'la javob beradi.",
      exportMapTitle: "MAHSULOTLARIMIZ MUNTASAM YUBORILADIGAN BOZORLAR",
      destinations: [
        "Qozog'iston",
        "Rossiya Federatsiyasi",
        "Tojikiston",
        "Qirg'iziston",
        "Ozarbayjon",
        "Gruziya",
        "Turkiya",
        "Afg'oniston",
        "Birlashgan Arab Amirliklari",
        "Belarus",
        "Mongoliya",
      ],
      uzbicCard: {
        tag: "MUSTAQIL SANOAT KENGASHI",
        name: "UZBIC (O'zbekiston Biznes va Sanoat Kengashi)",
        acronymMeaning: "Uzbekistan Business & Industry Council",
        mission:
          "O'zbekistonlik ishlab chiqaruvchilarning mahsulotlarini jahon bozorlariga olib chiqish, tashqi savdo shartnomalari tuzishda amaliy ko'mak berish va mamlakat eksport salohiyatini oshirishga yo'naltirilgan nodavlat birlashma.",
        pillars: [
          {
            title: "Xalqaro B2B Missiyalar",
            desc: "Mahalliy tadbirkorlar uchun Turkiya, Xitoy, Yevropa va arab mamlakatlariga maqsadli biznes-turlar va muzokaralar tashkil qilish.",
          },
          {
            title: "Sertifikatlash va Standartlar",
            desc: "Mahsulotlarni xalqaro ISO, Idoraviy CE va GOST talablariga moslashtirishda muhandislik maslahatlari.",
          },
          {
            title: "Yagona Eksport Konsorsiumi",
            desc: "Kichik va o'rta korxonalarni birlashtirib, xorijiy tarmoqlarga yirik partiyalarda to'g'ridan-to'g'ri ta'minot zanjirini qurish.",
          },
        ],
        linkText: "UZBIC rasmiy veb-saytiga o'tish",
        linkUrl: "https://uzbic.uz",
      },
    },
    mistakes: {
      moduleLabel: "QOLIP №06 // SAMIMIY SABOQLAR",
      title: "Mening ",
      titleEmphasis: "xatolarim",
      subtitle:
        "Hech bir qolip birinchi quyilishidayoq benuqson chiqmaydi. Eng qimmatli bilimlar — yo'qotilgan millionlar, singan qoliplar va yillar davomidagi xatolardan olingan saboqlardir.",
      intro:
        "«Intervyularda ko'pincha faqat muvaffaqiyatlar haqida gapirishadi. Lekin tadbirkorning asl kuchi uning nechta xato qilganida emas, o'sha xatolarni qanday qilib qat'iy tizimga aylantira olganida namoyon bo'ladi.»",
      lessons: [
        {
          code: "ERR-01",
          title: "«Hammasini o'zim bilaman» deb mikromenejmentga botish",
          misconception:
            "Xodimlar menga o'xshab jon kuydirmaydi, eng mayda hisob-kitob va xaridlarni ham o'zim tekshirishim kerak deb o'ylash.",
          reality:
            "Natijada asoschining vaqti to'liq mayda mayda operatsion ishlarga ketdi, strategik rivojlanish esa to'xtab qoldi. Korxona mening shaxsiy jismoniy quvvatim bilan chegaralanib qoldi.",
          moldedOutcome:
            "QOLIP YECHIMI: Vakolatlarni to'liq ajratish, lavozim yo'riqnomalarini joriy etish va operatsion boshqaruvni professional boshqaruvchilarga topshirish.",
        },
        {
          code: "ERR-02",
          title: "Shartnomasiz, faqat og'zaki do'stona ishonchga suyanish",
          misconception:
            "«Biz bir-birimizni necha yildan beri taniymiz, qog'ozbozlikning nima keragi bor» deb sheriklik va yirik to'lovlarni mustahkamlamaslik.",
          reality:
            "Kutilmagan moliyaviy qiyinchiliklar yoki tushunmovchiliklar yuzaga kelganda, nafaqat investitsiya yo'qotildi, balki ko'p yillik munosabatlar ham darz ketdi.",
          moldedOutcome:
            "QOLIP YECHIMI: Qoidalar do'stlikdan oldin qog'ozga tushishi shart. Har bir sheriklikda kutilmalar, javobgarlik va chiqish yo'llari yuridik jihatdan muhrlanadi.",
        },
        {
          code: "ERR-03",
          title: "Kechikkan tannarx hisob-kitobi va ko'rinmas chiqindilar",
          misconception:
            "Zavodda kunlik tushum katta bo'lsa, foyda ham shunga yarasha bo'ladi degan sodda ishonch.",
          reality:
            "Sanoatda grammlar va soniyalar millionlarni hal qiladi. Polimer qolipidagi mikronlik xatolik yoki elektr tebranishi oylik sof foydani butunlay yeb bitirishi mumkin.",
          moldedOutcome:
            "QOLIP YECHIMI: Har bir mahsulot bo'yicha real vaqt rejimida dinamik tannarx kalkulyatsiyasi va 24/7 avtomatlashtirilgan xomashyo nazorati.",
        },
        {
          code: "ERR-04",
          title: "Bozorsiz va sotuv zanjirisiz omborga ishlab chiqarish",
          misconception:
            "Sifatli mahsulot chiqarsak, xaridor o'zi qidirib keladi deb omborni to'ldirib tashlash.",
          reality:
            "Ishlab chiqarish quvvatlarini sotuv kanallaridan oldin kengaytirish aylanma mablag'larning omborda muzlab qolishiga olib keldi.",
          moldedOutcome:
            "QOLIP YECHIMI: Avval sotuv qolipi va distribyutsiya shartnomasi shakllanadi, keyin esa quvvatlar shunga moslab oshiriladi.",
        },
      ],
    },
    media: {
      moduleLabel: "QOLIP №07 // OAV VA RAQAMLI IZ",
      title: "Media va ",
      titleEmphasis: "intervyular",
      subtitle:
        "Sanoat rivoji, o'zbek eksporti va biznesni tizimlashtirish mavzularidagi ochiq suhbatlar hamda nufuzli matbuotdagi sharhlar.",
      youtubeHeading: "Asosiy Video Suhbatlar",
      pressHeading: "OAV va Rasmiy Nashrlarda",
      videos: [
        {
          id: "yt-1",
          title: "«Osmondagi bolalar» loyihasida Anvar Abduqayum bilan ochiq suhbat",
          channel: "Osmondagi Bolalar",
          youtubeId: "vB43H4y_3Zk",
          durationPlaceholder: "1 soat 48 daqiqa",
          topicBadge: "Sanoat va Hayotiy Darslar",
          isAvailable: false,
          statusNote: "Arxiv montaj jarayonida",
        },
        {
          id: "yt-2",
          title: "Biznesni egasisiz boshqarish: Zavodlar, qoliplar va eksport sirlari",
          channel: "Tadbirkor Kundaligi",
          youtubeId: "J2X5mJ3HDYE",
          durationPlaceholder: "54 daqiqa",
          topicBadge: "Tizimli Boshqaruv",
          isAvailable: true,
          statusNote: "Format: 1080p // Ochiq suhbat",
        },
        {
          id: "yt-3",
          title: "O'zbekistonda bolalar o'yinchoqlari sanoati qanday qurildi? Toybola tajribasi",
          channel: "Biznes Vaqt",
          youtubeId: "dFq5z_x3A_I",
          durationPlaceholder: "1 soat 12 daqiqa",
          topicBadge: "Toybola Zavodi Turi",
          isAvailable: false,
          statusNote: "Arxiv montaj jarayonida",
        },
      ],
      pressMentions: [
        {
          id: "press-1",
          outlet: "Gazeta.uz",
          articleTitle: "«O'zbek o'yinchoqlari qanday qilib mintaqa bozorlarini egallamoqda?»",
          datePlaceholder: "Arxiv materiali",
          url: "https://gazeta.uz",
          publicationType: "Tahliliy Maqola",
        },
        {
          id: "press-2",
          outlet: "Kun.uz",
          articleTitle: "UZBIC kengashi: Mahalliy ishlab chiqaruvchilar uchun yangi eksport eshiklari",
          datePlaceholder: "Rasmiy bayonot",
          url: "https://kun.uz",
          publicationType: "Intervyu va Hisobot",
        },
        {
          id: "press-3",
          outlet: "Spot.uz",
          articleTitle: "Import o'rnini bosuvchi polimer ishlab chiqarish va texnologik qoliplar",
          datePlaceholder: "Biznes tahlil",
          url: "https://spot.uz",
          publicationType: "Sanoat sharhi",
        },
        {
          id: "press-4",
          outlet: "Daryo.uz",
          articleTitle: "Boshqaruvda shaxs omilidan tizimga o'tish: Anvar Abduqayum bilan suhbat",
          datePlaceholder: "Eksklyuziv",
          url: "https://daryo.uz",
          publicationType: "Maxsus loyiha",
        },
      ],
    },
    contact: {
      moduleLabel: "QOLIP №08 // BOG'LANISH PROTOKOLI",
      title: "To'g'ridan-to'g'ri ",
      titleEmphasis: "aloqa",
      subtitle:
        "Sanoat kooperatsiyasi, eksport hamkorligi va UZBIC loyihalari bo'yicha rasmiy muloqot kanali.",
      directTitle: "Birlamchi va tezkor aloqa",
      directText:
        "Eng tezkor va samarali muloqot Telegram orqali amalga oshiriladi. Shuningdek, quyidagi rasmiy shakl orqali murojaat qoldirishingiz mumkin.",
      form: {
        nameLabel: "Ismingiz yoki Tashkilotingiz nomi",
        namePlaceholder: "Masalan: Jamshid Aliyev (Zavod direktori)",
        topicLabel: "Murojaat yo'nalishi",
        topicOptions: [
          { id: "coop", label: "Sanoat kooperatsiyasi va yetkazib berish" },
          { id: "uzbic", label: "UZBIC kengashiga a'zolik va eksport" },
          { id: "press", label: "OAV, intervyu va ma'ruza takliflari" },
          { id: "other", label: "Boshqa rasmiy takliflar" },
        ],
        phoneLabel: "Telefon raqamingiz",
        phonePlaceholder: "+998 (90) 123-45-67",
        messageLabel: "Murojaatingizning qisqacha mazmuni",
        messagePlaceholder:
          "Loyihangiz, hamkorlik taklifingiz yoki qiziqtirgan masalani bayon qiling...",
        submitButton: "Murojaatni yuborish",
        submitting: "Yuborilmoqda...",
        successMessage:
          "Murojaatingiz qabul qilindi. Tez orada mas'ul vakillarimiz siz bilan bog'lanishadi.",
        errorMessage:
          "Xatolik yuz berdi. Iltimos, Telegram orqali to'g'ridan-to'g'ri yozing.",
      },
      socials: {
        telegram: "https://t.me/anvar_abduqayum_admin",
        instagram: "https://www.instagram.com/anvar_abduqayum",
        youtube: "https://www.youtube.com/@AnvarAbduqayum",
        linkedin: "https://www.linkedin.com/in/anvar-abduqayum",
      },
    },
    mobileStickyBar: {
      telegramLabel: "Telegramda yozish",
      callLabel: "Qo'ng'iroq",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Sanoat ishlab chiqarishi, eksport va avtonom boshqaruv tizimlari.",
      licenseSpec: "QOLIP SISTEMASI // VERSIYA 1.0 // BARCHA HUQUQLAR HIMOYA QILINGAN",
      rightsReserved: "Barcha huquqlar himoyalangan.",
      blueprintStamp: "SERIYA № AA-2026-UZ // MOLD INDUSTRIAL SYSTEM",
    },
  },
  ru: {
    meta: {
      siteTitle: "Анвар Абдукаюм | Промышленник, Производитель и Основатель",
      siteDescription:
        "Персональное портфолио узбекского предпринимателя и промышленника Анвара Абдукаюма. 7 предприятий, концепция «Колип» (Пресс-форма) и экспортные системы.",
      founderName: "Анвар Абдукаюм",
      founderRole: "Промышленник, Предприниматель-инженер",
      founderTagline: "Бизнес — это надежная пресс-форма, работающая без присутствия владельца.",
    },
    navigation: {
      portfolio: "Бизнесы",
      timeline: "Деятельность",
      principles: "Принцип «Колип»",
      numbers: "Цифры",
      exportUzbic: "Экспорт и UZBIC",
      mistakes: "Мои ошибки",
      media: "Медиа",
      contact: "Контакты",
      ctaButton: "Забронировать встречу",
      consulting: "Услуги",
      bookingCta: "Забронировать встречу",
    },
    hero: {
      moduleLabel: "ПРЕСС-ФОРМА №00 // ГЛАВНАЯ МАТРИЦА",
      statusBadge: "ПРОМЫШЛЕННАЯ И ЭКСПОРТНАЯ ЭКОСИСТЕМА",
      dimensionSpec: "СТАНДАРТ: ISO / ГОСТ 2026 // СЕРИЯ: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Работающие без владельца",
      headlineSuffix: " системы и промышленное управление.",
      summary:
        "Анвар Абдукаюм — основатель Toybola Toys, Samtech Masterbatches, Visage Electric и UZBIC. На основе практической дисциплины производства и экспорта выведите бизнес из операционной рутины в автономную систему.",
      ctaPrimary: "Забронировать встречу",
      ctaSecondary: "Услуги и программы",
      portraitCaption: "Анвар Абдукаюм",
      blueprintDimensions: {
        width: "МНОГООТРАСЛЕВОЙ",
        tolerance: "СНГ И МИР",
        standard: "ОПЫТ С 2005 ГОДА",
      },
      kickerBadge: "МОНОГРАФИЯ // ПРОМЫШЛЕННОСТЬ И УПРАВЛЕНИЕ",
      kickerText: "Ташкент • 2026",
      verifiedMetrics: [
        {
          value: "С 2004 года",
          label: "Торговая и международная практика",
        },
        {
          value: "С 2012 года",
          label: "Создание фабрики Toybola",
        },
        {
          value: "7 систем",
          label: "Промышленность, полимеры, HoReCa и IT-инициатива",
        },
      ],
      portraitRole: "Промышленник, Инженер-Предприниматель",
      portraitBadge: "АРХИВНЫЙ АССЕТ // ВРЕМЕННОЕ ФОТО",
      portraitNote: "[Архивная фотография // Временный визуальный ассет • В будущем будет заменена утвержденной фотосессией]",
      brands: [
        "TOYBOLA TOYS",
        "SAMTECH MASTERBATCHES",
        "VISAGE ELECTRIC",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      eyebrow: "Досье Услуг и Консалтинга",
      title: "4 стратегических направления для владельцев бизнеса и производств",
      subtitle:
        "Каждая программа основана на 20-летней практике предпринимателя. От системного управления до модернизации производств и выхода на экспорт.",
      labels: {
        programSpec: "СПЕЦИФИКАЦИЯ ПРОГРАММЫ",
        format: "ФОРМАТ",
        audience: "Целевая аудитория",
        overview: "Обзор программы",
        focusAreas: "Ключевые направления",
        ctaText: "Забронировать встречу",
      },
      services: [
        {
          id: "governance",
          code: "ПРОГРАММА 01 // INDIVIDUAL GOVERNANCE",
          name: "Управление бизнесом и делегирование",
          shortSummary:
            "Выход основателя из операционной рутины и формирование автономной структуры управления.",
          audience:
            "Предприниматели и основатели, стремящиеся вывести компанию из операционной рутины в автономную систему",
          overview:
            "Освобождение основателя от повседневного микроменеджмента, выстраивание надежных механизмов делегирования и формирование управленческой структуры, опирающейся на четкие стандарты, а не на человеческий фактор.",
          focusAreas: [
            "Разграничение операционного управления и стратегических задач",
            "Поэтапная передача полномочий и ответственности ключевым руководителям",
            "Система неизменных регламентов, обеспечивающая стабильную работу без владельца",
          ],
          format: "Индивидуальный формат / Практические сессии",
          ctaText: "Записаться на консультацию",
        },
        {
          id: "manufacturing",
          code: "ПРОГРАММА 02 // INDUSTRIAL ENGINEERING",
          name: "Оптимизация производственных процессов",
          shortSummary:
            "Технологические регламенты (SOP), аудит себестоимости и минимизация брака.",
          audience:
            "Промышленники, расширяющие заводы и стремящиеся оптимизировать себестоимость продукции",
          overview:
            "Анализ и практические рекомендации на основе 20-летнего заводского опыта: внедрение стандартных регламентов (SOP), технологических карт и минимизация потерь сырья.",
          focusAreas: [
            "Технологические регламенты (SOP) и контроль расхода сырья",
            "Анализ эффективности загрузки производственного оборудования",
            "Методы снижения брака и оптимизации производственных циклов",
          ],
          format: "Практический анализ производственного предприятия",
          ctaText: "Записаться на консультацию",
        },
        {
          id: "export",
          code: "ПРОГРАММА 03 // GLOBAL EXPANSION",
          name: "Экспортная кооперация UZBIC",
          shortSummary:
            "Вывод отечественной продукции на зарубежные рынки и B2B-консорциумы.",
          audience:
            "Экспортеры, планирующие выход на внешние рынки или расширение географии поставок",
          overview:
            "Обмен опытом в рамках Делового и Промышленного Совета Узбекистана (UZBIC): международная стандартизация, установление прямых связей с зарубежными байерами и построение каналов ВЭД.",
          focusAreas: [
            "Адаптация продукции под международные стандарты и сертификацию",
            "Стратегия выхода на рынки СНГ и дальнего зарубежья",
            "B2B-кооперация и механизмы экспортных консорциумов",
          ],
          format: "Консультация в рамках Совета UZBIC",
          ctaText: "Запрос по экспорту",
        },
        {
          id: "diagnostic",
          code: "ПРОГРАММА 04 // DIAGNOSTIC ENTRY",
          name: "Первичная стратегическая консультация",
          shortSummary:
            "Определение 3 ключевых узких мест компании и оперативный план действий.",
          audience:
            "Предприниматели, желающие выявить узкие места в бизнесе и определить приоритетные шаги",
          overview:
            "20-минутная вводная диагностика: анализ текущего состояния компании, определение ключевых барьеров в процессах или управлении и формирование рекомендаций.",
          focusAreas: [
            "Первичная экспресс-диагностика процессов компании",
            "Определение барьеров в операционном управлении или производстве",
            "Практические ориентиры и выбор формата взаимодействия",
          ],
          format: "20-минутная онлайн-диагностика",
          ctaText: "Записаться на диагностику",
        },
      ],
    },
    portfolio: {
      moduleLabel: "МОДУЛЬ 02 // БИЗНЕС-ЭКОСИСТЕМА",
      eyebrow: "БИЗНЕС-ЭКОСИСТЕМА И ПОРТФЕЛЬ ПРЕДПРИЯТИЙ",
      title: "20 лет производственной практики и ",
      titleEmphasis: "многоотраслевая экосистема",
      subtitle:
        "Каждое предприятие функционирует как автономный инженерный модуль на основе четких регламентов. От полимерного производства до международного экспортного консорциума.",
      moldLegend: "ПРОМЫШЛЕННАЯ ЭКОСИСТЕМА // 7 АВТОНОМНЫХ СИСТЕМ",
      filters: {
        all: "ВСЕ (7)",
        mfg: "ПРОИЗВОДСТВО (3)",
        horeca: "HORECA И РЕСТОРАНЫ (2)",
        service: "B2B СЕРВИС И IT (1)",
        council: "ПРОМЫШЛЕННЫЙ СОВЕТ (1)",
      },
      detailBtn: "Подробное досье",
      closeBtn: "Закрыть",
      modal: {
        role: "Роль основателя",
        period: "Период деятельности",
        sector: "Промышленный сектор",
        model: "Модель управления",
        caps: "Технологические и отраслевые направления",
        officialSite: "Официальный сайт",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "МОДУЛЬ 01 // ПРОИЗВОДСТВО",
          category: "mfg",
          gridSpan: "major",
          badge: "ПРОИЗВОДСТВО // ЗАВОД",
          year: "2009 / 2012",
          activity: "Фабрика детских пластиковых игрушек",
          desc: "Фабрика полимерных игрушек для детей. Практика производства начата в 2009 году, бренд Toybola и заводские мощности созданы в 2012 году.",
          fullDesc: "Начиная с первых производственных практик 2009 года, в 2012 году были запущены заводские мощности Toybola. Внедрены автоматизированные термопластавтоматы и регламентированные процессы, обеспечивающие автономное операционное управление.",
          role: "Основатель и Соучредитель",
          period: "С 2009 деят-сть / с 2012 завод",
          sector: "Полимерная индустрия & Игрушки",
          model: "Регламентированное управление & Совет",
          categoryBadge: "Промышленность & Полимеры",
          tags: ["Литье пластмасс", "Автоматизированные пресс-формы", "Экспорт в СНГ"],
          status: "Фактический статус: Подтвержденное действующее производство",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Подтвержденный производственный актив]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "МОДУЛЬ 02 // ХИМКОМПЛЕКС",
          category: "mfg",
          gridSpan: "major",
          badge: "ПРОИЗВОДСТВО // ХИМИЯ",
          year: "С 2015 года",
          activity: "Полимерное сырье и концентраты красителей",
          desc: "Проект по производству концентратов красителей и модифицирующих суперконцентратов (мастербатчей) для полимерных предприятий (в партнерстве).",
          fullDesc: "Производственный проект по выпуску модификаторов и красителей для полимерных предприятий. Создан на основе соучредительства для оптимизации сырьевой себестоимости предприятий.",
          role: "Соучредитель / Партнер",
          period: "С 2015 года (Промышленный проект)",
          sector: "Химическая промышленность & Полимеры",
          model: "B2B производство сырья и поставки",
          categoryBadge: "Химический Комплекс",
          tags: ["Химпром", "Модификаторы полимеров", "B2B Сырье"],
          status: "Фактический статус: Партнерский производственный проект",
          hasLogo: false,
          assetLabel: "[Партнерский производственный проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "МОДУЛЬ 03 // ЭЛЕКТРОТЕХНИКА",
          category: "mfg",
          gridSpan: "standard",
          badge: "ПРОИЗВОДСТВО",
          year: "С 2018 года",
          activity: "Электротехника и монтажное оборудование",
          desc: "Проект по производству электротехнических изделий, выключателей и монтажных компонентов (в партнерстве).",
          fullDesc: "Производственный проект по выпуску электроустановочных изделий и выключателей. Реализован на партнерских началах с автоматизированными сборочными линиями.",
          role: "Соучредитель / Партнер",
          period: "С 2018 года (Промышленный проект)",
          sector: "Электротехническая отрасль",
          model: "Автоматизированные линии & B2B/B2C",
          categoryBadge: "Электротехника",
          tags: ["Электротехника", "Сборочные линии", "Стандарты безопасности"],
          status: "Фактический статус: Партнерский производственный проект",
          hasLogo: false,
          assetLabel: "[Партнерский производственный проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "МОДУЛЬ 04 // HORECA РЕСТОРАНЫ",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // РЕСТОРАН",
          year: "С 2017 года",
          activity: "Сеть ресторанов турецкой кухни",
          desc: "Сеть ресторанов турецкой кухни на основе стандартизированной рецептуры. Первый ресторан открыт в 2017 году.",
          fullDesc: "Как подтверждено в официальном интервью Spot.uz, первый ресторан Afiyet открылся в 2017 году. Все кулинарные и операционные процессы регламентированы технологическими картами.",
          role: "Основатель и Партнер",
          period: "С 2017 года (Интервью Spot)",
          sector: "HoReCa & Общественное питание",
          model: "Стандартизированная кухонная сеть",
          categoryBadge: "Общественное питание",
          tags: ["Стандартная кухня", "Fast-Casual", "Технологические карты"],
          status: "Фактический статус: Подтвержденная сеть ресторанов",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Подтвержденный ресторанный актив]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "МОДУЛЬ 05 // HORECA КАФЕ",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // КАФЕ",
          year: "С 2020 года",
          activity: "Итальянское мороженое & сеть кафе",
          desc: "Сеть джелатерий на основе итальянских рецептур и непрерывной холодовой цепи. Первая точка открыта в 2020 году.",
          fullDesc: "Согласно данным интервью Spot.uz, первая джелатерия Puro открылась в 2020 году. Проект основан на натуральных ингредиентах, итальянской рецептуре и контролируемой холодовой цепи.",
          role: "Партнер и Инициатор",
          period: "С 2020 года (Интервью Spot)",
          sector: "HoReCa & Кондитерские изделия",
          model: "Розничные точки и холодовая логистика",
          categoryBadge: "Кафе & Кондитерская",
          tags: ["Холодовая логистика", "Итальянская рецептура", "Сеть кафе"],
          status: "Фактический статус: Подтвержденная сеть кафе",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Подтвержденный актив сети кафе]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "МОДУЛЬ 06 // B2B СЕРВИС",
          category: "service",
          gridSpan: "strategic",
          badge: "B2B СЕРВИС // IT СИСТЕМЫ",
          year: "С 2019 года",
          activity: "Автоматизация предприятий и IT инфраструктура",
          desc: "Прикладной IT-проект по автоматизации операционных процессов, складского учета и управленческой отчетности предприятий.",
          fullDesc: "Операционная IT-инициатива, созданная для автоматизации внутренних процессов, ERP и складского учета партнерских предприятий. (Управляется как внутренняя инфраструктурная инициатива, а не отдельная ИТ-корпорация).",
          role: "Инициатор проекта и Консультант по системам",
          period: "С 2019 года (Внутренняя IT-инициатива)",
          sector: "Информационные технологии & Корпоративный сервис",
          model: "Внедрение ERP & Контроль процессов",
          categoryBadge: "B2B Цифровой Сервис",
          tags: ["ERP системы", "Складской учет", "Управленческая аналитика"],
          status: "Фактический статус: Внутренняя инициатива цифровизации",
          hasLogo: false,
          assetLabel: "[Внутренняя инициатива цифровизации]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "UZBIC",
          code: "МОДУЛЬ 07 // ПРОМЫШЛЕННЫЙ СОВЕТ",
          category: "council",
          gridSpan: "strategic",
          badge: "ПРОМЫШЛЕННЫЙ СОВЕТ // ПЛАТФОРМА",
          year: "С 2022 года",
          activity: "Деловой и промышленный совет Узбекистана",
          desc: "Деловой и промышленный совет Узбекистана — независимая общественная платформа, объединяющая местных производителей и экспортеров.",
          fullDesc: "Созданный в 2022 году Деловой и промышленный совет Узбекистана (UZBIC) — независимая общественная платформа предпринимателей и промышленников. (Важно: UZBIC не является частным коммерческим активом, а действует как общественная организация под председательством Анвара Абдукаюма).",
          role: "Председатель Совета (Общественный статус)",
          period: "С 2022 года (Деятельность Совета)",
          sector: "Промышленная дипломатия & Экспортная платформа",
          model: "B2B экспортные консорциумы",
          categoryBadge: "Промышленный Совет & Платформа",
          tags: ["Международный экспорт", "Кооперация", "Общественная платформа"],
          status: "Фактический статус: Общественная платформа (Не коммерческий актив)",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Общественная платформа // Не коммерческий актив]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      moduleLabel: "ПРЕСС-ФОРМА №02 // ХРОНИКА РАЗВИТИЯ",
      title: "Пройденный ",
      titleEmphasis: "путь",
      subtitle:
        "Предпринимательство не строится за одну ночь. Подобно стальной форме, система закалялась на каждом этапе через опыт и испытания.",
      steps: [
        {
          period: "2004 — 2011",
          stageNumber: "01",
          title: "Школа торговли и первая международная логистика",
          summary:
            "Оптовая торговля, первые поставки сырья из Китая и Турции. Изучение конъюнктуры рынка, психологии клиентов и накопление первоначального капитала.",
          milestone: "Формирование стартового капитала и каналов сбыта",
          focus: "Международная торговля",
        },
        {
          period: "2012 — 2015",
          stageNumber: "02",
          title: "Шаг в промышленность: Рождение фабрики Toybola",
          summary:
            "Приобретение первых пресс-форм и термопластавтоматов для снижения зависимости от импорта. Запуск полного цикла выпуска безопасных пластиковых игрушек в Ташкенте.",
          milestone: "Выпуск 1-го миллиона детских игрушек",
          focus: "Литье пластика и локализация",
        },
        {
          period: "2016 — 2018",
          stageNumber: "03",
          title: "Вертикальная интеграция: Сырье и электротехника",
          summary:
            "Для обеспечения собственных нужд запущено производство красителей Samtech Masterbatches. Вскоре открылась фабрика электротехнических изделий Visage Electric.",
          milestone: "Снижение зависимости от импортного сырья на 60%",
          focus: "Цепочки промышленной кооперации",
        },
        {
          period: "2019 — 2021",
          stageNumber: "04",
          title: "Сфера услуг: Испытание принципа «Колип» в общепите",
          summary:
            "Внедрение промышленных регламентов в ресторанную сферу: открытие сети AFIYET и джелатерии PURO. Доказана автономность стандартов без личного контроля владельца.",
          milestone: "Модель кухни, не зависящая от человеческого фактора",
          focus: "Стандартизация и франшиза",
        },
        {
          period: "2022 — Сегодня",
          stageNumber: "05",
          title: "Эпоха UZBIC и масштабирование экспорта",
          summary:
            "Оперативное управление передано совету директоров. Фокус сосредоточен на расширении узбекского экспорта и открытии глобальных рынков через деловой совет UZBIC.",
          milestone: "Полный переход к корпоративному управлению",
          focus: "Глобальный экспорт и стратегия",
        },
      ],
    },
    principles: {
      moduleLabel: "ПРЕСС-ФОРМА №03 // МЕТОДОЛОГИЯ СИСТЕМЫ",
      title: "Принцип ",
      titleEmphasis: "«Колип»",
      subtitle:
        "Что такое пресс-форма? Это система, которая проектируется один раз с максимальной точностью и затем производит миллионы идеальных копий без участия создателя.",
      manifesto:
        "«Если ваш бизнес останавливается во время вашего отпуска — это не бизнес, это лишь рабочее место, созданное вами для себя. Настоящее предпринимательство — это умение создать механизм, который не нуждается в вашем ежедневном присутствии.»",
      modules: [
        {
          index: "МОДУЛЬ A",
          title: "Технологические регламенты (SOP)",
          description:
            "Каждое действие зафиксировано в письменных регламентах. Смена сотрудников не ломает форму — новый специалист работает по четкому стандарту с первого дня.",
          technicalRule: "RULE // Опора на протокол процесса, а не на личности",
          iconType: "sop",
        },
        {
          index: "МОДУЛЬ B",
          title: "Совет корпоративного управления",
          description:
            "Операционные функции полностью сняты с основателя. На каждом предприятии работают генеральный директор, финотдел и совет директоров с четким разделением полномочий.",
          technicalRule: "RULE // Полное делегирование и подотчетность",
          iconType: "governance",
        },
        {
          index: "МОДУЛЬ C",
          title: "Цифровой контроль (ERP / KPI)",
          description:
            "Каждый день в 18:00 каждый грамм сырья и себестоимость отражаются в ERP-системе. Состояние заводов оценивается по объективным ключевым метрикам.",
          technicalRule: "RULE // Управление на основе цифр, а не догадок",
          iconType: "metrics",
        },
        {
          index: "МОДУЛЬ D",
          title: "Культура и цепочка ответственности",
          description:
            "Сотрудники обучаются быть хозяевами своего процесса. Любые отклонения в качестве немедленно устраняются через доработку системы, а не поиск виновных.",
          technicalRule: "RULE // Не путать сбой системы с виной человека",
          iconType: "culture",
        },
      ],
    },
    numbers: {
      moduleLabel: "ПРЕСС-ФОРМА №04 // ТОЧНЫЕ МЕТРИКИ",
      title: "Цифры и ",
      subtitle:
        "В промышленности говорят не громкие слова, а число станков, объем экспорта и проверенные показатели выпуска.",
      footnote:
        "* Примечание: Показатели периодически актуализируются на основе отчетов предприятий (последняя верификация: 2026 г.).",
      counters: [
        {
          id: "experience",
          value: 20,
          suffix: "+",
          label: "Лет практического опыта",
          specification: "В промышленности, торговле и управлении",
        },
        {
          id: "companies",
          value: 7,
          suffix: "",
          label: "Действующих предприятий",
          specification: "Связанная промышленная экосистема",
        },
        {
          id: "countries",
          value: 15,
          suffix: "+",
          label: "Стран экспорта",
          specification: "СНГ, Ближний Восток, Евразия",
        },
        {
          id: "workplaces",
          value: 1200,
          suffix: "+",
          label: "Созданных рабочих мест",
          specification: "Инженеры, мастера и специалисты",
        },
        {
          id: "assortment",
          value: 500,
          suffix: "+",
          label: "Наименований продукции (SKU)",
          specification: "Стандартизированный каталог",
        },
      ],
    },
    exportUzbic: {
      moduleLabel: "ПРЕСС-ФОРМА №05 // МИРОВЫЕ РЫНКИ",
      title: "География экспорта и ",
      titleEmphasis: "UZBIC",
      subtitle:
        "Ограничиваться только внутренним рынком — значит сдерживать потенциал заводов. Продукция из Узбекистана конкурентоспособна на глобальной арене.",
      exportMapTitle: "ОСНОВНЫЕ СТРАНЫ РЕГУЛЯРНЫХ ПОСТАВОК ПРОДУКЦИИ",
      destinations: [
        "Казахстан",
        "Российская Федерация",
        "Таджикистан",
        "Кыргызстан",
        "Азербайджан",
        "Грузия",
        "Турция",
        "Афганистан",
        "Объединенные Арабские Эмираты",
        "Беларусь",
        "Монголия",
      ],
      uzbicCard: {
        tag: "НЕЗАВИСИМЫЙ ПРОМЫШЛЕННЫЙ СОВЕТ",
        name: "UZBIC (Узбекский Деловой и Промышленный Совет)",
        acronymMeaning: "Uzbekistan Business & Industry Council",
        mission:
          "Негосударственное объединение для вывода узбекских производителей на мировые рынки, заключения внешнеторговых контрактов и развития экспорта.",
        pillars: [
          {
            title: "Международные B2B миссии",
            desc: "Организация целевых бизнес-туров и переговоров для предпринимателей в Турции, Китае, Европе и арабских странах.",
          },
          {
            title: "Сертификация и стандарты",
            desc: "Инженерная поддержка при адаптации продукции под международные требования ISO, CE и ГОСТ.",
          },
          {
            title: "Единый экспортный консорциум",
            desc: "Объединение малых и средних предприятий для прямых поставок крупными партиями в зарубежные сети.",
          },
        ],
        linkText: "Перейти на официальный сайт UZBIC",
        linkUrl: "https://uzbic.uz",
      },
    },
    mistakes: {
      moduleLabel: "ПРЕСС-ФОРМА №06 // ЧЕСТНЫЕ УРОКИ",
      title: "Мои ",
      titleEmphasis: "ошибки",
      subtitle:
        "Ни одна пресс-форма не получается идеальной с первой попытки. Самый ценный опыт — это миллионные потери, треснувшие формы и уроки многолетней практики.",
      intro:
        "«В интервью часто говорят только об успехах. Но истинная сила предпринимателя проявляется в том, как он превращает свои ошибки в непоколебимую систему.»",
      lessons: [
        {
          code: "ERR-01",
          title: "Микроменеджмент: «Я сделаю все лучше сам»",
          misconception:
            "Уверенность в том, что сотрудники не переживают за дело так же, и нужно лично контролировать каждую мелочь.",
          reality:
            "Время основателя уходило на рутину, стратегический рост остановился, а масштаб компании уперся в физический ресурс одного человека.",
          moldedOutcome:
            "РЕШЕНИЕ: Четкое разделение полномочий, регламенты и передача операционки профессиональным топ-менеджерам.",
        },
        {
          code: "ERR-02",
          title: "Работа на доверии без юридических соглашений",
          misconception:
            "«Мы знаем друг друга много лет, зачем нам формальности и кипы бумаг».",
          reality:
            "При первых серьезных финансовых разногласиях были потеряны не только крупные инвестиции, но и многолетняя дружба.",
          moldedOutcome:
            "РЕШЕНИЕ: Правила фиксируются на бумаге до начала дружбы. Все обязательства и условия выхода строго закрепляются юридически.",
        },
        {
          code: "ERR-03",
          title: "Запоздалый расчет себестоимости и скрытый брак",
          misconception:
            "Убеждение, что при высоком ежедневном обороте прибыль гарантирована автоматически.",
          reality:
            "В производстве миллионы решают граммы и секунды. Ошибка в пресс-форме или скачки сырья способны полностью свести чистую прибыль к нулю.",
          moldedOutcome:
            "РЕШЕНИЕ: Динамический расчет себестоимости в реальном времени и автоматизированный контроль сырья 24/7.",
        },
        {
          code: "ERR-04",
          title: "Работа «на склад» без гарантированных каналов сбыта",
          misconception:
            "Уверенность, что качественный товар клиенты найдут и раскупят сами.",
          reality:
            "Расширение мощностей раньше каналов продаж привело к замораживанию оборотного капитала на складах.",
          moldedOutcome:
            "РЕШЕНИЕ: Сначала формируется матрица сбыта и контракты с дистрибьюторами, затем под них наращиваются мощности.",
        },
      ],
    },
    media: {
      moduleLabel: "ПРЕСС-ФОРМА №07 // ЦИФРОВОЙ СЛЕД",
      title: "Медиа и ",
      titleEmphasis: "интервью",
      subtitle:
        "Открытые выступления о развитии промышленности, экспорте и системном управлении бизнесом.",
      youtubeHeading: "Ключевые Видео Интервью",
      pressHeading: "В СМИ и Официальных Изданиях",
      videos: [
        {
          id: "yt-1",
          title: "Откровенное интервью с Анваром Абдукаюмом в проекте «Osmondagi bolalar»",
          channel: "Osmondagi Bolalar",
          youtubeId: "vB43H4y_3Zk",
          durationPlaceholder: "1 час 48 минут",
          topicBadge: "Промышленность и жизнь",
          isAvailable: false,
          statusNote: "В процессе монтажа архива",
        },
        {
          id: "yt-2",
          title: "Бизнес без владельца: Заводы, пресс-формы и секреты экспорта",
          channel: "Дневник Предпринимателя",
          youtubeId: "J2X5mJ3HDYE",
          durationPlaceholder: "54 минуты",
          topicBadge: "Системное управление",
          isAvailable: true,
          statusNote: "Формат: 1080p // Открытая беседа",
        },
        {
          id: "yt-3",
          title: "Как строилось производство игрушек в Узбекистане? Опыт Toybola",
          channel: "Бизнес Время",
          youtubeId: "dFq5z_x3A_I",
          durationPlaceholder: "1 час 12 минут",
          topicBadge: "Тур по заводу Toybola",
          isAvailable: false,
          statusNote: "В процессе монтажа архива",
        },
      ],
      pressMentions: [
        {
          id: "press-1",
          outlet: "Gazeta.uz",
          articleTitle: "«Как узбекские игрушки выходят на региональные рынки?»",
          datePlaceholder: "Архив",
          url: "https://gazeta.uz",
          publicationType: "Аналитическая статья",
        },
        {
          id: "press-2",
          outlet: "Kun.uz",
          articleTitle: "Совет UZBIC: Новые экспортные окна для местных производителей",
          datePlaceholder: "Заявление",
          url: "https://kun.uz",
          publicationType: "Интервью и отчет",
        },
        {
          id: "press-3",
          outlet: "Spot.uz",
          articleTitle: "Импортозамещение в полимерах и технологические пресс-формы",
          datePlaceholder: "Анализ рынка",
          url: "https://spot.uz",
          publicationType: "Обзор промышленности",
        },
        {
          id: "press-4",
          outlet: "Daryo.uz",
          articleTitle: "Переход от человека к системе: Беседа с Анваром Абдукаюмом",
          datePlaceholder: "Эксклюзив",
          url: "https://daryo.uz",
          publicationType: "Спецпроект",
        },
      ],
    },
    contact: {
      moduleLabel: "ПРЕСС-ФОРМА №08 // ПРОТОКОЛ СВЯЗИ",
      title: "Прямая ",
      titleEmphasis: "связь",
      subtitle:
        "Официальный канал для вопросов промышленной кооперации, экспорта и участия в проектах UZBIC.",
      directTitle: "Быстрый канал коммуникации",
      directText:
        "Наиболее оперативная связь осуществляется через Telegram. Также вы можете отправить обращение через форму ниже.",
      form: {
        nameLabel: "Ваше имя или Название организации",
        namePlaceholder: "Например: Жамшид Алиев (Директор завода)",
        topicLabel: "Тема обращения",
        topicOptions: [
          { id: "coop", label: "Промышленная кооперация и поставки" },
          { id: "uzbic", label: "Членство в совете UZBIC и экспорт" },
          { id: "press", label: "СМИ, интервью и выступления" },
          { id: "other", label: "Другие официальные предложения" },
        ],
        phoneLabel: "Номер телефона",
        phonePlaceholder: "+998 (90) 123-45-67",
        messageLabel: "Краткая суть обращения",
        messagePlaceholder: "Опишите ваш проект, предложение о сотрудничестве или вопрос...",
        submitButton: "Отправить обращение",
        submitting: "Отправка...",
        successMessage: "Ваше обращение принято. Мы свяжемся с вами в ближайшее время.",
        errorMessage: "Произошла ошибка. Пожалуйста, напишите напрямую в Telegram.",
      },
      socials: {
        telegram: "https://t.me/anvar_abduqayum_admin",
        instagram: "https://www.instagram.com/anvar_abduqayum",
        youtube: "https://www.youtube.com/@AnvarAbduqayum",
        linkedin: "https://www.linkedin.com/in/anvar-abduqayum",
      },
    },
    mobileStickyBar: {
      telegramLabel: "Написать в Telegram",
      callLabel: "Позвонить",
    },
    footer: {
      founderName: "Анвар Абдукаюм",
      tagline: "Промышленное производство, экспорт и системы автономного управления.",
      licenseSpec: "СИСТЕМА «КОЛИП» // ВЕРСИЯ 1.0 // ВСЕ ПРАВА ЗАЩИЩЕНЫ",
      rightsReserved: "Все права защищены.",
      blueprintStamp: "СЕРИЯ № AA-2026-UZ // MOLD INDUSTRIAL SYSTEM",
    },
  },
  en: {
    meta: {
      siteTitle: "Anvar Abduqayum | Industrialist, Manufacturer & Founder",
      siteDescription:
        "Official portfolio of Uzbek entrepreneur and manufacturer Anvar Abduqayum. 7 industrial enterprises, 'Qolip' (Mold) management framework, and global export ecosystems.",
      founderName: "Anvar Abduqayum",
      founderRole: "Industrialist & Engineer-Entrepreneur",
      founderTagline: "A business is a resilient mold designed to run flawlessly without its founder.",
    },
    navigation: {
      portfolio: "Businesses",
      timeline: "Track Record",
      principles: "The Mold Principle",
      numbers: "Numbers",
      exportUzbic: "Export & UZBIC",
      mistakes: "Honest Lessons",
      media: "Media",
      contact: "Contact",
      ctaButton: "Book a Consultation",
      consulting: "Services",
      bookingCta: "Book a Consultation",
    },
    hero: {
      moduleLabel: "MOLD №00 // MASTER MATRIX",
      statusBadge: "MANUFACTURING & EXPORT ECOSYSTEM",
      dimensionSpec: "SPEC: ISO / GLOBAL STD 2026 // SER: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Owner-independent",
      headlineSuffix: " systems and industrial-grade management.",
      summary:
        "Anvar Abduqayum is the founder of Toybola Toys, Samtech Masterbatches, Visage Electric, and UZBIC. Build autonomous governance and transition your business from founder-dependence into a scalable industrial mold.",
      ctaPrimary: "Book a Consultation",
      ctaSecondary: "Services & Programs",
      portraitCaption: "Anvar Abduqayum",
      blueprintDimensions: {
        width: "MULTI-SECTOR",
        tolerance: "CIS & GLOBAL",
        standard: "SINCE 2005",
      },
      kickerBadge: "MONOGRAPH // INDUSTRY & SYSTEMIC GOVERNANCE",
      kickerText: "Tashkent • 2026",
      verifiedMetrics: [
        {
          value: "Since 2004",
          label: "Commercial & international trade practice",
        },
        {
          value: "Since 2012",
          label: "Establishment of Toybola factory",
        },
        {
          value: "7 systems",
          label: "Manufacturing, polymers, HoReCa & IT initiative",
        },
      ],
      portraitRole: "Industrialist, Engineer-Entrepreneur",
      portraitBadge: "ARCHIVAL ASSET // TEMPORARY PHOTO",
      portraitNote: "[Archival photograph // Temporary visual asset • To be replaced with an approved professional photoshoot]",
      brands: [
        "TOYBOLA TOYS",
        "SAMTECH MASTERBATCHES",
        "VISAGE ELECTRIC",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      eyebrow: "Services & Consulting Dossier",
      title: "4 Strategic Tracks for Business Owners & Industrialists",
      subtitle:
        "Every program is grounded in 20 years of real entrepreneurial practice. From institutional delegation to plant floor optimization and export development.",
      labels: {
        programSpec: "PROGRAM SPEC",
        format: "FORMAT",
        audience: "Target Audience",
        overview: "Program Overview",
        focusAreas: "Key Focus Areas",
        ctaText: "Book Consultation",
      },
      services: [
        {
          id: "governance",
          code: "PROGRAM 01 // INDIVIDUAL GOVERNANCE",
          name: "Business Management & Delegation",
          shortSummary:
            "Transitioning founders from operational fire-fighting into a self-governing executive structure.",
          audience:
            "Founders and business owners seeking to transform operational chaos into an autonomous management system",
          overview:
            "Releasing the founder from daily micromanagement, establishing robust delegation mechanisms, and structuring an enterprise that operates reliably through standard operating procedures rather than personal oversight.",
          focusAreas: [
            "Clear separation between operational execution and strategic governance",
            "Structured delegation of authority and accountability to key executives",
            "Establishment of institutional standards ensuring consistency without founder presence",
          ],
          format: "Individual advisory / Practical working sessions",
          ctaText: "Request Consultation",
        },
        {
          id: "manufacturing",
          code: "PROGRAM 02 // INDUSTRIAL ENGINEERING",
          name: "Manufacturing Process Optimization",
          shortSummary:
            "Standard operating procedures (SOP), unit-cost audits, and defect rate minimization.",
          audience:
            "Industrial manufacturers expanding plant facilities and optimizing per-unit production costs",
          overview:
            "Direct insights from two decades of manufacturing leadership: implementing standard operating procedures (SOP), cycle time analysis, and minimizing raw material waste on active production lines.",
          focusAreas: [
            "Standard operating procedures (SOP) and raw material consumption control",
            "Plant equipment capacity utilization and line throughput analysis",
            "Systematic defect rate reduction and cycle time optimization",
          ],
          format: "On-site industrial assessment & advisory",
          ctaText: "Request Consultation",
        },
        {
          id: "export",
          code: "PROGRAM 03 // GLOBAL EXPANSION",
          name: "UZBIC Export Cooperation",
          shortSummary:
            "Connecting domestic producers to foreign markets through B2B consortiums and trade channels.",
          audience:
            "Exporters aiming to enter foreign markets or scale regional delivery footprints",
          overview:
            "Practical cooperation through the Uzbekistan Business & Industrial Council (UZBIC): aligning with international quality standards, establishing direct connections with foreign buyers, and navigating cross-border trade logistics.",
          focusAreas: [
            "Aligning manufacturing output with international certification requirements",
            "Strategic market entry roadmaps for CIS and international markets",
            "B2B industrial cooperation and export consortium integration",
          ],
          format: "UZBIC Council Advisory & Working Group",
          ctaText: "Inquire About Export",
        },
        {
          id: "diagnostic",
          code: "PROGRAM 04 // DIAGNOSTIC ENTRY",
          name: "Initial Strategic Consultation",
          shortSummary:
            "Identifying 3 critical operational bottlenecks and delivering an actionable roadmap.",
          audience:
            "Entrepreneurs seeking to clarify system bottlenecks and establish high-impact priorities",
          overview:
            "A structured 20-minute diagnostic session: evaluating the current operational state of the enterprise, identifying primary friction points in management or production, and determining the appropriate path forward.",
          focusAreas: [
            "Initial rapid operational audit of enterprise workflows",
            "Identification of primary bottlenecks in management or plant operations",
            "Actionable recommendations and selection of the optimal engagement track",
          ],
          format: "20-minute initial online diagnostic",
          ctaText: "Schedule Diagnostic",
        },
      ],
    },
    portfolio: {
      moduleLabel: "MODULE 02 // BUSINESS ECOSYSTEM",
      eyebrow: "BUSINESS ECOSYSTEM & ENTERPRISE PORTFOLIO",
      title: "20 Years of Industrial Leadership & ",
      titleEmphasis: "Diversified Ecosystem",
      subtitle:
        "Each enterprise functions as an autonomous engineering module guided by standardized operational blueprints. Spanning polymer manufacturing to international export consortiums.",
      moldLegend: "INDUSTRIAL ECOSYSTEM // 7 AUTONOMOUS SYSTEMS",
      filters: {
        all: "ALL (7)",
        mfg: "MANUFACTURING (3)",
        horeca: "HORECA & DINING (2)",
        service: "B2B SERVICE & IT (1)",
        council: "INDUSTRIAL COUNCIL (1)",
      },
      detailBtn: "View Dossier",
      closeBtn: "Close",
      modal: {
        role: "Founder's Role",
        period: "Operational Timeline",
        sector: "Industrial Sector",
        model: "Governance Blueprint",
        caps: "Technical & Strategic Capabilities",
        officialSite: "Official Website",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "MODULE 01 // MANUFACTURING",
          category: "mfg",
          gridSpan: "major",
          badge: "MANUFACTURING // PLANT",
          year: "2009 / 2012",
          activity: "Children's polymer toy manufacturing plant",
          desc: "Polymer toy manufacturing plant. Production activities started in 2009, with the Toybola brand and factory facility established in 2012.",
          fullDesc: "Beginning with initial toy manufacturing operations in 2009, modern Toybola plant facilities were established in 2012. Featuring automated injection molding and standardized production systems, operations run on autonomous processes.",
          role: "Founder & Co-founder",
          period: "Activity since 2009 / Plant since 2012",
          sector: "Polymer Industry & Toys",
          model: "Standardized SOPs & Board Governance",
          categoryBadge: "Industry & Polymers",
          tags: ["Injection Molding", "Automated Tooling", "CIS Export"],
          status: "Status: Verified operational manufacturing facility",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Verified manufacturing asset]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "MODULE 02 // CHEMICAL FACILITY",
          category: "mfg",
          gridSpan: "major",
          badge: "MANUFACTURING // CHEMICAL",
          year: "Since 2015",
          activity: "Polymer raw materials & color masterbatches",
          desc: "Production project for color concentrates and masterbatches for polymer and plastics industries (founded in co-partnership).",
          fullDesc: "Industrial project supplying polymer modifiers and color masterbatches to manufacturers, established on a co-partnership basis to optimize raw material supply chains.",
          role: "Co-founder / Partner",
          period: "Since 2015 (Industrial venture)",
          sector: "Chemical Industry & Polymers",
          model: "B2B manufacturing & Raw supply",
          categoryBadge: "Chemical Facility",
          tags: ["Chemical Industry", "Polymer Modifiers", "B2B Raw Materials"],
          status: "Status: Partner-based manufacturing venture",
          hasLogo: false,
          assetLabel: "[Partner-based manufacturing venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "MODULE 03 // ELECTRICAL",
          category: "mfg",
          gridSpan: "standard",
          badge: "MANUFACTURING",
          year: "Since 2018",
          activity: "Electrical wiring & lighting equipment",
          desc: "Manufacturing project for electrical accessories, switches, and installation components (co-founded venture).",
          fullDesc: "Industrial project manufacturing electrical switches, sockets, and wiring components, operated on a co-partnership basis with automated assembly lines.",
          role: "Co-founder / Partner",
          period: "Since 2018 (Industrial venture)",
          sector: "Electrical Industry",
          model: "Automated lines & B2B/B2C",
          categoryBadge: "Electrical Goods",
          tags: ["Electrical Goods", "Assembly Lines", "Safety Standards"],
          status: "Status: Partner-based manufacturing venture",
          hasLogo: false,
          assetLabel: "[Partner-based manufacturing venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "MODULE 04 // HORECA DINING",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // RESTAURANT",
          year: "Since 2017",
          activity: "Fast-casual Turkish restaurant network",
          desc: "Fast-casual Turkish restaurant network based on standardized kitchen operations. First location launched in 2017.",
          fullDesc: "As confirmed in official Spot.uz interview records, the first Afiyet restaurant opened in 2017. All culinary and service procedures are governed by strict standard operating procedures.",
          role: "Founder & Partner",
          period: "Since 2017 (Spot.uz interview)",
          sector: "HoReCa & Fast-Casual",
          model: "Standardized kitchen network",
          categoryBadge: "Food Service",
          tags: ["Standardized Kitchen", "Fast-Casual", "SOPs"],
          status: "Status: Verified restaurant chain",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Verified restaurant asset]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "MODULE 05 // HORECA CAFE",
          category: "horeca",
          gridSpan: "standard",
          badge: "HORECA // CAFE",
          year: "Since 2020",
          activity: "Artisanal Italian gelato & cafe network",
          desc: "Artisanal gelato chain based on Italian recipes and cold-chain logistics. First venue opened in 2020.",
          fullDesc: "According to the Spot.uz interview, the first Puro location was launched in 2020. Built around authentic Italian gelato recipes and certified cold-chain logistics.",
          role: "Partner & Initiator",
          period: "Since 2020 (Spot.uz interview)",
          sector: "HoReCa & Confectionery",
          model: "Retail venues & Cold supply chain",
          categoryBadge: "Cafe & Dessert",
          tags: ["Cold Chain", "Italian Recipe", "Cafe Network"],
          status: "Status: Verified artisanal cafe network",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Verified cafe asset]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "MODULE 06 // B2B SERVICE",
          category: "service",
          gridSpan: "strategic",
          badge: "B2B SERVICE // IT SYSTEMS",
          year: "Since 2019",
          activity: "Enterprise automation & IT infrastructure",
          desc: "Applied enterprise IT initiative focused on automating operations, warehousing, and management reporting for partner businesses.",
          fullDesc: "An operational IT initiative created to automate internal ERP, inventory control, and management dashboards across ecosystem enterprises. (Operated as an internal systems infrastructure initiative rather than a public software corporation).",
          role: "Initiative Founder & Systems Advisor",
          period: "Since 2019 (Internal IT initiative)",
          sector: "Information Technology & Enterprise Service",
          model: "ERP integration & Process monitoring",
          categoryBadge: "B2B Digital Service",
          tags: ["ERP Systems", "Warehouse Automation", "Management Dashboards"],
          status: "Status: Internal digitalization initiative",
          hasLogo: false,
          assetLabel: "[Internal digitalization initiative]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "UZBIC",
          code: "MODULE 07 // INDUSTRIAL COUNCIL",
          category: "council",
          gridSpan: "strategic",
          badge: "INDUSTRIAL COUNCIL // PLATFORM",
          year: "Since 2022",
          activity: "Uzbekistan Business & Industrial Council",
          desc: "Uzbekistan Business and Industrial Council — an independent public platform uniting local manufacturers and exporters.",
          fullDesc: "Established in 2022, the Uzbekistan Business and Industrial Council (UZBIC) is an independent public industry platform uniting manufacturers and exporters. (Important: UZBIC is an institutional public council chaired by Anvar Abduqayum, not a privately owned commercial company).",
          role: "Council Chairman (Institutional role)",
          period: "Since 2022 (Council establishment)",
          sector: "Industrial Diplomacy & Export Platform",
          model: "B2B export consortiums",
          categoryBadge: "Public Council & Platform",
          tags: ["International Export", "Industrial Cooperation", "Public Platform"],
          status: "Status: Independent public platform (Non-commercial asset)",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Independent public platform // Non-commercial asset]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      moduleLabel: "MOLD №02 // CHRONOLOGICAL MATRIX",
      title: "The ",
      titleEmphasis: "trajectory",
      subtitle:
        "True enterprise is not forged overnight. Like a precision steel mold, the system was hardened through trials, real-world stress, and continuous refinement.",
      steps: [
        {
          period: "2004 — 2011",
          stageNumber: "01",
          title: "Trading apprenticeship & initial international logistics",
          summary:
            "Wholesale trade, direct imports from China and Turkey. Gained firsthand mastery of market demand cycles, consumer psychology, and capital accumulation.",
          milestone: "Accumulated foundational seed capital & supply networks",
          focus: "Cross-border trade operations",
        },
        {
          period: "2012 — 2015",
          stageNumber: "02",
          title: "Industrial pivot: The creation of Toybola factory",
          summary:
            "Invested in primary injection molding tools and hydraulic presses to eliminate import reliance. Established end-to-end toy casting in Tashkent.",
          milestone: "Produced 1,000,000th child-safe plastic toy",
          focus: "Thermoplastic molding & localization",
        },
        {
          period: "2016 — 2018",
          stageNumber: "03",
          title: "Vertical integration: Feedstock & electrical gear",
          summary:
            "Launched Samtech Masterbatches to control pigment quality and cost in-house. Expanded quickly into Visage Electric for residential electrical fixtures.",
          milestone: "Reduced raw material import reliance by 60%",
          focus: "Synergistic industrial clusters",
        },
        {
          period: "2019 — 2021",
          stageNumber: "04",
          title: "Hospitality: Testing the 'Mold' principle in food service",
          summary:
            "Transferred factory SOPs to food operations: launched AFIYET doner and PURO gelato. Confirmed system consistency without founder micro-oversight.",
          milestone: "Chef-independent standardized kitchen model",
          focus: "Modular franchising & quality control",
        },
        {
          period: "2022 — Present",
          stageNumber: "05",
          title: "UZBIC and cross-border industrial diplomacy",
          summary:
            "Day-to-day corporate operations fully transitioned to executive management boards. Focus redirected to scaling Uzbek industrial exports via UZBIC.",
          milestone: "Full institutionalization of autonomous management",
          focus: "Global trade routes & strategic scaling",
        },
      ],
    },
    principles: {
      moduleLabel: "MOLD №03 // METHODOLOGICAL BENCHMARK",
      title: "The mold ",
      titleEmphasis: "principle",
      subtitle:
        "What is a mold? An intricately engineered system crafted once with extreme precision that reliably outputs millions of flawless replicas without its maker's touch.",
      manifesto:
        "\"If your business halts the moment you take a vacation, it is not an enterprise; it is merely a job you created for yourself. True entrepreneurship is building a mechanism that no longer requires your presence to thrive.\"",
      modules: [
        {
          index: "MODULE A",
          title: "Standard Operating Procedures (SOP)",
          description:
            "Every operation from machine startup to material acceptance is documented. Personnel changes never distort the mold — incoming specialists follow the verified protocol from day one.",
          technicalRule: "RULE // Rely on process protocols rather than individual personalities",
          iconType: "sop",
        },
        {
          index: "MODULE B",
          title: "Corporate Governance Board",
          description:
            "Founder is emancipated from day-to-day operations. Each company operates with an executive CEO, finance department, and oversight board with explicitly demarcated mandates.",
          technicalRule: "RULE // Full delegation backed by structural accountability",
          iconType: "governance",
        },
        {
          index: "MODULE C",
          title: "Digital Metrics (ERP / KPI)",
          description:
            "Daily at 18:00 every gram of feedstock, scrap rate, and unit cost is reflected in the ERP. Real-time telemetry replaces subjective guesswork.",
          technicalRule: "RULE // Converse in verified numbers, eliminate guesswork",
          iconType: "metrics",
        },
        {
          index: "MODULE D",
          title: "Culture of Ownership",
          description:
            "Employees are developed as stewards of their modules. Quality anomalies trigger system-level engineering improvements rather than unproductive blame.",
          technicalRule: "RULE // Distinguish structural defects from human error",
          iconType: "culture",
        },
      ],
    },
    numbers: {
      moduleLabel: "MOLD №04 // VERIFIED TELEMETRY",
      title: "Numbers & ",
      subtitle:
        "In industry, words yield to machine counts, export tonnage, and verifiable operational metrics.",
      footnote:
        "* Note: Metrics are updated periodically based on verified enterprise reports (latest verification: 2026 status).",
      counters: [
        {
          id: "experience",
          value: 20,
          suffix: "+",
          label: "Years practical experience",
          specification: "In manufacturing, trade & systems",
        },
        {
          id: "companies",
          value: 7,
          suffix: "",
          label: "Active industrial enterprises",
          specification: "Interconnected manufacturing grid",
        },
        {
          id: "countries",
          value: 15,
          suffix: "+",
          label: "Export destinations",
          specification: "CIS, Middle East & Eurasia",
        },
        {
          id: "workplaces",
          value: 1200,
          suffix: "+",
          label: "Jobs created",
          specification: "Engineers, technicians & operators",
        },
        {
          id: "assortment",
          value: 500,
          suffix: "+",
          label: "Product SKUs manufactured",
          specification: "Standardized industrial catalog",
        },
      ],
    },
    exportUzbic: {
      moduleLabel: "MOLD №05 // GLOBAL TRADE REACH",
      title: "Export reach & ",
      titleEmphasis: "UZBIC",
      subtitle:
        "Confining industrial capacity to domestic demand stifles potential. Uzbek manufacturing meets international quality benchmarks.",
      exportMapTitle: "CORE DESTINATIONS FOR CONSISTENT INDUSTRIAL SHIPMENTS",
      destinations: [
        "Kazakhstan",
        "Russian Federation",
        "Tajikistan",
        "Kyrgyzstan",
        "Azerbaijan",
        "Georgia",
        "Turkey",
        "Afghanistan",
        "United Arab Emirates",
        "Belarus",
        "Mongolia",
      ],
      uzbicCard: {
        tag: "INDEPENDENT INDUSTRY COUNCIL",
        name: "UZBIC (Uzbekistan Business & Industry Council)",
        acronymMeaning: "Uzbekistan Business & Industry Council",
        mission:
          "An independent industrial council dedicated to unlocking global markets for Uzbek manufacturers, structuring trade treaties, and enhancing national industrial export resilience.",
        pillars: [
          {
            title: "International B2B Missions",
            desc: "Organizing targeted trade missions and negotiations in Turkey, China, Europe, and the Middle East.",
          },
          {
            title: "Certification & Compliance",
            desc: "Engineering support adapting products to international ISO, CE, and regional safety mandates.",
          },
          {
            title: "Unified Export Consortium",
            desc: "Aggregating small and mid-size manufacturers into consolidated supply chains for foreign retail chains.",
          },
        ],
        linkText: "Visit official UZBIC portal",
        linkUrl: "https://uzbic.uz",
      },
    },
    mistakes: {
      moduleLabel: "MOLD №06 // HONEST LESSONS",
      title: "My honest ",
      titleEmphasis: "mistakes",
      subtitle:
        "No casting mold emerges perfect on the first trial. The most valuable assets are the millions lost, fractured molds, and lessons learned through adversity.",
      intro:
        "\"Interviews tend to celebrate victories only. Yet a founder's true strength lies not in avoiding failure, but in converting every costly mistake into an unshakeable system.\"",
      lessons: [
        {
          code: "ERR-01",
          title: "Micromanagement: 'I can do it all better myself'",
          misconception:
            "Assuming staff will never care as much, therefore every receipt and operational choice must pass through founder eyes.",
          reality:
            "Founder time evaporated in trivial routine, strategic trajectory stalled, and company capacity shrunk to one person's stamina.",
          moldedOutcome:
            "MOLD FIX: Rigorous delegation, clear job mandates, and handoff of operational leadership to executive directors.",
        },
        {
          code: "ERR-02",
          title: "Relying on friendly handshakes without legal contracts",
          misconception:
            "\"We've known each other for years, why burden friendship with legal paperwork?\"",
          reality:
            "When unexpected economic volatility struck, not only was capital lost, but decades of friendship fractured.",
          moldedOutcome:
            "MOLD FIX: Agreements are committed to paper before friendship begins. Exit strategies and responsibilities are legally sealed.",
        },
        {
          code: "ERR-03",
          title: "Delayed unit economics and hidden waste accumulation",
          misconception:
            "Assuming that healthy daily cash flow automatically guarantees healthy profit margins.",
          reality:
            "In manufacturing, grams and seconds decide millions. A micron error in an injection tool or scrap spike can wipe out net margin entirely.",
          moldedOutcome:
            "MOLD FIX: Dynamic real-time unit economics and 24/7 automated telemetry of raw materials.",
        },
        {
          code: "ERR-04",
          title: "Manufacturing to inventory without verified sales pipelines",
          misconception:
            "Believing that if you build top quality, buyers will magically line up.",
          reality:
            "Expanding production capacity ahead of secured distribution channels froze vital working capital in unsold inventory.",
          moldedOutcome:
            "MOLD FIX: First validate the distribution pipeline and contracts; scale machine capacity strictly to match demand.",
        },
      ],
    },
    media: {
      moduleLabel: "MOLD №07 // MEDIA & VERIFIED FOOTPRINT",
      title: "Media & ",
      titleEmphasis: "interviews",
      subtitle:
        "Key conversations on industrial scaling, cross-border export logistics, and owner-independent corporate architecture.",
      youtubeHeading: "Core Video Interviews",
      pressHeading: "Press Mentions & Official Coverage",
      videos: [
        {
          id: "yt-1",
          title: "In-depth conversation with Anvar Abduqayum on 'Osmondagi bolalar'",
          channel: "Osmondagi Bolalar",
          youtubeId: "vB43H4y_3Zk",
          durationPlaceholder: "1 hr 48 min",
          topicBadge: "Manufacturing & Life Lessons",
          isAvailable: false,
          statusNote: "Archive in production",
        },
        {
          id: "yt-2",
          title: "Owner-independent enterprise: Factories, molds and export secrets",
          channel: "Entrepreneur's Journal",
          youtubeId: "J2X5mJ3HDYE",
          durationPlaceholder: "54 min",
          topicBadge: "Systemic Governance",
          isAvailable: true,
          statusNote: "Format: 1080p // In-depth interview",
        },
        {
          id: "yt-3",
          title: "How toy manufacturing was localized in Uzbekistan: Toybola story",
          channel: "Business Time",
          youtubeId: "dFq5z_x3A_I",
          durationPlaceholder: "1 hr 12 min",
          topicBadge: "Toybola Plant Tour",
          isAvailable: false,
          statusNote: "Archive in production",
        },
      ],
      pressMentions: [
        {
          id: "press-1",
          outlet: "Gazeta.uz",
          articleTitle: "\"How Uzbek toy manufacturers are capturing regional markets\"",
          datePlaceholder: "Archive",
          url: "https://gazeta.uz",
          publicationType: "Analytical Feature",
        },
        {
          id: "press-2",
          outlet: "Kun.uz",
          articleTitle: "UZBIC Council: Unlocking new export corridors for domestic industry",
          datePlaceholder: "Official Statement",
          url: "https://kun.uz",
          publicationType: "Interview & Report",
        },
        {
          id: "press-3",
          outlet: "Spot.uz",
          articleTitle: "Import substitution in polymer compounds and precision molding",
          datePlaceholder: "Market Analysis",
          url: "https://spot.uz",
          publicationType: "Industrial Review",
        },
        {
          id: "press-4",
          outlet: "Daryo.uz",
          articleTitle: "From founder personality to autonomous system: Interview with Anvar Abduqayum",
          datePlaceholder: "Exclusive",
          url: "https://daryo.uz",
          publicationType: "Special Coverage",
        },
      ],
    },
    contact: {
      moduleLabel: "MOLD №08 // CONTACT PROTOCOL",
      title: "Direct ",
      titleEmphasis: "communication",
      subtitle:
        "Official communication protocol for industrial cooperation, export partnerships, and UZBIC council initiatives.",
      directTitle: "Primary and fastest channel",
      directText:
        "The most direct and prompt communication is conducted via Telegram. Alternatively, submit your official inquiry below.",
      form: {
        nameLabel: "Your Name or Enterprise Name",
        namePlaceholder: "E.g. Jamshid Aliyev (Factory Managing Director)",
        topicLabel: "Inquiry Topic",
        topicOptions: [
          { id: "coop", label: "Industrial cooperation & manufacturing supply" },
          { id: "uzbic", label: "UZBIC membership & export corridor" },
          { id: "press", label: "Media, keynotes & interview inquiries" },
          { id: "other", label: "Other official proposals" },
        ],
        phoneLabel: "Phone Number",
        phonePlaceholder: "+998 (90) 123-45-67",
        messageLabel: "Brief Summary of Inquiry",
        messagePlaceholder: "Outline your proposal, industrial requirements, or discussion agenda...",
        submitButton: "Send Inquiry",
        submitting: "Dispatching...",
        successMessage: "Your inquiry has been logged. Our executive team will follow up promptly.",
        errorMessage: "An error occurred. Please reach out directly via Telegram.",
      },
      socials: {
        telegram: "https://t.me/anvar_abduqayum_admin",
        instagram: "https://www.instagram.com/anvar_abduqayum",
        youtube: "https://www.youtube.com/@AnvarAbduqayum",
        linkedin: "https://www.linkedin.com/in/anvar-abduqayum",
      },
    },
    mobileStickyBar: {
      telegramLabel: "Message on Telegram",
      callLabel: "Call",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Industrial manufacturing, export engineering & autonomous corporate systems.",
      licenseSpec: "MOLD INDUSTRIAL SYSTEM // VERSION 1.0 // ALL RIGHTS RESERVED",
      rightsReserved: "All rights reserved.",
      blueprintStamp: "SERIES № AA-2026-UZ // MOLD INDUSTRIAL SYSTEM",
    },
  },
};

export function getContent(locale: string = "uz"): LocaleContent {
  if (locale === "ru") return siteContent.ru;
  if (locale === "en") return siteContent.en;
  return siteContent.uz;
}

