"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-base text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-elevated border border-border rounded-[2px]">
        <div className="w-12 h-12 mx-auto rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center text-red-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-normal text-white">
            Kutilmagan xatolik yuz berdi
          </h2>
          <p className="text-xs sm:text-sm text-muted font-light mt-2 leading-relaxed">
            Sahifani yuklashda xatolik ro‘y berdi. Iltimos, qaytadan urinib ko‘ring.
          </p>
        </div>
        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => reset()} className="px-6">
            Qayta yuklash
          </Button>
        </div>
      </div>
    </div>
  );
}
