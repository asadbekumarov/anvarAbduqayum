import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <header
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.08] transition-all"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo / Brand Name Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full bg-white/[0.08]" />
          <div className="space-y-1">
            <Skeleton className="w-36 h-4" />
            <Skeleton className="w-24 h-2.5 opacity-60" />
          </div>
        </div>

        {/* Desktop Nav Items Skeleton */}
        <div className="hidden lg:flex items-center gap-8">
          <Skeleton className="w-16 h-3.5" />
          <Skeleton className="w-20 h-3.5" />
          <Skeleton className="w-16 h-3.5" />
          <Skeleton className="w-20 h-3.5" />
          <Skeleton className="w-12 h-3.5" />
          <Skeleton className="w-14 h-3.5" />
        </div>

        {/* Right CTA & Lang Switcher Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-14 h-8 rounded-full hidden sm:block" />
          <Skeleton className="w-32 h-10 rounded-full bg-[#C5A880]/15 border-[#C5A880]/30" />
        </div>
      </div>
    </header>
  );
}
