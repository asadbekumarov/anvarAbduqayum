"use client";

import React, { useState, useMemo } from "react";
import { getContent } from "@/config/content";

export interface OemConfiguratorProps {
  locale?: string;
  onPassSpecs?: (specsText: string) => void;
}

type SectorKey = "plastic" | "toys" | "equipment" | "horeca";
type ModelKey = "distribution" | "oem" | "jv";
type ScaleKey = "wholesale" | "ftl" | "contract";

interface StepOption<T extends string> {
  id: T;
  label: {
    uz: string;
    ru: string;
    en: string;
  };
  desc: {
    uz: string;
    ru: string;
    en: string;
  };
  badge?: string;
}

export const OemConfigurator: React.FC<OemConfiguratorProps> = ({
  locale = "uz",
  onPassSpecs,
}) => {
  const safeLocale = (locale as "uz" | "ru" | "en") || "uz";
  const content = getContent(safeLocale);
  const companies = useMemo(
    () => content.portfolio?.companies || [],
    [content.portfolio?.companies]
  );

  const [selectedSector, setSelectedSector] = useState<SectorKey>("toys");
  const [selectedModel, setSelectedModel] = useState<ModelKey>("oem");
  const [selectedScale, setSelectedScale] = useState<ScaleKey>("ftl");

  // Step 1: Sectors
  const SECTOR_OPTIONS: StepOption<SectorKey>[] = [
    {
      id: "toys",
      label: {
        uz: "Bolalar o‘yinchoqlari (Toybola)",
        ru: "Детские игрушки (Toybola)",
        en: "Toy Manufacturing (Toybola)",
      },
      desc: {
        uz: "Rivojlantiruvchi to‘plamlar, transport va o‘yinchoqlar seriyasi",
        ru: "Развивающие наборы, транспорт и детские игровые серии",
        en: "Certified educational playsets, ride-ons & creative series",
      },
      badge: "SKU 100+",
    },
    {
      id: "plastic",
      label: {
        uz: "Plastik quyish va Press-qoliplar",
        ru: "Литье пластика и пресс-формы",
        en: "Plastic Injection & Molding",
      },
      desc: {
        uz: "Yuqori aniqlikdagi muhandislik polimerlari va xususiy qoliplar",
        ru: "Высокоточное литье под давлением и изготовление пресс-форм",
        en: "Precision injection molding & proprietary tooling engineering",
      },
      badge: "ISO // CERTIFIED",
    },
    {
      id: "equipment",
      label: {
        uz: "Sanoat uskunalari va Texnologiya",
        ru: "Промышленное оборудование",
        en: "Industrial Equipment & Tooling",
      },
      desc: {
        uz: "Xitoy va Yevropadan keltirilgan stanoklar hamda avtomatlashtirish",
        ru: "Станочный парк, термопластавтоматы и автоматизация",
        en: "Machinery, injection press machines & factory automation",
      },
      badge: "UZBIC // B2B",
    },
    {
      id: "horeca",
      label: {
        uz: "HoReCa va Oziq-ovqat ta’minoti",
        ru: "HoReCa и B2B Поставки",
        en: "HoReCa & Hospitality Supply",
      },
      desc: {
        uz: "AFIYET va PURO standartlari asosidagi retseptura va xizmat ta’minoti",
        ru: "Стандарты сетей AFIYET и PURO, кулинарные техкарты и поставки",
        en: "Standardized food-tech supply, SOP recipes & kitchen hardware",
      },
      badge: "HORECA",
    },
  ];

  // Step 2: Partnership Models
  const MODEL_OPTIONS: StepOption<ModelKey>[] = [
    {
      id: "oem",
      label: {
        uz: "OEM & Privat-Leybl (O‘z brendingizda)",
        ru: "OEM & Privat-Label (Под вашим брендом)",
        en: "OEM & Private Label Manufacturing",
      },
      desc: {
        uz: "Mavjud press-qoliplarimiz yoki yangi qolip ishlab chiqish asosida tayyor mahsulot",
        ru: "Выпуск продукции под брендом заказчика на нашей производственной базе",
        en: "Contract manufacturing using existing tooling or custom mold fabrication",
      },
      badge: "ENG OMMABOP",
    },
    {
      id: "distribution",
      label: {
        uz: "Eksport Distribyutsiyasi (Toybola)",
        ru: "Экспортная дистрибьюция",
        en: "Export Wholesale Distribution",
      },
      desc: {
        uz: "Belgilangan hududda Toybola rasmiy distribyutori maqomini olish",
        ru: "Статус официального торгового представителя в вашем регионе",
        en: "Exclusive or regional distribution rights with certified factory margins",
      },
      badge: "DIRECT",
    },
    {
      id: "jv",
      label: {
        uz: "Qo‘shma korxona (Joint Venture)",
        ru: "Совместное предприятие (JV)",
        en: "Joint Venture & Localization",
      },
      desc: {
        uz: "Mahalliy bozorga qoliplar va ishlab chiqarish quvvatlarini integratsiya qilish",
        ru: "Совместные инвестиции, запуск локализованных производственных линий",
        en: "Shared facility investment & technology transfer via UZBIC framework",
      },
      badge: "STRATEGIC",
    },
  ];

  // Step 3: Order Scale
  const SCALE_OPTIONS: StepOption<ScaleKey>[] = [
    {
      id: "wholesale",
      label: {
        uz: "Mintaqaviy Ulgurji (LTL / Pallet)",
        ru: "Региональный опт (LTL / Паллеты)",
        en: "Regional Wholesale (LTL / Pallets)",
      },
      desc: {
        uz: "Sinov partiyalari va do‘konlar tarmog‘i uchun tezkor ta’minot",
        ru: "Тестовые партии и сборные поставки для торговых сетей",
        en: "Trial volume batches & consolidated pallet replenishment",
      },
      badge: "1–5 PALLETS",
    },
    {
      id: "ftl",
      label: {
        uz: "Konteyner & Fura (FTL / 40ft ISO)",
        ru: "Контейнерные партии (FTL / 40ft)",
        en: "Container & Full Truckload (FTL)",
      },
      desc: {
        uz: "Yirik ulgurji eksport partiyalari (20ft / 40ft konteyner yoki Yevrofura)",
        ru: "Крупнооптовые партии еврофурами и 40-футовыми контейнерами",
        en: "Full truckload and high-cube 40ft containerized freight",
      },
      badge: "40ft / 20T",
    },
    {
      id: "contract",
      label: {
        uz: "Uzoq muddatli yillik kontrakt",
        ru: "Долгосрочный годовой контракт",
        en: "Long-Term Annual Supply Contract",
      },
      desc: {
        uz: "Zavod ishlab chiqarish quvvatini oldindan band qilish va maxsus narxlar",
        ru: "Бронирование производственных смен и календарный график поставок",
        en: "Dedicated factory line allocation with guaranteed production slots",
      },
      badge: "ANNUAL",
    },
  ];

  // Matched Company from Verified Portfolio
  const matchedCompany = useMemo(() => {
    if (selectedSector === "toys") {
      return companies.find((c) => c.id === "toy-bola") || companies[0];
    }
    if (selectedSector === "plastic") {
      return (
        companies.find((c) => c.id === "toy-bola" || c.id === "samtech") ||
        companies[0]
      );
    }
    if (selectedSector === "horeca") {
      return companies.find((c) => c.id === "afiyet" || c.id === "puro") || companies[0];
    }
    return companies.find((c) => c.id === "uzbic") || companies[0];
  }, [selectedSector, companies]);

  // Selected Option Objects
  const currentSectorObj = SECTOR_OPTIONS.find((s) => s.id === selectedSector)!;
  const currentModelObj = MODEL_OPTIONS.find((m) => m.id === selectedModel)!;
  const currentScaleObj = SCALE_OPTIONS.find((sc) => sc.id === selectedScale)!;

  const i18n = {
    uz: {
      badge: "B2B KONFIGURATOR // SANOAT QUVVATI VA BUYURTMA PARAMETRLARI",
      title: "OEM & Eksport Ishlab Chiqarish Parametrlari",
      subtitle: "Kerakli sanoat tarmog‘i, hamkorlik modeli va buyurtma ko‘lamini tanlang",
      step1: "01. Sanoat tarmog‘i",
      step2: "02. Hamkorlik formati",
      step3: "03. Buyurtma masshtabi",
      specSummaryTitle: "Konfiguratsiya xulosasi & Boshqaruv korxonasi",
      matchedAsset: "Ijrochi sanoat aktivi:",
      leadTimeLabel: "Ishlab chiqarish muddati:",
      leadTimeVal: "10–25 ish kuni (mavjud qolip) / 45 kun (yangi qolip)",
      moqLabel: "Minimal buyurtma miqdori (MOQ):",
      moqVal: selectedScale === "wholesale" ? "5 000 birlik" : selectedScale === "ftl" ? "20 000+ birlik" : "50 000+ yillik",
      passButton: "Xususiyatlarni B2B arizaga o‘tkazish",
      passedNotification: "Xususiyatlar aloqa formasi bilan bog‘landi",
    },
    ru: {
      badge: "B2B КОНФИГУРАТОР // ПРОИЗВОДСТВЕННЫЕ МОЩНОСТИ",
      title: "Конфигуратор OEM и Экспортных Поставок",
      subtitle: "Выберите отрасль, формат партнерства и планируемый масштаб заказа",
      step1: "01. Отрасль производства",
      step2: "02. Формат партнерства",
      step3: "03. Масштаб поставки",
      specSummaryTitle: "Сводка параметров & Завод-исполнитель",
      matchedAsset: "Производственный актив:",
      leadTimeLabel: "Сроки изготовления:",
      leadTimeVal: "10–25 рабочих дней (готовая пресс-форма) / 45 дней (новая)",
      moqLabel: "Минимальный объем (MOQ):",
      moqVal: selectedScale === "wholesale" ? "5 000 шт" : selectedScale === "ftl" ? "20 000+ шт" : "50 000+ годовой",
      passButton: "Передать спецификацию в форму заявки",
      passedNotification: "Спецификация передана в форму",
    },
    en: {
      badge: "B2B CAPACITY CONFIGURATOR // MANUFACTURING TELEMETRY",
      title: "OEM & Export Manufacturing Capacity Configurator",
      subtitle: "Select your industry sector, partnership framework, and target delivery volume",
      step1: "01. Industrial Sector",
      step2: "02. Partnership Model",
      step3: "03. Order Volume Scale",
      specSummaryTitle: "Configuration Specs & Operational Facility",
      matchedAsset: "Operating Enterprise:",
      leadTimeLabel: "Tooling & Production Lead Time:",
      leadTimeVal: "10–25 business days (existing mold) / 45 days (new tooling tooling fabrication)",
      moqLabel: "Minimum Order Quantity (MOQ):",
      moqVal: selectedScale === "wholesale" ? "5,000 units" : selectedScale === "ftl" ? "20,000+ units" : "50,000+ annual reserve",
      passButton: "Pass Specs to B2B Application",
      passedNotification: "Specs populated into contact form",
    },
  }[safeLocale];

  const handlePassSpecs = () => {
    const specsString = `[OEM/B2B CAPACITY SPECS]
• Sector: ${currentSectorObj.label[safeLocale]}
• Model: ${currentModelObj.label[safeLocale]}
• Scale: ${currentScaleObj.label[safeLocale]}
• Primary Facility: ${matchedCompany?.name || "Toybola / Visage Electric"}
• Estimated MOQ: ${i18n.moqVal}
• Expected Lead Time: ${i18n.leadTimeVal}`;

    if (onPassSpecs) {
      onPassSpecs(specsString);
    } else {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("prefill-b2b-inquiry", {
            detail: {
              topic: "coop",
              message: specsString,
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
      {/* Header */}
      <div className="pb-4 border-b border-[rgba(255,255,255,0.08)]">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#D4AF37] block mb-1">
          {i18n.badge}
        </span>
        <h3 className="text-[18px] sm:text-[22px] font-bold text-[#F5F4F0] leading-snug">
          {i18n.title}
        </h3>
        <p className="text-[12.5px] text-[#8E95A5] mt-0.5">
          {i18n.subtitle}
        </p>
      </div>

      {/* 3-Step Horizontal Selector Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step 1: Sector */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#D4AF37] flex items-center justify-between">
            <span>{i18n.step1}</span>
            <span className="text-[9.5px] text-[#8E95A5]">4 OPTIONS</span>
          </span>
          <div className="flex flex-col gap-1.5">
            {SECTOR_OPTIONS.map((opt) => {
              const isSelected = selectedSector === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedSector(opt.id)}
                  className={`w-full text-left p-3 rounded-[2px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[rgba(212,175,55,0.12)] border-[#D4AF37] text-[#F5F4F0]"
                      : "bg-[#111215] border-[rgba(255,255,255,0.08)] text-[#8E95A5] hover:border-[rgba(255,255,255,0.2)] hover:text-[#C2C7D1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[12.5px] font-semibold ${isSelected ? "text-[#D4AF37]" : "text-[#F5F4F0]"}`}>
                      {opt.label[safeLocale]}
                    </span>
                    {opt.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.06em] px-1 py-0.5 rounded-[2px] bg-[#090A0D] text-[#8E95A5] border border-[rgba(255,255,255,0.08)]">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8E95A5] mt-1 leading-normal line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Partnership Model */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#D4AF37] flex items-center justify-between">
            <span>{i18n.step2}</span>
            <span className="text-[9.5px] text-[#8E95A5]">3 MODELS</span>
          </span>
          <div className="flex flex-col gap-1.5">
            {MODEL_OPTIONS.map((opt) => {
              const isSelected = selectedModel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedModel(opt.id)}
                  className={`w-full text-left p-3 rounded-[2px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[rgba(212,175,55,0.12)] border-[#D4AF37] text-[#F5F4F0]"
                      : "bg-[#111215] border-[rgba(255,255,255,0.08)] text-[#8E95A5] hover:border-[rgba(255,255,255,0.2)] hover:text-[#C2C7D1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[12.5px] font-semibold ${isSelected ? "text-[#D4AF37]" : "text-[#F5F4F0]"}`}>
                      {opt.label[safeLocale]}
                    </span>
                    {opt.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.06em] px-1 py-0.5 rounded-[2px] bg-[#090A0D] text-[#D4AF37] border border-[#D4AF37]/30">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8E95A5] mt-1 leading-normal line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Order Scale */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#D4AF37] flex items-center justify-between">
            <span>{i18n.step3}</span>
            <span className="text-[9.5px] text-[#8E95A5]">3 TIERS</span>
          </span>
          <div className="flex flex-col gap-1.5">
            {SCALE_OPTIONS.map((opt) => {
              const isSelected = selectedScale === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedScale(opt.id)}
                  className={`w-full text-left p-3 rounded-[2px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[rgba(212,175,55,0.12)] border-[#D4AF37] text-[#F5F4F0]"
                      : "bg-[#111215] border-[rgba(255,255,255,0.08)] text-[#8E95A5] hover:border-[rgba(255,255,255,0.2)] hover:text-[#C2C7D1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[12.5px] font-semibold ${isSelected ? "text-[#D4AF37]" : "text-[#F5F4F0]"}`}>
                      {opt.label[safeLocale]}
                    </span>
                    {opt.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.06em] px-1 py-0.5 rounded-[2px] bg-[#090A0D] text-[#8E95A5] border border-[rgba(255,255,255,0.08)]">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8E95A5] mt-1 leading-normal line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Summary Specification Card */}
      <div className="bg-[#111215] border border-[rgba(212,175,55,0.25)] rounded-[2px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.1em]">
              {i18n.specSummaryTitle}
            </span>
            <span className="font-mono text-[10px] text-[#8E95A5]">· 2026 AUDITED</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px]">
            <span className="text-[#8E95A5]">{i18n.matchedAsset}</span>
            <span className="font-bold text-[#F5F4F0] flex items-center gap-1.5">
              <span>{matchedCompany?.name || "Toybola"}</span>
              <span className="font-mono text-[10.5px] text-[#D4AF37] font-normal">[{matchedCompany?.code}]</span>
            </span>
            <span className="text-[#8E95A5] hidden sm:inline">|</span>
            <span className="text-[#8E95A5]">{i18n.moqLabel}</span>
            <span className="font-semibold text-[#D4AF37]">{i18n.moqVal}</span>
          </div>

          <div className="text-[11.5px] text-[#8E95A5] font-mono">
            <span>{i18n.leadTimeLabel} </span>
            <span className="text-[#C2C7D1]">{i18n.leadTimeVal}</span>
          </div>
        </div>

        {/* CTA: Pass Specs to Contact Form */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={handlePassSpecs}
            className="w-full sm:w-auto py-2.5 px-5 rounded-[2px] bg-[#D4AF37] hover:bg-[#E5BE42] active:scale-[0.99] text-[#090A0D] font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <span>{i18n.passButton}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

