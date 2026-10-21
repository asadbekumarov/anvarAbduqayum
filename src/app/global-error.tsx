"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uz">
      <body className="bg-[#0A0A0A] text-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6 p-8 bg-[#141414] border border-[#262626] rounded-none">
            <h2 className="font-serif text-2xl font-normal text-white">
              Tizim xatoligi yuz berdi
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-2 leading-relaxed">
              Kutilmagan xatolik yuz berdi. Iltimos, sahifani qayta yuklang.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => reset()}
                className="bg-[#C5A880] hover:bg-[#d4b992] text-[#0A0A0A] font-medium px-6 py-3 uppercase tracking-wider text-xs rounded-none transition-colors cursor-pointer"
              >
                Qayta yuklash
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
