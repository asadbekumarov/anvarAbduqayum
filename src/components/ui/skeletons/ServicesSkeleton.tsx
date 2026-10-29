import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="scroll-mt-20 py-14 sm:py-20 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Top Header & Monolith Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C5A880]/40" />
              <Skeleton className="w-40 h-3.5 font-mono" />
            </div>
            <Skeleton className="w-[80%] h-10 sm:h-12" />
            <Skeleton className="w-[95%] h-4 mt-3" />
            <Skeleton className="w-[70%] h-4" />
          </div>

          {/* Right Column (5 cols) — Monolith Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="w-24 h-5 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-36 h-10 rounded-full bg-[#C5A880]/15" />
            </div>
          </div>
        </div>

        {/* 6 Compact Table Rows (Ledger) */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-1">
                <Skeleton className="w-8 h-4 font-mono" />
              </div>
              <div className="md:col-span-4">
                <Skeleton className="w-48 h-5" />
              </div>
              <div className="md:col-span-6">
                <Skeleton className="w-full h-4" />
              </div>
              <div className="md:col-span-1 flex justify-end">
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
