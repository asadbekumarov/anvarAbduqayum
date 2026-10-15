"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds per full loop
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  repeat?: number;
}

export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  reverse = false,
  className = "",
  repeat = 4,
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
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8 group-hover:[animation-play-state:paused]",
            animClass
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
