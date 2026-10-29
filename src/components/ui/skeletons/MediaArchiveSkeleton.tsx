import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function MediaArchiveSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Kicker + Heading */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]/40" />
            <Skeleton className="w-40 h-3.5 font-mono" />
          </div>
          <Skeleton className="w-[80%] h-10 sm:h-12" />
          <Skeleton className="w-full h-4 mt-2" />
        </div>

        {/* 3 Tabs (Testimonials, Webinars, Events) */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-white/[0.08]">
          <Skeleton className="w-40 h-10 rounded-lg bg-white/[0.08]" />
          <Skeleton className="w-40 h-10 rounded-lg" />
          <Skeleton className="w-40 h-10 rounded-lg" />
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden flex flex-col"
            >
              {/* 16:9 Video Aspect Ratio Placeholder with Play Button Icon */}
              <div className="relative aspect-video w-full bg-white/[0.04] flex items-center justify-center">
                <Skeleton className="w-full h-full absolute inset-0" />
                <div className="relative z-10 w-14 h-14 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white/60 ml-1" />
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 z-10">
                  <Skeleton className="w-12 h-5 rounded bg-black/70" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-16 h-4 rounded-full" />
                    <Skeleton className="w-20 h-4 rounded-full" />
                  </div>
                  <Skeleton className="w-full h-5 mt-2" />
                  <Skeleton className="w-4/5 h-4 opacity-70" />
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <Skeleton className="w-28 h-3.5" />
                  <Skeleton className="w-20 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
