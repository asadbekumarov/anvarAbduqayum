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
    <motion.div
      initial={{ opacity: 0.4, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "150px 0px" }}
      transition={{
        duration: 0.6,
        ease: EASE_SWISS,
        delay,
      }}
      className="will-change-transform"
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
