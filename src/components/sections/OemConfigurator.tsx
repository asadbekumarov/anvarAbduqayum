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
        uz: "Bolalar o‘yinchoqlari (Toybola zavodi)",
        ru: "Детские игрушки (Завод Toybola)",
        en: "Toy Manufacturing (Toybola Plant)",
      },
      desc: {
        uz: "Rivojlantiruvchi to‘plamlar, transport vositalari va bolalar o‘yinchoqlari",
        ru: "Развивающие наборы, транспорт и детские игровые серии",
        en: "Certified educational playsets, ride-ons & creative series",
      },
      badge: "Toybola",
    },
    {
      id: "plastic",
      label: {
        uz: "Polimer quyish va Press-qoliplar",
        ru: "Литье пластика и пресс-формы",
        en: "Plastic Injection & Mold Tooling",
      },
      desc: {
        uz: "Yuqori aniqlikdagi muhandislik polimerlari va maxsus qoliplar ishlab chiqarish",
        ru: "Высокоточное литье под давлением и изготовление пресс-форм",
        en: "Precision injection molding & proprietary tooling engineering",
      },
      badge: "Sanoat",
    },
    {
      id: "equipment",
      label: {
        uz: "Sanoat uskunalari va Stanoklar",
        ru: "Промышленное оборудование",
        en: "Industrial Equipment & Tooling",
      },
      desc: {
        uz: "Termoplastavtomatlar, qoliplar parki va zavod avtomatizatsiyasi",
        ru: "Станочный парк, термопластавтоматы и автоматизация",
        en: "Machinery, injection press machines & factory automation",
      },
      badge: "UZBIC",
    },
    {
      id: "horeca",
      label: {
        uz: "HoReCa va Oziq-ovqat ta’minoti",
        ru: "HoReCa и B2B Поставки",
        en: "HoReCa & Hospitality Supply",
      },
      desc: {
        uz: "AFIYET va PURO tarmoqlari standartidagi texnologik xaritalar va xizmat",
        ru: "Стандарты сетей AFIYET и PURO, кулинарные техкарты и поставки",
        en: "Standardized food-tech supply, SOP recipes & kitchen hardware",
      },
      badge: "HoReCa",
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
      badge: "Eng ommabop",
    },
    {
      id: "distribution",
      label: {
        uz: "Eksport Distribyutsiyasi",
        ru: "Экспортная дистрибьюция",
        en: "Export Wholesale Distribution",
      },
      desc: {
        uz: "Belgilangan xorijiy hududda rasmiy distribyutorlik maqomini olish",
        ru: "Статус официального торгового представителя в вашем регионе",
        en: "Exclusive or regional distribution rights with certified factory margins",
      },
      badge: "Distribyutsiya",
    },
    {
      id: "jv",
      label: {
        uz: "Qo‘shma korxona (Joint Venture)",
        ru: "Совместное предприятие (JV)",
        en: "Joint Venture & Localization",
      },
      desc: {
        uz: "Ishlab chiqarish quvvatlarini birgalikda kengaytirish va lokalizatsiya",
        ru: "Совместные инвестиции, запуск локализованных производственных линий",
        en: "Shared facility investment & technology transfer via UZBIC framework",
      },
      badge: "Strategik",
    },
  ];

  // Step 3: Order Scale
  const SCALE_OPTIONS: StepOption<ScaleKey>[] = [
    {
      id: "wholesale",
      label: {
        uz: "Mintaqaviy Ulgurji (1–5 Palleta)",
        ru: "Региональный опт (1–5 Паллет)",
        en: "Regional Wholesale (1–5 Pallets)",
      },
      desc: {
        uz: "Sinov partiyalari va savdo tarmoqlari uchun tezkor ta’minot",
        ru: "Тестовые партии и сборные поставки для торговых сетей",
        en: "Trial volume batches & consolidated pallet replenishment",
      },
      badge: "LTL Partiya",
    },
    {
      id: "ftl",
      label: {
        uz: "Konteyner & Fura (40ft / FTL)",
        ru: "Контейнерные партии (FTL / 40ft)",
        en: "Container & Full Truckload (FTL)",
      },
      desc: {
        uz: "Yirik ulgurji eksport partiyalari (20ft / 40ft konteyner yoki Yevrofura)",
        ru: "Крупнооптовые партии еврофурами и 40-футовыми контейнерами",
        en: "Full truckload and high-cube 40ft containerized freight",
      },
      badge: "FTL Eksport",
    },
    {
      id: "contract",
      label: {
        uz: "Yillik kafolatlangan kontrakt",
        ru: "Долгосрочный годовой контракт",
        en: "Long-Term Annual Supply Contract",
      },
      desc: {
        uz: "Zavod ishlab chiqarish quvvatini oldindan band qilish va kafolatlangan taqvim",
        ru: "Бронирование производственных смен и календарный график поставок",
        en: "Dedicated factory line allocation with guaranteed production slots",
      },
      badge: "Yillik reja",
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
      badge: "B2B & OEM Sanoat Hamkorligi",
      title: "Sanoat Quvvati va Buyurtma Spetsifikatsiyasi",
      subtitle: "Kerakli sanoat tarmog‘i, hamkorlik shakli va rejalashtirilgan hajm parametrlarini belgilang.",
      step1: "01 // Sanoat tarmog‘i",
      step2: "02 // Hamkorlik shakli",
      step3: "03 // Buyurtma ko‘lami",
      specSummaryTitle: "B2B Sanoat Spetsifikatsiyasi",
      facilityLabel: "Ijrochi korxona:",
      moqLabel: "Minimal hajm (MOQ):",
      leadTimeLabel: "Ishlab chiqarish muddati:",
      leadTimeVal: "10–25 ish kuni (mavjud qolip) / 45 kun (yangi qolip)",
      moqVal: selectedScale === "wholesale" ? "5 000 birlik" : selectedScale === "ftl" ? "20 000+ birlik" : "50 000+ yillik",
      passButton: "Spetsifikatsiyani arizaga yuklash",
      passedNotification: "Xususiyatlar aloqa formasi bilan bog‘landi",
      note: "* Parametrlar sahifaning pastidagi rasmiy aloqa formasiga avtomatik biriktiriladi",
    },
    ru: {
      badge: "B2B & OEM Сотрудничество",
      title: "Производственные мощности и спецификация заказа",
      subtitle: "Выберите отрасль производства, формат контрактного партнерства и планируемый объем поставки.",
      step1: "01 // Отрасль производства",
      step2: "02 // Модель партнерства",
      step3: "03 // Объем и масштаб",
      specSummaryTitle: "B2B Производственная спецификация",
      facilityLabel: "Производственный актив:",
      moqLabel: "Минимальный объем (MOQ):",
      leadTimeLabel: "Сроки производства:",
      leadTimeVal: "10–25 рабочих дней (готовая пресс-форма) / 45 дней (новая)",
      moqVal: selectedScale === "wholesale" ? "5 000 шт" : selectedScale === "ftl" ? "20 000+ шт" : "50 000+ годовой",
      passButton: "Передать спецификацию в заявку",
      passedNotification: "Спецификация передана в форму",
      note: "* Спецификация автоматически заполнит форму запроса внизу страницы",
    },
    en: {
      badge: "B2B & OEM Manufacturing",
      title: "Industrial Capacity & Order Specification",
      subtitle: "Select your target industrial sector, partnership model, and estimated delivery volume.",
      step1: "01 // Industrial Sector",
      step2: "02 // Partnership Model",
      step3: "03 // Order Volume Scale",
      specSummaryTitle: "B2B Manufacturing Specification",
      facilityLabel: "Operating Enterprise:",
      moqLabel: "Minimum Order Quantity (MOQ):",
      leadTimeLabel: "Production Lead Time:",
      leadTimeVal: "10–25 business days (existing mold) / 45 days (new tooling fabrication)",
      moqVal: selectedScale === "wholesale" ? "5,000 units" : selectedScale === "ftl" ? "20,000+ units" : "50,000+ annual reserve",
      passButton: "Transfer Specs to Application",
      passedNotification: "Specs populated into contact form",
      note: "* Parameters will automatically prefill the inquiry form below",
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
    <div className="w-full bg-[#0E1015] border border-white/[0.08] rounded-[6px] p-6 sm:p-8 lg:p-10 flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-5 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            {i18n.badge}
          </span>
        </div>
        <h3 className="font-serif text-[22px] sm:text-[26px] font-semibold text-[#FAF9F5] tracking-tight leading-snug">
          {i18n.title}
        </h3>
        <p className="text-[13.5px] sm:text-[14px] text-[#9EA6B5] mt-1 max-w-[65ch]">
          {i18n.subtitle}
        </p>
      </div>

      {/* 3-Step Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
        {/* Step 1: Sector */}
        <div className="flex flex-col gap-3">
          <div className="pb-2 border-b border-white/[0.08]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              {i18n.step1}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {SECTOR_OPTIONS.map((opt) => {
              const isSelected = selectedSector === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedSector(opt.id)}
                  className={`w-full text-left p-4 rounded-[4px] border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[#161822] border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.12)]"
                      : "bg-[#101217] border-white/[0.07] hover:border-white/20 hover:bg-[#13151D]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-[#D4AF37] bg-[#D4AF37]/20" : "border-white/25 bg-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                      </span>
                      <span className={`text-[13.5px] font-medium leading-snug ${isSelected ? "text-[#FAF9F5]" : "text-[#C2C7D1]"}`}>
                        {opt.label[safeLocale]}
                      </span>
                    </div>
                    {opt.badge && (
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] text-[#8E95A5] border border-white/[0.06] shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#8E95A5] mt-2 pl-6 leading-relaxed line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Partnership Model */}
        <div className="flex flex-col gap-3">
          <div className="pb-2 border-b border-white/[0.08]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              {i18n.step2}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {MODEL_OPTIONS.map((opt) => {
              const isSelected = selectedModel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedModel(opt.id)}
                  className={`w-full text-left p-4 rounded-[4px] border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[#161822] border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.12)]"
                      : "bg-[#101217] border-white/[0.07] hover:border-white/20 hover:bg-[#13151D]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-[#D4AF37] bg-[#D4AF37]/20" : "border-white/25 bg-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                      </span>
                      <span className={`text-[13.5px] font-medium leading-snug ${isSelected ? "text-[#FAF9F5]" : "text-[#C2C7D1]"}`}>
                        {opt.label[safeLocale]}
                      </span>
                    </div>
                    {opt.badge && (
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#8E95A5] mt-2 pl-6 leading-relaxed line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Order Scale */}
        <div className="flex flex-col gap-3">
          <div className="pb-2 border-b border-white/[0.08]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              {i18n.step3}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {SCALE_OPTIONS.map((opt) => {
              const isSelected = selectedScale === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedScale(opt.id)}
                  className={`w-full text-left p-4 rounded-[4px] border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? "bg-[#161822] border-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.12)]"
                      : "bg-[#101217] border-white/[0.07] hover:border-white/20 hover:bg-[#13151D]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-[#D4AF37] bg-[#D4AF37]/20" : "border-white/25 bg-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                      </span>
                      <span className={`text-[13.5px] font-medium leading-snug ${isSelected ? "text-[#FAF9F5]" : "text-[#C2C7D1]"}`}>
                        {opt.label[safeLocale]}
                      </span>
                    </div>
                    {opt.badge && (
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] text-[#8E95A5] border border-white/[0.06] shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#8E95A5] mt-2 pl-6 leading-relaxed line-clamp-2">
                    {opt.desc[safeLocale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Summary Specification Card: Executive Passport Format */}
      <div className="bg-[#12141A] border border-white/[0.1] rounded-[6px] p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-7">
          {/* Block 1 */}
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] block mb-1">
              {i18n.facilityLabel}
            </span>
            <h4 className="font-serif text-[17px] font-semibold text-[#FAF9F5] leading-snug">
              {matchedCompany?.name || "Toybola zavodi"}
            </h4>
            <p className="text-[12px] text-[#8E95A5] mt-1">
              {currentSectorObj.label[safeLocale]}
            </p>
          </div>

          {/* Block 2 */}
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] block mb-1">
              {i18n.moqLabel}
            </span>
            <h4 className="font-sans text-[16px] font-semibold text-[#FAF9F5] leading-snug">
              {i18n.moqVal}
            </h4>
            <p className="text-[12px] text-[#8E95A5] mt-1">
              {currentModelObj.label[safeLocale].split("(")[0].trim()}
            </p>
          </div>

          {/* Block 3 */}
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] block mb-1">
              {i18n.leadTimeLabel}
            </span>
            <h4 className="font-sans text-[14px] font-medium text-[#FAF9F5] leading-snug">
              {i18n.leadTimeVal}
            </h4>
            <p className="text-[12px] text-[#8E95A5] mt-1">
              {currentScaleObj.label[safeLocale].split("(")[0].trim()}
            </p>
          </div>
        </div>

        {/* CTA: Pass Specs to Contact Form */}
        <div className="shrink-0 flex flex-col gap-2">
          <button
            type="button"
            onClick={handlePassSpecs}
            className="group py-3.5 px-6 rounded-[3px] bg-[#D4AF37] hover:bg-[#E5BE42] active:scale-[0.99] text-[#090A0D] font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <span>{i18n.passButton}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>
          <span className="text-[10.5px] font-mono text-[#7A8290] text-center lg:text-left">
            {i18n.note}
          </span>
        </div>
      </div>
    </div>
  );
};

