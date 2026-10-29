import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="relative min-h-[100svh] bg-[#0A0A0A] pt-28 pb-16 flex flex-col justify-between overflow-hidden border-b border-white/[0.07]"
    >
      <div className="max-w-[1360px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Swiss Editorial Kicker */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]/40" />
            <Skeleton className="w-36 h-3.5 font-mono" />
          </div>

          {/* Heading Skeleton (3 lines) */}
          <div className="space-y-4">
            <Skeleton className="w-[85%] h-12 sm:h-14 lg:h-16" />
            <Skeleton className="w-[95%] h-12 sm:h-14 lg:h-16" />
            <Skeleton className="w-[60%] h-12 sm:h-14 lg:h-16" />
          </div>

          {/* Subtitle Skeleton */}
          <div className="space-y-2.5 max-w-xl pt-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[90%] h-4" />
            <Skeleton className="w-[70%] h-4" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Skeleton className="w-48 h-12 rounded-full bg-[#C5A880]/20 border-[#C5A880]/30" />
            <Skeleton className="w-40 h-12 rounded-full" />
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] max-w-lg">
            <div className="space-y-2">
              <Skeleton className="w-16 h-7" />
              <Skeleton className="w-20 h-3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-16 h-7" />
              <Skeleton className="w-24 h-3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-16 h-7" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) — Portrait / Visual mockup */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative aspect-[4/5] w-full max-w-[460px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0F172A]/30 p-4 flex flex-col justify-end">
            <Skeleton className="w-full h-full absolute inset-0" />
            <div className="relative z-10 p-6 space-y-2 bg-gradient-to-t from-[#0A0A0A] to-transparent">
              <Skeleton className="w-40 h-5" />
              <Skeleton className="w-28 h-3.5 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
