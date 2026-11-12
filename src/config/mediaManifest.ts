/**
 * Verified YouTube Media Manifest — Phase 4.6.1 / 4.6.2
 * Every entry below has been verified against live YouTube watch metadata
 * (HTTP 200, exact title, publication date, duration, and channel author).
 */

export type MediaTopicCategory =
  | "systemization"
  | "manufacturing"
  | "export"
  | "entrepreneurship"
  | "interviews"
  | "investment";

export type MediaVerificationStatus = "verified";

export interface VerifiedVideoItem {
  id: string;
  videoId: string;
  exactTitle: string;
  publishedDate: string; // ISO YYYY-MM-DD
  duration: string;
  channel: string;
  topicCategory: MediaTopicCategory;
  sourceUrl: string;
  verificationStatus: MediaVerificationStatus;
  featuredInCuratedList: boolean;
  localizedSummary: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const VERIFIED_YOUTUBE_MANIFEST: VerifiedVideoItem[] = [
  {
    id: "subyektiv-2021",
    videoId: "yi6UAsstdw4",
    exactTitle: "O'yinchoq ortidan million – Anvar Abduqayum | SUBYEKTIV",
    publishedDate: "2021-10-23",
    duration: "1:09:46",
    channel: "SUBYEKTIV",
    topicCategory: "interviews",
    sourceUrl: "https://www.youtube.com/watch?v=yi6UAsstdw4",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "Kun.uz huzuridagi SUBYEKTIV loyihasi bilan suhbat: Toybola ishlab chiqarishini yo‘lga qo‘yish, qoliplarni mahalliylashtirish va dastlabki eksport qadamlari.",
      ru: "Документальное интервью проекту SUBYEKTIV (Kun.uz) о запуске производства Toybola, локализации пресс-форм и первых шагах в экспорте.",
      en: "Documentary interview with SUBYEKTIV (Kun.uz) tracing the development of Toybola manufacturing, mold localization, and early export expansion.",
    },
  },
  {
    id: "internation-2026",
    videoId: "4HRt-WTp3-A",
    exactTitle:
      "Anvar Abduqayum - Biznesni yaratish tarixi, ishlab chiqarish masshtabi va shaxsiy hayoti haqida",
    publishedDate: "2026-01-16",
    duration: "59:55",
    channel: "Inter Nation English School",
    topicCategory: "interviews",
    sourceUrl: "https://www.youtube.com/watch?v=4HRt-WTp3-A",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "2026-yil yanvar oyidagi uzoq formatli suhbat: ishlab chiqarishni kengaytirish, dastlabki qiyinchiliklar va boshqaruv intizomi.",
      ru: "Подробное интервью (январь 2026 г.) об истории создания бизнеса, масштабировании производства и управленческой дисциплине.",
      en: "Long-form January 2026 interview covering business origins, production scaling, early operational hurdles, and leadership discipline.",
    },
  },
  {
    id: "intervyutv-2022",
    videoId: "73WXbwiMBzI",
    exactTitle:
      "Millioner Anvar Abduqayumni uyi, zavodlari, restorani. “Ishga kasal” odamning katta intervyusi",
    publishedDate: "2022-02-26",
    duration: "2:26:06",
    channel: "intervyuTV",
    topicCategory: "manufacturing",
    sourceUrl: "https://www.youtube.com/watch?v=73WXbwiMBzI",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "Toybola ishlab chiqarish sexlari va umumiy ovqatlanish obyektlari bo‘ylab joyidan olingan hujjatli suhbat.",
      ru: "Выездной документальный обзор производственных цехов Toybola и объектов общественного питания.",
      en: "On-site documentary walkthrough recorded across Toybola manufacturing workshops and hospitality venues.",
    },
  },
  {
    id: "avtopilot-8-steps-2026",
    videoId: "ZiWr2ND4LSo",
    exactTitle: "Biznesni AVTOPILOTGA qo'yishni 8 bosqichi | ANVAR ABDUQAYUM",
    publishedDate: "2026-05-17",
    duration: "56:54",
    channel: "Anvar Abduqayum",
    topicCategory: "systemization",
    sourceUrl: "https://www.youtube.com/watch?v=ZiWr2ND4LSo",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "Biznes jarayonlarini standartlashtirish va egasining kundalik aralashuvisiz boshqarish bo‘yicha 8 bosqichli ochiq video-darslik.",
      ru: "Открытая видеолекция о 8 этапах регламентации процессов и снижения операционной зависимости от собственника.",
      en: "Public lecture detailing an 8-step framework for operational standardization and owner-independent management.",
    },
  },
  {
    id: "samo-system-2026",
    videoId: "qHAo5gJmjaE",
    exactTitle:
      "Samo kompaniyasining tizimi va o‘sish strategiyasini ichkaridan ochib berdik | EKSKLYUZIV",
    publishedDate: "2026-02-22",
    duration: "1:41:07",
    channel: "Anvar Abduqayum",
    topicCategory: "systemization",
    sourceUrl: "https://www.youtube.com/watch?v=qHAo5gJmjaE",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "Samo kompaniyasining ichki boshqaruv tizimi va o‘sish strategiyasi tahliliga bag‘ishlangan amaliy keys-suhbat.",
      ru: "Практический разбор внутренней системы управления и стратегии роста компании Samo.",
      en: "Operational case study examining the internal management systems and scaling strategy of the Samo enterprise.",
    },
  },
  {
    id: "inside-business-2026",
    videoId: "9G3zmqkxAWA",
    exactTitle: "YouTubeda 1-marta Bu Biznesni ichidan ochib berdik...",
    publishedDate: "2026-02-28",
    duration: "1:01:02",
    channel: "Anvar Abduqayum",
    topicCategory: "entrepreneurship",
    sourceUrl: "https://www.youtube.com/watch?v=9G3zmqkxAWA",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "Korxona ichki jarayonlari, xarajatlar tuzilmasi va operatsion boshqaruv amaliyotini yorituvchi tahliliy son.",
      ru: "Аналитический выпуск о внутренних процессах предприятия, структуре затрат и операционном управлении.",
      en: "Analytical episode reviewing internal enterprise workflows, cost structure, and operational execution.",
    },
  },
  {
    id: "jaydari-keys-2026",
    videoId: "wS9_CIcdYKw",
    exactTitle:
      "Bunaqa sekretlani hechkim ochmaydi | Jaydari biznes keys | Anvar Abduqayum",
    publishedDate: "2026-05-25",
    duration: "35:37",
    channel: "Anvar Abduqayum",
    topicCategory: "entrepreneurship",
    sourceUrl: "https://www.youtube.com/watch?v=wS9_CIcdYKw",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "Kichik va o‘rta biznes egalari uchun amaliy boshqaruv hamda savdo qarorlari tahlili.",
      ru: "Практический разбор управленческих и коммерческих решений для владельцев малого и среднего бизнеса.",
      en: "Field-level business case analysis covering management and commercial decisions for SME operators.",
    },
  },
  {
    id: "start-business-capital-2026",
    videoId: "lxpDDsBODQc",
    exactTitle: "10.000$ bilan boshlasa bo'ladigan BIZNES  | Anvar Abduqayum",
    publishedDate: "2026-06-20",
    duration: "50:19",
    channel: "Anvar Abduqayum",
    topicCategory: "entrepreneurship",
    sourceUrl: "https://www.youtube.com/watch?v=lxpDDsBODQc",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "Boshlang‘ich kapitalni taqsimlash va kichik miqyosdagi tadbirkorlikni yo‘lga qo‘yish bo‘yicha ta’limiy suhbat.",
      ru: "Образовательное обсуждение распределения стартового капитала и запуска малых предпринимательских проектов.",
      en: "Educational discussion on startup capital allocation and launching small-scale entrepreneurial operations.",
    },
  },
  {
    id: "sector-retrospective-2026",
    videoId: "mrf9uZ3k1Ds",
    exactTitle:
      "10 yil oldin shu bzizneslarga pul tikkanimda, Milliarder bo'lardim...",
    publishedDate: "2026-01-24",
    duration: "29:49",
    channel: "Anvar Abduqayum",
    topicCategory: "investment",
    sourceUrl: "https://www.youtube.com/watch?v=mrf9uZ3k1Ds",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "Soha tanlash, kapital kiritish vaqti va uzoq muddatli bozor tendensiyalari haqida retrospektiv mulohazalar.",
      ru: "Ретроспективный разбор выбора отраслей, тайминга капитала и долгосрочных рыночных трендов.",
      en: "Retrospective reflection on sector selection, capital timing, and long-term market trends.",
    },
  },
  {
    id: "real-estate-commentary-2026",
    videoId: "bm_y3k3-3gA",
    exactTitle: "O‘zbekistondagi eng daromadli ko‘chmas mulk | Anvar Abduqayum",
    publishedDate: "2026-04-21",
    duration: "50:55",
    channel: "Anvar Abduqayum",
    topicCategory: "investment",
    sourceUrl: "https://www.youtube.com/watch?v=bm_y3k3-3gA",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "O‘zbekistonda tijoriy va kurort ko‘chmas mulk bozori dinamikasi bo‘yicha ommaviy sharh (moliyaviy maslahat emas).",
      ru: "Публичный комментарий о динамике коммерческой и курортной недвижимости в Узбекистане (не является инвестсоветом).",
      en: "Public commentary on commercial and resort real-estate dynamics in Uzbekistan (non-advisory).",
    },
  },
  {
    id: "bochka-resort-presentation-2026",
    videoId: "oKbTo0WxdGU",
    exactTitle: "Passiv daromad uchun kochmas MULK | Bochka Resort",
    publishedDate: "2026-07-16",
    duration: "30:23",
    channel: "Anvar Abduqayum",
    topicCategory: "investment",
    sourceUrl: "https://www.youtube.com/watch?v=oKbTo0WxdGU",
    verificationStatus: "verified",
    featuredInCuratedList: true,
    localizedSummary: {
      uz: "2026-yilda e’lon qilingan Bochka Resort loyihasi haqidagi ommaviy taqdimot videosi (faqat hujjatlashtirilgan media sifatida ko‘rsatiladi).",
      ru: "Публичное презентационное видео о проекте Bochka Resort (июль 2026 г.; представлено исключительно как задокументированное медиа).",
      en: "Public July 2026 video presenting the Bochka Resort project (indexed strictly as documented public media).",
    },
  },
  {
    id: "export-history-2023",
    videoId: "accoPg4-9io",
    exactTitle: "Butun dunyoga eksport qilish #shorts #shortsvideo #biznes #pul",
    publishedDate: "2023-06-02",
    duration: "0:36",
    channel: "Anvar Abduqayum",
    topicCategory: "export",
    sourceUrl: "https://www.youtube.com/watch?v=accoPg4-9io",
    verificationStatus: "verified",
    featuredInCuratedList: false,
    localizedSummary: {
      uz: "Tashqi bozorlarga chiqish va eksport tafakkuri haqidagi qisqa video-mulohaza.",
      ru: "Короткий видеокомментарий об экспортном подходе и выходе на внешние рынки.",
      en: "Short commentary on export orientation and entering international markets.",
    },
  },
];

