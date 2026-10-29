  "use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { YouTubeModal } from "@/components/ui/YouTubeModal";
import { siteMedia, VideoItem } from "@/config/siteMedia";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = siteMedia.testimonials;
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="fikrlar"
      aria-label={t("title")}
      className="py-24 sm:py-32 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      {/* Header Row */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
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
        </div>
      </div>

      {/* Horizontal Filmstrip Cards Constrained to Container with Blur Fades */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="relative w-full overflow-hidden">
          {/* Left Edge Blur & Gradient Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent backdrop-blur-[2px]"
          />

          {/* Right Edge Blur & Gradient Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent backdrop-blur-[2px]"
          />

          <div
            ref={scrollRef}
            className="flex border-t border-b border-white/[0.08] divide-x divide-white/[0.08] overflow-x-auto scroll-smooth no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent)]"
            tabIndex={0}
            aria-label={t("title")}
          >
        {testimonials.map((vid, idx) => {
          return (
            <article
              key={vid.id === "REPLACE_ME" ? `vid-${idx}` : vid.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVideo(vid)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedVideo(vid);
                }
              }}
              aria-label={`${vid.title} - ${t("playTrigger")}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-[#0A0A0A] hover:bg-[#0B132B]/35 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer group rounded-none"
            >
              {/* Video Card Content */}
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414] mb-6 border border-white/[0.06]">
                  <Image
                    src={vid.thumb}
                    alt={vid.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 380px"
                    className="object-cover w-full h-full grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  {/* Bespoke Play Trigger */}
                  <div className="absolute bottom-0 left-0 bg-[#070D1F]/90 border-t border-r border-white/[0.12] px-3.5 py-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white group-hover:bg-white group-hover:text-[#0A0A0A] transition-colors">
                    <span>{t("playTrigger")}</span>
                  </div>
                </div>
              </div>

              {/* Client Info (Bottom) */}
              <div className="pt-2">
                <h3 className="text-lg font-normal text-white tracking-tight group-hover:translate-x-1 transition-transform line-clamp-2">
                  {vid.title}
                </h3>
                <div className="font-mono text-xs text-platinum mt-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>{vid.client || vid.company || vid.author}</span>
                  {vid.duration && (
                    <span className="text-platinum-light">{vid.duration}</span>
                  )}
                </div>
                {vid.result && (
                  <p className="text-xs text-neutral-300 mt-1 font-light">
                    {vid.result}
                  </p>
                )}
              </div>
            </article>
          );
        })}
          </div>
        </div>
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
