import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function BookCtaSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols) — Book Monograph */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]/40" />
              <Skeleton className="w-36 h-3.5 font-mono" />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              {/* Book 3D Cover Skeleton */}
              <div className="w-48 sm:w-56 aspect-[3/4] rounded-lg border border-white/[0.08] bg-white/[0.03] flex-shrink-0 overflow-hidden relative shadow-2xl">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Book Details */}
              <div className="space-y-4 flex-1">
                <Skeleton className="w-full h-7" />
                <Skeleton className="w-4/5 h-4 opacity-80" />
                
                {/* 4 Specs list */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex justify-between items-center text-xs">
                      <Skeleton className="w-24 h-3 font-mono" />
                      <Skeleton className="w-28 h-3" />
                    </div>
                  ))}
                </div>

                <Skeleton className="w-40 h-11 rounded-full bg-[#C5A880]/20 mt-4" />
              </div>
            </div>
          </div>

          {/* Right Column (6 cols) — Strategic Diagnostic CTA Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0F172A]/40 via-white/[0.02] to-transparent space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-6 h-[1px] bg-[#C5A880]/40" />
                <Skeleton className="w-32 h-3 font-mono" />
              </div>

              <Skeleton className="w-[85%] h-8 sm:h-9" />
              <Skeleton className="w-full h-4 opacity-80" />

              <div className="space-y-3 pt-2">
                {[1, 2, 3].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                    <Skeleton className="w-full h-4" />
                  </div>
                ))}
              </div>

              <Skeleton className="w-48 h-12 rounded-full bg-[#C5A880]/25 border border-[#C5A880]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
