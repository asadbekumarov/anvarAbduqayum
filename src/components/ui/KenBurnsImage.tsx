"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

interface KenBurnsImageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function KenBurnsImage({
  children,
  className,
  delay = 0,
}: KenBurnsImageProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn("relative w-full h-full", className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1.0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.4,
        ease: EASE_SWISS,
        delay,
      }}
      className={cn("relative w-full h-full will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
