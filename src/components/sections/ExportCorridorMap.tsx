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

const BUTTON_REGIONS = ["kz", "ru", "kg", "tj", "mena"];

const CORRIDORS: CorridorNode[] = [
  {
    id: "kz",
    name: "Qozog‘iston (Almati / Ostona)",
    country: "Kazakhstan",
    code: "KZ // CENTRAL HUB",
    status: {
      uz: "FAOL EKSPORT MARSHRUTI · YILLIK SHARTNOMA",
      ru: "ДЕЙСТВУЮЩИЙ ЭКСПОРТНЫЙ МАРШРУТ · ГОДОВОЙ КОНТРАКТ",
      en: "ACTIVE EXPORT CORRIDOR · ANNUAL CONTRACTS",
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
    code: "RU / CIS // SCALE CORRIDOR",
    status: {
      uz: "STRATEGIK OEM VA PRIVAT-LEYBL MARSHRUTI",
      ru: "СТРАТЕГИЧЕСКИЙ МАРШРУТ OEM И PRIVAT-LABEL",
      en: "STRATEGIC OEM & PRIVATE-LABEL ROUTE",
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
    code: "KG // NEIGHBOR MARKET",
    status: {
      uz: "MUNTZAM CHEGARAORQALI TA’MINOT",
      ru: "РЕГУЛЯРНЫЕ ТРАНСГРАНИЧНЫЕ ПОСТАВКИ",
      en: "REGULAR CROSS-BORDER DELIVERIES",
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
    code: "TJ // DIRECT HIGHWAY",
    status: {
      uz: "TO‘G‘RIDAN-TO‘G‘RI SHARTNOMAVIY TA’MINOT",
      ru: "ПРЯМЫЕ КОНТРАКТНЫЕ ПОСТАВКИ",
      en: "DIRECT CONTRACT REPLENISHMENT",
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
    code: "EU/MENA // STRATEGIC ALLIANCE",
    status: {
      uz: "B2B KOOPERATSIYA VA QOLIP LOYIHALARI (UZBIC)",
      ru: "B2B КООПЕРАЦИЯ И СОВМЕСТНЫЕ ПРОЕКТЫ (UZBIC)",
      en: "B2B ALLIANCES & TOOLING SOURCING (UZBIC)",
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
    code: "TM // TRANSIT CORRIDOR",
    status: {
      uz: "[REJA / PLACEHOLDER] MINTAQAVIY LOGISTIKA YO‘NALISHI",
      ru: "[ПЛАН / PLACEHOLDER] РЕГИОНАЛЬНЫЙ ЛОГИСТИЧЕСКИЙ МАРШРУТ",
      en: "[PLANNED / PLACEHOLDER] REGIONAL TRANSIT CORRIDOR",
    },
    transitTime: {
      uz: "[Placeholder] 2–4 kun (Avto FTL)",
      ru: "[Placeholder] 2–4 дня (Авто FTL)",
      en: "[Placeholder] 2–4 days (Road FTL)",
    },
    logisticsMode: {
      uz: "[Placeholder] Avto FTL / Tranzit yo‘lagi",
      ru: "[Placeholder] Авто FTL / Транзитный коридор",
      en: "[Placeholder] Road FTL / Direct Transit Corridor",
    },
    primarySectors: {
      uz: ["[Placeholder] Polimer buyumlar", "[Placeholder] Sanoat mahsulotlari"],
      ru: ["[Placeholder] Полимерные изделия", "[Placeholder] Промышленная продукция"],
      en: ["[Placeholder] Molded Polymers", "[Placeholder] Industrial Goods"],
    },
    capacitySummary: {
      uz: "[Placeholder] Mintaqaviy savdo kelishuvlari va logistika imkoniyatlari o‘rganilmoqda.",
      ru: "[Placeholder] Оценка региональных соглашений и пропускной способности маршрута.",
      en: "[Placeholder] Regional trade agreements and route capacity evaluation under development.",
    },
  },
  {
    id: "cn",
    name: "Xitoy (Urumchi / Shinjon)",
    country: "China",
    code: "CN // SOURCING & BILATERAL ROUTE",
    status: {
      uz: "[REJA / PLACEHOLDER] XOMASHYO VA TEXNOLOGIK KOOPERATSIYA",
      ru: "[ПЛАН / PLACEHOLDER] СЫРЬЕВОЙ И ТЕХНОЛОГИЧЕСКИЙ ОБМЕН",
      en: "[PLANNED / PLACEHOLDER] SOURCING & TOOLING CORRIDOR",
    },
    transitTime: {
      uz: "[Placeholder] 6–10 kun (Multimodal temir yo‘l/avto)",
      ru: "[Placeholder] 6–10 дней (Мультимодал ж/д и авто)",
      en: "[Placeholder] 6–10 days (Multimodal rail/road)",
    },
    logisticsMode: {
      uz: "[Placeholder] Blok-poyezdlar / TIR Karnet konteyner",
      ru: "[Placeholder] Блок-поезда / Контейнеры TIR Carnet",
      en: "[Placeholder] Block Trains / TIR Carnet Containers",
    },
    primarySectors: {
      uz: ["[Placeholder] Qoliplar va stanoklar importi", "[Placeholder] Polimer granulalar"],
      ru: ["[Placeholder] Пресс-формы и станки", "[Placeholder] Полимерное сырье"],
      en: ["[Placeholder] Precision Molds & Tooling", "[Placeholder] Raw Polymer Granules"],
    },
    capacitySummary: {
      uz: "[Placeholder] Sanoat uskunalari importi va ikki tomonlama logistika zanjiri loyihalari.",
      ru: "[Placeholder] Импорт оборудования и проекты двусторонней промышленной логистики.",
      en: "[Placeholder] Direct manufacturing equipment sourcing and bilateral logistics projects.",
    },
  },
  {
    id: "az",
    name: "Ozarbayjon (Boku / Kaspiy porti)",
    country: "Azerbaijan",
    code: "AZ // CASPIAN GATEWAY",
    status: {
      uz: "[REJA / PLACEHOLDER] TRANSKASPIY SAVDO YO‘LAGI",
      ru: "[ПЛАН / PLACEHOLDER] ТРАНСКАСПИЙСКИЙ ТОРГОВЫЙ КОРИДОР",
      en: "[PLANNED / PLACEHOLDER] TRANSCASPIAN TRADE GATEWAY",
    },
    transitTime: {
      uz: "[Placeholder] 4–7 kun (Parom / Avtotransport)",
      ru: "[Placeholder] 4–7 дней (Паром / Автотранспорт)",
      en: "[Placeholder] 4–7 days (Ro-Ro Ferry / Road FTL)",
    },
    logisticsMode: {
      uz: "[Placeholder] Kaspiy paromi / FTL avto",
      ru: "[Placeholder] Каспийский паром / FTL авто",
      en: "[Placeholder] Caspian Ro-Ro Ferry / Road FTL",
    },
    primarySectors: {
      uz: ["[Placeholder] Toybola o‘yinchoqlari", "[Placeholder] Maishiy polimerlar"],
      ru: ["[Placeholder] Игрушки Toybola", "[Placeholder] Бытовой пластик"],
      en: ["[Placeholder] Toybola Toys", "[Placeholder] Household Polymers"],
    },
    capacitySummary: {
      uz: "[Placeholder] Kavkaz mintaqasiga Kaspiy orqali yetkazib berish salohiyati.",
      ru: "[Placeholder] Потенциал поставок в страны Закавказья через Каспийский коридор.",
      en: "[Placeholder] Supply channel development towards South Caucasus markets via Caspian route.",
    },
  },
  {
    id: "eu",
    name: "Yevropa Ittifoqi (EU 27 Mamlakat)",
    country: "European Union",
    code: "EU // CE-CERTIFIED CORRIDOR",
    status: {
      uz: "[REJA / PLACEHOLDER] CE VA XALQARO STANDARTLAR YO‘NALISHI",
      ru: "[ПЛАН / PLACEHOLDER] НАПРАВЛЕНИЕ СЕРТИФИКАЦИИ CE И СТАНДАРТОВ ЕС",
      en: "[PLANNED / PLACEHOLDER] CE-CERTIFIED EXPORT CORRIDOR",
    },
    transitTime: {
      uz: "[Placeholder] 12–18 kun (Multimodal temir yo‘l/avto)",
      ru: "[Placeholder] 12–18 дней (Мультимодал ж/д и авто)",
      en: "[Placeholder] 12–18 days (Multimodal rail/road)",
    },
    logisticsMode: {
      uz: "[Placeholder] 40ft High-Cube konteynerlar / Xalqaro intermodal",
      ru: "[Placeholder] 40-футовые контейнеры / Интермодальный транзит",
      en: "[Placeholder] 40ft ISO High-Cube Containers / Intermodal",
    },
    primarySectors: {
      uz: ["[Placeholder] EN-71 sertifikatlangan o‘yinchoqlar", "[Placeholder] Buyurtma polimerlar"],
      ru: ["[Placeholder] Игрушки стандарта EN-71", "[Placeholder] Контрактные полимеры"],
      en: ["[Placeholder] EN-71 Compliant Toys", "[Placeholder] Custom Polymers"],
    },
    capacitySummary: {
      uz: "[Placeholder] Yevropa Ittifoqi standartlari (EN-71, REACH) bo‘yicha eksport sinovlari va shartnomaviy muzokaralar.",
      ru: "[Placeholder] Подготовка поставок по стандартам ЕС (EN-71, REACH) и экспортный аудит.",
      en: "[Placeholder] Compliance audit, EN-71/REACH certification alignment and B2B distributor outreach.",
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
      badge: "EKSPORT GEOGRAFIYASI // 2026 LOGISTIKA XARITASI",
      hubName: "Toshkent Boshqaruv & Ishlab Chiqarish Markazi",
      hubDesc: "Toybola polimer zavodi, press-qoliplar ombori va eksport logistika terminali",
      sectorsHeading: "Asosiy eksport nomenklaturasi",
      logisticsHeading: "Logistika va tranzit vaqti",
      capacityHeading: "Kafolatlangan yetkazib berish quvvati",
      ctaButton: "Ushbu yo‘nalish bo‘yicha eksport arizasi",
    },
    ru: {
      badge: "ГЕОГРАФИЯ ЭКСПОРТА // ЛОГИСТИЧЕСКАЯ КАРТА 2026",
      hubName: "Ташкент: Центр Управления и Производства",
      hubDesc: "Завод полимеров Toybola, парк пресс-форм и экспортный терминал",
      sectorsHeading: "Ключевая экспортная номенклатура",
      logisticsHeading: "Логистика и время в пути",
      capacityHeading: "Гарантированные объемы поставок",
      ctaButton: "Подать заявку на экспорт в данный регион",
    },
    en: {
      badge: "EXPORT CORRIDORS // 2026 LOGISTICS TELEMETRY",
      hubName: "Tashkent: Central Manufacturing & Operations Hub",
      hubDesc: "Toybola polymer plant, precision injection tooling facility, and export rail/road terminal",
      sectorsHeading: "Primary Export Sectors & SKU Lines",
      logisticsHeading: "Logistics & Freight Transit Time",
      capacityHeading: "Contracted Supply Capacity",
      ctaButton: "Initiate B2B Export Inquiry for This Corridor",
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
    <div className="w-full bg-[#0D0E12] border border-[rgba(212,175,55,0.22)] rounded-[2px] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#D4AF37] block mb-1">
            {i18n.badge}
          </span>
          <h3 className="text-[18px] sm:text-[22px] font-bold text-[#F5F4F0] leading-snug">
            {i18n.hubName}
          </h3>
          <p className="text-[12.5px] text-[#8E95A5] mt-0.5">
            {i18n.hubDesc}
          </p>
        </div>

        {/* Region Selector Pills (Fixed row: KZ, RU, KG, TJ, MENA) */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {BUTTON_REGIONS.map((btnId) => {
            const isSelected = btnId === activeCorridorId;
            return (
              <button
                key={btnId}
                type="button"
                onClick={() => setActiveCorridorId(btnId)}
                className={`relative px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.06em] rounded-[3px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer ${
                  isSelected
                    ? "text-[#090A0D]"
                    : "text-[#8E95A5] hover:text-[#F5F4F0]"
                }`}
              >
                {isSelected ? (
                  <motion.div
                    layoutId="activeCorridorPill"
                    className="absolute inset-0 bg-[#D4AF37] rounded-[3px] shadow-[0_0_14px_rgba(212,175,55,0.35)]"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#12141A] border border-white/[0.1] rounded-[3px]" />
                )}
                <span className="relative z-10">{btnId.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: MapLibre Geographic Map on Left, Detailed Telemetry Spec Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: MapLibre Interactive Geographic Map */}
        <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[430px] lg:h-[490px] bg-[#08090B] border border-[rgba(255,255,255,0.08)] rounded-[2px] overflow-hidden">
          <MapLibreExportMap
            activeRegionId={activeCorridorId}
            onSelectRegion={setActiveCorridorId}
          />
        </div>

        {/* Right: Structured Spec Card for Active Corridor */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[430px] lg:min-h-[490px] bg-[#111215] border border-[rgba(255,255,255,0.1)] rounded-[2px] p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCorridor.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {/* Corridor Badge & Title */}
              <div>
                <span className="inline-block font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.1em] px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-[2px] mb-2">
                  {activeCorridor.status[safeLocale]}
                </span>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-[#F5F4F0] leading-snug">
                  {activeCorridor.name}
                </h4>
                <p className="font-mono text-[11px] text-[#8E95A5] mt-0.5">
                  {activeCorridor.code}
                </p>
              </div>

              {/* Primary Sectors */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#8E95A5] block mb-1.5">
                  {i18n.sectorsHeading}
                </span>
                <ul className="space-y-1">
                  {activeCorridor.primarySectors[safeLocale].map((sector, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-[12.5px] text-[#C2C7D1]">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logistics & Transit Specs */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-2 gap-3">
                <div>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#8E95A5] block">
                    {i18n.logisticsHeading}
                  </span>
                  <span className="text-[12.5px] font-semibold text-[#F5F4F0] block mt-0.5">
                    {activeCorridor.transitTime[safeLocale]}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#8E95A5] block">
                    Rejim
                  </span>
                  <span className="text-[12px] text-[#C2C7D1] block mt-0.5">
                    {activeCorridor.logisticsMode[safeLocale]}
                  </span>
                </div>
              </div>

              {/* Supply Capacity */}
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#8E95A5] block mb-1">
                  {i18n.capacityHeading}
                </span>
                <p className="text-[12px] text-[#A1A7B3] leading-relaxed">
                  {activeCorridor.capacitySummary[safeLocale]}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  type="button"
                  onClick={() => handleInquiryClick(activeCorridor)}
                  className="w-full py-2.5 px-4 rounded-[2px] bg-[#D4AF37] hover:bg-[#E5BE42] active:scale-[0.99] text-[#090A0D] font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
                >
                  <span>{i18n.ctaButton}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
