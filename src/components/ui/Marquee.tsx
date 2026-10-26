"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds per full loop
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  innerClassName?: string;
  repeat?: number;
}

/**
 * Takroriy nusxalarda skrinriderlar takror o'qimasligi uchun
 * barcha <Image> yoki <img> lar alt="" qilinadi.
 */
function stripAltFromChildren(nodes: React.ReactNode): React.ReactNode {
  return React.Children.map(nodes, (child) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as Record<string, unknown>;
    const newProps: Record<string, unknown> = {};

    if ("alt" in props) {
      newProps.alt = "";
    }
    if (props.children) {
      newProps.children = stripAltFromChildren(props.children as React.ReactNode);
    }

    return Object.keys(newProps).length > 0
      ? React.cloneElement(child, newProps)
      : child;
  });
}

export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  reverse = false,
  className = "",
  innerClassName = "",
  repeat = 2,
}: MarqueeProps) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className={cn(
        "overflow-hidden select-none flex w-full relative motion-reduce:overflow-x-auto motion-reduce:scroll-smooth",
        pauseOnHover ? "group" : "",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            innerClassName || "gap-6 sm:gap-8 pr-6 sm:pr-8",
            animClass
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {i === 0 ? children : stripAltFromChildren(children)}
        </div>
      ))}
    </div>
  );
}
