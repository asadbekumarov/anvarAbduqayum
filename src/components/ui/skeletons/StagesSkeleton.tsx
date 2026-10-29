import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function StagesSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Kicker & Heading */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#C5A880]/40" />
            <Skeleton className="w-36 h-3.5 font-mono" />
          </div>
          <Skeleton className="w-[85%] h-10 sm:h-12" />
          <Skeleton className="w-full h-4 mt-2" />
        </div>

        {/* 2 Direction Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-white/[0.08]">
          <Skeleton className="w-48 h-11 rounded-lg bg-white/[0.08]" />
          <Skeleton className="w-48 h-11 rounded-lg" />
        </div>

        {/* Stages Cards Grid / Accordions */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start sm:items-center gap-6">
                <Skeleton className="w-12 h-12 rounded-lg font-mono flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="w-56 h-5" />
                  <Skeleton className="w-72 sm:w-96 h-4 opacity-70" />
                </div>
              </div>
              <div className="flex items-center gap-4 self-end md:self-center">
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
