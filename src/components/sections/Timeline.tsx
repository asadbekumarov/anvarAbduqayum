import React from "react";
import { getContent } from "@/config/content";

interface TimelineProps {
  locale?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  return (
    <section id="yol" className="py-20 lg:py-28 bg-[#EBE4D6] border-b border-[#1C1A17]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.timeline.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.timeline.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              {content.timeline.titleEmphasis}
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.timeline.subtitle}
          </p>
        </div>

        {/* Industrial Blueprint Timeline Architecture */}
        <div className="relative border-l border-[#1C1A17]/25 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {content.timeline.steps.map((step) => (
            <div key={step.stageNumber} className="relative group">
              {/* Timeline Connector Indicator & Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center">
                <span className="w-3.5 h-3.5 bg-[#F4EFE6] border-2 border-[#1C1A17] group-hover:border-[#E2541B] transition-colors" />
                <span className="w-3 sm:w-6 h-[1px] bg-[#1C1A17]/30" />
              </div>

              {/* Floating Period Tag for Desktop */}
              <div className="md:absolute md:-left-44 md:top-0.5 font-mono text-sm font-bold text-[#E2541B] mb-2 md:mb-0">
                {step.period}
              </div>

              {/* Timeline Content Block */}
              <div className="mold-card p-6 sm:p-8 bg-[#F4EFE6] border border-[#1C1A17]/15">
                <span className="corner-mark-tl" />
                <span className="corner-mark-br" />

                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#1C1A17]/10 font-mono text-xs text-[#6B645A]">
                  <span className="text-[#1F2F5C] font-semibold">
                    BOSQICH // {step.stageNumber}
                  </span>
                  <span className="bg-[#EBE4D6] px-2 py-0.5 rounded-[1px] text-[#1C1A17]">
                    FOKUS: {step.focus}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-[#6B645A] leading-relaxed mb-6">
                  {step.summary}
                </p>

                {/* Milestone badge */}
                <div className="font-mono text-xs bg-[#EBE4D6]/70 border-l-2 border-[#E2541B] p-3 text-[#1C1A17] flex items-center justify-between">
                  <div>
                    <span className="text-[#6B645A] uppercase block text-[10px]">
                      ASOSIY NATIJA (MILESTONE):
                    </span>
                    <span className="font-medium">{step.milestone}</span>
                  </div>
                  <span className="font-mono text-xs text-[#E2541B] font-bold">VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

