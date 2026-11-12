"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MONOGRAPH_EASE } from "./RevealMask";

interface SectionDividerProps {
  className?: string;
  tone?: "hairline" | "gold" | "dark";
  code?: string;
  delay?: number;
}

/**
 * Engineering SVG Hairline Divider:
 * Draws a 1px structural line from left to right using Framer Motion pathLength
 * over 1.5s with architectural cubic-bezier easing.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  className,
  tone = "hairline",
  code,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const strokeColor =
    tone === "gold"
      ? "var(--accent-gold)"
      : tone === "dark"
      ? "var(--border-on-dark)"
      : "var(--border-hairline-editorial-strong)";

  return (
    <div
      aria-hidden="true"
      className={cn("w-full flex items-center gap-3", className)}
    >
      {code && (
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-gold-ink)] shrink-0">
          {code}
        </span>
      )}

      <svg
        viewBox="0 0 1200 2"
        preserveAspectRatio="none"
        className="w-full h-[1px] block overflow-visible"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke={strokeColor}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.5,
            delay,
            ease: MONOGRAPH_EASE,
          }}
        />
      </svg>
    </div>
  );
};

