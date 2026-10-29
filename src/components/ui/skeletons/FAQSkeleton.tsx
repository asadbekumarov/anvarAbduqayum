import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function FAQSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]/40" />
            <Skeleton className="w-36 h-3.5 font-mono" />
          </div>
          <Skeleton className="w-[85%] h-10 sm:h-12" />
          <Skeleton className="w-full h-4 mt-2" />
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((cat) => (
            <div
              key={cat}
              className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-12 h-4 rounded-full" />
              </div>
              <Skeleton className="w-24 h-4" />
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="relative mb-10 max-w-xl">
          <Skeleton className="w-full h-12 rounded-xl border border-white/[0.08] bg-white/[0.02]" />
        </div>

        {/* FAQ Accordion Items (5 items) */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-20 h-4 rounded-full" />
                  <Skeleton className="w-12 h-3 font-mono opacity-60" />
                </div>
                <Skeleton className="w-3/4 h-5" />
              </div>
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
