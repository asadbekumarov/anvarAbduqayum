"use client";

import React, { useState, useEffect, useRef } from "react";
import { getContent } from "@/config/content";

interface NumbersProps {
  locale?: string;
}

export const Numbers: React.FC<NumbersProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters smoothly
          const duration = 1200; // ms
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            const nextCounts: Record<string, number> = {};
            content.numbers.counters.forEach((item) => {
              nextCounts[item.id] = Math.floor(ease * item.value);
            });
            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, content.numbers.counters]);

  return (
    <section
      id="raqamlar"
      ref={sectionRef}
      className="py-20 lg:py-24 bg-[#EBE4D6] border-b border-[#1C1A17]/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.numbers.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.numbers.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              metrikalar
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.numbers.subtitle}
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {content.numbers.counters.map((item) => {
            const displayVal = hasAnimated ? counts[item.id] ?? item.value : item.value;

            return (
              <div
                key={item.id}
                className="mold-card p-5 sm:p-6 bg-[#F4EFE6] border border-[#1C1A17]/15 flex flex-col justify-between"
              >
                <span className="corner-mark-tl" />
                <span className="corner-mark-br" />

                <div className="font-mono text-[10px] text-[#6B645A] uppercase tracking-wider mb-2">
                  VERIFIED // 2026
                </div>

                {/* Animated Number in JetBrains Mono font */}
                <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E2541B] tracking-tight mb-2">
                  {item.prefix}
                  {displayVal.toLocaleString()}
                  {item.suffix}
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1A17] leading-snug">
                    {item.label}
                  </h3>
                  <p className="font-mono text-[11px] text-[#6B645A] mt-1">
                    {item.specification}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-8 pt-4 border-t border-[#1C1A17]/10 font-mono text-xs text-[#6B645A]">
          {content.numbers.footnote}
        </div>
      </div>
    </section>
  );
};

