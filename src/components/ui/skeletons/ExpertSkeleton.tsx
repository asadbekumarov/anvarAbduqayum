import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ExpertSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-gradient-to-b from-[#0A0A0A] via-[#070D1F]/40 to-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* Kicker */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-[1px] bg-[#C5A880]/40" />
          <Skeleton className="w-40 h-3.5 font-mono" />
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) — Portrait */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#0F172A]/40">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Skeleton className="w-36 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>

          {/* Right Column (7 cols) — Bio, Credentials, Diplomas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <Skeleton className="w-64 h-8 sm:h-10" />
              <Skeleton className="w-80 h-5 text-platinum" />
            </div>

            {/* Editorial Quote Box */}
            <div className="p-6 rounded-xl border-l-2 border-[#C5A880] bg-white/[0.02] space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-[90%] h-4" />
              <Skeleton className="w-[60%] h-4" />
            </div>

            {/* 3 Metric Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
              {[1, 2, 3].map((m) => (
                <div key={m} className="space-y-2">
                  <Skeleton className="w-20 h-6" />
                  <Skeleton className="w-28 h-3.5 opacity-70" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diplomas Strip Full Width */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-white/[0.08] w-full space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-4 font-mono" />
            <Skeleton className="w-12 h-3 font-mono opacity-60" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {[1, 2, 3].map((d) => (
              <div
                key={d}
                className="w-full bg-[#0B132B]/25 border border-white/[0.1] p-4 sm:p-5 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] w-full rounded-sm overflow-hidden mb-4">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <Skeleton className="w-3/4 h-4" />
                  <Skeleton className="w-10 h-3 font-mono" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
