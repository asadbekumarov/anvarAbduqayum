"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const MapLibreExportMap = dynamic(
  () => import("./MapLibreExportMap").then((mod) => mod.MapLibreExportMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-[#08090B] text-[#8E95A5] font-mono text-[11px] gap-3">
        <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
        <span className="tracking-[0.14em]">YUKLANMOQDA // GEOGRAFIK LOGISTIKA TIZIMI</span>
      </div>
    ),
  }
);

export interface ExportCorridorMapProps {
  locale?: string;
  onSelectCorridor?: (corridorId: string, specs: string) => void;
}

interface CorridorNode {
  id: string;
  name: string;
  country: string;
  code: string;
  status: {
    uz: string;
    ru: string;
    en: string;
  };
  transitTime: {
    uz: string;
    ru: string;
    en: string;
  };
  logisticsMode: {
    uz: string;
    ru: string;
    en: string;
  };
  primarySectors: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  capacitySummary: {
    uz: string;
    ru: string;
    en: string;
  };
}

const REGION_TABS = [
  { id: "kz", label: { uz: "Qozog‘iston", ru: "Казахстан", en: "Kazakhstan" } },
  { id: "ru", label: { uz: "Rossiya & MDH", ru: "Россия & СНГ", en: "Russia & CIS" } },
  { id: "kg", label: { uz: "Qirg‘iziston", ru: "Кыргызстан", en: "Kyrgyzstan" } },
  { id: "tj", label: { uz: "Tojikiston", ru: "Таджикистан", en: "Tajikistan" } },
  { id: "mena", label: { uz: "Turkiya & MENA", ru: "Турция & MENA", en: "Turkey & MENA" } },
];

const CORRIDORS: CorridorNode[] = [
  {
    id: "kz",
    name: "Qozog‘iston (Almati / Ostona)",
    country: "Kazakhstan",
    code: "Markaziy Osiyo mintaqaviy xabi",
    status: {
      uz: "Faol eksport yo‘nalishi · Yillik shartnoma",
      ru: "Действующий маршрут · Годовой контракт",
      en: "Active export corridor · Annual contracts",
    },
    transitTime: {
      uz: "2–4 kun (FTL avtotransport)",
      ru: "2–4 дня (FTL автотранспорт)",
      en: "2–4 days (Direct FTL road)",
    },
    logisticsMode: {
      uz: "Avto FTL / TIR Karnet · To‘g‘ridan-to‘g‘ri bojxona",
      ru: "Авто FTL / Карнет TIR · Прямой таможенный транзит",
      en: "Road FTL / TIR Carnet · Direct customs clearance",
    },
    primarySectors: {
      uz: ["Toybola bolalar o‘yinchoqlari", "Polimer buyumlar", "HORECA qadoqlash"],
      ru: ["Детские игрушки Toybola", "Полимерная продукция", "HORECA упаковка"],
      en: ["Toybola Toys & Playsets", "Precision Polymers", "HoReCa Food Packaging"],
    },
    capacitySummary: {
      uz: "Oyiga 15+ fura va yirik ulgurji distribyutsiya tarmoqlari",
      ru: "15+ еврофур в месяц и крупные оптовые дистрибьюторы",
      en: "15+ FTL trucks/month to major retail distributors",
    },
  },
  {
    id: "ru",
    name: "Rossiya & MDH (Moskva / Ural)",
    country: "Russia / CIS",
    code: "Rossiya va MDH federal tarmoqlari",
    status: {
      uz: "Strategik OEM va Privat-leybl yo‘lagi",
      ru: "Стратегический маршрут OEM и Privat-Label",
      en: "Strategic OEM & private-label route",
    },
    transitTime: {
      uz: "6–9 kun (Avto / Temir yo‘l konteyner)",
      ru: "6–9 дней (Авто / Ж/Д контейнер)",
      en: "6–9 days (Road FTL / Rail container)",
    },
    logisticsMode: {
      uz: "40ft konteynerlar / Temir yo‘l platformalari / FTL",
      ru: "40-футовые контейнеры / Ж/Д платформы / FTL",
      en: "40ft ISO High-Cube Containers / Rail Platforms",
    },
    primarySectors: {
      uz: ["OEM o‘yinchoq ishlab chiqarish", "Katta partiyali polimer qoliplar", "Sanoat tarmoqlari"],
      ru: ["Контрактное производство игрушек (OEM)", "Крупносерийные пресс-формы", "Сетевой ритейл"],
      en: ["OEM Contract Toy Manufacturing", "High-Volume Injection Mold Parts", "Retail Chains"],
    },
    capacitySummary: {
      uz: "Federal savdo tarmoqlari va yirik o‘yinchoq distribyutorlari uchun sertifikatlangan ta’minot",
      ru: "Сертифицированные поставки для федеральных сетей и оптовых брендов",
      en: "Certified institutional volume for national retail networks",
    },
  },
  {
    id: "kg",
    name: "Qirg‘iziston (Bishkek / O‘sh)",
    country: "Kyrgyzstan",
    code: "Mintaqaviy chegaraoldi yo‘lagi",
    status: {
      uz: "Muntazam tranzit ta’minoti",
      ru: "Регулярные трансграничные поставки",
      en: "Regular cross-border deliveries",
    },
    transitTime: {
      uz: "24–48 soat (Ekspress logistika)",
      ru: "24–48 часов (Экспресс доставка)",
      en: "24–48 hours (Express transit)",
    },
    logisticsMode: {
      uz: "Tezkor FTL / LTL konsolidatsiya",
      ru: "Быстрый FTL / LTL сборные грузы",
      en: "Rapid FTL / LTL consolidated shipments",
    },
    primarySectors: {
      uz: ["Toybola mavsumiy to‘plamlari", "Plastik maishiy jihozlar", "Oziq-ovqat idishlari"],
      ru: ["Сезонные наборы Toybola", "Хозяйственный пластик", "Пищевые контейнеры"],
      en: ["Toybola Seasonal Toy Series", "Household Molded Plastics", "Packaging"],
    },
    capacitySummary: {
      uz: "Har haftalik doimiy yetkazib berish zanjiri va mintaqaviy omborlar",
      ru: "Еженедельная логистическая цепочка и региональные хабы",
      en: "Weekly scheduled freight & regional replenishment",
    },
  },
  {
    id: "tj",
    name: "Tojikiston (Dushanbe / Xo‘jand)",
    country: "Tajikistan",
    code: "To‘g‘ridan-to‘g‘ri avtomagistral",
    status: {
      uz: "To‘g‘ridan-to‘g‘ri shartnomaviy ta’minot",
      ru: "Прямые контрактные поставки",
      en: "Direct contract replenishment",
    },
    transitTime: {
      uz: "1–3 kun (Avtomagistral orqali)",
      ru: "1–3 дня (Автомагистраль)",
      en: "1–3 days (Direct highway FTL)",
    },
    logisticsMode: {
      uz: "To‘g‘ridan-to‘g‘ri FTL avtotransport",
      ru: "Прямой автотранспорт FTL",
      en: "Dedicated road FTL shipments",
    },
    primarySectors: {
      uz: ["Bolalar transporti va o‘yinchoqlar", "Polimer xomashyo komponentlari", "HORECA jihozlari"],
      ru: ["Детский транспорт и развивающие игрушки", "Полимерные комплектующие", "HORECA продукция"],
      en: ["Ride-on Toys & Educational Playsets", "Polymer Mouldings", "Hospitality Goods"],
    },
    capacitySummary: {
      uz: "Respublika bo‘ylab chakana va ulgurji savdo tarmoqlari bilan to‘liq qamrov",
      ru: "Полный охват розничных сетей и оптовых баз республики",
      en: "Direct coverage of countrywide retail chains & wholesale hubs",
    },
  },
  {
    id: "mena",
    name: "Yaqin Sharq & Turkiya (Istanbul / Dubay)",
    country: "MENA & Turkey",
    code: "Xalqaro multimodal yo‘nalish",
    status: {
      uz: "B2B kooperatsiya va qoliplar alyansi (UZBIC)",
      ru: "B2B кооперация и альянс пресс-форм (UZBIC)",
      en: "B2B alliances & tooling sourcing (UZBIC)",
    },
    transitTime: {
      uz: "8–14 kun (Multimodal dengiz/avto)",
      ru: "8–14 дней (Мультимодальные море/авто)",
      en: "8–14 days (Multimodal sea/road)",
    },
    logisticsMode: {
      uz: "Konteyner kemalari / Havo kargo / Multimodal",
      ru: "Контейнеровозы / Авиа-карго / Мультимодал",
      en: "Ocean Container / Air Cargo / Multimodal transit",
    },
    primarySectors: {
      uz: ["Xomashyo va stanoklar importi", "Qoliplar muhandisligi", "Qo‘shma korxona loyihalari"],
      ru: ["Импорт сырья и станков", "Инженерия пресс-форм", "Проекты совместных предприятий"],
      en: ["Polymer Feedstock & Tooling", "Precision Injection Molds", "Joint Venture Assembly"],
    },
    capacitySummary: {
      uz: "UZBIC orqali xalqaro sanoat kooperatsiyasi va investitsiya muloqoti",
      ru: "Международная промышленная кооперация и диалог через совет UZBIC",
      en: "International manufacturing cooperation facilitated via UZBIC Council",
    },
  },
  // Placeholders for non-button regions selectable via interactive map
  {
    id: "tm",
    name: "Turkmaniston (Ashxobod / Kaspiy)",
    country: "Turkmenistan",
    code: "Mintaqaviy tranzit yo‘lagi",
    status: {
      uz: "Mintaqaviy logistika yo‘nalishi",
      ru: "Региональный логистический маршрут",
      en: "Regional transit corridor",
    },
    transitTime: {
      uz: "2–4 kun (Avto FTL)",
      ru: "2–4 дня (Авто FTL)",
      en: "2–4 days (Road FTL)",
    },
    logisticsMode: {
      uz: "Avto FTL / Tranzit yo‘lagi",
      ru: "Авто FTL / Транзитный коридор",
      en: "Road FTL / Direct Transit Corridor",
    },
    primarySectors: {
      uz: ["Polimer buyumlar", "Sanoat mahsulotlari"],
      ru: ["Полимерные изделия", "Промышленная продукция"],
      en: ["Molded Polymers", "Industrial Goods"],
    },
    capacitySummary: {
      uz: "Mintaqaviy savdo kelishuvlari va logistika imkoniyatlari o‘rganilmoqda.",
      ru: "Оценка региональных соглашений и пропускной способности маршрута.",
      en: "Regional trade agreements and route capacity evaluation under development.",
    },
  },
  {
    id: "cn",
    name: "Xitoy (Urumchi / Shinjon)",
    country: "China",
    code: "Texnologik import va stanoklar yo‘lagi",
    status: {
      uz: "Xomashyo va texnologik kooperatsiya",
      ru: "Сырьевой и технологический обмен",
      en: "Sourcing & tooling corridor",
    },
    transitTime: {
      uz: "6–10 kun (Multimodal temir yo‘l/avto)",
      ru: "6–10 дней (Мультимодал ж/д и авто)",
      en: "6–10 days (Multimodal rail/road)",
    },
    logisticsMode: {
      uz: "Blok-poyezdlar / TIR Karnet konteyner",
      ru: "Блок-поезда / Контейнеры TIR Carnet",
      en: "Block Trains / TIR Carnet Containers",
    },
    primarySectors: {
      uz: ["Qoliplar va stanoklar importi", "Polimer granulalar"],
      ru: ["Пресс-формы и станки", "Полимерное сырье"],
      en: ["Precision Molds & Tooling", "Raw Polymer Granules"],
    },
    capacitySummary: {
      uz: "Sanoat uskunalari importi va ikki tomonlama logistika zanjiri loyihalari.",
      ru: "Импорт оборудования и проекты двусторонней промышленной логистики.",
      en: "Direct manufacturing equipment sourcing and bilateral logistics projects.",
    },
  },
  {
    id: "az",
    name: "Ozarbayjon (Boku / Kaspiy porti)",
    country: "Azerbaijan",
    code: "Transkaspiy savdo darvozasi",
    status: {
      uz: "Transkaspiy savdo yo‘lagi",
      ru: "Транскаспийский торговый коридор",
      en: "Transcaspian trade gateway",
    },
    transitTime: {
      uz: "4–7 kun (Parom / Avtotransport)",
      ru: "4–7 дней (Паром / Автотранспорт)",
      en: "4–7 days (Ro-Ro Ferry / Road FTL)",
    },
    logisticsMode: {
      uz: "Kaspiy paromi / FTL avto",
      ru: "Каспийский паром / FTL авто",
      en: "Caspian Ro-Ro Ferry / Road FTL",
    },
    primarySectors: {
      uz: ["Toybola o‘yinchoqlari", "Maishiy polimerlar"],
      ru: ["Игрушки Toybola", "Бытовой пластик"],
      en: ["Toybola Toys", "Household Polymers"],
    },
    capacitySummary: {
      uz: "Kavkaz mintaqasiga Kaspiy orqali yetkazib berish salohiyati.",
      ru: "Потенциал поставок в страны Закавказья через Каспийский коридор.",
      en: "Supply channel development towards South Caucasus markets via Caspian route.",
    },
  },
  {
    id: "eu",
    name: "Yevropa Ittifoqi (EU 27 Mamlakat)",
    country: "European Union",
    code: "Yevropa Ittifoqi va xalqaro bozor",
    status: {
      uz: "CE va EN-71 standartlari yo‘nalishi",
      ru: "Направление сертификации CE и стандартов ЕС",
      en: "CE-certified export corridor",
    },
    transitTime: {
      uz: "12–18 kun (Multimodal temir yo‘l/avto)",
      ru: "12–18 дней (Мультимодал ж/д и авто)",
      en: "12–18 days (Multimodal rail/road)",
    },
    logisticsMode: {
      uz: "40ft High-Cube konteynerlar / Xalqaro intermodal",
      ru: "40-футовые контейнеры / Интермодальный транзит",
      en: "40ft ISO High-Cube Containers / Intermodal",
    },
    primarySectors: {
      uz: ["EN-71 sertifikatlangan o‘yinchoqlar", "Buyurtma polimerlar"],
      ru: ["Игрушки стандарта EN-71", "Контрактные полимеры"],
      en: ["EN-71 Compliant Toys", "Custom Polymers"],
    },
    capacitySummary: {
      uz: "Yevropa Ittifoqi standartlari (EN-71, REACH) bo‘yicha eksport sinovlari va shartnomaviy muzokaralar.",
      ru: "Подготовка поставок по стандартам ЕС (EN-71, REACH) и экспортный аудит.",
      en: "Compliance audit, EN-71/REACH certification alignment and B2B distributor outreach.",
    },
  },
];

export const ExportCorridorMap: React.FC<ExportCorridorMapProps> = ({
  locale = "uz",
  onSelectCorridor,
}) => {
  const [activeCorridorId, setActiveCorridorId] = useState<string>("kz");

  const safeLocale = (locale as "uz" | "ru" | "en") || "uz";
  const activeCorridor =
    CORRIDORS.find((c) => c.id === activeCorridorId) || CORRIDORS[0];

  const i18n = {
    uz: {
      badge: "Xalqaro Logistika & Savdo Geografiyasi",
      hubName: "Toshkent Boshqaruv & Ishlab Chiqarish Markazi",
      hubDesc: "Toybola polimer zavodi, press-qoliplar ombori va eksport logistika terminali",
      sectorsHeading: "Asosiy eksport mahsulotlari",
      logisticsHeading: "Tranzit muddati",
      logisticsModeHeading: "Logistika shakli",
      capacityHeading: "Yetkazib berish quvvati va kafolati",
      ctaButton: "Ushbu yo‘nalish bo‘yicha arizani shakllantirish",
      note: "* Tanlangan eksport yo‘nalishi aloqa formasiga kiritiladi",
    },
    ru: {
      badge: "Международная Логистика & География Экспорта",
      hubName: "Ташкент: Центр Управления и Производства",
      hubDesc: "Завод полимеров Toybola, парк пресс-форм и экспортный терминал",
      sectorsHeading: "Экспортная номенклатура",
      logisticsHeading: "Сроки транзита",
      logisticsModeHeading: "Режим доставки",
      capacityHeading: "Гарантированные объемы поставок",
      ctaButton: "Подать заявку на экспорт в данный регион",
      note: "* Выбранное экспортное направление будет передано в форму запроса",
    },
    en: {
      badge: "International Logistics & Trade Geography",
      hubName: "Tashkent: Manufacturing & Operations Hub",
      hubDesc: "Toybola polymer plant, precision tooling facility and export terminal",
      sectorsHeading: "Export Product Nomenclature",
      logisticsHeading: "Transit Duration",
      logisticsModeHeading: "Logistics Framework",
      capacityHeading: "Contracted Supply Capacity",
      ctaButton: "Initiate B2B Export Inquiry for This Region",
      note: "* Selected corridor specs will populate the inquiry form below",
    },
  }[safeLocale];

  const handleInquiryClick = (corridor: CorridorNode) => {
    const specs = `[EXPORT INQUIRY] Region: ${corridor.name} (${corridor.code}) | Transit: ${corridor.transitTime[safeLocale]} | Mode: ${corridor.logisticsMode[safeLocale]}`;
    if (onSelectCorridor) {
      onSelectCorridor(corridor.id, specs);
    } else {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("prefill-b2b-inquiry", {
            detail: {
              topic: "coop",
              message: specs,
            },
          })
        );
        const contactSection = document.getElementById("aloqa");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="w-full bg-[#0E1015] border border-white/[0.08] rounded-[6px] p-6 sm:p-8 lg:p-10 flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              {i18n.badge}
            </span>
          </div>
          <h3 className="font-serif text-[22px] sm:text-[26px] font-semibold text-[#FAF9F5] tracking-tight leading-snug">
            {i18n.hubName}
          </h3>
          <p className="text-[13.5px] sm:text-[14px] text-[#9EA6B5] mt-1 max-w-[65ch]">
            {i18n.hubDesc}
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {REGION_TABS.map((tab) => {
            const isSelected = tab.id === activeCorridorId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCorridorId(tab.id)}
                className={`px-3.5 py-1.5 rounded-[4px] text-[12px] font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                  isSelected
                    ? "bg-[#D4AF37] text-[#090A0D] font-bold shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
                    : "bg-[#14161F] text-[#9EA6B5] hover:text-[#FAF9F5] hover:bg-white/[0.06] border border-white/[0.06]"
                }`}
              >
                {tab.label[safeLocale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Map on Left, Detailed Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left: Map */}
        <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[430px] lg:h-[490px] bg-[#090A0D] border border-white/[0.1] rounded-[6px] overflow-hidden shadow-inner">
          <MapLibreExportMap
            activeRegionId={activeCorridorId}
            onSelectRegion={setActiveCorridorId}
          />
        </div>

        {/* Right: Structured Spec Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[430px] lg:min-h-[490px] bg-[#12141A] border border-white/[0.1] rounded-[6px] p-6 sm:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCorridor.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5 h-full justify-between"
            >
              {/* Corridor Badge & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="font-mono text-[10.5px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    {activeCorridor.status[safeLocale]}
                  </span>
                </div>
                <h4 className="font-serif text-[20px] sm:text-[22px] font-semibold text-[#FAF9F5] leading-snug">
                  {activeCorridor.name}
                </h4>
                <p className="font-mono text-[11px] text-[#7A8290] mt-1">
                  {activeCorridor.code}
                </p>
              </div>

              {/* Logistics & Transit Specs */}
              <div className="grid grid-cols-2 gap-4 py-3.5 border-y border-white/[0.08]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A8290] block mb-1">
                    {i18n.logisticsHeading}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-[#FAF9F5] block">
                    {activeCorridor.transitTime[safeLocale]}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A8290] block mb-1">
                    {i18n.logisticsModeHeading}
                  </span>
                  <span className="font-sans text-[12.5px] text-[#CBD5E1] block">
                    {activeCorridor.logisticsMode[safeLocale]}
                  </span>
                </div>
              </div>

              {/* Primary Sectors */}
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                  {i18n.sectorsHeading}
                </span>
                <ul className="space-y-1.5">
                  {activeCorridor.primarySectors[safeLocale].map((sector, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2.5 text-[13px] text-[#C2C7D1]">
                      <span className="w-1 h-1 bg-[#D4AF37] rounded-full shrink-0" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supply Capacity Guarantee */}
              <div className="bg-white/[0.03] border-l-2 border-[#D4AF37] p-3 rounded-r-[3px]">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#7A8290] block mb-1">
                  {i18n.capacityHeading}
                </span>
                <p className="text-[12px] text-[#A8B0BE] leading-relaxed">
                  {activeCorridor.capacitySummary[safeLocale]}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleInquiryClick(activeCorridor)}
                  className="group py-3.5 px-5 rounded-[3px] bg-[#D4AF37] hover:bg-[#E5BE42] active:scale-[0.99] text-[#090A0D] font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <span>{i18n.ctaButton}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </button>
                <span className="text-[10px] font-mono text-[#7A8290] text-center">
                  {i18n.note}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
