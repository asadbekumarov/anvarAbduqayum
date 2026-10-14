"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteMedia } from "@/config/siteMedia";
import { Button } from "@/components/ui/Button";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";

interface BookProps {
  onOpenApply?: () => void;
}

export function Book({ onOpenApply }: BookProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;
  const t = useTranslations("book");
  const { cover } = siteMedia.book;

  return (
    <section
      id="kitob"
      aria-label="Biznes shpargalkasi kitobi"
      className="py-20 sm:py-28 border-b border-border bg-elevated/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: CSS 3D Hardcover Book Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className="relative w-full max-w-[340px] sm:max-w-[380px] h-[460px] sm:h-[520px] flex items-center justify-center perspective-1200 select-none"
            >
              {/* 3D Book Ground Drop Shadow */}
              <div
                style={{
                  transform: "rotateX(75deg) translateZ(-40px)",
                }}
                className="absolute bottom-6 w-[260px] sm:w-[300px] h-[70px] bg-black/80 blur-xl rounded-full pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* Ambient Book Aura */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* 3D Book Assembly */}
              <div
                style={{
                  transform: "rotateX(8deg) rotateY(-16deg)",
                  transformStyle: "preserve-3d",
                }}
                className="relative w-[240px] sm:w-[280px] h-[350px] sm:h-[410px] preserve-3d"
              >
                {/* 1. FRONT COVER */}
                <div
                  className="absolute inset-0 preserve-3d rounded-r-[4px] rounded-l-[1px] border border-gold/40 shadow-2xl overflow-hidden bg-[#141414]"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(max-width: 768px) 260px, 300px"
                    className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                    priority
                  />

                  {/* Hardcover Inner Bevel */}
                  <div
                    className="absolute inset-0 shadow-[inset_2px_0_4px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(223,186,115,0.3)] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Left Spine Groove indent on front cover */}
                  <div
                    className="absolute top-0 bottom-0 left-[14px] w-[2px] bg-black/40 shadow-[1px_0_2px_rgba(255,255,255,0.1)] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Periodic Metallic Gold Sheen Sweep Ray */}
                  <div
                    className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none animate-book-sheen"
                    aria-hidden="true"
                  />
                </div>

                {/* 2. 3D SPINE (LEFT FACET) */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-[30px] bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-y border-l border-gold/40 flex items-center justify-center overflow-hidden"
                  style={{
                    transformOrigin: "left center",
                    transform: "rotateY(-90deg) translateX(-30px)",
                  }}
                  aria-hidden="true"
                >
                  {/* Embossed Vertical Spine Typography */}
                  <span
                    className="text-[9px] font-sans uppercase tracking-[0.25em] text-gold/90 whitespace-nowrap font-medium"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    BIZNES SHPARGALKASI • ILHOM BEGIMQULOV
                  </span>
                </div>

                {/* 3. 3D RIGHT PAGES BLOCK (PAPER RIDGES) */}
                <div
                  className="absolute top-[2px] bottom-[2px] right-0 w-[30px] border-y border-r border-[#8A7B62]/30"
                  style={{
                    transformOrigin: "right center",
                    transform: "rotateY(90deg) translateX(30px)",
                    background:
                      "repeating-linear-gradient(to right, #F5EFE0 0px, #EDE4CE 1px, #DFD4BC 2px, #EDE4CE 3px)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
                  }}
                  aria-hidden="true"
                />

                {/* 4. 3D BOTTOM PAGES BLOCK (PAPER RIDGES) */}
                <div
                  className="absolute bottom-0 left-[3px] right-[2px] h-[30px] border-x border-b border-[#8A7B62]/30"
                  style={{
                    transformOrigin: "center bottom",
                    transform: "rotateX(-90deg) translateY(30px)",
                    background:
                      "repeating-linear-gradient(to bottom, #F5EFE0 0px, #EDE4CE 1px, #DFD4BC 2px, #EDE4CE 3px)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
                  }}
                  aria-hidden="true"
                />

                {/* 5. BACK COVER */}
                <div
                  className="absolute inset-0 bg-[#0F0F0F] border border-border rounded-l-[4px] rounded-r-[1px] shadow-2xl"
                  style={{
                    transform: "translateZ(-15px)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Specs Badge */}
            <div className="w-full max-w-sm mt-4 p-4 border border-border bg-elevated/40 rounded-[2px] flex items-center justify-between text-xs font-sans text-muted">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>{t("pages")}</span>
              </span>
              <span className="text-border">/</span>
              <span className="text-gold font-medium uppercase tracking-wider">
                {t("format")}
              </span>
              <span className="text-border">/</span>
              <span className="text-white/80">QATTIQ MUQOVA</span>
            </div>
          </div>

          {/* Right: Book Details & Content Blueprint */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeader
              index="09"
              kicker={t("kicker")}
              title={t("title")}
              description={t("description")}
              className="mb-8"
            />

            {/* Book Highlights */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <span className="font-serif text-gold text-sm shrink-0">01.</span>
                <p className="text-sm sm:text-base text-muted-light font-light leading-relaxed">
                  {t("feature1")}
                </p>
              </div>

              <div className="flex items-start gap-4 border-t border-border-subtle pt-4">
                <span className="font-serif text-gold text-sm shrink-0">02.</span>
                <p className="text-sm sm:text-base text-muted-light font-light leading-relaxed">
                  {t("feature2")}
                </p>
              </div>

              <div className="flex items-start gap-4 border-t border-border-subtle pt-4">
                <span className="font-serif text-gold text-sm shrink-0">03.</span>
                <p className="text-sm sm:text-base text-muted-light font-light leading-relaxed">
                  {t("feature3")}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleApply}
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
