"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { YouTubeModal } from "@/components/ui/YouTubeModal";
import { siteMedia, VideoItem } from "@/config/siteMedia";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

export function Webinars() {
  const t = useTranslations("webinars");
  const common = useTranslations("common");
  const webinars = siteMedia.webinars;
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="vebinarlar"
      aria-label={t("title")}
      className="bg-[#0A0A0A] py-24 sm:py-32 border-b border-white/[0.07] text-[#F5F5F0] relative overflow-hidden"
    >
      {/* Header Row */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
        {/* Left Column */}
        <div>
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
              {t("kicker")}
            </span>
          </div>

          {/* H2 Heading with Editorial Masked Reveal */}
          <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-5">
            {t("titlePrefix")}
            <span className="font-serif italic font-normal text-white/90">
              {t("titleHighlight")}
            </span>
          </MaskedHeading>
        </div>

        {/* Right Column: Counter Badge & Custom Architectural Scroll Controls */}
        <div className="shrink-0 flex items-center gap-4">
          <span className="font-mono text-xs text-platinum uppercase tracking-widest hidden sm:inline-block">
            {webinars.length} {t("lessonTag")}
          </span>
          <div className="inline-flex border border-white/[0.12] divide-x divide-white/[0.12]">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label={common("prev")}
              className="w-12 h-12 flex items-center justify-center text-platinum hover:text-white hover:bg-white/[0.04] transition-colors rounded-none font-mono text-sm cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label={common("next")}
              className="w-12 h-12 flex items-center justify-center text-platinum hover:text-white hover:bg-white/[0.04] transition-colors rounded-none font-mono text-sm cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Archive Cards Strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6 md:px-12 max-w-[1360px] mx-auto pb-4"
        tabIndex={0}
        aria-label={t("title")}
      >
        {webinars.map((vid, idx) => {
          const indexNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
          return (
            <article
              key={vid.id === "REPLACE_ME" ? `webinar-${idx}` : vid.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVideo(vid)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedVideo(vid);
                }
              }}
              aria-label={`${vid.title} - ${t("openLesson")}`}
              className="w-[290px] sm:w-[330px] shrink-0 border border-white/[0.08] bg-[#0B132B]/20 hover:bg-[#0B132B]/45 hover:border-platinum/30 transition-all duration-300 cursor-pointer group rounded-none flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video w-full relative overflow-hidden bg-[#141414]">
                <Image
                  src={vid.thumb}
                  alt={vid.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 330px"
                  className="object-cover w-full h-full opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                />
                {/* Top-left Episode Tag */}
                <div className="absolute top-3 left-3 bg-[#070D1F]/90 px-2.5 py-1 font-mono text-xs tracking-[0.18em] text-platinum-light border border-white/[0.08]">
                  <span>
                    {t("lessonTag")} / {indexNum}
                  </span>
                </div>
                {/* Duration Tag if available */}
                {vid.duration && (
                  <div className="absolute bottom-2.5 right-2.5 bg-[#070D1F]/90 px-2 py-0.5 font-mono text-xs tracking-wider text-platinum border border-white/[0.08]">
                    {vid.duration}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <h3 className="text-base font-normal text-white leading-snug line-clamp-2 group-hover:translate-x-1 transition-transform">
                  {vid.title}
                </h3>

                {/* Bottom Trigger Row */}
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-platinum group-hover:text-white transition-colors">
                  <span>{t("openLesson")}</span>
                  <span className="text-platinum-light group-hover:text-white group-hover:translate-x-1 transition-transform">
                    {t("watchTrigger")}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Accessible YouTube Modal */}
      <YouTubeModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.id || null}
        title={selectedVideo?.title}
      />
    </section>
  );
}
