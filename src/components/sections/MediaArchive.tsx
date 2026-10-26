"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { YouTubeModal } from "@/components/ui/YouTubeModal";
import { siteMedia, VideoItem } from "@/config/siteMedia";
import { useApplyModal } from "@/features/apply/context/ApplyModalContext";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { KenBurnsImage } from "@/components/ui/KenBurnsImage";
import { formatSectionKicker } from "@/config/sections";

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

interface MediaArchiveProps {
  onOpenApply?: (serviceName?: string) => void;
}

const countryTranslationKeys: Record<string, string> = {
  "Qozog'iston": "countryKazakhstan",
  "Qirg'iziston": "countryKyrgyzstan",
  "O'zbekiston": "countryUzbekistan",
  "Tojikiston": "countryTajikistan",
};

const cityTranslationKeys: Record<string, string> = {
  Shymkent: "cityShymkent",
  Osh: "cityOsh",
  Samarqand: "citySamarkand",
  "Xo'jand": "cityKhujand",
  Toshkent: "cityTashkent",
  "Farg'ona": "cityFergana",
};

export function MediaArchive({ onOpenApply }: MediaArchiveProps) {
  const { openApply } = useApplyModal();
  const handleApply = onOpenApply || openApply;

  const tArchive = useTranslations("mediaArchive");
  const common = useTranslations("common");
  const tTestimonials = useTranslations("testimonials");
  const tWebinars = useTranslations("webinars");
  const tEvents = useTranslations("events");

  const [activeTab, setActiveTab] = useState<"testimonials" | "webinars" | "events">("testimonials");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync tab with URL hash if user navigated to a specific sub-anchor
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#fikrlar" || hash === "#natijalar") {
      setActiveTab("testimonials");
    } else if (hash === "#vebinarlar" || hash === "#darslar") {
      setActiveTab("webinars");
    } else if (hash === "#tadbirlarimiz" || hash === "#tadbirlar") {
      setActiveTab("events");
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const tabs = [
    {
      id: "testimonials" as const,
      index: "01",
      label: tArchive("tabTestimonials"),
      count: siteMedia.testimonials.length,
    },
    {
      id: "webinars" as const,
      index: "02",
      label: tArchive("tabWebinars"),
      count: siteMedia.webinars.length,
    },
    {
      id: "events" as const,
      index: "03",
      label: tArchive("tabEvents"),
      count: siteMedia.events.length,
    },
  ];

  return (
    <section
      id="natijalar"
      aria-label={tArchive("sectionAria")}
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden"
    >
      {/* Anchor targets to preserve all existing links */}
      <span id="tadbirlarimiz" className="absolute -top-20 pointer-events-none" />
      <span id="tadbirlar" className="absolute -top-20 pointer-events-none" />
      <span id="fikrlar" className="absolute -top-20 pointer-events-none" />
      <span id="vebinarlar" className="absolute -top-20 pointer-events-none" />

      {/* Header Row */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Section Kicker & Masked H2 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-platinum">
                {formatSectionKicker("media", tArchive("kicker"))}
              </span>
            </div>

            <MaskedHeading className="text-3xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-white mt-4">
              {tArchive("headingPrefix")}
              <span className="font-serif italic font-normal text-white/90">
                {tArchive("headingHighlight")}
              </span>
            </MaskedHeading>
          </div>

          {/* Custom Architectural Scroll Controls */}
          <div className="shrink-0 flex items-center gap-4">
            <span className="font-mono text-xs text-platinum uppercase tracking-widest hidden sm:inline-block">
              {activeTab === "testimonials"
                ? `${siteMedia.testimonials.length} ${tArchive("counterCases")}`
                : activeTab === "webinars"
                ? `${siteMedia.webinars.length} ${tArchive("counterLessons")}`
                : `${siteMedia.events.length} ${tArchive("counterCities")}`}
            </span>
            <div className="inline-flex border border-white/[0.12] divide-x divide-white/[0.12]">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label={common("prev")}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-platinum hover:text-white hover:bg-white/[0.04] transition-colors rounded-none font-mono text-sm cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label={common("next")}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-platinum hover:text-white hover:bg-white/[0.04] transition-colors rounded-none font-mono text-sm cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Swiss Architectural Tab Switcher */}
        <div className="mt-8 border-b border-white/[0.08] flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative pb-4 px-2 sm:px-3 text-left font-mono text-xs tracking-wider uppercase transition-colors shrink-0 cursor-pointer flex items-center gap-2.5 ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-[#C5A880]" : "text-platinum/60"}>
                  /{tab.index}
                </span>
                <span className="font-sans font-medium text-xs sm:text-sm tracking-wide">
                  {tab.label}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 font-mono ${
                    isActive
                      ? "bg-[#C5A880] text-[#0A0A0A] font-semibold"
                      : "bg-white/[0.06] text-platinum"
                  }`}
                >
                  {tab.count}
                </span>

                {/* Bottom Gold Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mediaHubActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]"
                    transition={{ duration: 0.35, ease: EASE_SWISS }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panes */}
      <AnimatePresence mode="wait">
        {/* Tab 1: Testimonials Filmstrip */}
        {activeTab === "testimonials" && (
          <motion.div
            key="tab-testimonials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_SWISS }}
          >
            <div
              ref={scrollRef}
              className="flex border-t border-b border-white/[0.08] divide-x divide-white/[0.08] overflow-x-auto scroll-smooth no-scrollbar"
              tabIndex={0}
              aria-label={tArchive("testimonialsListAria")}
            >
              {siteMedia.testimonials.map((vid, idx) => {
                const indexNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
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
                    aria-label={`${vid.title} - ${tTestimonials("playTrigger")}`}
                    className="w-[300px] sm:w-[360px] shrink-0 bg-[#0A0A0A] hover:bg-[#0B132B]/35 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer group rounded-none"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-platinum mb-4">
                        <span className="group-hover:text-white transition-colors">
                          {tTestimonials("tagKey")} / {indexNum}
                        </span>
                        <span className="text-platinum-light">{tTestimonials("tagFormat")}</span>
                      </div>

                      {/* Thumbnail Container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414] mb-4 border border-white/[0.06]">
                        <Image
                          src={vid.thumb}
                          alt={vid.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 360px"
                          className="object-cover w-full h-full grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                        />
                        <div className="absolute bottom-0 left-0 bg-[#070D1F]/90 border-t border-r border-white/[0.12] px-3 py-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white group-hover:bg-white group-hover:text-[#0A0A0A] transition-colors">
                          <span>{tTestimonials("playTrigger")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-base font-normal text-white tracking-tight group-hover:translate-x-1 transition-transform line-clamp-2">
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
          </motion.div>
        )}

        {/* Tab 2: Webinars Masterclass Archive */}
        {activeTab === "webinars" && (
          <motion.div
            key="tab-webinars"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_SWISS }}
          >
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar px-6 md:px-12 max-w-[1360px] mx-auto pb-4"
              tabIndex={0}
              aria-label={tArchive("webinarsListAria")}
            >
              {siteMedia.webinars.map((vid, idx) => {
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
                    aria-label={`${vid.title} - ${tWebinars("openLesson")}`}
                    className="w-[280px] sm:w-[320px] shrink-0 border border-white/[0.08] bg-[#0B132B]/20 hover:bg-[#0B132B]/45 hover:border-platinum/30 transition-all duration-300 cursor-pointer group rounded-none flex flex-col justify-between"
                  >
                    <div className="aspect-video w-full relative overflow-hidden bg-[#141414]">
                      <Image
                        src={vid.thumb}
                        alt={vid.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover w-full h-full opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#070D1F]/90 px-2 py-0.5 font-mono text-xs tracking-[0.18em] text-platinum-light border border-white/[0.08]">
                        <span>
                          {tWebinars("lessonTag")} / {indexNum}
                        </span>
                      </div>
                      {vid.duration && (
                        <div className="absolute bottom-2 right-2 bg-[#070D1F]/90 px-1.5 py-0.5 font-mono text-xs tracking-wider text-platinum border border-white/[0.08]">
                          {vid.duration}
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1">
                      <h3 className="text-sm font-normal text-white leading-snug line-clamp-2 group-hover:translate-x-1 transition-transform">
                        {vid.title}
                      </h3>
                      <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-platinum group-hover:text-white transition-colors">
                        <span>{tWebinars("openLesson")}</span>
                        <span className="text-platinum-light group-hover:text-white group-hover:translate-x-1 transition-transform">
                          {tWebinars("watchTrigger")}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Regional Business Tour Events */}
        {activeTab === "events" && (
          <motion.div
            key="tab-events"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_SWISS }}
          >
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar px-6 md:px-12 max-w-[1360px] mx-auto pb-4"
              tabIndex={0}
              aria-label={tArchive("eventsListAria")}
            >
              {siteMedia.events.map((evt, idx) => {
                const indexStr = idx < 9 ? `/0${idx + 1}` : `/${idx + 1}`;
                const displayCountry = countryTranslationKeys[evt.country]
                  ? tArchive(countryTranslationKeys[evt.country] as any)
                  : evt.country;
                const displayCity = cityTranslationKeys[evt.city]
                  ? tArchive(cityTranslationKeys[evt.city] as any)
                  : evt.city;

                return (
                  <article
                    key={evt.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleApply(`${displayCity} ${tArchive("businessTourSuffix")}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleApply(`${displayCity} ${tArchive("businessTourSuffix")}`);
                      }
                    }}
                    aria-label={`${displayCity} - ${evt.title}`}
                    className="w-[280px] sm:w-[320px] shrink-0 group relative bg-[#0A0A0A] border border-white/[0.08] p-5 flex flex-col justify-between transition-all duration-500 hover:bg-[#0B132B]/30 hover:border-platinum/20 rounded-none cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4 font-mono text-xs uppercase tracking-[0.2em]">
                      <span className="text-platinum group-hover:text-white transition-colors">
                        {indexStr}
                      </span>
                      <span className="text-platinum-light">{displayCountry}</span>
                    </div>

                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141414] mb-4">
                      <KenBurnsImage delay={idx * 0.08}>
                        <Image
                          src={evt.image}
                          alt={evt.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover w-full h-full grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                        />
                      </KenBurnsImage>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent opacity-80 pointer-events-none"
                      />
                      <span className="absolute bottom-3 left-3 font-serif italic text-2xl text-white tracking-tight pointer-events-none z-10">
                        {displayCity}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between gap-3 transition-transform duration-500 ease-out group-hover:translate-x-1">
                      <div>
                        <h3 className="text-sm font-normal text-white tracking-tight truncate max-w-[170px]">
                          {evt.title}
                        </h3>
                        <span className="text-xs text-platinum-light font-light mt-0.5 block">
                          {evt.date}
                        </span>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-platinum shrink-0">
                        {tEvents("status")}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
