"use client";

import React, { useState, useMemo } from "react";
import { getContent } from "@/config/content";

export interface OemConfiguratorProps {
  locale?: string;
  onPassSpecs?: (specsText: string) => void;
}

type SectorKey = "toys" | "plastic" | "equipment" | "horeca";
type ModelKey = "existing_mold" | "custom_tooling" | "wholesale";
type ScaleKey = "trial" | "ftl" | "annual";

interface SectorData {
  id: SectorKey;
  title: { uz: string; ru: string; en: string };
  subtitle: { uz: string; ru: string; en: string };
  plant: { uz: string; ru: string; en: string };
  materials: { uz: string; ru: string; en: string };
  capabilities: { uz: string; ru: string; en: string };
}

interface ModelData {
  id: ModelKey;
  title: { uz: string; ru: string; en: string };
  desc: { uz: string; ru: string; en: string };
  timeModifier: { uz: string; ru: string; en: string };
  toolingNote: { uz: string; ru: string; en: string };
}

interface ScaleData {
  id: ScaleKey;
  title: { uz: string; ru: string; en: string };
  volumeLabel: { uz: string; ru: string; en: string };
  moq: { uz: string; ru: string; en: string };
  logistics: { uz: string; ru: string; en: string };
  priceBenefit: { uz: string; ru: string; en: string };
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
  const [selectedModel, setSelectedModel] = useState<ModelKey>("existing_mold");
  const [selectedScale, setSelectedScale] = useState<ScaleKey>("ftl");
  const [isCopied, setIsCopied] = useState(false);

  // 1. Sanoat yo'nalishlari
  const SECTORS: SectorData[] = [
    {
      id: "toys",
      title: {
        uz: "Bolalar o‘yinchoqlari va buyumlari",
        ru: "Детские игрушки и развивающие товары",
        en: "Children's Toys & Developmental Sets",
      },
      subtitle: {
        uz: "Ekologik toza plastik o‘yinchoqlar, konstruktorlar va transport seriyalari",
        ru: "Экологичный пластик, конструкторы и транспортные серии",
        en: "Certified non-toxic plastic playsets, ride-ons and constructions",
      },
      plant: {
        uz: "Toybola Toys zavodi (Visage Electric MCHJ)",
        ru: "Завод Toybola Toys (ООО Visage Electric)",
        en: "Toybola Toys Plant (Visage Electric LLC)",
      },
      materials: {
        uz: "Oziq-ovqat toifasidagi PP, PE, ABS (BPA-free)",
        ru: "Пищевой пластик PP, PE, ABS (без BPA)",
        en: "Food-grade PP, PE, ABS (BPA-free)",
      },
      capabilities: {
        uz: "Oylik 100 000+ dona tayyor mahsulot quvvati",
        ru: "Мощность 100 000+ единиц готовой продукции в месяц",
        en: "Monthly capacity 100,000+ finished units",
      },
    },
    {
      id: "plastic",
      title: {
        uz: "Muhandislik polimerlari va Press-qoliplar",
        ru: "Инженерные полимеры и пресс-формы",
        en: "Industrial Plastics & Mold Tooling",
      },
      subtitle: {
        uz: "Sanoat qismlari, maishiy texnika korpuslari va maxsus press-qoliplar",
        ru: "Промышленные детали, корпуса техники и прецизионные пресс-формы",
        en: "Industrial components, appliance casings & precision injection molds",
      },
      plant: {
        uz: "SamTech & Polimer sanoat majmuasi",
        ru: "Промышленный комплекс SamTech & Полимеры",
        en: "SamTech Industrial Polymer Facility",
      },
      materials: {
        uz: "Muhandislik poliamidlari (PA6, PA66), PC, ABS, POM",
        ru: "Инженерные полиамиды (PA6, PA66), PC, ABS, POM",
        en: "Engineering polyamides (PA6, PA66), PC, ABS, POM",
      },
      capabilities: {
        uz: "Termoplastavtomatlar parki: 80t dan 850t gacha siqish kuchi",
        ru: "Парк ТПА: усилие смыкания от 80т до 850т",
        en: "Injection press machinery: 80t to 850t clamp force",
      },
    },
    {
      id: "equipment",
      title: {
        uz: "Sanoat uskunalari va Zavod liniyalari",
        ru: "Промышленное оборудование и станки",
        en: "Industrial Machinery & Production Lines",
      },
      subtitle: {
        uz: "Xitoy va Turkiyadan sanoat stanoklarini yetkazish, o‘rnatish va servis",
        ru: "Поставка, пусконаладка и сервис промышленного оборудования",
        en: "Machinery supply, turnkey commissioning & technical servicing",
      },
      plant: {
        uz: "UZBIC xalqaro biznes & uskunalar markazi",
        ru: "Международный центр оборудования UZBIC",
        en: "UZBIC Industrial Machinery & Tech Hub",
      },
      materials: {
        uz: "Sanoat CNC stanoklari, TPA, qadoqlash avtomatlari",
        ru: "Промышленные ЧПУ станки, ТПА, упаковочные линии",
        en: "Industrial CNC machines, injection molding machines, packaging",
      },
      capabilities: {
        uz: "To‘liq texnologik xarita, muhandislar tayyorlash va kafolat",
        ru: "Полная технологическая карта, обучение персонала и гарантия",
        en: "Full technical documentation, staff training & OEM warranty",
      },
    },
    {
      id: "horeca",
      title: {
        uz: "HoReCa va Oziq-ovqat ishlab chiqarish",
        ru: "HoReCa и пищевое производство",
        en: "Food Production & HoReCa Supply",
      },
      subtitle: {
        uz: "Yarim tayyor mahsulotlar, qandolatchilik va tarmoqli ta’minot",
        ru: "Полуфабрикаты, кондитерские изделия и сетевые поставки",
        en: "Semi-finished food products, confectionery & hospitality supply",
      },
      plant: {
        uz: "AFIYET & PURO oziq-ovqat ishlab chiqarish klasteri",
        ru: "Пищевой производственный кластер AFIYET & PURO",
        en: "AFIYET & PURO Food Manufacturing Cluster",
      },
      materials: {
        uz: "100% Halol sertifikatlangan tabiiy xomashyo",
        ru: "100% Халяль сертифицированное натуральное сырье",
        en: "100% Halal certified organic raw ingredients",
      },
      capabilities: {
        uz: "Kunlik 10+ tonna qayta ishlash va shokli muzlatish quvvati",
        ru: "Переработка 10+ тонн в сутки, шоковая заморозка",
        en: "10+ metric tons daily processing & IQF freezing capability",
      },
    },
  ];

  // 2. Ishlab chiqarish modellari
  const MODELS: ModelData[] = [
    {
      id: "existing_mold",
      title: {
        uz: "Mavjud press-qoliplar bazasidan quyish (OEM)",
        ru: "Серийное литье на готовых пресс-формах (OEM)",
        en: "Production on Existing Tooling (OEM)",
      },
      desc: {
        uz: "Qolip xarajatisiz tezkor ishga tushirish. O‘z brendingiz logotipi va individual qadoqda chiqariladi.",
        ru: "Быстрый старт без затрат на пресс-форму. Выпуск под вашим брендом и в вашей упаковке.",
        en: "Zero tooling investment. Fast market launch under your brand logo and customized packaging.",
      },
      timeModifier: {
        uz: "10–20 ish kuni",
        ru: "10–20 рабочих дней",
        en: "10–20 business days",
      },
      toolingNote: {
        uz: "Qolip to‘lovi talab qilinmaydi (baza ichida mavjud)",
        ru: "Затраты на пресс-форму 0$ (готовые формы)",
        en: "$0 Tooling fee (utilizes factory library)",
      },
    },
    {
      id: "custom_tooling",
      title: {
        uz: "Noldan yangi qolip loyihalash (Eksklyuziv OEM)",
        ru: "Разработка новой пресс-формы с нуля (Custom)",
        en: "Custom Mold Tooling Fabrication (Exclusive)",
      },
      desc: {
        uz: "Mahsulot 3D chizmasi, muhandislik hisobi va xalqaro po‘latdan eksklyuziv press-qolip tayyorlash.",
        ru: "3D моделирование изделия, расчет усадки и фрезеровка формы из инструментальной стали.",
        en: "3D CAD modeling, moldflow simulation & precision hardened steel mold fabrication.",
      },
      timeModifier: {
        uz: "35–45 ish kuni (qolip + ilk sinov partiyasi)",
        ru: "35–45 рабочих дней (форма + тестовая партия)",
        en: "35–45 business days (tooling + sample run)",
      },
      toolingNote: {
        uz: "Eksklyuziv mulkdorlik: qolip faqat sizning buyurtmangiz uchun ishlaydi",
        ru: "Эксклюзивное право: форма закрепляется только за заказчиком",
        en: "Exclusive ownership: tooling strictly reserved for your orders",
      },
    },
    {
      id: "wholesale",
      title: {
        uz: "Mavjud assortiment ulgurji distribyutsiyasi",
        ru: "Оптовая дистрибьюция готовой продукции",
        en: "Wholesale Distribution of Catalog Products",
      },
      desc: {
        uz: "Fabrika brendidagi tayyor mahsulotlarni hududingizda rasmiy narx va marja bilan tarqatish.",
        ru: "Прямые оптовые поставки готовых линеек с гарантированной дистрибьюторской маржой.",
        en: "Direct supply of ready catalog lines with certified regional distributor margins.",
      },
      timeModifier: {
        uz: "3–7 ish kuni (ombordan yuklash)",
        ru: "3–7 рабочих дней (отгрузка со склада)",
        en: "3–7 business days (warehouse dispatch)",
      },
      toolingNote: {
        uz: "Tayyor ombor zaxirasidan zudlik bilan yetkaziladi",
        ru: "Поставка готовой продукции со склада",
        en: "Immediate shipment from factory stock",
      },
    },
  ];

  // 3. Hajm va miqyos
  const SCALES: ScaleData[] = [
    {
      id: "trial",
      title: {
        uz: "Sinov partiyasi (LTL)",
        ru: "Тестовая партия (LTL)",
        en: "Trial Volume (LTL)",
      },
      volumeLabel: {
        uz: "5 000 – 10 000 dona",
        ru: "5 000 – 10 000 шт",
        en: "5,000 – 10,000 units",
      },
      moq: {
        uz: "5 000 dona (Minimal start)",
        ru: "5 000 шт (Минимальный старт)",
        en: "5,000 units (Minimum start)",
      },
      logistics: {
        uz: "Palletali yuk (1–4 palleta, yig‘ma yuk)",
        ru: "Паллетная сборная доставка (1–4 паллеты)",
        en: "Palletized consolidated shipment (1–4 pallets)",
      },
      priceBenefit: {
        uz: "Bozorga tezkor kirish va talabni sinash",
        ru: "Быстрый тест рынка и минимизация рисков",
        en: "Low-risk market entry and demand validation",
      },
    },
    {
      id: "ftl",
      title: {
        uz: "Konteyner / Yevrofura (FTL Eksport)",
        ru: "Контейнер / Еврофура (FTL Экспорт)",
        en: "Full Container / Truckload (FTL)",
      },
      volumeLabel: {
        uz: "20 000 – 40 000 dona (1 Fura / 40ft HQ)",
        ru: "20 000 – 40 000 шт (1 Фура / 40ft HQ)",
        en: "20,000 – 40,000 units (1 Truck / 40ft HQ)",
      },
      moq: {
        uz: "20 000 dona (Optimal tannarx)",
        ru: "20 000 шт (Оптимальная себестоимость)",
        en: "20,000 units (Optimal unit cost)",
      },
      logistics: {
        uz: "To‘liq 82-96 m³ fura yoki 40-futlik dengiz/temiryo‘l konteyneri",
        ru: "Полная еврофура 82–96 м³ или 40-футовый контейнер",
        en: "Dedicated 82–96 m³ truckload or 40ft high-cube container",
      },
      priceBenefit: {
        uz: "Logistika xarajati 30-35% arzonroq tushadi, eng maqbul tannarx",
        ru: "Экономия на логистике до 35%, минимальная себестоимость единицы",
        en: "Up to 35% freight cost reduction, lowest cost per unit",
      },
    },
    {
      id: "annual",
      title: {
        uz: "Yillik kafolatlangan shartnoma",
        ru: "Годовой производственный контракт",
        en: "Annual Guaranteed Manufacturing Contract",
      },
      volumeLabel: {
        uz: "100 000+ dona / yiliga (oylik reja)",
        ru: "100 000+ шт в год (ежемесячный график)",
        en: "100,000+ units / year (monthly schedule)",
      },
      moq: {
        uz: "Oylik 10 000+ dona kafolatlangan quvvat",
        ru: "Гарантированная бронь линии: 10 000+ шт/мес",
        en: "Reserved production line: 10,000+ units/mo",
      },
      logistics: {
        uz: "Kafolatlangan ishlab chiqarish taqvimi va ustuvor ombor ta’minoti",
        ru: "Фиксированный производственный график и буферный склад",
        en: "Fixed priority calendar & bonded buffer stock management",
      },
      priceBenefit: {
        uz: "Maxsus eksklyuziv fabrika narxi va xomashyo narx tebranishlaridan himoya",
        ru: "Эксклюзивная цена завода и фиксация стоимости сырья",
        en: "Exclusive tier-1 pricing with raw material price stabilization",
      },
    },
  ];

  const currentSector = SECTORS.find((s) => s.id === selectedSector)!;
  const currentModel = MODELS.find((m) => m.id === selectedModel)!;
  const currentScale = SCALES.find((s) => s.id === selectedScale)!;

  const matchedCompany = useMemo(() => {
    if (selectedSector === "toys") {
      return companies.find((c) => c.id === "toy-bola") || { name: "Toybola Toys" };
    }
    if (selectedSector === "plastic") {
      return companies.find((c) => c.id === "samtech") || { name: "SamTech Polimer" };
    }
    if (selectedSector === "equipment") {
      return companies.find((c) => c.id === "uzbic") || { name: "UZBIC Industrial Hub" };
    }
    return companies.find((c) => c.id === "afiyet" || c.id === "puro") || { name: "AFIYET / PURO" };
  }, [selectedSector, companies]);

  const i18n = {
    uz: {
      badge: "Sanoat Quvvati Kalkulyatori",
      title: "Buyurtma Parametrlari va Ishlab Chiqarish Smetasi",
      subtitle:
        "Sohani, hamkorlik shaklini va hajm ko‘lamini tanlang. Tizim zavod quvvatini, muddatlarni va shartlarni real vaqtda hisoblab beradi.",
      step1Title: "1. Sanoat yo‘nalishini tanlang",
      step2Title: "2. Ishlab chiqarish formatini tanlang",
      step3Title: "3. Rejalashtirilgan buyurtma hajmi",
      quoteTitle: "Hisoblangan Sanoat Pasporti",
      quoteSubtitle: "Tanlangan parametrlar asosidagi dastlabki texnik spetsifikatsiya:",
      metricPlant: "Ijrochi zavod majmuasi",
      metricCapacity: "Ishlab chiqarish quvvati & Xomashyo",
      metricMoq: "Minimal partiya (MOQ)",
      metricTime: "Ishlab chiqarish va yuklash muddati",
      metricTooling: "Press-qolip shartlari",
      metricLogistics: "Logistika va qadoqlash",
      ctaButton: "Tijorat taklifini shakllantirish",
      ctaSubtext: "Spetsifikatsiya quyidagi rasmiy aloqa formasiga avtomatik biriktiriladi",
      copiedNotice: "Spetsifikatsiya formaga biriktirildi!",
      verifiedBadge: "20 yillik zavod kafolati",
    },
    ru: {
      badge: "Калькулятор производственных мощностей",
      title: "Параметры заказа и производственная смета",
      subtitle:
        "Выберите отрасль, формат сотрудничества и планируемый объем. Система в реальном времени рассчитает мощности, сроки и условия поставки.",
      step1Title: "1. Выберите производственную отрасль",
      step2Title: "2. Выберите формат сотрудничества",
      step3Title: "3. Планируемый объем партии",
      quoteTitle: "Производственный паспорт заказа",
      quoteSubtitle: "Предварительная спецификация на основе выбранных параметров:",
      metricPlant: "Производственный комплекс",
      metricCapacity: "Мощности и сырье",
      metricMoq: "Минимальный объем (MOQ)",
      metricTime: "Срок изготовления и отгрузки",
      metricTooling: "Условия по пресс-формам",
      metricLogistics: "Логистика и комплектация",
      ctaButton: "Сформировать коммерческое предложение",
      ctaSubtext: "Спецификация автоматически заполнит форму обратной связи внизу",
      copiedNotice: "Спецификация прикреплена к форме!",
      verifiedBadge: "20 лет опыта завода",
    },
    en: {
      badge: "Industrial Capacity Calculator",
      title: "Order Specifications & Manufacturing Estimate",
      subtitle:
        "Select your industrial sector, partnership model, and planned volume. The system calculates capacity, lead time, and supply terms in real time.",
      step1Title: "1. Select Industrial Sector",
      step2Title: "2. Select Manufacturing Model",
      step3Title: "3. Planned Order Volume",
      quoteTitle: "Manufacturing Order Passport",
      quoteSubtitle: "Preliminary technical specification based on chosen parameters:",
      metricPlant: "Manufacturing Enterprise",
      metricCapacity: "Capacity & Raw Material",
      metricMoq: "Minimum Order Quantity (MOQ)",
      metricTime: "Production & Delivery Lead Time",
      metricTooling: "Tooling & Mold Policy",
      metricLogistics: "Logistics & Packaging",
      ctaButton: "Generate Commercial Quotation",
      ctaSubtext: "Specification will automatically pre-fill the inquiry form below",
      copiedNotice: "Specification populated into form!",
      verifiedBadge: "20-Year Factory Guarantee",
    },
  }[safeLocale];

  const handleGenerateQuote = () => {
    const specsString = `[B2B SANOAT BUYURTMA SPETSIFIKATSIYASI]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Sanoat tarmog‘i: ${currentSector.title[safeLocale]}
• Bajaruvchi korxona: ${matchedCompany.name || currentSector.plant[safeLocale]}
• Xomashyo / Standart: ${currentSector.materials[safeLocale]}
• Ishlab chiqarish formati: ${currentModel.title[safeLocale]}
• Qolip holati: ${currentModel.toolingNote[safeLocale]}
• Buyurtma ko‘lami: ${currentScale.title[safeLocale]} (${currentScale.volumeLabel[safeLocale]})
• Minimal partiya (MOQ): ${currentScale.moq[safeLocale]}
• Taxminiy muddat: ${currentModel.timeModifier[safeLocale]}
• Logistika formati: ${currentScale.logistics[safeLocale]}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 4000);

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
    <div className="w-full bg-[#0D0F14] border border-white/[0.1] rounded-xl p-5 sm:p-7 lg:p-9 text-[#FAF9F5] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
      {/* Sarlavha qismi - toza va professional */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h3 className="font-serif text-[22px] sm:text-[28px] font-bold text-white tracking-tight leading-snug">
            {i18n.title}
          </h3>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#A0A7B5] mt-1.5 max-w-[68ch] leading-relaxed">
            {i18n.subtitle}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[12px] font-mono text-[#D4AF37] bg-[#161922] px-3.5 py-2 rounded-lg border border-white/[0.08] shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{i18n.verifiedBadge}</span>
        </div>
      </div>

      {/* Asosiy 2 Ustunli Interaktiv Maydon: Chapda Tanlovlar (7 ustun), O'ngda Hisob-kitob (5 ustun) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
        {/* CHAP TOMON: 3 ta qulay, tushunarli qadam */}
        <div className="lg:col-span-7 flex flex-col gap-7">
          {/* 1-QADAM: Sanoat tarmog'i */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider">
                {i18n.step1Title}
              </span>
              <span className="text-[12px] text-[#717988]">
                {currentSector.title[safeLocale].split(" ")[0]}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SECTORS.map((sector) => {
                const isSelected = selectedSector === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setSelectedSector(sector.id)}
                    className={`text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#1C202C] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]"
                        : "bg-[#12141C] border-white/[0.08] hover:border-white/25 hover:bg-[#161822]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[14px] font-semibold leading-snug ${isSelected ? "text-white" : "text-[#D1D5DB]"}`}>
                        {sector.title[safeLocale]}
                      </span>
                      <span
                        className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-[#D4AF37] bg-[#D4AF37]" : "border-white/30"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0D0F14]" />}
                      </span>
                    </div>
                    <span className="text-[11.5px] text-[#8C94A4] mt-2 line-clamp-2 leading-relaxed">
                      {sector.subtitle[safeLocale]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-QADAM: Ishlab chiqarish formati */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider">
                {i18n.step2Title}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {MODELS.map((model) => {
                const isSelected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#1C202C] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]"
                        : "bg-[#12141C] border-white/[0.08] hover:border-white/25 hover:bg-[#161822]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? "border-[#D4AF37] bg-[#D4AF37]" : "border-white/30"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0D0F14]" />}
                        </span>
                        <span className={`text-[13.5px] font-semibold ${isSelected ? "text-white" : "text-[#D1D5DB]"}`}>
                          {model.title[safeLocale]}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 whitespace-nowrap shrink-0">
                        {model.timeModifier[safeLocale]}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#8C94A4] mt-1.5 pl-6 leading-relaxed">
                      {model.desc[safeLocale]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-QADAM: Buyurtma ko'lami */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-mono font-semibold text-[#D4AF37] uppercase tracking-wider">
                {i18n.step3Title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SCALES.map((scale) => {
                const isSelected = selectedScale === scale.id;
                return (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setSelectedScale(scale.id)}
                    className={`text-left p-3.5 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#1C202C] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]"
                        : "bg-[#12141C] border-white/[0.08] hover:border-white/25 hover:bg-[#161822]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[13px] font-bold ${isSelected ? "text-[#D4AF37]" : "text-[#D1D5DB]"}`}>
                          {scale.title[safeLocale]}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                      <span className="text-[12px] font-mono font-medium text-white block mt-0.5">
                        {scale.volumeLabel[safeLocale]}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8C94A4] mt-2.5 pt-2 border-t border-white/[0.06] line-clamp-2">
                      {scale.priceBenefit[safeLocale]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* O'NG TOMON: Jonli Tijorat Pasporti / Smeta Kartasi (Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-[#141722] border border-[#D4AF37]/30 rounded-xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5 relative overflow-hidden">
            {/* Yuqori naqsh / oltin chiziq */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Sarlavha */}
            <div className="pb-4 border-b border-white/[0.08]">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D4AF37] block">
                {i18n.quoteTitle}
              </span>
              <p className="text-[12px] text-[#8C94A4] mt-0.5">
                {i18n.quoteSubtitle}
              </p>
            </div>

            {/* Asosiy ko'rsatkichlar ro'yxati */}
            <div className="flex flex-col gap-4 text-[13px]">
              {/* Zavod */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider">
                  {i18n.metricPlant}
                </span>
                <span className="text-[15px] font-serif font-bold text-white">
                  {matchedCompany.name || currentSector.plant[safeLocale]}
                </span>
                <span className="text-[11.5px] text-[#A0A7B5]">
                  {currentSector.capabilities[safeLocale]}
                </span>
              </div>

              {/* Minimal hajm (MOQ) */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
                <div>
                  <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider block">
                    {i18n.metricMoq}
                  </span>
                  <span className="text-[15px] font-bold text-[#D4AF37] mt-0.5 block">
                    {currentScale.moq[safeLocale].split("(")[0].trim()}
                  </span>
                  <span className="text-[11px] text-[#717988]">
                    {currentScale.volumeLabel[safeLocale]}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider block">
                    {i18n.metricTime}
                  </span>
                  <span className="text-[14px] font-semibold text-white mt-0.5 block">
                    {currentModel.timeModifier[safeLocale]}
                  </span>
                </div>
              </div>

              {/* Qolip va shartlar */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-1">
                <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider">
                  {i18n.metricTooling}
                </span>
                <span className="text-[12.5px] text-[#E2E8F0] leading-snug">
                  {currentModel.toolingNote[safeLocale]}
                </span>
              </div>

              {/* Xomashyo & Standart */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-1">
                <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider">
                  {i18n.metricCapacity}
                </span>
                <span className="text-[12.5px] text-[#D1D5DB] leading-snug">
                  {currentSector.materials[safeLocale]}
                </span>
              </div>

              {/* Logistika */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-1">
                <span className="text-[11px] font-mono text-[#8C94A4] uppercase tracking-wider">
                  {i18n.metricLogistics}
                </span>
                <span className="text-[12px] text-[#8C94A4] leading-snug">
                  {currentScale.logistics[safeLocale]}
                </span>
              </div>
            </div>

            {/* Bosh Harakat Tugmasi (CTA) */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGenerateQuote}
                className="w-full py-3.5 px-5 rounded-lg bg-[#D4AF37] hover:bg-[#E5BE42] active:scale-[0.99] text-[#090A0D] font-mono text-[12px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)] cursor-pointer"
              >
                <span>{isCopied ? i18n.copiedNotice : i18n.ctaButton}</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="text-[11px] text-[#717988] text-center leading-normal">
                {i18n.ctaSubtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
