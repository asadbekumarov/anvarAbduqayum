import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function FooterSkeleton() {
  return (
    <footer
      aria-hidden="true"
      className="bg-gradient-to-t from-[#070D1F]/40 to-[#0A0A0A] border-t border-white/[0.08] py-12 pb-24 md:pb-12"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4">
          <Skeleton className="w-36 h-4" />
          <Skeleton className="w-48 h-3 opacity-60" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
    </footer>
  );
}
