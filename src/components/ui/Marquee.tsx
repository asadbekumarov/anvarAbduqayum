"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds per full loop
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className={cn(
        "overflow-hidden select-none flex w-full relative",
        pauseOnHover ? "group" : "",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 sm:gap-8 min-w-full group-hover:[animation-play-state:paused]",
          animClass
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 sm:gap-8 min-w-full group-hover:[animation-play-state:paused]",
          animClass
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
