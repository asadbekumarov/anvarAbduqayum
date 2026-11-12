"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticCTAProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  glow?: boolean;
}

/**
 * MagneticCTA: Wraps a CTA button or link so it subtly pulls toward the user's
 * mouse cursor using Framer Motion springs, with a #D4AF37 Swiss Luxury hover aura.
 */
export const MagneticCTA: React.FC<MagneticCTAProps> = ({
  children,
  className,
  strength = 0.28,
  glow = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.45 });
  const springY = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.45 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawX.set((e.clientX - centerX) * strength);
    rawY.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      data-cursor="pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-block will-change-transform",
        glow &&
          "after:pointer-events-none after:absolute after:-inset-[1px] after:rounded-[2px] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:shadow-[0_0_26px_rgba(212,175,55,0.42)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

