"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  margin?: string;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export function RevealOnScroll({
  children,
  delay = 0,
  yOffset = 24,
  className,
  margin = "-80px",
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: margin as any }}
      transition={{
        duration: 0.75,
        ease: EASE_SWISS,
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
