"use client";

import React, { useState } from "react";
import { getContent } from "@/config/content";

interface MediaSectionProps {
  locale?: string;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section id="media" className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#1C1A17]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E2541B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B645A]">
              {content.media.moduleLabel}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1A17]">
            {content.media.title}
            <span className="font-editorial-italic font-medium text-[#E2541B]">
              {content.media.titleEmphasis}
            </span>
          </h2>
          <p className="mt-2 text-base text-[#6B645A] max-w-2xl leading-relaxed">
            {content.media.subtitle}
          </p>
        </div>

        {/* Part 1: YouTube Video Interviews */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1C1A17]/10 font-mono text-xs text-[#6B645A]">
            <span className="text-[#1C1A17] font-semibold uppercase">
              {content.media.youtubeHeading}
            </span>
            <span>FORMAT: 1080P // OCHIQ SUHBATLAR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.media.videos.map((video) => {
              const isAvailable = video.isAvailable !== false;

              return (
                <div
                  key={video.id}
                  className="mold-card group p-5 bg-[#EBE4D6] border border-[#1C1A17]/15 flex flex-col justify-between"
                >
                  <span className="corner-mark-tl" />
                  <span className="corner-mark-br" />

                  <div>
                    {/* Video Thumbnail / Mockup with Play Trigger */}
                    <div
                      onClick={() =>
                        isAvailable ? setActiveVideoId(video.youtubeId) : undefined
                      }
                      className={`relative aspect-video w-full mb-4 bg-[#1C1A17] border border-[#1C1A17]/20 overflow-hidden flex items-center justify-center ${
                        isAvailable
                          ? "cursor-pointer group-hover:border-[#E2541B] transition-colors"
                          : "cursor-default border-[#1C1A17]/25"
                      }`}
                    >
                      {/* Thumbnail: Real image if available, premium local blueprint fallback if unavailable */}
                      {isAvailable ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                          style={{
                            backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg)`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1E24] via-[#12141A] to-[#0A0B0E] flex flex-col justify-between p-3.5 select-none">
                          {/* Blueprint technical grid overlay */}
                          <div
                            className="absolute inset-0 opacity-25 pointer-events-none"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(217,119,54,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,54,0.18) 1px, transparent 1px)",
                              backgroundSize: "20px 20px",
                            }}
                            aria-hidden="true"
                          />

                          {/* Top blueprint badge */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="font-mono text-[9px] font-bold text-[#D97736] tracking-wider uppercase bg-[#090A0D]/90 border border-[#D97736]/30 px-2 py-0.5 rounded-[2px]">
                              {video.channel}
                            </span>
                            <span className="font-mono text-[9px] text-[#A4ACB9] tracking-wider uppercase bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-[2px]">
                              ARXIV // MEDIA
                            </span>
                          </div>

                          {/* Center badge */}
                          <div className="relative z-10 text-center my-auto py-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#090A0D]/90 border border-white/15 mb-1 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D97736] animate-pulse" />
                              <span className="font-mono text-[10px] font-bold text-white tracking-wider uppercase">
                                {video.statusNote || "Montaj jarayonida"}
                              </span>
                            </div>
                            <p className="font-serif text-[11px] text-[#A4ACB9] line-clamp-1 italic px-2">
                              {video.title}
                            </p>
                          </div>

                          {/* Bottom metadata */}
                          <div className="relative z-10 flex items-center justify-between font-mono text-[8.5px] text-[#8E95A5]">
                            <span>MASTER: 1080P HD</span>
                            <span>RASMIY CHIQARILISH</span>
                          </div>
                        </div>
                      )}

                      {/* Center Action Indicator */}
                      {isAvailable ? (
                        <div className="relative z-10 w-12 h-12 bg-[#E2541B] text-white flex items-center justify-center rounded-[2px] shadow-md group-hover:scale-105 transition-transform">
                          <svg
                            className="w-5 h-5 fill-current ml-0.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="relative z-10 px-2.5 py-1 bg-[#090A0D]/90 border border-[#D97736]/40 text-[#D97736] font-mono text-[10px] tracking-wider uppercase font-semibold rounded-[2px] shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
                          <span>Yaqinda yuklanadi</span>
                        </div>
                      )}

                      {/* Duration badge */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#1C1A17]/90 text-[#F4EFE6] font-mono text-[10px] rounded-[1px] z-10">
                        {video.durationPlaceholder}
                      </div>
                    </div>

                    {/* Channel & Badge */}
                    <div className="flex items-center justify-between pb-2 mb-2 font-mono text-xs text-[#6B645A]">
                      <span className="text-[#1F2F5C] font-semibold">{video.channel}</span>
                      <span className="text-[10px] bg-[#F4EFE6] px-1.5 py-0.5 border border-[#1C1A17]/10">
                        {video.topicBadge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#E2541B] transition-colors leading-snug">
                      {video.title}
                    </h3>
                  </div>

                  {/* Footer trigger */}
                  <div className="pt-4 mt-4 border-t border-[#1C1A17]/10 flex items-center justify-between">
                    {isAvailable ? (
                      <button
                        type="button"
                        onClick={() => setActiveVideoId(video.youtubeId)}
                        className="tap-target-48 font-mono text-xs text-[#E2541B] font-semibold hover:underline flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2541B]"
                      >
                        <span>Videoni tomosha qilish</span>
                        <span>▶</span>
                      </button>
                    ) : (
                      <span className="font-mono text-xs text-[#6B645A] font-medium flex items-center gap-1.5 select-none py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]/60" />
                        <span>{video.statusNote || "Arxiv montaj jarayonida"}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Press Mentions & Media Outlets */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1C1A17]/10 font-mono text-xs text-[#6B645A]">
            <span className="text-[#1C1A17] font-semibold uppercase">
              {content.media.pressHeading}
            </span>
            <span>MAQOLALAR VA RASMIY MATBUOT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.media.pressMentions.map((press) => (
              <a
                key={press.id}
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mold-card group p-5 bg-[#F4EFE6] border border-[#1C1A17]/15 hover:border-[#E2541B]/40 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1C1A17]/10 font-mono text-xs">
                    <span className="font-bold text-[#1C1A17]">{press.outlet}</span>
                    <span className="text-[#6B645A] text-[10px]">{press.publicationType}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#1C1A17] group-hover:text-[#E2541B] transition-colors leading-snug">
                    {press.articleTitle}
                  </h4>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1C1A17]/10 flex items-center justify-between font-mono text-xs text-[#6B645A]">
                  <span>{press.datePlaceholder}</span>
                  <span className="text-[#E2541B] group-hover:translate-x-0.5 transition-transform">
                    O&apos;qish ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideoId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#1C1A17] border border-[#1C1A17]/30 rounded-[2px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 bg-[#EBE4D6] border-b border-[#1C1A17]/15 font-mono text-xs">
              <span className="text-[#1C1A17] font-semibold">
                VIDEO PLEYER // ANVAR ABDUQAYUM INTERVYULARI
              </span>
              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="tap-target-48 px-2 py-1 bg-[#1C1A17] text-white rounded-[1px] hover:bg-[#E2541B] transition-colors"
              >
                Yopish [ESC]
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

