"use client";

import React, { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

interface ParallaxRevealImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  parallaxRange?: number;
}

/**
 * Smooth Image Parallax & Reveal Component:
 * 1. Clip-path reveals from bottom on scroll enter while scaling down from 1.2 -> 1.
 * 2. Continuous subtle vertical parallax relative to its overflow-hidden container.
 */
export const ParallaxRevealImage: React.FC<ParallaxRevealImageProps> = ({
  containerClassName,
  imageClassName,
  parallaxRange = 28,
  alt,
  ...imageProps
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxRange, parallaxRange]
  );

  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        data-cursor="image"
        className={cn("relative overflow-hidden bg-[#090909]", containerClassName)}
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
      data-cursor="image"
      className={cn("relative overflow-hidden bg-[#090909]", containerClassName)}
    >
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, ease: SWISS_EASE }}
        className="w-full h-full will-change-transform"
      >
        <motion.div
          style={{ y: parallaxY }}
          className="w-full h-[112%] -mt-[6%] will-change-transform"
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

