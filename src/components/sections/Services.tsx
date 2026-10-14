"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

interface ServicesProps {
  onOpenApply?: () => void;
}

export function Services({ onOpenApply }: ServicesProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("services");
  const common = useTranslations("common");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="xizmatlar"
      aria-label="Xizmatlar"
      className="py-20 sm:py-28 border-b border-border bg-base"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeader
            index="02"
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            className="mb-0"
          />
          <div className="hidden lg:block shrink-0">
            <Button variant="outline" size="md" onClick={handleApply}>
              {common("cta")}
            </Button>
          </div>
        </div>

        {/* 6 Table-like Rows with 3D Tilt & Gold Spotlight */}
        <div className="border-t border-border flex flex-col">
          {items.map((service) => (
            <TiltCard
              key={service.index}
              className="border-b border-border transition-colors duration-200 hover:bg-elevated/40"
            >
              <div className="py-8 sm:py-10 px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  {/* Index Numeral */}
                  <div className="md:col-span-2">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-gold group-hover:gold-gradient-text transition-colors">
                      /{service.index}
                    </span>
                  </div>

                  {/* Service Title */}
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Description */}
                  <div className="md:col-span-5">
                    <p className="text-sm sm:text-base text-muted font-light leading-relaxed group-hover:text-muted-light transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* Row Action Arrow */}
                  <div className="md:col-span-1 flex md:justify-end">
                    <button
                      type="button"
                      onClick={handleApply}
                      aria-label={`${service.title} - ${common("cta")}`}
                      className="p-2 text-muted group-hover:text-gold transition-all duration-200 transform group-hover:translate-x-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 lg:hidden">
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={handleApply}
          >
            {common("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
