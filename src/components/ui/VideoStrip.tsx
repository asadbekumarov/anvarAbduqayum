"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { VideoItem } from "@/config/siteMedia";

interface VideoStripProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  className?: string;
}

export function VideoStrip({
  videos,
  onSelectVideo,
  className = "",
}: VideoStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Scroll Navigation Controls */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Oldingi videolarni ko'rish"
          className="w-10 h-10 border border-border flex items-center justify-center text-white disabled:opacity-30 disabled:border-border-subtle hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-[2px]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Keyingi videolarni ko'rish"
          className="w-10 h-10 border border-border flex items-center justify-center text-white disabled:opacity-30 disabled:border-border-subtle hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-[2px]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        tabIndex={0}
        aria-label="Videolar ro'yxati"
      >
        {videos.map((vid, idx) => (
          <article
            key={vid.id === "REPLACE_ME" ? `vid-${idx}` : vid.id}
            onClick={() => onSelectVideo(vid)}
            className="group flex-none w-[250px] xs:w-[280px] sm:w-[340px] border border-border bg-elevated/40 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer hover:border-gold/60 transition-all duration-200 snap-start rounded-[2px]"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video w-full bg-base border border-border-subtle overflow-hidden mb-4">
              <Image
                src={vid.thumb}
                alt={vid.title}
                fill
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
              />

              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0 bg-base/40 group-hover:bg-base/10 transition-colors duration-200"
                aria-hidden="true"
              />

              {/* Plain White Play Triangle (strictly no circle) with tactile motion */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 flex items-center justify-center text-white group-hover:text-gold transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-8 h-8 fill-current drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Duration or Index Pill Stamp */}
              {vid.duration && (
                <div className="absolute bottom-2 right-2 bg-base/90 border border-border px-1.5 py-0.5 text-[10px] font-sans text-muted tracking-wider">
                  {vid.duration}
                </div>
              )}
            </div>

            {/* Video Details */}
            <div className="space-y-2 border-t border-border-subtle pt-3">
              <div className="flex items-center justify-between text-xs text-gold">
                <span className="font-serif">/0{idx + 1}</span>
                {vid.company && (
                  <span className="text-[11px] font-sans tracking-wider uppercase text-muted line-clamp-1 max-w-[160px]">
                    {vid.company}
                  </span>
                )}
              </div>

              <h4 className="font-serif text-base text-white font-normal group-hover:text-gold transition-colors line-clamp-2">
                {vid.title}
              </h4>

              {vid.author && (
                <p className="text-xs text-muted font-light line-clamp-1">
                  {vid.author} {vid.role && `• ${vid.role}`}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
