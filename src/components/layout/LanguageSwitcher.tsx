"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: "uz" | "ru" | "en") => {
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const locales: Array<"uz" | "ru" | "en"> = ["uz", "ru", "en"];

  return (
    <div
      role="group"
      aria-label="Tilni tanlash / Выбор языка"
      className="inline-flex items-center font-mono text-xs"
    >
      {locales.map((loc, idx) => {
        const isActive = currentLocale === loc;
        return (
          <React.Fragment key={loc}>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleLocaleChange(loc)}
              className={`transition-colors py-1 px-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                isActive
                  ? "text-white font-medium"
                  : "text-neutral-500 hover:text-white"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {loc.toUpperCase()}
            </button>
            {idx < locales.length - 1 && (
              <span className="text-white/20 select-none px-1" aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
