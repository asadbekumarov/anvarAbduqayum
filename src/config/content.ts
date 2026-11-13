/**
 * Central Content Repository for Anvar Abduqayum Website
 * Design Concept: "Qolip" (Mold / Module)
 * Uzbek (Latin) primary, structured for i18n (RU / EN).
 * No hardcoded names or texts inside UI components.
 */

export interface ClaimCitation {
  claim: string;
  sourceName: string;
  sourceUrl?: string;
  claimTimeframe?: string;
  lastVerifiedAt: string;
  verificationStatus: "verified" | "historical" | "public" | "pending";
}

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
    disclaimer?: string;
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
      historical?: string;
      pending?: string;
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
      legalMilestones?: string;
      pendingBadge?: string;
      verifiedBadge?: string;
      publicBadge?: string;
      pendingNotice?: string;
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
      verificationStatus?: "verified" | "historical" | "public" | "pending";
      legalMilestones?: Array<{ year: string; label: string }>;
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
      citations?: ClaimCitation[];
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
  initiatives?: {
    sectionNum: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    statusLabels?: Record<
      "verified_educational" | "pending_confirmation" | "public_presentation",
      string
    >;
    items: Array<{
      id: string;
      tag: string;
      status:
        | "verified_educational"
        | "pending_confirmation"
        | "public_presentation";
      title: string;
      period: string;
      summary: string;
      caveat: string;
      sourceLabel: string;
      sourceUrl: string;
    }>;
  };
  knowledgeMedia?: {
    heading?: string;
    submeta?: string;
    ariaLabel?: string;
    showAllLabel?: string;
    showCuratedLabel?: string;
    watchLabel?: string;
    extLabel?: string;
    filters: Record<
      | "all"
      | "systemization"
      | "manufacturing"
      | "export"
      | "entrepreneurship"
      | "interviews"
      | "investment",
      string
    >;
    statusLabels: Record<"verified" | "curated", string>;
  };
  collaborationConcept?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    demoDisclaimer: string;
    tracks: Array<{
      id: string;
      code: string;
      title: string;
      shortSummary: string;
      audience: string;
      overview: string;
      scopePoints: string[];
      note: string;
    }>;
  };
  ecosystemTimeline?: LocaleContent["timeline"];
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
      ctaButton: "Hamkorlik tartibi",
      consulting: "Xizmatlar",
      bookingCta: "Hamkorlik tartibi",
    },
    hero: {
      moduleLabel: "QOLIP №00 // BOSH MATRITSA",
      statusBadge: "SANOAT VA EKSPORT EKOTIZIMI",
      dimensionSpec: "STANDART: ISO / O'zDSt 2026 // SERIYA: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Egasisiz ishlaydigan",
      headlineSuffix: " tizimlar va sanoat darajasidagi boshqaruv.",
      summary:
        "Anvar Abduqayum — Toybola Toys (VISAGE ELECTRIC MChJ ishlab chiqarish korxonasi) asoschisi va hammuassisi, Samtech Masterbatches sanoat loyihasi hammuassisi, HoReCa tarmoqlari hamkori hamda mustaqil UZBIC jamoat platformasi raisi. Ushbu tahririy konsepsiya sanoat amaliyoti, ommaviy chiqishlar va biznes ekotizimi sharhini jamlaydi.",
      ctaPrimary: "Hamkorlik tartibi",
      ctaSecondary: "Biznes ekotizimi",
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
          value: "2005 — 2012",
          label: "Paket ishlab chiqarish (2005), VISAGE ELECTRIC (2008), o‘yinchoq (2009) va eksport (2010/2012)",
        },
        {
          value: "2015 — 2022",
          label: "Samtech, HoReCa loyihalari va UZBIC jamoat kengashi",
        },
        {
          value: "6 yo‘nalish",
          label: "Toybola (VISAGE ELECTRIC), Samtech, 2 HoReCa, ichki IT va UZBIC",
        },
      ],
      portraitRole: "Sanoatchi, Muhandis-Tadbirkor",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
      brands: [
        "TOYBOLA · VISAGE ELECTRIC",
        "SAMTECH MASTERBATCHES",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      sectionNum: "07",
      tablistAriaLabel: "B2B hamkorlik yo‘nalishlari",
      eyebrow: "B2B HAMKORLIK YO‘NALISHLARI",
      title: "Hamkorlik va muloqot uchun 4 ta asosiy B2B yo‘nalish",
      subtitle:
        "Sanoat kooperatsiyasi, eksport hamkorligi, biznes ta’limi va media chiqishlari bo‘yicha hamkorlik shakllari.",
      disclaimer: "",
      labels: {
        programSpec: "YO‘NALISH TAVSIFI",
        format: "Muloqot formati",
        audience: "Kimlar uchun",
        overview: "Umumiy tavsif",
        focusAreas: "Muhokama mavzulari",
        ctaText: "Hamkorlik tartibi",
      },
      services: [
        {
          id: "industrial-cooperation",
          code: "Yo‘nalish 01 // Sanoat kooperatsiyasi",
          name: "Sanoat kooperatsiyasi",
          shortSummary:
            "Ishlab chiqarish zanjirlari, xomashyo lokalizatsiyasi va zavod boshqaruvi tajribasi yuzasidan B2B muloqot.",
          audience:
            "Mahalliy ishlab chiqaruvchilar, sanoat majmualari va ta’minot hamkorlari",
          overview:
            "Ushbu yo‘nalish polimer va iste’mol tovarlari ishlab chiqarishidagi amaliy tajriba asosida korxonalararo sanoat kooperatsiyasi imkoniyatlarini ko‘rib chiqadi.",
          focusAreas: [
            "Mahalliylashtirish va sanoat ishlab chiqarish zanjirlarida B2B hamkorlik",
            "Standart ish reglamentlari (SOP) va sifat nazorati bo‘yicha tajriba almashish",
            "Operatsion barqarorlik va boshqaruv tizimlashtirish masalalari",
          ],
          format: "Sanoat kooperatsiyasi formati",
          ctaText: "Hamkorlik tartibi",
        },
        {
          id: "export-partnerships",
          code: "Yo‘nalish 02 // Eksport hamkorligi",
          name: "Eksport hamkorligi",
          shortSummary:
            "Tashqi bozorlarga chiqish va UZBIC jamoat platformasi doirasidagi xalqaro savdo muloqoti.",
          audience:
            "Eksport geografiyasini kengaytirishga qiziqqan ishlab chiqarish korxonalari",
          overview:
            "2010–2012-yillardagi eksport amaliyoti va O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) jamoat platformasi tajribasiga tayangan eksport yo‘nalishi.",
          focusAreas: [
            "Tashqi bozorlar sifat talablari va sertifikatlashtirish yo‘nalishlari",
            "MDH va qo‘shni mamlakatlar bilan B2B savdo delegatsiyalari",
            "UZBIC doirasidagi tarmoqlararo eksport kooperatsiyasi",
          ],
          format: "Jamoat platformasi konteksti",
          ctaText: "Hamkorlik tartibi",
        },
        {
          id: "knowledge-education",
          code: "Yo‘nalish 03 // Biznes bilimlar va ta’lim",
          name: "Biznes bilimlar va ta’lim",
          shortSummary:
            "Ommaviy ma’ruzalar, kichik biznes videodarslari va amaliy boshqaruv tajribasi bilan bo‘lishish.",
          audience:
            "Tizimli boshqaruv va kichik biznes amaliyotini o‘rganayotgan tadbirkorlar va forum tashkilotchilari",
          overview:
            "«Avtopilot» 8 qadamli ochiq YouTube ma’ruzasi va kichik biznesga oid ommaviy videodarslarda yoritilgan boshqaruv tamoyillari bo‘yicha ma’rifiy muloqot.",
          focusAreas: [
            "Ommaviy biznes ma’ruzalari va tadbirkorlik forumlaridagi chiqishlar",
            "Biznesni shaxsdan tizimga o‘tkazish (Qolip) tamoyillarini muhokama qilish",
            "Eslatma: pullik kurs yoki tijorat akademiyasi taklifi mavjud emas",
          ],
          format: "Ommaviy ma’rifiy format",
          ctaText: "Hamkorlik tartibi",
        },
        {
          id: "media-speaking",
          code: "Yo‘nalish 04 // Media va chiqishlar",
          name: "Media va ommaviy chiqishlar",
          shortSummary:
            "OAV intervyulari, podkastlar va tarmoq konferensiyalari bo‘yicha namunaviy so‘rov formati.",
          audience:
            "Tahririyatlar, biznes forum tashkilotchilari va tarmoq media loyihalari",
          overview:
            "Ochiq intervyular (SUBYEKTIV, Inter Nation, Spot.uz, Kun.uz) va biznes forumlardagi chiqishlar amaliyotiga moslashtirilgan media murojaat tartibi.",
          focusAreas: [
            "Sanoat, ishlab chiqarish va eksport mavzularidagi intervyu so‘rovlari",
            "Tadbirkorlik konferensiyalari va panel sessiyalarda ishtirok etish",
            "Rasmiy tasdiqdan so‘ng faollashtiriladigan aloqa tartibi",
          ],
          format: "Media murojaat formati",
          ctaText: "Hamkorlik tartibi",
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
        "Polimer va bolalar o‘yinchoqlari ishlab chiqarish korxonalari, HoReCa tarmoqlari, ichki IT infratuzilmasi hamda mustaqil nodavlat sanoat kengashi (UZBIC) o‘rtasidagi rollar va huquqiy maqomlarning aniq tasnifi.",
      moldLegend: "SANOAT EKOTIZIMI // 6 TA YO‘NALISH",
      taxonomy: {
        ariaLabel: "Rollar tasnifi",
        founder: "Asoschi / Hammuassis (Toybola · VISAGE ELECTRIC, Afiyet)",
        partner: "Sanoat hammuassisligi va hamkorlik (Samtech, Puro)",
        internal: "Ichki IT tashabbusi (Alohida kompaniya emas)",
        public: "Mustaqil jamoat kengashi (UZBIC, xususiy mulk emas)",
        historical: "Tarixiy bosqich (2005–2012: paket, VISAGE ELECTRIC, o‘yinchoq va eksport)",
        pending: "Huquqiy tafsilotlari mijoz tasdig‘ini kutmoqda",
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
        all: "Barchasi (6)",
        mfg: "Ishlab chiqarish (2)",
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
        legalMilestones: "Tarixiy va huquqiy sanalar (alohida bosqichlar)",
        pendingBadge: "Tasdiq kutilmoqda",
        verifiedBadge: "Tasdiqlangan manba",
        publicBadge: "Jamoat platformasi",
        pendingNotice:
          "Eslatma: ushbu yozuvning yuridik tuzilmasi va Anvar Abduqayumning joriy roli mustaqil ravishda tasdiqlanmagan hamda joriy shaxsiy mulk sifatida taqdim etilmaydi.",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys (VISAGE ELECTRIC MChJ)",
          code: "01: Polimer va o‘yinchoq ishlab chiqarish",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          verificationStatus: "verified",
          roleBadge: "Asoschi va Hammuassis",
          monogram: "TB",
          badge: "ISHLAB CHIQARISH // ZAVOD",
          year: "2008 / 2009–2012",
          activity: "Bolalar plastik o‘yinchoqlari ishlab chiqarishi va eksporti",
          desc: "Toybola brendi ostidagi bolalar plastik o‘yinchoqlarini ishlab chiqarish «VISAGE ELECTRIC» MChJ (2008-yilda ro‘yxatdan o‘tgan) bilan bog‘liq; 2009-yilda o‘yinchoq biznesiga kirilgan, 2010-yilda o‘yinchoq eksporti va 2012-yilda elektronika eksporti qo‘shilgan.",
          fullDesc: "Ochiq korxona reyestrlari (Orginfo.uz, STIR 300821924) 2008-yil 30-aprelda «VISAGE ELECTRIC» MChJ ro‘yxatdan o‘tkazilganini ko‘rsatadi (rahbar: Abdukayumov Baxtiyor Gayratovich; ulush taqsimoti ochiq reyestrda ko‘rsatilmagan). Spot.uz (2022-11-17) va Kun.uz intervyularida esa 2009-yilda o‘yinchoq ishlab chiqarish, 2010-yilda o‘yinchoq eksporti va 2012-yilda elektronika eksporti boshlangani qayd etilgan. Yuridik ro‘yxatdan o‘tish fakti yakka mulkdorlik isboti sifatida talqin qilinmaydi va sanalar alohida ko‘rsatiladi.",
          role: "Asoschi va Hammuassis",
          period: "2008 (VISAGE ELECTRIC MChJ) / 2009 (O‘yinchoq) / 2010–2012 (Eksport)",
          legalMilestones: [
            { year: "2008", label: "«VISAGE ELECTRIC» MChJ yuridik ro‘yxatdan o‘tishi (Orginfo.uz, STIR 300821924)" },
            { year: "2009", label: "O‘yinchoq ishlab chiqarish yo‘nalishining boshlanishi (Spot.uz)" },
            { year: "2010", label: "O‘yinchoq eksporti faoliyatining boshlanishi (Spot.uz)" },
            { year: "2012", label: "Eksport tarkibiga elektronika mahsulotlari qo‘shilishi (Spot.uz)" },
          ],
          sector: "Polimer sanoati va bolalar o‘yinchoqlari",
          model: "Tizimli reglamentlar va direktorlar kengashi",
          categoryBadge: "Sanoat & O‘yinchoqlar",
          tags: ["Plastik quyish", "VISAGE ELECTRIC MChJ", "MDH eksporti"],
          status: "Tasdiqlangan ishlab chiqarish korxonasi",
          source: "Orginfo.uz (VISAGE ELECTRIC MChJ), Spielwarenmesse.de, Gazeta.uz (2020), Toybola.com",
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
          verificationStatus: "pending",
          roleBadge: "Hammuassis / Hamkor (yakka mulkdor emas)",
          monogram: "SM",
          badge: "ISHLAB CHIQARISH // KIMYO",
          year: "2015 (tasdiq kutilmoqda)",
          activity: "Polimer xomashyosi va rang konsentratlari loyihasi",
          desc: "Polimer korxonalari uchun rang konsentratlari va modifikatorlar ishlab chiqaruvchi hammuassislikdagi sanoat loyihasi.",
          fullDesc: "Sanoat miqyosidagi polimer korxonalari uchun modifikatorlar va rang beruvchi masterbatch xomashyosi ishlab chiqarish loyihasi. Hammuassislik va sanoat hamkorligi asosida tashkil etilgan (yakka mulkchilik emas; joriy yuridik holati tasdiqlanishi kutilmoqda).",
          role: "Hammuassis / Hamkor (yakka mulkdor emas)",
          period: "2015 (tasdiqlanishi kutilmoqda)",
          sector: "Kimyo sanoati va polimerlar",
          model: "B2B xomashyo ishlab chiqarish va hamkorlik",
          categoryBadge: "Kimyo Majmuasi",
          tags: ["Kimyo sanoati", "Polimer modifikatorlar", "B2B xomashyo"],
          status: "Hammuassislikdagi B2B sanoat loyihasi",
          source: "B2B kooperatsiya kelishuvlari, tasdiqlanishi kutilmoqda",
          hasLogo: false,
          assetLabel: "[Hammuassislikdagi sanoat loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "03: HoReCa restoranlar",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          verificationStatus: "historical",
          roleBadge: "Asoschi (tarixiy bosqich)",
          monogram: "AF",
          badge: "HORECA // TARIXIY",
          year: "2017 (tarixiy)",
          activity: "Turk taomlari restoranlar tarmog‘i",
          desc: "Standartlashtirilgan oshxona texnologiyalariga asoslangan restoranlar tarmog‘i. Birinchi muassasa 2017-yilda ochilgan; joriy mulkdorlik da’vo qilinmaydi.",
          fullDesc: "Spot.uz (2020 / 2022) intervyularida birinchi Afiyet restorani 2017-yilda ochilgani qayd etilgan. Ochiq YouTube intervyularida esa restoran sohasidagi sherikchilik tajribalari muhokama qilingan; bugungi kunda joriy mulkdorlik saqlanib qolgani mustaqil reyestrlarda tasdiqlanmagan va da’vo qilinmaydi.",
          role: "Asoschi va Hamkor (tarixiy ishtirok)",
          period: "2017-yilda ochilgan (joriy mulkdorlik tasdiqlanmagan)",
          sector: "HoReCa va umumiy ovqatlanish",
          model: "Standartlashtirilgan oshxona boshqaruvi",
          categoryBadge: "Umumiy ovqatlanish",
          tags: ["Texnologik xarita", "Fast-Casual", "Tarixiy bosqich"],
          status: "Tarixiy asoschilik (joriy mulkdorlik tasdiqlanmagan)",
          source: "Spot.uz intervyulari (2020 / 2022); joriy egalik tasdiqlanmagan",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Tarixiy HoReCa loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "04: HoReCa kafe",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          verificationStatus: "historical",
          roleBadge: "Hamkor (tarixiy bosqich)",
          monogram: "PR",
          badge: "HORECA // TARIXIY",
          year: "2020 (tarixiy)",
          activity: "Italyancha muzqaymoq va kafe tarmog‘i",
          desc: "Sovuq logistika zanjiri va italyancha retseptura asosida tashkil etilgan kafe tarmog‘i. Birinchi nuqta 2020-yilda ochilgan; joriy mulkdorlik da’vo qilinmaydi.",
          fullDesc: "Spot.uz (2020) intervyusida birinchi Puro nuqtasi 2020-yilda ochilgani qayd etilgan. Joriy egalik yoki chiqish (exit) sanasi ochiq reyestrlarda tasdiqlanmagani sababli ushbu yozuv tarixiy hamkorlik bosqichi sifatida ko‘rsatiladi.",
          role: "Hamkor va Tashabbuskor (tarixiy ishtirok)",
          period: "2020-yilda ochilgan (joriy mulkdorlik tasdiqlanmagan)",
          sector: "HoReCa va qandolatchilik",
          model: "Hamkorlik va sovuq zanjir boshqaruvi",
          categoryBadge: "Kafe & Qandolatchilik",
          tags: ["Sovuq logistika", "Italiya retsepturasi", "Tarixiy bosqich"],
          status: "Tarixiy hamkorlik (joriy mulkdorlik tasdiqlanmagan)",
          source: "Spot.uz intervyusi (2020); joriy egalik tasdiqlanmagan",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Tarixiy kafe loyihasi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "05: Ichki IT infratuzilma (tasdiqlanishi kutilmoqda)",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          verificationStatus: "pending",
          roleBadge: "Tasdiqlanishi kutilmoqda (alohida kompaniya emas)",
          monogram: "IT",
          badge: "B2B SERVIS // TASDIQ KUTILMOQDA",
          year: "2019 (tasdiq kutilmoqda)",
          activity: "Ichki ERP va boshqaruv hisobotlarini raqamlashtirish",
          desc: "Ekotizim korxonalarining ombor va hisobot jarayonlarini raqamlashtirish bilan bog‘liq ichki tashabbus; huquqiy tuzilmasi va Anvar Abduqayumning joriy roli mustaqil tasdiqlanmagan.",
          fullDesc: "Ekotizimdagi jarayonlarni avtomatlashtirish kontekstida tilga olinadigan ichki IT infratuzilma tashabbusi. Uning yuridik shakli va Anvar Abduqayumning joriy huquqiy roli mustaqil ochiq manbalarda tasdiqlanmaganligi sababli tasdiqlangan xususiy kompaniya sifatida taqdim etilmaydi.",
          role: "Mijoz tasdig‘ini kutayotgan ichki IT tashabbusi (mulkdorlik da’vo qilinmaydi)",
          period: "2019 (huquqiy tafsilotlar tasdiqlanishi kutilmoqda)",
          sector: "Axborot texnologiyalari (ichki xizmat)",
          model: "Ichki tizimlar integratsiyasi",
          categoryBadge: "Ichki IT // Tasdiqlanishi kutilmoqda",
          tags: ["Ichki ERP", "Ombor nazorati", "Tasdiq kutilmoqda"],
          status: "Huquqiy tuzilmasi va joriy roli tasdiqlanishi kutilmoqda",
          source: "Mijoz tasdig‘ini kutayotgan ro‘yxat (mustaqil yuridik tasdiq mavjud emas)",
          hasLogo: false,
          assetLabel: "[Ichki jarayonlarni raqamlashtirish tashabbusi]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "O‘zbekiston Biznes va Sanoat Kengashi (UZBIC)",
          code: "06: Mustaqil jamoat kengashi",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          verificationStatus: "public",
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
        personal: "Paket ishlab chiqarish (2005)",
        founding: "VISAGE ELECTRIC (2008), o‘yinchoq (2009) va eksport (2010–2012)",
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
          tag: "Dastlabki ishlab chiqarish",
          period: "2005",
          stageNumber: "01",
          title: "Paket ishlab chiqarish biznesining boshlanishi",
          summary:
            "Spot.uz intervyusiga ko‘ra, Anvar Abduqayum 2005-yilda o‘zining ilk tadbirkorlik yo‘nalishi — paket ishlab chiqarish biznesini boshlagan. Ushbu bosqich ishlab chiqarish intizomi, xomashyo ta’minoti va keyinchalik Qozog‘istonga qadar yetkazib berish tajribasini shakllantirgan.",
          role: "Shaxsiy ishlab chiqarish va savdo amaliyoti",
          source: "Spot.uz (2022-yil 17-noyabr intervyusi)",
          verificationNote:
            "Spot.uz (2022-11-17) da bevosita «2005-yili birinchi biznesim — paket biznesini boshlaganman» deya qayd etilgan; 2008-yilda bu yo‘nalishdagi marja 5% gacha tushgach, yangi yo‘nalish izlangan.",
          milestone: "Polietilen paket ishlab chiqarish va dastlabki bozor amaliyoti",
          focus: "Paket ishlab chiqarish",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Yuridik ro‘yxat, o‘yinchoq va eksport",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "VISAGE ELECTRIC MChJ (2008), o‘yinchoq ishlab chiqarish (2009) va eksport bosqichlari (2010–2012)",
          summary:
            "2008-yil 30-aprelda «VISAGE ELECTRIC» MChJ yuridik jihatdan ro‘yxatdan o‘tkazilgan. 2009-yilda o‘yinchoq ishlab chiqarish yo‘lga qo‘yilgan, 2010-yilda o‘yinchoq eksporti boshlangan va 2012-yilda eksport tarkibiga elektronika mahsulotlari qo‘shilgan.",
          role: "Asoschi va Hammuassis",
          source: "Orginfo.uz (VISAGE ELECTRIC MChJ), Spot.uz (2022-11-17), Spielwarenmesse.de",
          verificationNote:
            "Yuridik ro‘yxatdan o‘tish (2008), o‘yinchoq biznesiga kirish (2009), o‘yinchoq eksporti (2010) va elektronika eksporti (2012) alohida sanalar sifatida ajratilgan; yagona tashkil sanasi sifatida birlashtirilmaydi.",
          milestone: "2008 ro‘yxat -> 2009 o‘yinchoq -> 2010 eksport -> 2012 elektronika",
          focus: "Polimer sanoati va eksport bosqichlari",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Hammuassislikdagi sanoat",
          period: "2015-yildan",
          stageNumber: "03",
          title: "Samtech Masterbatches polimer xomashyosi yo‘nalishi",
          summary:
            "Polimer sanoati uchun rang konsentratlari va modifikatorlar (Samtech Masterbatches) yo‘nalishida B2B sanoat hamkorligi yo‘lga qo‘yilgan.",
          role: "Hammuassis / Sanoat hamkori (tasdiqlanishi kutilmoqda)",
          source: "Ochiq kanal ma’lumotlari (yuridik tasdiq kutilmoqda)",
          verificationNote:
            "Ushbu yo‘nalish yakka mulkchilik emas, hamkorlik loyihasi sifatida ko‘rsatilgan; aniq yuridik rekvizitlar va faoliyat ko‘lami mijoz tasdig‘ini talab qiladi.",
          milestone: "Polimer xomashyosi yo‘nalishida B2B sanoat hamkorligi",
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
            "Hammuassislik va tarmoq loyihalarida (Toybola / VISAGE ELECTRIC, Samtech, Afiyet) sheriklik hamda boshqaruv rollarini taqsimlash tajribasi.",
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
        title: "Uchrashuv va hamkorlik tartibi",
        lead: "Tijoriy takliflar, strategik sheriklik va hamkorlik bo'yicha rasmiy murojaat qilish tartibi.",
        specs: [
          { label: "Qabul holati", value: "Rasmiy qabul va hamkorlik" },
          { label: "Muhokama mavzulari", value: "Tizimlashtirish va strategik sheriklik" },
          { label: "Aloqa manzillari", value: "Tasdiqlangan ommaviy kanallar orqali" },
        ],
        cardTitle: "Uchrashuv va hamkorlik",
        cardDescription: "Uchrashuv va hamkorlik bo'yicha rasmiy ma'lumotlar sahifasi.",
        routeLabel: "Sahifa:",
        primaryCta: "Hamkorlik tartibi",
        telegramCta: "Hamkorlik tartibi",
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
      telegramLabel: "Aloqa va hamkorlik",
      callLabel: "Qo'ng'iroq",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Tizimli tadbirkorlik, sanoat ishlab chiqarishi va boshqaruv amaliyoti.",
      bookingCta: "Hamkorlik tartibi",
      navHeading: "Sayt bo‘limlari",
      contactHeading: "Rasmiy aloqa",
      platformsHeading: "Ommaviy kanallar",
      bookingLinkLabel: "Hamkorlik tartibi",
      colophonNote: "© 2026 Anvar Abduqayum. Sanoat va boshqaruv ekotizimi.",
      backToTop: "Sahifa boshiga qaytish",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Asosiy sahifa" },
        { code: "02", anchor: "#portfel", label: "Biznes ekotizimi" },
        { code: "03", anchor: "#yol", label: "Faoliyat yo‘li" },
        { code: "04", anchor: "#tashabbuslar", label: "Joriy tashabbuslar" },
        { code: "05", anchor: "#tamoyil", label: "Qolip tamoyili" },
        { code: "06", anchor: "#media", label: "Bilimlar va media" },
        { code: "07", anchor: "#xizmatlar", label: "B2B hamkorlik" },
        { code: "08", anchor: "#aloqa", label: "Rasmiy aloqa" },
      ],
    },
    initiatives: {
      sectionNum: "07",
      eyebrow: "JORIY TASHABBUSLAR VA TA’LIM (2025–2026)",
      title: "Ommaviy ma’ruzalar, kichik biznes ta’limi va loyiha taqdimotlari",
      subtitle:
        "2025–2026-yillarda ochiq YouTube kanalida va ommaviy chiqishlarda e’lon qilingan ta’limiy hamda loyihaviy tashabbuslar to‘plami.",
      disclaimer:
        "Faktik eslatma: quyidagi bandlar faqat ochiq e’lon qilingan ommaviy materiallar asosida taqdim etilgan; tijorat kurslari yoki mulkiy huquqlar tasdiqlanmaguncha da’vo qilinmaydi.",
      statusLabels: {
        verified_educational: "Tasdiqlangan ta’limiy video",
        pending_confirmation: "Ommaviy ta’lim // Tasdiq kutilmoqda",
        public_presentation: "Faqat ommaviy taqdimot",
      },
      items: [
        {
          id: "avtopilot",
          tag: "OMMAVIY YOUTUBE MA’RUZA",
          status: "verified_educational",
          title: "«Avtopilot» — biznesni tizimlashtirish bo‘yicha 8 qadamli ma’ruza",
          period: "2026-yil may",
          summary:
            "Rasmiy YouTube kanalida e’lon qilingan 57 daqiqalik ochiq ma’ruzada biznesni egalik nazoratidan muntazam reglamentlar va boshqaruv tizimiga o‘tkazishning 8 amaliy qadami tushuntirilgan.",
          caveat:
            "Faqat ochiq 8 qadamli YouTube ma’ruzasi tasdiqlangan; rasman tasdiqlangan pullik «Avtopilot» kursi mavjudligi da’vo qilinmaydi.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-05-17)",
          sourceUrl: "https://www.youtube.com/watch?v=ZiWr2ND4LSo",
        },
        {
          id: "microbiznes",
          tag: "KICHIK BIZNES TA’LIMI",
          status: "pending_confirmation",
          title: "Kichik biznes uchun ta’limiy kontent va «MICROBIZNES» kanal identiteti",
          period: "2026-yil",
          summary:
            "Kichik va o‘rta tadbirkorlar uchun ishlab chiqarish intizomi, xodimlar bilan ishlash, moliyaviy nazorat va mijozlar bilan tizimli aloqa mavzularidagi ochiq videodarslar turkumi.",
          caveat:
            "«MICROBIZNES» ommaviy kanal identiteti sifatida tilga olinishi mumkin, biroq tasdiqlangan alohida tijorat akademiyasi yoki pullik dastur sifatida taqdim etilmaydi.",
          sourceLabel: "YouTube — @AnvarAbduqayum kanali (2026)",
          sourceUrl: "https://www.youtube.com/watch?v=qHAo5gJmjaE",
        },
        {
          id: "bochka-resort",
          tag: "OMMAVIY LOYIHA TAQDIMOTI",
          status: "public_presentation",
          title: "«Bochka Resort» — ommaviy videolavhalar va taqdimotlar",
          period: "2026-yil iyun–iyul",
          summary:
            "2026-yilgi ochiq YouTube videolari va loyiha taqdimotlarida ko‘rsatilgan mehmonxona-kurort konsepsiyasi hamda investorlar bilan uchrashuv muhokamalari.",
          caveat:
            "Faqat tasdiqlangan ommaviy videolar va taqdimotlarni aks ettiradi; yakka mulkdorlik, developerlik maqomi, kafolatlangan daromad yoki investitsiya shartlari da’vo qilinmaydi.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-07-16)",
          sourceUrl: "https://www.youtube.com/watch?v=oKbTo0WxdGU",
        },
      ],
    },
    knowledgeMedia: {
      heading: "Biznes bilimlar va tasdiqlangan YouTube katalogi",
      submeta: "12 ta tasdiqlangan video // dastlab 6 ta asosiy material ko‘rsatiladi",
      ariaLabel: "Mavzular bo‘yicha video filtri",
      showAllLabel: "Barcha 12 ta tasdiqlangan videoni ko‘rsatish",
      showCuratedLabel: "Faqat 6 ta saralangan videoni ko‘rsatish",
      watchLabel: "Pleyerda ko‘rish",
      extLabel: "YouTube’da ko‘rish",
      filters: {
        all: "Saralangan / Barchasi",
        systemization: "Biznesni tizimlashtirish",
        manufacturing: "Ishlab chiqarish",
        export: "Eksport",
        entrepreneurship: "Tadbirkorlik",
        interviews: "Intervyular",
        investment: "Investitsiya muhokamalari",
      },
      statusLabels: {
        verified: "Tasdiqlangan birlamchi video",
        curated: "Saralangan to‘plam",
      },
    },
    collaborationConcept: {
      eyebrow: "B2B HAMKORLIK YO‘NALISHLARI",
      title: "Strategik muloqot va B2B hamkorlik yo‘nalishlari",
      subtitle:
        "Sanoat kooperatsiyasi, eksport hamkorligi, biznes ta'limi va ommaviy axborot vositalari bo‘yicha muloqot yo‘nalishlari.",
      demoDisclaimer:
        "Hamkorlik bo‘yicha barcha murojaatlar rasmiy aloqa kanallari orqali ko‘rib chiqiladi.",
      tracks: [
        {
          id: "industrial-exchange",
          code: "Yo‘nalish 01 // Sanoat amaliyoti",
          title: "Ishlab chiqarish va sifat reglamentlari tajribasi",
          shortSummary: "Zavod boshqaruvi, plastik quyish intizomi va SOP amaliyotlari bo‘yicha B2B muloqot.",
          audience: "Mahalliy ishlab chiqaruvchilar va zavod rahbarlari",
          overview: "Ishlab chiqarish jarayonlarini standartlashtirish va kadrlar rotatsiyasidan mustaqil boshqaruv tajribasi yuzasidan umumiy fikr almashish.",
          scopePoints: [
            "Smena va sex intizomini reglamentlashtirish misollari",
            "Xomashyo va sifat nazorati bo‘yicha amaliy kuzatuvlar",
          ],
          note: "Sanoat tajribasi va reglamentlar almashinuvi",
        },
        {
          id: "export-uzbic-dialogue",
          code: "Yo‘nalish 02 // Eksport kooperatsiyasi",
          title: "UZBIC doirasidagi B2B eksport muloqoti",
          shortSummary: "Tashqi bozorlarga chiqish va ishlab chiqaruvchilar kooperatsiyasi bo‘yicha jamoat platformasi yo‘nalishi.",
          audience: "Eksportga tayyorlanayotgan sanoat korxonalari",
          overview: "Mustaqil O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) doirasida ko‘tariladigan tashqi savdo va sanoat hamkorligi mavzulari.",
          scopePoints: [
            "Eksport standartlari va sertifikatlashtirish talablari",
            "Tarmoqlararo B2B kooperatsiya tashabbuslari",
          ],
          note: "Jamoat platformasi konteksti: tijorat kafolati berilmaydi",
        },
      ],
    },
    ecosystemTimeline: {
      sectionNum: "04",
      moduleLabel: "QOLIP №02 // EKOTIZIM XRONIKASI (6 BOSQICH)",
      title: "Bosib o‘tilgan yo‘l",
      titleEmphasis: "",
      subtitle:
        "2005-yildagi paket ishlab chiqarishdan tortib VISAGE ELECTRIC MChJ, Toybola eksporti, sanoat hamkorliklari, UZBIC kengashi hamda 2025–2026-yillardagi ommaviy ta’lim tashabbuslarigacha bo‘lgan aniq tarixiy zanjir.",
      filterAriaLabel: "Rol bo‘yicha filtrlash",
      filters: {
        all: "Barchasi (6)",
        personal: "Shaxsiy tajriba va asoschilik (2)",
        partner: "Hammuassislik va hamkorlik (2)",
        council: "Jamoat faoliyati va ta’lim (2)",
      },
      legend: {
        ariaLabel: "Rollar tasnifi",
        personal: "Paket ishlab chiqarish (2005)",
        founding: "VISAGE ELECTRIC (2008), o‘yinchoq (2009) va eksport (2010–2012)",
        partner: "Hammuassislik va hamkorlik loyihalari",
        council: "UZBIC va 2025–2026 ommaviy tashabbuslar",
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
          tag: "Dastlabki ishlab chiqarish",
          period: "2005",
          stageNumber: "01",
          title: "Paket ishlab chiqarish biznesining boshlanishi",
          summary:
            "Spot.uz (2022) intervyusida tasdiqlanganidek, 2005-yilda polietilen paket ishlab chiqarish biznesi boshlangan va keyinchalik Qozog‘istonga yetkazib berish tajribasi to‘plangan.",
          role: "Shaxsiy ishlab chiqarish va savdo amaliyoti",
          source: "Spot.uz (2022-yil 17-noyabr intervyusi)",
          verificationNote:
            "Aniq birlamchi iqtibos: «2005-yili birinchi biznesim — paket biznesini boshlaganman».",
          milestone: "Birinchi ishlab chiqarish korxonasi va bozor amaliyoti",
          focus: "Paket ishlab chiqarish",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Yuridik ro‘yxat, o‘yinchoq va eksport",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "VISAGE ELECTRIC MChJ (2008), o‘yinchoq ishlab chiqarish (2009) va eksport (2010–2012)",
          summary:
            "2008-yilda «VISAGE ELECTRIC» MChJ ro‘yxatdan o‘tkazilgan, 2009-yilda o‘yinchoq ishlab chiqarish boshlangan, 2010-yilda o‘yinchoq eksporti yo‘lga qo‘yilgan va 2012-yilda eksport tarkibiga elektronika mahsulotlari qo‘shilgan.",
          role: "Asoschi va Hammuassis",
          source: "Orginfo.uz (VISAGE ELECTRIC MChJ), Spot.uz (2022-11-17), Spielwarenmesse.de",
          verificationNote:
            "Har bir sana (2008 ro‘yxat, 2009 o‘yinchoq, 2010 eksport, 2012 elektronika) alohida fakt sifatida saqlanadi.",
          milestone: "2008 -> 2009 -> 2010 -> 2012 bosqichma-bosqich eksport o‘sishi",
          focus: "Polimer sanoati va eksport",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Hammuassislikdagi sanoat",
          period: "2015-yildan",
          stageNumber: "03",
          title: "Samtech Masterbatches polimer xomashyosi yo‘nalishi",
          summary:
            "Polimer sanoati uchun rang konsentratlari va modifikatorlar (Samtech Masterbatches) yo‘nalishida B2B sanoat hamkorligi yo‘lga qo‘yilgan.",
          role: "Hammuassis / Sanoat hamkori (tasdiqlanishi kutilmoqda)",
          source: "Ochiq kanal ma’lumotlari (yuridik tasdiq kutilmoqda)",
          verificationNote:
            "Hamkorlik loyihasi sifatida ko‘rsatilgan; yuridik rekvizitlar mijoz tasdig‘ini talab qiladi.",
          milestone: "Polimer xomashyosi yo‘nalishida B2B sanoat hamkorligi",
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
            "Texnologik xarita va oshxona standartlari asosida 2017-yilda AFIYET Kebab, 2020-yilda PURO Gelateria ochildi. 2019-yildan tilga olinadigan ichki IT tashabbusining yuridik shakli tasdiqlanishi kutilmoqda.",
          role: "Asoschi va Hamkor (AFIYET), Hamkor (PURO); IT Support & Service — tasdiq kutilmoqda",
          source: "Spot.uz rasmiy intervyusi (2020); IT Support & Service — mustaqil tasdiqlanmagan",
          verificationNote:
            "AFIYET (2017) va PURO (2020) Spot.uz da tasdiqlangan; IT Support & Service yuridik tuzilmasi va joriy roli mustaqil ravishda tasdiqlanmagan.",
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
            "2022-yilda tashkil etilgan O‘zbekiston Biznes va Sanoat Kengashi (UZBIC) raisi sifatida mahalliy ishlab chiqaruvchilar o‘rtasida B2B kooperatsiya yo‘nalishida jamoat faoliyati olib borilmoqda.",
          role: "Jamoat Kengashi Raisi (xususiy tijorat mulkdorligi emas)",
          source: "uzbic.uz portali va Kun.uz axborotlari",
          verificationNote:
            "UZBIC nodavlat jamoat platformasi bo‘lib, xususiy mulk emas.",
          milestone: "Sanoat eksportchilari uchun B2B jamoat kooperatsiyasi",
          focus: "Sanoat diplomatiyasi va eksport",
        },
        {
          id: "public-education-2025-2026",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Ommaviy chiqishlar va ta’lim",
          period: "2025 — 2026",
          stageNumber: "06",
          title: "«Avtopilot» ma’ruzasi, kichik biznes ta’limi va «Bochka Resort» ommaviy taqdimotlari",
          summary:
            "2025–2026-yillarda Inter Nation va mualliflik YouTube kanali orqali tizimlashtirish bo‘yicha 8 qadamli «Avtopilot» ma’ruzasi, «MICROBIZNES» kanal identiteti ostidagi videodarslar hamda «Bochka Resort» haqidagi ommaviy videolavhalar e’lon qilindi.",
          role: "Ma’ruzachi, kontent muallifi va ommaviy loyiha taqdimotchisi",
          source: "YouTube — Anvar Abduqayum (2026), Inter Nation (2026-01-16)",
          verificationNote:
            "Faqat ochiq YouTube chiqishlari tasdiqlangan; pullik kurslar yoki «Bochka Resort» bo‘yicha yakka mulkdorlik va investitsiya shartlari da’vo qilinmaydi.",
          milestone: "Ochiq biznes ta’limi va ommaviy loyiha taqdimotlari",
          focus: "Bilim ulashish va tizimlashtirish",
        },
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
      ctaButton: "Формат обращения",
      consulting: "Услуги",
      bookingCta: "Формат обращения",
    },
    hero: {
      moduleLabel: "ПРЕСС-ФОРМА №00 // ГЛАВНАЯ МАТРИЦА",
      statusBadge: "ПРОМЫШЛЕННАЯ И ЭКСПОРТНАЯ ЭКОСИСТЕМА",
      dimensionSpec: "СТАНДАРТ: ISO / ГОСТ 2026 // СЕРИЯ: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Работающие без владельца",
      headlineSuffix: " системы и промышленное управление.",
      summary:
        "Анвар Абдукаюм — основатель и соучредитель Toybola Toys (производственная компания ООО «VISAGE ELECTRIC»), соучредитель промышленного проекта Samtech Masterbatches, партнер сетей HoReCa и председатель независимой общественной платформы UZBIC. Данная редакционная концепция объединяет сведения о производственном опыте, публичных выступлениях и экосистеме.",
      ctaPrimary: "Формат обращения",
      ctaSecondary: "Экосистема бизнесов",
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
          value: "2005 — 2012",
          label: "Упаковочное производство (2005), VISAGE ELECTRIC (2008), игрушки (2009) и экспорт (2010/2012)",
        },
        {
          value: "2015 — 2022",
          label: "Samtech, проекты HoReCa и общественный совет UZBIC",
        },
        {
          value: "6 направлений",
          label: "Toybola (VISAGE ELECTRIC), Samtech, 2 HoReCa, внутренний IT и UZBIC",
        },
      ],
      portraitRole: "Промышленник, Инженер-Предприниматель",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
      brands: [
        "TOYBOLA · VISAGE ELECTRIC",
        "SAMTECH MASTERBATCHES",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      sectionNum: "07",
      tablistAriaLabel: "Направления B2B-сотрудничества",
      eyebrow: "НАПРАВЛЕНИЯ B2B-СОТРУДНИЧЕСТВА",
      title: "4 потенциальных направления делового взаимодействия и диалога",
      subtitle:
        "Форматы взаимодействия в сфере промышленной кооперации, экспорта, бизнес-знаний и медиа.",
      disclaimer:
        "Данная независимая концепция не является официальным коммерческим предложением услуг.",
      labels: {
        programSpec: "ОПИСАНИЕ НАПРАВЛЕНИЯ",
        format: "Формат взаимодействия",
        audience: "Аудитория",
        overview: "Общее описание",
        focusAreas: "Ключевые темы диалога",
        ctaText: "Формат обращения",
      },
      services: [
        {
          id: "industrial-cooperation",
          code: "Направление 01 // Промышленность",
          name: "Промышленная кооперация",
          shortSummary:
            "B2B-диалог по производственным цепочкам, локализации сырья и практике управления заводом.",
          audience:
            "Отечественные производители, промышленные комплексы и поставщики сырья",
          overview:
            "Направление взаимодействия на основе опыта полимерного производства, регламентации цехов и партнерской промышленной кооперации.",
          focusAreas: [
            "Производственная кооперация и локализация комплектующих",
            "Обмен опытом по стандартным регламентам (SOP) и контролю качества",
            "Вопросы операционной устойчивости предприятий",
          ],
          format: "Промышленный диалог и регламенты",
          ctaText: "Формат обращения",
        },
        {
          id: "export-partnerships",
          code: "Направление 02 // Экспорт",
          name: "Экспортное партнерство",
          shortSummary:
            "Вопросы выхода на внешние рынки и B2B-диалог в рамках общественной платформы UZBIC.",
          audience:
            "Производственные компании, ориентированные на расширение экспортной географии",
          overview:
            "Потенциальный формат диалога, опирающийся на экспортную практику 2010–2012 гг. и деятельность независимого Совета (UZBIC).",
          focusAreas: [
            "Адаптация продукции к требованиям зарубежных рынков и сертификации",
            "B2B-кооперация с партнерами из СНГ и соседних стран",
            "Отраслевое взаимодействие на общественной площадке UZBIC",
          ],
          format: "Контекст общественной платформы UZBIC",
          ctaText: "Формат обращения",
        },
        {
          id: "knowledge-education",
          code: "Направление 03 // Знания и образование",
          name: "Бизнес-знания и образование",
          shortSummary:
            "Публичные лекции, видеоматериалы для малого бизнеса и обмен опытом систематизации.",
          audience:
            "Предприниматели и организаторы форумов, изучающие систематизацию бизнеса",
          overview:
            "Информационное направление по темам 8-шаговой лекции «Avtopilot» и открытых обучающих материалов для малого бизнеса на YouTube.",
          focusAreas: [
            "Выступления на открытых бизнес-форумах и предпринимательских встречах",
            "Разбор управленческого подхода («Колип» / регламентация без владельца)",
            "Примечание: коммерческие курсы или платная академия не предлагаются",
          ],
          format: "Публично-образовательный формат",
          ctaText: "Формат обращения",
        },
        {
          id: "media-speaking",
          code: "Направление 04 // Медиа и выступления",
          name: "Запросы для медиа и выступлений",
          shortSummary:
            "Примерный формат обращений для интервью в СМИ, подкастов и отраслевых конференций.",
          audience:
            "Деловые редакции, медиапроекты и организаторы профильных форумов",
          overview:
            "Формат для медиазапросов и участия в панельных дискуссиях на примере публикаций и интервью (SUBYEKTIV, Inter Nation, Spot.uz, Kun.uz).",
          focusAreas: [
            "Интервью по темам производства, экспорта и управления",
            "Участие в деловых форумах и дискуссионных панелях",
            "Контактная маршрутизация активируется только после подтверждения командой",
          ],
          format: "Формат для медиазапросов",
          ctaText: "Формат обращения",
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
      moldLegend: "ПРОМЫШЛЕННАЯ ЭКОСИСТЕМА // 6 НАПРАВЛЕНИЙ",
      taxonomy: {
        ariaLabel: "Классификация ролей",
        founder: "Основатель / Соучредитель (Toybola · VISAGE ELECTRIC, Afiyet)",
        partner: "Промышленное соучредительство и партнерство (Samtech, Puro)",
        internal: "Внутренняя IT-инициатива (не отдельная корпорация)",
        public: "Независимый общественный совет (UZBIC, не частный бизнес)",
        historical: "Исторический этап (2005–2012: пакеты, VISAGE ELECTRIC, игрушки и экспорт)",
        pending: "Юридические детали ожидают подтверждения",
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
        all: "Все (6)",
        mfg: "Производство (2)",
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
        legalMilestones: "Исторические и юридические вехи (раздельно)",
        pendingBadge: "Ожидает подтверждения",
        verifiedBadge: "Подтверждено источником",
        publicBadge: "Общественная платформа",
        pendingNotice:
          "Примечание: юридическая структура данного объекта и текущая роль Анвара Абдукаюма не подтверждены независимыми реестрами; объект не представлен как подтвержденная частная собственность.",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys (ООО «VISAGE ELECTRIC»)",
          code: "01: Полимерные игрушки",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          verificationStatus: "verified",
          roleBadge: "Основатель и Соучредитель",
          monogram: "TB",
          badge: "ПРОИЗВОДСТВО // ЗАВОД",
          year: "2008 / 2009–2012",
          activity: "Производство детских полимерных игрушек и экспорт",
          desc: "Производство детских пластмассовых игрушек под брендом Toybola связано с ООО «VISAGE ELECTRIC» (зарегистрировано в 2008 г.); в 2009 г. начато направление игрушек, в 2010 г. — экспорт игрушек, а в 2012 г. к экспорту добавлена электроника.",
          fullDesc: "Открытый реестр (Orginfo.uz, ИНН 300821924) фиксирует регистрацию ООО «VISAGE ELECTRIC» 30 апреля 2008 г. (руководитель: Абдукаюмов Бахтиёр Гайратович; распределение долей публично не раскрыто). В интервью Spot.uz (17.11.2022) и Kun.uz указано начало производства игрушек в 2009 г., экспорт игрушек с 2010 г. и добавление электроники в 2012 г. Регистрация юрлица не используется как самостоятельное доказательство единоличного владения; все даты приведены раздельно.",
          role: "Основатель и Соучредитель",
          period: "2008 (ООО «VISAGE ELECTRIC») / 2009 (Игрушки) / 2010–2012 (Экспорт)",
          legalMilestones: [
            { year: "2008", label: "Юридическая регистрация ООО «VISAGE ELECTRIC» (Orginfo.uz, ИНН 300821924)" },
            { year: "2009", label: "Начало развития производства детских игрушек (Spot.uz)" },
            { year: "2010", label: "Начало экспортных поставок игрушек (Spot.uz)" },
            { year: "2012", label: "Расширение экспорта за счет электротоваров (Spot.uz)" },
          ],
          sector: "Полимерная промышленность и детские игрушки",
          model: "Регламенты (SOP) и совет директоров",
          categoryBadge: "Промышленность & Игрушки",
          tags: ["Литье пластика", "ООО «VISAGE ELECTRIC»", "Экспорт в СНГ"],
          status: "Подтвержденное производственное предприятие",
          source: "Orginfo.uz (ООО «VISAGE ELECTRIC»), Spielwarenmesse.de, Gazeta.uz (2020), Toybola.com",
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
          verificationStatus: "pending",
          roleBadge: "Соучредитель / Партнер (не единственный владелец)",
          monogram: "SM",
          badge: "ПРОИЗВОДСТВО // ХИМИЯ",
          year: "2015 (ожидает подтверждения)",
          activity: "Производство полимерного сырья и мастербатчей",
          desc: "Промышленный проект в соучредительстве по выпуску красящих концентратов и модификаторов для полимерной индустрии.",
          fullDesc: "Промышленный проект по выпуску модификаторов и красителей-мастербатчей для полимерных заводов. Реализован в партнерстве и соучредительстве (без единоличной собственности; текущий юридический статус ожидает подтверждения).",
          role: "Соучредитель / Партнер (не единственный владелец)",
          period: "2015 (ожидает подтверждения)",
          sector: "Химическая промышленность",
          model: "B2B-поставки и партнерское управление",
          categoryBadge: "Химический Комплекс",
          tags: ["Химпром", "Модификаторы", "B2B сырье"],
          status: "Промышленный проект на базе соучредительства",
          source: "Соглашения о промышленной кооперации (ожидает подтверждения)",
          hasLogo: false,
          assetLabel: "[Партнерский производственный проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "03: HoReCa рестораны",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          verificationStatus: "historical",
          roleBadge: "Основатель (исторический этап)",
          monogram: "AF",
          badge: "HORECA // ИСТОРИЧЕСКИЙ",
          year: "2017 (исторический)",
          activity: "Сеть ресторанов турецкой кухни",
          desc: "Сеть ресторанов со стандартизированными технологическими картами кухни. Первый ресторан открыт в 2017 г.; текущее владение не заявляется.",
          fullDesc: "В интервью Spot.uz (2020 / 2022) подтверждено открытие первого ресторана Afiyet в 2017 году. В публичных видеоинтервью также обсуждались сложности партнёрства в ресторанном бизнесе; сохранение текущего владения не подтверждено реестрами и не заявляется.",
          role: "Основатель и Партнер (историческое участие)",
          period: "Открыт в 2017 г. (текущее владение не подтверждено)",
          sector: "HoReCa и общественное питание",
          model: "Стандартизированное управление кухней",
          categoryBadge: "Общественное питание",
          tags: ["Техкарты кухни", "Fast-Casual", "Исторический этап"],
          status: "Историческое основание (текущее владение не подтверждено)",
          source: "Интервью Spot.uz (2020 / 2022); текущее владение не подтверждено",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Исторический HoReCa-проект]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "04: HoReCa кафе",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          verificationStatus: "historical",
          roleBadge: "Партнер (исторический этап)",
          monogram: "PR",
          badge: "HORECA // ИСТОРИЧЕСКИЙ",
          year: "2020 (исторический)",
          activity: "Сеть кафе-джелатерий",
          desc: "Кафе-кондитерская сеть на основе итальянской рецептуры и холодовой логистики. Первая точка открыта в 2020 г.; текущее владение не заявляется.",
          fullDesc: "По данным интервью Spot.uz (2020), первая точка Puro открылась в 2020 году. Поскольку текущее владение или дата выхода (exit) не подтверждены открытыми реестрами, запись представлена как исторический этап партнёрства.",
          role: "Партнер и Инициатор (историческое участие)",
          period: "Открыта в 2020 г. (текущее владение не подтверждено)",
          sector: "HoReCa и кондитерский сектор",
          model: "Партнерское управление",
          categoryBadge: "Кафе & Кондитерская",
          tags: ["Холодовая логистика", "Итальянская рецептура", "Исторический этап"],
          status: "Историческое партнёрство (текущее владение не подтверждено)",
          source: "Интервью Spot.uz (2020); текущее владение не подтверждено",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Исторический проект кафе]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "05: Внутренняя IT-инициатива (ожидает подтверждения)",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          verificationStatus: "pending",
          roleBadge: "Ожидает подтверждения (не отдельная компания)",
          monogram: "IT",
          badge: "B2B СЕРВИС // ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ",
          year: "2019 (ожидает подтверждения)",
          activity: "Цифровизация внутренних ERP и складских процессов",
          desc: "Внутренняя IT-инициатива, связанная с автоматизацией учета; юридическая структура и текущая роль Анвара Абдукаюма не подтверждены независимыми источниками.",
          fullDesc: "Внутренняя инфраструктурная IT-инициатива в рамках экосистемы. Поскольку ее юридический статус и текущая роль Анвара Абдукаюма не подтверждены независимыми открытыми реестрами, объект не представлен как подтвержденная частная компания.",
          role: "Ожидает подтверждения командой (право собственности не заявляется)",
          period: "2019 (юридические детали ожидают подтверждения)",
          sector: "Внутренняя IT-инфраструктура",
          model: "Внутренняя интеграция процессов",
          categoryBadge: "Внутренний IT // Ожидает подтверждения",
          tags: ["Внутренний ERP", "Учет складов", "Ожидает подтверждения"],
          status: "Юридический статус и текущая роль ожидают подтверждения",
          source: "Список на подтверждение клиентом (независимого реестра нет)",
          hasLogo: false,
          assetLabel: "[Внутренняя инициатива цифровизации]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "Совет по бизнесу и промышленности Узбекистана (UZBIC)",
          code: "06: Независимый общественный совет",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          verificationStatus: "public",
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
        personal: "Упаковочное производство (2005)",
        founding: "VISAGE ELECTRIC (2008), игрушки (2009) и экспорт (2010–2012)",
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
          tag: "Первый производственный опыт",
          period: "2005",
          stageNumber: "01",
          title: "Запуск упаковочного производства",
          summary:
            "По подтвержденным данным интервью Spot.uz, в 2005 году Анвар Абдукаюм начал свой первый бизнес — производство полиэтиленовых пакетов, получив опыт поставок сырья, управления цехом и последующего экспорта в Казахстан.",
          role: "Личная предпринимательская и производственная практика",
          source: "Spot.uz (интервью от 17 ноября 2022 г.)",
          verificationNote:
            "В публикации Spot.uz от 17.11.2022 прямо указано начало упаковочного бизнеса в 2005 году; после снижения маржинальности этого направления к 2008 году был начат поиск новых ниш.",
          milestone: "Старт собственного производства упаковки и цепей поставок",
          focus: "Производство упаковки",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Регистрация, игрушки и экспорт",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "ООО «VISAGE ELECTRIC» (2008), производство игрушек (2009) и этапы экспорта (2010–2012)",
          summary:
            "30 апреля 2008 года зарегистрировано ООО «VISAGE ELECTRIC». В 2009 году начато развитие производства детских игрушек, в 2010 году запущен экспорт игрушек, а в 2012 году к экспортным поставкам добавлены электротовары.",
          role: "Основатель и Соучредитель",
          source: "Orginfo.uz (ООО «VISAGE ELECTRIC»), Spot.uz (17.11.2022), Spielwarenmesse.de",
          verificationNote:
            "Юридическая регистрация (2008), начало направления игрушек (2009), экспорт игрушек (2010) и добавление электроники в экспорт (2012) разделены как самостоятельные факты без объединения в единую дату основания.",
          milestone: "2008 регистрация -> 2009 игрушки -> 2010 экспорт -> 2012 электроника",
          focus: "Полимерная индустрия и экспорт",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Промышленное соучредительство",
          period: "С 2015 года",
          stageNumber: "03",
          title: "Промышленное направление Samtech Masterbatches",
          summary:
            "На принципах промышленного партнерства запущено направление полимерных красителей и модификаторов Samtech Masterbatches.",
          role: "Соучредитель / Партнер (ожидает подтверждения)",
          source: "Материалы открытых каналов (ожидает подтверждения реестра)",
          verificationNote:
            "Проект указан как партнерская инициатива, а не единоличная собственность; точные юридические реквизиты и масштаб деятельности требуют подтверждения командой.",
          milestone: "B2B-кооперация в полимерном сырье",
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
        title: "Порядок обращения и сотрудничества",
        lead: "Прямые контакты для консультаций и встреч координируются через официальную приемную и администраторов.",
        specs: [
          { label: "Статус записи", value: "Прямая запись по регламенту" },
          { label: "Темы обсуждения", value: "Систематизация и стратегическое партнерство" },
          { label: "Каналы связи", value: "Через подтвержденные публичные профили" },
        ],
        cardTitle: "Порядок обращения",
        cardDescription: "Официальный порядок обращения и взаимодействия по проектам.",
        routeLabel: "Информация:",
        primaryCta: "Формат обращения",
        telegramCta: "Формат обращения",
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
      telegramLabel: "Контакты и обращение",
      callLabel: "Позвонить",
    },
    footer: {
      founderName: "Анвар Абдукаюм",
      tagline: "Системное предпринимательство, промышленное производство и управленческая практика.",
      bookingCta: "Формат обращения",
      navHeading: "Разделы сайта",
      contactHeading: "Официальная связь",
      platformsHeading: "Публичные каналы",
      bookingLinkLabel: "Формат обращения",
      colophonNote: "© 2026 Анвар Абдукаюм. Промышленная и управленческая экосистема.",
      backToTop: "Наверх",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Главная" },
        { code: "02", anchor: "#portfel", label: "Экосистема бизнесов" },
        { code: "03", anchor: "#yol", label: "Путь предпринимателя" },
        { code: "04", anchor: "#tashabbuslar", label: "Текущие инициативы" },
        { code: "05", anchor: "#tamoyil", label: "Принцип «Колип»" },
        { code: "06", anchor: "#media", label: "Знания и медиа" },
        { code: "07", anchor: "#xizmatlar", label: "B2B-диалог" },
        { code: "08", anchor: "#aloqa", label: "Контакты" },
      ],
    },
    initiatives: {
      sectionNum: "07",
      eyebrow: "ТЕКУЩИЕ ИНИЦИАТИВЫ И ОБРАЗОВАНИЕ (2025–2026)",
      title: "Публичные лекции, обучение малому бизнесу и презентации проектов",
      subtitle:
        "Подборка публичных образовательных материалов и проектных презентаций 2025–2026 годов с официального YouTube-канала и открытых выступлений.",
      disclaimer:
        "Фактическое уточнение: пункты отражают только подтвержденные открытые видеоматериалы и презентации; наличие платных программ или единоличные имущественные права без подтверждения не заявляются.",
      statusLabels: {
        verified_educational: "Подтвержденная видеолекция",
        pending_confirmation: "Публичное обучение // Ожидает подтверждения",
        public_presentation: "Только публичная презентация",
      },
      items: [
        {
          id: "avtopilot",
          tag: "ПУБЛИЧНАЯ YOUTUBE-ЛЕКЦИЯ",
          status: "verified_educational",
          title: "«Avtopilot» — 8-шаговая лекция по систематизации бизнеса",
          period: "Май 2026",
          summary:
            "57-минутная открытая лекция на официальном YouTube-канале, разбирающая 8 практических шагов перехода от ручного управления к регламентированным бизнес-процессам.",
          caveat:
            "Подтверждена только открытая 8-шаговая лекция на YouTube; наличие официально подтвержденного платного курса не заявляется.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-05-17)",
          sourceUrl: "https://www.youtube.com/watch?v=ZiWr2ND4LSo",
        },
        {
          id: "microbiznes",
          tag: "ОБУЧЕНИЕ МАЛОМУ БИЗНЕСУ",
          status: "pending_confirmation",
          title: "Образовательный контент для малого бизнеса и идентичность «MICROBIZNES»",
          period: "2026",
          summary:
            "Открытые видеоматериалы для предпринимателей по темам производственной дисциплины, управления персоналом, финансового контроля и системных продаж.",
          caveat:
            "«MICROBIZNES» может упоминаться как публично используемая идентичность канала, но не как подтвержденная самостоятельная коммерческая академия или платная программа.",
          sourceLabel: "YouTube — канал @AnvarAbduqayum (2026)",
          sourceUrl: "https://www.youtube.com/watch?v=qHAo5gJmjaE",
        },
        {
          id: "bochka-resort",
          tag: "ПУБЛИЧНАЯ ПРЕЗЕНТАЦИЯ ПРОЕКТА",
          status: "public_presentation",
          title: "«Bochka Resort» — публичные видеоматериалы и презентации",
          period: "Июнь–июль 2026",
          summary:
            "Открытые YouTube-видео 2026 года с презентацией концепции гостинично-курортного проекта и обсуждением формата встреч с потенциальными инвесторами.",
          caveat:
            "Отражает только подтвержденные публичные видео и презентации; единоличное владение, статус девелопера, гарантированная доходность и инвестиционные условия не заявляются.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-07-16)",
          sourceUrl: "https://www.youtube.com/watch?v=oKbTo0WxdGU",
        },
      ],
    },
    knowledgeMedia: {
      heading: "Бизнес-знания и подтвержденный YouTube-каталог",
      submeta: "12 подтвержденных видео // изначально показаны 6 ключевых материалов",
      ariaLabel: "Фильтр видео по темам",
      showAllLabel: "Показать все 12 подтвержденных видео",
      showCuratedLabel: "Показать 6 основных материалов",
      watchLabel: "Смотреть в плеере",
      extLabel: "Смотреть на YouTube",
      filters: {
        all: "Избранное / Все",
        systemization: "Систематизация бизнеса",
        manufacturing: "Производство",
        export: "Экспорт",
        entrepreneurship: "Предпринимательство",
        interviews: "Интервью",
        investment: "Инвестиционные обсуждения",
      },
      statusLabels: {
        verified: "Подтвержденное видео",
        curated: "Кураторская подборка",
      },
    },
    collaborationConcept: {
      eyebrow: "НАПРАВЛЕНИЯ B2B-СОТРУДНИЧЕСТВА",
      title: "Возможные направления делового диалога и B2B-кооперации",
      subtitle:
        "Форматы партнерского взаимодействия в сфере промышленного и делового диалога.",
      demoDisclaimer:
        "Все обращения и предложения о сотрудничестве рассматриваются по официальным каналам связи.",
      tracks: [
        {
          id: "industrial-exchange",
          code: "Направление 01 // Производственная практика",
          title: "Обмен опытом по производственным регламентам (SOP)",
          shortSummary: "Диалог с промышленными компаниями по вопросам стандартизации цехов и дисциплины смены.",
          audience: "Руководители и собственники производственных предприятий",
          overview: "Обсуждение подходов к описанию процессов и снижению зависимости цеха от ручного контроля.",
          scopePoints: [
            "Примеры регламентации смен и качества на базе полимерного производства",
            "Вопросы делегирования операционного контроля",
          ],
          note: "Обмен производственным опытом и регламентами",
        },
        {
          id: "export-uzbic-dialogue",
          code: "Направление 02 // Экспортная кооперация",
          title: "Отраслевой B2B-диалог на площадке UZBIC",
          shortSummary: "Вопросы выхода производителей на внешние рынки и кооперации в рамках общественного совета.",
          audience: "Компании, готовящие промышленный экспорт",
          overview: "Темы экспортных консорциумов и международной стандартизации в рамках независимого совета UZBIC.",
          scopePoints: [
            "Ориентация на требования зарубежных рынков и сертификации",
            "Кооперация производителей на площадке совета",
          ],
          note: "Контекст общественной платформы: без коммерческих гарантий",
        },
      ],
    },
    ecosystemTimeline: {
      sectionNum: "04",
      moduleLabel: "ПРЕСС-ФОРМА №02 // ХРОНИКА ЭКОСИСТЕМЫ (6 ЭТАПОВ)",
      title: "Пройденный путь",
      titleEmphasis: "",
      subtitle:
        "Последовательная хронология от старта упаковочного производства в 2005 году и регистрации ООО «VISAGE ELECTRIC» до экспортных направлений, совета UZBIC и публичных инициатив 2025–2026 годов.",
      filterAriaLabel: "Фильтр по роли и статусу",
      filters: {
        all: "Все этапы (6)",
        personal: "Личный опыт и основание (2)",
        partner: "Соучредительство и партнерство (2)",
        council: "Совет и публичные инициативы (2)",
      },
      legend: {
        ariaLabel: "Классификация ролей",
        personal: "Упаковочное производство (2005)",
        founding: "VISAGE ELECTRIC (2008), игрушки (2009) и экспорт (2010–2012)",
        partner: "Промышленное соучредительство и HoReCa",
        council: "UZBIC и публичная повестка 2025–2026",
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
          tag: "Первый производственный опыт",
          period: "2005",
          stageNumber: "01",
          title: "Запуск упаковочного производства",
          summary:
            "Согласно интервью Spot.uz (2022), в 2005 году было запущено первое предприятие — производство полиэтиленовых пакетов с последующим опытом поставок в Казахстан.",
          role: "Личная предпринимательская и производственная практика",
          source: "Spot.uz (интервью от 17 ноября 2022 г.)",
          verificationNote:
            "Подтверждено прямой цитатой в Spot.uz о старте упаковочного бизнеса в 2005 году.",
          milestone: "Старт собственного производства упаковки",
          focus: "Производство упаковки",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Регистрация, игрушки и экспорт",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "ООО «VISAGE ELECTRIC» (2008), игрушки (2009) и этапы экспорта (2010–2012)",
          summary:
            "В 2008 г. зарегистрировано ООО «VISAGE ELECTRIC», в 2009 г. начато развитие производства игрушек, в 2010 г. запущен экспорт игрушек, а в 2012 г. к экспорту добавлены электротовары.",
          role: "Основатель и Соучредитель",
          source: "Orginfo.uz (ООО «VISAGE ELECTRIC»), Spot.uz (17.11.2022), Spielwarenmesse.de",
          verificationNote:
            "Каждая веха (2008 регистрация, 2009 игрушки, 2010 экспорт, 2012 электроника) представлена раздельно.",
          milestone: "2008 регистрация -> 2009 игрушки -> 2010 экспорт -> 2012 электроника",
          focus: "Полимерная индустрия и экспорт",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Промышленное соучредительство",
          period: "С 2015 года",
          stageNumber: "03",
          title: "Промышленное направление Samtech Masterbatches",
          summary:
            "На принципах промышленного партнерства запущено направление полимерных красителей и модификаторов Samtech Masterbatches.",
          role: "Соучредитель / Партнер (ожидает подтверждения)",
          source: "Материалы открытых каналов (ожидает подтверждения реестра)",
          verificationNote:
            "Указано как партнерский проект, а не единоличная собственность; юридические детали требуют подтверждения.",
          milestone: "B2B-кооперация в полимерном сырье",
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
            "В 2017 году открылся первый ресторан AFIYET Kebab, в 2020 году заработала точка PURO Gelateria на стандартах техкарт. Юридический статус упоминаемой с 2019 г. IT-инициативы ожидает подтверждения.",
          role: "Основатель и партнер (AFIYET), партнер (PURO); IT Support & Service — ожидает подтверждения",
          source: "Официальное интервью Spot.uz (2020); IT Support & Service — не подтверждено",
          verificationNote:
            "AFIYET (2017) и PURO (2020) подтверждены Spot.uz; юридическая структура IT Support & Service и текущая роль Анвара Абдукаюма не подтверждены независимыми источниками.",
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
            "UZBIC является независимой негосударственной общественной платформой и не выступает частной собственностью.",
          milestone: "Развитие B2B экспортной кооперации на базе совета",
          focus: "Промышленная дипломатия и экспорт",
        },
        {
          id: "public-education-2025-2026",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Публичные инициативы и обучение",
          period: "2025 — 2026",
          stageNumber: "06",
          title: "Лекция «Avtopilot», обучение малому бизнесу и презентации «Bochka Resort»",
          summary:
            "В 2025–2026 гг. на YouTube вышли 8-шаговая лекция «Avtopilot», образовательные видео под идентичностью канала «MICROBIZNES», интервью Inter Nation и публичные видеопрезентации «Bochka Resort».",
          role: "Спикер, автор образовательных видео и публичных презентаций",
          source: "YouTube — Anvar Abduqayum (2026), Inter Nation (2026-01-16)",
          verificationNote:
            "Подтверждены исключительно открытые публикации на YouTube; платные курсы, статус девелопера или гарантии доходности по Bochka Resort не заявляются.",
          milestone: "Открытые лекции по систематизации и презентации новых проектов",
          focus: "Образовательный контент и публичность",
        },
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
      ctaButton: "Collaboration Info",
      consulting: "Services",
      bookingCta: "Collaboration Info",
    },
    hero: {
      moduleLabel: "MOLD №00 // MASTER MATRIX",
      statusBadge: "MANUFACTURING & EXPORT ECOSYSTEM",
      dimensionSpec: "SPEC: ISO / GLOBAL STD 2026 // SER: 01-AA",
      headlinePrefix: "",
      headlineEmphasis: "Owner-independent",
      headlineSuffix: " systems and industrial-grade management.",
      summary:
        "Anvar Abduqayum is founder and co-founder of Toybola Toys (manufactured via VISAGE ELECTRIC LLC), co-founder of the Samtech Masterbatches industrial venture, partner in HoReCa chains, and Chair of the independent UZBIC public council. This independent editorial concept documents his manufacturing track record, public lectures, and business ecosystem.",
      ctaPrimary: "Collaboration Info",
      ctaSecondary: "Business Ecosystem",
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
          value: "2005 — 2012",
          label: "Packaging production (2005), VISAGE ELECTRIC (2008), toys (2009) & export (2010/2012)",
        },
        {
          value: "2015 — 2022",
          label: "Samtech, HoReCa ventures & UZBIC public council",
        },
        {
          value: "6 initiatives",
          label: "Toybola (VISAGE ELECTRIC), Samtech, 2 HoReCa, internal IT & UZBIC",
        },
      ],
      portraitRole: "Industrialist, Engineer-Entrepreneur",
      // Internal tracking note: Temporary archival portrait cropped cleanly without AI modification pending studio photography.
      brands: [
        "TOYBOLA · VISAGE ELECTRIC",
        "SAMTECH MASTERBATCHES",
        "PURO GELATERIA",
        "AFIYET KEBAB",
        "UZBIC COUNCIL",
        "IT SUPPORT",
      ],
    },
        dossier: {
      sectionNum: "07",
      tablistAriaLabel: "B2B collaboration tracks",
      eyebrow: "B2B COLLABORATION TRACKS",
      title: "4 illustrative directions for prospective B2B dialogue & collaboration",
      subtitle:
        "Overview of key areas of dialogue across industrial cooperation, export partnerships, business knowledge, and media inquiries.",
      disclaimer:
        "This independent concept does not represent an official commercial service offering.",
      labels: {
        programSpec: "DIRECTION SPEC",
        format: "Dialogue format",
        audience: "Audience",
        overview: "Overview",
        focusAreas: "Key focus areas",
        ctaText: "Collaboration Info",
      },
      services: [
        {
          id: "industrial-cooperation",
          code: "Direction 01 // Industry",
          name: "Industrial Cooperation",
          shortSummary:
            "B2B dialogue covering manufacturing supply chains, local tooling, and plant management practice.",
          audience:
            "Domestic manufacturers, industrial plants, and polymer/supply-chain partners",
          overview:
            "Collaboration track grounded in manufacturing operations experience, SOP workflows, and shared industrial partnerships.",
          focusAreas: [
            "Manufacturing localization and B2B industrial supply-chain cooperation",
            "Peer exchange around Standard Operating Procedures (SOP) and quality control",
            "Operational continuity and plant governance discussions",
          ],
          format: "Industrial peer exchange & SOP",
          ctaText: "Collaboration Info",
        },
        {
          id: "export-partnerships",
          code: "Direction 02 // Export",
          name: "Export Partnerships",
          shortSummary:
            "International market-entry topics and B2B cooperation within the public UZBIC framework.",
          audience:
            "Industrial enterprises preparing exports or expanding regional trade",
          overview:
            "Dialogue track informed by documented 2010–2012 export expansion and public-council initiatives under UZBIC.",
          focusAreas: [
            "Compliance pathways and product adaptation for international trade",
            "CIS and regional B2B buyer/distributor connections",
            "Cross-industry export cooperation on the UZBIC public platform",
          ],
          format: "Public-council context // UZBIC",
          ctaText: "Collaboration Info",
        },
        {
          id: "knowledge-education",
          code: "Direction 03 // Knowledge & Education",
          name: "Business Knowledge & Education",
          shortSummary:
            "Public lectures, small-business educational videos, and systemic management discussions.",
          audience:
            "Entrepreneurs and forum organizers exploring owner-independent management practices",
          overview:
            "Educational dialogue reflecting public topics covered in the 8-step “Avtopilot” YouTube lecture and small-business video releases.",
          focusAreas: [
            "Public keynote lectures and entrepreneurial forum appearances",
            "Case discussions around The Mold (“Qolip”) management framework",
            "Note: no paid courses or commercial academy programs are offered",
          ],
          format: "Public educational format",
          ctaText: "Collaboration Info",
        },
        {
          id: "media-speaking",
          code: "Direction 04 // Media & Speaking",
          name: "Media & Speaking Inquiries",
          shortSummary:
            "Illustrative inquiry workflow for press interviews, podcasts, and business conference panels.",
          audience:
            "Editorial teams, business media channels, and conference organizers",
          overview:
            "Inquiry track for press interviews and public forums (SUBYEKTIV, Inter Nation, Spot.uz, Kun.uz).",
          focusAreas: [
            "Media interviews focused on manufacturing, exports, and operations",
            "Panel participation at industry and entrepreneurship forums",
            "Direct scheduling activates only upon official authorization",
          ],
          format: "Media inquiry format",
          ctaText: "Collaboration Info",
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
        "Transparent separation of roles and legal standing across polymer toy manufacturing, HoReCa ventures, internal IT infrastructure, and the independent public council (UZBIC).",
      moldLegend: "INDUSTRIAL ECOSYSTEM // 6 DIRECTIONS",
      taxonomy: {
        ariaLabel: "Role taxonomy",
        founder: "Founder / Co-founder (Toybola · VISAGE ELECTRIC, Afiyet)",
        partner: "Industrial Co-founding & Partnerships (Samtech, Puro)",
        internal: "Internal IT Initiative (not a standalone corporation)",
        public: "Independent Public Council (UZBIC, not private equity)",
        historical: "Historical milestone (2005–2012: packaging, VISAGE ELECTRIC, toys & export)",
        pending: "Legal & operational details pending client confirmation",
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
        all: "All (6)",
        mfg: "Manufacturing (2)",
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
        legalMilestones: "Historical & legal milestones (distinct dates)",
        pendingBadge: "Pending confirmation",
        verifiedBadge: "Source-verified",
        publicBadge: "Public platform",
        pendingNotice:
          "Notice: the legal structure and Anvar Abduqayum’s current formal role for this record have not been independently verified; it is not presented as a confirmed owned business.",
      },
      companies: [
        {
          id: "toybola",
          name: "Toybola Toys (VISAGE ELECTRIC LLC)",
          code: "01: Polymer Toy Manufacturing",
          category: "mfg",
          gridSpan: "major",
          roleType: "is-founder",
          verificationStatus: "verified",
          roleBadge: "Founder & Co-founder",
          monogram: "TB",
          badge: "MANUFACTURING // PLANT",
          year: "2008 / 2009–2012",
          activity: "Children’s Polymer Toy Manufacturing & Export",
          desc: "Production of children’s plastic toys under the Toybola trademark is linked to VISAGE ELECTRIC LLC (registered in 2008); toy manufacturing began in 2009, toy exports started in 2010, and electronics products were added to exports in 2012.",
          fullDesc: "Public corporate registries (Orginfo.uz, TIN 300821924) record VISAGE ELECTRIC LLC registered on April 30, 2008 (director: Abdukayumov Baxtiyor Gayratovich; equity shares are not publicly disclosed). Dated interviews in Spot.uz (2022-11-17) and Kun.uz state that toy manufacturing began in 2009, toy exports in 2010, and electronics exports in 2012. Corporate registration is not treated as standalone proof of sole current ownership, and all dates are kept distinct.",
          role: "Founder & Co-founder",
          period: "2008 (VISAGE ELECTRIC LLC) / 2009 (Toys) / 2010–2012 (Export)",
          legalMilestones: [
            { year: "2008", label: "VISAGE ELECTRIC LLC legal registration (Orginfo.uz, TIN 300821924)" },
            { year: "2009", label: "Toy manufacturing business development began (Spot.uz)" },
            { year: "2010", label: "Toy export activities began (Spot.uz)" },
            { year: "2012", label: "Electronics products added to export activities (Spot.uz)" },
          ],
          sector: "Polymer Manufacturing & Children’s Toys",
          model: "SOP Protocols & Executive Board",
          categoryBadge: "Industry & Toys",
          tags: ["Injection Molding", "VISAGE ELECTRIC LLC", "CIS Export"],
          status: "Verified operating manufacturing facility",
          source: "Orginfo.uz (VISAGE ELECTRIC LLC), Spielwarenmesse.de, Gazeta.uz (2020), Toybola.com",
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
          verificationStatus: "pending",
          roleBadge: "Co-founder / Industrial Partner (shared equity)",
          monogram: "SM",
          badge: "MANUFACTURING // CHEMICAL",
          year: "2015 (pending)",
          activity: "Polymer Raw Materials & Color Concentrates",
          desc: "Co-founded B2B industrial venture producing polymer additives and color masterbatches for domestic manufacturing lines.",
          fullDesc: "B2B chemical and polymer additives manufacturing venture structured as a co-founded industrial partnership rather than sole proprietorship (current legal status pending confirmation).",
          role: "Co-founder / Industrial Partner (shared equity)",
          period: "2015 (pending confirmation)",
          sector: "Chemicals & Polymers",
          model: "B2B Supply & Partnership Governance",
          categoryBadge: "Chemical Facility",
          tags: ["Chemical Industry", "Masterbatch", "B2B Supply"],
          status: "Co-founded industrial venture (pending registry confirmation)",
          source: "Industrial Cooperation Records (pending confirmation)",
          hasLogo: false,
          assetLabel: "[Partner-based manufacturing venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "afiyet",
          name: "AFIYET Kebab",
          code: "03: HoReCa Dining",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-founder",
          verificationStatus: "historical",
          roleBadge: "Founder (historical stage)",
          monogram: "AF",
          badge: "HORECA // HISTORICAL",
          year: "2017 (historical)",
          activity: "Turkish Dining Restaurant Chain",
          desc: "Hospitality network structured around standardized kitchen recipes and service protocols. First branch opened in 2017; ongoing ownership is not claimed.",
          fullDesc: "Spot.uz (2020 / 2022) interview archives document that the first Afiyet restaurant launched in 2017. Subsequent public video interviews discuss restaurant-sector partnership challenges; current ownership is unconfirmed in public registries and is not claimed.",
          role: "Founder & Partner (historical involvement)",
          period: "Opened in 2017 (current ownership unconfirmed)",
          sector: "HoReCa & Food Service",
          model: "Standardized Kitchen Protocols",
          categoryBadge: "Food Service",
          tags: ["Recipe SOPs", "Fast-Casual", "Historical Stage"],
          status: "Historical founding (current ownership unconfirmed)",
          source: "Spot.uz Interview Records (2020 / 2022); current ownership unconfirmed",
          hasLogo: true,
          logoUrl: "/images/partners/afiyet.webp",
          assetLabel: "[Historical HoReCa venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "puro",
          name: "PURO Gelateria",
          code: "04: HoReCa Cafe",
          category: "horeca",
          gridSpan: "standard",
          roleType: "is-partner",
          verificationStatus: "historical",
          roleBadge: "Partner (historical stage)",
          monogram: "PR",
          badge: "HORECA // HISTORICAL",
          year: "2020 (historical)",
          activity: "Italian Gelato & Artisan Cafe Network",
          desc: "Gelato and cafe chain structured around cold-chain logistics and Italian recipes, opening its first location in 2020; ongoing ownership is not claimed.",
          fullDesc: "Documented in the 2020 Spot.uz interview, the first Puro Gelateria opened in 2020. Because current equity ownership or exit dates are not confirmed in public registries, this record is classified as a historical partnership stage.",
          role: "Partner & Co-initiator (historical involvement)",
          period: "Opened in 2020 (current ownership unconfirmed)",
          sector: "HoReCa & Confectionery",
          model: "Cold-Chain Supply Partnership",
          categoryBadge: "Cafe & Dessert",
          tags: ["Cold Chain", "Gelato Recipes", "Historical Stage"],
          status: "Historical partnership (current ownership unconfirmed)",
          source: "Spot.uz Interview Record (2020); current ownership unconfirmed",
          hasLogo: true,
          logoUrl: "/images/partners/puro.webp",
          assetLabel: "[Historical cafe venture]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "it-support",
          name: "IT Support & Service",
          code: "05: Internal IT Infrastructure (pending confirmation)",
          category: "service",
          gridSpan: "strategic",
          roleType: "is-internal",
          verificationStatus: "pending",
          roleBadge: "Pending Confirmation (not a confirmed firm)",
          monogram: "IT",
          badge: "B2B SERVICE // PENDING CONFIRMATION",
          year: "2019 (pending)",
          activity: "Internal ERP & Operational Reporting Digitization",
          desc: "Internal IT infrastructure initiative associated with process automation; its legal structure and Anvar Abduqayum’s current role have not been independently confirmed.",
          fullDesc: "An internal operational technology initiative referenced in group workflows. Because its formal legal structure and Anvar Abduqayum’s current formal role have not been independently verified, it is not presented as a verified company owned by Anvar Abduqayum.",
          role: "Pending client confirmation (no ownership claimed)",
          period: "2019 (legal details pending confirmation)",
          sector: "Internal IT Infrastructure",
          model: "Internal ERP & Process Automation",
          categoryBadge: "Internal IT // Pending Confirmation",
          tags: ["Internal ERP", "Inventory Tracking", "Pending Confirmation"],
          status: "Legal structure & current role pending confirmation",
          source: "Client-confirmation list (no independent registry confirmation)",
          hasLogo: false,
          assetLabel: "[Internal digitalization initiative]",
          websiteUrl: null,
          externalUrl: "#",
        },
        {
          id: "uzbic",
          name: "Uzbekistan Business and Industrial Council (UZBIC)",
          code: "06: Independent Public Council",
          category: "council",
          gridSpan: "strategic",
          roleType: "is-public",
          verificationStatus: "public",
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
        personal: "Packaging manufacturing (2005)",
        founding: "VISAGE ELECTRIC (2008), toys (2009) & exports (2010–2012)",
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
          tag: "First manufacturing venture",
          period: "2005",
          stageNumber: "01",
          title: "Packaging manufacturing business launched",
          summary:
            "As documented in the Spot.uz interview, Anvar Abduqayum launched his first business in 2005 producing polyethylene packaging bags, building practical feedstock sourcing and export experience toward Kazakhstan.",
          role: "Personal entrepreneurial & manufacturing practice",
          source: "Spot.uz (November 17, 2022 interview)",
          verificationNote:
            "Confirmed verbatim in Spot.uz (2022-11-17) as starting his first packaging business in 2005; as packaging margins compressed to 5% by 2008, he transitioned toward new industrial lines.",
          milestone: "First local packaging manufacturing operation & supply chains",
          focus: "Packaging manufacturing",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Registration, toys & export",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "VISAGE ELECTRIC LLC (2008), toy production (2009) & export milestones (2010–2012)",
          summary:
            "VISAGE ELECTRIC LLC was legally registered on April 30, 2008. Toy manufacturing development followed in 2009, toy exports started in 2010, and electronics products were added to export shipments in 2012.",
          role: "Founder & Co-founder",
          source: "Orginfo.uz (VISAGE ELECTRIC LLC), Spot.uz (2022-11-17), Spielwarenmesse.de",
          verificationNote:
            "Legal registration (2008), toy manufacturing start (2009), toy exports (2010), and electronics exports (2012) are separated strictly rather than merged into one single founding year.",
          milestone: "2008 registration -> 2009 toys -> 2010 toy exports -> 2012 electronics exports",
          focus: "Polymer molding & export growth",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Co-founder industrial ventures",
          period: "Since 2015",
          stageNumber: "03",
          title: "Samtech Masterbatches polymer additives initiative",
          summary:
            "Entered upstream polymer color concentrates and additives via Samtech Masterbatches through an industrial partnership model.",
          role: "Co-founder / Partner (pending confirmation)",
          source: "Public channel records (pending registry confirmation)",
          verificationNote:
            "Positioned as a shared-equity industrial partnership rather than sole proprietorship; formal legal registry details and operating scale remain pending client confirmation.",
          milestone: "B2B industrial partnership in polymer feedstock",
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
        title: "Meeting & collaboration protocol",
        lead: "Direct scheduling and administrative coordination are handled through official verified channels.",
        specs: [
          { label: "Coordination status", value: "Official channels verified" },
          { label: "Focus areas", value: "Systematization and strategic partnership" },
          { label: "Public links", value: "Verified public channels only" },
        ],
        cardTitle: "Collaboration protocol",
        cardDescription: "Review verified collaboration guidelines and official communication channels.",
        routeLabel: "Protocol page:",
        primaryCta: "Collaboration Info",
        telegramCta: "Collaboration Info",
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
      telegramLabel: "Contact & Collaboration",
      callLabel: "Call",
    },
    footer: {
      founderName: "Anvar Abduqayum",
      tagline: "Systematic entrepreneurship, industrial manufacturing, and executive practice.",
      bookingCta: "Collaboration Info",
      navHeading: "Editorial index",
      contactHeading: "Official channels",
      platformsHeading: "Public media",
      bookingLinkLabel: "Collaboration Info",
      colophonNote: "© 2026 Anvar Abduqayum. Manufacturing & governance ecosystem.",
      backToTop: "Back to top",
      indexLinks: [
        { code: "01", anchor: "#hero", label: "Home" },
        { code: "02", anchor: "#portfel", label: "Business portfolio" },
        { code: "03", anchor: "#yol", label: "Entrepreneurial journey" },
        { code: "04", anchor: "#tashabbuslar", label: "Current initiatives" },
        { code: "05", anchor: "#tamoyil", label: "Qolip philosophy" },
        { code: "06", anchor: "#media", label: "Knowledge & media" },
        { code: "07", anchor: "#xizmatlar", label: "B2B concept" },
        { code: "08", anchor: "#aloqa", label: "Official contact" },
      ],
    },
    initiatives: {
      sectionNum: "07",
      eyebrow: "CURRENT INITIATIVES & EDUCATION (2025–2026)",
      title: "Public Lectures, Small-Business Education & Project Presentations",
      subtitle:
        "Verified 2025–2026 public educational releases and project presentations documented on the official YouTube channel and public interviews.",
      disclaimer:
        "Factual notice: items reflect verified public broadcasts and presentations only; unconfirmed paid courses, commercial academies, or ownership rights are not claimed.",
      statusLabels: {
        verified_educational: "Verified educational video",
        pending_confirmation: "Public education // Pending confirmation",
        public_presentation: "Public presentation only",
      },
      items: [
        {
          id: "avtopilot",
          tag: "PUBLIC YOUTUBE LECTURE",
          status: "verified_educational",
          title: "“Avtopilot” — 8-Step Business Systematization Lecture",
          period: "May 2026",
          summary:
            "A 57-minute public YouTube lecture outlining an 8-step operational framework for transitioning businesses from constant owner oversight toward repeatable management protocols.",
          caveat:
            "Represents the verified public 8-step YouTube lecture only; does not claim an officially confirmed paid course.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-05-17)",
          sourceUrl: "https://www.youtube.com/watch?v=ZiWr2ND4LSo",
        },
        {
          id: "microbiznes",
          tag: "SMALL-BUSINESS EDUCATION",
          status: "pending_confirmation",
          title: "Small-Business Educational Videos & “MICROBIZNES” Channel Identity",
          period: "2026",
          summary:
            "Public educational video series for small and mid-sized business owners covering production discipline, staffing, financial controls, and systematic operations.",
          caveat:
            "“MICROBIZNES” is referenced as a publicly used channel identity, not as a confirmed standalone commercial academy or paid program.",
          sourceLabel: "YouTube — @AnvarAbduqayum Channel (2026)",
          sourceUrl: "https://www.youtube.com/watch?v=qHAo5gJmjaE",
        },
        {
          id: "bochka-resort",
          tag: "PUBLIC PROJECT PRESENTATION",
          status: "public_presentation",
          title: "“Bochka Resort” — Public Video Presentations",
          period: "June–July 2026",
          summary:
            "Publicly documented 2026 YouTube videos presenting hospitality resort concepts and recorded investor-meeting discussions.",
          caveat:
            "Represents verified public videos and presentations only; does not claim sole ownership, developer status, guaranteed returns, or formal investment terms.",
          sourceLabel: "YouTube — Anvar Abduqayum (2026-07-16)",
          sourceUrl: "https://www.youtube.com/watch?v=oKbTo0WxdGU",
        },
      ],
    },
    knowledgeMedia: {
      heading: "Business Knowledge & Verified YouTube Catalog",
      submeta: "12 verified videos // initially highlighting 6 curated releases",
      ariaLabel: "Filter videos by topic",
      showAllLabel: "Show all 12 verified videos",
      showCuratedLabel: "Show 6 curated highlights only",
      watchLabel: "Watch in player",
      extLabel: "Open on YouTube",
      filters: {
        all: "Curated / All",
        systemization: "Business Systemization",
        manufacturing: "Manufacturing",
        export: "Export",
        entrepreneurship: "Entrepreneurship",
        interviews: "Interviews",
        investment: "Investment Discussions",
      },
      statusLabels: {
        verified: "Verified primary video",
        curated: "Curated selection",
      },
    },
    collaborationConcept: {
      eyebrow: "B2B COLLABORATION TRACKS",
      title: "Prospective Executive Dialogue & B2B Collaboration Tracks",
      subtitle:
        "Overview of potential B2B collaboration directions across manufacturing, exports, and public platform initiatives.",
      demoDisclaimer:
        "All partnership proposals and media inquiries are reviewed through official verified channels.",
      tracks: [
        {
          id: "industrial-exchange",
          code: "Track 01 // Manufacturing Practice",
          title: "Manufacturing Systems & SOP Exchange",
          shortSummary: "B2B peer dialogue on plant workflows, quality control, and operational standardization.",
          audience: "Domestic manufacturers and plant executives",
          overview: "General knowledge exchange around documenting factory workflows and reducing daily owner dependency.",
          scopePoints: [
            "Shift and floor SOP examples from polymer manufacturing",
            "Delegation structures and accountability reviews",
          ],
          note: "Operational exchange and workflow SOPs",
        },
        {
          id: "export-uzbic-dialogue",
          code: "Track 02 // Export Cooperation",
          title: "UZBIC B2B Export Dialogue",
          shortSummary: "Public council context regarding export readiness and inter-enterprise cooperation.",
          audience: "Export-oriented industrial enterprises",
          overview: "Discussion topics raised within the independent Uzbekistan Business and Industrial Council (UZBIC) regarding cross-border trade.",
          scopePoints: [
            "International compliance and certification pathways",
            "B2B export consortium coordination",
          ],
          note: "Public council context: no commercial guarantees",
        },
      ],
    },
    ecosystemTimeline: {
      sectionNum: "04",
      moduleLabel: "MOLD №02 // ECOSYSTEM CHRONOLOGY (6 STAGES)",
      title: "Track Record",
      titleEmphasis: "",
      subtitle:
        "Chronological distinction from 2005 packaging production and VISAGE ELECTRIC LLC registration through toy exports, shared industrial ventures, UZBIC, and 2025–2026 public education.",
      filterAriaLabel: "Filter milestones by role",
      filters: {
        all: "All Milestones (6)",
        personal: "Personal Practice & Founding (2)",
        partner: "Co-founder & Partnerships (2)",
        council: "Public Council & Education (2)",
      },
      legend: {
        ariaLabel: "Role attribution taxonomy",
        personal: "Packaging manufacturing (2005)",
        founding: "VISAGE ELECTRIC (2008), toys (2009) & exports (2010–2012)",
        partner: "Co-founder & HoReCa partnerships",
        council: "UZBIC & 2025–2026 public initiatives",
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
          tag: "First manufacturing venture",
          period: "2005",
          stageNumber: "01",
          title: "Packaging manufacturing business launched",
          summary:
            "As documented in Spot.uz (2022), Anvar Abduqayum launched his first business in 2005 manufacturing polyethylene bags and gaining cross-border supply experience into Kazakhstan.",
          role: "Personal entrepreneurial & manufacturing practice",
          source: "Spot.uz (November 17, 2022 interview)",
          verificationNote:
            "Supported directly by Spot.uz quote confirming packaging manufacturing started in 2005.",
          milestone: "First local packaging facility and supply chains",
          focus: "Packaging manufacturing",
        },
        {
          id: "toybola-founding",
          filterCat: "personal",
          tagClass: "tag-founding",
          tag: "Registration, toys & export",
          period: "2008 — 2012",
          stageNumber: "02",
          title: "VISAGE ELECTRIC LLC (2008), toy production (2009) & export stages (2010–2012)",
          summary:
            "VISAGE ELECTRIC LLC was registered in 2008; toy production began in 2009, toy exports started in 2010, and electronics products were added to exports in 2012.",
          role: "Founder & Co-founder",
          source: "Orginfo.uz (VISAGE ELECTRIC LLC), Spot.uz (2022-11-17), Spielwarenmesse.de",
          verificationNote:
            "Legal registration (2008), toy manufacturing (2009), toy export (2010), and electronics export (2012) are maintained as distinct milestones.",
          milestone: "2008 registration -> 2009 toys -> 2010 export -> 2012 electronics",
          focus: "Polymer molding & export growth",
        },
        {
          id: "industrial-cofound",
          filterCat: "partner",
          tagClass: "tag-partner",
          tag: "Co-founder industrial ventures",
          period: "Since 2015",
          stageNumber: "03",
          title: "Samtech Masterbatches polymer additives initiative",
          summary:
            "Entered upstream polymer color concentrates and additives via Samtech Masterbatches through an industrial partnership model.",
          role: "Co-founder / Partner (pending confirmation)",
          source: "Public channel records (pending registry confirmation)",
          verificationNote:
            "Positioned as a shared-equity industrial partnership rather than sole proprietorship; formal registry confirmation pending.",
          milestone: "B2B industrial partnership in polymer feedstock",
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
            "Applied kitchen SOPs to hospitality with AFIYET Kebab launching in 2017 and PURO Gelateria in 2020; the legal structure and role for the 2019 IT Support & Service initiative remain pending independent confirmation.",
          role: "Founder/Partner (AFIYET), Partner (PURO); IT Support & Service — pending confirmation",
          source: "Spot.uz Interview Archive (2020); IT Support & Service unconfirmed",
          verificationNote:
            "AFIYET (2017) and PURO (2020) are verified via Spot.uz; the legal structure and Anvar Abduqayum’s current role in IT Support & Service have not been independently confirmed.",
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
            "Since 2022, chairs the independent Uzbekistan Business and Industrial Council (UZBIC), facilitating B2B cooperation among domestic manufacturers.",
          role: "Council Chair (public capacity, not private commercial ownership)",
          source: "Official uzbic.uz portal & Kun.uz reporting",
          verificationNote:
            "UZBIC is a non-governmental public council rather than private commercial equity.",
          milestone: "Institutional B2B export facilitation platform",
          focus: "Industrial diplomacy & export cooperation",
        },
        {
          id: "public-education-2025-2026",
          filterCat: "council",
          tagClass: "tag-council",
          tag: "Public initiatives & education",
          period: "2025 — 2026",
          stageNumber: "06",
          title: "“Avtopilot” Lecture, Small-Business Education & “Bochka Resort” Presentations",
          summary:
            "In 2025–2026, released the public 8-step “Avtopilot” lecture, small-business educational videos under the “MICROBIZNES” channel identity, public interviews, and “Bochka Resort” video presentations.",
          role: "Speaker, educational creator & public project presenter",
          source: "YouTube — Anvar Abduqayum (2026), Inter Nation (2026-01-16)",
          verificationNote:
            "Reflects verified public YouTube releases only; excludes unconfirmed paid programs or ownership/ROI claims for Bochka Resort.",
          milestone: "Public business systematization education & project presentations",
          focus: "Education & public discourse",
        },
      ],
    },
  },
};

export function getContent(locale: string = "uz"): LocaleContent {
  if (locale === "ru") return siteContent.ru;
  if (locale === "en") return siteContent.en;
  return siteContent.uz;
}

export {
  VERIFIED_YOUTUBE_MANIFEST,
  type MediaTopicCategory,
  type MediaVerificationStatus,
  type VerifiedVideoItem,
} from "./mediaManifest";

