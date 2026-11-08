const fs = require('fs');

let file = fs.readFileSync('src/config/content.ts', 'utf8');

const uzDossier = `    dossier: {
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
        applyNote: "Arizalar navbat asosida qabul qilinadi",
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
    },`;

const ruDossier = `    dossier: {
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
        applyNote: "Заявки принимаются в порядке очереди",
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
    },`;

const enDossier = `    dossier: {
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
        applyNote: "Inquiries processed on a rolling basis",
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
    },`;

// Find and replace each dossier section
function replaceDossierInLocale(src, localeStart, nextLocaleStart, newDossier) {
  const startIdx = src.indexOf(localeStart);
  if (startIdx === -1) throw new Error('Could not find ' + localeStart);
  const endIdx = nextLocaleStart ? src.indexOf(nextLocaleStart, startIdx) : src.length;
  if (endIdx === -1) throw new Error('Could not find end index');

  const localeSection = src.substring(startIdx, endIdx);
  const dossierStart = localeSection.indexOf('dossier: {');
  const portfolioStart = localeSection.indexOf('portfolio: {', dossierStart);
  if (dossierStart === -1 || portfolioStart === -1) {
    throw new Error('Dossier or portfolio not found in section: ' + localeStart);
  }

  const replacedSection = localeSection.substring(0, dossierStart) + newDossier + '\n' + localeSection.substring(portfolioStart);
  return src.substring(0, startIdx) + replacedSection + src.substring(endIdx);
}

file = replaceDossierInLocale(file, 'uz: {', 'ru: {', uzDossier);
file = replaceDossierInLocale(file, 'ru: {', 'en: {', ruDossier);
file = replaceDossierInLocale(file, 'en: {', 'export function getContent', enDossier);

fs.writeFileSync('src/config/content.ts', file, 'utf8');
console.log('Successfully patched UZ, RU, and EN dossier in src/config/content.ts');

