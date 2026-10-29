import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) — Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#C5A880]/40" />
                <Skeleton className="w-36 h-3.5 font-mono" />
              </div>
              <Skeleton className="w-[85%] h-10 sm:h-12" />
              <Skeleton className="w-full h-4 mt-2" />
              <Skeleton className="w-4/5 h-4" />
            </div>

            {/* Channels List */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              {[1, 2, 3, 4].map((c) => (
                <div key={c} className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="w-20 h-3 font-mono opacity-60" />
                    <Skeleton className="w-40 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols) — Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-6">
              <div className="space-y-2">
                <Skeleton className="w-48 h-6" />
                <Skeleton className="w-72 h-4 opacity-70" />
              </div>

              {/* Form Input Skeletons */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Skeleton className="w-24 h-3.5" />
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="w-28 h-3.5" />
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>

                {/* Company size pills */}
                <div className="space-y-2">
                  <Skeleton className="w-32 h-3.5" />
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-10 rounded-lg" />
                    <Skeleton className="h-10 rounded-lg" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="w-36 h-3.5" />
                  <Skeleton className="w-full h-24 rounded-xl" />
                </div>

                <Skeleton className="w-full h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
