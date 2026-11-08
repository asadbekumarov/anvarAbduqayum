import React from "react";
import { getContent } from "@/config/content";

interface PrinciplesProps {
  locale?: string;
}

export const Principles: React.FC<PrinciplesProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  // SVG technical schematics for the 4 modules
  const renderModuleIcon = (type: "sop" | "governance" | "metrics" | "culture") => {
    switch (type) {
      case "sop":
        return (
          <svg className="w-6 h-6 text-[#E2541B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="16" rx="1" strokeWidth="1.5" />
            <line x1="7" y1="9" x2="17" y2="9" strokeWidth="1.5" />
            <line x1="7" y1="13" x2="14" y2="13" strokeWidth="1.5" />
            <line x1="7" y1="17" x2="11" y2="17" strokeWidth="1.5" />
          </svg>
        );
      case "governance":
        return (
          <svg className="w-6 h-6 text-[#1F2F5C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
            <path d="M5 21v-2a7 7 0 0114 0v2" strokeWidth="1.5" />
            <circle cx="18" cy="14" r="2" strokeWidth="1.2" />
            <circle cx="6" cy="14" r="2" strokeWidth="1.2" />
          </svg>
        );
      case "metrics":
        return (
          <svg className="w-6 h-6 text-[#E2541B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="20" x2="18" y2="10" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="12" y2="4" strokeWidth="1.5" />
            <line x1="6" y1="20" x2="6" y2="14" strokeWidth="1.5" />
            <line x1="2" y1="20" x2="22" y2="20" strokeWidth="1.5" />
          </svg>
        );
      case "culture":
        return (
          <svg className="w-6 h-6 text-[#1F2F5C]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <section id="tamoyil" className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#1C1A17]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.principles.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.principles.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              {content.principles.titleEmphasis}
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.principles.subtitle}
          </p>
        </div>

        {/* Manifesto Quote Banner */}
        <div className="mb-14 p-6 sm:p-8 border-l-4 border-[#E2541B] bg-[#EBE4D6] rounded-[2px] shadow-sm">
          <p className="font-serif text-lg sm:text-xl text-[#1C1A17] italic leading-relaxed">
            {content.principles.manifesto}
          </p>
          <div className="mt-4 font-mono text-xs text-[#6B645A] uppercase tracking-wider flex items-center justify-between">
            <span>Anvar Abduqayum // Boshqaruv Falsafasi</span>
            <span className="text-[#E2541B]">QOLIP: AVTONOM TIZIM</span>
          </div>
        </div>

        {/* CSS/SVG Snapping Grid Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {content.principles.modules.map((item, idx) => (
            <div
              key={item.index}
              className="mold-card group p-6 sm:p-8 bg-[#F4EFE6] border border-[#1C1A17]/15 hover:border-[#1C1A17]/40 transition-all"
            >
              <span className="corner-mark-tl" />
              <span className="corner-mark-br" />

              {/* Module Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C1A17]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EBE4D6] border border-[#1C1A17]/10 rounded-[2px]">
                    {renderModuleIcon(item.iconType)}
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#E2541B]">
                      {item.index}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17]">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-[#6B645A] hidden sm:inline">
                  TIZIM №0{idx + 1}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#6B645A] leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Technical Rule Bar */}
              <div className="pt-3 border-t border-[#1C1A17]/10 font-mono text-xs text-[#1F2F5C] bg-[#EBE4D6]/60 p-2.5 rounded-[1px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1F2F5C] shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">{item.technicalRule}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

