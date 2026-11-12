"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MONOGRAPH_EASE = [0.16, 1, 0.3, 1] as const;

interface RevealMaskProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
  trigger?: "inView" | "mount";
}

/**
 * Corporate Reveal Wrapper (Industrial Monograph):
 * Clips content in an overflow-hidden frame and slides it from y: 100% to y: 0%
 * using a deliberate, non-bouncy architectural cubic-bezier curve.
 */
export const RevealMask: React.FC<RevealMaskProps> = ({
  children,
  className,
  innerClassName,
  delay = 0,
  duration = 1.2,
  trigger = "inView",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        {...(trigger === "mount"
          ? { animate: { y: "0%" } }
          : {
              whileInView: { y: "0%" },
              viewport: { once: true, amount: 0.2 },
            })}
        transition={{
          duration,
          delay,
          ease: MONOGRAPH_EASE,
        }}
        className={cn("will-change-transform", innerClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
};

