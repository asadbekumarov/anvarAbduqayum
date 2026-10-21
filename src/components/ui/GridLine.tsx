"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

interface GridLineProps {
  className?: string;
  delay?: number;
}

export function GridLine({ className, delay = 0 }: GridLineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={cn("h-[1px] w-full bg-white/[0.08] pointer-events-none", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.1,
        ease: EASE_SWISS,
        delay,
      }}
      style={{ transformOrigin: "left" }}
      className={cn(
        "h-[1px] w-full bg-white/[0.08] pointer-events-none will-change-transform",
        className
      )}
      aria-hidden="true"
    />
  );
}
