import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  index?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  index,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4 mb-3">
        {index && (
          <span className="font-mono text-platinum text-xs tracking-widest">
            /{index}
          </span>
        )}
        {kicker && (
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-platinum font-medium">
            {kicker}
          </span>
        )}
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white max-w-3xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-platinum-light max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
