import { getContent } from "@/config/content";
import {
  VERIFIED_YOUTUBE_MANIFEST,
  type MediaTopicCategory,
} from "@/config/mediaManifest";

export type MediaLibraryLocale = "uz" | "ru" | "en";
export type MediaLibraryTopicFilter = "all" | MediaTopicCategory;
export type MediaLibrarySourceFilter = "all" | "video" | "press";

export interface MediaLibraryEntry {
  id: string;
  kind: "video" | "press";
  title: string;
  sourceName: string;
  publishedDate: string; // ISO YYYY-MM-DD
  durationOrType: string;
  topicCategory: MediaTopicCategory;
  summary: string;
  sourceUrl: string;
  videoId?: string;
}

export interface MediaLibraryUiCopy {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbs: {
    ariaLabel: string;
    home: string;
    current: string;
  };
  backToMedia: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  demoNotice: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  sourceFilters: Record<MediaLibrarySourceFilter, string>;
  topicFilters: Record<MediaLibraryTopicFilter, string>;
  resultsCountLabel: string;
  emptyState: {
    title: string;
    body: string;
    resetButton: string;
  };
  card: {
    videoBadge: string;
    pressBadge: string;
    takeawayLabel: string;
    watchVideo: string;
    readArticle: string;
  };
  modal: {
    close: string;
    watchOnYoutube: string;
    fallbackTitle: string;
    fallbackBody: string;
  };
  homepageLinkLabel: string;
}

const PRESS_TOPIC_MAP: Record<string, MediaTopicCategory> = {
  "spot-2022": "interviews",
  "kun-export-2022": "export",
  "kun-profile-2021": "interviews",
  "kun-makon-2024": "entrepreneurship",
  "yuz-uzbic-2022": "export",
  "newtimes-uzbic-2022": "export",
};

const MEDIA_LIBRARY_UI: Record<MediaLibraryLocale, MediaLibraryUiCopy> = {
  uz: {
    meta: {
      title: "Tasdiqlangan Media Kutubxona | Anvar Abduqayum",
      description:
        "Tasdiqlangan YouTube suhbatlari, boshqaruv ma’ruzalari va matbuot nashrlarining tizimli indeksi.",
    },
    breadcrumbs: {
      ariaLabel: "Sahifa navigatsiyasi",
      home: "Bosh sahifa",
      current: "Media kutubxona",
    },
    backToMedia: "Media bo‘limiga qaytish",
    eyebrow: "QOLIP // TASDIQLANGAN MEDIA ARXIVI",
    title: "Tasdiqlangan Media Kutubxona",
    subtitle:
      "Faqat tekshirilgan YouTube yozuvlari va sanalangan matbuot nashrlari. Har bir material manba nomi, nashr sanasi va qisqa faktik xulosa bilan ko‘rsatilgan.",
    demoNotice:
      "Demo rejim · Qisqa xulosalar faqat tasdiqlangan manba tavsiflariga tayanadi; qo‘shimcha iqtibos yoki statistika qo‘shilmagan.",
    searchLabel: "Mavzu yoki kalit so‘z bo‘yicha qidirish",
    searchPlaceholder: "Sarlavha, kanal, nashr yoki kalit so‘z...",
    clearSearch: "Tozalash",
    sourceFilters: {
      all: "Barchasi",
      video: "YouTube yozuvlari",
      press: "Matbuot nashrlari",
    },
    topicFilters: {
      all: "Barcha mavzular",
      systemization: "Tizimlashtirish",
      manufacturing: "Ishlab chiqarish",
      export: "Eksport",
      entrepreneurship: "Tadbirkorlik",
      interviews: "Intervyular",
      investment: "Kapital va mulohaza",
    },
    resultsCountLabel: "ta tasdiqlangan manba",
    emptyState: {
      title: "So‘rov bo‘yicha mos material topilmadi",
      body: "Qidiruv so‘zini o‘zgartiring yoki mavzu va manba filtrlarini qayta tiklang.",
      resetButton: "Filtrlarni tiklash",
    },
    card: {
      videoBadge: "YouTube",
      pressBadge: "Matbuot",
      takeawayLabel: "Asosiy mazmun",
      watchVideo: "Videoni ochish",
      readArticle: "Maqolani o‘qish",
    },
    modal: {
      close: "Yopish",
      watchOnYoutube: "YouTube’da ko‘rish",
      fallbackTitle: "Video pleyer yuklanmadi",
      fallbackBody:
        "Ushbu yozuvni to‘g‘ridan-to‘g‘ri rasmiy YouTube sahifasida ochishingiz mumkin.",
    },
    homepageLinkLabel: "To‘liq media kutubxonani ochish",
  },
  ru: {
    meta: {
      title: "Библиотека проверенных медиаматериалов | Анвар Абдукаюм",
      description:
        "Систематизированный каталог подтверждённых интервью на YouTube, лекций по управлению и публикаций в прессе.",
    },
    breadcrumbs: {
      ariaLabel: "Навигация по разделам",
      home: "Главная",
      current: "Медиабиблиотека",
    },
    backToMedia: "Вернуться к разделу «Медиа»",
    eyebrow: "QOLIP // ПРОВЕРЕННЫЙ МЕДИААРХИВ",
    title: "Библиотека проверенных медиа",
    subtitle:
      "Только верифицированные видеозаписи YouTube и датированные публикации в СМИ с указанием источника, даты и краткого содержания.",
    demoNotice:
      "Демо-режим · Краткие выдержки опираются исключительно на проверенные описания источников без додуманных цитат или цифр.",
    searchLabel: "Поиск по ключевым словам",
    searchPlaceholder: "Заголовок, канал, издание или ключевое слово...",
    clearSearch: "Очистить",
    sourceFilters: {
      all: "Все материалы",
      video: "Видео YouTube",
      press: "Публикации СМИ",
    },
    topicFilters: {
      all: "Все темы",
      systemization: "Систематизация",
      manufacturing: "Производство",
      export: "Экспорт",
      entrepreneurship: "Предпринимательство",
      interviews: "Интервью",
      investment: "Капитал и обзоры",
    },
    resultsCountLabel: "проверенных источников",
    emptyState: {
      title: "Подходящие материалы не найдены",
      body: "Попробуйте изменить поисковый запрос или сбросить фильтры тем и источников.",
      resetButton: "Сбросить фильтры",
    },
    card: {
      videoBadge: "YouTube",
      pressBadge: "Пресса",
      takeawayLabel: "Ключевое содержание",
      watchVideo: "Смотреть видео",
      readArticle: "Открыть статью",
    },
    modal: {
      close: "Закрыть",
      watchOnYoutube: "Открыть на YouTube",
      fallbackTitle: "Не удалось загрузить плеер",
      fallbackBody:
        "Вы можете открыть эту запись напрямую на официальной странице YouTube.",
    },
    homepageLinkLabel: "Открыть полную библиотеку медиа",
  },
  en: {
    meta: {
      title: "Verified Media Library | Anvar Abduqayum",
      description:
        "Indexed archive of verified YouTube interviews, operational lectures, and dated press publications.",
    },
    breadcrumbs: {
      ariaLabel: "Breadcrumb",
      home: "Home",
      current: "Media Library",
    },
    backToMedia: "Back to Media section",
    eyebrow: "QOLIP // VERIFIED MEDIA ARCHIVE",
    title: "Verified Media Library",
    subtitle:
      "Curated solely from verified YouTube watch records and dated press publications, with source attribution, publication dates, and concise takeaways.",
    demoNotice:
      "Demo Mode · Key takeaways strictly reflect verified source descriptions; no unverified quotes, timestamps, or metrics are added.",
    searchLabel: "Search by keyword or outlet",
    searchPlaceholder: "Title, channel, publication, or keyword...",
    clearSearch: "Clear",
    sourceFilters: {
      all: "All Sources",
      video: "YouTube Videos",
      press: "Press Articles",
    },
    topicFilters: {
      all: "All Topics",
      systemization: "Systemization",
      manufacturing: "Manufacturing",
      export: "Export",
      entrepreneurship: "Entrepreneurship",
      interviews: "Interviews",
      investment: "Capital & Commentary",
    },
    resultsCountLabel: "verified records",
    emptyState: {
      title: "No matching media records found",
      body: "Adjust your search query or reset the topic and source filters.",
      resetButton: "Reset filters",
    },
    card: {
      videoBadge: "YouTube",
      pressBadge: "Press",
      takeawayLabel: "Key takeaway",
      watchVideo: "Watch video",
      readArticle: "Read article",
    },
    modal: {
      close: "Close",
      watchOnYoutube: "Watch on YouTube",
      fallbackTitle: "Video player unavailable",
      fallbackBody:
        "You can open this recording directly on the official YouTube watch page.",
    },
    homepageLinkLabel: "Open full media library",
  },
};

export function getMediaLibraryUiCopy(locale: string): MediaLibraryUiCopy {
  const safeLocale: MediaLibraryLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  return MEDIA_LIBRARY_UI[safeLocale];
}

export function getMediaLibraryEntries(locale: string): MediaLibraryEntry[] {
  const safeLocale: MediaLibraryLocale =
    locale === "ru" || locale === "en" ? locale : "uz";
  const content = getContent(safeLocale);

  const videoEntries: MediaLibraryEntry[] = VERIFIED_YOUTUBE_MANIFEST.map(
    (item) => ({
      id: item.id,
      kind: "video",
      title: item.exactTitle,
      sourceName: item.channel,
      publishedDate: item.publishedDate,
      durationOrType: item.duration,
      topicCategory: item.topicCategory,
      summary: item.localizedSummary[safeLocale],
      sourceUrl: item.sourceUrl,
      videoId: item.videoId,
    })
  );

  const pressEntries: MediaLibraryEntry[] = (content.media.pressMentions || []).map(
    (item) => ({
      id: item.id,
      kind: "press",
      title: item.articleTitle,
      sourceName: item.outlet,
      publishedDate: item.dateIso || item.datePlaceholder || "",
      durationOrType: item.publicationType,
      topicCategory: PRESS_TOPIC_MAP[item.id] ?? "interviews",
      summary: item.contextNote || "",
      sourceUrl: item.url,
    })
  );

  return [...videoEntries, ...pressEntries].sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate)
  );
}
