"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Swiss Luxury easing curve: deliberate, smooth deceleration without bounce.
 */
export const SWISS_EASE = [0.22, 1, 0.36, 1] as const;

export const scrollEnterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: SWISS_EASE,
      delay,
    },
  }),
};

interface StaggeredTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "inView" | "mount";
}

const wordMaskVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: SWISS_EASE,
    },
  },
};

/**
 * Word-by-word clipping/mask reveal for editorial headings.
 */
export function StaggeredTextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  trigger = "inView",
}: StaggeredTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (shouldReduceMotion || words.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, amount: 0.25 },
          })}
      className={cn("inline", className)}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom pb-[0.04em] -mb-[0.04em]"
        >
          <motion.span
            variants={wordMaskVariants}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {word}
            {idx < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}

/**
 * Deliberate scroll-enter container using Swiss Luxury easing.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  amount = 0.15,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.75,
        ease: SWISS_EASE,
        delay,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface MagneticPullProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  glow?: boolean;
}

/**
 * Subtle magnetic cursor pull + optional gold border aura for primary CTAs.
 */
export function MagneticPull({
  children,
  className,
  strength = 0.22,
  glow = true,
}: MagneticPullProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-block group/magnetic",
        glow &&
          "after:pointer-events-none after:absolute after:-inset-[1px] after:rounded-[3px] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:shadow-[0_0_24px_rgba(212,175,55,0.38)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children?: React.ReactNode;
  className?: string;
  offset?: number;
  "aria-hidden"?: boolean;
}

/**
 * Scroll-linked vertical parallax layer using useScroll + useTransform.
 */
export function ParallaxLayer({
  children,
  className,
  offset = 32,
  "aria-hidden": ariaHidden,
}: ParallaxLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div
      ref={ref}
      aria-hidden={ariaHidden}
      style={shouldReduceMotion ? undefined : { y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

