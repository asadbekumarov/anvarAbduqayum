import React from "react";
import { getContent } from "@/config/content";

interface MistakesProps {
  locale?: string;
}

export const Mistakes: React.FC<MistakesProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  return (
    <section id="xatolar" className="py-20 lg:py-28 bg-[#EBE4D6] border-b border-[#1C1A17]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.mistakes.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.mistakes.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              {content.mistakes.titleEmphasis}
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.mistakes.subtitle}
          </p>
        </div>

        {/* Intro quote */}
        <div className="mb-12 p-6 bg-[#F4EFE6] border-l-4 border-[#1F2F5C] rounded-[2px]">
          <p className="font-serif text-lg sm:text-xl text-[#1C1A17] italic leading-relaxed">
            {content.mistakes.intro}
          </p>
          <div className="mt-3 font-mono text-xs text-[#6B645A]">
            AMALIY XULOSA // HAR BIR XATO YANGI STANDARTNING BOSHLANISHIDIR
          </div>
        </div>

        {/* 4 Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {content.mistakes.lessons.map((lesson) => (
            <div
              key={lesson.code}
              className="mold-card p-6 sm:p-8 bg-[#F4EFE6] border border-[#1C1A17]/15 flex flex-col justify-between"
            >
              <span className="corner-mark-tl" />
              <span className="corner-mark-br" />

              <div>
                {/* Header: Error Code Badge */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1C1A17]/10 font-mono text-xs">
                  <span className="text-[#E2541B] font-bold bg-[#EBE4D6] px-2 py-0.5 rounded-[1px]">
                    {lesson.code}
                  </span>
                  <span className="text-[#6B645A]">AMALIYOT DARSI</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A17] mb-4">
                  {lesson.title}
                </h3>

                {/* Misconception */}
                <div className="mb-4 space-y-1">
                  <span className="font-mono text-[10px] text-[#6B645A] uppercase tracking-wider block">
                    BOSHLANG&apos;ICH YANGILIK / ILUZIYA:
                  </span>
                  <p className="text-sm text-[#6B645A] leading-relaxed italic">
                    «{lesson.misconception}»
                  </p>
                </div>

                {/* Harsh Reality */}
                <div className="mb-6 space-y-1">
                  <span className="font-mono text-[10px] text-[#E2541B] uppercase tracking-wider block font-semibold">
                    REAL AMALIY ZARBA / HAQIQAT:
                  </span>
                  <p className="text-sm text-[#1C1A17] leading-relaxed">
                    {lesson.reality}
                  </p>
                </div>
              </div>

              {/* Molded Outcome Solution */}
              <div className="pt-4 border-t border-[#1C1A17]/10 bg-[#EBE4D6]/70 p-3.5 rounded-[1px] font-mono text-xs text-[#1F2F5C]">
                <span className="font-bold block mb-1 text-[#E2541B]">
                  XULOSA VA QOLIP:
                </span>
                <span className="text-xs text-[#1C1A17] font-medium leading-relaxed">
                  {lesson.moldedOutcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

