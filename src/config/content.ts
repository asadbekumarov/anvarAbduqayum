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
    sectionNum?: string;
    tablistAriaLabel?: string;
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
    sectionNum?: string;
    moduleLabel?: string;
    title: string;
    titleEmphasis?: string;
    subtitle: string;
    moldLegend?: string;
    eyebrow: string;
    taxonomy?: {
      ariaLabel: string;
      founder: string;
      partner: string;
      internal: string;
      public: string;
    };
    groups?: {
      ventures: string;
      council: string;
    };
    councilHighlight?: {
      pill: string;
      title: string;
      desc: string;
      legalNote: string;
      detailBtn: string;
      roleLabel: string;
      roleValue: string;
      typeLabel: string;
      typeValue: string;
      sourceLabel: string;
      sourceValue: string;
    };
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
      status?: string;
      source?: string;
      caps: string;
      officialSite: string;
      noWebsiteNote?: string;
      closeAriaLabel?: string;
    };
    companies: Array<{
      id: string;
      name: string;
      code: string;
      category: "mfg" | "horeca" | "service" | "council";
      gridSpan: "major" | "standard" | "strategic";
      roleType?: "is-founder" | "is-partner" | "is-internal" | "is-public";
      roleBadge?: string;
      monogram?: string;
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
      source?: string;
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
    sectionNum?: string;
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    filterAriaLabel?: string;
    filters?: {
      all: string;
      personal: string;
      partner: string;
      council: string;
    };
    legend?: {
      ariaLabel: string;
      personal: string;
      founding: string;
      partner: string;
      council: string;
    };
    labels?: {
      role: string;
      source: string;
      verify: string;
      hide: string;
    };
    steps: Array<{
      id?: string;
      filterCat?: "personal" | "partner" | "council";
      tagClass?: "tag-personal" | "tag-founding" | "tag-partner" | "tag-council";
      tag?: string;
      period: string;
      stageNumber: string;
      title: string;
      summary: string;
      role?: string;
      source?: string;
      verificationNote?: string;
      milestone: string;
      focus: string;
    }>;
  };
  principles: {
    sectionNum?: string;
    moduleLabel: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    statementHeading?: string;
    manifesto: string;
    frameworkTag?: string;
    caveat?: string;
    tablistAriaLabel?: string;
    contrastAriaLabel?: string;
    labels?: {
      appContext: string;
      before: string;
      after: string;
      disclaimer: string;
    };
    modules: Array<{
      id?: string;
      index: string;
      title: string;
      shortSummary?: string;
      description: string;
      technicalRule: string;
      appContext?: string;
      beforeText?: string;
      afterText?: string;
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
    sectionNum?: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    youtubeHeading: string;
    videosSubmeta?: string;
    pressHeading: string;
    pressSubmeta?: string;
    videoFilters?: {
      ariaLabel: string;
      all: string;
      published: string;
      archive: string;
    };
    pressFilters?: {
      ariaLabel: string;
      all: string;
      profile: string;
      public: string;
    };
    featured?: {
      id: string;
      statusLabel: string;
      title: string;
      synopsis: string;
      channel: string;
      youtubeId: string;
      thumbUrl: string;
      url: string;
      dateIso: string;
      dateFormatted: string;
      duration: string;
      channelLabel: string;
      dateLabel: string;
      durationLabel: string;
      playLabel: string;
      watchLabel: string;
      extLabel: string;
    };
    ui?: {
      watchCard: string;
      extCard: string;
      readPress: string;
      archiveSoonBtn: string;
      officialChannelBtn: string;
      officialChannelUrl: string;
      officialChannelHandleLabel: string;
      disclosureHeading: string;
      disclosureCopy: string;
      modalExt: string;
      modalClose: string;
      modalCloseAriaLabel: string;
      modalLoading: string;
      modalFallbackTitle: string;
      modalFallbackBody: string;
      modalWatchYoutube: string;
    };
    videos: Array<{
      id: string;
      filterCat?: "published" | "archive";
      hasCleanPoster?: boolean;
      thumbUrl?: string;
      url?: string;
      channelUrl?: string;
      dateIso?: string;
      dateFormatted?: string;
      title: string;
      channel: string;
      summary?: string;
      youtubeId: string;
      durationPlaceholder: string;
      topicBadge: string;
      isAvailable?: boolean;
      statusNote?: string;
    }>;
    pressMentions: Array<{
      id: string;
      category?: "profile" | "public";
      outlet: string;
      articleTitle: string;
      contextNote?: string;
      dateIso?: string;
      datePlaceholder: string;
      url: string;
      publicationType: string;
    }>;
  };
  contact: {
    booking: {
      ordinal: string;
      title: string;
      lead: string;
      specs: Array<{ label: string; value: string }>;
      cardTitle: string;
      cardDescription: string;
      routeLabel: string;
      primaryCta: string;
      telegramCta: string;
    };
    directory: {
      ordinal: string;
      title: string;
      lead: string;
      heading: string;
      subheading: string;
      phoneLabel: string;
      tgAdminLabel: string;
      tgChannelLabel: string;
      emailLabel: string;
      instagramLabel: string;
      youtubeLabel: string;
      cues: {
        call: string;
        message: string;
        open: string;
        email: string;
      };
      officeTitle: string;
      officeCopy: string;
    };
    form: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      businessLabel: string;
      businessPlaceholder: string;
      topicLabel: string;
      topicOptions: Array<{ id: string; label: string }>;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      resetButton: string;
      telegramFallbackButton: string;
      bookingFallbackButton: string;
      callFallbackButton: string;
      summaryLabels: {
        name: string;
        phone: string;
        business: string;
        topic: string;
        message: string;
        messageEmpty: string;
      };
      errors: {
        nameRequired: string;
        phoneInvalid: string;
        businessRequired: string;
        messageTooLong: string;
        validationSummary: string;
        rateLimited: string;
        serverError: string;
        networkError: string;
        retrySuffix: string;
      };
    };
  };
  mobileStickyBar: {
    telegramLabel: string;
    callLabel: string;
  };
  footer: {
    founderName: string;
    tagline: string;
    bookingCta: string;
    navHeading: string;
    contactHeading: string;
    platformsHeading: string;
    bookingLinkLabel: string;
    colophonNote: string;
    backToTop: string;
    indexLinks: Array<{ code: string; anchor: string; label: string }>;
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
      ctaButton: "Uchrashuv bo‘yicha yozish",
      consulting: "Xizmatlar",
      bookingCta: "Uchrashuv bo‘yicha yozish",
    },
    hero: {
      moduleLabel: "QOLIP №00 // BOSH MATRITSA",
      statusBadge: "SANOAT VA EKSPORT EKOTIZIMI",
      dimensionSpec: "STANDART: ISO / O'zDSt 2026 // SERIYA: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Egasisiz ishlaydigan",
      headlineSuffix: " tizimlar va sanoat darajasidagi boshqaruv.",
      summary:
        "Anvar Abduqayum — Toybola Toys asoschisi va hammuassisi, Samtech Masterbatches va Visage Electric sanoat loyihalari hammuassisi, HoReCa tarmoqlari hamkori hamda mustaqil UZBIC jamoat platformasi raisi. Amaliy tajriba asosida biznesingizni operatsion bog‘liqlikdan tizimli boshqaruvga olib chiqing.",
      ctaPrimary: "Uchrashuv bo‘yicha yozish",
      ctaSecondary: "Xizmatlar va dasturlar",
      portraitCaption: "Anvar Abduqayum",
      blueprintDimensions: {
        width: "KO'P TARMOQLI",
        tolerance: "MDH & XALQARO",
        standard: "SANOAT VA BOSHQARUV",
      },
      kickerBadge: "MONOGRAF // SANOAT VA TIZIMLI BOSHQARUV",
      kickerText: "Toshkent, 2026",
      verifiedMetrics: [
        {
          value: "2009 / 2012",
          label: "Toybola sex amaliyoti va fabrika tashkili",
        },
        {
          value: "2015 — 2022",
          label: "Samtech, Visage hammuassisligi, HoReCa va UZBIC",
        },
        {
          value: "7 yo‘nalish",
          label: "3 sanoat, 2 HoReCa, 1 ichki IT va UZBIC jamoat kengashi",
        },
      ],
      portraitRole: "Sanoatchi, Muhandis-Tadbirkor",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
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
      sectionNum: "02",
      tablistAriaLabel: "Konsultatsiya dasturlari",
      eyebrow: "Xizmatlar va Konsalting Dossiyesi",
      title: "Biznes egalari va ishlab chiqaruvchilar uchun 4 ta strategik yo‘nalish",
      subtitle:
        "Amaliy ishlab chiqarish, hammuassislik va xalqaro savdo tajribasiga asoslangan yondashuv: tizimli boshqaruvdan tortib korxonalarni optimallashtirish va eksport kooperatsiyasigacha.",
      labels: {
        programSpec: "DASTUR SPETSIFIKATSIYASI",
        format: "Ishlash formati",
        audience: "Kimlar uchun",
        overview: "Dastur mazmuni",
        focusAreas: "Asosiy yo‘nalishlar",
        ctaText: "Uchrashuv bo‘yicha yozish",
      },
      services: [
        {
          id: "governance",
          code: "Dastur 01: Individual governance",
          name: "Biznes boshqaruvi va delegatsiyalash",
          shortSummary:
            "Asoschining operatsion boshqaruvdan chiqishi va avtonom tizim qurish.",
          audience:
            "Kompaniyani operatsion xaosdan avtonom tizimga olib chiqmoqchi bo‘lgan tadbirkorlar va asoschilar",
          overview:
            "Asoschining har kungi mikromenejmentdan ozod bo‘lishi, ishonchli delegatsiyalash mexanizmlarini joriy qilish va inson omiliga emas, aniq standartlarga tayanuvchi tizimli boshqaruv strukturasini qurish.",
          focusAreas: [
            "Operatsion boshqaruv va strategik rejalashtirishni aniq ajratish",
            "Vakolat va mas’uliyatni bosqichma-bosqich asosiy rahbarlarga o‘tkazish",
            "Rahbar ishtirokisiz ham barqaror ishlaydigan standart reglamentlar tizimi",
          ],
          format: "Yakka tartibdagi format / Amaliy sessiyalar",
          ctaText: "Telegram orqali yozish",
        },
        {
          id: "manufacturing",
          code: "Dastur 02: Industrial engineering",
          name: "Ishlab chiqarish jarayonlarini optimallashtirish",
          shortSummary:
            "Standart ish reglamentlari (SOP), tannarx tahlili va mahsulot sifatini oshirish.",
          audience:
            "Zavod va sexlarini kengaytirayotgan, mahsulot tannarxini optimallashtirmoqchi bo‘lgan sanoatchilar",
          overview:
            "Amaliy zavod boshqaruvi asosida ishlab chiqarish maydonchasini tahlil qilish: standart ish reglamentlari (SOP), texnologik xaritalar va xomashyo yo‘qotishlarini minimallashtirish.",
          focusAreas: [
            "Standart ish reglamentlari (SOP) va xomashyo sarfini nazorat qilish",
            "Uskunalarning to‘liq quvvatda ishlash samaradorligini tahlil qilish",
            "Yaroqsiz mahsulotlar (brak) ulushini kamaytirish va sikl vaqtini qisqartirish",
          ],
          format: "Amaliy tahlil va korxona maydonida ishlash",
          ctaText: "Telegram orqali yozish",
        },
        {
          id: "export",
          code: "Dastur 03: Global expansion",
          name: "UZBIC doirasida eksport hamkorligi",
          shortSummary:
            "Mahalliy mahsulotlarni tashqi bozorlarga olib chiqish va B2B kooperatsiya.",
          audience:
            "Mahsulotini xorijiy bozorlarga eksport qilishni rejalashtirgan yoki geografiyasini kengaytirayotgan ishlab chiqaruvchilar",
          overview:
            "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) doirasida amaliy tajriba almashish: xalqaro standartlarga moslashish, xorijiy xaridorlar bilan to‘g‘ridan-to‘g‘ri aloqa va tashqi savdo yo‘nalishlari.",
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
          code: "Dastur 04: Strategic review",
          name: "Boshlang‘ich strategik tahlil",
          shortSummary:
            "Kompaniyadagi asosiy boshqaruv to‘siqlarini aniqlash va ustuvor yo‘nalishlarni ko‘rib chiqish.",
          audience:
            "Biznesidagi asosiy to‘siqlarni aniqlab, birinchi navbatdagi qadamlarni belgilamoqchi bo‘lgan tadbirkorlar",
          overview:
            "Boshlang‘ich strategik ko‘rib chiqish: kompaniyaning hozirgi holatini tahlil qilish, jarayonlardagi yoki boshqaruvdagi asosiy to‘siqlarni aniqlash va keyingi hamkorlik tartibini kelishish.",
          focusAreas: [
            "Kompaniya jarayonlarini birlamchi ko‘rib chiqish",
            "Operatsion boshqaruv yoki ishlab chiqarishdagi asosiy to‘siqlarni aniqlash",
            "Amaliy yo‘nalish va keyingi hamkorlik tartibini kelishish",
          ],
          format: "Kelishilgan tartibda dastlabki ko‘rib chiqish",
          ctaText: "Uchrashuv bo‘yicha yozish",
        },
      ],
    },
    portfolio: {
      sectionNum: "03",
      moduleLabel: "MODUL 02 // BIZNES EKOTIZIMI",
      eyebrow: "BIZNES EKOTIZIMI VA KORXONALAR PORTFELI",
      title: "Ko‘p tarmoqli sanoat loyihalari, hamkorliklar va jamoat platformasi",
      titleEmphasis: "",
      subtitle:
        "Polimer va elektrotexnika ishlab chiqarish korxonalari, HoReCa tarmoqlari, ichki IT infratuzilmasi hamda mustaqil nodavlat sanoat kengashi (UZBIC) o‘rtasidagi rollar va huquqiy maqomlarning aniq tasnifi.",
      moldLegend: "SANOAT EKOTIZIMI // 7 TA YO‘NALISH",
      taxonomy: {
        ariaLabel: "Rollar tasnifi",
        founder: "Asoschi / Hammuassis (Toybola, Afiyet)",
        partner: "Sanoat hammuassisligi va hamkorlik (Samtech, Visage, Puro)",
        internal: "Ichki IT tashabbusi (Alohida kompaniya emas)",
        public: "Mustaqil jamoat kengashi (UZBIC, xususiy mulk emas)",
      },
      groups: {
        ventures: "Tijorat korxonalari, sanoat hamkorliklari va ichki infratuzilma",
        council: "Mustaqil jamoat platformasi (xususiy biznes mulki emas)",
      },
      councilHighlight: {
        pill: "Mustaqil jamoat platformasi: xususiy kompaniya emas",
        title: "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC)",
        desc: "2022-yilda tashkil etilgan O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) mahalliy ishlab chiqaruvchilar va eksportchilar o‘rtasida sanoat kooperatsiyasi hamda tashqi bozorlarga chiqishni muvofiqlashtiruvchi mustaqil jamoat platformasidir.",
        legalNote:
          "Huquqiy maqom farqi: Anvar Abduqayum ushbu tuzilmaning yakka mulkdori yoki tijorat ulushdori emas, balki Jamoat Kengashi Raisi sifatida faoliyat yuritadi.",
        detailBtn: "Batafsil ma’lumot",
        roleLabel: "Maqom / O‘rni:",
        roleValue: "Kengash Raisi (Jamoat maqomi)",
        typeLabel: "Tashkilot turi:",
        typeValue: "Mustaqil nodavlat platforma",
        sourceLabel: "Manba:",
        sourceValue: "uzbic.uz, Kun.uz axborotlari",
      },
      filters: {
        all: "Barchasi (7)",
        mfg: "Ishlab chiqarish (3)",
        horeca: "HoReCa (2)",
        service: "Ichki IT tashabbusi (1)",
        council: "Jamoat kengashi (1)",
      },
      detailBtn: "Batafsil",
      closeBtn: "Yopish",
      modal: {
        role: "Anvar Abduqayumning o‘rni",
        period: "Faoliyat davri",
        sector: "Yo‘nalish / Sektor",
        model: "Boshqaruv modeli",
        status: "Faktik va huquqiy maqomi",
        source: "Manba va verifikatsiya",
        caps: "Texnologik va institutsional yo‘nalishlar",
        officialSite: "Rasmiy veb-sayt",
        noWebsiteNote: "Ichki korporativ / B2B tizim: alohida ommaviy veb-sayt mavjud emas",
        closeAriaLabel: "Oynani yopish",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "01: Polimer sanoati",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          roleBadge: "Asoschi va Hammuassis",
          monogram: "TB",
          badge: "ISHLAB CHIQARISH // ZAVOD",
          year: "2009 / 2012",
          activity: "Bolalar plastik o‘yinchoqlari fabrikasi",
          desc: "2009-yilda dastlabki sex amaliyoti boshlanib, 2012-yilda Toybola brendi va zavod quvvatlari tashkil topgan polimer o‘yinchoqlar korxonasi.",
          fullDesc: "2009-yildagi dastlabki o‘yinchoq ishlab chiqarish tajribasidan boshlab, 2012-yilda zamonaviy Toybola zavod quvvatlari yo‘lga qo‘yilgan. Korxonada plastik quyish texnologiyalari va standartlashtirilgan reglamentlar asosida operatsion jarayonlar boshqariladi.",
          role: "Asoschi va Hammuassis",
          period: "2009-yildan faoliyat / 2012-yildan zavod",
          sector: "Polimer sanoati va bolalar o‘yinchoqlari",
          model: "Tizimli reglamentlar va direktorlar kengashi",
          categoryBadge: "Sanoat & Polimerlar",
          tags: ["Plastik quyish", "Qolip standartlari", "MDH eksporti"],
          status: "Tasdiqlangan ishlab chiqarish korxonasi",
          source: "Korxona arxivi va Gazeta.uz (2020), tasdiqlangan aktiv",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Tasdiqlangan korxona aktivi]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "02: Kimyo majmuasi",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-partner",
          roleBadge: "Hammuassis / Hamkor (yakka mulkdor emas)",
          monogram: "SM",
          badge: "ISHLAB CHIQARISH // KIMYO",
          year: "2015-yildan",
          activity: "Polimer xomashyosi va rang konsentratlari loyihasi",
          desc: "Polimer korxonalari uchun rang konsentratlari va modifikatorlar ishlab chiqaruvchi hammuassislikdagi sanoat loyihasi.",
          fullDesc: "Sanoat miqyosidagi polimer korxonalari uchun modifikatorlar va rang beruvchi masterbatch xomashyosi ishlab chiqarish loyihasi. Hammuassislik va sanoat hamkorligi asosida tashkil etilgan (yakka mulkchilik emas).",
          role: "Hammuassis / Hamkor (yakka mulkdor emas)",
          period: "2015-yildan buyon (Sanoat loyihasi)",
          sector: "Kimyo sanoati va polimerlar",
          model: "B2B xomashyo ishlab chiqarish va hamkorlik",
          categoryBadge: "Kimyo Majmuasi",
          tags: ["Kimyo sanoati", "Polimer modifikatorlar", "B2B xomashyo"],
          status: "Hammuassislikdagi B2B sanoat loyihasi",
          source: "B2B kooperatsiya kelishuvlari, tasdiqlangan hammuassislik",
          hasLogo: false,
          assetLabel: "[Hammuassislikdagi sanoat loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "03: Elektrotexnika",
          category: "mfg",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Hammuassis / Hamkor (yakka mulkdor emas)",
          monogram: "VE",
          badge: "ISHLAB CHIQARISH",
          year: "2018-yildan",
          activity: "Elektrotexnika va montaj uskunalari loyihasi",
          desc: "Avtomatlashtirilgan montaj liniyalarida kalitlar va elektrotexnika komponentlari ishlab chiqarish hammuassislik loyihasi.",
          fullDesc: "Turar-joy va sanoat obyektlari uchun energiya xavfsiz kalitlar, rozetkalar va elektrotexnika komponentlari ishlab chiqarish loyihasi. Hammuassislik va sanoat hamkorligi asosida yo‘lga qo‘yilgan.",
          role: "Hammuassis / Hamkor (yakka mulkdor emas)",
          period: "2018-yildan buyon (Sanoat loyihasi)",
          sector: "Elektrotexnika sanoati",
          model: "Avtomatlashgan liniyalar va B2B/B2C",
          categoryBadge: "Elektrotexnika",
          tags: ["Elektrotexnika", "Montaj liniyasi", "Xavfsizlik"],
          status: "Hammuassislikdagi sanoat loyihasi",
          source: "Elektrotexnika kooperatsiyasi, tasdiqlangan hammuassislik",
          hasLogo: false,
          assetLabel: "[Hammuassislikdagi sanoat loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "04: HoReCa restoranlar",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          roleBadge: "Asoschi va Hamkor",
          monogram: "AF",
          badge: "HORECA // RESTORAN",
          year: "2017-yildan",
          activity: "Turk taomlari restoranlar tarmog‘i",
          desc: "Standartlashtirilgan oshxona texnologiyalariga asoslangan restoranlar tarmog‘i. Birinchi muassasa 2017-yilda ochilgan.",
          fullDesc: "Spot.uz nashriga berilgan intervyuda qayd etilganidek, birinchi Afiyet restorani 2017-yilda ochilgan. Tizimda oshxona jarayonlari qat’iy texnologik xaritalar asosida boshqariladi.",
          role: "Asoschi va Hamkor",
          period: "2017-yildan buyon (Spot intervyusi)",
          sector: "HoReCa va umumiy ovqatlanish",
          model: "Standartlashtirilgan oshxona boshqaruvi",
          categoryBadge: "Umumiy ovqatlanish",
          tags: ["Texnologik xarita", "Fast-Casual", "Tarmoq standarti"],
          status: "Tasdiqlangan HoReCa restoranlar tarmog‘i",
          source: "Spot.uz rasmiy intervyusi (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Tasdiqlangan restoran tarmog‘i]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "05: HoReCa kafe",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Hamkor va Tashabbuskor",
          monogram: "PR",
          badge: "HORECA // KAFE",
          year: "2020-yildan",
          activity: "Italyancha muzqaymoq va kafe tarmog‘i",
          desc: "Sovuq logistika zanjiri va italyancha retseptura asosida tashkil etilgan kafe tarmog‘i. Birinchi nuqta 2020-yilda ochilgan.",
          fullDesc: "Spot.uz intervyusida tasdiqlanganidek, birinchi Puro nuqtasi 2020-yilda faoliyatini boshlagan. Tabiiy masalliqlar va sovuq ta’minot zanjiri nazorati asosida rivojlantirilgan loyiha.",
          role: "Hamkor va Tashabbuskor",
          period: "2020-yildan buyon (Spot intervyusi)",
          sector: "HoReCa va qandolatchilik",
          model: "Hamkorlik va sovuq zanjir boshqaruvi",
          categoryBadge: "Kafe & Qandolatchilik",
          tags: ["Sovuq logistika", "Italiya retsepturasi", "Chakana savdo"],
          status: "Tasdiqlangan HoReCa kafe tarmog‘i",
          source: "Spot.uz rasmiy intervyusi (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Tasdiqlangan kafe aktivi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "06: Ichki infratuzilma",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          roleBadge: "Ichki tashabbus (alohida kompaniya emas)",
          monogram: "IT",
          badge: "B2B SERVIS // IT TIZIMLAR",
          year: "2019-yildan",
          activity: "Ichki ERP va boshqaruv hisobotlarini raqamlashtirish",
          desc: "Ekotizim korxonalarining ombor, ishlab chiqarish va hisobot jarayonlarini avtomatlashtirish uchun shakllantirilgan ichki IT bo‘linma tashabbusi.",
          fullDesc: "Ekotizimdagi sanoat korxonalari va HoReCa nuqtalarida operatsion shaffoflikni ta’minlash uchun shakllantirilgan ichki IT infratuzilma tashabbusi. Mustaqil tijorat IT-kompaniyasi sifatida emas, ichki avtomatlashtirish tizimi sifatida faoliyat yuritadi.",
          role: "Tashabbuskor va Ichki tizimlar maslahatchisi",
          period: "2019-yildan buyon (Ichki IT tashabbus)",
          sector: "Axborot texnologiyalari (ichki xizmat)",
          model: "Ichki tizimlar integratsiyasi",
          categoryBadge: "B2B Raqamli Servis",
          tags: ["Ichki ERP", "Ombor nazorati", "Hisobot tizimi"],
          status: "Ichki jarayonlarni raqamlashtirish tashabbusi",
          source: "Ekotizim ichki infratuzilmasi",
          hasLogo: false,
          assetLabel: "[Ichki jarayonlarni raqamlashtirish tashabbusi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC)",
          code: "07: Mustaqil jamoat kengashi",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          roleBadge: "Kengash Raisi (Jamoat maqomi)",
          monogram: "UZ",
          badge: "SANOAT KENGASHI // PLATFORMA",
          year: "2022-yildan",
          activity: "O‘zbekiston Biznes va Sanoat Kengashi",
          desc: "O‘zbekiston Biznes va Sanoat Kengashi — mahalliy ishlab chiqaruvchilar va eksportchilarni birlashtiruvchi mustaqil jamoat platformasi.",
          fullDesc: "2022-yilda tashkil etilgan O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) tadbirkorlar va ishlab chiqaruvchilarning mustaqil nodavlat jamoat platformasidir. Kengash korxonalar o‘rtasida B2B eksport kooperatsiyasini yo‘lga qo‘yish va tashqi bozorlarga chiqishda amaliy ko‘mak beradi. Anvar Abduqayum bu tuzilmada mulkdor emas, balki Jamoat Kengashi Raisi sifatida faoliyat yuritadi.",
          role: "Kengash Raisi (jamoat maqomi, xususiy mulkdor emas)",
          period: "2022-yildan buyon (Kengash faoliyati)",
          sector: "Sanoat diplomatiyasi va eksport kooperatsiyasi",
          model: "Mustaqil nodavlat B2B konsortsium platformasi",
          categoryBadge: "Sanoat Kengashi & Platforma",
          tags: ["Xalqaro eksport", "Sanoat kooperatsiyasi", "Jamoat platformasi"],
          status: "Mustaqil jamoat platformasi (tijorat korxonasi emas)",
          source: "uzbic.uz rasmiy portali va Kun.uz axborotlari",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Mustaqil jamoat platformasi // Tijorat aktivi emas]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      sectionNum: "04",
      moduleLabel: "QOLIP №02 // TARIXIY VAQT CHIZIG'I",
      title: "Bosib o‘tilgan yo‘l",
      titleEmphasis: "",
      subtitle:
        "Tadbirkorlik bir kunda qurilmaydi. Quyidagi xronika shaxsiy savdo tajribasini, zavod tashkil topgan yillarni, hammuassislikdagi loyihalarni hamda mustaqil jamoat kengashidagi maqomni aniq ajratib ko‘rsatadi.",
      filterAriaLabel: "Rol bo‘yicha filtrlash",
      filters: {
        all: "Barchasi (5)",
        personal: "Shaxsiy tajriba va asoschilik (2)",
        partner: "Hammuassislik va hamkorlik (2)",
        council: "Jamoat kengashi mas’uliyati (1)",
      },
      legend: {
        ariaLabel: "Rollar tasnifi",
        personal: "Shaxsiy savdo tajribasi",
        founding: "Kompaniya tashkili (2009 / 2012)",
        partner: "Hammuassislik va hamkorlik loyihalari",
        council: "Jamoat kengashi raisligi (UZBIC)",
      },
      labels: {
        role: "Maqomi va ishtiroki",
        source: "Manba va tasdiq",
        verify: "Huquqiy va faktik izoh",
        hide: "Izohni yopish",
      },
      steps: [
        {
          id: "early-trade",
          filterCat: "personal",
          tagClass: "tag-personal",
          tag: "Shaxsiy biznes tajribasi",
          period: "2009-yilgacha",
          stageNumber: "01",
          title: "Savdo amaliyoti va birinchi ishlab chiqarish qadamlari",
          summary:
            "Xitoy va Turkiya bilan savdo-logistika aloqalari orqali bozor kon’yunkturasi va xomashyo zanjirlari o‘rganildi. Ushbu tayyorgarlik 2009-yilda Toshkentda dastlabki polimer o‘yinchoqlar sexini boshlashga zamin yaratdi.",
          role: "Shaxsiy savdo va ta’minot amaliyoti",
          source: "Asoschi intervyulari va Spot.uz (2022)",
          verificationNote:
            "Aniq bir yillik boshlanish sanasi hujjatlashtirilmaganligi sababli tasdiqlanmagan raqamlar ishlatilmaydi; tasdiqlangan ishlab chiqarish boshlanishi 2009-yilga to‘g‘ri keladi.",
          milestone: "Dastlabki ta’minot zanjiri va bozor ehtiyojlarini o‘rganish",
          focus: "Xalqaro savdo amaliyoti",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Kompaniya tashkili",
          period: "2009 / 2012",
          stageNumber: "02",
          title: "Toybola Toys fabrikasi va brendining tashkil etilishi",
          summary:
            "2009-yildagi dastlabki sex amaliyotidan so‘ng, 2012-yilda Toybola brendi va zamonaviy zavod quvvatlari rasman tashkil topdi. Termoplast quyish uskunalari va standartlashtirilgan qoliplar yo‘lga qo‘yildi.",
          role: "Asoschi va Hammuassis",
          source: "Korxona arxivi va Gazeta.uz (2020)",
          verificationNote:
            "2009 (sex amaliyoti) va 2012 (zavod tashkili) sanalari birlamchi manbalarda tasdiqlangan; tasdiqlanmagan ishlab chiqarish hajmi raqamlari kiritilmadi.",
          milestone: "To‘liq siklli polimer o‘yinchoqlar fabrikasi ishga tushirilishi",
          focus: "Plastik quyish va mahalliylashtirish",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Hammuassislikdagi sanoat",
          period: "2015 / 2018",
          stageNumber: "03",
          title: "Samtech Masterbatches va Visage Electric hammuassisligi",
          summary:
            "Polimer sanoati uchun rang konsentratlari (Samtech Masterbatches, 2015-yildan) hamda elektrotexnika montaj mahsulotlari (Visage Electric, 2018-yildan) loyihalari hamkorlikda yo‘lga qo‘yildi.",
          role: "Hammuassis / Sanoat hamkori (yakka mulkdor emas)",
          source: "B2B sanoat kooperatsiyasi kelishuvlari",
          verificationNote:
            "Har ikki korxona yakka egalik emas, hammuassislik asosidagi B2B loyihalaridir. Import qaramligi bo‘yicha tasdiqlanmagan foiz ko‘rsatkichlari olib tashlandi.",
          milestone: "Xomashyo va elektrotexnika yo‘nalishlarida B2B sanoat hamkorligi",
          focus: "Zanjirli sanoat kooperatsiyasi",
        },
        {
          id: "horeca-internal-it",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "HoReCa va ichki IT",
          period: "2017 / 2020",
          stageNumber: "04",
          title: "AFIYET Kebab, PURO Gelateria va ichki raqamlashtirish",
          summary:
            "Texnologik xarita va oshxona standartlari asosida 2017-yilda AFIYET Kebab, 2020-yilda PURO Gelateria ochildi. 2019-yildan ekotizim korxonalari uchun ichki ERP va ombor hisoboti tashabbusi shakllantirildi.",
          role: "Asoschi va Hamkor (AFIYET), Hamkor (PURO), Ichki IT tashabbusi",
          source: "Spot.uz rasmiy intervyusi (2020) va ekotizim arxivi",
          verificationNote:
            "AFIYET (2017) va PURO (2020) ochilish sanalari Spot.uz da tasdiqlangan. IT Support & Service alohida dasturiy kompaniya emas, guruh ichidagi xizmat ko‘rsatish tashabbusidir.",
          milestone: "Texnologik xarita va retseptura standartlariga tayangan xizmat modeli",
          focus: "Standartlashtirish va raqamli hisobot",
        },
        {
          id: "uzbic-council",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Jamoat kengashi mas’uliyati",
          period: "2022 - Hozir",
          stageNumber: "05",
          title: "UZBIC Jamoat Kengashi Raisligi va eksport kooperatsiyasi",
          summary:
            "2022-yilda tashkil etilgan O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) raisi sifatida mahalliy ishlab chiqaruvchilar o‘rtasida B2B kooperatsiya va xorijiy bozorlarga chiqish yo‘nalishida jamoat faoliyati olib borilmoqda.",
          role: "Jamoat Kengashi Raisi (xususiy tijorat mulkdorligi emas)",
          source: "uzbic.uz portali va Kun.uz axborotlari",
          verificationNote:
            "UZBIC nodavlat jamoat platformasi bo‘lib, xususiy kompaniya sifatida egalik qilinmaydi va alohida konsalting xizmatlariga kafolat organi hisoblanmaydi.",
          milestone: "Sanoat eksportchilari uchun B2B jamoat kooperatsiyasi",
          focus: "Sanoat diplomatiyasi va eksport",
        },
      ],
    },
    principles: {
      sectionNum: "05",
      moduleLabel: "QOLIP №03 // METODIK STANDART",
      title: "Qolip tamoyili",
      titleEmphasis: "",
      subtitle:
        "Plastik quyish sanoatidan olingan boshqaruv analogiyasi: mahsulot sifati va operatsion barqarorlik inson kayfiyatiga emas, avvaldan aniq loyihalanadigan standart va reglamentlarga tayanadi.",
      statementHeading: "Boshqaruv falsafasi",
      manifesto:
        "Agar biznes rahbar yo‘qligida butunlay to‘xtab qolsa, u hali tizim emas, balki yakka shaxsga bog‘langan ish mexanizmidir. Tadbirkorlikdagi asosiy maqsad: egasiz ham aniq reglament va mas’uliyat asosida ishlay oladigan boshqaruv arxitekturasini shakllantirishdir.",
      frameworkTag: "Qolip metodologiyasi",
      caveat:
        "Boshqaruv metodologiyasi: tijorat natijalariga umumiy kafolat sifatida emas, amaliy tizimlashtirish tamoyili sifatida taqdim etiladi.",
      tablistAriaLabel: "Qolip tamoyili modullari",
      contrastAriaLabel: "Tizimli o‘zgarish solishtirmasi",
      labels: {
        appContext: "Ekotizimdagi kontekst",
        before: "Shaxsga bog‘liq boshqaruv",
        after: "Qolip yondashuvi",
        disclaimer:
          "Eslatma: natijalar kompaniya jamoasi intizomi, bozor kon’yunkturasi va boshqaruv ijrosiga bog‘liq; umumiy moliyaviy kafolat berilmaydi.",
      },
      modules: [
        {
          id: "sop",
          index: "Modul A",
          title: "Texnologik reglamentlar (SOP)",
          shortSummary: "Har bir jarayon qadami yozma hujjatlashtiriladi.",
          description:
            "Korxonadagi har bir qadam (uskuna ishga tushirish va xomashyo qabulidan tortib oshxona texnik xaritalarigacha) yozma standartlar bilan mustahkamlanadi. Xodimlar almashganda ham asosiy ish tartibi saqlanib qoladi.",
          technicalRule: "Qoida: Xodimga emas, hujjatlashtirilgan jarayon protokoliga tayanish",
          appContext:
            "Toybola polimer sexlari, AFIYET Kebab texnik xaritalari va PURO Gelateria sovuq zanjirida qo‘llaniladi.",
          beforeText:
            "Og‘zaki ko‘rsatmalar, ustalar tajribasiga qaramlik va turli smenalarda turlicha sifat.",
          afterText:
            "Takrorlanadigan reglamentlar va yangi xodimlarni standart asosida moslashtirish.",
          iconType: "sop",
        },
        {
          id: "governance",
          index: "Modul B",
          title: "Delegatsiyalash va vakolat chegaralari",
          shortSummary: "Operatsion ijro va strategik boshqaruv aniq ajratiladi.",
          description:
            "Kundalik operatsion xaridlar, smena nazorati va texnik qarorlar asoschi zimmasidan boshqaruvchilar va mas’ul bo‘limlarga o‘tkaziladi. Har bir bo‘limning qaror qabul qilish chegarasi oldindan belgilanadi.",
          technicalRule: "Qoida: Aniq vakolatlar taqsimoti va rahbarlar hisobdorligi",
          appContext:
            "Hammuassislik va tarmoq loyihalarida (Samtech, Visage, Afiyet) sheriklik hamda boshqaruv rollarini taqsimlash tajribasi.",
          beforeText:
            "Har bir xarid, smena va muammo faqat asoschining shaxsiy ruxsati bilan hal qilinishi.",
          afterText:
            "Lavozim vakolatlari, moliya chegaralari va muntazam hisobot intizomi.",
          iconType: "governance",
        },
        {
          id: "metrics",
          index: "Modul C",
          title: "Ichki ERP va raqamli hisobot",
          shortSummary: "Xomashyo sarfi, ombor va tannarx tizimli nazoratda bo‘ladi.",
          description:
            "Zavod omborlaridagi qoldiqlar, xomashyo sarfi, yaroqsiz mahsulot (brak) va mahsulot tannarxi ichki hisob tizimlari hamda ERP vositalari orqali kuzatib boriladi. Bu ko‘rinmas yo‘qotishlarni o‘z vaqtida aniqlashga yordam beradi.",
          technicalRule:
            "Qoida: Taxminlarga emas, hujjatlashtirilgan hisobot ko‘rsatkichlariga tayanish",
          appContext:
            "2019-yildan ekotizim ichidagi korxonalar ehtiyoji uchun shakllantirilgan IT Support & Service ichki tashabbusi.",
          beforeText:
            "Kechikkan oylik hisob-kitoblar, qog‘oz daftarlar va ko‘rinmas xomashyo yo‘qotishlari.",
          afterText:
            "Tizimlashtirilgan ombor hisobi, dinamik tannarx nazorati va shaffof hisobotlar.",
          iconType: "metrics",
        },
        {
          id: "culture",
          index: "Modul D",
          title: "Mas’uliyat madaniyati va tizimni tuzatish",
          shortSummary: "Kamchilik aniqlansa, jarayon protokolining o‘zi takomillashtiriladi.",
          description:
            "Ishlab chiqarish yoki xizmatda og‘ish aniqlanganda faqat ijrochini jazolash uzoq muddatli yechim bermaydi. Har bir xatolik nazorat zanjiri va o‘quv reglamentini kuchaytirish uchun asos sifatida tahlil qilinadi.",
          technicalRule: "Qoida: Jarayondagi bo‘shliqni inson aybi bilan adashtirmaslik",
          appContext:
            "Amaliy tadbirkorlik yo‘lidagi xatolar tahlili hamda ishlab chiqarish jarayonlarini bosqichma-bosqich kalibrlash tajribasi.",
          beforeText:
            "Xato chiqqanda aybdorni izlash, lekin jarayonning o‘zini o‘zgartirmaslik.",
          afterText:
            "Sabablarni tahlil qilish, reglamentni yangilash va jamoaviy mas’uliyat.",
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
      sectionNum: "06",
      title: "Media va",
      titleEmphasis: "intervyular",
      subtitle:
        "Sanoat ishlab chiqarishini qurish, bolalar o‘yinchoqlari eksporti va shaxsiy boshqaruvdan tizimga o‘tish haqidagi tasdiqlangan video suhbatlar hamda rasmiy matbuot yozuvlari.",
      youtubeHeading: "Video suhbatlar va arxiv yozuvlari",
      videosSubmeta: "E’lon qilingan videolar hamda tayyorlanayotgan arxiv ajratilgan",
      pressHeading: "OAV nashrlari va rasmiy ommaviy chiqishlar",
      pressSubmeta: "Kanonik manba havolalari va sahifadagi rasmiy nashr sanalari",
      videoFilters: {
        ariaLabel: "Video holati bo‘yicha saralash",
        all: "Barchasi (3)",
        published: "E’lon qilingan (2)",
        archive: "Arxiv / Rejada (1)",
      },
      pressFilters: {
        ariaLabel: "Nashr toifasi bo‘yicha filtrlash",
        all: "Barchasi (6)",
        profile: "Matbuot intervyulari (3)",
        public: "Forum va UZBIC (3)",
      },
      featured: {
        id: "subyektiv-2021",
        statusLabel: "Tasdiqlangan hujjatli intervyu",
        title: "O‘yinchoq ortidan million: Anvar Abduqayum (SUBYEKTIV)",
        synopsis:
          "Kun.uz huzuridagi SUBYEKTIV loyihasi bilan o‘tkazilgan suhbatda Toybola zavodini nol bosqichdan yo‘lga qo‘yish, ishlab chiqarish qoliplarini mahalliylashtirish va tashqi bozorlarga eksport qilish jarayonlari yoritilgan.",
        channel: "SUBYEKTIV / Kun.uz",
        youtubeId: "yi6UAsstdw4",
        thumbUrl: "https://i.ytimg.com/vi/yi6UAsstdw4/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=yi6UAsstdw4",
        dateIso: "2021-10-23",
        dateFormatted: "23.10.2021",
        duration: "1 soat 09 daqiqa",
        channelLabel: "Loyiha va kanal",
        dateLabel: "E’lon qilingan sana",
        durationLabel: "Davomiyligi",
        playLabel: "Intervyuni ko‘rish",
        watchLabel: "Videoni ochish",
        extLabel: "YouTube’da ko‘rish",
      },
      ui: {
        watchCard: "Pleyerda ko‘rish",
        extCard: "YouTube havolasi",
        readPress: "Maqolani o‘qish",
        archiveSoonBtn: "Yaqinda e’lon qilinadi",
        officialChannelBtn: "Rasmiy YouTube kanali",
        officialChannelUrl: "https://www.youtube.com/@AnvarAbduqayum",
        officialChannelHandleLabel: "YouTube: @AnvarAbduqayum",
        disclosureHeading: "Tahririy manba nazorati",
        disclosureCopy:
          "Ushbu bo‘limga faqat HTTP 200 bilan tasdiqlangan kanonik maqola havolalari hamda asl sahifadagi nashr sanalari kiritildi. Gazeta.uz, Daryo.uz (aniq permalink topilmadi) va Inha.uz (HTTP 500 server xatoligi) havolalari ishonchli tekshirilgunga qadar vaqtincha chiqarib tashlandi.",
        modalExt: "YouTube’da ochish",
        modalClose: "Yopish",
        modalCloseAriaLabel: "Video oynasini yopish",
        modalLoading: "YouTube video pleyer yuklanmoqda…",
        modalFallbackTitle: "Ichki pleyer cheklangan",
        modalFallbackBody:
          "Brauzer yoki tarmoq cheklovi sababli ichki video oynasi ishga tushmadi. Suhbatni to‘g‘ridan-to‘g‘ri rasmiy YouTube sahifasida tomosha qiling.",
        modalWatchYoutube: "YouTube’da tomosha qilish",
      },
      videos: [
        {
          id: "internation-2026",
          filterCat: "published",
          hasCleanPoster: true,
          thumbUrl: "https://i.ytimg.com/vi/4HRt-WTp3-A/maxresdefault.jpg",
          url: "https://www.youtube.com/watch?v=4HRt-WTp3-A",
          dateIso: "2026-01-16",
          dateFormatted: "16.01.2026",
          title:
            "Anvar Abduqayum: Biznesni yaratish tarixi, ishlab chiqarish masshtabi va shaxsiy hayoti",
          channel: "Inter Nation English School",
          summary:
            "Yangi avlod tadbirkorlari uchun ochiq muloqot formatida ishlab chiqarish tizimi, qaror qabul qilish intizomi va oila-biznes muvozanati tahlil qilingan.",
          youtubeId: "4HRt-WTp3-A",
          durationPlaceholder: "59 daqiqa",
          topicBadge: "E’lon qilingan",
          isAvailable: true,
          statusNote: "E’lon qilingan",
        },
        {
          id: "intervyutv-2022",
          filterCat: "published",
          hasCleanPoster: false,
          url: "https://www.youtube.com/watch?v=73WXbwiMBzI",
          dateIso: "2022-02-26",
          dateFormatted: "26.02.2022",
          title:
            "Zavodlar, restoranlar va ishlab chiqarish muhitidan katta hujjatli suhbat",
          channel: "intervyuTV",
          summary:
            "Korxonalar faoliyatini joyida ko‘zdan kechirish: Toybola ishlab chiqarish sexlari va xizmat ko‘rsatish loyihalari bilan bevosita tanishuv.",
          youtubeId: "73WXbwiMBzI",
          durationPlaceholder: "2 soat 26 daqiqa",
          topicBadge: "E’lon qilingan (2 soat+)",
          isAvailable: true,
          statusNote: "E’lon qilingan (2 soat+)",
        },
        {
          id: "archive-pending",
          filterCat: "archive",
          hasCleanPoster: false,
          channelUrl: "https://www.youtube.com/@AnvarAbduqayum",
          dateIso: "2026",
          dateFormatted: "Arxiv rejasida",
          title:
            "Tizimli boshqaruv reglamentlari va sanoat qoliplari bo‘yicha rasmiy video arxiv",
          channel: "@AnvarAbduqayum",
          summary:
            "Avvalgi nomuvofiq video identifikatorlari olib tashlandi; ushbu arxiv uyasi rasmiy kanalga yangi material yuklangunga qadar pleyer so‘rovisiz saqlanadi.",
          youtubeId: "",
          durationPlaceholder: "Montaj jarayonida",
          topicBadge: "Arxiv // Tayyorlanmoqda",
          isAvailable: false,
          statusNote: "Arxiv // Tayyorlanmoqda",
        },
      ],
      pressMentions: [
        {
          id: "spot-2022",
          category: "profile",
          outlet: "Spot.uz",
          articleTitle:
            "Paket va o‘yinchoq korxonalari, restoranlar: 28 yoshida millioner bo‘lgan Anvar Abduqayum hikoyasi",
          contextNote:
            "2005-yildagi paket ishlab chiqarish boshlanishi, Toybola sexi, Afiyet va Puro loyihalari hamda UZBIC faoliyati tahlili.",
          dateIso: "2022-11-17",
          datePlaceholder: "17.11.2022",
          url: "https://www.spot.uz/oz/2022/11/17/anvar-abduqayum/",
          publicationType: "Tahliliy profil",
        },
        {
          id: "kun-export-2022",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "«Hattoki Meksikadan qo‘ng‘iroq qilib, hamkorlik taklif etishdi»: Anvar Abduqayum",
          contextNote:
            "Xalqaro hamkorlik murojaatlari, sifat nazorati va tezkor qarorlar qabul qilish haqida Kun.uz nashriga berilgan suhbat.",
          dateIso: "2022-03-04",
          datePlaceholder: "04.03.2022",
          url: "https://kun.uz/news/2022/03/04/ozbekistondagi-oyinchoqlar-biznesi-lideri-bugun-odamlar-tezkor-vaqt-qimmat-bolib-ketdi",
          publicationType: "Eksport suhbati",
        },
        {
          id: "kun-profile-2021",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "O‘yinchoqlar biznesi qiroli: millioner Anvar Abduqayum bilan suhbat",
          contextNote:
            "SUBYEKTIV video ko‘rsatuvi asosida chop etilgan matnli intervyu va ishlab chiqarish jarayonlari sharhi.",
          dateIso: "2021-10-26",
          datePlaceholder: "26.10.2021",
          url: "https://kun.uz/news/2021/10/26/oyinchoqlar-biznesi-qiroli-millioner-anvar-abduqayum-bilan-suhbat",
          publicationType: "Matbuot reportaji",
        },
        {
          id: "kun-makon-2024",
          category: "public",
          outlet: "Kun.uz",
          articleTitle:
            "Toshkentda sotuvchilar uchun «MAKON Forum» xalqaro forumi o‘tkaziladi",
          contextNote:
            "Kun.uz nashrida 30.04.2024 (14:30) sanasi bilan chop etilgan xabarda ma’ruzachilar qatorida «Toy Bola» asoschisi Anvar Abduqayum chiqishi qayd etilgan.",
          dateIso: "2024-04-30",
          datePlaceholder: "30.04.2024",
          url: "https://kun.uz/news/2024/04/30/toshkentda-sotuvchilar-uchun-makon-forum-xalqaro-forumi-otkaziladi",
          publicationType: "Xalqaro biznes forumi",
        },
        {
          id: "yuz-uzbic-2022",
          category: "public",
          outlet: "Yuz.uz",
          articleTitle:
            "Бизнес-форум в Алматы показал взаимную заинтересованность узбекского и казахстанского бизнеса в расширении сотрудничества",
          contextNote:
            "Asl sarlavha rus tilida (20.09.2022, 08:21). Olmaotadagi forumda O‘zbekiston delegatsiyasiga UZBIC raisi Anvar Abduqayumov boshchilik qilgani qayd etilgan.",
          dateIso: "2022-09-20",
          datePlaceholder: "20.09.2022",
          url: "https://yuz.uz/ru/news/biznes-forum-v-almat-pokazal-vzaimnuyu-zainteresovannost-uzbekskogo-i-kazaxstanskogo-biznesa-v-rasshirenii-sotrudnichestva",
          publicationType: "UZBIC forum hisoboti",
        },
        {
          id: "newtimes-uzbic-2022",
          category: "public",
          outlet: "NewTimes.kz",
          articleTitle:
            "Алматинские предприниматели заключили контракты с бизнесменами из Узбекистана",
          contextNote:
            "Asl sarlavha rus tilida (08.07.2022, 09:03). Qozog‘iston nashri UZBIC kengashi raisi Anvar Abduqayumovning tashqi B2B eksport yo‘laklari haqidagi izohini keltirgan.",
          dateIso: "2022-07-08",
          datePlaceholder: "08.07.2022",
          url: "https://newtimes.kz/ekonomika/153366-almatinskie-predprinimateli-zaklyuchili-kontrakty-s-biznesmenami-iz-uzbekistana",
          publicationType: "UZBIC eksport bayonoti",
        },
      ],
    },
    contact: {
      booking: {
        ordinal: "07.A",
        title: "Uchrashuv va hamkorlik bo‘yicha murojaat",
        lead: "Korxonangizdagi boshqaruv tizimi, sanoat jarayonlari yoki strategik hamkorlik masalalarini muhokama qilish uchun rasmiy Telegram administrator orqali bog‘laning.",
        specs: [
          { label: "Qabul tartibi", value: "Murojaat orqali dastlabki kelishuv" },
          { label: "Muhokama mavzulari", value: "Tizimlashtirish va strategik sheriklik" },
          { label: "Rasmiy kanal", value: "Telegram admin (@anvar_abduqayum_admin)" },
        ],
        cardTitle: "Tasdiqlangan qabul manzili",
        cardDescription: "Uchrashuv va maslahat so‘rovlarini kelishish bevosita rasmiy Telegram administrator orqali olib boriladi.",
        routeLabel: "Rasmiy qabul:",
        primaryCta: "Uchrashuv bo‘yicha yozish",
        telegramCta: "Telegram admin bilan bog‘lanish",
      },
      directory: {
        ordinal: "07.B",
        title: "Rasmiy aloqa kanallari",
        lead: "Tijoriy takliflar, hamkorlik murojaatlari va OAV so‘rovlari faqat quyidagi tasdiqlangan rasmiy manzillar orqali qabul qilinadi.",
        heading: "To‘g‘ridan-to‘g‘ri bog‘lanish",
        subheading: "Matbuot, konsultatsiya va biznes hamkorlik uchun tasdiqlangan rasmiy aloqa nuqtalari.",
        phoneLabel: "Rasmiy telefon raqami",
        tgAdminLabel: "Telegram admin (murojaatlar)",
        tgChannelLabel: "Rasmiy Telegram kanal",
        emailLabel: "Elektron pochta",
        instagramLabel: "Instagram sahifasi",
        youtubeLabel: "YouTube kanali",
        cues: {
          call: "Qo‘ng‘iroq",
          message: "Yozish",
          open: "Ochish",
          email: "Xat",
        },
        officeTitle: "Manzil va vakillik",
        officeCopy: "Toshkent shahri, O‘zbekiston. Murojaatlar rasmiy aloqa kanallari orqali qabul qilinadi.",
      },
      form: {
        title: "Murojaat shakli",
        subtitle: "So‘rovingiz mas’ul jamoa Telegram qabulxonasiga yuboriladi. Barcha majburiy maydonlarni to‘ldiring.",
        nameLabel: "Ismingiz",
        namePlaceholder: "Alisher Karimov",
        phoneLabel: "Telefon raqamingiz",
        phonePlaceholder: "+998 (90) 123-45-67",
        businessLabel: "Kompaniya yoki faoliyat sohasi",
        businessPlaceholder: "Masalan: Plastmassa ishlab chiqarish zavodi",
        topicLabel: "Murojaat yo‘nalishi",
        topicOptions: [
          { id: "coop", label: "Strategik hamkorlik" },
          { id: "consult", label: "Konsultatsiya (tizimlashtirish)" },
          { id: "media", label: "OAV va intervyu" },
          { id: "other", label: "Boshqa masala" },
        ],
        messageLabel: "Qisqacha mazmun",
        messagePlaceholder: "Kompaniyangiz faoliyati va asosiy savolingizni qisqacha yozing...",
        submitButton: "Murojaatni yuborish",
        submitting: "Yuborilmoqda...",
        successTitle: "Murojaatingiz qabul qilindi",
        successMessage: "Ariza Telegram qabulxonasiga muvaffaqiyatli yuborildi. Mas’ul vakillarimiz tez orada siz bilan bog‘lanishadi.",
        resetButton: "Yangi murojaat yuborish",
        telegramFallbackButton: "Telegram admin orqali yozish",
        bookingFallbackButton: "Uchrashuv bo‘yicha yozish",
        callFallbackButton: "Telefon qilish",
        summaryLabels: {
          name: "Ism",
          phone: "Telefon",
          business: "Biznes",
          topic: "Yo‘nalish",
          message: "Mazmun",
          messageEmpty: "Kiritilmagan",
        },
        errors: {
          nameRequired: "Iltimos, ismingizni kiriting (kamida 2 ta belgi, ko‘pi bilan 60 ta).",
          phoneInvalid: "Iltimos, to‘liq O‘zbekiston telefon raqamini kiriting (+998 (XX) XXX-XX-XX).",
          businessRequired: "Iltimos, kompaniya nomi yoki faoliyat sohangizni kiriting (kamida 2 ta belgi).",
          messageTooLong: "Xabar matni 1000 ta belgidan oshmasligi kerak.",
          validationSummary: "Kiritilgan ma’lumotlarni tekshirib, belgilangan maydonlarni to‘g‘rilang.",
          rateLimited: "Juda ko‘p so‘rov yuborildi. Iltimos, biroz kuting yoki Telegram admin orqali bog‘laning.",
          serverError: "Arizani yuborishda server xatosi yuz berdi. Iltimos, qayta urinib ko‘ring yoki Telegram admin orqali bog‘laning.",
          networkError: "Tarmoq bilan bog‘lanishda xatolik yuz berdi. Internet ulanishini tekshiring yoki Telegram admin ga yozing.",
          retrySuffix: "Qayta urinish vaqti (soniya):",
        },
      },
    },
    mobileStickyBar: {
      telegramLabel: "Telegramda yozish",
      callLabel: "Qo'ng'iroq",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Tizimli tadbirkorlik, sanoat ishlab chiqarishi va boshqaruv amaliyoti.",
      bookingCta: "Uchrashuv bo‘yicha yozish",
      navHeading: "Sayt bo‘limlari",
      contactHeading: "Rasmiy aloqa",
      platformsHeading: "Ommaviy kanallar",
      bookingLinkLabel: "Telegram admin orqali bog‘lanish",
      colophonNote: "Anvar Abduqayum, 2026. Toshkent, O‘zbekiston. Boshqaruv va sanoat loyihalari nashri.",
      backToTop: "Sahifa boshiga qaytish",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Asosiy sahifa" },
        { code: "02", anchor: "#xizmatlar", label: "Xizmatlar va dasturlar" },
        { code: "03", anchor: "#portfel", label: "Biznes ekotizimi" },
        { code: "04", anchor: "#yol", label: "Faoliyat yo‘li" },
        { code: "05", anchor: "#tamoyil", label: "Qolip tamoyili" },
        { code: "06", anchor: "#media", label: "Media va intervyular" },
        { code: "07", anchor: "#aloqa", label: "Rasmiy aloqa" },
      ],
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
      ctaButton: "Записаться через Telegram",
      consulting: "Услуги",
      bookingCta: "Записаться через Telegram",
    },
    hero: {
      moduleLabel: "ПРЕСС-ФОРМА №00 // ГЛАВНАЯ МАТРИЦА",
      statusBadge: "ПРОМЫШЛЕННАЯ И ЭКСПОРТНАЯ ЭКОСИСТЕМА",
      dimensionSpec: "СТАНДАРТ: ISO / ГОСТ 2026 // СЕРИЯ: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Работающие без владельца",
      headlineSuffix: " системы и промышленное управление.",
      summary:
        "Анвар Абдукаюм — основатель и соучредитель Toybola Toys, соучредитель промышленных проектов Samtech Masterbatches и Visage Electric, партнер сетей HoReCa и председатель независимой общественной платформы UZBIC. Выведите бизнес из операционной зависимости в системное управление на основе практического опыта.",
      ctaPrimary: "Записаться через Telegram",
      ctaSecondary: "Услуги и программы",
      portraitCaption: "Анвар Абдукаюм",
      blueprintDimensions: {
        width: "МНОГООТРАСЛЕВОЙ",
        tolerance: "СНГ И МИР",
        standard: "ПРОМЫШЛЕННОСТЬ И УПРАВЛЕНИЕ",
      },
      kickerBadge: "МОНОГРАФИЯ // ПРОМЫШЛЕННОСТЬ И УПРАВЛЕНИЕ",
      kickerText: "Ташкент, 2026",
      verifiedMetrics: [
        {
          value: "2009 / 2012",
          label: "Производственная практика и фабрика Toybola",
        },
        {
          value: "2015 — 2022",
          label: "Соучредительство Samtech, Visage, HoReCa и UZBIC",
        },
        {
          value: "7 направлений",
          label: "3 промпроекта, 2 HoReCa, 1 внутренняя IT-система и совет UZBIC",
        },
      ],
      portraitRole: "Промышленник, Инженер-Предприниматель",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
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
      sectionNum: "02",
      tablistAriaLabel: "Программы консультаций",
      eyebrow: "Досье Услуг и Консалтинга",
      title: "4 стратегических направления для владельцев бизнеса и производителей",
      subtitle:
        "Подход, основанный на практике производства, соучредительства и внешней торговли: от системного управления до оптимизации предприятий и экспортной кооперации.",
      labels: {
        programSpec: "СПЕЦИФИКАЦИЯ ПРОГРАММЫ",
        format: "Формат работы",
        audience: "Для кого",
        overview: "Обзор программы",
        focusAreas: "Ключевые направления",
        ctaText: "Записаться через Telegram",
      },
      services: [
        {
          id: "governance",
          code: "Программа 01: Individual governance",
          name: "Системное управление и делегирование",
          shortSummary:
            "Выход собственника из операционной рутины и создание автономной структуры.",
          audience:
            "Собственники и основатели, стремящиеся вывести компанию из хаоса в автономную систему",
          overview:
            "Освобождение основателя от ежедневного микроменеджмента, внедрение прозрачных механизмов делегирования и построение структуры управления на стандартах, а не на ручном контроле.",
          focusAreas: [
            "Четкое разделение операционного менеджмента и стратегии",
            "Поэтапная передача полномочий и ответственности ключевым руководителям",
            "Стандартные регламенты работы, обеспечивающие стабильность без участия владельца",
          ],
          format: "Индивидуальный формат / Практические сессии",
          ctaText: "Написать в Telegram",
        },
        {
          id: "manufacturing",
          code: "Программа 02: Industrial engineering",
          name: "Оптимизация производственных процессов",
          shortSummary:
            "Стандартные регламенты (SOP), анализ себестоимости и контроль качества.",
          audience:
            "Промышленники, масштабирующие заводы и цеха с фокусом на себестоимость",
          overview:
            "Аудит производственной площадки на базе реальной заводской практики: внедрение стандартных операционных регламентов (SOP), технологических карт и снижение потерь сырья.",
          focusAreas: [
            "Внедрение стандартных регламентов (SOP) и учет расхода сырья",
            "Анализ эффективности использования производственных мощностей",
            "Снижение процента брака и сокращение производственного цикла",
          ],
          format: "Практический аудит и работа на площадке",
          ctaText: "Написать в Telegram",
        },
        {
          id: "export",
          code: "Программа 03: Global expansion",
          name: "Экспортное сотрудничество в рамках UZBIC",
          shortSummary:
            "Вывод локальной продукции на зарубежные рынки и B2B-кооперация.",
          audience:
            "Производители, планирующие экспорт или расширение географии поставок",
          overview:
            "Обмен практическим опытом на площадке Совета (UZBIC): адаптация к международным требованиям, поиск зарубежных покупателей и выстраивание внешнеторговых цепочек.",
          focusAreas: [
            "Приведение продукции к международным стандартам и сертификации",
            "Практическая дорожная карта выхода на рынки СНГ и зарубежья",
            "B2B-кооперация и механизмы экспортных консорциумов",
          ],
          format: "Консультация в рамках Совета UZBIC",
          ctaText: "Обратиться по экспорту",
        },
        {
          id: "diagnostic",
          code: "Программа 04: Strategic review",
          name: "Первичный стратегический разбор",
          shortSummary:
            "Выявление ключевых ограничений бизнеса и определение приоритетных шагов.",
          audience:
            "Предприниматели, желающие определить главные узкие места и приоритеты",
          overview:
            "Предварительный разбор: анализ текущего состояния компании, выявление ключевых управленческих или производственных барьеров и согласование дальнейшего формата работы.",
          focusAreas: [
            "Первичный обзор текущих процессов компании",
            "Определение ключевых узких мест в управлении или производстве",
            "Согласование приоритетных шагов и формата дальнейшего взаимодействия",
          ],
          format: "Предварительное рассмотрение по согласованию",
          ctaText: "Записаться через Telegram",
        },
      ],
    },
    portfolio: {
      sectionNum: "03",
      moduleLabel: "МОДУЛЬ 02 // БИЗНЕС-ЭКОСИСТЕМА",
      eyebrow: "БИЗНЕС-ЭКОСИСТЕМА И ПОРТФЕЛЬ ПРЕДПРИЯТИЙ",
      title: "Промышленные проекты, партнерства и независимая общественная платформа",
      titleEmphasis: "",
      subtitle:
        "Четкое разграничение ролей и юридического статуса: производственные предприятия, сети HoReCa, внутренняя IT-инфраструктура и независимый общественный совет UZBIC.",
      moldLegend: "ПРОМЫШЛЕННАЯ ЭКОСИСТЕМА // 7 НАПРАВЛЕНИЙ",
      taxonomy: {
        ariaLabel: "Классификация ролей",
        founder: "Основатель / Соучредитель (Toybola, Afiyet)",
        partner: "Промышленное соучредительство и партнерство (Samtech, Visage, Puro)",
        internal: "Внутренняя IT-инициатива (не отдельная корпорация)",
        public: "Независимый общественный совет (UZBIC, не частный бизнес)",
      },
      groups: {
        ventures: "Промышленные предприятия, партнерства и внутренняя IT-система",
        council: "Независимая общественная платформа (не частный актив)",
      },
      councilHighlight: {
        pill: "Независимая общественная платформа: не частный бизнес",
        title: "Совет по бизнесу и промышленности Узбекистана (UZBIC)",
        desc: "Основанный в 2022 году Совет (UZBIC) является независимой общественной платформой, объединяющей производителей и экспортеров для развития промышленной кооперации и выхода на внешние рынки.",
        legalNote:
          "Правовое разграничение: Анвар Абдукаюм не является частным владельцем или коммерческим собственником платформы, а выступает Председателем Общественного Совета.",
        detailBtn: "Подробнее о совете",
        roleLabel: "Статус / Роль:",
        roleValue: "Председатель Совета (общественный статус)",
        typeLabel: "Тип организации:",
        typeValue: "Независимая негосударственная платформа",
        sourceLabel: "Источник:",
        sourceValue: "uzbic.uz, публикации Kun.uz",
      },
      filters: {
        all: "Все (7)",
        mfg: "Производство (3)",
        horeca: "HoReCa (2)",
        service: "Внутренний IT (1)",
        council: "Общественный совет (1)",
      },
      detailBtn: "Подробнее",
      closeBtn: "Закрыть",
      modal: {
        role: "Роль Анвара Абдукаюма",
        period: "Период деятельности",
        sector: "Отрасль / Сектор",
        model: "Модель управления",
        status: "Фактический и юридический статус",
        source: "Источник и верификация",
        caps: "Технологические и отраслевые направления",
        officialSite: "Официальный сайт",
        noWebsiteNote: "Внутренняя / B2B-система: отдельный публичный сайт не представлен",
        closeAriaLabel: "Закрыть окно",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "01: Полимерная индустрия",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          roleBadge: "Основатель и Соучредитель",
          monogram: "TB",
          badge: "ПРОИЗВОДСТВО // ЗАВОД",
          year: "2009 / 2012",
          activity: "Фабрика детских полимерных игрушек",
          desc: "Производственное предприятие: первые цеха с 2009 года, официальный запуск бренда и заводских мощностей Toybola в 2012 году.",
          fullDesc: "Начиная с практик 2009 года, в 2012 году была запущена современная фабрика Toybola. Операционные процессы выстроены на базе регламентов литья под давлением и управленческой системы.",
          role: "Основатель и Соучредитель",
          period: "С 2009 деят-сть / с 2012 завод",
          sector: "Полимерная промышленность",
          model: "Регламенты (SOP) и совет директоров",
          categoryBadge: "Промышленность & Полимеры",
          tags: ["Литье пластика", "Стандарты (SOP)", "Экспорт в СНГ"],
          status: "Подтвержденное производственное предприятие",
          source: "Архив предприятия и Gazeta.uz (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Подтвержденный производственный актив]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "02: Химкомплекс",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-partner",
          roleBadge: "Соучредитель / Партнер (не единственный владелец)",
          monogram: "SM",
          badge: "ПРОИЗВОДСТВО // ХИМИЯ",
          year: "С 2015 года",
          activity: "Производство полимерного сырья и мастербатчей",
          desc: "Промышленный проект в соучредительстве по выпуску красящих концентратов и модификаторов для полимерной индустрии.",
          fullDesc: "Промышленный проект по выпуску модификаторов и красителей-мастербатчей для полимерных заводов. Реализован в партнерстве и соучредительстве (без единоличной собственности).",
          role: "Соучредитель / Партнер (не единственный владелец)",
          period: "С 2015 года (Промышленный проект)",
          sector: "Химическая промышленность",
          model: "B2B-поставки и партнерское управление",
          categoryBadge: "Химический Комплекс",
          tags: ["Химпром", "Модификаторы", "B2B сырье"],
          status: "Промышленный проект на базе соучредительства",
          source: "Соглашения о промышленной кооперации",
          hasLogo: false,
          assetLabel: "[Партнерский производственный проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "03: Электротехника",
          category: "mfg",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Соучредитель / Партнер (не единственный владелец)",
          monogram: "VE",
          badge: "ПРОИЗВОДСТВО",
          year: "С 2018 года",
          activity: "Электротехническое оборудование и комплектующие",
          desc: "Соучредительский промышленный проект по выпуску выключателей, розеток и электроустановочной продукции.",
          fullDesc: "Проект по серийному выпуску сертифицированной электротехники на автоматизированных линиях сборки, созданный на принципах промышленного соучредительства и партнерства.",
          role: "Соучредитель / Партнер (не единственный владелец)",
          period: "С 2018 года (Промышленный проект)",
          sector: "Электротехническая отрасль",
          model: "Автоматизированные линии и B2B/B2C",
          categoryBadge: "Электротехника",
          tags: ["Электротехника", "Сборочная линия", "Стандарты"],
          status: "Промышленный проект в соучредительстве",
          source: "Кооперационные данные отрасли",
          hasLogo: false,
          assetLabel: "[Партнерский производственный проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "04: HoReCa рестораны",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          roleBadge: "Основатель и Партнер",
          monogram: "AF",
          badge: "HORECA // РЕСТОРАН",
          year: "С 2017 года",
          activity: "Сеть ресторанов турецкой кухни",
          desc: "Сеть ресторанов со стандартизированными технологическими картами кухни. Первый ресторан открыт в 2017 году.",
          fullDesc: "Как подтверждено в интервью Spot.uz, первый ресторан Afiyet открылся в 2017 году. Работа сети построена на единых рецептурных и операционных стандартах.",
          role: "Основатель и Партнер",
          period: "С 2017 года (Интервью Spot)",
          sector: "HoReCa и общественное питание",
          model: "Стандартизированное управление кухней",
          categoryBadge: "Общественное питание",
          tags: ["Техкарты кухни", "Fast-Casual", "Сеть HoReCa"],
          status: "Подтвержденная сеть ресторанов",
          source: "Официальное интервью Spot.uz (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Подтвержденный ресторанный актив]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "05: HoReCa кафе",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Партнер и Инициатор",
          monogram: "PR",
          badge: "HORECA // КАФЕ",
          year: "С 2020 года",
          activity: "Сеть кафе-джелатерий",
          desc: "Кафе-кондитерская сеть на основе итальянской рецептуры и холодовой логистики. Первая точка открыта в 2020 году.",
          fullDesc: "Согласно интервью Spot.uz, первая точка Puro открылась в 2020 году. Проект объединяет натуральную рецептуру и контролируемую логистику холодовой цепи.",
          role: "Партнер и Инициатор",
          period: "С 2020 года (Интервью Spot)",
          sector: "HoReCa и кондитерский сектор",
          model: "Партнерское управление",
          categoryBadge: "Кафе & Кондитерская",
          tags: ["Холодовая логистика", "Итальянская рецептура", "HoReCa"],
          status: "Подтвержденная сеть джелатерий",
          source: "Официальное интервью Spot.uz (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Подтвержденный актив сети кафе]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "06: Внутренняя инфраструктура",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          roleBadge: "Внутренняя инициатива (не отдельная IT-компания)",
          monogram: "IT",
          badge: "B2B СЕРВИС // IT СИСТЕМЫ",
          year: "С 2019 года",
          activity: "Цифровизация внутренних ERP и складских процессов",
          desc: "Операционная IT-команда, созданная для автоматизации учета, складов и управленческой отчетности внутри действующих предприятий.",
          fullDesc: "Внутренняя инфраструктурная инициатива, обеспечивающая сквозную цифровизацию и ERP-контроль для промышленных и сервисных проектов. Не позиционируется как самостоятельная софтверная корпорация.",
          role: "Инициатор и Консультант по внутренним системам",
          period: "С 2019 года (Внутренняя IT-инициатива)",
          sector: "Внутренняя IT-инфраструктура",
          model: "Внутренняя интеграция процессов",
          categoryBadge: "B2B Цифровой Сервис",
          tags: ["Внутренний ERP", "Учет складов", "Отчетность"],
          status: "Внутренняя инициатива цифровизации",
          source: "Внутренняя инфраструктура экосистемы",
          hasLogo: false,
          assetLabel: "[Внутренняя инициатива цифровизации]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "Совет по бизнесу и промышленности Узбекистана (UZBIC)",
          code: "07: Независимый общественный совет",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          roleBadge: "Председатель Совета (общественный статус)",
          monogram: "UZ",
          badge: "ПРОМЫШЛЕННЫЙ СОВЕТ // ПЛАТФОРМА",
          year: "С 2022 года",
          activity: "Деловой и промышленный совет Узбекистана",
          desc: "Деловой и промышленный совет Узбекистана — независимая общественная платформа, объединяющая местных производителей и экспортеров.",
          fullDesc: "Основанный в 2022 году Совет (UZBIC) является независимой негосударственной общественной платформой для промышленников и экспортеров. Анвар Абдукаюм выступает в роли Председателя Общественного Совета, не являясь частным собственником организации.",
          role: "Председатель Совета (общественный статус, не собственник)",
          period: "С 2022 года (Деятельность Совета)",
          sector: "Промышленная дипломатия и экспортная кооперация",
          model: "Независимая B2B-платформа и экспортные консорциумы",
          categoryBadge: "Промышленный Совет & Платформа",
          tags: ["Международный экспорт", "Кооперация", "Общественная платформа"],
          status: "Независимая общественная платформа (не частная компания)",
          source: "Портал uzbic.uz и публикации Kun.uz",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Общественная платформа // Не коммерческий актив]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      sectionNum: "04",
      moduleLabel: "ПРЕСС-ФОРМА №02 // ХРОНИКА РАЗВИТИЯ",
      title: "Пройденный путь",
      titleEmphasis: "",
      subtitle:
        "Системный бизнес не строится за один день. Хроника разграничивает личный торговый опыт, годы основания предприятий, партнерские проекты и статус в общественном совете.",
      filterAriaLabel: "Фильтр по роли и статусу",
      filters: {
        all: "Все этапы (5)",
        personal: "Личный опыт и основание (2)",
        partner: "Соучредительство и партнерство (2)",
        council: "Общественный совет UZBIC (1)",
      },
      legend: {
        ariaLabel: "Классификация ролей",
        personal: "Личный опыт торговли",
        founding: "Основание завода (2009 / 2012)",
        partner: "Промышленное соучредительство и HoReCa",
        council: "Председательство в совете UZBIC",
      },
      labels: {
        role: "Роль и правовой статус",
        source: "Источник верификации",
        verify: "Фактическое уточнение",
        hide: "Скрыть уточнение",
      },
      steps: [
        {
          id: "early-trade",
          filterCat: "personal",
          tagClass: "tag-personal",
          tag: "Личный опыт торговли",
          period: "До 2009 года",
          stageNumber: "01",
          title: "Школа торговли и первые шаги к производству",
          summary:
            "Изучение оптовой торговли, рыночного спроса и поставок сырья из Китая и Турции сформировало базу для перехода к первым производственным цехам в 2009 году.",
          role: "Личная предпринимательская и торговая практика",
          source: "Интервью основателя и Spot.uz (2022)",
          verificationNote:
            "Без непроверенных точных дат старта; документально подтвержденный переход к производственным цехам относится к 2009 году.",
          milestone: "Формирование цепочек поставок и понимание спроса",
          focus: "Международная торговля",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Основание предприятия",
          period: "2009 / 2012",
          stageNumber: "02",
          title: "Основание фабрики и бренда Toybola Toys",
          summary:
            "После цеховых практик 2009 года в 2012 году были официально основаны бренд и фабрика Toybola с автоматизированным литьем пластмасс под давлением.",
          role: "Основатель и Соучредитель",
          source: "Архив предприятия и Gazeta.uz (2020)",
          verificationNote:
            "Даты 2009 (цех) и 2012 (завод) подтверждены архивом и публикациями; неподтвержденные объемы выпуска исключены.",
          milestone: "Запуск полноцикличного полимерного производства",
          focus: "Литье пластика и локализация",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Промышленное соучредительство",
          period: "2015 / 2018",
          stageNumber: "03",
          title: "Соучредительство в Samtech Masterbatches и Visage Electric",
          summary:
            "На принципах промышленного партнерства запущены проекты выпуска полимерных красителей Samtech Masterbatches (с 2015 г.) и электротехники Visage Electric (с 2018 г.).",
          role: "Соучредитель / Партнер (совместный капитал)",
          source: "Соглашения о промышленной кооперации",
          verificationNote:
            "Оба проекта созданы в соучредительстве и не являются единоличной собственностью. Неподтвержденные проценты импортозамещения удалены.",
          milestone: "B2B-кооперация в полимерном сырье и электротехнике",
          focus: "Цепочки промышленной кооперации",
        },
        {
          id: "horeca-internal-it",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "HoReCa и внутренний IT",
          period: "2017 / 2020",
          stageNumber: "04",
          title: "AFIYET Kebab, PURO Gelateria и внутренняя цифровизация",
          summary:
            "В 2017 году открылся первый ресторан AFIYET Kebab, а в 2020 году заработала точка PURO Gelateria на стандартах техкарт. С 2019 года развивается внутренняя IT-инициатива учета.",
          role: "Основатель и партнер (AFIYET), партнер (PURO), инициатор внутреннего IT",
          source: "Официальное интервью Spot.uz (2020) и архив экосистемы",
          verificationNote:
            "Даты запуска AFIYET (2017) и PURO (2020) подтверждены Spot.uz. IT Support & Service является внутренней инфраструктурной инициативой, а не внешней корпорацией.",
          milestone: "Стандартизированные техкарты кухни и внутренний ERP-учет",
          focus: "Стандартизация и цифровизация",
        },
        {
          id: "uzbic-council",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Общественный статус (UZBIC)",
          period: "2022 - Сегодня",
          stageNumber: "05",
          title: "Председательство в совете UZBIC и экспортная повестка",
          summary:
            "С 2022 года в статусе Председателя Общественного Совета UZBIC координируется B2B-кооперация местных производителей и расширение экспортных каналов.",
          role: "Председатель Совета (общественный статус, не частный актив)",
          source: "Портал uzbic.uz и публикации Kun.uz",
          verificationNote:
            "UZBIC является независимой негосударственной общественной платформой и не выступает частной собственностью или гарантом консалтинговых услуг.",
          milestone: "Развитие B2B экспортной кооперации на базе совета",
          focus: "Промышленная дипломатия и экспорт",
        },
      ],
    },
    principles: {
      sectionNum: "05",
      moduleLabel: "ПРЕСС-ФОРМА №03 // МЕТОДОЛОГИЯ СИСТЕМЫ",
      title: "Принцип «Колип»",
      titleEmphasis: "",
      subtitle:
        "Управленческая аналогия из промышленного литья: устойчивость результата определяется не ручным контролем собственника, а заранее выстроенным стандартом процессов.",
      statementHeading: "Философия управления",
      manifesto:
        "Если бизнес полностью останавливается в отсутствие владельца, он все еще держится на личном контроле. Цель системного управления: выстроить рабочую архитектуру на четких регламентах и ответственности команды.",
      frameworkTag: "Методология «Колип»",
      caveat:
        "Методология управления представлена как практический ориентир систематизации, а не как коммерческая гарантия результата.",
      tablistAriaLabel: "Модули принципа Колип",
      contrastAriaLabel: "Сравнение подходов управления",
      labels: {
        appContext: "Контекст применения",
        before: "Ручной контроль",
        after: "Подход «Колип»",
        disclaimer:
          "Примечание: эффективность внедрения зависит от управленческой дисциплины предприятия и рыночных условий; прямые финансовые гарантии не даются.",
      },
      modules: [
        {
          id: "sop",
          index: "Модуль A",
          title: "Технологические регламенты (SOP)",
          shortSummary: "Каждый этап процесса зафиксирован в регламентах.",
          description:
            "Ключевые действия (от приемки сырья и запуска линий до кулинарных техкарт) закреплены в письменных регламентах, позволяющих сохранять единый стандарт при ротации персонала.",
          technicalRule: "Правило: Опора на протокол процесса, а не на привычки отдельных лиц",
          appContext:
            "Применяется на производстве Toybola, а также в техкартах кухни AFIYET Kebab и логистике PURO.",
          beforeText:
            "Устные распоряжения, зависимость от конкретных мастеров и нестабильность от смены к смене.",
          afterText:
            "Повторяемые регламенты (SOP) и ввод сотрудников в работу по единому стандарту.",
          iconType: "sop",
        },
        {
          id: "governance",
          index: "Модуль B",
          title: "Делегирование и границы полномочий",
          shortSummary: "Четкое разделение операционной рутины и стратегии.",
          description:
            "Повседневное управление закупками, сменами и текущими операциями передается профильным руководителям с четко очерченными рамками полномочий и регулярной отчетностью.",
          technicalRule: "Правило: Поэтапное делегирование полномочий и подотчетность",
          appContext:
            "Опыт разделения зон ответственности в производственных партнерствах и сети ресторанов.",
          beforeText:
            "Необходимость личного участия собственника в каждом мелком согласовании.",
          afterText:
            "Закрепленные должностные полномочия, финансовые лимиты и отчетная дисциплина.",
          iconType: "governance",
        },
        {
          id: "metrics",
          index: "Модуль C",
          title: "Внутренний ERP и цифровой учет",
          shortSummary: "Склады, расход сырья и себестоимость в едином контуре.",
          description:
            "Остатки на складах, списание сырья, процент брака и калькуляция себестоимости контролируются через внутренние инструменты учета и ERP-отчетность для выявления потерь.",
          technicalRule: "Правило: Опора на фактический учет, а не на субъективные оценки",
          appContext:
            "Внутренняя инфраструктурная инициатива IT Support & Service, действующая с 2019 года.",
          beforeText:
            "Запоздалые итоги месяца на бумаге и неучтенные потери сырья на линии.",
          afterText:
            "Регулярный складской учет, контроль себестоимости и прозрачные дашборды.",
          iconType: "metrics",
        },
        {
          id: "culture",
          index: "Модуль D",
          title: "Культура ответственности и улучшение системы",
          shortSummary: "Отклонения устраняются через доработку самого процесса.",
          description:
            "При выявлении сбоя поиск виновных не решает системную причину. Разбор ошибок используется для усиления инструкций, точек контроля и обучения команды.",
          technicalRule: "Правило: Отделять пробелы регламента от личной ошибки",
          appContext:
            "Опыт разбора управленческих ошибок и поэтапной донастройки производственных стандартов.",
          beforeText: "Поиск крайнего при сбое без изменения самой инструкции.",
          afterText:
            "Разбор первопричин, обновление регламентов и ответственное отношение к стандарту.",
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
      sectionNum: "06",
      title: "Медиа и",
      titleEmphasis: "интервью",
      subtitle:
        "Подтверждённые видеоинтервью и официальные публикации о развитии производства, системном управлении и экспортной кооперации UZBIC.",
      youtubeHeading: "Видеоинтервью и архивные материалы",
      videosSubmeta: "Опубликованные выпуски и материалы в подготовке разделены",
      pressHeading: "Публикации в СМИ и официальные форумы",
      pressSubmeta: "Канонические ссылки и точные даты с исходных страниц",
      videoFilters: {
        ariaLabel: "Фильтр по статусу видео",
        all: "Все материалы (3)",
        published: "Опубликовано (2)",
        archive: "Архив / В работе (1)",
      },
      pressFilters: {
        ariaLabel: "Фильтр по категории публикаций",
        all: "Все публикации (6)",
        profile: "Интервью в прессе (3)",
        public: "Форумы и UZBIC (3)",
      },
      featured: {
        id: "subyektiv-2021",
        statusLabel: "Подтверждённое документальное интервью",
        title: "Миллион на игрушках: Анвар Абдукаюм (SUBYEKTIV)",
        synopsis:
          "В документальном выпуске проекта SUBYEKTIV (Kun.uz) раскрыты история запуска фабрики Toybola, локализация пресс-форм и первые шаги к экспорту продукции.",
        channel: "SUBYEKTIV / Kun.uz",
        youtubeId: "yi6UAsstdw4",
        thumbUrl: "https://i.ytimg.com/vi/yi6UAsstdw4/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=yi6UAsstdw4",
        dateIso: "2021-10-23",
        dateFormatted: "23.10.2021",
        duration: "1 ч 09 мин",
        channelLabel: "Проект и канал",
        dateLabel: "Дата публикации",
        durationLabel: "Длительность",
        playLabel: "Смотреть интервью",
        watchLabel: "Открыть видео",
        extLabel: "Открыть на YouTube",
      },
      ui: {
        watchCard: "Смотреть в плеере",
        extCard: "Ссылка YouTube",
        readPress: "Читать материал",
        archiveSoonBtn: "Ожидается публикация",
        officialChannelBtn: "Официальный канал YouTube",
        officialChannelUrl: "https://www.youtube.com/@AnvarAbduqayum",
        officialChannelHandleLabel: "YouTube: @AnvarAbduqayum",
        disclosureHeading: "Проверка источников и полноты архива",
        disclosureCopy:
          "Включены исключительно канонические URL со статусом HTTP 200 и датами публикации с самих страниц-источников. Ссылки без подтверждённых статей (Gazeta.uz, Daryo.uz) и временно недоступные страницы (Inha.uz HTTP 500) не включены в опубликованный список.",
        modalExt: "Открыть на YouTube",
        modalClose: "Закрыть",
        modalCloseAriaLabel: "Закрыть видеоплеер",
        modalLoading: "Загрузка видеоплеера YouTube…",
        modalFallbackTitle: "Встроенный плеер ограничен",
        modalFallbackBody:
          "В текущем браузере или при сетевом ограничении встроенное воспроизведение недоступно. Вы можете открыть интервью напрямую на YouTube.",
        modalWatchYoutube: "Смотреть на YouTube",
      },
      videos: [
        {
          id: "internation-2026",
          filterCat: "published",
          hasCleanPoster: true,
          thumbUrl: "https://i.ytimg.com/vi/4HRt-WTp3-A/maxresdefault.jpg",
          url: "https://www.youtube.com/watch?v=4HRt-WTp3-A",
          dateIso: "2026-01-16",
          dateFormatted: "16.01.2026",
          title:
            "Анвар Абдукаюм: История создания бизнеса, масштаб производства и личный путь",
          channel: "Inter Nation English School",
          summary:
            "Открытая беседа о производственной дисциплине, масштабировании предприятий и управленческих решениях нового этапа.",
          youtubeId: "4HRt-WTp3-A",
          durationPlaceholder: "59 мин",
          topicBadge: "Опубликовано",
          isAvailable: true,
          statusNote: "Опубликовано",
        },
        {
          id: "intervyutv-2022",
          filterCat: "published",
          hasCleanPoster: false,
          url: "https://www.youtube.com/watch?v=73WXbwiMBzI",
          dateIso: "2022-02-26",
          dateFormatted: "26.02.2022",
          title:
            "Большое документальное интервью на заводах, в ресторанах и цехах (intervyuTV)",
          channel: "intervyuTV",
          summary:
            "Выездное интервью непосредственно на производственных площадках фабрики Toybola и в проектах сферы обслуживания.",
          youtubeId: "73WXbwiMBzI",
          durationPlaceholder: "2 ч 26 мин",
          topicBadge: "Опубликовано (2 ч+)",
          isAvailable: true,
          statusNote: "Опубликовано (2 ч+)",
        },
        {
          id: "archive-pending",
          filterCat: "archive",
          hasCleanPoster: false,
          channelUrl: "https://www.youtube.com/@AnvarAbduqayum",
          dateIso: "2026",
          dateFormatted: "Архив в работе",
          title:
            "Официальный видеоархив по регламентам управления и производственным стандартам",
          channel: "@AnvarAbduqayum",
          summary:
            "Прежние несоответствующие идентификаторы удалены; слот сохранён для предстоящих публикаций официального канала без загрузки сторонних миниатюр.",
          youtubeId: "",
          durationPlaceholder: "На этапе монтажа",
          topicBadge: "Архив // В подготовке",
          isAvailable: false,
          statusNote: "Архив // В подготовке",
        },
      ],
      pressMentions: [
        {
          id: "spot-2022",
          category: "profile",
          outlet: "Spot.uz",
          articleTitle:
            "Пакеты, игрушки и рестораны: как Анвар Абдукаюм стал долларовым миллионером в 28 лет",
          contextNote:
            "История запуска производства упаковки в 2005 году, фабрики Toybola, ресторанов Afiyet и Puro и работы UZBIC.",
          dateIso: "2022-11-17",
          datePlaceholder: "17.11.2022",
          url: "https://www.spot.uz/ru/2022/11/17/abduqayum/",
          publicationType: "Аналитический профиль",
        },
        {
          id: "kun-export-2022",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "«Hattoki Meksikadan qo‘ng‘iroq qilib, hamkorlik taklif etishdi»: Anvar Abduqayum (Kun.uz)",
          contextNote:
            "Оригинальный материал Kun.uz на узбекском языке о международных запросах на сотрудничество и темпах роста производства.",
          dateIso: "2022-03-04",
          datePlaceholder: "04.03.2022",
          url: "https://kun.uz/news/2022/03/04/ozbekistondagi-oyinchoqlar-biznesi-lideri-bugun-odamlar-tezkor-vaqt-qimmat-bolib-ketdi",
          publicationType: "Интервью об экспорте",
        },
        {
          id: "kun-profile-2021",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "O‘yinchoqlar biznesi qiroli: millioner Anvar Abduqayum bilan suhbat (Kun.uz)",
          contextNote:
            "Текстовое интервью на базе выпуска SUBYEKTIV о масштабе производства игрушек в Узбекистане.",
          dateIso: "2021-10-26",
          datePlaceholder: "26.10.2021",
          url: "https://kun.uz/news/2021/10/26/oyinchoqlar-biznesi-qiroli-millioner-anvar-abduqayum-bilan-suhbat",
          publicationType: "Пресс-репортаж",
        },
        {
          id: "kun-makon-2024",
          category: "public",
          outlet: "Kun.uz",
          articleTitle:
            "Toshkentda sotuvchilar uchun «MAKON Forum» xalqaro forumi o‘tkaziladi (Kun.uz)",
          contextNote:
            "Публикация Kun.uz от 30.04.2024 (14:30) о спикерах форума с указанием выступления основателя «Toy Bola» Анвара Абдукаюма.",
          dateIso: "2024-04-30",
          datePlaceholder: "30.04.2024",
          url: "https://kun.uz/news/2024/04/30/toshkentda-sotuvchilar-uchun-makon-forum-xalqaro-forumi-otkaziladi",
          publicationType: "Международный бизнес-форум",
        },
        {
          id: "yuz-uzbic-2022",
          category: "public",
          outlet: "Yuz.uz",
          articleTitle:
            "Бизнес-форум в Алматы показал взаимную заинтересованность узбекского и казахстанского бизнеса в расширении сотрудничества",
          contextNote:
            "Официальный отчёт от 20.09.2022 (08:21) об участии делегации во главе с председателем совета UZBIC Анваром Абдукаюмовым.",
          dateIso: "2022-09-20",
          datePlaceholder: "20.09.2022",
          url: "https://yuz.uz/ru/news/biznes-forum-v-almat-pokazal-vzaimnuyu-zainteresovannost-uzbekskogo-i-kazaxstanskogo-biznesa-v-rasshirenii-sotrudnichestva",
          publicationType: "Отчёт форума UZBIC",
        },
        {
          id: "newtimes-uzbic-2022",
          category: "public",
          outlet: "NewTimes.kz",
          articleTitle:
            "Алматинские предприниматели заключили контракты с бизнесменами из Узбекистана",
          contextNote:
            "Публикация от 08.07.2022 (09:03) с прямой цитатой председателя Совета бизнеса и промышленности Узбекистана UZBIC Анвара Абдукаюмова.",
          dateIso: "2022-07-08",
          datePlaceholder: "08.07.2022",
          url: "https://newtimes.kz/ekonomika/153366-almatinskie-predprinimateli-zaklyuchili-kontrakty-s-biznesmenami-iz-uzbekistana",
          publicationType: "Комментарий UZBIC для СМИ",
        },
      ],
    },
    contact: {
      booking: {
        ordinal: "07.A",
        title: "Обращение по встрече и сотрудничеству",
        lead: "Чтобы обсудить систему управления бизнесом, производственные процессы или стратегическое партнерство, свяжитесь через официального Telegram-администратора.",
        specs: [
          { label: "Порядок обращения", value: "Предварительное согласование по заявке" },
          { label: "Темы обсуждения", value: "Систематизация и стратегическое партнерство" },
          { label: "Официальный канал", value: "Telegram admin (@anvar_abduqayum_admin)" },
        ],
        cardTitle: "Подтвержденный контакт для записи",
        cardDescription: "Согласование встреч и консультационных запросов ведется напрямую через официального Telegram-администратора.",
        routeLabel: "Официальный контакт:",
        primaryCta: "Записаться через Telegram",
        telegramCta: "Связаться через Telegram admin",
      },
      directory: {
        ordinal: "07.B",
        title: "Официальные каналы связи",
        lead: "Деловые предложения, запросы на партнерство и обращения СМИ принимаются исключительно по указанным официальным контактам.",
        heading: "Прямая связь",
        subheading: "Подтвержденные каналы связи для прессы, консультаций и делового сотрудничества.",
        phoneLabel: "Официальный телефон",
        tgAdminLabel: "Telegram администратора (обращения)",
        tgChannelLabel: "Официальный Telegram канал",
        emailLabel: "Электронная почта",
        instagramLabel: "Страница Instagram",
        youtubeLabel: "Канал YouTube",
        cues: {
          call: "Позвонить",
          message: "Написать",
          open: "Открыть",
          email: "Письмо",
        },
        officeTitle: "Локация и формат",
        officeCopy: "Ташкент, Узбекистан. Обращения принимаются через официальные каналы связи.",
      },
      form: {
        title: "Форма обращения",
        subtitle: "Заявка поступает напрямую в приемную Telegram. Пожалуйста, заполните все обязательные поля.",
        nameLabel: "Ваше имя",
        namePlaceholder: "Алишер Каримов",
        phoneLabel: "Номер телефона",
        phonePlaceholder: "+998 (90) 123-45-67",
        businessLabel: "Компания или сфера деятельности",
        businessPlaceholder: "Например: Полимерное производство",
        topicLabel: "Направление запроса",
        topicOptions: [
          { id: "coop", label: "Стратегическое партнерство" },
          { id: "consult", label: "Консультация (систематизация)" },
          { id: "media", label: "СМИ и интервью" },
          { id: "other", label: "Другой вопрос" },
        ],
        messageLabel: "Краткое содержание",
        messagePlaceholder: "Кратко опишите сферу бизнеса и ваш ключевой вопрос...",
        submitButton: "Отправить обращение",
        submitting: "Отправка...",
        successTitle: "Обращение успешно принято",
        successMessage: "Ваша заявка доставлена в приемную Telegram. Ответственные специалисты свяжутся с вами в ближайшее время.",
        resetButton: "Отправить новое обращение",
        telegramFallbackButton: "Написать в Telegram admin",
        bookingFallbackButton: "Записаться через Telegram",
        callFallbackButton: "Позвонить",
        summaryLabels: {
          name: "Имя",
          phone: "Телефон",
          business: "Бизнес",
          topic: "Направление",
          message: "Сообщение",
          messageEmpty: "Не заполнено",
        },
        errors: {
          nameRequired: "Пожалуйста, введите имя (от 2 до 60 символов).",
          phoneInvalid: "Пожалуйста, введите полный номер Узбекистана (+998 (XX) XXX-XX-XX).",
          businessRequired: "Пожалуйста, укажите компанию или сферу бизнеса (не менее 2 символов).",
          messageTooLong: "Текст обращения не должен превышать 1000 символов.",
          validationSummary: "Проверьте отмеченные поля и исправьте ошибки ввода.",
          rateLimited: "Слишком много запросов. Пожалуйста, подождите минуту или напишите в Telegram admin.",
          serverError: "Техническая ошибка при отправке заявки. Пожалуйста, повторите попытку или напишите в Telegram admin.",
          networkError: "Ошибка сети. Проверьте подключение к интернету или свяжитесь через Telegram admin.",
          retrySuffix: "Повторная попытка через (сек):",
        },
      },
    },
    mobileStickyBar: {
      telegramLabel: "Написать в Telegram",
      callLabel: "Позвонить",
    },
    footer: {
      founderName: "Анвар Абдукаюм",
      tagline: "Системное предпринимательство, промышленное производство и управленческая практика.",
      bookingCta: "Записаться через Telegram",
      navHeading: "Разделы сайта",
      contactHeading: "Официальная связь",
      platformsHeading: "Публичные каналы",
      bookingLinkLabel: "Связаться через Telegram admin",
      colophonNote: "Анвар Абдукаюм, 2026. Ташкент, Узбекистан. Издание о системном управлении и производстве.",
      backToTop: "Наверх",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Главная" },
        { code: "02", anchor: "#xizmatlar", label: "Услуги и программы" },
        { code: "03", anchor: "#portfel", label: "Экосистема бизнесов" },
        { code: "04", anchor: "#yol", label: "Путь предпринимателя" },
        { code: "05", anchor: "#tamoyil", label: "Принцип Qolip" },
        { code: "06", anchor: "#media", label: "Медиа и интервью" },
        { code: "07", anchor: "#aloqa", label: "Контакты" },
      ],
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
      ctaButton: "Arrange a meeting via Telegram",
      consulting: "Services",
      bookingCta: "Arrange a meeting via Telegram",
    },
    hero: {
      moduleLabel: "MOLD №00 // MASTER MATRIX",
      statusBadge: "MANUFACTURING & EXPORT ECOSYSTEM",
      dimensionSpec: "SPEC: ISO / GLOBAL STD 2026 // SER: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Owner-independent",
      headlineSuffix: " systems and industrial-grade management.",
      summary:
        "Anvar Abduqayum is founder and co-founder of Toybola Toys, co-founder of the Samtech Masterbatches and Visage Electric industrial ventures, partner in HoReCa chains, and Chair of the independent UZBIC public council. Apply industrial practice to transition your business from operational dependence to structured governance.",
      ctaPrimary: "Arrange a meeting via Telegram",
      ctaSecondary: "Services & Programs",
      portraitCaption: "Anvar Abduqayum",
      blueprintDimensions: {
        width: "MULTI-SECTOR",
        tolerance: "CIS & GLOBAL",
        standard: "INDUSTRY & GOVERNANCE",
      },
      kickerBadge: "MONOGRAPH // INDUSTRY & SYSTEMIC GOVERNANCE",
      kickerText: "Tashkent, 2026",
      verifiedMetrics: [
        {
          value: "2009 / 2012",
          label: "Toybola workshop practice & factory establishment",
        },
        {
          value: "2015 — 2022",
          label: "Samtech & Visage co-founding, HoReCa & UZBIC",
        },
        {
          value: "7 initiatives",
          label: "3 industrial, 2 HoReCa, 1 internal IT & UZBIC public council",
        },
      ],
      portraitRole: "Industrialist, Engineer-Entrepreneur",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
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
      sectionNum: "02",
      tablistAriaLabel: "Consultation programs",
      eyebrow: "Services & Consulting Dossier",
      title: "4 strategic directions for business owners and industrial operators",
      subtitle:
        "Grounded in manufacturing governance, industrial co-founding, and international trade, spanning systemic management, plant optimization, and export cooperation.",
      labels: {
        programSpec: "PROGRAM SPEC",
        format: "Engagement format",
        audience: "Target audience",
        overview: "Program Overview",
        focusAreas: "Core focus areas",
        ctaText: "Arrange a meeting via Telegram",
      },
      services: [
        {
          id: "governance",
          code: "Program 01: Individual governance",
          name: "Business Governance & Delegation",
          shortSummary:
            "Stepping out of daily operations to establish autonomous company management.",
          audience:
            "Founders and entrepreneurs transitioning from operational dependence to autonomous governance",
          overview:
            "Eliminate founder bottlenecks by introducing clear delegation frameworks, executive accountability, and resilient Standard Operating Procedures rather than ad-hoc intervention.",
          focusAreas: [
            "Separating daily operational control from strategic governance",
            "Gradual transfer of authority and KPIs to key directors",
            "Documented operational standards independent of constant founder presence",
          ],
          format: "One-on-one Advisory / Practical Sessions",
          ctaText: "Message via Telegram",
        },
        {
          id: "manufacturing",
          code: "Program 02: Industrial engineering",
          name: "Manufacturing Process Optimization",
          shortSummary:
            "Standard Operating Procedures (SOP), cost discipline & quality metrics.",
          audience:
            "Industrial founders and plant operators scaling factory output and cost efficiency",
          overview:
            "Structured floor audit informed by industrial production experience: standardized workflows (SOPs), material loss reduction, and equipment utilization discipline.",
          focusAreas: [
            "Implementing SOPs and strict raw-material consumption tracking",
            "Capacity and machine cycle efficiency diagnostics",
            "Minimizing defect rates and tightening unit production economics",
          ],
          format: "Practical On-site / Process Engineering Audit",
          ctaText: "Message via Telegram",
        },
        {
          id: "export",
          code: "Program 03: Global expansion",
          name: "Export Cooperation via UZBIC",
          shortSummary:
            "Bringing domestic industrial products to foreign markets via B2B links.",
          audience:
            "Manufacturers planning international market entry or broader export geography",
          overview:
            "Practical trade collaboration within the UZBIC council framework: adapting quality standards, building direct foreign buyer pipelines, and B2B consortium links.",
          focusAreas: [
            "Aligning production with international quality and certification criteria",
            "Practical market-entry roadmaps across CIS and international regions",
            "Leveraging B2B industrial cooperation and export consortia",
          ],
          format: "Advisory within UZBIC Council Framework",
          ctaText: "Inquire on Export",
        },
        {
          id: "diagnostic",
          code: "Program 04: Strategic review",
          name: "Initial Strategic Review",
          shortSummary:
            "Pinpointing core operational bottlenecks and defining practical priorities.",
          audience:
            "Business owners seeking to isolate major bottlenecks and actionable priorities",
          overview:
            "Focused initial review to assess organizational structure, isolate operational or plant constraints, and coordinate the appropriate next engagement path.",
          focusAreas: [
            "Initial review of operational and governance workflows",
            "Isolating primary organizational or manufacturing constraints",
            "Coordinating practical next steps and collaboration format",
          ],
          format: "Preliminary Review by Coordination",
          ctaText: "Arrange a meeting via Telegram",
        },
      ],
    },
    portfolio: {
      sectionNum: "03",
      moduleLabel: "MODULE 02 // BUSINESS ECOSYSTEM",
      eyebrow: "BUSINESS ECOSYSTEM & ENTERPRISE PORTFOLIO",
      title: "Multi-sector industrial ventures, partnerships & public council",
      titleEmphasis: "",
      subtitle:
        "Transparent separation of roles and legal standing across manufacturing plants, HoReCa ventures, internal IT infrastructure, and the independent public council (UZBIC).",
      moldLegend: "INDUSTRIAL ECOSYSTEM // 7 DIRECTIONS",
      taxonomy: {
        ariaLabel: "Role taxonomy",
        founder: "Founder / Co-founder (Toybola, Afiyet)",
        partner: "Industrial Co-founding & Partnerships (Samtech, Visage, Puro)",
        internal: "Internal IT Initiative (not a standalone corporation)",
        public: "Independent Public Council (UZBIC, not private equity)",
      },
      groups: {
        ventures: "Ventures, Co-founded Enterprises & Internal Infrastructure",
        council: "Independent Public Platform (not a privately owned business)",
      },
      councilHighlight: {
        pill: "Independent public platform: not a private company",
        title: "Uzbekistan Business and Industrial Council (UZBIC)",
        desc: "Established in 2022, UZBIC operates as an independent public platform supporting domestic manufacturers and exporters with B2B industrial cooperation and international market access.",
        legalNote:
          "Legal distinction: Anvar Abduqayum serves as Chair of the Public Council rather than a private equity owner or commercial proprietor.",
        detailBtn: "Full profile",
        roleLabel: "Position:",
        roleValue: "Council Chair (public capacity)",
        typeLabel: "Organization Type:",
        typeValue: "Independent non-governmental platform",
        sourceLabel: "Source:",
        sourceValue: "uzbic.uz, Kun.uz records",
      },
      filters: {
        all: "All (7)",
        mfg: "Manufacturing (3)",
        horeca: "HoReCa (2)",
        service: "Internal IT (1)",
        council: "Public Council (1)",
      },
      detailBtn: "Details",
      closeBtn: "Close",
      modal: {
        role: "Anvar Abduqayum’s Role",
        period: "Activity Period",
        sector: "Industry / Sector",
        model: "Governance Model",
        status: "Factual & Legal Standing",
        source: "Source & Verification",
        caps: "Technical & Strategic Capabilities",
        officialSite: "Official Website",
        noWebsiteNote: "Internal / B2B system: no separate public website",
        closeAriaLabel: "Close dialog",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys",
          code: "01: Polymer Industry",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          roleBadge: "Founder & Co-founder",
          monogram: "TB",
          badge: "MANUFACTURING // PLANT",
          year: "2009 / 2012",
          activity: "Children’s Polymer Toy Manufacturing Plant",
          desc: "Polymer toy manufacturing facility: initial workshop operations began in 2009, with the Toybola brand and modern plant established in 2012.",
          fullDesc: "Beginning with initial toy production workshops in 2009, modern Toybola factory operations launched in 2012. Facility processes operate on standardized plastic injection tooling and autonomous governance protocols.",
          role: "Founder & Co-founder",
          period: "Activity since 2009 / Plant since 2012",
          sector: "Polymer Manufacturing",
          model: "SOP Protocols & Executive Board",
          categoryBadge: "Industry & Polymers",
          tags: ["Injection Molding", "SOP Governance", "CIS Export"],
          status: "Verified operating manufacturing facility",
          source: "Enterprise Archive & Gazeta.uz (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/toy_bola.webp",
          assetLabel: "[Verified manufacturing asset]",
          websiteUrl: "https://toybola.uz",
          externalUrl: "https://toybola.uz",
        },
        {
          id: "samtech",
          name: "Samtech Masterbatches",
          code: "02: Chemical Facility",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-partner",
          roleBadge: "Co-founder / Industrial Partner (shared equity)",
          monogram: "SM",
          badge: "MANUFACTURING // CHEMICAL",
          year: "Since 2015",
          activity: "Polymer Raw Materials & Color Concentrates",
          desc: "Co-founded B2B industrial venture producing polymer additives and color masterbatches for domestic manufacturing lines.",
          fullDesc: "B2B chemical and polymer additives manufacturing venture structured as a co-founded industrial partnership rather than sole proprietorship, reducing raw material import reliance.",
          role: "Co-founder / Industrial Partner (shared equity)",
          period: "Since 2015 (Industrial venture)",
          sector: "Chemicals & Polymers",
          model: "B2B Supply & Partnership Governance",
          categoryBadge: "Chemical Facility",
          tags: ["Chemical Industry", "Masterbatch", "B2B Supply"],
          status: "Verified co-founded industrial venture",
          source: "Industrial Cooperation Records",
          hasLogo: false,
          assetLabel: "[Partner-based manufacturing venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "visage",
          name: "Visage Electric",
          code: "03: Electrical Engineering",
          category: "mfg",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Co-founder / Industrial Partner (shared equity)",
          monogram: "VE",
          badge: "MANUFACTURING",
          year: "Since 2018",
          activity: "Electrical Engineering & Installation Equipment",
          desc: "Co-founded industrial project producing electrical switches, sockets, and safety installation components on automated assembly lines.",
          fullDesc: "Manufacturing venture for residential and industrial electrical components, developed through shared co-founder equity and automated assembly operations.",
          role: "Co-founder / Industrial Partner (shared equity)",
          period: "Since 2018 (Industrial venture)",
          sector: "Electrical Manufacturing",
          model: "Automated Lines & B2B/B2C Distribution",
          categoryBadge: "Electrical Goods",
          tags: ["Electrical Eng.", "Automated Lines", "Safety Specs"],
          status: "Verified co-founded industrial project",
          source: "Industry Cooperation Registry",
          hasLogo: false,
          assetLabel: "[Partner-based manufacturing venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "04: HoReCa Dining",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          roleBadge: "Founder & Partner",
          monogram: "AF",
          badge: "HORECA // RESTAURANT",
          year: "Since 2017",
          activity: "Turkish Dining Restaurant Chain",
          desc: "Hospitality network structured around standardized kitchen recipes and service protocols. First branch opened in 2017.",
          fullDesc: "As documented in Spot.uz interview archives, the first Afiyet restaurant launched in 2017, applying factory-style operational discipline and recipe cards across branches.",
          role: "Founder & Partner",
          period: "Since 2017 (Spot.uz interview)",
          sector: "HoReCa & Food Service",
          model: "Standardized Kitchen Protocols",
          categoryBadge: "Food Service",
          tags: ["Recipe SOPs", "Fast-Casual", "Chain Operations"],
          status: "Verified hospitality network",
          source: "Spot.uz Interview Record (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Verified restaurant asset]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "05: HoReCa Cafe",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          roleBadge: "Partner & Co-initiator",
          monogram: "PR",
          badge: "HORECA // CAFE",
          year: "Since 2020",
          activity: "Italian Gelato & Artisan Cafe Network",
          desc: "Gelato and cafe chain structured around cold-chain logistics and authentic Italian recipes, opening its first location in 2020.",
          fullDesc: "Confirmed in the 2020 Spot.uz interview, the first Puro Gelateria opened in 2020, maintaining quality via natural ingredients and disciplined cold-chain supply.",
          role: "Partner & Co-initiator",
          period: "Since 2020 (Spot.uz interview)",
          sector: "HoReCa & Confectionery",
          model: "Cold-Chain Supply Partnership",
          categoryBadge: "Cafe & Dessert",
          tags: ["Cold Chain", "Gelato Recipes", "Retail"],
          status: "Verified cafe network",
          source: "Spot.uz Interview Record (2020)",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Verified cafe asset]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "06: Internal Infrastructure",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          roleBadge: "Internal Initiative (not a standalone software firm)",
          monogram: "IT",
          badge: "B2B SERVICE // IT SYSTEMS",
          year: "Since 2019",
          activity: "Internal ERP & Operational Reporting Digitization",
          desc: "Internal IT infrastructure team organized to automate warehouse accounting, plant monitoring, and executive telemetry across existing ventures.",
          fullDesc: "An internal operational technology initiative rather than an external commercial software corporation, established solely to support inventory, ERP, and transparent reporting across group ventures.",
          role: "Initiative Founder & Internal Systems Advisor",
          period: "Since 2019 (Internal IT initiative)",
          sector: "Internal IT Infrastructure",
          model: "Internal ERP & Process Automation",
          categoryBadge: "B2B Digital Service",
          tags: ["Internal ERP", "Inventory Tracking", "Analytics"],
          status: "Internal process digitization initiative",
          source: "Enterprise Ecosystem Infrastructure",
          hasLogo: false,
          assetLabel: "[Internal digitalization initiative]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "Uzbekistan Business and Industrial Council (UZBIC)",
          code: "07: Independent Public Council",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          roleBadge: "Council Chair (public capacity)",
          monogram: "UZ",
          badge: "INDUSTRIAL COUNCIL // PLATFORM",
          year: "Since 2022",
          activity: "Uzbekistan Business & Industrial Council",
          desc: "Uzbekistan Business and Industrial Council — an independent public platform uniting local manufacturers and exporters.",
          fullDesc: "Established in 2022, UZBIC is an independent, non-governmental public platform linking domestic manufacturers and exporters with international B2B markets. Anvar Abduqayum holds a public leadership role as Council Chair rather than commercial ownership.",
          role: "Council Chair (public capacity, not private owner)",
          period: "Since 2022 (Council establishment)",
          sector: "Industrial Diplomacy & Export Cooperation",
          model: "Independent B2B Trade & Export Platform",
          categoryBadge: "Public Council & Platform",
          tags: ["International Export", "Industrial Cooperation", "Public Platform"],
          status: "Independent public council (not private equity)",
          source: "Official uzbic.uz portal & Kun.uz records",
          hasLogo: true,
          logoUrl: "/images/partners/uzbic.webp",
          assetLabel: "[Independent public platform // Non-commercial asset]",
          websiteUrl: "https://uzbic.uz",
          externalUrl: "https://uzbic.uz",
        },
      ],
    },
    timeline: {
      sectionNum: "04",
      moduleLabel: "MOLD №02 // CHRONOLOGICAL MATRIX",
      title: "Track Record",
      titleEmphasis: "",
      subtitle:
        "Industrial systems are never forged overnight. This record clearly distinguishes personal trading background, formal factory launches, shared-equity co-founding, and public council service.",
      filterAriaLabel: "Filter milestones by role",
      filters: {
        all: "All Milestones (5)",
        personal: "Personal Practice & Founding (2)",
        partner: "Co-founder & Partnerships (2)",
        council: "Public Council Roles (1)",
      },
      legend: {
        ariaLabel: "Role attribution taxonomy",
        personal: "Personal trade background",
        founding: "Factory founding (2009 / 2012)",
        partner: "Co-founder & HoReCa partnerships",
        council: "UZBIC Public Council Chairmanship",
      },
      labels: {
        role: "Role & attribution",
        source: "Primary verification source",
        verify: "Factual verification note",
        hide: "Hide note",
      },
      steps: [
        {
          id: "early-trade",
          filterCat: "personal",
          tagClass: "tag-personal",
          tag: "Personal trade experience",
          period: "Pre-2009",
          stageNumber: "01",
          title: "Cross-border trade and transition to production",
          summary:
            "Wholesale trade experience and raw-material logistics linking Uzbekistan with China and Turkey established the practical groundwork prior to launching local toy workshops in 2009.",
          role: "Personal entrepreneurial trade & sourcing",
          source: "Founder interviews & Spot.uz (2022)",
          verificationNote:
            "Avoiding unverified exact trade start years; documented production workshop initiation dates back cleanly to 2009.",
          milestone: "Established foundational supply chains and market knowledge",
          focus: "Cross-border trade operations",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Company founding date",
          period: "2009 / 2012",
          stageNumber: "02",
          title: "Establishment of the Toybola Toys factory",
          summary:
            "Following workshop prototyping in 2009, the Toybola brand and modern factory facilities were formally founded in 2012 using injection molding and standardized tooling.",
          role: "Founder & Co-founder",
          source: "Enterprise Archive & Gazeta.uz (2020)",
          verificationNote:
            "Both 2009 workshop start and 2012 factory incorporation are verified; unverified unit volume estimates have been excluded.",
          milestone: "Launched full-cycle localized injection-molding plant",
          focus: "Thermoplastic molding & localization",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Co-founder industrial ventures",
          period: "2015 / 2018",
          stageNumber: "03",
          title: "Co-founding Samtech Masterbatches and Visage Electric",
          summary:
            "Entered upstream polymer additives via Samtech Masterbatches (since 2015) and automated electrical switchgear assembly via Visage Electric (since 2018) through industrial partnerships.",
          role: "Co-founder / Partner (shared equity)",
          source: "Industrial Cooperation Records",
          verificationNote:
            "Clearly distinguished as shared-equity co-founding ventures rather than sole proprietorship; unverified import-substitution percentages removed.",
          milestone: "B2B industrial partnerships across polymer feedstock & electrical gear",
          focus: "Industrial supply-chain partnerships",
        },
        {
          id: "horeca-internal-it",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Hospitality & internal IT",
          period: "2017 / 2020",
          stageNumber: "04",
          title: "AFIYET Kebab, PURO Gelateria & internal ERP digitization",
          summary:
            "Applied kitchen SOPs to hospitality with AFIYET Kebab launching in 2017 and PURO Gelateria in 2020, backed by internal ERP and inventory digitization from 2019.",
          role: "Founder/Partner (AFIYET), Partner (PURO), Internal IT Initiative",
          source: "Spot.uz Interview Archive (2020) & internal telemetry",
          verificationNote:
            "Verified Spot.uz launch years (Afiyet 2017, Puro 2020); IT Support & Service is strictly an internal operational infrastructure initiative.",
          milestone: "Recipe-standardized hospitality operations & internal ERP",
          focus: "Hospitality workflows & internal telemetry",
        },
        {
          id: "uzbic-council",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Public council responsibility",
          period: "2022 - Present",
          stageNumber: "05",
          title: "Chairmanship of UZBIC & B2B Export Diplomacy",
          summary:
            "Since 2022, chairs the independent Uzbekistan Business and Industrial Council (UZBIC), facilitating B2B cooperation among domestic manufacturers and access to foreign trade channels.",
          role: "Council Chair (public capacity, not private commercial ownership)",
          source: "Official uzbic.uz portal & Kun.uz reporting",
          verificationNote:
            "UZBIC is a non-governmental public council; chairmanship reflects institutional leadership rather than commercial equity or service guarantees.",
          milestone: "Institutional B2B export facilitation platform",
          focus: "Industrial diplomacy & export cooperation",
        },
      ],
    },
    principles: {
      sectionNum: "05",
      moduleLabel: "MOLD №03 // METHODOLOGICAL BENCHMARK",
      title: "The Mold Principle",
      titleEmphasis: "",
      subtitle:
        "Borrowed from precision injection molding: operational consistency flows from designing clear workflows and accountability, rather than constant founder intervention.",
      statementHeading: "Governance Philosophy",
      manifesto:
        "If daily operations stall whenever the owner steps away, the structure still rests on personal oversight. Systemic entrepreneurship is building documented standards and delegation that hold beyond constant supervision.",
      frameworkTag: "The Mold Framework",
      caveat:
        "Presented as an operational methodology informed by manufacturing practice, not a universal performance guarantee.",
      tablistAriaLabel: "The Mold Principle modules",
      contrastAriaLabel: "Operational discipline comparison",
      labels: {
        appContext: "Observed ecosystem context",
        before: "Owner-dependent execution",
        after: "The Mold approach",
        disclaimer:
          "Note: outcomes depend on internal execution discipline and market conditions; no blanket commercial guarantees are implied.",
      },
      modules: [
        {
          id: "sop",
          index: "Module A",
          title: "Standard Operating Procedures (SOP)",
          shortSummary: "Documented step-by-step workflows replace tribal knowledge.",
          description:
            "Core execution workflows (from feedstock intake and press startup to standardized kitchen prep) are codified cleanly in manuals so operational consistency endures staff turnover.",
          technicalRule: "Rule: Depend on documented workflows rather than individual habits",
          appContext:
            "Applied across Toybola factory tooling protocols as well as Afiyet kitchen recipes and Puro cold-chain handling.",
          beforeText:
            "Informal verbal habits, key-person dependency, and variable output quality across shifts.",
          afterText:
            "Repeatable SOP checklists enabling structured onboarding and consistent daily execution.",
          iconType: "sop",
        },
        {
          id: "governance",
          index: "Module B",
          title: "Delegation & Accountability Matrix",
          shortSummary: "Clear separation between daily operations and oversight.",
          description:
            "Daily purchasing, shift scheduling, and routine decisions shift away from the founder to responsible managers operating within explicitly bounded budgets and mandates.",
          technicalRule: "Rule: Structured authority limits backed by executive reporting",
          appContext:
            "Practiced across multi-site ventures and co-owned industrial partnerships where founder presence cannot scale manually.",
          beforeText:
            "Every purchase, shift exception, or vendor request stalling until founder sign-off.",
          afterText:
            "Defined managerial mandates, clear spending thresholds, and structured weekly accountability.",
          iconType: "governance",
        },
        {
          id: "metrics",
          index: "Module C",
          title: "Internal ERP & Operational Telemetry",
          shortSummary: "Warehouse, feedstock, and cost tracking inside internal ERP.",
          description:
            "Factory inventory balances, material consumption, defect tracking, and unit cost structures are monitored through internal ERP dashboards so operational leakages surface early.",
          technicalRule: "Rule: Base operational reviews on verified ledger telemetry",
          appContext:
            "Implemented via the internal IT Support & Service infrastructure team organized in 2019 for group ventures.",
          beforeText:
            "Delayed end-of-month reconciliations and unmeasured material waste across workshops.",
          afterText:
            "Synchronized inventory records, structured unit-cost tracking, and transparent reporting.",
          iconType: "metrics",
        },
        {
          id: "culture",
          index: "Module D",
          title: "Stewardship & Continuous Calibration",
          shortSummary: "Defects trigger process refinement rather than blame cycles.",
          description:
            "When defects or delivery delays happen, disciplinary pressure alone fails to stop recurrence. Each incident feeds back into revising training steps, checklists, and quality gates.",
          technicalRule: "Rule: Diagnose broken workflows alongside personnel coaching",
          appContext:
            "Shaped directly by retrospective analysis of operational mistakes across manufacturing and hospitality launches.",
          beforeText:
            "Recurring errors blamed on individuals while leaving weak workflows unchanged.",
          afterText:
            "Root-cause calibration, living checklists, and shared team stewardship.",
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
      sectionNum: "06",
      title: "Media &",
      titleEmphasis: "interviews",
      subtitle:
        "Verified video interviews, documentary talks, and documented press coverage across manufacturing, export logistics, and UZBIC.",
      youtubeHeading: "Curated Broadcasts & Archive Status",
      videosSubmeta: "Published videos clearly separated from pending archival releases",
      pressHeading: "Verified Press Coverage & Public Forums",
      pressSubmeta: "Canonical HTTP 200 URLs paired with on-page source publication dates",
      videoFilters: {
        ariaLabel: "Filter videos by publication status",
        all: "All records (3)",
        published: "Published (2)",
        archive: "Archive / Pending (1)",
      },
      pressFilters: {
        ariaLabel: "Filter press coverage by category",
        all: "All records (6)",
        profile: "Press profiles (3)",
        public: "Forums & UZBIC (3)",
      },
      featured: {
        id: "subyektiv-2021",
        statusLabel: "Verified Documentary Interview",
        title: "From Toy Manufacturing to Scale: Anvar Abduqayum (SUBYEKTIV)",
        synopsis:
          "Produced by Kun.uz documentary project SUBYEKTIV, tracing the founding of Toybola, precision mold localization, and initial steps into regional export markets.",
        channel: "SUBYEKTIV / Kun.uz",
        youtubeId: "yi6UAsstdw4",
        thumbUrl: "https://i.ytimg.com/vi/yi6UAsstdw4/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=yi6UAsstdw4",
        dateIso: "2021-10-23",
        dateFormatted: "23.10.2021",
        duration: "1 hr 09 min",
        channelLabel: "Program & channel",
        dateLabel: "Published date",
        durationLabel: "Duration",
        playLabel: "Play interview",
        watchLabel: "Open video player",
        extLabel: "Watch on YouTube",
      },
      ui: {
        watchCard: "Open player",
        extCard: "YouTube link",
        readPress: "Read article",
        archiveSoonBtn: "Publication pending",
        officialChannelBtn: "Official YouTube channel",
        officialChannelUrl: "https://www.youtube.com/@AnvarAbduqayum",
        officialChannelHandleLabel: "YouTube: @AnvarAbduqayum",
        disclosureHeading: "Editorial Source Verification Policy",
        disclosureCopy:
          "Only HTTP 200 canonical article URLs displaying verified source publication dates appear here. Unverified homepage stubs (Gazeta.uz, Daryo.uz) and temporarily failing endpoints (Inha.uz HTTP 500) remain omitted until reliably verified.",
        modalExt: "Watch on YouTube",
        modalClose: "Close",
        modalCloseAriaLabel: "Close video player",
        modalLoading: "Loading YouTube video player…",
        modalFallbackTitle: "Embedded player unavailable here",
        modalFallbackBody:
          "Browser context or network restrictions prevent embedded playback in this view. Open the official broadcast directly on YouTube.",
        modalWatchYoutube: "Watch on YouTube",
      },
      videos: [
        {
          id: "internation-2026",
          filterCat: "published",
          hasCleanPoster: true,
          thumbUrl: "https://i.ytimg.com/vi/4HRt-WTp3-A/maxresdefault.jpg",
          url: "https://www.youtube.com/watch?v=4HRt-WTp3-A",
          dateIso: "2026-01-16",
          dateFormatted: "16.01.2026",
          title:
            "Anvar Abduqayum: Business Founding History, Production Scale & Personal Path",
          channel: "Inter Nation English School",
          summary:
            "Long-form studio conversation covering production scaling discipline, operational resilience, and leadership lessons.",
          youtubeId: "4HRt-WTp3-A",
          durationPlaceholder: "59 min",
          topicBadge: "Published",
          isAvailable: true,
          statusNote: "Published",
        },
        {
          id: "intervyutv-2022",
          filterCat: "published",
          hasCleanPoster: false,
          url: "https://www.youtube.com/watch?v=73WXbwiMBzI",
          dateIso: "2022-02-26",
          dateFormatted: "26.02.2022",
          title:
            "Extended Documentary Tour: Factories, Restaurants & Founder Interview (intervyuTV)",
          channel: "intervyuTV",
          summary:
            "On-site documentary walkthrough recorded across active Toybola manufacturing plants and hospitality venues.",
          youtubeId: "73WXbwiMBzI",
          durationPlaceholder: "2 hr 26 min",
          topicBadge: "Published (2h+)",
          isAvailable: true,
          statusNote: "Published (2h+)",
        },
        {
          id: "archive-pending",
          filterCat: "archive",
          hasCleanPoster: false,
          channelUrl: "https://www.youtube.com/@AnvarAbduqayum",
          dateIso: "2026",
          dateFormatted: "Archive pending",
          title:
            "Official Video Archive on Operating Regulations & Manufacturing Standards",
          channel: "@AnvarAbduqayum",
          summary:
            "Unverified legacy placeholders removed; this fallback slot preserves archive status without issuing external thumbnail or player requests.",
          youtubeId: "",
          durationPlaceholder: "In post-production",
          topicBadge: "Archive // In production",
          isAvailable: false,
          statusNote: "Archive // In production",
        },
      ],
      pressMentions: [
        {
          id: "spot-2022",
          category: "profile",
          outlet: "Spot.uz",
          articleTitle:
            "Paket va o‘yinchoq korxonalari, restoranlar: Anvar Abduqayum Profile (Spot.uz)",
          contextNote:
            "Covers 2005 packaging launch, Toybola expansion, Afiyet & Puro ventures, and UZBIC milestones.",
          dateIso: "2022-11-17",
          datePlaceholder: "17.11.2022",
          url: "https://www.spot.uz/oz/2022/11/17/anvar-abduqayum/",
          publicationType: "Analytical profile",
        },
        {
          id: "kun-export-2022",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "«Hattoki Meksikadan qo‘ng‘iroq qilib, hamkorlik taklif etishdi»: Anvar Abduqayum (Kun.uz)",
          contextNote:
            "Kun.uz interview (original Uzbek publication, 04.03.2022) on inbound international export inquiries and manufacturing agility.",
          dateIso: "2022-03-04",
          datePlaceholder: "04.03.2022",
          url: "https://kun.uz/news/2022/03/04/ozbekistondagi-oyinchoqlar-biznesi-lideri-bugun-odamlar-tezkor-vaqt-qimmat-bolib-ketdi",
          publicationType: "Export interview",
        },
        {
          id: "kun-profile-2021",
          category: "profile",
          outlet: "Kun.uz",
          articleTitle:
            "O‘yinchoqlar biznesi qiroli: millioner Anvar Abduqayum bilan suhbat (Kun.uz)",
          contextNote:
            "Text feature (26.10.2021) accompanying the SUBYEKTIV documentary episode on domestic toy production.",
          dateIso: "2021-10-26",
          datePlaceholder: "26.10.2021",
          url: "https://kun.uz/news/2021/10/26/oyinchoqlar-biznesi-qiroli-millioner-anvar-abduqayum-bilan-suhbat",
          publicationType: "Press feature",
        },
        {
          id: "kun-makon-2024",
          category: "public",
          outlet: "Kun.uz",
          articleTitle:
            "Toshkentda sotuvchilar uchun «MAKON Forum» xalqaro forumi o‘tkaziladi (Kun.uz)",
          contextNote:
            "Kun.uz report (30.04.2024, 14:30 Tashkent) explicitly featuring Toy Bola founder Anvar Abduqayum among forum speakers.",
          dateIso: "2024-04-30",
          datePlaceholder: "30.04.2024",
          url: "https://kun.uz/news/2024/04/30/toshkentda-sotuvchilar-uchun-makon-forum-xalqaro-forumi-otkaziladi",
          publicationType: "International business forum",
        },
        {
          id: "yuz-uzbic-2022",
          category: "public",
          outlet: "Yuz.uz",
          articleTitle:
            "Бизнес-форум в Алматы показал взаимную заинтересованность узбекского и казахстанского бизнеса (Yuz.uz)",
          contextNote:
            "Original Russian report (20.09.2022, 08:21) confirming UZBIC Chairman Anvar Abdukayumov led the Uzbek delegation in Almaty.",
          dateIso: "2022-09-20",
          datePlaceholder: "20.09.2022",
          url: "https://yuz.uz/ru/news/biznes-forum-v-almat-pokazal-vzaimnuyu-zainteresovannost-uzbekskogo-i-kazaxstanskogo-biznesa-v-rasshirenii-sotrudnichestva",
          publicationType: "UZBIC forum report",
        },
        {
          id: "newtimes-uzbic-2022",
          category: "public",
          outlet: "NewTimes.kz",
          articleTitle:
            "Алматинские предприниматели заключили контракты с бизнесменами из Узбекистана (NewTimes.kz)",
          contextNote:
            "Published 08.07.2022 (09:03); quotes UZBIC Chairman Anvar Abdukayumov on B2B export corridors.",
          dateIso: "2022-07-08",
          datePlaceholder: "08.07.2022",
          url: "https://newtimes.kz/ekonomika/153366-almatinskie-predprinimateli-zaklyuchili-kontrakty-s-biznesmenami-iz-uzbekistana",
          publicationType: "UZBIC press statement",
        },
      ],
    },
    contact: {
      booking: {
        ordinal: "07.A",
        title: "Meeting & partnership inquiries",
        lead: "To discuss operational governance, resolve industrial bottlenecks, or explore strategic partnerships, contact the official Telegram administrator directly.",
        specs: [
          { label: "Coordination process", value: "Arranged directly upon inquiry" },
          { label: "Focus areas", value: "Systematization and strategic partnership" },
          { label: "Official channel", value: "Telegram admin (@anvar_abduqayum_admin)" },
        ],
        cardTitle: "Verified coordination contact",
        cardDescription: "Scheduling coordination and consultation inquiries are handled directly via the official Telegram administrator.",
        routeLabel: "Official channel:",
        primaryCta: "Arrange a meeting via Telegram",
        telegramCta: "Message Telegram admin",
      },
      directory: {
        ordinal: "07.B",
        title: "Verified official channels",
        lead: "Commercial inquiries, partnership proposals, and media requests are accepted exclusively through the verified channels listed below.",
        heading: "Direct directory",
        subheading: "Verified contact points for media, advisory inquiries, and business partnerships.",
        phoneLabel: "Official telephone",
        tgAdminLabel: "Telegram admin (inquiries)",
        tgChannelLabel: "Official Telegram channel",
        emailLabel: "Email address",
        instagramLabel: "Instagram account",
        youtubeLabel: "YouTube channel",
        cues: {
          call: "Call",
          message: "Message",
          open: "Open",
          email: "Email",
        },
        officeTitle: "Location & protocol",
        officeCopy: "Tashkent, Uzbekistan. Inquiries are received through verified official channels.",
      },
      form: {
        title: "Inquiry ledger",
        subtitle: "Submissions are delivered directly to the team Telegram desk. Complete all required fields below.",
        nameLabel: "Full name",
        namePlaceholder: "Alisher Karimov",
        phoneLabel: "Phone number",
        phonePlaceholder: "+998 (90) 123-45-67",
        businessLabel: "Company or business sector",
        businessPlaceholder: "E.g. Polymer manufacturing plant",
        topicLabel: "Inquiry topic",
        topicOptions: [
          { id: "coop", label: "Strategic partnership" },
          { id: "consult", label: "Consultation (systematization)" },
          { id: "media", label: "Media & interviews" },
          { id: "other", label: "Other inquiry" },
        ],
        messageLabel: "Brief overview",
        messagePlaceholder: "Briefly describe your business operation and core question...",
        submitButton: "Send inquiry",
        submitting: "Submitting...",
        successTitle: "Inquiry received",
        successMessage: "Your submission has been delivered to our team desk. An executive coordinator will follow up shortly.",
        resetButton: "Submit another inquiry",
        telegramFallbackButton: "Message Telegram admin",
        bookingFallbackButton: "Arrange a meeting via Telegram",
        callFallbackButton: "Call directly",
        summaryLabels: {
          name: "Name",
          phone: "Phone",
          business: "Business",
          topic: "Topic",
          message: "Overview",
          messageEmpty: "Not provided",
        },
        errors: {
          nameRequired: "Please enter your name (2 to 60 characters).",
          phoneInvalid: "Please enter a complete Uzbekistan phone number (+998 (XX) XXX-XX-XX).",
          businessRequired: "Please provide your company name or business sector (at least 2 characters).",
          messageTooLong: "Brief overview must not exceed 1000 characters.",
          validationSummary: "Please review the highlighted fields and correct your entries.",
          rateLimited: "Too many requests were sent. Please wait a minute or message Telegram admin directly.",
          serverError: "A technical error occurred while delivering your inquiry. Please retry or contact Telegram admin directly.",
          networkError: "Network connection error. Please check your internet connection or contact Telegram admin directly.",
          retrySuffix: "Retry available in (seconds):",
        },
      },
    },
    mobileStickyBar: {
      telegramLabel: "Message on Telegram",
      callLabel: "Call",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Systematic entrepreneurship, industrial manufacturing, and executive practice.",
      bookingCta: "Arrange a meeting via Telegram",
      navHeading: "Editorial index",
      contactHeading: "Official channels",
      platformsHeading: "Public media",
      bookingLinkLabel: "Message Telegram admin",
      colophonNote: "Anvar Abduqayum, 2026. Tashkent, Uzbekistan. Management and industrial publication.",
      backToTop: "Back to top",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Home" },
        { code: "02", anchor: "#xizmatlar", label: "Services & programs" },
        { code: "03", anchor: "#portfel", label: "Business ecosystem" },
        { code: "04", anchor: "#yol", label: "Entrepreneurial journey" },
        { code: "05", anchor: "#tamoyil", label: "Qolip philosophy" },
        { code: "06", anchor: "#media", label: "Media & interviews" },
        { code: "07", anchor: "#aloqa", label: "Official contact" },
      ],
    },
  },
};

export function getContent(locale: string = "uz"): LocaleContent {
  if (locale === "ru") return siteContent.ru;
  if (locale === "en") return siteContent.en;
  return siteContent.uz;
}

