export interface QuizOption {
  text: {
    uz: string;
    ru: string;
    en: string;
  };
  shortText: {
    uz: string;
    ru: string;
    en: string;
  };
  points: 0 | 1 | 2 | 3;
}

export interface QuizQuestion {
  id: number;
  order: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  options: QuizOption[];
}

export interface QuizTier {
  id: "dependent" | "partial" | "systemic";
  minScore: number;
  maxScore: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  recommendation: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    order: 1,
    title: {
      uz: "Siz 2 haftaga ta'tilga chiqsangiz, kompaniya qanday ishlaydi?",
      ru: "Как будет работать компания, если вы уедете в отпуск на 2 недели?",
      en: "How will your business operate if you take a 2-week vacation?",
    },
    options: [
      {
        text: {
          uz: "Hamma narsa to'xtaydi",
          ru: "Всё остановится",
          en: "Everything grinds to a halt",
        },
        shortText: {
          uz: "Hamma narsa to'xtaydi",
          ru: "Всё остановится",
          en: "Everything stops",
        },
        points: 0,
      },
      {
        text: {
          uz: "Faqat oddiy ishlar ketadi, qarorlar kutadi",
          ru: "Идут только рутинные дела, решения ждут возвращения",
          en: "Only basic routine continues, decisions are stalled",
        },
        shortText: {
          uz: "Faqat oddiy ishlar, qarorlar kutadi",
          ru: "Только рутина, решения ждут",
          en: "Basic routine, decisions wait",
        },
        points: 1,
      },
      {
        text: {
          uz: "Ko'p narsa ishlaydi, ba'zi masalalarda qo'ng'iroq qilishadi",
          ru: "Большинство процессов работает, но звонят по ряду вопросов",
          en: "Most processes work, but they still call for key issues",
        },
        shortText: {
          uz: "Ko'p narsa ishlaydi, qo'ng'iroq qilishadi",
          ru: "Работает с редкими звонками",
          en: "Works, occasional calls",
        },
        points: 2,
      },
      {
        text: {
          uz: "To'liq ishlaydi, hisobotni kelib ko'raman",
          ru: "Работает автономно, результаты смотрю по отчетам",
          en: "Fully autonomous, I review consolidated reports upon return",
        },
        shortText: {
          uz: "To'liq ishlaydi, hisobot ko'raman",
          ru: "Полностью автономно",
          en: "Fully autonomous",
        },
        points: 3,
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: {
      uz: "Har bir lavozim uchun yozma vazifalar va reglamentlar bormi?",
      ru: "Есть ли письменные регламенты и должностные инструкции для каждой позиции?",
      en: "Are there written job responsibilities and regulations for every role?",
    },
    options: [
      {
        text: {
          uz: "Yo'q",
          ru: "Нет",
          en: "No",
        },
        shortText: {
          uz: "Yo'q",
          ru: "Нет",
          en: "No",
        },
        points: 0,
      },
      {
        text: {
          uz: "Og'zaki kelishuvlar",
          ru: "Устные договоренности",
          en: "Verbal agreements only",
        },
        shortText: {
          uz: "Og'zaki kelishuvlar",
          ru: "Устные договоренности",
          en: "Verbal agreements",
        },
        points: 1,
      },
      {
        text: {
          uz: "Ba'zi bo'limlarda bor",
          ru: "Есть в отдельных отделах",
          en: "Present in some departments",
        },
        shortText: {
          uz: "Ba'zi bo'limlarda bor",
          ru: "В некоторых отделах",
          en: "Some departments",
        },
        points: 2,
      },
      {
        text: {
          uz: "Hamma lavozim uchun bor va ishlaydi",
          ru: "Есть для всех должностей и строго соблюдаются",
          en: "Documented and actively adhered to across all roles",
        },
        shortText: {
          uz: "Hamma lavozim uchun bor va ishlaydi",
          ru: "Для всех ролей и соблюдается",
          en: "All roles, actively used",
        },
        points: 3,
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: {
      uz: "Xodimlar samaradorligi qanday o'lchanadi?",
      ru: "Как измеряется личная эффективность сотрудников?",
      en: "How is employee performance and efficiency measured?",
    },
    options: [
      {
        text: {
          uz: "O'lchanmaydi",
          ru: "Никак не измеряется",
          en: "Not measured",
        },
        shortText: {
          uz: "O'lchanmaydi",
          ru: "Не измеряется",
          en: "Not measured",
        },
        points: 0,
      },
      {
        text: {
          uz: "Taxminan, his bo'yicha",
          ru: "Приблизительно, по ощущениям",
          en: "Subjectively, by gut feeling",
        },
        shortText: {
          uz: "Taxminan, his bo'yicha",
          ru: "По ощущениям",
          en: "Gut feeling",
        },
        points: 1,
      },
      {
        text: {
          uz: "Ba'zi bo'limlarda KPI bor",
          ru: "В ключевых отделах есть KPI",
          en: "KPIs exist in key departments",
        },
        shortText: {
          uz: "Ba'zi bo'limlarda KPI bor",
          ru: "В части отделов KPI",
          en: "Some department KPIs",
        },
        points: 2,
      },
      {
        text: {
          uz: "Hamma uchun KPI va bonus tizimi bor",
          ru: "Для всех внедрена четкая система KPI и бонусов",
          en: "Clear KPI and metric-tied bonus system across the entire team",
        },
        shortText: {
          uz: "Hamma uchun KPI va bonus tizimi bor",
          ru: "KPI и прозрачные бонусы для всех",
          en: "Full KPI & bonus system",
        },
        points: 3,
      },
    ],
  },
  {
    id: 4,
    order: 4,
    title: {
      uz: "Sotuv bo'limi qanday ishlaydi?",
      ru: "Как выстроен отдел продаж?",
      en: "How is your sales department structured and managed?",
    },
    options: [
      {
        text: {
          uz: "Sotuvni asosan o'zim qilaman",
          ru: "Продажи веду в основном лично я",
          en: "I handle key sales primarily myself",
        },
        shortText: {
          uz: "Sotuvni o'zim qilaman",
          ru: "Продаю сам",
          en: "Self-driven sales",
        },
        points: 0,
      },
      {
        text: {
          uz: "Menejerlar bor, lekin nazorat yo'q",
          ru: "Менеджеры есть, но систематического контроля нет",
          en: "Managers exist, but systematic supervision is lacking",
        },
        shortText: {
          uz: "Menejerlar bor, nazorat yo'q",
          ru: "Менеджеры без контроля",
          en: "Staff without control",
        },
        points: 1,
      },
      {
        text: {
          uz: "Skript va hisobot bor",
          ru: "Есть скрипты и базовая отчетность",
          en: "Scripts and regular reporting are in place",
        },
        shortText: {
          uz: "Skript va hisobot bor",
          ru: "Скрипты и отчеты",
          en: "Scripts and reports",
        },
        points: 2,
      },
      {
        text: {
          uz: "Voronka, plan va tahlil tizimi bor",
          ru: "Воронка продаж, четкий план и сквозная аналитика",
          en: "CRM sales funnel, strict monthly targets, and end-to-end analytics",
        },
        shortText: {
          uz: "Voronka, plan va tahlil tizimi bor",
          ru: "Воронка, план и аналитика",
          en: "Funnel, quota & analytics",
        },
        points: 3,
      },
    ],
  },
  {
    id: 5,
    order: 5,
    title: {
      uz: "Moliyaviy hisobotni qanchalik tez va aniq ko'ra olasiz?",
      ru: "Насколько быстро и прозрачно вы видите финансовую отчетность?",
      en: "How quickly and accurately can you access company financials?",
    },
    options: [
      {
        text: {
          uz: "Aniq ko'rmayman",
          ru: "Четкой картины нет",
          en: "I do not have clear visibility",
        },
        shortText: {
          uz: "Aniq ko'rmayman",
          ru: "Нет прозрачности",
          en: "No clear visibility",
        },
        points: 0,
      },
      {
        text: {
          uz: "Oy oxirida taxminan",
          ru: "Приблизительно в конце месяца",
          en: "Rough estimate at month-end",
        },
        shortText: {
          uz: "Oy oxirida taxminan",
          ru: "Приблизительно в конце месяца",
          en: "Rough month-end estimate",
        },
        points: 1,
      },
      {
        text: {
          uz: "Haftalik hisobot bor",
          ru: "Получаю еженедельные сводки (P&L / Cashflow)",
          en: "Weekly consolidated reports (P&L / Cash flow)",
        },
        shortText: {
          uz: "Haftalik hisobot bor",
          ru: "Еженедельные отчеты",
          en: "Weekly reports",
        },
        points: 2,
      },
      {
        text: {
          uz: "Real vaqtda ko'raman va tahlil qilaman",
          ru: "Вижу цифры в реальном времени и провожу анализ",
          en: "Real-time managerial dashboard with predictive financial analysis",
        },
        shortText: {
          uz: "Real vaqtda ko'raman va tahlil qilaman",
          ru: "Дашборд в реальном времени",
          en: "Real-time dashboard",
        },
        points: 3,
      },
    ],
  },
  {
    id: 6,
    order: 6,
    title: {
      uz: "Yangi xodim qanday ishga tushadi?",
      ru: "Как проходит ввод нового сотрудника в должность (онбординг)?",
      en: "How are new employees onboarded and brought up to speed?",
    },
    options: [
      {
        text: {
          uz: "O'zi o'rganadi",
          ru: "Разбирается сам на ходу",
          en: "They figure things out on their own",
        },
        shortText: {
          uz: "O'zi o'rganadi",
          ru: "Учится сам",
          en: "Self-taught",
        },
        points: 0,
      },
      {
        text: {
          uz: "Kimdir bir-ikki kun ko'rsatadi",
          ru: "Коллега показывает работу пару дней",
          en: "A coworker shows the basics for a couple of days",
        },
        shortText: {
          uz: "Bir-ikki kun ko'rsatishadi",
          ru: "Пару дней стажировки",
          en: "Couple days shadowing",
        },
        points: 1,
      },
      {
        text: {
          uz: "Qisqa yo'riqnoma bor",
          ru: "Есть базовый регламент и вводная инструкция",
          en: "A starter guide and operational checklist exist",
        },
        shortText: {
          uz: "Qisqa yo'riqnoma bor",
          ru: "Есть краткая инструкция",
          en: "Starter handbook",
        },
        points: 2,
      },
      {
        text: {
          uz: "Onboarding dasturi va sinov muddati natijasi bor",
          ru: "Структурированная программа онбординга с четкими критериями аттестации",
          en: "Structured onboarding path with measurable probation milestones",
        },
        shortText: {
          uz: "Onboarding va sinov natijasi bor",
          ru: "Онбординг и аттестация",
          en: "Formal onboarding & testing",
        },
        points: 3,
      },
    ],
  },
  {
    id: 7,
    order: 7,
    title: {
      uz: "Majlislar va vazifa nazorati qanday?",
      ru: "Как контролируются поручения и проводятся координации?",
      en: "How are recurring meetings and task accountability conducted?",
    },
    options: [
      {
        text: {
          uz: "Tartib yo'q",
          ru: "Системного порядка нет",
          en: "No structured schedule",
        },
        shortText: {
          uz: "Tartib yo'q",
          ru: "Порядка нет",
          en: "No system",
        },
        points: 0,
      },
      {
        text: {
          uz: "Kerak bo'lganda yig'ilamiz",
          ru: "Собираемся ситуативно, по мере проблем",
          en: "Ad-hoc gatherings whenever an urgent issue arises",
        },
        shortText: {
          uz: "Kerak bo'lganda yig'ilamiz",
          ru: "По мере проблем",
          en: "Ad-hoc meetings",
        },
        points: 1,
      },
      {
        text: {
          uz: "Haftalik majlis bor",
          ru: "Регулярная еженедельная планерка",
          en: "Regular weekly coordination meetings",
        },
        shortText: {
          uz: "Haftalik majlis bor",
          ru: "Еженедельная планерка",
          en: "Weekly sync",
        },
        points: 2,
      },
      {
        text: {
          uz: "Vazifalar tizimda yuritiladi, natijalar kuzatiladi",
          ru: "Задачи ведутся в таск-менеджере, дедлайны и результаты оцифрованы",
          en: "Tasks tracked in digital system with strict SLAs and tracked outcomes",
        },
        shortText: {
          uz: "Vazifalar tizimda, natijalar kuzatiladi",
          ru: "Таск-трекер и контроль KPI",
          en: "Tracked in software with SLAs",
        },
        points: 3,
      },
    ],
  },
  {
    id: 8,
    order: 8,
    title: {
      uz: "Muhim qarorlarning necha foizini siz qabul qilasiz?",
      ru: "Какой процент операционных и важных решений замыкается лично на вас?",
      en: "What percentage of key operational decisions do you personally make?",
    },
    options: [
      {
        text: {
          uz: "Deyarli hammasini",
          ru: "Практически 100% решений",
          en: "Virtually 100% of decisions",
        },
        shortText: {
          uz: "Deyarli hammasini",
          ru: "Почти все",
          en: "Nearly all",
        },
        points: 0,
      },
      {
        text: {
          uz: "Ko'pchiligini",
          ru: "Большинство текущих вопросов",
          en: "The majority of daily questions",
        },
        shortText: {
          uz: "Ko'pchiligini",
          ru: "Большинство",
          en: "Majority",
        },
        points: 1,
      },
      {
        text: {
          uz: "Faqat strategik qarorlarni",
          ru: "В основном стратегические и крупные сделки",
          en: "Primarily strategic matters and major contracts",
        },
        shortText: {
          uz: "Faqat strategik qarorlarni",
          ru: "В основном стратегия",
          en: "Mainly strategic",
        },
        points: 2,
      },
      {
        text: {
          uz: "Faqat strategikni, qolganini rahbarlar",
          ru: "Только совет директоров/стратегию, остальное решают топ-менеджеры",
          en: "Only vision and strategy; line managers decide operational execution",
        },
        shortText: {
          uz: "Faqat strategik, qolganini rahbarlar",
          ru: "Стратегия моя, операционка топов",
          en: "Strategy only, directors lead",
        },
        points: 3,
      },
    ],
  },
  {
    id: 9,
    order: 9,
    title: {
      uz: "Mas'uliyat va xatolar uchun javobgarlik aniqmi?",
      ru: "Четко ли определены зоны ответственности и последствия за сбои?",
      en: "Are ownership zones and error accountability transparently mapped?",
    },
    options: [
      {
        text: {
          uz: "Aniq emas, \"kim bo'lsa\"",
          ru: "Размыто, виноватых не найти",
          en: "Vague, responsibility shifts around",
        },
        shortText: {
          uz: "Aniq emas, \"kim bo'lsa\"",
          ru: "Размыто",
          en: "Vague ownership",
        },
        points: 0,
      },
      {
        text: {
          uz: "Ba'zan aniq",
          ru: "Иногда понятно, но часто спорно",
          en: "Sometimes clear, often debated",
        },
        shortText: {
          uz: "Ba'zan aniq",
          ru: "Иногда понятно",
          en: "Occasionally clear",
        },
        points: 1,
      },
      {
        text: {
          uz: "Ko'pincha aniq",
          ru: "В большинстве процессов есть ответственный",
          en: "Most operational workflows have an assigned owner",
        },
        shortText: {
          uz: "Ko'pincha aniq",
          ru: "Чаще всего понятно",
          en: "Mostly clear",
        },
        points: 2,
      },
      {
        text: {
          uz: "Har bir jarayonning egasi bor",
          ru: "У каждого бизнес-процесса есть закрепленный владелец (RACI-матрица)",
          en: "Every business process has an explicit owner and measurable accountability",
        },
        shortText: {
          uz: "Har bir jarayonning egasi bor",
          ru: "У каждого процесса есть владелец",
          en: "Definite process owner",
        },
        points: 3,
      },
    ],
  },
  {
    id: 10,
    order: 10,
    title: {
      uz: "Kompaniyaning keyingi 1 yillik rejasi bormi?",
      ru: "Есть ли у компании стратегический и финансовый план на 1 год?",
      en: "Does your company have a structured 1-year business and financial plan?",
    },
    options: [
      {
        text: {
          uz: "Yo'q",
          ru: "Нет",
          en: "No plan",
        },
        shortText: {
          uz: "Yo'q",
          ru: "Нет",
          en: "None",
        },
        points: 0,
      },
      {
        text: {
          uz: "Bor, lekin yozilmagan",
          ru: "Есть общее видение в голове, но не оцифровано",
          en: "Exists as an informal idea, not written down",
        },
        shortText: {
          uz: "Bor, lekin yozilmagan",
          ru: "В голове, не записан",
          en: "Mental only",
        },
        points: 1,
      },
      {
        text: {
          uz: "Raqamlar bilan bor",
          ru: "Есть базовый финансовый план с целевыми цифрами",
          en: "Documented with financial targets and milestones",
        },
        shortText: {
          uz: "Raqamlar bilan bor",
          ru: "С цифрами и целями",
          en: "Target numbers ready",
        },
        points: 2,
      },
      {
        text: {
          uz: "Reja, bo'limlar maqsadi va oylik nazorat bor",
          ru: "Оцифрованная стратегия, цели по отделам и ежемесячная декомпозиция",
          en: "Decomposed strategy, departmental OKRs, and monthly milestone reviews",
        },
        shortText: {
          uz: "Reja, bo'limlar maqsadi va oylik nazorat bor",
          ru: "План, цели отделов и ежемесячный аудит",
          en: "Decomposed plan & audit",
        },
        points: 3,
      },
    ],
  },
];

export const QUIZ_TIERS: QuizTier[] = [
  {
    id: "dependent",
    minScore: 0,
    maxScore: 10,
    title: {
      uz: "Biznes sizga qaramli",
      ru: "Бизнес полностью зависим от основателя",
      en: "Owner-Dependent Business",
    },
    description: {
      uz: "Jarayonlar asosan egasining shaxsiy ishtirokiga tayanadi, tizimlashtirish eng katta foyda beradigan bosqich.",
      ru: "Операционные процессы завязаны на личном участии владельца. Систематизация на этом этапе дает максимальный рост эффективности и освобождает личное время.",
      en: "Core operations rely predominantly on the founder's direct daily presence. Systematization yields the single highest leverage at this phase.",
    },
    recommendation: {
      uz: "Boshqaruv vositalari, lavozim yo'riqnomalari va aniq javobgarlik tizimini joriy qilish orqali operatsion yukni bosqichma-bosqich kamaytirish tavsiya etiladi.",
      ru: "Рекомендуется регламентировать базовые функции, внедрить учет задач и передать рутинные решения руководителям направлений.",
      en: "We recommend documenting core workflows, introducing clear accountability, and delegating operational micro-decisions.",
    },
  },
  {
    id: "partial",
    minScore: 11,
    maxScore: 20,
    title: {
      uz: "Qisman tizimlashgan",
      ru: "Частично систематизированный бизнес",
      en: "Partially Systematized Business",
    },
    description: {
      uz: "Asos bor, lekin bir nechta bo'shliq egasini hali ham operatsiyaga bog'lab turibdi.",
      ru: "Управленческий фундамент заложен, однако несколько узких мест по-прежнему удерживают собственника в ежедневной рутине.",
      en: "A viable foundation exists, yet critical operational bottlenecks keep tying the founder into day-to-day firefighting.",
    },
    recommendation: {
      uz: "Asosiy e'tiborni sotuv voronkasi, KPI intizomi va jamoa mas'uliyatini to'liq mustahkamlashga qaratish maqsadga muvofiq.",
      ru: "Рекомендуется оцифровать систему продаж, закрепить метрики эффективности (KPI) и автоматизировать финансовый мониторинг.",
      en: "Prioritize sales pipeline visibility, performance incentive schemes, and autonomous operational coordination.",
    },
  },
  {
    id: "systemic",
    minScore: 21,
    maxScore: 30,
    title: {
      uz: "Tizimli biznes",
      ru: "Зрелая автономная бизнес-система",
      en: "Systematized Autonomous Enterprise",
    },
    description: {
      uz: "Tizim ishlayapti, keyingi qadam optimallashtirish va masshtablash.",
      ru: "Управленческая архитектура стабильно функционирует без вашего постоянного вмешательства. Следующий фокус — масштабирование.",
      en: "Your organizational system runs predictably. The natural next frontier is efficiency optimization and market expansion.",
    },
    recommendation: {
      uz: "Jarayonlar barqarorligini saqlagan holda strategik maqsadlar, xalqaro tajriba va yangi bozorlarga chiqish ustida ishlash maqsadga muvofiq.",
      ru: "Рекомендуется сосредоточиться на долгосрочной стратегии, масштабировании каналов дистрибьюции и привлечении сильных топ-менеджеров.",
      en: "Focus on capital allocation, regional expansion, strategic alliances, and governance board establishment.",
    },
  },
];

export function calculateQuizScore(answers: number[]): number {
  if (!Array.isArray(answers)) return 0;
  return answers.reduce((sum, curr) => {
    const val = Number(curr);
    return sum + (Number.isFinite(val) && val >= 0 && val <= 3 ? val : 0);
  }, 0);
}

export function getQuizTier(score: number): QuizTier {
  const normalized = Math.max(0, Math.min(30, Math.round(score)));
  const found = QUIZ_TIERS.find(
    (tier) => normalized >= tier.minScore && normalized <= tier.maxScore
  );
  return found || QUIZ_TIERS[0];
}
