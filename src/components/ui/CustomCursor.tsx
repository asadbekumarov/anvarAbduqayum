"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export type CursorVariant = "default" | "pointer" | "image";

const CURSOR_SIZES: Record<CursorVariant, number> = {
  default: 14,
  pointer: 44,
  image: 68,
};

/**
 * Custom hook that tracks mouse coordinates and automatically detects
 * interactive elements (links, buttons, tabs) and images to scale the cursor.
 */
export function useCustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.45 });
  const smoothY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.45 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant("default");
        return;
      }

      if (target.closest('img, [data-cursor="image"], .portrait-archival-mat')) {
        setVariant("image");
      } else if (
        target.closest(
          'a, button, [role="button"], [role="tab"], input, select, textarea, [data-cursor="pointer"]'
        )
      ) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  return { variant, visible, smoothX, smoothY, setVariant };
}

/**
 * Swiss Luxury custom magnetic cursor with mix-blend-mode: difference.
 */
export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { variant, visible, smoothX, smoothY } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || shouldReduceMotion) return null;

  const size = CURSOR_SIZES[variant];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor:
          variant === "default" ? "#D4AF37" : "rgba(212, 175, 55, 0.92)",
      }}
      transition={{
        width: { type: "spring", stiffness: 320, damping: 26 },
        height: { type: "spring", stiffness: 320, damping: 26 },
        opacity: { duration: 0.2 },
      }}
    >
      {variant === "image" && (
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#090909]">
          VIEW
        </span>
      )}
    </motion.div>
  );
};

