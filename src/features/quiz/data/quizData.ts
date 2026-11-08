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
      uz: "Kompaniyangizdan 2 haftaga butunlay uzoqlashsangiz, zavod/do'konlardagi ishlar va kassa holati qanday bo'ladi?",
      ru: "Если вы полностью уедете на 2 недели, как будут обстоять дела на производстве/в магазинах и с кассой?",
      en: "If you step away completely for 2 weeks, how will production/store operations and cash flow hold up?",
    },
    options: [
      {
        text: {
          uz: "Hamma narsa to'xtaydi, kassa va yetkazib berishlar izdan chiqadi",
          ru: "Всё остановится, касса и поставки нарушатся",
          en: "Everything halts, cash and deliveries break down",
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
          uz: "Faqat oddiy ishlar ketadi, asosiy moliyaviy va ishlab chiqarish qarorlari kutadi",
          ru: "Идут только текущие дела, ключевые решения ждут",
          en: "Only routine runs, key decisions are stalled",
        },
        shortText: {
          uz: "Oddiy ishlar ketadi, qarorlar kutadi",
          ru: "Текущие дела, решения ждут",
          en: "Routine runs, decisions wait",
        },
        points: 1,
      },
      {
        text: {
          uz: "Ko'p jarayonlar ishlaydi, ammo jiddiy masalalarda baribir qo'ng'iroq qilishadi",
          ru: "Большинство процессов идет, но по важным вопросам звонят",
          en: "Most operations work, but they still call for major issues",
        },
        shortText: {
          uz: "Ko'p narsa ishlaydi, qo'ng'iroq qilishadi",
          ru: "Работает, но звонят",
          en: "Works, occasional calls",
        },
        points: 2,
      },
      {
        text: {
          uz: "To'liq avtonom ishlaydi, raqamlar va kassa hisobotini masofadan ko'rib turaman",
          ru: "Работает полностью автономно, отслеживаю цифры и кассу дистанционно",
          en: "Runs fully autonomously, I monitor figures and cash remotely",
        },
        shortText: {
          uz: "To'liq avtonom ishlaydi",
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
      uz: "Ishlab chiqarish tannarxi yoki xomashyo xaridida o'g'rilik, isrof va nazoratsizlik holatlari uchrab turadimi?",
      ru: "Случаются ли хищения, перерасход и отсутствие контроля в себестоимости производства или закупках сырья?",
      en: "Do theft, waste, or lack of control occur in your production unit cost or raw material procurement?",
    },
    options: [
      {
        text: {
          uz: "Aniq nazorat yo'q, xomashyo va kassada doimiy yo'qotishlar seziladi",
          ru: "Контроля нет, регулярно ощущаются потери сырья и денег",
          en: "No clear control, ongoing losses in raw materials and cash",
        },
        shortText: {
          uz: "Nazorat yo'q, yo'qotishlar ko'p",
          ru: "Нет контроля, частые потери",
          en: "No control, frequent losses",
        },
        points: 0,
      },
      {
        text: {
          uz: "Oylik hisob-kitobda yo'qotishlar chiqib qoladi, ammo sababini tezda topolmaymiz",
          ru: "При ежемесячном учете всплывают недостачи, но причину найти сложно",
          en: "Monthly accounting reveals shortages, but roots are hard to trace",
        },
        shortText: {
          uz: "Kamomadlar chiqadi, sababi noaniq",
          ru: "Недостачи, причины неясны",
          en: "Shortages appear, causes unclear",
        },
        points: 1,
      },
      {
        text: {
          uz: "Asosiy ombor nazoratda, lekin mayda isroflar va brak foizi yuqori",
          ru: "Главный склад под контролем, но процент брака и мелких потерь высок",
          en: "Main warehouse is controlled, but scrap and minor losses remain high",
        },
        shortText: {
          uz: "Ombor nazoratda, brak ko'p",
          ru: "Склад под контролем, брак высок",
          en: "Warehouse steady, high scrap",
        },
        points: 2,
      },
      {
        text: {
          uz: "Har bir gramm xomashyo va tayyor mahsulot ERP tizimida qat'iy nazoratda",
          ru: "Каждый грамм сырья и готовой продукции строго учитывается в ERP",
          en: "Every gram of raw material and finished product is tightly tracked in ERP",
        },
        shortText: {
          uz: "ERP orqali qat'iy nazoratda",
          ru: "Строгий учет через ERP",
          en: "Strictly tracked via ERP",
        },
        points: 3,
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: {
      uz: "Sotuv bo'limingiz yoki filialingiz egasining ishtirokisiz aniq KPI va tizimli reja asosida ishlaydimi?",
      ru: "Работает ли ваш отдел продаж или филиалы по четким KPI и системному плану без участия собственника?",
      en: "Does your sales department or branch network operate on clear KPIs and systematic targets without owner intervention?",
    },
    options: [
      {
        text: {
          uz: "Reja va KPI yo'q, hamma katta mijozlarni o'zim ushlab turaman",
          ru: "Планов и KPI нет, всех крупных клиентов веду сам",
          en: "No targets or KPIs, I manage all major clients myself",
        },
        shortText: {
          uz: "KPI yo'q, o'zim sotaman",
          ru: "Без KPI, продаю сам",
          en: "No KPIs, I sell myself",
        },
        points: 0,
      },
      {
        text: {
          uz: "Reja bor, lekin sotuvchilar intizomsiz va savdo rahbarga bog'liq",
          ru: "План есть, но дисциплина слабая, продажи зависят от владельца",
          en: "Target exists, but discipline is weak and sales rely on owner",
        },
        shortText: {
          uz: "Intizom sust, rahbarga bog'liq",
          ru: "Слабая дисциплина",
          en: "Weak discipline, owner-dependent",
        },
        points: 1,
      },
      {
        text: {
          uz: "KPI joriy qilingan, sotuvlar barqaror, ammo yangi bozorlarni egallash sust",
          ru: "KPI внедрены, продажи стабильны, но экспансия идет медленно",
          en: "KPIs are implemented, sales are steady, but expansion is sluggish",
        },
        shortText: {
          uz: "Barqaror, lekin o'sish sust",
          ru: "Стабильно, но рост медленный",
          en: "Stable, but slow expansion",
        },
        points: 2,
      },
      {
        text: {
          uz: "Kuchli boshqaruvchi boshchiligida B2B/B2C savdo rejasi avtonom bajariladi",
          ru: "Под сильным РОПом план B2B/B2C продаж перевыполняется автономно",
          en: "Under strong sales leadership, B2B/B2C targets are autonomously surpassed",
        },
        shortText: {
          uz: "Avtonom va rejadan ortiq",
          ru: "Автономно и с перевыполнением",
          en: "Autonomous and exceeding target",
        },
        points: 3,
      },
    ],
  },
  {
    id: 4,
    order: 4,
    title: {
      uz: "Omborxona, tovar qoldiqlari va yetkazib berish zanjiri real vaqtda raqamlashtirilganmi?",
      ru: "Оцифрованы ли складские остатки, логистика и цепочка поставок в режиме реального времени?",
      en: "Are your warehouse inventory, logistics, and supply chain digitized in real time?",
    },
    options: [
      {
        text: {
          uz: "Daftarda yoki eslab qolish orqali yuritiladi, qoldiqlar tez-tez adashadi",
          ru: "Учет в тетрадях или на память, остатки регулярно не сходятся",
          en: "Tracked on paper or memory, stock counts frequently misalign",
        },
        shortText: {
          uz: "Daftarda, adashishlar ko'p",
          ru: "На бумаге, частые ошибки",
          en: "Paper-based, frequent errors",
        },
        points: 0,
      },
      {
        text: {
          uz: "Oddiy Excel jadvalida yuritiladi, lekin ma'lumotlar kechikib kiritiladi",
          ru: "В простых таблицах Excel, но данные вносятся с опозданием",
          en: "In basic Excel sheets, but data is entered with delays",
        },
        shortText: {
          uz: "Excelda, kechikishlar bor",
          ru: "В Excel, с опозданием",
          en: "In Excel, with delays",
        },
        points: 1,
      },
      {
        text: {
          uz: "1C yoki hisob dasturi bor, lekin ombor va sotuv o'rtasida uzilishlar bo'ladi",
          ru: "Есть 1С/учетная система, но бывают расхождения между складом и сбытом",
          en: "1C or inventory software exists, but warehouse-sales discrepancies occur",
        },
        shortText: {
          uz: "1C bor, lekin uzilishlar bor",
          ru: "Есть 1С, но есть расхождения",
          en: "1C exists, slight mismatches",
        },
        points: 2,
      },
      {
        text: {
          uz: "To'liq avtomatlashtirilgan: xomashyodan to mijozga yetkazishgacha bitta panelda",
          ru: "Полная интеграция: от сырья до доставки клиенту на едином дашборде",
          en: "Fully integrated: from raw stock to client delivery on a single dashboard",
        },
        shortText: {
          uz: "To'liq bitta panelda integratsiya",
          ru: "Полный сквозной дашборд",
          en: "Fully integrated dashboard",
        },
        points: 3,
      },
    ],
  },
  {
    id: 5,
    order: 5,
    title: {
      uz: "Mahsulotingiz sifati xalqaro standartlar (ISO, sertifikatlar) va eksport talablariga javob beradimi?",
      ru: "Соответствует ли качество вашей продукции международным стандартам (ISO, сертификация) и требованиям экспорта?",
      en: "Does your product quality meet international standards (ISO, certifications) and export requirements?",
    },
    options: [
      {
        text: {
          uz: "Mahsulot faqat mahalliy bozor uchun, sertifikat va standartlar yo'q",
          ru: "Продукт только для местного рынка, сертификатов и стандартов нет",
          en: "Product is strictly local, no certifications or standards",
        },
        shortText: {
          uz: "Faqat mahalliy, sertifikatsiz",
          ru: "Только местный рынок",
          en: "Local market, no certs",
        },
        points: 0,
      },
      {
        text: {
          uz: "Standartlar bor, lekin xorijiy bozorga chiqishga sifat va qadoq yetishmaydi",
          ru: "Стандарты есть, но качество и упаковка не дотягивают до экспорта",
          en: "Standards exist, but quality and packaging fall short of export tier",
        },
        shortText: {
          uz: "Standart bor, qadoq yetishmaydi",
          ru: "Упаковка не дотягивает",
          en: "Standards exist, packaging lacks",
        },
        points: 1,
      },
      {
        text: {
          uz: "Mintaqaviy davlatlarga (MDH) kichik hajmda sinov eksporti qilingan",
          ru: "Делали пробные поставки в страны СНГ в небольших объемах",
          en: "Conducted small trial export shipments to regional CIS countries",
        },
        shortText: {
          uz: "Sinov eksporti qilingan",
          ru: "Пробный экспорт в СНГ",
          en: "Trial export executed",
        },
        points: 2,
      },
      {
        text: {
          uz: "Mahsulot to'liq sertifikatlangan, Turkiya, Xitoy yoki Yevropaga tizimli eksport qilinadi",
          ru: "Продукт сертифицирован, идет системный экспорт в Турцию, Китай или Европу",
          en: "Fully certified, systematic export runs to Turkey, China, or Europe",
        },
        shortText: {
          uz: "Xalqaro tizimli eksport",
          ru: "Системный экспорт в ЕС/Азию",
          en: "Systematic global export",
        },
        points: 3,
      },
    ],
  },
  {
    id: 6,
    order: 6,
    title: {
      uz: "Korxonada har bir ish o'rni uchun aniq lavozim yo'riqnomasi va moddiy javobgarlik tizimi bormi?",
      ru: "Внедрены ли регламенты, должностные инструкции и материальная ответственность для каждого поста?",
      en: "Are clear job descriptions, SOP regulations, and financial liabilities established for every role?",
    },
    options: [
      {
        text: {
          uz: "Hamma hamma narsa bilan shug'ullanadi, xatolar uchun hech kim javob bermaydi",
          ru: "Все занимаются всем, за ошибки никто конкретно не отвечает",
          en: "Everyone does everything, no one takes ownership of mistakes",
        },
        shortText: {
          uz: "Vazifalar chalkash, mas'ul yo'q",
          ru: "Хаос в обязанностях",
          en: "Chaos in duties, no owner",
        },
        points: 0,
      },
      {
        text: {
          uz: "Yo'riqnomalar qog'ozda bor, lekin amalda hech kim ularga rioya qilmaydi",
          ru: "Инструкции на бумаге есть, но на практике их никто не соблюдает",
          en: "Regulations exist on paper, but in practice no one follows them",
        },
        shortText: {
          uz: "Faqat qog'ozda bor",
          ru: "Только на бумаге",
          en: "Paper-only, not followed",
        },
        points: 1,
      },
      {
        text: {
          uz: "Asosiy mutaxassislar tartib bilan ishlaydi, lekin o'rta bo'g'inda intizom sust",
          ru: "Ключевые посты работают по регламентам, но в среднем звене сбои",
          en: "Key roles follow procedures, but middle management shows lapses",
        },
        shortText: {
          uz: "Asosiylar ishlaydi, o'rta bo'g'in sust",
          ru: "В среднем звене сбои",
          en: "Key roles fine, middle lapses",
        },
        points: 2,
      },
      {
        text: {
          uz: "Har bir xodim o'z reglamenti, KPI va javobgarlik chegarasini aniq biladi",
          ru: "Каждый сотрудник четко знает свой регламент, KPI и зону ответственности",
          en: "Every employee clearly understands their SOP, KPI, and accountability",
        },
        shortText: {
          uz: "Qat'iy reglament va KPI",
          ru: "Четкие регламенты и KPI",
          en: "Strict SOP and KPIs",
        },
        points: 3,
      },
    ],
  },
  {
    id: 7,
    order: 7,
    title: {
      uz: "Mahsulot tannarxi, elektr/gaz xarajatlari va ishlab chiqarishdagi brak foizi qat'iy nazoratdami?",
      ru: "Находятся ли себестоимость продукции, энергозатраты и процент брака под строгим контролем?",
      en: "Are unit production costs, utility expenditures, and manufacturing defect rates under rigorous control?",
    },
    options: [
      {
        text: {
          uz: "Tannarx taxminan olinadi, brak va kommunal isroflar hisoblanmaydi",
          ru: "Себестоимость считается «на глаз», брак и перерасход не фиксируются",
          en: "Costing is estimated by rule of thumb, waste and energy aren't tracked",
        },
        shortText: {
          uz: "Taxminiy, hisob-kitob yo'q",
          ru: "На глаз, без расчетов",
          en: "Guesstimated, no tracking",
        },
        points: 0,
      },
      {
        text: {
          uz: "Tannarx bor, lekin xomashyo narxi o'zgarsa, real foyda qancha qolayotgani noaniq",
          ru: "Расчет есть, но при скачках цен на сырье реальная маржа непонятна",
          en: "Calculation exists, but when raw prices fluctuate, real margin is foggy",
        },
        shortText: {
          uz: "Narx o'zgarsa foyda noaniq",
          ru: "При скачках цен маржа неясна",
          en: "Margin unclear on price swings",
        },
        points: 1,
      },
      {
        text: {
          uz: "Brak me'yorlari belgilangan, lekin tejamkorlik va optimizatsiya yetarli emas",
          ru: "Нормы брака заданы, но резервы оптимизации и экономии слабы",
          en: "Defect norms are set, but optimization and lean savings are limited",
        },
        shortText: {
          uz: "Me'yor bor, tejamkorlik sust",
          ru: "Нормы есть, экономия слабая",
          en: "Norms set, lean is weak",
        },
        points: 2,
      },
      {
        text: {
          uz: "Har bir mahsulot tannarxi va tejamkorlik ko'rsatkichlari har kuni tahlil qilinadi",
          ru: "Себестоимость единицы и нормы бережливого производства на ежедневном контроле",
          en: "Unit cost and lean manufacturing metrics are monitored and optimized daily",
        },
        shortText: {
          uz: "Kunlik tahlil va optimizatsiya",
          ru: "Ежедневный строгий анализ",
          en: "Daily lean optimization",
        },
        points: 3,
      },
    ],
  },
  {
    id: 8,
    order: 8,
    title: {
      uz: "Korxonangizda pul oqimi (Cash Flow) va sof foyda (P&L) hisoboti haftalik/oylik aniq chiqariladimi?",
      ru: "Сводятся ли отчеты о движении денег (Cash Flow) и чистой прибыли (P&L) еженедельно и ежемесячно?",
      en: "Are Cash Flow and net profit (P&L) statements reconciled accurately on a weekly and monthly basis?",
    },
    options: [
      {
        text: {
          uz: "Kassa aralashib ketgan, shaxsiy hamyon va biznes puli birga aylanadi",
          ru: "Касса смешана, личные деньги и финансы бизнеса не разделены",
          en: "Cash is mixed, personal wallet and company accounts run intertwined",
        },
        shortText: {
          uz: "Kassa aralash, shaxsiy bilan birga",
          ru: "Касса смешана с личными",
          en: "Cash intertwined with personal",
        },
        points: 0,
      },
      {
        text: {
          uz: "Faqat kassa qoldig'i ma'lum, lekin oy yakunida sof foyda qanchaligi aniq emas",
          ru: "Известен только остаток в кассе, но точная чистая прибыль за месяц неясна",
          en: "Only end-of-day cash balance is known, monthly net profit remains ambiguous",
        },
        shortText: {
          uz: "Qoldiq ma'lum, sof foyda noaniq",
          ru: "Остаток ясен, прибыль нет",
          en: "Balance known, profit unclear",
        },
        points: 1,
      },
      {
        text: {
          uz: "Oylik P&L chiqariladi, lekin kassa uzilishlari (kassaviy razriv) bo'lib turadi",
          ru: "Ежемесячный P&L есть, но периодически случаются кассовые разрывы",
          en: "Monthly P&L is generated, but periodic cash shortages still strike",
        },
        shortText: {
          uz: "P&L bor, kassa uzilishlari bo'ladi",
          ru: "Есть P&L, бывают разрывы",
          en: "P&L exists, cash gaps occur",
        },
        points: 2,
      },
      {
        text: {
          uz: "To'liq boshqaruv hisobi: P&L, Cash Flow, Balans va rejalashtirilgan byudjet",
          ru: "Профессиональный финучет: P&L, Cash Flow, Баланс и бюджетирование",
          en: "Full managerial accounting: P&L, Cash Flow, Balance Sheet, and budget plans",
        },
        shortText: {
          uz: "To'liq moliya va byudjet",
          ru: "Полный финучет и баланс",
          en: "Full financial governance",
        },
        points: 3,
      },
    ],
  },
  {
    id: 9,
    order: 9,
    title: {
      uz: "Bo'lim boshliqlari va zavod/do'kon direktorlari mustaqil qaror qabul qila oladimi?",
      ru: "Способны ли начальники производств и директора филиалов принимать самостоятельные решения?",
      en: "Can your plant managers and branch directors make autonomous operational decisions?",
    },
    options: [
      {
        text: {
          uz: "Hatto 100 ming so'mlik xarid yoki oddiy qaror ham egasining ruxsati bilan hal bo'ladi",
          ru: "Даже мелкие траты и базовые решения требуют личной подписи владельца",
          en: "Even petty expenses and trivial decisions require founder approval",
        },
        shortText: {
          uz: "Hamma narsa egasiga bog'liq",
          ru: "Все через подпись владельца",
          en: "Everything needs founder sign-off",
        },
        points: 0,
      },
      {
        text: {
          uz: "Ba'zi rahbarlar bor, lekin xatolardan qo'rqib har bir mayda masalada maslahat so'rashadi",
          ru: "Руководители есть, но боятся ответственности и советуются по мелочам",
          en: "Managers exist, but fear accountability and seek advice on minor matters",
        },
        shortText: {
          uz: "Qo'rqishadi, doim maslahatlashadi",
          ru: "Боятся ответственности",
          en: "Fear mistakes, consult constantly",
        },
        points: 1,
      },
      {
        text: {
          uz: "Kundalik operatsiyalarni o'zlari hal qilishadi, lekin strategik mas'uliyatni olmaydilar",
          ru: "Рутину решают сами, но стратегическую ответственность на себя не берут",
          en: "They handle daily routine, but shy away from strategic ownership",
        },
        shortText: {
          uz: "Kundalikni eplaydi, strategiyani yo'q",
          ru: "Рутина да, стратегия нет",
          en: "Handle routine, not strategy",
        },
        points: 2,
      },
      {
        text: {
          uz: "Kuchli top-menejment o'z byudjeti va natijalari uchun to'liq mustaqil javob beradi",
          ru: "Сильный топ-менеджмент полностью отвечает за свой бюджет и результат",
          en: "High-caliber executives independently own their budgets and KPI outcomes",
        },
        shortText: {
          uz: "Mustaqil va javobgar jamoa",
          ru: "Полностью самостоятельные топы",
          en: "Autonomous executive team",
        },
        points: 3,
      },
    ],
  },
  {
    id: 10,
    order: 10,
    title: {
      uz: "Korxonangiz xomashyo narxi yoki bozor o'zgarishlariga qaram bo'lmasdan yangi bozorlarga chiqa oladimi?",
      ru: "Способно ли предприятие масштабироваться на новые рынки независимо от кризисов и цен на сырье?",
      en: "Is your enterprise poised to scale into new markets resiliently, regardless of market volatility?",
    },
    options: [
      {
        text: {
          uz: "Kichik inqiroz yoki xomashyo qimmatlashsa, korxona darhol zararga kiradi",
          ru: "Малейший кризис или рост цен на сырье сразу уводят бизнес в убыток",
          en: "The slightest market hiccup or raw material inflation causes net losses",
        },
        shortText: {
          uz: "Inqirozga o'ta zaif",
          ru: "Крайне уязвим к кризисам",
          en: "Extremely vulnerable to shocks",
        },
        points: 0,
      },
      {
        text: {
          uz: "Faoliyat barqaror, lekin yangi ishlab chiqarish yoki yangi filial ochishga mablag' va tizim yetmaydi",
          ru: "Работа стабильна, но для открытия нового цеха или филиала нет ресурса",
          en: "Operations are stable, but opening a new plant or branch lacks systems",
        },
        shortText: {
          uz: "Barqaror, lekin kengayish yo'q",
          ru: "Стабильно, но без масштаба",
          en: "Stable, but cannot scale",
        },
        points: 1,
      },
      {
        text: {
          uz: "Moliyaviy zaxira bor, sekin kengaymoqdamiz, ammo masshtablashtirish xaritasi yetishmaydi",
          ru: "Финансовая подушка есть, растем, но не хватает четкой карты масштабирования",
          en: "Financial reserve exists, growth continues, but clear scaling roadmap is missing",
        },
        shortText: {
          uz: "Zaxira bor, yo'l xaritasi kerak",
          ru: "Есть резерв, нужна карта",
          en: "Reserves exist, roadmap needed",
        },
        points: 2,
      },
      {
        text: {
          uz: "Tizimli ishlab chiqarish, diversifikatsiya va eksport orqali kompaniya agressiv o'smoqda",
          ru: "Системное производство, диверсификация и экспорт обеспечивают мощный рост",
          en: "Systemic manufacturing, diversification, and exports fuel aggressive expansion",
        },
        shortText: {
          uz: "Agressiv o'sish va eksport",
          ru: "Мощный рост и экспорт",
          en: "Aggressive growth & export",
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
    maxScore: 11,
    title: {
      uz: "Operatsion xaos va egasiga 100% bog'langan biznes",
      ru: "Операционный хаос и 100% зависимость от владельца",
      en: "Operational Chaos & 100% Founder Dependency",
    },
    description: {
      uz: "Sizda mustaqil ishlaydigan biznes emas, balki butun mas'uliyati yelkangizga yuklangan o'ta og'ir ish joyi bor. Kassa, ta'minot, xodimlar va ishlab chiqarish shaxsan sizning har kungi ishtirokingizga bog'liq.",
      ru: "У вас пока не самостоятельный бизнес, а тяжелая круглосуточная работа. Касса, закупки, контроль персонала и производство держатся исключительно на вашем личном присутствии.",
      en: "You do not yet have an autonomous business, but an exhausting 24/7 job. Cash flow, procurement, staff oversight, and production depend entirely on your personal presence.",
    },
    recommendation: {
      uz: "Zudlik bilan kassa va xomashyo nazoratini yo'lga qo'yish, har bir lavozimga aniq yo'riqnoma yuklash va sizni operatsion «yong'inlarni o'chirish»dan ozod qiluvchi dastlabki tizimlashtirish auditini o'tkazish zarur.",
      ru: "Срочно необходимо внедрить сквозной учет кассы и сырья, закрепить регламенты за ключевыми постами и провести аудит систематизации для выхода из рутины.",
      en: "Urgent priority: institutionalize cash and inventory controls, enforce role-specific SOPs, and conduct a systematization audit to liberate the founder from operational firefighting.",
    },
  },
  {
    id: "partial",
    minScore: 12,
    maxScore: 21,
    title: {
      uz: "Qisman tartibga solingan, ammo qo'lda boshqariladigan tizim",
      ru: "Частично упорядоченная система с ручным управлением",
      en: "Partially Structured System with Manual Control",
    },
    description: {
      uz: "Korxonangizda asosiy jarayonlar ishlaydi va barqaror aylanma bor. Biroq boshqaruv hali ham qo'lda amalga oshiriladi: top-menejerlar mustaqil emas, tannarx va isroflar ustidan qat'iy nazorat to'liq o'rnatilmagan.",
      ru: "В компании выстроены базовые процессы и есть стабильный оборот. Однако управление по-прежнему ручное: топ-менеджеры боятся решений, а контроль себестоимости и потерь требует доработки.",
      en: "Your enterprise boasts baseline processes and stable turnover. Yet governance remains manual: executives hesitate to take ownership, and unit cost controls require tightening.",
    },
    recommendation: {
      uz: "Boshqaruvni raqamlashtirish (ERP/CRM), bo'lim boshliqlari uchun qat'iy KPI joriy etish, tannarxni optimallashtirib, eksport va yangi filiallar ochishga tayyorgarlik ko'rish tavsiya etiladi.",
      ru: "Рекомендуется оцифровать управление (ERP/CRM), внедрить строгие KPI для руководителей подразделений, оптимизировать себестоимость и подготовиться к выходу на экспорт.",
      en: "Recommended action: digitize operations (ERP/CRM), roll out transparent executive KPIs, optimize manufacturing yield, and prepare for regional export expansion.",
    },
  },
  {
    id: "systemic",
    minScore: 22,
    maxScore: 30,
    title: {
      uz: "Avtonom ishlaydigan va eksportga tayyor barqaror tizim",
      ru: "Автономная система, готовая к масштабному экспорту",
      en: "Autonomous System Poised for Global Export",
    },
    description: {
      uz: "Tabriklaymiz! Korxonangizda kuchli boshqaruv intizomi, moliyaviy nazorat va mustaqil jamoa shakllangan. Biznes egasining kundalik aralashuvisiz ham barqaror foyda keltirish qobiliyatiga ega.",
      ru: "Поздравляем! На вашем предприятии создана образцовая дисциплина, сквозной финансовый учет и сильная команда. Бизнес устойчиво генерирует прибыль без микроменеджмента.",
      en: "Congratulations! Your enterprise has established strong discipline, end-to-end financial transparency, and a capable executive team, generating stable profits without micromanagement.",
    },
    recommendation: {
      uz: "Keyingi strategik qadam — xalqaro bozorlarga (Turkiya, Xitoy, Yevropa) eksport hajmini bir necha barobar oshirish, yangi ishlab chiqarish quvvatlarini ochish va shaxsiy investitsiya portfelini kengaytirish.",
      ru: "Следующий стратегический шаг — кратный рост экспорта (Турция, Китай, Европа), ввод новых производственных мощностей и расширение инвестиционного портфеля.",
      en: "Next strategic milestone: exponentially expanding export volume (Turkey, China, Europe), launching new manufacturing verticals, and compounding your investment portfolio.",
    },
  },
];

export function calculateQuizScore(answers: number[]): number {
  if (!Array.isArray(answers)) return 0;
  return answers.reduce((total, optionIndex, questionIndex) => {
    const question = QUIZ_QUESTIONS[questionIndex];
    if (!question) return total;
    const option = question.options[optionIndex];
    const points = typeof option?.points === "number" ? option.points : 0;
    return total + points;
  }, 0);
}

export function getQuizTier(score: number): QuizTier {
  const safeScore = Math.max(0, Math.min(30, score));
  const tier = QUIZ_TIERS.find(
    (t) => safeScore >= t.minScore && safeScore <= t.maxScore
  );
  return tier || QUIZ_TIERS[0];
}
