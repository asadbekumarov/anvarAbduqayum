"use client";

import React, { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { MONOGRAPH_EASE } from "./RevealMask";

interface MonolithImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  parallaxOffset?: number;
}

/**
 * Industrial Image Parallax (Monolith):
 * - Scales down from 1.08 -> 1 over 1.5s on initial scroll reveal (heavy camera pan).
 * - Smoothly transitions from grayscale(100%) to grayscale(0%) as the image
 *   reaches the center of the viewport.
 */
export const MonolithImage: React.FC<MonolithImageProps> = ({
  containerClassName,
  imageClassName,
  parallaxOffset = 18,
  alt,
  ...imageProps
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const filter = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxOffset, parallaxOffset]
  );

  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-[var(--bg-dark)] border border-[var(--border-hairline-editorial)]",
          containerClassName
        )}
      >
        <Image
          alt={alt}
          {...imageProps}
          className={cn("w-full h-full object-cover block", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-[var(--bg-dark)] border border-[var(--border-hairline-editorial)]",
        containerClassName
      )}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: MONOGRAPH_EASE }}
        className="w-full h-full will-change-transform"
      >
        <motion.div
          style={{ y, filter }}
          className="w-full h-[108%] -mt-[4%] will-change-transform"
        >
          <Image
            alt={alt}
            {...imageProps}
            className={cn("w-full h-full object-cover block", imageClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

