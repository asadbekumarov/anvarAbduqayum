"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export function MaskedHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: MaskedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.9,
          ease: EASE_SWISS,
          delay,
        }}
        className="will-change-transform"
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
